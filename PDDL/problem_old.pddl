(define (problem attack_scenario)
  (:domain attack_graph)
  (:objects
    arbitrary-script-execution - consequences
    uploading-file - trigger
    media-section-file-upload - source
    authenticated-user - privilege
    execution-of-arbitrary-code - consequence
    windows-7-spi - system-config
    service-001 - node
    unauthenticated - privilege
    local - access
    19216112 - ip
    8080 - port
    cve-2020-11026 - cve
    remote - access
    wordpress-540 - service
    service-002 - node
    special-crafted-file-name-handling - reason
    undisclosed-pages - reason
    upload-files-with-specially-crafted-name - attacker-action
    accessing-unspecified-vulnerable-pages - trigger
    tmui - source
    no - user-interaction
    execute-remote-code - attacker-action
    80 - port
    node-001 - node
    http - protocol
    big-ip-1501 - service
    cve-2020-5902 - cve
    19216126 - ip
    19216159 - ip
  )
  (:init
    (has-consequence execution-of-arbitrary-code service-002)
    (has-privilege authenticated-user service-001)
    (has-access local service-001)
    (has-reason undisclosed-pages service-002)
    (has-reason special-crafted-file-name-handling service-001)
    (has-cve cve-2020-11026 service-001)
    (has-protocol http service-001)
    (has-connected node_1 node_0)
    (has-trigger accessing-unspecified-vulnerable-pages service-002)
    (has-trigger uploading-file service-001)
    (has-privilege unauthenticated service-002)
    (has-consequences arbitrary-script-execution service-001)
    (has-source media-section-file-upload service-001)
    (has-service big-ip-1501 service-002)
    (has-source tmui service-002)
    (has-port 80 service-001)
    (has-attacker-action upload-files-with-specially-crafted-name service-001)
    (has-user-interaction no service-002)
    (has-ip 19216126 service-001)
    (has-system-config windows-7-spi node-001)
    (has-protocol http service-002)
    (has-service wordpress-540 service-001)
    (has-attacker-action execute-remote-code service-002)
    (has-cve cve-2020-5902 service-002)
    (has-user-interaction no service-001)
    (has-port 8080 service-002)
    (has-ip 19216112 node-001)
    (has-ip 19216159 service-002)
    (has-connected node_2 node_0)
    (has-access remote service-002)
  )
  (:goal (and (has-compromised node_0)))
)
