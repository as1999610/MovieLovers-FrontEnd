import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment, Image } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class MovieForm extends React.Component {
  state = {
    data: {
      goodWatchId: this.props.movie.goodWatchId,
      title: this.props.movie.title,
      director: this.props.movie.director,
      mainActor: this.props.movie.actors[0],
      duration: this.props.movie.duration
    },
    actors: this.props.movie.actors,
    index: 0,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        goodreadsId: props.movie.goodreadsId,
        title: props.movie.title,
        director: props.movie.director,
        mainActor: props.movie.actors[0],
        duration: props.movie.duration
      },
      actors: props.movie.actors
    });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onChangeNumber = e =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: parseInt(e.target.value, 10)
      }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  changemainActor = () => {
    const { index, actors } = this.state;
    const newIndex = index + 1 >= actors.length ? 0 : index + 1;
    this.setState({
      index: newIndex,
      data: { ...this.state.data, mainActor: actors[newIndex] }
    });
  };

  validate = data => {
    const errors = {};
    if (!data.title) {
      errors.title = "Can't be blank";
    }
    if (!data.director) {
      errors.director = "Can't be blank";
    }
    if (!data.duration) { 
    errors.duration = "Can't be blank";
    }
   return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Movie Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>

                <Form.Field error={!!errors.authors}>
                  <label htmlFor="director">Movie Director</label>
                  <input
                    type="text"
                    id="director"
                    name="director"
                    placeholder="director"
                    value={data.director}
                    onChange={this.onChange}
                  />
                  {errors.director && <InlineError text={errors.director} />}
                </Form.Field>

                <Form.Field error={!!errors.duration}>
                  <label htmlFor="pages">Duration</label>
                  <input
                    disabled={data.duration === undefined}
                    type="text"
                    id="duration"
                    name="duration"
                    value={data.duration !== undefined ? data.duration : "Pending"}
                    onChange={this.onChangeNumber}
                  />
                  {errors.duration && <InlineError text={errors.duration} />}
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Image size="small" src={data.mainActor} />
                {this.state.actors.length > 1 && (
                  <a role="button" tabIndex={0} onClick={this.changemainActor}>
                    Another Lead Actor
                  </a>
                )}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

MovieForm.propTypes = {
  submit: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    goodWatchId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    directors: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    duration: PropTypes.number
  }).isRequired
};

export default MovieForm;