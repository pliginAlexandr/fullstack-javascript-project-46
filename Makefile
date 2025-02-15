install: # Dependencies installation
	npm ci

lint: #eslint launch
	npx eslint .

test: #launch of tests
	npm test
	
test-coverage: #test coverage check
	npx jest --coverage