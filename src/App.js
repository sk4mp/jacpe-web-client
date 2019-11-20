import React from "react";
import { Provider } from "react-redux";

import { BrowserRouter, Route } from "react-router-dom";

import store from "./redux-store";

import TopPanel from "./components/TopPanel";
import DynamicPage from "./routes/DynamicPage";

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
                        <div id="router">
                            <Route path="/:page_id" component={ DynamicPage } />
                        </div>
                    </div>
                </Provider>
            </BrowserRouter>
        );
    }
}
