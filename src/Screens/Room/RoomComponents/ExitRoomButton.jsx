import { Box } from "@chakra-ui/react";
import { APPCOLORS } from "../../../AppConstants";




export function ExitRoomButton(props) {
    return (
      <Box bg={APPCOLORS.panel} p={2} borderRadius={100}>
        <svg
          width={24}
          height={24}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M10 21a1 1 0 00-1-1H5a1 1 0 01-1-1V5a1 1 0 011-1h4a1 1 0 000-2H5a3 3 0 00-3 3v14a3 3 0 003 3h4a1 1 0 001-1zm-1.71-9.71a1 1 0 00-.21.33.94.94 0 000 .76 1 1 0 00.21.33l4 4a1.004 1.004 0 101.42-1.42L11.41 13H21a1 1 0 000-2h-9.59l2.3-2.29A1.005 1.005 0 0013 6.996a1.004 1.004 0 00-.71.294l-4 4z"
            fill="#fff"
          />
        </svg>
      </Box>
    );
}