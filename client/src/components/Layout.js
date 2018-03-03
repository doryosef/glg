import React from "react";
import graph from "../utils/graph";

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {viewers: null}
    }

    render() {
        console.log(this.state);
        const graphView = graph.draw();
        return (
            <div>
                <div className="gcv-container">
                    {graphView}
                </div>
            </div>
        );
    }
}
