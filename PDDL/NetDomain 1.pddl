(define (domain netdomain)
  (:requirements :strips :typing)
  (:types node vulnerability function sourcecode struct driver capability system cause adversary connection accesstoken port protocol)
  
  (:predicates
    (at-sql ?node - node)
    (at-ftp ?node - node)
    (at-admin ?node - node)
    (at-mail ?node - node)

   (has-service-up ?Node - node) 
   (has-attacker ?atk - adversary)
   (has-remote-connection ?internet - connection)
   (has-ip-access-web ?access - accesstoken)
  ;  (has-connected-node-via-router-1 ?to - node)
  ;  (has-connected-node-via-router-2 ?to - node)
   (has-connected-node-via-router-3 ?from ?to - node)
   (has-connected-node-via-router-4 ?from ?to - node)
   (has-connected-node-via-router-5 ?from ?to - node)
   (has-connected-node-via-router-6 ?from ?to - node)
   (has-connected-node-via-router-7 ?from ?to - node)
   (has-connected-node-via-router-8 ?from ?to - node)
                                            ; ::::: predicates for web-server node ::::::::
   (at-web ?node - node)
   (has-web-port ?port - port)
   (has-web-protocol ?protocol - protocol)
   (has-access-to-webserver-node ?node - node ?atk - adversary)
   (has-webserver-system-1-config ?sys - system)
   (has-vul-web-function-1 ?fun - function)
   (has-web-vulnerability-1 ?vuln - vulnerability)
   (has-vul-web-struct-1 ?struct - struct)
   (exploited-web ?node - node)
   (execute-capability-in-web-system-1 ?code - capability)
   
   (has-webserver-system-2-config ?sys - system)
   (has-web-vulnerability-2 ?vuln - vulnerability)
   (has-web-cause-2 ?cause - cause)
   (has-web-driver-2 ?driver - driver)
   (execute-capability-in-web-system-2 ?code - capability)
   
                                            ; ::::: predicates for dns node ::::::::  
  
   (at-dns ?node - node)
   (has-dns-port ?port - port)
   (has-dns-protocol ?protocol - protocol)
   (has-access-to-dns-server-node ?node - node ?atk - adversary)
   (exploited-dns ?node - node)
   (has-ip-access-dns ?access - accesstoken)
   (has-dnsserver-system-1-config ?sys - system)
   (has-dns-vulnerability-1 ?vuln - vulnerability)
   (has-vul-dns-struct-1 ?struct - struct)
   (execute-capability-in-dns-system-1 ?code - capability)
   
   (has-dnsserver-system-2-config ?sys - system)
   (has-dns-vulnerability-2 ?vuln - vulnerability)
   (execute-capability-in-dns-system-2 ?code - capability)
   (has-dns-driver-2 ?driver - driver)
   (has-dns-cause-2 ?cause - cause)
                                             ; ::::: predicates for sql node :::::::: 
  
  (has-sql-port ?port - port)
  (has-sql-protocol ?protocol - protocol)
  (has-access-to-sql-server-node ?to - node ?atk - adversary)
  (has-ip-access-sql ?ip - accesstoken)
  (exploited-sql ?node - node)
  (has-sqlserver-system-1-config ?sys - system)
  (has-sql-vulnerability-1 ?vuln - vulnerability)
  (execute-capability-in-sql-system-1 ?code - capability)
  (has-sql-driver-1 ?driver - driver)
  (has-sql-cause-1 ?cause - cause)
  
  (has-sqlserver-system-2-config ?sys - system)
  (has-sql-vulnerability-2 ?vuln - vulnerability)
  (execute-capability-in-sql-system-2 ?code - capability)
  (has-sql-driver-2 ?driver - driver)
  (has-sql-cause-2 ?cause - cause)

  (has-access-to-sql-server-via-dns ?to - node ?atk - adversary)
  (has-sqlserver-system-3-config ?sys - system)
  (has-sql-vulnerability-3 ?vuln - vulnerability)
  (execute-capability-in-sql-system-3 ?code - capability)
  (has-sql-driver-3 ?driver - driver)
  (has-vul-sql-struct-3 ?struct - struct)
  (has-sql-cause-3 ?cause - cause)
                                             ; ::::: predicates for ftp node ::::::::   
  (has-ip-access-ftp ?ip - accesstoken)
  (has-ftp-port ?port - port)
  (has-ftp-protocol ?protocol - protocol)
  (exploited-ftp ?node - node)
  
  (has-ftpserver-system-1-config ?sys - system)
  (has-ftp-vulnerability-1 ?vuln - vulnerability)
  (execute-capability-in-ftp-system-1 ?code - capability)
  (has-ftp-driver-1 ?driver - driver)
  (has-ftp-cause-1 ?cause - cause)
  (has-vul-ftp-struct-1 ?struct - struct)
  (has-vul-ftp-function-1 ?fun - function)
  (has-access-to-ftp-server-via-mail ?to - node ?atk - adversary)
  
  (has-ftpserver-system-2-config ?sys - system)
  (has-ftp-vulnerability-2 ?vuln - vulnerability)
  (execute-capability-in-ftp-system-2 ?code - capability)

  (has-ftp-cause-2 ?cause - cause)
  (has-vul-ftp-struct-2 ?struct - struct)
  (has-vul-ftp-function-2 ?fun - function)
  (has-access-to-ftp-server-via-sql ?to - node ?atk - adversary)

    (has-access-to-ftp-server-via-dns ?to - node ?atk - adversary)
    (has-ftpserver-system-3-config ?sys - system)
    (has-ftp-vulnerability-3 ?vuln - vulnerability)
    (execute-capability-in-ftp-system-3 ?code - capability)
    (has-ftp-driver-3 ?driver - driver)
    (has-ftp-cause-3 ?cause - cause)
  
    ;admin server
  (has-ip-access-admin ?ip - accesstoken)
  (has-access-to-admin-server-via-ftp ?to - node ?atk - adversary)
  (has-access-to-admin-server-via-dns ?to - node ?atk - adversary)
  (has-admin-protocol ?protocol - protocol)
  (has-admin-port ?port - port)


    (exploited-admin ?node - node)
    (has-adminserver-system-1-config ?sys - system)
    (has-admin-vulnerability-1 ?vuln - vulnerability)
    (execute-capability-in-admin-system-1 ?code - capability)
    (has-admin-driver-1 ?driver - driver)
    (has-vul-admin-struct-1 ?struct - struct)
    (has-vul-admin-function-1 ?fun - function)
    (has-adminserver-system-2-config ?sys - system)
    (has-admin-vulnerability-2 ?vuln - vulnerability)
    (execute-capability-in-admin-system-2 ?code - capability)
    (has-admin-driver-2 ?driver - driver)
    (has-vul-admin-struct-2 ?struct - struct)
    (has-admin-cause-2 ?cause - cause)


    (has-access-to-mail-server-node ?node - node ?atk - adversary)
    (has-mail-vulnerability-1 ?vuln - vulnerability)
    (has-vul-mail-driver-1-dot-1 ?driver - driver)
    (has-vul-mail-driver-1-dot-2 ?driver - driver)
    (has-mailserver-system-1-config ?sys - system)
    (has-mailserver-cause-1 ?cause - cause)
    (has-ip-access-mail ?ip - accesstoken)
    (has-capability-in-mail-system-1 ?code - capability)
    (exploited-mail ?node - node)
    (has-mail-port ?port - port)
    (has-mail-protocol ?protocol - protocol)

    
    (has-mailserver-system-2-config ?sys - system)
    (has-mail-vulnerability-2-dot-1 ?v1 - vulnerability)
    (has-mail-vulnerability-2-dot-2 ?v2 - vulnerability)
    (has-vul-mail-driver-2-dot-1 ?driver1 - driver)
    (has-vul-mail-driver-2-dot-2 ?driver2 - driver)
    (has-mailserver-cause-1-dot-1 ?cause1 - cause)
    (has-mailserver-cause-2-dot-1 ?cause2 - cause)
    (execute-capability-in-mail-system-2 ?code - capability)
    (has-vul-mail-struct-2 ?struct - struct)


)  
  (:action attacker-has-access-to-webserver
    :parameters (?node - node ?atk - adversary ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (has-attacker ?atk)
                        (has-remote-connection ?internet)
                        (has-ip-access-web ?ip)
                        (has-web-port ?port)
                        (has-web-protocol ?protocol)
                        (at-web ?node)

                  )
    :effect (and
                (has-access-to-webserver-node ?node ?atk)
                
    )
  )
    (:action attacker-exploit-cve-2015-1635-to-compromise-web-server
      :parameters (?node - node ?atk - adversary ?sys - system ?fun - function ?vuln - vulnerability ?struct - struct ?code - capability)
      :precondition (and 
                        (has-access-to-webserver-node ?node ?atk)
                        (has-vul-web-function-1 ?fun)
                        (has-web-vulnerability-1 ?vuln)
                        (has-vul-web-struct-1 ?struct)
                        (execute-capability-in-web-system-1 ?code)
                        (has-webserver-system-1-config ?sys)
                    )
      :effect (and
                    (exploited-web ?node)
                    (has-service-up ?node)
      )
  )
   (:action attacker-exploit-cve-2020-5902-to-compromise-web-server
      :parameters (?node - node ?atk - adversary ?sys - system ?cause - cause ?vuln - vulnerability ?driver - driver ?code - capability)
      :precondition (and 
                        (has-access-to-webserver-node ?node ?atk)
                        (has-web-cause-2 ?cause)
                        (has-web-vulnerability-2 ?vuln)
                        (has-web-driver-2 ?driver)
                        (execute-capability-in-web-system-2 ?code)
                        (has-webserver-system-2-config ?sys)
                    )
      :effect (and
                    (exploited-web ?node)
                    (has-service-up ?node)
      )
  )
                                                ; ::::: actions for mail-server node ::::::::      
  (:action attacker-has-access-to-mail-server
    :parameters (?from ?to - node ?atk - adversary ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (exploited-web ?from)
                        (has-attacker ?atk)
                        (has-remote-connection ?internet)
                        (has-connected-node-via-router-3 ?from ?to)
                        (has-ip-access-mail ?ip)
                        (has-mail-port ?port)
                        (has-mail-protocol ?protocol)
                  )
    :effect (and
                (has-access-to-mail-server-node ?to ?atk)
                
    )
  )
    (:action attacker-exploit-cve-2004-0840-to-compromise-mail-server
      :parameters (?node - node ?atk - adversary ?sys - system ?vuln - vulnerability ?driver1 ?driver2 - driver ?cause - cause ?code - capability)
      :precondition (and 
                        (has-access-to-mail-server-node ?node ?atk)
                        (has-mailserver-system-1-config ?sys)
                        (has-mail-vulnerability-1 ?vuln)
                        (has-vul-mail-driver-1-dot-1 ?driver1)
                        (has-vul-mail-driver-1-dot-2 ?driver2)
                        (has-mailserver-cause-1 ?cause)
                        (has-capability-in-mail-system-1 ?code)
                    )
      :effect (and
                    (exploited-mail ?node)
                    (has-service-up ?node)
      )
  )
    (:action attacker-exploit-cve-2008-3060-to-compromise-mail-server
      :parameters (?node - node ?atk - adversary ?sys - system ?v1 ?v2 - vulnerability ?driver1 - driver ?driver2 - driver ?cause1 ?cause2 - cause ?code - capability ?struct - struct)
      :precondition (and 
                        (has-access-to-mail-server-node ?node ?atk)
                        (has-mailserver-system-2-config ?sys)
                        (has-mail-vulnerability-2-dot-1 ?v1)
                        (has-mail-vulnerability-2-dot-2 ?v2)
                        (has-vul-mail-driver-2-dot-1 ?driver1)
                        (has-vul-mail-driver-2-dot-2 ?driver2)
                        (has-mailserver-cause-1-dot-1 ?cause1)
                        (has-mailserver-cause-2-dot-1 ?cause2)
                        (execute-capability-in-mail-system-2 ?code)
                        (has-vul-mail-struct-2 ?struct)

                    )
      :effect (and
                    (exploited-mail ?node)
                    (has-service-up ?node)
      )
  )

;                                               ; ::::: actions for dns-server node ::::::::
 (:action attacker-has-access-to-dns-server
    :parameters (?node - node ?atk - adversary ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (has-attacker ?atk)
                        (has-remote-connection ?internet)
                        (has-ip-access-dns ?ip)
                        (has-dns-port ?port)
                        (has-dns-protocol ?protocol)

                  )
    :effect (and
                (has-access-to-dns-server-node ?node ?atk)
                
    )
  )
(:action attacker-exploit-cve-2017-14491-to-compromise-dns-server
      :parameters (?node - node ?atk - adversary ?sys - system ?vuln - vulnerability ?struct - struct ?code - capability)
      :precondition (and 
                        (has-access-to-dns-server-node ?node ?atk)
                        (has-dns-vulnerability-1 ?vuln)
                        (has-vul-dns-struct-1 ?struct)
                        (execute-capability-in-dns-system-1 ?code)
                        (has-dnsserver-system-1-config ?sys)
                    )
      :effect (and
                    (exploited-dns ?node)
                    (not (has-service-up ?node))
                    
      )
  )
   (:action attacker-exploit-cve-2020-1350-to-compromise-dns-server
      :parameters (?node - node ?atk - adversary ?sys - system ?cause - cause ?vuln - vulnerability ?driver - driver ?code - capability)
      :precondition (and 
                        (has-access-to-dns-server-node ?node ?atk)
                        (has-dns-cause-2 ?cause)
                        (has-dns-vulnerability-2 ?vuln)
                        (has-dns-driver-2 ?driver)
                        (execute-capability-in-dns-system-2 ?code)
                        (has-dnsserver-system-2-config ?sys)
                    )
      :effect (and
                    (exploited-dns ?node)
                    (has-service-up ?node)
      )
  )
                                              ; ::::: actions for sql-server node ::::::::
  
  (:action attacker-has-access-to-sql-server-via-mail-server
    :parameters (?from ?to - node ?atk - adversary ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (exploited-mail ?from)
                        (has-service-up ?from)
                        (has-connected-node-via-router-4 ?from ?to)
                        (has-attacker ?atk)
                        (has-remote-connection ?internet)
                        (has-ip-access-sql ?ip)
                        (has-sql-port ?port)
                        (has-sql-protocol ?protocol)

                  )
    :effect (and
                (has-access-to-sql-server-node ?to ?atk)
                
    )
  )
  (:action attacker-exploit-cve-2018-1058-to-compromise-sql-server
      :parameters (?node - node ?atk - adversary ?sys - system ?cause - cause ?vuln - vulnerability ?driver - driver ?code - capability)
      :precondition (and 
                        (has-access-to-sql-server-node ?node ?atk)
                        (has-sqlserver-system-1-config ?sys)
                        (has-sql-vulnerability-1 ?vuln)
                        (execute-capability-in-sql-system-1 ?code)
                        (has-sql-driver-1 ?driver)
                        (has-sql-cause-1 ?cause)
                    )
      :effect (and
                    (exploited-sql ?node)
                    (has-service-up ?node)
      )
  )
(:action attacker-exploit-cve-2020-13295-to-compromise-sql-server
      :parameters (?node - node ?atk - adversary ?sys - system ?cause - cause ?vuln - vulnerability ?driver - driver ?code - capability )
      :precondition (and 
                        (has-access-to-sql-server-node ?node ?atk)
                        (has-sqlserver-system-2-config ?sys)
                        (has-sql-vulnerability-2 ?vuln)
                        (execute-capability-in-sql-system-2 ?code)
                        (has-sql-driver-2 ?driver)
                        (has-sql-cause-2 ?cause)
                    )
      :effect (and
                    (exploited-sql ?node)
                    (has-service-up ?node)
      )
  )

(:action attacker-has-access-to-sql-server-via-dns-server
    :parameters (?from ?to - node ?atk - adversary ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (exploited-dns ?from)
                        (has-service-up ?from)
                        (has-connected-node-via-router-5 ?from ?to)
                        (has-attacker ?atk)
                        (has-remote-connection ?internet)
                        (has-ip-access-sql ?ip)
                        (has-sql-port ?port)
                        (has-sql-protocol ?protocol)

                  )
    :effect (and
                (has-access-to-sql-server-via-dns ?to ?atk)
                
    )
)
  (:action attacker-exploit-cve-2021-20329-to-compromise-sql-server
      :parameters (?node - node ?atk - adversary ?cause - cause ?sys - system ?vuln - vulnerability ?driver - driver ?code - capability ?struct - struct)
      :precondition (and 
                        (has-access-to-sql-server-via-dns ?node ?atk)
                        (has-sqlserver-system-3-config ?sys)
                        (has-sql-vulnerability-3 ?vuln)
                        (execute-capability-in-sql-system-3 ?code)
                        (has-sql-driver-3 ?driver)
                        (has-vul-sql-struct-3 ?struct)
                        (has-sql-cause-3 ?cause)
                    )
      :effect (and
                    (exploited-sql ?node)
                    (has-service-up ?node)
      )
  )
;                                               ; ::::: actions for ftp-server node ::::::::
                                              
  (:action attacker-has-access-to-ftp-server-via-mail-server
    :parameters (?from ?to - node ?atk - adversary ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (exploited-mail ?from)
                        (has-service-up ?from)
                        (has-connected-node-via-router-4 ?from ?to)
                        (has-attacker ?atk)
                        (has-remote-connection ?internet)
                        (has-ip-access-ftp ?ip)
                        (has-ftp-port ?port)
                        (has-ftp-protocol ?protocol)

                  )
    :effect (and
                (has-access-to-ftp-server-via-mail ?to ?atk)
                
    )
  )
  (:action attacker-has-access-to-ftp-server-via-dns-server
    :parameters (?from ?to - node ?atk - adversary ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (exploited-dns ?from)
                        (has-service-up ?from)
                        (has-connected-node-via-router-5 ?from ?to)
                        (has-attacker ?atk)
                        (has-remote-connection ?internet)
                        (has-ip-access-ftp ?ip)
                        (has-ftp-port ?port)
                        (has-ftp-protocol ?protocol)

                  )
    :effect (and
                (has-access-to-ftp-server-via-dns ?to ?atk)
                
    )
  )
  (:action attacker-has-access-to-ftp-server-via-sql-server
    :parameters (?from - node ?to - node ?atk - adversary ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (exploited-sql ?from)
                        (has-service-up ?from)
                        (has-connected-node-via-router-6 ?from ?to)
                        (has-attacker ?atk)
                        (has-remote-connection ?internet)
                        (has-ip-access-ftp ?ip)
                        (has-ftp-port ?port)
                        (has-ftp-protocol ?protocol)

                  )
    :effect (and
                (has-access-to-ftp-server-via-sql ?to ?atk)
                
    )
)
(:action attacker-exploit-cve-2013-4465-to-compromise-ftp-server
      :parameters (?node - node ?atk - adversary ?sys - system ?cause - cause ?vuln - vulnerability ?driver - driver ?code - capability ?struct - struct ?fun - function)
      :precondition (and 
                        (has-access-to-ftp-server-via-mail ?node ?atk)
                        (has-ftpserver-system-1-config ?sys)
                        (has-ftp-vulnerability-1 ?vuln)
                        (execute-capability-in-ftp-system-1 ?code)
                        (has-ftp-driver-1 ?driver)
                        (has-ftp-cause-1 ?cause)
                        (has-vul-ftp-struct-1 ?struct)
                        (has-vul-ftp-function-1 ?fun)
                    )
      :effect (and
                    (exploited-ftp ?node)
                    (has-service-up ?node)
      )
  )
  (:action attacker-exploit-cve-2018-8206-to-compromise-ftp-server
      :parameters (?node - node ?atk - adversary ?sys - system ?cause - cause ?vuln - vulnerability ?driver - driver ?code - capability)
      :precondition (and 
                        (has-access-to-ftp-server-via-dns ?node ?atk)
                        (has-ftpserver-system-3-config ?sys)
                        (has-ftp-vulnerability-3 ?vuln)
                        (execute-capability-in-ftp-system-3 ?code)
                        (has-ftp-driver-3 ?driver)
                        (has-ftp-cause-3 ?cause)
                    )
      :effect (and
                    (exploited-ftp ?node)
                    (not (has-service-up ?node))
      )
  )
    (:action attacker-exploit-cve-2020-9365-to-compromise-ftp-server
      :parameters (?node - node ?atk - adversary ?sys - system ?cause - cause ?vuln - vulnerability ?driver - driver ?code - capability ?struct - struct ?fun - function)
      :precondition (and 
                        (has-access-to-ftp-server-via-sql ?node ?atk)
                        (has-ftpserver-system-2-config ?sys)
                        (has-ftp-vulnerability-2 ?vuln)
                        (execute-capability-in-ftp-system-2 ?code)
                        (has-ftp-cause-2 ?cause)
                        (has-vul-ftp-struct-2 ?struct)
                        (has-vul-ftp-function-2 ?fun)
                    )
      :effect (and
                    (exploited-ftp ?node)
                    (has-service-up ?node)
      )
  )
                                              ; ::::: actions for admin-server node ::::::::
                                              
  (:action attacker-has-access-to-admin-server-via-ftp-server
    :parameters (?from ?to - node ?atk - adversary ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (exploited-ftp ?from)
                        (has-service-up ?from)
                        (has-connected-node-via-router-7 ?from ?to)
                        (has-attacker ?atk)
                        (has-remote-connection ?internet)
                        (has-ip-access-admin ?ip)
                        (has-admin-port ?port)
                        (has-admin-protocol ?protocol)

                  )
    :effect (and
                (has-access-to-admin-server-via-ftp ?to ?atk)
                
    )
  )

(:action attacker-has-access-to-admin-server-via-dns-server
    :parameters (?from ?to - node ?atk - adversary ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (exploited-dns ?from)
                        (has-service-up ?from)
                        (has-connected-node-via-router-5 ?from ?to)
                        (has-attacker ?atk)
                        (has-remote-connection ?internet)
                        (has-ip-access-admin ?ip)
                        (has-ftp-port ?port)
                        (has-ftp-protocol ?protocol)

                  )
    :effect (and
                (has-access-to-admin-server-via-dns ?to ?atk)
                
    )
)
(:action attacker-exploit-cve-2009-0241-to-compromise-admin-server
      :parameters (?node - node ?atk - adversary ?sys - system ?vuln - vulnerability ?driver - driver ?code - capability ?struct - struct ?fun - function)
      :precondition (and 
                        (has-access-to-admin-server-via-ftp ?node ?atk)
                        (has-adminserver-system-1-config ?sys)
                        (has-admin-vulnerability-1 ?vuln)
                        (execute-capability-in-admin-system-1 ?code)
                        (has-admin-driver-1 ?driver)
                        (has-vul-admin-struct-1 ?struct)
                        (has-vul-admin-function-1 ?fun)
                    )
      :effect (and
                    (exploited-admin ?node)
                    (has-service-up ?node)
      )
  )
  (:action attacker-exploit-cve-2019-0211-to-compromise-admin-server
      :parameters (?node - node ?atk - adversary ?cause - cause ?sys - system ?vuln - vulnerability ?driver - driver ?code - capability ?struct - struct)
      :precondition (and 
                        (has-access-to-admin-server-via-dns ?node ?atk)
                        (has-adminserver-system-2-config ?sys)
                        (has-admin-vulnerability-2 ?vuln)
                        (execute-capability-in-admin-system-2 ?code)
                        (has-admin-driver-2 ?driver)
                        (has-vul-admin-struct-2 ?struct)
                        (has-admin-cause-2 ?cause)
                    )
      :effect (and
                    (exploited-admin ?node)
                    (not (has-service-up ?node))
      )
  )
  (:action has-access-to-mail-server
    :parameters (?from ?to - node ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (has-remote-connection ?internet)
                        (at-web ?from)
                        (has-connected-node-via-router-3 ?from ?to)
                        (has-ip-access-mail ?ip)
                        (has-mail-port ?port)
                        (has-mail-protocol ?protocol)
                  )
    :effect (and
                (at-mail ?to)
                
    )
  )
  (:action has-access-to-sql-server-via-mail-server
    :parameters (?from ?to - node ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (at-mail ?from)
                        (has-connected-node-via-router-4 ?from ?to)
                        (has-remote-connection ?internet)
                        (has-ip-access-sql ?ip)
                        (has-sql-port ?port)
                        (has-sql-protocol ?protocol)

                  )
    :effect (and
                (at-sql ?to))
                
    )
  (:action has-access-to-sql-server-via-dns-server
    :parameters (?from ?to - node ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (at-dns ?from)
                        (has-connected-node-via-router-4 ?from ?to)
                        (has-remote-connection ?internet)
                        (has-ip-access-sql ?ip)
                        (has-sql-port ?port)
                        (has-sql-protocol ?protocol)
                  )
    :effect (and
                (at-sql ?to)
                
    )
  )
  (:action has-access-to-admin-server-via-ftp-server
    :parameters (?from ?to - node ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (at-ftp ?from)
                        (has-connected-node-via-router-7 ?from ?to)
                        (has-remote-connection ?internet)
                        (has-ip-access-admin ?ip)
                        (has-admin-port ?port)
                        (has-admin-protocol ?protocol)

                  )
    :effect (and
                (at-admin ?to)
                
    )
  )
  (:action has-access-to-admin-server-via-dns-server
    :parameters (?from ?to - node ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (at-dns ?from)
                        (has-connected-node-via-router-5 ?from ?to)
                        (has-remote-connection ?internet)
                        (has-ip-access-admin ?ip)
                        (has-admin-port ?port)
                        (has-admin-protocol ?protocol)

                  )
    :effect (and
                (at-admin ?to)
                
    )
)
  (:action has-access-to-ftp-server-via-mail-server
    :parameters (?from ?to - node ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (at-mail ?from)
                        (has-connected-node-via-router-4 ?from ?to)
                        (has-remote-connection ?internet)
                        (has-ip-access-ftp ?ip)
                        (has-ftp-port ?port)
                        (has-ftp-protocol ?protocol)

                  )
    :effect (and
                (at-ftp ?to)
                
    )
  )
(:action has-access-to-ftp-server-via-sql-server
    :parameters (?from ?to - node ?internet - connection ?ip - accesstoken ?port - port ?protocol - protocol)
    :precondition (and 
                        (at-sql ?from)
                        (has-connected-node-via-router-6 ?from ?to)
                        (has-remote-connection ?internet)
                        (has-ip-access-ftp ?ip)
                        (has-ftp-port ?port)
                        (has-ftp-protocol ?protocol)

                  )
    :effect (and
                (at-ftp ?to)
                
    )
)
)
