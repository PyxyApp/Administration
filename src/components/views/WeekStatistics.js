import React, { Component } from 'react';
import {Card, ProgressBar} from "react-bootstrap";
import SmallGraph from "./SmallGraph";
import ComparisonTasksWeek from './ComparisonTasksWeek';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMars, faVenus} from "@fortawesome/free-solid-svg-icons";
import {firebaseConfig} from "../../firebaseConfig";
import key from "../../privateKey";
import * as jwt from "jsonwebtoken";
import {routeAPI} from "../../index";

let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

class WeekStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            tokenACP: "",
            nbUsers: "",
            nbRegisterThisWeek: "",
            nbMale: "",
            nbMalePercent: "",
            weekStats: [{"name": "Monday"}, {"name": "Tuesday"}, {"name": "Wednesday"}, {"name": "Thursday"}, {"name": "Friday"}, {"name": "Saturday"}, {"name": "Sunday"}],
            weekTimestamp: "",
            users: [
                {
                    "date": {
                        "date_created": {
                            "_seconds": 1585700315,
                            "_nanoseconds": 0
                        },
                        "last_login": {
                            "_seconds": 1585700315,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "2BgVXcoNbgVA11lpC9Yqz9p6jHo1",
                    "nat": "fr",
                    "gender": "m",
                    "email": "Michel@gmail.com",
                    "name": {
                        "lastname": "Blanc",
                        "firstname": "Michel",
                        "username": "WhiteMichou"
                    }
                },
                {
                    "gender": "f",
                    "name": {
                        "lastname": "Baulan",
                        "firstname": "Louise",
                        "username": "Fayah"
                    },
                    "email": "louise.baulan@gmail.com",
                    "uid": "4HvxlQiUnEguv2GOs0dPnuyTznJ3",
                    "acp": {
                        "admin": true
                    },
                    "date": {
                        "date_created": {
                            "_seconds": 1583751600,
                            "_nanoseconds": 0
                        },
                        "last_login": {
                            "_seconds": 1585546140,
                            "_nanoseconds": 0
                        }
                    }
                },
                {
                    "nat": "fr",
                    "gender": "f",
                    "email": "marie.mantoni16@gmail.com",
                    "name": {
                        "lastname": "Mantoni",
                        "firstname": "Marie",
                        "username": "ArieM"
                    },
                    "date": {
                        "date_created": {
                            "_seconds": 1585700442,
                            "_nanoseconds": 0
                        },
                        "last_login": {
                            "_seconds": 1585700442,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "6A1vMXsVvWhNn2Pf0fRi9kL6sQr2"
                },
                {
                    "email": "nicolas.notararigo@gmail.com",
                    "name": {
                        "lastname": "Notararigo",
                        "firstname": "Nicolas",
                        "username": "Neerfix"
                    },
                    "uid": "74xSBlBejXfAPHoBPNBODVglwox2",
                    "acp": {
                        "admin": true
                    },
                    "date": {
                        "date_created": {
                            "_seconds": 1585648800,
                            "_nanoseconds": 0
                        },
                        "last_login": {
                            "_seconds": 1585546140,
                            "_nanoseconds": 0
                        }
                    },
                    "gender": "m"
                },
                {
                    "gender": "m",
                    "email": "user3@gmail.com",
                    "name": {
                        "lastname": "Paul",
                        "firstname": "Jean",
                        "username": "user3"
                    },
                    "date": {
                        "last_login": {
                            "_seconds": 1585701959,
                            "_nanoseconds": 0
                        },
                        "date_created": {
                            "_seconds": 1585701959,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "EfRhYKrI4aM4NfbtO8qUIGauavG2",
                    "nat": "fr"
                },
                {
                    "email": "ni@gmail.com",
                    "name": {
                        "lastname": "Putiev",
                        "firstname": "Nikolaii",
                        "username": "Nikolai"
                    },
                    "date": {
                        "date_created": {
                            "_seconds": 1585924239,
                            "_nanoseconds": 0
                        },
                        "last_login": {
                            "_seconds": 1585924239,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "I5jxlXGGeeWY6Wt2QcLKfZNxjyc2",
                    "nat": "RU",
                    "gender": "m"
                },
                {
                    "email": "jarhide@gmail.com",
                    "name": {
                        "firstname": "Jean-Michel",
                        "username": "JM-LaRafle",
                        "lastname": "LaRafle"
                    },
                    "date": {
                        "date_created": {
                            "_seconds": 1585701285,
                            "_nanoseconds": 0
                        },
                        "last_login": {
                            "_seconds": 1585701285,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "QDaOfX3pjFMNGJ3oXN9Y9DdKIQV2",
                    "nat": "fr",
                    "gender": "m"
                },
                {
                    "date": {
                        "last_login": {
                            "_seconds": 1585925817,
                            "_nanoseconds": 0
                        },
                        "date_created": {
                            "_seconds": 1585925817,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "RJGrcGqjJpdtLnsUrv0T4hJVyEt1",
                    "nat": "FR",
                    "gender": "f",
                    "email": "Michemiche@gmail.com",
                    "name": {
                        "firstname": "Michelle",
                        "username": "PetitKiou",
                        "lastname": "Laroche"
                    }
                },
                {
                    "date": {
                        "date_created": {
                            "_seconds": 1585701942,
                            "_nanoseconds": 0
                        },
                        "last_login": {
                            "_seconds": 1585701942,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "Va4IS17xVEdSw38zf0lFdIahds62",
                    "nat": "fr",
                    "gender": "m",
                    "email": "user2@gmail.com",
                    "name": {
                        "lastname": "Inspiration",
                        "firstname": "Manque",
                        "username": "user2"
                    }
                },
                {
                    "email": "solenne.bertrand74@gmail.com",
                    "name": {
                        "username": "Principessa74",
                        "lastname": "Bertrand",
                        "firstname": "Solenne"
                    },
                    "date": {
                        "date_created": {
                            "_seconds": 1585700385,
                            "_nanoseconds": 0
                        },
                        "last_login": {
                            "_seconds": 1585700385,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "fJ93XaqMrsgwJJZHt92gd73xKpA3",
                    "nat": "fr",
                    "gender": "f"
                },
                {
                    "date": {
                        "date_created": {
                            "_seconds": 1585701630,
                            "_nanoseconds": 0
                        },
                        "last_login": {
                            "_seconds": 1585701630,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "kMh77LFxzuPT4iPkAj9nb5MNoMI3",
                    "nat": "fr",
                    "gender": "m",
                    "email": "artoook@gmail.com",
                    "name": {
                        "lastname": "Lugansky",
                        "firstname": "Nikolaï",
                        "username": "Lugansky.N"
                    }
                },
                {
                    "email": "user1@gmail.com",
                    "name": {
                        "lastname": "Sebastien",
                        "firstname": "Marc",
                        "username": "user1"
                    },
                    "date": {
                        "date_created": {
                            "_seconds": 1585701925,
                            "_nanoseconds": 0
                        },
                        "last_login": {
                            "_seconds": 1585701925,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "ta8qznDfwXWW8JOkwmTNo3izFWm1",
                    "nat": "fr",
                    "gender": "m"
                },
                {
                    "gender": "f",
                    "email": "Sophie@gmail.com",
                    "name": {
                        "lastname": "Blanc",
                        "firstname": "Sophie",
                        "username": "Principessa"
                    },
                    "date": {
                        "last_login": {
                            "_seconds": 1585700356,
                            "_nanoseconds": 0
                        },
                        "date_created": {
                            "_seconds": 1585700356,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "uV3X41NFwbdcf8gWnkC5mxE7V9f1",
                    "nat": "fr"
                },
                {
                    "date": {
                        "date_created": {
                            "_seconds": 1585700144,
                            "_nanoseconds": 0
                        },
                        "last_login": {
                            "_seconds": 1585700144,
                            "_nanoseconds": 0
                        }
                    },
                    "acp": {
                        "admin": false
                    },
                    "uid": "wr3e6bAdwjft6bKMESOCIfZNACX2",
                    "nat": "fr",
                    "gender": "m",
                    "email": "bob@gmail.com",
                    "name": {
                        "username": "bob3lettres",
                        "lastname": "Qurklande",
                        "firstname": "Bob"
                    }
                }
            ],
            tasks: [
                {
                    "list": "8CwLiQb1gqjbJujBUhzM",
                    "name": "Visiter le Taj Mahal",
                    "is_done": false,
                    "date": {
                        "date_done": null,
                        "date_created": {
                            "_seconds": 1583924400,
                            "_nanoseconds": 0
                        }
                    },
                    "uid": "CjgKE5BUHUBblL1NfSx9",
                    "is_private": false,
                    "description": "Passer une semaine en Inde et passer une demie journée dans le Taj Mahal"
                },
                {
                    "list": "Rx4PMu7a1xeuVft3YnG4",
                    "name": "Fumer un cigare cubain",
                    "is_done": true,
                    "date": {
                        "date_created": {
                            "_seconds": 1583924400,
                            "_nanoseconds": 0
                        },
                        "date_done": null
                    },
                    "uid": "Gys1MrACoEggsO14PExN",
                    "is_private": true,
                    "description": ""
                },
                {
                    "description": "Tester de le faire dans un avion",
                    "list": "hLJaIzPAoq2YMgbiP2pG",
                    "name": "le faire dans un avion",
                    "is_done": false,
                    "date": {
                        "date_done": null,
                        "date_created": {
                            "_seconds": 1583924400,
                            "_nanoseconds": 0
                        }
                    },
                    "uid": "N7nua4zTzYPOqNrJo3lh",
                    "is_private": true
                },
                {
                    "description": "Faire l'amour sur mon lieu de travail",
                    "list": "hLJaIzPAoq2YMgbiP2pG",
                    "date_done": null,
                    "name": "ken au bureau",
                    "is_done": false,
                    "uid": "NOEgCQs9R39jrBo5HiXk",
                    "date": {
                        "date_created": {
                            "_seconds": 1583924400,
                            "_nanoseconds": 0
                        }
                    },
                    "is_private": true
                },
                {
                    "description": "Prendre des cours de guitare acoustique",
                    "list": "Rx4PMu7a1xeuVft3YnG4",
                    "date_done": null,
                    "name": "Apprendre la guitare",
                    "is_done": false,
                    "uid": "luy94uERHRq3yrRy7gOh",
                    "date": {
                        "date_created": {
                            "_seconds": 1583924400,
                            "_nanoseconds": 0
                        }
                    },
                    "is_private": false
                },
                {
                    "description": "",
                    "list": "hLJaIzPAoq2YMgbiP2pG",
                    "date_done": null,
                    "name": "Tester dans un lieu public",
                    "is_done": true,
                    "uid": "pS7n2pajU6gwyRmOCILO",
                    "date": {
                        "date_created": {
                            "_seconds": 1583924400,
                            "_nanoseconds": 0
                        }
                    },
                    "is_private": true
                },
                {
                    "description": "Faire l'amour dans les vestiaires d'un magasin",
                    "list": "hLJaIzPAoq2YMgbiP2pG",
                    "date_done": null,
                    "name": "Le faire dans les cabines d'essayages",
                    "is_done": false,
                    "qp43uyb4sEUOWKL6hSAw": "uid",
                    "date": {
                        "date_created": {
                            "_seconds": 1583924400,
                            "_nanoseconds": 0
                        }
                    },
                    "is_private": true
                },
                {
                    "list": "Rx4PMu7a1xeuVft3YnG4",
                    "date_done": null,
                    "name": "tester le karaoké",
                    "is_done": false,
                    "uid": "vZPjQ84WGkDHBbDqJ44c",
                    "date": {
                        "date_created": {
                            "_seconds": 1583924400,
                            "_nanoseconds": 0
                        }
                    },
                    "is_private": false,
                    "description": "Aller dans un bar karaoké avec des amis et chanter au moins 3 chansons"
                }
            ],
            lists: [
                {
                    "is_active": true,
                    "user": "4HvxlQiUnEguv2GOs0dPnuyTznJ3",
                    "uid": "8CwLiQb1gqjbJujBUhzM",
                    "is_private": false,
                    "date": {
                        "date_created": {
                            "_seconds": 1583838000,
                            "_nanoseconds": 0
                        }
                    },
                    "title": "Voyage"
                },
                {
                    "user": "4HvxlQiUnEguv2GOs0dPnuyTznJ3",
                    "uid": "Rx4PMu7a1xeuVft3YnG4",
                    "is_private": false,
                    "date": {
                        "date_created": {
                            "_seconds": 1583838000,
                            "_nanoseconds": 0
                        }
                    },
                    "title": "loisirs",
                    "is_active": true
                },
                {
                    "title": "sexe",
                    "is_active": true,
                    "user": "4HvxlQiUnEguv2GOs0dPnuyTznJ3",
                    "uid": "hLJaIzPAoq2YMgbiP2pG",
                    "is_private": true,
                    "date": {
                        "date_created": {
                            "_seconds": 1583838000,
                            "_nanoseconds": 0
                        }
                    }
                }
            ],
        };
    }

    // async componentDidMount() {
    //     await fetch(routeAPI + 'users/', {
    //         headers: {
    //             'Authorization': this.state.tokenACP
    //         },
    //     })
    //     .then(response => response.json())
    //         .then(json => {
    //             if(json){
    //                 this.setState({
    //                     nbUsers: json.length,
    //                     users: json,
    //                     load: true,
    //                 });
    //             }
    //         })
    //         .catch(e =>{
    //             console.log(e)
    //         })
    // }

    getStats = () =>{
        let curr = new Date();
        let week = [];

        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i;
            let day = new Date(curr.setDate(first));
            let timestamp = Date.parse(day);
            timestamp -= (curr.getMilliseconds() + (curr.getSeconds() * 1000) - 1000 + (curr.getMinutes() * 60 * 1000) + (curr.getHours() * 3600 * 1000) );
            timestamp /= 1000;
            let endTimestamp = timestamp + 24 * 3600 - 1;
            week.push({start: timestamp, end: endTimestamp});
        }
        console.log(week)
        for(let i=0; i<=6; i++){
            const activeUsersByDay = this.state.users.filter(user => (user.date.last_login._seconds <= week[i].end))
                .filter(user => (user.date.last_login._seconds >= week[i].start));
            const newUsersByDay = this.state.users.filter(user => (user.date.date_created._seconds <= week[i].end))
                .filter(user => (user.date.date_created._seconds >= week[i].start));
            const tasksDoneByDay = this.state.tasks.filter(task => task.date.date_done ? (task.date.date_done._seconds <= week[i].end)
                .filter(task => (task.date.date_done._seconds >= week[i].start)) : 0);
            const newTasksByDay = this.state.tasks.filter(task => (task.date.date_created._seconds <= week[i].end))
                .filter(task => (task.date.date_created._seconds >= week[i].start));
            const newListsByDay = this.state.lists.filter(list => (list.date.date_created._seconds <= week[i].end))
                .filter(list => (list.date.date_created._seconds >= week[i].start));
            this.state.weekStats[i].activeUsers = activeUsersByDay.length;
            this.state.weekStats[i].newUsers = newUsersByDay.length;
            this.state.weekStats[i].newTasks = newTasksByDay.length;
            this.state.weekStats[i].newLists = newListsByDay.length;
            this.state.weekStats[i].tasksDone = tasksDoneByDay.length;
        }

        console.log(this.state);
        const resultGender = this.state.users.filter(user => user.gender === 'm');
        this.setState({
            nbUsers: this.state.users.length,
            nbMale: resultGender.length,
            isLoaded: true
        })
    };

    render(){
        if(!this.state.isLoaded){
            this.getStats();
        }
        return(
            <Card className={"mt-3"}>
                <Card.Header>
                    Trafic
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Current week</Card.Subtitle>
                    <div className="d-flex flex-row justify-content-between">
                        <SmallGraph title={'New users'} type={'newUsers'} stats={this.state.weekStats}/>
                        <SmallGraph title={'Active users'} type={'activeUsers'} stats={this.state.weekStats}/>
                        <SmallGraph title={'List created'} type={'newLists'} stats={this.state.weekStats}/>
                        <SmallGraph title={'Task created'} type={'newTasks'} stats={this.state.weekStats}/>
                    </div>
                    <hr/>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column w-50">
                            <ComparisonTasksWeek stats={this.state.weekStats} statsGlobalUsers={this.state.users} statsGlobalTasks={this.state.tasks}/>
                        </div>
                        <div className="d-flex flex-column w-50 p-3">
                            <div className="p-1">
                                <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
                                        <span>
                                            <FontAwesomeIcon icon={faVenus} /> Female</span>
                                    <span className="font-weight-bold">{Math.trunc(100 -((this.state.nbMale * 100) / this.state.nbUsers))}%</span>
                                </Card.Subtitle>
                                <ProgressBar now={Math.trunc(100 -((this.state.nbMale * 100) / this.state.nbUsers))} variant="warning" label="taskCreated" srOnly />
                            </div>
                            <div className="p-1">
                                <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
                                        <span>
                                            <FontAwesomeIcon icon={faMars} /> Male</span>
                                    <span className="font-weight-bold">{Math.trunc((this.state.nbMale * 100) / this.state.nbUsers)}%</span>
                                </Card.Subtitle>
                                <ProgressBar now={Math.trunc((this.state.nbMale * 100) / this.state.nbUsers)} variant="warning" label="taskCreated" srOnly />
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}
export default (WeekStatistics);