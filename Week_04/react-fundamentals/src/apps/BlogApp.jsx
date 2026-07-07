import { Component } from 'react';

class Post {
  constructor(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
  }
}

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        new Post(1, 'React lifecycle', 'componentDidMount is useful for loading initial data.'),
        new Post(2, 'Error handling', 'componentDidCatch can be used by an error boundary.')
      ],
      errorMessage: ''
    };
  }

  componentDidMount() {
    this.loadPosts();
  }

  componentDidCatch(error) {
    this.setState({ errorMessage: error.message });
    alert(`Blog component error: ${error.message}`);
  }

  async loadPosts() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
      if (!response.ok) {
        throw new Error('Unable to load posts');
      }
      const data = await response.json();
      this.setState({
        posts: data.map((item) => new Post(item.id, item.title, item.body))
      });
    } catch {
      this.setState((state) => ({ posts: state.posts }));
    }
  }

  render() {
    return (
      <div className="post-grid">
        {this.state.errorMessage && <p className="error-text">{this.state.errorMessage}</p>}
        {this.state.posts.map((post) => (
          <article key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
        ))}
      </div>
    );
  }
}

export default function BlogApp() {
  return (
    <section className="panel">
      <h2>blogapp</h2>
      <Posts />
    </section>
  );
}
