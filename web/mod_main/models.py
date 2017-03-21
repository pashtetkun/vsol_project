# -*- coding: utf-8 -*-

from web import db

class HiddenCountry(db.Document):
    name = db.StringField(max_length=255, required=True)
    count_clubs = db.IntField(required=True)
    clubs = db.ListField(db.StringField(max_length=255), required=True)

    #def get_absolute_url(self):
        #return url_for('post', kwargs={"slug": self.slug})

    def __unicode__(self):
        return self.name

    meta = {
        'allow_inheritance': True,
        'indexes': [],
        'ordering': ['name']
    }

class Country(db.Document):
    vsol_id = db.IntField(required=True)
    name = db.StringField(max_length=255, required=True)
    sprite_style = db.StringField(max_length=255, required=True)

class Club(db.Document):
    vsol_id = db.IntField(required=True)
    name = db.StringField(max_length=255, required=True)
    name_eng = db.StringField(max_length=255)
    stadium = db.StringField(max_length=255)
    stadium_eng = db.StringField(max_length=255)
    logo_url = db.StringField(max_length=255)
    logo_size = db.IntField()
    isHidden = db.BooleanField(required=True)
    country_id = db.IntField(required=True)

if __name__ == "__main__":
    countries = list(Country.objects)
    print(countries)
    pass
    
