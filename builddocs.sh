pandoc ./content/usage.pandoc_md -s -t man > ./man/jsonltocsv.1
pandoc -s content/usage.pandoc_md -t markdown_github > ./README.md
