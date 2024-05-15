check:
	rover subgraph check Tyler-Fed-Demo@prod \
	--schema=orders.graphql \
	--name=orders --validation-period=2w
	
publish:
	rover subgraph publish Tyler-Fed-Demo@prod --schema ./orders.graphql \
		--name orders --routing-url https://prod-products-subgraph-bhl6lhslfa-uc.a.run.app

publish-staging:
	rover subgraph publish Tyler-Fed-Demo@staging --schema ./orders.graphql \
		--name orders --routing-url https://staging-products-bhl6lhslfa-uc.a.run.app
