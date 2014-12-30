mysql_path="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "$mysql_path/all_schema.sql"


# mysql -uroot -pehowlsus14  < $mysql_path/all_schema.sql;
# mysql -uroot -pehowlsus14  codemellow< $mysql_path/all_insert.sql;


mysql -h 115.145.211.120 -uroot -pehowlsus14  < $mysql_path/all_schema.sql;
mysql -h 115.145.211.120 -uroot -pehowlsus14  codemellow< $mysql_path/all_insert.sql;
