const books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 2, title: 'Effective Java', author: 'Joshua Bloch' }
];

const blogs = [
  { id: 1, title: 'React Conditional Rendering', author: 'Frontend Team' },
  { id: 2, title: 'Using Keys in Lists', author: 'Web Academy' }
];

const courses = [
  { id: 1, name: 'Java FSE', duration: '7 weeks' },
  { id: 2, name: 'React Fundamentals', duration: '2 weeks' }
];

function BookDetails() {
  return (
    <div className="detail-card">
      <h3>Book Details</h3>
      {books.map((book) => (
        <p key={book.id}>{book.title} by {book.author}</p>
      ))}
    </div>
  );
}

function BlogDetails() {
  return (
    <div className="detail-card">
      <h3>Blog Details</h3>
      {blogs.map((blog) => (
        <p key={blog.id}>{blog.title} - {blog.author}</p>
      ))}
    </div>
  );
}

function CourseDetails() {
  return (
    <div className="detail-card">
      <h3>Course Details</h3>
      {courses.map((course) => (
        <p key={course.id}>{course.name}: {course.duration}</p>
      ))}
    </div>
  );
}

export default function BloggerApp() {
  const showBooks = true;
  const selectedSection = 'all';

  let selectedComponent;
  if (selectedSection === 'books') {
    selectedComponent = <BookDetails />;
  } else if (selectedSection === 'blogs') {
    selectedComponent = <BlogDetails />;
  } else {
    selectedComponent = (
      <div className="detail-grid">
        <BookDetails />
        <BlogDetails />
        <CourseDetails />
      </div>
    );
  }

  return (
    <section className="panel">
      <h2>bloggerapp</h2>
      {showBooks && <BookDetails />}
      {selectedSection === 'courses' ? <CourseDetails /> : selectedComponent}
    </section>
  );
}
