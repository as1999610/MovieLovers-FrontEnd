import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Icon} from 'semantic-ui-react';

const AddMovie = () => (
    <Card centered>
        <Card.content textAlign='center'>
            <Card.Header>Add a new Movie</Card.Header>
            <Link to='/movies/new'><Icon name='plus circle' size='massive' /></Link>
        </Card.content>
    </Card>
);

export default AddMovie;