import _ from "lodash";
import React from "react";
import Debonair from "../classes/Debonair";
import DebonairChildren from "./DebonairChildren";
import StyleSheet from "../classes/StyleSheet";

class DebonairApp extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.stylesheetArr = [];
        this.styleSheetUpdates = [];
        this.styleSheet = new StyleSheet(props.instance);

        this.frameRequested = false;
        this.instance = props.instance;

        this.state = {
            childrenShouldUpdate: true
        };
    }
    updateStyles(cssId, styles, ownerScope) {
        this.styleSheet.pushStyle({cssId: cssId, styles: styles, ownerScope: ownerScope});

        // this.updateStyleSheet();
        if (!this.frameRequested) {
            // buffer calls and updates to stylesheets.
            // console.time("callFrame");
            this.cancelFrame = setTimeout(this.updateStyleSheet.bind(this), 4);
            this.frameRequested = true;
        }
    }
    removeStyles(cssId, ownerScope) {
        this.styleSheet.removeStyle(cssId, ownerScope);
    }
    componentWillRecieveProps() {
        // make sure that if there are new props from top component that
        // children will update. 
        this.setState({
            childrenShouldUpdate: true
        });
    }
    updateStyleSheet() {
        // console.timeEnd("callFrame");
        console.time("createStylesheets");
        this.stylesheetArr = this.styleSheet.createStylesheets();
        console.timeEnd("createStylesheets");
        this.frameRequested = false;
        // calling this opens up the possiblity of a render loop issue
        // where child function is rendered, causing the parent to render, 
        // and rerenders the child.
        this.setState({
            childrenShouldUpdate: false
        });
    }

    render() {
        // might be good to break out stylesheets into its own component.
        let stylesheets = this.stylesheetArr.map((sheet, i) => <style key={`sheet-${i}`}>{sheet}</style>);

        return (
            <span>
                <span>
                    {stylesheets}
                </span>
                <DebonairChildren 
                                  passedChildren={this.props.children}
                                  shouldUpdate={this.state.childrenShouldUpdate}
                                  instance={this.props.instance}
                                  updateStyles={this.updateStyles.bind(this)}
                                  removeStyles={this.removeStyles.bind(this)}/>
            </span>
        );
    }
};

DebonairApp.propTypes = {
    instance: React.PropTypes.instanceOf(Debonair)
};

export default DebonairApp;