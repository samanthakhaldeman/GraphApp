(define (domain attack_graph)
  (:requirements :strips :typing)
  (:types node service ip port protocol source action consequences cve)
  (:predicates
    (has-reason-special-crafted-file-name-handling service-001)
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
    (has-connected ?n1 - node ?n2 - node)
    (has-compromised ?n - node)
  )
  
  (:action compromise-node-001-via-node_1
   :parameters (?attacker - node ?target - node)
   :precondition (and (has-compromised ?attacker) (has-system-config windows-7-spi node-001) (has-system-config 19216112 node-001) (has-compromised node_1))
   :effect (and (has-compromised node-001) (has-compromised node-001-via-node_1))
  )


  (:action compromise-node-001-via-node_2
   :parameters (?attacker - node ?target - node)
   :precondition (and (has-compromised ?attacker) (has-system-config windows-7-spi node-001) (has-system-config 19216112 node-001) (has-compromised node_2))
   :effect (and (has-compromised node-001) (has-compromised node-001-via-node_2))
  )


  (:action compromise-service-002
   :parameters (?attacker - node ?target - node)
   :precondition (and (has-compromised ?attacker) (has-system-config big-ip-1501 service-002) (has-system-config 19216159 service-002) (has-system-config 8080 service-002) (has-system-config http service-002) (has-source tmui service-002) (has-reason undisclosed-pages service-002) (has-user-interaction no service-002) (has-trigger accessing-unspecified-vulnerable-pages service-002) (has-access remote service-002) (has-privilege unauthenticated service-002) (has-attacker-action execute-remote-code service-002) (has-consequence execution-of-arbitrary-code service-002) (has-cve cve-2020-5902 service-002))
   :effect (and  (has-compromised service-002))
  )


  (:action compromise-service-001
   :parameters (?attacker - node ?target - node)
   :precondition (and (has-compromised ?attacker) (has-system-config wordpress-540 service-001) (has-system-config 19216126 service-001) (has-system-config 80 service-001) (has-system-config http service-001) (has-source media-section-file-upload service-001) (has-reason special-crafted-file-name-handling service-001) (has-user-interaction no service-001) (has-trigger uploading-file service-001) (has-access local service-001) (has-privilege authenticated-user service-001) (has-attacker-action upload-files-with-specially-crafted-name service-001) (has-consequences arbitrary-script-execution service-001) (has-cve cve-2020-11026 service-001))
   :effect (and  (has-compromised service-001))
  )

)
