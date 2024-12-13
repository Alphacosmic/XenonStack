#!/bin/bash

# Check if the user has provided an argument
if [[ $# -eq 0 ]]; then
  echo "Usage: sysopctl [COMMAND] [OPTIONS]"
  exit 1
fi

# Command version
VERSION="v0.1.0"

# Function to show help message
function show_help {
  cat << EOF
Usage: sysopctl [COMMAND] [OPTIONS]

Commands:
  service list          List all running services
  service start <name>  Start a specific service
  service stop <name>   Stop a specific service
  system load           Show the current system load

Options:
  -h, --help            Show this help message
  -v, --version         Show the version of sysopctl
EOF
}

# Function to show version
function show_version {
  echo "sysopctl version $VERSION"
}

# Function to list running services
function list_services {
  echo "Listing all active services..."
  systemctl list-units --type=service --state=running
}

# Function to show system load
function show_system_load {
  echo "Current system load averages:"
  uptime
}

# Function to start a service
function start_service {
  if [[ -z "$1" ]]; then
    echo "Error: Please provide a service name."
    exit 1
  fi
  echo "Starting service: $1"
  sudo systemctl start "$1"
}

# Function to stop a service
function stop_service {
  if [[ -z "$1" ]]; then
    echo "Error: Please provide a service name."
    exit 1
  fi
  echo "Stopping service: $1"
  sudo systemctl stop "$1"
}

# Parse command-line arguments
case "$1" in
  service)
    case "$2" in
      list)
        list_services
        ;;
      start)
        start_service "$3"
        ;;
      stop)
        stop_service "$3"
        ;;
      *)
        echo "Error: Invalid service command"
        exit 1
        ;;
    esac
    ;;
  system)
    case "$2" in
      load)
        show_system_load
        ;;
      *)
        echo "Error: Invalid system command"
        exit 1
        ;;
    esac
    ;;
  -h|--help)
    show_help
    ;;
  -v|--version)
    show_version
    ;;
  *)
    echo "Error: Unknown command"
    show_help
    exit 1
    ;;
esac
