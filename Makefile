.PHONY: build

build: compile install
	npm run build
	cp -r build/mac/EPKeygen.app /Applications

compile:
	coffee -c -b crypt.coffee

cleanbuild: clean install build

clean:
	-/bin/rm -r -f build
	-/bin/rm -r -f node_modules
	-/bin/rm *~ */*~

install:
	npm install

run:
	npm start .
#	npm run start


# upload-mac:
# 	scp build/GyazoUploader-1.0.0.dmg pitecan.com:/www/www.pitecan.com/
# upload-chromeOS:
# 	scp build/GyazoUploader-1.0.0.AppImage  pitecan.com:/www/www.pitecan.com/GyazoUploader

