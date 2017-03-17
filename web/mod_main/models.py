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

if __name__ == "__main__":
    pass
    
