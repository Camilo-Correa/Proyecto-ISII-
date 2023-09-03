CREATE TABLE categories (
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (code)
);
insert into categories (code, name)
values ('1', 'Category 1');
insert into categories (code, name)
values ('2', 'Category 2');
insert into categories (code, name)
values ('3', 'Category 3');
insert into categories (code, name)
values ('4', 'Category 4');
insert into categories (code, name)
values ('5', 'Category 5');