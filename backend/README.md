# backend-eep-oe
Backend app for EEP online examination system built with drf.

## Install requirements
  pip install -r requirements.txt


### to free port in use
sudo netstat -tuln | grep 8080 or 
lsof -ti :8000
sudo kill <PID>
