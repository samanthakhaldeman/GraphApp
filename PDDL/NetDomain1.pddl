(define (domain attack_graph)
  (:requirements :strips :typing)
  (:types node service ip port protocol source action consequences cve - object)
  (:predicates
    (has-attacker-action ?a - attacker-action ?n - node)
    (has-system-config ?a - system-config ?n - node)
    (has-consequences ?a - consequences ?n - node)
    (has-reason ?a - reason ?n - node)
    (has-ip ?a - ip ?n - node)
    (has-access ?a - access ?n - node)
    (has-privilege ?a - privilege ?n - node)
    (has-consequence ?a - consequence ?n - node)
    (has-cve ?a - cve ?n - node)
    (has-port ?a - port ?n - node)
    (has-service ?a - service ?n - node)
    (has-user-interaction ?a - user-interaction ?n - node)
    (has-connected ?n1 - node ?n2 - node)
    (has-protocol ?a - protocol ?n - node)
    (has-trigger ?a - trigger ?n - node)
    (has-source ?a - source ?n - node)
    (has-connected ?n1 - node ?n2 - node)
    (has-compromised ?n - node)
  )
  
  (:action compromise-node-001-via-node_1
   :parameters (?attacker - node ?target - node)
   :precondition (and (has-compromised ?attacker) (has-system-config system-config-windows-7-spi node-001) (has-system-config ip-19216112 node-001) (has-compromised node_1))
   :effect (and (has-compromised node-001) (has-compromised node-001-via-node_1))
  )


  (:action compromise-node-001-via-node_2
   :parameters (?attacker - node ?target - node)
   :precondition (and (has-compromised ?attacker) (has-system-config system-config-windows-7-spi node-001) (has-system-config ip-19216112 node-001) (has-compromised node_2))
   :effect (and (has-compromised node-001) (has-compromised node-001-via-node_2))
  )


  (:action compromise-service-002
   :parameters (?attacker - node ?target - node)
   :precondition (and (has-compromised ?attacker) (has-system-config service-big-ip-1501 service-002) (has-system-config ip-19216159 service-002) (has-system-config port-8080 service-002) (has-system-config protocol-http service-002) (has-source source-tmui service-002) (has-reason reason-undisclosed-pages service-002) (has-user-interaction user-interaction-no service-002) (has-trigger trigger-accessing-unspecified-vulnerable-pages service-002) (has-access access-remote service-002) (has-privilege privilege-unauthenticated service-002) (has-attacker-action attacker-action-execute-remote-code service-002) (has-consequence consequence-execution-of-arbitrary-code service-002) (has-cve cve-cve-2020-5902 service-002))
   :effect (and  (has-compromised service-002))
  )


  (:action compromise-service-001
   :parameters (?attacker - node ?target - node)
   :precondition (and (has-compromised ?attacker) (has-system-config service-wordpress-540 service-001) (has-system-config ip-19216126 service-001) (has-system-config port-80 service-001) (has-system-config protocol-http service-001) (has-source source-media-section-file-upload service-001) (has-reason reason-special-crafted-file-name-handling service-001) (has-user-interaction user-interaction-no service-001) (has-trigger trigger-uploading-file service-001) (has-access access-local service-001) (has-privilege privilege-authenticated-user service-001) (has-attacker-action attacker-action-upload-files-with-specially-crafted-name service-001) (has-consequences consequences-arbitrary-script-execution service-001) (has-cve cve-cve-2020-11026 service-001))
   :effect (and  (has-compromised service-001))
  )

)
