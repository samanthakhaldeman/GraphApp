(define (problem attack_scenario)
  (:domain attack_graph)
  (:objects
    reason-undisclosed-pages - reason
    protocol-http - protocol
    ip-19216112 - ip
    attacker-action-upload-files-with-specially-crafted-name - attacker-action
    node-001 - node
    port-80 - port
    ip-19216159 - ip
    service-wordpress-540 - service
    attacker-action-execute-remote-code - attacker-action
    service-001 - node
    cve-cve-2020-11026 - cve
    cve-cve-2020-5902 - cve
    trigger-accessing-unspecified-vulnerable-pages - trigger
    service-002 - node
    privilege-authenticated-user - privilege
    consequence-execution-of-arbitrary-code - consequence
    access-remote - access
    source-media-section-file-upload - source
    access-local - access
    arbitrary-script-execution - consequences
    user-interaction-no - user-interaction
    ip-19216126 - ip
    reason-special-crafted-file-name-handling - reason
    trigger-uploading-file - trigger
    service-big-ip-1501 - service
    source-tmui - source
    system-config-windows-7-spi - system-config
    privilege-unauthenticated - privilege
    port-8080 - port
  )
  (:init
    (has-consequences arbitrary-script-execution service-001)
    (has-system-config system-config-windows-7-spi node-001)
    (has-access remote service-002)
    (has-protocol protocol-http service-002)
    (has-ip ip-19216126 service-001)
    (has-attacker-action execute-remote-code service-002)
    (has-cve cve-2020-5902 service-002)
    (has-trigger accessing-unspecified-vulnerable-pages service-002)
    (has-access local service-001)
    (has-ip ip-19216159 service-002)
    (has-cve cve-2020-11026 service-001)
    (has-privilege unauthenticated service-002)
    (has-source tmui service-002)
    (has-port port-8080 service-002)
    (has-service service-wordpress-540 service-001)
    (has-source media-section-file-upload service-001)
    (has-trigger uploading-file service-001)
    (has-user-interaction no service-002)
    (has-reason special-crafted-file-name-handling service-001)
    (has-consequence execution-of-arbitrary-code service-002)
    (has-service service-big-ip-1501 service-002)
    (has-port port-80 service-001)
    (has-connected node_1 node_0)
    (has-user-interaction no service-001)
    (has-privilege authenticated-user service-001)
    (has-attacker-action upload-files-with-specially-crafted-name service-001)
    (has-ip ip-19216112 node-001)
    (has-connected node_2 node_0)
    (has-reason undisclosed-pages service-002)
    (has-protocol protocol-http service-001)
  )
  (:goal (and (has-compromised node_0)))
)
