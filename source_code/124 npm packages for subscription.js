// SUBSCRIPTION 
// install additional packages, not included in apollo-boost
npm install --save apollo-link apollo-link-context apollo-link-ws apollo-utilities subscriptions-transport-ws 

import { setContext } from "apollo-link-context";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

// included in apollo boost 
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";

// 1. create websocket link
// 2. create http link
// 3. setContext for authtoken
// 4. concat http and authtoken link
// 5. use split to split http link or websocket link
// 6. create new apollo client