import smtplib
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr

# Define sender and recipient
sender = '<email>'
sender_title = ""
recipient = '<email>'

# Create message
msg = MIMEText("Your message text here", 'plain', 'utf-8')
msg['Subject'] = Header("Your email subject", 'utf-8')
msg['From'] = formataddr((str(Header(sender_title, 'utf-8')), sender))
msg['To'] = recipient

# Create server object with SSL option
# Use the correct SMTP server based on your region
server = smtplib.SMTP_SSL('smtp.zoho.com', 465)  # For US
# server = smtplib.SMTP_SSL('smtp.zoho.eu', 465)  # For Europe
# server = smtplib.SMTP_SSL('smtp.zoho.in', 465)  # For India

# Perform operations via server
# Profile Cirle -> My Account -> Security -> App Password -> Generate Password
server.login('<username>', '<password>')
server.sendmail(sender, [recipient], msg.as_string())
server.quit()
