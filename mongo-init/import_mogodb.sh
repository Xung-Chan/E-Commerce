
#!/bin/bash
set -e

echo "🔄 Bắt đầu seeding MongoDB..."

# Đợi MongoDB khởi động
sleep 3

DB_NAME="e_commerce"

# Lặp qua tất cả file .json trong thư mục init
for file in /docker-entrypoint-initdb.d/*.json; do
  COLLECTION=$(basename "$file" .json)

  echo "📥 Importing $COLLECTION from $file ..."

  mongoimport \
    --db="$DB_NAME" \
    --collection="$COLLECTION" \
    --file="$file" \
    --jsonArray
done


echo "✅ Seeding hoàn tất!"
