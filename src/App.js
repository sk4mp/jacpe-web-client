import React from "react";
import { Provider } from "react-redux";

import { BrowserRouter, Route } from "react-router-dom";

import store from "./redux-store";

import TopPanel from "./components/TopPanel";
import DynamicPage from "./routes/DynamicPage";
import LeftPanel from "./components/LeftPanel";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.store = store;
    }

    render() {
        return (
            <BrowserRouter>
                <Provider store={ this.store }>
                    <TopPanel />

                    <div id="content">
                        <LeftPanel />

                        <div id="router">
                            <Route path="/:page_id" component={ DynamicPage } />
                            <Route path="*" component={ () => <div>Go to /something to see an exaple</div> } />
                        </div>
                    </div>
                </Provider>
            </BrowserRouter>
        );
    }
}
