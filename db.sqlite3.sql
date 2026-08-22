BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "account_emailaddress" (
	"id"	integer NOT NULL,
	"verified"	bool NOT NULL,
	"primary"	bool NOT NULL,
	"user_id"	char(32) NOT NULL,
	"email"	varchar(254) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "account_emailconfirmation" (
	"id"	integer NOT NULL,
	"created"	datetime NOT NULL,
	"sent"	datetime,
	"key"	varchar(64) NOT NULL UNIQUE,
	"email_address_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("email_address_id") REFERENCES "account_emailaddress"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "accounts_user" (
	"password"	varchar(128) NOT NULL,
	"last_login"	datetime,
	"is_superuser"	bool NOT NULL,
	"username"	varchar(150) NOT NULL UNIQUE,
	"first_name"	varchar(150) NOT NULL,
	"last_name"	varchar(150) NOT NULL,
	"is_staff"	bool NOT NULL,
	"is_active"	bool NOT NULL,
	"date_joined"	datetime NOT NULL,
	"id"	char(32) NOT NULL,
	"email"	varchar(254) NOT NULL UNIQUE,
	"role"	varchar(15) NOT NULL,
	"xp"	integer unsigned NOT NULL CHECK("xp" >= 0),
	"level"	integer unsigned NOT NULL CHECK("level" >= 0),
	"streak_days"	integer unsigned NOT NULL CHECK("streak_days" >= 0),
	"courses_completed"	integer unsigned NOT NULL CHECK("courses_completed" >= 0),
	"last_activity"	date,
	"expertise"	text NOT NULL,
	"experience"	text NOT NULL,
	"momo_number"	varchar(30) NOT NULL,
	"momo_provider"	varchar(20) NOT NULL,
	"bank_name"	varchar(100) NOT NULL,
	"bank_account"	varchar(50) NOT NULL,
	"bank_account_name"	varchar(100) NOT NULL,
	"total_students"	integer unsigned NOT NULL CHECK("total_students" >= 0),
	"total_revenue"	decimal NOT NULL,
	"avg_rating"	decimal NOT NULL,
	"avatar"	varchar(100),
	"bio"	text NOT NULL,
	"headline"	varchar(200) NOT NULL,
	"phone"	varchar(30) NOT NULL,
	"website"	varchar(200) NOT NULL,
	"linkedin"	varchar(200) NOT NULL,
	"twitter"	varchar(200) NOT NULL,
	"youtube"	varchar(200) NOT NULL,
	"facebook"	varchar(200) NOT NULL,
	"is_verified"	bool NOT NULL,
	"is_email_verified"	bool NOT NULL,
	"email_verified_at"	datetime,
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "accounts_user_groups" (
	"id"	integer NOT NULL,
	"user_id"	char(32) NOT NULL,
	"group_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "accounts_user_user_permissions" (
	"id"	integer NOT NULL,
	"user_id"	char(32) NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "ai_aiusagelog" (
	"id"	char(32) NOT NULL,
	"provider"	varchar(20) NOT NULL,
	"model_name"	varchar(80) NOT NULL,
	"task"	varchar(30) NOT NULL,
	"prompt"	text NOT NULL,
	"response"	text NOT NULL,
	"tokens_in"	integer unsigned NOT NULL CHECK("tokens_in" >= 0),
	"tokens_out"	integer unsigned NOT NULL CHECK("tokens_out" >= 0),
	"duration_ms"	integer unsigned NOT NULL CHECK("duration_ms" >= 0),
	"success"	bool NOT NULL,
	"created_at"	datetime NOT NULL,
	"user_id"	char(32),
	"error_message"	text NOT NULL,
	"cost_usd"	decimal NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "analytics_dailystat" (
	"id"	integer NOT NULL,
	"date"	date NOT NULL UNIQUE,
	"new_users"	integer unsigned NOT NULL CHECK("new_users" >= 0),
	"new_enrollments"	integer unsigned NOT NULL CHECK("new_enrollments" >= 0),
	"total_revenue"	decimal NOT NULL,
	"active_users"	integer unsigned NOT NULL CHECK("active_users" >= 0),
	"lesson_completions"	integer unsigned NOT NULL CHECK("lesson_completions" >= 0),
	"certificates_issued"	integer unsigned NOT NULL CHECK("certificates_issued" >= 0),
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_group" (
	"id"	integer NOT NULL,
	"name"	varchar(150) NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_group_permissions" (
	"id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_permission" (
	"id"	integer NOT NULL,
	"content_type_id"	integer NOT NULL,
	"codename"	varchar(100) NOT NULL,
	"name"	varchar(255) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "axes_accessattempt" (
	"id"	integer NOT NULL,
	"user_agent"	varchar(255) NOT NULL,
	"ip_address"	char(39),
	"username"	varchar(255),
	"http_accept"	varchar(1025) NOT NULL,
	"path_info"	varchar(255) NOT NULL,
	"attempt_time"	datetime NOT NULL,
	"get_data"	text NOT NULL,
	"post_data"	text NOT NULL,
	"failures_since_start"	integer unsigned NOT NULL CHECK("failures_since_start" >= 0),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "axes_accessattemptexpiration" (
	"access_attempt_id"	integer NOT NULL,
	"expires_at"	datetime NOT NULL,
	PRIMARY KEY("access_attempt_id"),
	FOREIGN KEY("access_attempt_id") REFERENCES "axes_accessattempt"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "axes_accessfailurelog" (
	"id"	integer NOT NULL,
	"user_agent"	varchar(255) NOT NULL,
	"ip_address"	char(39),
	"username"	varchar(255),
	"http_accept"	varchar(1025) NOT NULL,
	"path_info"	varchar(255) NOT NULL,
	"attempt_time"	datetime NOT NULL,
	"locked_out"	bool NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "axes_accesslog" (
	"id"	integer NOT NULL,
	"user_agent"	varchar(255) NOT NULL,
	"ip_address"	char(39),
	"username"	varchar(255),
	"http_accept"	varchar(1025) NOT NULL,
	"path_info"	varchar(255) NOT NULL,
	"attempt_time"	datetime NOT NULL,
	"logout_time"	datetime,
	"session_hash"	varchar(64) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "blog_blogpost" (
	"id"	char(32) NOT NULL,
	"title"	varchar(200) NOT NULL,
	"slug"	varchar(220) NOT NULL UNIQUE,
	"excerpt"	text NOT NULL,
	"content"	text NOT NULL,
	"thumbnail"	varchar(100),
	"status"	varchar(15) NOT NULL,
	"is_featured"	bool NOT NULL,
	"views"	integer unsigned NOT NULL CHECK("views" >= 0),
	"published_at"	datetime,
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	"author_id"	char(32) NOT NULL,
	"category_id"	bigint,
	PRIMARY KEY("id"),
	FOREIGN KEY("author_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("category_id") REFERENCES "courses_category"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "certificates_certificate" (
	"id"	char(32) NOT NULL,
	"number"	varchar(50) NOT NULL UNIQUE,
	"pdf"	varchar(100),
	"qr_code"	varchar(100),
	"is_valid"	bool NOT NULL,
	"issued_at"	datetime NOT NULL,
	"revoked_at"	datetime,
	"revocation_reason"	varchar(255) NOT NULL,
	"verify_count"	integer unsigned NOT NULL CHECK("verify_count" >= 0),
	"last_verified_at"	datetime,
	"course_id"	char(32) NOT NULL,
	"enrollment_id"	char(32) NOT NULL,
	"user_id"	char(32) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("course_id") REFERENCES "courses_course"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("enrollment_id") REFERENCES "enrollments_enrollment"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_category" (
	"id"	integer NOT NULL,
	"name"	varchar(80) NOT NULL,
	"slug"	varchar(50) NOT NULL UNIQUE,
	"description"	text NOT NULL,
	"icon"	varchar(50) NOT NULL,
	"image"	varchar(100),
	"display_order"	integer unsigned NOT NULL CHECK("display_order" >= 0),
	"is_featured"	bool NOT NULL,
	"is_active"	bool NOT NULL,
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	"parent_id"	bigint,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("parent_id") REFERENCES "courses_category"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_course" (
	"id"	char(32) NOT NULL,
	"title"	varchar(200) NOT NULL,
	"slug"	varchar(220) NOT NULL UNIQUE,
	"subtitle"	varchar(300) NOT NULL,
	"description"	text NOT NULL,
	"thumbnail"	varchar(100),
	"promo_video"	varchar(200) NOT NULL,
	"outcomes"	text NOT NULL CHECK((JSON_VALID("outcomes") OR "outcomes" IS NULL)),
	"requirements"	text NOT NULL CHECK((JSON_VALID("requirements") OR "requirements" IS NULL)),
	"level"	varchar(15) NOT NULL,
	"language"	varchar(50) NOT NULL,
	"status"	varchar(15) NOT NULL,
	"pricing"	varchar(15) NOT NULL,
	"price"	decimal NOT NULL,
	"sale_price"	decimal,
	"has_certificate"	bool NOT NULL,
	"drip_enabled"	bool NOT NULL,
	"allow_download"	bool NOT NULL,
	"is_featured"	bool NOT NULL,
	"is_bestseller"	bool NOT NULL,
	"is_private"	bool NOT NULL,
	"published_at"	datetime,
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	"category_id"	bigint,
	"instructor_id"	char(32) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("category_id") REFERENCES "courses_category"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("instructor_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_coursereview" (
	"id"	integer NOT NULL,
	"rating"	smallint unsigned NOT NULL CHECK("rating" >= 0),
	"comment"	text NOT NULL,
	"is_approved"	bool NOT NULL,
	"approved_at"	datetime,
	"helpful_count"	integer unsigned NOT NULL CHECK("helpful_count" >= 0),
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	"course_id"	char(32) NOT NULL,
	"enrollment_id"	char(32) NOT NULL,
	"user_id"	char(32) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("course_id") REFERENCES "courses_course"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("enrollment_id") REFERENCES "enrollments_enrollment"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_wishlist" (
	"id"	integer NOT NULL,
	"created_at"	datetime NOT NULL,
	"course_id"	char(32) NOT NULL,
	"user_id"	char(32) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("course_id") REFERENCES "courses_course"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_admin_log" (
	"id"	integer NOT NULL,
	"object_id"	text,
	"object_repr"	varchar(200) NOT NULL,
	"action_flag"	smallint unsigned NOT NULL CHECK("action_flag" >= 0),
	"change_message"	text NOT NULL,
	"content_type_id"	integer,
	"user_id"	char(32) NOT NULL,
	"action_time"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_content_type" (
	"id"	integer NOT NULL,
	"app_label"	varchar(100) NOT NULL,
	"model"	varchar(100) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "django_migrations" (
	"id"	integer NOT NULL,
	"app"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"applied"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "django_session" (
	"session_key"	varchar(40) NOT NULL,
	"session_data"	text NOT NULL,
	"expire_date"	datetime NOT NULL,
	PRIMARY KEY("session_key")
);
CREATE TABLE IF NOT EXISTS "django_site" (
	"id"	integer NOT NULL,
	"name"	varchar(50) NOT NULL,
	"domain"	varchar(100) NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "enrollments_enrollment" (
	"id"	char(32) NOT NULL,
	"status"	varchar(12) NOT NULL,
	"progress"	decimal NOT NULL,
	"source"	varchar(10) NOT NULL,
	"enrolled_at"	datetime NOT NULL,
	"completed_at"	datetime,
	"last_accessed_at"	datetime,
	"course_id"	char(32) NOT NULL,
	"current_lesson_id"	char(32),
	"user_id"	char(32) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("course_id") REFERENCES "courses_course"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("current_lesson_id") REFERENCES "lessons_lesson"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "enrollments_lessonprogress" (
	"id"	integer NOT NULL,
	"is_complete"	bool NOT NULL,
	"watch_time"	integer unsigned NOT NULL CHECK("watch_time" >= 0),
	"last_position"	integer unsigned NOT NULL CHECK("last_position" >= 0),
	"completed_at"	datetime,
	"started_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	"enrollment_id"	char(32) NOT NULL,
	"lesson_id"	char(32) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("enrollment_id") REFERENCES "enrollments_enrollment"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("lesson_id") REFERENCES "lessons_lesson"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "features_jobpost" (
	"id"	char(32) NOT NULL,
	"title"	varchar(200) NOT NULL,
	"company_name"	varchar(100) NOT NULL,
	"description"	text NOT NULL,
	"requirements"	text NOT NULL,
	"location"	varchar(100) NOT NULL,
	"job_type"	varchar(20) NOT NULL,
	"salary_min"	decimal,
	"salary_max"	decimal,
	"currency"	varchar(10) NOT NULL,
	"apply_url"	varchar(200) NOT NULL,
	"apply_email"	varchar(254) NOT NULL,
	"is_active"	bool NOT NULL,
	"is_featured"	bool NOT NULL,
	"deadline"	date,
	"views"	integer unsigned NOT NULL CHECK("views" >= 0),
	"created_at"	datetime NOT NULL,
	"employer_id"	char(32),
	PRIMARY KEY("id"),
	FOREIGN KEY("employer_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "features_learningpath" (
	"id"	char(32) NOT NULL,
	"title"	varchar(200) NOT NULL,
	"slug"	varchar(50) NOT NULL UNIQUE,
	"description"	text NOT NULL,
	"is_featured"	bool NOT NULL,
	"is_published"	bool NOT NULL,
	"created_at"	datetime NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "features_scholarship" (
	"id"	char(32) NOT NULL,
	"title"	varchar(200) NOT NULL,
	"description"	text NOT NULL,
	"sponsor"	varchar(100) NOT NULL,
	"amount"	decimal,
	"requirements"	text NOT NULL,
	"deadline"	date,
	"max_recipients"	integer unsigned NOT NULL CHECK("max_recipients" >= 0),
	"status"	varchar(20) NOT NULL,
	"is_featured"	bool NOT NULL,
	"created_at"	datetime NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "forums_forumreply" (
	"id"	char(32) NOT NULL,
	"content"	text NOT NULL,
	"is_solution"	bool NOT NULL,
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	"author_id"	char(32) NOT NULL,
	"thread_id"	char(32) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("author_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("thread_id") REFERENCES "forums_forumthread"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "forums_forumthread" (
	"id"	char(32) NOT NULL,
	"title"	varchar(200) NOT NULL,
	"content"	text NOT NULL,
	"is_pinned"	bool NOT NULL,
	"is_locked"	bool NOT NULL,
	"views"	integer unsigned NOT NULL CHECK("views" >= 0),
	"replies_count"	integer unsigned NOT NULL CHECK("replies_count" >= 0),
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	"last_reply_at"	datetime,
	"author_id"	char(32) NOT NULL,
	"course_id"	char(32) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("author_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("course_id") REFERENCES "courses_course"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "gamification_leaderboard" (
	"id"	integer NOT NULL,
	"rank"	integer unsigned NOT NULL CHECK("rank" >= 0),
	"xp"	integer unsigned NOT NULL CHECK("xp" >= 0),
	"updated_at"	datetime NOT NULL,
	"user_id"	char(32) NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "lessons_coursemodule" (
	"id"	char(32) NOT NULL,
	"title"	varchar(300) NOT NULL,
	"description"	text NOT NULL,
	"module_order"	integer unsigned NOT NULL CHECK("module_order" >= 0),
	"is_published"	bool NOT NULL,
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	"course_id"	char(32) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("course_id") REFERENCES "courses_course"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "lessons_lesson" (
	"id"	char(32) NOT NULL,
	"title"	varchar(300) NOT NULL,
	"slug"	varchar(320) NOT NULL,
	"description"	text NOT NULL,
	"content"	text NOT NULL,
	"type"	varchar(15) NOT NULL,
	"video_url"	varchar(200) NOT NULL,
	"video_source"	varchar(10) NOT NULL,
	"video_file"	varchar(100),
	"pdf_file"	varchar(100),
	"audio_file"	varchar(100),
	"ppt_file"	varchar(100),
	"thumbnail"	varchar(100),
	"subtitle_vtt"	varchar(100),
	"duration"	integer unsigned NOT NULL CHECK("duration" >= 0),
	"xp_reward"	integer unsigned NOT NULL CHECK("xp_reward" >= 0),
	"is_free"	bool NOT NULL,
	"is_drip"	bool NOT NULL,
	"drip_after"	integer unsigned NOT NULL CHECK("drip_after" >= 0),
	"lesson_order"	integer unsigned NOT NULL CHECK("lesson_order" >= 0),
	"is_published"	bool NOT NULL,
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	"course_id"	char(32) NOT NULL,
	"module_id"	char(32),
	PRIMARY KEY("id"),
	FOREIGN KEY("course_id") REFERENCES "courses_course"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("module_id") REFERENCES "lessons_coursemodule"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "notifications_notification" (
	"id"	char(32) NOT NULL,
	"type"	varchar(20) NOT NULL,
	"title"	varchar(200) NOT NULL,
	"message"	text NOT NULL,
	"link"	varchar(200) NOT NULL,
	"is_read"	bool NOT NULL,
	"read_at"	datetime,
	"is_archived"	bool NOT NULL,
	"created_at"	datetime NOT NULL,
	"expires_at"	datetime,
	"user_id"	char(32) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "quizzes_answer" (
	"id"	char(32) NOT NULL,
	"text"	text NOT NULL,
	"is_correct"	bool NOT NULL,
	"order"	integer unsigned NOT NULL CHECK("order" >= 0),
	"question_id"	char(32) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("question_id") REFERENCES "quizzes_question"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "quizzes_question" (
	"id"	char(32) NOT NULL,
	"qtype"	varchar(12) NOT NULL,
	"text"	text NOT NULL,
	"explanation"	text NOT NULL,
	"hint"	text NOT NULL,
	"points"	integer unsigned NOT NULL CHECK("points" >= 0),
	"order"	integer unsigned NOT NULL CHECK("order" >= 0),
	"is_active"	bool NOT NULL,
	"created_at"	datetime NOT NULL,
	"quiz_id"	char(32) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("quiz_id") REFERENCES "quizzes_quiz"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "quizzes_quiz" (
	"id"	char(32) NOT NULL,
	"title"	varchar(200) NOT NULL,
	"description"	text NOT NULL,
	"pass_score"	decimal NOT NULL,
	"time_limit"	integer unsigned NOT NULL CHECK("time_limit" >= 0),
	"max_attempts"	integer unsigned NOT NULL CHECK("max_attempts" >= 0),
	"shuffle_questions"	bool NOT NULL,
	"show_answers"	bool NOT NULL,
	"is_active"	bool NOT NULL,
	"created_at"	datetime NOT NULL,
	"updated_at"	datetime NOT NULL,
	"course_id"	char(32) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("course_id") REFERENCES "courses_course"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "quizzes_quizattempt" (
	"id"	char(32) NOT NULL,
	"attempt_number"	integer unsigned NOT NULL CHECK("attempt_number" >= 0),
	"status"	varchar(12) NOT NULL,
	"responses"	text NOT NULL CHECK((JSON_VALID("responses") OR "responses" IS NULL)),
	"answers_json"	text NOT NULL CHECK((JSON_VALID("answers_json") OR "answers_json" IS NULL)),
	"score"	decimal NOT NULL,
	"passed"	bool NOT NULL,
	"time_taken"	integer unsigned NOT NULL CHECK("time_taken" >= 0),
	"ip_address"	char(39),
	"user_agent"	text NOT NULL,
	"created_at"	datetime NOT NULL,
	"completed_at"	datetime,
	"enrollment_id"	char(32),
	"quiz_id"	char(32) NOT NULL,
	"user_id"	char(32) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("enrollment_id") REFERENCES "enrollments_enrollment"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("quiz_id") REFERENCES "quizzes_quiz"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "socialaccount_socialaccount" (
	"id"	integer NOT NULL,
	"provider"	varchar(200) NOT NULL,
	"uid"	varchar(191) NOT NULL,
	"last_login"	datetime NOT NULL,
	"date_joined"	datetime NOT NULL,
	"user_id"	char(32) NOT NULL,
	"extra_data"	text NOT NULL CHECK((JSON_VALID("extra_data") OR "extra_data" IS NULL)),
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "socialaccount_socialapp" (
	"id"	integer NOT NULL,
	"provider"	varchar(30) NOT NULL,
	"name"	varchar(40) NOT NULL,
	"client_id"	varchar(191) NOT NULL,
	"secret"	varchar(191) NOT NULL,
	"key"	varchar(191) NOT NULL,
	"provider_id"	varchar(200) NOT NULL,
	"settings"	text NOT NULL CHECK((JSON_VALID("settings") OR "settings" IS NULL)),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "socialaccount_socialapp_sites" (
	"id"	integer NOT NULL,
	"socialapp_id"	integer NOT NULL,
	"site_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("site_id") REFERENCES "django_site"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("socialapp_id") REFERENCES "socialaccount_socialapp"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "socialaccount_socialtoken" (
	"id"	integer NOT NULL,
	"token"	text NOT NULL,
	"token_secret"	text NOT NULL,
	"expires_at"	datetime,
	"account_id"	integer NOT NULL,
	"app_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("account_id") REFERENCES "socialaccount_socialaccount"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("app_id") REFERENCES "socialaccount_socialapp"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "token_blacklist_blacklistedtoken" (
	"blacklisted_at"	datetime NOT NULL,
	"token_id"	bigint NOT NULL UNIQUE,
	"id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("token_id") REFERENCES "token_blacklist_outstandingtoken"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "token_blacklist_outstandingtoken" (
	"token"	text NOT NULL,
	"created_at"	datetime,
	"expires_at"	datetime NOT NULL,
	"user_id"	char(32),
	"jti"	varchar(255) NOT NULL UNIQUE,
	"id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
INSERT INTO "accounts_user" ("password","last_login","is_superuser","username","first_name","last_name","is_staff","is_active","date_joined","id","email","role","xp","level","streak_days","courses_completed","last_activity","expertise","experience","momo_number","momo_provider","bank_name","bank_account","bank_account_name","total_students","total_revenue","avg_rating","avatar","bio","headline","phone","website","linkedin","twitter","youtube","facebook","is_verified","is_email_verified","email_verified_at","created_at","updated_at") VALUES ('pbkdf2_sha256$1500000$opdjnXeDW6rwmfZrbTdpMK$m0GxGqTUeqzw73TZXMoVr0SDMLHlOu8kIw93ERaFuxw=',NULL,1,'admin','Admin','TechBridge',1,1,'2026-08-11 13:47:11.469217','7100b2fe82014d9089bfe43b97a2a910','admin@techbridgeskills.ug','admin',0,1,0,0,NULL,'','','','','','','',0,0,0,'','Platform administrator for TechBridge Skills Hub.','Platform Administrator','','','','','','',1,1,NULL,'2026-08-11 13:47:11.469753','2026-08-11 13:47:11.737561');
INSERT INTO "accounts_user" ("password","last_login","is_superuser","username","first_name","last_name","is_staff","is_active","date_joined","id","email","role","xp","level","streak_days","courses_completed","last_activity","expertise","experience","momo_number","momo_provider","bank_name","bank_account","bank_account_name","total_students","total_revenue","avg_rating","avatar","bio","headline","phone","website","linkedin","twitter","youtube","facebook","is_verified","is_email_verified","email_verified_at","created_at","updated_at") VALUES ('pbkdf2_sha256$1500000$6khxo6hM2sQDjTeyC6GmD3$LTcq17l2/j2VcaJ4Izci6XKDZAnimW2UR6rlZdagZk0=',NULL,0,'john.kiggundu','John','Kiggundu',0,1,'2026-08-11 13:47:11.748625','9b87e325056347f19fd3026d5cad23e1','john.kiggundu@techbridgeskills.ug','instructor',0,1,0,0,NULL,'Networking, Cisco, Cloud','8 years in network engineering at MTN Uganda and private practice.','+256772123456','mtn','','','',12480,0,4.9,'','Senior network engineer with expertise in Cisco, MikroTik and cloud networking.','Network Engineer · CCNA · 8 yrs experience','','','','','','',1,1,NULL,'2026-08-11 13:47:11.749050','2026-08-11 13:47:12.015680');
INSERT INTO "accounts_user" ("password","last_login","is_superuser","username","first_name","last_name","is_staff","is_active","date_joined","id","email","role","xp","level","streak_days","courses_completed","last_activity","expertise","experience","momo_number","momo_provider","bank_name","bank_account","bank_account_name","total_students","total_revenue","avg_rating","avatar","bio","headline","phone","website","linkedin","twitter","youtube","facebook","is_verified","is_email_verified","email_verified_at","created_at","updated_at") VALUES ('pbkdf2_sha256$1200000$4W5aJ67GakvEnMvlyMAgyG$dsyZfdHSCZR7DXEH+y59ewMHrpzcoZFKkjPGE8/Zt70=',NULL,0,'amara.okafor','Amara','Okafor',0,1,'2026-08-11 13:47:12.019208','88542a0c1a5b419daadac8879dec6eba','amara.okafor@techbridgeskills.ug','instructor',0,1,0,0,NULL,'Cybersecurity, Ethical Hacking, Penetration Testing','10 years in information security.','+256782234567','airtel','','','',8920,0,4.8,'','','Cybersecurity Expert · CEH · CISSP','','','','','','',1,1,NULL,'2026-08-11 13:47:12.019541','2026-08-11 13:47:12.283383');
INSERT INTO "accounts_user" ("password","last_login","is_superuser","username","first_name","last_name","is_staff","is_active","date_joined","id","email","role","xp","level","streak_days","courses_completed","last_activity","expertise","experience","momo_number","momo_provider","bank_name","bank_account","bank_account_name","total_students","total_revenue","avg_rating","avatar","bio","headline","phone","website","linkedin","twitter","youtube","facebook","is_verified","is_email_verified","email_verified_at","created_at","updated_at") VALUES ('pbkdf2_sha256$1200000$Dk0i2MNOBZ6VmCd9LvjhcW$2tJjZrj0wCvGAd8cPjan/w1JclJ4HBCmNUnZOWQLJVk=',NULL,0,'priya.ramanathan','Priya','Ramanathan',0,1,'2026-08-11 13:47:12.286718','eadca09c5e0b4b0d85f6b1f3fddcbf29','priya.ramanathan@techbridgeskills.ug','instructor',0,1,0,0,NULL,'Web Development, TypeScript, React, Node.js','7 years building SaaS products.','','','','','',6340,0,4.7,'','','Full-Stack Engineer · TypeScript · React · Node.js','','','','','','',1,1,NULL,'2026-08-11 13:47:12.287062','2026-08-11 13:47:12.553381');
INSERT INTO "accounts_user" ("password","last_login","is_superuser","username","first_name","last_name","is_staff","is_active","date_joined","id","email","role","xp","level","streak_days","courses_completed","last_activity","expertise","experience","momo_number","momo_provider","bank_name","bank_account","bank_account_name","total_students","total_revenue","avg_rating","avatar","bio","headline","phone","website","linkedin","twitter","youtube","facebook","is_verified","is_email_verified","email_verified_at","created_at","updated_at") VALUES ('pbkdf2_sha256$1200000$DJbW5GZHXiapPV6YHmra35$60XbQxyu1d7eW/c31rMmkhefXlLD0XXR2zhsJ5TRKy4=',NULL,0,'ethan.cole','Ethan','Cole',0,1,'2026-08-11 13:47:12.556993','569b743c804d467d8b423796a15d442d','ethan.cole@techbridgeskills.ug','instructor',0,1,0,0,NULL,'Machine Learning, AI, Python, TensorFlow','PhD in Computer Science, 5 years ML research.','','','','','',4200,0,4.8,'','','ML Engineer · TensorFlow · PyTorch','','','','','','',1,1,NULL,'2026-08-11 13:47:12.557351','2026-08-11 13:47:12.824676');
INSERT INTO "accounts_user" ("password","last_login","is_superuser","username","first_name","last_name","is_staff","is_active","date_joined","id","email","role","xp","level","streak_days","courses_completed","last_activity","expertise","experience","momo_number","momo_provider","bank_name","bank_account","bank_account_name","total_students","total_revenue","avg_rating","avatar","bio","headline","phone","website","linkedin","twitter","youtube","facebook","is_verified","is_email_verified","email_verified_at","created_at","updated_at") VALUES ('pbkdf2_sha256$1200000$q75pNst6UvgqCOJdfB52F3$YrezZAfJlPQphdKSRP/zy5GxI041WMWxhRuFeutfiPw=',NULL,0,'sofia.marin','Sofia','Marin',0,1,'2026-08-11 13:47:12.828111','67e3d1198de54e3f82c197141f54fe8e','sofia.marin@techbridgeskills.ug','instructor',0,1,0,0,NULL,'Cloud Computing, AWS, DevOps, Terraform','AWS cert holder, 6 years cloud architecture.','','','','','',3800,0,4.9,'','','AWS Solutions Architect Professional','','','','','','',1,1,NULL,'2026-08-11 13:47:12.828439','2026-08-11 13:47:13.095335');
INSERT INTO "accounts_user" ("password","last_login","is_superuser","username","first_name","last_name","is_staff","is_active","date_joined","id","email","role","xp","level","streak_days","courses_completed","last_activity","expertise","experience","momo_number","momo_provider","bank_name","bank_account","bank_account_name","total_students","total_revenue","avg_rating","avatar","bio","headline","phone","website","linkedin","twitter","youtube","facebook","is_verified","is_email_verified","email_verified_at","created_at","updated_at") VALUES ('pbkdf2_sha256$1500000$quy8wXFZVv3hJkyVrzlcJT$5c4rGHA5YiyGEehZ7ebyhVgwak0ivori43HNeAy66ao=',NULL,0,'sarah.namukasa','Sarah','Namukasa',0,1,'2026-08-11 13:47:13.098814','6678c90efb3d4b8bacd1e24052c79ed7','sarah.namukasa@gmail.com','student',1850,18,12,2,NULL,'','','','','','','',0,0,0,'','','Aspiring Network Engineer · Kampala, Uganda','','','','','','',1,1,NULL,'2026-08-11 13:47:13.099162','2026-08-11 13:47:13.362766');
INSERT INTO "accounts_user" ("password","last_login","is_superuser","username","first_name","last_name","is_staff","is_active","date_joined","id","email","role","xp","level","streak_days","courses_completed","last_activity","expertise","experience","momo_number","momo_provider","bank_name","bank_account","bank_account_name","total_students","total_revenue","avg_rating","avatar","bio","headline","phone","website","linkedin","twitter","youtube","facebook","is_verified","is_email_verified","email_verified_at","created_at","updated_at") VALUES ('pbkdf2_sha256$1200000$Ap9jVNTZcXwf0XhgwlMaGT$staR7rmpn4jvq/wwsFVpUSdHEWFqDgeuMxazPyR/+p4=',NULL,0,'david.mulondo','David','Mulondo',0,1,'2026-08-11 13:47:13.366315','515e440d4e42441e8c80a4caff48611b','david.mulondo@gmail.com','student',980,9,5,0,NULL,'','','','','','','',0,0,0,'','','Web Developer in training','','','','','','',1,1,NULL,'2026-08-11 13:47:13.366645','2026-08-11 13:47:13.629154');
INSERT INTO "accounts_user" ("password","last_login","is_superuser","username","first_name","last_name","is_staff","is_active","date_joined","id","email","role","xp","level","streak_days","courses_completed","last_activity","expertise","experience","momo_number","momo_provider","bank_name","bank_account","bank_account_name","total_students","total_revenue","avg_rating","avatar","bio","headline","phone","website","linkedin","twitter","youtube","facebook","is_verified","is_email_verified","email_verified_at","created_at","updated_at") VALUES ('pbkdf2_sha256$1200000$Ki3qTzLhrRCGIuXvj4YA3s$dtQA8ItiP7uCcl9vWvkim5BrNXU1/Jlo2Bj87bdodl4=',NULL,0,'grace.atim','Grace','Atim',0,1,'2026-08-11 13:47:13.632626','e8d60db0055a4187b044e64bf815bb19','grace.atim@gmail.com','student',1620,16,8,1,NULL,'','','','','','','',0,0,0,'','','Data Science enthusiast · Gulu','','','','','','',1,1,NULL,'2026-08-11 13:47:13.633095','2026-08-11 13:47:13.902872');
INSERT INTO "accounts_user" ("password","last_login","is_superuser","username","first_name","last_name","is_staff","is_active","date_joined","id","email","role","xp","level","streak_days","courses_completed","last_activity","expertise","experience","momo_number","momo_provider","bank_name","bank_account","bank_account_name","total_students","total_revenue","avg_rating","avatar","bio","headline","phone","website","linkedin","twitter","youtube","facebook","is_verified","is_email_verified","email_verified_at","created_at","updated_at") VALUES ('pbkdf2_sha256$1200000$34xrpwj8bYeaGk4QkBOUlV$D1kKSjo//Z4kLdP7xuwO2Wvn1iZpC+43W6wzkFFBZHs=',NULL,0,'brian.ssemanda','Brian','Ssemanda',0,1,'2026-08-11 13:47:13.906277','c7b5f45870694ec5bafb09d93614c073','brian.ssemanda@gmail.com','student',1440,14,6,0,NULL,'','','','','','','',0,0,0,'','','CMS Updated','','','','','','',1,1,NULL,'2026-08-11 13:47:13.906644','2026-08-12 10:02:57.449736');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (1,'2026-07-28',43,38,2685932,741,178,2,'2026-08-11 13:47:14.417970','2026-08-11 13:47:14.417989');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (2,'2026-07-29',57,46,2237851,328,150,2,'2026-08-11 13:47:14.420061','2026-08-11 13:47:14.420073');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (3,'2026-07-30',72,24,2860797,729,104,17,'2026-08-11 13:47:14.422118','2026-08-11 13:47:14.422129');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (4,'2026-07-31',66,53,988378,368,184,11,'2026-08-11 13:47:14.423906','2026-08-11 13:47:14.423917');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (5,'2026-08-01',76,47,1057219,614,420,20,'2026-08-11 13:47:14.425903','2026-08-11 13:47:14.425919');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (6,'2026-08-02',63,27,1802436,755,149,5,'2026-08-11 13:47:14.427685','2026-08-11 13:47:14.427696');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (7,'2026-08-03',73,43,1142038,321,462,9,'2026-08-11 13:47:14.429624','2026-08-11 13:47:14.429638');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (8,'2026-08-04',59,46,1259789,396,369,17,'2026-08-11 13:47:14.431663','2026-08-11 13:47:14.431679');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (9,'2026-08-05',45,41,1095530,641,315,2,'2026-08-11 13:47:14.433620','2026-08-11 13:47:14.433632');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (10,'2026-08-06',76,38,2586928,601,163,19,'2026-08-11 13:47:14.435462','2026-08-11 13:47:14.435473');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (11,'2026-08-07',48,27,1952570,366,152,3,'2026-08-11 13:47:14.437355','2026-08-11 13:47:14.437365');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (12,'2026-08-08',76,23,1800145,410,249,20,'2026-08-11 13:47:14.439086','2026-08-11 13:47:14.439098');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (13,'2026-08-09',40,18,1654727,573,227,20,'2026-08-11 13:47:14.440966','2026-08-11 13:47:14.440978');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (14,'2026-08-10',65,52,2076680,283,448,13,'2026-08-11 13:47:14.442684','2026-08-11 13:47:14.442695');
INSERT INTO "analytics_dailystat" ("id","date","new_users","new_enrollments","total_revenue","active_users","lesson_completions","certificates_issued","created_at","updated_at") VALUES (15,'2026-08-11',61,57,2300440,601,294,2,'2026-08-12 10:31:24.932350','2026-08-12 10:31:24.932376');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (1,1,'add_logentry','Can add log entry');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (2,1,'change_logentry','Can change log entry');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (3,1,'delete_logentry','Can delete log entry');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (4,1,'view_logentry','Can view log entry');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (5,3,'add_permission','Can add permission');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (6,3,'change_permission','Can change permission');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (7,3,'delete_permission','Can delete permission');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (8,3,'view_permission','Can view permission');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (9,2,'add_group','Can add group');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (10,2,'change_group','Can change group');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (11,2,'delete_group','Can delete group');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (12,2,'view_group','Can view group');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (13,4,'add_contenttype','Can add content type');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (14,4,'change_contenttype','Can change content type');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (15,4,'delete_contenttype','Can delete content type');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (16,4,'view_contenttype','Can view content type');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (17,5,'add_session','Can add session');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (18,5,'change_session','Can change session');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (19,5,'delete_session','Can delete session');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (20,5,'view_session','Can view session');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (21,6,'add_site','Can add site');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (22,6,'change_site','Can change site');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (23,6,'delete_site','Can delete site');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (24,6,'view_site','Can view site');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (25,7,'add_blacklistedtoken','Can add blacklisted token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (26,7,'change_blacklistedtoken','Can change blacklisted token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (27,7,'delete_blacklistedtoken','Can delete blacklisted token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (28,7,'view_blacklistedtoken','Can view blacklisted token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (29,8,'add_outstandingtoken','Can add outstanding token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (30,8,'change_outstandingtoken','Can change outstanding token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (31,8,'delete_outstandingtoken','Can delete outstanding token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (32,8,'view_outstandingtoken','Can view outstanding token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (33,9,'add_emailaddress','Can add email address');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (34,9,'change_emailaddress','Can change email address');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (35,9,'delete_emailaddress','Can delete email address');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (36,9,'view_emailaddress','Can view email address');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (37,10,'add_emailconfirmation','Can add email confirmation');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (38,10,'change_emailconfirmation','Can change email confirmation');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (39,10,'delete_emailconfirmation','Can delete email confirmation');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (40,10,'view_emailconfirmation','Can view email confirmation');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (41,11,'add_socialaccount','Can add social account');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (42,11,'change_socialaccount','Can change social account');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (43,11,'delete_socialaccount','Can delete social account');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (44,11,'view_socialaccount','Can view social account');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (45,12,'add_socialapp','Can add social application');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (46,12,'change_socialapp','Can change social application');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (47,12,'delete_socialapp','Can delete social application');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (48,12,'view_socialapp','Can view social application');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (49,13,'add_socialtoken','Can add social application token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (50,13,'change_socialtoken','Can change social application token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (51,13,'delete_socialtoken','Can delete social application token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (52,13,'view_socialtoken','Can view social application token');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (53,14,'add_accessattempt','Can add access attempt');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (54,14,'change_accessattempt','Can change access attempt');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (55,14,'delete_accessattempt','Can delete access attempt');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (56,14,'view_accessattempt','Can view access attempt');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (57,17,'add_accesslog','Can add access log');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (58,17,'change_accesslog','Can change access log');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (59,17,'delete_accesslog','Can delete access log');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (60,17,'view_accesslog','Can view access log');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (61,16,'add_accessfailurelog','Can add access failure');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (62,16,'change_accessfailurelog','Can change access failure');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (63,16,'delete_accessfailurelog','Can delete access failure');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (64,16,'view_accessfailurelog','Can view access failure');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (65,15,'add_accessattemptexpiration','Can add access attempt expiration');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (66,15,'change_accessattemptexpiration','Can change access attempt expiration');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (67,15,'delete_accessattemptexpiration','Can delete access attempt expiration');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (68,15,'view_accessattemptexpiration','Can view access attempt expiration');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (69,18,'add_user','Can add user');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (70,18,'change_user','Can change user');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (71,18,'delete_user','Can delete user');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (72,18,'view_user','Can view user');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (73,22,'add_wishlist','Can add wishlist');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (74,22,'change_wishlist','Can change wishlist');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (75,22,'delete_wishlist','Can delete wishlist');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (76,22,'view_wishlist','Can view wishlist');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (77,19,'add_category','Can add category');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (78,19,'change_category','Can change category');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (79,19,'delete_category','Can delete category');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (80,19,'view_category','Can view category');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (81,20,'add_course','Can add course');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (82,20,'change_course','Can change course');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (83,20,'delete_course','Can delete course');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (84,20,'view_course','Can view course');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (85,21,'add_coursereview','Can add course review');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (86,21,'change_coursereview','Can change course review');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (87,21,'delete_coursereview','Can delete course review');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (88,21,'view_coursereview','Can view course review');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (89,23,'add_lesson','Can add lesson');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (90,23,'change_lesson','Can change lesson');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (91,23,'delete_lesson','Can delete lesson');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (92,23,'view_lesson','Can view lesson');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (93,25,'add_question','Can add question');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (94,25,'change_question','Can change question');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (95,25,'delete_question','Can delete question');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (96,25,'view_question','Can view question');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (97,24,'add_answer','Can add answer');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (98,24,'change_answer','Can change answer');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (99,24,'delete_answer','Can delete answer');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (100,24,'view_answer','Can view answer');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (101,26,'add_quiz','Can add quiz');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (102,26,'change_quiz','Can change quiz');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (103,26,'delete_quiz','Can delete quiz');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (104,26,'view_quiz','Can view quiz');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (105,27,'add_quizattempt','Can add quiz attempt');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (106,27,'change_quizattempt','Can change quiz attempt');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (107,27,'delete_quizattempt','Can delete quiz attempt');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (108,27,'view_quizattempt','Can view quiz attempt');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (109,28,'add_enrollment','Can add enrollment');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (110,28,'change_enrollment','Can change enrollment');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (111,28,'delete_enrollment','Can delete enrollment');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (112,28,'view_enrollment','Can view enrollment');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (113,29,'add_lessonprogress','Can add lesson progress');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (114,29,'change_lessonprogress','Can change lesson progress');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (115,29,'delete_lessonprogress','Can delete lesson progress');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (116,29,'view_lessonprogress','Can view lesson progress');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (117,30,'add_certificate','Can add certificate');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (118,30,'change_certificate','Can change certificate');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (119,30,'delete_certificate','Can delete certificate');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (120,30,'view_certificate','Can view certificate');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (121,31,'add_notification','Can add notification');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (122,31,'change_notification','Can change notification');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (123,31,'delete_notification','Can delete notification');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (124,31,'view_notification','Can view notification');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (125,32,'add_leaderboard','Can add leaderboard');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (126,32,'change_leaderboard','Can change leaderboard');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (127,32,'delete_leaderboard','Can delete leaderboard');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (128,32,'view_leaderboard','Can view leaderboard');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (129,34,'add_forumthread','Can add forum thread');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (130,34,'change_forumthread','Can change forum thread');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (131,34,'delete_forumthread','Can delete forum thread');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (132,34,'view_forumthread','Can view forum thread');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (133,33,'add_forumreply','Can add forum reply');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (134,33,'change_forumreply','Can change forum reply');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (135,33,'delete_forumreply','Can delete forum reply');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (136,33,'view_forumreply','Can view forum reply');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (137,35,'add_blogpost','Can add blog post');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (138,35,'change_blogpost','Can change blog post');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (139,35,'delete_blogpost','Can delete blog post');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (140,35,'view_blogpost','Can view blog post');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (141,37,'add_learningpath','Can add learning path');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (142,37,'change_learningpath','Can change learning path');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (143,37,'delete_learningpath','Can delete learning path');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (144,37,'view_learningpath','Can view learning path');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (145,38,'add_scholarship','Can add scholarship');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (146,38,'change_scholarship','Can change scholarship');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (147,38,'delete_scholarship','Can delete scholarship');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (148,38,'view_scholarship','Can view scholarship');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (149,36,'add_jobpost','Can add job post');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (150,36,'change_jobpost','Can change job post');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (151,36,'delete_jobpost','Can delete job post');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (152,36,'view_jobpost','Can view job post');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (153,39,'add_dailystat','Can add daily stat');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (154,39,'change_dailystat','Can change daily stat');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (155,39,'delete_dailystat','Can delete daily stat');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (156,39,'view_dailystat','Can view daily stat');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (157,40,'add_aiusagelog','Can add ai usage log');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (158,40,'change_aiusagelog','Can change ai usage log');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (159,40,'delete_aiusagelog','Can delete ai usage log');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (160,40,'view_aiusagelog','Can view ai usage log');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (161,41,'add_coursemodule','Can add course module');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (162,41,'change_coursemodule','Can change course module');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (163,41,'delete_coursemodule','Can delete course module');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (164,41,'view_coursemodule','Can view course module');
INSERT INTO "blog_blogpost" ("id","title","slug","excerpt","content","thumbnail","status","is_featured","views","published_at","created_at","updated_at","author_id","category_id") VALUES ('6667445e9bac4384b3d16ad95c5bdd1a','How to Start a Cybersecurity Career in Uganda in 2026','cybersecurity-career-2026','A practical roadmap to breaking into Uganda''s fast-growing cybersecurity sector.','<p>Uganda''s digital economy is growing rapidly, and with it, the demand for cybersecurity professionals...</p>','','published',1,0,'2026-08-11 13:47:14.410163','2026-08-11 13:47:14.411050','2026-08-11 13:47:14.411061','7100b2fe82014d9089bfe43b97a2a910',NULL);
INSERT INTO "blog_blogpost" ("id","title","slug","excerpt","content","thumbnail","status","is_featured","views","published_at","created_at","updated_at","author_id","category_id") VALUES ('2c2745b98ba242189e04368b2e6b704b','TypeScript vs JavaScript: What to Learn in 2026','typescript-vs-javascript-2026','Should you learn TypeScript or stick with plain JavaScript? We break it down.','<p>TypeScript has become the language of choice for professional JavaScript development...</p>','','published',0,0,'2026-08-11 13:47:14.412592','2026-08-11 13:47:14.413373','2026-08-11 13:47:14.413385','7100b2fe82014d9089bfe43b97a2a910',NULL);
INSERT INTO "blog_blogpost" ("id","title","slug","excerpt","content","thumbnail","status","is_featured","views","published_at","created_at","updated_at","author_id","category_id") VALUES ('1453136ddccb4a62a324e8a630b657ff','AWS vs Azure vs GCP: Which Cloud Certification is Best for Ugandans?','cloud-certifications-comparison','Comparing the top three cloud platforms for African learners and job seekers.','<p>Cloud computing certifications are among the most valuable credentials you can earn in 2026...</p>','','published',0,0,'2026-08-11 13:47:14.414699','2026-08-11 13:47:14.415323','2026-08-11 13:47:14.415329','7100b2fe82014d9089bfe43b97a2a910',NULL);
INSERT INTO "certificates_certificate" ("id","number","pdf","qr_code","is_valid","issued_at","revoked_at","revocation_reason","verify_count","last_verified_at","course_id","enrollment_id","user_id") VALUES ('dbff54ed803540b1b6f46b9c0d390b35','TBS-2026-NET-12480','','',1,'2026-08-11 13:47:14.365492',NULL,'',0,NULL,'4c654e575ed94645949e122012bde32d','f7620788eed34cba95893c0b4ded29e0','6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "certificates_certificate" ("id","number","pdf","qr_code","is_valid","issued_at","revoked_at","revocation_reason","verify_count","last_verified_at","course_id","enrollment_id","user_id") VALUES ('51f1de848d774b1c982fbf05983a5d94','TBS-2026-TS-04812','','',1,'2026-08-11 13:47:14.367978',NULL,'',0,NULL,'cbfae4b653ed42c4b9954811df790bda','66834a1555ec41ff95862bdb66449282','6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "certificates_certificate" ("id","number","pdf","qr_code","is_valid","issued_at","revoked_at","revocation_reason","verify_count","last_verified_at","course_id","enrollment_id","user_id") VALUES ('bcd38e32f57a4b588bed8215a203e963','TBS-2026-NET-08920','','',1,'2026-08-11 13:47:14.370469',NULL,'',0,NULL,'4c654e575ed94645949e122012bde32d','83b436adb04e452ea0a868f67d53e387','e8d60db0055a4187b044e64bf815bb19');
INSERT INTO "certificates_certificate" ("id","number","pdf","qr_code","is_valid","issued_at","revoked_at","revocation_reason","verify_count","last_verified_at","course_id","enrollment_id","user_id") VALUES ('7872dd3ba2b546c48a125f78682834bc','TBS-2026-ML-06740','','',1,'2026-08-11 13:47:14.373397',NULL,'',0,NULL,'769c409d82894a67a6b566f2a3f5fdc7','f53287c9f62343b89b2c16b568df4afc','e8d60db0055a4187b044e64bf815bb19');
INSERT INTO "certificates_certificate" ("id","number","pdf","qr_code","is_valid","issued_at","revoked_at","revocation_reason","verify_count","last_verified_at","course_id","enrollment_id","user_id") VALUES ('fb87af3def6042b8b21d16f2920f3597','TBS-2026-NET-F4678','','',1,'2026-08-12 10:27:45.596904',NULL,'',1,'2026-08-12 10:27:45.774767','4c654e575ed94645949e122012bde32d','1a521e297b7141baad8207fbcfae0d3c','c7b5f45870694ec5bafb09d93614c073');
INSERT INTO "courses_category" ("id","name","slug","description","icon","image","display_order","is_featured","is_active","created_at","updated_at","parent_id") VALUES (1,'Networking','networking','','fa-network-wired','',0,0,1,'2026-08-11 13:47:14.177069','2026-08-11 13:47:14.177089',NULL);
INSERT INTO "courses_category" ("id","name","slug","description","icon","image","display_order","is_featured","is_active","created_at","updated_at","parent_id") VALUES (2,'Cybersecurity','cybersecurity','','fa-shield-alt','',0,0,1,'2026-08-11 13:47:14.179357','2026-08-11 13:47:14.179373',NULL);
INSERT INTO "courses_category" ("id","name","slug","description","icon","image","display_order","is_featured","is_active","created_at","updated_at","parent_id") VALUES (3,'Software Engineering','software-engineering','','fa-code','',0,0,1,'2026-08-11 13:47:14.181523','2026-08-11 13:47:14.181536',NULL);
INSERT INTO "courses_category" ("id","name","slug","description","icon","image","display_order","is_featured","is_active","created_at","updated_at","parent_id") VALUES (4,'Artificial Intelligence','artificial-intelligence','','fa-robot','',0,0,1,'2026-08-11 13:47:14.183367','2026-08-11 13:47:14.183380',NULL);
INSERT INTO "courses_category" ("id","name","slug","description","icon","image","display_order","is_featured","is_active","created_at","updated_at","parent_id") VALUES (5,'Cloud Computing','cloud-computing','','fa-cloud','',0,0,1,'2026-08-11 13:47:14.185478','2026-08-11 13:47:14.185492',NULL);
INSERT INTO "courses_category" ("id","name","slug","description","icon","image","display_order","is_featured","is_active","created_at","updated_at","parent_id") VALUES (6,'Design','design','','fa-palette','',0,0,1,'2026-08-11 13:47:14.187332','2026-08-11 13:47:14.187346',NULL);
INSERT INTO "courses_category" ("id","name","slug","description","icon","image","display_order","is_featured","is_active","created_at","updated_at","parent_id") VALUES (7,'Data Science','data-science','','fa-chart-bar','',0,0,1,'2026-08-11 13:47:14.189276','2026-08-11 13:47:14.189288',NULL);
INSERT INTO "courses_course" ("id","title","slug","subtitle","description","thumbnail","promo_video","outcomes","requirements","level","language","status","pricing","price","sale_price","has_certificate","drip_enabled","allow_download","is_featured","is_bestseller","is_private","published_at","created_at","updated_at","category_id","instructor_id") VALUES ('4c654e575ed94645949e122012bde32d','Networking Essentials: From Cables to the Cloud','networking-essentials','Master the fundamentals of computer networking — protocols, routing, switching, and troubleshooting.','A comprehensive introduction to computer networking covering OSI model, TCP/IP, LAN/WAN, routing protocols, switching, VLANs, subnetting, and cloud connectivity.','','','["Understand the OSI and TCP/IP models", "Configure routers and switches", "Implement VLANs and subnetting", "Troubleshoot network issues", "Prepare for CCNA exam"]','["Basic computer literacy", "A laptop or desktop computer"]','beginner','English','published','paid',50000,NULL,1,0,0,1,1,0,'2026-08-11 13:47:14.190770','2026-08-11 13:47:14.192729','2026-08-11 13:47:14.192742',1,'9b87e325056347f19fd3026d5cad23e1');
INSERT INTO "courses_course" ("id","title","slug","subtitle","description","thumbnail","promo_video","outcomes","requirements","level","language","status","pricing","price","sale_price","has_certificate","drip_enabled","allow_download","is_featured","is_bestseller","is_private","published_at","created_at","updated_at","category_id","instructor_id") VALUES ('b2423310cdec4f50ac721a9d23735206','Ethical Hacking & Penetration Testing','ethical-hacking','Learn to think like a hacker and defend systems like a pro.','Hands-on cybersecurity course covering footprinting, scanning, exploitation, post-exploitation, and reporting. Uses Kali Linux and industry tools.','','','["Use Kali Linux and security tools", "Conduct penetration tests", "Identify vulnerabilities", "Write professional security reports"]','["Basic networking knowledge", "Linux command line basics"]','intermediate','English','published','paid',75000,NULL,1,0,0,1,0,0,'2026-08-11 13:47:14.194819','2026-08-11 13:47:14.195651','2026-08-11 13:47:14.195658',2,'88542a0c1a5b419daadac8879dec6eba');
INSERT INTO "courses_course" ("id","title","slug","subtitle","description","thumbnail","promo_video","outcomes","requirements","level","language","status","pricing","price","sale_price","has_certificate","drip_enabled","allow_download","is_featured","is_bestseller","is_private","published_at","created_at","updated_at","category_id","instructor_id") VALUES ('cbfae4b653ed42c4b9954811df790bda','TypeScript Full-Stack Development','typescript-fullstack','Build production-ready apps with React, Node.js, and TypeScript.','Complete full-stack web development course using TypeScript throughout. Build REST APIs with Node/Express, frontend with React, deploy to AWS.','','','["Write type-safe TypeScript code", "Build React SPA applications", "Create REST APIs with Node.js", "Deploy to cloud platforms"]','["JavaScript fundamentals", "Basic HTML and CSS"]','intermediate','English','published','paid',65000,NULL,1,0,0,1,0,0,'2026-08-11 13:47:14.197446','2026-08-11 13:47:14.198415','2026-08-11 13:47:14.198422',3,'eadca09c5e0b4b0d85f6b1f3fddcbf29');
INSERT INTO "courses_course" ("id","title","slug","subtitle","description","thumbnail","promo_video","outcomes","requirements","level","language","status","pricing","price","sale_price","has_certificate","drip_enabled","allow_download","is_featured","is_bestseller","is_private","published_at","created_at","updated_at","category_id","instructor_id") VALUES ('769c409d82894a67a6b566f2a3f5fdc7','Applied Machine Learning with Python','applied-ml','From scikit-learn basics to TensorFlow deep learning — practical ML for real problems.','Hands-on machine learning course using Python, scikit-learn, and TensorFlow. Build regression, classification, clustering, and neural network models.','','','["Build ML pipelines with scikit-learn", "Train neural networks with TensorFlow", "Evaluate and tune models", "Deploy ML models to production"]','["Python programming (intermediate)", "Basic statistics knowledge"]','intermediate','English','published','paid',70000,NULL,1,0,0,0,0,0,'2026-08-11 13:47:14.200154','2026-08-11 13:47:14.200945','2026-08-11 13:47:14.200953',4,'569b743c804d467d8b423796a15d442d');
INSERT INTO "courses_course" ("id","title","slug","subtitle","description","thumbnail","promo_video","outcomes","requirements","level","language","status","pricing","price","sale_price","has_certificate","drip_enabled","allow_download","is_featured","is_bestseller","is_private","published_at","created_at","updated_at","category_id","instructor_id") VALUES ('93cab357274849808445bbf1884a78a5','Cloud Architect: AWS Solutions Professional','cloud-architect-aws','Design scalable, highly available cloud architectures on AWS.','Comprehensive AWS architecture course covering EC2, S3, RDS, Lambda, VPC, IAM, CloudFormation, and more. Preparation for AWS Solutions Architect exam.','','','["Design AWS architectures", "Implement security best practices", "Optimize costs", "Prepare for AWS SA exam"]','["Basic cloud concepts", "Linux command line", "Networking fundamentals"]','advanced','English','published','paid',80000,NULL,1,0,0,0,0,0,'2026-08-11 13:47:14.202425','2026-08-11 13:47:14.203260','2026-08-11 13:47:14.203270',5,'67e3d1198de54e3f82c197141f54fe8e');
INSERT INTO "courses_coursereview" ("id","rating","comment","is_approved","approved_at","helpful_count","created_at","updated_at","course_id","enrollment_id","user_id") VALUES (1,5,'Excellent course! John explains everything so clearly. Got my CCNA basics sorted.',1,NULL,0,'2026-08-11 13:47:14.327888','2026-08-11 13:47:14.327901','4c654e575ed94645949e122012bde32d','f7620788eed34cba95893c0b4ded29e0','6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "courses_coursereview" ("id","rating","comment","is_approved","approved_at","helpful_count","created_at","updated_at","course_id","enrollment_id","user_id") VALUES (2,5,'Best hacking course on the platform. Real tools, real labs!',1,NULL,0,'2026-08-11 13:47:14.333771','2026-08-11 13:47:14.333783','b2423310cdec4f50ac721a9d23735206','abca66eb41374ec3bfcbefaa13196372','515e440d4e42441e8c80a4caff48611b');
INSERT INTO "courses_coursereview" ("id","rating","comment","is_approved","approved_at","helpful_count","created_at","updated_at","course_id","enrollment_id","user_id") VALUES (3,5,'Very practical. The subnetting lessons alone are worth it.',1,NULL,0,'2026-08-11 13:47:14.338153','2026-08-11 13:47:14.338165','4c654e575ed94645949e122012bde32d','83b436adb04e452ea0a868f67d53e387','e8d60db0055a4187b044e64bf815bb19');
INSERT INTO "courses_coursereview" ("id","rating","comment","is_approved","approved_at","helpful_count","created_at","updated_at","course_id","enrollment_id","user_id") VALUES (4,5,'Amara is a brilliant teacher. Learned so much about pen testing.',1,NULL,0,'2026-08-11 13:47:14.342438','2026-08-11 13:47:14.342451','b2423310cdec4f50ac721a9d23735206','ec519302aad848d19452b43fa5bdac43','6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "courses_coursereview" ("id","rating","comment","is_approved","approved_at","helpful_count","created_at","updated_at","course_id","enrollment_id","user_id") VALUES (5,4,'Great content. The TensorFlow section could use more examples.',1,NULL,0,'2026-08-11 13:47:14.346859','2026-08-11 13:47:14.346871','769c409d82894a67a6b566f2a3f5fdc7','5f46bb3664694c57904dafd4f28d21c2','c7b5f45870694ec5bafb09d93614c073');
INSERT INTO "courses_coursereview" ("id","rating","comment","is_approved","approved_at","helpful_count","created_at","updated_at","course_id","enrollment_id","user_id") VALUES (6,5,'Perfect introduction to ML. Loved the deployment section.',1,NULL,0,'2026-08-11 13:47:14.351204','2026-08-11 13:47:14.351217','769c409d82894a67a6b566f2a3f5fdc7','f53287c9f62343b89b2c16b568df4afc','e8d60db0055a4187b044e64bf815bb19');
INSERT INTO "courses_coursereview" ("id","rating","comment","is_approved","approved_at","helpful_count","created_at","updated_at","course_id","enrollment_id","user_id") VALUES (7,5,'Finally a TypeScript course that goes full-stack. Amazing value!',1,NULL,0,'2026-08-11 13:47:14.355449','2026-08-11 13:47:14.355462','cbfae4b653ed42c4b9954811df790bda','ac25eb4ce5124f109525b0d88b9bdb12','515e440d4e42441e8c80a4caff48611b');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (1,'admin','logentry');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (2,'auth','group');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (3,'auth','permission');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (4,'contenttypes','contenttype');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (5,'sessions','session');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (6,'sites','site');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (7,'token_blacklist','blacklistedtoken');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (8,'token_blacklist','outstandingtoken');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (9,'account','emailaddress');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (10,'account','emailconfirmation');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (11,'socialaccount','socialaccount');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (12,'socialaccount','socialapp');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (13,'socialaccount','socialtoken');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (14,'axes','accessattempt');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (15,'axes','accessattemptexpiration');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (16,'axes','accessfailurelog');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (17,'axes','accesslog');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (18,'accounts','user');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (19,'courses','category');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (20,'courses','course');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (21,'courses','coursereview');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (22,'courses','wishlist');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (23,'lessons','lesson');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (24,'quizzes','answer');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (25,'quizzes','question');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (26,'quizzes','quiz');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (27,'quizzes','quizattempt');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (28,'enrollments','enrollment');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (29,'enrollments','lessonprogress');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (30,'certificates','certificate');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (31,'notifications','notification');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (32,'gamification','leaderboard');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (33,'forums','forumreply');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (34,'forums','forumthread');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (35,'blog','blogpost');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (36,'features','jobpost');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (37,'features','learningpath');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (38,'features','scholarship');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (39,'analytics','dailystat');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (40,'ai','aiusagelog');
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (41,'lessons','coursemodule');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (1,'contenttypes','0001_initial','2026-08-11 13:47:08.838717');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (2,'contenttypes','0002_remove_content_type_name','2026-08-11 13:47:08.845703');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (3,'auth','0001_initial','2026-08-11 13:47:08.860344');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (4,'auth','0002_alter_permission_name_max_length','2026-08-11 13:47:08.867751');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (5,'auth','0003_alter_user_email_max_length','2026-08-11 13:47:08.873339');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (6,'auth','0004_alter_user_username_opts','2026-08-11 13:47:08.877931');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (7,'auth','0005_alter_user_last_login_null','2026-08-11 13:47:08.882647');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (8,'auth','0006_require_contenttypes_0002','2026-08-11 13:47:08.884257');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (9,'auth','0007_alter_validators_add_error_messages','2026-08-11 13:47:08.889211');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (10,'auth','0008_alter_user_username_max_length','2026-08-11 13:47:08.894055');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (11,'auth','0009_alter_user_last_name_max_length','2026-08-11 13:47:08.899069');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (12,'auth','0010_alter_group_name_max_length','2026-08-11 13:47:08.905011');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (13,'auth','0011_update_proxy_permissions','2026-08-11 13:47:08.910098');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (14,'auth','0012_alter_user_first_name_max_length','2026-08-11 13:47:08.914577');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (15,'accounts','0001_initial','2026-08-11 13:47:08.925628');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (16,'account','0001_initial','2026-08-11 13:47:08.940736');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (17,'account','0002_email_max_length','2026-08-11 13:47:08.950234');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (18,'account','0003_alter_emailaddress_create_unique_verified_email','2026-08-11 13:47:08.962972');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (19,'account','0004_alter_emailaddress_drop_unique_email','2026-08-11 13:47:08.973022');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (20,'account','0005_emailaddress_idx_upper_email','2026-08-11 13:47:08.981300');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (21,'account','0006_emailaddress_lower','2026-08-11 13:47:08.990276');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (22,'account','0007_emailaddress_idx_email','2026-08-11 13:47:09.005694');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (23,'account','0008_emailaddress_unique_primary_email_fixup','2026-08-11 13:47:09.021661');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (24,'account','0009_emailaddress_unique_primary_email','2026-08-11 13:47:09.030025');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (25,'admin','0001_initial','2026-08-11 13:47:09.041022');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (26,'admin','0002_logentry_remove_auto_add','2026-08-11 13:47:09.050882');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (27,'admin','0003_logentry_add_action_flag_choices','2026-08-11 13:47:09.059093');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (28,'ai','0001_initial','2026-08-11 13:47:09.070882');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (29,'ai','0002_remove_aiusagelog_error_aiusagelog_error_message_and_more','2026-08-11 13:47:09.123805');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (30,'analytics','0001_initial','2026-08-11 13:47:09.130258');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (31,'axes','0001_initial','2026-08-11 13:47:09.134370');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (32,'axes','0002_auto_20151217_2044','2026-08-11 13:47:09.164269');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (33,'axes','0003_auto_20160322_0929','2026-08-11 13:47:09.176267');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (34,'axes','0004_auto_20181024_1538','2026-08-11 13:47:09.187168');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (35,'axes','0005_remove_accessattempt_trusted','2026-08-11 13:47:09.192823');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (36,'axes','0006_remove_accesslog_trusted','2026-08-11 13:47:09.198511');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (37,'axes','0007_alter_accessattempt_unique_together','2026-08-11 13:47:09.216678');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (38,'axes','0008_accessfailurelog','2026-08-11 13:47:09.222290');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (39,'axes','0009_add_session_hash','2026-08-11 13:47:09.227477');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (40,'axes','0010_accessattemptexpiration','2026-08-11 13:47:09.231565');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (41,'courses','0001_initial','2026-08-11 13:47:09.258586');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (42,'blog','0001_initial','2026-08-11 13:47:09.273532');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (43,'blog','0002_initial','2026-08-11 13:47:09.318147');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (44,'lessons','0001_initial','2026-08-11 13:47:09.335301');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (45,'enrollments','0001_initial','2026-08-11 13:47:09.506777');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (46,'certificates','0001_initial','2026-08-11 13:47:09.510136');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (47,'certificates','0002_initial','2026-08-11 13:47:09.615284');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (48,'courses','0002_initial','2026-08-11 13:47:09.772732');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (49,'features','0001_initial','2026-08-11 13:47:09.798779');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (50,'forums','0001_initial','2026-08-11 13:47:09.932119');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (51,'gamification','0001_initial','2026-08-11 13:47:09.952920');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (52,'notifications','0001_initial','2026-08-11 13:47:09.979444');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (53,'quizzes','0001_initial','2026-08-11 13:47:10.061916');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (54,'sessions','0001_initial','2026-08-11 13:47:10.066967');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (55,'sites','0001_initial','2026-08-11 13:47:10.070384');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (56,'sites','0002_alter_domain_unique','2026-08-11 13:47:10.077448');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (57,'socialaccount','0001_initial','2026-08-11 13:47:10.166654');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (58,'socialaccount','0002_token_max_lengths','2026-08-11 13:47:10.207072');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (59,'socialaccount','0003_extra_data_default_dict','2026-08-11 13:47:10.227699');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (60,'socialaccount','0004_app_provider_id_settings','2026-08-11 13:47:10.267390');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (61,'socialaccount','0005_socialtoken_nullable_app','2026-08-11 13:47:10.302908');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (62,'socialaccount','0006_alter_socialaccount_extra_data','2026-08-11 13:47:10.330190');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (63,'token_blacklist','0001_initial','2026-08-11 13:47:10.397844');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (64,'token_blacklist','0002_outstandingtoken_jti_hex','2026-08-11 13:47:10.423126');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (65,'token_blacklist','0003_auto_20171017_2007','2026-08-11 13:47:10.460212');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (66,'token_blacklist','0004_auto_20171017_2013','2026-08-11 13:47:10.496162');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (67,'token_blacklist','0005_remove_outstandingtoken_jti','2026-08-11 13:47:10.521395');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (68,'token_blacklist','0006_auto_20171017_2113','2026-08-11 13:47:10.546724');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (69,'token_blacklist','0007_auto_20171017_2214','2026-08-11 13:47:10.610487');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (70,'token_blacklist','0008_migrate_to_bigautofield','2026-08-11 13:47:10.656373');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (71,'token_blacklist','0010_fix_migrate_to_bigautofield','2026-08-11 13:47:10.695982');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (72,'token_blacklist','0011_linearizes_history','2026-08-11 13:47:10.697924');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (73,'token_blacklist','0012_alter_outstandingtoken_user','2026-08-11 13:47:10.727347');
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (74,'lessons','0002_add_coursemodule','2026-08-21 17:47:08.962897');
INSERT INTO "django_site" ("id","name","domain") VALUES (1,'example.com','example.com');
INSERT INTO "enrollments_enrollment" ("id","status","progress","source","enrolled_at","completed_at","last_accessed_at","course_id","current_lesson_id","user_id") VALUES ('f7620788eed34cba95893c0b4ded29e0','active',0,'paid','2026-08-11 13:47:14.325492',NULL,NULL,'4c654e575ed94645949e122012bde32d',NULL,'6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "enrollments_enrollment" ("id","status","progress","source","enrolled_at","completed_at","last_accessed_at","course_id","current_lesson_id","user_id") VALUES ('abca66eb41374ec3bfcbefaa13196372','active',0,'paid','2026-08-11 13:47:14.331756',NULL,NULL,'b2423310cdec4f50ac721a9d23735206',NULL,'515e440d4e42441e8c80a4caff48611b');
INSERT INTO "enrollments_enrollment" ("id","status","progress","source","enrolled_at","completed_at","last_accessed_at","course_id","current_lesson_id","user_id") VALUES ('83b436adb04e452ea0a868f67d53e387','active',0,'paid','2026-08-11 13:47:14.336187',NULL,NULL,'4c654e575ed94645949e122012bde32d',NULL,'e8d60db0055a4187b044e64bf815bb19');
INSERT INTO "enrollments_enrollment" ("id","status","progress","source","enrolled_at","completed_at","last_accessed_at","course_id","current_lesson_id","user_id") VALUES ('ec519302aad848d19452b43fa5bdac43','active',0,'paid','2026-08-11 13:47:14.340559',NULL,NULL,'b2423310cdec4f50ac721a9d23735206',NULL,'6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "enrollments_enrollment" ("id","status","progress","source","enrolled_at","completed_at","last_accessed_at","course_id","current_lesson_id","user_id") VALUES ('5f46bb3664694c57904dafd4f28d21c2','active',0,'paid','2026-08-11 13:47:14.344933',NULL,NULL,'769c409d82894a67a6b566f2a3f5fdc7',NULL,'c7b5f45870694ec5bafb09d93614c073');
INSERT INTO "enrollments_enrollment" ("id","status","progress","source","enrolled_at","completed_at","last_accessed_at","course_id","current_lesson_id","user_id") VALUES ('f53287c9f62343b89b2c16b568df4afc','active',0,'paid','2026-08-11 13:47:14.349299',NULL,NULL,'769c409d82894a67a6b566f2a3f5fdc7',NULL,'e8d60db0055a4187b044e64bf815bb19');
INSERT INTO "enrollments_enrollment" ("id","status","progress","source","enrolled_at","completed_at","last_accessed_at","course_id","current_lesson_id","user_id") VALUES ('ac25eb4ce5124f109525b0d88b9bdb12','active',0,'paid','2026-08-11 13:47:14.353592',NULL,NULL,'cbfae4b653ed42c4b9954811df790bda',NULL,'515e440d4e42441e8c80a4caff48611b');
INSERT INTO "enrollments_enrollment" ("id","status","progress","source","enrolled_at","completed_at","last_accessed_at","course_id","current_lesson_id","user_id") VALUES ('66834a1555ec41ff95862bdb66449282','active',20,'paid','2026-08-11 13:47:14.358420',NULL,NULL,'cbfae4b653ed42c4b9954811df790bda',NULL,'6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "enrollments_enrollment" ("id","status","progress","source","enrolled_at","completed_at","last_accessed_at","course_id","current_lesson_id","user_id") VALUES ('17bc35bfaf3b484abeb23d796baeba07','active',25,'paid','2026-08-11 13:47:14.362613',NULL,NULL,'93cab357274849808445bbf1884a78a5',NULL,'c7b5f45870694ec5bafb09d93614c073');
INSERT INTO "enrollments_enrollment" ("id","status","progress","source","enrolled_at","completed_at","last_accessed_at","course_id","current_lesson_id","user_id") VALUES ('1a521e297b7141baad8207fbcfae0d3c','completed',0,'admin','2026-08-12 10:27:45.593904',NULL,NULL,'4c654e575ed94645949e122012bde32d',NULL,'c7b5f45870694ec5bafb09d93614c073');
INSERT INTO "features_jobpost" ("id","title","company_name","description","requirements","location","job_type","salary_min","salary_max","currency","apply_url","apply_email","is_active","is_featured","deadline","views","created_at","employer_id") VALUES ('9294994381494fd7953a37d041543b36','Network Engineer','MTN Uganda','Full desc','','','full_time',NULL,NULL,'UGX','','',1,0,NULL,0,'2026-08-12 10:02:57.607129','7100b2fe82014d9089bfe43b97a2a910');
INSERT INTO "gamification_leaderboard" ("id","rank","xp","updated_at","user_id") VALUES (1,1,1850,'2026-08-12 10:31:24.911663','6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "gamification_leaderboard" ("id","rank","xp","updated_at","user_id") VALUES (2,2,1620,'2026-08-12 10:31:24.913873','e8d60db0055a4187b044e64bf815bb19');
INSERT INTO "gamification_leaderboard" ("id","rank","xp","updated_at","user_id") VALUES (3,3,1440,'2026-08-12 10:31:24.916079','c7b5f45870694ec5bafb09d93614c073');
INSERT INTO "gamification_leaderboard" ("id","rank","xp","updated_at","user_id") VALUES (4,4,980,'2026-08-12 10:31:24.918142','515e440d4e42441e8c80a4caff48611b');
INSERT INTO "gamification_leaderboard" ("id","rank","xp","updated_at","user_id") VALUES (5,5,500,'2026-08-12 10:31:24.920014','9b87e325056347f19fd3026d5cad23e1');
INSERT INTO "gamification_leaderboard" ("id","rank","xp","updated_at","user_id") VALUES (6,6,350,'2026-08-12 10:31:24.921796','eadca09c5e0b4b0d85f6b1f3fddcbf29');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('88c7ed2d4c1c4ca78b2d6dcdfd64cee9','Getting Started','',1,1,'2026-08-21 17:48:35.540183','2026-08-21 17:48:35.540221','93cab357274849808445bbf1884a78a5');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('1486d074c47741aca543c2fd42387a38','Core Concepts','',2,1,'2026-08-21 17:48:35.557699','2026-08-21 17:48:35.557733','93cab357274849808445bbf1884a78a5');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('e145e0cd1ec543b5bc6ee78089efa72c','Hands-On Practice','',3,1,'2026-08-21 17:48:35.575393','2026-08-21 17:48:35.575428','93cab357274849808445bbf1884a78a5');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('22dd1656acb84edda5674514bd44beb3','Getting Started','',1,1,'2026-08-21 17:48:35.594490','2026-08-21 17:48:35.594524','769c409d82894a67a6b566f2a3f5fdc7');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('90e996ff61f64f65bb1cf47145a5eb5a','Core Concepts','',2,1,'2026-08-21 17:48:35.610897','2026-08-21 17:48:35.610933','769c409d82894a67a6b566f2a3f5fdc7');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('66d3128b88304bc39fe68d80516646ea','Hands-On Practice','',3,1,'2026-08-21 17:48:35.627617','2026-08-21 17:48:35.627652','769c409d82894a67a6b566f2a3f5fdc7');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('da2d4b9d6d4e49d5b3ac394fb0bbe81f','Getting Started','',1,1,'2026-08-21 17:48:35.643143','2026-08-21 17:48:35.643177','cbfae4b653ed42c4b9954811df790bda');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('cfb1917e274e4a668e1f0212a51dedb8','Core Concepts','',2,1,'2026-08-21 17:48:35.659953','2026-08-21 17:48:35.659989','cbfae4b653ed42c4b9954811df790bda');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('92c1f7fb21e54b85abf5c5d35b6953b9','Hands-On Practice','',3,1,'2026-08-21 17:48:35.676926','2026-08-21 17:48:35.676959','cbfae4b653ed42c4b9954811df790bda');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('7d653da4cbfc4694818782964936a63c','Getting Started','',1,1,'2026-08-21 17:48:35.693178','2026-08-21 17:48:35.693208','b2423310cdec4f50ac721a9d23735206');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('da164feaf2704862a9da3f0e48292cb9','Core Concepts','',2,1,'2026-08-21 17:48:35.710201','2026-08-21 17:48:35.710236','b2423310cdec4f50ac721a9d23735206');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('1328e81bade34f59a373e2411dddf314','Hands-On Practice','',3,1,'2026-08-21 17:48:35.726983','2026-08-21 17:48:35.727020','b2423310cdec4f50ac721a9d23735206');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('160cd65efe9446289b097c2ab3a5718a','Getting Started','',1,1,'2026-08-21 17:48:35.739548','2026-08-21 17:48:35.739582','4c654e575ed94645949e122012bde32d');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('af30b418f5b24c85b9f55aae2415eafa','Core Concepts','',2,1,'2026-08-21 17:48:35.756557','2026-08-21 17:48:35.756595','4c654e575ed94645949e122012bde32d');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('f97add0cc81d47618e41ca1e0d22f174','Hands-On Practice','',3,1,'2026-08-21 17:48:35.773301','2026-08-21 17:48:35.773335','4c654e575ed94645949e122012bde32d');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('1ff13cc095ae4610875af576e0606496','Advanced Topics','',4,1,'2026-08-21 17:48:35.789473','2026-08-21 17:48:35.789507','4c654e575ed94645949e122012bde32d');
INSERT INTO "lessons_coursemodule" ("id","title","description","module_order","is_published","created_at","updated_at","course_id") VALUES ('beb57039c7134c8ca212559cbf60347c','Bonus: Real-World Projects','Advanced hands-on projects for professionals',4,1,'2026-08-21 17:49:40.054441','2026-08-21 17:49:40.054475','93cab357274849808445bbf1884a78a5');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('783a08758b72476192789305dbcb5d90','Welcome & Course Overview','net-01','','','video','https://www.youtube.com/watch?v=3QhU9jd03a0','youtube','','','','','','',300,10,1,0,0,1,1,'2026-08-11 13:47:14.205795','2026-08-11 13:47:14.205809','4c654e575ed94645949e122012bde32d','160cd65efe9446289b097c2ab3a5718a');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('43314c6b26544b65bf09b0bd2c41d06d','The OSI Model Explained','net-02','','','video','https://www.youtube.com/watch?v=vv4y_uOneC0','youtube','','','','','','',720,10,0,0,0,2,1,'2026-08-11 13:47:14.208204','2026-08-11 13:47:14.208222','4c654e575ed94645949e122012bde32d','160cd65efe9446289b097c2ab3a5718a');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('67426eca588a4910ab6950377d00c5ff','TCP/IP vs OSI — Key Differences','net-03','','','video','https://www.youtube.com/watch?v=keeqnciDVOo','youtube','','','','','','',540,10,0,0,0,3,1,'2026-08-11 13:47:14.210272','2026-08-11 13:47:14.210285','4c654e575ed94645949e122012bde32d','160cd65efe9446289b097c2ab3a5718a');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('c060aa51f7d34545a74f802dd1f18f88','IP Addressing & Subnetting','net-04','','','video','https://www.youtube.com/watch?v=s_gy1GmcbQ4','youtube','','','','','','',900,10,0,0,0,4,1,'2026-08-11 13:47:14.212242','2026-08-11 13:47:14.212254','4c654e575ed94645949e122012bde32d','160cd65efe9446289b097c2ab3a5718a');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('0759e98bb6324b018c373eee1314f63c','Subnetting Practice Lab','net-05','','','text','','youtube','','','','','','',600,10,0,0,0,1,1,'2026-08-11 13:47:14.214390','2026-08-11 13:47:14.214402','4c654e575ed94645949e122012bde32d','af30b418f5b24c85b9f55aae2415eafa');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('48d040bb2d22492583ac3d392d3af4bd','Ethernet & MAC Addresses','net-06','','','video','https://www.youtube.com/watch?v=rYI3eM9V2bk','youtube','','','','','','',480,10,0,0,0,2,1,'2026-08-11 13:47:14.216385','2026-08-11 13:47:14.216397','4c654e575ed94645949e122012bde32d','af30b418f5b24c85b9f55aae2415eafa');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('2d3f2db0231746728be953a1b7b1bff1','Routing Protocols — OSPF & BGP','net-07','','','video','https://www.youtube.com/watch?v=Ep-x_6kggKA','youtube','','','','','','',1080,10,0,0,0,3,1,'2026-08-11 13:47:14.218442','2026-08-11 13:47:14.218455','4c654e575ed94645949e122012bde32d','af30b418f5b24c85b9f55aae2415eafa');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('dc0491fc97804a74b50c9e41747b05c8','Switching & VLANs','net-08','','','video','https://www.youtube.com/watch?v=9eH16Fxeb9o','youtube','','','','','','',780,10,0,0,0,4,1,'2026-08-11 13:47:14.220488','2026-08-11 13:47:14.220502','4c654e575ed94645949e122012bde32d','af30b418f5b24c85b9f55aae2415eafa');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('1c76fd40ec554c28b318fcf9780ef35b','Network Troubleshooting Toolkit','net-09','','','video','https://www.youtube.com/watch?v=gW1z5oGCqGU','youtube','','','','','','',660,10,0,0,0,1,1,'2026-08-11 13:47:14.222632','2026-08-11 13:47:14.222644','4c654e575ed94645949e122012bde32d','f97add0cc81d47618e41ca1e0d22f174');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('af8597d56a0a45f598eb76e8e7c15008','Wireless Networking — WiFi 6','net-10','','','video','https://www.youtube.com/watch?v=HOBkFiPbGKY','youtube','','','','','','',540,10,0,0,0,2,1,'2026-08-11 13:47:14.224597','2026-08-11 13:47:14.224611','4c654e575ed94645949e122012bde32d','f97add0cc81d47618e41ca1e0d22f174');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('fcf7a1e1630b411ca6db74d0b8d3e120','Network Security Fundamentals','net-11','','','video','https://www.youtube.com/watch?v=GqmQg-cszw4','youtube','','','','','','',720,10,0,0,0,3,1,'2026-08-11 13:47:14.226722','2026-08-11 13:47:14.226735','4c654e575ed94645949e122012bde32d','f97add0cc81d47618e41ca1e0d22f174');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('e313f8df0c7d410ea4621d7d68f9fb38','CCNA Exam Prep Quiz','net-12','','','quiz','','youtube','','','','','','',0,10,0,0,0,4,1,'2026-08-11 13:47:14.229523','2026-08-11 13:47:14.229549','4c654e575ed94645949e122012bde32d','f97add0cc81d47618e41ca1e0d22f174');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('468cd9fe974145059c67dc9401cdf70d','Introduction to Ethical Hacking','eth-01','','','video','https://www.youtube.com/watch?v=hXSFdwIOfnE','youtube','','','','','','',480,10,1,0,0,1,1,'2026-08-11 13:47:14.232117','2026-08-11 13:47:14.232130','b2423310cdec4f50ac721a9d23735206','7d653da4cbfc4694818782964936a63c');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('882f0b54aab74270a6258db1597d4cad','Kali Linux Setup & Tools','eth-02','','','video','https://www.youtube.com/watch?v=lZAoFs75_cs','youtube','','','','','','',720,10,0,0,0,2,1,'2026-08-11 13:47:14.234464','2026-08-11 13:47:14.234477','b2423310cdec4f50ac721a9d23735206','7d653da4cbfc4694818782964936a63c');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('55bb1d12b8ee4e268a092ea0153522b9','Reconnaissance & OSINT','eth-03','','','video','https://www.youtube.com/watch?v=KSahLkaNTJw','youtube','','','','','','',840,10,0,0,0,3,1,'2026-08-11 13:47:14.236504','2026-08-11 13:47:14.236517','b2423310cdec4f50ac721a9d23735206','7d653da4cbfc4694818782964936a63c');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('079812972cef46389498e569f4e74765','Nmap Scanning Mastery','eth-04','','','video','https://www.youtube.com/watch?v=4t4kBkMsDbQ','youtube','','','','','','',900,10,0,0,0,4,1,'2026-08-11 13:47:14.238385','2026-08-11 13:47:14.238397','b2423310cdec4f50ac721a9d23735206','7d653da4cbfc4694818782964936a63c');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('2094844d6d4e48dd871fad02a72a6721','Exploitation with Metasploit','eth-05','','','video','https://www.youtube.com/watch?v=8lR27r8Y3Ik','youtube','','','','','','',1080,10,0,0,0,1,1,'2026-08-11 13:47:14.240463','2026-08-11 13:47:14.240476','b2423310cdec4f50ac721a9d23735206','da164feaf2704862a9da3f0e48292cb9');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('43095f28bb1046ffaafaab00c8dfac4e','Password Attacks','eth-06','','','video','https://www.youtube.com/watch?v=aU4COYXPNBA','youtube','','','','','','',720,10,0,0,0,2,1,'2026-08-11 13:47:14.242381','2026-08-11 13:47:14.242395','b2423310cdec4f50ac721a9d23735206','da164feaf2704862a9da3f0e48292cb9');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('612ed18850944a5c843234d13235fa80','Web Application Vulnerabilities','eth-07','','','video','https://www.youtube.com/watch?v=jmgsgjPn1vs','youtube','','','','','','',960,10,0,0,0,3,1,'2026-08-11 13:47:14.244748','2026-08-11 13:47:14.244761','b2423310cdec4f50ac721a9d23735206','da164feaf2704862a9da3f0e48292cb9');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('00b90e3ae84c420ab4f1ab597f77ea76','Post-Exploitation & Persistence','eth-08','','','video','https://www.youtube.com/watch?v=pL9q2lOZ1Fw','youtube','','','','','','',840,10,0,0,0,4,1,'2026-08-11 13:47:14.246794','2026-08-11 13:47:14.246807','b2423310cdec4f50ac721a9d23735206','da164feaf2704862a9da3f0e48292cb9');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('376f6c00b0334053a4ace8c76264b731','Writing Professional Pen Test Reports','eth-09','','','text','','youtube','','','','','','',600,10,0,0,0,1,1,'2026-08-11 13:47:14.248922','2026-08-11 13:47:14.248936','b2423310cdec4f50ac721a9d23735206','1328e81bade34f59a373e2411dddf314');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('42f76a7118bd43a38051a6c02e95ff81','CEH Mock Exam','eth-10','','','quiz','','youtube','','','','','','',0,10,0,0,0,2,1,'2026-08-11 13:47:14.251067','2026-08-11 13:47:14.251081','b2423310cdec4f50ac721a9d23735206','1328e81bade34f59a373e2411dddf314');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('8f592a10b9584061b1a61dbb848de479','Why TypeScript? Setup & Config','ts-01','','','video','https://www.youtube.com/watch?v=BwuLxPH8IDs','youtube','','','','','','',360,10,1,0,0,1,1,'2026-08-11 13:47:14.253095','2026-08-11 13:47:14.253108','cbfae4b653ed42c4b9954811df790bda','da2d4b9d6d4e49d5b3ac394fb0bbe81f');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('3ac46ada191242e88996a160c2d14c6d','Types, Interfaces & Generics','ts-02','','','video','https://www.youtube.com/watch?v=ahCwqrYpIuM','youtube','','','','','','',780,10,0,0,0,2,1,'2026-08-11 13:47:14.255070','2026-08-11 13:47:14.255083','cbfae4b653ed42c4b9954811df790bda','da2d4b9d6d4e49d5b3ac394fb0bbe81f');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('2a9fee869ac04fdfa958efe2fb3c4cc1','React with TypeScript','ts-03','','','video','https://www.youtube.com/watch?v=FJDVKeh7RJI','youtube','','','','','','',960,10,0,0,0,3,1,'2026-08-11 13:47:14.256938','2026-08-11 13:47:14.256950','cbfae4b653ed42c4b9954811df790bda','da2d4b9d6d4e49d5b3ac394fb0bbe81f');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('f9d6619a7cb346648d41c42723660075','State Management — Zustand + TS','ts-04','','','video','https://www.youtube.com/watch?v=KCr-UNsM3vA','youtube','','','','','','',720,10,0,0,0,4,1,'2026-08-11 13:47:14.258859','2026-08-11 13:47:14.258871','cbfae4b653ed42c4b9954811df790bda','da2d4b9d6d4e49d5b3ac394fb0bbe81f');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('7a0da2de208e491eb019f49542e2d48a','Node.js REST API with TypeScript','ts-05','','','video','https://www.youtube.com/watch?v=H91aqUHn8sE','youtube','','','','','','',900,10,0,0,0,1,1,'2026-08-11 13:47:14.260717','2026-08-11 13:47:14.260728','cbfae4b653ed42c4b9954811df790bda','cfb1917e274e4a668e1f0212a51dedb8');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('ba7f16e119a14859b09967914a9397c5','Prisma ORM & PostgreSQL','ts-06','','','video','https://www.youtube.com/watch?v=RebA5J-rlwg','youtube','','','','','','',840,10,0,0,0,2,1,'2026-08-11 13:47:14.262723','2026-08-11 13:47:14.262735','cbfae4b653ed42c4b9954811df790bda','cfb1917e274e4a668e1f0212a51dedb8');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('4d6d84e73b4244f69c05cfd6f0860177','JWT Authentication','ts-07','','','video','https://www.youtube.com/watch?v=mbsmsi7l3r4','youtube','','','','','','',660,10,0,0,0,3,1,'2026-08-11 13:47:14.264950','2026-08-11 13:47:14.264964','cbfae4b653ed42c4b9954811df790bda','cfb1917e274e4a668e1f0212a51dedb8');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('028f312639744424ab0111176c3fcea0','Testing with Jest','ts-08','','','video','https://www.youtube.com/watch?v=FgnxcUQ5vho','youtube','','','','','','',780,10,0,0,0,4,1,'2026-08-11 13:47:14.266980','2026-08-11 13:47:14.266993','cbfae4b653ed42c4b9954811df790bda','cfb1917e274e4a668e1f0212a51dedb8');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('5c46bfbbae4942ec849aed811472a819','Docker & Deployment','ts-09','','','video','https://www.youtube.com/watch?v=pTFZFxd5NxY','youtube','','','','','','',900,10,0,0,0,1,1,'2026-08-11 13:47:14.269629','2026-08-11 13:47:14.269648','cbfae4b653ed42c4b9954811df790bda','92c1f7fb21e54b85abf5c5d35b6953b9');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('c918e0026ed846308f00ca6fff6ed301','Capstone Project Walkthrough','ts-10','','','video','https://www.youtube.com/watch?v=BaLmC7MbHac','youtube','','','','','','',1200,10,0,0,0,2,1,'2026-08-11 13:47:14.271962','2026-08-11 13:47:14.271975','cbfae4b653ed42c4b9954811df790bda','92c1f7fb21e54b85abf5c5d35b6953b9');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('66dda4bee88f45ad953c08b3ca9a3069','Final Assessment','ts-11','','','quiz','','youtube','','','','','','',0,10,0,0,0,3,1,'2026-08-11 13:47:14.274972','2026-08-11 13:47:14.274991','cbfae4b653ed42c4b9954811df790bda','92c1f7fb21e54b85abf5c5d35b6953b9');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('499ee6a23f834a47b6d409e4f6e22a7f','Python for Data Science Refresher','ml-01','','','video','https://www.youtube.com/watch?v=rfscVS0vtbw','youtube','','','','','','',480,10,1,0,0,1,1,'2026-08-11 13:47:14.277071','2026-08-11 13:47:14.277085','769c409d82894a67a6b566f2a3f5fdc7','22dd1656acb84edda5674514bd44beb3');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('dfcf78a8a0de4a168504e54b738e7f9b','NumPy & Pandas Fundamentals','ml-02','','','video','https://www.youtube.com/watch?v=QUT1VHiLmmI','youtube','','','','','','',720,10,0,0,0,2,1,'2026-08-11 13:47:14.278958','2026-08-11 13:47:14.278971','769c409d82894a67a6b566f2a3f5fdc7','22dd1656acb84edda5674514bd44beb3');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('87a2cdea71ac43b6ab9a38e7428536e9','Data Visualisation with Matplotlib','ml-03','','','video','https://www.youtube.com/watch?v=3Xc3CA655Y4','youtube','','','','','','',600,10,0,0,0,3,1,'2026-08-11 13:47:14.281349','2026-08-11 13:47:14.281362','769c409d82894a67a6b566f2a3f5fdc7','22dd1656acb84edda5674514bd44beb3');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('56d7afe80b834b0bb24e2192bcd562ba','Supervised Learning — Regression','ml-04','','','video','https://www.youtube.com/watch?v=VmbA0pi2cRQ','youtube','','','','','','',900,10,0,0,0,4,1,'2026-08-11 13:47:14.283343','2026-08-11 13:47:14.283356','769c409d82894a67a6b566f2a3f5fdc7','22dd1656acb84edda5674514bd44beb3');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('a378809bfeec405f86c231444eba0d97','Supervised Learning — Classification','ml-05','','','video','https://www.youtube.com/watch?v=TJveOYsK6MY','youtube','','','','','','',840,10,0,0,0,1,1,'2026-08-11 13:47:14.285250','2026-08-11 13:47:14.285263','769c409d82894a67a6b566f2a3f5fdc7','90e996ff61f64f65bb1cf47145a5eb5a');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('ee96cffdfeae41689d8cfcc136ebd855','Unsupervised — Clustering & PCA','ml-06','','','video','https://www.youtube.com/watch?v=ILSUIGFIubI','youtube','','','','','','',780,10,0,0,0,2,1,'2026-08-11 13:47:14.287155','2026-08-11 13:47:14.287168','769c409d82894a67a6b566f2a3f5fdc7','90e996ff61f64f65bb1cf47145a5eb5a');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('0acb2390dcb9402793a44c55fdf14f00','Neural Networks with TensorFlow','ml-07','','','video','https://www.youtube.com/watch?v=tpCFfeUEGs8','youtube','','','','','','',1080,10,0,0,0,3,1,'2026-08-11 13:47:14.289046','2026-08-11 13:47:14.289061','769c409d82894a67a6b566f2a3f5fdc7','90e996ff61f64f65bb1cf47145a5eb5a');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('14fd8eb769994fe4ba327665129d13a0','CNNs for Image Recognition','ml-08','','','video','https://www.youtube.com/watch?v=umGJ30-15_A','youtube','','','','','','',960,10,0,0,0,4,1,'2026-08-11 13:47:14.290899','2026-08-11 13:47:14.290912','769c409d82894a67a6b566f2a3f5fdc7','90e996ff61f64f65bb1cf47145a5eb5a');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('b8ca8d9119944210aad37984c6959b4b','Model Evaluation & Hypertuning','ml-09','','','video','https://www.youtube.com/watch?v=Gb2yk8pMsxc','youtube','','','','','','',720,10,0,0,0,1,1,'2026-08-11 13:47:14.292760','2026-08-11 13:47:14.292773','769c409d82894a67a6b566f2a3f5fdc7','66d3128b88304bc39fe68d80516646ea');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('346642a96dc5409c93127062d8b0baa8','Deploying ML Models with FastAPI','ml-10','','','video','https://www.youtube.com/watch?v=h5wLuVDr0oc','youtube','','','','','','',840,10,0,0,0,2,1,'2026-08-11 13:47:14.294716','2026-08-11 13:47:14.294728','769c409d82894a67a6b566f2a3f5fdc7','66d3128b88304bc39fe68d80516646ea');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('fde3b1cd301c428bbfdacd9aa45dffc1','ML Capstone Quiz','ml-11','','','quiz','','youtube','','','','','','',0,10,0,0,0,3,1,'2026-08-11 13:47:14.296616','2026-08-11 13:47:14.296629','769c409d82894a67a6b566f2a3f5fdc7','66d3128b88304bc39fe68d80516646ea');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('bcf724ce56e449b2ac67c6421f9b0224','AWS Core Services Overview','aws-01','','','video','https://www.youtube.com/watch?v=Z3SYDTMP3ME','youtube','','','','','','',600,10,1,0,0,1,1,'2026-08-11 13:47:14.298608','2026-08-11 13:47:14.298621','93cab357274849808445bbf1884a78a5','88c7ed2d4c1c4ca78b2d6dcdfd64cee9');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('d2ab5744e9ab4ac0ad0898e911e2a2b7','EC2 & Auto Scaling','aws-02','','','video','https://www.youtube.com/watch?v=TsRBftzZsQo','youtube','','','','','','',840,10,0,0,0,2,1,'2026-08-11 13:47:14.300660','2026-08-11 13:47:14.300679','93cab357274849808445bbf1884a78a5','88c7ed2d4c1c4ca78b2d6dcdfd64cee9');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('0f839ca8b13245fabc507249dd218532','S3 Storage & CDN with CloudFront','aws-03','','','video','https://www.youtube.com/watch?v=oaZ3R4NCRu8','youtube','','','','','','',720,10,0,0,0,3,1,'2026-08-11 13:47:14.302940','2026-08-11 13:47:14.302952','93cab357274849808445bbf1884a78a5','88c7ed2d4c1c4ca78b2d6dcdfd64cee9');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('ea73b168dd23492ea8aa2dd5e0902e81','VPC Networking Deep Dive','aws-04','','','video','https://www.youtube.com/watch?v=fpxDGU2KdkA','youtube','','','','','','',960,10,0,0,0,4,1,'2026-08-11 13:47:14.305496','2026-08-11 13:47:14.305516','93cab357274849808445bbf1884a78a5','88c7ed2d4c1c4ca78b2d6dcdfd64cee9');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('cad4fad1c8cf4c5f830d0416f3ea0a8f','IAM — Identity & Access Management','aws-05','','','video','https://www.youtube.com/watch?v=SXSqhTn2DuE','youtube','','','','','','',780,10,0,0,0,1,1,'2026-08-11 13:47:14.307756','2026-08-11 13:47:14.307768','93cab357274849808445bbf1884a78a5','1486d074c47741aca543c2fd42387a38');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('ee71ed5b407448358ccef13307a6cb50','RDS & Aurora Databases','aws-06','','','video','https://www.youtube.com/watch?v=eMzCI7S1P9M','youtube','','','','','','',840,10,0,0,0,2,1,'2026-08-11 13:47:14.309791','2026-08-11 13:47:14.309805','93cab357274849808445bbf1884a78a5','1486d074c47741aca543c2fd42387a38');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('ce28276b67524b769da443c53fe1b94a','Lambda & Serverless Architecture','aws-07','','','video','https://www.youtube.com/watch?v=97q30JjEq9A','youtube','','','','','','',900,10,0,0,0,3,1,'2026-08-11 13:47:14.311825','2026-08-11 13:47:14.311838','93cab357274849808445bbf1884a78a5','1486d074c47741aca543c2fd42387a38');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('e6a172a43e064cdc89115245f5546302','ECS & Kubernetes on AWS','aws-08','','','video','https://www.youtube.com/watch?v=d7GifqVoBgw','youtube','','','','','','',1080,10,0,0,0,4,1,'2026-08-11 13:47:14.313765','2026-08-11 13:47:14.313778','93cab357274849808445bbf1884a78a5','1486d074c47741aca543c2fd42387a38');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('8566456fad3f45e1a473f3d77281dd68','CloudFormation & Infrastructure-as-Code','aws-09','','','video','https://www.youtube.com/watch?v=0Sh9OySCWGY','youtube','','','','','','',960,10,0,0,0,1,1,'2026-08-11 13:47:14.316092','2026-08-11 13:47:14.316106','93cab357274849808445bbf1884a78a5','e145e0cd1ec543b5bc6ee78089efa72c');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('3edb7e7137ae439ab552c0d2ecd30d3c','Cost Optimisation Strategies','aws-10','','','video','https://www.youtube.com/watch?v=LcFYVmjMi18','youtube','','','','','','',660,10,0,0,0,2,1,'2026-08-11 13:47:14.318086','2026-08-11 13:47:14.318101','93cab357274849808445bbf1884a78a5','e145e0cd1ec543b5bc6ee78089efa72c');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('af179aaa3122452188b37f3971768798','Security on AWS','aws-11','','','video','https://www.youtube.com/watch?v=I1SwoKxB13c','youtube','','','','','','',780,10,0,0,0,3,1,'2026-08-11 13:47:14.320053','2026-08-11 13:47:14.320068','93cab357274849808445bbf1884a78a5','e145e0cd1ec543b5bc6ee78089efa72c');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('6b5cce9d1fe849538bcf4de5d3304d12','AWS SA Exam Practice Quiz','aws-12','','','quiz','','youtube','','','','','','',0,10,0,0,0,4,1,'2026-08-11 13:47:14.322075','2026-08-11 13:47:14.322089','93cab357274849808445bbf1884a78a5','e145e0cd1ec543b5bc6ee78089efa72c');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('a6f9ee4a28024ab59c8a09414a664709','Patched Lesson','patch-test-lesson','','','video','','youtube','','','','','','',0,5,0,0,0,1,1,'2026-08-12 10:04:21.308622','2026-08-12 10:04:21.348542','4c654e575ed94645949e122012bde32d','1ff13cc095ae4610875af576e0606496');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('0e54a2137cfc4c4594bdeefd692945cf','Advanced Route 53 DNS','advanced-route-53-dns','','','video','','youtube','','','','','','',900,20,0,0,0,5,1,'2026-08-21 17:49:40.158009','2026-08-21 17:49:40.158043','93cab357274849808445bbf1884a78a5','1486d074c47741aca543c2fd42387a38');
INSERT INTO "lessons_lesson" ("id","title","slug","description","content","type","video_url","video_source","video_file","pdf_file","audio_file","ppt_file","thumbnail","subtitle_vtt","duration","xp_reward","is_free","is_drip","drip_after","lesson_order","is_published","created_at","updated_at","course_id","module_id") VALUES ('3af6a2f4ea6049c3b1da5d1ccd04ad37','Bias & Fairness in ML','bias-fairness-in-ml','','','video','','youtube','','','','','','',720,15,0,0,0,5,1,'2026-08-21 17:50:47.474714','2026-08-21 17:50:47.679876','769c409d82894a67a6b566f2a3f5fdc7','22dd1656acb84edda5674514bd44beb3');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('a48da707cb274e0d86cf5916ef2a5199','course','📚 New lesson added!','New lesson added to Networking Essentials: "Network Security Fundamentals"','',0,NULL,0,'2026-08-11 13:47:14.375602',NULL,'6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('891f97dc38424ef594e1104ca947459e','certificate','🎉 Certificate issued!','Congratulations! Your certificate for Networking Essentials is ready to download.','',0,NULL,0,'2026-08-11 13:47:14.377848',NULL,'6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('d34e8ecba51a481b887d116b1608e82f','streak','🔥 You''re on a streak!','You''re on a 12-day learning streak! Keep it up to unlock the Streak Master badge.','',0,NULL,0,'2026-08-11 13:47:14.379820',NULL,'6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('4bd5926dec9943fd93c7eebe104d7855','enrollment','✅ Enrollment confirmed','You''re enrolled in Ethical Hacking & Penetration Testing.','',0,NULL,0,'2026-08-11 13:47:14.381771',NULL,'6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('2bd2968980fb4ec298eb76ac7b301907','assignment','📝 Assignment graded','Assignment graded: Nmap Recon Report — Grade: A (92/100)','',0,NULL,0,'2026-08-11 13:47:14.383527',NULL,'6678c90efb3d4b8bacd1e24052c79ed7');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('18ec09195a3e41b1b0c1f8eb44f00797','course','📚 New content available','New content in Applied ML: Supervised Learning module updated.','',0,NULL,0,'2026-08-11 13:47:14.385324',NULL,'e8d60db0055a4187b044e64bf815bb19');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('633a430d9cf64e95888fc735599c6a41','system','🔧 Platform maintenance','Platform maintenance scheduled for Sunday 3AM–5AM EAT. APIs will be read-only.','',0,NULL,0,'2026-08-11 13:47:14.387398',NULL,'9b87e325056347f19fd3026d5cad23e1');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('5015ae9d152e4f95a51264275709efee','review','⭐ New 5-star review','New 5-star review on Networking Essentials: "Excellent course! John explains everything clearly."','',0,NULL,0,'2026-08-11 13:47:14.389300',NULL,'9b87e325056347f19fd3026d5cad23e1');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('fcf1bcfab1f34dc4aa728b89e75f3f9a','enrollment','👥 New students enrolled','5 new students enrolled in Networking Essentials this week.','',0,NULL,0,'2026-08-11 13:47:14.391422',NULL,'9b87e325056347f19fd3026d5cad23e1');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('a187f6c0430342c0bd80915f73b02b7a','announcement','📋 Assignment submitted','Marcus Reid submitted Assignment: Nmap Recon Report','',0,NULL,0,'2026-08-11 13:47:14.393355',NULL,'9b87e325056347f19fd3026d5cad23e1');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('e28cd1add6d04a1babebe3813a92cc79','system','📊 Daily report','Daily report: 248 new learners signed up. Total revenue: UGX 12.4M','',0,NULL,0,'2026-08-11 13:47:14.395051',NULL,'7100b2fe82014d9089bfe43b97a2a910');
INSERT INTO "notifications_notification" ("id","type","title","message","link","is_read","read_at","is_archived","created_at","expires_at","user_id") VALUES ('7bef1817fef34507b71a56fc2553d765','course','⏳ Course pending approval','Course pending approval: Cloud Architect: AWS Solutions Professional','',0,NULL,0,'2026-08-11 13:47:14.397125',NULL,'7100b2fe82014d9089bfe43b97a2a910');
INSERT INTO "quizzes_quiz" ("id","title","description","pass_score","time_limit","max_attempts","shuffle_questions","show_answers","is_active","created_at","updated_at","course_id") VALUES ('ab097cd652b64ea3b57078f67c2eeb4a','CMS Quiz','',70,0,3,0,1,1,'2026-08-12 10:02:57.548917','2026-08-12 10:02:57.548937','4c654e575ed94645949e122012bde32d');
INSERT INTO "quizzes_quiz" ("id","title","description","pass_score","time_limit","max_attempts","shuffle_questions","show_answers","is_active","created_at","updated_at","course_id") VALUES ('0fd374d14e02421bb80e0861248eaba5','CMS Quiz','',70,0,3,0,1,1,'2026-08-12 10:04:07.675035','2026-08-12 10:04:07.675085','4c654e575ed94645949e122012bde32d');
INSERT INTO "quizzes_quiz" ("id","title","description","pass_score","time_limit","max_attempts","shuffle_questions","show_answers","is_active","created_at","updated_at","course_id") VALUES ('9ebc42f5b28147f591cfe7aa7d1f0bf7','Debug Quiz','',70,0,3,0,1,1,'2026-08-12 10:04:30.514335','2026-08-12 10:04:30.514355','4c654e575ed94645949e122012bde32d');
INSERT INTO "quizzes_quiz" ("id","title","description","pass_score","time_limit","max_attempts","shuffle_questions","show_answers","is_active","created_at","updated_at","course_id") VALUES ('b656cd3a859f4c0ea95b14438ec697fa','Final Quiz','',70,0,3,0,1,1,'2026-08-12 10:04:37.413150','2026-08-12 10:04:37.413169','4c654e575ed94645949e122012bde32d');
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTA0ODA5NiwiaWF0IjoxNzg2NDU2MDk2LCJqdGkiOiJkOTBjYmIyMmE4OWY0N2E5YTQ4Mzg0MTBlNjc5ZDYxMSIsInVzZXJfaWQiOiI2Njc4YzkwZS1mYjNkLTRiOGItYWNkMS1lMjQwNTJjNzllZDcifQ.SBtT7vqJqku6x5dyyELYBWFtR5slGYK9bF4tzuaMdtk','2026-08-11 13:48:16.473151','2026-09-10 13:48:16','6678c90efb3d4b8bacd1e24052c79ed7','d90cbb22a89f47a9a4838410e679d611',1);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTA0ODA5NiwiaWF0IjoxNzg2NDU2MDk2LCJqdGkiOiJkNjhlZDNlNjk2M2E0YmUzYmUzOWY5OGU4NTlhYTM3MiIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.9x60VXCiBPePVbT1rD5e5YO1L_aZelEEEx8Y8EmjukI','2026-08-11 13:48:16.763250','2026-09-10 13:48:16','7100b2fe82014d9089bfe43b97a2a910','d68ed3e6963a4be3be39f98e859aa372',2);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTA0ODA5NywiaWF0IjoxNzg2NDU2MDk3LCJqdGkiOiIzOTA3YjRhMWIyNDU0OWZlYThmZDAxNjQ3NGY3NWM2OSIsInVzZXJfaWQiOiI5Yjg3ZTMyNS0wNTYzLTQ3ZjEtOWZkMy0wMjZkNWNhZDIzZTEifQ.gwMjL_2yjhgGeeR7gGKDKHBU8UHoFwqkcf1vu7bIr-I','2026-08-11 13:48:17.050126','2026-09-10 13:48:17','9b87e325056347f19fd3026d5cad23e1','3907b4a1b24549fea8fd016474f75c69',3);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTA0ODA5NywiaWF0IjoxNzg2NDU2MDk3LCJqdGkiOiJkYjliMGFiNWQ3Njc0Mjc1OGMwYjIwMGU3MTg5MGUwZCIsInVzZXJfaWQiOiI2Njc4YzkwZS1mYjNkLTRiOGItYWNkMS1lMjQwNTJjNzllZDcifQ.9tx0eBtlBf8t9TYUB0NGuMAAcVuPKFdMA_GBjlFxzdQ','2026-08-11 13:48:17.338608','2026-09-10 13:48:17','6678c90efb3d4b8bacd1e24052c79ed7','db9b0ab5d76742758c0b200e71890e0d',4);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTA0ODA5NywiaWF0IjoxNzg2NDU2MDk3LCJqdGkiOiJjM2VmYTAwODA2YjU0YWNhODZjZGUzMmEyZTk1YzJkOSIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.TMjfXTexBO3P7LoIKp2NwjZ3SmicFesjJyix7ol8ouQ','2026-08-11 13:48:17.621894','2026-09-10 13:48:17','7100b2fe82014d9089bfe43b97a2a910','c3efa00806b54aca86cde32a2e95c2d9',5);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTA0ODA5NywiaWF0IjoxNzg2NDU2MDk3LCJqdGkiOiI5ZTRkNDBkMGQ5ZGY0NzE4OGQ0ZTU5OGEzOTYxODRiNyIsInVzZXJfaWQiOiI5Yjg3ZTMyNS0wNTYzLTQ3ZjEtOWZkMy0wMjZkNWNhZDIzZTEifQ.6Yu4sRkYpjE4GtWgSGOHDhdUfvgyrcKEojetzbFGu2Y','2026-08-11 13:48:17.900355','2026-09-10 13:48:17','9b87e325056347f19fd3026d5cad23e1','9e4d40d0d9df47188d4e598a396184b7',6);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTA0ODEwNSwiaWF0IjoxNzg2NDU2MTA1LCJqdGkiOiIxOTI5MDI3OWFiM2E0NDc0OGUxNDI3ZTYzMjY4N2IzYSIsInVzZXJfaWQiOiI2Njc4YzkwZS1mYjNkLTRiOGItYWNkMS1lMjQwNTJjNzllZDcifQ.fJ0q4fxO2o1_CEIG910sKT-pXVWS3pcaCSI_cSEsxr8','2026-08-11 13:48:25.892544','2026-09-10 13:48:25','6678c90efb3d4b8bacd1e24052c79ed7','19290279ab3a44748e1427e632687b3a',7);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTA0ODE0MCwiaWF0IjoxNzg2NDU2MTQwLCJqdGkiOiJiY2I2NzU5OGNlNWU0NmE2OWU5MzI0NGM3MzkyN2NiMCIsInVzZXJfaWQiOiI2Njc4YzkwZS1mYjNkLTRiOGItYWNkMS1lMjQwNTJjNzllZDcifQ.1nVs0Um9ai2eW5fy4nNGCZaxG-MxNX1MUwJJ57FZq5w','2026-08-11 13:49:00.515635','2026-09-10 13:49:00','6678c90efb3d4b8bacd1e24052c79ed7','bcb67598ce5e46a69e93244c73927cb0',8);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTA1OTE3MywiaWF0IjoxNzg2NDY3MTczLCJqdGkiOiIyYTVjM2NmMjk3YzY0MTQ1YjgxOTRhZGY5NGYxYjljOCIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.2cABbtIG_R9D7EcpBfZeu3XVy_4kwgu4Jl0Rwo6_slw','2026-08-11 16:52:53.597288','2026-09-10 16:52:53','7100b2fe82014d9089bfe43b97a2a910','2a5c3cf297c64145b8194adf94f1b9c8',9);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTExOTI1NiwiaWF0IjoxNzg2NTI3MjU2LCJqdGkiOiJhYzMzYmE2MjAzMDc0Y2RkODJhZTRlY2UwODIzYWY4NiIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.W07KS-UQ_GMlSi96Ir9uUwv46iCna4cv4Tm64pw0hfs','2026-08-12 09:34:16.083943','2026-09-11 09:34:16','7100b2fe82014d9089bfe43b97a2a910','ac33ba6203074cdd82ae4ece0823af86',10);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTExOTI3NSwiaWF0IjoxNzg2NTI3Mjc1LCJqdGkiOiIzMWJiODE2MmE5NjY0YmUyOTEyYjNiMmMyYzkzOWUwNyIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.dL-EZJnbxE_z6HSxQ6NKPk2KUcB1wDf6oBLL-tU6Uvo','2026-08-12 09:34:35.263246','2026-09-11 09:34:35','7100b2fe82014d9089bfe43b97a2a910','31bb8162a9664be2912b3b2c2c939e07',11);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMDY3NCwiaWF0IjoxNzg2NTI4Njc0LCJqdGkiOiJkOTEyMWU0ZmQwODU0MTM2OTZmMjY5YWIxNWVjZmYyZSIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.Gp2NU0IEq_fVw6xsDjUn1-FLUOLEuviiTCemPAapyWk','2026-08-12 09:57:54.315426','2026-09-11 09:57:54','7100b2fe82014d9089bfe43b97a2a910','d9121e4fd085413696f269ab15ecff2e',12);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMDY4NSwiaWF0IjoxNzg2NTI4Njg1LCJqdGkiOiIzNDMwMWJiNGJhZWY0ZjMzYTA5N2M0MWNhOGU1ZjlmYiIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.XgqcR0v8yMPk1xinj74pBxWeJEgiJpR6U4K2gFvIFso','2026-08-12 09:58:05.843107','2026-09-11 09:58:05','7100b2fe82014d9089bfe43b97a2a910','34301bb4baef4f33a097c41ca8e5f9fb',13);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMDkxNSwiaWF0IjoxNzg2NTI4OTE1LCJqdGkiOiI0MThkNzg3YzMwNDM0YWI0ODY3YmI4Nzc2YzAxNjJmYyIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.7f3HwgA4BPtIIPh6e58y8YZr3dCLE6dONdlF6mtPjJs','2026-08-12 10:01:55.279441','2026-09-11 10:01:55','7100b2fe82014d9089bfe43b97a2a910','418d787c30434ab4867bb8776c0162fc',14);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMDkxNSwiaWF0IjoxNzg2NTI4OTE1LCJqdGkiOiI2MWE1MmJkZjc2OTA0MWU2YjlkMThhYjUxNzZiYjQ2MCIsInVzZXJfaWQiOiI5Yjg3ZTMyNS0wNTYzLTQ3ZjEtOWZkMy0wMjZkNWNhZDIzZTEifQ.OkbK01IovM5Hn_1x_Q22Ec4gMDpLNInI_2eV224sIWo','2026-08-12 10:01:55.895908','2026-09-11 10:01:55','9b87e325056347f19fd3026d5cad23e1','61a52bdf769041e6b9d18ab5176bb460',15);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMDk3NywiaWF0IjoxNzg2NTI4OTc3LCJqdGkiOiJiOWIzZmYwNGUzMGU0ZmE2OThmNjE4MWQxMWJiYmEwNiIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.RCcz5fQaZMzjaBYskR8e-e8cHD1RQ76CQmP35JoLKwA','2026-08-12 10:02:57.079433','2026-09-11 10:02:57','7100b2fe82014d9089bfe43b97a2a910','b9b3ff04e30e4fa698f6181d11bbba06',16);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMTA0NywiaWF0IjoxNzg2NTI5MDQ3LCJqdGkiOiIwMzIxZDY2MmVmYzc0ZTQzOWI3MDFjYzY1ODQ4NjZkZiIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.qqtrx-F_eGgFnqr1TWTvOz791bvJBffOQsngVbbNfxk','2026-08-12 10:04:07.395747','2026-09-11 10:04:07','7100b2fe82014d9089bfe43b97a2a910','0321d662efc74e439b701cc6584866df',17);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMTA2MSwiaWF0IjoxNzg2NTI5MDYxLCJqdGkiOiJjMjhlMzI5YTk3OTc0Mzg1OGUzMmZmMTdmMjUyZTliZSIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.wE8J_Ld-sedMSl0iP5oTNZwBVYBkHtX6L7of5PtxcEU','2026-08-12 10:04:21.284269','2026-09-11 10:04:21','7100b2fe82014d9089bfe43b97a2a910','c28e329a979743858e32ff17f252e9be',18);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMTA3MCwiaWF0IjoxNzg2NTI5MDcwLCJqdGkiOiI3NzczZjRiZTVmZGM0NTY3YTY0NjJmMDExYjFhODA0NCIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.7oAuviIevgdvJmfAMOTuKuHgkhGLZaBSBlKIlR6R2-A','2026-08-12 10:04:30.466923','2026-09-11 10:04:30','7100b2fe82014d9089bfe43b97a2a910','7773f4be5fdc4567a6462f011b1a8044',19);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMTA3NywiaWF0IjoxNzg2NTI5MDc3LCJqdGkiOiI2NjZiZDI3YmJkYjM0NDQ4OTM5NmI2NGZlOTYyMzJhZSIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.kS-pGQ4iAVQzNwZSONZv1MJFCkLMp_FzHPbPMcoCEIc','2026-08-12 10:04:37.364793','2026-09-11 10:04:37','7100b2fe82014d9089bfe43b97a2a910','666bd27bbdb344489396b64fe96232ae',20);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjAwMCwiaWF0IjoxNzg2NTMwMDAwLCJqdGkiOiJiMDkzNjdhZDkwMTI0MjM5Yjc2MmE2ZGY5NDVmMmIxYSIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.NQnGVPhnL0q3yH1_KtTxyw_C1lYwRtHm0uMTE5OL_zc','2026-08-12 10:20:00.794242','2026-09-11 10:20:00','7100b2fe82014d9089bfe43b97a2a910','b09367ad90124239b762a6df945f2b1a',21);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjQyMiwiaWF0IjoxNzg2NTMwNDIyLCJqdGkiOiIyZDg3YWIwODhkZWQ0YTlkODBhMjhmOGNkYjZmMGNkNCIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.fPVKhd-apWZUvRDjoAjjLV6C6xIAAT1INcI7RCPEXJM','2026-08-12 10:27:02.598321','2026-09-11 10:27:02','7100b2fe82014d9089bfe43b97a2a910','2d87ab088ded4a9d80a28f8cdb6f0cd4',22);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjQ2NSwiaWF0IjoxNzg2NTMwNDY1LCJqdGkiOiJhOGFkMTM3MGQxOWI0NzUzOTM0MGNhZmZlMGZmZDkwZCIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.htDueyGPAZj8lU8eYieNBzd_Jtp_dZKMlTOefC5Ht_4','2026-08-12 10:27:45.437792','2026-09-11 10:27:45','7100b2fe82014d9089bfe43b97a2a910','a8ad1370d19b47539340caffe0ffd90d',23);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjY5NywiaWF0IjoxNzg2NTMwNjk3LCJqdGkiOiIyNTczMmUxNjcyNjM0ZDliOGRiZjg4MGJjNWRjY2FmYiIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.oWxQb6H-TMJ-yh_OKQMAho1bxCkzm8v9C_ZaqNebs8Q','2026-08-12 10:31:37.333927','2026-09-11 10:31:37','7100b2fe82014d9089bfe43b97a2a910','25732e1672634d9b8dbf880bc5dccafb',24);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjY5NywiaWF0IjoxNzg2NTMwNjk3LCJqdGkiOiI0ZTU3Yjc1ZGE3ZTU0NzgyYTEyYTZiYWI0MmFjMTVhYyIsInVzZXJfaWQiOiI5Yjg3ZTMyNS0wNTYzLTQ3ZjEtOWZkMy0wMjZkNWNhZDIzZTEifQ.rdDTtKVapN7FJ6jy8xZ0sajINaifyePUSfgrlnTbuFE','2026-08-12 10:31:37.693505','2026-09-11 10:31:37','9b87e325056347f19fd3026d5cad23e1','4e57b75da7e54782a12a6bab42ac15ac',25);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjY5OCwiaWF0IjoxNzg2NTMwNjk4LCJqdGkiOiI3NDU3N2RiNDczZTc0ZThhYTQ0OTFmZWE5NGM5MTQ3MSIsInVzZXJfaWQiOiI2Njc4YzkwZS1mYjNkLTRiOGItYWNkMS1lMjQwNTJjNzllZDcifQ.C8UACOnoECHcCh3nXo6rs-ffhljU7igvs5RZQCupsFo','2026-08-12 10:31:38.330659','2026-09-11 10:31:38','6678c90efb3d4b8bacd1e24052c79ed7','74577db473e74e8aa4491fea94c91471',26);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjcwNSwiaWF0IjoxNzg2NTMwNzA1LCJqdGkiOiIyMTY4MDlkNGJlOTQ0NzM5OWU2OGVlMGFhZGI1OWQ2NyIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.SY_aGJtlSF5Hz-XBKxh7NdMK6SLAvanJn4EFY2nWM70','2026-08-12 10:31:45.529708','2026-09-11 10:31:45','7100b2fe82014d9089bfe43b97a2a910','216809d4be9447399e68ee0aadb59d67',27);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjcxMywiaWF0IjoxNzg2NTMwNzEzLCJqdGkiOiI1MjdkMzNhYzJhNmI0ODBkODljNDA1MmUxYmRhZGUxNCIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.ozcC_U9hhGP4biwkmzFG4rKdYShL_OJbPySg0aKVJNE','2026-08-12 10:31:53.431758','2026-09-11 10:31:53','7100b2fe82014d9089bfe43b97a2a910','527d33ac2a6b480d89c4052e1bdade14',28);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjcyMywiaWF0IjoxNzg2NTMwNzIzLCJqdGkiOiJkNmE0Mjk5NjIxZjE0ZmU2OGFiNTE4ODBhYmE0ZDZiOCIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.Sna8pfzUDO0QxVUUN6edLuFE1EgMo77mMThPwoehY_s','2026-08-12 10:32:03.722485','2026-09-11 10:32:03','7100b2fe82014d9089bfe43b97a2a910','d6a4299621f14fe68ab51880aba4d6b8',29);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjczNSwiaWF0IjoxNzg2NTMwNzM1LCJqdGkiOiI0ZjlkNDUwOTA2YmE0YjAxOGE1YTUxMDQ0OWQxOWMwZiIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.ZY-0Xs6d90CWf_j7zl_GUGuzSk6nnRTj5r1LbDcTPxc','2026-08-12 10:32:15.864889','2026-09-11 10:32:15','7100b2fe82014d9089bfe43b97a2a910','4f9d450906ba4b018a5a510449d19c0f',30);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjgxNSwiaWF0IjoxNzg2NTMwODE1LCJqdGkiOiI2NWE2MzQxMjI2MjE0ZTFlOTgyMGM0MjA3ODc0MWM2YyIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ._cOiV1FeHD2kXwiUpcgTWFDXew0_7n7y1--tQ1KyQ4U','2026-08-12 10:33:35.507841','2026-09-11 10:33:35','7100b2fe82014d9089bfe43b97a2a910','65a6341226214e1e9820c42078741c6c',31);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjgyNCwiaWF0IjoxNzg2NTMwODI0LCJqdGkiOiJhODIzMjU3OWFkNTQ0OTBlYTM1MGYzZjRhODQ1MzY3MCIsInVzZXJfaWQiOiI2Njc4YzkwZS1mYjNkLTRiOGItYWNkMS1lMjQwNTJjNzllZDcifQ.Z_byt786tGElbiiGHtc6THZ3wUq66Lk_x4tkqBV9hL4','2026-08-12 10:33:44.377940','2026-09-11 10:33:44','6678c90efb3d4b8bacd1e24052c79ed7','a8232579ad54490ea350f3f4a8453670',32);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTEyMjgyNCwiaWF0IjoxNzg2NTMwODI0LCJqdGkiOiI5OTZiMGM4ZjYyYmQ0MzcwYWE1NTQyNmYxYTI3MGRhNiIsInVzZXJfaWQiOiI5Yjg3ZTMyNS0wNTYzLTQ3ZjEtOWZkMy0wMjZkNWNhZDIzZTEifQ.ajb7zBUzshVnvPY6K3mlu2QoltVQY_TctFyEFDngjHM','2026-08-12 10:33:44.751732','2026-09-11 10:33:44','9b87e325056347f19fd3026d5cad23e1','996b0c8f62bd4370aa55426f1a270da6',33);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTkyNjU2NywiaWF0IjoxNzg3MzM0NTY3LCJqdGkiOiI5YTI1MjIzMGY4YmE0NTAzYTcxM2EzMDllNjMwNjZjYSIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.h0nSlZDU-4jrKsE8cqbV8x6jX-4BIiOWuv09T45X6LI','2026-08-21 17:49:27.095239','2026-09-20 17:49:27','7100b2fe82014d9089bfe43b97a2a910','9a252230f8ba4503a713a309e63066ca',34);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTkyNjU4MCwiaWF0IjoxNzg3MzM0NTgwLCJqdGkiOiJjNTQyYjRiZWI2ZjI0NzRlOGI4NWQ5YWU3NzZhYjc5NCIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.V9lQg3Kppj_LkBZL5jHPrDe0W6zY4w4uEEDsniFjWPM','2026-08-21 17:49:40.013826','2026-09-20 17:49:40','7100b2fe82014d9089bfe43b97a2a910','c542b4beb6f2474e8b85d9ae776ab794',35);
INSERT INTO "token_blacklist_outstandingtoken" ("token","created_at","expires_at","user_id","jti","id") VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4OTkyNjY0NiwiaWF0IjoxNzg3MzM0NjQ2LCJqdGkiOiJhOWQ0YzgxYmJkNjA0ZGJiODBjMTUzMDc1YWVjZjc1ZiIsInVzZXJfaWQiOiI3MTAwYjJmZS04MjAxLTRkOTAtODliZi1lNDNiOTdhMmE5MTAifQ.4NeZGc-r-Sa5GfuKFhrNj8Q20c1zT7A0xFaUpN0Sy0Q','2026-08-21 17:50:46.235628','2026-09-20 17:50:46','7100b2fe82014d9089bfe43b97a2a910','a9d4c81bbd604dbb80c153075aecf75f',36);
CREATE INDEX IF NOT EXISTS "account_emailaddress_email_03be32b2" ON "account_emailaddress" (
	"email"
);
CREATE INDEX IF NOT EXISTS "account_emailaddress_user_id_2c513194" ON "account_emailaddress" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "account_emailaddress_user_id_email_987c8728_uniq" ON "account_emailaddress" (
	"user_id",
	"email"
);
CREATE INDEX IF NOT EXISTS "account_emailconfirmation_email_address_id_5b7f8c58" ON "account_emailconfirmation" (
	"email_address_id"
);
CREATE INDEX IF NOT EXISTS "accounts_us_email_74c8d6_idx" ON "accounts_user" (
	"email"
);
CREATE INDEX IF NOT EXISTS "accounts_us_role_1fa9a5_idx" ON "accounts_user" (
	"role"
);
CREATE INDEX IF NOT EXISTS "accounts_user_groups_group_id_bd11a704" ON "accounts_user_groups" (
	"group_id"
);
CREATE INDEX IF NOT EXISTS "accounts_user_groups_user_id_52b62117" ON "accounts_user_groups" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_user_groups_user_id_group_id_59c0b32f_uniq" ON "accounts_user_groups" (
	"user_id",
	"group_id"
);
CREATE INDEX IF NOT EXISTS "accounts_user_role_57e97df0" ON "accounts_user" (
	"role"
);
CREATE INDEX IF NOT EXISTS "accounts_user_user_permissions_permission_id_113bb443" ON "accounts_user_user_permissions" (
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "accounts_user_user_permissions_user_id_e4f0a161" ON "accounts_user_user_permissions" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_user_user_permissions_user_id_permission_id_2ab516c2_uniq" ON "accounts_user_user_permissions" (
	"user_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "ai_aiusagel_created_7d1979_idx" ON "ai_aiusagelog" (
	"created_at"
);
CREATE INDEX IF NOT EXISTS "ai_aiusagel_user_id_2d09e6_idx" ON "ai_aiusagelog" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "ai_aiusagelog_user_id_abe69231" ON "ai_aiusagelog" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "analytics_d_date_79f52f_idx" ON "analytics_dailystat" (
	"date"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" (
	"group_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" (
	"group_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" (
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_permission_content_type_id_2f476e4b" ON "auth_permission" (
	"content_type_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" (
	"content_type_id",
	"codename"
);
CREATE INDEX IF NOT EXISTS "axes_accessattempt_ip_address_10922d9c" ON "axes_accessattempt" (
	"ip_address"
);
CREATE INDEX IF NOT EXISTS "axes_accessattempt_user_agent_ad89678b" ON "axes_accessattempt" (
	"user_agent"
);
CREATE INDEX IF NOT EXISTS "axes_accessattempt_username_3f2d4ca0" ON "axes_accessattempt" (
	"username"
);
CREATE UNIQUE INDEX IF NOT EXISTS "axes_accessattempt_username_ip_address_user_agent_8ea22282_uniq" ON "axes_accessattempt" (
	"username",
	"ip_address",
	"user_agent"
);
CREATE INDEX IF NOT EXISTS "axes_accessfailurelog_ip_address_2e9f5a7f" ON "axes_accessfailurelog" (
	"ip_address"
);
CREATE INDEX IF NOT EXISTS "axes_accessfailurelog_user_agent_ea145dda" ON "axes_accessfailurelog" (
	"user_agent"
);
CREATE INDEX IF NOT EXISTS "axes_accessfailurelog_username_a8b7e8a4" ON "axes_accessfailurelog" (
	"username"
);
CREATE INDEX IF NOT EXISTS "axes_accesslog_ip_address_86b417e5" ON "axes_accesslog" (
	"ip_address"
);
CREATE INDEX IF NOT EXISTS "axes_accesslog_user_agent_0e659004" ON "axes_accesslog" (
	"user_agent"
);
CREATE INDEX IF NOT EXISTS "axes_accesslog_username_df93064b" ON "axes_accesslog" (
	"username"
);
CREATE INDEX IF NOT EXISTS "blog_blogpo_author__0d5a17_idx" ON "blog_blogpost" (
	"author_id"
);
CREATE INDEX IF NOT EXISTS "blog_blogpo_slug_361555_idx" ON "blog_blogpost" (
	"slug"
);
CREATE INDEX IF NOT EXISTS "blog_blogpo_status_9c1956_idx" ON "blog_blogpost" (
	"status"
);
CREATE INDEX IF NOT EXISTS "blog_blogpost_author_id_ffcc150f" ON "blog_blogpost" (
	"author_id"
);
CREATE INDEX IF NOT EXISTS "blog_blogpost_category_id_0e9835dd" ON "blog_blogpost" (
	"category_id"
);
CREATE INDEX IF NOT EXISTS "certificate_course__ae474d_idx" ON "certificates_certificate" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "certificate_number_94bd9f_idx" ON "certificates_certificate" (
	"number"
);
CREATE INDEX IF NOT EXISTS "certificate_user_id_6d3a3d_idx" ON "certificates_certificate" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "certificates_certificate_course_id_3df6d8a3" ON "certificates_certificate" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "certificates_certificate_enrollment_id_7720861d" ON "certificates_certificate" (
	"enrollment_id"
);
CREATE INDEX IF NOT EXISTS "certificates_certificate_user_id_540f04d7" ON "certificates_certificate" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "courses_category_parent_id_5fb86d36" ON "courses_category" (
	"parent_id"
);
CREATE INDEX IF NOT EXISTS "courses_cou_instruc_98570d_idx" ON "courses_course" (
	"instructor_id",
	"status"
);
CREATE INDEX IF NOT EXISTS "courses_cou_slug_2e551f_idx" ON "courses_course" (
	"slug"
);
CREATE INDEX IF NOT EXISTS "courses_cou_status_ee4b06_idx" ON "courses_course" (
	"status",
	"is_featured"
);
CREATE INDEX IF NOT EXISTS "courses_course_category_id_d64b93bf" ON "courses_course" (
	"category_id"
);
CREATE INDEX IF NOT EXISTS "courses_course_instructor_id_5b0643dc" ON "courses_course" (
	"instructor_id"
);
CREATE INDEX IF NOT EXISTS "courses_coursereview_course_id_15681ba3" ON "courses_coursereview" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "courses_coursereview_enrollment_id_0735d766" ON "courses_coursereview" (
	"enrollment_id"
);
CREATE INDEX IF NOT EXISTS "courses_coursereview_user_id_7838c5d6" ON "courses_coursereview" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "courses_coursereview_user_id_course_id_f21a28f1_uniq" ON "courses_coursereview" (
	"user_id",
	"course_id"
);
CREATE INDEX IF NOT EXISTS "courses_wishlist_course_id_c0edfaa0" ON "courses_wishlist" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "courses_wishlist_user_id_cd780565" ON "courses_wishlist" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "courses_wishlist_user_id_course_id_0b1fbddc_uniq" ON "courses_wishlist" (
	"user_id",
	"course_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_user_id_c564eba6" ON "django_admin_log" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" (
	"app_label",
	"model"
);
CREATE INDEX IF NOT EXISTS "django_session_expire_date_a5c62663" ON "django_session" (
	"expire_date"
);
CREATE INDEX IF NOT EXISTS "enrollments_course__6b5436_idx" ON "enrollments_enrollment" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "enrollments_enrollm_a82816_idx" ON "enrollments_lessonprogress" (
	"enrollment_id"
);
CREATE INDEX IF NOT EXISTS "enrollments_enrollment_course_id_c54c9325" ON "enrollments_enrollment" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "enrollments_enrollment_current_lesson_id_5670c6de" ON "enrollments_enrollment" (
	"current_lesson_id"
);
CREATE INDEX IF NOT EXISTS "enrollments_enrollment_status_9b33eca9" ON "enrollments_enrollment" (
	"status"
);
CREATE INDEX IF NOT EXISTS "enrollments_enrollment_user_id_3246abf4" ON "enrollments_enrollment" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "enrollments_enrollment_user_id_course_id_2d9b4eac_uniq" ON "enrollments_enrollment" (
	"user_id",
	"course_id"
);
CREATE INDEX IF NOT EXISTS "enrollments_lesson__6b93a2_idx" ON "enrollments_lessonprogress" (
	"lesson_id"
);
CREATE INDEX IF NOT EXISTS "enrollments_lessonprogress_enrollment_id_0749b788" ON "enrollments_lessonprogress" (
	"enrollment_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "enrollments_lessonprogress_enrollment_id_lesson_id_635d5cf3_uniq" ON "enrollments_lessonprogress" (
	"enrollment_id",
	"lesson_id"
);
CREATE INDEX IF NOT EXISTS "enrollments_lessonprogress_lesson_id_6e77b767" ON "enrollments_lessonprogress" (
	"lesson_id"
);
CREATE INDEX IF NOT EXISTS "enrollments_status_48622c_idx" ON "enrollments_enrollment" (
	"status"
);
CREATE INDEX IF NOT EXISTS "enrollments_user_id_aedbc1_idx" ON "enrollments_enrollment" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "features_jobpost_employer_id_583203c6" ON "features_jobpost" (
	"employer_id"
);
CREATE INDEX IF NOT EXISTS "forums_foru_author__1a81ac_idx" ON "forums_forumthread" (
	"author_id"
);
CREATE INDEX IF NOT EXISTS "forums_foru_author__bd0232_idx" ON "forums_forumreply" (
	"author_id"
);
CREATE INDEX IF NOT EXISTS "forums_foru_course__128785_idx" ON "forums_forumthread" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "forums_foru_is_pinn_0101eb_idx" ON "forums_forumthread" (
	"is_pinned",
	"created_at"
);
CREATE INDEX IF NOT EXISTS "forums_foru_thread__7d6b4d_idx" ON "forums_forumreply" (
	"thread_id"
);
CREATE INDEX IF NOT EXISTS "forums_forumreply_author_id_e69c8a25" ON "forums_forumreply" (
	"author_id"
);
CREATE INDEX IF NOT EXISTS "forums_forumreply_thread_id_6a2ad26e" ON "forums_forumreply" (
	"thread_id"
);
CREATE INDEX IF NOT EXISTS "forums_forumthread_author_id_f064f5ff" ON "forums_forumthread" (
	"author_id"
);
CREATE INDEX IF NOT EXISTS "forums_forumthread_course_id_1cb9fdc1" ON "forums_forumthread" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "lessons_cou_course__0c2a48_idx" ON "lessons_coursemodule" (
	"course_id",
	"module_order"
);
CREATE INDEX IF NOT EXISTS "lessons_coursemodule_course_id_41631be6" ON "lessons_coursemodule" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "lessons_les_course__8d7f09_idx" ON "lessons_lesson" (
	"course_id",
	"lesson_order"
);
CREATE INDEX IF NOT EXISTS "lessons_les_module__4f5e15_idx" ON "lessons_lesson" (
	"module_id",
	"lesson_order"
);
CREATE INDEX IF NOT EXISTS "lessons_les_slug_ebe546_idx" ON "lessons_lesson" (
	"slug"
);
CREATE INDEX IF NOT EXISTS "lessons_lesson_course_id_ddec91f2" ON "lessons_lesson" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "lessons_lesson_module_id_43312367" ON "lessons_lesson" (
	"module_id"
);
CREATE INDEX IF NOT EXISTS "lessons_lesson_slug_af9ce118" ON "lessons_lesson" (
	"slug"
);
CREATE INDEX IF NOT EXISTS "notificatio_is_read_3a06ff_idx" ON "notifications_notification" (
	"is_read",
	"created_at"
);
CREATE INDEX IF NOT EXISTS "notificatio_user_id_c291d5_idx" ON "notifications_notification" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "notifications_notification_type_78731a89" ON "notifications_notification" (
	"type"
);
CREATE INDEX IF NOT EXISTS "notifications_notification_user_id_b5e8c0ff" ON "notifications_notification" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "quizzes_answer_question_id_7e471477" ON "quizzes_answer" (
	"question_id"
);
CREATE INDEX IF NOT EXISTS "quizzes_question_quiz_id_70961654" ON "quizzes_question" (
	"quiz_id"
);
CREATE INDEX IF NOT EXISTS "quizzes_qui_quiz_id_d77716_idx" ON "quizzes_quizattempt" (
	"quiz_id",
	"user_id"
);
CREATE INDEX IF NOT EXISTS "quizzes_qui_status_3ebe55_idx" ON "quizzes_quizattempt" (
	"status"
);
CREATE INDEX IF NOT EXISTS "quizzes_qui_user_id_f3e411_idx" ON "quizzes_quizattempt" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "quizzes_quiz_course_id_6476d9c4" ON "quizzes_quiz" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "quizzes_quizattempt_enrollment_id_f674e276" ON "quizzes_quizattempt" (
	"enrollment_id"
);
CREATE INDEX IF NOT EXISTS "quizzes_quizattempt_quiz_id_da54d53d" ON "quizzes_quizattempt" (
	"quiz_id"
);
CREATE INDEX IF NOT EXISTS "quizzes_quizattempt_user_id_e9ee8fc7" ON "quizzes_quizattempt" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "socialaccount_socialaccount_provider_uid_fc810c6e_uniq" ON "socialaccount_socialaccount" (
	"provider",
	"uid"
);
CREATE INDEX IF NOT EXISTS "socialaccount_socialaccount_user_id_8146e70c" ON "socialaccount_socialaccount" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "socialaccount_socialapp_sites_site_id_2579dee5" ON "socialaccount_socialapp_sites" (
	"site_id"
);
CREATE INDEX IF NOT EXISTS "socialaccount_socialapp_sites_socialapp_id_97fb6e7d" ON "socialaccount_socialapp_sites" (
	"socialapp_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "socialaccount_socialapp_sites_socialapp_id_site_id_71a9a768_uniq" ON "socialaccount_socialapp_sites" (
	"socialapp_id",
	"site_id"
);
CREATE INDEX IF NOT EXISTS "socialaccount_socialtoken_account_id_951f210e" ON "socialaccount_socialtoken" (
	"account_id"
);
CREATE INDEX IF NOT EXISTS "socialaccount_socialtoken_app_id_636a42d7" ON "socialaccount_socialtoken" (
	"app_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq" ON "socialaccount_socialtoken" (
	"app_id",
	"account_id"
);
CREATE INDEX IF NOT EXISTS "token_blacklist_outstandingtoken_user_id_83bc629a" ON "token_blacklist_outstandingtoken" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "unique_primary_email" ON "account_emailaddress" (
	"user_id",
	"primary"
) WHERE "primary";
CREATE UNIQUE INDEX IF NOT EXISTS "unique_verified_email" ON "account_emailaddress" (
	"email"
) WHERE "verified";
COMMIT;
