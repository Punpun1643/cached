ALTER TABLE urls 
ALTER COLUMN date_added TYPE timestamp USING date_added::timestamp without time zone;

