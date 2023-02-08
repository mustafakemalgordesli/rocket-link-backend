# Rocket Link | Link Sharing App

## BASE URL: https://rocket-link-backend.vercel.app/api

### Kullanıcı İşlemleri   {base_url}/users <br>
Kayıt Ol:<br>
/register   [POST]<br>
Body {<br>
	firstName: string min(3) !<br>
	lastName: string min(3) <br>
	email: mail min(3) !<br>
	password: string min(8) !<br>
	username: string min(3) !<br>
}<br>
Giriş Yap: <br>
/login  [POST]<br>
Body {<br>
password: string min(8) !<br>
	username: string min(3) or email<br>
}<br>
Profil Fotorafı Değiştir:<br>
/profilepic  [POST]<br>
Header {<br>
	Authorization: “Bearer {{token}}”<br>
}<br>
Formdata {<br>
	Profilepic: image(png, jpg, jpeg) !<br>
}<br>
Token İle Kullanıcı Bilgilerini Çekme:<br>
/   [GET]<br>
Header {<br>
	Authorization: “Bearer {{token}}”<br>
}<br>

### Link İşlemleri   {base_url}/links<br>
Link Oluşturma:<br>
/   [POST]<br>
Header {<br>
	Authorization: “Bearer {{token}}” }<br>
Body {<br>
	title :  string min(3) !<br>
	link: string min(3) !<br>
}<br>
<br>
Kullanıcının kendi tüm linklerini (admin sayfası) getirme:<br>
/   [GET]<br>
Header {<br>
	Authorization: “Bearer {{token}}” }<br>


Kullanıcı Adı ile tüm aktif linkleri (sadece aktif linkler) getirme:<br>
/:username   [GET]<br>


Link Güncelleme:<br>
/:id [PUT]<br>
Header {<br>
	Authorization: “Bearer {{token}}” }<br>
Body {<br>
title :  string min(3)<br>
	link: string min(3) <br>
}<br>

Link Silme<br>
Header {<br>
	Authorization: “Bearer {{token}}” }<br>

/:id  [DELETE]<br>
