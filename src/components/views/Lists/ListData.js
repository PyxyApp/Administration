import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import {firebaseConfig} from "../../../firebaseConfig";
import key from "../../../privateKey";
import * as jwt from "jsonwebtoken";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {routeAPI} from "../../../index";
import Users from "../../containers/Users";
import Tasks from "../../containers/Tasks";
import Pagination from "react-pagination-bootstrap";
import Categories from "./Categories";
import Lists from "./Lists";
import Loading from "../modules/Loading";

let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

export default class ListData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: this.props.location.pathname.substr(1),
            tokenACP: "",
            isLoading: false,
            dataType: this.props.location.pathname.substr(1),
            data: [],
            dataId: '',
            activePage: '1',
            startRange: '0',
            endRange: '10'
        };
    }

    async componentDidMount() {
        await fetch(routeAPI + this.state.dataType+'/', {
            headers: {
                'Authorization': this.state.tokenACP
            },
        })
        .then(response => response.json())
            .then(json => {
                if(json){
                    this.setState({
                        nbUsers: json.length,
                        data: json,
                        load: true,
                    });
                }
            })
            .catch(e =>{
                console.log(e)
            })
    }

    handlePageChange(pageNumber) {
        let endRange = 10*pageNumber;
        let startRange = endRange-10;

        this.setState({
            activePage: pageNumber,
            startRange: startRange,
            endRange: endRange
        });
    }

    render() {
        const listData = {
            users: <Users data={this.state.data} startRange={this.state.startRange} endRange={this.state.endRange}/>,
            tasks: <Tasks data={this.state.data} startRange={this.state.startRange} endRange={this.state.endRange}/>,
            categories: <Categories data={this.state.data} startRange={this.state.startRange} endRange={this.state.endRange}/>,
            lists: <Lists data={this.state.data} startRange={this.state.startRange} endRange={this.state.endRange}/>,
        };

        return (
            <div className="content col-10 mt-3">
                <Card>
                    <Card.Header>
                        {this.state.dataType}
                        <div className={'card-header-right'}>
                            <Link to={'/create-user'}>
                                <Button size={"sm"} variant={"success"}>
                                    <FontAwesomeIcon icon={faUserPlus}/> Create {this.state.dataType}
                                </Button>
                            </Link>
                        </div>
                    </Card.Header>
                    <Card.Body className="d-flex justify-content-center flex-column">
                        {this.state.data.length !== 0 ? listData[this.state.dataType] :
                            (
                            <Loading/>
                            )}
                        <Pagination
                            totalItemsCount={this.state.data.length}
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </Card.Body>
                </Card>
            </div>
        )
    }
}