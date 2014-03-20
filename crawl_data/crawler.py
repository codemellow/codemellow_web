import urllib2
import time
import json
import re
from BeautifulSoup import BeautifulSoup
num=1
while True:
	url="http://sourceforge.net/directory/license%3Aapache2/?sort=update&page="+str(num)
	try:
		data = urllib2.urlopen(url).read()
	except urllib2.HTTPError, e:
		print "HTTP error: %d" % e.code
	except urllib2.URLError, e:
		print "Network error: %s" % e.reason.args[1]
		time.sleep(1)
		continue
	except httplib.BadStatusLine, e:
		print "Not exist  error: %s" % str(e)
	soup = BeautifulSoup(data)
	article = soup.findAll('div', attrs={'class':'project_info'})
	for i in range(len(article)):
		finded=article[i].find('a')
		href=finded['href']
		projectname=finded.span.string
		try:
			data1 = urllib2.urlopen("http://sourceforge.net"+href).read()
		except urllib2.HTTPError, e:
			print "HTTP error: %d" % e.code
		except urllib2.URLError, e:
			print "Network error: %s" % e.reason.args[1]
			i=i-1
			time.sleep(1)
			continue
		except httplib.BadStatusLine, e:
			print "Not exist  error: %s" % str(e)
		soup1 = BeautifulSoup(data1)
		category1 = soup1.findAll('a',attrs={'itemprop':'softwareApplicationSubCategory'})
		obj_name=projectname.encode('utf-8')
		obj_down="http://sourceforge.net"+href[:href.index('?source=')]+"files/latest/download?source=directory"
		obj_category=[]
		obj_feature=[]
		obj_language=[]
		obj_license=[]
		obj_update_date=""
		update_date=soup1.findAll('time',attrs={'class':'dateUpdated'})
		if len(update_date)!=0:
			obj_update_date=update_date[0].string
		license = soup1.findAll('a',attrs={'href':re.compile("^\/directory\/license")})
		if len(license)!=0:
			for i in range(len(license)):
				license_string=license[i].string
				obj_license.append(license_string)
		language = soup1.findAll('a',attrs={'href':re.compile("^\/directory\/language")})
		if len(language)!=0:
			for i in range(len(language)):
				language_string=language[i].string
				obj_language.append(language_string)
		feature = soup1.findAll('li',attrs={'class':'feature'})
		if len(feature)!=0:
			for i in range(len(feature)):
				feature_string=feature[i].string
				obj_feature.append(feature_string)
		if len(category1)!=0:
			for i in range(len(category1)):
				href2=category1[i].string
				#print "category "+href2
				obj_category.append(href2)
		else:
			category2 = soup1.findAll('a',attrs={'itemprop':'applicationCategory'})
			for i in range(len(category2)):
				href2=category2[i].string
				obj_category.append(href2)
		obj=json.dumps({"project_name":obj_name,"project_down":obj_down,"project_category":obj_category,"project_feature":obj_feature,"project_language":obj_language,"project_update_date":obj_update_date,"project_license":obj_license})
		print str(obj)
	num=num+1
	print "page number : "+str(num)
	#break
