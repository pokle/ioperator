
SERVER=dist/server.js
CLIENT=dist/bundle.js
HTML=dist/index.html

build: $(SERVER) $(CLIENT) $(HTML)

$(HTML): src/index.html
	cp src/index.html dist/

$(CLIENT): node_modules $(shell find src)
	npx rollup -c rollup.client.config.js

$(SERVER): node_modules $(shell find src)
	npx rollup -c rollup.server.config.js

node_modules: package.json
	npm i
	touch $@

start: $(SERVER)
	node $(SERVER)