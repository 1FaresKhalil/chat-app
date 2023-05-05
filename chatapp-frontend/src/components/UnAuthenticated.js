import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import '../style/_notfound.scss';

function UnAuthenticated() {
    return (
        <div>
            <Container>
                <Row className='container d-flex flex-row justify-content-center align-items-center'>
                    <Col md="auto" >
                        <div className='d-flex flex-row justify-content-center'>
                            <img className='logo img-fluid'
                                 src='https://cloud.mongodb.com/static/images/sadface.gif'
                                 alt=''
                            />
                            <div className='pt-5 mt-5'>
                                <h1 className='pt-lg-5 pt-md-5 mt-lg-5 mt-md-5'>401 Unauthenticated!</h1>
                            </div>
                        </div>
                        <div className='text-center'>Oops! you should login first!</div>

                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default UnAuthenticated;