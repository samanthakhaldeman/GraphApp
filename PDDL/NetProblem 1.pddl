(define (problem netproblem)
  (:domain netdomain)
  (:objects
    web-server sql-server dns-server admin-server ftp-server mail-server - node
    windows-7-spi-or-windows-server-2008-r2-spi-or-windows-8-or-windows-8-1-or-windows-server-2012-gold-or-windows-server-2012-r2 - system
    http-dot-system - function
    execute-arbitrary-code - capability
    http-dot-sys-remote-code-execution-vulnerability - vulnerability
    crafted-http-requests - struct
    
    big-ip-15-dot-0-dot-0-15-dot-1-dot-0-dot-3-or-14-dot-1-dot-0-14-dot-1-dot-2-dot-5-or-13-dot-1-dot-0-13-dot-1-dot-3-dot-3-or-12-dot-1-dot-0-12-dot-1-dot-5-dot-1-and-11-dot-6-dot-1-11-dot-6-dot-5-dot-1 - system
    tmui-configuration-utility - driver
    remote-code-execution-rce-vulnerability - vulnerability
    undisclosed-pages - cause

     ; mail server
    windows-xp-64-bit-edition-or-windows-server-2003-or-windows-server-2003-64-bit-edition-or-exchange-server-2003-or-exchange-routing-engine-component - system
    smtp-component - driver
    exchange-routing-engine-component - driver
    arbitrary-code-execution-via-malicious-dns-response - vulnerability
    malicious-dns-response-message-with-improper-length-values - cause

    v-webmail-1-dot-5-dot-0 - system
    login-page-includes-local-dot-hooks-dot-php - driver
    session-id-validation - driver
    sensitive-information-disclosure-via-malformed-input - vulnerability
    sensitive-information-disclosure-via-invalid-session-id - vulnerability
    malformed-input-in-login-page - cause
    invalid-session-id - cause
    obtain-sensitive-information - capability
    installation-path-disclosure-in-error-message - struct

    ;dns server    
    dnsmasq-before-2-dot-78 - system
    dns-response-processing - driver
    heap-based-buffer-overflow - vulnerability
    crafted-dns-response - struct
    denial-of-service-crash - capability

    windows-dns-server - system
    request-handling - driver
    windows-dns-server-remote-code-execution-vulnerability - vulnerability
    improper-request-handling - cause
    
    ;sql
    postgresql-9-dot-3-through-10 - system
    query-behavior-modification - driver
    code-execution-with-superuser-permissions - vulnerability
    allowed-user-to-modify-query-behavior - cause
    execute-code-with-superuser-permissions - capability
    
    mongodb-go-driver-up-to-and-including-1-dot-5-dot-0 - system
    marshalling-go-objects - struct
    bson - driver
    improper-validation-of-cstrings-vulnerability - vulnerability
    specific-cstrings-input-not-properly-validated - cause
    inject-additional-fields-into-marshalled-documents - capability

    gitlab-runner-before-13-dot-0-dot-12-or-13-dot-1-dot-6-or-13-dot-2-dot-3 - system
    shared-runner-dockerd-replacement - driver
    replacing-dockerd-with-malicious-server - cause
    susceptible-to-ssrf - capability
    ssrf-via-malicious-dockerd-server - vulnerability
    
     ;ftp
    simple-machines-forum-before-2-dot-0-dot-6-or-2-dot-1 - system
    avatar-upload-functionality - driver
    unrestricted-file-upload-vulnerability - vulnerability
    uploading-file-with-executable-extension - cause
    direct-request - struct
    file-in-an-unspecified-directory - function

    Windows-7-or-8-or-8-dot-1-or-10-or-Windows-Server-2012-or-2008-or-2012-or-2008-R2-or-2012-R2-or-2016-or-10 - system
    FTP-connection-handling - driver
    Windows-FTP-Server-Denial-of-Service-Vulnerability - vulnerability
    improper-handling-of-FTP-connections - cause
    denial-of-service - capability

    pure-ftpd-1-dot-0-dot-49 - system
    pure_strcmp-function - function
    utils-dot-c - struct
    oob-read-vulnerability - vulnerability
    out-of-bounds-read-in-pure_strcmp - cause
    read-sensitive-information - capability

    ;admin
    ganglia-3-dot-1-dot-1 - system
    process_path-function - function
    gmetad-slash-server-dot-c - driver
    stack-based-buffer-overflow-vulnerability - vulnerability
    long-pathname-request-to-gmetad-service - struct
    cause-denial-of-service-crash - capability

    apache-http-server-2-dot-4-dot-17-to-2-dot-4-dot-38 - system
    mpm-event-worker-or-prefork - driver
    arbitrary-code-execution-via-scoreboard-manipulation - vulnerability
    manipulating-the-scoreboard - cause
    less-privileged-child-processes-or-threads - struct
    scripts-executed-by-an-in-process-scripting-interpreter - struct
    execute-arbitrary-code-with-parent-process-privileges - capability 

    
    gateway-192-168-1-1  gateway-192-168-2-1 gateway-192-168-3-1 gateway-192-168-4-1 gateway-192-168-5-1 gateway-192-168-6-1 - accesstoken
    p-80 p-25 p-1433 p-53 p-20 p-1311 - port
    http smtp sql dns tcp https - protocol
    attacker1 - adversary
    internet - connection
  )
  (:init
        (has-attacker attacker1)
        (has-web-port p-80)
        (at-web web-server)
        (has-web-protocol http)
        (has-remote-connection internet)
        (has-ip-access-web gateway-192-168-1-1)
        (has-webserver-system-1-config windows-7-spi-or-windows-server-2008-r2-spi-or-windows-8-or-windows-8-1-or-windows-server-2012-gold-or-windows-server-2012-r2)
        (has-vul-web-function-1 http-dot-system)
        (has-web-vulnerability-1 http-dot-sys-remote-code-execution-vulnerability)
        (has-vul-web-struct-1 crafted-http-requests)
        (execute-capability-in-web-system-1 execute-arbitrary-code)
        
        (has-web-cause-2 undisclosed-pages)
        (has-web-vulnerability-2 remote-code-execution-rce-vulnerability)
        (has-web-driver-2 tmui-configuration-utility)
        (execute-capability-in-web-system-2 execute-arbitrary-code)
        (has-webserver-system-2-config big-ip-15-dot-0-dot-0-15-dot-1-dot-0-dot-3-or-14-dot-1-dot-0-14-dot-1-dot-2-dot-5-or-13-dot-1-dot-0-13-dot-1-dot-3-dot-3-or-12-dot-1-dot-0-12-dot-1-dot-5-dot-1-and-11-dot-6-dot-1-11-dot-6-dot-5-dot-1)
      
        ;mail server
        (has-ip-access-mail gateway-192-168-3-1)
        (has-connected-node-via-router-3 web-server mail-server)
        (has-mail-port p-25)
        (has-mail-protocol smtp)

        (has-mail-vulnerability-1 arbitrary-code-execution-via-malicious-dns-response)
        (has-vul-mail-driver-1-dot-1 smtp-component)
        (has-vul-mail-driver-1-dot-2 exchange-routing-engine-component)
        (has-mailserver-cause-1 malicious-dns-response-message-with-improper-length-values)
        (has-capability-in-mail-system-1 execute-arbitrary-code)
        (has-mailserver-system-1-config windows-xp-64-bit-edition-or-windows-server-2003-or-windows-server-2003-64-bit-edition-or-exchange-server-2003-or-exchange-routing-engine-component)
  
        (has-mailserver-system-2-config v-webmail-1-dot-5-dot-0)
        (has-mail-vulnerability-2-dot-1 sensitive-information-disclosure-via-malformed-input)
        (has-mail-vulnerability-2-dot-2 sensitive-information-disclosure-via-invalid-session-id)
        (has-vul-mail-driver-2-dot-1 login-page-includes-local-dot-hooks-dot-php)
        (has-vul-mail-driver-2-dot-2 session-id-validation)
        (has-mailserver-cause-1-dot-1  malformed-input-in-login-page)
        (has-mailserver-cause-2-dot-1 invalid-session-id)
        (execute-capability-in-mail-system-2 obtain-sensitive-information)
        (has-vul-mail-struct-2 installation-path-disclosure-in-error-message)

        ;dns server
        ;(has-dns-port p-53)
        (has-dns-protocol dns)
        (at-dns dns-server)
        (has-ip-access-dns gateway-192-168-2-1)
        (has-dns-vulnerability-1 heap-based-buffer-overflow)
        (has-vul-dns-struct-1 crafted-dns-response)
        (execute-capability-in-dns-system-1 denial-of-service-crash)
        (has-dnsserver-system-1-config dnsmasq-before-2-dot-78)
        
        (has-dns-cause-2 improper-request-handling)
        (has-dns-vulnerability-2 windows-dns-server-remote-code-execution-vulnerability)
        (has-dns-driver-2 request-handling)
        (execute-capability-in-dns-system-2 execute-arbitrary-code)
        (has-dnsserver-system-2-config windows-dns-server)
        
        ;sql server
        (has-sql-port p-1433)
        (has-sql-protocol sql)
        (has-ip-access-sql gateway-192-168-4-1)
        (has-connected-node-via-router-4 mail-server sql-server)
        (has-sqlserver-system-1-config postgresql-9-dot-3-through-10)
        (has-sql-vulnerability-1 code-execution-with-superuser-permissions)
        (execute-capability-in-sql-system-1 execute-code-with-superuser-permissions)
        (has-sql-driver-1 query-behavior-modification)
        (has-sql-cause-1 allowed-user-to-modify-query-behavior)
        
        (has-sqlserver-system-2-config gitlab-runner-before-13-dot-0-dot-12-or-13-dot-1-dot-6-or-13-dot-2-dot-3)
        (has-sql-vulnerability-2 ssrf-via-malicious-dockerd-server)
        (execute-capability-in-sql-system-2 susceptible-to-ssrf)
        (has-sql-driver-2 shared-runner-dockerd-replacement)
        (has-sql-cause-2 replacing-dockerd-with-malicious-server)

        (has-connected-node-via-router-5 dns-server sql-server)
        (has-sqlserver-system-3-config mongodb-go-driver-up-to-and-including-1-dot-5-dot-0)
        (has-sql-vulnerability-3 improper-validation-of-cstrings-vulnerability)
        (execute-capability-in-sql-system-3 inject-additional-fields-into-marshalled-documents)
        (has-sql-driver-3 bson)
        (has-vul-sql-struct-3 marshalling-go-objects)
        (has-sql-cause-3 specific-cstrings-input-not-properly-validated)
        
        ;ftp server
        (has-ip-access-ftp gateway-192-168-5-1)
        (has-connected-node-via-router-4 mail-server ftp-server)
        (has-connected-node-via-router-6 sql-server ftp-server)
        (has-connected-node-via-router-5 dns-server ftp-server)
        (has-ftp-port p-20)
        (has-ftp-protocol tcp)

        (has-ftpserver-system-1-config simple-machines-forum-before-2-dot-0-dot-6-or-2-dot-1)
        (has-ftp-vulnerability-1 unrestricted-file-upload-vulnerability)
        (execute-capability-in-ftp-system-1 execute-arbitrary-code)
        (has-ftp-driver-1 avatar-upload-functionality)
        (has-ftp-cause-1 uploading-file-with-executable-extension)
        (has-vul-ftp-struct-1 direct-request)
        (has-vul-ftp-function-1 file-in-an-unspecified-directory)

        (has-ftpserver-system-2-config pure-ftpd-1-dot-0-dot-49)
        (has-ftp-vulnerability-2 oob-read-vulnerability)
        (execute-capability-in-ftp-system-2 read-sensitive-information)
        (has-ftp-cause-2 out-of-bounds-read-in-pure_strcmp)
        (has-vul-ftp-struct-2 utils-dot-c)
        (has-vul-ftp-function-2 pure_strcmp-function)

        (has-ftpserver-system-3-config  Windows-7-or-8-or-8-dot-1-or-10-or-Windows-Server-2012-or-2008-or-2012-or-2008-R2-or-2012-R2-or-2016-or-10)
        (has-ftp-vulnerability-3 Windows-FTP-Server-Denial-of-Service-Vulnerability)
        (execute-capability-in-ftp-system-3 denial-of-service)
        (has-ftp-driver-3 FTP-connection-handling)
        (has-ftp-cause-3 improper-handling-of-FTP-connections)

        ;admin server
        (has-ip-access-admin gateway-192-168-4-1)
        (has-connected-node-via-router-7 ftp-server admin-server)
        ;(has-connected-node-via-router-5 dns-server admin-server)
        (has-connected-node-via-router-8 sql-server admin-server)         
        (has-admin-protocol https)
        (has-admin-port p-1311)

        (has-adminserver-system-1-config ganglia-3-dot-1-dot-1)
        (has-admin-vulnerability-1 stack-based-buffer-overflow-vulnerability)
        (execute-capability-in-admin-system-1 cause-denial-of-service-crash)
        (has-admin-driver-1 gmetad-slash-server-dot-c)
        (has-vul-admin-struct-1 long-pathname-request-to-gmetad-service)
        (has-vul-admin-function-1 process_path-function)

        (has-adminserver-system-2-config apache-http-server-2-dot-4-dot-17-to-2-dot-4-dot-38)
        (has-admin-vulnerability-2 arbitrary-code-execution-via-scoreboard-manipulation)
        (execute-capability-in-admin-system-2 execute-arbitrary-code-with-parent-process-privileges)
        (has-admin-driver-2 mpm-event-worker-or-prefork)
        (has-vul-admin-struct-2 less-privileged-child-processes-or-threads)
        (has-vul-admin-struct-2 scripts-executed-by-an-in-process-scripting-interpreter)
        (has-admin-cause-2 manipulating-the-scoreboard)

        ;Has init
        ;(exploited-dns dns-server)
        ;(exploited-sql sql-server)
        ;(exploited-mail mail-server)
        
  )
  (:goal (and
               ;(exploited-dns dns-server)
               ;(exploited-web web-server)
               ;(exploited-mail mail-server)
               ;(exploited-sql sql-server)
               ;(exploited-ftp ftp-server)
               ;(exploited-admin admin-server)
               ;(at-ftp ftp-server)
               (at-admin admin-server)
               ;(at-sql sql-server)
               ;(at-mail mail-server)
  ))
)
