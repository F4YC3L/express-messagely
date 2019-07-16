CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users,
    to_username text NOT NULL REFERENCES users,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL,
    read_at timestamp with time zone
);

INSERT INTO messages( from_username, to_username, body, sent_at, read_at)
    VALUES ("Fayceloo",
            "mgreene",
            "hello how are you?",
            current_timestamp,
            current_timestamp
    )

INSERT INTO messages( from_username, to_username, body, sent_at, read_at)
    VALUES ("mgreene",
            "Fayceloo",
            "I am fine, thank you.",
            current_timestamp,
            current_timestamp
    )

INSERT INTO users(username, password, first_name, last_name,phone, join_at, last_login_at)
    VALUES ('mgreene',
            '$2b$12$pC1el05dLIBw/FN3F18nte62uG7sAzROHMCGsoSe9AzIj5kinOxwG',
            'Mara',
            'greene',
            '18008000',
            current_timestamp,
            current_timestamp
            )

INSERT INTO users(username, password, first_name, last_name,phone, join_at, last_login_at)
    VALUES ('Fayceloo',
            '$2b$12$pC1el05dLIBw/FN3F18nte62uG7sAzROHMCGsoSe9AzIj5kinOxwG',
            'Faycel',
            'Touili',
            '23421353453',
            current_timestamp,
            current_timestamp
            )
