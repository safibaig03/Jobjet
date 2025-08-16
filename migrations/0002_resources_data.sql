-- Add sample resources data
INSERT INTO resources (name, description, url, category, icon, tags)
VALUES
  ('GeeksforGeeks', 'Computer science portal with tutorials, courses, and interview preparation resources', 'https://www.geeksforgeeks.org/', 'Learning Platforms', 'code', ARRAY['algorithms', 'data structures', 'programming']),
  ('Stack Overflow', 'Q&A community for developers', 'https://stackoverflow.com/', 'Community Resources', 'message-circle', ARRAY['questions', 'answers', 'community']),
  ('LeetCode', 'Platform to help you enhance your skills and prepare for technical interviews', 'https://leetcode.com/', 'Interview Preparation', 'code', ARRAY['algorithms', 'coding challenges', 'interviews']),
  ('freeCodeCamp', 'Learn to code for free with interactive tutorials', 'https://www.freecodecamp.org/', 'Learning Platforms', 'code', ARRAY['web development', 'javascript', 'free']),
  ('Coursera', 'Online courses from top universities', 'https://www.coursera.org/', 'Online Courses', 'graduation-cap', ARRAY['courses', 'certificates', 'education']),
  ('GitHub', 'Platform for version control and collaboration', 'https://github.com/', 'Development Tools', 'github', ARRAY['git', 'repositories', 'open source']),
  ('MDN Web Docs', 'Resources for developers, by developers', 'https://developer.mozilla.org/', 'Documentation', 'book-open', ARRAY['web', 'javascript', 'html', 'css']),
  ('HackerRank', 'Coding challenges and competitions', 'https://www.hackerrank.com/', 'Interview Preparation', 'code', ARRAY['coding challenges', 'competitions', 'interviews']),
  ('Udemy', 'Online learning marketplace with courses on various topics', 'https://www.udemy.com/', 'Online Courses', 'video', ARRAY['courses', 'skills', 'learning']),
  ('LinkedIn Learning', 'Professional courses and tutorials', 'https://www.linkedin.com/learning/', 'Career Development', 'linkedin', ARRAY['professional', 'skills', 'career']);