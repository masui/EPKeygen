.PHONY: build

build: compile
	npm run build

compile:
	coffee -c -b crypt.coffee

cleanbuild: clean install build

clean:
	-/bin/rm -r -f build
	-/bin/rm -r -f node_modules
	-/bin/rm *~

install:
	npm install

run:
	npm run start

# upload-mac:
# 	scp build/GyazoUploader-1.0.0.dmg pitecan.com:/www/www.pitecan.com/
# upload-chromeOS:
# 	scp build/GyazoUploader-1.0.0.AppImage  pitecan.com:/www/www.pitecan.com/GyazoUploader
