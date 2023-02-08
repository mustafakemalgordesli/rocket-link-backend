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
/profilepic  [POST]
Header {
	Authorization: “Bearer {{token}}”
}

Formdata {
	Profilepic: image(png, jpg, jpeg) !
}

Token İle Kullanıcı Bilgilerini Çekme:
/   [GET]

Header {
	Authorization: “Bearer {{token}}”
}



### Link İşlemleri   {base_url}/links
Link Oluşturma:
/   [POST]
Header {
	Authorization: “Bearer {{token}}” }
Body {
	title :  string min(3) !
	link: string min(3) !
}

Kullanıcının kendi tüm linklerini (admin sayfası) getirme:
/   [GET]
Header {
	Authorization: “Bearer {{token}}” }


Kullanıcı Adı ile tüm aktif linkleri (sadece aktif linkler) getirme:
/:username   [GET]


Link Güncelleme:
/:id [PUT]
Header {
	Authorization: “Bearer {{token}}” }
Body {
title :  string min(3)
	link: string min(3) 
}

Link Silme
Header {
	Authorization: “Bearer {{token}}” }

/:id  [DELETE]
