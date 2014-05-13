server-test:
	./node_modules/.bin/mocha --reporter list -R spec --recursive \
		./server/_tests

.PHONY: server-test