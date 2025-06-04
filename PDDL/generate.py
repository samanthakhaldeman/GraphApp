import json

# Define the PDDL templates
DOMAIN_TEMPLATE = """(define (domain attack_graph)
  (:requirements :strips :typing)
  (:types node service ip port protocol source action consequences cve - object)
  (:predicates
    {predicates}
    (has-connected ?n1 - node ?n2 - node)
    (has-compromised ?n - node)
  )
  {actions}
)
"""

ACTION_TEMPLATE = """
  (:action compromise-{node_label}
   :parameters (?attacker - node ?target - node)
   :precondition (and (has-compromised ?attacker) {preconditions})
   :effect (and {effects} (has-compromised {node_label}))
  )
"""

PROBLEM_TEMPLATE = """(define (problem attack_scenario)
  (:domain attack_graph)
  (:objects
    {objects}
  )
  (:init
    {init_statements}
  )
  (:goal (and (has-compromised {goal_node})))
)
"""

def sanitize(value):
    """Sanitize object names for PDDL (replace spaces, dots, and special characters)."""
    return value.replace(" ", "-").replace(".", "").replace("/", "-").replace(":", "-").lower()

def generate_pddl(json_data, goal_node):
    nodes = json_data["nodes"]
    edges = json_data["edges"]

    objects = set()
    predicates = set()
    init = set()
    actions = []
    connections = set()

    edge_map = {edge["target"]: [] for edge in edges}

    # Step 1: Process Nodes (Extract Predicates)
    for node in nodes:
        node_id = node["id"]
        node_label = sanitize(node["data"]["label"])
        node_type = node["data"]["type"]

        objects.add(f"{node_label} - node")

        # SystemTable attributes
        for system_entry in node["data"]["systemTable"]:
            attr_type = sanitize(system_entry["type"])
            attr_value = sanitize(system_entry["value"])

            if attr_value:
                objects.add(f"{attr_type}-{attr_value} - {attr_type}")
                predicates.add(f"(has-{attr_type} ?a - {attr_type} ?n - node)")
                init.add(f"(has-{attr_type} {attr_type}-{attr_value} {node_label})")

        # VulnerabilityTable attributes
        for vuln_entry in node["data"]["vulnerabilityTable"]:
            attr_type = sanitize(vuln_entry["type"])
            attr_value = sanitize(vuln_entry["value"])

            if attr_value:
                if attr_type == "consequences":
                    objects.add(f"{attr_value} - consequences")
                    predicates.add(f"(has-consequences ?a - {attr_type} ?n - node)")
                    init.add(f"(has-consequences {attr_value} {node_label})")
                else:
                    objects.add(f"{attr_type}-{attr_value} - {attr_type}")
                    predicates.add(f"(has-{attr_type} ?a - {attr_type} ?n - node)")
                    init.add(f"(has-{attr_type} {attr_value} {node_label})")

    # Step 2: Process Edges (Extract Connections & Actions)
    for edge in edges:
        source = sanitize(edge["source"])
        target = sanitize(edge["target"])
        edge_map[target].append(source)

        # If both nodes are "Host", it means a node-to-node connection
        predicates.add(f"(has-connected ?n1 - node ?n2 - node)")
        init.add(f"(has-connected {source} {target})")

    for node in nodes:
        node_label = sanitize(node["data"]["label"])
        incoming_nodes = edge_map.get(node["id"], [])

        preconditions = []
        postconditions = []

        # Get preconditions from the systemTable & vulnerabilityTable (excluding consequences)
        for system_entry in node["data"]["systemTable"]:
            system_type = sanitize(system_entry['type'])
            system_value = sanitize(system_entry["value"])
            if system_value:
                preconditions.append(f"(has-system-config {system_type}-{system_value} {node_label})")

        for vuln_entry in node["data"]["vulnerabilityTable"]:
            vuln_type = sanitize(vuln_entry['type'])
            vuln_value = sanitize(vuln_entry["value"])
            if vuln_value and vuln_entry["type"] != "consequences":
                preconditions.append(f"(has-{vuln_type} {vuln_type}-{vuln_value} {node_label})")

        # Effects: Add consequences as postconditions
        for vuln_entry in node["data"]["vulnerabilityTable"]:
            if vuln_entry["type"] == "consequences":
                postconditions.append(f"(has-consequences {sanitize(vuln_entry['value'])} {node_label})")

        # Case 1: No incoming edge (direct compromise action)
        if not incoming_nodes:
            actions.append(ACTION_TEMPLATE.format(
                node_label=node_label,
                preconditions=" ".join(preconditions),
                effects=" ".join(postconditions)
            ))
        else:
            # Case 2: Incoming edges exist (via compromise actions)
            for attacker in incoming_nodes:
                actions.append(ACTION_TEMPLATE.format(
                    node_label=f"{node_label}-via-{attacker}",
                    preconditions=" ".join(preconditions + [f"(has-compromised {attacker})"]),
                    effects="(has-compromised " + node_label + ")"
                ))

    # Step 3: Generate domain.pddl and problem.pddl
    domain_pddl = DOMAIN_TEMPLATE.format(
        predicates="\n    ".join(predicates),
        actions="\n".join(actions)
    )

    problem_pddl = PROBLEM_TEMPLATE.format(
        objects="\n    ".join(objects),
        init_statements="\n    ".join(init),
        goal_node=sanitize(goal_node)
    )

    # Write to files
    with open("domain.pddl", "w") as f:
        f.write(domain_pddl)

    with open("problem.pddl", "w") as f:
        f.write(problem_pddl)

    print("PDDL files generated: domain.pddl, problem.pddl")


# Load JSON input and generate PDDL files
with open("graph.json", "r") as f:
    attack_graph_data = json.load(f)

goal_node = "node_0"  # Set the goal node (compromised target)
generate_pddl(attack_graph_data, goal_node)
