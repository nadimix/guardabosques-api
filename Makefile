REPORTER = spec

lint:
	./node_modules/.bin/jshint ./app.js ./test.js ./controllers ./routes

start:
	@NODE_ENV=development sudo node ./bin/www

test:
	$(MAKE) lint
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
	./node_modules/mocha/bin/_mocha -- -R $(REPORTER)

.PHONY: test
