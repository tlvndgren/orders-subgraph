publish:
	rover subgraph publish Tyler-Fed-Demo@current --schema ./orders.graphql \
		--name orders --routing-url https://orders-subgraph-waaq4qt37q-uc.a.run.app

check:
	rover subgraph check Tyler-Fed-Demo \
	--schema=orders.graphql \
	--name=orders --validation-period=2w