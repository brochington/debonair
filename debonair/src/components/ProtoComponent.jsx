import _ from "lodash";
import React from "react";

class ProtoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.id = Math.random().toString(36).slice(10);
        this.cssId = `id-${this.id}`;
    }
    componentDidMount(){
        if (this.props.styles) {
            this.props.debonair.updateStyles(this.cssId, this.props.styles, this.props.owner.name);
        }
    }
    componentWillUnmount() {
        this.props.debonair.removeStyles(this.cssId, this.props.owner.name);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.styles) {
            nextProps.debonair.updateStyles(this.cssId, nextProps.styles, nextProps.owner.name);
        }
    }
}

ProtoComponent.propTypes = {
    styles: React.PropTypes.object,
    debonair: React.PropTypes.object,
    id: React.PropTypes.number,
    owner: React.PropTypes.func
}

export default ProtoComponent;
