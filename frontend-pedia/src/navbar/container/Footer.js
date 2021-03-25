import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '150px',
        position: 'fixed',
        backgroundColor: '#1C1D1F',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft : '-8px'
    },
    text: {
        listStyle: 'none',
        display: 'inline-block',
        marginRight: '20px',
        color: 'grey',
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ul>
                <li className={classes.text}>
                    서비스 이용약관 &nbsp;&nbsp;&#124;
                </li>
                <li className={classes.text}>
                    개인정보 처리방침 &nbsp;&nbsp;&#124;
                </li>
                <li className={classes.text}>
                    회사 안내
                </li>
            </ul>
            <ul>
                <li className={classes.text}><strong>구미 5팀 &nbsp; </strong>&#124;</li>
                <li className={classes.text}>강민창 &nbsp;&nbsp;&#124; </li>
                <li className={classes.text}>강유정 &nbsp;&nbsp;&#124; </li>
                <li className={classes.text}>손동민 &nbsp;&nbsp;&#124; </li>
                <li className={classes.text}>이성헌 &nbsp;&nbsp;&#124; </li>
                <li className={classes.text}>이지원</li>
            </ul>
            <ul>
                <li className={classes.text}>© 2021 by <strong>NETCHA</strong>, Inc. All rights reserved.</li>
            </ul>
        </div>
    );
}
