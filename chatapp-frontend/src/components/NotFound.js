import React from 'react';
import '../style/_notfound.scss';
import {Container, Row, Col} from "react-bootstrap";



function NotFound() {

    return (
        <div>
            <Container>
                <Row className='container'>
                    <Col md="auto">
                        <div className='d-flex flex-row justify-content-center'>
                            <img className='logo img-fluid'
                                 src='https://cloud.mongodb.com/static/images/sadface.gif'
                                 alt=''
                            />
                            <div className='pt-5 mt-5'>
                                <h1 className='pt-lg-5 pt-md-5 mt-lg-5 mt-md-5'>404 Not found!</h1>
                            </div>
                        </div>
                        <div className='text-center'>Oops! We can't find the page you were looking for.</div>

                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default NotFound;