-- 1. User Upcoming Events
SELECT u.user_id, u.full_name, e.title, e.city, e.start_date
FROM users u
JOIN registrations r ON r.user_id = u.user_id
JOIN events e ON e.event_id = r.event_id
WHERE e.status = 'upcoming'
  AND e.city = u.city
ORDER BY e.start_date;

-- 2. Top Rated Events
SELECT e.event_id, e.title, AVG(f.rating) AS average_rating, COUNT(*) AS feedback_count
FROM events e
JOIN feedback f ON f.event_id = e.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(*) >= 10
ORDER BY average_rating DESC;

-- 3. Inactive Users
SELECT u.user_id, u.full_name, u.email
FROM users u
LEFT JOIN registrations r
    ON r.user_id = u.user_id
   AND r.registration_date >= CURRENT_DATE - INTERVAL 90 DAY
WHERE r.registration_id IS NULL;

-- 4. Peak Session Hours
SELECT e.event_id, e.title, COUNT(s.session_id) AS peak_session_count
FROM events e
LEFT JOIN sessions s
    ON s.event_id = e.event_id
   AND TIME(s.start_time) < '12:00:00'
   AND TIME(s.end_time) > '10:00:00'
GROUP BY e.event_id, e.title;

-- 5. Most Active Cities
SELECT e.city, COUNT(DISTINCT r.user_id) AS distinct_registrations
FROM events e
JOIN registrations r ON r.event_id = e.event_id
GROUP BY e.city
ORDER BY distinct_registrations DESC
LIMIT 5;

-- 6. Event Resource Summary
SELECT e.event_id, e.title,
       SUM(CASE WHEN r.resource_type = 'pdf' THEN 1 ELSE 0 END) AS pdf_count,
       SUM(CASE WHEN r.resource_type = 'image' THEN 1 ELSE 0 END) AS image_count,
       SUM(CASE WHEN r.resource_type = 'link' THEN 1 ELSE 0 END) AS link_count
FROM events e
LEFT JOIN resources r ON r.event_id = e.event_id
GROUP BY e.event_id, e.title;

-- 7. Low Feedback Alerts
SELECT u.full_name, e.title, f.rating, f.comments
FROM feedback f
JOIN users u ON u.user_id = f.user_id
JOIN events e ON e.event_id = f.event_id
WHERE f.rating < 3;

-- 8. Sessions per Upcoming Event
SELECT e.event_id, e.title, COUNT(s.session_id) AS session_count
FROM events e
LEFT JOIN sessions s ON s.event_id = e.event_id
WHERE e.status = 'upcoming'
GROUP BY e.event_id, e.title;

-- 9. Organizer Event Summary
SELECT u.full_name AS organizer_name, e.status, COUNT(e.event_id) AS event_count
FROM users u
JOIN events e ON e.organizer_id = u.user_id
GROUP BY u.full_name, e.status
ORDER BY u.full_name, e.status;

-- 10. Feedback Gap
SELECT e.event_id, e.title
FROM events e
JOIN registrations r ON r.event_id = e.event_id
LEFT JOIN feedback f ON f.event_id = e.event_id
WHERE f.feedback_id IS NULL
GROUP BY e.event_id, e.title;

-- 11. Daily New User Count
SELECT registration_date, COUNT(*) AS new_user_count
FROM users
WHERE registration_date >= CURRENT_DATE - INTERVAL 7 DAY
GROUP BY registration_date
ORDER BY registration_date;

-- 12. Event with Maximum Sessions
SELECT e.event_id, e.title, COUNT(s.session_id) AS session_count
FROM events e
LEFT JOIN sessions s ON s.event_id = e.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(s.session_id) = (
    SELECT MAX(session_total)
    FROM (
        SELECT COUNT(*) AS session_total
        FROM sessions
        GROUP BY event_id
    ) totals
);

-- 13. Average Rating per City
SELECT e.city, AVG(f.rating) AS average_rating
FROM events e
JOIN feedback f ON f.event_id = e.event_id
GROUP BY e.city;

-- 14. Most Registered Events
SELECT e.event_id, e.title, COUNT(r.registration_id) AS registration_count
FROM events e
JOIN registrations r ON r.event_id = e.event_id
GROUP BY e.event_id, e.title
ORDER BY registration_count DESC
LIMIT 3;

-- 15. Event Session Time Conflict
SELECT s1.event_id, e.title AS event_title,
       s1.title AS first_session, s2.title AS second_session
FROM sessions s1
JOIN sessions s2
    ON s1.event_id = s2.event_id
   AND s1.session_id < s2.session_id
   AND s1.start_time < s2.end_time
   AND s2.start_time < s1.end_time
JOIN events e ON e.event_id = s1.event_id;

-- 16. Unregistered Active Users
SELECT u.user_id, u.full_name, u.registration_date
FROM users u
LEFT JOIN registrations r ON r.user_id = u.user_id
WHERE u.registration_date >= CURRENT_DATE - INTERVAL 30 DAY
  AND r.registration_id IS NULL;

-- 17. Multi-Session Speakers
SELECT speaker_name, COUNT(*) AS session_count
FROM sessions
GROUP BY speaker_name
HAVING COUNT(*) > 1;

-- 18. Resource Availability Check
SELECT e.event_id, e.title
FROM events e
LEFT JOIN resources r ON r.event_id = e.event_id
WHERE r.resource_id IS NULL;

-- 19. Completed Events with Feedback Summary
SELECT e.event_id, e.title,
       COUNT(DISTINCT r.registration_id) AS total_registrations,
       AVG(f.rating) AS average_rating
FROM events e
LEFT JOIN registrations r ON r.event_id = e.event_id
LEFT JOIN feedback f ON f.event_id = e.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id, e.title;

-- 20. User Engagement Index
SELECT u.user_id, u.full_name,
       COUNT(DISTINCT r.event_id) AS events_registered,
       COUNT(DISTINCT f.feedback_id) AS feedback_submitted
FROM users u
LEFT JOIN registrations r ON r.user_id = u.user_id
LEFT JOIN feedback f ON f.user_id = u.user_id
GROUP BY u.user_id, u.full_name;

-- 21. Top Feedback Providers
SELECT u.user_id, u.full_name, COUNT(f.feedback_id) AS feedback_count
FROM users u
JOIN feedback f ON f.user_id = u.user_id
GROUP BY u.user_id, u.full_name
ORDER BY feedback_count DESC
LIMIT 5;

-- 22. Duplicate Registrations Check
SELECT user_id, event_id, COUNT(*) AS registration_count
FROM registrations
GROUP BY user_id, event_id
HAVING COUNT(*) > 1;

-- 23. Registration Trends
SELECT DATE_FORMAT(registration_date, '%Y-%m') AS registration_month,
       COUNT(*) AS registration_count
FROM registrations
WHERE registration_date >= CURRENT_DATE - INTERVAL 12 MONTH
GROUP BY DATE_FORMAT(registration_date, '%Y-%m')
ORDER BY registration_month;

-- 24. Average Session Duration per Event
SELECT e.event_id, e.title,
       AVG(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)) AS average_duration_minutes
FROM events e
JOIN sessions s ON s.event_id = e.event_id
GROUP BY e.event_id, e.title;

-- 25. Events Without Sessions
SELECT e.event_id, e.title
FROM events e
LEFT JOIN sessions s ON s.event_id = e.event_id
WHERE s.session_id IS NULL;
