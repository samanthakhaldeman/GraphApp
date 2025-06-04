(define (problem attack_scenario)
  (:domain attack_graph)
  (:objects
    no - user-interaction
    authenticated-user - privilege
    media-section-file-upload - source
    big-ip-1501 - service
    80 - port
    remote - access
    windows-7-spi - system-config
    19216126 - ip
    local - access
    service-001 - node
    tmui - source
    19216159 - ip
    execute-remote-code - attacker-action
    node-001 - node
    wordpress-540 - service
    arbitrary-script-execution - consequences
    undisclosed-pages - reason
    cve-2020-11026 - cve
    19216112 - ip
    execution-of-arbitrary-code - consequence
    special-crafted-file-name-handling - reason
    unauthenticated - privilege
    upload-files-with-specially-crafted-name - attacker-action
    8080 - port
    service-002 - node
    http - protocol
    cve-2020-5902 - cve
    uploading-file - trigger
    accessing-unspecified-vulnerable-pages - trigger
  )
  (:init
    (has-reason special-crafted-file-name-handling service-001)
    (has-privilege unauthenticated service-002)
    (has-access local service-001)
    (has-connected node_1 node_0)
    (has-system-config windows-7-spi node-001)
    (has-consequences arbitrary-script-execution service-001)
    (has-source media-section-file-upload service-001)
    (has-ip 19216159 service-002)
    (has-user-interaction no service-001)
    (has-port 80 service-001)
    (has-consequence execution-of-arbitrary-code service-002)
    (has-ip 19216112 node-001)
    (has-service wordpress-540 service-001)
    (has-attacker-action execute-remote-code service-002)
    (has-port 8080 service-002)
    (has-cve cve-2020-5902 service-002)
    (has-cve cve-2020-11026 service-001)
    (has-attacker-action upload-files-with-specially-crafted-name service-001)
    (has-protocol http service-001)
    (has-protocol http service-002)
    (has-source tmui service-002)
    (has-trigger uploading-file service-001)
    (has-trigger accessing-unspecified-vulnerable-pages service-002)
    (has-access remote service-002)
    (has-ip 19216126 service-001)
    (has-user-interaction no service-002)
    (has-privilege authenticated-user service-001)
    (has-service big-ip-1501 service-002)
    (has-reason undisclosed-pages service-002)
    (has-connected node_2 node_0)
  )
  (:goal (and (has-compromised node_0)))
)
