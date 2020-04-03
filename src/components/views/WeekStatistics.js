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

const users = [
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
];

class WeekStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            load: false,
            tokenACP: "",
            nbUsers: "",
            nbRegisterThisWeek: "",
            nbMale: "",
            nbMalePercent: "",
            weekStats: [],
            weekTimestamp: "",
            users: [users]
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

    async getStats() {
        let curr = new Date();
        let week = [];

        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i;
            let day = new Date(curr.setDate(first));
            let timestamp = Date.parse(day);
            timestamp -= (curr.getMilliseconds() + (curr.getSeconds() * 1000) - 1000 + (curr.getMinutes() * 60 * 1000) + (curr.getHours() * 3600 * 1000) );
            // 601199
            timestamp /= 1000;
            // let newDay = new Date(timestamp);
            week.push({timestamp})
        }
        this.setState({
            weekTimestamp: {start: week[0], end: week[0]+601199}
        });










    };

    render(){
        // console.log(this.state)
        return(
            <Card className={"mt-3"}>
                <Card.Header>
                    Trafic
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Current week</Card.Subtitle>
                    <div className="d-flex flex-row justify-content-between">
                        <SmallGraph title={'New users'} type={'newUsers'}/>
                        <SmallGraph title={'Active users'} type={'activeUsers'}/>
                        <SmallGraph title={'List created'} type={'listCreated'}/>
                        <SmallGraph title={'Task created'} type={'taskCreated'}/>
                    </div>
                    <hr/>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column w-50">
                            <ComparisonTasksWeek/>
                        </div>
                        <div className="d-flex flex-column w-50 p-3">
                            <div className="p-1">
                                <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
                                        <span>
                                            <FontAwesomeIcon icon={faVenus} /> Female</span>
                                    <span className="font-weight-bold">{100 -((this.state.nbMale * 100) / this.state.nbUsers)}%</span>
                                </Card.Subtitle>
                                <ProgressBar now={100 -((this.state.nbMale * 100) / this.state.nbUsers)} variant="warning" label="taskCreated" srOnly />
                            </div>
                            <div className="p-1">
                                <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
                                        <span>
                                            <FontAwesomeIcon icon={faMars} /> Male</span>
                                    <span className="font-weight-bold">{(this.state.nbMale * 100) / this.state.nbUsers}%</span>
                                </Card.Subtitle>
                                <ProgressBar now={(this.state.nbMale * 100) / this.state.nbUsers} variant="warning" label="taskCreated" srOnly />
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}
export default (WeekStatistics);