import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { ProcessRead } from 'components/molecules/ProcessRead';
import { ASSETS, DEFAULT_MESSAGE_TAGS, URLS } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { ButtonType, GQLNodeResponseType } from 'helpers/types';
import { formatAddress, getTagValue } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';

import * as S from './styles';

const config = {
	'white-zone': [
		{
			id: 'Q9mnzqVuiEsCPcR_NrmqHnK5Foz4DnCFcVsB9nHh9yk',
			type: 'Pool - Botega',
			ip: '54.153.74.160',
		},
		{
			id: 'NG-0lVX882MG5nhARrSzyprEK6ejonHpdUmaaMPsHE8',
			type: 'Token',
			ip: '13.57.34.88',
		},
		{
			id: 'qNvAoz0TgcH7DMg8BCVn8jF32QH5L6T29VjHxhHqqGE',
			type: 'Token',
			ip: '54.193.122.91',
		},
		{
			id: 'Bv5mfnx5Ln2BU60inXPnMOGMwecJXadV4oqw7iwjzSk',
			type: 'Pool - Botega',
			ip: '13.57.250.164',
		},
		{
			id: 'xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10',
			type: 'Token',
			ip: '54.177.124.148',
		},
		{
			id: '3biQvRjIp_9Qz1L9D3SJ9laK4akCkP-8bvAo3pQ6jVI',
			type: 'Pool - Botega',
			ip: '18.144.2.248',
		},
		{
			id: '0syT13r0s0tgPmIed95bJnuSqaD29HQNN8D3ElLSrsc',
			type: 'Token',
			ip: '54.153.38.174',
		},
		{
			id: 'B6qAwHi2OjZmyFCEU8hV6FZDSHbAOz8r0yy-fBbuTus',
			type: 'Pool - Botega',
			ip: '3.101.42.196',
		},
		{
			id: 'QvpGcggxE1EH0xUzL5IEFjkQd1Hdp1FrehGKIiyLczk',
			type: 'Pool - Permaswap',
			ip: '54.153.38.95',
		},
		{
			id: 'FRF1k0BSv0gRzNA2n-95_Fpz9gADq9BGi5PyXKFp6r8',
			type: 'Pool - Permaswap',
			ip: '3.101.54.119',
		},
		{
			id: 'q20BMW2EtOR69TLcm2CuOoXbS48Mer0COyLJw6tsUaU',
			type: 'Pool - Permaswap',
			ip: '18.144.156.71',
		},
		{
			id: 'T2r71KaJH15fpiyGD_RHsWqrIS1ccO7DZ7cm9g4HLRw',
			type: 'Pool - Permaswap',
			ip: '54.183.223.204',
		},
		{
			id: '_laMMu5weQgrtDhKjd4dIOZDej7XKwXcaHJmgOcPvK4',
			type: 'Pool - Permaswap',
			ip: '54.215.223.115',
		},
		{
			id: 'xKT5_B0-8fpwSUC6VnWggvOzN-mXt28kHVzx4sbvIqo',
			type: 'Pool - Permaswap',
			ip: '54.151.119.231',
		},
		{
			id: 'OevPKwznmOKv42BgKLOWQhiqiY4MkHQNLfzFgKhQKkU',
			type: 'Pool - Permaswap',
			ip: '3.101.53.98',
		},
		{
			id: 'uyt5hVBYFSJoDL5Gl00Qncva5Sv0um4pMfGNQiOaFTI',
			type: 'Pool - Permaswap',
			ip: '18.144.29.239',
		},
		{
			id: '_FXbSB-Fcs9NN3aHjhoJYIlYjzxOb3AAZUS_4er7hcE',
			type: 'Pool - Permaswap',
			ip: '54.183.91.207',
		},
		{
			id: '26BXDOZNPRhRwc7QFymTF5IJX-mBO2E8T8PN1Yj4olg',
			type: 'Pool - Botega',
			ip: '52.53.168.120',
		},
		{
			id: 'hPmmc-3A4Ba0K6AiUUBH5Bo0hfAN4g8EJa9asRx06R0',
			type: 'Pool - Botega',
			ip: '50.18.145.4',
		},
		{
			id: 'TYqlQ2vqkF0H6nC0mCgGe6G12pqq9DsSXpvtHYc6_xY',
			type: 'Pool - Permaswap',
			ip: '50.18.64.193',
		},
		{
			id: 'N_JfhIr5Bwz6VTnbL0quOIzn4tgw3P-zxMo0jt6Mk1g',
			type: 'Pool - Botega',
			ip: '54.193.21.204',
		},
		{
			id: '1Oz__qGSvdRx1kINc3G_BwEB2GzlG0rC0Yxe23Z-N-M',
			type: 'Pool - Botega',
			ip: '54.183.100.170',
		},
		{
			id: 'cfJIBVw4ojWnjiQJ1Z6CRU56YnYJPZpaMgAIs-BSi68',
			type: 'Pool - Botega',
			ip: '54.183.166.155',
		},
		{
			id: 'wTIpisZKMtG5WsLFqQBdoJEObyyeoJQmwWFm1h462D4',
			type: 'Pool - Botega',
			ip: '18.144.56.248',
		},
		{
			id: 'lmaw9BhyycEIyxWhr0kF_tTcfoSoduDX8fChpHn2eQM',
			type: 'Pool - Botega',
			ip: '54.183.77.59',
		},
		{
			id: 'vJY-ed1Aoa0pGgQ30BcpO9ehGBu1PfNHUlwV9W8_n5A',
			type: 'Pool',
			ip: '13.57.16.176',
		},
		{
			id: 'V7yzKBtzmY_MacDF-czrb1RY06xfidcGVrOjnhthMWM',
			type: 'Pool - Permaswap',
			ip: '3.101.79.171',
		},
		{
			id: '-9lYCEgMbASuQMr76ddhnaT3H996UFjMPc5jOs3kiAk',
			type: 'Pool',
			ip: '54.241.238.13',
		},
		{
			id: 'qhMOXu9ANdOmOE38fHC3PnJuRsAQ6JzGFNq09oBSmpM',
			type: 'Pool - Permaswap',
			ip: '54.241.103.234',
		},
		{
			id: 'Eb87m8cazuCnf7BtYk3gQO6kiuhEZwPNL1iTJnR1MdQ',
			type: 'Pool - Permaswap',
			ip: '54.219.41.194',
		},
		{
			id: 'JQecF9LdXyMOWb0F4UZcneoDR1988l8SKDW-FnM6Axk',
			type: 'Pool - Permaswap',
			ip: '54.153.99.179',
		},
		{
			id: 'cp5016JIc7wPNEM9NKa3xLV5zPTGtvt9PdIdy0gpOyo',
			type: 'Pool - Permaswap',
			ip: '54.176.223.195',
		},
		{
			id: 'xRt-J-awbZqQ7IgzrM5yxRCS9ub0oxnyjyfmRuVU_hg',
			type: 'Pool - Permaswap',
			ip: '54.177.121.167',
		},
		{
			id: '230cSNf7AWy6VsBTftbTXW76xR5H1Ki42nT2xM2fA6M',
			type: 'Pool - Permaswap',
			ip: '13.57.43.9',
		},
		{
			id: '-SFWHD17LTZR12vI792gUvsM40eioWSIZ1MFvyPA3zE',
			type: 'Pool - Permaswap',
			ip: '54.193.99.209',
		},
		{
			id: 'zcc1dz6iNzmvi5ggTwHeh-wylShevKvdAJGLQId3TOs',
			type: 'Pool - Permaswap',
			ip: '13.56.158.128',
		},
		{
			id: '_z7PXe9CJvrM-e61QNZEsdjJrZL8l_3zmaufovvWmf0',
			type: 'Pool - Permaswap',
			ip: '54.219.184.144',
		},
		{
			id: '7AOIMfTZVpX52-XYBDS7VHsXdqEYYsGdYND_MoEVEwg',
			type: 'Pool - Permaswap',
			ip: '52.53.252.160',
		},
		{
			id: 'fNFUX58BiHeBhB2D4EJsu88IeAHtJhugHSP__U6Y9dk',
			type: 'Pool - Permaswap',
			ip: '52.215.210.38',
		},
		{
			id: 'Krim6GbXWi6x1eP1eEvEqX6z1Pnl0uGqr0ULKhErNVQ',
			type: 'Pool - Permaswap',
			ip: '54.241.103.234',
		},
		{
			id: '2sWVPeUTYuB0VMrkgC9m_0MwljaZqEJdAfgJXNZgEIw',
			type: 'Pool - Permaswap',
			ip: '13.57.43.254',
		},
		{
			id: 'tnzfEWXA9CRxr9lBGZbZfVEZux44lZj3pqMJCK5cHgc',
			type: 'Pool - Permaswap',
			ip: '50.18.239.201',
		},
		{
			id: 'xZwIYa2DapmKmOpqOn9iMN0YQnYV4hgtwKadiKBpbt8',
			type: 'Pool - Permaswap',
			ip: '13.56.76.178',
		},
		{
			id: 'dBbZhQoV4Lq9Bzbm0vlTrHmOZT7NchC_Dillbmqx0tM',
			type: 'Pool - Permaswap',
			ip: '54.193.85.23',
		},
		{
			id: 'Jwsx_-ameSFkPOrRIy1oCIT7G3HpBKdbN4sHcgrJTZs',
			type: 'Pool - Permaswap',
			ip: '54.219.178.191',
		},
		{
			id: 'oAEA9jumIuH7imARCzTXfZNcT9GRG_lNLIbdLNnRsy4',
			type: 'Pool - Permaswap',
			ip: '54.219.178.191',
		},
		{
			id: 'fbz2ZMVuFMFAg3kk-6d5eLaltWjxB_Bz_fKnIV7ftUE',
			type: 'Pool - Permaswap',
			ip: '54.219.178.191',
		},
		{
			id: 'qcdYZTJZHsn5JnwjOXLzO3P7HfXMHvpH_qsvcipGNkQ',
			type: 'Pool - Botega',
			ip: '54.176.49.75',
		},
		{
			id: '9AsRe9T7Q29HT9NRJo_aZwGzbjQ9zfJt8hL7YtHyxrk',
			type: 'Pool - Botega',
			ip: '54.176.49.75',
		},
		{
			id: '0RrzrXCKNqkiTirTiHaAjqyZQ4DFTtiqBlhAYmidzaE',
			type: 'Pool - Botega',
			ip: '54.176.49.75',
		},
		{
			id: '0wwdPd_4YyA52OYLc-USMwvQdCjNgapj6FSYk3BNgEM',
			type: 'Pool - Botega',
			ip: '18.144.15.20',
		},
		{
			id: '9eM72ObMJM6o3WHi6nTldwhHsCXSKgzz1hv-FpURZB4',
			type: 'Pool - Botega',
			ip: '18.144.15.20',
		},
		{
			id: 'b1S4T9d2ZGM5P0FIKg2HLC4rcbrYvg5xZsRZKC4SgvE',
			type: 'Pool - Botega',
			ip: '18.144.15.20',
		},
		{
			id: '_MJbfFO79PJvVuKcqv9fF0_TABK2RlMcTJYHpyDB_8I',
			type: 'Pool - Botega',
			ip: '18.144.15.20',
		},
		{
			id: 'Ruw6Q5gVgZ-isWhRGW4LVvTu6rMost-J5SKsF4rF-rA',
			type: 'Pool - Botega',
			ip: '18.144.15.20',
		},
		{
			id: '7sUFikrorGKlYyiy3XRoiRB6dc7f_3v_fkT2fbjocHE',
			type: 'Pool - Botega',
			ip: '18.144.15.20',
		},
		{
			id: '20cEmow3vtkcmGbqgDIq7J9iLJB46_ku_LUoLvQT3uY',
			type: 'Pool - Botega',
			ip: '18.144.15.20',
		},
		{
			id: 'Fntcs_1CZYNck6932-D35sHXxERe7soHFEZUwqq6anQ',
			type: 'Pool - Botega',
			ip: '52.53.181.166',
		},
		{
			id: 'Oe-rQ8zQiI0SCE0Vy87luz_mDfxRD9-Go6yLlg_d3zA',
			type: 'Pool - Botega',
			ip: '52.53.181.166',
		},
		{
			id: 'wDfCERaauacZovKJ6HjJ6F3T1LXl3w50nL410hXKz7M',
			type: 'Pool - Botega',
			ip: '52.53.181.166',
		},
		{
			id: 'Fsf8SFd7APT3sRQqI5mfKFh0QjaIis26ZvVuvzMQEH8',
			type: 'Pool - Botega',
			ip: '52.53.181.166',
		},
		{
			id: 'Aiqyy9wgpVnnd96rdCRzL-5La568Rr9cvRrd1Rcdar8',
			type: 'Pool - Botega',
			ip: '52.53.181.166',
		},
		{
			id: 'Ky8sV4_Qae3fSLzFcJsg6ND8Keuu8tdsj6qYUYywfQs',
			type: 'Pool - Botega',
			ip: '52.53.181.166',
		},
		{
			id: '4N-avzg2oLBIRSQkox2Fb-dGoY7ip8rnNTdN03QuwvQ',
			type: 'Pool - Botega',
			ip: '52.53.181.166',
		},
		{
			id: 'KdIH8lNEuYEySqTYAoA_ceBuvgEKcmk6u_y8GMhBN80',
			type: 'Pool - Botega',
			ip: '52.53.181.166',
		},
		{
			id: 'wvrRUDLrXmzeoIOk4vqOdjIMWG6NddkGG_GxoY6HHKg',
			type: 'Pool - Botega',
			ip: '52.53.181.166',
		},
		{
			id: 'xrtZSjeU7-_pMJB6ytNmHcGq27xavxAOzfmym0mtdXI',
			type: 'Pool - Botega',
			ip: '54.176.148.86',
		},
		{
			id: 'HmOAy8P5qKy5PlD3zlxYCW6RWE1spYPpCi0X9ZLARcI',
			type: 'Pool - Botega',
			ip: '54.176.148.86',
		},
		{
			id: '8sCebZHN8C5eheRWF243TFCF84OLqGWBYP8PdKf8NK8',
			type: 'Pool - Botega',
			ip: '54.176.148.86',
		},
		{
			id: '9JgTfmz0d32tRSp4Z5ZNQygAPoDjWfEvdiWRsx4ECWU',
			type: 'Pool - Botega',
			ip: '54.176.148.86',
		},
		{
			id: 'gJiY9XYhDkI-lrGwmRD85XDJLh2bgQDpSQ-G64GMrZ8',
			type: 'Pool - Botega',
			ip: '54.176.148.86',
		},
		{
			id: 'uTVT617nw4Fq5dmeLxvraTg1PgryDF1jJUj4yPG70fk',
			type: 'Pool - Botega',
			ip: '54.176.148.86',
		},
		{
			id: 'jrHt5iZL8qbrcwpdryLs37sYrIdg-CseI3hYrWs1f-s',
			type: 'Pool - Botega',
			ip: '54.176.148.86',
		},
		{
			id: 'sC97cLJR5lpQNegTnTKBMR5yRLGtT-CKpLP_tjl4yDo',
			type: 'Pool - Botega',
			ip: '54.176.148.86',
		},
		{
			id: 'DzQ0ntwWzWRk-jYVxSSxQd-BVZ2cQgR1SMaS9mnMK5s',
			type: 'Pool - Botega',
			ip: '54.176.148.86',
		},
		{
			id: '8rbAftv7RaPxFjFk5FGUVAVCSjGQB4JHDcb9P9wCVhQ',
			type: 'Token',
			ip: '18.144.43.187',
		},
		{
			id: '5d91yO7AQxeHr3XNWIomRsfqyhYbeKPG2awuZd-EyH4',
			type: 'Token',
			ip: '18.144.43.187',
		},
		{
			id: 'O2mmX6O7ZNUnRfE8pYtzTT2uH55dXrvIR8YeaOEsp9I',
			type: 'Token',
			ip: '18.144.43.187',
		},
		{
			id: 'pazXumQI-HPH7iFGfTC-4_7biSnqz_U67oFAGry5zUY',
			type: 'Token',
			ip: '18.144.43.187',
		},
		{
			id: 'wOrb8b_V8QixWyXZub48Ki5B6OIDyf_p1ngoonsaRpQ',
			type: 'Token',
			ip: '18.144.43.187',
		},
		{
			id: 'JN7wNs3adSspWhJ5RJxcFeAvu1MO9HlPhSCBWJrycnk',
			type: 'Token',
			ip: '54.151.3.170',
		},
		{
			id: 'fbvxPHsjxkr0NxsY2A2ut1xOtvJObdYe-aClgnM1BKE',
			type: 'Token',
			ip: '54.151.3.170',
		},
		{
			id: '7zH9dlMNoxprab9loshv3Y7WG45DOny_Vrq9KrXObdQ',
			type: 'Token',
			ip: '54.151.3.170',
		},
		{
			id: 'OsK9Vgjxo0ypX_HLz2iJJuh4hp3I80yA9KArsJjIloU',
			type: 'Token',
			ip: '54.151.3.170',
		},
	],
	'cu-17-zone': [
		{
			cu: 'cu17.ao-testnet.xyz',
			id: '7gODvtdDnlDTPuokN24tIZ1BjyY_tu3-1r9Xma8x12U',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: '2QAQNey29ieiIm3CloMV3nDnAdWL52CdprKlB3hVnqM',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: '0OCzovCbeQr6lmLZe9KBWS58t6InYzcMA_3g1CB4oKI',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: '_lJhDiGDtI4jIcXxQ403FmoL-bi2ZD0eiHQgT3nCeZM',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'nmDYBZdPGi4uhHPsZd4Rh_fXTQVMyr0S0xKr7pSC2p8',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'rffXpqotVFmOy7pP_F4mSY5eKKwSlcdUBfeyeHsa5fg',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'BnYQMRwiyUJlRa6c7AYb4uQokcVulPJ_t5eoCDeQlKY',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'ySiiF-XaOn2QIGd-afipcFiCPDdpT_6C-Z5o2-63UpA',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: '2dDRnCZzIFex4hZyC_8cYUY5MwT8kjjOVEcXLpTf9u0',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'GOGBjHpP_9YqE138p203IDfJG1tdD4n-eQBRHcdX-ww',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'rbavjG3HtULMrSWMjz1_l2MjkJY5Ptfyo11sQvvFo8U',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'VTaSjhCrJCnAWCwCcrhOUoM7rqwQmK3a8AZkBcxisj8',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'r0auEHvwhuJAEhccwH1wMYm7qS5rYKkg939QMUf6FsU',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'RC_EJhzeg_-8_l4PB4_1Eka9P_2_yQJ4bp4GpbDLJjE',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'GYSDmMh9Qd4n-dQx3o1euwdRCFHoriEbKAWVQ54MSoo',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'UWPjD8de_IATtNsr-CgR3MltMdekXNwI3_2MhH-gRu4',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'vXNdBF403dQAeQ0Livnm44HyXvWYwM6qDNP3rgE_sks',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'wfUdhOL4It7neTIaqUNk-hewFDTqf_tVgGTLquFaJuo',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'RkTjZK6MHqk5h2by2GTHZMaEydkOBG0ccjfvM58bpFQ',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'VGqIZAMC6etpB8M_YDKL2wyCdUTEIY3dkJcfkwjI8RM',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'JCSkqPYTKpYuWwfqiGhSiTdPHvmsYBfC2ACNXhseyWA',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'R7PgfGuW241wiUPa6ZVngAz8eQ4QWJI-GQD-4jwJmPk',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: '_wA8vf87g39MpxxQnGeXLKxQIYFJkcQe6UbQJqjicdw',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'KnUxdrdbBHkx-gudOnnwqj-mmj5TWPXD_3Wm2NS8xMo',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'CLejbAGVY-xMGKUIokix2E0dp0iHiv8BhdSQoBIyzYo',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'FZs1ecv4fMGgFH_84KQ8BwxqTxpuTXWafd-UZhdszpk',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'nu_GQrv_HYj8MInbqC6Cxagk1tbASpyN9YcWU6G7NRk',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: '8kT9_98_2KgTVI5iLB7z3_WYdNz3lGGDHv3OmiTJYfE',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'fKWE2ysgsc6Qfh33EdnQF7Fj5VTlEn4zJfWVnDiFkOY',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'u1cs2QeHP2zDUi5Dw3naapMHIpkefHRrWlUb0eOJU3w',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: '1A7PL54qgoYReUeIzN5yW7FIDJmeCl2x_Iv1u-BOUbk',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'hMoopKV6N3C7yepQrO5Xy16TBUgHrwlbIFFYdGzw9BI',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'hXfFTgfX1EqVSEaA7W9DrY6sW_BGS9D5TdSzh_KnTD0',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'm5g0QM58FaQxqo84CwhwcjoL67224G5a8CnDxK3chlY',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'oI3rRkUIzRgiD1SoAY6rSsd0yqDXoiBot_aMmEnKMuQ',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'sAQ92IQe2m4krVheKKwi06BgUyg8rVZcwdDrcL69ZdQ',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'e7JVYR2Agdw7joJawqwQR0FUzcGn4l9R3i5QRUSmw5g',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'EDxv9SEtiRQluI5_6BGlpRizA-6yPW0UgtdvVRFP9JQ',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'VsBNDc2hAYANRPz2GaX8aawV42Gp-N4DGTbqFRyZa9I',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'w4l6VVCcLV6ijY5i0YEOZ8YqcdMmtme1UulI_WuoK2Q',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'fa1C99SSUhA8Z-ZUqGFshZ0wDhN_sHDDvYzxbE8R7t4',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'LTVCyvKCSoBDlysfVkJxKmZ09NxfvaP4TX0BuLxOdJ4',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'qH7vOUMmP6Y7QueO5-59BvcebL9762fQgIzkTiJTBlU',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'AVTAvOTtigCCG8xE6FosAOEkH4YqWrY7SYccq0AThks',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: '8p6SQVLmDox_ZOx4LMx3SfWuzFjgXL5D8U6S2R8CBS4',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'SSzyZ60BmrpNEy9Pdz4h5AV0RBp6CxB7cR4l6iXUKis',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'NGWCZnPJK-Rk1n469FpfEWaaR7yK1qIrKD26V-3-0e4',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'KAJfGj6QQDtiU_KxqD-SZKkySF6kr6Q8yPLNVL78Ypk',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'auGFQbanm_-XDutbeVXqrFd0GH3oP4D63XLjPi7AMHM',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'dXJlo66d3C9A_6cJaWSX-SdocF5MoDfJPSi6BNwzecM',
		},
		{
			cu: 'cu17.ao-testnet.xyz',
			id: 'SVRG1tx8o4_k2jPy-QqhfFOu6MBXrDgGQwOqchwyO_U',
		},
	],
	'cu-20-zone': [
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'GVcT61wP8BHwvAzV54cB-KWDH1P5e_UA7VqI3wRaogY',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'fQEIMipRPUyVKsnOxVeix0_RkMixxhmCd14Dqj8I6JQ',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'YMpOJXge2Ys0qyIH5An2LNmAFZtJ_hLP8OZZBIbWpGk',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: '_6iQItQPcWpKIBLylpNDRUpzwZQmn-SO3-yxPvGdiW0',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: '9vtav7iTw5gKuxhiNqShHJ0FC3U7DURDARqUO5tVaYk',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'p23BaSPLNIyFp1ca04gSG6yQ_kqZci_ROO3tgpujq00',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'x3FNYNSNAaAHp6q5F1hHzsVU_AXZ6GL8mYB0ZsgHPbw',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: '2EEY2LuJGTuN06824uCsEHfYiOpj6bsD66dl5zjveFE',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: '5fnOQkumubqDqTwBFnUNiSPbgYKTOAaLF7IUrzbGPII',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'xQbALEYV7LqxuESXe9BttA5xW5SICQFG7hcEwoh8WDc',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'AWSB5tHp3xXwGSkN5DTpK652IQWViDL9lvb0UX1y1LM',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'IX1iK7CyvPR-JNUqN-bT7kf0XGpn4JgQtrTq5Tl7hJg',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'UUf7KqniA-R8hBYTYlKEQqCL-vopq2y7jSTh9JxcXSo',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'vNwXq512w_fWmuAPA5WuTipcpst_ZKMcIge18p3hGrU',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: '8ip-ezqHnNa86RUZMUDNecrhZl487ExY_2JLUo_DRzQ',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'ncfpLy_FVWdhxcPCcPbXDntYl0O5vXT_UpMvttwn9xw',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'Zp93g4GQwo_4VwfV_p1Co2lf0WUXn3l15sdWt4JYWbk',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'qjcpfiPgBwYdC_b_BPnWBZSHcsLu1O8HVBXhXUm1WOs',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'KaTZtewqAQrkjlfMsIXt7Z9gCmK15DRfzs3_J_nUtJ8',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'SZ3E5B_zE-vF8E0e8mE3JcrWkTPE06H8ik2KmBHlsq4',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: '-qD5cszEcH82TZOPDQqJgAdRdaN11oF3T4HMdlRcc7Y',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'Rx-hwx3cfKo8YrFBcA299R10F1YhQEugpWoaRHI3JPI',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'cHxwI70eIaN0z2ZvbFMEFKG1AByRPLnckHBu5hKBRqQ',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'I45zcV7AAlJaAdf0M87rSK5lWXIWlSAp8y2dh07t_7o',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'rZ6JIYHzHgF5Q1K4xxmk6_RnXt5UL-hIVtoYFUPL-b0',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'CVLmqi_yYnkflC_4vAIaJbaaVARocw_BtokAkXFfYAw',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'Nua3kRPQqBV4gY6MRwHp8anlYI--HPaUOIghACe8xak',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'SEYZVOPza1PMfp7MEHliWSSZTSkb3eB6tGSJSO77gmk',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'TZfAuaWIhhSV6xWh7k80UzVXNcDMdJ7m7CRhVbzjYEg',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'bV-uUIvYgO7TitZXwwJMVXk5_nQkHMhyHFt5cKKOJts',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: '1-8G4UNbgxrPcNWeB3MnDT9dX-dHXeS2zJJu3wrnjtU',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'c1uQmT3gD2tGHqy6JJwaHripov9VazKWs0mOYUVUruk',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'ATgAGpHASoPb6OsirFL_nO6T6F8J6_O0Ppsdg-C7Iec',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'XMwMOo95KiHCTnWz9HByT_fxZlTRg3NS-QAjuC8xcZg',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'eoW1bRXKXWWsihjQuf0zuVLQK5hVzrHhE8v3vTu0T7Q',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'FOfNuJCGkfWA7fOZA8U_hNmYmawL_JiGbpz9K3PEWQk',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'Gi_XftqwYovbZkVL5IUrHVuNT9tYSBlPQc1gz3WiGZA',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'JnlvvZE4IWrpC5xiw2Bxr1C_lIxHB_aQI3_mTVuejdE',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'jUINiKH_tAdLZftrdWGnH1QzsGpEsI4ECXhR0UPM-gk',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: '9VNPyKe71XJ3gOAd_pbUFsnMmxDr9wEXJFLsXUWYMZ8',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'CKESo-vx6CIdOvEEznnBlprgvRe7kb1tSPC5LKSDlCM',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'sWi_nf6QGU-3gyLs2I7jRrWjmXGoy56gFJCn3tJP4n4',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'Bf8DkvZEEiUuHNPKjj_WgnNclOwx_P7yJjI_t1-gZnY',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'HCa2LgSDXt0I2rgNAlr3B16rLLchtSgMIRWLNREbXMs',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'fGaH-yfz6iWU8r6nbNbJz3AznZcfW2Ct0r8O42oaUYY',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'YOfcPqzKObydRwCfxiYFwg1RZ0LgHmJxjWfbVGlfHqg',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'G5kvTxPaNu23Qg40exld4EZDfjN5h6UgAOzaOjoE4ks',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'tCepY1DlV3PkqMDUBVnwxYMf6tsXNKxbgzYHNeCfOgc',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'bJjjbUv3dKbNz9iL_lQz0CNu09jGRlMgKA3xjU9ymkY',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'eLHk3NDxoISIA9sDTtxo-pWmSwx092B8ODafsDUAhGw',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'H79U_1T7mw8x0vI4QyLFrjaI6rmpuL7OdL4OtZdQ4jY',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'dLqteZNDqG6ciVbcnzWa1BYn5BJpD79oqvXPtN3E2XE',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'fNFUX58BiHeBhB2D4EJsu88IeAHtJhugHSP__U6Y9dk',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'dbG8lmqw-zX7FVx9ImaL_7W2YETb68K9VrXfP77UJ2c',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'FkG53NqW_qGkpEHlQgAswHgh3oXV-GzB4_p-FJ70DOM',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: '-nDXFG15F-2mzhl6bhWQJH7yNMQCx7o5_qFq-LJQlno',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'hrL2U-DklF35rmZcBJ5grOl_Tz5UF1g-CVGhoPYLZ3M',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: '2sqKabj-saTniFi-FKJBKLhTNKjDpRykV16rW_Nqp2A',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: '93qZi_Ba35x0rdfWvjt5OWrzkamvnYuqS8PIoqKuRr0',
		},
		{
			cu: 'cu20.ao-testnet.xyz',
			id: 'z99FDJgSOIJ8YcmQi8jAjTA_1CW9oe9KWN7FZQkwyRM',
		},
	],
	'cu-1-zone': [
		{
			cu: 'cu1.ao-testnet.xyz',
			id: '0EXQPMGV4I01IoLbBMIOK1acL3xfUhkfZkas-a2JfQo',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'FVv3HaRPYSyTHBvlfbnms9Ett9trAvJ2JHFHT2CErZw',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'gZOGIh9w_c0ArLGDzCHPwajBACqec8JD6dJPAACuUj0',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'oPjArAZpEHU85fsMLGkqSF_4rTnenFl1IIwhOPpNdEo',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'd9HGlWaQtgYAnpSjSzFWyGuvF8Uci8AXGj9o0t9a8iI',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: '5EnToAL4qdcU8rygLNHTWWTqWk2lm7TUHUygC3mKBCU',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'YlGqffXVLTVzmeaU8iTEEKC6MVg-zrVdQFHXRCJ7BfQ',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'joAGOzaz-NT1Z_l5h59Y9VNEeTeCO-1ggSPzf9we_rE',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: '14DhEVX8EGrG9gpIRZeCNpA_PjUxZO2M0yHATo2tVJ4',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: '95CqAgRI6k_l9ABUsg37Z6EtuRWQv_0dtGnWO222FHQ',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'AvbKKxC-CEGslJook9_YsUPIy2EwOotGSkTWggySsIg',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'IoNUPwL63s_kqoO7ZVBDCBZsXtvta8LYWwqN8C4o5i8',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'U08MT7FxW5eBN02sVHSADsdu9yUR8msvBStQe8TVlaM',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'WeQgsoRL9FWJLA-bDGI7Xd3E1F2zjNaU8EwuGNtC03M',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'EZbIK6SAGQt24ve0c9FLgSUAeHxYKISgWXu4x9mQikg',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'TQZHnnvWEqtP7V7bTAX8aYDHy8NzH8_p62zfqTyaRsU',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'VoGasGSpK8DNi3LOl2NQKjOJ6Gr3pEx9WGqKdFkBcfc',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: '9IKnPGbKH_z0wrpFmqGCs-vypbNjmqJLB4pVHuT0918',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'hicv1U1MByPrxKmf6C07wcPerX6cc_69sE7_ZoOgATQ',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'pJscPBejvNMKwEdcR6mCXJpGf2Sl8YYVvgRXUqxvlBo',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'ugRVIu_48bHuhkZJNNxzRgPyptzaY_wSCBZ9T2ryWAc',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'L7eWORMlweIPeAMbhguRO1gwzAifwpkxg78wAQRshY8',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'HPmPSNAzXebFODOMCQ-6IQo8_vuegcsjjkop3a6FqSY',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'f_S8AAOXW3crTE0luIbKXbk4D_RVOwl55aFQtFsB8S8',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'UNxSmufudiEkpJ1KsZ2kCw5ri7LxZFE4es2K7-rxtIc',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'P4qPzScsff2XyOFXoLGwZyxWhWSGIHwAPAnOJEo3fuU',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'aDaJhCaqsdV946jCg4LS4dIHktzMRS8TlbD8cD6xP88',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: '4fVi8P-xSRWxZ0EE0EpltDe8WJJvcD9QyFXMqfk-1UQ',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'SDQORnltSL6z_Jtw39iQliA91YBHTcS4t9btBqimZIo',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'b3DEOSpsnqfQX28mJKzvK2c6llGy2VQAC7BPZHISmUU',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'gJiY9XYhDkI-lrGwmRD85XDJLh2bgQDpSQ-G64GMrZ8',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'VqG9EH6QxFNHthwqK10A96GYcZs7boUZ5XB6NMojddU',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: '3v-fQKC9P6OUa6IAzDFDS2Z0v6xj-GfiwyJBOR2yAGM',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'lkJVetudwV0M1NPDoLZsG0U9VXSmnDKS3JC_KW9WPKg',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'HL44WbSs_NcoFg2K_noJQkBwrSmH9BADG_J0PtQhz1U',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'kWtfvBUPEn87Ya3bBFss4CAt40bEKIUG3QUDoJanS8o',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'lIo3LQDpLB9PmkYjf85aMku0y7UAthDj0KUe4gwcpqA',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'LHhlhAy_SV3DNvwKsxDhE0ZtdsaIguB61WaiylOyReU',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'ovgXn9Z0RlVxx7N81o95AseANjcxBS3RGRteG3gto8A',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'CUa4vE-5b6hT8O9tg29smYNshoyD1NX6L9A5VXUBpX4',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'PeykUBhnVrRtvz6WMisPz3o8ZEPXP3bgGD7IuMs3DbM',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'WXRiRuaj2rfx49xN62xsgMgtrwlpkzdgQ941WwMX78M',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'V-rcuEv_ynTBxEeYWo0yKmZNbQ6toTnsm_LqZH5ye0s',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'q6ocaxVXbZFQXQlcRTZPs_rKKyUxu7bgl88l_L8WoMA',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'STNPB-IKPGpOqeAY4bIUgqTfv4qdiXHYKe_rIZN45sY',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'XTn7V8eFXSo7P6jXyccOWUaCjJn2WegUsMc0PFefZ-M',
		},
		{
			cu: 'cu1.ao-testnet.xyz',
			id: 'BegrF7kYrmsjAQzC5QhoKx6NToTA9USjlKp6wB7sc-s',
		},
	],
	'cu-2-zone': [
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'z6ceEhDQ1iuXOApW-6UDxabv_r1yKSNVyyMiudP9cJA',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '2bo5n6ZsqaLjfEeCOGaF5pFDz0Z9fj4zBLneALTagE4',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 't4BkkGj8gMIRAoj9ya-jvPXRm5_eGZjHsuApXiMz2Xk',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'XjYyQwReSkgtzs3S_J_Ejf17NPN2bjoKo2YLlXCMHDk',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'R7wLvmN6c6eFTeQrk3L1np15ILF1nFpynyVG-w5DNJ4',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'j2oLaLRbgMKgm3GzWGVYCwr9cUiHDOE9w3ZaHed28tw',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'y-uD8pjCJP6yc5wp3PICCSO2OCVolRN56LrhbgDzUBw',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '8_HzWBu_7M82tBXI-Dtgg552hFQ3mg0d_7D2T_OG6f8',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'UK-ahpHwhJU76GVJJvHX59ohuvgVJauqHUH0hVkCWbo',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'IXsZYkvVLOs-aV54w1B9E0awkAKIgncBRUB_auw9Pl8',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '6NMDKxvIRbcAEu178rCuwxuRUwdv9aWTOnOj3sHQk2Y',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'aRrhjcGxdKAkeCwWXj8RBvkpfAhYlqdnsLBR4efsto4',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'jFbXMQhGgcDXmU24fkLpVDf3A9v5DQJQxUK5H-34kBQ',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'svmMuKLFQY1eoFiQu3HMfW6mkvBR5qX_L1CTBsRFM-U',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'l6SvXWjHV0cZp4SfQ5G3beUuuse7EIkGwDYX1Mbw2Kg',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'OmuNJpfty2L-4UwYP-yk78dniKTAafzWAE2QBcnpcCw',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '2K142t3i8ZLCB2BkgrxRhMUkyA9jfNYO4-N9-Nza7AY',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'WJ2C7VguFhUTmkDxlkYG6T-YqfQfzTEQWatQ42wB3zM',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '0F_JuI7_XGl7GLhoaVRIw_BLJmDMoC7rypPdfIy1MsU',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '9CAneR1Qz_uxtfaH26RZUV2bcHl2nFWNGsep9dXJgJQ',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '1DaD3usDYbtY4TMoXkJ0I9Hbbx_OiECeAu99VA7Kelc',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'RW99ZSU3BtB4SkTeWDJHsAX3OAfnvXl17qIaZpUSlLk',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '2R4k022SteTeuDfl8Cpee9KPuv9_CRUEfGAsp3WOKO8',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'tvb9FXoHoWzPOUjZNbNz9-f5chLXW3wh03vfYwoIHYU',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'BaJBj9re3TPBHUw-SU0SyaxByiTzkrWuLottN9QT71U',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'Yt-eZbEEeUzFjT_YYNceaZWmyzjEVVptiYAIK8zsaLs',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'mRAD367VaQJXf9DVykLSzk9OgNcVu67aVAlMIzIWP8U',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'CR5myy2hcKeljaJvk9ai2hmzCxYg7VbdxIJGB_gagwM',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'GyyYDtKu7ngRi2Ehd31-QUejHJQU8kJ_8mWeNMt_84A',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'idfFKz4gAZAVIZqBWI1gCMHBP_ZwH_ddTHpaHcharsw',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'CR3BxXsihanyF1vWnOPdmblxchjQaTANiFrtVkS93b8',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'kgLHSUhqpn_UDn1X0j7n_AgvP0ULGnYxyb5ImD-8BTg',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'ixriuP3j13gM2R_lq11EDNO_JGLrepJEhdnVmO1YgDo',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'm81W1MgS8EEf5wggKmwqxmEaE-45y1kBk9b6jUYHNXQ',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'k-I3ZKxvh0klAbHLuVAS6g6eU_aIVm8utB_zIqQu-40',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'ZgEcy11kgys5bjPqfjEMJWjG028YUQ6Af2k_hgpUysA',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'zloD3F33djI7XMQkpBXW9CipGMmPDhzieoiYg9IOpmw',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '7sJ17qB18u3hZTS_wDp7YZPOx-tc7NLbHHx9ORxoJB4',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'U0yh3jxUHXnPw4D86qO6qwPIYTgw9-aTF9OUg1oOJ8o',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'X_ugEacutqDpl9Egy05H2a7DMrEOeUkblG2PmgD4Bu4',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '6LkaFTX5pb-5BNl8qIbuAXLRCtBMkrJo4zCDLK6YHps',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '35137yI3peCEbbLU5tQlxpaolajqe9oNRId0oWgHQNU',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'R-DL7wecyZ-i9fnlZeFjyqP1zLCoycefP7fr6hzLb8k',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'SAL8RtzeUdClxUtXQyhugSGMAZbtd6EIPCINlRTbPO8',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 't3Dxq0oH5gPH38T3uQAek1269tTwMSSZgU6lBFvrNEs',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'V0FTawvciYrKniW4wgAjjJ-qjZGVO3KR1vrhvnB4b-E',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '2wN5sF25smQorJncgUdg85C3jwBzDTOH-iBxDwvfBvs',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'eyoANCGpGcPyckAf2Gr6LNqs1N8jaHpYe9ezpRGe4Aw',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '8Qjon6YymGAX_KFpbWbupx_MCnD4wb3jFB05pqvCt3U',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '3iIBp0MdwaU_nLqGOUbVTw6PhgVlL5tolHWusRcq1eU',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'KDeGQaR19_A3SnuBMy2oUlOp-_viM-mu-hgLsk1-o4M',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'UJRFa2ZYkVi7u2WeAbWNVO1SlS5zpRwGk9gkl7GvDkw',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'xhL8nnnWwpSloexPQjiLY9JY85RTNgyYV5ca_SG2ND0',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'MvI0sJAVcP7Dx0LkQ4fmNmddXp1qL7ko3ARXJaNOI-Q',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'bKCIjUaUCUjq0a0llpd5P3dbFOfNrbk2AVAg-bt4VbM',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'GpjrUpclQIScXtlcGpY-ypYEt0ROKfmlpvVP1F4YUT4',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'U9j4uqnkVfi21YojHnCZ-gbrZe0wF1gDE-my-uGti9k',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'asFBLTMqB0pKIvkeJVMGFaP7Hmm5ykT6HTRXLFniPqg',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'RqSmrJcP9hLWXB2-ig8dMxFV8Cws6vsnMa6VkFLAhEI',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'w6HQkGKz9VKszy1pT9JcqWUlElv5smxDI_Inv1OOeqc',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'q7QJTZbOI_avjaltnF-kP21kpL3qCs8sJSP6Wdl9wzM',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'jjSswgLQ3N3pfIfaBsmO-ubNauYjxXmn1xGwBVOdLdY',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: '230cSNf7AWy6VsBTftbTXW76xR5H1Ki42nT2xM2fA6M',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'rA15jWARbm6R2x5LpdV7Nh3KL-XGA2snT-i3n57nc4w',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'rHMaFJcBjUZH8gBxJQM2Nu-zQENWJ5wTPlSSXm3F7O0',
		},
		{
			cu: 'cu2.ao-testnet.xyz',
			id: 'aJfc4Nb0TPQdN_XX7DTvZo_Q2kgC0MEJpyNS0kk0imY',
		},
	],
	'cu-3-zone': [
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'txy84EiNTU4jRDjb03ATis48QbA_9sMFkvUnxdy_Qog',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'x7xcraLNUSImTy4F8G9d0mV72UPcF-ixrU1o8rW32G8',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'bB-qrs9erfxJjKbSwaSyItKP9ZmbF_CZhKSRgdgO_so',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: '-190xv-qwCD_5FxzrMwrFdRPbX8A5iZa2wwbNTZCpfc',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: '3MINxX7y0X3pbfiCdjnhz86HPtYU8iuau_ZCKo-r2o4',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'KGOTZCmse9JSkU6zokz04ArEG3a7SFF5cPIGhZoHHvI',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'wLgE163g4zZ3uEtvLtgOHBWmEWIS3sk03DV-oA6RkVc',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'gz7phoccvLmGluhxzlDCC-TtImhpSXXcRGYmqfkyt_g',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: '60_hAtTDG3dPSEAS_EMeCzu0JWPj9BUmTDrSYWC95y0',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'V0RQFq5cyfI0BDiQu8ctBHrXcr87QDytLOJc-fab7yA',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'gM-xFr7NtzVUzuBgn9hRA13ETMADvSWf-E5YmSNdgWE',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'UJ7UYDHSIiIkH3iVgCd34rvC7lbtG75DUfOTpeuMx0I',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: '_gS2iMwSosZSNevBvYPziZOyWVZZvpYSQfKa6TQZLvE',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'TnVeUUM573cZvC8Zf-MQojO--0FZnV6zuwBDpVdrgfY',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: '1OtB26WSAOlprdNM1yhLdYdjuBt1tXyRCwAzbkOsQUo',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'Wtplpf1p1N_bYoFUbAp2uYjClkDqNd5J8vycmsVn3nQ',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'lkNY6KecqORou5GoqJnXv-Z5jH6ywgm3nAFyIsxqBkM',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'WsTGqFgKSXS-qLf_dgkIMbKjxVoQXBhuF59s0jOhG5s',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'TaN6s1fKxX1uEEcijRtgsycWplhpx_a4KDLBdw_SoC0',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'kEKVKD4hTGmGGYIyJCPqa8wuwBRa8G0RVc7geazXpdw',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'XekX-kX2PTtFcQT-d4URgkaSyqoeNQM7mHnhTCo5yTI',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'GEmZHMmXpeY54GimCYQeDJqur-wAg0byjPpDewvRj78',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'qcxV81dZ48F0PJ0rwZd83UzkoNofSzJhYOJKLxoE49E',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'ah-2uQN9KqCwYIpLhVzOYiVEjjQDoAhufWal9E4h4j0',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'xOSET7fIZ2ZVaN_whRjkyIvHpCgMKnZjJC9yJ_0TDD8',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'oRRddxvr_lIq820sLXnfic56a9iC5_whyMw7dXN___E',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'hEtO2gx8lNzKmDep9HB27cwCsReUG0Eviwc8eku9zaI',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: '368hslg0VBplWjXua7-RTFw4bPB0D_tWsYpr5UwyMlE',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'IIDn8Xs6QVjxC0Ni9FxEEx5fGwyL5S6CrUfD3dAN-uU',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'VO_zN7GzBi2p5nkO5ObSsAlWhW1VxZRR8bQ6UW46YEQ',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'YE5UeZ3VRqXvLVROaA-lNehNaiYPRZz8mFsc2o9q-YU',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'hM-CAs2bc9KPspTK2xYNboVyCyE1fmFGkdrD9yLuC5o',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'fw3YOUrsCs0VGF9VhdDgwOOqEmTwgn7Z_SuHLAGfJcY',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'e0kBA3iB5AzQoyJgOwhMOnk-MbvqDptCsdplJv4Bgqc',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'yp5q9ulRyGIKyW-CdNfXfjx-H-K7k8Epg7GT2ik0bOU',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'xwWfj0OYWAPE7E0kbT9D7ZQhVoQr8Kl4Tr6m98h3kgU',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'iJwM9aDXltQfLkmyRpSgRPEZxyExJDJxc01kWQdBM9U',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: '1JFjzwrWL6yMz2ouPB444l2OacuLm73rV1QV82_Dw7Y',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'fsqqu5TBxfrIk_MqeWkVnKt3-DZEck3izmG5s72sReI',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: '77h-0p9pPgdRYpjB2uwJKFZ7f_Majnu8DCuCeP-cbZE',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'aPolR5PSmV3FnPkYbe-54hgCYGslwg1vq1fNA0YJNaw',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'vWCM287SnviZA52TDU4J9hpI7b3jYQxPuhci8O8TjMY',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'HNTtO6aq__mvZbYfSryMp-zvjiLgPFvVZWxUhyi_4pI',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'kvfvhL2WxcEp4Dz3ZzEV3ztOnSJguZiPzx-IInEl2rc',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'nZW60U162QOLXxwCAhh4tbO0KEEpwQSocjnZEN21G8U',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'aEsNaXGRDd42yBrYyA98oCao5tWkaRjj1oxMEQ-I-4U',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'tYl_Rsd90PJoxINa0r4h_xzQ69hmtqTqKe_hm8n9qzo',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'udkQ9Wum7pv4T1E2MiIgwTSIyq7JaAmrS0RFMbL2-5g',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'E6Awk_oSCXpyJjA7ZSUvnqPanZylvMMZRg6HVDyVvc8',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'VGel3C7oawxqW1n_qLUXhQ16Q9m2OOSgq7dasnG72p8',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 's6_GJHaVDekm5oL96lEXuYOd3aOCGog4n3jZPxIANpA',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 's7-oy9sATZNh2DBkZw9VMfis6ybTH16tv7Yl8RZDcAI',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: '9DuLAdxocm04GA5v50K2ljO5S9rBjf1oURa7MYD9ZwA',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'dpmiLcYGbfgPVsRehP_9DQe1xWtqmvPManteOQc7gKg',
		},
		{
			cu: 'cu3.ao-testnet.xyz',
			id: 'ZguGvEHMmXan1ZhTL-y9F0XF2M3kyIOZb7gbRpd-bV0',
		},
	],
	'cu-4-zone': [
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'QNky8_xeDA2NEaMNTGy2TZJ-LBHHijO2A_kmjIpLLnc',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'JTl9Z4Dffv378S4-LqKJUZuO5uz5xeeSTa5t9Xh-H-s',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'EkTEJ3RzMrUpw5zNUFS1PjlTVo1u0_ERRBA2Dpr8RoA',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: '5u7G1QjAXx_ssWcFDvwdwdB3pT7OgWRlyoZ6mGDTWnY',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'p9X_n6pQq_I1az1EJbjjF6esa0QnuZVlh_u4mRR2-qw',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'lL-PvtZH1SdkeJbFyUAHfkYYHZo5gmKXEWhGUqmHe_4',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'XhpllUcMyjUcm-RAgZgULdTWJQw4dBfrj-Z45JDP4zU',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'T6jIOFSlWkYDds4SzyoD4YbDcI3NqTIA5CHwquDlbws',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'vlyuaVkD9KQlKwqHJ5wYj2OcPq0jyOcTPKjn-06fPM8',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: '9CoDAlX9qJCFMR5tukhGp_9aAjbHDAjfsZLCzG6ARXo',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'BOKRi5tT-lKXBn4kAd5MV8ND3vJbs6kqq8OnQrOFn7o',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'NplGZ2Mew6blQ1BmmB8WoWam6xFbtVpOWPieSP2VwYg',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'ujY5TH2zwuartHa0eNlZE6LZTXHNL9CtwmVjxDfq6L8',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'hZQ1ncMKwAVh-Gx2Wvqeo6b1NHH6HGdfNH-Pjr2eqcI',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'U3KBhdsKh8jUfcEgfxjbiHo9Qxu-vbLImoPaXIoo3zk',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'fG05vGOy3ocMixMjYvJtfd9jLSHD9BvovNiXs4wdTAs',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'zff2VCnSVn6clRMRDy4KjmyNLTIcFkHKkmQdDkbXEEU',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'Hw26u2IAmBLbCCmfe6UTYC4gQjb9zpWAh-7Cn3fwxr0',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'kiBTYw21tGxW60g3lGqKirI_d2JhTtXf4ExuLiVH2tc',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'uH9icGY0Ohzp6v8C4sd4O3MTBTo78zDJWjAVsJgkzDg',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: '5IohkbY_bFad6nO8SOMytu6VfaQ_wBnaW8KRwUJqn-Y',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'V-otXQTcHELqbDY7D3OEwWywJBLDGJ47VQ_8ouJJCUo',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: '13LH-YYiupWy7rzVJ-kySs5iqgsSCBLnYQVzPmSUrTw',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: '3ZN5im7LNLjr8cMTXO2buhTPOfw6zz00CZqNyMWeJvs',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'QqqLDeWtIkoLQ8hyBmA-X1Le1Lp1IAE79H6hMJqTAtw',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'uLX__QV-bUwO7BgTNjqJSQ7feLLeLBo28irreqwVz4U',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'Em7UY0RSbgZSLhumQlNlPZo0LZZLYyyXQCYZVyQpOVA',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: '6b9tl2oPJyX8jIBlQZb5sIaaAGya_4r89eMdb-slFqU',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'FYNEMnhDijih5Ozpumt_Ys0g4J7izNssjTFdDm5F-gI',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'MdCZCs8_H-pg04uQWID1AR4lu0XZyKlU0TPMNM_da4k',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'JaJpI5wESFSkAElBN1gq0DI8qmnZEdt-4Mrf0eUbZJs',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'PSswRXt7Hjd3T1LrEcoSRAGR2QwoZCWW74ADRkDTac0',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'CTwux-MLI8fAlwlECr1fF3Ja37q352bvKF4JoEe9xpw',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'XAqyzdLBGq7IaCP97YF6cNz2CGOkRwT19FzNZm7bf-8',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'ELrUvs_PgqcJUZX5Q717qZv0NlUuYcrTZipmeFy7-iM',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'K8RCTM3D7T1MxDH9d6O5v3N7W1D0JYPx6wEPjuKAySs',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'PPl7GW9-L5uY1MHQIdPVSf7Q8dE-wp9ZdBFxaJvQA9s',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'wGHiBulZfNgTqb0V4yE5A1CmC7QjRvlrbp4k9_FkvgA',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'dp7STxe2tN536bYCPmwsdHRFSCXfQRPCP6RFnTjqt2U',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'VYRA397iBhuYGNeeNZ9fdQIm1A46kXgOG33_hKPo9Qo',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'zeYr9jMGZJjzuJa70PsxZfsvchJux4tPrBtE2Z6PcL8',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'ABShFKYq1KfhY9u-hU6Mp318L3xbCkKJ923YZNU0H3w',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'Ydxz0BxM225S2JdU7LtXCDTSmnhmoyuvLSu8b_SR5bY',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: '8RFFmgKVqr9CqWDETJZu1ENbdbMQQpg7lilAjZvqZEQ',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'O-dOB9uSU-R1HuNhDxIBYqUuPT9bcofgq-4GiV6V65c',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'S0VPznl3OlmVoES-uGGl3U31wfM2444HYNj03Za1uIY',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'gzlhoesYb6mCr8-4xX47a86kTEMqtsExJAKvbUNw_IM',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'c3mUVbBxEeeF1fiEaAjErNdgBsD48SbdGuFSi8cgDI0',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'KmgXLODfiyS16ziNj89m_1GDzPAZPVRIyyk_Wuxc7kQ',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'Ufxh8m3xHH8ZG-OBHKk7pIEmL6KFqZFBcGsFCFNrfFc',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'DiXh9gOWwkKoLcD4jvROKQ7B2mJLFUmgE6ho7xKq_Ws',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'dyTCJN7IZZraUn8U36vo2Z3SWhmp-vSwCnnL6eSBuUM',
		},
		{
			cu: 'cu4.ao-testnet.xyz',
			id: 'zAl40EX4XiTjKG0gBpGlH0liN560zda0I6BIz-rzHP0',
		},
	],
	'cu-5-zone': [
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'DZI8HsJyPMEgfRY3KjzGX7FdBcLwYsZHvH5jmn8uOk8',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'laPKMzqPApLGou2qKAu-J92DtIYc3jjWHaoAHoGe1nY',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'QIQjZ66rzGlRrMdOjrlzhmAviuy0Lw_cmDT7TPtx2mA',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'vPrWSJXnjTKFRyRmOIFOmN6aCaUf8TCSAtNiLtclSN0',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'wKTr1G441_HwwrBVUeXeKINzF5NfjO6VM_gCE2JzVrs',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'DxgwovxMmZA4q5LDeZqZ0YtMX5isVLhGMMsWIq4jXSM',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'z2Ax50vTl878N2ThJr_9nFd7PdpKJ9vf5Tu6j2n3X0Q',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '0KE604Pg4T_WeuVCFTdCT7y3WOx3wi_qjaskstK0P74',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '_t8aQw8et79SBNNI7I1pUMWBPKr31Zu9Fec9cq8Ncz0',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'zKTley8fr4YWOGAIOkQznDL5KzV2Y7lA3_-wTpsY-DE',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'k2c96fCk3pOTKSouwpUfTLqE2P6zp_Xx_IBv24voIkE',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '5IZgjBhEj0K2kNXHMi_HrjpzA0f6JtUdc-SGoTScUrw',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'jmflIyI5V-iHud-WQ8Qse0_31UhcH1rc1BD2mFUUSKo',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'UMAG_rP0lIgktGlbA7pc8Q4n8sAT-dgg3-JkI9mZiTY',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '01WJ6NP0JFRHXkm4DPaKj6PQsEwgWGyM6f1UmCbcV_Y',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'GyWDlNGOlvVceeW7Wban0WmOQyWR-zWvv1wIkmccv-0',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'NvWR6b60Qibc5puneT4--LXUf4b-GeBS-qCWUm3N1o4',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'WKATZ4KzKMuiZc0ZwNriDAF8OTDYUoGasOu09l4HT8g',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'D6u7AnnPS3ZG7Ul3xNqVXjPacdjKRJJ4r7sYyOQaOLI',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '-1hCdbKLM2vqM4Y8wPzJk32um6_3UWATHAS3tYMvhJs',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '2GKK024lyYUqo3vqZ2hk_eyrlsHoMG8YkpbT8IYuilw',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'nNB_T5AumREZW-cWoerMGRO4aefy11m_fQIrtC40y6M',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '-vCeRpCPw_pTn-jtcldTCEP22K_LxorhlAydIuFiEGk',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '6qrLqNfvTLnkElZCO3jr5SitBwoiyd96s3EsGKC9E88',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'RA8RcUNke_7bFvZCiI6m5ubq0AIsXEXj-Qav-tpdlp4',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'lukKwK7jHOa0lCER6yug-9Dv1uzjVN-m0tDHL7dJXSk',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '--DsDCHbFbroiHegG6HQo3d4giIaUDxaDjswXRhr36o',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'Y9ga5NqpStb6i5XhByondY7TlNrkJqOu-lxKVEDc6cU',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'H9sb9UWnWwAUPn0DMtflQY52cPkeeKSVrXcLKTmi9Z8',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'UUKAinx9ZzKQmcI37MLHUxJrMRa7Xr_27np2eeDjcAw',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '1hrBX7alsiikvqSd0IDoSvQpnPjGAlLZHuN2kL9-NgE',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'DMt8yj6FCNNfXEoqn-AdylVM-QA_SLprlHE8DPO7WAw',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '-FN7mSrXU7t4TOMjxaJUnuCOfmWI5QPGdJU_e6Eulo4',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'ogDRJlqJHUYIO4cSIFUtREae1t4mfaCABJFxaJv7Q4I',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'A60Ervw8JUGNdelNvk9EBbPmh1wNRiWMfqiVVjwuwGY',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '3LwCZ8h5sHtugRnhcRaLfHLe2VihHVkIQkV_c5PVF7E',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'ECxQQRrL94CpgqiwP0Z2tEtRcPagwfYrhoAgCZ8Z-38',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'vi6Yf0h9RiBLLhQdXaX3PGDGwU0yxi4UI6AMj-eowh0',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'MzJmIq_QLNMofUKhUDAmUJGdu_KGE9XPRjBiQHOjAZo',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'PbUH4IrU7JBWOrgDNm1QIxwfs56mWoUfqEBHoBuNHb8',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'QcEZpb0cW7nxbWQF7DS_n6KLB8dlGY_GjLRAHaJC8HM',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'Y9VZglLKm6I7hgubb3Iv4K9lQJbwpdxXOi95UYU42pY',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'zHvsqAFqdi9Hdbde_oomEEVumLesBJUsFC2M-kAG20k',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'zXmKG-RxiQPNtbt61DNJ7m5YWMKTRECI3TvuiCNt3K8',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '4wJeJFl-OnZ2-Zz1jn8a7XdeJvYkc5qckbmBKrYS9o0',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'AKeq50khe8ISIkgZjSAs9zjTIqCxt2hNLuuCoWj8Cp0',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'Tp_SzdeRBsaAzhHfLo1MsHjA13RlNtIJ3IhA0GKcCvg',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '1ekfGC4DzbTHa76md9I4WNYtXvfG3ENenfW84199Jto',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'MbszmD9pSJ6zJR8xG2FmIKsnXsWN0eqGz6cHZTjjYYE',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'ZNhT3Ud2eMvzez0rli8blY7YiyzY9o5W6G6r7Xz-CVQ',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'aJyjcPBfzY0BPjkZMDlCThb76z5BufJlyiOGO47btsU',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'ycD5foc9qLaVx0H14tCb_ustqfa1KuTDkN0e4UJNflY',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: 'ScO_wvsw48Sf_wpJR2stxeM_z965WWkudswZjL-h6dM',
		},
		{
			cu: 'cu5.ao-testnet.xyz',
			id: '1lPOdSh_JmUOkes-nFiYPG_G5PP6AABft5O_moTiFCU',
		},
	],
	'cu-6-zone': [
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'b9H8s3zO4azfzMpxxSVuMsS2B2nLOp8u41u9nvVPFbU',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'AqZ7nAQY-DLJN9WgR2ukF-sPxhOBrAj9hdLF3MeaoX4',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'GffugudOw6-X6cGJMAx3Em6O_VwCibAzeiSjYBBtJdY',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'AbFxP-t8P9Q0x2FquYj8PXaXQyHATnVpp6JyMa3_0ak',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: '62Gv3vXccfJzKisJy91sAQNdqMfJhJhP1pAXb-uKsEU',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'dgpg-SOJDjP-Sr-GQ4Sm_TbIub73MBiUZIJ238tD9ts',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'pKOtO7njRtyfcPOL6UTvTqUH237XerXGo3sCpo98U1o',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'k9MkAs2OYsE3jgNNwqCO--ZGsi4mnVRI8eUaClyQYQ0',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: '-kP2C4RfrXaXYBXzV0YE4Zj-gHa9vInu2U6Kchq2cMk',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'TYUudhNy9A-I2pFssSw9vWIVGYVaQvwI90NVzFljF0E',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'xo4cpujjgZtyBeh0aXeieVOTbxx1LaSOFBb5Ms3Ez6c',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'XfBEuBTp5jAdLDeCAfIPAtQL1Gp4_TRLpBziXTe7ORk',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'lq99NbUPq6_47SM2iKBXFjFljK2wF0wdS1UjtdzasyI',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'Ej5LHzBWs_bD6AZylDmqpIMmMp8YvMfh9HaKZ56wSBg',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'EtvgGE6zVyjPKXPBJtOyzVwR8Lb-g-DOWcCvdaQIwB8',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'bdeqMR5HB9SUnm0DyVsUAX1e5Ui5D641QKHReNxdNw8',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'fcnjtZSTNuKey5ueAfb1Zu_oxxxHaTylT310wuxHT3U',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'XJYGT9ZrVdzQ5d7FzptIsKrJtEF4jWPbgC91bXuBAwU',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'ScVYtvBoYZA2b_PYRyXMbNEk7SXyAtXriw3CjPjBpYk',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'vp0kpHynf4TlqDCZxyQwzS7P64BPlZrZq40_l4CEaXY',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'cc4-t5WlVM8B4luwxDfAE-BMQyJi_bINr6baqFkD0Og',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'LgMHm0ZGKfooxknab0pEuT56ZP_gvFBApk-ycR4xMx0',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'U3TKE_4as9eeN6ilf18obupMIzBG8X3jrVFPIOHkAVI',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'JN0OxdLHSIxvYWduK_nTiN4qP8bhMbCRoAqhQvWqC1k',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'lxAevppgsgIW19LmYkGSUqHi-8jPeqralPsrU0RWQQY',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'Xq0sIQ0DTiigxDSIP9eSWVZLrcOIGwG_aCv2969Lo0g',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'KfCTcwfRnw1rnhg7c07f_HyirRoVkJHrDyy4Pzdtat4',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'qvcJJLakDUs9dlH_YDQblLq9-0HXRk3KDfuC2IvqxGM',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'EGpllPJjewx8OwCynKeK8jvxju8QVXD7tE65mt2jVtE',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'Kw3kuvN4DE4h4fyc4O04PzSqX7L-surgKu_YzOW8P3A',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: '4jqsE6nlydPlrjPLLtJwrDofcrU9CZmfXt0v8jwXFtU',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'Bf-Q0hasfgWCGowxMUrivCfB1dXPC9I8b6scdZf32b8',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'lp-ihMlyEo5NSoW5Rkd7kU1PoTqCIYAGfDrn2G4ihiI',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: '2mMtle893UN50fGu531USXyNtAhrZZ3xQxS2q7ojsCs',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'gP7PdVRqpDYFqGsb_PiFZq-Hx9BIYGVbkY0AydDVHqU',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: '_8MWnUeL67V-TYvh4j4N_thzZC4jTztF-2sltkjLkXo',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'MaGdCx5Zo3BjiiaVjAzfGZolcko5m61k4qL2C2T1oJo',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'jFZJ9ciAk_3pxYxVT52X8vA9Xw-CX-7XcHmWiL65h3E',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'A6l3mIOX98_J7yiEhPEGDHL0FK4FMs3Fl8pw8FX5hLs',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'iibcR73wK7Z1qAQo7q8RoVNSUVV-gkcy8c5RfjObAHs',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'udXcouYWupGGQczpaX1I-NcsNWyDN79iDYqZuvFjnyc',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'aDeXXVoY5bYWk2k5SFK9bSIxDFw1M9d2ac2vRZEnW7s',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'oPCaHsALfP4lHMnadekm_fNNYB9Y2B22Yfpu05uYeOw',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: '2ctpYqnu_P2FwdGejdAXKEZsBLJ9FfnNJW_qgOAiWtQ',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'fYk3I3f4Cyq1qIWe3MZwX6_vdedV_WBNsXpmQuTbKk0',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'O6U-5VAsgcrYzWy1f8MjSJawm7PlKdawydaeXB6XEC8',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'F_4oTYsax_D3Rdrp0X3LznwGRT-EDWDp4YoeZS_TwKY',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: '5JM__uNfHAoSFOuvFpK9UfN6dle4kPPfalTP0iXH1h8',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'NurR7zUEAaLbGp0u_hhceGBYJZ4sHGoa0f5N9cqo93I',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'fzqa0pjupz6yUDgVFVsBLStWYRFQhoBK5Wt2Fy-oSRg',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: '1mJUmf3aRUQL2csl-SWSy-b6k73kNaqV9fur2tyta2s',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 't_4ZLjhb5Ltxvp7ufwrHZ3YUqRUMuh2IsDdNZmjNufs',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'OWEciBioYRuQtzb_ZNbFSbqnEnQKWDTxEiRtNCxaTO4',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'e7qfrh7J2dP64Y1fzgsSAMGhK_zjJVSm5nZelMXPqxU',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'Z1FqBorb7wM9oJF4PuYr-Msqw8vLyBo9UR6-_O-kfXQ',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'wOrb8b_V8QixWyXZub48Ki5B6OIDyf_p1ngoonsaRpQ',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'K21-jkoWRr8YvYJ2jtwZ4yLnzQxUybC7rEHgkJ7PXLU',
		},
		{
			cu: 'cu6.ao-testnet.xyz',
			id: 'K51Fsig9HoECbRZjXiXd1BJAET9yhHDUWOP4cxVFjjs',
		},
	],
	'cu-7-zone': [
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '4AYdukXMgjLBFZwD6Z4TgKOr2q3SKeBpU5U_fn5MjhQ',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'dytc4hXqS29S5iGS4QVYzdGE8gY7baOj1-x_HIAxHRY',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'sUcBq2S4sFPZJ2W-BCNDSnRz5y9w9JSneSXIHBxektg',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'fjSUdiliZiKk3GC3_MwV88meX9IHa4KmgtelyX_CRdQ',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'lSCdbjWPlS9zlPkqO0WoSUALiiZfebBrlmV8cXAt-hQ',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'MUJEuoM6XkIKNUY0zwUh-YIuIfnnNBC7Sp26Cm_Jdm4',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '2wGJjxm7z4dGU21kxJM_tZWJMivRBP3EDm82gIkPtxI',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'Cxp4avbrwrtFwvNq25eMd-dqqaXe3369RtgM-raAkw0',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'i1H3z8XqkmAjK66Kc7PkS8cuLmnUqxF34Qb4cvc4jIY',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'YmJuC84mzmAZiVChhDRxjPP-BAOp4ovE65pvNszppL8',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'kAiR3_Ha-pK89I0rCxbWKNb2Ad8VQqwbi__Qwy0FGs0',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'CYOkCHzzkwmFsuxvpsSRupQGXjPRbWOrnYvBn1J2nis',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'BYtdLa7dRPlt1vER58rIQfWVgSpKm7IOpDiaMk8Uidg',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '5_-vDWRAyKaXo6tF6Zld6xW4TSkZUBhqK-TIS28sIu8',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'ol9_vfxQjTasVN4dWrPxeDwRe7Uc75ffuh1FcPdF1c0',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'Zwb2Pp9CZxk1rPLNlwnsCotztGJ3jms1vhrvB4Snf0o',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'GNxBRsrzmy7jc5mbV__5d0jXL3_50SA2e5cEjyO97Zc',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'Uv_vu1gNsdIwKzMpdOeeyMZZQo9oRlfA7W_3abFw20U',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'gWEel05y4UE6LxnI60jO-75Q3dwZrD5dXJCaAzQhPi8',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'kRi973TXQnuxZWMjVgdmDMighkIwmHDCguggBin0ul8',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'sJG9XdyTPfEdhZstWcBT6fLUPYg-tvESw22vY4Yydlk',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'WPSFqnI5y2-T5FoIN_X7v1SRuatTB3QIL2P_K8Lvvoc',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'PePCbmZXlv97Hc4qAhD4L69sh5mDhX6zvxJZEjtQx9Q',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'THhTZRuuS3gji0D3UFhSu2gdYzZluvN0lnvGayIsjBQ',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '6FjmxIdcZ_ggpxtgnQy_d7iUfc0O_umy4B0fRVg9q6w',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'dTEbG58croMVIOkKG5QimZ9Y5A77UnbxXmcBPZkey1M',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'Isf77-igkxiCDxAGVrqe87t9AuJPTYSNWtxhsPsr9Ac',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'B9eb5Hmag6vVoA5Kh8yGbXU95w0BbRem3Y8TGkg0SX4',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'EYQXCLsJG96_qF1NeFK4sehLW0AN-p3Cjrb0ZKGC6Xo',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'o2AyFYwv0HPHHOvmbbp7z8GhxQUpUcav_fZOa4fjXWs',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'r6_rh7CjO_zj-Bv3_OTBi6SqKyQH-4qicrKlUg5MiCc',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '7fpFZ5iDXHOpXWN87qVefUQlH4V4T8GamyGHErk5RFU',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '7peLElVlUmudPYWl6eL5Jt4i9DcRRxXzsz_wPQhDHhQ',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'z_NFixPen3KRaSUK1aO8C5A1IgDWb-mauAP4C7k15bY',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 't-RHrGVdjrUotQctSZzWz1MilNRpFDWk02XSQxSzrNU',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'YuGI_uwByJjyNZQ151AF00voByQCtOcWcQeC0VfXMws',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'iaDEcACos7_VtzDecRlhRzjOldsoqT_Xni7eppfbU7I',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'JS4YZADkJ4KaA9KdqCxqjRofKDHI4FZSlFVR7okj6qw',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'lFD1QoBqm9H04aYpTk0pSa76GJpnjPz6dZwQlOEqKns',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '8F4s7PxITicIMEnjeFMWzFn3389-F5vfYUXzevgik3Q',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'wscxUzAH4IjDMJQZvywX-phO9vkS3IaHJp_IWf0DBZE',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'OYrRJsiID1QO2iEIX2eeP4CfnRravL8G5rU9bw4JxsQ',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'XC5HUAqRb83hCkNznaMJw26fBCwCRyRIFTjRDlYt_7E',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'c6dr_K9pMl9bLW7LbEBROCQgkxaHM_0_yNDRomPlxzc',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '7UjyAI78cjazocBqsN3KUsNPp1K9tytekJ5dKZm0Rwc',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'rKpOUxssKxgfXQOpaCq22npHno6oRw66L3kZeoo_Ndk',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '8vne5TVM92uuN-buUnlvXPiMbAmggWBAmd6zfWCFwsc',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'Dgs1OEsExsPRVcbe_3buCGf0suVKUFwMJFddqMhywbY',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'pgsmzsqweM2s69TXziUbW9gQv0drAyiV-OXXDntT-nU',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '1HU0gPdeMeoXEvXGDBXd6N4n8maHTHJZ14_cudHBZhk',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '_uquTQ0HhXHmPFG8CJWNgYRAZ_N71BxXvyyGGwWd9ds',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'bsC6CNeAKTqllbDW1gL3P2u7ooOvSsTyHmlwq7Oc7y0',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'RQZBPcI-EUVb9rdcbiIN0eggYSJNLgdFuD7G_GztreQ',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'jLwm8R9nyPiCaav5CMSN5EAV1sUu5HeUvmb_t7sSt6M',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'mjxZameocvwWRqtJ-CO4o5fDRkUZm3KSHGhb2fVzhDc',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'jMCuco77RUgRoOHB1HcKIgF130T7hPJt9MnY3ZIQ-EE',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '20wiq-rbvabrP7yG8thf7r2Dq4M1X399FRx9X2TYi8A',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '7j19J759NZ6l6ytcN_b7aMb65O1Mdk7AtXK6_1-1OrU',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'qYPpOJHvmeyyLMHithsC6dgCjBMm5wIWhfhxSKRXWiw',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'RtMptHRdeMcziBI7xparr3ocQQqxR8ks1M6qRSKUfXA',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '1mA-V-MwTu0p40-ZwGOg-YQQu8zIB30QV69X1Fa-0Zk',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'T5XBqdXJB781aBBKMXVJQO7KRFvuRz0fEXAm1Ph3VyU',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'E0M6HCIe7_3_VXblaM-Vq2kJrG-Fr25vNIhtvYvwUjc',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'evHbbycqB9e9alSDqsbaUdIhNCcvGpk1sJTb2X05gmI',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: '1YzhfT1gcAawy1iVoff0kaqPTrQJSslPtB5GFqD-Kcc',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'SLKKYq0TqwoHu3G34QGDu9VP0-r1lT2M_1W5ulEd350',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 's03mZD5PPbXqYEjTubluLjfdL0i62p5INILDjD0Qczs',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'uO_kvVf0Y5oNnMDddTlQd-8YDUgLn8alWiBsF2n17no',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'sQFf0EhFvAZqK65WG569t4ccQgVPKbqQlLrX4MZW1Oo',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'q-DkPF3HqMXCntgQDYnmHuf_qIlmxJpWhS1pAxl3PvY',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'Tg5P-zK4ccsjRIUIqsCQWlt_jwu9v-2U8BgvGZU6eFM',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'uuHnGf58AElv4hcGowwg9vz-GksX2faHny5YGQHs0uQ',
		},
		{
			cu: 'cu7.ao-testnet.xyz',
			id: 'Y3EAOItnmRv5AseLJvoQNbU1jua-YFbM7O1UNco6IWs',
		},
	],
	'cu-8-zone': [
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'H0goJ3H3jytatmZ9CoL1xEj36EGvYf4cGDV3bMBnh1U',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'iL1v-v-xjMLKtwm-fKg1R_eC4P24P608RKrNzYDavBM',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'S4INYzWewMTTnElA-0JTTcoOHQJr1b63j6qlPE2oe68',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'mD67Oad1-eNQbCR7isoTlvPl5igDUncptT3uCSNYem4',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'S1HXmVb8T_Z5dEZheVKXqyR5v8PUJXhMw7ryr7c2IF0',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: '3aGnBA6GtgevYYMFiJDB_zO7XhCfvGlGrXgffjpFHGM',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'TeJeNwVKwxb9JK5sRGNfGCMifNmDaogBwAnKbE6luhM',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'fFgJMyZeLUeAoINeddmChJdEJpWib9EZ-6nCceAIrdo',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: '1jdhi6SJkaY_Sb5u3btnNU8VVMb6XHMlkt4OZ4etvBM',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: '_jr5a1e3bLwkiUB4EqLRQ47APnTBir6ePpMGRz2BRwY',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'Glfo_KcR8wDXn25bPjhGS8SbISPtDrf8Jn_S1zINPhA',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'S-_NagwPbqLRrCHhvfmcb4pG1z8MRJVSR0O8TrCO6K8',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'hdkQXqgRJptcF3UbS1iQGaeLxwl_sTWfuD26iuiBXiA',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: '8jX9HrVD1n27xnngmRV7M-s9Wtsoa8F8WxLwwvZk6T4',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'inuFN8-wvkGH737y-Sd_9u05E8DGmd1K3Zux5nZf0Lo',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'UCmAvIxSDmVyunn3L1Ad_SHYelBiQOmz-tV6xxshaoM',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'B8j-STgQO9PrjxsW3k9olF5MFz53P8Fdha3e-METHFY',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'vDm4QBroYFYS1HpovdYGqmN0rHzYs6riwRF9_6X0ERU',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'O_rJbseXHSAav7mrXtoRhPi2yNjexcHjTNFX8IfeZsg',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'HjqdLi2nOMw137Y9-xalOkT5mRhDtnFf0KeW7pCf79I',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: '8qglXYqfkeuDXRezOxHV9VV2c8DUuGYc02P9QRWLjHo',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'yTVb0i8kdIC6j-K8_jO4ZbSVCx95ttyowUP-fjoybn4',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'EBHtdeTCDFhj1cUSui9liXXSQkQ_DhfU2nS7mvYZzOU',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'r5XBjaxvRP2wJZZ859nxcdEwce4r7srtQ7mRR5I99E8',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'W0d3mwoUo_5x5Oyj4jyptdFy53_TrymI1QEe6RzQv1g',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'wGOczOpM9xdjW34pp9_U8VdHdiwAxJZIEhGjSCW75r8',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'rZgZIdBd5WpV-GB-Rxz4JNfvh6s2oe5rNT-OgwPOnVA',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'EvQJIBKjBDxWHmcFn-ZuGqp090ZrowCyeYynVq_vZdw',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'fRO3xwuW33u1aNSEaIXwGc6q9G0ORCRukajbVWI-_Ow',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'UIHIxi0muup1Uhj8HqZQDPeek5o3ElqkT-sClwb0CL8',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'ysDqGiAh3N2OGE8ycxzkAqDUX2GXu7noviGkAxjij1k',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'ebdZzXXfs58lNxAulGzyl-ehMjilNmzhFvCi5XE2Wgo',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: '_8oBz3RO8ergStCeRZQfX3YHUAMCjda6n9l2uh0QQBw',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'S0bIN0JGyELl9XgdWeJ55XZ_oOYoyL0rgDBbNjLZ8mM',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'wiIUw2M0rmfazuUDyP89NJqdBZwGiNogn6LgyZeoCPE',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'GpHpwtRYyoCfZ7MUf-r0wQacRda1Hv6NQVlDEKUzLdw',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'eGQm_Kn5RgZDm92lpvrMP9Qzum8qvkZ1_C6auwOHwRU',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'Ikab5ULzvNGLfUZ6kJue3RYMpSZQLK7kl0aO-1qg49M',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'C5ToJJA7EyLX8RwDT4G76kIffJzRR30iZV0sCp8XI_c',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'Dz-N7nFvVDhVhhPb8nJfrcyomobKlv0hrUwnEZeTDNE',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'JI4LvXBg9f9YIhdSnzFSzS_IhFwuO-oJK_t-c-DtzRU',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'Al7IoIm_YqO73c3zNioN1qnlVVJjRYsljjcjcqqwu4E',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'Db4U8bF5q0P21xceYKjepGFkJWUrhi93j0hUMYIeIHY',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'Go0i9LGZ2i8ayS--OdkPUH5xEvG--NP_dX4WhFha0Dk',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'MEjYNIerIBbkA1HPn_sp7LY_RitocNr3eTlZG0EkQEM',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'YMulg4RN5VHVL855Mg5cKJ0gyRQ7Mnb_fZYsrgs3Ak0',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'PKqHa6Ar4reXrfVU785aahoNx2N_n-bIqI2tCSgfmgk',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'r1VIAdmfMxEP0CmdgFlHVpXLKICblghBPcb2OS5-Ly4',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'fev8nSrdplynxom78XaQ65jSo7-88RxVVVPwHG8ffZk',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'etFnipbtPTkkRNYaVhaSS1LlhZSt8FBJLM21K5cc5E0',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: '4bJ5v06xOvwM7t7A3viNED0VNg-MbNqsjWqhiE1Zs3A',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: '5K_5MDSdyuTObxRGzaEPhdtXm6E6_-7AbYXvVexYDYY',
		},
		{
			cu: 'cu8.ao-testnet.xyz',
			id: 'bujOQQppNNWNXoX9uKqMnOEWyOWdvu9ZHwWy9eEleM8',
		},
	],
	'cu-9-zone': [
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'j5DtgYCA-YRBnDtDfuPfgmYAUCNSerO39bwaL1Y4u1w',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'rG7c0ubUu4cKddO2BwMMCmeMHBQXrO9l_VR3coyx7BY',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '67lpzt7DdzyUK0MLfBz4HtOQpXtqbzsWm6ZUko78kXg',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'corOyU3Lttx8Yo6FdF_HlygUApEbsZbm4mzdDqjfyYY',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'hZ4PDjukx5FilrPqiQkSLwofAAiuJqAKyVioHmLnwaI',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'TcMXtyQa8773E_8Ss0J6hdDu4xxEql2K4Rv7jBEqmKE',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '13IwjugWbpkrYEApvOGUdmO00AAtnwav2b_B_F2iXxo',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '0EV-WmR7178HPGii80fDvfEu3_BDQuukMzvwqI4FmKE',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'HVizAx-rLEuWPxChkF7PpW6cxE-CyjKQsD3pxTLCzpI',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '1oN8xxQ1o1MQXGIkZiPqB4JdyoOr6DKmhod5vw7kmrA',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'aPPmZr2XbSKBSRhDDg5xWKsLB4rGEKw_wlH-kKGur5I',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'c-SWzchQWtN40iS2YePYPB_xGEjDSmxNPqz721Z1Zow',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'd2aJJ1m2oOqyVHUjhry4P0SDJQxpgtZwuEI-mSYNmC0',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'rPdOyQsNvKHHC6gZKB4aYXTZIPcD5bASJE1LPJfOEPw',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '65Kv0Lbm-JShifiivxIOMcBd85e-AKr9Xx7bQTURc4c',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '_57RwLXc5w8xAfSGvAZHW8rOxEi5ZwtojH6CvjDXI44',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '65k5x1AGFe_hdgHRqnzVZOnCLvHRsc6UTS2bdLeoEbY',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'AJvHk4ff-33Z_gp_RCk6symOvMucmq_36-62DrsTwTY',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'NtqBcwRC_zw_4GxXMOFD0jIBLUb9ro2W3SvOT2Pchl0',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '7CQNVyTvY3i-fuIB7BgJ-G7KLn16UpsgKQaKmLQMeNY',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'hDAc7QuLDL1sLB2sfKtWSF1K5__AZQ5Fu3aKPd8xiic',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'nWFuxUyU8A8MXxI-8YMjVA045NoLja82vdEgQAnPAQo',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'UOCE1J12YcizzX7HpyXTnF_9ZCawvGz9tC0JuABtVTQ',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'mC6x0tFFC6SObSwVWmGaIG4fyuJ-9_0tQ8AgtsltzhY',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'uhZSFRv8UnzND9FfMPVBtLOMNj_UCLrpYzcIBFpbO64',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'KwN-pImOjCjuZQ0exwcPBw9DyjR1H7HrEpn2IZOTPD4',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '87OqQaiyhnCWPyM-JbdlFTJ2mHPQUl9zpoWQ6JQ5_GE',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'T7aT46D3NTPPBxAGIGc0Izxds-Y4mrySgxxr5EmRfl0',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'vjvkX13D4Xsy9joFG3HN9_s7l8IKmVW0uRUoV43ExmQ',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'wzW7z8yUSGq0oO0fqfpves0jUUFqDSJNgpXjIdglcQc',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'ECSk4ROWivilSHR_Unis8lkC6jWFcQEXoGO5bj2f9W4',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'z49_G6wG4MCevQ055lJI5Z4IeIXW1Nny5hAP7910mdM',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '4CBxrheC9MibExtMJ39Tvw-fu0Gqr1H9-pPDpM5EMz4',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'gr726Tk9Hly-jQBdOi-qTgW-SGmiDM1Sg2ZMfeFmH7w',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'SfqRuWjcXCTiztj4c7TXWKRLfsZmHS80LewvgCD0Nzc',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'elWV-pWn7Y5v0ujnXHfOZlLi1Go4UPjnDiQsxyUNgwM',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'NsMvfk1ENODt3ckhXp2-n3VEidI6TSWpQKNjYlSWv-8',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'Xhiv622lKIoiBSBEP-eQ1HUp1RhM42BhtZ-TYu1lOuw',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'WHaF0b0VC900yuriKRQEPlzoMsZZw-pLGTBTAG8MWSI',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'aCDH5Ga4Kf1y42SG8xghmxW-d8FxLy7j8gctZOlq9Xc',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '6-pwODSejGkrA22e911qDspcR1ZXRfAcSKpP0Tk0Hto',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'keICAtzEFk6oYHJ8pb285Tpa85hQagJmECoX9m3BMNY',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'V8u200PbzwLTz21BoAkt2w7uPlV0-KcQyDnuJ0E3FEk',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'Qs-QkcdIl-9w6xbG-Xg0knw2tVZYTyyo9bpvlZbjHIg',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: '_OqHUWngW_MayVrkGmC4rsd1-SjMCvt9f9yzRFUnzGw',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'QBjp13GI4llsA2zqZ5P21Iu4te-uBEHOqXxBQB_Yyc4',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'gXURuEimmuqIg30fOZX1zplF4M5bGxhVg2DH-pI7hMI',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'mh1dGv_X81_HLWiI2TKdNHZaFj3DiF-0mp3ALyRdRKw',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'ykbJDsU1dhwo13PoENYjAa9mQjySZ3_SK8QxQ9ZPGag',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'yH_9UVKrrhbiKtZzI2fjJKkP4LKGTO-gg_llurpFCo8',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'yrvYQSeuo99gQY6QScPexiitFkjmgBJ_RI8c-CTtgQc',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'KAcIhSQh-29nZATST2tyBcbEctPDfrFHTALklYNmXpE',
		},
		{
			cu: 'cu9.ao-testnet.xyz',
			id: 'lqD-q2F561lMxHkGrtrIH2h5kukISGmzjGN2g9QAoJM',
		},
	],
	'cu-10-zone': [
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'SyGxp4DbcZpg8bzSdOs2eTm_BUax_Ij9yPdoYW1Zuz4',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'vj7WPSeQpYz6bTk60jG3sxkQoP2MLZaf7wqFrPO8KDk',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'BGBUvr5dVJrgmmuPN6G56OIuNSHUWO2y7bZyPlAjK8Q',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'OYYaNYGrljAexoFnjU57jo-ZVmygPBkAcOn3xK6PiV4',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'tNckeFxXDFgnpBO9VFTdKTeAh-EnG0EEsWM-cpvFMJQ',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'caBAaCTJ49uBhgmG18mvbWrh7zYcmvGrcFRP8_5SB4E',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'E79x-8Nmag_0Hj0p7bmdYZ8qk-SbyKJ6NYZiUJNJ6I8',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'nYmMd5Flb8vEGciD78L8_DMqk2WYjQRUuYECoJw_56s',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'izoMP5b0b01TTUwFmbiCUMydtZkozmZezt8S29SZ3Wg',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'GqWNsA-bKs817-mud0uXRPjfYNOWtP7MdYaEKVgwg4M',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: '-Fz5SwZiFbe7faQvliM8DTHHVg8Q5Hl1SGTH2J9XjsY',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'c1SlzKJ9LUY_1dk0GW40OXxjTTXAYsuuuJuNXAdzPtk',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'gJKH_MlxgDI3j912HdppmuJnqzsSvo3nRuvb5PVPxOk',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'KrGUaqOkb29mIILV5cNd37LwBBySDyqyN2R8v-uUUOM',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'HcBTFwozh3dLPWJA33YqTH2rYNvknvYtI36rrGSsheE',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: '_Ck40INdQ7_k72acbdHUcP6bvl3h6NZEday94m5EEHo',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: '1bacdWrY1K8cMAFaZWR934nZxlHElkHRLJ-Aej9W6lw',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'dpFb-M1tD1d1wGmawgqv24ihakHytCgAdF6EkJ3y20Q',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'UFVsHtM1wuOqIXlbWZFShvtflaX3Cgyif5UHARF_IRc',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'gH5GvaTC35ZqTvSvv4Ww86lqCYwD8lt5sRBIY9F5D7E',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'hm0Ta5xTtW4ty5njQWp4SGuFxWiCP_DDFeLpiV43n3w',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'azAbvZ3rKCErYgPUtjHUN3U0wOk8dJASqZS3U0SpYuo',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'pW5WhuFi67h1Oz0KxTC5vwdvq7NF1k2gnCCuwWBnoA0',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'TbdkQ-hNaVAZIGcmd3DZjJADh3PvD0qVP0ZH_KCAVIY',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'UrCEFi-wk1Vor4Gh2J2RSi-GJUy5KPiVgRNmMLJe0BU',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'WygPfGs-EXtAtClGW5dbFX-YKicPADSeh2Fthb3H5og',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'er9E2ydIb24wGW00ZcVwV6V9jyXVEjQr5rsIV40nwCE',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: '2OLWgPZcFSEVmkBfmd0BJT9_K-6lJYCTsYr_DTFGjdI',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'vAc44n8VLPzuf9lUnhh_E_qDMIws7mCR2slqzcA-iU0',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'SA1cbqqgU7dA-KYCgaSuXNEGyIChCo_LHt9k_UYT-Ng',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'tzI_Jyli8i8MQSHJ8BSgTO3vrkMDY-7Qs4mzZ_OBxqU',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'j8rs9KYuGdXLffEtF94eYRC-LOKSvOZimIOQjm4krBc',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: '0LlGhsB8I8ML_0uNM2Z1lH8roGIM7DgZNEjBN_gt5Q0',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'ezM-yxXAULWZy4XPY455Q3a_fKJe5FuiifNPA3ER17Q',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'CBSu_xbc0Nf2EIFaQ82N9EKzFLWnldolBhoBfz4-M1s',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'Y6KE8Ui0hAU7aLaY2TR7vNpqGbaC6MmNODBvUrWrdYQ',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'dvY-eqwpABEG7KB2D5kBdgKfwFuJRpuhAl56PuLLAbA',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'xfRprcFXk0zfT6xZIP1knNyYKiNuV-RdACOl-FQtJck',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'VO8nS1QknILv-uUSi10PTRAG2OZxftB2rRgZUdQ7voM',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'GPDH2vZ1kzNh58DrAUBHhaUxiRRgLbWXizSSfNblBQc',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'lW9ZLydul-MUNslbDJ0k2JUMWbFw9HIB4uuO39sB874',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'exap7KOCWcwMpPj0ujyIahNaMWU8w2iKn-WSN8aUcq0',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'MyvlQFXDoXsy5cRiqTNB3jefvvEvFfl2yyxR26T-TZM',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'n-7CtJNj__KWMcBEmlSwtLlThJ3dZeVKTANhJCCtg0A',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'NFUhX8Q9BuBRpg18DS53cASTsL0cA4-hjplS2_L2N4I',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'JgMDpyVjKZMq_3cs3Phdl22JvvnxN_oBj0xCs0MH1MA',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'KxYUOCe9Qi3lvCXAI7GNDooBWuyue0duT-mfldRn6cc',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'nu61qy_zCqz9R_bKDJbw2P6C5NcoZLeIeNvEKAcLlJ0',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'fIuxWLUBuMz6wFNv7YlSUc1H1bZq09DVwOQVTKg4Jrs',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'NjSMCs8LttRoQO1p5adub68JbvIve8SSCepCF4LioZw',
		},
		{
			cu: 'cu10.ao-testnet.xyz',
			id: 'BoR0vDjzluhrt7G3Uc43MWPAuZVM_n12vQYpMudHnXc',
		},
	],
	'cu-11-zone': [
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'g8P0dEuXjEtc_T2LGvKIxTb7J8gvQFpR-ct0yu_WDKE',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'EARECOx4LLSqsCAmdwtkwbARpORoUZpZ5XcZaslXv7M',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '20cEmow3vtkcmGbqgDIq7J9iLJB46_ku_LUoLvQT3uY',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'pbGTi8crSc9Waez6qyPRjDXBqZubf2DZhIYJ8d_e3mY',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '-oniWOCcV9YQjKdHNDCDH-W68tzalFOB0CJFvVPSkIk',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'w4eBxU0N7cSCkW8IMaqQKKZ97mRlBZ79DEv3XD9MS04',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'd82Rq7iRp-QYNPYUKdz_ynqiwKZKVxyi8DzL54oK5Ws',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '8HYFT1H6TOmz4wFVf71sMnJb_pcfCEJjJHK1L6WqREE',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'BueF1jzy4HHvfYG0Ytgpcuu3q8f_zu7m8zS64OODeWU',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'MMYVsCpdlXvdu09JtP6S9npHI_VWX9sRR5lUCEXlR9Q',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'Zd6_dlJzzGvSGtRB8YcvYfbN7fNrCMXWUdQn4bRvvlU',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'hG147kXBQE4a9mtHcCfKrbjwPkNeF93Ut24wlj3pwqo',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'q45_2e9hjWm_gT79bsOeDDUaU1h6loOwBIhe09AhyaY',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'qWCePF7ikXLYsgBPl7L4mySAFijGf6UA1WeKTzQmv5U',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'V4A7aG8dg5HgYJm-GBuS8Hzr7bxACBSf_t5vo5xLlic',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'twsJeCQZ7fv0OEEciZY2bd10yKL9Q92lhedDkcctLdc',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'ucqNlI5v1z0-u4l6hA9hSUw7CTBeSNA6g9xk5JaGmMw',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'qZ3QFWieZJ277t18bqnsOXS-CQLmmGgDbbETG-dj9vk',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'nNudwH0H8nyUZY_DuHnhZ-8NP8GvNgwOPQUBJQ-tBns',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '9qrp5iYmUnlhZWy4xxqpHCP4CfluCSmExKthGvFsCg8',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'wkRKK25RrzdGGJDRlPtduMvbNdKsb5QmKGoGRcWlIiw',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'DZp8fAn6eMCeNtS0ge8ClkaTFt_6zejm1Lpa6D_63gQ',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'xsiFJZOJsWGq6tGsnTv22uxXhHzRxz5hTiBkS32f5Os',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'YvXtq2vI7_BXwO4lVU41VXNZ5gfBYU4Y3pj90ySmoj4',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'shvr1WX318VOJtEDrwlaH0HJzSmmXbbg0GRTxBXCCmg',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '0XEzUvCKNeQ8UaPz4r7OFITb7gRtAwKDoISIjq0MnuQ',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'Zx7wFdFJDiBFYhvWHGcJk8pa86dTW55ELgg4hykWoqE',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'Xc3PqFgFhjvfVJWm-mm7HExdafGX_u9xHPGlPDjQZMQ',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '1eAoielIX1Zd2uOeczCzU1oWf9soa7Ixde3Eqlv86rI',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'HbgtsUXzkWuNnyyPjRHhxG9tuxGiWWLqyzhj0rvJ6sw',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'ojfmq3y1kYOLISAThjIY4lofQJ0YhqDYI0CRu_3ETXI',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'E0i6_2bmuKYvBVvoC7zq27KNn10w78e8jKudIhtF_Aw',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'KIuY67FbvHXYji0xTkqKANDyMWAZEcFbiZPAxrBByVQ',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'dxjpPUOSGOZ50xrXga1EtcemqR0yUwGhZRO7_o6gTEE',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'QFPNgSe8xTi1Ma5YiI1wtHZRck4Nc4YO3RzpiZkh4tk',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'GeHbqV-tYMyMPhucRc0MWNumxkdfbLVs8uUWiOj830M',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'QQAZfDUtV-0GDCkoZJ9ckG9zBgz-4Lq5YqoVP-LsLPQ',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'UKOoUlOavVevCG6Hv9QzMBg_RS8kSo7kyM1V72E0yuI',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'VJc79uJC4Kn1RHfNPRjR9RtMiEbIiYh942wMd570LYc',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'RKmxozEoTs8aCES_ptQQh5U-N9xUD03D6ehVjlCxgQ8',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'yD8or7yomrrMbPHutVxrXFZBYVoKElGjRbUXQ9V5Th8',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '9dO2RL0R9zTh7qB6gBMObFj4GgeI0EyGgTapIWdYlQc',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'Ei_RAoL9KDDTIwlFnxb2klEOERRh0MwCKA7bpFZJsA4',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'GgtDB1vgcygxt727nFDtXM478LyxOUVvGACNUAznbvY',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '2i6E8cwLUXqlCoxNQ9AKBsbbdbMir0eau3OcX1sLR1E',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 't55dbFZ7lo1XE4z7Sf87qCRmJJS-OQYvEyXqc4N1UjM',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'v2I1YY4BhSpUESKrWAy-7T8LBQX0tizSib_nZyplt1o',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'DN2fMaay_zmB_OEabfW0-FjHsQ6mZKuYllnrR3Pv-XM',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'nPL-UePBbwp74-lU71sGOKSMXnxh-sIRo5dKjB9LqMc',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'vr4-odKMi2VKG0YF08qn2HD4zkIqgwxaTZ_adXbKKJk',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'uz0638BJBobQ-spyrAXPIaOcFTOLR9X1J046cP5An2w',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'IX0znnJSWXQOeZl0lXAoQp9Zj2XGZ-vutvvFdw52H4g',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '1dLVLizvjg0PYat6f1ZQlnzMzViMlKZES6NLOBAviQg',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '4XpzUAXjd7nb2D7jRdb_Zs7FO-VHFNtZOXEH0ayIPoQ',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '6wIEp9DXbBBH2tE4nvoeYLutNT5KtVm7GTL-Q6rH-2Q',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'TOPiN3bOE60Z_efmHcQPCFeO8VKMAt3N98HittotkHM',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: '9cN9J5DA_Jdul85jTGZXq3M3P4xZY1wDQ7dED4SnGWI',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'aawhyMhTj1jItyfruJorNu0ZzPgzGCZU5_pYFe_FMQo',
		},
		{
			cu: 'cu11.ao-testnet.xyz',
			id: 'L89GXVXhyb5QRNWKeOpoIXrdT6igIFUtZ0uyWKtCf2o',
		},
	],
	'cu-12-zone': [
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'AhBpYot3PfHBqug68E6DmcSouw2bBMGWZCXyBXZ_M2E',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'nw8B7qQm19O6ufwhfMV9r_2mZzM-HAWfOhbhvLztEcA',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'zwW_SrAKJRuyd2WCMclf_QDynaGQMrTkVpgpL4eBfBE',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'F1nQKYI2SlaUz3IZfoKgIDSSMStoVvXOiOpr0gNjJUM',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'hwVTNVvAWpO-fuq1CEGo-Ua9B1TApFA1lQGKf1u-hb8',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'MZnE032vw0r0PteChlbGVQGsKwKQe1KFHk1q_8fc8zM',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'OrmpOsz1mKAiMUUCCY6nmJAFht92XDqR1NDEwTGjo_c',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'DCeLMcaOXAwhD_B6lH99Dc93QvZqkxY1KZjlLRCfrHI',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '4H0vhFI7vLVFQNY5YFdMCY4aflc9mR-cRCXTRSvuXpw',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'O1ZI7abUc8NLOYSqq8TgVU3AIzutuGsREBMfJwCqvL4',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '0ZLiiGSjuxKdi9Z7U039ZxkBdSLM-TDaE28pf0AE2B4',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'yJZ3_Yrc-qYRt1zHmY7YeNvpmQwuqyK3dT0-gxWftew',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'ZiBW_2cHmZOIQYUZmN3_AU-_NV0c2PaV-7VEnwl0P2M',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '5caoNSpzLxM5CeIZzJGokif5D8RBqzRcL_JlUxrHC8k',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'FDVCqCWPUV6QAeaaODcrEKC923_liSCqccPJIb88Xfg',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '_EblG-cAUIyL9BltTG2NWWsFbNLmRVnMPe_xfBsWqSc',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'SucvHRht_A2nEOWiwHeKVQ0kmpNeu4jbxOU4wY8VTWg',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '10atnzTSz6dn0yTKcJT8JZWDWJWF7g_MLEOjqZP1z38',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '8ZnmV8jZPKESc7oJwZDTVUl_bQpZWikqpACDAvO2I5A',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'rfpRZBIrwMU_6BXT5mxzk_hhHicNl0hYRIMT4CQtv8c',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'eRdrxKnElK47pvVCVYgTkxLW5Iystlg8222MRvsf1Sc',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '7VlRXRZs55QlM-OXDcWgvBk2UFD7ZPkYXH1jRzsD-j4',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'X4livL6fOHKNDQBMHDdK4kKBCrV8sJOZK7-pCYLI13c',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'X9fMyzsSENoFfHoLoaYV4oDcCV1IfwzEGlkjNW1MJso',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'KmGmJieqSRJpbW6JJUFQrH3sQPEG9F6DQETlXNt4GpM',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'DK5l0f8bte7o5mp656wdLM9KpAZ1LhcB2bKumVEh6jM',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'tosUwNwjQfCrYQRthAhJZS0jxUOb0w3-YPdcvbUcaBA',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'XIUhmoyhjTSc4t1trg-PJTQcr9RUuEZ1vXv5uPlZUp0',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'roO6JZu5EndsxZeSohFVfvXUqnyp-gOEIuCfnbnHcOQ',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '1mkjd2NfNWvr54BqEdSj7hIdmkky_ufQM_MGRxw5itM',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 't_fTB-N3BlsVc0M5X2T5Xp94oc9igHwy7k15LWNacOs',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '_dWr2JZI7z55j7YGECySHMuHJk-o7ujy2HxyTBvDdwI',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '1Ne00IrKTg0W8aMxOHn7VsEUDu3kV0fG92HzGw9kpLg',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'X4dKJeX10_4dlOYBPqecHRozz7RIl7cklXlsXebQxTY',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '1WPg_MDFhFqmUDUdRx_eWfgY0yAomKByzjnrC32QewE',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'Z2LL7oEen2as__xofbFDcbYgMO2TDa5h0OCP06YZKOA',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'KFPFBQdOKVtzOQOP2pfrx5X96WVe9oKPu_Z66aMitXw',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'RhFmN2Z2ECN7gqeRsNxu-BJcpoIIwptFNJuaL_op9xU',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'AyM7Y57xDnioSDsfkdKMWCZ8FaaqJOYbR5XYDy_F-IU',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'zyp1ghntBIa5W28ATmgzZbkXIliLFvK3WZ2HpLhdGaU',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'LlyqIUNESjGfUcmJ4iwhtvsmzTxNyDiVPKsdQEMVMYQ',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '-qPKEnllB7eDQuwZrKI_pIsqDYlyW448wev2ChufPY8',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'OgglkHZfYvfGsNYErGk-8ynC5nu85JSHanYvQNu2_uE',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'BKlxM9AVUtSG2KE5lP7FS4kuYvWCvUg-RklN3_6Fz2M',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'Fsj_8OYzO6R8WU0t6BWK5QmqQ6A4EUsa32-nrYuN83E',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '6WFGJetqnDWb_wW2P_ChQoQBMcOJRTVnK-JMgoqFRPg',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'AfMoaSAuzilVilDgzsrnSp9pdrJGaqmiI7Xe_ts4wNY',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'PcQdIs8yRlcGpDUJSCxGDdpyDZnZXRIaEc-Spb5GYM8',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'B5LaUejXg6IzJT4z23oiWEQHUb6Oocv764t1DMn316o',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'ZCyQH9azcYKPw2cvWbV-kX05bljDvpOLqDl8Ucoo2H0',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'K8x6nLYX-mvhXwScxGOoGqj1PHDSl1-D0alCsX8wSjE',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'OQwNW69PPP5FdSKyxAZ0T-Rq1i2t8qEU9uQWypSkSYs',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: '8DRnCuHNYQpISMXUucpoe8BrbeFS6YS7AMeExbYVzRY',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'E50IgaYffzn3bO_e65bOzye6cflELkU7kDLF2WzrFMk',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'ri7n5lKjGBpLshKpNRtd2YKoJw4iKOA8ju02K5dxL_c',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'Qwg3DWXIuhE612cBl6pk6eO1mjCdnPsL7kAb1SwnQ8I',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'HAK_mNiwUKsb91jKP7jCc0uXTGRN4fCQKIloY9D2B-I',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'TuZKU9yDpEhkXlKlUS8uDoKRx6TFU3W5LKahj0ODcVQ',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'DFIjBBUs2JIo4v_WLfB2vJ_mo703yIUmWr6k7tGQeuw',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'uDQk82CL05Nt3oiQcJdoWQ4BtMGPht0qqbf5kS9ivcU',
		},
		{
			cu: 'cu12.ao-testnet.xyz',
			id: 'rZckaI0u4T1KArTccssVSD4sm7DWnc6OfycLj2Y9FvY',
		},
	],
	'cu-13-zone': [
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'hWrSNBreGfgXEtn9fe69OCx62we5JgdhwQtWHX2tTqM',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'rZWVVmttJdK5XlXj1iDZscyq9KonNa6GGCFFb-mVu3U',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'h0xc-TcL2iYWJu3njwC5cauzbjuhUmTh9EqBCeVkmcE',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'K_C6jPtuwdAWsuuECB2Jeq6xOCwXM5OZ6cxWnADTBZg',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'Znkw_KNtomTVlitAJxpf4d_BRPVwNs2cLZgRWR54-cI',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'DJZpWrWPIwuoXESOJiKzypaMZx74DxC_vI-GdroK9u4',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'lDD25vHlIv8546Xw-B2mzwVwB8ZRxQAb9GMB6eamE78',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'TsFDP0aWDrzSTwXGKYID7nrwGmD4UdK_NOPRvhI3I40',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'Cu7Vh8heLkeBoZVqsvLZXiya2cyllC76uSkfxHZvTtU',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'SsxRbjFXFDOWFLK37x0bNt5VZ39br2yr8K0mW9_Vhgo',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: '06XWnF0aDhlPB-wBjdfLUDW8ZLZPYc7lzAr283Z4Nhk',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'D5spWbeMKD6NsgggwvulublQBzfFND9DeOWpmvXjIO8',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'GyYkmltBKbRLXv4Kn7WKbttOfNhRfEQoPcRocsLH8pk',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'rKl6et-TreR4KsW4KmUqL9yg45Lex_0Qy4YDSpOaAYA',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'yUMaueFDkOrH4t1tmMIs7kzHR2fsl5lrHK1EYZyespE',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'W8WtBYN4JD7CPGtT3yCoFMmagE7RlQWmy4Yf8XQCp7g',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'ZgD4_EID5914JFK9ephlFnbgKDUmqf1R6Wq60Lr6lfU',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'e0pAZzSfBzHiIOVzJsz5qOpGeZM2wPMu4qD-t0z8FEM',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: '-SFWHD17LTZR12vI792gUvsM40eioWSIZ1MFvyPA3zE',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'Lpm9HYBr-Q5qpYN20rr2bMPSgtxputpsakf-fwvezzg',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'YqooNEbVJOyLGxSrPhsUC6My66UECxxaSBTFWQ9J-cQ',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'dknx_0zXSR7qF9QFg3vNiz5J2v-LcOSPJJgvNaNEkAw',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'fnfCHTG--RHBu18gt99x_u70Th8rJbLE1DHPHcImND4',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'PKSy47mAwTpTH57fOhXhGCbkGmtYTY9pLeo7W9nrfrc',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: '89HBqWgMIm0lj8z9-i5BX9g4K4cYo2VvkVFkf-oLIbs',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'YW4_yOc8oF0kdgfjpbZkFuq170hoYBCW3dJzM9YUKxE',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'ou_fp6jz7DycaZaOedCYXD0oowF4bn6k6CN-pYO1Qz4',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'ouf8m8X50ZNzVNBtPfSII7J6BsvLlEe8vf4sf19mpnY',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'wOxzslmRXIKly0Mn81uHgmt0uSnLdN-5S9Gvs0jefFc',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'zMRDd8HvvX1mEN9YmJJ_xzexgxdLXHeFv93O4xOKQbw',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'norOLn0SGPpCKE_qZ9cKY2DhdooEPgGwsl2vB4Zmc4g',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: '-u_3drTj72smoneCnv6uVMfmTLOiUTfe40yIhnbgSQs',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'TFOmqQDRTCIxJKN0V-6IezpmXhmFDE1s02HMqPmn7wg',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'feWSGpxG2jfl3svcLYQOAn7khhrX-gHjZH0BTIdjm3I',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'DfNi73k7iWMnVfUaANsFRhuNTfEHPm2MoLR4NXVUtVI',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'HKdNiyhzov1rqP5J4m11yqbrI21heS17HuyOSOAaOxk',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'PloiDrVE7bX-hVLhVKjooLKCH3ex05Df9LYYFP7RR8o',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'AkYe6t8ruzkLVaJnEA-HNTK8KV2X9gyqZgjmcJt70lg',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 't-KT4EH-B_QBGl1Sg3gc6uET-mSj8BtE9uAz_OSTCQg',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'AaQa0z_uAxLPIGgaH8PuF14LbjIOx4KO7kKbW_aVZ14',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'cEib02T6J0XCilit_qokZlCo7l7mLuHNIqFqoidog5s',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'NVgBrFR594oro174kkDRCRnFAIUu4WvzbEdZ7i7Hef8',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'm4b-o6HetVj3XM3yl90SmwDKvn3_DWT1CJGknVQMOos',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'c_IREeVUlhdlOBZGWldCiPLE4rcH-dv9I64OjGo1cQQ',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'FJgHp5fNFKYL1f0CcSj2jIbFMb9zyw4TynidkaHQgGM',
		},
		{
			cu: 'cu13.ao-testnet.xyz',
			id: 'Dz7SI9wyR8WXvs7emDn3n1ysXUoogxsIEJVAuUNs--U',
		},
	],
	'cu-14-zone': [
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '8x122lXDte1xglUls7sje70FVB-pDVqOeAnZYrk6MFQ',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '4djqnSRU-jkhYRpnmuMY3q1WMGiy0fDEZmsW5sTugAk',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'Ei9wfDyDx_XkJTTSiZMVrFyO2IoV5SviskDIGRHtg98',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'QKTU5rk9AEw9J7UpFskNBpijXp7vJFoNpzGmX0s2RRc',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'b_HyFlHK4yYACcDZt7Um2NVcjgJN10F_xyH_4UoCBik',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'Z0j_IsAXmp7XKFTEgVmrs26lzN-D2dIPnSCLx3dlv1s',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'wiNUNLntck0s8mRNg69J-hvrHPIZg2c_-otR9Cao1ZA',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'vBkwy3IdTGAJarPX8Z3HbwGHH2LMH_4hvEmjb-ibh3Q',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'Iv2SJUtYh9zGXbsokDoo2NRZo5iKcXfe-pdO0BqXVUM',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'lrNuBHsLuVtJgZi6ndmMVHd9WEeYt81gTSTK6Vouuu0',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'CmlSUxAsw5s0m2r-PATUZzHGbdhKo9biA-NOnLGT-_s',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'SmSWJOpTCQWj9Frnc4IQrluzJnaqSGzzVS5gLRUolvU',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '1iCrFZtYy80X82D_35N9NxE7el07ezQFjR8H0D-Gfj8',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 's3-Xzw-r7qIHG5AJ1PnQtNwRY3Gc9UTONcFLn51-TUk',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'aUZ0-CBZJlP_HMOKf4MdguLgKTjb_Jhrj2cWA_T8Pzc',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'gK54KKkGdMplXHLYg8sOdUa-2gH_0DrdyErKWUBxATg',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'G_UkZXzEOua2jfburK4pYWK8M-rWAUX4ekCl3UyvC08',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '94p6ASynVtfpakZT-rshmXHWD2x1GUs6ADTVq6Ni1Vg',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'mxwl0cU9Ni3u_U7-kB5nASFzvcE5ELo1QCk2Awk63Rs',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '15lMB-Bu5swEGT7SDp41jFZZtW6speWf83EbT32tfXg',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'FNicgUoFdW1RHhemoRgGhklThGc4GBZs9a7BX9vHf7M',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'F-bdPilhzYodKiixRIwsCK2IithBP5U2Z-nYKrE_uvM',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'fEcVx4oXnvpfBa27ZrcKJhwDIJc3RqmEhQbNc_R0ouU',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'raQvralKg_fBNxkxiV59EqBO3dR-lzASAriHuK25EwU',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'lIusxC4EUIRMRjvwPrn1gFVj3z1hK23iCGnWkMWBrTo',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'zWpQNygOjROE6k0owNsQt9RY-IFmDas-bRNKw3dNFQ4',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'V2gKjB1kx91EwHcSCqK5-5pMytHbIKvsqPK_usEBdOk',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '5Zk4UPtvmEw1ZqayGzzhnrz5KoY30qaSRIMHR8M6J9Y',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'k5oyYhglRzlwm4-Qa_L2vyTicR0sBhBNP7TeyyLljSU',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'phxzCepB1pELH8sAJ5KlJ70XuhZFY7x2cT7BFus3jL4',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '1da8VDC2Zgm3JQK9U-Qm4_5ywPtRFZNhLMwcvhEDf3I',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'CeXr_XPANYgxxdg48Y_QDvrSAOS7QPk6Bhb4Eqc1uw8',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '2nfFJb8LIA69gwuLNcFQezSuw4CXPE4--U-j-7cxKOU',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'lhxhEKmmlwuEctPK1-Rhpg8d1whKEssDFyMtKvBpvX4',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'uxdLgLaPrUaAtptAg_X3bSp0mdVLpowriSRyYcDCVAw',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '96mitrGV5G1qzryu7uWc9tjkH7ug4HOOeekLpdhXdgU',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'DCiHilCyNCQqUtfCD-mQMwDhlrN5YOtzqFmZumbzb64',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'm8XEBgy-Jc7Tj-8bUHJUwNZvArZlBDv-inf5pZW8R2k',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'ajwOph9oZeSckFbT5V_JBlRer_JJoreujbnf_K5Gm4I',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'AzKTf2Pzw60RtmHpM6M0EcjggPTYvjiHbusqeTFqZNU',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'wXVE24tK5zVz8ReR_KILx28tdCVkdxTHK2NcwpBo_uw',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'cKRoU8W-TlahzFwGkTgXpXQNCILCmY5bRLKu2ckq6o4',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'Xwg7wtOkT1UzctDpYQ3f39fkK5ZPNENJRMlx4QcNVYA',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '4VAJcnoSVn3CkLjxlgsoap799eSHZ6GHwVRjMbioOfI',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'Pr2MNkH3girWF_9vdmLlwY4tAQ1U8O16R_-eCsI3cfA',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'AU9b2nzjfFvLixtExSlc6uguGZ2ZPknPUYnkf_2ESLc',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'iQnQDKB6jfP77qWWfGoI5yCFi8hrMX9tUmRep-xLaDg',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'l-rdGJrHQVCfyRqnqwgiduVDCmHpfRk0sC1ErircyM8',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'ohKEguHqRTPe1y-Jj_SF6e_zSB70M1C50h9msAFg8fA',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'FcwNSZfNtKArtZ5Dv9brLQC_6VUZOdKMLMM9DltG70Q',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'RJo-aiH2TopYr-zLreGuO88b7HN0sauxox7_NbYM1I4',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'zfoR5ZjnmJaxLttcjgxYxVt3VS7gRq_vv9vrwRUctao',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'piiOWE7uX72CLV9RoIeO9H8S11G64woJo_taClmj-48',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '69PgvvkG27RvC9hUwehqZxu1DoJff8hPKerhlAJ7oM0',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: '2_ffIY7gtT4wersip6kdu_eEtIMksnQqkf9iGmXKYv8',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'gkZWuZGc0be9KTKfRb0Q3hWU5sQUex2eUgeiNQ0I3Qk',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'Xs4aQzLuWWWJ0ChMK9pIZaMJIcZHHMeRQGnSt3RwQrA',
		},
		{
			cu: 'cu14.ao-testnet.xyz',
			id: 'Q2lNkL0OM4X4yMzuNxpOzdrZe1h67toTsCpP4oNBYk4',
		},
	],
	'cu-15-zone': [
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '3RY-rERuKm6j7IpoDgGxoE_7adYuvNy2d_Yk30zDU18',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'H9MTihw7OksTMd-2iTBJdLT2gW6eaLYgVebKb87pMYw',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'inX17xIhwF0VX-otQnk9tiytQnYomQ3ATeZrK4eXHX8',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '9FVcpB-tbIXWCyKDp-gwIbOhD022LcNFg83V4kk1I2U',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'yC65m9ajpcJZPlfWkKXLJc8Xf6NHCWuH62nO1wvP4kI',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '5e5HriT52ZufLilHWFi7faDD0bjTikmu0nOywFjn2gc',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'CIk4sTc-NYjpq0odcSBFcR5KmjqzoJHYJWwo_CbStkU',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'zpnApN-_rLSePUiYDNgvNUloIUfyre-PIDRxQz6fibY',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '1efdYo9ytpZFCOw7Xbr-lxsuT9WUCYB8_NyZOzEXBuw',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '9L2fusdjL18j5NLddAZaopAH6AjYOYzDjioNpttk8G0',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '4sAK2Us7QIqq-mO-Ka1rfFLfbyD0ZI6QvJbMsEJZPtc',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '6uHkAYcpIbBqF-FVTWjj1KM_428vjP9B6SPZulMYeM0',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '0wwdPd_4YyA52OYLc-USMwvQdCjNgapj6FSYk3BNgEM',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'kxZ14NzzVWQrdg3sRFsQc-_aIf2qhQwgOW24LTJYlh4',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '9AsRe9T7Q29HT9NRJo_aZwGzbjQ9zfJt8hL7YtHyxrk',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'MH_AvuI1T49ZSYji0KH9a4fmlhlfwC-_Z5dpmzG6Pfg',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'cZC4aBf2U2_R5XTBOdXGnc5hFSDI4ZYpCuNKV0RmP1k',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'J9iUKBWAzkqPbzlR_TXIC4x3OfdN17rPERr91K1UNeU',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'XD8D-sD3OxP4aB_NnfDyNiZEH9GtP5PVvLhl8Gl8FI4',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '_w6lVEyQpn2fUZ8Ga4M31DTw8Z7z5JuLziYp0GkNMY4',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'gEUwktIxCFA9XDBEvAixgxCxiBzCz1QAUxHjNhVxpVw',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'fiM_JSJf9wicDb6N_wRUnfurcMXjC0UyQXqz9ECEDa0',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'Ibh3WIGBk9iEkr28-uyrxN-F2QonULn35FsrOMiRfAE',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 't0mj1b3ZV_jUip2LPOBXygDM5I9Mmzh4dOzbH2XJ7vw',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'hAmF0bpAAYCLoE3EKk__7TjzDPo5W0x8LWvyb5kewKY',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '6lbIpNJ8XHQxqj0M2nfV2zBcf8vnhzuh21dBq-ArJC0',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '0JS0q-gvu3Dr4ijwiNCaSl1-Qj2jSGCB-APxTbtZODc',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '4dpExHWADpZGnIjl3iZI4eLyAhqk6oClLFSKIIlUcV8',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'c3eRhhJWoATwgdcoprf8Qe6mElfAwLvyiN2jwgEhz6c',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'pal5hhn4zHv3DReqP301KK6jZ4MmKhRSw_wrZveuTEs',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'aoVAavtf3x4DScJqB8cunHYZzun451g9A3iqk3j0Dm8',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'BaMnH-czEhFgrLo4-TbUBJI0NFVN8ta5Vu_z7mWkhMQ',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'PDhbh1q0RnLML8i-d69ENAzsxc7C0HeT7zrucMyd_Mw',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'aS4SeyjTEbMZckHJ-WQzA9bT7SlV-v-0K83y4qnUceI',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'ROAeExrDb-AFcuD1IBW15paRki5Lu4YuhIIdPDg2Q94',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'y-N4B_sBWyCPm2OMYHQV_tBtvgl4qRrBl61A3A6oqXs',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'J3yx9oUnoEBhgcmrqdYo_0-v9GZe_AGiupJZW7UMKRo',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'a8nTNOn4T0L-9vpudYiczvhs5V_OMPqsAfj9_Lf9ZC8',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'Lv6teMWHB9m8D2ntxI2cwJVYVkuvsntRGvHL9fNXBbU',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'byaUfQzuojukjWPIQd9-qpGPrO9Nrlqqfib4879LyCE',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'oMucUlG5zRb9xhiTgr09lDDc7pYscZELJVMlCL44NF8',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'JaDlGH2F_97tKKTQO3bdV1iJ8HnrrT_F6DdyTmGMS_k',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'zrVD6lz2wZqTwYxEaGPvvFn_UJPrJ3Y-CWR1aJajaas',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: '2BVYbu4iE14kkFXpJXkUWY1gf9kl8YusOdHMzaC0S7U',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'e5l_GLTqqyFLzKxHs0hVyoVFrchuU0MQ0WCUhHgpa0g',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'iLOUkYjfnaF3ZOw6rEHGxysMzpcIA8K0rP_S5KoFuKs',
		},
		{
			cu: 'cu15.ao-testnet.xyz',
			id: 'AdToUumKda5C6RiWPaPvfx-pGV6wOsVY7bJQV3VyTd0',
		},
	],
	'cu-16-zone': [
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'phafKNgAEAUhqrcRHTuVSW1l9oZgsKh--wmC_QI0ZxY',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: '6Ib9N-7ppeWAqWjwqsrnkFwqOsPBuAkVe9dheM8Db40',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'AC8YbeSoigAiPN-fIlYw888_-Ku4LKQG2TxLO0kk0-c',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'fxSFonPaJR9MjwQrwybXF0NSMQc4dLq16G8xOmxjEVw',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'j6HxaGX60F4i4OlcRu1ZS16W-5IT-9FdtyqIFbWyimU',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'sTy795p5R4wnlgyd-C3rtX9YtOlxVKN6YeKt5IDmtbQ',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'eXeu9CQU65bLhB5HQr57Hp2M335obbytX9iRONhcx-0',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'hucJ06TWenb6YzqsRwoIWGzCmDD6D20qvLiirR5dTNg',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: '7-wGYeV0TQS_wML12FRjcMjUnHF5kAT73zICQvqPsrQ',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'vp1wB8xXMvJgiSPSzHBXuo2qNpUuTAzkN7dkrEoO0VY',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: '146a8bo7_d-czv_-FZqu-XIXaoIxHP89xCgrZRcwIag',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'CvP8P6H82dfS71B9dLuXxI4RCQz7LW8SZ6LXB5A6R9w',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'b8BeEa227wrvuGJZue8nXMWGzRiH3nCC2_IakueCsi0',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'IO1bQU_x29I8E67UV8LfFZLeL8SESt2gnOtXvVvGr8o',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: '4UibaQlfSUqVfeIL09mMHqrOFpYADoZ3_CjIP_Yzisk',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'xKIwq5-UFziWxjyoY7gywPREz08aF1ui6NLmi-QRVBg',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: '9Yd0MrA0hEjnR1t6P_YajMaTjkwnpuDzbp3a7WgkSMo',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'LnOhDULTB44SSfshqOZ0kw43mRBSWegTs8gyE7nRpEQ',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'UtUwtw1Ntp8Wp-F0xS1Y-S8R3-DU2uj0HrDalTUKVcU',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'DlRb35wF303vasHvFsNBRixGexHDvi99hzpR6dxOPDQ',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: '85Lm9a772tTHi6Y4Ilp_sJaRXR7pEHnsI7aShDRBjAM',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'GR8GGlhUEUVmhwuBP1w9JgyDR0Gjte3tYmYQFlFwLwQ',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: '0QK2BSSk6pIL4BLXBBBfzpB430l9d7JYP81gW1sWOks',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'PkV8-8lAbwsfGjcjNV_Qj5OK0zc7YVZ4Gx_VqiymguI',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: '4qJltiy0KxjTgvljQ2O9P0xkhrA4YNGfOZstJ36TGpM',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'I3T9TEjvMbQIQZ2GMItTsOaxPmNrJdiVG3XxVnHBlQ8',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'Ni9zsuT3UM4pbCgSWzL9Wt3KWNUKd90hiD2PUUsevnE',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'LfT1Ns5Ew3DokNfXtWvCTn59oWNB7z2IulPKzN216FE',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'bSgVb8pqeOzrdCQBtauVVN8B6h3ypWmWjCOSQ-yZBsY',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'jg3F0ghFmexOKedbF--eKeSHcEUGX1BCgcUMoeWGvx4',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'oFK0VYmvP8d3QSioSgArXknJ-D0lgvmfkG25stchTLM',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: '2Xkj2iX__yo1KwDS5OYFAkGXQk6Pp14Q6Vaaa-MGnao',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'bvOgVkT7dTcJzTWTs0BIMS7t-UkvfbFy_cwMFrv3lTE',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'ygd0cRtL4VZK0JA2rTUI7oefYOED5-YV8l4g_kf6EvY',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'eLQ49SZpfExrXLwXqMxIFx9hD8Ic-DkeJQ5sl0jx388',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'p8s79X0vsxfHyUjoBzIIxNr-4zCcIerjKLw149ft8WM',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'uDS8Gu0L9KEsnj8R0UfmMN1lGnAom4W-yHdV85p-xAQ',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'rn-vJz8-um701rrRaJPqn1pw3fxh0TNyQ_IAGL853AE',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'zs0ROsJVrgMXKOSCW8a7-N0RmNCC-A1diMFf0nbrcGw',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'lgFKnmjWlbaZRUGnBOgpQS2qXAkJcVyPAqtW_RdgRwk',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'O4NDlpDkGOfK2FZQeAfmh7jfMqlvw5vFvrmMQVF-F1s',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'nJ0tNeBJD4VD4T57gPOf2x903V5GHqz2sJKinub1ONI',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'nKrnE7TYIAozYjXJBOafwo6XkihEmGEgZqkQsdHqwkc',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'IctOVLbBBERU37fSpMdAvrAHjanVrBpRUZNkkh-Z-RE',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'PokICqSwfs-o2fsTRvwvXkHtDQoz1_ctZJXNHRxsfbQ',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'NoCtCGaDhmkp1U6e5tPVs_xpqBzeh1x3r6a1ZBsX_Lo',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'H3k3C269Eh_bK6B0Lwzar7ENDMNuhmcPta11wKJmXA0',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'Fl62RcyT6PJA_mo4DVVonWWdS7o0LoSWWzSWGUigtAc',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'sgNj8k-gk_xq2HuGbdPoZwrWg1klYZJ6MPVn4TsTNf4',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'RAxjK7tyuBcQhJJgrE0uIODk_Mget1yWlUsJThaoUBI',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'KwrmB3aPtDPDGuRk3JSal4CTxqFlWBhPtg6Tf_cfRUw',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: '9nSua3KPaUWPJSISDVaj3oFCG6CjEpU3fr5GOn2CVlI',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'Bc2FUmwH7KAoDtEl1g7NengD_AhFjYeYVOBdtHyZFB0',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'o8lBLpQE5JQTxKETgmGxl5mHgRPUK7l41Pm6IOtizL8',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: '-Q4EiC-anfbD6qT5gYEJjgo9AmR1Btdoc_mbRey6UA4',
		},
		{
			cu: 'cu16.ao-testnet.xyz',
			id: 'eKlvXtcafOuq_WNoFB-LXtkk8UFCRouta5wKcSerzz8',
		},
	],
	'cu-18-zone': [
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'sZWBG3jK2zqKQOM83T8yAZS7CWT9mC3L8EjCzI2C03Y',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'rH3TLBoWWl86GnQFVy7jXLbh0f9WeEIKdSj_4PS9yWs',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: '3BMQBIjPxDxcc76ov2eN8mcfMeYvbQtI9nEmIkPQvPU',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'WduBsWfG_Z7Y1Y8e-txXjCTX4dpv-RipbO6kEic4BpM',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'ncWnT4D0cE6f5ZhJ-c4IuSIGS5CN34Fd0kxdqPgx8jk',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'NDuV_Q8RGdW7CoiJXXxHgdE67iiGn6MdFLCgwTz27eY',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: '-oxmAg9fQMOz7M6GiMJB4wUHq4_gxKEjHBwgCyq9qfU',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: '484stFaXspuSw0KzK1URJrHihWnkIruXXLpDv4DhWzo',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'RjSWZbfJf-vzt1o73ByPmVFyjLEqziFAY6cKoWkbcZ8',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: '3B4qGuer_uhwOQWx8ttnnbwP8pSVgbw_j2Hv_JVCpP8',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: '5p_MmfFm9BpWu8dCR8Wqtrn7G1qv17La0xs-hE2S3f8',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'Eb5Si_xx64vKXM29M5v1BzJgFn7rUEVrqjM2egXSsaM',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'Ik6N1wtaThZi6Luw8qFC6BVSWqVojhViWJeGDB-FUF8',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'HtVcCSUUskEl6zagqvZMMoy_GQrr5mfYIhc_53sFi90',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'cO6kKsn3P9DvjXh9-JlXfrrOqKdu8QgLmabfTSRfGAM',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'afE4Bd6W6kzkF1FmO1kgmpqDGm4fYUB8gvY-CPuOHMc',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'jBqEqmljE3VxRG_oWniQnWRJB3VbUOXVtq5DD49_ddU',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'RhSUJquzeA-XunXFeDG_8T9PsoVEjTAqdXWsiltJJuc',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'TQFniw_jhU0TJH-hqZsARCMSF-pENflnbxkG5ttgN5k',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: '1gtai_j9CNnDGTWfB2GRTun7DIH83P6Zc-iDVZDMKiw',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'vj3DNden-4g2ITD5Kr2W3uGK_4FWAT-F3U33iOGyujA',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'Ivuxt0rDYinGJ6mtGQCTfgCIx6VMKioETkD6H00m2zE',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'qVQdr-XkCa4GPDxaQ4o_MlWgKFilsGTsCyffQ_fEPU4',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'NvecPuByR5W8NXSYI3q-AmBsgEtoLSD4IGAUG45b8o4',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'OoF3pDgjwZZ62O66cuo2TQ4LkCMLmRXbqo-ZTtO38JM',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'NKzNyPN4DY--eoJ6-vGEZy9H51xHq799WZgsZH5SdgI',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'VVHZQn0hmx6gib1ZtQllAnSKANve-gluxanVLniJzic',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'TxHusudEC2EntmAO0HXKJUjHIdN4anZca-kvEnXBJ5o',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'a-AmhMGRNec4gvYTB071YIXYIggoJeaIoT7_mzuCGNg',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'eSzH6D0J8VRsJkhGeVnpfff6NPBkjEafQjfIv2gfgWw',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'i3BaTqkqZme3pxL4oVDPaEovDDhGjZdeZDLm1sgiSJM',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'l_jrfhuulpLpvGAkd2n1JIhJSmeVqUXaF2md2zElhnQ',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'nhzpN7azA-vc9SNZjnXDrLxVJol7AY-yJ_ioQ0VS50I',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'DEn0m4YOO4wMCPRtowQn50s8MVW1FGDEtGP31qUdNgE',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'GsrD2cD24D_oEn0clZKYDxT5pzc2R98YPDpsqVOwZ2w',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'xOosUi6UJCZcQ78F6V066h0hC9WvPFke3XW1RpsA4Y8',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: '-n2MjFmyMZiHhX-8kLBm3PKT5Y-HfkaiD9PXdb8I06Y',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'sz_1TReFTCn9EDsHGbRUl7eAORqFm67A1j3VGAwHTGc',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'JhJSQmPxwQ2whdVh7X_pTa2nESUYTxNwo2EhRYSqhyg',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'DtSEfuPdrp21XeAJ2b_taF24STjUQRDa6w26l3GwhXo',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: '549LhVLJROGHvcTQqi6Otg8nFmgtosqFG1z-ToFmujw',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'lWJeEnSQmvYosRs1SOqbHbQIZhVRKfJ-uwgacyheEdQ',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'UJUF_WdQPK-04rjFiIj5-m3emj0SP2E_RuNbKa9e1p0',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'i7ZxvQUASjbCcg0zn9ReEzqv3NxhrXB6vkcK23m_4eg',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'EIQJoqVWonlxsEe8xGpQZhh54wrmgE3q0tAsVIhKYQU',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'ijXeeVLSTbCbVP_GItr30jHK_vvdo-ZFDUZkSk25KR0',
		},
		{
			cu: 'cu18.ao-testnet.xyz',
			id: 'QZKP_rmPBZq3YYpOboKn68uqwGCRTklsa4KWpuEKMd8',
		},
	],
	'cu-19-zone': [
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '5A2vbW52uzC9vi-uNrqftiKqLPR1jb3c_2umZQsNYzY',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'uP1968wfK4o_AZFF1n9eVhYRvkKiP7QuajkgFd2Xp44',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'dzBs9jM3tiGnUbyhctfg9s4QYzWc9lZC3wjq1sCtPVM',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '3JVWfFeWoa8eQhklJUbuH89TS_qzjHIKOTPDN191mT8',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'zE6d5Tfga2LFyMZgfwdcVUHgkpK7ejEB5ILOCmrXTYA',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'UaMkWzuH4AUvWPEv0j2XDBHarCQO5Z-VHrqYzDPb3Vk',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '8Ye05CeAPYDb81lrL9Hq2a8VMgCZleOgBP2jRWgQwlw',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'QbTKZacHLrkOk5W5ujtB-WYNgIlE58lKS6nbb9G3Ie0',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'REatsUswu-z0QL5gvO8ldVqvc6C0b4vF5i8a0hgaAhc',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'OzLxuDE5GI25Yq-Z63DRbf-Ju-SsGn533iw6jGkMYiw',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '_N4ntACE7wkHAWogu1oPn9mjejdNcLQB1BaKOlHMzkI',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'K-ZOTJHRfYargQyjICMOD3qXDHUb16DpkLYgvN7sLxo',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '6zRUN_J1Mbvw2rRPUMwovEllYNdQrzx3b22hx9YUcIM',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'MGd882zA_Zf9YF-FqNplg2iGQOulCTOvErxVcPY3vcs',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '4sK15VUYyq3nmcUXcKRhn0VrVazAkTJEYTqMNwuQqqg',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '9L8Hv5IeJfStIQ723LHZhjYZPDLBiii1zQSnxsGT0EY',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'd8OBV_RNYHGTenZks3ZRIl9i2lhZDRwXUau8E5CzOgo',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '-jGYg3w5snWzFBujEKQdCVaKh06ybYE-OsApbkTUPv8',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'vJLZqFKSrhxg58Y8ogbLtuEclCf7BymO7UMtmMITPZ4',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'M4dTadgP6WYFvNbHjjbsD9X8hhxE-jNWwraZY37a3gE',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'yOeciNnbw6VdvsOhYu318Z4sGB--nprGpaIn_-jFzIY',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '0Oj3MC4FPiLhQd07dvr7hunauVVkn9NTEt38074LIiA',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'meav3B-Tq5c7t4Tn_OL8xljmk469feVtWjGvW7En1Mg',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'T1j2gI2JKOrdMC6usu6paSLcNS6y5zC5cnsTouWzMLo',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'TYqlQ2vqkF0H6nC0mCgGe6G12pqq9DsSXpvtHYc6_xY',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'VZg_XP_4pOowjLd5RAa29kDJyx8QHQn5E7MxpwmjkAQ',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'HlmpvqoHODl7xHzbLpmyJp1mbYSj1na3CQXHa3gLEhk',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'iA8zIRS_SNy2PneY-jyUOiXsWZv1rvKWhzzJwxucUV8',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'ozaIyszTjdiftH-5YULZBokTAT5zAVusC-0cSA3dv8E',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '58LghKt6ISdrakEa--0EquMLc8U29a-kypvlELBXYbY',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'm5STlP5ePR3F4e1umk2JVc2_f2cfPWK81SST2ePNEWU',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'YmHJxkmX0GzatJQmTYWWuFaROFvs2Hu1I2xkjPAAGCk',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '8jRE0-AT52K1vXg4NG27VtZoCgsKeRfEfhrqaueach0',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '16fsnlI7SUxTvtbUMKULboaOHRSXx27iYqDrSILiZ8g',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'iXsVsBt_EMZs7q9g_88RazVX53-otrlYNuPg0K_5ZsA',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '1eATAwNxCnzU0UXxcqXiuvCcrtDXDNbFudNRkjKAg7k',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'mcKFJ_KJuEaqezma6vFOAcWe-8ZFgilYD844EtfatSs',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'jJjVtPJbGNFcLfmRMaHknMiF39c9Clyn-p53qauqz3E',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'pNuQ7lIERvQNcrfKB74BjKMJ1ABe19YtIquowqKmARc',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'DWqoOhoMWP1K04NOmmtnJw-KXqB7oA9HLEG6H1piSaY',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'qUKscUBrizpG5dyiYiCrMP7r4WNwdhNvHSmF5MTxUvg',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'O-iHVh62BvcuV-swYWr2qwrGzIP8MeadC4Xlq5f1ubI',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'CSi_H1h2Tw2dkxtlc9FOtPwNFG8YLIdCa4zsLmRieRA',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'dcADNqMs6K3M5z0raQLpeNgO-keaqOkn5moZhV6SlWM',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: '_RToDaLXPT8nbQk2lYBu2pG4ZQJT5puq7sUULY3Qhlg',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'Er2uOK7aijVIEUfluY_Yh9OsYfYnwo5cx3sVYlX5LV4',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'IXi5-Jd4WzbZybHQSQmzYFLXd28FSBCJ6RTuQnJb3Ww',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'YQyosFa9C0pIbmDeplubD5wGwXAa22mC_DeSrWf08uE',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'O_SCdER1c1aOcqtHEgZ0-pmFmhW9NquCvmqWOTNVcjg',
		},
		{
			cu: 'cu19.ao-testnet.xyz',
			id: 'O_Cgqsut48w5IhiJs8hmtwt3gQZq_3jXRsFbUvh91Hk',
		},
	],
	'cu-21-zone': [
		{
			cu: 'cu21.ao-testnet.xyz',
			id: '1wHu_ObvBtNlQZQK0Jp2n3ngj21ZY-W4tgj94nOYlt8',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'eYSdVS8x1WpENTboznXk_A6fsofcMlTpIoMNCN9NcA0',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'pJ2Qi0ld3UHgQTk9lIuAizMoj0hmYshs9hS2eeJBgD4',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'RRY0gkgrZgXazA3reXghA8ZlkD8bWTRxm3fLWrGsgw0',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'kqwxBLlaIGXV3wwJ1ZKxP1CxkRnUMT9EDWn-zJg9nxY',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: '98tw_QUKtTkJfJsrGMzWlzHrA2bwcNvt9Z7wJeHHrDk',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'vxsfYiIA6eqwblqo-Dz-Ar9Ea5L5KTux6LRp22Pk77s',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'UT65XM3mZYijMyIDNNF6--FE-DxILWl1kJ16b-kG1L4',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: '-rS3sDCtnE6YDHe9upx78xe9Y3LIOZfWAV_KnVmjHyU',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: '0kvxZtsgMUqteUNg-5iEw8JmYdL-ygg99ou5j5ETESo',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'NViyQ3MR3m1mhppxmefWktXVSjQcB7RBypq2-X65rVE',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'lKZ6SpyB_V8YwewgPmctsRDWaKQaLY3fP_3s-AnjzAs',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'o3JQfcs3WWDb8i6-V3TkqmOq4Hvuaw1ZQw4_Dn_qM2Y',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'oSWqw7n25cV1K51Ho62TvcwDr86W5OgE5ZVzVavhplE',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'AC_dYLcNyMCnnFDHleCVYvBUfbg2EVgB6rVU0-tvEYA',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'Xedu_Wz8ALvX6r474fgujOp8N_XeVYYZacWUWd5wkEg',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'KGK09rjgqLtdBUyVKx8cIJ-Bzu3jM2EqqWI1AtkJPX8',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'Xyi01BN8ivXJx5ciD9rtui9w-voSZkgBwU9be0HKLfs',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'miF8j_8FmEa3PJNkwqgCCJbb1DhUPMlXmff1Nsj1Qp4',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'NKYo3ygAhrFWjT6Iv4Sd5BIMuft7xX9VEjoypyICgsg',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'LhCKjolGjbY9Ad_IvW3JYwq1DVVLloPM8dyOnrstHro',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'h_8KaGtDwDjGf6rUu0FIgn-a_ybpJZYjO9svn_ji2sw',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'wUEkIfY7FpuV-uD4KNiCNKa_LbceFdu0218N4lvAw-M',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'XFPOr_UBeYejfMjWbRQxahe3nM7BdQxk9_8tW9Hl15A',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'cq679tFmmdMGAmkV6a1XTcgc-JUvTvQCkUtx_jgu08o',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'N2wQgKdhN0871WnioCQHLj4IO6Muk_1PumoQs1VTDGo',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: '8zdmo1uf_Bbq-l3NDXiZikg51BCyIrRtoOS2r9YC-K4',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'mCIZbGJTczBhQ0zGiNBLHruGhrq6C8Qv-gkAH5u2Xy8',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'x8XkHp0EOBEKhytpKthncWLWftEs099pe2WYv9i1J0k',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'CFd0JDJ9_7P2eIW9bAFMoDhuzzPJDDhX8xppAeccEM0',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'Kkrbot4peURvaM6uh9kFZjVFFfgQJraaOztX8cHEmME',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'paYKi5tG8q13Nc1deTTOZFyflcq7Z_bRYISpI2q9CVA',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'DsmWTB7F0Kt-78U9VTYMd3g5z3YgRjCrnq-TNXLPdxo',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: '8HKhd2FhYLC94C9ovQ1f-iR2ntlzQQKjjOj2PrGcR4U',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'Kr7naa1KelFvnxnQbkrK4_1gQ_NxQIinijL9k79wXdw',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'tluKhWke9EOCJCby38yFMyZLcKFxwd3iWY4xdmLEOr0',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'EKP4MXgzHgGCSHWhLGoM4iSDacB9X-_x-szqiFXG_24',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'JcUz6S-sJQgyiajMWuFfv6a_oyaAZbtL8rMNAzqGwI4',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'maeoSZTt9BRXCDHGbfwUDO29Apyh5VOtyf38EKbRUpA',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'ohsctqS5Sv0zuY65Wfn9lDrEY3WfYVBZAy8WqSQIVk8',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: '5ZR9uegKoEhE9fJMbs-MvWLIztMNCVxgpzfeBVE3vqI',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: '9twtdos8XCz-_6fzcR-dzjEg4mP82joeKBVwtD5HFQU',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'iHgnGDpEhjdlZIhAzJOzEhmb2qP0Zgy5yQK2Sf-4K4w',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'Kb7uM1mVVdDFMulcXk4mKGry1bOQj_QVe80Cgimf7iU',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'qrYuDTM8lkEUOw4owpmLSLYVmzHTgoj6mj-nrDY1uL4',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'fnDntyJoNsZMiH1VKAZNj9wnay-VQDD8Sal8-j_rbC8',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'rLimVSMCwTTGY32azQ97MCgh_XP-57jqi15LqH_nZO4',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'o8Eju5DVpXbwab8SY1qKzEPKYmzYhZTsweiRYg_6ZyQ',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'ljZsNUFLyFAnJ84tM15_-41ZPXeYc53xF33Y0Wg-DTo',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'oXOLh7TtqkHSnjeX5O0wwffbk2fnzfjd-x7K9gihUlE',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'xUORqK8fc4F1RmvzmNn7Hfexv57wLsBYflwExrhWiTo',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'uQz4IkWqyjg6Gb526tfuySmwKuH3_mqbxOTYq2-jvkc',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: '9F7W--TQx26eh4G-OCCpb_i-ryzwXVYkLKjDCQPk5dM',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'SgBlcNHziveoSXgXLvAoQ2ol6d9vReYGcQQ9QVjyDls',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'D9ROZQyIbvq_hC2LemfA_Uw9_eRsExWzrqf9rBSBSlU',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'Aoz9tetLeARg3ye2thvdSgDrCv389DmGGOkdHe5fcyE',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'KwMvlpibG2FE3WaH0-OFTH7z8g0F3-KSKxWWeu-vjZM',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'kfb96vA_8M_OOvE9hRdxJZxvx1wuzk1eBqL52wxJZXA',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'mRrgcahlvE2dliPZCJzD223E8otJTZ_tn4vVpkBQeg0',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'Rlx-evvH-KfdC9HDd5Qz3UTvfXH4UoznoqaPZOktrtA',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'uds-rJg7z8E_hNjxn0pWF1BwDBfLkk67p7UUXQ81Xi4',
		},
		{
			cu: 'cu21.ao-testnet.xyz',
			id: 'KiP7g-T8FmJCsnZFTxCPkSu9zOEsgcjWWggv5ossKZs',
		},
	],
	'cu-22-zone': [
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'ktY_lV2NcyjOPxVCyvQ-fDDaZw5mq8OwUiJnTL9V4Gs',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'KFrb81IMc_x_dxGji04L_kW3VA7ta4Im9MmEb_J3aVA',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'SQCZelqphhvgaexovS3KDL74cnbuF-aC6v8VBu9IYBM',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'RXir7YXzUKc5LZ5lY3hiCCa-k3SGnWsdOZga1DZSy_M',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'a-1B2qIlkEy8NvyVgYY-iOALERXkNvufEQXURx5oM4E',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'hkZi6TaFwjEUHdqi46HyBsL-wK6GuqF8WJ6gXTMvKFI',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'HZKwuqwK3scg6vKhRTR9lHg8g6QECsV3P3CUqU3KM4M',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'KTvfQg0KlWHt5ndd9bxIIGIY14cQj6KqC4No91z34X0',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'O_y9eFZhGzzEVB3fEw-5DDQMtfatXkooLjKRyJR_Wn0',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '7jNIlh4ADNtr30kMWgUeRrSZY7Dh5BHvc8kEDEa4tWE',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '7PXQ5ozchlr9dLSllt8Xs-YYmzlNd4AzDh4WXHyYVP0',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'vLUfrdAI4FeN_B4pqRXIAvW-_Xz5Rll-1RndkFEd9nU',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'avXEyq7zk8JBd5tVnyqC-vvK4azfTslGFbbYrG_Abtg',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'fAAG7MqEYPjMEOT_22Z8T8RvWcgjqK5zkre0es3i-vs',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '7UbJU2BC-C8lCi_ce-8au1B6ZcMIGKDTbsmtu2k90hc',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '0vqEDhjScqRtThNlR2-eQgX5WnpKSFSPSORQYFlvcag',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'Ieuo9KnEOFXWTIpXmsumvoNxkQMqHx3Xi6AbtWuNRow',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'qZkdlUjA3UaPay6zkJ_n98r4Qjeg2OneCDUredZndt0',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'HJV6BxQGakxlQe6rfGxOMiifKSFYRz5WEwZOKPLPWEg',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'mSS2KE1LCT6ne-CDw14xciGAH3JSAYMCefiCpMiNWuA',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'I8fIGnLeBjZqy6UU7ZzziMEUQIHkVTMFmooKsPgdot0',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '_PUIySjkb5au6Qty301hGsu_pQHQ7HSPA07JWs2kTtM',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '68Iru1p7l7MuChoQu-5e6wboOusD3LndwE79H0-gqaY',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'ixhUK2N82G5DtKKox7gheQ2vWzubG1xe3KXj5kGJk3o',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'Vbqgry8OqkNRXhLc7Vd0XshdCtgNOC1DrV2WG5pCFYU',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'hK_tygKtLbXGW-ZUh3g13dkbEvGA86agjc_zZP-kURE',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'eTjk0qkzdq_yOmPqgwpx4KqOtN-RA8-y5EjVtvbcrWk',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '9Mwae28ozSTN3IWLpj1q2HSexsq1Q_-kmTXs9bBZotY',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'ke26NoD1Q3AgNQZdcO-LSfxL0gQRF1Eod39BlRqeEpY',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'PziBbreuDhMudBUHxexYe1ABnllcU0PoQy-BgcaPA2Q',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '-R9tUBdL-fhMYUOY9grFTk5aTh5WgC9N60IsIoU0oMo',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '5Ux8a42StbfNmEhUjkyPEqmOQqATE5TEDwUGjJ-LF1c',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'G4ySOxua178NJeqmElZUHBNP4Vy2G3KRdCY4f-7cpWA',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'GEcQUJMY4nK6nFlxwtlqKao9t4rbRknxE83ickr3rys',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'gHZJv2C-S7EBIURjBY2_9AAKt1SuBEyMEJNXSBLsdsk',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'pVCxakBtDSGloqIWnZ89v6PBHwAcBf70s-KFSr_VZCs',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'oKQ72otRldVM_OU9YJAM3Pfvi2nb-Rfts_jwdsoMHo0',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '9QnnZyulnJGB0L8MpE7GGo-ARRqUFv8ADHDjVEFnrCI',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '8HuF0P38ghi_22Ui1ZX0qqUcauzDER5c4a8DeQBJgGw',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'S5gvqigZ0SB-eXeyK-jhtRCoqCR3dg9fowTYWny7pV4',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '4zg3ZOB7dH3NWm3IN1qtIknmAC_lpXaIO8VGUeUtyLw',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'XOKEK8GpifvqUM29LEB_UwlSi7c0sphTZcQdtlLooWM',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'EOUMFWJghwds_3GFOFG8zKV7tyr0ZAAiUY22XkVRJsU',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '_qR7P8p7A5iuSGEujYso5fBTdyLsuPukEYqGpl8Eo7Q',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'upS2vXJph730Ryee2gLlz0SPRoIgaLK5q1KM55rP0fQ',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '8WwUs1LHYJe9Mt50pRU-ZAmuGrZdBQ1GdIZ6jg8GOUA',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'jCIp9AdXM0_mV3-DIcJee3v-6SdN_SuekSd9s9BKk7I',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'm4FBEu1TFtZ3pOoOu0v4IlQLySj7MdiKIHhuPQkFHRQ',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'P1D2I72_Ncpx_Jm2mPRNrlr3yj6v2EVFCvEW3UuRYsw',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'w6LfytuJFbVGYbVpPg02NRqkGk8_g5R2aEo3QyPf3Ok',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'E1Xr-0ob0VUNH06VXnwl2MPBsad0C9otYiLjmgDEOGk',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '_ovU2sjLWIn9m_nHKJLAelbW5b1f2Rc2FPCgeHhVHJg',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'VnYN38xouzrGai02OfM2Lxye3YnpVSv-yN-i2hIuYoA',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'pYGXJu0TobP_rpaDYXnAfmD9XfAiWz8iZ_Q6cp115k4',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'kIS7QAEq5F7l-1270lT5nZ3mXD8I7I0uSqRqTvqV_v4',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'kS-fCTOruAsDS78fKpV7RrtmR94fMa8UWhUUBqjqFkQ',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: '-M_1h9vQQ9vFQlJEroaCOe65d2dazECTZi2S4x8AwCo',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'jt2FC21JMM3ClpXZ_u_M5xrfgC6ZsNDYXGSdOOyaQLY',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'wcGuo6YEI1selRocjgus2CA_OdJIkS3JRMI5Fjtc4PE',
		},
		{
			cu: 'cu22.ao-testnet.xyz',
			id: 'O3lnfn44gjf01D6aJoyMw_kD-HdCe1iohNDDzHz_VFg',
		},
	],
	'cu-23-zone': [
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'A1jlFM_0tJFmO8WSP_2_aovD2URdSuU3KJ7MyWTcx6w',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '6TR4TNCvTeIUqm77lCspu4soVNdjjQYbQCdd-iYOSak',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'tCIurE2VWZRESVQmFCihQVMTvMOEi17f_rqB67dLNpU',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'FjfZrViI9QOWngbnQdl9JjPZ2XuD_iJmoYJejwXd3Fg',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'n9vS1-hol66dQyl8-DhMG2lMYSzONCxR0h_OGaG2-b8',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'bu8VEhQXW0I69AXAUQSExCvXTKNp5Ia1kpAzCYsDAbU',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'iaq4p6YQ5gLEa1TCz7nMhYQMMA86cNOB9-sn8xRYL70',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'NclIG1WL_t5YAavkSqKxIkbNfjWREGENl_XsjMf1ugY',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '4FxProX9nlCFYuhe_Io_mfcyQxdKIPninCa5pipvDdo',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'ck7PHxU_fVT6FIrnx8bgLHz5Wu5ceYHkZbZMUSzhK54',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'tgMS9igoaS_HqMwf8Fwp22n3a7scuqt8qVGjPJ72IPE',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'fUZ0t5T-johJygR1bISFR_hmnLri5j53fdwOeqDFOoM',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'WiYVnish95bxpZmMzXVncCutH5rMA42fO1DcOunckYE',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'snsWsLnEY1UyzJlz7Evxi-GuAa3grsZVfMHaS0vYmNk',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '4n1vU1ed85-m1PyVPehbekrrVGsla6aHy0I6OxmO4AU',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '6jETqkLgdQq491BDojGx53903agirB0mZekeg9oHlfA',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '1pqq9ArF0HDV_sdu133kH2RobPc-gOUKLRcDhThy-cQ',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'kDRM_YmJWz3aSoRsP6I8dMSYJl6ok6NLApScReMMBJA',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'r7ALWSqZpkiYXFibroeDHFEqS5qxug8w3R4YljZZYNs',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'HTN92wySjvEXqptLJjBJL8l7l6a1nYvsDDQLwd2pmjY',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'hUzkLJE3oPx0rfP6oIiC5zm5QLvaRU02wIPVzujHku8',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'Bk6VjIIMgm8Y0u3PywjkTIpqb_JyeqvBkNp44IoIt2Y',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'IFfqwrwS56NLsmTag3jpw-peYzSGs7mgLzz7BXXgOU8',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'LPkFW5yZHUF--MZj0YeeMhdtnThKOe0xN2NzzCoIr38',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'XWysIKSPCXKz3bluJN1Qht2hld0ZVrwFkRjglFxPddQ',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'fbc_qgWRJPwy65kCCORwO81MOXokXS1PPXIrOFOJg74',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'H2HtKzZ1VfrKzva3ExhoYoROmeQycoOjsnNgBEfbisY',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'zBpkcX-XeFQ6WesgLHX1qyEm6uRO68Qa0toa_42qYhA',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '5vham_NvLasdhYIGNgMR_9Rd2hksBXrE32RD2t_GhpU',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'i-VZ3ZbkjSHT-4dXIBkx8PvAqwfdca3FEueu7YaQSKQ',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'v6EzIcj5S_OdxQuP0OIfmusB64c0MxCYOShVMJaUnzk',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '7FGzurPk4hEUfhoRxRfujJWH4cwfwIPNzVVti8-Wt8g',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '9e7YrllDdeJQ93rVxbZJgUqcQjrw7li-lImaRlPTilQ',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '7mO2LSTtBkLwy83rb2ynbCb1nKmwJmXSIS3P_g_cnZQ',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'UwsbsuRzvBO2YsdESL9xOZpF8majslJ6r6QI9f5kCN0',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'Tfn2tA-BvQgQIgC2Az4J4BAYFSyqOq10K-j0olI8gGc',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'ToQ2yEPRxmsyDSCfdbST1k4IHzKPg1erK1bJbLO9SB8',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'VDGrcyD5H243NwWfoTxpZSqx3zwgkQkByHvU4LdP57c',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '717e2pHf-WB-1DGt1AtUx9kJITL90nRl0lAs9Y6vOjY',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'AtadPdeYh9TMXZYxJ3Mgp_5wXy8TN6iYmCeeo2im_Gk',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'diaxEdQVapqLqeDxZ-VTZoM-XS0N2p47YHl8Qy30Gnc',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'LBFUMh7TLRcEWWiZhTd_FaDmAiaReOiPfZdQh5QAVrg',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '7Cz9O2wLc4kZUqkImiy9wiYLwsaN9qx1ONHy41tXMaU',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '9x1SnxypvbNa8NcPqF26d8tEAaEBQv1qmnf-gXkPbWA',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'llNgEgqLogqLeeATgo7aeFXSSe0cGCXUjVqYaDpsAVs',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'd2g6BtSbqayYg9--iVUSDyiEE49fC_sJVHGroqk7tOc',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: '2G-h_pQrJbmhpH4xTUbApPOomZAhrb-9GFF-Z9RApPo',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'mxRIWTqJ1wRmsrX4QR8NSbffgKlFCWQ0t_F_xBFhBgM',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'lXajbmqHRvvK-qApZBz0FclGfDEiqqXxY2x9ZKyw_Io',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'PjkTJEthK11BXlmEhpnMBXCQnH8hvZFDZJYYbI-kGl8',
		},
		{
			cu: 'cu23.ao-testnet.xyz',
			id: 'RKbZwB81n45-8tz7OaxbyuM_QVnZMeZGpAY_cEjB5QU',
		},
	],
	'cu-24-zone': [
		{
			cu: 'cu24.ao-testnet.xyz',
			id: '5SrqYkK6wpvBjUET74qIFs4SaNFjnO3qrL6tZ29ym0E',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'hmeKApvcJlV3AftmOFpYXUhjfoAvXR6v9gLT5W-dFv4',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'aOwBpsMStWTFX3EbczuYwOlNb6pkUuaGZG7vMj6PCTQ',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'cFIDEfyHpOsG3n31q0sxfUuwB4w2l_SRBoqoAzi1xM8',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'qB9SgJrLLnk7rT50KROQZyt07VdkzxSuX1p4IpZoEtY',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: '_mUSkF1NoNjM6mwDyb5qA8c5ulCVOFBaLgt7t6UrrmA',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'JTcoOd_Wc6-j8L1F-6pHdVgCsGQjcd8ZdxyQby2TYdY',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'WN6Zl4D8TG15EDCDBDcdDiKAz8bwKEvPYgIz8_EuddI',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: '9E6o2KYYB50sAwgZUtXT6eTJU8NFnPDmPFNQ6i0bhuA',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'GWZPopSA3m3ULMmVvGNqnhXF9ADtz6BZ8Y2-hoC7kEU',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'Z3qHLDDxHi0ASnW2XEFqqmR79h-mhXIrBLeVr4Tzka4',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'lWwumC81XUspoUti-bBK0GxFopsPVDBimG66Ql7_308',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'pWd7algai8B7FM4-lU57VrUd5uLtPSvKDj4-somgrZw',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'UuB4QnS1L0oOi6jrH3Py6w3JoIrYF0paJ1sphT2AkV8',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'MX27-g7arlHehy5wfnmxR0U_oSNDaB7DUz9TmKLPnlw',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: '7fuHQUGSBjE85gXI2hVtwTntoryC7sXlm4g5D3-ANvQ',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'ylAZ9kvMEpXtoNOKr2_MvNTh5ByzQvq5eD7PbeQCqtY',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'pTnqibHVKDK99sjvTraURaQYjeV7jl_kHxfxfmjisIY',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: '3eYKbuoHmrhZ1gWAR5CWXDPbNxhJLcYlcHwTu8-4nyE',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'MsHJnyRJEtDd64GFK7y5szfRywEMDYQrfGt2bUS9UFw',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'd4XPe1EEK0wldSIqSN6O0scoaz53lbNbNCDB3KdnEXw',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'a134QYRCPu8FjrWfNH9o8vjaMWp8Vltm6gGrvOpQ4rI',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: '-euSY-ZvsUF2R4bQSW6FQRptoSd-r_toOnTB4_I7exU',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: '0RfPD6TMfbBEtK-F7ALGVjDd56gnKG_4FZog1L3cBoI',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'oFF8ImguaytwVRpH_cFmhwszMV9jSsmAYae1m5xW5l4',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'EW46f2SdYdE66M4CnbZ2MI1krhn0owwI2GPZE4tLAVI',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'iw2I7ygbY4ancfVDXJf2_Ov7_c8HiwD8YortNlQRE0I',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'Vjge9sXd3xzCOsccOLQ50Z9w57Qogg5X12bbINeZHUA',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'JHgqoL5uPTlLf1xpDXiEXnHaxCSs8-wEaDUUxkugq7I',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: '1qeaE8rM4WiTIFfaqNEmM-dr7kuzntU-pB6dfOLdMRA',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'tMALfz_wh9sC4u2bUafnWVmDleRz6EFP-aBvNXNc8k4',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'W9qNZGtU4WW2rCZTPilB4tBN6kehvySTWIBzRxRkoA0',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'k-2sMzHuitnNGLlfPaqy3WDHvn1HxUS56XH3zo-Etk0',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'JTMuViin4f_uVcIvVnH9tsPAkOUuNiivfcWM73lYEc4',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: '30cPTQXrHN76YZ3bLfNAePIEYDb5Xo1XnbQ-xmLMOM0',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: '6eU3_ot8dl0dm9B6pUxZDzl78VKfzgDRSyuRumGbE9E',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'aAspEws3zSSPaluvpskf7fcXZwWDqzUA_GIr63Y5KrQ',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'VomCNhxrVjwZhsH4jmWSy_wp8pOiFqEBL7bhfxUZaCc',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'JZhWmbWpZ8aNSkyIQ0BWviaHA5wSoWlTu5nkctxXzKA',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'XDjLihR2RVJcbjoeMSsL4fjy8ghBFoRy0BinocOc2IQ',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: '-bRshcVa8NcVGH3MlwJOBpH2_uqWNaqHgih46JIgBMY',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'Ymb-Rd9ftQ-i-3HeFYISPiqY2J67tmBCVwFj4otKf94',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'Ruw6Q5gVgZ-isWhRGW4LVvTu6rMost-J5SKsF4rF-rA',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'jdu51Hj5NvH93pCrA3zkGQBqg45UBxTKDwBap1bzprw',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'HlY5IIWvz7SALudwnfPgiaXLnlMxfBu11piUFu9SCPE',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 's1fyhXRbcZETbMnEU4KXAiI-wDCpHKDDGyYbi6XPdSc',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'nktK1cvCFeRua5kR1Y6CIaCksCf5S-xVMQzu-u7vhno',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'emGE2OKHWXYcEdkiGdioojRjCmSDAnKWT9aZ1F6NOLg',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'JG3fMEQMd-h6rEtc74S3-ypflK6BS6VGa76dcuuTfpg',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'WzpC9-n2sKguedE5WWYFXK7pLN47coKkmCed8mh8m3I',
		},
		{
			cu: 'cu24.ao-testnet.xyz',
			id: 'hoPA5TBT9ynLvM2RHK_G970KBlzKfpIe5TOgUx1R37M',
		},
	],
	'cu-25-zone': [
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'mPei0c_kaywhKDM1Ksh52zdTDYuFIJZ1uBWCNuuMpoQ',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'GXLuy93t-6cZ4bB_qX_oj-AKtPvQcR7uxlD5gonttLY',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'Y2n9ethTGUwpUcr5xINocDtilZRa0Kim0UpRUkB02F0',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'Mijc-lkDai9bC6L71Izmjz4Qa-Y-4aMJtOTtcTwjVuU',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: '8zB3p8myVdNajVfifOK2_-1uxjjMmEMBGm9c74ZKmt0',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: '--pnQjBnfbb7aHsUL_slRxTaOAZ_bCCcUdE47sUYA98',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'pfZJmpNM9sFuBah25g_jLy4yI7Vzwi82CccUaDcEi6M',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'Tyxp6qyBHjU3qp3PvCf73d4_NrIo6EjR9S3A7aopJw8',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'jb7Z1ASOjftCjPivwdAn0UHqlzb8ignUYvwIveAZWhE',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: '6ajvljBitYs00g4sx8haf0XH1Bztl1f4tVRxoFlZEbo',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'mHNMdlXNOQusryY463FvzFeA5EojXtvgRiHNtafbMgg',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'N4K84cP8v2wTMYDQ2jjFpfvPIUsGXfjd6J8knN40_ec',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'iN6UdR2Er1bp_BDdAau_ch8wbvQFSJKyg9GSoZuyvHc',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'FAZNJ5LLH492wkdJuL8y-HcqL3iPkkCSW7Xa0mcN68M',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'M-Iy92NLE2BaXJAGpannci62-ZUmxnfnPDsoLIaSfBQ',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'ypFxz2tA30LR0jHkJfINymQFi5YZzg8Bzpc0Agc3BNc',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'LNwPrMLI3qIrl3SxnCCb8v9s0fxmHC_eTsx9ZZsuuFg',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'HRjDTzkrX0545079tyZD-hcTNuwaHrI-FDmzvaL6LVs',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'eRVylOCfgGdTExaTbCpK8DtdgVQnavvkqLBrj4fANy0',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'WK-BnvBR5CRHqTiOI-UmF12bIh6QddLyttawy0VqbDo',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: '9iug2appQ8ZtZPWS9hZewgDoKEcJNh_ylmfGESq47m4',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: '3hCw6dIQcJcNeBNNzjN3fLJlJvIxMIEQtZlBuORMv7w',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'bX3CtFkNs_ldZqR82uL9JdDDeHy9EmmyufZVsLRPY18',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'NxMlbr8UnJaSksj0oUqqVm_pjZSVN5lPUAsolGOcZ-k',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'GLTjaVeMV_OJusZecnQlq8WFY-u6InaUwrdMBQAhwSw',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'KbE1mtaG97Nj0UF5w-y0GEzasxdi-eYNS8O3RpJpKFc',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'IhRN0YirHiyihcOXPVjryKC38sK--zVcvKU9YO5uS-I',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'GytuzBU-O33JpUMYIlLOonRbrnjeOCNkp3Ma6MV9MoI',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'hT6jFC_Ftvy-M1kEZWXPyfwYMS0oqyxUgtYEfHwGnxU',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'OZdyVo0ibU6XMa5QoL4y60a2CzzVJHgITm-6imdtzus',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: '5D17M9mLDgPt_Ql8RIaagXqvplYDChG-d5PY5gFqQjQ',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'bOlqAVirx9ozLFSJWSIWDgz8SQmWNwGzGs5byUnQzlc',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'EoEa9uFFu20aVMAUSIsO7Yghz96vDM8UGKbMbgQ1NYg',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'XYZZwevtNZuodmUDyNNP57asE_CndDziGx8_xnsQN2M',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'y9mEsc4WNjOMz6tLjSLvW9bMA_m4A1UHhsOWmHvCJW0',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'fJMX9fJPGEh6WDDpAIrzd5nddn7xBIi9xSvn5M5xgxo',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: '_z6QdptykCpx6VDlnmM2rgQYwHR0ltvQsfpZQhuzAE8',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: '4zGvGD5TI-eeigH1W_IBWLnDcDeKrLIdmnZFmORkqTQ',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'RSkJRInZXi3kT-isxsexcrRDYHAH637yp_tpo-uXLlg',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'VIey3YraETr9M0_2azg5Z4-V5JotGODWXfVpss2Gjms',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: '8HGWOTNtkKEoOfOBhCx68hkOR5kqWjtmGDgm9y8yB1g',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'to5kA3qVBE39l51CD2EISQ8rkDd-RTpYXj6hdWQxkXY',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: '5FxLfctyM-1MvnLYp4yoHVciLGGFKZ194FLwvMTT32I',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'YsnxWqUPmXHgkjy1F7pEP-7nSO47LJ4Pru61bigVZNM',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: '9fx11FUFgiPZcGJdF5E-7Q8160szGe4iywcJW1lUoLk',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'p13C2EdrY8Za4YdpCxlmStB3TDsXiYlEw6Jx1TOZtUs',
		},
		{
			cu: 'cu25.ao-testnet.xyz',
			id: 'DAtOsoBXj6KsuZ1Nb1k8MqGzAMJ4c6DP9COl59Dt_L0',
		},
	],
	'cu-26-zone': [
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'dnZNK_XjLKDjvjRdUKuuHBN7YGBZwjwojDQZidNxtLY',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: '8HiMbS9REYrMZJ4o1XmcL6jKGbAxQibXggoj6pBkGAA',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'JTa6uGdZ5F1u2nMUf6eyAZGPOsTSgcaGsfUhBIr5_j0',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'Fq0JaUurH9mnsT7Nlx9arfoKshgvIF-PYRrARu2Q6lE',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'tuNPFwNxd1dodryobdMQHnGgY1wPcts2MKZTzESaoNE',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: '_sQNz4umVRMTYmBcC2HGDJffrLy4mC3jUBpKmIfXNlQ',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'KsNC56yXhkr9d3x2PJKrhl27FevoyRX-5qUrf6JhfwA',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: '7TJHd7MtSSp-KDQEGd-YbOnvzgqhdSdlzG0spAQDbjQ',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'axWyoi6nJGRcCeXj6FXo0-v_WAh9PwXaaRz8slL630Q',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'cmZi84AA3f717pna0ck-gM93wq1j1exRdNLdt7saG9o',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'dTIoRcqbmT-8RZbwOXyxVRzBu4_Za4Uq4y3uXpi2s2Q',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'mehoBIxE1FFI3LOgchou4Kf1X8ei96LbcJO_k2h0_Ic',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'GEAkKD0PVHXUp3l0G5pTzjMS_E-UQtmDWvMFI71enN8',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'CyrB1l8piffnkegtg2-_umfdwewEDozeAG-Q79tJvnI',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'DUsbwtcAx1L2DeIbEidpqRR19Ai8Ts9ooR-FeKw44GY',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'lYjFGeN5mqtCqR85K2hZBHnrhMquz5pR-q9rFfRbA0I',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'vDeH1apk0WMyMFCBH1W76D2-8tZG2hstwFNZJqYZUGA',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'Z4cAeoEa04WBiGIYXk41Mx_AO9SClpf3qUvLzsj38po',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'rLgxLtlvVTelGLxWGJ5YZIe7gwbXxvZunmxifk0qKWY',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'jqq6PV0J_JHXeEkzcl0zZvL-I_z2rXSz7zHJNLEkKLU',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'JVn1vQDH50n7B1X4Ve4nvoE9LA-U_j7pnHN_Pht_Fn0',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'RMZNgBeHimbunbvSriVJbP0XTGaZX-BeHi6pBmXK064',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'Mn_OABTybTQM2H0fTCj--H3NdFAkwhRr9JLWOSZtT0c',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'GZVluwjNq1Ne2bJ0sCJ54huVAA0uOn1pk6QXvd-6pcE',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'ScMBQR3NIqlKoBDDuna_BkKYfH0HXeZp5N9j3qawTTg',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'PFbzyCkW43PgKrtiy9shNCiN0aNqVV3a8FLOGVWXydA',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: '45oFQdBWFLqs0qK7rOEiKg2T4U7tKTQWnnk7duyQepg',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'KlM4YJxKwWFmGuTnDeHMEHDUxmBR29zOw2hRB-34JfA',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'sEbwOUFdygAZnEC-H-dk6TftOoVF9ZfXVqP8a1BAT54',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'UsXko-QL9uyxeBwq1mU9PVh1uNd4gJfdv7L_Abi1nYg',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'RKnOuAKCI24OsfsPfiztdwsGaJWGurbxWQSlWRgEKbM',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'y3w7QPzE0i8z__Y-HGG2zFnLKK5MW6dUPSpwcLTL3vU',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'hMHgmCbs6vj-AnKMlldlExCRqlxHsy9qlT-FxfipQgc',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'GspPB5uwFfdT_4G65gF_u5ezXVfBpr3uWuRBwjtjnqs',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'dlMdTVH98Q582ATnsGnnd8WOZNIFhYSF9wpSPVogpdA',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'ouCtMSvsbW4jXI_qhpZz0yTpMpEjAEYGiMtpCg76ZTk',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'ucuzMl6Of9Lhk4M5Q7uTLotqpBKlDxyiYkdLUYUtgaA',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: '_NDxYaljiQrpbE0kuqNfFLfScKE_6NiGEatZqVz-NG0',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: '2pHPBmgucBvm63BZO6KdSzx_uCiQZLJcUVBHe1-HJuE',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: '9fmRN96-dePt1MgMBub369eQVr57BJsO1MnZx4kKhIQ',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'FTqj60HdupY7lsqGXWpjiN_6zWKpNnlhquxKUefcafc',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'HVVc4qd-uD8IcOSXUV9T6GBExQrc6QM7kESIChAA1VY',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'MMRo65NNZaDA4NwGW8RSzRM4VXl0S3S-Jtzu81dDC8s',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'rClIQFpZstbQmvaRf2mJRWgYEMc23qqZvJdde2Z88nk',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: '-jGM43wNlWMDAFPRGk8tzCMsYk54vEK2GwP-K830KX8',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'WUTtRVbllWhXX7FPdIEHmVg50EABp4s2sI6JQFIMdgI',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'kIERH7sUbbh5hd2UHKwWQ7p-i8zUHa3-EdTNE4wz_K0',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'ugOzC1RK7tCTHh-FZLifadjBN9QB9QNsZPnVf4Nwm-E',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'Mq-k_kr_vOe84FiCuWRTXc5isyEWDdC2hnW74Bda940',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: '3saSMk1uy864vqYinCO6YOe1HE-7hL7gREM4pkL58WU',
		},
		{
			cu: 'cu26.ao-testnet.xyz',
			id: 'MziLyi11s9E_G9cE8i368tgJ4rf4LnVD_Vwiwb4aVLU',
		},
	],
	'cu-27-zone': [
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'SJuoXdxZ0LB3MIHfT5s-l_zMkn7DeW1c4BJAHFHlMXM',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'A2hDgOrjwRHim04JxYEfuhErxeTrnIWz4-R8Em6YibA',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'cJhzIxUut7lPW3MZ8fePRVtkRZAWOLkOfVKFoTXa40Q',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'D3-PQ7WEEuoxx8LnxBH5G2YdCdWLv_awnSlbFSrfnL8',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'LwQPSyEObUr8ztNGF0ZTu-A1ynnReGZxqZurNH0ukwo',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'b1rJB4Rp6Lw0GsxWBOuwD0hRDhaISeTuFhKEMfXkX4M',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'YaQcIJPu1Sq6PoemiDlAxEcWaSO5zyf86LxrZyx4DRQ',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: '0rhvczm8ZVte3Ii-dQOjTZNY6IRdbY3tELAwYq9ZBQk',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: '4EKBBMoKtpnCplOG7cnXqEH9S8WGBqRHEd4hSo4hhAE',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: '8e4shOi_e4TlWydjr0d9CWu912CLvqRYLpcd7j_wkLw',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'MFDO-oz3VI4FEguaTr8t1AqwtB2nXJzbS3yAfzveC-c',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'UGVn_EYnrKQvPM8TeVLTUMYm8T8gGOvdNzhrIGdZycM',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'ZhwClyGGpvJ9_ehMSbr0G76OGtRnQKj3iOu2NdmEx2s',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: '-C7QbzL-_Ysu2_YsDGymXolSP1o-Qzfhsq7r41msqcY',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'emM99hVVYVU_M4CqmQEHEF2ysuyKy-Vnm6aC9UBmosU',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'NdP0VIl_uph1x-PYu1iZHReQ2netvOzg9RuHrv9yBJo',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'OURGBoLernw8CrXXMepckOF6YKSv4OCiSQkqc-UPhSU',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'gvReFH8kHZIrkDybG-wFzg73Bt1BLFXtUsVXLckRWRs',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'HNnR3PsbCdtt8_Xe8wbIJYf16TTUe-NglZdOdXYuq38',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'OmVtRDPHBYhTPhhjaI6vX-lx6qjmk83MQfEv6Vh5GsM',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'aSR-VYVm6mZumCLx7krxONv2tLm-rvjEGVu4t_E8qxs',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'virEkO-Vw99u3ONISOIGdbbTrgihBH8XkMYJrwJTcoE',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'FgbyXtWm35Gs-KrZlgrWct9ncChegGqj1izotMGgoUk',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'fKS3JuVkoIQjjb5Y9h5jp0ywRFwC6lz-6v0xmrRiIzw',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: '2bjF2CWvw4ZvFaDv88A6EOxcq6XcsqBYi6oQj-QY44o',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'HY021r2MQL9Zi0qSNFAQ9QRshIc2mNPYf65pZBP04cE',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'rpdvrHpccOFLMBY1GCeCoUSz-H-BDGVQb9Y0qomcwBE',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'vAvfsJci06pAIcZcsd3hy3jV6-p74k67cstEwRjU1rw',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'g49D_y1-bAhBSsojcg3FP9ncxEKSahkcMtAP_l5usN0',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'mCufbEujKksaGUiL2ezzDWGd7HZ9rlu5LBfMwxnRFwI',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'N7BGnB58NczWVyLiY7e5vJfDtVKA9vfhOP11dUMr2kM',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'RCFBdVQzk_-h3Me1pXqSPUklId3Tc2okDLeLS89Nt1Q',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'WAATyFOJsiWsEqXNeINySEqvuNl9dMbcCqRRw6j4Y6E',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'oY401tNNEmSRRHBCXCSH1XnRd72BCEF1FqtzHJHSraY',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: '2o2E3CVztOaWehyLkUgi3jOdhAtdPi3ion-KYtX1NCo',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'G30nmdTL0PMOL0q24O1w1pn_IMX-J3m1d0u7YBSzyh0',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'ThMOrjrv8S_1tkSM4yqpEqyiupoUOxQub8vzWrCIrcY',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'NsI4AlNvSXghK4eCVTVtTt6pIEoyDaEQxxLnNQtIOPs',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'N253P9wf5hJsWMOso_sp7CNrM8TXkh8TwjbWrndwgw0',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: '7o6XeOw73wZUv7cs8TAMVr5mrOdqNeVH_5HINXeBRLA',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'vgd2uJGWdgXadkReXybmLdqTcWWlL1G8LHM0BfJdaEc',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: '4rvUtX4lLC4Z75u-GLwiAHCc8Qz_BvAbbcNMqWnPqyM',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'Z6I8NVL2NLstT_wc4mVe7RDG7NOvJppNms0Vq_QzXVs',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: '6zoslQS65Kxooma7lZzLIOQQq4vjT37iGr8Ra9763nA',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'yyQPlWaCFlpCohKk3yELEODvJiXa_PZoFU3fIH3O-Qc',
		},
		{
			cu: 'cu27.ao-testnet.xyz',
			id: 'y7AeEy8OGik48foNPCMh_z9CqPcggOJq1LgG-sZBhu8',
		},
	],
	'cu-28-zone': [
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'uNcY0ldMilxrRjyvSrNnamQYWU16G_Av0XyUDCj8yUY',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'vUfy5nhqxmYSE8foKQfJzymKKyfPGxsh96XV8DcR1W4',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'cxw4KpyUaALwtt4S34dGgYbAJe5OAoEroZdZ8zfkERc',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'ZKOtkrWw7l_hfjmUUYKNrkbE9r_eoeOghmlPyrG8hKA',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'eooY7CgQ-qM_299Xhhhpd-Gl2sA1EveKwDmw8aefELI',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'Oy54l6RrJQzdZ1ejMzckEOb4XdOmYmWmE6pNoip-03U',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'M0MCVQWJ9zqY9q5noKARiYopiORfkRciL5WbIulgkvE',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'bZv-69GdOLDKFxTXWWZATN2FKpiwlCD7M1QR197A7jQ',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'xi4pTIr2B20jr02bVwzoYRNL7KuM7JMEZapS0BUjc-4',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: '6IOWpgLVc7g63h_ugRgaMqED8xB7HOaMGHYXCLZVWnc',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'xvxMsUg1osYdY49tZWzAc-dUkkWGD0XISbkdZNYBhVE',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'UCmuW7JFtUHEBG7a_vy9B4jC6iYgr2SVdIdF8xhC3Wk',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'ZeDHJkMMOInKSQtNhvG-j9_qzNaAFSBoajbNJg0926s',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'flPk0V0Fq8kKO4QLE940DL32eL-GvkSb8pUxICF42Nc',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'WWIPExWnXSWTlx2bO8tnwAw2fNO7zwWHLyuo6kzR1HM',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: '7NsrLvwGZklUyisqCLOg5mfsRghMJtBlmHLH2ZLcbJY',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'IN9RQW4-aS9xoW85h7Ye2KJalH95QCILomKcXZVag_Y',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'oV7P76VkWYUifZ08U904myHFQj7MhK4uQ61b0dXcNGg',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'XC8C3dTT9ZA1xmhO-cVBtNxNoJiClOcKqQ_74IqxBqQ',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'HmOAy8P5qKy5PlD3zlxYCW6RWE1spYPpCi0X9ZLARcI',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'YfJrIADKo0EGHMboVFiGNEsMKxc9ALH-UroUJnhOsXw',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'HKa6XERsZClYj79g-CPu3JCmMn714qjPy0IeMz1w5_A',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'HhNNKIih-v2bcYMktX90czlOR23S3NQkSsn4iWHQLvY',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'UR0VoIXvumx7vuwTFF6no-xOqo22OuTOhujmcKQMfgQ',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'apHhyzL4pknasmmLC0ob_qGWFlKTKb5Si1I1ngxhaOM',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'HbMx5PrT9RkoLbc9G5QQ-Ds2qKACb5bkPKb0G56qi68',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'Eb87m8cazuCnf7BtYk3gQO6kiuhEZwPNL1iTJnR1MdQ',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: '78ah6G8_y0IwJrZ4C8n9pGOnvK1r36Ef_F5zTx8ayT8',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'DJpYd2fdcJoag3OElTLTduCpUnmbb4tRpDZ2EtOBdyg',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'X5bZ_HKcYVJeR4Tl-xxZIKmYp-duMO6OHRUiGRr0Uds',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'b2baR-wYV1Uka_ncvr0DHoQbiI85r9LX1CYki3B2wgg',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'hK7gsEaeogMhSQ_HvUXszwbGdehAUnquK7OIvdfnjkM',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'rJk0ekisPeqIixlB1SrHgxkKQvI6CWammMUU4nFYIPg',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: '84KNr6R_ItXrGfZ_t8cqkJzYRQXOlYVP1xkTOot7Ylw',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'fzZ5YMVYgW_m9uK4jrjv2-GFbrObsFD2t2fJqC8S9X4',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'zx8r416ezfmQEsj_0qzgToCnDlmh-WGvritNEeY2leI',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: '3Yfv7XmhRfoFYmch4EjmV9hKmb1laMU2VTLL7IrtfV4',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'dNVwr0261KxVrMdf3CMMDzLZ54e3ltKA2twB5Vfc5As',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: '-7-kIWPs0S2nQaiY6zcxcAZ5X-_OigYfqZGQV3M0ubI',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'D4ui7pzrrcE1C8Jwp5VO8VaX39wo4rc8qbFQzfq719U',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 't6iWAK5pvq2_hG5z24NYTWXkO_PVJJCNGwZXPWEBW8g',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'Rg7omFwkt9PNldG7YVJN9M0tQ41aML9PFrpqOLFhdDI',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'aK149n_PRr7FTQ7P6RjIs5hV-bSByeXRFqVf2W-kqE4',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'L1fxo8LYsF-fSoG6us4SQEHd4bAp5f5bl-pqdhKsdeo',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'tSXZ0jsbfeEoc8Y8OHPkGIDWfpFYyFalzzcJXQM4Nok',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'fWQrWg5wjybnSmD1l1MwXitczGlZXY8dcSJ66DlbaVg',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'z4sy1albeyNZDx4tj-133ekdocfG0lKJRt4Q8zHeDPM',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'u2jgskirH--n4gklq7vYSiQTvmlNRgBCTTXVsUqQ7jM',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'DMEUq9gCINzkd5zEnXjLQQ5Dx7CCSMyu6Hh8-P4fV_s',
		},
		{
			cu: 'cu28.ao-testnet.xyz',
			id: 'N3_TjuQsRbU8b3xgo9RX4PgYjPCoHGaANNjUeFG-tZs',
		},
	],
	'cu-29-zone': [
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'kOL5_0VckvzpMshpgj60tK-FZZRyuQRYfv9lmapUGkc',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'mfbRyK6JRUdobDcipyzQJWIs67V307Ew3Q-g-v4NeFo',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'j_P2SbgM4HZ3rKFg6IL4RN-7H3gcvKqOJ-HzsJDqbDk',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: '15G9YTfWdvS7NurERF2o1oviD4IxSzNLjgYKzYfdVqE',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: '5rIO2Um1GBpcCdknP_WubfzSraXnN9WIXJ-12OcHr8Y',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'pqvWD7vitrSl4Ap89ZsLy15oHzWD5LruUnZ_mChowsA',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'GC7_Ak7lh4b3rGACBt4m3wWR2rCueob9MXFCrWOBTwo',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'Qz-UOG3lfzcCiAveEHBTpz7ViGCZ5c9wyoZALsmbCU4',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'IRDZx_kFPV-h8hxFOrFSSgRwxPw_TFu4WABAIF7VVKE',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'swl5_VgyPWQrqvvVWGR3mwcgtvoLNAePYkqRwleuN5U',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: '4hR_SRCNKqMbif5_salFjxdqkNd7WA67Z82zlrFfE1g',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'QOWbyEUz-yOj7SyhcCI_SBedFHxzPFma0Zidko8iEGo',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'cLUJ4SNml0M4416DK0FXwKRc1-XZs21pZHPTONzQ1kE',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'IouKMl0RB5liGFSj0v2eNJRCc9h7uUcLkvG1XCq9NIY',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'sXyLiCD0yfEHXKPAHH0Att7i4jSO9KUEO25kKv10-kg',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'Zqy4Hc4NLMymO6PlleQlrjH5zfMfC3hk_jOa3bXgZjA',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'KJ0Rn4I1JKYdPgEfg_0F551vALxujQYIHNFEVKKha68',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: '_DwqZ-2e2JZJA8Dy5Og7AsLfX8HvnNhpT8g6_kD9Au4',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: '3rBbVjNSEHruq_tWcGni8yprBhFfoc6y3d8L1l4SegU',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'IUR9goHh49ospFtEnXmLqbFP-6OB354hW2EouO-t00w',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'uqqo4Cx8J3hGzwo9wVzK6qSbtEA32zIdPrEff2oAzWE',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'o66vYvIcVtPY9_7SiEW6AxQzomfcRRjEfxx_FzXo468',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'pWif7PvEg15gc8XAF965oF-wOVImPsSdkBlSAO9BRxI',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'nBDWRitpjjTN21RUExsVfdOb_xQJ1Xb34ODodCRZl-Y',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'k2aQWhbdXvmuLjC7FYzwsjZtJXKsV7rujLVsHlgKCNc',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: '7XeaUhoHSFIxxSNfaqR6OEaZhvpd7HwDTXeh_TZMEuo',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'UJrRhLX7Fz57bZ93ZfnuUlC2u_mfoG72jsdllPbFbkw',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'BsYLnwMJRzw9tr6TkbyuZg-s-pGgl3maOErWk9GFRbM',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'V_f9n00wktqx_sudE3Icb1mbGvksRiAYTuBZqEmmBRM',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'GuK03v-1SicPNMbYHBMenTdQb81QRAriob0Im4hI46E',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'Tynpz9JonbXBXOFaR7wyqM1fSqnSOKbAtop5uoBBoEc',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'yMKUC_B-59EeQ4gYSLyql8ThFsDO436WP78DLk3ryGY',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'acHvOADOLngecdpLA9iHAalw8Yy1631S6qXN5aANYws',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'ChipJLUL4ToILbntN4JQKSRZrH3YouTCUZ0t0V5pQUs',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'QuOQ1Kz6mIHuYJAXvvxscH_899PlfSTRU18oF6OVQVo',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'rOSrEfSUwLhO9NvEnmbctz0DlhxbCGALG4sKCn8TxYk',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'HpKa_1G9vaOOIklTGynfdUTwCL7ZYoVUXXrexDF7Dls',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'mmaCTTW5ncjxoI_9EROzY75qoJY2KPoLgbLnpITlwh4',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: '6aihzK72oq4GxYQn_md4v-9uISmLc1acflXeXpFWy48',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'LEJ3byW4nTBjTEnuArWvQbtx7dIsglMjj0lEUSWa3wA',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'uk3lKL3iBdk-amyTAQPsb0U7JV2wu0vcpNi5cuD1r8Q',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: 'Uqj42IS79m6im57qLMWC_AGv36BOpVn5rrPXv9jQJmw',
		},
		{
			cu: 'cu29.ao-testnet.xyz',
			id: '6ciL94q5PQQNUlc3rtvjxtHS7mBEnbFouAnNZbeWlLI',
		},
	],
	'cu-30-zone': [
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'I18JhloOkOGa5ZS_LlaE4prttFQfInB2KnowhXuM3-E',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'JsroQVXlDCD9Ansr-n45SrTTB2LwqX_X6jDeaGiIHMo',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'ghbySNQ5pyft7ISweiXTOijiuIF0dbJf97D5ufxUuDQ',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'VX49G8zdk64lrE9LQHb3zhnWQdNxlPPE0UFSY6INBRY',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '-S_xoXFmHyJR4uC0tem3x9St_vV6Wu_jcNFfaCiZ2Pw',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'NP4rYD3us097b9wSVpo3ZxzDyws8VebzjYQUCAQok_c',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'P2xg-f6MIlF2gTLZ_uCvS8MN1pk8_ColuaJti3vrCWQ',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'tcvBOJKGK-ZzjLKjgBJwXCcDv95nJjRLDmmmhXQY030',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'zSU9Ux02BxoeQNK6m1qWqkhCBNU9xx97NokoyOCBIok',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'EinHDFcT953EbrTBecK9dH92xzjUFvbFsgje0ncpGMQ',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '5bghM4nZJicAKHR6lPQ4t2sFcJ8bAB2PwCJeItv2cfE',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '12loE5SVpOfULMkEezbJquF-B798ifc2pzCvwIVZ-BI',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'BfEse6vVsGgHRjIfTFErU1QanYhuwdiKrDHEv2LWLL8',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '_Nzu4eqyRC6-KZX_td1hcLXwmam3JBelXZWvtP1x0to',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'SQDBr5lB6Z95J-jSm5toOBumAJuCEnigePLSbYBBRRE',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'BgeZylvRdp9HqGVobs3S3QFhmaugL_uKXPXHE9tpeS8',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'HsmI0Ti1uxqKlxZi1nedExnZYhNSHZt2C0QIv3FuTJc',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'C3hHx6akjsLc42TjxDC8_58iT--ihExkaPgSx_ljdGI',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'IMkHBluLfKXsF691pUSdUt1uExXS_cKxT-6AezXGEoU',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'pulMZYF01TmUEeueU-cxhyCtJpM0b1yJJa0engq_CA4',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'bAbGIyKVSc-WFK9mYW3g25jx2QDUe6k8e8IAXej4ljo',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'V4YqROmrcjnLwe7MXRDQvodPaO_Om4mefNtOUQ3jb9c',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'T18YsZMcah0u7ZEtt71AT0XXljSHoReq3B1oy9iSb7E',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '0CIyR7KiBMUfuwiPVQPsKYVMIaH-P0hR2wWSLedOwhM',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '5gKwqZY-iCm5NT3G8ENbJmUbcgNBqveNQGSv_g_UIZg',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'Cge-oWlgN1b1uWR0pMJQmmJh8rV8F2wApd9ig6bDbbM',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '6i-VMCQ7p_rlbbpXONjPfoPnczZ5vuJUFGdE4aWj_Fw',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'bYXLISLaLiJBtbJtTxGEWYaFWv1Ebkl-dLoQ7T1IiBc',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'fEWohjzgaHNQZbGSCVTs8OTKmYcGTCdF28NjygRiIjY',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'G0JKlRNCWEP9W2yY3xOqq4KqlkqD7CtvJs-7hogX3i8',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'Oy7bcE_pt9bmTnZKh5qtBF86oKnk1mAl8Sbcw5d2izE',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'cfWoUJjoYdEWrdZCuRGN8CleRyBIXSXXWKPLu4u6WVQ',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'NnN_TpbLtwWl1hty82vW2dvx75bpC6RKQrtum0LRddg',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'X6AM6Wkb7eYp3XijWJZTblK-9433OPWRO_J1sX0Ryfw',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'TN3sp_WLDJDtfwo-ZgMppEuY_1XL7aPx7u-sitPLDMI',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'ZZvlOcSCLeCg0IC-1B5p_fcGKaA5a3Bjd1wCgW66Hzs',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '51NB-v9afKuPfDrFQVVfRvwjJUoun42CsnN1XiZLD90',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'qpNVnnCLDfVZU-MzKGJDve3lfMTKKKzsKqlbEFZtUc0',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'Z30Ber3dJ7xilPi0KvdeZ5jo4HpS2_dzsthGrhCgORk',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '2ObXX2Ynq8rntzCDpWe01bUPNbE7U9PrlFmi-urlmFs',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'wp56WWMc6XrHjtbdsomjEygaZTIuNV7-_5-efmZR7JI',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'YvX920zAgYeZAPi9wB8raez33VHL5ySUJGRuwOc8dIU',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '0Ym3HObX_wg-Mbjnok49ONPJUhivF9wiD4pD87el6sg',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '2xJULQaBAgYVmMEkfJ70vKQ-al9LOhXJbjpVZE0tQOA',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'kKORGbGOjGtzxPjfnOIQpIjpeAql3LeHbso4WQpdsG4',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'bgXF9FA1blcRRs2Bi5_ZFysN8psJ9OAY2QVh2Nmkxks',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'J7SejrdgRRKwTTXEn413-ZWVC5cS1C4Bl_xObijJYg8',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'lT3OCJRv0ptZedjDYjZ37SejRfdbugF6GbWTZQl1GEo',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '1bZ-ulWR7j-jxGymlBlzcI1SOTUsbYCHjQivxU0LmYo',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'Bas3QkCAriI9fiX_a1kOR9sik4Zno7LTo4GpDEjXHU4',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'O2ej2RKPxsqxKf1YE5BImjvE3GzotBBA5uH-rf49flQ',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'gE2cQJIO4ak2f4qA0X1CNC4J131f6QvAqM7guLTp1Fk',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'nsbsOuEPG6PNokDB0E3shccILGdIyKRI4PVvL4_eqL4',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'Uw3K9PMUGnr-qOYmT6SF6ZQmI2mnzEVuH_nAFX4URkM',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: '8IYfGF0kI3vuXTrsGj_fzBIUO5P2OeRcZdfjmr2tbho',
		},
		{
			cu: 'cu30.ao-testnet.xyz',
			id: 'LO3uo-wSymRZ6W8zMC4X55e3NR7Ow2gOOozItjgiGpc',
		},
	],
	'cu-31-zone': [
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'I0avt6lB79aHlzBSLWWfGhwMw-t0a5eby_caGSBoLMY',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'tVj7YIW5cTuOwONBCsPjSrrc1QhYfDPmqErZ2XiATEs',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: '3PkreBMOOT3X76bTgg6TcdgbxQMAT759K9cU48LCAuI',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'luAAELpeLusOz0HAkVKMDy1qmXJOA27uZINwExuMF4k',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'NrF5-uB_SVFY3sr4ggsGywLRlZ4WPmvfxGMs4veI4pY',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'W-l4D8LmqSCzr4hIgy4N8Z4NxfYyoRZgR3ZRQVjmVmU',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'hg4YYPfXGNbsNIMFwkfNtxVfNriVz9yf8GGO4zs7izA',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'KAeJw3qbrrI5jcQ4-Gvp4-kHLvuJKB5KIaHdhKzlHeo',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'Of-P6edsj7ZXbicNDFXpCSeeYU7jYVYS3_rN18wFJEE',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'pcv9R9Q32xayTLgezLGk0eFJ-e6BEepzQgCUwYv_qAw',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'bK3O_kZCDARhkYjsoPWjXCkQmmfHNQzqaOWY_SSw0-w',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'PqRrzxSYPgcQuLjaoRkym6SBPmGC1kkd-oogmjC8aNU',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'KzOeVnu1Fn6mZ9WV9ezc4fm-A8rCynGzBOODrO0xODI',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'GvF0TY8_MbS2PdPJUvLPuk2pQcvpoD44bm8DHStPgbU',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'hpTVrI0rzPvR5TfkmyXkkfWLDJ8KHSJ1BZu1mA361dM',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'sFiIrAfReZXSYYlWZJZR7S_Fa1NI6iFu9yJJPLdciEA',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'ZjfCDu_URiNPaKAY-5t2_FlDLpNKJYWCwhp0HwQR7co',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'H-2-fJrNQX3G53ZSihWBNCv_bcokKuW-dFJ-mAjL6ag',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'yD-AfUAPEruuYk3Met8wLcCpulFw53bJeJAhJkh3vmo',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'L9sBq7nIs5Cp_nah4jDpONC6AnSS2trzibSVxGH6hKc',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'sHwFGJ3mKgH2eChYbVrxJC_RUVe-QEXu0nYNHve9lP4',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'nKm-rjaWGOADwI1Df8axfaZmAmecNQR9e04677UebjY',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'cO4thcoxO57AflN5hfXjce0_DydbMJclTU9kC3S75cg',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'CELCrgEzlKh_iI9Q6FXNkcehc4_L_Wl0lsk0otWU13s',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'vkdqwQUQ59IfmSRIvzLHfrF2Hs9Bk3MWolAI9bKvDDY',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'L_NkeRskMPwG1SKyQnBFr2QgDWyVVUdYBV0_40vWLfo',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'PF5Ofj4qbeOAeZBSEbJQHhAMqnwllytqDfuXBx-T9sQ',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'a_nBq_ZQq7Vh_4FNRTWDmnXbY9F8iQAH9PHrljyaHC4',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 't_6QYOCtd3f0n8QlVqcyHJPROE10avJHAvz5TUvB2Uo',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'YpVz925sOvcpdxiiscyFgoliNPm-t5BEAx-WcUnlT3k',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'gJUEGMJ8u4U0e5WGLeCkpG_Wib4TqUiQfwXsmNKc2GE',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: '_WhVW-1HD4chJw87N34U2sYaItB0UJM1Psn4bflyImI',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'uJrffjNzHarGJ6YV6fbAuxgjUFMIJ_-yrmqBytyyo5s',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'lxJ0ybjQYRYlSREXrPDN0D9PZD09Q0e3t6GZwEX3Pko',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'MLOb2IXw1yP--hvTwHDVFdmX6bRCILwN1tcHwwhx4fw',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'yNXoHCY4InORm5cgoIKh1592-5JNNGeTqUaZzVTo_0E',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'HdCh53hwzr5tdj9UfJWi3mAIM-HJweMy3rTgpMv6Vvk',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'l3qZPy1rIql2nXv3dwbTscSzET2spwbTmCYAfG_8mLk',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'edsbAxIAmT_CoaPR8orRQtJFiA_BoAKM54aZQccnk_Q',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'KL05PInvG5tno9yIGSkKaD100i4bmeGCSnu3vEq-WLc',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'W43GIe_GAVhbUAwLPol8qwyN9jr3WAVZmyyzgNtuJ3k',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'ilm36zunX0hvjs2lzVx3iBOY_rPKPZKhojG49g9d-Bc',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'YZNQzA2Ef6sts2b9cTi6fElwLqJOkjIGaiatmgwFxn4',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'qjMvXDtFvioLhEK648mZBR_dCDCv6OSAiOhBEguk_uA',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'dFSE11SBMxvGl20LBE8gD87FgyQ0RYpkqCjZJJOd12U',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'hPGIDFnvIilB3sI2_t0K6IUtwrviF0qqfE3i0vnh6O8',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: '-lUO1Bjhcd3_V5vF9AlCTtHc02KQhF6t8QDtSZZ5mzo',
		},
		{
			cu: 'cu31.ao-testnet.xyz',
			id: 'wkun1T-eJ6l-U_SzUVo2ZpZDUxjfyevmKXBIbWwYGYo',
		},
	],
	'cu-32-zone': [
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '7MZLkuvgcS8FR-y5Y9E6urukN0OJthmL6CDKtnKfiCY',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '-lDw1zyVMh4-uCZzO_FqA75kcbpNAo7wl8UFNIhSNPI',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'URzn9lw6fCX71aqZZunNWPp46DH5ju0TCKpdlZwcXDA',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'KX_aAT27S-t1zTU6PnX4JGNgtzOX9-YCbPr6mgrAtz8',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '7kD9U3qrscDcoLJgSlsjpIcPW-TnHqX6NZEa7Eb10-Y',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '0NpY2pBSB77BgleNHugii4W6H4ZQbuRG6SNqgTtY3C0',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'FDyHoqhfx54KUfmthFbPbfduw0iSmPiR5-9em4ekot8',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'J7XhhwT8mVY3DQdNNGZTSvceGvFloIvjOGOwlK2Q22U',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'NJ3Bn5J847IGo9jhfOj_VDlLerwvWO69aTrBzjTHaPA',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'ZSaCIcjGu5eBNmMiEWwbhv1BGtsCur_3DdxnJQoYKWM',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'FHE6jw1z5F5-fl8pC0SGnZYVIqIlktdVSDHVGnYeUyo',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'mIfd1CMYXiU7PswlEZGVa1bS7oFKFAOL2IGph8K37n4',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'DiP9P0vRYtheLXtToyFiI87tHpdlX9k3YXKlnzXU6cg',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'ui6U-KSIgoD8x_KavB0tayi3SOKBdaHeBTQTtKnKtY0',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '_R3O39vbPSaKKK7eUMC03LMjs8kkPbHo_sAT32iIEmQ',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'ktlLEkFQe8xM7S6KhunE4VYgDgDqSa6C_gqT4oThiU8',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '2EePL2voPeTBJCx-IIAzbZjWk7VUPyZKcqwaK_0S1xw',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'sLpSSIT3wLRM-lbI-8vcxmuxp_NnNhScZZho_PIB9mI',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '2tIcOWQ5A8l3TUFXmgmFyg8Sxldo78gUJHwW6pDYJmE',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'qunTwKknCdBpgq1U08P1Jtwv3JaU0jLxLLKk4x6ETdQ',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'Djv21sFIqsJjLE-tT8iQ7GHbvnvP35gZ3MzaSNl_820',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'GAFPpIM-LdmvasCMR2azWpR0Wxmab5oehebX6tYo__c',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'QDC1UGmZKVpYBtSqkOM2VWVU6WwjECPhQNDgjDacT5I',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '9hKpNkMABRppDdikozDDKAwz1MRLJ0I_tGZnZQ29fhE',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'eXTyIMxHAaXWSoYWZ0PuWwRH8msr0l8GGxI-LIR0r9Y',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'xyEbSnwEMbpMa3BhmwhnF1k9tjHLdfvpoeZP4i2nqjU',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'cvbjztrMOJa1WzFZN41KRmeDqNmS1W6s-SgfpO18Hkc',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'e8WqiuWaDJsBPgDniXLW7R1-S_YpuOmi7n5naM3MN_w',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '-dD_n4Va-6kucjYEgRqiJq87xGUaU1PTNuTSPILCAiI',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'pdXUNN--VaQsffMriFtMQLxauthEIaUnrT4-zM0bDMw',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '0A5Aw9oUxu5kkVxz36F0khMsKW6qpAbFyuJP89CGP84',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'cjgPYnJIocgwywU8IHYBikljJ2D4aEND6B2BMTJlHZw',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'iMAJ_wUk_ErXepCMFvgmOkaCpTDB2USWmfcjzTInyRg',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'LBF4XlM7ti93YRUstPZjSH897PL7r7kh6BM0XLmMRVk',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '4rthmDI0HKVEmtNAZgCZ9-wZsCN-2HimCSfywbopr-g',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'XfDTBFYpQ1AVyE3q9Xz9xwCx-vWgfPb5dwejCpljw1k',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'Eiz09d_R56n7xBypEmUpG3Y8V0u8z5rfERky1XlGwCc',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'aVRMh_LVpVyAZxedPPVI0gosgxWT0BAqUM-W_y0eVHU',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'W2QRom4ORqUtktUYklpqa7Lm2tG0uKlUbUgEpkma8zI',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'wkvXjPv52wAIkz1ewOQpU7DRwYOL2DQI6wrowtWu4HQ',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'F3dy_-G6CtSR7Emgf_EjxowbBxj-XcgjhV6yHkFk_dg',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '04Rh6kGdTvU_wSZm7jxMlgVDBhl47uc90E8Tkdt18Uw',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'D5eSjznK6trTjqHVzh2T3AnMTM8OZulGwxzg3rBupeM',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'gcxUw7st2DciSFD4jPWBmbB_xhNSN8d2EJLtNlDyD3A',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'a8mAQtp__YYGXyf-NWeQzRJFYnQrCuPtVxuw5hmfsIo',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '4NVlpW-2tOeM5gMWVGwSXBccgZoJeU3UAaLrd5v_Mkk',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '065E48_hqoRhRevWV3Po7f1RkPK53IALm2qK4TZTCP8',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '4IQC9mY_izR5bS3ToSR4tLtut2bTFFpXZZqA9xk2k48',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'fFEpGXOxfksNmYdviHkiJYIUSsn9oNv0MlKJNOOLXuk',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'UoJeV6LYfZI7feOgIJGlpTvFSeaXzTEKt2xjIf0kIG4',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '5LtTL5vY3NKm8DXD0TGkNWMn1x4GbTWNYLT6Upuredw',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'FA1uMrDzCNppOQ8ao-T-j4K3mj-QKtQPBOcDgC2IY5M',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'q7XEuUwY9kScT858NYVtsSxtytpoFAd_CwPOfOR1xio',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'yzDJynZvjV9h37yhsnXTQsZ1l1S9h7Diy5s2k6gvbeo',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'b6Lla8aveIZJjTfFsqvmxAONoxEvLTOTJgz5CXgsHNA',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '1kxR-hEmt7rOPDcOP_bV6QWfs9fwEN5QAT5bnyFuEvA',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'J6FExjfbnXA-PtxGrwKMxDmkfnQUzAt1GX_kFnaD4PA',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'VjlM3ohnzf0O7i6WzdXeCBLKEc-sHYZJ0THyBMGQhSk',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '8mQQab4bNtLBmn2GOU92goI8t6A3D47CnZXrPssB6Yo',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'qAIZwG9EhIOkiWtZllLW157DZ8zotXO3fy52z_wzCZQ',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'RrNXpqFKCMsa5yT4V5sQW2LrFIdvfaCOC6qysFFOvUs',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '11y4t5_4-zPlEj2WvL-sH5UfIJDF5lNal0zJXIQmHG8',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'IOoxscGqIxZcO3MUSM4F8uVzgDzantJMTDxQVznhvBA',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'z3T8aodmH9bgBaB275KNJMgdgQK6CBI1tE6XU_bClfI',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: '6plrtgRgvqJLH2_1uUBikY066-60v2gIg15WK1Pj3Ow',
		},
		{
			cu: 'cu32.ao-testnet.xyz',
			id: 'RUGobXBK6mnjefyRg-yTA_RMKkOPKt9wvGAuygN0jL0',
		},
	],
	'cu-33-zone': [
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'hzvPEYB078DiJxs-0d4HKxjmeI_3Qz8LdQiZo8fKnYg',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'QwfPH0IkIjMlm0Z_uOICAcfIVF0tttCwZWIqm3WtmiU',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'F7bKcPTUiXUFBZ6oWmLiUY2nksIfObGISlLlWj7MBNE',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'b2-F90e-rNasAa4ZChiNMNdSxSJv9sqvomxPDkO5Tks',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'zkdlI6PlL8dN40oorT9aFZNvwXSAwSqvY--eBBbqztE',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'ge3fE2WaLbPYAfRIf7fRMC_R4A2_V729Yws6U0kGBy4',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: '7qgMCIFCwSi3LmOWXkIE0sNs46t84JbYW7SZ-vUTwIk',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'tTHwAovvcHDzra1gLyme-3d9xiHD0PFldq8SzmLmG4g',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'yOruFExrROcyMXItTYtw-YOW5r3a8Wc3C4hc_C74VlI',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'SQbp0kouDPePLvu74PJNtr61EaZr9s5UQIzGz36nz3g',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'm4Jv-ROCSe5M6u_tJdBJeCNZBvhFzsPk8c7pfW_3b8Q',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'kN_O-r42ZEJZvQXep0cLVjYhoGB1KKBIYJgqlKBNovc',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'GUJI7zjPoJ0uAHIBWiYrKL2bpwfltTZFXNL4J-IV8AI',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: '9lGCLndCsEgqDxltfwlfE5I5s8OSHCtNfbnIl0xYeWA',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'aYgVf1FOCTBKRLtC-IT1V37sFRgJoZ_ltL8emirbWsQ',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'tcT8k0lkJ2tRyjMQy0oQOmvLdxPWMxaZeCe7Ee9d1S0',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'EXLE2sB5L65Mwl6wDvL6tcqZXDoH6cylJ-1It4hUoOw',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'iiPk5KR-sUiNSdnNNvjPzoTKQKTZ5nRk35pG6aCe3IM',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: '5_IQiW1293EsD_7yz_21UjWO1xzp3kfMcRY7jsiVGl0',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'gDTQKga2JytYAMr4Tp8IyqXurWbBhllLTm2uc1t-zAg',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'NIA5UouM26JBZK93oWQGobKPfoWaAvJozlWqBk49Nko',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'Ui6YzfqVry6SlTVUFWpiFl6blgom4mzu5P3BQ3ScKCE',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'x1Q6zDsHmkRHsq4jRgELgUZr7ls7ed5romCpmZG3F4M',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'akACrJAuxiyVUcMOTrURmRcy0971m8a3QBwy68IcbkY',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'lD0FP-15FyEVzz_El6J79kMrh5WXt84bBV4bgThR-3k',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'ytokxYwZm5OMUfbmK5Tyl2_3sRPOMAlBYc14I31E3pA',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'JhQhS-nikrXlSHClKpbj64XFlELWzKbcIcbkOxTz1UY',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'BjH7ltl_V65AwxauoUlyHr384Tir13BkkXJY0n_ZGHM',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'OF3TuQgd3RkTb9HSs_V94vVPFeRXi1h0EGJhSgda7OI',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'XcP1pL2cEJJuX5XplXafYdikOtaOga6HAt7C8rmfz-k',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'W2zyre9crvPfemVJ-7Vu5YjiZ3_hBFjXx5tSkk8SE7I',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'Ke-9t_xAbv5pGbs2rv1oeVu5Cw5De-CYlf-eUpTcMAE',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'F7lSoRiKr1p2u3cdsSZ6HvyJqpxMOPGtKPJ2Ze4vWbA',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: '9lfet30NT45E2VCk8B934QJdQ2DAosuGda3qCoy5cYs',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: '__ay-ciOhopAgYUvns2pyLY2E0dpgJEHYLY6xPLV92c',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'aX3nPP58jkGn3XgwbMDJS8PTfXrZWSQkALJrZIpi8go',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'F4GzJr1kv0jpO5SGxs9TP9UsCH7Oq29PEHINKenA0t8',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'uM1IvFDQISnXuMzpx1Wgnu2kAvq9Q89tR4cYI-xQ3kM',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'aKN7IGMGG9a58h736aPhVIXHsZZXLeVZwkqtjx_KegI',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'BkHcdGOfEJGm72y0PLDwgNZk8L9PjUHm7txUItWrW4w',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'rqiMb9Oy-h_cGwQFydgAbl5rTyl8DBJy3IxkODZ5ejw',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'HuyireMveI5efFuMS7Bq4ZLJoo1Cp5Mp20bLALnuJKo',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'Krv-6BZuzNampH9i93RS1uDBD0tgNvOXER6arzjFiqA',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'CiCoT60SUbCAJYY2ncv_-BJOQvGB0tHib_mTLJv4Q6Q',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'UBi2ArwCoTN6sg0V4duL5lSeuBuCJtbErj_eNTGfpgQ',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'SPVAXzhUi4SPnHy99dD1HkrWLqM9FAPHioHpCIaaM-w',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'bmJVHtywXDokzL6FuIMKBQn0MvfUF47QLKHEcYSJOew',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'Fvev24_loFJXAopUuiyOqjW_mxbVs5LQYSxQp52uOF4',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: '3IYRZBvph5Xx9566RuGWdLvUHnOcG8cHXT95s1CYRBo',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'Sf1VLLQqZqAYf2v2g-0o4iPMAkKPwLXup-_nqmWUmag',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: '116MNYDanm96Gs0vOd90iRDMuloc9G_AZuGrBw0t0HM',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: '5xIUcRwIZviMZ7T3F488ieWa95czWl-HlxDI6H376Eo',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'siMZAE75cCj8lVJrrp00uEGxd4iYLN-Os0vtJhNlfb4',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'XUELYPrHK10nGaUVvtOSFVbBWCYoa4-YmlRTbY_RS04',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: '8OnsiRrYAMN8fTG7HomYBzkh3Upcf5pI3Vdcz5qjbGY',
		},
		{
			cu: 'cu33.ao-testnet.xyz',
			id: 'g3ErZvEGDZC8YyTbkR418CcS31fIxeuZIRXgCgf2TJ8',
		},
	],
	'cu-34-zone': [
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'B_L7v1rsv9TXI_cCfchfyKjTz9J7SKSdBt7pd11Q58A',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'i3GGG306K-pVQTYqKlMQA74QSO3jFiiFdEseYDKqPuA',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'ydGqiuFOIZE4A7SHqSq0rOELmpGe9NuJeJqDnT882RU',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: '67LXV5j9gSLce0S3peodmgVUhQMNqMGLtNrQ9gdXr-g',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'asUbXZEYEdqjYuaFDRyFRe2yPQALwccTxmx8x11HCVE',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'LZZ1lG-7pv7KvEvjL883b8Hwrqd9jneC9ghxZ1100AY',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'SZCktrj1fDNT4ai5Oi8HLCS2rXS1z8_S8Dxm0OWSOec',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'Wb0MbQ-HxqTeisJK4vPhobjp2pjAAzpPC5-Wxz8_ceM',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'y3Zqd7RHMQBLma5rK7uNus4MEIuuvd0KgHTV360ZC7A',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'VtMfxww49kSwCYgRM73tZsD_pBF_ptuzfvd9WVeneqA',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'U2R7_LElYCG0c9QooBPDMt7F0zcm4blEepmp-ew8J3c',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'bTZuFTm0oazo0oSngxtp9otodGyOmg1PE32anbgXUgE',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'A1afWFKJayQe71RK0pCimUA0ulE4OlzFm1ath_wV66Q',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'pm1_QoTvnAfRVYI0-b6aEM9mQ-goQFxmAvDGnSIfxXM',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'nNL44Am9I-jTNVp2d8ZRX670Z76qlzycxrznOdYc_S8',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'rDD3UaYFPdePN_4UNFsGZ6Gou4dQW9ZD_vI5tKU6edM',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'sFA7DlxwwEXv-j0_-1D0-klomSzthRjWHPgbmdjJR6Y',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'XuAqJt_huUfYKDX4YRfhiZVxLwOQJVYKmqddyfr0O1g',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'Xa1BHdGAhndslRapdZhbjppfPnZdr8BvX_kdimIssfQ',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'Tzq1yq4XypzIAmimsTrotGhG-kTfK4q8AgpEItKYuE0',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: '6VtxpcsGqs2FRDsrSEPmrF6kmvMgi_15cMF4bFo9U40',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: '5FeUzyVVBUysO9SWu_GDM8gKbP1b36yUIzE6GIkPRLU',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'EgymA1Kmey3uxOytcQsCd4ZMKvPVaq0NEmxmYYWkgqI',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'AEntdeFtOdFVObS2xJ-DUPyh4hB7-biOaQIa1t6d5Mc',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: '6SUQpJyq_cpWec1aVZCgMWLN2OfelUrW1Fd_1V_pPEU',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'tKr-Yk6DeWjYa8B018T2dYcdRRSak0xxt8l1lIezxTk',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'ZGsQWQGSRzoRXdQdbmg9pk2y-aTc0D9AL0bl-h1zGk0',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: '0cr98uhrg90oXjnpz4QzJ_GIrjeAYzIHZjPiK3GoihY',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: '-BlD9S34POTXvrWPIg2YyJoHt16cGZksGgxvDmlfMJ4',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'DkfboBW_O33WcCY3BN1ZsoXzS1qoN2IA0WBt1uupKFg',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'x7B1WmMJxh9UxRttjQ_gPZxI1BuLDmQzk3UDNgmqojM',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'FF9_QgoTmLHHrfVyfOaIB92Q-HVDWeESBEbYdTZ3Oco',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'qCh_MJ25CVtDjty6SniKinN7vL6hAy_uw9Q7NTnR7cw',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: '2UPQX_ciJX66R0SCcJEsOFI95Mg_s5PL_LaANNoUldA',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'ReEGQ6YuKA3WgS2qQhB2fxY_dZWvbEAa3FsccsDAUxY',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'G6JOZbE1fkoU4IJXerIjNPiDAxfKdp9hFNFmiffOhA8',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: '5RssiYdayD0cjHvPDUoTM50MXiihpByfW6lMzCPcUG4',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: '-V_ubRIspa75FoMdIPebMRBO9sGsyUkqcSPQyj5zNq0',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'x_WysdFwKD_buywRK9qLA7IexdlsvVTVq6ESWMRCzFY',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'RUOSWeU8Q7D1E-HjouS5GQ3oQXuN4MCOIGXQc_VtSV8',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'uiRidIplqrtmImFiUEZP1GcXqWgoUslY_FbdX_3j_ZQ',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'sz28lbEUWDC6BTX8Q6R4kXJWSdcQaW0FFM_cNSkvpUo',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: '2RmqMjT_3Ocw8hwZ0iojMJLkxldksscFx1EoBU4P0MQ',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'KBOfQGUj-K1GNwfx1CeMSZxxcj5p837d-_6hTmkWF0k',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'i2mm4t26yg2a1UihFv5ylvIJi-u67NZp0_elL26RbW4',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'ZSvKZWtJwSI4eMpFJpWZirHDj0u0-ixfr9TjtK_yqGg',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'YBf5B9UlB4NHmawXNz9CxFpo1IJMGUr5pdVCtbZmt2Y',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'sEKdwKaKpZ5YN1Wqw9qgXH5QVFwvdKs1fvMXMdO3d7g',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'rWbH_hG-shEFlqsuzOfa-wHzLGHff1nRy-yTeWeDTPE',
		},
		{
			cu: 'cu34.ao-testnet.xyz',
			id: 'v39EmGuShBX98FnWspbcYgbmcLTjThqgjYpf0Xy8Vbc',
		},
	],
	'cu-35-zone': [
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'JeT8TUrNMZiPmqJewlrKq2kOKrkDbDLbdZht4hXqXns',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '_OLWhnrhm0sVcoPd4C6DOH2qOyyiatDTntZQskVxTy4',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '9Cugb4zAaBddpOKRIJGiZHJ9ysUSkJp1ChuLBoTEt1U',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'Vv3Ir98X_BnU48JJCnpyKRmKmjOBrqiVUkUqaoqMX_c',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '7AIkJYUBustOTb7PMjgSsa4o2eBFCu1LeSWllQLY8AU',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '1mjTE_hm56JlNKLY6u_TZtj1cjnCMLJOOplkGczexVE',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'c1DZb2MdsuDsUcnR9liEQInIRxc7Ehz5t18kzq_txpc',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'bz06ocAMBfBpiqcezrN8-gYlULaZ4F4JfG1T4MJmHf0',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'jzuS1xV-SOyVgx27RnwY_729Yu5yurWGS3qxSSBuSW8',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'mUrGfEh44uDMEsjRtBDvjPLIRZs0ghOQ_lRmcW0ltC8',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'Q1vRiYAEwdOnBeQ26cP78yatkjZ_0YBVOdeTBaXVzb8',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'J9FZmnigEqbhRMuFSFecyoH06k-AR5TLkXucpgFf0BY',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'MPwpMZpIjpoyzDme-3n5EWkxP6YdTZwMetgapfedYiI',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '5VYfLYo6UNADYCJWEe8vCWU_QiweN_owrQYB03b-1II',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'rMvpUL0Xz1PTJjEmoulVMizOMpgUYL979aiWgeqJ6fE',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'dEj2iVhPy3dZWoTDPX7jWXwU2UI_SiYPtAe767qa_J0',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'R4xNfikfV-pBKDBd7pCOF40Xh4D1pM66T-SxGjTd3Vo',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'SNqG8s_Oip0R-1tkyxUkRR_FwVOge3PoteKrZR6v8hM',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'z6g1l5F5-n2j5-_7LOSTwHqYM9SnQ37ZxCmF7piwX0k',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'YzALv8ki3GLGJSheycB-Ytx-p1B5zsUdQE6gnr5N3mQ',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'qetearzcJVc7fJx5xrbEJMyrdk0fg8JFnhaqjcg_dMA',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'B6JC03yC7vhOCY30yZ7uoo2VUk7mTUKBTYa-uQy91ZU',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'TXgmOFJl_iELkDCqBib8w1BcoJOCPmtuS4-Pm4HxRvU',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'aTTkaGynpjng0rqtxs5cEzWOeXNnsc8b87fEfH3n54A',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'CNWYN_vS8YdUBWlAU7__OKPLCTKTfzjdDfTAvhEBqkg',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '4vKYjC4cFiOaoLzp1ET71ijhc4MP6UPvOsO32ph1jE4',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'QLNORShRRUhEpD4N_kcW1PInADq9Fw6mtFL9Nun_Hm4',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '5G5_ftQT6f2OsmJ8EZ4-84eRcIMNEmUyH9aQSD85f9I',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'MWSXJZ1HlEHId_GAYobtSFjk3uw5Vmk2fCr0NiRmmnI',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '80D-03ugV3ICibhH4fW0BI7iL43QKGjSNDgpS2LoriE',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '5lDa3Es7Th44ZBu9ZtvE84kGhyQvKZGPP3rDVakgNw0',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'vlz2btxQhuf052yBp6Vxr64Fhc0gtuBsamc-NJc7mXo',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'nTnORq6Ap6_79frP6p9O_YXmNQIArPBk_mGIWQok-Zo',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'zo1mI86JiOHqVY2f4xe3raZMxG9vxuNKcEvg96H_DNc',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'NjvPKc0hzDXXsD70vVXzlc8TXLo09I4AGXxPCd1lGgo',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'ay6r_oNloIWBbzZCOKPtUgnshNnNIGqDNERSnkSN4bQ',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'ECvTqYRrlMKMpokNM2XF2vq6azTzRRXezxA35MdCpbk',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'B8G9DEpcC4MPARzqxog9pjcbaTHm16y9CyBPq1SpMrA',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'doYDt8tv0uWXF7OqFQwbpMlVcgP1JVkUTN7FgkzsakE',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'WISpRO3Rn236ekskW6YtxEZ9QruIBnQllOFIYVYlxX4',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'xKU7TQGXZj3RhpBCMuG0s5U8SFwC-6aux1Z22sIt7Js',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '9dgg2PrdffkVLQdlN_5ULsgnjppvwlprzUNqMGC1ivI',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'alO3SMPb2knz1RVaU2PCKm9EHPV9VhtdOHw_-2ZX0hU',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '5wwQ3DY20yi7e2C5F9pXW1FcqZDKIRCWxqhJ-nUVhfc',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'YfN61FE5w26ACmK6VIcwAmi0iIs55ZFWOEbCYvQWMdA',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'u2UcLiMip4QvD6msTJSwVjDmsZD6v_Q6s7N13w2OlcU',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'XHN_hm1-HooJGP3OXgQXo1eBPLKtlXtzy-nK-FszP80',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'Qqo0Z1hLFnW8cytrlWZHcaA3I2gwXd_ZG9q2u1TH73w',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '-Xnug8wr44IRVOURZf-o36swrq3CrCRU1ccnYuFMbsY',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'D1nE08hnIVB16dw3PNcvdV9Fu_h3-TfvTkGlZVkA-Xs',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'BNGGjJMLRKou_dimjmodfEeEL77CZCdRmT3Rc3yyZss',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'VXw3UPTXrstRb8gOlJMhphxsjEA9MVgYhXx6_hvP0KE',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'IewYyiFrrHP_C7xIj0oILYFo5uDtBqr51RHU8juqW68',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'dVEEmmjj7P2b8BwWGB2t5iq3HnOTesUGmOiC-joIBBE',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'GaJbsdeknaH_BPGuOpFRgYqfQMvGlgEnwDGrDVafU00',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'usGlmGmKhLDDfFtPFxDqFjjICBMAfbct0W_AQjseM-E',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'SnSOoNKLDXj7HFMvW8SHiuGX5LfULDqg9yDPbYiCPf0',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '9RAIzT6cHEJT6OX2EUXIrXt3eYUySVHUfFtR0QbwFkc',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'r8S7mt2hXdtdIev_Q-TQAN9nck7v0stfJ3MfZRwAYGk',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'pYwplc9J_33NPEVGcpxE-rtGB5KYMXV2fRheUVwdAcA',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: '2Ub_XK_hxj2l3C3Oz11RbVCwRteviSlK-MKE2-UGV4g',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'RfqU9b-_NOwggUqCGtmxsvl_uaSu6ds3JiU0hEvgIEs',
		},
		{
			cu: 'cu35.ao-testnet.xyz',
			id: 'AxfHhy68Z5Sf-iED3QTyC3Hcf47AvuczVbAU5lS2Fcw',
		},
	],
	'cu-36-zone': [
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'SKRArQwgQLw544OmFGo16nSaPdqOKY4vCVukOocw0Wc',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'vNl8wfrzea56iPg7hp9GsyL5Dy87xpF4QE4C2J9BK98',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'C4jmF0Z3OluwY8un1eIH2LmEDgWVYBlT4HCReBdwyXo',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'Q4U54DRp3fQoPpWF9aMBR5RbvwD_oLZwT5mrKY_bzDw',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: '-MB6wisd_t2j1GFSxTksmQ4SXK6bSnySS4mSijTUCks',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'xS5SoBaBqOgm-Jn6DvP3duBZB7UFIxZoYzeR1cszjG8',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'WjT3zDxYLayOdgCQQG5yzK8FJDBbqdW2SBKbRTxqPmw',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'nUer5u0O1TbuLLEU-CkJMH0_butWnBr7nd44pzc3KJo',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'QiTGGzGqDq5vSekFCXxzAZLt8tzKFH3OLgEf31Ya-ko',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'ySNsvYBllzCBN_7AzT8zxThNGmeu8YNZ2cw6CqW7p3I',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'AzgRT0bgfWWd2Ehcuf7e2GtMIwXKM2zsAQx8CjHrJWM',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'NbgP5ovOpPMWYh19PjY_Nr1iWT-6bHDx-H3SRJEFHr4',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'Sa-rm1eCyk9PtvKjulDYsPC139zIESpnlVtpq73qEX8',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'LitQQJcDHR9xoBhiQ30m-hFyCaS-NRQ26ROg805oTJY',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'pV_Vf8nKDjJcT6YnhgKbdXNCJ7S8n3NERT_KsvuMAu4',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'PLL-dMWmKy8Yvz5daC3Aqyj_WaOIHsPOFMq0rePKANc',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: '6_DT9vww3IZpEWfMse1xCkbgYz0V3K2XfX2TosjihqI',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'rqCMWyp-4T0pJUM20ZXfuHZzCG26qb_NTnaFKLcdyHg',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: '7mXJgdWFNvbjZohSz0EfhepvZb_7__qsYaAzcqIAoho',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: '-HuQ7e2bazN40dZeZ3NPzXB0WeN_MFpIQrj_4yR77hc',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: '8XmDafDdQsjfOzEcauu4WBPnKdMKDBQeGnXIcZFyUx8',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: '-sZmMRwCqxvgRaHtNTH5AXI67Wq8MJ29W0Fr2aws9YU',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'Z0K_985FIisZEh2Rrv4Q1vljn_HhgPd-YPg6ATDEvmE',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'OyY9BwEMYmCpgDaCLEQftJ8NIwED71213E1A2RUT_Zs',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'iSgrSuxIb_Xnza-tSCO5UpnKXApwXziqvMNk-gmRNYY',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'uZcqgT6Qwgsz7r4M7GwJKJkimylWzQhDvmQc8XZthRE',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'hq4SWTQnVqxah5y7rq7c9PDuiaGA_cCRgPy3stxt85Q',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'BvR1rnK2ZtCVhdWdgYvkya1cVkpBdJdDvamdYjQ6u84',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'KhKVDizA2eiC25fC2hshO3OjvlRgCjZGr10UlNhUpr0',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'mSwl71xFl8ByrCj5MRoYP_f0ZGGvKav6YmMFw2iG7dU',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'UtemqOgCi1XCz5E6pybON-BNBc5yy9n_uWKeLNFVfI8',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'H0rbIwU9vnfk-vDHSgV1kqU2m4DNG2eX-6ax-_gzlx4',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'MVYAhGFvw3M4cPnULd29OrXZsKIzdgB6FE4rR6gVB9I',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: '3Kj70IfVib0WYiDr1K9BF1B-p8JjbcwcuincQW9qwUs',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'PUeM7aDMzxZcs76OoSDcDhqLkS0hQt1ZuDLNNkX24cI',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 's2tWY_1Jpp-kNkQOnZC_PFrQzcVDzKNS7B_xNvH7swM',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'op2921HrVg-TVdpWxaW7njzcOkPkLT19k53KAQK2CrI',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'XE3NIcWiBt-cXATZwsc5oT7-OsevVleE31pLv50GdR8',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'Bj22Y9iq3tBpYrNqB58qtXkrlhssl7aeoNbIVVNWFJI',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'vuWJZq9Hu3B2cLRwinx7lJ0KvO9sUUEwdLz-edo3qw8',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'tGF3fHNoTMN6pgJZDSQT0lgbP89Sz1tfUaW3M-36_PQ',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'rpdmLhYd0GI_7PtZRUNM4L-F72f-TU0-fryVTQOsxo8',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'YS32kopP0CjxwnIcwAc6exdplH3rpFpzw9djvmMjlNI',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'brP6Ql_SM1lIY52_ABDAHNKGD-R7ECL1SptbpfsGGak',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'TVhS1YjlBtIPqWX99Ivd8qbPXXw7_Qv_6pBGdBQRR14',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: '34RbGAd5suUCB7XE0vebPFClE8FNzRKxi2rsWsRhpdo',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: '5-HkuV5rv7Dz05g4l8kE4xvZqdh1wKdafOrbhShWD6I',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'MPh27EbL7nRMfby1a_FGVThmU8DnoIei_VCsVqQoNyE',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: '3Kamw3iTB3h0zeDAlftaqVsfhAPmvl0m9Vuu4_rVCGg',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'OCOikBwk6Ba19giR3GHdYUs5sMhIo5565UAEVcmvayo',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'T6lh6V44onwyk75uFscSov_mPMoJM6eglDhcGCS7JVQ',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'S8jphG8Ycs8_rhLERYIWJtfvwNcsb82OI4PEcCRapAA',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'IblrWIh8jS88iDCmG4sLCCyYmnpidOuacSKV7lWzPn4',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'sHFzZ4pPqmZGC7etFygWGa8VM45_oOhvdf-p5fMtK5Y',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'Dpvhqr_yt9b4PXHHY9KwwsoAVtuwaTA9TBk6GjFuIvM',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'qIscvVq7KFzu4bzBF9mMB53h5vkJdP40Wg8yYG5ivts',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'v1_wGdocIowehYJJSyztZfufxXHi93Zk0oW5NNj_aXU',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'HumSwBuK1lUFo7O_Xqy8kKyrTIQIYLTZTCpWgzYnxsI',
		},
		{
			cu: 'cu36.ao-testnet.xyz',
			id: 'z_KaQJAmImJi6_2GL6Pjr4jfHTWgyRrgqBsm6BWQRbM',
		},
	],
	'cu-37-zone': [
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'fEP7m9HKlDzrKehnPM0jzJzJZ0nIfgrH5KlY0PlHJKc',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'J6dQN77poIlbta47Yv8ye3iDQgbL50zsDA1gWcgkrWY',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: '1XlIHjlK-DeYa1AyUT8q_VSIBOcG0P2eo-ES0tgGeDw',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'pzVTktNfEQgmFQgKpoCSKpVbtNiqD5o7ZrlWmWLTmm4',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'MQE-e9dmanv1P4ZR0WrujdJ-ICrEYmLo5zatxMAlomg',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'Ce79e6Qgg-ayOebB_ro8iqBOH9gVGHQlXvz8aDUH0XU',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'UkOlnZkpG4sYpLFkMp71WEF7P9z8ZOREv3xSbas9lxg',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: '2Rs586MQd7zKHu6Q8FuKlidkzW9vClqnGSqRYjpMCPE',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'okAXmGci261R3dvAVYKHoHHEkjIrwLWcRHhYq6A0wCU',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'S7JplKcCT9W2JkkVtd4oiB1_vVW4f_R6UxG9PjUQT54',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'Ehgs8vHHZsozqWq39hWIsxXwWb5z308qFepoiYuZTgY',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'mHdW2mbvRdxi4qaO2NtDRVbXs0tIGTdztnzE9W5G3Kw',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'LbVrISEj01DqBKXr-VVMTmhAtL5n4OGTB0yesnqKVi0',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'vdt8OgH0rYIZGnz2v6LSCelqnYoDW5e4d3HK6nv7JKs',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: '4JRhantZExOEJ393Nfj9wE4Ufi9K0HBGR1--lLl7eAA',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'fNWKDcl4K7y1nZ9T5q1hgliwFsrhYqrPeM_gWViUfDM',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'J0BYxhqAlQNoqT_xwEYbAypbElAZz7gCM7qmICKshbc',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: '-mFG5RKHkPbHTzVL938xR2vvq0AZxrMGlMBhphvuHzE',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'JJd528RaGHhg3TBPUwc2XAZPLyHz4OpaoZLErsyQzlk',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'Rh27RaOqF4xCsJkQtcqwA8RsUrNeXkGWhlXk99fJuFQ',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'nvLlNPwvryJHfHC6BcK-dOayy70FgL_xtw7ki7vu7UE',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'gCdFCKg2-OqtOHJgAwNcJkoGKbCXQrSAwgnYuw-2Ij8',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: '6tAtt8_Hy4C_irjCPTHSZ36ozve9p25e5sWiTZ7x5pg',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'zTnM2u-fGFmCcOr6GchI27vpHMfJzz_hPVyPHtf2WwA',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: '1MmA3OhaU6ebX6QnBieApJkGn4C0_EwLwSUPEAkucyQ',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'LT9Nj8yzM-CWNXJGeY23kFfuh8fyEQi9xBwlDAXxahM',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'gheL7bYIpMBczhrcIYXFzD6BvhQ9L4jMm06V_p0UXVw',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'l2_LFzVYeO58XkfdR3ut8-zGePwlENUvr2ZGz-GCsJs',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'gS0EvbAuBQdMV3dBWcokBYaX0lowM6ubcV8f6fW3Nvo',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'yo71wluuXSukTVnR9CTe1A5AiF_m1rNhLEbUl2TYC3o',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'TukLd0qOcEIbIFqsosiN1qtTR5ZAPkHtXiLQYTiuwAg',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: '_-wMvZur6YiaQVDbb26I1oCLmL6-msMmjrUJ_UCQ_e8',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'jAbRgHanYuRxzycCkEBJkGcWB9Y0iMOfAeqx1OmL7jM',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'ee1x_Pf3wUfucHRYsGXU2q6G-i_vWmnKZ3dw98j2kbA',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'iiSeJHbXsPW8OPbTWT9-tpZyj8fCFztec-WifB3wVeY',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'KUw-7rF2tPc_pHO24Cy1Yd133pZZECoYyYOUqMjYAqs',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'vKVhuEP-dbwi7CA7Ca1_PcIDgtFprE_tYxe7x-GR2-A',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'wwssZu1870tfGlO1Qr9afBS1hb-3YaSUczIYXooaqTs',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: '673QttqzL586wXjK4w__TOLHzhXx_zVauw6Qc-KbYgI',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'UAGGA7HKUx_qc0rHNGSp6PPUXwSF_9epX3IzFXptPjU',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'qGHJpFLxwzatn-AFPkDaKBAU-EIANmZaLrbbXStmG8o',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'I7o-w3cFOVhx6Yjdeuf1FbDHgKYuR4OIvZGZLmNDE-Q',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'EEl5Z6SnnRiaf-gDUnfd20H2YCqYWdeOEvD_1uXoBIs',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'T4OjLK5oSSpnhshGpHmOz-Nd5DLvjb9R4eHaKXTy75c',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'CWS6kfXeWbS_c7T_eHYWL9u9a72WB6G9mIDTjG3hUww',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'io0NhyKd-Eqw7aga1zICrtSA13NRKvc6KjykX6Xu_ZM',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'WEhBPh9kki8BrxrqPy59fVV33qjxgDGejlsYOawXRiI',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'A6MYixTvzWcC-iREfWDRs9Fh3pxyC5DDv1sNU-pnx4Q',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'LktJWJxMvZJbxugkhC1z-S-VhuT-XLbjAO8JVsOdwWc',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'lsb2sg0vaSSXF7Jl2UwH0DM_WRR4sPgI6GODQBW9xXM',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'G3biaSUvclo3cd_1ErpPYt-VoSSazWrKcuBlzeLkTnU',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: '4nei6lhl5BPTsSmpQ_iFFZ8DISzSScUYAweBLU_N0EY',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'BjizbO-Q_Rquaapj1C2pkoVL9kgt_nGaaMDd2kryQBQ',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'yFfcgU9QxtvqnNq-51BymN_g-_a6GM92fthaReV2_hg',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'IKgY_qVhR9EKTPm6ZJDf8xRxn9j6XhGRw4mZ3HZPBPM',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'OmxqHunWWW2HjRWufQpSVjC9XcApl9EhN-udwNm4o9M',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'chNm2oN33ncrBykQ16hfKGAVopuJ_4zmMwi5ut3dN3g',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: '72dbjCg9OnRncRpgFJFWTJMUqwLvBEMWhKMirLMsBak',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'h2eaZPIbLSygQzz0inHUiCHJ3qzRtveHJdfUrwEW1co',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'Y8n8GUKjL-fGMeMpVpstpS4Wz-9caEsPIipJTONLLQg',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: '80MT7mR2mWNNxbgrBRv41VmTv92_8NY8Q0Dc2scnKGg',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'GxWkEzpQRhsm_FSnbkVY3wlkNpbh2NFrmzTfQJXJX3A',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'mt_mPNaxFnEbqKspEGCPxMjJ-gI3yxZ_htHzh0DpQ9c',
		},
		{
			cu: 'cu37.ao-testnet.xyz',
			id: 'ubh7axEjgWSHtKhNmTcRSrBz10xXSs398v2Sw9pGCXk',
		},
	],
	'cu-38-zone': [
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'yJ_aANf8GHQEu7bkUG3tBDsCY5QS4cgSYiPOkPfE8rs',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: '7QDP_7m2thU4IKnPgd-QfgSSwTe2anwrDYmiiBAalE4',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'as_yoAx6ep5LuHfXim3sfKiolwhM_KlP2uX3bd9vLZk',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'BZeTliyEk3F2z-9zP7bmW3EKOqdNFCzqCkxVtDxdOqE',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'n5CMYXuWpOWf2Yw7wt8_2QXxAHQMGBqg-MamftD8QDs',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'a1sVXRxKn3NR1okcFl85stkjsS4bSWvS_LZXrHTpn4I',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'E78BwWrO6Ruf8cPjSBpSHsdAAsGKvTZnmFXN84QLskg',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'lgE3_BQw3ZJwsYUrt_pTMGVcnrCwuvNh8kSHa6E8sl8',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'E_FfYLVuaDrnFlCHa9u8EWxXYZAtaaFeCam_WB_uUZU',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'KAyYhZ_0gD44tEMzSH7YNEIpHUabd6W0ioRISkZ5qYM',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: '5mDIKeX7LFkvNtEFK1YOyzi3-cwn7aIUv3BmPkVl3h0',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'R9r8IBhABb4M-WVZ-OYToM8P_y6r6eHcUU4eVL9mook',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: '1mHgwLyB9VChwRwPOGypysZ5hx3w1KQK4aCTytxXSTo',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'wtYWehhLmb9Si9wXVKIp-GwAUVOro-OV-6TFeGaDEPo',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'ZQoPDvFEENmqPx7q9KYSPf6Arw8YZAVGjH6cIsyZDDk',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: '9Kf6e5hgih1SutWbAJQ-2wUtSde66LZlYzmMX841KYs',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'U-4Tr2iEyd-iVKax0MiKtmzSkuppcpOOo_HNospDubQ',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'hHKJM91Lv78r-SOHIHg0K43edX4TqnAzeQuOUlu_7wY',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'kgaVY0gflaG37sp2egLOdYHbwFEyJ7MuoFDMsoEbcTE',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'Ts37oGnqYVUxtLHLHOR-Oxv6WCpgc226Dk3OyI7_tkg',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'Pi8r5675j2qQ3vEc9rkNiDfyEzkMKwWpmNjpmhP4k1Q',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'gHpFKoWp4T9UksI0IwLb9Xx3ABG8uPHfltntWqjomdI',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'gR1wqH1fhwcnXi56fKY40Y-bKFznZLwUIs60fM_2FaM',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'zD4TnDK1iQkv89vi4SlQrVXKr39XMGIMAQS8HOstYIA',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'bt7gT0FoynM4iTkifHHcolQNI2f6fJBBVgRYd4WQvH0',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'c8CByzyEzrF_XUvO5X89NY5eKizCSeuUXHeXBNfFkuU',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'dNAo-uEmo01ziklbkrozHWl5KkVAaI6i_aagkmuCZKo',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'bqDIlOJaNbIlRw2f2Z2_DJMJwy9CL2o5lJfCAR9FmGY',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'JowM8fdYjAMw14QwyX8CmN2iO09HpzaQpb-d9tNHPT0',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'H8oZR14Dxh_LgXvjZFgfyT-uQcY-NirqwamwkPi-pto',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'l9_vZUTPSkRbgFp9wkcgHQu57rpwfK7x6jxvAn_XYD4',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'WrTTKjq6HmYPqR8-lz0tR0KRKlfNazVmX-R-gH16TjQ',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'x8TrCaa0F37Css1BwNXuSvzLtbBq99XPID4eIUC_ask',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'IwbMFwgxRlnMPrRotJejTU0W7Gd7pRGMaHZWK5ymB_4',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'QEPPI5OfWEhaApLmwPKQmBWjL0gucrA3COuSZfQKNPU',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'aT7A18nrshMDr8KG3f1_BzqZn-QTsHoyca013293d7s',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'fpd8BtEYRH5xbVwnxh_uyHO_GbJnl5_VLNKmOL51EMA',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'tiBAfniI9D-TnvXSUKV-L0x-uNn6aoV2kjR5F0-XORQ',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'kyDRJmMhi0U_LGCZqbvPek1thWVPMRyU548v1Z_Y-q8',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'PJvMLXw1O150Am5Ve3B6ommiVhX9HTL1pLqqjxTPvvI',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'uNM8LovDAsYndWpl-5xpI3a0HQqKO4vv-Glb7M17oiY',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: '5TuBJcSliM-SWajPEq0jHbeFy9a4Nj_0k8gTAzN2ZDU',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'tmsXls3k1mo9hjtOam2P6XcJF1kYI7S6oAJ1qAWCg7k',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'aOSxgLrmU9cs27hhJeiSX0sUgKhJ66Vwto4bTORQH0c',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'MX3P49eEeCYtojuQGPHKVFvf5m9Gnv_9VY1BdJc4RX4',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'nSbsrPISMYbmrcbhZK9W8M6Qc4SC25I1DyL9d31NhMg',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: '6ohj8NT6ey0HTGO9j-B-zTBIV9l3hVuuQ0oyq25XYNo',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: '3eKrIq4TQ-y7y3PnkrqtUN0gmAfGtul5-B-EsXFKEFA',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'dUZAXnRXyR2yrBTtAik4_soaEx6ElLgEKEtl_1ckriE',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'paRO9y3fzTVFLQW2WcNEcc59alniGOjjibPKeHQQVNw',
		},
		{
			cu: 'cu38.ao-testnet.xyz',
			id: 'Q7WVjtyDADKFSHTjwSyvBFPLRIdmCLfzjLsGEe2jdUA',
		},
	],
	'cu-39-zone': [
		{
			cu: 'cu39.ao-testnet.xyz',
			id: '0CxHjONG2yeQQpncMrEw0YNW3y6fvs8PH4wBV8_Q65w',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'dmz1LtNkOJUGEmfv4bbIEcXd6yGoTlB57nuA7XrKYQY',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'VfapSSSvkGSSGgGqd3Tu3iYgvzdYCAomr8MvNDypZL0',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'jdKTJwVomDfRrG_oRDqez6c1m199njANPWmvnRSiNPM',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'lDfCVPZSw7rcyW1FIP5tD2Q47DzNw_rWj1z8uG8cXP0',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'UGRAsmNgDVmyMieaEZdexdy1VOrvbJlzHUEDTtt3MkM',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'TbQ7F7V7pqE8TJfUXcfxvP_8dZFeG0gqFawhWM5ASno',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: '29xRH3PNl5r6HfZKoI3Ubo28Y5aI_WLQmYfGBkyBKj4',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'jj8eVhwCyxYLo90KSz07IihaNesnha4ACyKDxg4lsIk',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: '4kaEaYgS2xpNV5g9OjGK3ApST69hwsWu3bieyrQNL5E',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'BqCSojS3QovRvtwkOjnvet06PXc081ImSMyfECAzA1o',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'lSAoQoecZG8qz9yMcSTgRoY6431nIxxCqQfFtIUl27U',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: '-zjUlOvqXEJm3CM0YKLGplE_nb37czBgjmG5Pw3b3So',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'PaDK4egpvvvcgHaOIwDMBfDNQZaGl4IVXWHu3_olWCU',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'tmpmv588w8dCF9-4m4kXSTPmka0vX2JaCN5D0bCMt6c',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'm980S0lSeonlmfkqffqCJYViiEoMticNep3rlclQBqQ',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'CVBXBsJTCLf1Kvlp1_C7YJdV927mbMi-ihNJCVMfqrE',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'i0_K1f965ZMg6P9_fqxD8Z4d-DuYCY9_nKGouKzE82I',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: '1O10Fgj8zkKFyQgPObnYxB-n9hP0THzVVmjJOO2IFZE',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'FNONJ8jCmc6XhuOp9UW-yQ0RVsgSbaBp62FxKUv3nhk',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'HG6N8CmozT5fPEyGz1TFWi9pqxBNTtCPfHfNymNpzwo',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'j7NcraZUL6GZlgdPEoph12Q5rk_dydvQDecLNxYi8rI',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'nxY8W7_2QvJlGktC47is1h9crO2g0K_cDKHrIQ7hIPs',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: '7UJC64tCb19vdLk8UAWLsWe96cuWQ4LO8QPL612RnDs',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 't0gPcGYO6MP5cRnixayXQUWflukHNiusa9eQt0X6kr8',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'hO0TNd5hr8Xl41CnaWF8lu7EhW2JRXbOaq7HRdkQsU8',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'hT75ofF3t0ctu6PnEVEqL7XIEdrz_Le78GmxrzCm3MM',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'ous4YDL6e9-eivkKLWurW_7_lwuGQBLgU6ReKHozhBI',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: '-qLgGjt42DasoJzKTpbbrYfDzm1FMzZdgiYLemkhwRM',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'XfANeeL3R-7pHHzzXtlJXKTVUhzVPdujvH57IARoPc0',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'A3rctESfVVTnyvSZElznt8ranU7imjU_-GICQp705TA',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'gxQu3XgJFb_oNVxQDyhAD-hDW2x0yopP7QKZvANwhJ0',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'LgM8mab0FubTZbUyIGSp2sCqWKRHwGtq6IKAdrmRSeI',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'feqIklFxyks_XfvnLxXFbVpv4gekzu0JKOeeBPdCLGw',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'lwWFGlOqCFETZI4h4B4WOF-Xl8LGbDVuePLoMz-1kro',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'eJJAx37FZB2m7GDqZJE3pAfl5HdL2EhifNiwql3qQGQ',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'zAna2P0F244CzyStTyiy5WKhKB2_5q6zvUwCf4NogWI',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'xNJOXKYPkccLrePHQH1O_aVj0XgXqrmQIjPo7VeePHE',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'hu5dnXXJHfzt7onh68rzlH_c4DeZlfXeBxMWs0QafKY',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'J_QOUOxeH5CUfQeOd0M9h8U6r5-doc3apr4aPlRq0Ck',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'MDjS2_CpVOePnjG9viTi4S0yXNAx4KyjmiOUeqnkCLI',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: '60ZunmgrSFeKw3FqZ-BCbqekbZHCuwbpE7n-KzcZ4ho',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'TvWOpoFmWNUlpiZvs3FwMyiz9pL9h3tiCdOkleEL4dA',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'wNUfqnxANo8wjVABlupuWRRy0HDAKvKfNWqPvioXC7Q',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'Am1XWNuoiX2AKBbuD1lhCcCRVv8fX7dpeeyInkGJdkc',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'TUOLWICpTZTun8ui-6BS7--LwvekeuLkZ-T3LeC3YP4',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: '9T2Bt7NpmtumvZTqqRJe2cVKXkD0sw-8NpnkDS-xJ0s',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'XpkGwkMXPYdvCNZaw1xAF7BitrAPOQUStSqG6tL-NRQ',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'ZMkaWyYqStnCqT_kwQIWwiTkgemtBG29EwzA2jvO6sQ',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'OTIPL5KjebCCEGwI2xLIRxaiB6jUmm_2BSrh7LZU58E',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'sB8Nm2JNvID--E0xuPLWv_0naXxc7GHd_sssgTp1IZA',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'N0em_NXcSIbhLXNw9tsrQnXhVRCpNkwSZgmreCL51Rc',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: '78eFksrH3-2ZG1lslBGHbwccISeAmidVN9Skg2KvroM',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: '12oxUs8mP_qM0M76xEqR5k8w_T9tUrPMehzg_gQmNKU',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'RyBiyv9ng85FK0ylQ4ANuXmk-PUWOQ4aUuxe9rfAN5Q',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'trhhnPWAIJuHwNV9XMcjhvVOz97D7zG2VN0M8lLEFes',
		},
		{
			cu: 'cu39.ao-testnet.xyz',
			id: 'ZHxZN0M4c2Fm4dtt94R_gaCtzwZVcqHPOFDd5__KgJ8',
		},
	],
	'cu-40-zone': [
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'YdMGHkS8usgso2sIfbzg3xdhFDuM8LiaQipm041_i-Q',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'pefv93PLUm9NEydQjTyL3sFhwxiyVwEJ6MHbT_Tx7CQ',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: '8J-bw283wF20Q_SvjftsvlYuFIViZGkUStrM8nO4vAE',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'TlCNh540MirsB_oZyjg0n5n8GyEdvfJZavjl_ZQWBjk',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'G7En8KRq3yn9RTiWaR18ZfywlXOHEBUqGfP5R_Lj_v8',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'kwiQU0ApLUbKbwwicILH_cjM7-07ddGSUmxW2srqPxY',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'oMlboQhNATANDp03lkuwSnukXSjernaWonJu18AMswg',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'PGBv78CiC-hyyISqTe3QUx0rT3QLu_cui_HArTofX8o',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'qxDONkjfKc21InmZLrpnKqR8pypfn4OuUy_DYfiNr6I',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'fhrePcKpBb8dRQ6aAQV4hG4UFxDI_rAkHSKkvWtxKtA',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'nsoCPxYVt4vl6Iq9vUosSuVop5tl-xDDV0UVDM3qQ7o',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: '98lLRHpopKJMXTq6eJSJnGgd41lMX5wNC0xdGjQN2vg',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'E_Z1ofKtp4A6NZ7e-YRXGJpcM4h2f89jOShFRbJftaE',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: '-a9bPibRF23zD0s4PzaHR7BOAhY_iP9R3iJ-aYlVFZ0',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'sealOvpO54ffOEU8YE1FOC7u-Rycy1IbJbrODadRLkM',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'KCYyB5QB1cW91-TqvynbnllVXRjKjkRagdXKNpApVto',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'LASv28rN7CmZDIZaK4gn-yhkquOhDq_cawwjSIyZFuQ',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'UPHzffC_qFnfW2Btm6osqTSEOoZ6r92carTxog5-lB4',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'jfuSap3cnjhT9agER82kQp1SqftmjRsfbv902InQ4bc',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'mNtROKdbDIeqpNsbiGZTzSlJgV3d1LvnVuAKhZhBZAg',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'WuxhVqh_BXi27QQmjhzkI3V8-NzhVKpNf2oggTaAEDY',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: '_yuhjsNKE4P9aST2UjBuoFydasm5gimNW58dL9Ucptw',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'gt6sCZzBq6quCEURs46dpVVkT2V0zZnUmMZ3oPJLRZk',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'Z8E-e7Q2-WUMfKDXT3N4Wt4chekBjuW1HxOfWYLgfes',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'l5ancfzLbM_vkczkSPVJ-9cpkyT-viWZsE7nyLhIMOc',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'W2fd04Xh_ua9xMYcvWb0MzD8E8YwqnpnIqRx-AhxC3Q',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'nBvoGyj934rW8BS-UtJmTt3JloedNQl2vNTf3BFN63Y',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'zBLeMP-oiw-Y03mAJbkbPPIkpYDPfGnzc8A3Z4z3f9c',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: '5TW6sze3xuYWBDHKmP19fAdgQhebuNZ0nV0NilOpX2Y',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'nWpQPZfgKJvQs7VmgutE3ePbgkr96SayfaVR-Uf79GU',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'R7w3r3f04epWO2flvD9-bOqVLzh26BhJLhRiz7ZJetE',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'CvhzsM8p90UvOCiW3qwR9_hNuoDNDuSJXROzeYEjato',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'Z2rE09qfY0_-5ozDR_ydaSeVR5zgQytTtHn8nvp3L4U',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: '0WSfsogGXTrkD-piFnYK5gZ8cp3DLdXzbmnKWiC1kfw',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'eTyQ82m7Pi9qgnUhUdPQr5E8TjhlPfhVqsNOI-QBNr0',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: '_IZhrxvra-LTDAk6SV75BfXDIm3-acQLjCTVWFtLDcU',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: '5rKJ9Y00-p7Md_jt7vjxdwDpjNeU8Ejjet8YvFmvWP4',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'cqdq8tgUDgPfJMboD19kWCQmBvdTgcV0E4FPJRxy0DU',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'eZ7VM5LETMVt7gSQj0dDLb-bLqMUS8zWPHXolxQv778',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'mPT-kCNX0o45EWXg2R4bXDcHq9xYZRlXdpfdGJzXDSU',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'WTn8SrCKHUS1BwW2wzz-V2VBcw0JSRodaH1shHVSCkk',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'gWAy4Me5c6UliLLZf3F-QnmWMHF_yy59BguK3oiqLDU',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'FQYnAumcASbU0d-l0LJ7gjYN9f3zpJ0Jqtr4m_KDsmc',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: '-WbNXW2BtjrDdvDQ8za4qC3_Go16Kw3dnAcQSbomlos',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: '6QNxahxQZfyIBn5klJYUMmMOLLe4gvvY3RBmhtuU724',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'qcnKIDWStElh5y3yeAnU2OMLyCsH-gVf1LSq-Eq60ZY',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: '7sOp9a0pz40RXwMthWnXiBrhB86Lxx5sSGCcPfuzy8c',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'OsK9Vgjxo0ypX_HLz2iJJuh4hp3I80yA9KArsJjIloU',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'T3b7Q0o-j6FI-acwqSTATvq4G6fi-5sxF0PiM-qV9Jk',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'dtirktTlZldfYuljb1y5BocH-dJ8Q83WUQgmUvsDGSs',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'Tu4UFGAaxN7xo65y07IcIoWRcsMR4BpHCmBhCSRa-Ao',
		},
		{
			cu: 'cu40.ao-testnet.xyz',
			id: 'L1PB9uicRItIv-tOVkYsixfR6L7bEgXFulwRjqorsBs',
		},
	],
	'cu-41-zone': [
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'z3oRcjx-7vT8hGbflE2pi1VMJDP2RfFH0ThYPk426cw',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '-pX4m_E6iPZFF2JrwQd4dtI-mv_iTyE4ZIqq6blTceM',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'vM7e9gd27Mc4W0xVo2Qu6Wl6zGtJ9TsMXBtvyhX67Vo',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'OYjMSi05vUET0XSifRS7zmHAfd5gzfFMvJ96z5e5s5M',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'uGTYo3FPvvnYDdezkAMNyMrwQs5GwNNmWRzlQhE4Vz4',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '2VMKWi7CFNXAClRPa8jx1JOxJgCRgGZbeOkg3kM4TlQ',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'f813R_4YFBx8847MnMFx_NrfF3_TSx251w2wyxi5LBE',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'mQES2_hwlXQS8JVSdPJvRTkp78slLCl2gpm6sW3CK9w',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'zPdWjlX2xB7QDhwksOSEcdBDvst9F_WoRzi-kgBb358',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'x8dh7I4VSb0O6x0mJ7ovsoe3j7PtKH1avdIHe95V-GI',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'JJWPN4-wdp_9bcVN0cv9ghajJRPEyaQMQ8CGNDQfXJI',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'xORwjerhuV9chT4G659h4_AmfUKc1GDfeSWKr487ld0',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '34jmjvIwlz_GvNElXe1yVW_dcQl7Xs1rscfHM8tfrlE',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'BaRjhmy-hGSRp4wG-EMzm638iB04zqf_tQKDBxZnCps',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '3PHK7KuSrMps4pqjLxf15lNYcDgSKUw-OYUROFLbN9M',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'D-S52ez7uXa9NbYZ2W3apcQ9TkzAq0EmIxnbVcfl2JQ',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '_pk5qR8QCmTCafwMQ39J7yL3E4wjH4kfh2wum5lsDVk',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'eLoM958WQ2ZIMEzfwfwGXLXKLZK58MQdw2hqpQoKaDg',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '9swmQS-QNiwgODRxB6rfqN74DJg_zjT9TNM5VNZmLSg',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'e2qWrHX3CyG5N1DxglDMNdHSaRl4VwdBsgRr4DzV10c',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'FV54pmjwN74Fqpn9vE017qi6ohWXiyZ6MX7YcWljtpI',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'okzthd2mIdmgtBt-8ODyleSq-h-32IOwlIw-nCvVpQQ',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'p22IEvcu2qJL-9AqPsSE-RGAP-SDUPdS6kwPfKBn1oc',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'x9_Kc4M2zrM1Wf08bBkhe5VBbYBzeRDxr3G4MOxmj2I',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '2FPfpqIbBa7-_c_O942x6R8mFpOViUD4vNPa0rumhTg',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'o0cj-KDpPmWJ2SyNj1EZ3CByg7XlILkdaFdwaYos2zU',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '4uvRcgDHgOyCuiZcTK60m166Jjh4qXJZ5Z-YEPDAYV8',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'eDVwsHepnGbo_RIpTh5KOSzMLrVIfQSzqCsq47EPWOg',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'gwplsB8Qj1BaMJMxUkLZNZJMUXBz3GPnGlyTl474EtU',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'OsLU7SECOKk3iHG1PazYRlG6eOIPro6t4HjM4oEfuOM',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'QVI64GzZX7eB13SL8H7ox7VuHvvuP_MeMo8hGlFhImU',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'G1vabsNPSB-shZvAxINs47RwykVCh7uhg2mEzr8_Opw',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'cooyTbfwD7krSHbw6OeF2GAsB3j33Bf5Ih-ytIdt2Uo',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'eSWnE7pZZ4ncdhJB99EGcp-M5RuObwaBIqeMoZQnCio',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'F4YOI0tqEp-mNXN8Owh90fYE49rfIOaIcgnZup-gov4',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'F8A5GRFdG7biD7z6hReUOd1FIF0TZGVMUSLBOLXh9N4',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'xc0UFB0vXtlASQ2gHrudubhZFThAifogINuJslMLH0U',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'Q4Yz1bIUspEr-EGkdS-9nl2r4VpcDWhS8wAKCD6_LRk',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'AGd0tboTEXcT4C5M3Zo5upIphoW0SSiisnd9B85ICU4',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'BGCy9gBJlKxnlzdnuuigPXAQCl0wdkpDOCo3j6hao40',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'ho8nRdWkEy1VcXhT9TqehudoYUYX9_gYGGvbclRBGAk',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '4ijIdjP9b9sBMYnjFu1FJ4iM_wQfuFOMg2XuSPdKrQI',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'eNQRSjD-IHlpgogksIOYmzMsdYc4JeEG21yc2WsWt6I',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'oq6VQXwsCD5otS9CQvZWzSFuEofugg7clUaxIahiiJ8',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '1NGzLutCyIWWTv5yNJNyHra-4abtB2oSYcDSS22WkIQ',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '4ShDO9Z7m66qSE6K3biHSZnVPZeO3Jw4_J35lby6Igo',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '0vIXVOhZXLtyNfjKPMdFFlMa5AMXmGvRXVxpZvgsJ_I',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'ykgqq4pwVWZ8UEiRiK2pVUmp72QWkB1vXfz9vQzfGRg',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'feZTk1xMxzzRBvQ6pNWQqjV6AgPLxE-vyl9d6VBuCOQ',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '3kFjughdH7ssghlehxMQyMvKig6E4-C4NIKS6HUFwTU',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'w8DHtcGamzINZCol-9bhvq29dFkbzf8GKiguL9wgSTU',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'lWtuyIue8xBALCdAddgKdGebdMk4Q_SKk59SiZxXpys',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'PC4IcENeNy758njtmc57AXll8vhUrg6Ngzhe8lUqkps',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '-PMz5BKlcHyZ0rhbcM4ug4IEwFBG6SjTv0VJclAIzok',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: '2_P18EUpWsBvKTbAiidTLMA_nlchS2rMg0pM4HdZEFg',
		},
		{
			cu: 'cu41.ao-testnet.xyz',
			id: 'QYNImnYYmBTGBXY86is347rnKi7cVSQckIyxTlOLyZg',
		},
	],
	'cu-42-zone': [
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'QQpoLDH-iymHGH8ypS4eyMeG1_E_mIGcyTK_uh5oY9I',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'Ftm509K5T2HLE7dmFs-KolOLmDxiIMkPItMUff3rhf4',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: '2N_GINaeLpd4n4j6RWPJXPrhOfFRbmdDCrxuRq2l0jQ',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: '7uAYIr49bkesYDPL4yPdftzCLzwGju9GgzFK3D-awvI',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: '7KuqbsVnR0cB-Rbt8Gj7cVXT4T4I97xNpPtLQqUUvX0',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'hSvMqJr0ACZHaSgAdIRApai_AcseLNLt0z04UMUDolA',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: '_MJbfFO79PJvVuKcqv9fF0_TABK2RlMcTJYHpyDB_8I',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'YY2xQQYtb6_kGQFHK8dzRyM4pUKMeW-Iu3DxOoIJn34',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'EiupLwRTZItM6h2wTI4gsEh2JsCSBPzsiqoSkdSNmE8',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'AarcpJiWXWhKaiVFlF4RNfH5dZIkShKPRtzLcFjfGvY',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'cJnBFgHPuvwY9iF2-CAPn2BOgthz8V7hdP439yj-SQc',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'QuMczqEo_etxO9qz07WZ68jz7G2aTnROV9kDYPCOn6Q',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'moti-fuiu3XRsUVq4rzbgfxoBEI_6Aw0MqO67CH1yRM',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'WGvGIRchflhQk7CWzhZlR6yFrOuos8t--hlXu591AzA',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'Xm0YNwhstRjiBtlEYkFAPr1x4EE16HPyvvXkDorEQsY',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: '5NiNsTTPA5wZZh9NE0HXAsSyJ5RlU_s306438oJoV38',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'r4JOIm4ttrfTlk81XobMJ9fXiMPJumwNLPpJE660zNU',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'UXTmOC8jxogFExR3GYxUQBnvI30yjn0frilyd2p95UI',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'KBQhk2f0NP1HFGNrOo-mj3wZzi4LygG2aMnhfG8Cnmc',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'ks9nwNjII8wgp7u5-AwEyk8x0cHOlSqFyC3_3UNDIBc',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'er3lTdXUkeKFxgDniusaSmbImG9kCf_pun_49LzHfzg',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: '5d6jAIX-Gp1A_OpxKVYEUFwN1GJ5BZ5AOUDlffQNE1I',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'CAt3CjK08AAMd5F3mwrQEHIMxABg5mLL1HKy7KVSMh0',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'jV7lMdrSnUBsLOLpWMQrduSusohOOydPf02fOUXbcuE',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'JI7IE1Hg-lviQ93ct92LTX8YbTHbkWFyshC0Vjhv6Lk',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'T9-tkatbRo4jgS93UwPZF5IdXLHx-dSihPeHyW5_xlI',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'COCM20Qqp4XRR8KsNdK5QP4i2vnFHJVyaS4ts0bs6eA',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'HjgybmbqATQj7miBFL3zh5uQtXzHSVPrr72H8I_2Sho',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: '4UCaEXX7YxvgZ8_bbEfbAf4vS7sfhhwgsAdkgIWllEc',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'TTenLkIemOb2HzmcfqS36cT2FfqZoB6WGs97cAQbEvU',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'EsyXCNpUEYQm1EYKnkcGbsyEuea57-_ilHTW1uBNW1w',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'v9UqxnOUC4p6C5GP95QGnbGB_m7dmckSsc4DSYdMNOc',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'Esdmk-FE-L82fJmVyQ-S095z3qHgem77a70Crs6N0Ig',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'RtpqVh4fjNuH-GvUIrYwsEgL6jxijd0dh97v8XElH2M',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: '7MBWGcpAvwWzvnLbNbnDmeqLjc45KC_ajPlg4uTXncY',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'YPYmJEuI11PsmPiSEXsmqlcV4Aih-6sJCKg9UkvLUFM',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: '52t2SZkYbFZNq4-efGsWR6rzbRIA4gr6VC4SB1aqHG0',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'pd7hvwWpDzWTnxpWTdgLY3otlNOoNTEhOlLqPJNo1p4',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'gwTcyY8s80ACFkWrFRh64fWxdTPhy9d8nlnQzaMead0',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'd0rYi4UjCYT2tjInrerHoVhS2NhNSEUIp42IRZGxXaA',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'KdIH8lNEuYEySqTYAoA_ceBuvgEKcmk6u_y8GMhBN80',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'pX3Kaue44QwcdWpGgWB7op0EjYpaa-3oap3y6BNOv1E',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'LZ_Av2TqxGFa02NrHxRwUBP_zu6Wzpw4Ac4Esx8ctHg',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'jB7i-7W-DbP1Ac-qMO8K11EL8OHEK--rONXKakY4ge4',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'NnDxiua8oPR1Q58pJ-AgEir6h2J79TuR4MTgjYoqVyc',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: '6XfHXYuSsyxA4ZRkhpssYI43ke7_S87f3Vy8T2x-1cQ',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'afS_-N6g0Rgu_T2yquRMfZmdXk0jGBim3IiMo40CwVI',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'gU1pxiVex_6m2KcU4b9KXfFuQE8XzC3YK3W0qdkShTA',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'ALKmQEqtW-6XpujDQmbqbK4M-wJvRKLS4Y3Mv7mhjf0',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'vO5GCP2sMpg_3qspxjIXzOa-sS5AxdgRF5IDqB1VAqM',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'SNNPzSRuW8ARwVYj1HreV2N_JAamMuMRqV53h5QGoMM',
		},
		{
			cu: 'cu42.ao-testnet.xyz',
			id: 'Xr9bJsM5HuHWZsYM7gXlNT9fhccFqecfhUhnug4bz2Y',
		},
	],
	'cu-43-zone': [
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'JViwGOLRJS83Ra-ros-yN5SmkP28jnNWFVRRjr6cIKo',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'O75Z63uY4eRrgkrK4cpGPqa0C2XYS3uVA2wpEafVk7I',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'orKKyG7jP3fCASLWw6-VscZug2qin6KgkAwhr1tOqFc',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'q1Fka-4yVQenlSILtNacIle4K1qNT_6YKPfzskTPk-M',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'ge3ee4zfmC71v86_GnGBRpp-LOxMAX0COPph_O5JMPE',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'x8mpcR1WJujuSu8ULE7c131obIsgcXwwN4crdpvSRNo',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'm9kZxeD8bt0piwbtYio_SUTSRxIJPHUeyxS44JXbj24',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'kN51pyeLe67V_Eq2BoOZy8ezj_M5MPxzxnPbii6jZN4',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'QANHEFw0A2dVNMVEzyY-a2WKs0A_isBFYmcbOWISJNk',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'cdMgO3MfHgUFFNRHB1LsfHlaO-1VIR834LKF28jZN8I',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'CquHZIxofZF0eZXP1RlrET_SptHkZU0XFzi5wXBeggY',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: '-AH1ICa_u-QHCJpvjnn_2D5U5o--b_RELr50I8QENGM',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'estkN3t-RiGDoWbEFBMU8nbcEDEDKGxB9AwhcCmlw4k',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'UOprAoAo_6oWHv1iyErAk4E4bQK0feASBI7rwATYzxE',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'YbT34ikv1kI7J6oUUGMviqpnVVb9HBpoddXG4o7KT0U',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: '4N-avzg2oLBIRSQkox2Fb-dGoY7ip8rnNTdN03QuwvQ',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'qn6vo2X8HpClQMeRbHOZV0FOEOvU6e7SLLvBsEZJGjI',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'wDkXYkfI0CXnp6vOHvte5jrJE4M7l3RzbU4w4tiBzH0',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: '45et3xFSdchtndVqXPnGdwcq-QIOrwMRBotXUITdzGc',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'zmdH8U9Mth9FLN6QkHaaRtKKqRhmrZ1CngENcRm-Kos',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: '9QeGQBGFfSgZy2-T9DCgWIdn01MVFfSrN_46ZMkI1fs',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'l2sEbTcS9Z3mzBMHLTV2Kr2JdFgD5_HG2JMRRO6Lv3A',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'muviok0mm3Z3tV8Pk0hwIfpe75ZoIudNaJtT7WR8-Og',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: '5Wl7jvhA6KHae3J8yq-6CbXLUy8HHW-pNf58iZ_xM1k',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'Sj5bie2brOe66GnR6VFbN4mIgDUhlxQ95Nrzos1vi-Y',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'iOoXJTJx0HIAspHF2_jJeVs87ZRT19LwZJpQx7H8xsI',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: '0thFUjJmyuY4uY5LjPWub69hX0GHw9WNqC390-2wvr4',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: '_jGlC0TjotFnPgZgOJ1sUvVQVVqrQo_pIwRF-6RAHxU',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'Fzp2DkIu8JK9q-p_fbPAPTGXDMDJ3sfdQXwJoO4_178',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'hJK73QGo0-eVK1kRxxybIph6VJQCE6TxGlOGY8TvS1s',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'uEB8VIDjBBEE4a7-4uyheGNYztQiToOys70LD9oVn2Q',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'de8STfOWH-UMSMl3J5dzMrBqNii-s8WxbzRTiNkCQmc',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'JeMjJTn9hRU37ZZkhuWUaV-Fji2MGpx33NGCx4iiUQ8',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'SxNsHYWaW6pjsf6vujUxNm15816W-hSm21m2RZsTw3U',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: '0WJYtk4ad1Uosd4WUCmXhLZ_Ty5bOmP7vJJb4jXVVPY',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'HkvBa0LPDiVd8tKUGuQAuJvheVEbnJfnXn6B9Quxo7U',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'QQS8mpuWOrSVtzKvqpkIFBotDzz7ZtaymTyKmakrweQ',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'YWnC0YD9zUvRav0q6Zsl-QXO1DWZL3RrzbygAR81SgA',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'gntcys3GmFonAncQrgHrtf0fch33FJw5ykI4q05qqqA',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'QmVr4pMT11Vh17u550C5wlFTnceWs6_Pjc_YOJG4N3U',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'lm0gn7eQpokPdotmfLk7l2m8zTxb0-UtnjkSvSEr_2Q',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'Gvrh0dfKAXvZo8NPiI56kaOh-dt2kjdyMMVpGR2wI_o',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'BJNN7fqYANwqStIxjmzsUJZRRkjR6VrvFO1pzetFOAs',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: 'KL3WDwtBeP1dhcLFZibs3YpI21mGE40mGVcgR7myBTw',
		},
		{
			cu: 'cu43.ao-testnet.xyz',
			id: '--KcTLd8r1rtngRjnwAyNjG8-Y-u4cOKjzu3dNAOKkI',
		},
	],
	'cu-44-zone': [
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'PREL1IRxbsZekvtUYCQuARakcUE-TZ7R2S5fqWGDJmI',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'CHy5TkO3vUQslSH4yldBY6fhzH3reTcFN__Pp68shiY',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'oLDWv2UNqWv06G6j0UyL5nPLP3b0kmiUk7bGa-Nfyeg',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'v_ETRQhpBt0rXJcqJV_4uzsX8G_4gnszgt3yPemniR0',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'oJ0E0O2i0Ufi4AJMLP38vGMeubJBELWhRu-eGPFbqSY',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'VHYwYdvOSDvEJnSyScFHRtB4f3xxqXVa4DGQcpFG9Ks',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'JDEu1hzdcT3rC57fR92icKB1TsVVgKb7Ptf7NOvJNrU',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'odAlcu3StBsmk9PAQglQIEBpUjH_sOF9xPzreXWxe_Y',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'wQT_060P3IZUkwu2G0cIcJdQ2lT_rJ8zBbOHRjcxA8k',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'XQrAe69fhfsYk0KaN0SoeQ9oLFtzg-W13iqyWixoU6c',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'r3YEUT3NIuUXzhAd99cfGEXZ51s4AAIjddWBujANXB8',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'Y8CEYnmzMZibQVi1QoLMq9J2G_Myr_cs570_pwywFcE',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'KfeRxQmWdcQX6JNOzEZU4rsbdctqK9WRxn_bqvwUNVw',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'VPylSxIig1a_iCUNRAql8og1ZgVoLtw1q-23nQWqdmw',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'VVAPEwVyTtzRddlrY88M0mcLmi_UDGqmLo8jlgpipZA',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'Ilf7FSUVNoGUyaRhh5HOxW37xPzjA1NIy0v3JEx8tJc',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'aAjoLZzWF62xyTCc2mvCsCyxKKA5eLhUS3vGAgrjIA8',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'ks06pfm3632fGAU6vLQJfsVb-tJ5D166U0PdvWbehgw',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'V8fxDUu7X4xH-6EZwcO7Wi3qZFy4oy33EkRLJFkH1fQ',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'JvuVUWjwg1BKaWGmDXjdCJmO2mfBG3n7d8E_tEPADsw',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'ChpQBjWU-CCpyN4dxnI_ci4KbbxSgLBCVkTBNpjP_2k',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'OEqVya4w1NOrTiDPImVBoOmyVbwGzPjojpOEn5lGac0',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'UAka4Gh75bE0OsXNVLyANT2cjthOhvMphpvyDUAgrOg',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: '9q-fInEwt3K6ZNunZRZYRD2H79GPcK3m7TPo-fXq6NM',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'lIY1YK2YcOwbOZb8wRjubXQ57vgMcBvwIGNwxjvHc8o',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'T9y0kqS_49R7JHto-XoRohTAMCpROINyC2xDCmoProQ',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'xXWBBydDmP1yYTI4QwGZ0YqJFWwpA58KHDKLT6Xq1_k',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'DzFONmyuLAFH8HmHnc5-dYiVtyjkm1rjhD_SUaeHPUs',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'Q2jgRzrS4SIApNZ4--HQM5rAN5SqtA90GGqA-Jeqcu4',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'kgje8KfbP9WL1GZFizucfTa6T58UdpR5sCXfiIL1iEU',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'rGNNOg8pJWssLL9D0pHWe7X0ns0oCjV4Zq1LPYBUW6A',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'VDQnw-0CMksOMU__Jjc1Ehv6lin19m88hHjzs9WGEwg',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'As24sYllVaXD-xAd4-4PbOfVe2Ibh1Lik2niyDsf0qk',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'hjeqBAAWTjV3-Q5boozQyZe9Pc0EITOPGvlZig1XAeA',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: '6PsSBabYHi-n_8_5CgooI2WTtJ-gUA70Ws9mBtLvtCk',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: '1-2DUbjFW5QEZrogis4XyfYDTuytjeAKfspCHGq3-oE',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: '0XwkLY7BNYozSuzUM-Pxo6l2tHQXY717UXMRi2Dzw2c',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'avGj9zFW7uVAG9sIDZfgSRU0fi54tU2Rzh-GJu0rqyU',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'eT0cUb5fLzDn_4xSxKuXn3nzgZcGx1H6gB_C9Ze5kgQ',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'fKQTyn7jSAQHZINEXilW8HOHY1vIRvlTXOnF_H4Z70M',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'JtxwgddPXiDCXLpqS27qd2hUliy27-imrG7zqRagKhk',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'SvXLoF9WMJJDoloBp-102avFyVysLfplPgwKZQaaml4',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'tmeyvf0RPTF4E_nIF_n5XLwIb3Zx_key8HoUyvEy7QU',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: '8pPz19t-r10o2baC97ANrpfyX2A1JNmFb9H-u5CoxaI',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: '_sys9jd3XRuK3AL3k7aev5Yxj1RGnAYVHEXf5_h-znk',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: '2jdlzA2DNsyQ3rBZORmxcSt2Ph1lpNFkIXoZTleerhc',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'TcW8J1e9H4TukJ0wgMyjUQyXlj20Rysj0Is0pTyDTqg',
		},
		{
			cu: 'cu44.ao-testnet.xyz',
			id: 'nt25RbycnMCj_bkuraN1WywegMsPwqs5ynCYA7NAA7M',
		},
	],
	'cu-45-zone': [
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'IMUXKFoDmEugQjlvv65YGB2eJsixpPHfHJUaQ7ZUsko',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'YmX8ysybMIENOxBPjoH8vxpU5DRX7nAZATH5TV-KCcI',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'BCT1ekXwzYImzaCCd-LF86yc7kw-mnoPDUsXMOkeNG8',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: '0bzjcm9z7uETAos4-mXYh-VwVGFkUM9I8SY1tw0OIRE',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'Rua4dAmES5mM3NfOl2xsYJsrKflT_vrbmhFGFdshHMM',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'O10pd-YkqQ_oiTAD1azy47-69fqQfT9JcifnDh-gP0E',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: '1yOFL7azSgfYile6uCTYwLmtUoEgXTfkovCSxb1TGUE',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'v7iUI7YgCtsuXnYYxpYJ_v5TK3S247MXQjMG-KHwo30',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'WU6rRkueWZWqwyN9SwS9s8o6OnoGsHZMKV3-Yv4kC-Q',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: '2ANZBpM65SVhZGFuAuTxfHaIvmPGPjj0VwWyaeRUUOI',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: '-N7RJ6f-qjQvFfVUGj8ouC_1BZjRTJW5sN65Kpi-2W0',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'gI9sTVpXmqXNSn2m15ie6rOwT2AFxBvwmAhSHab4hVU',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'AbGvN0C4itxjaK37OIuphKEiYo-6S9W_KZii86SI7eQ',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'K32S8ztI65kdo_56OSHoTS-y7-XUt_FRXFf7xEI326E',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'EZrG1XOQ3KG2g4lTttMzPYYa1t5_QAtIV38ioJ_AzPE',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'kXLxNdW3_LZRD2wpj83n5g-RUmKZJ0CLQkBlwNoncqs',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'RR0vheYqtsKuJCWh6xj0beE35tjaEug5cejMw9n2aa8',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'x4UHO0ydYfWDE4P78oq62r4wTwyZ-HKQjFejvoVZ5eE',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'xmofCEbRZswIPfMIcgxADT00yexF6wLMZv647ifNcLo',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'VQzW-WR2omcFX2asdkYo7hHL_XjvJURcXNnrlpHg-D0',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'S3qQ8sdC_MnCv_SAeZn2H0vgfs0gqNNmhnsUdvnM6nw',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 's7ljmcHAIhWEbXezGrF4_8ZPr7NTjvSUbTK04LsRptA',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'sg7bWG32iz-aRZOgewJysrA0DWVTqXUal5BiQeNBQgk',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'GndJVpad4O6v0DkYZCnO-e1Hm1GRxFM4jGh0RoD2stU',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: '3MzoeU5agl36R6td1BDiqJjNOqDNuqUrOK62Udi_3KI',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: '2ECt1vuV2Et9I9d_XnKcBi_5yjIPJl2nv8tEH9j0AdI',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'LdtI-uc_RFo04U9MXqxlX0gk9ltMP3e6RbUPvjraQns',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'k1v50lVrb3AnyogcBoVEE-0jbCFWciLmmsZ_9vjlPF4',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'GuF1tXDzTb4CbOR4BAUFmn3QuthNTkB5zuijkCJ3PNI',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: '8ULUjfprF7BuVOfukkecD6GWSBTFDWO7ReQvojnos00',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'eopi4UCnzZIDdeOrClNvG38G2fAXD6OyUb4G-1sMeps',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'mB8HXZt2t2CWHSkFqaWkY5RXGkbUzWDUxPwaTMHcNag',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'I6YiaUVHoYrtpuH3qmsgvg6gMzUTEXnpXA9JG_Iw1cg',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'x8hsZt-RfO8hJsBIrzvVzhFFv4Vh1_Zu16gZXQ3pxCI',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'tDE2W3Vjijo9HdK7GImc-iceyp7gD2d6ZJEIG4OUNXo',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'qbErzyGWZ2rHm22Nl1r4bfVycPXxsKD-4aLEtis9IVM',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'jq_bPJhulgoH6tmKY30_wfSvP6KwHT0nApATRREWuZ4',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'lRTDHz1WrZSTFGi_o5TgRoaHmck6X-vt8I0a2OAgFN8',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'm_JncUbS6jC1SJDHbpwAVCnOsitq40r2AAHNEbZh70g',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'JkjOeMOJ9G-udS4jFBj49iio3rEfDzMXo85A4aThTow',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'aiSkVlk0R7dLurHLKPXE6F6_hpI0fS6HFILsMqeNRbs',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'bApMemvZPlFpZtJWd5u9l_Oz_pUf4AXpKbTSDm7i1WU',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'DoK6oIArYxWtA07yrB7Fq4RC4tFO94HNse6PYoIolZE',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: '9r2zYcQPZQ_m4uac6-L1VxCHLMY2w1PjxATJBuaBRvs',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'rsAfuzLB5SkwsqwP6E0ci4Uq2v-9lmoTOvdwGt_54AY',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'X4EuLxu_RChrng9P29lLbzOJ3uS9lvvdteBM8Acmp_s',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: '5pHnWsPyudmeEqoT_0xv_cWfrHh9r75QvWc9e2IWBEc',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'U70KGXibOltmKfjk6hlzxehEk8cBcCFKQnfMymPhW08',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'AlJsKSxpumTl7dOqS2f_3i67uCNev654uOJP0-dvYj0',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'MDIXsANoIUazr-lq8eYBNqRF1q0bnBbxKo3KpF-CsdY',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'n9TizJMDQCHkzd5kVmZs59jhssm3Fi_PihY5qvGVOo4',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: '305q1RIampF0x8EiP26WowEAoPt31LyJXAIaCPSbx0U',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'ALimYae42MOZmo-ZWHACQn8Qhkh2iQ9wnxD8CHCaJmI',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'maMBv6t2T8ApCrvS4n0LEjwQuxxueRFJaTxfcwqVSj4',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'EldlrmE4exF3QFLE7UIEvxHIBM0Lr2OrA27KBlW05lA',
		},
		{
			cu: 'cu45.ao-testnet.xyz',
			id: 'RY1-9rtgfc4yjYIRvrePj2l0x-S1HJ2fYL5siBJ-d-o',
		},
	],
	'cu-46-zone': [
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '3p2Ds4MK0vbiDweZyjY9uVrKSWKVoJhII9LrgrkXdYA',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'c98lufzg5d_Z-4o-P5DtWTs4OXSgx6mEq9LKqnX5Cpg',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'bXjAFQs_p1vuJ4h8gwV8t0a84qZt8xDEqlYhFcdN4c0',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'M59TGlRauYnlSxUEG8IWDeZGZapMoEyjlMW2CebLeC8',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'dAdATU1N1oG23Mz6UbyoinSgyhSAXvQhaXkx6ft705o',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'gH2G757-Ll7R9PHQfBc57N6q1QzdjSOawKpluAukJNg',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'ZCrH_pCCQRL6oeZNb6_Yi16_J4cUrwDkc24SQtSjke8',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'M9MHC3DKmQa9H1hN1uZ3zd3GOd5nw-Wzrct6I-ug47Q',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '9YZSmIyGRUL_jRajU2xZA-IlOP2IFicsYZySoVyFw3c',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'OqLQTJVETjf-ZTMCfRnVinJimqzSkoR4DJNDztaWFmY',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'a7cBWT_doLLzZLEHUE2HGfBj6cFBWN7lYi7qKfHAW6Y',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '5pF2Grj-7S-EJVcFUdrAmJ1LNDEV9a8q7NkWJhkEhjc',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'pBsZUuPaAZksHOOt5j6RzhtHe4e0wbKI8TYUz73QFjU',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'uwkNNrtJ4VdJ0qLFExw2RWaSUILPGGR7gYtcfPN62sw',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '1l1UWKmBB17n-4l2m9UShsdH8S4swgg06RyHkfUgm68',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '4_uRrzpG34Wp-wTP7DPBd9kXuf9Vsn72Db9Qp8olRiU',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '6oUzhTDXrie4tAuY2m_AscUCaI6NIFWpgjgSSzR_1q4',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'YRrnUhRpEAqcZZdq6yYv6pxkw1V0Fsh9nzO-9Ufd4ww',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'Epcry6WplIqNjiLLjHwod94kXAhIMHVn2bDLRPh3rME',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'AaV0BLwlyvlm6ISt1x79Mx4zQKJywmYM8gbT9J8te5g',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'wTHEVszJagXADsylS7-mC73NYq6nrzNDnD6KLFsodjg',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'hBXxJTabRJlkZO_dKRTEiw1fiuIDpdp1V-WQWa-7yjU',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'dCIe51Y8CVYY6ZvoYD1CJ_HT0BrBSiwNILzAi9Va9bQ',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'W49V5orvyFltHwuVQvRuwtRvkro4qJuUM2cxzAcy9ac',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '5oNxyUBWUZmBWswb7gCipZ6ICU-Jxa_bkUgZXRvLBYg',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'MFFR2WQwaKl32ry88lYPWjtkfQccliK7wXk0ihRT7Fw',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'M31j-ZAY5PqVqn_DbdwUxmZ2ZJWcyZS0O8Ov8v7Uqbw',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '6TDhGKBOQj_Bfqv7bMkV-LZOIf7xp7g9EdsOlgMr_tE',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '_At7W1wfWe7YEmaV7JdSymHwLyO6h8T2PUyxtSPaD7s',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'jOiVNiIjkVVrVlJt-CO3HLbZ3-DTFHd6S03kHJk6UGE',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '3d4b2h3JpvWH-DW-_jKICdPlstmSQqMPEWc9VBnHI5o',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'AA5uBb8rGrACYdKr_iTVeN09es4knJBhhMFFDnmzU74',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'FqBSdb9UjGPajhN_fM3mM-N3KbIXYwesV1tFjnrrK2c',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '-lq26pRKFwo0XUeb0tj7D77LWI9eUeRcXfXSPNaVuVE',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '3lYOwuNHm9JPBjWk5oFzwClRBgc7CMKHAXWDPx3Jxow',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'OtoK8exakV9JSCn4NLC9sTWy_1Sn21pJZud6GBb3Bdw',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'cp5016JIc7wPNEM9NKa3xLV5zPTGtvt9PdIdy0gpOyo',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '_dGMtKf1Rfjo3uSqW0lrbyKyWKsn_domCVbe8pxvbSs',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '5JxLyM-cByRXaCv3lsGJVYXIhgCz0PKNNqRoQySi8DU',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'yVINgWZTCmvj3IGTNS0KdZdW9lRGwOrnmU4CJMaOwA8',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '7Mi4klfCgJC3K0t2Z0TkyiUx-m9Wn3WG_mHZtd-MuSU',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '8P2FElOl8ycRSKcfixIZGoFGiB6z9HhHHK9oE1vzSyM',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: '_pf-CyJqINc3o_r0WZ3IyZN_UJAjEshhLJKWRfphiFw',
		},
		{
			cu: 'cu46.ao-testnet.xyz',
			id: 'ZdlaSxbLcmzpjJMhOyaqqIMMY9Nfemx31LUJtn36FRo',
		},
	],
	'cu-47-zone': [
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '58hAdtvXFRwOUEN6wF7sB6eALKdXWj1iYuapWZZEqNc',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'YKG-KkMByUX4Cyyew2XYr1f2ggNCPEJWLrU4jnNUuno',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'iUwlF81Y856VjcNbiuf6AKuZ1nJwwkY4815glAoAue4',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'HeBKSANQM3sE1RpscFEDp6epoLoa93g2ZZay5Mv8Tiw',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'RzqbNP7VYZMlXDq3sOcYeezuhtBWofBJD2WtXlVvkcM',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'SbsFLYkHi4TDGpBIFhVFWzKwKn_CnP9U_b9jZS7hY_Y',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'ifMuIQOAv41_DTfRRnGkpPhrqsKQ1c0MbEfEvzTnPHY',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '76zcuVIMapjnhogiAxyUE8UYMiLmPNSdoidJrgr7vpE',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'ASt_CSAwabvaVaxNIsW5IbdaSfgTiICG1sj0NnIVRls',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'emOTnojPRVcE1WQOdTXu92eUf-AHQFmAUSHmWtCXdQU',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'HsRwPnsAQwFYbzqCnrs5Vt2AypziVmtpRTewVh1soB0',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'V8PpOvQD26dtgMM8Ba3qEIj4O67OYl827qi2S78T61M',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '9W-Ba3uD-4QQRopCjopwuq1VmgyzkrA8Qjz5e2eGcBY',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '7DJcPXPBK9sxsvQ-mGtnJRfzgpCLLTqzr64Xp-8_8a8',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'CUwrZ7FmbVVUQLCvDUCIvFZyco5bNoWrZYqiMMgV2WI',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'dgFlAWmTmTLLNdqn9DUnNN87IyUJpq6cCLz6jOC8In0',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'rbW39lBhuiw6uhrB9zbCOIYPHvDoHmOmls5JE1AM0DA',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'mxG5L2u2XDicQLOV7Jgt-L9jReVQAQkIzE7d4WLHXV8',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '-onAGCgyDU8UnLTZG1T8Lfa3_vPSjxB6Rjtf1Ziy0ak',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'AvtO0Iqp1bkVdCIXIxYpCkIH_1Sp-jZfYXkmJtYQGW4',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'o61oJKY4r_SxcXN3uYLrAL83RNZqmzfukiVGNgyi3VI',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'SMKH5JnFE7c0MjsURMVRZn7kUerg1yMwcnVbWJJBEDU',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'cFEs_k7eIMBxYzfgsoDkY5liex6gKvqDnLvqGrN1VGE',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'QMTGjqUiaGdxgRaiaBGWZS5bRtOn-B8zohVWyF-rDZo',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'thseZpnYOJ7OPCYQglpxEGhs9Onlp-yFfLguoMB1L5E',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'yenYKT-OPt7Vmr71s0CjUDA5bmCoOhN3x6Qxc1EtWCM',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'AL00B-NvdNYgLIFc_3DyQPYCwr9tLyX_xmoUHVb8BAo',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '_Pjo13uhP36rmedTk9bXTClSPh7K0l2c3B_z9a_EpgY',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'gak0ADr3RROp8gJTmlSS71XiGIYqsWkV6jw3P0PTZ0Y',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '9M7Ag_jlj4b-Xkz3G_IxrzvxvsHNt5cs7vjW3isxMao',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '63akR7CrKsFG_AA37zUsTKAtgr8hr-RBPLLGY-qJxJs',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'NB4-eUzQ5zbtovsZB83Oe0IMHtpCizNzL4_wiDR2Gz8',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'mxJ6Rlphu76IBqJqNlq7wOVO5jusXE7DOES6MvCrWKs',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '_2HQ9hF3oPfLC0P4cpfAo6DymWFkBXAbyhnzw8KvIy8',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'yi08L0eCj7wZ_Mu6n2svuCJ6F_KDPayxAxq8KGLXd0I',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'nX275Y3PqmpaVMKaa52BuSKgKAsQZFS2ygQKr7hpPQc',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '8cm_Me4Hshg2iKqwAemG5pmUDUWnsWlwjGy2sdTrDEk',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'IYJJm34LtBNg8GTyOUTpfS6ic8HgNNAnPWnykIEFF2Y',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'rF1IhefkPIZ_8JlayMbUktcWNZYrKK_hOpQjcKBUJ4k',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'cb42r2fOmW_5BXcobUtc6alUIBVFgYXomGOxwy5gHp0',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'H6HxIs5jVZPIQKrXaya57GwQVSLhNo6YeszvecZfHes',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'dflfbHBI7u7JXZTdfuGNhnn_INDdS23IaTIhKqqPORk',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'Q4Hh4B9DigJ3Cn-0O3D_0jOiTISp5UUoQtu6ZoLfdZ4',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'CK5fNFaLzOKATxa8zGhO3Fk3Lm2tEihU_PLfWOB2hqY',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'NjalemOqkSdj7O1ZJZiPAHEkS6JLNVGnG7Ok3p3dMw4',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'hDMu-8L5lgUfaDBieZwG_HdkCJ3XADuVYextaJ-pmC4',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'zjFlh64uA3jvKI4JTDM1wpp-XfXvGxcZMggHmCHpIPE',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '7DBpM6PzWfoGmcmoCbZNGZKJsFYLMsp8AwnB9xcp7Dk',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'w4Lfe-woQc380DEswtqv_UWV60PVY3JMsbyjVyCS3vk',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'UqPAizqCheyJBetKBpILst1IQpmKBF9lVGtAM5y5aqY',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'VvAVzf5xZeRhAX3m4822DFhfqKByBVclN_KPc6B3zr8',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'bh9v4yjVqJMWjarkzX9BRqcBnGCNdZPK9vXPM9iyGr4',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'TZEmDUZYiJTRSJo4XQefy-u_7WwTsMzvHpms99VnFcY',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '2pFu_Y8XeuYhVvBYEoLjPAstUn7S3DYLHz5bQ_Fm92E',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: '8Fmqn4NGT5cHO1cd6qFoWgQJ89AzgmAiz4AwjDXEX80',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'MFKT1JtDD55tnRe3q1mXTmbeNrSrofV0x9IZWdpERYY',
		},
		{
			cu: 'cu47.ao-testnet.xyz',
			id: 'ADqUrRCJSlwBrG9K0KSm3Xqoil-uxPA13bmXMVUE3Kw',
		},
	],
	'cu-48-zone': [
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'uQvtowyT_5iZJfFmskIPbmPBkw2OjUiP7qwwR-J_Q28',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '0MUcOC3li_ycnjBvllMyDzeWZUvnlSm-EDgUBuVpMuc',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'wKc54lasXHqjAozSFhaeR4MblgX5pFNTBhET7jr-53Y',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'z-gBDvtP-Yg_cnnvEDyE7k965QXvvm76_kApqeBvIrw',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'BTyNdCbsCcon0984PxxoLCl2RLdpwwJh3Zl472Q2Bvw',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'Kl_g3AjldUaqtq3kTPszXB0hCbfIL2XU0pfktyrlSkY',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'hkm80OXpuLtpLLVa2phNFMoazFIdQxq5iXQ6utg7vHc',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'me07oFdTyQ5UiSKgpnJavFQkXwkSDL1e501N_IB-664',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'dxhTFM91ouVqjs56U6vTRZy080siDLcvgb-faLYwMw0',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'ZgvNAYk0SeODzezXySBRCnRCh8ubhgPl8fLUucpGsUs',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'R04206FbggwWLsuUWQtDUHOi6MDpaIwClYo4Ww3eKVs',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'BdCYJ3jXlIQfqIYyHjgh5_qiSunWNt8RSMMNXpPl-ss',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '37GSyCqQ1RJ2xWxNj7dNh1MSaAmfhTx85m3B18SLaPI',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '9xpkaNHEQxr5h_1z2HoQF7kvd_jR9ZfL1_fzKW1LfC8',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'j119sUHDBD7l3g_e5Rf-p_DjH5cW2SzvzIQKFNuOpiA',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'PwlvDKDrbbSOCwg9Rl5yjqXBidmmWJqmOVNticTMPgk',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'BfbMeDkeXjZZ5H6WTRT1UtsT7qQjQl2ygd_xWcWAD50',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'Q8deYjbkaDvDU6lmJItFBZDGqzrIP3RCkW_6MuKbMUk',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'vPKKCtXOrUGOdGqyb8_BLheEBRidsQMG1RIucLpM2Ko',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'fMpcsSueni2p_fTrBMGeDHEXRmk8FG6mteqhNnbqZsk',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'PaMQGXLljk2ZCK0-pSbw9r1nZQQ9ektW5nG_yO2pJ_o',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'PDFrwfvivFw9OrPuy-4XR5enuUQwCsoyWZnPkcuM4nM',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'Be5lfBYWLXlw-IiKXledpZpfPbYHzuTpoDN2JV0DMf0',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'oBIygFp6enovw-hQlQS5mvhxySumnboRutdEtgPhBu4',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'E8Aq4emvxqrpMv_kXkrqfa0rfYaEZPIN6lRhbNRgFTE',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'OB4uz0k5g24eQSWURvp6Uu_Cy82T7nyz-AYVFv2k6ek',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'jZxi1HMau1dAuPiVBUDz7leqwychLCu1ZGVj3rCnesg',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '1knOWo4-gAfkr-RnPYbFICDx6Zak43FFiVp6WssCFg4',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'NAveCWPE8NQvlwJ09_iksHq370dVrwiAcdE31FqhH6Y',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'qiK-D0B97q3L9-twIHyAkskVPXnSQuhF5Ys00qrkKM8',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'xnWjyFdwV36XfuQYXZP0PcIl0Shj80ziLYz003Ym80w',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'eLfDXA3fNwDYD4DF7nn28SEh5osT2bOX42LgU7hZnps',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '4GyipzyX3WoLyRqfJ-YB4Cml-9fPXy8LCaJv-TsW1DQ',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'C3sGftRxq173kH52VmrXkPL4zeb8wKOp-sCsit_TI_Q',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'EyeYWztW896X3DnQnIUbOtUELJrpjvhBW0ImWIx17-A',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '94GKrGjKrIQW9y8PmJ3ls-NR5Du-ls1qzhOqRhsW844',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '-uLFQhOZOSbvPvnx3AX3SXdHOOo-0LT0jjuBO6zdGzA',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '31rUAHSSoPAjenXvNIM1cdq6E23JV20JleTt9AbGMHM',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'iljKdTnw1wjTE2-0Rz1UEvFY9TYOLy1YTYtQoz9dcok',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '8ABtWviWtjsdodt66R_9Y1chEw89qUPlyeAn7GcFOn8',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'aApXi76WFrC8gPLwf3r-DU7ZS_DntVOtVQ9I2S6N7AA',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'q0Jb_IlPNrgopS5iq1zHrY4f9DlOc90VirHP5bb43nY',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'tqtUKeDrObNunO5BAfy7LRmIBQ9_OIQpH9zkvP1v3vw',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'az0JoqhwyXh07WBv_sbg4AkBmQoAxQ63haPsGnBh1SQ',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'zOlwQ-qWX2UNuIXiL9ZsiZnBSjgnlttXbsVYpv6MFZA',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '7Hw7X845ymcMBkrVKgCPlbmpVmqykFYUsdeQ-fZMSGc',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'r4XnjDAgZUIR79SjWRrmmokDYwEub4vY2d8qAgoWjxE',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'wTC8nAw5IXy9MiVpwVBZeBsqNRjxdplXyjIxugYnd5I',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '16Nov9c2Et35OEZFyfxBSQhWGcFPA6pUrlik-9xKqx8',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'gha2wjwJtaYS9qPZ-1LRK5Ss_jbU1_pHHVQIxrfLw-s',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'lb425WcXE3HqriS4UzImwttcTSa22RkPWozq2f7EerA',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '7tUJixzem6lx7Tbx2Ks_qX-rJplfRzDdcSGUxQRq2Fw',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '1BkrTPbYaYg-S1chkuv9pev7OClo8mT7msdWR00hGms',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'jK_zGxgreaGbsV15vbX4-vftF2y7gh-cqFnAI7lPJ40',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'sQZhA3aEGP1l_N-xHajyFbOGL6nTmRNRPAbpsZEW29g',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'JPTeJ4a-lWTYKpZ3SiFgWnRsiY1uk1_lmwuP1ZNxiuE',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'EyM-kO5CkiNrMx-63mmRWWW4cxHzgtPOVM-3qKRjyyg',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'DbuNAHzS_-uxisH7OlOKMi-8jEYoiBSFr3BZroIt7eg',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'dw089owYCX88kYawzKjY3tfcJeFDjxS85-HBHshB2uc',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'GhnQwmEIX8fKXhlyzUPkjMhpcNtOuFMzG5O8DEw9O-E',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '_4GO7CtuiLn2ctADyKrQEpjD31q8pGKnnVtDtk87iaE',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: '79_L3GDLIbWHPguh1DziT34KlzMjyWXrZGkq7v9C1Sw',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'YL1ilQSHntHiwYcBRKFy58KUuU2vYHZlDO3aIDfLXF8',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'hPt6J7SwJU1QvPgsYwi-kf_UahbycQxCi9umkOf-UTY',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'PJ1WK6GyYlxoaZ6iSn5d2UXYC4qpnY6WRifdShea5D4',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'kwjQ3CrboBzaVwlVZFi43hMR2wTa925QnimgZtQnyaI',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'CPpik9xxd15yE268ToMXCM5qddqeYUasq2aen53jPFc',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'YK3Sk1dY5f6Ia3n93u0-ajy4MvITJDKIvVGCJDQn34c',
		},
		{
			cu: 'cu48.ao-testnet.xyz',
			id: 'aqp1Le06N7DgYeZCaT1uNGCkvaOsSJu4AaRGjTuv0Bk',
		},
	],
	'cu-49-zone': [
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'cjh0gPgt5H33uiJK9yhOjwdjzK6RfXkHRTf3dKp1kOo',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'DJVE01Atbr2e4Y18UE055ejgCfQfciokoXBQSfXQIwY',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'ZVjfmmhTdGHST7WIqlzFxXof7e9u8LMUvtq8lu12Fq4',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: '1AIJxIB46IaCAsXi0SJc3Coo2wUv8QfHZgc7loacsQk',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'LYJTOqFyIBZDuzmcqyZmcoC0SdrnLNmDXdppe8j8WVY',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'LWgyLbOAsnHAOHIKQ514QSobmBGEzyY7EMiDwyS9lno',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'FBWhD2RXzn5p1PM1LgN5S6GX-asQ8AfxTgnORhQkg74',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'HiaDRGshIzJXWXcNKumZNsTwCH3y3YvoIDLiM4veyCQ',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'sjjtoozjW6TphVKVgyHZ68gBrF_3lTSatnOBDhezyGU',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: '4m6h1VbON3ArSwLouuLtrBJcCZ7Irbx36LWaZ_bYvHU',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'dXjnEe81K1LjFayqiWSA0IVUmqrohf-Tm3cV_DjPHpU',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'X5Kk7LvdeivXaM-A1klEarIFLGtl78mx6Kj1UYUuALY',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: '2w53kl5pySCRIA9HHoMQOikAyOh4T6oKZHa-01dmd0c',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'pjTHSRLQwtu2smjpNkzbAXe7mCC0XykmGbpL-SS4zx0',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'PBg5TSJPQp9xgXGfjN27GA28Mg5bQmNEdXH2TXY4t-A',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'guirKutSqO8CYKHuNNWBQLNFrLI8klK1u_2EjZnVBkY',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'hgIpIf1GOIH0iitOQhP8CrbQw7ttytxhaK5USWHOvy0',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: '7b5csAReOoZXAO6aPq5JVrHdZ_j-fq6-yv1VaXmVSJc',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'adzUVIYsB8TJn2aWSvqprinXciUJ5XiT-qe5BZhr8lo',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: '_Y24_XsorALSoWAmMU2cFl3rjimBDgaf_9k1RIp_lOg',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'tmC16rIhWn1qzyfuIutK0lprKWsl0o-GcWTSSAJ9xnk',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'isY6PmgKy4HgAtrziy_F795j8cmL7hJo10C-1tdiWqU',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'M_PNA1hkmQWxyXOTJYCuFKtD5gYnfQbxTCexYZonfrE',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'Pw-JxVobK8Hclq7ARE9h_CDuJLNUcfI_BTMCWZ29n1U',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'XQpoIf2atBtJApKCU3SyySf05AEiIpFLD7-i733BjxE',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'qyrjfeyw3Jw2yMgHUE7LY8HOunMSw3-0JDe6cZtXFbU',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'UngKcF4TdCReiAZa8vsiYzW3saKxRz1j2uCnBsY93gs',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'xyhux4MWuuRhSLGEPFthXxq570FBK3XMSuCC_I3EGqs',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'QoTSA0ysZUe30uZ612kPUzHsVn0-eiTglENy5fgEa5w',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'kS7L0YiOM9FaEseL6AGpckZW3vPl4D7ZTQtWckRyu-w',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'SJFO6pGkmsV9PBrSxig1xemY19c6DOESqAndlF74jjI',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'SlnZtFL_dfIp29AMocVOfXaJMI06A0YULw3-K16B9wg',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'B9nahNFyfWRIhLl8dWG2EAYkRneBjuhn3UGgRrO9dwU',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: '9tjTNGZNNJ8Crn2laDyOJzBUUMevyGOsF-4So4o1Pys',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'Ej-1XKk3dWFK-4tsunvoKxbRdZDEJa9eNqGwgnQ44QE',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'hBC8ARuWNgbmJx3d-4G0fkURVfOuypXBB1OXtzFEd50',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'QytS2Nt7yubloch2-17e6Io95ZsyDNlNVFSgLeLIXVI',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'NuvcbHqKzHKknIf10I9-n8zEzL0OBf6WTKEvGFXUfwA',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: '3orP5f7a3c9pIwkcuiC3HS_QdS2fl8ntc6_FVBcv6ys',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: '2jceFDX70udoqU9VmBvTvlnHLkX5XE5fJYJ3a3LE5tI',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: '2ynEq7SpP2JHQwf3YelUYY_F-gtVyxe4BG_yy1RnTaY',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'exv7TmSmHo-MILPCsyu_FpuTC9UYjMRikE0R4V7RV9Y',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'kSBkI1vp5FK1kj5LSLgOc43yucWzXhWTNdSlhV-WiEg',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'MD5rfegyOFWyCELMkVNuM1BgItYsJlRyvklprkr0lkI',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'MhFw7JgyO70SSODkJe31mhFlkRWT0ePU-4ZmEZA3Sfw',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'v9ajhS6seYVOMd_quBU6LWYDSMANLzgritrMkYotRwc',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'w9ZTB_I4JAno95GhupeL5382DYeu1piL1Phd2_dro6w',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'gN9zcLoPnc9uxvkJWQZmj9M8_FeAZSSED9TgYU3W4S4',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'KLFtUSX6ZgwgHltwu6JWRMcRd4kgoRchIWTpOIaliWY',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'vWey4Sv3fghiv6n6K3B_KBineU3kj7d2ct7X0YhK57g',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'JpidIq3LD2FqUtENPOWmsropHvFzSAcT-1Adp11in2o',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'Bhraqls5cT1qlUCJ97xbRmLu-mcFGNuojp5g_m4nBEQ',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'fmP87kbbMWNTSk3ZUGSdeh7zmcwgVDa11Z-yedjQTec',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'TLUPDqIe4uYCJ59VV2e5WbFR26Y27WkZ0OJLI2stVXg',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'HlMnfxn0Wyi-fLPJlXVgVIgSWzliN0Y7sN1w7JK5jCM',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'M2xbhPSXxBIRfBFI9ATSCG6FzGtf84z3_1K6o5iAFls',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: '7k-b7rYep6RYXEGikIGFq2BX2tPvRHHerrNN7qlnRgE',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'vkGAL1-abVNDDJE9lha3SxVotRxTHF0P1T6YOrntwBI',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'wD5tX7YFcWfqTvLQL8iaMBCa1HQk7h0FEuLFsKuu-fc',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'i3iUkYGgw7Q-cOgOqPxXDlhut5LFLzUp91kkVpz1ipo',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'qievSKRdv0H3o1ZzCzET7ALC6ISa5Kcy1mogVvCg8SU',
		},
		{
			cu: 'cu49.ao-testnet.xyz',
			id: 'BOY1XISqVjZSoh5Ea9119H7d8tn4lgeK861Yem6JLfU',
		},
	],
	'cu-50-zone': [
		{
			cu: 'cu50.ao-testnet.xyz',
			id: '_jLGN5JvJOiNj2HeLasJbRFLHSTV5j90v4gf-AE9oKY',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'na9zIZEDimWQV3Zz-virR0SL9i3K-M7u_z3XR8jPluE',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'NH-EHuoRUX-6OlRcQdOin9iifGeZNLUFgXoPFOCMQxA',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'ToEYeg-OYaXv4lTvD90YEJJMT4Kq096eFyrVYkmjBCA',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: '3uknnu0yPyOA3zsKh87fnN6uOiwVSVyM_6YmchLwxg4',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'Ttmv7r993_zbT7fSZI5dWC4nfyjQBZ_3-XXxumRzQQE',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'AbWYOo25yPuUwzq6rLAHb7mYw2AX7C0LOwwuXV6JzAs',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: '790_GTuK_UPjUFzmgpF88fz1dRSjAu1fspuMKpLoLNs',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'lfgnbx18ho1W8ExJ8XqyHSk1pMUn-hI5SMOyIgkdCpo',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'wC6xTwSpYkG1BBsOZWYkU6Y6h2f5vUv60kT5xIqlXIk',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'ErUSYaU_RhH29DbibsiWP9wKKxMhoDtH5DJ11zLES_8',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: '8urnjrQgohu_WqvHnn4HrQFidTqBLYTWE2A2c9H6QKw',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'ItY8Hr2JRbz1ch7KRKQVNe4gDAO8Jt_Af9I5yBOpM08',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'SLY3dUZTqZWHG9Dp1qj726vsdJr4hoV9ZhYvtzuwqeI',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'ZnXzjI_dj0Pq3kcf8K2z4Vo_ewg8CkszUyRSEYTzF2Y',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'nVdy9b3IkFueajlzwQM0MIQz-NSPPAIHioWnlltdAsg',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'lr4OKSjWCwUagwS-EDYtUi6NK9ayumGX0HErw0PtN_0',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'j0V9dCSQ0PreFQ8Ln6j-yzHWCZABEAQTOVBbdfLh-s0',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'Xy6wemtx6D7owqOOy_u0vAjmXiQ72GFhxTYu83NOsZ8',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'eKECsvAaDph0x7g8-mmrqp4skJEjBTCnykkft-HmikY',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: '2emCQMU9nu6nemZpaYMqnqM21zl5x2nNPFN6dvRzcXA',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'gG85LUHs0LlIUZ_fzdG9b_Wg_Ths-AvqsWmQq16HCPA',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'JzZwOnjtpUHYcDhCJKfEQsRfAAFMUnUUwzHIVs_PEiY',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'kOS6hsESYllEISdpTAyx6hNcE8oiSDht3Wld573KrGU',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'suwqi8XBj-htduRNmTsyMVKYSeUchiBynLnYh_S-uaU',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'k1AA5xUm_8gUlETCsUZxQuhT30B3Jok-PDNo5XB7XxE',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'giCXnhUHnjUg320QZ6LY90P5CB0BK4BNc6j0n9fLWfM',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'mRoDF5-fmGHhwmcWv_ZqgoWaVv8i796Np17ma0doflQ',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'TuCsHMlusZ88yHlbcgqt_aWXTSXPj2OhuwHn6nhie10',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'Krim6GbXWi6x1eP1eEvEqX6z1Pnl0uGqr0ULKhErNVQ',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'sUTscB4V4wtXbCuKDxkwJ05MZo5oF7Dgp7XUoL61kb4',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'YWFbZHHOpaJD11eV-G-WoS50IGm4Y7rrL0EDkKRNCe4',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'HN9VuAbTriTN_htBv52wN3Odz4Y7AXAZFW_kIC0tlYw',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: '2Q-qhFRfOiZKnXJTrrazJ_apRN2tFzBtJpmJPPG7ZKM',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'GB5udAwgmj5KU4v4_yViQ-lUMyggTrGpnRwFej4e2cQ',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'OQ09_zaWnOmq_5DgegXr0PMfPs67YGvfiQO0lsjr-WA',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'spwz2-PH697C781BgCKnVmYKDeAYnIncINNE8cdCPDM',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'zKXMPTpQy4Mg_uExbExF09W1i_IIwUulzVI4hdzqe4I',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'EkV0iqMGctas237w6OrYqG0RYmMWOC25a2Br0AAV7JQ',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'Bi26qQ7acX0WvIdGFlO751gHqND_ACn5qJb0mS5zRzg',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: '75QsWIGXyAe_3wyS36p7yktuIBg0sa91ed7_aZqKJs4',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'aIn9IRxO1rWvN6aagHhzBVnpSHqmQtx83HdnDn0MeLI',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: 'tu5bF5qufJiIrvk7z78YZamYtx4bJUyHkMRRUsjziRY',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: '_i9riwdilKtorT7cazvCJxoidWhmaKz2B3bDM1D19RQ',
		},
		{
			cu: 'cu50.ao-testnet.xyz',
			id: '4b4xFlTdtYZQZU_nhItc-hAxd5JSQtYEOITgCRTrMd4',
		},
	],
	'cu-51-zone': [
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'jZ0BHA-hDL7Oe5Ejl1cGEEYZ9cG1uiPXzNzbjKJn6Ck',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: '1IAtam0_rgxAZHPIKn4MvYx6EXh_5hns_4juJYQhjpE',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'BN-iCFMEtzjhTc9o-EG_yaTiBt1qOqM7Rlpmcjdjfqs',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'LbiIA-6cqPnp9Yq9MGe-3TSu4pmRCJ-Uq9tquChBVh0',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'EX3VElMW_tWNgHHzSmjSfGFQpOTAs0sxUcRhiZpsWS0',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: '_5diYVHOndSjtvZiQxgqmsMuoyviVb-4LqZtk0lOf1A',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'gsY2xCRIw-TeRnly5lEzjCT06WmHYPQ-0hOw4B0tdvU',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'A8hglJtT8eX4WfBZfL8pHQ9ADgSCtlN0CM7xY1Rpo30',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'jrKXdJSNlJe40346WyXczqAFPxCzAlJ8JyxE4SAulIA',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'wtfox5sch4_gxQEeIPsnJbDzBd74K-nc0Tqb3FTPTgU',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'aZk9CHhmNu7m7aUv0yjk7RhmS5Qv5BX4Tnj52QN4w8U',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'rN4IFBcu_mvWitGK6j_QCytj4f_v4OyOq5vZnLPnke8',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: '0zNYXJiJXpBqXGw4ZOhVdprUF-FlVuGsMmUC9GdKm4w',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'CNmf8l96XGq5Lxn79fimnV54HHkkgnZ96sdj8cSKrT0',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'Fhvbujs3VKKsC0FjQhbDG2X63HYw_931tmjqb1kvTwY',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'NsvbOHyRnlFsdNNWmIGRsYf3daHe7j17XNVquIElWIs',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'Ps33BhnwA3tt7GYDLgltG_jcZSB5l2sDZyz0YmaSadU',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: '5ZHyedGbPo0-A49BI8B9Ju437tzAX76umD156Z_EDDc',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'fCyDlzCUSisiVJRfk2gZdRDx8tKaNWrzH1qrYJd2zW4',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'hlv0-BCVHvs47WydQ2w3dDrYCgE_rfav-rDnKosZ50k',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'fNsA4ZlITFsqAShV_mahFxDsGW4bwiO-8bB0sAOzYG0',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: '7Zim5HolmZDmvm3bO8M4mnVewHOVCOaqF18CLFd_9q0',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: '1QhF0XICJ_baaa-pNnBq6oilpZSEOSi0I3tqlLuWhMw',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'C6_9iiBdUoTiNCFkRPkuZxMH1j08U_GLgpwxJZ6uBa0',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'qGISMfwIJHM4B1_lBBN2y1Ais0pWDHgykKltLzMwnuw',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'WL-ENGsFj7k9jvtbj5d2nj_n37xJRya3oJi0ZlOWU-I',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'xKzMOikgxWcz3SjxwKJwrI5D5jkl2eY5_n8k0WL4s2c',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'XxNjN7F92jaMco9cXXvjGQZ9eugTr6IKffgJvGn13cA',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'c7Y_ObNpa-cAE4bGqvmVV94Z1n2kxPkHPVlAvFbIgkc',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: '3jQgOsSjh3qa3o_UEZvp2-3mo3p8FXYY9dGDyb2-m7c',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'tJCwlBuAWlj_eSrjTUVRUrKbTDHCtaeYDEDYWLkzj84',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'tqp5n5r-9hg1N-0U8B4gxCT4HcLT_dB7W0mkRbYwsts',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'GAsQNRwAyhD6ozpdt8zAptd6BbzNnjeF05dHxKgZMlQ',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'Wo_7KLOAQT0knj3KpfycP9f_-pucMRCMUelNC8sVXlE',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'WQptSjgu9q3pz7dJD5yAWDlno62fPRv3jjmSxi6vYZQ',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'RcvaIUQ4pQIG9jIsA8DVwJaE0luwNJZ1K2appKloaK4',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'NoPb9sCg0SsQKbMDwtgrfdqimhaM0hpskHqv9QYpMpk',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'm151oBesBwYDZkbSqhphqUhuo2BXrJxQzNNbB3C6fSY',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'EdFLDge-88Z3ypr8SAbD0U2YkE8FM2iFV7mY_Hi7s2Q',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: '_eoSyafVKW19SGB2vVX-H--QE8ZIM_NyBlV28tCj4eg',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'gisUDogJX6NSPfb0Gc0UArqGBRRcl1Y9mTivQRVBj3w',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'J9Qo7Vuw712JBEtMgbN85DAvq29kq6cyry18bHfPCe0',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: '4JXzYMGHifLMdO01LHXFnEJTOtYhB_9_BiPtEudlrpQ',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'teTWQOLNuLiyO0qLzoHKsXB1iN9SIAq0EpjS68U3rTs',
		},
		{
			cu: 'cu51.ao-testnet.xyz',
			id: 'cMRMa3t2t_zQdlzySuzVxPS8Z5PdN9onQXkZMYZ6Q74',
		},
	],
	'cu-52-zone': [
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'f_yOXrfjxpn1Nhuu3_auWOdf63pgm3QZEqcuT5WB1cQ',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'WFKMSToAC-UR7tKGJDO-nUkQqAebl1u333rhivqiMzg',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'ZqqRDyGbrDzeCUPFYIYe5LZ-4bL0xbjPgs5Z-H7N4O0',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'RN9OcsIAZHT5VNeGM5EeGkqS5duYLnFo03NATA1L_b8',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'pTuPR2tkfwgLlQKFn0CAHdnB37aZr4OdtIWmUe4IhXg',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'vBx2E1wD6Jl_jPIGl5arNqZ6x_o8E-fbNBhNbjbiGvY',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: '_XRreiA-DP7Aq9Gq-C_YCdXIAVcV4_3CVJlZRw-sldI',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'hKn2hJ62S0DIRRvoGksbZ-YzXMvYkS3YuABzVzolCWc',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: '-1VFsfbScBZqf2KDw0UjMHTO80kY794UkSsfeStAj8A',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'AMpUE2BGOudG86LoFiy9NzBkQ3KbM_NRu0u0EVre7t0',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'RU3DY7exqYHMinFDzivEEu0eOll0aqI-ey9iHolAPLA',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'Th_Q117cxVPRSveo7fLp8Vfn4rjurLL73g7Yrt7KLH4',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'ioGYAU5jPlDlsJco-u3-I_ex8dzq_kIQqVcmHvDRYL0',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'sgUlcgRzGgpvDm8gBZxc_PmtKqUWAru7SdGZJlWJZJw',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'L0nXSogQzoTuUa124dt9MSGH3gkg8H0saWElY23EDPI',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: '4-ObiaSIRnDNtWJO-iCG5U81l8_f4kXDe7vUQ545pNA',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'SWYBIRxmnMnaFlfFbji3B-4jFlRc0QHKtbzVMxyLnlI',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'ymhhsJ-S4RrRWwXHojmFX6MCs4KaAmQNDOri_BS532I',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'mVek6ol1BAK2vGRC2l3aUhi-Y6pIrxddYRQSj0J7xLM',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'bDjX6zNJF4LhXYfQVwT3NcYooTGQA4wL8ei7d0q37Bc',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'euOT9sJHPta-7nKJjwxs9kG2M94EKzNlfPj2bSYxjvU',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'scJDp5q8TrcNnudiKNQ1RlFc-QFd586mQ10xj2GtJw0',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'BEvpq--AV2p1-LSdW7ZbA9wfk6tkB33VJ10T8eNfHZw',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'kVi4unsnvOXWBQ6LECqPCSS3Sp_I8EdxE696MO60t4A',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: '0J0YxfBPPcDx_LwRqvIb_gNqV2RlRuP0DPzsJSjWxmk',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'ggpCaHnFGBgJEmF_UUPRdxN0Ywz3dxFewC-fYl3hBpI',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'N0RXiepZee5mE-P0PR-mcGXjzSrwMaRvy10UYhB-IZg',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'sgruIV15M01_SV1m3wrDANAtld9CamZL18BM1-tMAE0',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'HHhcKXmz41bItl3WVJYpX2vXxlLezScRhTF5GCYd4Ao',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'CzjWBzIiPv9mvO0R0muGZniIS9vKGWIzT1Aw2xs4bxg',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'GcptX3xAkD8eI7GCfiv6-PfEDrY8m9n0uGN1PHxdEN4',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'JJXxx398RGGEGHcaT2sMUxCOY5RzJePxqhZVXWfEp4s',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'Rw0yv4eysurmG9FQ4OZgH1rndB8mxdtFaXyB1qpgYI0',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'SyfpSZd8MLkKQpiIosbCKfqvGEpLQ17G9fY_A7QVHBY',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: '61EFgmyUCySxMPQI6UpDNJ5cxjVlg5QHOlBD7LIkpC4',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'lzyFD70N2gBVBz43a-p7Q6T5m7_oT0yVPMmIi3gU5mc',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'pSNFzmE0ScdA63FSfgSAWsOd9EoLZuoxx1hfUU5Zo8o',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: '046ITAiokWyaBddOG-6HAVYJDSbNE2HWf_gSoHZbOHk',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'HmB_aCKMIcVKp20eg1-bSI2RLSwGnXoQqH8veFO-V6A',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'h7TY-LqN6e4mrR9_7em4ScxkhSX9xCilJO8Tfdegl1Q',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'GtkJ2cWbVBQceStctpLtE1tpbvHnKAesixWVuheZldY',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'yECYeLAZmrm_o6YCO57SP09ERTGDe6dUzgq9ba-nVFo',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: '-LcCuH2uNYQuA2rd-R8EmZo0rOkYGloioPDNTk2brK0',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'r9A-QzoaO8_lLBkNzRMHsTFRnOdT6GFlwTPXEojoQTQ',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'UJVGy7DoHzpDQzU2S3BCofxUpuI1q6OLURVMXT2iwbk',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'zQEapD09l9rSk5hCe9Cr7psBC1MJVOQGVRbjEcA0xrQ',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'rBWL4Xf_dh93EbX__eGuvjRW4xq7LqzzgAHLBPU9ybY',
		},
		{
			cu: 'cu52.ao-testnet.xyz',
			id: 'aJy2qXGJiJ6qCYf6AGkrXIFOtPVm6aEBrwlUsKBlLwY',
		},
	],
	'cu-53-zone': [
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'xnFG3e7TH-04pdt1BdJQ8Etc4vgF2LljKR_HQFQCviQ',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'RYznp7LZk3kCBtijBZnSUg4r0VFil9Fh96Lhg8pN6iE',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'kA9s7bllUFQ1cVVfQtdGzog0bQnMEYvQPq1E_MSBkdk',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'kypyYJw5M7SMFeUvBBF5imAhx7SK_UUgaBrO-KPWb5I',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'hIdn5m_IyLJAubTGHL2RdDZKCinx5BqY7mg8dEp6vwc',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'ddmJs_P3IZmb0EFxpsex81fKAIebck7AYhEdrluUcok',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: '8sTXGYJiFuDM2j6Mf1KiyShbwCOSiNtlesv5UC2lpRg',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: '431ycwLv8oQW6aTYJn3AyW4llZZLuKRtQTQd8H9rQQQ',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'yKaF-JbTAoCQs1uHI36OezXRdIlTEdiat64GiLdUgDY',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: '53a304sVxda41u2ADp7u3Fqu3O7u7P0S-YT2fNmLeec',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'ctlON4rflXN3hqFUMMKDcbFbbGaIvUWPfiPNYcXPBmY',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'vsTeiyFl0q2xq0MwbL5_S8V2UEgyc2rZjHataCF5c4M',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'VzcSn_io8_dhdQXK9lnxmMpa92g8que__lOH8lQ2DlY',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: '_Y1VZ6BY9zgLJNH7TocoNMjk6UyhYJJHvoTNuQfWF34',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'zSs7kW-bjgWgSH4F8CTU-pxBQNAwD_qESgY6Q4886e8',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'lXhQlemN4hm_tlHz1BlSwI23Zsxzz3016A0L1WOSoiI',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'Sz3hcxiafXfnXaDmFlJoh3CO71grnghpFiR0WSqO34M',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'EN5wqhuAemoYAnMm39sYHNr2mQk1CUJN0mcoA_ixl2w',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'os7VpB-ri8qmp9P08cyB0OLWdjp4MnUhMShTbVHlFB4',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'nkU82Xh0F-UWSnTHExOOe_Qjyxe-NyhncylLCfbTjAU',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'wYm9F6TTWwcxa83ZIA1XRlrxtubd4o2-ZBSzomhoOu4',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'yC-Do5JxGmk_Br1R6J_Qpia0RSCC1yHkewSfVkk_t2s',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: '74KYD-czdPwP89y-IfHMzaPic9wBNTrQQYGgZv2qaxM',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'r9_Q9v1gw7gHT_JDjTpLliuiesjttX9Ir_qu0hoSDaE',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'KbaY8P4h9wdHYKHlBSLbXN_yd-9gxUDxSgBackUxTiQ',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 's5KL0bRE-06ZUl5I22ApDMLLMGkG0OD7rxVpVEdXFUA',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'RXEgbKnLn8DEbvO9B-qBPPTS3o8jly5K7af1GtfwTUc',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'zj5Lq8h1agcJsiDlmTS8X9U61HgVGfHIha2fSD7h5RM',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'NxJ6rmAiRB5xboczSEDqW1dyo7MaFUs_S3l0lUxiziM',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'cTv-IVpqNUy4S2Hfh5cQQqSmR2e9e7qOyVCRvUsfPXY',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: '-nhttykpvWe15udN8uctSkn4uWw1tZK7ea952oPV45g',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'pE_7OBjkAE3eoi5hMCXrSqBZNzmOVoeB-T_JO8lt7BY',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'jCfjUPJqKDl-QI5UYN7Qe4ORTQpD3pmayY-gUzaKR10',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: '26WGdqR0iGVG7SZ1eP8_ilOl-WwtxHfT1i9uQyqaN7U',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'oTO5_6iGZij1BAobO6HmxfQxvLpovw1mdj9y_1w4Cf4',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'YZEq0S2TvTX5dlx7X_WZzUeOT4P7wcf1ajDvDy0V3Hs',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'LwCUcnH0zL1Yv8RX8aPkVMGl6XX7vtMLkHtwjhdmgcM',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'QHaGWjSVDguJRUzA8FfjqxLzOyGxkKsgeF5hWO1XY98',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'x9Se_-QuhWB5GVTQibtG3Ae4ZNwdqGv2q1KmPTd-Br0',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'h6F8_ZheeER6m0IxmEu1upuOCAnKi_Bzg8Ng0Ut0elU',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'lAcV9HPH0YFmkHkk_2sbo4H-J3YclmF-kl5wz4MelqY',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'jxaJEKkKTnIBAY2kE2-_SEI6ykZFCXz2KTmKrvOM3Js',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'QS0aC-FHFcX1WmZ5cvnFMe9xvwd-MhEfcUl1bQ4SKhE',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'zX5CzzGdj947xnyhwCiE3tn5rK6seIoza71JMNacPlM',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: '9HsyaDeIPoe53him-d5HGvd5wg_asV8EgOx_Fn3g6HY',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'JqgsfLB8EQHraEeRQpnKuSFxZPFp1K6JvJdtUAsOMKE',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'llyqIaAuCOF9x3d_GW67Kox8TZOt3sfQsReyTYtjP0g',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'WqdKuTTTkVnRjrG_Xts7nqEdbsH2a6KTigI8YpIy2U4',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: '2yVl5r_EDyjypW9gJJ4B_AoLO6ViqRjuxrKYMd3YUAQ',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'kPJWu1T66vCHDCks158DvhEn2oKRMgYBOIOLpaGAEII',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'B87cukb7eGA7TWi2p735W9d9bx3gFCmaDeVMNfmaipc',
		},
		{
			cu: 'cu53.ao-testnet.xyz',
			id: 'OqKHBXEDtLsknBf91sGe2tOPZVWLaniFl82xTws56LY',
		},
	],
	'cu-54-zone': [
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'pgcAsmRg48r-4M-so9mM1RPsPWaM_01HfwTF-Rlcg88',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'ZSsWPj6KjFhebsTdd3Oqcsn3Ipdv0JPQRx7rLwEaN0E',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'uln9Hp5_AE_rbDwDJYmv2s4A8Z0NLu-669x_I0aUmGI',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: '72yfvkt6tcO1lukxgNTey8ZVvH8L2iZdliqHiGk6uEM',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'ddXgqy6MpkKQrR6KiC7LcgXAUoD3yAjVtIE8BP-bTZo',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'gJe4ix8aB_Q-UoDgvsrgMNXPzjWj09xwCOxNUeh-LOc',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: '6_JpL4_8fZTz7srV7vQ4V0itLnLL9BNCV65dG5m9c7c',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: '6APEQhHHX8VzkZqwz9et7w7bFE1LIRvzbLUZaiFXcLc',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: '8R6j-DS_AAEryPEG39dHUNo3QQ883tskYzzAmC-Qxzc',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: '9a_VDdhWEiVWhbma96S3V80QGvFAn5oxyLFLLaKhH3A',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'qr5PScIzm5deZ0RWyVO1lSO5SdNIodbDlTPSR7xJgqw',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'Wh-yJTsiSxR5zirzpX9CevO9Q7UCuBxvwYPHA0vOkYs',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'KJm-__HqxEZuWVuOugKjzkRRYJTPMPziAANs7SZQvkg',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'mZO9axuVgl-xvttLQISDG69dmXlIN-NJOSbPshde8mg',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'zeNoc_oUSQJ4t4X2C7ZlqMA3TBe1Hd9eSzkGJaSLXII',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'FCcN46GUtBdfs6asSp33Il1c7uoctqF6t78pjTQExpc',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'cbmhc5noUsXGfQZEIYHc4XkKE932k3wBhj6bVpXFGq4',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'i-bAAWt643kVnPrtharwwSivWgpLB5lIGqNfbUFq05s',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'S5RC6hK_7bam89m42M_Az8Y4-z6kWQbrU5bZtpBwqAw',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'Z_GQfn9RRwYPOe3qEZUXzcjvX1XFT58UYGChTbJwoJ4',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: '4GMECYf4721vFYrqk1zaLR_JVb-kNIqR18NeMgdPY9s',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'Lx-SxbukFLFqQkSA01e60ZSeybSq5_uzS36kqQ4rcC4',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'im9D-znKqfY07cuA9X5pLgN286yzgQU29hm_m3LW3JM',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'MPdnJTSNBr6IilfoBGJDaSMwLW23pc4FDvZXJkmgX0I',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 's3tWGj0Y391R7CMgrUEP5r67iLBAh-Q08muuQ3EuhnQ',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'toVWW3adQW75IRgeXBMDWkPsAHYlaSy-uF3K7vr0vQc',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'gBbHraSAxKHTUZFzObHZH97Qudgwr6Ilcz0ODn9V9tI',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'bR8SXl8r5MvIxhSPvLM7wYIVAQ6DJD-8HGcqzcw9dFA',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'y9dDw6EZ_ln9w3UZYSoKmEERLHBNP8dO7eWFtLkmUss',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'zoQFUr8Hfe_oPhDx0Vs4Y-d92kiuHE5nzm8pPWH8xSk',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'dhxJus6-k4ygPCTFTg-RaYyhgVM0X6PP_QcGofA9SBQ',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'HvQE8UUXbVWvXymaL2kKCXkjXKpwlqa3697QjB2Attc',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'ODPtn52Pu64ILL0UflTWLb3wgiSlOvdNMkIWgvgmLCs',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'JQvn4isBtgq5IJPsjpQ6MuZUu4FfiTPiLgzr4xNk0Cc',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: '-KIbPcrbbLudaILBnak2ULBymE6JDT8NPO5-S97n8rE',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'ul4v9GgG0I_LdxSddtVNEAX_9q7GuMTpki4QfvPKCeQ',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'KLdKf82zPsWidmTbj1BoR6Vjbxbrnk7RVboOE35XUpI',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'z0wbZelnj4JOA53hNZ4QicfQt6NpmLy4lXWFMrPew2E',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: '9d5Fa-JwEQ5TuA3CK6V4i-458h5NT_bx17t2tdN1lEQ',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'PWQUWA93PXVIfmzzUNrhbnq3-6rIEPL95UfgEgFyTAg',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'thaCKf5TryLQeJo54oCBPefkk0FeXgLrgxPximCMa9s',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'klvo0HybIy0D1UhWa2UmKK_S-BQ7tnUz7ltodLewhCE',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: '5ThG3RKR_gsENRlLI-5uPSKLxnqWwWoLkpnWelOBYS0',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'VhoGWfXPzQi3qQWgwiSGm3E3PTiHopls78J0DcWHwkc',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: '5ZoJ0bBqtW7UzmtXaejXgAKq8nQMHW8r7YhKdDZjkHk',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'LWvOC0EToUQmGfdexAU4TBN624LDCUfnRq5gArUkFVk',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'BfERG6pLb42NMB9rtQEi96nIc1PRJrTyBXSAlo5QPMo',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'MVI-DMCa1EjFzrbhcGJDiOgqzRFvzfEStwt9J6JOQVI',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'fDjcuQWx3oXW6G40D3mILSDzcBXqF8HWTvYUNZ7sUg0',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'aYMNYd9QW6YE6XNSJDRR7AfDeu0VxLORO7fUb207Bp4',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'pgIC6Uj7SnfkVo5Jwu16EOLhXDhCnb5sdNWPBShgrPA',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: '4_kwQDVIODVDBIXeHLaQqIAw1ypxwgvQY9uIb5QlTeU',
		},
		{
			cu: 'cu54.ao-testnet.xyz',
			id: 'jJmmloaa0Rdvri2aQKsSaWvxO6sL09upwtP8ulYRzvc',
		},
	],
	'cu-55-zone': [
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '_gvE17q_lmm8SdJ_ZbOCFRl-EDTjmUkCMG6bb7RMv8U',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'IDTCOZ0xTxmB7viJSPcX4MIRkgkOeMnhYqhW8quKjCs',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '7ewEV7pNL6zgOCPXkYS0OLYJf36qhNjh6xgQqR-Pegg',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'yswdtd9PA9YnStdUhtJ5eoQn5C60l7Bk8cQ8m92we-s',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'pTX2NYD6qCKG9cQU_1yYsW_75-hfepNbBqOf3GX8JM4',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'SpkZWLmuKAQ3vIK_1ErUndUxA372HxPtB5ncxa2V9VM',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'h8O7Z3c6fBDyCkee9ajWMijTK6182mHJvZrgYtNOTBU',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'A_7ljScO6XbrpP2-V2T702t6FjwLXleAwy8UyABzHmw',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'rz0N1tZAHwa6LQe9g01gbnjovGT8aycY-fKEn_ZSonc',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '1JPV-kVfDaTocM4JBNA34LfOi_8Cxzh-FtvJpvibG_Y',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '6s1sKigGnsa6qvZVQBmISpJ4MyT8X522pb1fvDcBixA',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'eT4SQhl-YLMYW83XMWZnHKOiS1csuJ5zOa-Xka6-jFY',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'vp6KtYdYCua5dQ-ys_JmNmXs4n_iHklJte70ljDtTCY',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '5IhBq04dUNCHrXraffjRGE1O4w80QRqYq3fNZA9Qlwc',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'AC5X348apU7evv1rI6hDLj0P8woDDvyd0iukvMwIrfM',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'j6SH-CBLPK3wxktInnrIl9ZG3eqW7e9omQwPhs1Q09U',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'lCKxS-DqGJey4amBpcZkIXF5chp1juSM0uKHgaArWV4',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'gufvPV_iw1EGC_GlQv1JR_gmi38aqzndLDFKZHSEhaA',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'Hl7-Yhzg-GZLVCCvMS4oDsLNY-oE-L9VfFGA2Jrf990',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'M09o3zT4kGQEkISECkAgRQ0qP5rVXsWzhuRZfBvJuN4',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'ftUawQt0WN3xwHdat5gOeP7f09PCkt47mWOiS_ShIPs',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'rKp4wQ2Huw5Sb2OY3rDI7m6pYuhsNU_VxT12uECy5ZE',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'xQ_HdkSZ_HTXp1BMGp35eqxkKck73qJzCtgEzqAmi5Q',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '3737acBGnnIusDPcP-ApvsvAFr2qQ5ARZbZMIVj3jZ4',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '35wo3qgQvsZFPe4Wj-Kva0hPHPJi8PXLO7RRPx5b9bo',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'mk_YUVItXTCS7pID1TA6ZRxz3akZvgD-Dwb1ozhrxvw',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '6HVjDerWOkdtB8rP4A8A9wF8wCLgqC20x1oPOxybHq8',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'W1JI3tI3dQTPhp79gk5usYrgYgFm_u7Ni2dawaxC3Ic',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'rXSAUKwZhJkIBTIEyBl1rf8Gtk_88RKQFsx5JvDOwlE',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'zZRFLKW0mFsYs30e-KKkrJCEN2omxkK9VAA1xQt_JSM',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'gvyLJlyvH6Ik5Jm_W0pd68qoBQxjYKFzg6Lf2uThWa4',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'lk1gl7-jWVLQd20eM9TAa-d3EPFhy9pX6CjGfiP4Buc',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'Abr5vtcxw1OLNeGzsogv6ZJEupj2sZYxUiUpyHLxeac',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'eBZy4zIoUn2_pCHUxPkeCTIbH74QM9umXZ9E_Sniu8Q',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '_8AZzimIenLpp-ToeHjvumgLKzhOaaJfsRXvASUTocg',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'sUtYhcVM53zJYy4HiS1Ij-oL4hqLBlLVMuBO-gStDHM',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '5yHIC32p1A8F7cjm37mWaWUJvOIsSxqGU1gIpJjDygA',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'O_mSyT61JJVa1Cp9EapMRfCaXy8YZg35iO-vD6-o3f4',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'xeXCg-hQhqzifsClEnuRSVwiDoOtFoKjUB90Q-BSsOQ',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '1t64MNP8vUJL8EKsq8sP1-v_YY6LkAZBlK5TPwrMUbk',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'BPDWIpVyE3OwSac1bhoUqSgjoybOblSbE__pjgSklNs',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '_Jg8YfZPEupNWXCowSIQp2yZ6rCMg1uGOAW5LnZI7JM',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'apZ6vgdk7z33sFMDSSQiMhi0zZpN9QMRduHz0Pw037w',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'mlAIVl1Wau7lYxoMiEC2NXkQ-_3zyBeONL_zirJee6U',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'w8uNqfE4TJLdCDm_YXJIV9VO_Ng15XscJo6T4tqOJjY',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: '_s5u5hvYazYt9VGGpA3C-duUfJ4PtAFrT5mBaI9_lDA',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'd6_h3Ynf0m4utbIEhWgirlfUQmd14KRAMgtfqZdvxqA',
		},
		{
			cu: 'cu55.ao-testnet.xyz',
			id: 'ZBOTt28d995wWy8g2xNnyBeaNXRKwzi-7ZOtNchLoDs',
		},
	],
	'cu-56-zone': [
		{
			cu: 'cu56.ao-testnet.xyz',
			id: '-VxDd2SIpLD-NV4bPfl1QBOGHrwRZwu9ZtAfM4VZuGc',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'ATUcIggF30z54EUz9x1AT5lzkhutuQp6n7uvKzGfCyA',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'GS7WNpFDxS3-wCP6nux1FC_1DZu6JMaTnFVUHn9-kys',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'pXdJoAt1MdGIJLtxOHQlIcQyktKaJzDC1iPxeEXmEIM',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'TKgwARy6NXoa8OU1o7KY8M1wozT175vSmD9pGKAuBGM',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'q7CBskxjty1kO3WV6akfDIiIs-SVm6NNh1YZPGnJAnI',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'nDQDtOLVAwN9C3JhR7uAsQpzBFbBykk2qTzJ3jYmBGM',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'Jl1a_R2zUcBJqHmjLMoyzg1_c_deBdRjjcwjkMDehNk',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'YuK0qfWjwlLKxAZKRKuVaPwJRVuEQ2pczVqsfKTtYh0',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'D3AlSUAtbWKcozsrvckRuCY6TVkAY1rWtLYGoGf6KIA',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: '8ppOANNdtjaREMjlMC5rr639twvm3UQ4XK8q0GTKMZ8',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'slag3FHhPMr9NM0n1ECCoSMJnr-3Xt5tt_YnFPHTAC8',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'jmCH9R-OWAcSgf5RBXGTupIzUm5x5LpnLrcOkt91_tc',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: '8u_VQgMIw8B5GIZ05Als0wlKa8iHDg2alcXX4xQWchM',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'cQoZbPWEjUIgWo2wrfabd3tThZSxAgwgWKY2Z-erUBo',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'KK5EGz7ODA7K2QFOnVbS_-8ap81pLC3zV62dGi_Lbmc',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'ROx4boxFf18UINa3uemc7K7GvPRWFyLkp5-KsjUCMAk',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'WfUh1jIsrwS5A_G-i8jSxgp-_iVz-xVtgnpcno_eAbE',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'FitcF4-PFiF_fgfqRvXUFxpJIlZhSxYjTP8mFY0p94k',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'pZmVdq_5IjYs0srsN3l8-W3pHdIQ1LZrhw7e8ZLYPOs',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'w-YfpfLUIby5mlFLfG_7J71eOALJzDZxbkoQ67umvbo',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: '4HO0qMHt0CxHzg3qZAokhUVC4YHp275XvS0T40CiZak',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'UMvtvPcWlSzbmyi6lao4BGGWsd5XDjNExzCJY8-CsGI',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'wZgv2KH3XwOxR8i-Dn4csbL2bAU1FcTXyWFJ_iOP5p0',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'B22WoZJs0LSXW9gTDkS1wah1sg-LSnPRyKK5_jVjWXo',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: '62q3-2GsVBgQUtky3Blm1OJvbezYTVW9JXzJEdz5PyE',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: '20V1G_ISRrak2veioeDzSjyQJByEj4xjcJtHkTdwVKc',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'hvfBvAdDUhycP_r6RgKyC86WF_8sN-QccgW6wLb-Tdc',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: '3f85s7cXhzZvbr9e95AAEw4GUBA-5_bssKuehioBSnQ',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: '2IPyCvqKhxE_8TuFugU_4S92m-mF4IVsNgExtz_kpWc',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'CD24fIehrKjqosvX7uWpzK499mBWNL4Pre38A2g1FZc',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'YQ1V1lclJgBgt4thHCWPb9z7xj6EkjcYw5u-VYLmqow',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: '-3NpIo2WkLqpmiiTrn5AinXwoS0pAmeJzFc6-JPC330',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'fAQ4929dcQ08dk-O2i7G_QLEEPDhJDy3xLB_B8NF_x0',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'DtGhXh5JrjsIFmG6pf3R1n1FkEXiyF60Ak0lbcB23WI',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'GDcXRdaNQ-Q9UZJ4aXizI9dRevSQut1n-b6JvRo_g58',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'H91vFk3rnJPsIBbw4zovL2jdJXS-Y4g98TraXR6T9hk',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'MmGi-pdP36-FpuXKqAmRLSx0qf0Y14aq3fbhtTlKdlI',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'LxP-ob-D8WsO3TgDIP8T5Ls5aRiWVBXQ-GplJJPQjvE',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'ZDmYt7VEVvPJzfTygoQO4DzwuqYGXRxMXehuXKFSfRo',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'Iq1pkHZDuIf-3IC4j4YFllRk2BY5uWpHJqlsodoCmX8',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'xARwLHdFRnjeJx0gFIu9rZ81XD76B5fuAWj9fujm-ac',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'LAySbZSSGG5YT4_vAMjY7fkw6Pr5uGbxMqTfzByCgFU',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'c6N-gZmfuVCNvtRmZUQi_WSb0JNjjAo0pDt3H3F7t0A',
		},
		{
			cu: 'cu56.ao-testnet.xyz',
			id: 'vwuMrzHfm74Jb9PQnYnGMvscj5PbDIKZF32-GlnuWO0',
		},
	],
	'cu-57-zone': [
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'XQhUXernOkcwzrNq5U1KlAhHsqLnT3kA4ccAxfQR7XM',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'n2hYHCKJ5icRQCjTlBL2Zbq-4BfAlT50-Ez0Suajqu4',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'GxU3UTpwgoOat8xzVceRtO4o3NFnJ0lb2sE8-ZA-jE4',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: '3Q73e60x5W8rcgoh7ImAy2tSEeZdZuYVjezwYvcAoZE',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'D8u9YlE8PqfMvUgoG2I7KQkaMg2LcQ7018ZuuJodHhg',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: '0Ihtql3U1qwesHtnQRqbd-vs3kXlL76ECKVOgZ55G5M',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'V2YCleOjA50MscEcTceSg-LRm80MYwcydn0iycVVn4g',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'soZL6BqTEm-vk7sVgJB80gsrdfMCkMvNPYpAWFS5bdo',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'yNeAfSUdut8RY2-Uu1tdpu1nVnNv3VLh0kWQINzhVLM',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: '5569ghjgyrGeSJirvxdLhqmvsrHd0m1eYe-7ukmorRo',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'EonqgHAtcl4BcPQj249_eDb73CHx7ywnExMJ9eh-FrU',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'h7KHMjt2Ds7f_mz67IFEXcN8qzrQvkX78sL5vKgvlhI',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'F0NYGENZXoe9hkafI6fGq7zyzsA5joVfM-sqSRGiy7w',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'Q6i5hwKMmX8zxeBDFB3LbUzR87I3CZ3qCERdoconHO0',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: '6warBwkDWbxJAoh5509IUhdiomJd_TMJizjzFQNK-oQ',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'dnOxLJXRxPk3PWtu0018VYFje4RAUFLj1kuBJqcURLk',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'HFdELTODDHJtLRvhaAAJpK6QAsve5DXHFMe9vLVfTkk',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'y4wQqO2CqKZt2GLSNXnaO_rmzQcEjCGNmyz6W3D7s8M',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'NQeoj49gJrdSa28LLPoWHMKkj9si0ZBrId1rwMGhu-w',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'ViMSjjA31SDUpnNZdpWHhrU-wEpxtHeE4fp_pL1Ux9E',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'Wr9fUfdxgTmv4G8vf8CIc7uVethKlbzWRT7l9pAwQfU',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: '8swpqMyVzYyqH2s5-sKJuxmGTfycAoQlxOkrqcfu8Xs',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: '0rGU46ogt5N2Cok-O0_QdyK8iy3vl7MUs0kFKJ2_mrU',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'e173XdgJneJKIpF5sYIHNhW705sgN5Oy20UU4hJH2VM',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'c4Dc91MXipIX_FWw27Ljek2r1X1Dp0tJYCphTi_0xbI',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'jxMmBPi9vYs4eSxxmsyGhuY6i9JilRILkDNkqOTZE_M',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'C4rs67YQ34-5OWx_wihjurRFKMeq7_cO-a4CkfHD-CI',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'rKN0JUA02h5Yab50TP_O7MqnOjYGn84aQra3QGPyLXQ',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'fS4WZFpsBn4bUxui-IynlpAiECzFKNbCyvIR3VQbcSU',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'Ju-sbM2Ko6bBnrpUTO8cd1uRCa7wMh7JhXa4HEGVHRc',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'rsPj701CmAe869YGBkk7T6u1ECOIrwEXEgWo2lVX-tA',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'ekKjTNc7soQFx_bJJMIJYX29125XkgIsl-75aaJ7IYU',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'k-KsNigS-y617hm4R3VV_TJ1GVqoAYqYbJlNZwLh0z8',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'Eaa7AXjkN2cNG2NTQU73wyM1b19yckzafc4c-b_FAj4',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'N3GRE-DvrXZ1nER2bdKGP5AuQpXCtUwuYk4xCX-PuPc',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'Xfq9BSdgBmH6z5vgpjY6PxMASuI63omF3Wyseh88wD0',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'p5VG8Ds-4qYrlTHiVwtrM3cUb07xL3NZ1Cpv1SfLdpY',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'FAclEl-7DZCjNA9MJydLGFP8yvVCur2Cw-SdXy2dOFw',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'BPhs7D2lBzATIVKtK7R7XKYp0Ef1P5ebb9JHW2dBxl0',
		},
		{
			cu: 'cu57.ao-testnet.xyz',
			id: 'Icp2ocu_KgDtZB7QDUZ5RqlZAS1Gd2TXevkVhkemdSo',
		},
	],
	'cu-58-zone': [
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'fvbwtdDMQe84fqNkwmgY8ImTWxvC1b_5SosOgefJBDU',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'BGvCS061q80IXRCctcHn9pNA6TlLuxL-761po1K81iM',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '03w-jJaRGMOCIWja8eIfFE7deB206N4W9Q_lxoWicbU',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'R7VhDllByoJWhNYZFFsnM5zewE30OuL4MMJwTuUOC3I',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'T4Sl7UGtpbK16Sd-Sl6UJxKffokLCFp4QD7MgoO-69c',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'HNZpAX9zqpPImUDygzF-Q6SSGLL336Cshbdj0ExzORw',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '2Y-C1n_SGUKSvfJY9RS5PaXqstumaG7oQtTwzKyVXcg',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'lHmt0T0exEJsJrJtcjmavozYY8srd7j8LwoVUmw7Smk',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'Me1AXeUBP_BPbFSGUVN0XSbW7NUy09KqgFYhkxWE40A',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '1sBENKX08OWKrb7ZcQzoc36yZoR1b1sYRo2VdCcNwgA',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'xF7hMVE_OxYO8NlgbQiaqvk2udg-U9DzrKzmu50cAao',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'BUGgIzKyCdtcLtBl0Uu6IXa_A4swcQHsIlYhj-UAkN0',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'MXtcor5GNi71JkI-ffCqrTstwhrJCCND_4iBl8Jkw3M',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '6QpixHcafY2gAw8ECpGT_vPYUhvtozv0-8dO-xgjyTI',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '_NOIfL_H4wD3WTNI5hrJ_Xgj18tfMPm6D6o_jBIPJfA',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'iajhsVEae2chR3HhZ1eLcg1fZf_6vaoir0A5Z3PLkEk',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'VV0GSI3JAIBKcIbtRoU0u9suetcU0Cjxql01cRQjG4w',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'wMM-IesKXgOtKswlq0_HA3NQd3uLc56mJR_y1Kdmf70',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'c7EuLSJTtJtqFOkSpkGBL2nqVinaiF5DBh7hOg7nATE',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'nrIPHzHLnCVmm7huyFG-apd4HryObZSzOSfmkuUtjqI',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'fd6LpsZl-w1cfJB5kg9RFM75b9lTxx42csQlc2XLaNs',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'm058vRX8k-N2PBL9lXPfPnIj4nzxCUNxLkK--954Ka8',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'B69xsZSdCu21PUZUw8otBoPnAFxk8dRtBgQ9OE1ht5E',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'T73IogZGbnDOT6PBA3-xEzXYep4rgsRaGp1_713239w',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'PvDYRVPWChVQoLxDO88O_H9eE4lgUJcnZyKRQjg4HVE',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'trdBaOnBYcvADJZkQFiYzhZUND7bKiLy27Ng_9OiT_E',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '5gw2lfftMASW5Z0E044PUwbjnDskATn0JZX64nw5mME',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'lfvV5tN9LGG8n1FSRelxZU4MmMorYq0OTMiqalUQRw4',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'v-AR5THDR7c4bwcLHFCu_KeUGczcdnjTCeY1UHNHy9k',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'q0cQ3YL8hmxKKZTERj6TSmmnfOI0QFTcCbTz0ky_U4o',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'QCJDmp5PZrCKGAtBbXoE_r3H9vNtnwafwQ5da30SRz0',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '5McOHMyr0vsQ9GO1_2Y5_m9ntHIWQMs37X1MB9S8j6k',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'UEgso8zoZqYDl1LklkQ-0CeTjr3uilpvhFWMfY21z14',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'MXnowkKkUyAMqgIr-iupcOeWPFe6AUMX1A6GuLMXkKM',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'qeH2BgGH88EYU2w5TBaprENfh_7sLF3ujWDIfUxLQQ4',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'fQtcMxrwa7jjfqgs_CedHpGk7LAZIcjHVrBRZAbmSwM',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '7bHzK3hWA7qOwNy09WKzf_DMe4BwLxnvZ8x4veSQYZw',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'l5u3sbcbh7vbbAqJlZoTDfMDnAYmpnmWluM9uCF048Q',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'Z_M18hZESF4LPjIo6vCi7kt17W3_Elvk3i1E8j2syL8',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '3yCuVz9VC5qL7X8p_uIMzgUoPiwfdt08CLI_KqI6X_w',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'aPt--quLk9Yx_iEqbdOPO4L7cyeLfDKNzoBF4JSIcbE',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'YUXv1IqNoUIb5u6ByOAlrj6WT-vsifH6oWY7B9dntTk',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'a4MVJdu8SZzQdpPFDn5684zXlqjL6t0pN8emxH8yb4A',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'RgJWgMoH3_afZc0N7BdMNYQAEuDcrI3ntmdFKTC9huM',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'p0Lfcf4_IYrT1TuTD_BBdnorZriqWggnNgmE6koS5DE',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'WbKidVT5ncdfzLLrSlPhxUrD9tSGqst5aOrGx-Nrmj0',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'JAty7LucyC3HE9GCcDg03uwyzA9aeXJ-WElvfsLIJaE',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'XYMFfgc7EDMrS3lfjDNo7bI_zLImAA6eyQr_ycFz64s',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 't-Cekgwqsq7iH2lj_jR1IwCD2P8iCZLDLXEGJjkWZDE',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'gUEoM0Q3e281EXArNVm8CE5h0yh3WEIkykERv29TLW8',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '2HHdl9EGpt6q9gxlA3w-v28XOoSzS9PqK9A_KNax3Mo',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'jq6z4wV_SxFHL1XkEkEZ8GHL_0OZ6we3PXFdeKRPR1Y',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'PPwfs6b4adpNxo6Rvz9nZl94Gmh707XV98bcWHJMzcs',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'WXDoPOoMPLX4iSHPR8HMXJazinjAtzSRBZPOfc5VuQA',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'YSEPrRpqa_95_nOXAT2VV2uNPVyMtHegxJluM9O-IdM',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 's3ayMHEm6zV6xOQtWPkgkCaqUVgWDS434QbdfaI1JZ8',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '7MznPENTNrrCTeidjPMNftAuYfFaC2uWCCfVxKF0_lA',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'IdGvBFL7cTeSHD0hsuBMtvR41E6WsAudXCDT9KIt7HE',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'Vxp7wDkj-1CT7PI0lii1wlByb4DBfN3DRzC9lY8_fY8',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'obhVRK04NYeh4WqtjUzQJFJY_oLBCMYAu1fsKY-aNQY',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'vmv87xbyh1356dRYM87Bl3onWx_rVKywqPd3wETsG70',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: 'UFGxvu7HjLz6HTnwrJnbKMAWcHE0_hKRJLMbGNJaJrc',
		},
		{
			cu: 'cu58.ao-testnet.xyz',
			id: '_IcXdzgYfjQBNgojNPJVeKua88L0qHiamOSmKHxsJPc',
		},
	],
	'cu-59-zone': [
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'aGetXV2Bp_StKoy01-30cbo01hs5qo0AE1k1MTd4Gxw',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'jDyiadDUDFz61ZhfeNzeRrLuBcPeedSEiWxqAzstlF4',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '0aL82mTliR-MlDgGvWCZZnApoPrGTPRrzzMMqDHYNGY',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'HaCYSdmzT6jzKdyvVwlg9af7tt4oNMk9UZ3Va6Elpco',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'jmFmYF1fQn3RTo1_by3l0SEQzC6cf-SdZp2NyD6jB00',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'nd6QJjfHFiXFYTIANNdCX2pThTw_jottmmfpFCAaPkk',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'xBopfUfmddRbtWFCPz9_oZ9L8PDLbAd8ZMkQbp_iRBI',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'xrHrJyzaPE3bhluxFhZG1_z1ZEvLXMn_-zqP2E8d2bk',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '1eYJrPE8AOk-DbKPBUdPAvgsIa3A5h88FgSdlbPnFJk',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'IsgW-mbNNkhxzl-QUvhWqfjj8X2uWWdGNdvCUo7Jreo',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'kcAdgBUyctPnYYrnFBKKDKi86A9HdqoSIvZfGvF9Ocw',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'uTVT617nw4Fq5dmeLxvraTg1PgryDF1jJUj4yPG70fk',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'YGhesskEF2-Bt8xvy9JdG4vzl5Nm9eiVFx-sGYG5fVM',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '29iMPGTk4fmwmKCMR8yvKO-y2EInP_2B7tfnLdVDVd0',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'f_W79_WjCOLM8WeCakqHggMT_WGidEIeXKWC1-OrcqA',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'nf4q2T32xaqlAhKrYk9Arz_42mWNvLT_ChU6xZsy164',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'Wb7oiZKU7sYWOrT1we7X_qInrntqSRBeM4aCH4gGxnI',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'PU1PPbXlJtjEM-S9oripKRjAAieSQUn6sf01UgOL0fA',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'AHjknXOx4yzcyJalNzwMLpRCT7cMUdyusie2fgDh8mI',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'K89tUqaf_J6Ec3hBpOgew-9wG_fqxIag-hcydXsatRo',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'TFWDmf8a3_nw43GCm_CuYlYoylHAjCcFGbgHfDaGcsg',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'xDXi8V4YUE1wpXIKBEGXCzMgqoa3Q-niQIB6naLWyYA',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'I3rzM8joPUUq0ZLf2N-KZmkIseoyLcML2yYDfUkKVIA',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'qojXdenu_U6XjXK_wQfguc_vCkCF97PamTacxuDh8_I',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'UG16iSLSmAaj9ZXUVanRaTQSIfP5y2Rg94kZjK2MOFY',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '4IkvO-wjVVcbLJHxOIQg-mqHHH7SeJCbYtFRv17cTVs',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'bzUgmciSXiPk_E5J5DGJXkj8iPQ_Po0ithm3YN4c3FA',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '-h53VZaIp64HVVe5TkAx1oVpZpWWTNi6rbiPDxcc61A',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '4awRV80lvxR2xxYCJesEqJAxp1awiFsoMpLAmO36zrE',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '_AoGV-anOKtYSw9_KLUgH9iD1-8GHXWe09707GHEVpU',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'n4esIKL5F6jTYAEh4KhxQb-croXzEJMFWhDmSpWj_sY',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '1uPoiRsmMhqGbOU3OQEpV3SXgldbQCb17msCI1j0-aI',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'qxzTwSSLT29qK5AQgJZ7e9-qG_czxFW3noS2-lXTxws',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'MgRhfha2KJkl_mSbFdqJxFDGP_ywPJ67V7_WvT8ffnU',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'fLGjI-93v7Vu_AhugTpCDibzUIoScxgiFQIFN-fG9ic',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'Q7f7NRK_Iz7QkElSI86ABGE144dSeJowd345qTBNJek',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'rEFgB2DMFpfD2Tc3HJhe-hEEYbq4rDfvlD8WWqklG-E',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '17YHGA1UkbJg_7z15V5yaveEP2Tq0G2dfT2IKoC3yU4',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'DhiYsqOtkd42rSlVyNOyJ8Clxv6HmFbIfi0fSz_PRik',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'ijTnTFS2lXLlW6uCQd7HIHTRcrlCubHCMUkblw3X_NQ',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'Uvfod24Yp0EHOKMZ_mfffzdgmdeo89ci6Mz8O4PpALs',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'UQMHMZsoczrPl_Tqt93pjPjcRuSKVVZPxwm5Lqyd_1I',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '4xEHh8AoKvqK3o1AF01Kvbk9qjMkw-Np9RbLthhgECY',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'Az-yypdkZNGDsl8s5tlTxhMMT8GGowHgXo7H85-Yu_g',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'VvqhwGuPQOQzeDCGSxVJXGQBuG8HPjPlpTmt1oMLdr0',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'UDW2yIWvtpcsTvyOW51S_f_MoYAlf6Wtfq9YsA4TS1k',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'pQw6R9MH4nAScOFAJ6qTF_RoLujHg5lklOilT_wJNwk',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '3AupQYZ0sK0xVDELI6Xbjgwl7xwsEETaBuZ2jXMhSkg',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '6mGY0V2uPABYj79LDlZ7QErwRtgdrtRTEzdscvFLiho',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '1qG9fHDQakSHO7nlONdvqRmxMn48_op6RKssjIg9GbY',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'hJlDT8LRg0PBmnxiui9efnVTBOHUqFNBjn1AmpF-BiI',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '_fCRtarIdbv8sHHj47cika_OGGTkirggdo9U1ggiAXg',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'Ke1FbHkJtOgg-uPqi0vXOdRYROuLEt-IyNNFmCEgMc0',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'sq_7jcV_Gide_gCXp4pYWy_c3XIcPKTO2MrD8BMneuQ',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'LBvts81-bQWaaabPq-ccaJ5A7ObKByy8w6-uCkgsQ88',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: '6L8IudvxQuBXjxx4qsHHmapeoDS-qYQTnYa34Gkzhgs',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'C5SJ0laAEaJUTEOkfU4WMTQU6ftBX4_oYwS6TCimyNo',
		},
		{
			cu: 'cu59.ao-testnet.xyz',
			id: 'Lt0PKHQCFxXkXjJVd5CV2tRIlXe55hs4cQ8_OY9JgsI',
		},
	],
	'cu-60-zone': [
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'CHoNULpAd59fudufBEhh5T_WTHgU_nxRHr5Ul3J-_KY',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'OFQZFIynDZU45_pMB_ECHT2AR_g5LjJ9d7hiHNKl25g',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'yRq8fXFvoewXTIJHtUEHYt6w9pyqj0iLvnbh8PTjBhs',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'PYPMKIw7m3438XJX2Z7SmQNyeVY85aivrLMYyuXVfVM',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'aZ_AAIme4XpOikNHxh6eZM-Ur6oyqQM_Em9BJ55f3RE',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'kBxLS77-QuMQly-zVBvPloK-s_pKcPXERFrHh9NZvCI',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: '2fG2_DZWLmEeAzWilPMgIXx9Zpho0kubDnBuLocxsRQ',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'eD4HUIQQfCt8IuNMHWfkIulMcAYFmM4fHqjGghw1vcY',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'hlrRiRFeGKcTSvK7ycZabacj6bpuoHsibP26pa-JL-I',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'oaaDoQzpfT4xVKxEv9F9-7UCjxlrNCgxho3e5Ttquz4',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'QrSYyl7KSQaI_6jBSACxfYk_OigEZUivolH7knMeaXo',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'qnPSeiwl6-VhPe-FA1SbxsKFCWvx5Y89pivg9Ekhuhs',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'dsKPu1-b1SJAaLz_yCcYYQumJZen8PMgr6e3pe2r52M',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'TSJxmHr9ewGjgEhAPy_1vt11ot_7klZGX13lUGLGlm4',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'VRJW7p3SOJ927_mbuRzkYizYZxNLug6BOACxgXvvjFQ',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'IXBWaUUZ0S-tUlqpE3Enme9Jg-AkJFkUuDw2u5oIiC8',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'jIib_hssd9ZKmFgyeoVUyyuBFP_EvoBE9hkI0ecq0-I',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'mbNPgeYlQdlVdowEBmura7FZGS27tZFVNpG8TdCySNE',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'Jcq0jHfBsuWTQtWQ1WsMX0QmYWUwQ-tH28aZPeVDQms',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'DUbGxLMe3rJcqArGP9jL27nZOdqZ04tfIc9LT_OV2_Y',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: '-B2YtPxCB68SaZzD5bplY8YLSuryqlAzI0ltpaPxFlU',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'JFvSulhbbbskbPpZG-CDPylqoledQ5eV8nP8yxx9bOE',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: '3forczXf2FY25UXvYAMQchXXbaUmBFwGcq5YEHIqOQs',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'm9tYQTqYKwkvi1rdhq16sOBZ3pKhtanPu5wYooxuNvI',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'cp1OhrlK-lGHyZdYlpN73SAyPcaLjA3sJXDMnue40xg',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'Nt7lJ9Sot-NuXClLcwU3ek1nrT-ocRD21Qb9cyHPWFM',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: '0Dg72dow351bLB2Fyt5xLMMQkLu1ssrxVqCvGwuIfOU',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'kPpdzwlwmJOpobMavLZGWR0lIq1on_u5vxVUriI90x0',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'AyAqkpJCUZBfP5UJMN87RMIbTuy82km4pMmiAdrzQU8',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'ELDlEUiKqGwPgKuhB2gA990t36pM2TMqtSG-tlSccno',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'jQpX51IEeThLs03eR79Q2N6PgrEC2UuA-rjl8B4w5wE',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'g2JUA50UCDjb6fTRkQYV-M523gw_mLogG2v8wIjgldA',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'obmqsobk7AF8jgg8t5n2VYuQtquFJXMGCGPk2-5uMeI',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'EBCP2ODLgNG_C8GIv7WXR29h3z-OG1PkjMw9m7lM2oY',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'YXlEJRD-JywfFwcd3lNQP7oVYZ2BB0cqlnjPIuOrgXY',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'iwmriDZs9RbHWHtVgbVC8C7bc5j02d0ni5AeyVtWIpw',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'UUXPZABFtmSSSxw3z8vp_KgBHB50_9vsSPfKAE6wRvc',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'vifTAqeOyrM1O6HzTleCls9NncBDyuXWpxtjB7hEVQg',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: '9ccU_xsAhpw4j6K26E5qneI8bi62iKVgF-sipOQY6ME',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'A5BYrB1BLHHX_doacNn8Pe9bfqCEZKXaso-_Zkfpis0',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'KwepB2J-jVZuLfWOkSR6iA06lbwm5Y0Yr756SC6sVz8',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'EHgfbY-gCFzyKkBkpxl9pq-yahmk5CFP847BtMN-9yk',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'GhNl98tr7ZQxIJHx4YcVdGh7WkT9dD7X4kmQOipvePQ',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: '61QRj2M9Za8X9b3bOnKPbdmPWXIeK8kiGxMtP9bWRFw',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'MZ7VzukRmxIn5NR3QVGtOHlcD-sHHeGZIAv7Y7aY1HQ',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'bD1WdzbO1DJj53QEDrBlt0dyVAIxK7YfWLZpTmNmKWo',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: '_YGnJMqcrgi81SHHM_qsQe8x1zCfB6d3oB4CZLN0Wig',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'L6f1eUU9uzl8myTReEFQpFpl4C4GJNVA3UteQcQF8ck',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'HXvULHYyiXes_zLiwZ5UtLGNfez6_-bF2Eg9Q3Ph_yk',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'K6NllbcC_VQ5jb03nHf8jL7P2JhHHMIExrYsI__8Abo',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'DNxP95C8yGMFYssa-SlTRxGiHgJxNgWUTVccFJWF2dg',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'a6mwP35X364RD6yOgVQifq2Ks9Z-o4halXa98YrmZ7I',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'PzeLPvwtuKdpCXgDQQkvFvWInViLBnjNUyKSCVaMVEc',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'tEW7nP25hBjPzXRoXqep7WPVM856kf6TYwANGH_RUKg',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'HHK4RN-1iy56viU1QZxKVsLSuyVnQSWYTCuZY0J2gk0',
		},
		{
			cu: 'cu60.ao-testnet.xyz',
			id: 'n5f5k_Pdy2dFdUMoumUq5sXIn37cnl8d8plEP6dEClQ',
		},
	],
	'cu-61-zone': [
		{
			cu: 'cu61.ao-testnet.xyz',
			id: '8stDFEuaMnbaBOOkjsrEAFCV5nBE5o40fwNmrJ7AK5k',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: '4eda6kVr7BLsp9gIWoUbSW9rIZahcZxF63VQGYABLRM',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'wrbGHFx4vk68_LhQYl7oTmdFakqAgxvTEwyui6hMhe4',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'qiqpSJLIPQ7kmGhpeHmuzO_g_Oqd-M9xsrUnyHa78i0',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'VAerzbnADlLbSFO2Z9OGRbX6NmDJIwk4kI9axn3Y4FM',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'tsyTgPTpWGxwdJLO7wUriIqkn-YMP4JgB5c2MnWjdsQ',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'pTdEYJivgwudtgbG8omPmQYVnC3WNnHx5pHlPwgLqaU',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'qk84NTSICCj7K4J_JQfPEYC57d1ZcJv0ljeiSOy8alQ',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'dMYoJHARqAFxWz4OKWQaNp9jhvoyp-vk3xSw6REIYL8',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'Oea-KX4gf48r6eJGJXiZmOZFas0Vpmq0asmkIgP_XgY',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'zza5YW1ohvHyRgBzGGNGn53hpTdA47xkZCOm2gAhwCI',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'HYt6UczLXmYepd5HvjVtPMpI-Ezyh_3QHcxr2dXBQSo',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'QpOaWYs7wTyJVujf0DRatizHrIEEILzvHZTdI2coJvw',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'mMlHDPJ1Ho9yz_pYel67e1Q_tYkLglMRnvzXypdceMA',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'Ck9sf45wTIsZ435LuUgV4vY6IpddLTkCx0W-caOgCCk',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'yhcNGoTRDGf28oRZcGp8fbZz3fgCXE56ifUv-9wbB2E',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'aTJROeqDmiAglMdsrubdBcdewn69K1wqguUwIweZVZI',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'x7Oq8kBlYBIn761Bc7LGmJDwa9PS1jiTkjOp3GSib5g',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'Fl3AyJg9PH_J8aRIlsJC_b5ACPf2RCaVuLVrzPo0fRg',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'd7xsduJZf3wN6nPlBbtZqbcJd-BJesgNOtkDySxlQG4',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'I8MoxG0bjHLnn4XQyOdbAW6LSwuk_5lM9tHPHWeg8ZI',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: '-QviNE6LPlo_IyATI_Z1WCAW1pjxTXCLvjbQWv55xCc',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: '8s1ZpAx_NueKS4N2ZOMYWCkl5qVcGkgnBFSnqSVX9Fo',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'E2B3hF6xfS5jP5S67flb5mpGo-UQa_A2gSLKaUYU1Gc',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'w3MugT7RolGxDQ9Ft3uyl2wp-WJv5mzn1kSf_wGLc6U',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'PS94_JFHgVXX2l2KhWOtfmwMi22rPJOvDjGeKSysORY',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'fh5lgrx21AQjaTbjSnk3M5IL27Sv4UGFu_F9HIsN2fY',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'RypVWqgjsPUvJanWak_EwwrbYr84XsRtvMu0hNUFR7c',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'vogsnVQEmHyoEMA5Ob-3xQgu2HJWWXyemmBLNyerEtA',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'umnJghKdbceuR8PGjiEotf1H1OR8CimNjpiAvSjgeqo',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'vS_YWbV4hCKYg86kz1yB5xENSHmdxkugr_CiMU2KiNw',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'cO0pvT_lKPDqEenIcalTC9jwZGPyl7NBo4m5KTEbXqQ',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'z2vNSZwSoWKnJbGA3R-XMhqXaRNxswoD3mWvklZCbH0',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'Lq6gd2gtz4KvBVCCu-mML5hqSsYAwNWAxT2VaPdSNVs',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'Jt-BWj5AtMPpC8GOS1K0AwcA3s9Y_OAQtvIqObgbZus',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'ySOXxJIprKIEOpuN51QV8yIugUFtAY3cTWaizPIXRP4',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'UlQ7CEBwVHU_ZF-d4mdPrKt1Vcig-Neaf2mnQ7APiP4',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'gWAF8HpSkaxJ7G-GwTa4XXB3QB7ZYoH17YbKObXqXAg',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'rEIpCkrgzaxAB4jhC3mVTHxWTE11x1Oy5GKOETrFlsY',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'jqk2ysWNc7C2vYRZNIJxVon5loV3-n9EPVgwpXO7FMY',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'Sf8u2cQSi_LZ4hKj_kRX_q6YFBInmiWnjgfBnrxtLwA',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'Gulq4asvb6PhsCB5xYN5yF5tD-iyz5HEshXdwkf95Qc',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'aZ0vFwpSOcrxMwdPI-IQ9GaZDlGOp02noVmhL1MGfy8',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: '-qqxzG-kZ_pQQQNmB917_fuhGhgekGyKtjFoJ6x1Oyk',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: '5j_PSLXhmeIbr3FFHbf4ur69wvyMiE8tYsN6llDA_vY',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'p3_AuPGWUiRbPlgXBUNSl88foZgGaW0rCYJRZt3Ww0E',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'aY0o2UAxwRMFvgqzXKpyYoYiRH-qG56YuLRaCGerIzE',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'nUek0EdSaFba6bmJPkQPIQiAMoW4nHAjyynyQQOurKs',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'ZNVR8rtVA9tKsuFHreWthUPfhG3GpCmRb3RQDo5XTMo',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'RQvmZ2fNePgCEof2qHltcodkANseHOdFQogpcAr667s',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: '0lf_Mae6Ogo_kXrSJGINK1NjwFoYRNns376iOCj-geA',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: '3J81cQOU-dWlFuNxTMSknYj79vNCrU4LzQ_PoVfBTs0',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'AE8jUgbutHlFLZB7utbjb669CnC7boStrYLCbH0Ar_k',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: '6ACZwaoZK9ZAYMm3VTuFOAxMFYbGnZtd6XxsGYX0iQA',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: '2H7maPej7uP4EPb8lvagf0MInpjgqdXJmuNklZu46jE',
		},
		{
			cu: 'cu61.ao-testnet.xyz',
			id: 'PrmTenI7LaZGSAcmX3eyV3C9Q4BKdDkaFX5_AOmON4E',
		},
	],
	'cu-62-zone': [
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'F-AaATyojzaesrERRTTqYVDfQp9SJocLBv8oU362AZs',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'LvoKR8TudGINoLXSnW_3WiuXBHZo-Zlj5bJ03Hu4Sxg',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'E6-Ke4QTyoIWFZ_nN71j6UBx_XQ_HSBaUHdhADE89Zc',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'sqZaFgQS1jaLt7L2SCnJH7_xtn5RcSstco9v1pHT0R4',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '7U2cGRay58tPycv5Fo89uHWMYKrtm3S_pHk5gmP6DqU',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'rQicwwIIKSZ8kqal1vSc4pHfVICQLPu2L0i1kTYpwNk',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'ETisoQGy_8oB4Ahxq83xa8LZl2vkz0crohsFCAhlOLU',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '5LvL-3Ls7YlL37Z8-HhXT3UOP0IMXCXQYksh7dh_eko',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '2yLmfIGxWGLdgk4-KNK5iOyi2Z-4Zrd8Hb90XMyNGRU',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'REHbQDOUNK8pwqvXamlx-rptlkLnuKAfr7H3rSftWi0',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '4XRVSNw7cRYysxDdiAZb1EZs0yi8iQeyspSY9PBq6cc',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'u7TxZpIB1uhcjXjqNKqt14bSnTXKGWuwepxX1bvIZSs',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'vldZjqlAjmOuxIZ_Fi6NcrlAKjMSZJ6sfJ-C6H4CX7A',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'g5Lt-jy0wh0AW5MB1kHJNhgeT-DMGLMqBZykFsl42go',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'h-5aO6tm5cjoLE0941ivvccJlnNcw-9mp4L0u5SRLVw',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '0k_igKYC3S_jPYgLpIY3SJbx6_QnDYM8LAKn-5QwDag',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'BgJuGCS8hDP7P1GfX1V70TUsAdan6QARLWd4Ui50DlY',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'ADlZSbZXyaQgdwZYyAS5KL_VUwf-RkXOg3tlLOBJtY4',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'bkPC1CbfF7EHeiQrJEOKWur4rRKqIm2oeveYMoABk-g',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'qXRfA_sChYvrz60U7N1LSIo-guog9wnfS2XYMI0cJBQ',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'GnPH8X7KPgXTD8gCLasnVfcwKJmcQ7y8VaUxBDD7JXY',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'upXPiwHa5FH9Frm9DCg8goelAPJFxNavZ8qKO5LAuT0',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'oKnliR4k0RbORuci9B9oxe3SNyUZBdiVVlpUz6wD6gg',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'GlCkvAYcNdZYk8lRQJG5for-0x0CpD--RXKIlNGcczQ',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'M7t9XgIxeuclYZEgE83wtmsqRnLGwXI--qq44s3d5WI',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'Ox5BVS5skLz_MrWCaxxK94H1FfYR9eY4BVX3Zt0ypBQ',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'QTENm6M9eZN-43nATd-uAqscH6e--iK9inkBKK6XnV4',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '817o3urPZaouT-N62q6Tn86pJRrtLOinfTHyS9u5iy8',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'EuAyCurKbYF3USyWd9rabY1HCcx_b_Z7WvI9Ggqlu0M',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '_gH1e0JjWmGHE5AcNUoBTHgGBc6-u3LwJ0mlIuLkLnA',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '_yGSt_TcDRdi0u0Zdj3tTu8rBsvEAf2690GjrCi-2Ew',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'tF6DTR1A4fYAtWScYEofEdJkmndqVG_B3erqkN8Qw7w',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'ckrLMiAd6VvIBYFliIkwgkU2dMveasCNT-aEFI5fm5A',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'QAQvtm9H7WGGSoN4p_hTfU1_lzNeafoIHeAQyZ0BMuc',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'rPNchFfonCusSWPSr50b3NV-WcPIg3HjI8z-kjg0hpc',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'MaM_koZybehLvzYSTBMZqQPU23KEodg796Na-uhwn6k',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'pn2IDtbofqxWXyj9W6eXtdp4C7JZ1oJaM81l12ygqYc',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'fNe9BzBKn1yrE7WyruZruaXnpkNUzb19AhwXaGxi-QQ',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'wdJ4Zb3qRIJd9ovLDGIYOP9hv5tnirI4PFNoasn_X9I',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'uORJr_41z9GD4mUKbKxK0mrep45MqoB9y283uN2nRGc',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '1y5ITd4Yb6m4RXhLI5eNbDC3ffNTMjovfuF_Z78BEWc',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'wQolzfef6NHp13CNbaSl_eYuSEqGKAdybQq89U7KNgQ',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '2hQkunDjE0Dgztgtv3iMkOi7B_30jnPwd1jDHr6Ehco',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'mA6XRUaN6RFHgKbAbStUDMjk-b99dG5h867guIgl7t4',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'shFDkIgTslRAiSEmRMO2ym74XL_46X3Fz3-K4K8V2no',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'u8bgCokcqiZMcoef97XMRy66gEgXjzLPmhJUSBrWLWI',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'mUP7DZ5-B7ds_GTFIyr69UcU6gqh-yFg0MEf3pvmJdY',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '1uALaGPfBCbsXNDSLCFVreeoRpocz2nhqF8oDeQnxv0',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'Olz-MyPSh1Rg9erYA4-5qa4Gtkrce8DP53z1N_FShRQ',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'Jv5zn8-PhDH6NlgilePUpQI7aZxiIoi2Dw2LrFsCWVY',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: '3iCpRshYYC1TPfgtdsfkbERtwQ7LumafM3MhC1mlObI',
		},
		{
			cu: 'cu62.ao-testnet.xyz',
			id: 'PS-82479kfvt9c1nAEIbXzNeJ5_Ygm_3KmuMUCCcgLw',
		},
	],
	'cu-63-zone': [
		{
			cu: 'cu63.ao-testnet.xyz',
			id: '9QGGxOwFzVtVjuQoWkZL6qJ0hJEyLalMVgfmmL9wqKc',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'mq4-BB1dWppI4qyVgPkXe1Ln7-obRQ3gZYf5tVoVRTU',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'd_PqIfUkucKxe3yLzCjFNg4pYwmlDsAYePjnfINhhHY',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'J8C15NNZDAeA6eld4b38Q0PZ3Kpb3t69uBQqCm1mQzk',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'vql1x9DeVjTEqgobAQJIhvc2rBtXzCv1NU0pQezQZxw',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'NMdXbkiZgfcL-e7-e4LFUX5RTySxG8OhaOMG0bULEmA',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: '_EnWgpWDdZnXwbFKTe8xcYX8G-IKC8sheV-zEsCRgiE',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'xHNW3UDPGysQ37I9fzc4LguizOu-CVMc8wH4le9bT6M',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: '4Ko7JmGPtbKLLqctNFr6ukWqX0lt4l0ktXgYKyMlbsM',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'GNfBYa4WBtV5Yptq0xYMbxMlgGm2cPMB1MfCIdbSMJs',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'nI-ruLPi5v439O5foQjCeOGCbnZ8E-n8nCWZ-7BOrAU',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'KELz8jvsJvKOWFGe0v-bdZG_s-HxE-T-58BWlL58a-o',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'kq8iK4wC4KfysACVw1bHm-MnjSEff30eMmoNwdibPEM',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'qU87ZVN5iaOvgnP8bOKHfI0v5mnTSB9tec9ymVj-Wjs',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'S2obSulleWoWXcA3E_LFf_XJr1f0lZGWkYRW3S3Ndts',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'Xc8tXldTqSqDWlEBKGdcxVTxa2zKtfJVgWNDT-r1KJ4',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'TWmGzk_jePTKSaz4M0JTsHfXmbGJdUxqOU7ovMWzP-s',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 's5SZhK4yPlVrZDMmwnzD_0edfgyrF-FzZPKs0FpQHaQ',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'yyHeGORU0-wSJX5BTZ40HahLVf0JrVscUZHEowOW7tM',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'VdqfyYjCUfBc00ITsg3o4xQl_i-Hry5zlG086ies0Q4',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'BZP8rWr8ODNlzmhSJtEqh2IPkq_6wVW_crFcQBS7BxM',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'ONsxJGER4GhHFhM4Ogn6gWaMfWHY4-irAbzXLosjpgw',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'lIIa3vHS2-HY9YdPwwj_LB3YOKYBJDYndirrVFlB7aI',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'LnDFDxLppk4iy17ElW6HJEAavv33-EbAi2oNvyBZ6g4',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'XARXuhUha2ad8U53MuePFA5XsQHRCDjYln8MLHYnP9E',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'Z4KexmB-6AGiPWaOjrwhevGKlVdzNhiQeXkjQjqBpyM',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'DZka1WB0sgxvAWK3MGtHK_aaDS6ReCHnLPSh8XppFSg',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'Jvz23mLr_0UpnjUBi3liyu_l4aEAf_EHZsjovCB9YIw',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'iOW7rWZZOyb18Q3dGv7oz898yR-Z-6ZjzFDIuoLf_AY',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'zFtcz1Ph_SRPJWIWGpjNvg7NDYBXLo4ny4B2pPXemcE',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'g-QdkFzp5kwOxPDRsqp1nzDYbB77PxXX6D_4jTF9qpM',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'kA7EbkvFyNayKuZBX1AiSuQ6AzRZu8HiiL28TTSTlEo',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'vZKDSUJXPP5OO1R92P6tyZSPY23zS6Je4_MVJls8u-Y',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'd_fPTAfVnDgbtHQVmA4Mrv87N2Rkja0GdU68glhocJA',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'Pn1q0KlMa_aRuWhX_yhdSbEhBD0EmVUphQMgsSvTs7s',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'anarvso8Rvu3lv7oVObAdcgF2Wf8wHqSCsvTR5QFjbg',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'geh-qhjiaEENN2I1s7rRtIFGdt4uyZN1RbafIU_2Hjo',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 't3BYlDvzPzPyMUduJVXFxhIfh5tmxxS0j_P9pCcoaTc',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'TmB2OHVZhWeY791UWMmoQSPwl6RrhgCtP1vnSatsXiA',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'CVUMvE5x7gA1vncd3zbJFJwaYl2HcQRycWrGreiLWv8',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: '5mcEzc3wLSoGq_CZOSN9no9sG8Cdmloa-Bakp7vxSUA',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: '6ugxLV9Xzpf2AgloQCQQ6ClP5W9TVOqpRQRsEHGtjYc',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'fefLjcyPHESJdJCgNHL3GpL2IlSB0SevVPAkngOMnlk',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'JraajWk4tzj6wIZm5Y4cYSiTvvu_xM8NMdNavWUa-Hk',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'SQatxQ-R0EUeMQcib7KUQE7SD_0hAlQc8vNPFAP24sM',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'QrUJhn6SjCrt_PDrlRg-Y5V3RPdZrR5jQGud73bwvJQ',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: '16DGWXWqlBhQvpUrPFgBhjZjRRsGWGoN2m3n6OmfbbE',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'RJol8PDf2zPKjF0oauyw09zRnsLePr5Lc5zxmcseA30',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'hFTqWqwhZjcqdiRQoi3kvz8c6UnCU_wcQa4K22MsScA',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: '8oZrISBAZCPL4CPaTaCPhN8umuzkl82gXQlMjMe1cBk',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'w48NfxaRQM_94rsK9yfmzxp-m_O3jFAjaDyPtHBEcc8',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'BEcb-au_mqaeZS70_DY3PAvzTVMDGr7ONGtOucWgZuk',
		},
		{
			cu: 'cu63.ao-testnet.xyz',
			id: 'EpGfNz55VC85408Ap0k2H-2xK00kPde2rq6L-b6LMwU',
		},
	],
	'cu-64-zone': [
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'b1S4T9d2ZGM5P0FIKg2HLC4rcbrYvg5xZsRZKC4SgvE',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'jkHt9xQrKV25OBne4tPQ3_BgyKTnABqfY4yTu2pk4WY',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'F7bHOXSBesanPP_qIy41UNh1_sKh7EwSjy2_9KOPlhs',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'FvkZ-l1fTje6tazPTz6d5MFJO0MIz7hVDqQ7dY8k8xA',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '72zg1hcNhcsXGSTysScgaxqeQ00Z7Mg0-8lv7T2Phkk',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'IiEcr_YhuQHntO1KpRtzNZsHRLn3dMQp6DMmoCWnrhY',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'WeyESlD-LTEtvGDrMy2nxRB-kWUlRfhTLT1T6NKnYkc',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'sTtgtZeDVjmYORUb76BBrhI45Wh8QykYr0XJJ7jNhTI',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'UgyStRc3FfKMBIcmV9l2i3CGtmhgbQ3Ha5EC9h5dIT0',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'YBYaVTgr_SQ06L6fTwfwHbs_osjkADAwe7w9YOOBExo',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'MSlub0gMRcmxGKWYiOuwu0WX_nKYZfLMVCQ8JQ4niDs',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'gU9s5PvlYz3woheqonmx_NCrlSe_FwlyfxLv68S8gVI',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'vs4QTe06RPAcMED850mrfsm1sVdA2qAKOosx4V37RkI',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'og68Um0WH_2sQUxR-bDwqBmgroeVAtbfZR35assp3sY',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'PKPfDV3sjxFwUmDGLKZWkrMj5PLpcAutmQv2eD8I6gw',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'Y5gD1L1P28I8poPZ1zUeJxSLFzlzgHEJU45kt5k39Fs',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '4o3aXZ_QiicSAnAuypdPxdGd75i8ukBNleBsmVCZCdE',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '9TfioD0EvJolzN2dl26lm-fuTgqSrxZjo-Y5tqECY8Y',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'H68QXq4URRZ6EObeI0Iusbh6LywdlHRk6nBVxnG_s4M',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'O6JO2IXg_DZXWyXXzxGaTYYONDQuV-7hXt9KSCIn0-g',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'SemzEZIeRKOyFdFVwUZZvLBOD2xA7E8Twu16Z_7eB_U',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'O7WBgTKR9_HMUMfy4vmIQOp9ufk2ZZWmBi2FP9hCyYo',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'LbImKZcvFTBw9Wp1RH_QGCHab08sdvDDdzqL4-0t2bU',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'M2QHoKZTbryJgfVmOLa1ijDa7Xol2kupwT4WZTBgn4Q',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '5siK21bWavK7CzOkRDLK7XK5MmkPEkh0JEZBSrFG2TM',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'Kwzc_-jJyKwDxFvIhdHn-zLO9XIFEt3MzKxjZCzpPOc',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'bsjc9hNBmXOHy-QvXpGBEASeslCVtdqitcdXu7jXy8I',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'B9t3AL_m-jTwcjNQaf97Eck_Z88R4xl5gdSSn4XEVGw',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '-n6VNIe6V9KLKTEVVZVBnVvNSMuH--4Xrbg1LlCBS2Y',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'V3_felZrOq05EcTjYyHy_TdwYU4pH9zjJdIgXIxlEcE',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '2YElqHluePp2ZddrM7QDXfqYKRpWpoZCuwvxUuexhd8',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '4vebev0fk8HdRFrGWV-nNU7dfIJIQWOe_tXPsmHbSPM',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '4XQnnM0WgMoe_QD-EPKeU_kCnwZv6mrgZBQGzdFs6bI',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'QEHiZQwUtlNBcadqBMHsbsbBhKh3esH9Pfl4_j59U_Q',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'fBZjJAlXTJK1lvAh6hxJBpfhJGCIQjWS9KpR2nMv44k',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'DSurQa6ZILa-h2zV9CTMbXVtVWAliOZ9_3fCVLk5X-k',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'z5PwtS1WupXlbIrhFysEhHbi3QONTmV3X08Misg5-Zc',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'AkCSLv2Wc3daUzLddKIfKqIPhnDBNFtC5utAxr3zvWI',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'XsSgVbw7tIjzT8IAnzzXgVV024Mwzm6h2FyF4MATOTE',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '9uM2qcxxE4Os3XIgrUJA35_8fQ0g3GNddRCKQwIYLyU',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'evSxPtkB3ItF9EarUYfe_D4BomlpYbjUdF-qBVhO3jE',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'nPWDOEIMtOUKU6N3hKA9EOtHg1rKr5MuFU1M7vOgO14',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'qpadHZ011rrAN8bae9Xd9DPpgZbqPMHmMq82B9bHYnw',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'w5KQzTmEMvGr-cShMyha7_zXh_4V7geq-QyoCP8CElI',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'oATO3H5FHO3-JpRuWTf-Ki1K9-X8VRdZKdj1Zju-ZbU',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '9VONzvHKxOFLhvPe2om-xhsVNqgRchi0t9Od_7pqZdQ',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'qeL48iPJorBe1LJRlq6qQJ-Fx_eccMGiVds4NqAdfag',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'TvlQEarWyeCHHcixTU2hqXg1mW2KeHB0b77qhz0m7zU',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '4sKr4cf3kvbzFyhM6HmUsYG_Jz9bFZoNUrUX5KoVe0Q',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'fmQxIdnauTAJRG28u1vC2Vjj_Obc9iFO7hEcGS6n_6A',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'FaQcY5vDbUPPo5s0qn6CB-jUiaDPAYIUvXuQFtCphQE',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '864kFYipV1FH6sbW8kH9HyP4x2uUVrqt8PZQ4TvW65Q',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'GPe2-hPf2heNradqWk8ii84Rs_CEFJmo6ESA4tNHo9k',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'P2voAcBwq4gdp8HlN6lmV3DH2FzVVwyDa36hI0751f0',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'YKxyXqRuNOnLLvGvW5ymbFHNWQR3FICgPeCkr398BJY',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'lXMUhPizvrMR3at39Q9-EbPyebLFvqHBGx3B2BF_YCE',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'TRLnfZSHlYbZADZsGwOihr3cQTkSRCJwHH0UiKbxZJw',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'H41CVAmengY3BuSz1aLjFJf26RKFbj0ENGTI7aG8j-U',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'sgBfwGSm62KnFLzVGv09nsARVppMY3vA9b0znR4f1IE',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: '3Fjs-8o5ZtPKOwXdlSw2qt369AKmQaVqZ-6w6X6aYXY',
		},
		{
			cu: 'cu64.ao-testnet.xyz',
			id: 'lLFEXytf9TedGDd_ka0o80G9mw86ymoHy4hglHhO4_0',
		},
	],
	'cu-65-zone': [
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '41mO2hcGq8ZN_2Pqyryl4ts1T2x6iTt-73ofFjJN3C8',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'a_Ggg4buKBcM4qKjmMIAdl5nejmpNHATwJ3-tfGYs60',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'UTFBep_cIDtJUdl-xW1mu9N5WI9wJjn2Ad5Fofg-HDQ',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'A3Yf9Ab1n0zwFhvLSzw9OfhAUV45dY_0e_jYXtzElbA',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'kYjTz_BhM4T7oTsS96iIxW4jICJgeGXabkstDOazqrE',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '4jhK6FNkfthrDm_KUdZfHkJOSz_vwgxEEey242Q7w9M',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '5Z2mqI4v2_mgrn8s0NLU739C0IRMHkF7oJrGbXefoqc',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'eF3byWwJaaTUgd5LlHOamdGpeoDze6WgaM7rCUdCzJ4',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'WzMkQKzEelxNUd4gzSQ5BcoeiCTXSpvbHESAszpLB24',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'M14D7voc-3rTV5osTl9jW-PuNVgOEB9JN1oHMNZHAtM',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'mC6iTQfojD7-HjhkmQs7YGjXpWzzN7RowXZteYeJI3k',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '7LVV0-zdgRoOZqMbwxxjTZjWGUM9cSTRTr9g9cEwCsA',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'jrHt5iZL8qbrcwpdryLs37sYrIdg-CseI3hYrWs1f-s',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'V_baA8YK-1_2-Z5UfPJlbfJjbJNpBTs8leCCCcN51E4',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'QhYaUhrXxO_K8eES0eWtypzU8MdtbBWFw-N9kUVD9hI',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'mZUjeKfKl-hZjBMOF3EMPWTEa4uCKJZxRf3_b8uqnlM',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'gmluLDt4AxPOB6_0WB-qxURcOJIApY5-SJgl-kEmijQ',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'ykHo6GBqAJiik_rz6qbCTRYFK3wy0O-NfPOZxDCwpVU',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'LPRXKXFws9Kf8ZcPAbFgBgCQTkEvBXHzjPTinlpuIng',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'hZxDZ21pHBFxb1XmWq8b8-717CzIziNnwA-bodxg7I0',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '39hprV4wI-mLexYwIoBOOtGMmGj4KsijEbI1y4BM6_U',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'bdT2rEONVTT1j4PTU1n66e0lSVLUWpOBOnoisrlh2_8',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'FoY4doYmCoHDGqqo2whMaLMyca5gJ6zoK87Ny67LeDc',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'pL36xV3xkfD2Pw9sQ0IofIlInWZ5PLzY5sTP0Gu8nvM',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'Pied2xYIaOW2bjlMkCHHw9lQ6QU58ZZ03b6Uzkb6zqg',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'eXaFSppuTGM5AC5lwR_KAGCrkeWBRtG7VXEGQngJ7rg',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'xU3MxpRMzMvH8cBwy6UYTC1Kj0Zpt13hE1wXajLlbAk',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'T2IltUHlXeiiZaxghe6tthrSdehuf9R42ddUmSz7Ttg',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'A6fRf1UcmP2DQVQ0o9yyd58I5P8Yu2auXDwVDOqnOmw',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'Pl92wEiqEyyT04A8n9Y3e40CBJV9Z3sqJld2221qDFw',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'IRQsEBTJIr6tx0ZkSdU2hJsz7UYYiZapeNnk3DXO_Ig',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'cHVvrjWecTBmGLfooCBoYOKA4djvXJkZvgXfJH45i6Y',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '8W0XisfJCaYEH1rJazSQiE3WzHbMP_TgYSNCZJgNrVo',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'aoZ1aH5g00s9Dkh8G57QjSK0XKDfqbTpe0woR-0---Q',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'FxYc8GGemXM_iFykaStY4z--HsWtERWDojgPCRk2TG8',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'MYS5J8nbYN1udgZKyJY1s4TLNVwxYISKCath7L66qH0',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'cg5TKSH8NC2QNWiNRTa87KYVWjwRrDmbxafzoOSSG5M',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '3_bdo7glPsxOCJYq0nTQEXnNcuxstwvK4kvNfmuZJYY',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '1rTUJLL0XDjko7WeCRBbnIMFIxWcYPfXofK5POb-12Y',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '6KX5al5sUduMUW0g3E0LOwBOAbdIj0y2EJrVP07WLds',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'OLzBP_VeXCgU_PjV2ZGJk5cN2AL3AXXgfi7lHWeUCps',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '_lC3EB7vuo4IxrOX02DGdxGHK2BlICAU3gsi2QVYFvA',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'QDMF7kYcZelAec0lrydlQCYqwqAYkDyyyUJ3o5bQ8d0',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '_nA6iVaoXbVh26UY91YkeFEz3yWSbcVgorRHUPG2Fc4',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'HDOMUE1CytaaMkp_p-cA8j8lE45BcP2YKmEYQfuX1Rw',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'Va_tHWVZFjk-TOlxRmFGeNmhn_lqv1bzlm6rnAp9Fsw',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'uXST5Rbq4wvLH64ZDt1TUPB9R2tDQ1zU4p3Jl94cM_k',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'yOhfrN4bDHdZxD9DdWnmyxkS1zM_4r9LtHwrBAYtULg',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '8rpbzdZ0Su5bLNdWVWhLOXqJd57hneB9M8CNIc6BPow',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'i8BRkbkkETGO07vPOn70AwZSQBHUf6vEUeZMjQE6kLQ',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: 'QsJ1pk6SoAjjG2I_kuIQiFyyI5wzyxz4RxnjuXWiPf4',
		},
		{
			cu: 'cu65.ao-testnet.xyz',
			id: '2pXE3YNf4lb2NokZNYvx30fWUAdlQY5mWKOKQtkiRQ0',
		},
	],
	'cu-66-zone': [
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'LG13wlGYb06h_JqcKR48dBlIV1T83vHAnQoCqJnYiFc',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'v-WpbzBFSuuqTr9NN6raEaK_uu3-2MMgU80m5jNHbDg',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'aFAdRBrqCr7QHgRBnjPcWDJNG61AXRd8OaIDOM3jHWg',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'EbsoHh-sWNTs60qG1oGE9pba70L-hZBpnH2LMrzxYqI',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'PMinWJad41czOOu9DrEVcldgZsW5QmjVhBgrq1YUtsk',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '1VFjzXMA02ekYLkFnxiPVXzoyMRBOFl70Wwd5kjnnKw',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '1lva39NhtiIOgDXS-oqUwgyRiJOZmSbWp9Y7iTyey7U',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'tFVLoAMzdl7xHctJdwh2yJrj-Vdlq4q6bYyebNBG6z0',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '9ohRNUzMjDrcaN0FY93ZQj1UkNVjlBPC-qREXVRKqF8',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'aJ6bxClkdPKMV2614rU8JQU8kL9s6MQ2AIANEnXH_iA',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'qw-YWFYAmZLb3xZyg3vuPi68m50Fz74xhGfu2MukM28',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'K2FRPGuJ7Vi3y1xxxPgS3W4Qm3uN5ziVA1AWXawH1u8',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'wYdPmC2-fWIh8DTukYzNTan8uX-gIx1UEC2ZutIak0U',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'e0Y2NoqErIAUb2RQAJ27__eK0CMIhu_JT_aHk67nhyY',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'hlJfcsVO83NqUTAVU2iK3ScQtWi6Ozin0_cRGwwjWmc',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'OlOLaaSqtEJME_8oso5SeDCW58R4CC6i3JreZcXSXns',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '8ivh12qy5RtqTPUkvDenb-H8TWWuJXKDkT9_jozBnjE',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'Dcu778r_y4NBdmpVoVt3I4DIyVBvTWHiXDtSIDOcH-0',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'y49fJclEswCkFtr536PvpSbTu914NdrR2kJlqY0bR10',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'FuRt_oPvO-xCOyZnQ3MbiMLRxf6Yud6ydUl00cJAnuU',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '4uof2UJZTN24A0awdOBomoZj4ve0J9vK-FW3jkO4IZQ',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'F3Q4WcEZU2uCuAokLwfbfGtn1q9mqxqi-5DPaINREdM',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '4hPYjXCjLW70Bwh9fcBNh8qAXoMNYJYxkUZbQdgaMMc',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'C-QcpN0Q6ukNyXuyTS9zuspCt__PwEM3qidKMSpGP1g',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'WCaUQtOWjul5EeH5357u_10s4ezBpDHOnk5bNharVv8',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'DyX2cXihVkiJPAXTvJzE8N3SnhfEYwhN1aa5WD852Ho',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'mUFFWbb9yC3juW35I20uUXj_ytPDrTrs0CeybOreQF8',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '2OW5M_PfzpJPxLTaQx-j1Hnpj1y4QFAP1r3qDGS_opM',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'EBWE9Yth9MOkbVKFYZyBI8eGxvk6DGCwQJIG7JbjLQc',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'L3YD3N2JqyALx4DydfmupxDPr8gPUt6HEfUhaIuACis',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'JOKwLf65LR7gZKLBvuAVsQy5P966-oRg9pmZOaIdqzQ',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'DcWqVG7-_W0w733aUBme08Uapcj5sfBwNv1eyyPQ_n4',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'g2TiAskBjwcSYAwQTVLV2GVozkqGeoHUCDh5kyWtpN8',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'POTo4iWPyCNmPQ5mTgOuPb3UD2z_ycRb7kry9ev9Y88',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'z8pliyHpluEvJD6-x6_vhaHVtFdOGyK0uuAPHOVMdkc',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'pu5P8AatDY3aTDnHWMHZvCG8fPQ6dWDjfLvUFkLy3rk',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'edNJRVSy6peE8Mc9Ov7Awaf4I2jeuhgVDvHKwqeQxug',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'Eg6odumifiBTl9Nn76oaJWtxRFw1Sy8XwHoC3ntyjM0',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'f1o0aN6_bCgaA91g2Ce5JYij5VuEkeazz5Ks3RUIsWI',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'KCOyOszXkRNg_A6uIl6QxRZ6cC5V_LQ245eJrwD6sXY',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '_lgyv3MtmwZFb9EZBhbLEnw-843RAxuX3zQSKlO3h2w',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'jZD5h51930USZttZRchhwqx4KAX78JNZ4NS_5HqYTBs',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'u-ebtyTk6YYhZLh0xSqLCd3kzjCwbSx9HV7cRq15xEw',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'tTR2hJZPEUqm33ljizvcmWb3LDERV-losDtI4BIRJWc',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '-dNBvJ6zNbtYDVdx7wWcKH88Sw3cGRAaGymukzZtZ7Q',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'u-nNRdGegudSB_a2DctKRUG23Ly1PY5_EDbdZFuwbIs',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'HRBkLyV5eHcFDnMLe5pBwht17e3vY1UzU19bWf5kh1E',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'VW2n-P-bwTHpvtYjmwTc21DDETvcq5zGruIUXCJdqUQ',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'Q30ArqjelMkczJK20KK3d0Wy3jQiJyN31IE8qmh77EI',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'UKgMj45kJfCbQJApi0-Si8NGTlTI113hziJPsZJEnS4',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'v1oaztKjrW7uYHo8yd2OJPSY6cVNSBYffKLcmI_c6qo',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'dtnVPP0SigGjm1s5OzZGEKiB0ILIXpXABrbSk288GdM',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'IHGyIg9O6-wrWj_QtEDPuNL_N6_dXZVaH8F2jubeq2Y',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'EFIhNZ7O7IwstBXSIVvSNWXxXlZZx2XNn9MPfxZs5yo',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'YQzxNprczhQ6adqEghEt8wydekD7tr_Fb9rEh5xWTPo',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '31JbVJW09hEXtaFMV9Oq8Z2lxswbWQzjmlLbIw_CH38',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'FzlFwH7tZOkoGKlabHU0lqiirBEinILyQmljrGZ2H1M',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'SNGD6z0RFs-mAxJVLZoXK_eM37xvo5RZhGe31cTrf4Q',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'GzUZrs8SCeF0RyufXX8Y_Jvmh5SazWGIzDo7d7o3Upc',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'S3pW1U4jcquM5-wuyXRnscq9NVja-d11hESLFW2JM_c',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '_iKBaPwy76YeCxH3JG_5aplXTfI0V499dV6f0vEJNrI',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'FvKY11D-ococywOtl0-G8WfScGA_igkLfBHrvhpFr74',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '-jAuEWJ-Pm9jJ5hWUCfcTaIr-jXRGsHrtccIaV6e91E',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: '1EcdCN98-IxEaT9MGerQtu_Q7kUcuf-IuOoaVDU0sxU',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'ClOdYAAPdi8lVKe_clFFUR9gHud1f32qKsvBO7UvIoo',
		},
		{
			cu: 'cu66.ao-testnet.xyz',
			id: 'PecKVIy-TsBCQ_XqzlPrKvqcJ5j6OhdnPTSHqWm42rY',
		},
	],
	'cu-67-zone': [
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'OQ1m_bxN7oVqUlx7pQaT4KlJmFsh9ttf_8x0NBQ9dtw',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'UMl-a3dV9aNc0vF38JL7gJx97vope1zKUbKz5UATEEc',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'W5_Hx7ytf8wI1zhvMp8OeHtW4cpbplrBvB_PMdo5nQM',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'EE46-gXqlOMDzkrrzg5XYrubyPt9BgBS0rKiCqhE-dE',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'ouhZlHe4gvvs3yibCPeGnUzHeAIEchf3ACJZMvYC7N0',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'kTWA5OldnVuOHWtHE7wMOKInTuF8mrrMKXmwIYZAZkI',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: '4T_MRJxYETfc6XDHI-RS8CqOAXHUQK3VMb6zRtRkq8c',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'sC97cLJR5lpQNegTnTKBMR5yRLGtT-CKpLP_tjl4yDo',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'c2KLtJbbp_myyARus-qYNx61KKxf6nlUT7josT-amlk',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'wJ7AqPiRtIUvDPNUS0vhAI80PbM916T9ubU9xpkxn9E',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'UUlgdGXBVf6tcVo6KuHcEHA5O0cJXH9qMzh_hCzS8wQ',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: '9j2xyGbCZSldm4fVbrgZI9PmadoxowSUBa3egQuH-GY',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'tW-jLjzNxW44jc7JnxWYcZzg7ERzyfDdKGqD_Hm3gtY',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'lwOCZ3ydFTrC_WFWjlCMgYbW2PqL-vh6aWPnCOwm_ko',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'g_mG9qwM9AWnTejrc785jgcG0nVhhza4L28cDGqBr5g',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'U9U5v-kEAssoyT2eKtLSw5ZEOuX9U1jTG9T_mdCriWI',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: '0lLvWzkUd39-BiPsfbyhmseawKWfoj0wNL41ZOny4Xs',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'EXiSMJXuSTscbDurFDNCbA0oG6syZ3kpjC9ormZ5C94',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'Mr5L61Uc7BphohxjOS3Pb84A8rvlxPwQph90hos4LeU',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'UzkSKH3RwKv42fJe6N3cAs1xewfprI-xQrQW14IHXaM',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: '0-mpelnvluhsTw4ucl8HJGFkQxg-rpu1q6rwjcczUKs',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'sLLAaiaWvREKp4tKbmvxShn2NNnh9Is_p-3pZdDTluY',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'RgcA3cCI7-2d94jMUVdnyzpujhEKdQGO4CHY7MLAk-k',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: '-XBE2YV7KBUPuqHaMcbQMdMwyId9EcolZl4eMTpaphY',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: '5iUeVQvCqC43nY0e18maSl7xXn4Y4f_mwoyu6O-prRM',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'OFIaIlytpRxj-L3-41KFNyys5Iiz7-QHdkSGlz0BEOs',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'aZjstDCT-FL2DAMIiK-Tg8a3xe0FuxWNDq64C221muM',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: '1wa64mqaKf02_craAnJvc9gacupck11WgjqAlqDWEEI',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: '10J6AEu_9zCVsdtQ0actOJIFDYrXKLHNBch3wBiESeo',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'H8LfxHXTKp48jtDV0p_x2x_pJEhNNvnPspFcoPVvf_Y',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'ZixIBziX5le3uenUc2igKXOxSiC849H8WpwjfD6-6Pg',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'gNkpYmEoJ8OQmdChsyS4F2-5PXIwyShWyFsbIsxsEQQ',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'JkN_xrwtnNAaz3bk3XHVG2Dws5tXXT2cIZ49X0lRi1c',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'rimDKpBU9qI6sbVt1i_P4ubCC5E_jTna-SnHElDsP1g',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'jaDneqeEmELC-SwPtMt7ad5AyU29KYN-tv9H0z0Wj1k',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'DstfkBF5EuCXK032OOuF05dhgNwap6DKpHHB5hbYclE',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: '0L7pPJXEMjxxPVGLPoJzRtF02LOwAurVmfpvUs0mKx8',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'tGfcgGdiPiZus-3lbGUHMAqysKJp19KABIpwhSF0GSA',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'LB11XhEdEYfKs9RpHTFKx98m4QEy5w5MZp_x9YQKrYE',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'z2qAkaCxoRbA-Vfqwo2d59LwVLQHadGYaiaa54Bz7kg',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'M0xRCHvPZUquks5GAUxTFm8z2bOn0ChyNoTL5by7FWc',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'COIJbwyYqlQRJL3XOoASXjyKhOp_M_OSQKGcScj9Rhg',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: '6hsKzmgFL9XHxhAQPhXvcKTIIdL4XCFP0YXISJghLJw',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'FHSB3F8XRSoZA_Eg0gddG2NBlst1hMbw4kaKpUAHN9I',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'LYVZyFUOz2P92p0YR6KunDvQsN9FjDUcG5RJg7sBA2M',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'N5oM-WpcwXQI1ZfaLNI6WWOmSHfO90DW_Tx4GstSx9Q',
		},
		{
			cu: 'cu67.ao-testnet.xyz',
			id: 'SqQtTRVgfyHWhNV3SVIVFcpH_Vi6xsC5zv4KcCngYI8',
		},
	],
	'cu-68-zone': [
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'c3uQGLNxk7mVcrPGyQM7tUuGsIRgRK-mxYMBVzziAgQ',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'CmZ59OyhShGiQ7N1Cc04D6xAOxvTAKOxsTywpRZxGJU',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'hL8UBEkMjLFLwd1-9MWq-4jqdVeyut8dP_r60q_zyYY',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'Ol5ow2-lGOvXmjGk_jM0JiVNdXDMIpBg-aKeQtDwal4',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'ZylQ89wNWxSTigV7LVW5nLSbDrTu-1lZjGrKBtCArno',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'AKlg4FUKybjR7GxMjJDNDcfkq03qsAZbjaj2xIEsYHQ',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '4a53mOOhDFOSJeBTcsFS4CC-CwkQZn6IC6Ug5v6xprI',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'vtWswr_T1FZpAXa0vvY0kD499yxm8ARB2ao99_XN_bE',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '6BdC4VL2ynsP_jZDfcJ_WMSn-ouyfvR62cYc8DsPJn8',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '4qvmXVX9y8s8SSzijQabJOVeeR7RBIKnaGda2B4T4qQ',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'U4-pCMFceLygyylQJgpSrjB-BrtbG0q7t5GkkEnwo3w',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '40fMhBDs7adSWqDGKwQNHz936GAobYoFX79ykalA0tM',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'aNDKXzhBvzvdz25uic5d8N3WL_jxEQv1dYnT72yiC8w',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'HiJRSuhU1hcmFKcAooyVRng8sm1iCuDn1XXwNLmLGH0',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'lUDSA5Yyj5B68Wi0Sqb4kuwtAzPZR2X80IYtbibnbdc',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '2ozGLlT_PIc0ik0KqtmuX6wFSRKzyZmjUpL3n7XyDIY',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'WuAkqYvunUtsD8uvpsK9XtR7_5-fbnH3ATD4DJrl-Ac',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'xgxv9dizQNCxFAcZGHVHmXBRUg73HEJDP3wAPNIHSGc',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'aCUz1pVwTPR3Gvx2r7zJVn5uzo57s4ErajdHp192qKw',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'VnZyuBWvHYdkruMTecYKcr-hpSf6qnzTkpF9demDtKc',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'EH9TH6y_jRTHnbH_ivnyuP2QgdPHATeuYPcdJd8guMg',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '08IL9fyT1wcP9oQuv7fUzQ3BVsMZqgyu0MbYLLbw1T4',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'l9AS8amrLTkB_fi0ciw332Q5Ia1e7Qgr7nhfvH4ncAI',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'zXuElFk2LUgpwKyiWWuQFOk4_P8bQPnDDdtqNPDOOrM',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'wRtCvXIQKcRMqHnT-5Wb3sFyBY6sXpf3f13nCF5d50w',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'ppzVGsrG7hncV3hJoxWKMYh26jLRyLDrqyRHRC55hB0',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '50jOEkJwflhnhpQfiuW9lxZ5RPVumSAkeYum5A2PJ34',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '7Zb5dZbaTsSKJ55BR5BKaiEHMLplNf0dj6-lrNYdIUU',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'SW9pNrBBtf9oC6vD4liNcbTBgIPjPH9bRwQ-aBRObwQ',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'h6WLT31Bjfnxe956uguCeJXh55hRt_FsLs9yCS7C0eQ',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'rDJGdSERQtayL1A93bw8vxS-N29gjfPqmaP-olOJRzA',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'WCzLFCkj8e2XO726i98yc1_zN-FWrJXVyHinaak3dGI',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'NEqcF0xUKtrpV1m9EvFhlpbWdUx83srobBwMU2S3w9A',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'zM9W4gktEv4YfvurSV38PyBujVs9WNqtPwLWW1T2i9U',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'bkHD6n91ccODEqQPTBUtMDVNQO-dxVkBg4gsi0NLwLk',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '0qmb0yUCO2KSXcxvhJbGiqhJfL0Z7B6kjeWJREZgwNo',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '9-WssESOwuAfURCpEW32-ecO6o5582MyehlgP5mMF8M',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'o2Y5RG7wQigG1-YjbK6J1ZQVKeeI1YmEIJI3H5a9Rkw',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '8FBLWxGYr_KQWn7QW8uBk0s35gQvNipddH4HGfSivNc',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'YgfkexYxr3uf5dzWCsF-gP63fmWDoQEIzBtiPdX7cH8',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'B_NAv4Yv126ePD6lGg7Uvo4EboEWO0-Ws0LeOdQJ3pM',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'pfwgtHj0YU2OkyueVlfygaIu-aXJTQh-rNwHuxr94mE',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'mPrqwOJ3PKZXLWip2JKX7GcpKpstD1Qj3vww8A05pw8',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '-vnw4fEW_cl12AgPjRpN-2QeKh1Pgyw0VAEuKczX730',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'SCyMwugQS1nwzn-Bm1Ijmr0ajbaeWnFzq-hx7UNQvFI',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'r5FU53RJe1wQaShlWCOTKWn2NB8f9SOQomv6uRrHO68',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'iTEy7_MTbik9bqUveFbSGdujgl8FRWQu-rNBzQkV6lM',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'P4k393V3BoR65lx4XFmtD7IUEpKFxXyEI2eqnOViRM4',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'JhC_-lJcAFba3gM_Ob2Er6xCFYY_paTD9wmN9tIiYQE',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'Jw1BDZEQ4LD2wIVt0Lhd5BS-W4WK7619L8OhL435vW0',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '9Oo8416URMxOp7MBIOYgAab1yAR3X0-aPneQyZXKNFs',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'Wqw-nVsu9ZRhvqFior2BQix39gzoXaOGYMBqhDo12pc',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'cc7yUfZRTdMBI9WsW6vzAnGN9vFOvJO4DmpsRHrae8E',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: 'CE5Q7qBcdQUxV6-25t4zmo3eH9Bv-Q2iQJDY3jCYrFc',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '1vCX7MN3DcKIZ-06A9dZ2ZUWhS1TukOFMAYgpc6uMAY',
		},
		{
			cu: 'cu68.ao-testnet.xyz',
			id: '09T4OOzTyTeNuV3RVu-XButfoVzg3hgI22_blOS3oXM',
		},
	],
	'cu-69-zone': [
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'WUTKQHXe4f1jiNuD3676_Rzgt6f9YubHLYB-GGJ5Wcc',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'H8HNWqahdlO8cr-cyj-i5pF0kxNO0g_TMHhVh6g_4rk',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'L1Ce7qfalqO9WHdp7G6kGbS0q5YbZz9xQdgRboR1ILs',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: '2UugfmEb44t0pXnwcy_65hNjFK3dlee1AaU6Nq4PE9U',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'AspdASCljq5gPIU_pB5gVnHwGR3eAiAiOhtK4iOWIas',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'FtUN5kCO2gEDVaCFF14mog27vI_v-aYN6cKqjujW9yU',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'LPpEDJ7dcKYEikz4gyXN1rcnueLAw-OGlLFtzQCRcQY',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'w_GpLVvJmtZL_RPxDXEpmcN2tGyzJt4DDIuoHqnNXOc',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'Qngdn8yLIcqqmqI4nLDoXEwCHbnNRcoLN9v4tXkaXvI',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'ugxdKgyIVW2AUhIiCVg8cXoE1uau7QNbLfxx8WMKIJA',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'Lob3nEXP0heY8IbJIl4S9DQ0uKcYE1TMzF5jG7CVtpI',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'gRKiP56475OboSfhEXWvbF5qs4Q0MUa1HS1_rPag9CI',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'pGpHL06cUgmK1ERrikcSCLbA-9l0DvF_UuPw4185cP8',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'BS9-CtDZuTqBzHxETPlOo_LZDDpC8-DgSvQ8ANKx4aQ',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'LMEvTqTFzFE0RXOrE1_pJcLpRWXzbvYN34zEbK_WeEQ',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'cOl4yQx_oLBq1c2ZgXcFm9XI2-KT8xlSYzi1IaW5gCQ',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'fHdprdNFRjDrJeC0-vxYEB5xKxvZaSwqORFAR6nAP1c',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'IRy9TGyPgySS5uf-fMsA6LaqU0u1Sm1TITXp6iF176I',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: '2-OSp_SnUTd6Ib_tksHvN9NNPHsf_P_B2pe7CUSDQjY',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'p9LH_PmxcSR9EprhvGQYm9uuea5aqOl3tnqC1eS7Urk',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'f2O_x-B_NToE78DltQPSnh9rru3WiPP0qnRX7lbLpbg',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'JyRT3yi3cMeRVmo8_iCcyCMSwXm5cJqRuSZ1en94hjc',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'ES6C9R2ZuMSu8hAWn_VUbqb0NeWk-9qBGYX1USNIZm8',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'No4qMSJBHITquPhlqjJ1JGE_9HpWMuDB38iZaQSxBQM',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'XVsijwtEs51_UZfPuYzYSGiwK4le5mThJlLvZaHr14s',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'o8ZoelGX7pFNMMjQIvECW3NLfuCZF_GKLLOZgxLc0NU',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'Rglgc93lGIpqHIgNo9rS0gIkG2s7aodCSMoGysi3r6Y',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'HUSSh3gFr9mJnhuMGU0Qy0ZObXV_JYK3RUFHbzIxKq4',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'EeD3cifrdktJwlA05deXVDk3LKYK9iUj3PVuxl8DLDI',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'pvcQmks0qB-QS5NVBLHGBiRTuGE840WrJXvW8u0Pqlw',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'mKcL7Xkfj5HvhLNaAaaOV32rgSshhYFNTjbrQI8X92U',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'F7c8AeEBU8ofA0h3B20SQ9F-rAoGcGcnj8O-ImVbxMY',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'ku6H56tWakeZHaYH71TB5R0OV_ROCLuYjMMyF_90V3M',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'RySJkydiJs7uQspANvqocGORrob0QmJOE1iy8wQi3l4',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'kCPOFukT4Sy58GUnQMdzYxt9c4hwaj-R-3M5nIfITGU',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'O7QxAT4vCqKR7tjycKzm0Ire_iJ-i5VbwEt7d_YHDu4',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'PFaMnNhdwsJ6hAZXPvSxDLPcwPeNuTAtV2ucUnKS6FU',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'FG5zE5EZHtPkapRjnp3qMcfaJEhmA0rmXPRYX8AdyOw',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'dTHuddsqlMn-LRa9QMMFOH4CZKe0-Wefb5GdEk-NCcs',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'eZppZYuhZ2LIGXCZMiNU45WpEN_6xh_jLDd4VTEKt6A',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: '0NteAJLfpwIbV2dZveo2R7efNj9XkuHUgASw6bGKcv0',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'ff1YOrTsEw40NknXuYtdXZxdM2ZX3Ljb8U37MUruAfE',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'jUsjOr2a4PPhwU9Z4c9tGdac2iGaSvyllrNB__GN1sw',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'W-PQrAal-aY-ORaR-HHqAHDGHbCFv7pm0z9k1cQTrm0',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'xks1jdlrZ_MxymGfJfaAbjWRi-qkTD2FynrOJaPucn4',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'XWDKupboCP3vbCGjR0TvapsEVmN3dQuBXVZ98d6jqEk',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: '90oF6PtUC6oF5r_v789NMXa5rwjiLa-oEFjrU58uJN0',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: '-O8xmQwOl-DyO1g3wIjEjZMEzMT_7BF0HLpERt_2nfQ',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'PHwhAXsyU5YxuV4C256m-nvz0MbqZnBOzkQWCkcaroQ',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'VMdwsjkSndRTRjuAmneJdG1ltgit9acehaeJBwy3DdM',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'aq4vh0jm7ilCOvoUnxNt1wYiBY5S2g0keCV2-2alJ3c',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'l70H4BDClW7kdGGTp4JW1Veynd3LTmxHIsl7tPVkOrM',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: '0bFbV_5WPcLxsI8r2cnsGIBAtBZCoxdUyABhZoQUfDI',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'V4f86ywWKVcQ6-bG9-8USMnnWFOXppSuBrAe9geihZ4',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'yGhAB5FMHrWgsA6aUQEd7wJpKLPV4wA4GndEtR4GUHc',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'iJzfpmObK8oNnCC6m5oB3fnEPamy0Sckw3qjsN7qxuI',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'ABt3_bqrmbHEWXOqHySZXXzWWR7K7o32Jzn3xrJryjQ',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'HBnSft4XYdJP-h3__UnkvB5_gUeEXT9fdhS3tCc1hvQ',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'etnh6bCcofFxVm0eZ76QD7AdOoIX4KVFPDTTXnnjgJ4',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'rjOuEqHV_cfPUaXve2MrvkCiX8-L94dN0sy6yUt5bOc',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'XolB3KPIIQuCqzJAwECY5hAb0_MSzrSq8Fr_RyBIngE',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'wjtNHzO_NWHuAyykRIhA_SAHkjyzLKcrcpcxDAcBugc',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'I5qs9QnqsLSb6co1JYIvFSLJSVDnakO0iueIbvOYatg',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'USTZUXJ931K56UrLRoLuq92T92vDrLD02mnh3Stu9Ro',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: '7OH8PCvNhv-brFEVv1kN7L5YaG5ANxOPvzUu6h9sK1E',
		},
		{
			cu: 'cu69.ao-testnet.xyz',
			id: 'mqsGYQbp4QWaZo13MEOZYwYUpi9pzbaHaquOaIRgQO8',
		},
	],
	'cu-70-zone': [
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'nT4cBy25sSFnGw6T73Ss3H9E_jAsvAFOn1XWJ2lvrag',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'iAqBC-IVHwXQZAUV-ZZO62Y_HisXIzQ5tjTANI8sR_w',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'kSu94xj-D8Vki3u6p2UZTFBw8psCn4j8fKIiJQPHzOI',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'UGW3jhRBbRHobOiDIXkWjy1_Juaa4iq1I1RZqWyU8FA',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'gcQKMOKfXhtZ6aX_HqAfVwkHZmyUWKfelph2GuKxT3o',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '0h0CA1D7K8daZ8OpUpQuQAVRiS3LTLqrNDTHbhGnSmM',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '7WfrluSe3R8uVw37Z-hvzk9QyviNQ-JGM7YhJuyEW0I',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'THgLi5VoiPP6RTK6K1cRqlVbnM3EsBIAT7mhtfqUXAM',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'UTcn4Dqnb01unNTEkLNv_aQxtemZljZ2smiaUByvIYg',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'zQvyHM91gD3p9iITuFAlHnRib0LuGwWkCY0Rth493yY',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'BwE8s_kahbXIG9D1CPDTaqCatSA01tmnDLZo6YMkRUg',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'Pm9rYFeuf4I88h9hpR2A4_iCmja_5YwZKcuZmjc3x5k',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'wmkizBeieaL9ZIbMol2EiVP-9GcKRxp8xZlzjhyXG5s',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'IW9WtHN_jmMzY07Je9sluLf4TVIgvg4CGI6vFtwr1kA',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'lILTF_G8u_congNw0feWBPHH_HKrG0rOm--dWIZftyc',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'xPVQQhPAxD2PlxphLAMvkI4N8eDGcEfo-MrUvhDZbE8',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'n-97yu1-FvtQo51AxL8KBJyIgY59hwCmniYuR-snl8s',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'SaXnsUgxJLkJRghWQOUs9-wB0npVviewTkUbh2Yk64M',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '8gSMXE6mctx6NvcMqB6wCQz2N8mjgOeJzJa6l4riEKs',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '-jDWHBPGx2b0PLGZ45_Ddc0zgETHqq-uxSsX1qY8cW4',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'ogOpFXZ1llf-9EW1nrZS49NaaC9GRz7kJw-CATHb8Kc',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'OMawlune4Fl5RIeFJ1PgEc-SUfXYEg0TuKaI9VUCPuM',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'FUJUdM6PGoVjhipMP1Jlm_p6jNZRIxguPHNjWsqTPJA',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'SXOxqt8nbDUKvsD975MJVOYoTyo9BY6uzQi75bF2kbU',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'AwL-9OAaoCOHGCWmzxExGe9n7IBhVGxLmUZ4k7EvAnk',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '0RJY7k7g4o9NRe2pHI4ugL-9fgdVrYn3PMlroSPj7tI',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '-Bm9kNOFX6w2LyDt0JIKyL3pwrWGb9PYZexArJ_QknI',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'uCAJoVuo2iqPJnQczIAxxa_KSOi-2WhXapnW6kV0WbU',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '6_dn4lgNqS8SvB6GW5KL-pqtuk84qkkp_dQfD0Mnob0',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '0Ot8o1O1Kc8sQXFjTXUR4gJMMby1bTkiNiNi9GUC0lQ',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '-q3ojQYn2Qz81o-zOtzM4uM9UY9IThWgzl1eQFtwalc',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'tPaIyq3VcpUdrYorOyH90aUbRo4x1Cv2S9DW-chowog',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'Obe_NoYOv0CMR6rHjwkBsnMqatscMs3sqZlKaDYtmUw',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'T-WRHdzPUtbu-nWi7GO9uWFfT7PK_QY2wSbiOq972xM',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'cnDxx9SGxlR1W9328ce1pYrG_eTIcbXWQKV7zZpJ-io',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '410rFtSHRE3XHkygCh971YB5Rwrsr4I8l3h-J9pb2w8',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '8GNCEulUpfj3fJWxpLwfd1_ueNdhiMMZSEDSXvP7L0w',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '9Gy5YRA2NvDqJeK7T6zdBr93swqvyHErURcNPvMHsPM',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'xcONoH3Xbnwmdc3L7MJwsrfKjztn2UEnoA4HttCkaAs',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'L5XWroIdViwnsDaz-3N1gqS-BQo4kGKRlRz-RHIfetE',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'K8wXnywr8KJyktw32S6TDySB-1fdRdmhRmCTjjYUZ0g',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'nmAu661dtcFPT6jxSyfG3kSzYMMxkX4eqI0wgrWmVCw',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'qdQpUbmIlaZnODphdxPTCKgd6QzC-CT46H92JXZAdcg',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'BOEmzlloPFzQcm5yfZp4VJeylkT6mpZlcXjv720DVH8',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'M3IVG8FaaO6jS91X0gVTUE77uw-OAPRuhL_z3Bcen7s',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'F2a6hMj9jt4AAjntJyym_uOcg_P3W-wunXtmuzgQ1ng',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'IRPSJ-WAJYmxVR7W4z_4BONEf9Ts6uSaBSShuQ921zc',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'ldmiXtSlbagsn3qN2XfBotSH770b7_4iECN6pxMv4Ps',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: '8CGZof7PHIcCXOLJlO6vOAq-uPn85tfLYgCL4oaVMpg',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'yTehql9IXSNKcMLq8IJEwSi4XXc1Az5HwcsUTDDP0SY',
		},
		{
			cu: 'cu70.ao-testnet.xyz',
			id: 'D9grJKMtRM_1dhHGiIj46iUmuFfhL92pHrqleGPWC3Q',
		},
	],
	'cu-71-zone': [
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'g-_3Aa290b9Ib_t9ywQD_ffoXCRCpYf22AAQe268fOI',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'OdM0kWIpbr2KwPFO1Rbkn_mWhy_1FWxOj1d8BCYwUVk',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'Ap2oJWV_ocoytFKviOxO3conGEGi12S6r2tnA1bgUo8',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'n39iaGOKWVzowNPWGSVUrEhupvIuGZGE9wv9MCtUy0s',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'Qs-thSShHa6eyDrQu7Ly_f0dgoAp3mY2y-0ZbxOEWKU',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'tUpX6h0Tt_5wKcQhrYaKuhYsv2na7esuPu6sjx5cfNQ',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: '3lfN4uGXcYffLaAfK88FmPN9Km7IPeqlStkJurfy3vA',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'UNVGq2rbxnQwUVuPAICHWFf7TGfzvnny4c2vMjbtLT0',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'EAPOzZk00OQE0rE55MpSSHw2sGnhBPIZL7nOphuxT90',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'f6tNKp5fI8M2R-nCAlG9cA8C7Mv0SlsFHMi9c5WoBAA',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'gTpcz3aJEi2g3R61I34ugPA2IVNsw4c0fs74dfyM4Qw',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'Iak-8za98YNZTBgv7dx2LGzqS2oTirAHSKN9K7IpiWQ',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'l6FIIf2nEoMCactRLC5m0ynXlQMLXnNWHppDkcpaTSQ',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'MN7OCm7SKyXk9Cve-NiBsWeZeb0s6GOMYxUC04vsSss',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'qjsa9Ta2C4BPJxsfS9-bb701IOSx7a8-j1LU9TlsheM',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'xKT5_B0-8fpwSUC6VnWggvOzN-mXt28kHVzx4sbvIqo',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'CZ6stBp9QBAQqOYNh-DH-Yoor0_k_TqQmrUVgNCfNzE',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'aSgm6vKHJgCmFnXQ3Qf2aW8lB8ox-T9uGDaD2FakQIE',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'Dqo2kl4hEaqOUkr9zInLVpDfl6JNLzPAVlkIQ1pnVHs',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'WPDincl11MnCWqTjHTy1OaBYgZQNA2yZC1tUIjy1z94',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'uKIvuMZ7gO096u4OPfRtYFCpOx8upW2nNlAOlFtiD44',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'EmiorLrIT2hEK_WfoFUYCuDxBBtLSZCsDnL_xCB8GK4',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'MavCiDjISU3VYz7TOOhSbCw5ZMK8lettHm41Q0oxm48',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'F__tC-Ut42XsKuW8qMd6iW8Tb7y7BPNaBd4zEHI8ESQ',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'pQ1RUISn_ulJwCXwIKTTZq9yJuAEVdnEN76HTRwCEOA',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'tzelMn4CgXsWgsQz46QSpa1jRKv6ih1w6fZNfMksHLM',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: '9KPqu-Fp-M2_4SvdEgOjKif3mNXgsBa24Ccb-zina00',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'W3CktWV8fD6SGPNzpbSYMUFcV_udh7TiOjAwTWExCjo',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: '1kQcolAR5dgFrRuI_rCbnTBeQInWWefW_-C8z0JVgTo',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'B5HcEUhyo4EuBH3rjw3g1HVk0vrlZEWjSHkQfGtpH8Q',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'cVTfw1eOVmt1O5vlDPa5-r6S5L0PNwifxtmGC1vfGLE',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'UiwrdBDdZ5mgg5bJMK5z1-1gOOb0y_5WM7e0PvigvPw',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'ZQE1PLHoZrmK6xYgfV6EgG3iByjy0DNXdhAur6fg7Kk',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'F4_eVf3Zb_5h3TcEMJxRxwTFscotnjFnHBcqYqf2Slo',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'nlYIvU11CoGVTOWzFAIM8rbMnyXEcw1D1tqOeWIlonA',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'YSVb813t_-FrYHhtMQ1o2NO_mIzDC8f-LDtJ515SoDA',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: '2oV-Lo9d10s5QoctVzSozOqJHm1qN_EeVFOjmgp3sDE',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'LhoLBjZUNP-FHvpOYVqdFdm0MG2wpZkrmmRPbcxtVKc',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'X2LKuFkQj2lJwYZnfGAbF6FVsI6teb4YLIN2KPBCOHM',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'zcFrwdMIiHPW8vi4cYuMAT0OSW8u7w9KRSpx9lotkgA',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'g3jLQ0BAAa1Kda68KpYdNDMMK0wV3TrrihyRXddAYdI',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'bk9u5WsHqQjq7iMG-Ebw4lFgmGO3LFEbwNynIHUCH60',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'dyUHxvFqHZ0ap8EPe76KImxW3U78P1vryPX-ZRlyouU',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: '7q8TH2h0n0NaoRJi1NGDc7iK7RyhBPxmuAnhleoPJP8',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'kv0HBMyCeFh3nTAGXn8XaxXx6uJlIG0H50uzgcwCKaI',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: '8M3a0jOwqFODcDBAbf95AaVA15WibkhhZxcY6hA2eOk',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'y96UygcN_Wcoo1e5p_afZOuXtHO_wH95wb444uKbzhw',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'bYYGoDpnwipBZDtd9EUlSt93D4fobRCNAgMbiSNEB3Q',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'ZMiiFcrYjN3hBIX7Ffq4jiee4ZfRkIvO7-JNDS4Y4Ac',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: '07gaNtgwaIO7Jj2SRtJoandlDcWU4goXIV0WoUmJiNg',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: '-mBnKPY_k5_Hbn73D14lB1091ofypopbH_ulfnOimSE',
		},
		{
			cu: 'cu71.ao-testnet.xyz',
			id: 'go2E6VNcVOOKLshcA6STkGWnsp5eSpyXI4ljahBLesc',
		},
	],
	'cu-72-zone': [
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'MtvYtcvM9PmnvT4eddwj-OvJ0BsfhMl-Mb_peTswv04',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'EQi9SORnN8vhtoNoKfbQ4bUBvAzNGrAVIDbI-KRj2pA',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 't9dGWrfydUQ0o0k-zsrWsQPM3c6WdmCTMOdNVqyKQxo',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: '7h23ViBz_7-BpfTNf45hRcLZSCj6gynMDgwFhVUMw7Q',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'QOpDDUwcuUzdbZnMZZ049CZqHPM8AK-NescDcm4Qe98',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'NDdUFW6h37zp8IYnRt3bxxODQoqHohof-_SNFsHkVSQ',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: '72gaH4eqJzEI68Yg6NjeeI0Rx13B20xS6Rg_afzcEII',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'Lv-rvoZGd9I3jXVzVc8-Yz4Ir87wDItmGOU-1z2jPHY',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'D8G5rtvFzQF2pKC4EnYP87NXaEFnW86pC4NVrxKhsxQ',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'RLVs00RRCJWo8olesgX7wtK09rnVn6nTsWCwPqWMz6g',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'TUW4LbBKmOJ9z_uvi-xQa9FGIDBq8qGbqjfdlEHyRZ8',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'cGygPSXxc2IgHA1wuGiWZEyI8emeiNB0WzgV40Bc4CE',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'khuAj5t1k3EIU8rHSQOfU2uan42plcxQ_5Xun0ODzwM',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: '35jYDsvapp0bykrbv4-a-AnrQB8nVORIkx7EmFM9_90',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'Rs1iFQ2VYUhTBxKl3BHW0iMVK5ZkbIai91HB5s1Wxl4',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'f4CCLprtKl4xWoSsFbszcdaT2e92YJC63k8EZdGOIuY',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'CEUtV9_2V_FFnSXhRN8tqi57LqeFcHxd7n69Qeg3eNM',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'E-Hzq1jv6fFjn77NBYapwthLnTWjyCWrUEBeRhmAUSo',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'P4PQFDbLzc9XyzHUnNeH_NDZzz3tNLYmvkLzx2nWhm8',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'Q_o8D3KtR16URF_YD--sXbSFhdfNd937z6oYIrfzgts',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'pZ0AKQnjQsB9i7dmVYrtfLbI1ndhhduNhzPKoQU7Zxc',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'eHHXBjyKjU7AGxweblv31cEAuqeivUY-D4nF5QmPbh8',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'BkVaqu838lbj3wpCtnOCGazuVJS0BtwXUyiH0UZsgto',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'z2hbJ07Luh3y4EVqs3XhscJqU1NP7Ps6NsoZJku1URo',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'P3dZHln7kkiwESKeIdrNA0ryukm-wPLpsXvuAcP3n24',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'QCt7cQ0lj6fvF9Vn3pZS4wumbU9uycwUBmnw27qD31I',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'mP7JhyzVLC-W3vdUnxuGCRNyh52SwHVQUKPPCA3tpB4',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'dHV6nP8hkWhQ5utwfvN3q69qrduDhKoF0vyXnF9fkr4',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'IEbkjYaWeT6HqGfIxJfD4ZpQl2oCnSv_zHKLh9JNiGA',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'x8MOBBdlkRlT8DsInePwpLcq3mYshWp557JuZQ35Hl4',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'QxyFEMQJmBOpSTVu1LPxlteKIK7e5t5a8uEFLf3_QZ0',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'LwpgcC5zBVMjg0q8XKdijK-5jeywWvOvp0rLXmuP_RY',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'p9frGx5enR51_sLR2kg7YpnnYISn749ASNRGEFVwQtk',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'R56s6VIM_ZBeF1UyOjPava4_UojbUOal8jQQI_Eo6tQ',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: '9RIL0lTd2CDxX9VrId6pfGnhB7kedlXmK6kNSLIultM',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: '8twNImofaObOHMqLcWX4k1ZE5UVMobv9zJ0npVXpu9o',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'KrcUozBDcSGPvz6dd2pgsF4vc85O_2O5SDtbDf1eEj0',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'rtvDKhlbnY2M_sWOAzlp7zq8r3WYCzqBSGolxjiDl_s',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: '-6QIw6WnSEkGUaMlAtd0qMjGitUqY17-tbowTMnIOVg',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'ZFwOnHnx9wGdXoLOgDku25EQvVR35e7l3scEZYDTuVI',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'gbi_NxzbalC-Rv9hluWIBghSBpm2iN2u7mfm7S1K5M0',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'hV_jGa9BOPWZjs5Ou3ZbzGZALYMnRIa6h_AykfhTAL4',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: '18Vq22pOipTGdsKGbc_uLzartOOMlszerf7hWT3kU5g',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'mJPtvK7TXt6abAGIl1_ywWW-jxH3t03K_TyFuYoXQhw',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: '7Rw2UxNEGUCShiVOEUxVsbUZ5axcHxjhfg1SNANooAU',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'xUVd5jM3wF63mq9QnCmEqWpALUgPXdPoFUpaYgwgB74',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'Gy-fiC7ByTO_nTSwxfL6S0q4AjoXG_YL9b_2gnn5MC4',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: '3ccQEpvKTQSsf6kpl_ei1lD0IfGD8NVahvr0t1ypSNQ',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'dyHua6mIULDAfFinubMFWPEc_G7vR12Y6E2hItXR0ZY',
		},
		{
			cu: 'cu72.ao-testnet.xyz',
			id: 'FCzrNU1SWDPtl90XlRUwVJLkam9WWCdPJUleasQU4hs',
		},
	],
	'cu-73-zone': [
		{
			cu: 'cu73.ao-testnet.xyz',
			id: '3PeUhJy9pqcIYh8Giwo74HeFoSDRs67RPw2Ht0aLz6k',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'lm4NMp82YddFbPW3twqMxCuqB9hEWzMG1nExqsgJNmI',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: '_LWhO3pque-Rn0M2uotTFz3rfmc5HTbVOzBZEYJcVzE',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'Oiw7cZkwopkYcc60vt9yxOJyBSqzE_hcVvIYeMlKnwA',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'yislZJXp31dpn_x9gm_c7ui3jYcJxNObDGzstGutTIQ',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'J4GFsglDGZJ7Ua5hIgXN8C0YvNXleB1OKuZED_2Mozw',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'n8AeKWatrEsQ65RfWu6r5dgztyk6kp5McPYqOJAbfGU',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: '57QAzst4useMiQfx2QajRs9J2HIIBp0062bHHuoGWu4',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'MWbLhcnzfIuM5vniIvX3h1Hgw6vJCQx0xDaUQ8GTEyg',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'QD3R6Qes15eQqIN_TK5s7ttawzAiX8ucYI2AUXnuS18',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'SFVW-5gfZKBieY_RgFmDrXOyhJkJgNsYkoRbMIKls64',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'EYpIDIljuabaHPqkQj5jX3iSLoX8rUqmAQRmJ63rDsU',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'aaMm6RoVi0rM-M350mssetvnfpcAMrBmHWvdYGnWU0o',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'gZPz5GP8Wdh_qnJaBL0d-kFTnPiTigZQpPZXNbzWXro',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'JZ-kYyOgRJ1wKWSGPqeGLhoclH68p7NlxydXTOLjv20',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'ApSMpPh30S0T5QHAjIPOhF9ea3T69ND3mh6xY-1n0jM',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'eVP9YI7-68uPMNIybp1mLuCDAt8JXkSFOCI5PJprciY',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'qeNpDBVhSdJQwHLK5LYq-rmzifl3UvPJrCoFuo1qx6E',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'z0Uo4FWYyZplErckkcnNvw8PPPNKsxo4d_Yay0rcq9Y',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: '1tpp2pLjY6Kh0m_uWKqgn_yB2C8NVaJ1ZdoG7Sd-k3M',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'tfJKlh_vwc-l5de_raazY-D4n3XOZpZ4GHj_8MTdxZ4',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'yX4Lk5nxuqBVqmv_XT2k7Oq_4z_jjieJgeruc2BPzeM',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'pNXXw9-QAkD0kHwUE__9T39rELoREDx2Kyg8917s_7Q',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: '-3ptZ6dxndxhz8910qa_zD8odm7y4ep-T0U_cCiTCWQ',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'FM9TGWqX-kXWweH_8pxmd5hbfMQPaevGZjkv7bcid_8',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'lmABfexaBp17t3dQIA6aduAPBuTwaGXVgszncTpYhOk',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'VUnVMj1w5y8JRvEcKsQgFmgukn7IWjzNP50cfbsXt_o',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: '6SeptqYdDB8Q5BfZYva5EHyKksLtaKPqglevvZIK7Pk',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'fVM_bCwEZdWvP7MKRGpJeDC0B7dOJKWAxNpbGQzC9ZM',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'tYJo9WHXd79L8NCxxCDmugj4s-rMGnfj-LwXFWCVeWk',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'dF0ivZLiwFonPvE3HVxGQfB_Qh_pN0WP3spX7S8RMEU',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: '1Vjf70ZHxXhGXN7Bikr8PW3ynXYqIKF4Sq1gmrQgLF4',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'LgFIxdWKHvRytaYLjTsQH-TioGSnS9tKcqahX27Vcns',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'pv-II2I_V-97-sGWYZWklPbxNlU13Q0zCwYI3RwVtXA',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'RG9uY4EfXGNFrAxQ9E-GPHvoyRKrSZr2FVKfWa_RAqs',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'c07E4Kmqgow0fVllydOnhUH2GvMAgS6nv07OdrQ_zvc',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'jYOXbcilyptsJkBhTI4YbpwQLUnXIrdCGEymVq2GJtI',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'TeX9BJe7W4U4C4M3kIRsQCFJZnl2PDoKxs7tF2EMvwI',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'DjBlsms3fqIq_PoXmcJlv2W-CRJNMVCa8ketOQtUVX0',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'JJOOxs71xrXBvmHxZlA8hgwyP5FMih6fCKx2TSVoZ-k',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'LFFmrESjSxZIrTzxykZP6cW74uPVVH7k5KtSKWfgQbc',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'pBVqT3TIFauI_vn8jC-8yt2sAC1mSuGaToJYmFuTVZM',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'qLaw6WHsrXaubf9XRzu84eqVr_tKxP6vW4XsF4-H_gg',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'OaE3WF6ki5VEK8ogensCsDCKeEj_nP1ydymH66IOFMg',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'Z5a_c-RJjHMU5b0ByPPSWX5zSh4xmqap4lD_N9nr_QI',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: '7yrqaS6CRLjemHNrTFcWXTdol9sclUT1ctiqJZNo_Ag',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'WA-ZL1RlnRnJnVKdBgYitSlMPvUUnIzhIqjO4JKS1hs',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: '-MESE-vHjuM6-C9OnQQ9f9K6TLe6xfsKzzTHQiWzyAo',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'Q2-6Sqxi-blDZa4vBQscG1EC-2EBwuXUPCugveUgyHE',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'gS623pMjIRU3G9yhzfp1jKOKD_iD_r3anRj1RS3ummQ',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'V4cvU9tCujJBZnngFoMtS5F-jfmANFWph_1cvSKCQQ0',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'dcSAgOX8JZ4fW64wJaHU4BdP4zTa6b9k9KI42k57A4Q',
		},
		{
			cu: 'cu73.ao-testnet.xyz',
			id: 'tOLpM0emdvNX5HI0vXcn-U1xIxsyElb1BmCpWgppFYs',
		},
	],
	'cu-74-zone': [
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '1T66WdNjrklA5HgagSRWTqSpr-idDEuZp6hyNN6eXgM',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'd86xm9iHyCqnDhzf1FbHN9d4rZKE5TtdcelF_KzGdu4',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '8vQ-dp-W-UxAwpQ9dK8lXSKHQiCssh4qHjIprEyvJLg',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'VcSg53BOjHUorsVd0_bhFQggPfS4Wg5oeshrmUyLgQ0',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '3NUrfWjW-ISiAAJybV5Eqf4XLLSuNRDEy68JyEkweK0',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '_8iNH6asWmsOoRPXXM4LtMamx2ti6CQbG95eZZX7sBQ',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'ykuAPveqzARfbozhypEQ51BvaT06RJZ2giSbSlT2hZQ',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'zT2XnpKL0Z562mgrVoG28ulZHiBVDhWnQffY5RF71t8',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'z4F83eQqpKHAAgHZp1BpQmB6qCAPx6sKyVw00JBeoG0',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'dPy4IKUsLAUOnEaYHGi0s5Il9wlgT6hUADne6OJLqFA',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'usMlh8eWf9wrLR9kSPosW--SrXJGZ40LC5Rekjgywy4',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'EuD-oUbCCIrNW3Ik8_mqFj8a5qHcWmSrNv7aGA9FXss',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'Sb2X-sfIsv6dIqIMO1EchoQdiMnPzNkNtLXtuYBXDWw',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'xKIigOqnp5VmhD8yMO_hjVrZqpmxJIoIMzS7dHObC14',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'hD9ozHAcX59XaNddB_2_tUAuy2vwgpxL67nEeTkOsgs',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '5P1V1rUdZVr29a3v2QLE2U8AVUDxuGTgw5yx-WMyogc',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'iFtUFbTn3CdLrt7_50bgGfOz0jEaIHLOygjs8NgYBWQ',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '8Ivxbp91MqPDuzDwgq7tXbrOVYFl_GQTgy_D9KwjyU8',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'UlaPOj8Tjw9OICqhsToip4IDeLpqaGLonSAV2frpTOw',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'z3EwEzjSZGc5aJjNaaaWPQ0StgskHdUoR6hTzu4OVKM',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'EHasTNkhipRTmXUuJpjs16TShJ4ErXowRK2cUFWr8c0',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'cVmBCIFqiKVGLVFWofEGThza9CAnUELqMrOxmEyCpog',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'rPy28mMSfp5DtpRz_dBFombeWT1iuBt6WOtqn3z6ymY',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'FWPrU7HGs1gnfuHAeZzlJFbmeD4cEwcIo9sZSEgTnd4',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'w5Q7nwoE2PKbjEsGY_K_ZtflkT0JEORzWfc2FtGZweM',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'rbPecYY73vM6GijFXs0loVp7tiFoS7UZ5UUkNCPrje8',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'TC2KP0YHnIw-jp-e0q3qFI3Os-cH_anf-PC7UDdpN78',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'dBl1dnxKAg7wRoODd5IK5VblU617PQvWDjrhhlGjTAg',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'vuo8oVohoqwsrMD0aB-4uP3aaPEC6XHWEBqLRBY5YxY',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '5TqJ4bK5yEJcEBgNvyByK1mrpfuibN7gT5MaYb_yoDY',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'feZMSEdnLI7gV87d8s3iatatuTxM-uGygoNajao02Mw',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'HLWeKD6QpcSVu7KEw8s-3K5B3NEOu_hPv8cBTSXOfAY',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'TT55SappYvEXQsj0S5mCpX5onHn1Ma8uofr1zeiSrko',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '5EwarJ937Hxx5961oTypYS2R-P4YXlhbNPBtN8MDgcQ',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'aQlFcoRF4pZqY1RPPgD9z9aOnJ_cen5IyJQi-ms6X5k',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'tydv6G-1JLR0y-q9oh_NGB2BUXJf5v7UnPKaWd_GL_c',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'Lxn3NJa8HNEYZmP4aPhRav6Om3oATOFg-4T23_sa0So',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'uhusdL3gelJk-CPWTgfdOywadIGJJ__JZ_NDOJ9FA1E',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '5DE_pxBcsH3B-F7po87Y2T3Qpc0TnPnKTz0e7YeRjco',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'ddLEdqxdPriVMgnAGY9RZwiyd9RS3ivR6wvY-WuSQVE',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'dYVoqKRuU56-cgQjxrDIRIQ1A5XvA-zAQQBcFIxqRe8',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '4LM3ZxpaZkJqoWUnrZkzrUDJWSiMjnCK6gD2gnmbE2g',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'Lu0yxFoBiSh4DeXyRfRKFfjEQa2r4SMOFdkQtTcTteU',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'Z4vUcGPG4A9sR_U4T6v0y29wjsjYRl-S2P3T9nN_Eiw',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'WVJ8BAkF7lOJ8ErFd-30lfkaLhWwLluAw1srF2fP_hY',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'P7v9exrw0Zs-JSI20XmAkL2fseNGXALoEQdLtDv6CTg',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'z9ag9HwsKjLnW2d1rbsIIRrhLeZAn-bDjvSqa6uGjlM',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'J1yt1GnyLuRslxRJ3K4DwxT45H4Vt8rHUzNIubvljEo',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '_w5gtu0wlS0I0GddkveKrVG7T5qyb6RQC_IPx9aGjL0',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'TALMerIuxt_1lEvDY4xDo7fH3l5o2G_JZ2hkafGINO8',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '7a-hOZxgLJQq7x6qhF5rPrWCFYxRUZ2ahgeXlNuWQ-Y',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '3OMf77mg6cwg8DOPDOOhYPfCCQkreByZbPDtlk1tlRo',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'es64_06bvH-7GgstfIpWXpPQboGIE79BHD4D0pW329U',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'zYQX6TLrTbn7LUfpp45-2kf5fmbq3z_OQ-vBYSE5U3E',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'IN0JxgFYAgLtlV9-_k0gYtrI0o6_1-sIhQhhqbP1kho',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'QLTPGc9ggbX3295bebV1AHfBjJf0ixMtfgaEUroOMEc',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'ir1gZ_MBODN1uLTGDzh2jzUmyDMUwcFWkS-eHaGCnfg',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '3fWH76REni5ToHu2LAIlulONNLPF2mcinQVnn2LmAPA',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'm05iE7ZsMTTSMD_eHh8SIycV8nhlduqX0bXXhzsspSA',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'ZUurKSajeedbzBia_cIN3lR3DyCkNAucWalLpVh-d0Y',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: '_qniTxdvWO0777zEHPnv_pqC3pxATslv47ru1h11smM',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'ERNWMwRUz16Ee3egPF6yyJkllDymP3cCwHWg7qkIfd8',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'Hcj3QTmRIVwh1mOVAPACBLqKXM_RZxsosMVNaCI5pEo',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'uayY8YHh9qAd-adpFeM4fqF6l2FMsrZQgKCaeMZ2jS4',
		},
		{
			cu: 'cu74.ao-testnet.xyz',
			id: 'yDGPXc9z_ih061tY_b8eyXy3e6RoK6Zw-5fg8Qu-o5g',
		},
	],
	'cu-75-zone': [
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'DEvi9kmiwB2lkxSmi4KOCFh612-cyhlXMq_1hBKNfx4',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '2DUo_MLVvxbfsWf5UfvqigCne3uziooMKvwbzLHSAfU',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '0D67QuswnvWxhpF3xT_UOqtMJvLESc85LD8iqwQV1Zk',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'ncGYZieZkxDmPneWow7khVWVcDoaKhjKoaZ13EBfskk',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '8fz0_pKDSeVhKE2G4eA6s7RSK8EktJPZYAZJYeUByeY',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'GAEzF_B_H131XkUbEZsHfr2D2vMRngszg10gbrUIFy0',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'rrkUxaXBDORW4ptdLcJyARcxAY0jhPITxOjZgYG356Q',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'Ek4TwsqOZ-B68PB-lrWHIXEJ8HQRFBtmHHK9kxXvmyI',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'hjdr09A0FqFtNYmvZeRl5iTyk6NG34kcIZ9PGMRPZiw',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '6gd_4Dm3NDTq__SaK1z7BB48Piiz0v6-giUSO_XAhRM',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '_r7sUTTU891esyX42YQ61_f1ESKOP7yZqdZQeNalsH4',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '7Ab0FdZC-E3ln4_hXgKp3rPYLKaz5wnmwWhi0Z5PG0g',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'B5dYy8lp7dGMF2w3dS5Bx4795QQ0mP6h4Nq4wMQb9d4',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '4fnnorQHd4sRT-6I-BLlFF9GivqpMpMfRqtcTp6zF5E',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'aVf3nA0bPBS4RDVoMvxMKdp-D5vHJ3EPrRBdzsalsho',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'SiRJVSk5D0i4gKnd2wSF8kRMXzCXSvQaBDgNWi51AiA',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'zPMMB9QHFb_XDCVCRPWvQe-NwkbSaRABk6ujVDyIXZ0',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'kYLfR9pt4Dj-aBtCPuNg9ejmHed-sCkqs3exY45biFk',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '3Oa5zXKFoGsRdABPIPstzg5Ul_f3oHq0UwCqiRXYJOU',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '1phNqkkUP9kQukJlkd49oAa1ctbb6LyZxgwGS3FCd_s',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'LBWEdNzcYAASgEZmjzuSNHJ4-fMFm89rKT6I2lID-jQ',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'jzBPhUM_EKktMTz6ezTje-Y5J8dOEauB3YoNIgOHH3U',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'KvUGKMngJH-L6E2bWEyIx7Yeo87OuxzB5UW4ced6kLw',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '1dvdC7NKPLxFv9KnhuWAR5gThsfoF0t-J6RffffCfKY',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '66_JQEqq94CXKjlmiwfE9Jm3rjDKmNIMa4tRCtu_lzI',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'rDO6Ezny62iE8XD8vGxizODZ9P21JicYIOvdhnaWVKk',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '2zvUaa4IUr98pQHqTHF3lz4F80KDXcLrWlBHK59q_nE',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '1pwJs5XgGqPIAzF1t9XaX1ntCqZQgDSQXk5NHw44V3Q',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'bM_rVI6-MM3dWY6he6zvU1egrsiq7i4fHYGZ-XmYRoc',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'NF-8RnCyIcRuZHPZzy9yDt1eodmje8hRyWyHlAFioxg',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '7ndgM7tnXXd8G-k2ZoEPkK3kAjYG2JlNcBYKiQPua1s',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '0RrzrXCKNqkiTirTiHaAjqyZQ4DFTtiqBlhAYmidzaE',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'EhQukVN8UGXKG_Ez0q41EX2FDA-wQlbi0x6dhQ-m3Fw',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'O2oovbLBtKqUz_gjng0ofdCIjnh0ZhpmOOfutyon2BQ',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'gN-nZVQJUr6g6eyTEmxf0icRaFAzGR4uo928ThS3Bwo',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'aYWvBoQ3ZJYWREKIiLeghJWtJvZA3yurC5RO5zLn8rE',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'p6HsKd40i7_TEHmaljfb_NH0TewFqR6IbuNrgZlIuB4',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '_f4J_d3Ibsr63v3BJGFLXETEKJdtMCDd8_ZC7ufx-Cc',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '0QeymPLcUx7yc8Z6v88JZhHtWOfccRa0MW4slBWjLzQ',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'uxcYSFbXQfAcRGkQtyyATJPIUOy_kcsDTswghuuyRi0',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'jwVwUwql3-KkzTuWSg-1VWsI56muEHqePBYqIgQJcgQ',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'Zk0lPdwlrI1duVZNkevpjJKiL4ctpyvXWpZfJZ_rU8M',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: '1g-xheqYa8tJv8KX7W_3EsFXyyC8hOPHkJb5Ls_ovPs',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'uwWaE6zR5QeGuJOwy7E1LJ6fJregCKi--f9mtqGIqH8',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'qqqiMDWfewIEcsmHQkJf_IwsoC0pc57HHGJ9KUpvlp4',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'wWGAVXCgUmECC1z_X33zXfyEDB5k5F8XietpphFU95E',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'yRlbOJFnh7h1yoR3pYU_n0DTg87MHfmLAGL4MXy0-kY',
		},
		{
			cu: 'cu75.ao-testnet.xyz',
			id: 'V4B-c9Kij9CBuGyuQGj_i1NAUpZ3e_dTP9hEF8WlVR8',
		},
	],
	'cu-76-zone': [
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '4lQe5-AvbO2Sn9op1uArzhFgQxTBBy0mRZnv498elPw',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'FV_QUooo6khlymE_Wn-_B6fqhdv8gYypTJZSrOx7sb0',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'b5lpomPugHAvZZldnZAprqFQ9N48E41SQi5HCLZibT4',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'S0JLKlVCC2n-Pp52I5aNqC5F-DXzEKmcD8D2xz0V3Is',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '9HfzCSY87QOis2mmxvLJZIOsWcZeDXcbZzA4CtQ1gkg',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'twFZ4HTvL_0XAIOMPizxs_S3YH5J5yGvJ8zKiMReWF0',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'qQ_I9BGMk5jaTJLJvZ9u1KISHa1_4QcACeYk41PZtTg',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'hUbph8ExqS_gRDufsZ53wEH_Tv7CW4IJPxYJLKOrpVI',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'mizmkgJixauyUpPND6ZG1QR7u7OPX3yA5y8TJ5zKrZA',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'U5j4FUmZtxzewFS8Y0SRFRg8pz7CX4vlK-AxK6zD4dQ',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'A0p8jpMJXhcZitrt2uSQS-e7Vl4rqdXlxDNOlMtn6qc',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'M0SuLVHTI_Z85cdDdWLvaRYwDoAkT_4P7HfEdcoNOb0',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '85hbp05Fuq0QNlcIOMFq87Xlm8MQ32-gTrdxWDXMvWM',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'O1mhxBPUjqEh9E3DLrEogNx2QNSeoW5YgijmKknFKlI',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'Zfo8dIBzpxP5oBQYDBAsK0aDVTxtdea0fu6P-bxkrJg',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'I2NJVc5tzvoqWSkM909SzWuyvAXa65o1mNGK8pOhdr4',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'LOkfmjLE4WVZrDn_ZOWifAAqLUnTvfncma19LOacXcQ',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'AU2p6uQXCz-i4seyvqVYMajXkzn_ElpB3FoRUcoqhkE',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'tYLIZ0zbZKy-UbMBbM4vWQ0v_w2XD7tvA1nO0gecVf0',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '2REZsMVX7RTmQEICdR-lRETjiIGZRprTLEUhOIewkLA',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '82QnDfpX7L2f2UaDaoooLI5u5gpYRlMc0a6n1__M3M0',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'xKhO7mvx3uz4jhK5BtVsr9bUH1meuINWAA7J00se1AU',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'yZ6F6_2At1WIu6fZkYqWy2aGq6-sTNF3TbpzG4Q4h3M',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'CsYsHqMqudqoibeRrBct66U17RKZzszTM4Tqz-oIn9g',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'TGhD6NbFA7S4B5avSVoF26mj_GsG-NuOV1MLEDeiMhI',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'SgnXHK2Uil1n5yg9y6CHzvz5G-J-sBVPCN1cyfq-fyc',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'WITRsCcxykEwV314m_-8MmOT7HwfQAGccgvlGkuxgpU',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'asH9Qe48S9ZGS9hA-bMyF7r78cegIVIYdjj88cwp7LI',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'dTmgqX6lrpKNUX0Tc-5dcm65imW1-t3Jm9uAMBoxXdM',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '-FhdRLNsQfdbVAPfxuzdqM_TMh24FgqRsdUlBliFRoU',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'ShW5rTGPqb3zLpGl8Ao8dknLFggCCAosuyOD6EwJmbw',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'UD0aPz0RxcKzF9I1Wwu8ggvwpdj0oWpsKFwshGCa6DY',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'IHqDRXf1juHf6HJzWvDc-xguqAQ-5LSWUKlNjL2DplE',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'NuOLK8FWTLh3M5__4aFtZMqbMtljRscLVb6vlpDTw4o',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'yj3OuTqzIqgkKALAMQi-qG4w0eIEkUo1IWgCpsbTcas',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'lMUFnKSd0524T3FbxXpzdTZtR_pTkCisfQKRTpj_how',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'cj6otjkRiQhOp0Do74xW2e_Ji5LYbB-2rMpNlZN0u1g',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '6aoXols3dHj2E3i6m12OLW6WjiqKXvwQxQgSRvSqMas',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'lb1IaZT7p2cNs8-Zu4Qmt4yqDtNZDf9vFzRhL9EWUXQ',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'ZDi-OQIeo48FRcFx7E_n8x0IgfJpkb4Z2b4MzGDgEE0',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'L7FACXZBXIKqYwIVxoVleIom9dfLp53agNQfC38KTL8',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '9XsWP5UHaQnbsl4uEmr4jgmGwI1ZqDwRaFv-9R0YOZE',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'uvik-_2HidNlZmXnGLLi5koUBGqGLWAetaAkXEMQ-kE',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'wLsEOWcHoUeMsl0_mP0Zdlyb3aexd9QIr5eWlczvOtI',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'QlCEdLsPEA_9Wf2TiObr4mFktveO-RKa0zerh8Gvyk4',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'OiZHL5sBerqKSjqao17mGC8jFgXiu-qeBD6d2dhT6Bo',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '0lCjUh67fqLBUlK2ScZKqLgH6Zw6IFt05yPlAUNqVgI',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '4o7kDKxdegLGoVU6RgriOypbjO6o91iLAU0HF2eozBI',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'ajrGnUq9x9-K1TY1MSiKwNWhNTbq7-IdtFa33T59b7s',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '-L5-TxP3uT50SkMQNZWZu7Ya0UEZuc-yORwEMyrNAok',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '2fht4n8lje5b9TEIzfuy-UpI52PmLCrC40Wn3-O7yS4',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'R948ZP7EQ45QAYPf5L0oOAE9fM7JMt0vUyiN--6OpRI',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'F9DvwafUeMNnmXrR0vgCJx0nc28CNe2ys5TVDpsuFFg',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'lUDSPrs_kA2FW8IZwqTgs_SVPTu2iCmJZfA_xMkFOUs',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'bTQtyLLb8ebnutFulee5IhGEdU3JbIEllVLojPerFHw',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'qj0NNiLfshP5_Lxs6Yk_7fZ4KUH8pU2y-U4takZKncU',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'uay9sRihdYZOQxX9_tv7-ac4RDKHowZhBg2zscniQqo',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'Ue91YGmsTnoj_8Z4sg9q2vDVrYC7qk3FZ2wZz5Y5NEc',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: '4eC16uEbZ96HZnndo2LctJrLCd7wvmrh-hnrJ7n66-I',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'U7P1y_eEFcIqxkMtFLYBaHPW3F-hAl2gxVlR3niOX7g',
		},
		{
			cu: 'cu76.ao-testnet.xyz',
			id: 'DeTGYHGELDbhsYiL_v_xYW5f-0CSoN_zKwxpUYoMLKI',
		},
	],
	'cu-77-zone': [
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'u0ddK5fjqblw0-AZSGZw-vf-zeWVGk00mvyCRyrMRg0',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'CDb4DwYGSaBpqaTcgX68vDvQvegP3M8-dOAnNYXdjXQ',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'oCXpVaPircmbIl06jnZ3LtId4hRWq0xUUPWZZ6JHNXQ',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '5hBVyaxQvF_zbznJCEPVS5R8XdptRksSUmf3wPXgwng',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'Gbh2-6VOLtzSDi1Gzzfdxk_dISiiEdrmJuxDX7y_Od8',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'Os1uJOGSsOjWOgFu3PxeRcLjHPTorq-_l-ylsM2quKk',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'pDNOZqlKMgZF4m9HqwF64MDSPnrjD3S9SYO0KAf5MDY',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '3l10RIWSkxDIKb5W77IJ_8njge-Fe_v3Zz2J188X1yQ',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '6SVrfOqGM9iNKV0kYUmES22iD4wGylQlqZuVJRoI0bc',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'Ieb6hUYK94NyS1_FoWtW9FI-8Cj33deR_t3b9rypIbQ',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'rjweRLr6oD87myKw10XoYS6GkqB1_X5_oq08xp8F_e8',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'astVTPA0jbRDH5gEbPSzUPKJLk8ImnoSzvFxL1YSI80',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'fcpVxh0bqFF5i0FWl4zUBY_1vFt7sGsYqO0RlPFyrmA',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'PiI7h6MPk7P4jrV2XPW3nMYTddQ-P4NoPHgler3N_i4',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'sun9XhI2NZR3LR59pW-39EaIlBMvOpFyciDTw60Vvg4',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'oHJegR78BJTT52Ww1cfj3cDggdzmfKeNMYu5fYHIBu8',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '-QKCXDlab7MBRGXVeFKFBsx3Xvt3I665WPDIqKFK6nw',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'zQJjBIZEhuizUuggNMaMyFDXL76r8p2rAFjpzRx75KE',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'DZzUwK5wSv7UzFTxp797h693Ij2QKx7J-KUiTiS5mzA',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '2Z-pJBJ-bcl2VJGxUvPWmNc0N1kSLvOz3shIkP3dfpc',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'omnkr2ekkKZxjq0e2_2Rhxdmdw_-xGFzxo8blM8z4DA',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'UXjtnxlFMALLPwXc2U7juPiPpf79eUqik31WD8fweyk',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'oSr81bytp0veHfnYRZ6XZ_HCw7BzRa5LZjPqpsd_kdM',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'QB79rUBCTLzinBKlgosf3csKKePXuKIoMmJa5sA4Oto',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'wo6zlNAAFBsG45hUzCdr6aIziqBZB69o9aop8sT_xFI',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '27T_oHSYCT_ZxHeAhrzjEvamL9j5YuVFbxMKeeNwC98',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'zZpO0AXQbzCmbZHju06HjGEXzmM9mCYTqJUX2p1BEpk',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'vzHBGX5MjZZ0bCIR29cx3Fxgk1Y8WNJi4cTKPRoSALI',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '7nXMyzuC2v4BIEMzoPzJD29RhdfFf25y7QW10BOvjuA',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '6qx3jr9j3uLxzxoY_GFOs0IwyuGVLgswvUT4rVBOTMk',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'T1naGmnX033UOMrbLx2NdFxWyEwghJ_UsL-CAgUs3IU',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'DUELd5rcIe5TfgoE0rjw4mCbb73fDtUOdFnplNkDnXo',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'j-iRLid1K_dtwTbh-G5aWVru-je76MlallvN9KEqxG0',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '9CXHg5SbQE2q_3rFFHlIYK1DHbMyms_IxGxcUUSe4Eg',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'japZ770tez0HHqTfTfcyTdac1w0SmfZRZdiwPITSLLk',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'PUax3z48JeQZdv-svCImGbXIdC6tull8J9-CRzRNnoE',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'OHU9foHWgr-Y8lRSIpiqS3zilNpyD_freXeqsvux3r0',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '9p4KrjvqZafhBPvrNkby-Q3SBj5WZy25su8368RtWQk',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '3Hn4QiCHEuDr1-q8CbUZqUs2bsx4PvEb8EhGyHmY-Mw',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '9ISlTYH9I65enbZ95Xd1kyis6xE6I9YFmeigPIKWWgA',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'fGT3fAMePPTKQ2me3GJouWaeTVDthkuivnhbX_Sjm5A',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'nRe1PtKJX4ZGgpPKV_0ZRzqrZf1Pz6-U_SqzqRDdjmM',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'V_VictMRmw8RHvJiJA5yLXJmHZ0ttAAP66_2zrHD_tg',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'NIgIguWajdAgfbALPjaGkQlRvk24NG7Y8TYSdJZgxHg',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: '0bG1P0n28_-7PumZzvtt8IyA4pgOET4f5mZnBr8CxPQ',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'KlUsZbUD_kIFJnLFFG6QcbgVo8ziXmyepTuh3CG_6Oc',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'm_8OWtUVveUHNCJwknfA4gbwwqiTJJyLI0eQuNtcUeQ',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'rw_XAngrOdCjGaa5Tk4gh5eLQ9QL79rv8C1nuMdfaFY',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'IOtif1CzGDjaamppnC0AevYVIwYjymqEBzs_4-t0qO0',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'P23v9T6K6WXd0hTRVV43LDaShMpgOEZVd1Vi5wWpuL4',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'U7F8-w1bOoAOqnwWg_24tONCel2KCdhYFNvmkxlYsJk',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'Z3ypzgSWQ35JZ82SBwRyiHov2mqOEpc63k418bd-mBA',
		},
		{
			cu: 'cu77.ao-testnet.xyz',
			id: 'Uv5FnX-3wGwIHKkSg77AqHfMl0CqKop6bnwBpFq5zrw',
		},
	],
	'cu-78-zone': [
		{
			cu: 'cu78.ao-testnet.xyz',
			id: '7ksW7rb3xBhFXaFkJZq9yXWNByYlcQdq1zntEv89qwg',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: '56g0BR6D99X0jnN3VmNHZbB8ZdMh9uPWduA6b7P7hto',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'aXkQmskb7vIkU9EHkzVhwb6WxfUB10ohl6h0oj63OeI',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'TRGLGVgFGVtu56EMTgkQhmfWzdIEVyxkKZRNjFZ63iw',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'fbWPDNbsoOZtzdpeyloL1lS6oZw55u7c7ms6VYo09EY',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: '4d2KrSOowAWwPlwLE1SR76Sj_q4YcxAt3LSdj9lwF3g',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'nlcBEMME8ucceEQYsDUppaR4WAc3Oi_0lC-3mAHsORs',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'etXLcbUXRW1jmWPZBFt0as0jW3RG_6gCkKHAC3ff5vY',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'WE4YX-ISI7-1tq72f-BgR-oeldzdJ2wQ1bwYfsOP7Wg',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: '58MgGyPFv5_gnc4-g2RuOd7pq73UNihjhtqcONmFGkc',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'LjMXiYWyx60suKmmfKjnfO_5xXW5-bT8RlA6w0dr-8A',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'wbrfOm7Hx9TaWMpIQYkf1wjkRv53O1sPGKqhl7v4Fy8',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'hH06ac5HPvOolPRdsXUR1JUZwx-N3hRIIj0BjQfMimw',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'twt54UvEENf3IHI_5WROfTdBWR0l8ONFNnE_wYvLY28',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'JpB3LVzbBx5WyYsBLtVMvUK2-Qa3r1Mc2lMLM825s08',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'cq9POIokmSQ5Pg3oLn2INZaDC-4M8e7CDpBJ-xoFG6o',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'DhxMfVPAoxvC4RSzPZnXZJW156d7O6VWo4rSDO2lVtw',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'BBVsg5SvVfP1idC-XAF6EwH8tWX_kdXa1GBz15rxB5U',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'wDl9quyIzNniSmCFkJzkInmzJ2fSyckA6ikZ_7L-c7U',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'hojX2iAVnTAxdzKIz72cEQjcqpdfSiM9jDOTA46kDV4',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'GwkUoJSX7sbNRBii5R67AwR_-s369dceyRNMK2axPqQ',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'K8rE_r1miafOFPtlnfxZd9uX3S1vREkEmH0LzMu0CkY',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'po1LpRf59KflV7T59thCEdWzRCQ7-NVVHLeDWGFCgLo',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: '-4QFwrDnSUhrGn6DCP01v6w-aR7fz_CB9tMDlt7NQ_0',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: '-8dsuEz5aHMvWEiBx0uxt0GmbU2WAVlwYTYZuT3pLkM',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'g4MDOmjILE3aLhF3iWNzaAeYfiT1mZ0tAcQfv3wdmQE',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: '4n_qRnIDSQjSbTSmk3RGu2Dht-ojExn_qbtregDxyhE',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'bkxi_iqItHquidfTUp1n7V7NcQt6b5K5fvh1Onr-C2M',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'uesgg1cLT9aFK8S5GeZYQLqkEDOw2Fq6SZHUP3s4lIk',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'hO8-CuEiFs-rRyVh6Dm0-R2uc2VOGJf_tui6T-a7pps',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'wkm-uQMsELyaDJ7Ye11A_PUr7zfpnXaUy07XDPzipI0',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'gFEsP2XawZz_1HprnW0Omcvj9nv1EpmH1gvpsQM0sys',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'mXYsusVtXje0QrdukkNf_PyI3B5CpssONDbHc1PawIo',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'XqNqGB_tMV_x-udMGOwrM2Ja7JkzyODcqxP48F_UWcg',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'By_kXc-ZK3HVaKlFmRCGGotxuE0Cc7Bi9uwilJPuEIk',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'Evn6tKS_XnoTCyIwn3-b3FTJ8MfWYu-QOzTE1GbeKv4',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'l9l7DorUAeRQ5KYmg1Kh3ZfBwQBIqVHbVl2hnBGG9Tc',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'rqLG2QB-nB-f_vNX_8KClvsQuEcv3mq-69N9OEG57eI',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'xCvV6XsDCDzgalTxNiZJYsPsCSX-kBh6YmvY0k3ikXo',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'KefG7uWLZjjn7w8wDlBDjaEMerHjuqDIIDUpI-W6y30',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'WRTKp-H4ZAz91C0ic555gmiJYOVS2oAaEVPhqtTzXpw',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'kyQ0D5lE7uej5IhomOngk52koEtf2hajPe1DvaEb6A0',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'ohDfsgHESMBjwR-eT76uexkoXAVP8txx6UD5t9aCeIg',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'ePgW-n_4-xW-TVzNuX0LKnO2fAdmf2ArFu87_RzSgVQ',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'p2qglgPPKZ-ol95WECTTZaNWS3_DbSJ_0UlsxbiiV5U',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'CPQdmfbzRWbuelOzUkoMslfOey34Ex-wB6Ar513LOmg',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'oisgnP_hGkoQYN-yYv6dAGSLh3KL9NJzOyVn5brmL60',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: '8qspeOxVYkhOBzAvYWrirqtL4d8jdZkpEMLqBOHGcjk',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'E1BajdVv-kjXfUSik9GkJ2VXvQRyIB-jbpSqn0SPIkM',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'bVB2vjpUTl_HP-KHYEyWofb5-DcDB0pgL9vfP5zyGCY',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'EuueMXdK8Re2zOZWGK65aBYJhmBKQ_LoSdFuYJvIKMI',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'vK5iaZxls7VAw59WukBqbwp-5rZxtYTlZpOuED0wTXg',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: '1Yn_wV-oU7PAyW5ciAytxlWe6h42veZBl-EBM80hTWk',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'H36fPAfIbM7Ix7IYf16_SPvgfTBAU2YsB6DeBhQihcQ',
		},
		{
			cu: 'cu78.ao-testnet.xyz',
			id: 'o5TfuvuKKKkO5uRgawo4eeGLGEZ1yB7-M6cDOlzEcVI',
		},
	],
	'cu-79-zone': [
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'fqFS4zWf13LzRb0uUGK207FcdJ-dmcOm1ysi6z50UpU',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: '2ZDbaJYrJDTTe9UehCfezsT6f8Wj-9bDxMJ8wSDmelw',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'kvbngFCBVjeC_gOAP2fjIFTngS847BuRWas8yJve_t0',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'ySztqB6YRqyWLsBJ5SPxtEXMyM1xcCVviUjAWAxf-5U',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'M7t-3eZucZNB71SqdMJ-NrHN6cfE4Fid3IcraYKYkzc',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'B2joZiCTPUdAnORxS-Frf33Xj10ZCj9qBZGpZTVWxq0',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'zgLNQzSEdy1usnyrvD6NcpCQmW6vp6wygLvO_5BYoEA',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'KRLmpRXX2BE_0YQh65K_HAQk3yqMx20VGLXXbcPKxzQ',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'oqp1DAWYSmm3Ks6VGZLGpNaNXheZ1B8pKVOCRXPJk4A',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'qqtts6gb0hfftkSiFC6nPLA8yiMj2toTLRVu8M30Zkk',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'lXJ8_RNF6BBEAm0OOd0OKeofhpPl2GpI0JQQUxJeo1s',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'gNVKnGXwguxkxdelOLQ-A9BHhLAiZ8sf2j0m5aHI3DA',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'eamlrBynmpjsD2gDb3PgyaQbtg3kEls1jwWh29O3K3M',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'fTSvjIvmaDkOOwscyDOWf6ShT9NlKdZ494owdVIBBFc',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: '3WeujuZ9UdIhm6dIKBR85PLhJxIBx6kXoJ37p64Tiis',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'QVDZNUtAGfMzw4RFLOyeH7hE8J9IDHwk_lziYqVqBkc',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'CRRVX8N1fveE3UB7c7dMn7lRyW2_GvfYuyQx2V3NAow',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'IBWgfZm_pN2LxjEd9TvhteWgs028NaD1FzODwd4PWu4',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'aDMsokNaiHC-fNVJmpzeXKqpEZM7P5S1yt1CbSl5CFk',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'Q3TlgJCzkv1ZNzrSqxQmxoXS6bcH3p22uJPCOkurnUU',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'EFGxspbF5cZEtsuXRZT1BSisOJfpYN9G0bIsDC5lyDI',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'ZqG8SzSfk9PS3rnYaoxyZtJnhWZoXrPM2YD5TbiZ_eU',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: '2iE8TNFTRRMM8h5UV5p9iCsea7nX4hbyA2tD77feA0Y',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'sJIeyeghw280XdWjek25neMSnRxqEGCUGo4hhffgFPs',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'kVODHqKh-AwXEw1n3qLu8c1ms491Z1pKCJWzKTgO3m0',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'lxDLyTdhwGmDww6y0bzXXc61XPZPaeKIp4IcdApB8zw',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'G2YzNZf7uOq-CxeWXUj02mJICObcawPy-NlFDt3wOQw',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'viFIWU83CXWFcHHHwS9DQf_hVh2Zq1q8B47clk2As-o',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'Vs3r8EVFYrF6DajjnXvnuORmKfqn4lAY-8DCCTuxC0g',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'ppZwkoJYbTmbGlAR_mmyKogkr_ex22R2umNadUTp7IA',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'r5QCUGc7iF0nZaisD9Ah8h18j-p6f1YLcVF_Mfes1CI',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'sNvMzOikdC_KjvIM0-lRy0WzNbAcAx_z7_dTyTIJ1Bg',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: '73b1S48MjmzOGSfpRP9SjUig9Vy5Jl4fq5Cs_GDusUs',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'tOBfB39tFxUKAfHlt6s0LScfLeQANRaSNk4ddk6AdRY',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'gcx2npJeYMy-l1_5ZDy4CUTDHNNmWiS2kGwSsdsG0wY',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'rDe-yW2CISQCpWfc9HmBCRXpMY5MnuFv6pMNVjOtI4Y',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'CK5HL89VgJgW-rxn93kFaOHypMU2et0ZSgWdr3yQkPg',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: '-E_2N3DJfNpMbBoUkOpBc-7LSq_8ORJnxPma-NpjXQI',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'IfU_SqV19nY8EW2zAKj5ym9IfBJQFNfqduJhSgSgXDU',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'jOBvunuWuLylB9WADO-5s0TgJ9-mmUrLEG4beK4605I',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'm2n8sVAk3CGB1XE-ON2NROz85TZiLmd2uZh7vvVxJjU',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: '5yWHTAblU1mRJCdfN32nqAdwwYlI4bqhtKL_BbQLdN8',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'gkKNXFkTWAN-z77ITGWFreN_oPyrc6mrA-zskTey-D4',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'kmx46ghEsxJ5Cne_Y0tqNJFvkr48GP_CFKyGT-DszUk',
		},
		{
			cu: 'cu79.ao-testnet.xyz',
			id: 'tZM6DBbZYTJbp1EqbGWM-1r5Rs0Cz2RDN47mTpMb_rE',
		},
	],
	'cu-80-zone': [
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'GVPt0vqoG5VXd0tlgSK6Ovlv9ogDEvyQ_etSgArZmys',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'ZoWqrdCTHJtO8_m6__xiFGzHsrqSxfGRamjdRHKfOyY',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'uDHZifR44RPjPSDR_zwh2S27b-j8PjdiLnycfzEWYdw',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'vUP3wzSDGfkzEXOduokKDSCCE9r8J0nxuCpJtB2oRJM',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: '6AD_nK6KBAXgVYdheOdoe7NXBvOrW5g-Ma8olIDXkUU',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'Y4sU8cGKv3fw4d5AksncLgIFyVm4WLcR3FZWtvzpdBI',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: '_K8HDsmBtezpAxg_6GcJadTj7BA7OQt7eaynfnZXHMg',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'Od3wfb9N8S38Bq7y33T9MDHgTrB1CSZ3rHOg9IsDKOU',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: '8Uz5ckjP_8d2foiUK-Bwl14Nt-eHlDKXE08-_tpA8uk',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'IvhELtP6qCUmYtxrrmgjiisMgySaaRxhEaf6yit7zHQ',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'MaQUQAlMtgb3Wq6JfKB3PSZXcMWpd1XHVfvvxyMpqG0',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'tu9B6rRZICFz8xJqKG75ImJMuHe-iZoPUOZUz2pQR3M',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: '4IyrOTseX2RJ8z05rrBX5Vt5If6us6ssI6Rv4H3sqU0',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'eIexmm4bucqbc0kHhkn29gP7FNJ37LoRQoaXmOETuwM',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'IA0tSonwC2s_thXoN5buCYJSR4I_qGftc8LfHf7o6v8',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: '6p1XzXvgUE59IRFKvmhGbBAU0ZNnT9RnDxnr8Klg4sM',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'KXmt8STwbQ4N7CPdcYmMuP62sNF-ooe0Giv7OcO62sc',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'nnQdwuvYVxT5W4jMOdbdg80HZYnXULdHChSnEFEps0Q',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'yax3EQvQA50AcbvXYrwLPiZHtWWJauTTHnrwH44n0jQ',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: '2kMYZUGB8DCaH1RR-pMabs5ee_mpveo2tMUanU4m8lc',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'SQJIa2TBlO8_is31m-NrlXhn6ylgYdLIUTBnZ76Rviw',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'eq1NDKNMz47eYeo_aQRHEHNC4jsOGZtlqJ9aYzlLfJc',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'pZC00P_U5A19mjcN5yGDYe6WJ8X_FjCEd4PDcsJQflk',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'sLvjfCa0mXT7mhdYFTXbrxntaqXi2RAon7LsAibqhDE',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'Tl7MmijkE5sNoN2gU9waZ-Y_415PgFwDxVczJENddZQ',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'APE4EuUbQ5CuevtCvXhBD176sFkUSYgxuTv_xgrFuDs',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'G4DOsdktupZcP0co5SxgbLrfpVgLcpRqAnLcbW--By4',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'TXwSfjlN_3sTZT6fCtA8WNnyQMs1yAEl01J0UUT38yY',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'VxbmiEQEe3Yr_6zPOUnvesX-U_USsBub_jVPNkoGvj4',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'e5FTvNPQROBRV48CcI-XeBtT1kKxmJFbh7AZq4x15uc',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'oxeOvcRIu_Oe93_m9oJUgL9oCYswlWHT4jXC6bSQaL8',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: '_fMUUDgzndcpvKWzqPly8LI-2tpCimJz5dUvsjGdzPc',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: '4_cvEwo0ULz9ohqoYLBVTyz2wtQbQfz_K9lyk3bAoJw',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'rQX9RI4cKKNdbCRhkVmORyVs5gvaXm4z1DebdeoB5J8',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'vUf4blO6KkL9gUAjbLFawQVVYeAY8iDnAJsQtm8T48M',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'DswplD4O2p3PIZ98ZZ_wEjogbWLg0Y4x38o1hTahQtY',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'dNewMTrB8xqb8mO6ZA3hnyxokMtVpiDekJYmjLFqG7w',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'p7ZryIS72gmfO_iiNCWSp_0mcyeWhuKmv48JT1TNB5s',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: '3928z_P3__a6DeyXTz-fRNDxWPJxtLXWpyJkeSGUn54',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'xenJWtx3Fn68Q8XP8hHQZm3CagTLoSPmolEIgQkVDAM',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'LEwdhX2fMH6WSUzN6kxCl_RoWoXPoVJkQ7TQ7vVuosQ',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'ZUohGOPLFBGDziKD6nyANIvHf-7sb1RWqn4PgY8cf80',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'XlZCNIgJsGZisUaO87fpu6gjaAEJGtYUgQZZjXlMqMw',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'M1EydCTg8EXOWQwgc_V6V9ir7u4vpwkIeeoThfPNSlA',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: '4AgsvUAates5yhuutZyM5HPZ_boBpjzh41BVYdnv-Js',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: '4jUdep07-ytrgqnEbgGRD55n2kavjddSrvh9VtfhZVU',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'pCKjvwPCWtI7yMyNMPQVLMCZ5vXZYOHdCnRoxUMTNoE',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'A89L55N-lS8cckK9o4y3tZpbTJH_n0gVsxshYLeh6bk',
		},
		{
			cu: 'cu80.ao-testnet.xyz',
			id: 'LEY7ab4YL4LRKpz8ne3py4VU0TFxLmbX9A10GcY7o30',
		},
	],
	'cu-81-zone': [
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'p-hqG_743EfQgFannAd30E70lKMP4gGCO5LdCEDfbsk',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'yiOIwOfoNw2te61GG7TjLEa651q1mGGjH6-0YwaqtmU',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'GWZCTngfx1ZayufnI1SaOuffKAQxxIkKSxNaz-7EY_8',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: '-3zicC7nStnCY9L20BGgcPoLhBBEMabiPIWMEs-an1o',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: '54PiE48Nek5frw4-h-FlhM0tiuaqoTJ6G1KwA0m1c1c',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: '6yKVsT8FIRWqcqcO8p-A1h3tr3FadgPUMaPWOEfZ-UQ',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'Xx9BLkqjZYVqx8bbM2pNWY7NJPD9EY9pZnM2YUy2fj8',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'KQ6SgWy87Jugo5RNBFr49P8ovZX53veXVaKL7MunNwI',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'RF-jry048Q8k0c9NS9zvy4Uz8qeQQMbNDwOF9ADZxXI',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'YxtX6rg6NhOFxEmctEeuudzrTcqot3k4spV8JqflLA4',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'sOX18z5YQUbCcCeJbGNM7psJ4BPV-X3jqNmk2YevGv0',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'myeXkDvxuMcD1ElN8tzk0_velTx-gCTozPCOQmfy8JI',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'XSxBBD08sh37sz-N67mVU9Q7IHSNYDp2wfMWw4ES4Lg',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'ac10zWrlUAxHBeXEPdql1MKA0ou1FKOAFMfw18M5Qss',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'PHtuGwvQc2EW8YQ7THJwORv1bc7EJ1txeAS_ZDFrUJY',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'U7r6cXBrmtjYYUHkIDOERsqTnEjb8_3Y8xVEZv6Yw28',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'XMcV8sqkWNU461FNFHinxfAUY5386_YezUXnbqNGWqI',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: '412tTX1F1jmYPcWZr9v-PmMjjq4RRfnb1XP6B9Ispjc',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'gByaM-tMOSEe05gEb17tjVPsytLmebVZteN0GdpfZGw',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'Ieem4MlFeqA5N_E9rf0lx5S45DmZtpM8Tg3DJ0qrTqo',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'ExOLGEBZwK8WJKDf5vBee0biKHt8ARN510FZsollwEE',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'y_h-dUkGR3y6K3fUUm1WW1ZV1CZjmFXPv0bNrUqq8zg',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'fd2eNEKpr7GmDBp2KMXGnNlwDYjEuyikWuOoI4ot73E',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'HHnep28ODIhfMlnxjX-WVckjx4LlubAzjqikhxcjnvc',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'PurWxATV2dnRjMTwwHdDCkMcgl0AtrPoO-u_YOslhzM',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'Bl3CaqRCvCpC9cFXDTKgeP1kRA9LSm3cMUQpVkAZRBQ',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'SkvM2qviOxkLIdFoBJRdGIUf_XJX298_orhdvhyvJF8',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'JsnQfqPYK5l9eoYveWiCH8x3NIT3J2ZZup0fmaJG-ao',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'HZ2jIgbL74hic1aM9WKk7r0myFWdtXlH6Is5ckr-_sI',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'nVzQpF62V02fimyWw-ZxEbUVgPrS5IXXmzNL1JTxpEM',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: '_4hZFn3cMD0q2BZvse9GkcSDQHQrZSawN3S9M9dP_TI',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'PQhYNphfG9MtQmnYwV_ajHRY7jEe7piRug6eijJVtSE',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'iEeo0PigRXio3Q9joAvSJE5sEYUlQhou6_7dxXX2-FU',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'tldh-kFF1pm7OEP17s2fF9R1--qOxyMRzmxzcV09wj0',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'h1bmVDwq2u4TfL15qa_FiHCqMevxClW7UkVMmO-sT3Q',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'DWeBFKanU4bgMPmd8am68wQdTlYibZGaeb4Z8Md-sRk',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'L0HjupJxleYwapII2aPEQ_2pUdVt5nwQs_P8O-0wVOA',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'pW0ubNKwcqdxvEnvjQtBV6EaWd5QObeqUsBIsUlblTA',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'yzB2ewLRvSt1nsCHu9Dw8I5QvmDK-rBPphDDCLZjfF4',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'kkmbsija823xUePemnajhehD-jS7e49zm2iv9MHjVvs',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: '-_FLel97hVERdSOyfVX1AbHdzgZKhM-FPKKidjieml0',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'C5AhuxuySerrVMctQJOQPa_xEZJUwaKHXKJYk7ne-7Y',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'ZeXfsth9Mm8r_uFmpmkOxmlEuffZSQ-MBENkUvk44pQ',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 't-nrtFvIflTLYtF5m4l0-jdmLhInhpH7EmSaX9kCXT0',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'KSSZsrnIHXeuUZ1Dho4DTfT4lGwyJJ_T0jCMNB3mMGo',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: '5nqv9pgipTrm2MpRD6gQvM4AzmsSGXmwDSj_IznLWDM',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'v4ysUwuwtmGS7RvIn64j-Yxr7UAB4Gfbdy-RptZXnZc',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: '2i2S6NaN8DIsXVTJ88xhdbA7ywGkocoRpOO5yhryWN8',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'E3ML2qmRtjooqD40SgCOpoO_uOKfdMEEGj4974cws-Y',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'q48Sfd-i72tAEyiJa7swJY1UU-fGPZqZnrV7SzU9TkQ',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: '_5h0zyZKxM-cVoCnWZSmkK66qOJmygdMhz3FiL5XLhM',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'DyXxJMAnY-_0EpmpWm8AUCqqGigLhffshDuHIXBx748',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'i4j1ulr78-tgLB4AkHTlnetWIgMPuRtoLLmSwa19gt0',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'Z4PyVHiRi1-lkatNCcZLTQZ2j3NSqemMfME3UyzQHtE',
		},
		{
			cu: 'cu81.ao-testnet.xyz',
			id: 'iIS0wcZt7OHBf8l97fGyQLV99Sr6NKmwUiu15H7_Y0c',
		},
	],
	'cu-82-zone': [
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 't9ZrPXrahkITvI0dEEJm_tfH5eAnkHeks9l0k1-VwhU',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '_OzMNWRDP6xIBCyd84opP_z8yo9N-rv9oOtJOSB6ZWc',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'uTgqvpmWriZf5VvaGWUn-OfWNSxetVJSVLusO8SOAVc',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'AoEt6DempSkzjbR5E2W_TrbD2qWU746HNEtRhUztFpI',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'GzDLhRGpg0FfU6ou5wJNez_a72FkiHDsFbqoKbGQ3Wo',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'DKF8oXtPvh3q8s0fJFIeHFyHNM6oKrwMCUrPxEMroak',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'cuxSKjGJ-WDB9PzSkVkVVrIBSh3DrYHYz44usQOj5yE',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'MbPUgzNedYmEw0JBAGAOsZ7ZjqeausCz7i7R6WYC7DE',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'LneuOxjmOpTHZyxWlSIWttL8QX_7FNgkjK5Ybs4E2TA',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '2DAo_5uY_AKJ1CoKGYgo8L_Wx8kAFBZcfbUo83hdEg8',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '6IsOAJI_3xXtg54uu4OO4NowyFq5vYt0yeR0CjFaRbw',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'u207vp4evZMlEoEZySD-tAB-VBGaMZ2NC_G8aFyoiW4',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'G50V2lCG2rnzwM0xSQxhuE5o7KT5DBLOLNIMC98YLe0',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'vOjzxZkLYsSpG953y9QsWrkX7wI5f2LcZVFjhl1tI3U',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '9w7QkhE_xbrMHrFvbDPzf1tDBj2hD6NRhiLJLFvlZPQ',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'usmUYbaE5-BUUmqIogjRUb0GEu56etV-yBVzC7f3kYI',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'M8LFUvWYj61EsH2zwrrW8awpK_j77hUZO8SL_nf8FXs',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'OAkbFfR5JrNGkiXdDhdDWqn-3VqufoVh0IJGBawsUQ8',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '3wGAfN8l852iuIt6Kc8kjR6G5opcTa92jKP1aAv2iWY',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'QW_DuUsoveC7OyRrFwRHczfOOcWbI2lDrnLs9QJ6vBI',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'Z998eh0h9wIDveGg8egQkdfhz0ISmBd4bOGjQ-T9Ga0',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '_ncbF_FKnMvLpf0upSvH1qOrMLrf_oXjRuV1cDoHZ8o',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'WAHiVhe-DjDtGLbsNagIHS4HOL07ky1OGs19mz_G9LY',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'pGpdfjH4XkjS_GPuFSPlkEJ3buIWWlI8q4-BqG7GiAo',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'hgM-WpvUBRJ0rhBU6PdzhnKiWffbVZ63rWN8dX_lKl8',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'PwLxU1JG4lYp9zV9esDwCzYM48WRc22R0AjaGI4KDus',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '6FdivQ_UQu9Kmgcg3NDsrF0Y1LL1JkGyt9kpdjvnEgQ',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'oUgeVr5m58Y_M4FAGiosXSqrSaWSxeYqgD3JuDRKkmI',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'STYnjt8j8OFQaQpd15YowtEJn0meTymqI7jr9PjBeqI',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'iChz6sXV_VG_bHE-NO6Lde3RxFjZ1iAokan3QkIR_yY',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'pazXumQI-HPH7iFGfTC-4_7biSnqz_U67oFAGry5zUY',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'K-AqlBCiaiDjVg646IVf5QCDfDdqcFdOMNlbBy3veWs',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'nLyrAq5V6CIfdHqeAXwvNMXc7zP2jzCclnUueknHJvU',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '_yxeuUBSsoEp-xYJdSDWifw1rLQU0XiBVVrJs1i1BGM',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '04a0_kuphRfY1A9sOZtCTQJNmBDoLUHU7XEa7pY6vJs',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'GOqRLriFrSHn-8URNu4z8RrBSFxeNuQcUq4W9uyUGR8',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '8uKqIh2CFYXg3h3qWgJNjMNoSCnQYuXlDqu-B0kO5wQ',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'WtpEQa-KF129pX8wlgtIOuTURjg1JnZN2IYnqPSIydY',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'WXhSHbqlPz8K_0ox4aTcFhZhI2K6Erf-MU9eurLGohg',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'jb_oTQFqixcVOSo31Qs9NX3E0gFRtS6D9NEdwwu5lkE',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'oleW7RUNt50-7BjU9AN8zhxtLsSpxbWFLrqD2YNh5Hc',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'qA_jeXbQgiQb-lbkZ1cWkjHkI4MYz0zl6NddptFf5iw',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'TyzWNn081lPN_oJ9_LPGjMyp038vqRsxh3nE_IO-Svw',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '9RG4WZqD2cBfwdFotur2cdRs53QTH2TSnttVlQZSCEs',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'WQs8Gz2jZnErkijDWjdGpo3wgYLdQxvOfLF5I7m5pCI',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'g6nleBQliYeX6sMyxclNv-9h5I_3E3vV0qMuTT-YI6o',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'PbBHCLACTjyPBkgj-4B7k-0Gvo_20ReC9-0P3Fki_xI',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'hJRKSQVRMrKf8clCnjRfLcJyQyJa7Qw4-daPdr3ehRg',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'mY-e8mK7G4UqKtnEgYUqz4JXkaE_5iD39YME2t-k1Eg',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'OtzVXp169nfhylWJPgB4M6hFNx0IR4c31oYnxlUXWK4',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'vbW-miSskPXAZ_CsKSr7QG192SQWqYLHZNDIgilwh7w',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '0-NBBgF51FpwcS_aw4ZMJ1wB7nwBCKk7lLyiGS6UhJY',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: '8gh3-sJWcxs23Y215gyvU4jxU3ajwEfN5IuQots0mxw',
		},
		{
			cu: 'cu82.ao-testnet.xyz',
			id: 'dNmk7_vhghAG06yFnRjm0IrFKPQFhqlF0pU7Bk3RmkM',
		},
	],
	'cu-83-zone': [
		{
			cu: 'cu83.ao-testnet.xyz',
			id: '0lGg8tYcS6d_Iz9HVAXnc13psJY4inWsMWoGmNw1bZI',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'HOoiRgfjJ65gPc1RMFQ2D93B9yztQEdZbbuRuHs8GZc',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'hwcwZ4lHeBN-GGJTUr87MBr2boWOvc43fwVy8edFcz4',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'Er70nWgpRcJevdWVHfnfY9cmfuuhUyvjUwHQr6RlH4g',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'fNJCfCWwiTJ70BE-rI2SFb-Y9ScJ4cUaj1IMURAPl2U',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'GwDZn0NJ56JDVfYALgW7Vc5jpK4DTUCQzhBG4zs5c1I',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'kE7wsYWnlnV8YH5CKnxjc42ko4I5cxdU2n8bFU4d6Gk',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'R8HVu535yefkyt1cJqG6XUq9Ff8IrGQZn2aRHbNmSOE',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'S2c3v9SqM1oWU4YKGn38fhAK6FerExNLruQs7KN9a4E',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'AkhoHukOmFn2btJ5rliqNnLgUGnWcG3GfiCuxp2VyQI',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'OcPhK2xKyAskxENLuvvKrjnDhfy-w5B17HOlqlHr0i8',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'TSOmDDiwFQlzpBgBcucvM0PBKztTCO6aRkGG8cREz4c',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: '9JM5hp2yLeJrHRFw9lS2TTfeFKOCrkfuLYVV1MOARE8',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'i6cr9sKRIw0ezK2lq4mNHhoPhlXKv19vVSf5L0-Ov_I',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'ZuE0jOnj7OxiYbhou72zmfmhKb5tIZNnJnl6D0V6zrE',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'PZfdpU1LDvqRzsk10hqOwfsAToa6kc0_2z0_QxCkyOQ',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'vTNSo7RlD6JAktRxWPQCzkS1CQ1unZMH7z-EyNQieXo',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'D7IPJZ8E1k6EF8MtAA_WoO6n3gg_8D70GjjJ3752gEM',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'gehWj1uHFKhnI-ElREyc69A8ng3ZUzBLO4D3Bb_iET4',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'Hb6jrovE-ARFMRqjqAgkY2yh9Gpdev4Rp7NTSmq1cV0',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'L2wj_nR3xe0XeZC8kKet_F-Z41dMmS6-kPuuRQw897E',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'iTze9aGPV_zqQzdP9No9kPJcEROIrl0c00ZM_BceFSg',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: '5JZZnEe7c402qSTS93OYz75Ef_Tfk0-FNJ7TYQf4CKE',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'dAlBCgBE0BeqWTw5mHVLVEWdspFv0Pdl2Mc83ppEqJI',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'ZeDS3L7RUTIHv5D4VTCyiZrh1eFZWm3O0fl7gNT-qKc',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'd866yO4qYb0oFqkpWycDT6njS-se5dK7qs6Fu-xVW20',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'gzNSjyJNu-OdsW24iO-3_h3K0SSnDJBXY2jf3qIT44Y',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'gXqB4XhN1fRqFX6s40MSbVQEapYZgJgtaf8MNIFketI',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: '5lRsrA6pVc8jVw2fU-apIS0EyWEkLhKUdbxhJGIMDMY',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'dojW8QT06YPtecu8h_GBaXMGGX9EF8LU1BDYdnRNtO4',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'Wp9aZN7UpvxhneTq2CWNZXq2pU_bZ0WX8q-xgonVVsQ',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'uq8VdFUYLZvCQGLLkutR2z4AFeQubmQJYcBOAJ3kKqY',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'an39MN1qCZwWtSZlH2xrmVh1BFgG8LkfRyD1Rp5q9kU',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'ewfoOPGNwXwmhGhGMBe_SAhRJDLpBZgm450_LeYEb6E',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: '7-vOQGiPC8QFcFIdpGp9ngzvWXPJ_M5avT0HlSRAYLs',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'FUhpgX5uJQ7W5Hlrj4zyp6FPaf_lmpa8Jg08K6JvBnk',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'RtjC42CN_-_gL-JfBKhgdSOCRvpWUOl-a6s1D9ojS2E',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'Q_LrVbFlpYKD0A4upQk30Z9A3NKQPA7mY7-Sz1bkAe0',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'aErSMxDHPck_-kVgKMw4pDXTRy5nw9KpLlLdgkOF99Y',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'BkoJE2CW1-j8kHPO8_9w8fHy1qvNS1tuGfdo0JowHJA',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'diPVB57GFM21POI1tqMiMeQCDBNwoWcom_lPBI8hneE',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'iLTiV0jjvFWcxABQUV1EEeyB9ts9GwPSJUeV0Y3Zm1s',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'DzRJsqwxk2iewl-iOqz9OEjPuzafWE9Vr5vdkDSj0lU',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'XTpJQyUGHJn1txC7pdI0pPwD43iZSyNl-_DN8HMS7lA',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'GXRBdxm57iuG-UIaONvm5qvIk_yLhUXqRoc-mcIwdKc',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'ZaDc3bXMfy6lhJDUHIUUcGzXPnQMn2-xdDyltb_QzUs',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: '33O_Nb50U4mEjdXP90tJ3cUAAI_0MM7h_bDL0EPmGa8',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: '_g3kxQxL7F4Y9vXvHaR_cEa7oPkcjFpyuuHLMcHKSds',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'DvNmSRwG_lRMXppUbi-7Q_7cMmPd20BDHpZEQgSRHMs',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'dopxr3KWF1ij9LMYhEtMDetI0ce_Z69szx9_OcKN1Xk',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'UpoISira6KgVrBRJljY0gOSnP-XPTubyhZnUeltOLY0',
		},
		{
			cu: 'cu83.ao-testnet.xyz',
			id: 'BaU3USStmHv9ky8yRRO4QTD8ywjXI95SAnK8A5IMWoE',
		},
	],
	'cu-84-zone': [
		{
			cu: 'cu84.ao-testnet.xyz',
			id: '_pGJNPPQkRfFitmZNiBU1kL0iH29sH2VfzR_ABG_hMg',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: '-XMwzOumO8pzr6W20Zj7wkTVavNv81mwQwCMAredZho',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'qwHpItIT4rTJ-PBvllB0haN7fvLdxJqaH93LHAkyxtw',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'RZrD7mS8Ih7ExGUmTeUkD57NX1XcKZNQ19r0gSnq_08',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'NYGM5NIrdGdq_h7ySkSt-efftYsO27ZRlO4JMRppYHQ',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'WpFtXQt96tlocFPIcWNzYXzX9uK4H4Turi_KIp7Oy5w',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'E0pAE20mr9gz3C7VmJFZ6pgAuQpLbJ056AU0J3gjgyQ',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'MUdLtQpTMYm0kElx5q8pfCKeXzIeyOvs20JlCP8yFEA',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'aBxyXgVIthFWCGv0tTJOucRCRCdzwO0FE-mApnl4B-c',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'QcSsRovv_yjJ8zuNn7xfxqJbZyv0UAcQIYZOdFktrWo',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'Nn3wPBPJXqmqHlzi41v4Yu9PVJYVXx-ENQKHsMqRreE',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'avYFbvSj-nkAIfJyg3j1oiwiWxN_NhhhQiCR3fEKx4o',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'CRgsPdYsFgUMnaDXHPfMpZY2n8faQraNqH0bj52qrLQ',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'KSfqj8Q__lJa4jMJ7ByAWwl56QGMVRQ3vqMkQg2fgZU',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'laWUMYeRbw74apluuix6JiApABzo1tDDpLWHo646aw8',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'kMRRe8qIeEEbe8gSIUsZT9702gG3rEZLYQIGoAfq7-c',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'jNkkCs9L0n-8lJ7dWO_iN2CUwfCsykQBKLtFsr2e_Vk',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'cBQjglzhjPYoUynnz4DUVvUoKG5TznlqfNdXMBUC-Xc',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'V2NuP3WPA3Qz0iCalQsA8vLb_V87-N--tztqzW-8kfc',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'B2MRvq-lkMpLPevmrMMNt761aJA8NuaogL2sfTCqZbc',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: '2QRvUL5quQNItTBqmJ0GjZq2mZBeuwPDwKHz4y8hNbE',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'DobMg7z4IpAWUYdS7IttM5YvfiYhKS8hGWb1clgQ2r0',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'gZFOfnmytT_VgU-Dylrs_0ykuQvAP6oy0hw-vPSoKNY',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'r-894gByq4Tolmiw3xH2no5KN0Aj4m2sCk17aUu5De0',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: '-1SsZo3oIvpfv8HA8kjnP7pOwbB0cTaLOGbO4a9Uvo4',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'alI-Dcj5J7lcQlFbrn0ChV_Aw10nScgDbSe7Ikt_SdM',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'C1OjjUv18AwXf6ke4Q3wtk2eyUkBdgI3TXZCdCsbeeM',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'YEz1re3xInWdkh8OYBwIyKpfdbvSFEe1k3-pop5bmpE',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'dtfFqoCHciHL4VtVnosUfz8bszKJjJc1ZsR1ddvgWi4',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'y_IAl-3E-TlRmTbCVYEO2FadNjZHs1-FKk0zyD_3ebU',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: '5ZLj73tT72RIAD4BCrNLc5l6nEUfkzHETjbnVu19XGc',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: '6k6IIMKjFwhh_9NumAQXUlk1XkJvTujATDPoZtL6KwY',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'xN01SZUrbZ4KyWy2c2xejJxmgN4wNXpYWgWQo0P3BjY',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: '_fm6xKzVHyPni-BHmIrs8K94rSKxGVPD3VEhoRDbVIw',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'mWzBRvswdBEzauqwKut88Fpw2CLnb-K0E1dHisszLvs',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'AcPd2xjqSPA0_SlY-1c2MAwaxQ3BkvCTp1JOXff1PWk',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'DBYCZFL7UPk6q2UTycSQnOSa01iajNjqD1pGDzbZdyA',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'Dh6hw7SvU7C7qWjsChIjB7x89YJrmzmA1FyPRWq2apc',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'MogCNzWmcQzjRwKCvhat2rlq9HeOA7JqQM_L8wf4xcQ',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'UQIZF7waaXuHXBfIaoSjs2nP0GTxQmyABk7cvlcJR58',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'z6QGY-Kfo9brIxkZZ1x3A5bT-yEWc0uPFPcknDSc0JQ',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'Ky8sV4_Qae3fSLzFcJsg6ND8Keuu8tdsj6qYUYywfQs',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'HnYfo3YqC2nVjspTMFFhpmAiK7lG2-YlJtD1TsU4JYI',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'd7rD_KozquZU8T5nDoBngFpnW2Qk6WeNTAaTER8RX6c',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'EDN-ac1JnRsR6J8gvSMLUSA-uVOmeLOL4mkwL5ifciw',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'GMBvIoLy44aUK42pik0rhp1PDKkGXK9s0wIc9zZzdrA',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'e377X4Tod566k-2rA5W5JkY9NJls_5QWsDWoIUqgU6o',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'Ex-N1rdjk3hYRKVSO1rd78YQlJWEEuXddXn3LQPsSzs',
		},
		{
			cu: 'cu84.ao-testnet.xyz',
			id: 'jXsU9nc7TKiYB8EnOMpKo_5oWVoOqPiuWJoggXTMODo',
		},
	],
	'cu-85-zone': [
		{
			cu: 'cu85.ao-testnet.xyz',
			id: '8Iy-2-5vkh-PaO3rpHGuZ5hOxNw3zHXBZW8RkaXlK2I',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'LPc7FrSDOTH42b7zH1Ohflz_7EfUUSG79FAkHr2fA64',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'nxaeb0mzCj4AgZ14-Qlrabs4iHVUFuoCfO9BNafRY0M',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'UJIqg1SYaOOcBrcMxL2NTyG7VdlekxanB6WdBm8_lzc',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: '_cmNF4cmaw3bI8xpisC0LN1SM8cLELPVqDm1wqY6PHs',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'njIpWXJM0D9qJAP8PdDw5CgHKedj6QXc0ij4hv8wElw',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'lyj7qd0rM0RGhMlFh8gY-D72UJqlPtxsJwPXBljfpLc',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: '43IG0fK96ELXzaKLFK5MCb44-hbUdyPd34T4FnCJ6lg',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: '6IjjZMdxA-WuIeeFi0G8Xb3ieRXyTGDDbauSebLuEn8',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'Kw-sAN2M8wNs1kdgPn-J1MPIBrtfJPOe6PJE3Ne2YEA',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'fvm8zzhY4E6PagMOhlnXfJtpq27U20_SQaNh1NpprnQ',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'b6l_cUuL6QW8BYgScWxvM0BzZGTAd85B9OujG00jz-E',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'LbUrPfNVHu-_829awMurk4kYw_9SA1ve6kgKikawxWg',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'B0FNdhEXSnOBDL8ppo6AE6bnv5LNg1zqjzWb_uWIN90',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'PXdgAihMkMVQVQBzTYcGrjCrN2sTn6jPwVfat1m-0Gw',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'IfZbu916XBQoBazm-XBfsItFk_zyjPwjKdwiQLFU2ws',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'YMPMID5CzMBPl5B4dg3t1csJ8XzX6VWCvJY16yOKi9M',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'A-HYKViZH8nCGXvlvK-T9gFszXHKCtqX11xvw45xiKs',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'O9hfzMNnynLd4JqAgRUnpZxdoyXN4ozmgLFvZ2TOQ88',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'Tah2FyTZAwtgiGXoolJcPm4JBeLk7phmeZk1MgyNndU',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'koLMAXvWhp-H-ddBbTHBCfVpOhHio-9lzGhy1Jo-llE',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'Xw7B777-ntAHMyEE0ZpcGjR4XEFkElqZXLYjyxsESBU',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 's0pAz5MM52Rs5PJujaOTafQQ8MVkRrKICBrHPx_i3Is',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'TY0o6gRi-GpP3iZpntqZt1iJUEz-bwivO8TRBPya6hw',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'NnyLdV50YMJrk7-9ycznLqijZlrHNPQ6gQhhEsr7v0I',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'TQ622P_b8MBq1b6ajyCYdKonRXe0_uy4NQ9KcJUSsB0',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'VnsC4kjAKUwTSbUFaJKy6Uy_uQhpzuM-ktqJOCVsdGs',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: '9Yw1utKg3wwWcEzFT2R8DnHRoQrXcx5rkmeBurbFVLg',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'FWOKiGDNQ8MarEWv_uwlMrToL4i6xQRbfL5O5bpT4zk',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'ejb5kCbfg8iHg7ljvEPvQ5s7NVL73COUUjLBtGOo1ks',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'UUVd0htdmCqt18fBLarq49ZOp_djnZE6_IMJThpne_4',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'KuewL1ynqmapK-GtUZ5tg9L7-JyA6rqr4HAz-W2qMVs',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: '0LSwR4HAr0CF4p01A26PSSSY_nef1an9nMetuddcEH8',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'Kxgz4SD7yRBEMU2RaD3zmeZrsdM0_S3LdFL6sOhE9dI',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: '0cHFuLcj-OQm2Kcp71Het3F_emOzLQ38Ihfmtf8IdVg',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: '94RyL-YhB2T1E-jXRO1j1SG46B3YXLVT4ZKrcXAraVo',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'V7GSqUv6VLpgCDsddiuobe24iVY9XRY6msf3KWMye-A',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'JeN6JsVR1nCh4sE7kH2SQZxPlAPZbIw-SDr_hZNXzO4',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 's-tC1AQ9zpdFI6IYhOeEAg0-FuYVkSTiKsg2-AmqLuM',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'DA1eq7UqhZQ3GQ771-nBi6Ta_ZE9pzVl7mcP0ORNaYI',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: '2-Dfl2Zni09PL-YZflgRHFcHL-k7_WZxgXuILWAbp4Q',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'X0qWBUUM7c66PqtyikdvvjFoqJsgUQt9639vouwHV7Y',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'NK6UNwHMLuRZ0WeVDM0IlD1wfaoOoCtEzNom8A0wkyk',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'uEQtmWmLbpxj1QSPu-Bl5aE8GlIDsRN50Jx32ZPYJYE',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'kCHI8LYxZf1NsmRoHCKHsf6PD4sMAvfPsMSkLta54Rw',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'Xx9Z0Gt-q0xZ8C8PGb1jyshXbRae2gPJQmDZf48fIIc',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'lYt0yZfTXBGR70AvVGVQOYCt-ezcQh6ooTGMWDLc57g',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'M9HwhREfhB0nxTIv_lUBvW8IiRJIaSLlTOSM66Eg8j4',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'UyhanTkx1iJ8yoz9GX5boAluMIrNGEPrQxAJgox1bb8',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: 'UDxt9jnAUYIZEqnvko7WJ8Go90BJvSUfz-DirCjNczo',
		},
		{
			cu: 'cu85.ao-testnet.xyz',
			id: '6ScJ2mqKsCOWBcDPRA674dR1KAY4Fo3YayZ6OJsOcUA',
		},
	],
	'cu-86-zone': [
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'CdP6ePc8PIoCvHSjtE876Aw-ikLEVc1VmpXeW_VMX3E',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'oZXPQ3SSh2W436wafRjWkfWDDODYeb56bWPxzL4FwcQ',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'JIgF5H9ZnLF8f6NHVv18I-Hk9zpK1nXUAWuiqo9C_4k',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'Y6O3kyLmM6ZTKTitvqcm3yiGHQcFxJFwFVFNRlw8MJE',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'gL6KRBDAfyngKu1AymrmlaDJ4uJ_zQlCh9BJrAxuqms',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'c9zadszRMzTEYOqHBhNo4-Ty8-h6edK1xhokcE1tkR0',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'OspK9u4UmpwhHKtFJP_9JCB8RnalY0DNjOiZyr9DJis',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'wO8Lk7vJ_XxsHXoszKOCJdVHHlku2fwkXLq0thpeNmA',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'CW9VcVoz3DFKPCAVjxAX31h1jt35Z1Sh8AfTKGp7gjE',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'NcDWBI_SmMhc48Hiv4Z5bWLTiWrhwEd-DSQxSYsccdY',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'oyGeUUYDrq3VV-PeCFeGjJlTxMWE5BeOdrCqrd-i0dc',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'PccHizrIWArohwG5W4Cdt-KUNwSBv5rt7VMbyp9QfFo',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'OUKHsVcD5cUeF2fzBXhxswRi99Fz2ltwfJ2Wp4KrJGc',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'qfnrEwx9pdg7__vvevD43Jf_ArmTvOIxWymptZ567Rs',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'TMD6NXcysHjYyePzsatTyJnyaq38DDJ7gCIPbrWdXdo',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'A4Zugoe7k0zapwQDDd9u6SQSDvXLQohBqnyuyTT4MLs',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'gfvdRZw02iKFqA_FrrL19Q-5LONVHB1nlI2hOEY3H4Q',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '2EA4OcIoSRh58iYUsMLETtSbrTwtZpkMCjMbatRovCM',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'xv8UragCUM8nVCPRKCdjo17oO-D6OpSPKjCk31L0fyM',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '0sSSc8aToK3XnH_Zz2b3zD5LhjjdQMnnWQmEKW0rBhk',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'JJV9TzGbiAgNqIsYA6deIZHJ9nun78HpS-Dm7_B9ahA',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'XwcG1eqfjmkGtr3QA_LaMYje4g_5MaL804Efs4LNeqs',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'dGzDfbkrWFyjW4P7rkT4hFWLRyeH3U7bzAhzwnvRM8s',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'S8e4qxhvvJQ4v5f1AUw439Ps4Mbm_C6U3uuocAByzaU',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'T_8TrunkMvJEXD1vyZGzHoruNPAvxLKEftLGSl751lQ',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '6zsis_h0L3hSEzQlF6G3KH4eEORF9qWcS3f5vPNzDqg',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'IcmPIZgZ4-b6c80gL-_ANvfCDZ1LlGn2I0GM7Jt4eDc',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'Ux55NHY3gbfpO4V9VOonAvJa0ek1ftKp_rGck9D7824',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '8PwvLrTaQ2wOjQGSvy7d1GV3QXzvc5bWs_HN0QPdbDY',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'MLMtjEDmZDVgIhD3lZMXrRjGCbfVOSj1Ai_rFv5_2T0',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'QTNDLqkXcbxHo8dJkIBKpR0O9fwejvjiZv6TC0YQkM4',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'BbutTiHSkihHZNPxpTYmGa2S_EbMv3FfBKimFIOPvMM',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'uVibsGXRRntY-50oQbrNgtoDCHUEmVmXm0fYN80nvrM',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'ZEvjGSgEsFjDG4sImfI1xEyDKCyXA4ON0LZPVLJw7PI',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'hZVY50Yee7DTFsfsc_efsZTwKOWPvQ-iNp77ChMpjl0',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'dwtA_8jTmxXWgjMHinVT1s1lkmStah4RzII34d17mVo',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'G1yOen8_LAr8agb42mJeWheD_5GuLhu-mUPpAh98AS0',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'gfPE4IriLkMq93HaWPmkz2p2QmejnZ7OvOWNXz5YRj0',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '3WwKpSU6UV56vQ-rIJu4tIswCOpqxwfrzZj9BrWGiVw',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'zSCBXYDzfTTtNBHVs7AVr11_mQwGoRBRjZIsvBswcrQ',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '_z7PXe9CJvrM-e61QNZEsdjJrZL8l_3zmaufovvWmf0',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'BsJVCkHomcHeFS-RiREQps0oHHy5R7rk-U6n1mlxtz4',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '_DH91ucwukn4m2-X0-z8gqDrEvrCnWCIbxmunZmWg90',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'tgwfGZbnO0CRs-r87zQctHaiU95_OfJDb6B3jf4UuJQ',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '3PgI7S-MuaLyykQ4VgLMOXaS277Kp8MPeu8h6n5Kytw',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'YGsGxjZOYJNlgW299L2IQcE2vq5rDpKhJR76mIUlyrU',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'KXlxYPv7gSKPQp5SGsC2N5xfzaiJpgdcRmeBZNW7NSw',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '9h1FemtWQixG7KskSkiudKqr6SAUXUsbA-QnEZPfBVs',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '7rBtm0NiTIbIC7_es-EY7EksKwubrWWM3VtLlfv7gyU',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '6vjR_JxF5a6559mj5jJQajf_RASjHz2IZ_gQxUUBFT4',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'injF0tQzbCA-CfkViBHb_W4MqQQrmrsT9HXiL41Ay7w',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'HIsDKfeo6GCHUcl_J2IEB9T-pTF2LKk7XJ2sIDhHZ2Y',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'kl7ssY7vfyUu0uv7CGM6a__nj5WMHPckA4TrtQx7-s0',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'pPSJtnlTy7BTz22dIUeuaBY_Q1D6y6VQqhH490aeygQ',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'hB0Ri749wrnt4TYRPNbJ38kKDNzqZJI7r2EXQmmsaLA',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'k4yBWYf59aqm7Hv0hxw1bSq78vZrgqWETWhky_LJRdQ',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'gmImBGKs28NpbtQTEJgSBBsw9rsLb7freHRvvj4xTq0',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'oKOlh7Xg84sr7udIfobJk_ci4oX5vjbzjXp7kCJblSg',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'x35Zq5xyzmbJP9FFDwFEvXHsvAyicUxq5RkbXBEzJFA',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: '4Pm2E52pZtvaJ07oi3ysAi67SyYMFxVDiTxB8htg1bk',
		},
		{
			cu: 'cu86.ao-testnet.xyz',
			id: 'DujrJKLWK6iX5XMsV6D2I0XypqmXdJH7IWnW3Xqmv3A',
		},
	],
	'cu-87-zone': [
		{
			cu: 'cu87.ao-testnet.xyz',
			id: '2cKzeGkke5RLxgmgl_p0bjhkXxxWkrcSHWw4zZnYz00',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: '5uM8k0YZaSj24OaD8J-qfJreks75mSC0fHPRNXv5hgI',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'YgdZOMIORpxI5M4CsvnPBmWA0K--vYZevbIrO49rbZo',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'qQRHmZADt2o-Zqd2EIRnej4XMB_INlcUgAOY7iYPJ9A',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: '0dCgUWIjpHatvcZ-1tFjDtQGLRnRcwNZdWUaMWoImMs',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'nNR5KNuXoY1Ao_25yyCPcsmYdRlHL9uufwdaq4_GwFE',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'AAS4M8Z7vrjYXpYTiR--5u0PRb06ICzsCP9gtSjgiAA',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'lZJwcNlUc3QfFlw03mnRzMcQvg1lTRXRpyNvX1YVfr4',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'f4ROszjyVd48m6A3RP53SjxyE2Kw_gXW13wsvqRRTk8',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'xYiK7W_iUY3SuYOqhQeOhgHzVxxjpR2X4wTlcXb8YOA',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'slKBlD-DWM7sEZGZmWBhkZ6hFMR5iD08r14jcD6TwLk',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: '6TSUPIJ2ahtZfndCvfP7DMv0HyMkdQ6aSoMzPPOt8BY',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'm-tjakxSvqjhkeO5pl7KBdqxfKPhIvAViL-bhHe4H5A',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'OCoi_A7oE8niCKGj4a7l7y-VLBy0UIxUE7ZwckaZXtE',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'nSPV8UBzVScWwEyeVIZIavIME3_qk9ASt_dh6D5wgXw',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'MWfcHECrqWUYnSTbg7MmOY3VKiA3kDIkfGcCDyUlGqs',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: '-0rUeOO_SiPcu4UlBNDqUzbwhB4rl3aBgr0NB8QPfdg',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'eKMAlK4wXUQq_8hr4X-VxIMOdM7X01wNrIGQXmEr8yk',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'uZ1VNfWpdF-g0ZNlLL9dDU_MB8qonHiSZG_MtSSBcw8',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'SHMdjAVlqxDP1yMetMtRy9KiMrjAC4Q4WfaUmnOlA_I',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'dHEVtciAX6BE_z8RDLmjFOZhW_kYwuprvnmTxw9rGf4',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'rCG8WvvEteStCnZxZwdc0xejbsdCOkhdqgkHHWNqFLM',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: '0iC3kgoBXt7hXiCHNAArzocmc9bV8Axro5eWQ4aRfaw',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'lu__BJYNzbbI-85CKVbbUNH6l5yGCol5F9IXrtHtjtg',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: '9NjBJbcC-ZeN6uOpII48PPsvgqBzklM5GvCZkmjKx8M',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'Ie9vUiK8il_A5stKtWRm30PalGI-AW4VAwN2um-rzUI',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'hC0pGhtrhhijw3B6zqK4N53KybVKOYu2CG_IDQLcgIA',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'F1EZaRcuadoQwavJcrjftXfTRY_bxRdSlhY9KdcP9b0',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'I87qhpDLrwS5mv_02jbMjGTzcfQwuSVSnR40GUGsAvo',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'w8OymJNfRChT7hajWFhqsnrJ8olVZB0GDpnGaPqSd40',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'WQpOJxqo2p-mqLMQnmr7MZfnm8ZsHY7MC2unaeX_Xa8',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'r_bUpR5kz1zl1BA0IQ3GSGZzTJCZETMfu17MqXZz3lg',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'bIUBgHmRD_5JaFtGoRQ1kjmJnqICh7YtfTLfNy0PVZg',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'ga-7_HNHKuDmsGFFRDBJ3pmDqd0zoXnj0dUQOeKcVI0',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'KWtHxMpjX5qz-ayFGU2MTbSFvt_OPf3rHdBMLudRn4U',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'r6VtWuiyYDXeNfdJ3CNiA7WE-HChXIewyfq4No_-7Qo',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'xfNYdjtsGVUa9BlY-WiFDyXNHzxNqCL1zvg6-foFYmw',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 's5d5GN1iCvXVNtFfb9L9sB1JZPnmID8nKC0qxuju_PA',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'oaQ1dJYLfPhmHrOF12g2AwArWGgdyNH2P7QysuHWXP4',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'wHA9yct1yxYFDCeI1PBJuWGnJKl3yk3QJib4Lf4qkU0',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'Y-SZCS1WzPsqBu6fXmKBc9ywYWYk9J4perTP2nwM5eY',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'WwnOyt89HuzD2eafzXYaz7QpGDz62mUc9MWUhGxYS7s',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'H00Ki1mw4hr6nVjIpvzPFXrIIAxyKAF_0wPZU1A73ro',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'Hy_X2jiEPpJhzcHsItktMybGWXZBKI6fr0gVeGRzi_w',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'tkCsJRHN9OoOWp-kFdNR1XPNHGZLWXOxaASP7DRgcL0',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'qbcWxQxOXUD7mCGPjqv6fR9xdVgW2xm4UwAPTmp1Ngg',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'eTYRjxg5pa8eJW535IUsGA6NO5wddDVQ7N-96yhHFmY',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'lZ4iG1-4vefbtlYJ-SWJ81Oo0y8aPiA5zJfbgb4HrQA',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'nCzHpujjeITWTG-oZKAhP-BTGT-b7I5d-60QKXdq6OM',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'UT16KvOGIdxc1YQECJSEF3z4fs-zPCA1-mWoJITafus',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'zo9A-Its74I1t2ZHUvOnHxWgC6k7PjOroBe-rqv4iWA',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: '48Z-F_Ddy_an6atuC-cv8bhH6eZNl6M44jUGjxKn5Lo',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'MpTfIu11lPJJrrtGF5bgfXZv4JgZ3m2r_k5DUT7ydNk',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: '0n-b0oqZ_qCNqijv__55mltIZ1jt8AeA_VjRqlyaaac',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'wxDdLbkGW9IoyCl9GIRpFxBVFlDWojeGyq24K5YvUe4',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'Qgr-OYKm_WDi-cz5En6T15J4c22laWh8h8pNOLXKNWE',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: '8bpYLHSvEx_Zfs9U2G0R5b3asypAsA-o1nuegSdHF3w',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'STp4S2DPFlDdUglJycz9H1-KQBkgYkdJi8Xo7W-kpv0',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'l7UOT7b6us13XzOhs0Z--7hoeeI11zYCFGXTygiNzt4',
		},
		{
			cu: 'cu87.ao-testnet.xyz',
			id: 'osg2j4KkM4Ta7Y3ckrIYkUIkkwIe2G6BLc4_0fSzez0',
		},
	],
	'cu-88-zone': [
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'l4A2-_klRGadjgLxmb-4_5aPIRofLyBYfG30dURI7mc',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: '6ZTlkyREEqLPuT7obtLXdc5EmhEYwNLvuSYzdYvh-D0',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'cTcqWfej8jtr5F8hkWnzrLyUg9gUqG4siLIpqu_3ByE',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'YbMtm-mvZ0fhhuMS1gBaxjOOoB05Mo4xEfWdrfaBjBU',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: '7wC3CNtZ5MLfMWT35NAoXseM5dgr8gFrbdh9oIYMqdw',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'tRlf5bvau3D2eFWwP8TIOvNYmvXJKwPcrFPuKqS9sqs',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'GP3AlG84JKYJee3tb2ImUqCtSrz3mDQhfSybgj9aM6Y',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: '5CxT6MbK9E3FIEkoI5tLDQJvjeZK0eNJaxoT6wzRUjY',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'EoGGnxiSIUr0C5aZhTA_c8WipuASleomMrvyvuJCKvM',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'X9W7bPwLBF4YruaSIeqjuLbxGue-LsxlUxiCRKFYyBA',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'zfKybsAM8f5z3ieUY6Wo2714cGHywSO-r0hYLLczoOU',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'T7D-amcdHsUo5NpCtsMli-FfG2Q1OEPqrT-NGsV0qAc',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'WX6fg1I0wCz0Otd4DJdQDttOIjSYQGD1kFfABorBRN4',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: '7GlMeKW1IHJp1msZ8HMpIKTxWuSaIkS_r5kIgggSwuY',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'jCVx66VtTutIGxqYfyyVmEYNaut0wl4K6pR4zfKiO8I',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'R1IkSpJfZaOhLynwvx-JGwfL5SZSMZ6y4Dbd9ktqnOk',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'Lm9xOMlRGscQchkFHRkfDDEwxG03jznlNvSTd-hZbxw',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: '5qoenUSs7IPA0PiL23FNN7iXV313JsPoPehJ2H-Akrs',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'ab9vhF6rOwYY6bZsPRzhKqHXACncJgQR38Z452GupqE',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: '44DHVEHqc5sh9bIq-bTjD49FChAbNnOGA1cUEwXSkAc',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'zsEnFHoucv7rGGybGcs0Y1p0y-wOxpJdN-brpV6fesw',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'urFUpWxb2ZoA-iK2TAPobR5p0mHnBm88GVKP7YMhJzg',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'PvMmBX0YWmrwoP0fj98LprJw7UMf5vgkmNeQpg53sOI',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: '7thfHzrDJ_lGgDNIDqtNUHEbXBuR8bRpstqBWlog-f4',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'NdeAIh-lymKjmg3TxDlvO2sroE-osq-Qumjgam8-XEE',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'd974PcB4cSelzxclHe8TO78p5hzg6D5FKU7zr8h4Dhk',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'BrEeIgDBiOOnbX0PywLxfNPXoz-P2ZHGWLCchyzA0yg',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'JKdULbrpxzWdu3rIjXH34p44qx8hczwYrABpnTe8CG0',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'Xzp3YIgV4an8UxVIl34e3BC6HMmdMneqNTZZtD8322E',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'hGp92fJ25OK4-DzG226ExEI4I9tIR4E8UkTf0xzNJPo',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'KCAqEdXfGoWZNhtgPRIL0yGgWlCDUl0gvHu8dnE5EJs',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'WWP-wLDtspae5W6K3JNl8WNnddL0eb00oVIMqipq5K8',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'Ds-5fwkb4ZrgvgoqQhHjiay72MpwwpLMGhzALg-WSH0',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: '0Ty-XNl_zvsQI6LA57OiqleSR5sTOnjp_dCsk6qoIWs',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'tfyIqAyCnaZ1yiii8j9i0bZV8kgMPYRIq8rKoUMq-dU',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'T441TSxjpre572pNzS6p5SGunHpzMYas-nUulXm2y4U',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'nwWBH2L5-ckQA8vTiZ0Wf2ClNj91SqNND5YW8Hdyap4',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'GRCTjCUSdILVtVgT4_lGrhvaMF7TYtE2tAqc6oWYtxI',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'e52LD0FAzHteTKSXy3C7BLxgwuTNUeY-oJxQzgk6CWw',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: '8UvVGCfLehJsbk-m51hUM4VbJEPqGCrJOA7dHZ_r1L0',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'rfZQAPB6WtiwAOGIJUOnlsM7w6aURigiIRD0_Aajgqw',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'uT6y162qsYYOfmkbrQGyCPTvLGvS2nGTrRAx-jGmxig',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'kG4JpCvvjQtmsgiz9cBF5BMghKotuQlKfUkqhSmSUug',
		},
		{
			cu: 'cu88.ao-testnet.xyz',
			id: 'lfX8NLyV0iH_EizitCtvl1L5K8GFE8bna4KvN87G1ao',
		},
	],
	'cu-89-zone': [
		{
			cu: 'cu89.ao-testnet.xyz',
			id: '1oACsweWkfMrn9JoG8D7_8-BNIcLeZ1I042SrJydwq8',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: '7i2-xvcoMwlBt1jzstjxAPk6h1-VgTq2L3ghSQxviQg',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: '6r8kgVEv-VUywr9SYR36mmeqrZF6ZZ6wVLa26lj5apk',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'NRG4NjvmkJNaKyJRsUIGTjsosna8IMXEd7n_ARssz-k',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'ddWbjl6ap2xp_3PpXmYgJdIaY_YqiQGt0n1iTlh-Epg',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'oFIeNBAUkEDYXDhVx3SkvmEk7cSa2m9c3Z0-6-uCu7M',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: '0X1v4XmJf_K-3p6DlEhu32x37NLABeBfCCKpJfZJU5I',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'SVcjHfYC7oDmL7tFPqZz4rj1L1KMfvohX9vFUFpiLHQ',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'h5Ktu-JAF_xvI8CDNkfhQ2iPXsuO1fo7XgjJaQhd7F4',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'jPns8-VSMrxRXeNrMdHnLXRVG9ggDDRi0LE7UINZu-E',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'E5MIedLmmqzR_W7ZqN5o00drqpPw4KFbbP2JHsJKY6U',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'HUKwWR0KmQInmpEkPmSMiFqot_RYjlBUOuMCHEIDQEU',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'NKMHq0UbfcAylEisZkOLVM3ZHpnibh6_g23wlwW3ZP4',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: '3eY8xGEb2GDykNcwscDEyhsiX5AJFFhYnL_q3sQ0QdE',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'susX6iEMMuxJSUnVGXaiEu9PwOeFpIwx4mj1k4YiEBk',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'd9EGNuMZKOjhBLeL-7vqEfhW_Bm0mljUs5UcemAVfPA',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'mioKAM5QwhcDcssziH96slIzwBIt0PRPnPnXQfleHb8',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: '5EqrAsuzkhlbu-FUkYgHZamIdQxi_dhv3R73C7tUj7w',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'HJFBaDD69-BbZ7SiL4FNSeXze_AaOJyevFhgDtv8MI0',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'j-Q1HasrZpvh5hbvuGMAl5bIRuOSy1_o5OWHoRIa0Rc',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'VzSo3YZfpaB6yxn0aFU1hNn_vhoajyk33eoW8_LsHUc',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'i2kcmkPmszSZ07Ds8zsoGiHwYc2rHj1to7KjbUPHGig',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'yl7eqcN4wmuR7pjMtrrlbptLylosobpdu0bBsCFBkHE',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'mvM7nLGsgdEYLRgi85haT_6XuINRevh8dLpxMXsYpZM',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'tVQTLeYYbhxJLBLSHsA4cOv_QhubK9QKti-PRh9wCj4',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'NveEAEhjDjJg9GRlysGmkZP2MwdoKe1d2zbCj5OSwh0',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'yChuGRv4rgGM4JT3gSjk7ff557xDdvv6vDICULp4b6c',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'KFHd4LyPakSIi0AyAFWDKUYJLKNVj7IiZE9n6H225Zw',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'ulkaFSSRPvOCTa6if3_ennAPHCAgSaMRGuE1b15cyUI',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'hf40CIgFD4K-Fgroq2PF2na3h5UjAui2_gJrvNNkI3I',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: '6b4eADRIiANy-5EcwI1rVQBIzWpCw5hm2uoLtv9OSes',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'OK4XrvpqgGIfamYVWNO2nchYqlIIWdGmj3K1JduJNvc',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'MYWfJIIZM78CKC6iiMMz0-_DTjqULLmxtnL7-VRiZEQ',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'pZ5nnzYX1KasOJ9i0cbw6vnN1LO8-FbqDDcmc__ROzU',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'QGmQxdNrhahCdB-ZQ_ipaTqtxSNnJTO1QvgylSTiPDA',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'de7KvziW_mxOAlh4efScJ0q5IJ-9NKbK81mSAqn8DYk',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'EoHA-0GsHcDvomIDBfbmbrG89inv48wZEMUK2itIMHE',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'b8i5lTlEKgQwI6mrFbzMtH6YlENvlOVlIQwiQKUrwdw',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'xl8ioVeFx-PUCm3Q0gZHz1jGRGBaYGcp4lNOO5v6i6I',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'ssFbrujWyW27XEYkeWjn5u-fEaPtIh_nAgEJTW9PVrw',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: '-1whV31AOlx0idtKFhdCyXOoAPLuPj0hT0GdZeB_OGo',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'J7Qo6s0Burhzh5Rc1qUtsJwE822Zav_mc240wdEeMqc',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'PEDIRXvKdkAt56oQ69aQpcQEjSVB-SR8x20gHQz71os',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'm6RPPPC9HmURqjRRiWMdZkTW049tetFl2DOU0rLjE7k',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'B0v4muPeamI8aoePvlSxZ_QWAsjVlLrvqZcBA_Vf-KI',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'AWwCpSDqkr3OJDE7oGnuLIoCbgXDFMRv6OxNkOKVhh8',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'W1QEIPLGn5y4Cr1WuCfYsHl3HsZ93bRYMa98ecw0KfA',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: '1Lx-NO6x40QyuegrPcABjhVv92IcBomCCzfxLFK6Adg',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: '5Ld7v_lgOAT4zfSgtbHQz6iLdVB01sgZFgYa5zyvGN0',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'uc8HWVwBDaiwicRn11YTKujp6K3dsmNlSgIK8UHSlwU',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'pgWHOXeSxq3Wd1S3-bq27UnT5L8HNx6bYiRp4vg8lwU',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'ZkNOVhDfRmcrfIoNeBguZUujfllHcYRP96qad4i1EWA',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'KQVzZsvZ01PwDPb91LGMrO0SO2bKZoj-RbMKKNxOBV8',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'lRsOZrfX3Dhi1E9627zApixCGWMtAlcL3xpQM1aLMLg',
		},
		{
			cu: 'cu89.ao-testnet.xyz',
			id: 'Fo1Ohr5_DDVv006UqlCC3mVZweHszC5PtO8UC9ctRTE',
		},
	],
	'cu-90-zone': [
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'l_qtzKK0zQWbkc7zkgRnD0sy2yobB24Z2ZLpxQbm-Qs',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '_AuOLZbC7maD41nCdX1i8ZEzgiVCqG6bCWyL7RcVWME',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'joN4k9Ais7PoU5M_2wuzP1kRga7OYqYOgxILBKf14ps',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'l-LMGbEJydxnF1jRoghzEe49dkgHiLCwjlS5Zy7ecws',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'PX6NS1KhXFATBQfoFo2bdlF5lHsMRpQ8XflSr9wac9E',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '1FuSDfStV-9GsewSqd93MKkidZpJYcCbGM64jglMLFM',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'a--cqwX1wLZEeJoIG8uOt7OrTwZiHADloiYr8lon3M4',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '7YFZ09Yje_7qLe9wRUWk6IzZHr6LT6c8ilFWni5eeWM',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'UGsBgfhUNioH5FQ8dCehFat65PUJrqlAJxqJH4R9BMc',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'ZSgHYtuHkd2Fmu1grEzcOOMhwm3RfNwK6dSlHkDRAOc',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'JPN7-RNw6xd-zQfCDZgDOk93d_LUXjfu39aKDGwJ3rM',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'uGrcAxdb6KloZsQH-7HQsP8bC2cK7USWaRdTmHt6K-4',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'SEfAX8-Yd3dZHWm3sdI2Ep9XxfYeswrCdl5ZyWObHOU',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'A4fEEUbaBs5TGK5remSb-VFw3vewSc0J50q15T5XMPA',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'irc4b2fngAKyXX_V6TnCjPFBlRlHQ08LOEbqFUwIEdU',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'Fn3fuLunHd_xherwsUXhGY2BWXQr-OzNKqccN4IZGeg',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'wjqNFvyFjx9hhZdMS9dTfhFji_ppQb3a2TiGGI4SgmE',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '4D2iHnQ1eznc7domf1ztSUp4fez_R0-IPxqHU_7Umyk',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'Av13KBCoUnvB76Xl3DbxZRBwC86eX_ToAq6jDwMvEtU',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'NHpz6ZRlCavTaYxDVTq5jiXRwwKGvDuIDgiZWkeTcgQ',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'nPyQFsf_zr1mUBylRm_tBtCgMBPpcZ5iJQe4ZIR8Bmg',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'Hz6fr8GQW9kGTOjMV-HQnjg78NCxPAq726pM6umJcbY',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'HX_MKdVwvYlG9-RLNRjiL_bDr14uGNCP-VcH7rQ6k0g',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '2kkDyiz3od0dVjww1mHk1MCHdlgwzi5MFIVGKKwUYCM',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'AuwQU-qmfxPTKnqZPU9AM-eIC9x1P8Rj7mujF0FFv7c',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'F5Fhwcwxxzk88qP83DD8BjIaZKWlY9sqPGBkPOF1vp4',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'kiVX6r7DPDOF7hKJ3tiZNHy3y-CK1urLNCF1CrxHxfY',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'Asi5wjgqxf-mPkBnaEJlKTWL5zMaQmU2yNPkSXgM4hU',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '-lzg-UpKExOW0QJxJmqvZVawFsQGsc7YuEA0lq9L56U',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'bVB-yDROg4G0K3joVXfyGkXPzco2lwryH13DXm7DqIQ',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'd-DFvG0d6dyk4pZd7YJjucTkd6meQ92PPlSZoyopnDU',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '0kRDcE8kEYvDu5uJfNOmiCyr35whDKVw80gQAc8O-v8',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '9xEazoPrjcpt-5XDKalw7o6B51ndwkOaOAYlQCNv278',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'yXnp70Gt9LiyPsrGRlanO3M4mE0wXdLm_5Ne_hPLOj8',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'b3vi_t6X7oujzAA5GFbORiz-q7YeuI4QzdOIImf6rcY',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'W9Cxf6Dw6hB9rq99UqHNk8zLv81TR8SepMDLcK5X3Q8',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'WgN4XymVPDE6ak6EUdbTARImEnjZd-31uW_8LydgxYE',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'YdVdFgNLUz_Kzq6iPexWiR7MxLDwv6IVLtgrJW7oulw',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'tseeYbr6UlfHFu682djCVUBdxH0ZPXI31BPBs5QdU0w',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '1rsnjGyMTZ2SW0gKgiHbG-vATbyJRxbIxQ61jcFF3mg',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'gnydBMeF0Y2MFy9lijp2wtr62C-VAoikSmFzrCCceRs',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'iLq3bYWNpdUbLdvMHt3eC0RnlaqWlK84dwnvikJAIPs',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'PalC_6YDnOaVIzvYuduQo0czvOwlHpl4ARcstVI4OUs',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'ENPZT4nchncrF4Ue4H__hUevHZNYtX_HytrWAqCQFMc',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'gDrxXcXDYR46cOcUQY49_SeE-WPStBocrphteaXNc6o',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'iTZlipeASgQGDI4X9y08ynZSRIZsH7-vAZO_4Rqu6eg',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'Ohv8-u_Em0_KAsNp4Rvn7M6xi-wd892MK_uJAN4DOwk',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'h1Kqj5m-EkpjtbhRXcqSejDa_LpTmfem3Jw3QX-ybQM',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'Jw28RXtVN5F-5z9oMC5QVXXaNoRnSVlvt1eY6p813Ts',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'm23oWt09x0wRL19q6Ri07xnAegMCuOKBnlDwUHYV-ho',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'S5AlqMEymTpq1z4z8RNHfzM-VcPzVGJf7ikJESbm7K8',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'ArWqQHPVr2Iy-UyqMAYqqR1Yt3g9jZU2xrSgN3h8o9M',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'V18aTNG1FazzWvQqLzMSXAc8VdjffnQHU4FnRbU4VHY',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '1pMg-ZR15DSH70dfZe1ev1AkA0_h50YqQW7wcS8y0Ko',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'E6x8GWTKTIXNJm0r9tggmNkp1Iv5lakhoDNk8YXfGnc',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '1_iheVyTkW8nhN3U24BqNGacrCLPonSQhNGh5ZpFOfw',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'RS4qdzs4jSURXIH88t0e5syeEitq3wJTp4EYB0q9u_c',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'THbj0z1Thqbk4vcdQRY6z7VKWoxBuW9k-m3KYanGihQ',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '1dnDvaDRQ7Ao6o1ohTr7NNrN5mp1CpsXFrWm3JJFEs8',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: '-TaEwAS1x8Ib5q20wgvbk32x12hHateMrOr9v677jZA',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'Z7Y3kMH6PxKnTI22wfR5z2Aj6_Ne5DXftIqmxjaI8dw',
		},
		{
			cu: 'cu90.ao-testnet.xyz',
			id: 'tVrzmi1n2qi3anPR5raPbfz6tIhRk92ZetdbfvSKMew',
		},
	],
	'cu-91-zone': [
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'GhUh1a99uf8uP_VwhyMBMrBUKTd3DUH_JcyNBGItyKY',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: '3KenpV24nDc0MRX8JtzIBasNL7QTTAeSp156Vg5Uc0I',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'smxTpU78AZ5A7nQp0UPMfSrumQtLE19LOgAru5rZhx8',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'SKx1fu8b0xtDY3W_YHSTFBrnAFLhG2qYe6sYKO9oiwQ',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'IH0WXmCwG-Y72jtG9hHdR3ngLh4L0ZA0lSxDgzOHnYw',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'MlO5EM9GmkcdQe2ldYQ0eGQ4ioEivFry_eHjqlCKQGo',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'HJjEtX3i11zQw9y9D2JQH8wN0LOqNXzQg9xLKBTpB5Y',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'LnAOh6rfyBq7ZcsJ5LmfUrdJ2Hl6He7OScKz3ThtpRU',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: '7-mFv_bH7TKWFisH2WM0FFlZbrhPx2XXspjL0Kp5Me0',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'Qk9WiogrmGnNf2Qejdl8DXpJMJiEFEob-F3IVBERZC8',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'FAfOaHLhSg2PTz6s0LUUNjM-ADc8xx3Um1konPSH4Nk',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'QH8v6dYTCxePOZcZbIfw50kGl17OIQz3htGfQcf2BcU',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'Rpcfu8Sj12DFZTAMO3b_gGpQ7WUYLW_i3ufHgA1q6zI',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'n89-5D9MflrY1Wtpv2gvcVBT0IO9YrBSs8uJ84fLFV8',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'eJlH_Jlw4vTeEA2Llt3Aj1Mw_Y3pFrFGVMOvzlndkkk',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'd30F3ZW80_hh-rW9fnSRxiYBBaxON2UJ9um8h8FaGgs',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: '220jUYOE2s62J7s79B2A0mAw2f08J8fEIjxNzZDmNko',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'wiZjRzlo8PuR698ZR0CVJstda0rXFc6NPe2UCyzytPs',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'BpGlNnMA09jM-Sfh6Jldswhp5AnGTCST4MxG2Dk-ABo',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: '5GOX_6sissmxhnq2tIiOchmSXcv3OFBlYQkuind0f4c',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: '77RGmTk55e4i2ztLkOASP7Z0fuK29d_kdwaXClJs5Eo',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'hGAnvqRo7UFvkhwmjvzud09tIPLFl2gNg9lSLUkHPQ4',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'MmsuC1EaIoITrRpqUQsegErNIBBa92x7987U5eBZHP0',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'DV-Mh-KeY9RldJQ1GjgzAJjB1y8lmd2e-Cy785rRQ4g',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'gZjqXIteQPHglxZLipK10uE5osxsv0NJhahTb7snVYc',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'B4reoAD_Gp_8QIbtQaRY2ejz4zuyPhKavetQM3F9pxg',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'WWPYXeDnKggZ1At-AYMaoKmay8e7P2jot_lkL8aZVeE',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'z5fCcMF97QCxtz60z6Jtwf58uwMEK_1JLLYUAz5poJk',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'hTdLS85O2M_39_EUImlIwbL_ICvsCMQXBVdPSks68fU',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'WghjRNu9hn3Hd0mxCKbpeG9uk4ptQm-WjUuvTAbCWpo',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: '7heaX1JaDtKQCduNQ_rp10p8Nx0u2C7n7UbjH6X36BY',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'gqk_RVJR4jTGgq40y5XhVZFv2-_QAtdsKpH8ocn4L6A',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'g5Q06ZMA2S-XAL9ouCEYjRXdOGp24YYep1VBMPi3rQc',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'aaNw7H5jwp4vp7nkMy7rFclAYW5ySy6Ra1d-devjXL8',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'cISDI4U0CBCOc0csELq3jBOaIbu9Fz1iVUTdHSTZA3E',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'EmuZF8UqDqoBzxBp9RMv4Qv7MJtEzVCpVqQ9lq86-to',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: '1lxaQJOtb4tYVxUEDFaQ07u65sCIOaxx4HcEbH1dAhY',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: '9WEOzDzBKgovjIbjmqK_CsflBca_p-XCE8DTG8NKX4A',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'LFAhMgTb2nq35u4Uncm9aIdKmaMlPtP-AUfxzMc0dH0',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'CdUTryfCBWrLArLrqmj57TKZAM8javN-tj1s3_YWzL0',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'kiR6-chiLN5vPVvgWCOaiF0by6lVw-9tnIIRV4Y9PsU',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'CLIOsbPwiN1Xplx2Sj4lHf8Q3r4bN9cJfz5LclJwosY',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'DUa9MQTb7KBwWmRWGliVYwcBISdxiiwAwG1qvA8ZwZQ',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: '9bv1D-SHr57Fa0crSL20t6PbkKN2HE8QbLwwSYp7-VE',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'Wc5h0qTaQhYqhmefags3H1rFn4XtRKXSclU1Ju5wS1Y',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: '-cikJ1O2669VP8F75bYfQcqFa12KDqWC1iJWKfmHdqU',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'qZAJ1BR6JSQEYR_NL1Dle4X6oRijW_VDSAT2htgcX2U',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'v1o3mr8pgO1JaueYSUmWgFSUO_oyi61bYQXAHof7Xo8',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'fRHIxUYl8Z3v8_j7s9P80XZ1K0iAVqnFTMC1HeTRp18',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'QNck9bnLjp8Y-HEPDMD6K9PYnkvmiEj1gaK1N-AFYcM',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'MZIlGSsOPwXxzoo5tASZCienOOaY-GFVEcI_f6wOInw',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'uH1cQz1kQzH99ZIhfN224rcL90dABstYWvMBIu0gz0U',
		},
		{
			cu: 'cu91.ao-testnet.xyz',
			id: 'VhQoy0pGhk_azf7bo7zY15kdXXNQ31RW72z941MLKOk',
		},
	],
	'cu-92-zone': [
		{
			cu: 'cu92.ao-testnet.xyz',
			id: '4mAa6FW_knUrsSNWAlWLOaKxdjAtWHcc4Qb3STpMg0w',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'taogml4QmJaRTWQnOT3cms6RuZZYLclIFU2qWINrM4E',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'yntTytmt4CP7faT8SwzHshsU2hXKpi4S6JPudwvpC58',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'NT4OugwwLLesYN3haoSbNq9e1zFnHXHhz9FDETsySF4',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'c4TW1Wkt8cX8OuZYWX-9QrVm5O6wSUkc_LkmTVusB04',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: '6HjUDNx66t7aQQ5NDreRKDLXcNqW7N__-jPVeIxU0zQ',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'dkuJhA9smA9vnAOrt4lCijqVJfmOeq5zJ9MVdR9kcVQ',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'n_O1RWBrvIc_6ogPSBa0vAtEUYkaerolpX-54zXKeqM',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'hCSQIRwIvpThXb1DznA-YWLJwnsMeQB47LjgEpNQAhE',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'qU8JmJslARJAYyXDur29lH0sV4R5EU9xIJ0vg2ruhrs',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'Z_B_T-Xrd48xETyqOebRiPJri_hrx1SSFt4H8CRaGls',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 't4otY-MlmD2ptyzAVzeb5Zy6sSEKSCQhUv2Bhszh-Q0',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'lAhlSxMn7aD5bFOx79fpl-9Bmw6GkbOGOhJd2I4DxUE',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'X96bD_0n-HYYQzyAB30BPt7ebgP5yY61J0uGrkAMJO4',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'caUsBRh7MBPiTWzC6spnlhd5Q5v9FNG1YF6ITZP8OiM',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'DbTLGAY9IS0ZsABy2kbTj9-Re40jiWaAi5kbJ1xXEJ8',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'Q8GvUWUtvzeTI7b1eZcOOIistBxtFY_qpEDNx-vMPBg',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'bvlTGG1SdjValLVAw6CyH8GnQReXEd1TdU9Lawi5VvA',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'SH-PKNvlruyVqYbLedKNT67wFrZc3CiDgt5-Yg-hARk',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'TiIJocmZAjPzRQYytK3MYegbiWOqbsAEFtL2NKES1Sg',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: '5GJG9jHngNyHCr1ebxwxhP19WJ0eamIzuha6A65ISWM',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'IX0zBV4s9-Wybi0SU7Z1GbVryv_TqoncJigh2OYwRl4',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'DVVxjJSvxa9UWG0wX_zyrcb4GgTIQdQOkaPqi-C0fh4',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'Qv8RQ6A81VSWwmbSbmrZTxd2LJEeHQgjFCo8q7kZDAQ',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: '4KOucuUsHNYvxI4kFxaCJfspJ0uV_htGd1ODLLwJTQo',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'GfFxrZZbObFPs1kxWXLvTVMVWhAyaJwaGQsn7N0dHC4',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'MZDqjG6_ZSmTXQP_YD6Ar5y6x7fuJpzXuRB-b2sNXmU',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: '2XperkmVJSC_qwdN25alpH9tiAn-099y3uZ_e5ePMIo',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'PORLl8UCwJZICVqW4veQfCfYBOd0hCrIh0CAS0g2UoQ',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'vzT9MR9eo45xsbxA16tkC-TBvi1A7VrcV_emg21J3sM',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'S1u9O2Eb3nkT6GPzbBCBLCMZNf6PkDkXHaf22cRAfOs',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'GPfHwYkt5p-TR7a8wOTRxhKYEwMT8mAu9YK6U4PCDxk',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'p4YifpbH2CDZWLOPN_9D02iSYfkYL028PQmcMlh4aVs',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'At8t0970nTh4Ry4AQNWpMfS3r675E5yC1WkSIQ6QL8c',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'WpHeK2oYi9ph9ZcIVHvEtv4M-eWzhOxUiE_VuIJQBN4',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'aMUNOJ5VT75474CmHC6SdV8HPNJM377shF0BxcdZFXo',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'Uyhs7qIcQGJk7n4CQSyjE0LJYbiVGApcpS2udcKidDE',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: '3EVdTQuV4J89AAQWHoHZXCzvkx2M2OLtjQ8eRktVOJA',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'bgCEE2hqN_zIPkzs0jdxAawlXHaKWXRYE61hddiFt_M',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'QjmwgsUZMNxos0-w8ONK0v0qYqtfPsw1R5H7xZMzM5E',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'o0VhLDH4P-Acs_Jp2xE5cLonOHbJhbk6yjraHdhxx8M',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'UstK5W2UGRTDdHX3iMmY4vaXYFaH5ZTtRKa4qPYddUY',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: '8h552eGEewb5XHcfM0L782BYePaME42ChKkxIWleMuY',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'WvITT77x8iBjEiSdTrWm40G_irTjejSnrDe7-fhhK94',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'vAZSqt6pWkG5dWguIL06mX2t5f_2UKCcaXH-Wf42sYk',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'wzwpg4KA8JkEmEq_tVwsoBW1yMo4Eg4u5Q8K5iA0SYs',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'uGHW1qVF38uhao7uHaYzZnh2pptM4EnQG7CRtJSNfwI',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: '3yY_j7w4GR3-UGapsZdwN9M_a6Ls28DxGFl2e65Bstg',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: '69pmuA-HvC8HUTKFdg1bkY7hQ_xV4fwWgEvW5T-Gbhw',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'duaFTBR_Xs7wdNvFOxsY6ooiIl3HaXxaa_pLn9o3rwo',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'hXMiVcmTE675bE_rXOLj44UDY0LnYRlpeOiPwRq76u4',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'isZzOeOJXjcA6VChpiIMCGEfxeTii-TfP72aZoLyajs',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'L3I8pBHIXp9tGKvH0TaZTF-QXjczRo_B-j8y-W_0N5M',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'iyNhKRBqxTWu8Mtw0c2HTrV9OdOvq_NS7li3VgdWhSM',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'JItJcTuUgQIaemWDT7Cmi-PgO5dOXgRi-kiWIkIZb48',
		},
		{
			cu: 'cu92.ao-testnet.xyz',
			id: 'i8K1wuQwc4k25_zqg10sUqOL-OznwkFOz2KE-Ne7e20',
		},
	],
	'cu-93-zone': [
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'Ht7X9eevgs0v7qlM16onGQEzcFaID8BpJKrCBW_BgWI',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'ZdnKnFzlm18prYHMtyeXxcsXubXZKpVvy5XWa_466DM',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'RNVQrmw-XeBfdR6-fiHhy_lBhMwu2TTwytuPOL6IjjQ',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'IHr69Br2i8qxWEdRJ8jQG_oKdpocF_3f5hetOz9C7Iw',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'U3LqF_CTcREG7QUOCZpZMf6tFDyLcpJbEQ-AIAy2aEc',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: '7lyBjvhlJ_6MdMDnNW6m5phySGnC9iXWG0Yt2Yh4caw',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'PzDAuux_itzpvffKeiQGitTyL9vNzcphkq-PBOV8UcE',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'EheZoeQ4dTMqqu6EaYf4sCxqakrBCKjiLsfrOA_hvSQ',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'zYzUzy0ooaHj4eeFkBa3WdQE2CR7-nJ3WQteUnm6wMA',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'JLuxoJHMoe9rk4NOe0J3VdkGx6yfhtiFDuUy5COi220',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: '0RrsYqz5k28Vt5KlLMHDJm6RAaqQAsnYd0fkgYpiFDQ',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'j9E1Vfaoi2ZChrsuUzsYaImlf9aMpPWQ6GSZgfzbPgM',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'Y2yKiLKJI3L-pCxZXSWdsKl91OPjsVtDlwo_Ij95AqU',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'qNCW9c3FjEhqNtK3nZ2vHdSl9c8L5pEK-aULj1ngrxM',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'kORzA_ovblF1m4eX-g_OisVrZoOHLbkIUHYVbenv63A',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'ItIQETkeJ3zwi1w-FObswh7o47yjuyB1F37Z1tSNKjk',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'UfqsE1hdungNmAs8pRZFIyDglAsOfIISk9aujJVU6bY',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'e2zRjGqqGiid-hyIEIoVKrXTOWMNBCNc-BdrtwMy0PY',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'hVZ9owFy1mnvjgOoLoePb1hh3-2LPj5RByy53dhXXJs',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'JUc1kyFd57KKM8OuWq5mDvmtyWZXxi6AhWZkSkL5kTM',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'rHGClLtvXwmQsPZF13UOSMHB_TNjXaQ9aRtbd5e1fMM',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'dRidjG1MWxcVIDnSOqg3nZhf2rGFhEJ8n7u29JsPTKw',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'jVYl7qdDiAMuLBwJZjVQYzu4QcE6_gVAEGKqyVfubfQ',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'ZlW6iS6qfhGKOGbDdlCRF2B-dxLfkwjsMa7CxXygTJ4',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'aier6y_FuNYz4IA0oeV1EIGeQmzPn1Qy1xmdkWmCRcI',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'CTCuwjzU-eRReeS4Uv1jVWaC9QCM8zOOeZdAOFIdQLg',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'FC9xWau2q4hrVrogzLkmQ3ox8U7p4ggMZr0VpYmZDNo',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'fRcbVIs4jaomve8YSWgobTYCjZoZGvpbD59f2I1TVgQ',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'kK-hkBGejze_yLYCNa7bEcCb7hCjS39LJJeigzVHOS4',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'q_6LJhKxTfKoz5-9FGQxGO-AiJsTrwYtue87IE1OkvU',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: '241skkLgiW_rQ4fTdT-WERn6uDjvYg70ib-qDPVpH5s',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'fQGmEoUprD2VyWsHS0OSh9GR-WG4CUwSglVqsBU-IzA',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'AkI-FlEjM5CrEOjN-W7B9otqIvR7PS-pplaifTk1G34',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'bAGKTkRWHspzZwEI3YSMUV2kMii0h8v_pJA6sx9Qtf4',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'mneOHExC4d2lQbyn7J-itxWbSLF8MDNhIswWQqVHAiw',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'P6Lv7jEllHqCb2yYwIpCHVZeB--nMeA6Ky523OxvF8M',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'Lu8Tqs7qCL6SBc5E-DUvWnR8MqqjfPvqQfw-RlJgmSo',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'aFdJbpsKFxkPu58-kWzytEFidCtsGNS4m7dKsJbUMsI',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'T-XJa1ib_FsXlLrKd3cIv9dXxFg8HbypZVnyi4zVocw',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'hk7yYSqO87F_dlt8URnznKGLd5ujvNIjFgpKP8aYIyU',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'ZGv7EdBRRRNFgAnn23qToeqk7-b9Xvq4SW50Ul2gxaY',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'K8A56HpdMP4OYhWJ6uR673jabKlXZdzo4tMF0fcCJlE',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'wqhlHaqp5QcqiAXcrNhfGjSV3uMebzeKeqgsVAP6nYc',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'eEtKdjNmjSgqwGr8sMHcAY4-lnVpMiyDb53a-JaH5Hw',
		},
		{
			cu: 'cu93.ao-testnet.xyz',
			id: 'sPcJrR3EWGN0nizYgMu4tPc01zAZyL1ijWYdV93YKzg',
		},
	],
	'cu-94-zone': [
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'hmaHNcedPBwOpHbEtfill8PhKR0yYM3S3GuTEWmtSQ4',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'ieVR9KtFkjJIcuEI7t-IE8Dydl_6jPYHogVPJrsstfM',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'l69IxTBfc31AYxCn8sVD0prT63_yxlWyAsYJgkcEi1Q',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '1GICBA57t_9cQMvYQDG_YkjO7-0XVKTiRKTkdtlYFHc',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '1i0hga7bTymmPQkw3w9jYRghQiBbSv6J6AnkbMdrTgg',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'juVKz6ReF-c6tKq42gmR5ArWKIFW8QAZ9zkDiYBgC-Y',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'pRbNCQoReCMh6hr31204xIgvhqDqwO4w7trRwsYon2I',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '2z9aRrqGj9npJ9kQZHswieGegP9pBv1EsUzuapPbubc',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'jFUm0Q72UjNTGKlloepiYll4jwRisKyolZW_6MO5a0c',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '1oCZQSd372PCTbtkKx0ZzdbOoTprfv0Fk2OFxk1lzmY',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'k_hceKVigwxTy60K9vkmgsVKQAWXF7v7vUm9BioLnb0',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'E13Lf-Y1co7Us07s29DynIynsLq0KVB8y1dkRA7Y06c',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '8BB_iJ1YdimxkDaVNQvqi5HqZrL2esDjGMaV7d_JZFE',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '8sCebZHN8C5eheRWF243TFCF84OLqGWBYP8PdKf8NK8',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'WBozTEiEogE_RJ0mhfKiKN4ElPLZanKIYnvVI-hw9Kk',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '4ekvfxpvm2ggbwXGk05KkT2JG93Cc9Dk6hHlRcYsCVo',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'nrprTUZIga8mdjVknv9t0nrT1esGt-SxWgx_y9yAIKE',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'NG7W6yfHjKLZB8tNThS9zGQdO0LtWHPr8C68-UqqCZA',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'aiglAcWqGKs3VHU2sO3whPvBpq3SmHC4VQvoKlhfh6Y',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '1YomqMD6ruNxbHNEGS9wjfrLKJu__DV04p-fY83GqUk',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'UPzUUV9FOCMg-UkVqHuaNXNjfY4x9jh3hv8DsgdpAq8',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'zoxeS6nBAnC2AwrDy5fLrWT5yw_FinMQhtLrY4g00Kc',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'YLS_JFSFfPSo2JYqyEX6aJUGwz363pffCTsRK-SKjEU',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'xbNtC5hQSHQh0n8v-K5DBjari1-xvw9lCY4o-shslBk',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'UR79slx0OCmq6zmy2SNzsNefb0rCLSHTT4JeD-Vl7tQ',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'SLvRWwh62EV27yxCybddgWYd1nx2xeVOv5ULTTJQNNk',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 't5dacQ7B_fOC2_lwxrSzsq8d5vQGBxcAWCd4amFzJXk',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '2kCL03LsYxUENQtXPHYFlgC91km4JHpMbpyh3fcqnTU',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'Fn_VjolmnmVqIFBb5n9m9od4KALbpnifwKmun4heSfk',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'JaGVlnNrOTVP2ApqOIT2z8ql3V9HY1ykjdigQHS8JSY',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '8zjJBHjR1VrFTRc5BnSb8587ymOwJi0AonVuVlr04HU',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'dbeT5wzZhEUEToo5CNLBPgJfS0shq8o288R2-MRxtlA',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'v5UXA_iBx6PQI9mbrnTtucdFibIFDChjugwa5H-35NI',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'pc_NJapeY-q2IeLGlOj5_bQxh0MDnq63VdrBFOCBhYc',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'AQz9TWjmd4bcjcZcNTrCpOfXmIIuciuDYd7dzQ6uPmg',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'BCZWjW1dl68YEZulRFqc8bm3AyiT8a0q8ywtNHgEcJg',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '5fhaOiJ7d9lSJLlXXKtyYdmZSVyZSaPN-_6hUO01b90',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'ROUMRsmoh7XL5uCfczimzsl76e07FokkIG5dSJfE3FU',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'sHj-xjyBRHaa0Qo0nSOqy0Tklz8eiL2Lt3JXCcxedf0',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'TGnJXk0sv6NlltxUxEh2FR0H-j49f9EhVzSeuvL_Cgk',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'TEktjL0M1nJDv8x1P9DmPB9-FitzMegEDlw4oe92C60',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'uBDxCTMsAgN2jiUpfjx3P4VKrZwgxbUx3JCPSwXwHAI',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'dfa8Pvq-ofa1cR8slZTDpP8lTaHBE_1dPmocirRY720',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '1pRVGDETxm2pHecoTIU2gORfXLavObb_HfcuJRT7uSo',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'OqGDR5pOJwdxTsqDvRv_r0wllM-aRZg6l72ef83LWak',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'Z4JBa6gBJ0RQBXFD0EQufrPucAZakfQ-2B1Zn32UQQM',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'F4icKIQoBB908ymn5LoAOuzxO6fTOitBejzeOIsR7Is',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'x0PYUaPCdJKXoJu9BiXdkho2RPq3r28xYHz1idayick',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'n4f-0Uooq4rc7C3VQpsm2jNi2dXjriDFDPBa7UztBAc',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'v7F0HakR5744iHd7oTpqJ9NVt9dAfPu8FOVQVnPsXuM',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '6Besqd4rL8amVvElrlUnHmbNEelf1g9nufP2QMWHR8A',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'Q4-JLcHh_tpG0SScsm8Q94rCtapa-2vQLCuF_ubziD4',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'WOWoA9bOvI3JPFhtEr5crWWS3a1MB6iVrQqYxaFSwrY',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'Az_wuc4DSbN2KCRDmMLJ_nuxfa_ppWyiFImtbBRa5oQ',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'nPXm1ZZvH01oPtCYtoa7XoqNwNxyOcMEmHvyY7zE1d4',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'sw3PHtbMZ7-uxf4KxIzt9S35mnD5ht4qE_fBPBG97UY',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '9njYv2yNwDkx7L5-dkYHkR7QPr2-FjkYMbGZlSaKZEY',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'i_1x6Jy9M-Jehm1-qy0MW8JltSuuFPUZFcVBi8xZLPw',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: '1wV09MD0Z0NxbR76UxZyoQHP8M791ivL-36TrIWJMBs',
		},
		{
			cu: 'cu94.ao-testnet.xyz',
			id: 'UK_Hj5BTL5Xtz1Ec2gU5t2A1YZ4_MKL2Q0b_uBXIkKw',
		},
	],
	'cu-95-zone': [
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'wlOoH_8DZ9EuUSsO8_kjuDaKHaOSRrOwVVdS-bTroKQ',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'Ogrvjl3zqoybkj0Il_NrLiYFjkAtU2Lgp_tED6kyx40',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'SYiamBRucoxw8o_NvTUQAEd4lH9-nBZf3jWw86a7ZZ4',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'Ek4ZzEbHiaEXz26lxrICpIbFQpCQd7sBmfN_ONeUQq8',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'weZkGCJofWKn1-4y1h-R2QZid-peiUBZZ_pLQ7huQxo',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'GI2rejh7oYrMEhoOzay1AaIqEuI9vzsSRsS00mejrbI',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'QV-ybJqbc8JXjSy3JL8X8E2dGgs0dTTKkQ2TPsMhh2s',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'xYiu2I-l9oXf2KcOJydUaBULEJvKYuMaCbtLSJhzsmU',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'LLmx1IvysRLU-1npGLJbrxqOJdeSXiqesgzaMu-8GUE',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'YLeUYF0PFOzyfHvCRYy8b9A6YOvRc2N9GC2v2xEzmfU',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'v_hZU6C8_cEyTYW1p9lbfWLFL-G1s1ZGnYSBCVNEgb0',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'mYr42jXO2eDdW2yOLLEfFKY3CzR0Jn9LXla1RA67HO0',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'tgdWEh_G_ZdE_d-7ZC_n-_zLw8LU7IBhehUQV1nqpyc',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'krZ0DyzkKMkjmHlRa2N46W5-frjo9nQyTxr93X7T394',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'B-3nSdLj8e4u_dnCj8CeG0Pz5db3qqEi538k8BGvzOw',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'kfaa7hS4URgV39miQ-Uy4P3HyYD8TZy4dOEIrnxk1JY',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'TDmJ_6FgTKWTUZNHc1KBxn7vcNy9gpjgDViFdCI1VZo',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: '-GVSh9BdE-4R-0U4zYYfv40Q1zsdV75UJaLQkMFOtk0',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'NQ_tfzhNJ419juYNC5WCy-0OSpEfxOjx3B1fZRqCKnA',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'KzNfUPUyJsrvnHR1mgZG9q4aWRKN0lUNxOSzCKvMjXs',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'qKN6MJAZr0g6N6-QIORDHfIE1D2FqlzSSOj7t3a3MJY',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'Mv-Vg1rxFH15ErdtU40zS0gegcM8csg0_57SqN-j87o',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'Rqu5oLoePfAeRvqz90gCW11fz-4gFkRA-VHIHe-qgY8',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'vzr9XSBQ_QWyrVfPVun5wsCUyht92V2NdFnZSnOTmsw',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: '62BNgEDC4_pydiq57vHseOfGjBIRlB2sgXxDEmbHAY4',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'ZdEn5Lh6dUMCqxg_HspxLti66b_0qGqGrPP5E7adfqo',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'QSs40hPHY36IqPLstpDNVQhcNC6MOz99qlvBXelBPDc',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'wP5zmSpIFhVoKAfCXMbN-dzHXg8TGhFnP18pbQGRxWs',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: '9U4xG_25tGcQJWPFes2i82aO2e_suv6_Uu9p2Oq2z38',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'qaRHD6LlqkfVABCOtUHantrrezsgH8WfAuaaqW9DYDc',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'nY7_r1Z1S1b0siRUsJaIeBA_Udlhr19ntN1I3RvVLTw',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'cpxvqqzHJw6fes02YkY0Ko-6xRi9T-IdD1Y_isZ8Gqc',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'jTX5_Up1S_1cz3J03xeOj-ZTa08cSjfWf5KddejRYrw',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'yEvK3gvk3MCT8RJPD8v88BFuCUg-GrmGnbCEjU6pv3I',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'MyZBquKRYvsLAzPOFKU7_Clk0q0XZ6L6drnFnxjZruI',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'pXAK1UzuGpm9BAL1yRfVmLYR7txrBo_xKkRVZB_1yv0',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'EwzPjJeeo_BFw8LkbCOufbjA8_inmVCwWBseHwsUTZ4',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'mO39cyGVM7haqu3BmMf5c68tyE1WBV3flvL3zGeXXIg',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'Re69XSHEc_oKB27aJfT1VAViWBFD797-E3T1fz-uzk8',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'SuJLLCTlf3ArqgRmFBOV2uU1jojo1rjINot7Al8A944',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'o6i53CZHIJCqIUpfcoLE86TLPdLIRkh85cBcNrbOk7w',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: '92kbvqIMFG6qKb3gKRBV6bbK58bJZSaB3Ls6xkKrnM4',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'O2UXGoDqbsfJcCBWz8nueg2SzxBEfZ47O2gdYf8nEl4',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'Kdlcmrrajq2XAgIUung79jMBMmXwK4Rku0ClAwSK2dg',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'HeABJ17psb8TBcG2yAPjzGtgelUVetXxavCbP7hJcxc',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'arCaU0yS1kEMo4d_D1lO0W8wFnG5QlLSzxVf88KSNH0',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'Q1NKa7tsxuozahAEN7iaZsnVxWz_eoVYRu9EdP7symk',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'DNMUtSxghL7h_Tv09pLTQ--WlfPjWRHn1hI993y4-ck',
		},
		{
			cu: 'cu95.ao-testnet.xyz',
			id: 'zC6Helkd-vWxh7PceZ7LTJyuQyWVq35qIRWfuIA9E8w',
		},
	],
	'cu-96-zone': [
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'ideTDHhvE1Acg5d_Guqn8SUdEa60NA-bVQZBfctBABs',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'aCIusUrhissPcyFNEVz3u5jzTcA409NCrfJN9swm14k',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'fyUwkZ5EHZBVepN1XySFLghGECMqCdtrot9qBXOAaos',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'gzChx0bMlThl-abjBgYYVkloJth7oo4CIgaiTb7erzU',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'ukPksOQWKI8SuF6Mdu5qeLh6bOYHrPEmOxj7u7x90zY',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'yPYdQE5nkXaignKm4NJXhJMZ_BSdVDpOFc3LTdYByCQ',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'DJJYMnDd-4SFfZp2ruI2f3k9B6o0MaTjrvR0DiBKdmU',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'lvesqotPQa4yib0Nu_V2UGzjplr4-40BhRmjMHxKaVg',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'QxyIGe4AFLVrUsJJ7_GDkJmaGK4lHT5PiBDf3WM8aKU',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'oph9p2OXPDS6CHmcoIqyFVmfNmmqAiWGmAqFJUSWEWY',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'ARDoJz6pE3jn6Z3xolPYqE6RDmhvdpeuBQ5oWCpZ6S8',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'EcFcjcfgN9oqkne7C7yFJ2LoVhg_0d17vvxyw_kQiwY',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'SYzzVf6j2qIXd2_2TSFhvwzF4eTBDUOghxqQzZtbzq0',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'V9EVmxO3B-pKQbP2OHPGhpOsKVnKCjKxgre3XxATW5I',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: '9J7F7PPabGr0yDJzZF_zWr-mWYEj1SI6oQdrMD31f1o',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: '8SlGO6jhFMf8xARRImS0HUqlrja09ZDNjgGA8OUnNbI',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'Na6BlNNpzXAh2LguCfJSMYceYNv1mTAXT3t_dLPDPmc',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: '4mVY3v3tpJlnplCeBaP00lkV4Hz01fXfOuFmcLz7PO4',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'cuCPKGyMUvuTW2I7FZI7oLUagPXI3sAzjXnAOsSbIeE',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'wMyHChRFCGSEACHXu89QV4WgYWt6i80TEYyF3k-HCrA',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: '-9lYCEgMbASuQMr76ddhnaT3H996UFjMPc5jOs3kiAk',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: '2ke0A_FkZ-CdAn-70MpZII8eLEv5am_fqKs2fUmUBVc',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'zSd_lOsv3UaSn-5dZ_5lbU4VT4AzRnXtyv53gG6wpfs',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'BHqWfhwcU1koKXtHqKOpVfkSMkX6P5ivTS_q6AfjcIc',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'jpIZ1N1vNbXo-MRybZEJUlCrbhm9bL1XyZoFJitlsVE',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: '59N1eAl2wNiMabZNUz4zbqJy1Z5nNLc8JOkLOcH6PR8',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'eb_jZIQwhSk9_C6Ur4M1nz0V7i-y3LJMkMl2aZ2bWBM',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'a4DJxBLPtrNY5aPW0X38FLzpWXvciHSKYx2xx5E0CvE',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'M_v29dvLthIjS-dcTTOT8spc58YfeCXXq9AtQ8h-dRw',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'S_9YV48ASuCpxkUKRzWD3qCxSZ0xrgESx6FXaEI388I',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'QHD_H_lbUIf_eerBx3kU_GH3HHeURxLLKQukzxUkl6k',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'VMce9jlPTaB0JwOfwE8ssVvKn5bYJhu2FdxeabclRu8',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'zT0rvxiKZ-vZoVfbrlmglMOxQ6xBVF5qmNKodb6U8ec',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'yJLkagIskp3fOYeBYqnKOjCSgKq644FCaBKjllWvB_k',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'GK-5xM0_anHrxmUjsU4Ejwa4dny1D0og-Denp2qbT7U',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'IfGhuI9tpGgkB9i3sY_S5J9HNOLiVMBI2SdCR8aVg_I',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'e-lOufTQJ49ZUX1vPxO-QxjtYXiqM8RQgKovrnJKJ18',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'foxISfgAPG4-EPpmAvERr6TOh4AUg9Z0oEH8jHDDiAc',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: '2O42aAF6iZ__A0P5KcB6LsTV_ew4LP5BCCZL-mj06qg',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'Kei5mv4zUYv3aIkK_Hcx3kDeUjLd0G1fXVJfv4Mj9hA',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'r2o61l6B4t9nmN2chfzMROC1mTbZtw15gY6CnsogegI',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'FNVfs6PLPV9vzAht1sEfOWGCLOGTNVwOJCeq-Kslb_k',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: '3Xyw5vFSSFjEUgGQOU8mEIUirQx5dyX0nLFG23rU1b8',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'eOtb3ae03GYKt_7e_-JCYn1DB3ZjVo0qnbaRp_h791g',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'EYJ5FzZKKkV2s5Dad4QwfgCdYWh9Sgy4Gs6rysh3MKw',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'CJzbDxgs6VyBbLdfNDU6app4RW5Ic_JBQINejgNxbio',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'aD1hfIH8RcdOCW9A6wzqrYOZ8S_bAZ8MytwXRctXsKk',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'JzRoY0kBYi4S7vYvHYt6Zo8eL5ZSp96wrDMEMWAeRSQ',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'F8ceV8km9zheWADnDGceEk1L5Zrl624mOErn_Hd2pTM',
		},
		{
			cu: 'cu96.ao-testnet.xyz',
			id: 'j_flEOIZ0rGy3bMk1bBOmulscDykA2-9rduUxCvj7g8',
		},
	],
	'cu-97-zone': [
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'iLwiub2_EtYn5aP_G1ChJPPAxBQLVdyXdFkDBCfLefM',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'n2DbyGJVMMyZuDt8zDTS5QCfo4j1TRRsCEU9oj0uJ8M',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'Yd00NOQ36qqUyQLzz8QPVsK2sZbKBZkQ4kBE_LfbpcI',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'OoDvl5Qx1VM-zdsERUPx0R9nyBcsL-Hy--kfeZFO8PU',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'LNj5wqOmdkMIlmCd_U5sOlxruSpocIuTthTRaqQYVu0',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'hpZEoiu6-BjSzdFLVmC4oqNvKTB6NPHrxw6HMueUEIs',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'k3uyZZY-5enuzxwWuKR3zKIHalZG0nu1ASba75RstNM',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'KllLVLoZFPCaN4CSwV2nlPqgHm2jdrl3ga72sygkVIs',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'rgi9cIFTlu3d9k8WpWI4qU2dilanrKnvblQPtyS7Inc',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'Z_3105vrhw-RC95BEBiwNflEzxsjazF9khDUM3UIzhI',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'wTTSTTLCbuIFQB8K_NT2vvNOP_pkl7krmI5xJbo8s2o',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: '_Ry2IyLCo6nyUaOeDg9ZGlN10L846RcK5drVPcSxMBU',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'SWQx44W-1iMwGFBSHlC3lStCq3Z7O2WZrx9quLeZOu0',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'XdGJ1QZJB8w-ZKRr-ntFwCXRN1DxHahhrRQfCmL1i5I',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'yxRI6-QRPfwXPFmgo3ZqhNY4C2mAN2YvoK5UBiZSWTI',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'QB1RwgRakKgT5td7zyCS_Kl5mJglSbB8wrBPcxEzHnk',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'wHZxDbaUOKAHtK_yRy0j7ntHfE3c2RaHnegkj9FVDk4',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'BkHN7MjalkEsZI9Jz8PdjYZsZUgrcxSbCubl6CfRygQ',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'YMsLwcjo9_w8EID9zFUQzvctKOxn_N0PABKWcmbOoDA',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'JcRQe9R1juvoMi4pLRL5XlrQ9_kwBfSXVLdUxAy6znw',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'kl7xM80qAX1GLXnM5NV-TH23uKZm8ZDK1i0HztY1UEA',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'VHGTjmFA6lRQOioIXWtYs4OwAa74of_dIN9ALNDr5Uw',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: '6zN9APrBSkYA4ZYS15TPZdzvfMplMUegj83GXj3sOXY',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: '4-zTPUNhWtcLNnDwIlRN7HaChJF5gGuLti1GR38tTlw',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'YxpTbRfMhj7AFcccGw0EHWGpNkCCrAhADpQsR82JEiQ',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'WqetVxOWBsntCBGLXhSdCIKZhIAr3MWfOPsWt1Pc59A',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'DbblNXiGMoj5Ot-imeC35rD-ZjAJsyHHbdg_sN2g9KA',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'GjhyyTDrl5cnDYoAzEInaQJSS8aFa7RVVwDSGExovqU',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: '0U4f7wW9_p2Own-yzWp8u3phwEBuxlybwWRdeGOv3lU',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: '13CDZ05dxPMw7xW1qy0egem2h-8NJLKMcGLbSKUybTA',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'y9khS6enaCGDcK_Z-wT_OAHFfwO61MlGYCkfDwnkMfY',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'bLltq4IiXPRxQRVds85Dr4qR8_rto1g1VhLCZyvgaMw',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'abuUaurXF2NPr-NnJe55U8byBZOXixH3DDHhzUl5RKQ',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'Sx98GfMeAPRcmDrzCZl0vl_6XtOPwn-TqqTVxiHCuDU',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'Vfl49b0LCVXfL-CwWL3EyJP3_Ddw7GyxmBr5gI0juoA',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'qNOA3sAJBmbncFs_DWt07U_cIvFi6ED_1dXIUMis5So',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: '27tpkiWzA2nEFWX8HpMg4RGeCUG6ZVu26KUHJpoUllM',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'ZFqzKNV1e5AIMXlhSNZeRcvyrEmKLdle1rPw31RSL0k',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'TEsnqMiV3dhOKBi-vOXht0cZvOJpC6SP7jIDqYvQTh8',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'pygoqQhf84rOO7_Q479QTyDp6w7UJ7vjjwAoM6JSX-A',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'vUpVIuH2XZrn65d1VOHgBQjQENLhuSm1eOEk_3fO_Rs',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'yYfrzPO4dxN99glGU3M3Mh5yI8b0LmtD-Ry14jLYRzI',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'iSAnoUfF4uyq9ofUGg6309G81bDAzLPxnzisirRXXE4',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'turr1aBJomoUbgPUsxAL3oNVsPfNerWAR5UpQONRUEw',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'l2Uhm-z0dIhOYpfrN0r5DpUqzIAC1veUSO8wmTfba9c',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'JSFrcf5qj5b7zZQrHxvKMeRJURhu9-tWZw4aMSe-gug',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'AjI0qJGiAszjwmi6JlW5hf5FmA4PtZCAz4cGJwvclsM',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'eb86eQlMa5w8b3w0GiMsQXneX_MfVAaOZ_G3mBwrxoQ',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'IbYFEUhq6RMbZEpnp1qIiagF3sS4UOhXrtQg3lNSIQo',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'FNvdxGbb_ZowJyu9ChoIT6PotEtJ-tRYdDWOODwaMG8',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: '4WM0fLlHIoA6e7Enx-0oBEeN4kQDvQXkB4Rx3XWJJZs',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: '92Bto1ciOmirbxhokowaIvmA9n3y9d7NJGhDKTAgMP4',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'Q-m1C__tJObZCydD_fTcds6np6gHRDDP05PfkCSSLGI',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'sKKL2WGA-0bgoGWd5C8ymMZ4cNIRz30iaKo25okgEow',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'UpTZifs2NTAi_RLdrlgkR7bf21EOHIPdervhb2U1FSU',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'MOyStbmPIwQ21LUIjOtmiNZlxqw0wVFkrQziUbVqu4U',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'gr0I4hpM0-y0y2NeDuWyQfwSnRwaTj1adYmHmM3flVE',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'RdzKe3KCcLzwQR6bMP05Strg3PAlnaguyTTeoW9vzDw',
		},
		{
			cu: 'cu97.ao-testnet.xyz',
			id: 'wDfCERaauacZovKJ6HjJ6F3T1LXl3w50nL410hXKz7M',
		},
	],
	'cu-98-zone': [
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'tjGCtBYtsCi7j-f_-JSBDanhNuNHz8qtNdoKcojtju4',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: '2kv8HYWhrnrPYZeNpfUTwpBbO6jQBIZrLj-RVCB6wWk',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'KUphOmWCnAPn-MC8OuNlh6PBuGQNSuQa-7ZCDcTNi0A',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'If_iCLHUyN9UHpcNXfklhYJiXPfsofux8gGbU-PEshI',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'Y_8M9s5FUui4_VLqViWqn5Pb5m5Uw3S9qm5pDOS2iy0',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: '0Ghd8Du2yz_lUnHZxv9H1C_QLSSF65T_fT3W-WycsAE',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'Ay3KRVx6N73EHiwOjk7Jwbdt8uLyO5C4xEQQzzRmcN0',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'DDW4PfCEhbzgUZr7rvaWo3d9yer2tsa-djrXLfGkNis',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'WwOUP1D7m-aLpHmYJrQsVw6RA7e6A-dL76606hY1Juw',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: '7W0Gp8U1ws0BzHVMdBkb1_oCXSsAbaWWYTSCX-UY8V0',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'uHbaDD1cQk3EW8-Q450yZeHvz_4LD7yLVl4UmvH5Ceo',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'G9qq3qKx9ZcWRWLbjJxOHVylPBNBJTH4zyQhDlG_WSQ',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: '4eu6O2BfQb67_54QTw975hOCCLZlQ2xgA3OvZa-akdE',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'agpEeewRcRyDadyM708OsBmGm-bncctKJ5CiwKTObXM',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'qIfNcQafslyKhSp5dQuW7DRmtzcQCBArIL1KgjMzP84',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'Rdvnl1drBB5MF1jTIzlGsHG-TpVbvRnTSHCJZmy3fBI',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'n9aaGTwhWtODKOxyJEpYowGrai8Hr-VnIC8nwzi9qIA',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'JF3XwIlE_jAWHEiJui1HIZHG7qHooyBq1GebLyD54Qw',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'BNOGEgv9BmvKG-LedsRZxgRsiQMRLUAPZcHIPyS6gXg',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'rokXTNVbe7IjAE-vgZ7mnxcC8kf53jCjLmaHzDboimU',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'yHyLvQyBsIitexI9t9oT4DvWa31d3Pt6KFf3o28JOnI',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'E-0l_4D1DjBfpwC5GAm1Gui66CAqGzAc2c6s8xSwhK8',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'FHoOutf0Ua8wM5aRmsY497FBHzCsBmeJ8PIW37fEOvs',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'iO2BlTdFbEfPZ0SsL3wRMcv3uYT4roHhO7VlsrV8O6M',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'G3W3Ry_80hZas8_4R8mUQYzLJW30my8td6rTeupHWi0',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'UeAVDC96AArEYUOKyXLD1Xp_pGjS4Q-qUn94Yw5uB2c',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: '6xnlcNC2Y31N8o7KeususK2WS3K3kUETJ1SQ2PJD6GU',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'cPUuUyIzLpSoObYq0nwDXv8rmKKDbdvWFJJ3_ShH6NM',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'P-AqLvDjbWCcWXkNNpbf2EgJy7V1d-spBVHBrvQ10Zk',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'IBEgTkhuOV4eOxQMG14Ete8u6zoPBa7kd6t7pijpLLg',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: '6gxtZkQ-R9ptNjgCmpXsaKJuKWyL2W5PYWeR33X-4Zg',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'ids1qvtVW1yF2IqOvnHpK71r2h3l7IVgSoLD5hHZYhQ',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'vh4rnneUSQdPawwabXHK3KvTCNi7gfI0NZe7STWcd7g',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'hngDB5if77nmzkOfjLG79Pb09WQJvm1aKv4PyITyldk',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'sda7uk_1vYxWk2_NhGcFWPSPj2ar4YRh8cE1dRxniNg',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'y-pnChvDVwuDLUNT0f6uLoF-d3Sx9P_LvgyiAQ2LfOM',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'bxFFZI56Pu_TAarekTKBHdDDPd87k4dK3zVryaZAFNE',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'TEogbYGMurePBSiTxEIYpZD3ST7dGHnF4WX06LkQu_o',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'A6oYVQWfq0lzhB6zWxiNuwo14Dl8WjRuRTUPJP4arjE',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: '847Uy9oMN62uF7ICoHASA-exNqvu_RoaARR6BHyC4UU',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: '4avsSl5N4h2zp4Snt4jm8vCqITSzGuVG68P3yICtgwk',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'YBrir_B8pYfguITje5NAkkkO95BnyNjsZ3FfURmeyBU',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'oLByBnPATBKLp5RWG4KYj5oUtIgI3xiNM9XyXVh3QmA',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: '3ygDP1YnIVobWXsdOhcTW3xIZyc2zsXl8fhOUM9eUgo',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'ulchLPaJAtR8bqmdKH5Owf1u5kMrr2FXJUlZkXvLfwU',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'ntzREyVP5kn04iGnHlfxpcCSlS1AYmCIUBhxdNuguTA',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: 'qD2wtM9XRWM2LFqpxXb3PdTnxEBlT4Sn6UKUm_MAKG0',
		},
		{
			cu: 'cu98.ao-testnet.xyz',
			id: '1WqL-3660juxe-NUZUgBwcNZDV05TSnqNSsZe-qT3_I',
		},
	],
	'cu-99-zone': [
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'H3-dYou-mKqwPSZ4kyiKaYC3oIRCbv386P4UykywrKo',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'KtbkW94hxST8Lzoan2FWbKMlQO9xYCQ0QAyEsDPNgCg',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'PPpmQADCEl-rVHzjKT3R5t5jkatmDiaudV9ex-CMTLo',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'io9wtOJFuPXxlPbFRdWLx-92QDnpjQNcGVwl4dw_vs4',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'wVesyoV9dL__de0LxYbxK90taTuzj2Xpw5HJTWAYYkM',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: '9aedylcxtN4fm7YNfN_nWlgpH2QSBywWQmPN_nvcXkI',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'ilDR8jeUzQ9d7JNhQWiYf6Zz2HS0HdBajL__hhVhpys',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'PVMiaeZvgcUdYtSXdf_J4FeSAWjqfEF92O8DSe73gUU',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'y4zdkfpt4FR8VnsLIn6PWQTq66Sy6sF8RYJngq2XwcA',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'gvP6sA6LMub41YAhnWFB1L8nw5_ezQdGy4a6m0ZHdIc',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'RucmtYo2BZYjNluFsFLPftiFkyHpYUNZJg1iZUWq2g8',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'XMm-SCHZA6iMdhs4PM_ciUUjO92RYFszdu5DQfXspf8',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'zdMo54-GkLFRKknadKDXMFOy1gGu1HAbAqugdXw_Lfw',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'gKm3vCcrtWJ51DTfkdZDDj0Q1_EB4eGqlafOMAbRfhU',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'NIobBO2UkOvLzE-cX-NuRfw_3he7pJ6fZlYX7kUQR2o',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'rziLJbWplSn009BqVxC1ESqS2XfocZaytcKH5PPOVLU',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'hQ0doeLteIOwQPPi_qrW-hB1pycaC-i0tsS7tu32z7E',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'n7xUgLsrUI-jCKe024NQkCNk50nb6UesnEvc-1gpwaU',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'oudDA-JUZi14kbKFIhu4X34qGYHbtZnHdtYWEqbtkO0',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'ynocbKkonWqbe0Km5szGU-6_WpU7w_3ldHVDB0Hs2CU',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'X-HQ1fLMC2h37mS43Fraa1dScujZiUxyAosJtzStpDU',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'YzVQNkgE2KsySqdM7VkQnsD-GjQWb6CM1rbG7WOXqnU',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: '0hHHd4UIWzrv8BGj2k2s4szXaKRdj-cxAKcZ1skeeyc',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'ONJODkttAqDUqHHrmRKFsaUdjDKEnrhqFYdl52AUiXM',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'eMMzdReRwl8oz1aHsmxMWFRByhfZUO_ffEh6ZPOm3UY',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'YSwRwVHGheESaZ04PhBm6RzfuoXe7Zp-tbOFRq4jY1w',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'auHoKkALFDIb1RoL32z0-76de3mISxB56BhDrRC6DdM',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: '-qNijGfjPF4ZjItNhV5scKaXJ58zOAHtRHNBZt2O_GM',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'xfX5hNQcWTsmRgSWFDvNZxX47iV2r8rAUj10TsLTWAI',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'MEnTR1qBmElWg-RFtkMXWABfO6KlPLBQgEeMqdFG6OQ',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: '3D9JykpMHktNkQoQld5Ohpq_cvjc_6-mAunV-3gXjxk',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'ndgDI5GLmXLjB10X4L87EEhZvT03k4KowK_2PSJBnTM',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'qbRx0KyDMcQ_dZ8TkBurnDZkhZrIJo0gk9Z5c0IFc4A',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: '7sdsrNVLvGli6FmM4sSMJ3WObfqoWcPgf1yQ1nEoLbI',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'mWlG_nw0ic7wHdENE4tYmDelDNdB3PvvLl9dzuNcA00',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'AVvCwvLwDVV-ms3ed8ynis3QgHmH9KbM4Qng9fo2azc',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'O2dVqweN_DRZET5h4ot7XWNiODUYToBLUAd2Zy0-wlk',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'zvIaY4CqphihymeJ_yXAY5EEegdQy7q0ySTX4ZZFN2Y',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'WaVlInhI1Zr1jN8RKQXgRSo5ZcYKaHpmOf9oQLX1J6s',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'wbbc_ywC9ZmRNblYU5-Tb7G5dHq3UVONz0qTXnygH8w',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: '4sOC2IrjbPjfQXLVSu9lP7OYV3hfsgxQ-H0kro0jzsI',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'eCxA6vKyEKblkRQtqrbfoYI4ORk6WSi6ydd5s8FQAzc',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: '3-c0B0WpZ6_4OfUPT3uuZ4UKc8p48HYCOS9h8AHYGh0',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'l2IHQdxOH-BaXmIHCw28WkQ_k16TIBszDfl_HKstIjU',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: '6wpRYqfWiL61_anQoGY_A52eFjLk07DqL86RoUMIlKU',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'eMz3IxENpbhwSeGZFartOqm4DRqgly_P5CxaAMqwWo8',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: '3Zz8_rgI5GXnTC-Jz3zwtB_iisofpdI-e0dYthGkDgw',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'cBHBq5FJx7WYBz7_DpgOr2gm2XoQawJMhLq9XsSeUJc',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'Xzx5QLaKUIf5I_YgfgzYiaC43Fr4htU8HUwGL3s7jPs',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'DnMC26Dc14qH2t6Ot46BDKa-oZUbG-yQTvmnD1bHkrM',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'Na7PDx_ThWVAf4yRVycVLJDCqggfr0UGKl39nONhyo4',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'uHYsNF2oF9B2YDLu5rcNJAbzXOuwMdeTUE8axdSgHCE',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'fqYqNCwoOAC-_yuArexC-thgYvtNbVkOUwcvWblWUNs',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'uDRS1L2HCFCLB-mqqDBcviieYFqQ6wLicS9p2JWhYFk',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'Us90KVrgI8aJEP7oiq4r3l4VE1K3m5FUli2yhzSvwxc',
		},
		{
			cu: 'cu99.ao-testnet.xyz',
			id: 'JB5yBW3DzMuOEOTtVqqE1wNw37bdkwDU6F8tt5Kw2os',
		},
	],
	'cu-100-zone': [
		{
			cu: 'cu100.ao-testnet.xyz',
			id: '-j2ltxNOPrXrtp7DiPUJjprq1ncAnnvYIXVcFw-4Di8',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'y0cyQ2zpcra4W_od989iH7WDzin5g0uuZJXU09934Xw',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'NYRzXg57nRss-yGUoe-0gqnK391hF8oY0vgUNi9e3a8',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'C033MhPZ92ZRspiUliWb-3IWKOWHxEXCwCvPzLB6NZU',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'zzL-TLhD85EtV-QFAiM1us73Ug7Iy5hoUKToxEqISY8',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'fD00W8FBg07m6p-tWNNLfG5bEqyKSlf7xc1UfJJZ0Cw',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'm6ofUqhiXl--zopWcnxX-o97OAJJ8F2Oe5JyI9xxUPk',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'tGoAg-g3KnwG-_sDM2DNfsEYTiFsOj21Br21Ukquys0',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'qaUAtJcVY2HjYdqjDweTNJtKEtXEEObnr395uV428mc',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'hmBRncGuMohi5FgwtvQYO0rp9N_3m-JbHpF5D-Bm9s4',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: '-OJMfCh4qxwij1oNuUNdYmTl6lddhopOt5f8yxk5qTs',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'pG32oO-cbIC4aW3UCzgo6L-1WaKOoKxvNG3M8AUmgb4',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'QufvgHQbEwtb2_Lfrz4ejcx8msr9zS1yW5Ah-mH3vBo',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: '8SY1BOmXvR6OEFtEK60NA8vQRPnhkmoqypyhNprSaT8',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'FkT_mumUhh3QVlV3qmDfxqoV0aVuX3aQw5N78Cn8deQ',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'q2yWJgrn-9JWmVnydxQ6AKQxm_FRzqcyUDj2SFI4wfY',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'uDfIcWEVFkzqQDpIa18NAfOVbCJtRqfWsEn2CN-W0zw',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'hMsG_iQmH5k3vaVJCeHEAS9De-iyvY3RJRBlFbbyptM',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'KyJVZe7zZap82qtPosf9IHndgpXEDSxkjwNGQd7zkRI',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'eFJ4wjIGMbqZ1Q4wMbpd2RG4evZVB9-OU3-JNw2GQUA',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'iuQFqNVGwlVH_LSEF16gvMxSjWGQkL4kr3jtOkmDaiM',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'Q0Gty6Zv7EMUOymEf7vbfZ971eqYFKpOfWIO0jXVCHI',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: '5Y-9lfwfTQ41KECO7aLk6gCetxYAkTESzSmscsD2ibM',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'glnbP3JHhaG6CyeyxtvNyPKa5T7DFNL0U6FukfN2bZs',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'QtTSvyPkhmGJ0pHI4aKYpkeCkrdzzGebM1bcJESAJx4',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'kaKX-WblbPwj9XoHfeyU7Rb2RZC2I3iT2fG-wTYk-Pk',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'ax6dSPBJVND13tPhseMhSiXy_PegJNp4BA9iPhOSRg0',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'pPZzjZxMbxilAoqWOg0i_4JJuGR5Bofo5YxRGr5CjBM',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'PZXQrT5Zt3lI9OHdk3f-o4g2XhDklaWv4SLftq1_IfA',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'J_HJGpcgBPfta6P883tCEbryo1xFzRnlaPi2sbfoExg',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: '54BVXwG8d2RAIEPtepUGNvGBLStaHE7K8TiPN_Kn1qs',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'ojgfjkIRR88TqHiboPAMsBRmy59rVsUP7K1FvvcUeXc',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'hmb0_s6O8-v_VN3g03J-EwK2CSHwfuXvvwXcdGtMAVs',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'YyaEMMelJdZf4m8NCLXcMELSF1lufZuCWX5IXU-xUCA',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'Bu6VQXvx_ncNdVnp7hg_SZAsdqZ-AUz1UJYB5AISeE8',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'D4kWadABTGpkz5MrS2fbMub0MFa-fZMedkdfNGcL94A',
		},
		{
			cu: 'cu100.ao-testnet.xyz',
			id: 'i_6mPvJoj-kU8u7cbp5fhBDBMHt-HQ1d8HH9Kkdjio8',
		},
	],
	'cu-101-zone': [
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'BKcU2COQ-AQ8L0u-nO2CvKzs_vWvmv9nOZyjXPXaKV0',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'f3sxttVwy1wq52KQlYb8LLHvKAyevD4xlTkj6S6s4UA',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: '3r8r75UGRzPR7pSrpG1v_SUzJnXtZpJto5MQyr3O5ig',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'muFNPJdIJ3qgIZk6owZqy3GOSYwbBVvBa7tFf4git_8',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'SyXjKCRCLS1IAOUoumrQWdyEQYBO0mHIBh7nPM_KK40',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'WA3UJJ_CPv3Gnv1m0EZYrdYGPHt9-dq3zknDkWc2bTg',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: '0dmoqoRSVkPLRxaARSh4mncujDOJBqWhaQYA1pSTOqM',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'HSQhXReCxo9HUtc6pRNOrsMSqa3Rb8PS-h1gA9MdI2o',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'ZBK1tbORAR0HL3UR8GNmbcj7lWq3PZy9PglzId8BywI',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'MbUhpM2_O9yNZVsjiCFC5dSrgrtlyhSM6fqkKh5LJVE',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'LCY5aoSSv-AveZPFJs0ziW9uJnBeXyr2b71zSw3xsgk',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'YjUsmirSHnhdnSkf3TecXviYOSlmC_6rElk9QxNcU3o',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'P4nqkkFLcz2p4HoxFWrXpbN5W5zxidEA5w6m2LgiON8',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'Z05SNt8fMxOYebWKjWMb367kKfL4MPrDEPhuz4By838',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'SmoUKGfpVaPL0ihZg4DaMLUttGf3iwsFu-L4b8MXyuk',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'UvHgkJJp3dKvfyNwI3HpL-60vbD4D-7ypUmo_XLANZ8',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'CdvMgtqlqbMoXREKAU-riO1NFbrASCkNKrVXgMAhu_o',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'ipWOwNKDiGW-MTVpdAq69Z2LuM1UT2iFY54STSjAhM8',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'WPJNEiyvhd46Ilu90MJe4g2ps0AmpLcDI_uvWNP9lvY',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: '63yzsjDkBbQhvU1jT-t9wFjHGgMPD7DhmIGXsZhE5rM',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'dBbZhQoV4Lq9Bzbm0vlTrHmOZT7NchC_Dillbmqx0tM',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'wmdU_N1ndxGnVuQae8d-emKAWcWebqDWewGE_mAmDDc',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'RJdhPe3INNTCNSazpn3I3EuA1XqerCL1XV9VPSel4BM',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'X_fFi41jQTb0HV362PD1yH9Z5SgN2ev5UjIBH1Xvnwg',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'FxIJtqzz8jH-aOIn0g7_RRKYhcjMAvGpsIj2TIyDSoQ',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'fWkFihX-rMa7S1TcRw9M4hEkDS6b7ucQnR1ipvVSZbY',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'ZZBGpn4qd9dj2WbxEHwy_o0jEeDSlXLrq_PcfDh5Iyk',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'Ttwh4AbQVrd6HGGKwuiQbl5W8cPXoeVIEEXZuqpzUBs',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'v6LUleDuAIo-NnEuUvsH4V0LKuB70q1r1vSPDjponaE',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'wB9QQRxG367YeRWsd9wZUbBHWjXcWqJQE20AKKUMOuI',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'qcdYZTJZHsn5JnwjOXLzO3P7HfXMHvpH_qsvcipGNkQ',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'qounpCQGf8jTwAssEQ3-g0t-zUKXxK37StQ0sJPKlao',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'tI-LxxwIf-wVBK6mP3TuZRwOp1yH4izAbG85vdyhRfs',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: '-cDPTvDCDqZs6_6wWAoDBxvmHHnwLOEElEcxrtsu40o',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'jAfCEA0sEFJY1iMN5PTnrpZT3NPyBGPtwc2ls5Jnrfc',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'XPZPZI7aNHCUXdA2TIzfukryc2nZOJZZQ44c2lPHX0g',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'JrXh5BlsTmFv5dbg58TEwrMwGtknUUxYOKoWlJVaNIc',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'vyh9fA96V50t6TV_s8P9AwJn1NRO82rUVOVqX5zZjns',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'AfPXUsN7-_NBEmE6-Z0dSXUKiTKfn64ouGX9vh0Q-Oo',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'uMP1T_108vLD2yzAJ7rqiW8M0LzuhgDNef4yHfwEmq8',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: '7eU_Zo1o_2oh5qr4rA4Wm9vITc7B-g5xJlcP03DAR74',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'Aeqs7ZawUjEn1Fh03ei2CyuqiXnYqnpoE6qYFat6NCE',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'TKu4lwGJFxNfx1WRSXjDQvZpFbrEZv1-89G-IIGaw6s',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'MRCPyQRUX1sJiSRx_PE_D3Ck10ah1IO7FZBQfVIbkcE',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'iI-Krjjzl5-21ls318NtK2y-DlY2jw-GEDd8q-KcK9E',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'maOiQo0zMcRJT_8vCxhl0fu-1Ke7k8GRJ45qju6ENpI',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'TK1R_jnPKHpIOgufdpJ2pxl34lNUdzuhu8xDbrpAUgI',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'LT0OJ3jmIp1URX00oSnkjG6j1VAgTYLAWFvz0ZF-cpw',
		},
		{
			cu: 'cu101.ao-testnet.xyz',
			id: 'zfustIMHrd6tnEfHhf_a0x0nftffn8DG3wLvdQexNnE',
		},
	],
	'cu-102-zone': [
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '71amDaojRUWI0rjedIhZ52zWBCR3VuCvERaYGM-PAqM',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'Nnu5iyzg9J-ngW7QbPJvQL0N3g7iQozpJ97aN1ckCic',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'aPwK6N7T5O415BJAoFfURn7rBhn09H10wcaTqARPILk',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '0Xl-oOHr6RSi0wFekwLWQKGLy7XT3_pQkKgQAGJe1W4',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'V66rlFxYVhlZpO0V8UdaykaWj4wGNxR1lHnmrwd8aOA',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'hVE9_FUl_bvA1JVBcUnKlW6dk7EfugVuElmjl4j4KWI',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '3MlXkEhrwZdmhepA3PfNW0WULNTWOBzuQURAMk4xhrA',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'VrmKt6NtK1Ozbk4XY1r8XWhH3f6-mswBHmnigOElpOE',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'wM4qxekXKfIXYJHUKADKnQQxCwp30_gmJjER0VbvFyk',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'jIOChu3NzpvTGdGZ9fRdgp22IAlH7sZ1Al_ggA_gPtQ',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'L4Mnpap1FhSsu8DKVlG1o0KD5PFZFCKZyyHr_5ubGvI',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'bxYslHYwMmZgyKH4Z10qLRTACL69DhvmxXCK24IzWWI',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'uUg5w52pTruKOWU0ISKlO-hZoFyLBu9E4f-QijDM46g',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'BK5QAAp8LvMt39M7oMrpSxbeZT_9BXq7USPXfoOSCNI',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'gnHt1DrCKNQHavuIhH2AVJ3J-RzSWSKPh44odxfc32M',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'c2Sq8RwzBgLUW-btEA-uNBGwhcL63VZ15BpON9P9igc',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '8EFxOV1PL_mJ31G_2ZQjS-2-Zv1MYUa2sz0DRnIsn6U',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'chgG1S0FlPFXZoieHM9LaFoNzuJ8S4XUN3u-7eOw9Bc',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'Rxtywy-ciSe9QnvbEWuVwNnUeCT86mYJc83-KZqfglM',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'OzMhOxzZYP9ErYOfwoDmmBjeRUwUZDSQ9t5ECLaW6-U',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'hdFFj7Pj0pfF4GW9y85I5lMYHkSxnMf0bDZ_yS4v0fs',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'hsSAgydzIy1e_QeUsPUSnH7XOI7mOb7AEH51gxm0AdM',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'WEbdC81S1LZKCLTVDDiCU7VG0L83irLZNH24aMYCmtY',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'z7dIr4VPgIg8QokWnhxoIqvaS1jLTwkcG_1Yy1c_EiQ',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'MdG1fWbOGctBzUkN6ZIHCpiE32Rmi1kulAwTH8Oq4mc',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'j9N-x7K1Vd5VUI46647mU5iKqHauQFkrMUJijzXY7ng',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'C1U9kIsc9BK14bVUiRQGcRUGJhBM4iUn60rAqd48tkA',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '2_YX_ZM7j0aa5osudKQZSy4DBCpEuvKppvWHwTneB4E',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'zPJKX4oAKs1WTskCootFZ6iqV451NOqP-WM-EvKC9wM',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'Odkv0dWCNbd3xOXiXxZ-gkHx1UZRdow5hp_SuA-vYMM',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'haOGUBaGrtd4C1R0io6v0gmQO06NEgWqBPdNcE26ikQ',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'lFDC6HK5wOolyn1hNL2zWPSFjbg3hx5YGUFidnMjXwY',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'cJ2I3X1A3ANPkKG-MnUpGm7S6JhL8wRo-KiH7fgab4g',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'urpN_Wx6fRebjSLZMGeQNIw8rfA6aOlt0N1pJqKaGjE',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '9mvc7UBcxkgIqnMkhIQJuiUmQJw1FPJL6NrXOb6jY-c',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'egxa97XJHvUtvnCEn_R3XJkshUMFeRf1mpWkZ5tVcx4',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'B-ZHojoAxV8eDcvx5ANrzy_ZRz2ToTDO0lNfHlYABQI',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'lWl_DW7gBkBzGQfyZtn8I99l7iHyNGt8PgwxZAZxIiY',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'kXmWujvzdNr1DCf_PAmknZ_eeWS3bz0bwHGOEOeEm2Q',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'ilMKUK20gIoshtj6vNb3oKmItmuitfLRXEw8cLgX92M',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'AGs1cZcz67TRdgUTLlmY6wUozz2hQ5m36l1RfGz97A4',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'aqCuoAQvt5z-wxo0TLMIgpzuEeUQ_mjrtqyvrTmEqg8',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'gMpqbb0vGNZLjHBUFroSQLp4BX-WCJ5vIX4Og9R97O8',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'a1kOeLYXIZA5JR_aL6i4jHr2lUXnIzh2yvHlC2lHcXw',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '01vICCQ2vbCoziPcORBTJs1twuzgg_Lcb3hlLZamvlU',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'DYyRWYJy6EoRBAektGk8Dmp5OvFo0ACyUyWE3-ux1PA',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '3jkvaGFsLyCL0fIQKfecO6d7B6fAO8gt9WS7nKQcGUM',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'WUsJNtICeDKovwOIU2AW5C7WIyRbv-dqwJCw7mE7OA0',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '4qRJk7MTqtJsqk8eMbLEgq0Udyj0Uzh5v27MVm-EpRw',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'O8iyFvKg5BcjxvaVhoXsVRghqjh6rNo-HGR3-SEkzv8',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'lVBpnrfZFPSJ7UUEYOM6eWIVrReD6dYCt9F9i6lladw',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '3jYUqTCGFeE7x6A4PA5tdd0-uffXvIK3aWJyhtxpvyY',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'FpHepbsLl-HWGDHwS1vmZWlTo5zeyoNQoVA8Uv-qOFw',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'XhoUh5rb-h2nkOpfL6tGdR5sto2hPW7e24jd4IEnEjI',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'oLn1c--RhhVyt5aP-Av8uRJ_e6TICOAmfmMjUFzttSQ',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '1uES191BAwwSaTBviqtexLpDhRu_zBc0ewHL2gIA1yo',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'Gc4otzzc1scu9xsRq-bE1cltRI8PlwsVHidsVcq4sgQ',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '6Ue5ocutc016x9UYJbKZDO3j0KC02Mszegdz84dD6HA',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'D3kQe91oAxL3WMPKLk3iPUvGHcdMGPn--XUwdri5e8o',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'PeXuqny7hcoqEsNmX-O_WiOufrX2Dm_Y93ui703vNps',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: '1BBs3S832U2yOxNRQcbejcWNH7PQFEqmUWf11KRaQm4',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'x29dE3FCwna3erIDRSGcF95h1Zw_7dlV-nrJwtEBdgo',
		},
		{
			cu: 'cu102.ao-testnet.xyz',
			id: 'I5QCyed79pCrVVPQUkFkHYAtO4wnRkOhb8lYeBlXz4s',
		},
	],
	'cu-103-zone': [
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'Bybbd2XoK-BMVtPdGRUaALeS7ZturLc9uD5RZi11qWY',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'N3YcyBZ9flGe-1fio3rhT-Zx-1USLLReRjKpYvS0qms',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'TXnEt63RcOya8ApNQNmbfMhNIm-pmYpQBGRn30_06d0',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '9qcQln-3erh8ovwW0EmyfGdmwIGFiVyjez7oLHXbF_E',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'rwtUtU5eMZ2EBE3iUFlEIRoEFkSm4jYemM_NFDJLGRE',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'weJAZ6XvpaSvrqQ9OTxYLVuLESQdh-yJ4GNlacG2a-g',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '8iwbl3eW_sgRHT8JWxGKxLDu7i8srLEoTZ0Czk377Sc',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'TNASo-zKUOdg9PzdbB5AyFInkgEqbX4lR1IjqH-ZEh8',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'vG8Zb1ncl9OSTcLwjLOz_GsRI0UlRgK4qWS4jPWtgDY',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '51vKqeODsOu6hmwbmevEmQZjXtBXSlDKElkTcY8jyOk',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'DfN-JUaBKolQ6ITwwQGp0b3pNVQfNqiWJgfH9gWTOsw',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'egIYcNPGfsf5IiIGl3ut5-ZBNCXxBBwPSNdmMitdjfM',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'Gf8SdUktK5c8QzT-liymMFAg4mcOz6j8e8eghhRH0TA',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'x80YvVD5a_YVCBn_QBNUUuSl2yt3LailS1MNWeT2pXk',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '6VyeSTx5BnMxQr6e2Ed2v_Dfwp3B0QEB4u3TDN0LsfY',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'o80hi2LlCfHbaHw2prUdnZJjobD5Ag0NtQv4a1HejtI',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'UMsEARAyubyIM47fEO5h3kODhLDqCeIWjsROk1zuWoI',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '8hAb5KpukYDmOxb22cZW_4Eck2hlRri3s_dUgtBEO_s',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'nDQZtJCnb-i_FitEGGdro9b49yWXQQaRkGBXZDibYMg',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '25ONnDqH7Us5Wb8f24gO6djHuxVh6urOZJR2m48FtC0',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'UNOItII8KTvDDn4HIOMGXu0p2RwR_RPb2-JBhJlWK78',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '0q48ZvwN5aLUW-lvX5VSWHKh-UtKn9h00NVIESVKQLA',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'NoJborT2qSptd02e54FPuD20LjXgH7TpTyWENatfoNI',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'PTZ9ThFC_eQrplMifVna4Ciq6y4w0t_G6DQXX8tjRdU',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'ClX_vWbL6tTbU_eYQjozvVt671kkS6NwstrQB9bTnzs',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'k2XAUc3CNGPBnXLnN8Iqxj23ChkmuiyKRM0K4aCp7PI',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'jIA7JZ6B5jQArGV5Yxtnkfw5Fe_JuXJLUbVMCeE0OyQ',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '7veSm2yNg1uPyCewgv2hkqXXkKUWOLJGzjGto6pvpf8',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'nTkbzL15Q4UdFxvN2gaIqJFDbQwbg-DRZXWKaQhkypo',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 't46v7BmDlCBZPfhX_5tnvzSViEjIvM3vRkmavqIo0i4',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'mdU2taU-OKqCyPdSubKDYvwpWW29aPtdh2EICLyNGrg',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'Kfh_J44w_ViBHIMP0g2DoIegfDsa4Q06XdBIqgm_g0o',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'Xu58wlMOkcKgcOlFbMDpOOQZ8tpvT0tD5F4rgItybLE',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '3fqBbHOmOGWscly1zSDir7ogabPu57xUZGexIT5KdS0',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'ubKPtnI0mrugGuMibOwvyR6ktP8CEG6p3_H-jCcE9Yc',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'fgQvE4iMZUMhDHrGowPz8ifyztfOYbGrvYqEX-muYy4',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'kdzDyZS_mBpWH8RPwitaoQhC80rWoHuusq_hcuXd7bY',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'zcpIOHNbpzUFVQTCMW2786IA3sHE0ZfJhLB8JrZv8L8',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'UP9UzqGQKN9K6OvOowO-KyuRw5PAGV1XV48WG_7NOac',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'kWv3Dr_sSN2a49UJSFv9cVNvOFzZG50Q7W4lA65KfDY',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '-8ydPEOSJcWUr46_Clmvp_yYPHG5xZROGD7hpc2_deI',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'SF0L7caFcpUdJyjwE7GEXs2bN5EcpDX2RaXewjN8PX4',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'GT3luW0zRsylXM7dAmqxlv7-1SbpV_Pjzc3oiqbiUbg',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'YPLW9hNxRn0MS-oI7GepLYMayqEucc1N6pp3UF_7y3M',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '76kf7HfKwcsMGum4T7c3YRt48orhO9hvObIN1zHl32g',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'kmIdGDKsRKcSYkNL1fGxEbKX2TFncpjCM6fUVnhsEKY',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'TSf-w4ypgq6nC2JHqW4UJUk74S_gHcPVnphv-Fx1ack',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'snR3flTItDdCtCqHrJBWTV2vg0kj0onq2Wydlu-crhc',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'BHh2OlESQkoauV7nRW1bv85-HFdLb24cRmF8Z2Tj2XU',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'JbFdL1XGv1Tfq-m6GMWK-rOvCiigWQjps9T8Y0HJqp0',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'PBEkcuEThEBLDN0_d8ywkrKox8AsyXK7YmlUauese1I',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'Q79D7QpRVD86Gmn_-ayF8jrUt-VbaI8DtiugEJb3R1w',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'fCfTK9HprZuFqJOq--mYisEpMxg-pb2naiXsG-ei9Dk',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'L7rKdJ3QV1Yj7FqokIvUqg-dqU7ou12q-CeX9R7G1_0',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'Xa7SmRRBJHb8LfZEKGv2GTxODtVn-k0cAuIkD4r61bk',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: '7vTXHQK2yJJHDwFyJRSoXXU5fF4FQYLd8PjTNlHpVj0',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'lUsTJ8t0TRBmpzroBBEmJ7irlbrj2cW3tIy6WuSpY18',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'QzELV4OAvHzVYtIrH-Zu-Bd2yG95mZrNA1ipUCZDN_I',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'rdU89V6r6Cr0b8fyLTS4SmXSXNsHw2bgHPw3Yi4swVQ',
		},
		{
			cu: 'cu103.ao-testnet.xyz',
			id: 'QgR87Kdasz_3M7a356GqgpSRNGKD6Fuxw_9ixdJVsuY',
		},
	],
	'cu-104-zone': [
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'y4Fz1Jwqn6cRk47fvgTgo-gdN_YLiJ0VW2DhWl24K9M',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'HlXeWrWrRcGo1GdlvgFqEi-Q0n3PA9xWoPWz9jZobtA',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'PvqXrqB9sV8uEgIxnICJTi_VSMPerjwTnOb4NQBCjFg',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'HbCayEoNoq0Mvlv1xKI51zVZlgYeCPgeOLyVVz9MacY',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'bq3oT3JXGaxw5JLVSLCuB_n7zsa2cKiu5MT_xw-pd1g',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'eEEBHq5fSP87zb0hrtNd6WU2KePj6rL78ZwY4-zdKok',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: '6UzQoLLgrLnJr6WDoOZPT_eSLUGp2AXnZwbPxRAjYJg',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'oPoMrBmFPuWyrX2vevLqjQ4upqZ5iD-xCt6x8DS_Yug',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'unzDmXSeiVbibxWvsDmZSsma6muTTRtPnpkDlvyC2ac',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'h2wzxyK9kyJZV9aFEfmKsUBCOMrI9S8Th3z0pIrQXBY',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: '0wtPWYfjjEvOssaH8cLo6NDPNAxXlkc3v-aHYTLC_wY',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: '3P1sKrlewWb_zfqPknhRCtMR7jOiN2IeIh5BBuSNXkc',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'rIH6520lh1dkIj0aHtwl-LIHbp4FntNk_BazzO-ZEcE',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'kwRlZrUa_ntbyuB1KnctIukgNtjqtXNbVwLH8ZCGXJM',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: '_WHnhz85lLlNM3tx7TdkHaytmNqAJZvrn4FaJg-nyHQ',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'WZuXG1kHm0jJfhZYkXjc9o0Zmq8iRMXN07hIBsCpE_g',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: '2VVs5lXEy_DRWJ_B8V7UKsSglbhPLq-8a0Qv9l9AIUM',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'H1sI-zZf_p41lu0bub3yyGNX2KXl78xcuidBVF0ClxM',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'jWvy5ECCRaPi0CdRHOwsGzL5wWBqs9ctjs8y1tv89Fc',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'fD5wztVQMQymsLJ4QIu4PDlCDZNIIoIG9xrVRfn_rqQ',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'jyYiDZyCjyiN0833p72p9NW1EuUPs9d2fTnRqIVSlNQ',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'rUwqlSwEGKOsjFrGfTUvNc4ftxjnChp04yd_xyWzxkI',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'PIGCfxVagmdndR-jkpBNd2sZKBYjlcF-O9WWmZlpqhw',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: '2NLapNqaSKUtLzcyMhVZY6OZukNhx1UcI3R-9bJ7dX4',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: '6yweQX2X9CC3hL8-zsKZoaM-K1oDGdpFB12rXfV0LXc',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'EkX1YHA09mNutulrHkKQgjDeZ7_qc9h_Zl9AZvLN15g',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'WqOZqeclJBb46xsb0Vmltx3h-11Okhql0P-lRniJ-8o',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'CWvl3uWGBcgGxzdvv_3eEdp6fOUU_ikkoSh9jBGc7qM',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'HiMv4JMjMY225V2tMDbB5aCK3LR8fG4g62cM01FXQtk',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'uM_-_d7ILgAQD86fG5nUHHuxl9Z1ZcCrWUMoc7PWGzU',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'CPka7GgRyKF5uw2DeJwVHL01JdDJS_EdwmJ8xU00CKg',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'VDbzTUwoSXJHMOL5_juPJddug-LWzLvdEGb2yUawVa4',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'wlQ7UUtHx0Sm7GPt20wR5rmANzI4_vB_ZaQwq9cbTFM',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: '8YGspR_4V33GhUTjC3t95AVg2sj7FtAD6B8IKvezjlY',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'hRPNgQJ6fhtCHE9nZ5YcSSH0e-uQ_aNbeQmJKJTefE0',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'L83ojt73PnE5goEphvEwBv_vIpKovvaCVwI_80ZKAEA',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'TkCxbT5x0RDJv_h6wiOUJJ2D6YhFwdKlt5PU-O-QMAQ',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: '54dxr0DnhLWRrWyQ4q5QyhXPZeDuNXCWVmTc6iwcTE4',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'qvpkb-ZdwIhkOzDhDqJ0m4ShokZk8QL_M84KaeKAifU',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'NUIYJjw3FqiSIO4npx0TMpgRm8Rbd1yWfq4M9BLPVVA',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'vpihdUUdelnGKOyN_rET21-xvuDrjb6YMtfJUEYrRWk',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'dxsodhgRLeQjtTTGK_CPl1Pgc4euVezYyIp1RCblTDo',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'aCVDIbrdvAg_OIo70vQF9csB_34tvbVSeVK-2hgfLDo',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'dbvg2CaF6b0v82d0F2e50kMklOxuHum02LPldHT7YJk',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'yAeKttXAtuy7I7XA7sk-S25ik56cBSvCQUCBhYkyX-g',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'NKASgwpRcd0rhQZk74I418xiwfWKwYkLCYjQyXtJWHU',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'DJdYXA2NrJqpzDYs2CnBB2jES_Yue0rFBL2IB6ML4rI',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: 'EtePHUk4DNQUJPSiJ1vIolFIMVSgkr92G4Y-pCvyo0Q',
		},
		{
			cu: 'cu104.ao-testnet.xyz',
			id: '3ODgoZzi41hjvCHfnz1lskiWtmXU0u44vd73dNtAS2M',
		},
	],
	'cu-105-zone': [
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'BC4KnHcT4YnonwToJATLabIJRGIYdYxY2-KnHbe1tN0',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'AEMTJbRa6I6W6l0LLxZfOLd-dWOnf8IqpRyVtgZZDVY',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'MpsWuPI1pbi8ecnJLia3d4WL7dvxxiJkudcU9enR-P4',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'pAu5t05UzlcoIUown7L9aBzZAlwnb_1G79VU4G_u_3E',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'yqFxGZXgW71c1X0g3_SpOzd5qgydEH2XV9n9La1Kl_g',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: '7LuyK76tKJEDEEutSI_P6T5XrkPq6Ui-EL9pUPPUw-g',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'ZDKhgvqEH89vlbrghay8rTwctwysZhCSGoYza1m-SGU',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'Ftq5LMIGCiMxt59kcIuJmvE_QxGpgwZzst2ggvMBh08',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'EMqG9eI0XIz7NiDS9qK_97FNsy2qgT1XjeYQe5VgXUg',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'wcQCfEBaUnpA1anfVI1tRoSNi8-DU_AaCrqlCXj30Fo',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'bxyLN98mdQXros9VGA4VNOVpCt2eT96-paW5oZG0RdM',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: '4_zjOJp75rooSI6-f3lUwPJxwgcG1MXITCVqrPd_o5k',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: '3g1VypX-Vdyr-Mj4gv371mGlUjKLVptJKk-I8bkbKFQ',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'x6TABk92bRTiBr-A9AoJNwYP-51r3F7Z0-Rhb_7P4Wg',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: '11iqVqpzp27lXAoHVOxWEhNpWi0N0d3kl8yweUtD4MY',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: '2FJ7e2ks3qW0cn_KcfdlAOGCMSJWiC9vagZ7zc5dqzo',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'd1t_ocBxpnP40Mtze4AtNaLBYjBOJ4cTM9M5G1VwDww',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'ImlVFe3Q8jkhBSu8xkt9AqUGLX4DZxQACqFoKL8U_8o',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'Of135N7L66W9r0Yktlq3qS1jSv561kYv7KCVumWiPoo',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'gASrhcTNHixLUFEGBAwoQUod5-2_VSgfdFg01yHaxww',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'wHIjBsbFlyMB05Uau_gAgpm9i7FFAwAtDnBLDOKdD1s',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'xWGp2tTh4rilP2SvHXwSVY-bvwYJTM8XgBHJA9s2Yjw',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'Giz1PkY2KxBFTWtUBIH4spfcO364rx2KqYdGUxVKr4Q',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: '3buhrJtlS06e_jBNiHL0KfBm-y8KQJF3-ZHBhr6SYiE',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'Uvry9dqwGmipSRbTSLKMSjkX2UMcqrWRqkP4va9H7IM',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'CPdCsrux2cmmXaCF006czhdev_pYW-YWPGzoSo38_vg',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 't5oTRcyyfApTBTkuVZ5SMCYGJCST6EllBqMEItUe4bU',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'QDKJrk3pj9ycCRlWKxULagvc7KEaf9zpJMjkEDwQ2_g',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'JeNz8CwsIEBWogcSEJxkgLryI1Cu4EP2zIgWUovYzws',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'QneLGlJAZKdcK7mXjZjJU-MSt6yhBQ7VszVMO93BdOI',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'zU33-ZOFmxJND_NE4O2jirmiv4CeTjCJbTeWVmVJ7ao',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'lCBUdBFaXluJzLIe_wrQ7ZyageGSAJIMCRTG_ul786k',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'w36yysSE6-Zn896V55ybyncdU-2fRdXs8atpBl-gUL0',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'dLzhAK6LOTgu90ziVAP0NMuot2E9bQ9vBViiXs5ma_E',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'EMEXk_WoupiwkCPEoGieqU0f3xKyRFWELKKi0i0XFW0',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: '1R5QEtX53Z_RRQJwzFWf40oXiPW2FibErT_h02pu8MU',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'v7a4i0PGSSUtfp7kN3b_kK2kOov4wDCahbw8Af6PczA',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'FnmTDg9kJiKgo_ZL9itVdF9tD3KnYRQuh_9Yvo0eo7w',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'jMxhJqMTeTNrLk29TLzU1pOvOGI09xQS3kL7HzLXNeM',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'krG21WcYH_oXfPd-88_oFASTeLfeLHebrou-PBVUfxw',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'IhwHV3XpvWWKmnyeNwMhwfGGRv3h_IiG93mr3QCVGbk',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'C1nVWFUFP6ZPeXBUMgpzH24M-iEJvtYhv4RYOPrGWv8',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'x_i1mE3U5T-15MbZOySmYKI-BTMJxmbw3Fjr5wCq5KU',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'BmDOKswKHHF8rieyM99SxJ1bUNAY9-ZB1bry14g-m_w',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'jpqeDG2COiLRmDmLqPmlLqLfqqcXgxiyeUrvZyut3YY',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'NkXX3uZ4oGkQ3DPAWtjLb2sTA-yxmZKdlOlEHqMfWLQ',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'z5oZUCZNo5hothSQK3J_Rv5-YTIWMrWEdx8R7i1lkGU',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'v77ue_-FI4jjm0b5-cjqPmf87LaXs0SNNjwcgSVfUAA',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'HsfnOxQUmYsJTGq64o7MjEFslttSMZJYEj3SbJONkBk',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'qlXQ6ltM9cw7Rrv82Fiuv9m186w9s1MiahS7UhDhJqI',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'RhiaM-LP7qMaG0yShJZwu14lmlVhTV4weNp7Cjrsiis',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'qsxxz4ADG3Gw--6Vv1d6uaW3D52yR57Ej3L28LYQTsw',
		},
		{
			cu: 'cu105.ao-testnet.xyz',
			id: 'l9PudHe5ckhiKTw0OgOS-XyTIo63B1vFQPQVOtmkt_A',
		},
	],
	'cu-106-zone': [
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'LnPxORDupbK7S23tQsHqHWefVWXGk-A5-xGMFg4MUbg',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'k1SSjtVw52_xdZjPF5RzQEbKeCS0akvuUzpbV9BM_cM',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: '7NWaybuVxRsLGEBORpS8FosmhLVcAyTLovWIM6NknjE',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'Ci1FJ9QEFh7lPq1OshcD6k_eCfYC-hSUWUuQdhJ3BOw',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'XcQ-XVN4VwuQfYx3wxHTsgocoeEasols5SDoInib6I0',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'w1HOBDLHByEPTVTdny3XzbWk6R6FAz9h0KQgDBdrP1w',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'DL5Dr-ptYiVfNbltxKhwmqqrFOoovURah2N7N84ocHs',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'XgcxMw52qmT2pi4VfkmzES9ne4nYsqdtxeGASCBkpaQ',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'LX7N_O6i7RxqJ3iZtKvMWHWC8chMPNMI0dCv3sYVShc',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'TdyO8946m2mhGgooceLs9JipguLJI0MgtyUA4v3BGt4',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'O0WPt9S6HQXYQLdRty9q62VhzlTw9E-eBl48O8BKoXs',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'pW0-rkVFxjZUpb-GIBstEgq4C8hWLIMdl2MYzwbSxcc',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'c6a6TXNdUg3vLSDED4S8nngmVAQSJpFNxIOkADn6YsE',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'v0ZkPcYQ1-ELmk452E4XVxFXwtYBzyhCwjPG56-cHOc',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'DdAkEvcERqRVoi3EpfsZvvcMa8tljtLN011WsIhVIXg',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'Fl8E5-npRp9JGR_LMPySqSWYx73GhW4dE1NMP36Ylvw',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'slc1O6QA85KNeLWY0FoSOhAd4JztbLR6rfJLMErU5Bk',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'wajHI5sAoUjvomVEuugFMTZYSCJfKXMxb6HF0oS5-nw',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'NB2YRr8EDf0XEJo5PdKSqXMIpLBc9ChfHoCGgB_K8_k',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'KdSVyVyL72FskV8f3jfW3SCI8PV5d8LDvYBhcYqVYzg',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'v8UFvgqi4RHnGRpXOf8ta9nYEhqeAQCJgpd3SgSpMtg',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'n28xFMoqWCVeAWAhPAFU8KRiMM1P44e_qMBqPk3eZ-A',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: '0BNhGb-a2HsMVIVS233euVFhlFv2y34PSDEWpE9fJvQ',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'IziHEWo3S_cWTr_aGFO_cfVsDDd0U8vBPt1W9mv8-CM',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'ubAp7-8JJZ5n_kJIGzdhRtMiZAhTNo2oI1YUHS_Hk0I',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'oQynz5875QW0EPe1fy6Hj0Z316P6optb4F6It5c29tQ',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: '1btT2-QytJsb_LkhGcQnjbbhAQLwvUKCGPSMD22HVT4',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'vtxDQx59thIrSrfN7Zn8AWDz0Vy496q360eVCCtN4Gs',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'DDuRg5YLe8prwaOdOYdawRFaTFg5lhYDfn4b3Fco54I',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: '20RzPbNa1QHPQRKcjn5sKIyfDSzuk4r-dVmiTUYiEq4',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'TOgGa1Dw5B4PWYtY6RRJbMHc7QxDx6J3GhcBiaJ-uNg',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'kXetzfUqWIwlqoCn5lZjSOWDZX3GJuQO3AcfVYDoqJ0',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'LhE7hGycf-fGwnouq_w5Wt5nR-beR046xlEQ_IM00f4',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'UNbnUW48p9osgqxvOrj5ninXY74x2qm2YJhmfnRaqQI',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'ckMlhaIvnxQVBm2ZVhVkqCUfqahgl08Sqk8aNzXAVYg',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'n_SWfYsizQe-nFNDitHyOCbzMKkZYG06LZh8tuoMhcM',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'Ecipyi3z24dekt_xAwlVm28ZWL7UcZpxVL5bfQWfrJE',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'G1P9Lxi-XJ_BUgC-9NzJm1AlIgxBg9CQQx4tc_4NHpw',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'o72eXQWZ5Qii7QrCc42pFcUwagyuVwp3eE_vF1F5pIQ',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: '45F8OPxNR2vbTeVKcaWKcpzOdbCdJg_CX33qzfZ42a4',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'rqNhu66aGQhSbJuQ6y9cbYzhh7x-w9odfFY2pC_ZYdY',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'f-peIhXnAaX6CkwJq6644iI88E84ugn2mC1apRkC1hM',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'ehylEr7LJYvrtmn5BoIjX14aai8OgQ-nlJo8tbMqN6E',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'RhnSRfB-K2gnXDLLFAptykdgKH9ZQbtbeTBFRyiYmrg',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'deTzA35X8JctBn8ybiYsQJ7EnXIZid_47EknwcfMD9M',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'P5TrKfu3peh0YTJzyNYu4wwqQwJKoXy2T_uyXEMu3CY',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'hPmmc-3A4Ba0K6AiUUBH5Bo0hfAN4g8EJa9asRx06R0',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'BUEYBcILjiD8MshJrIL9BgFrgH3kKIr3DeD5o2mIdyk',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: '3Cq0R8SgZKfbcKq0JmwUMkUYZfMXlNn1styF-B7rpRw',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'MjcaLkZIbBqsA7JDZ6Zw_q0OxLcqPSYgrQGP3FTKLkM',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'W0iMBz0hNHEZgA-Lg2vAfvTqHP4Hd73yHd44wM9ZK2E',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'PzHBzYf2KkvEqWTxORlReD2W2IrPfb2ONRtxix1WPJE',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: '5ndbRn7nQiAiQdiPc7AlY2idJGsakQotTRQr1f1UFj8',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'Y2riQMDUylEp0nlwUZdWmERqKxS_jCSLyrHj3uQJUpk',
		},
		{
			cu: 'cu106.ao-testnet.xyz',
			id: 'XAoFuvqxk83tm11zNTtqerh4bpdgW_Ot78qY4HUIZAE',
		},
	],
	'cu-107-zone': [
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'L2ciQZ1fb5kBmw44tyMhkmd2S3XDYScbSp-rMX_Rsyo',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'lUhjM3J2YrgB_r1n2vYzR6VZJI4TZvfq7vvB6PGaO5k',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'CnuP6GWq97O5HMNtQmTqvDVXsXa70PErTbCU4C6bwZA',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'bLieplNJJ4ejptuUMrp8mxnyKKvFKkAlHVsQgy0GTuM',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'YopdLbrhnbHdQ55WycUpz1Z9ztoFtfJrXUBT-6angEE',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'oro39QU53HM2vYcD-xzPDNpVDjgyEcjvt3pGkY-eMT4',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'Aoa2ZMDFrJdB_bPrCF_eUSCVKfXgx3e5nbVt6PmA870',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'BuuJeuWan3Z_cN6KH6vh2eajGd6H7UlLg4bOOe1Iyr0',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'd3HwRa1lT4uldbsVQb8tRDvRtiecVuKLNCVrcZj9Lek',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'to1d2LOAmPvXVUc3PRvji7h62EEbWj5QCDFcPxRH66A',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'LC77Q9A4Rd97o6wzJql2FUmyA-aW_O9FuCbmSc5C0IU',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'dX5UzdiXPua8Rp0FBYmoGf77-4bdpOKyW9mbtuyIMr8',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'tQ8k4MbRyqJhOdM08XFLRKlaY8v6LWBJRUsh2yhbwRg',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'JJmqY-6lDIzXvxgbtHQQxXpSWR70RNYP5Dp2coNfjqs',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'e2oT16_TeZ7rpcLKA_bTfZn-Rc6eld8z1xwv0Ib8ock',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'bwT6UZZnK9RshVWpr7Ta7EoKjctwtLlXbHQfjzzv35I',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'qxrM--mJ-EsJ_M5t3GyeNF0nPlI2NPgsdhOYKVQQL7c',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'LfZ6Jenh4csh2ok-F0hkkXX5HBrEr9g57yIRoMdB-0E',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'OAyOImHW-21KXbGxAaLh0qc_sJZFXjZYn-_I4VFVMnc',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'XdC_h1h60kgKti2gx7uY2MBB0gx6AcxrFjs6X3U2n74',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'YPC8X8DiJaUOt7zqotjK0afDbPOwbb6fyqTCiTYOD40',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'E8LT_0rRKOdOeuv1uOuwMNFPqCxyDHtkWcB36WfgjAI',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'k7TCIM_ppvLqhkR0RmUuZxIhyXfTpP5q7JytMiDxeJ8',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'qdGFNrltmp3Y1bhPwshA9n-z0Zh7Iqk-Rl3C3xp-mhg',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'Zp89ITzEzAN3wu8d6mwH6nzjDPQFId0ggasiXP40XOE',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'ZwP4dTghE8y59T8a_dKe_5rstjIxa66cxxe4IbIw5aE',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: '5ISBIzMT3aeN0sLyHGh4oZnaZDJM8bxHwnpFNsvDdUA',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: '_kraahanZQUO52Qdzkr2Np8LGFWEMGt3qf2ilOq84-Q',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'Sb8IwhPwKPI2T5Sdc620Z4R4aXC71Md2rgmAi0axwQA',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'TlPyHQxJj6DwrrCABm9p0MeXSjKieldDHs9JLqbx1cg',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'ztLzOIQ8f0CKzOJrLCgFq8YvPvGjaz7ZbACDJaRs32w',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: '5CeQrCt8JBUH_xe-gExnwgrBolxtK1udV58biQSX6-Y',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: '5dtz7VAoGhbuPmufox7osFQaDrwU1scXeM8fY7mo-OA',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: '9YqpJBJeMdGlfwfcHldhCRlrDqyLOyjopzD2IppsglE',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: '6RY8kqEmEYtjVP2V4Og1NxlNxB6Q4JE3cmEbg7XrpgQ',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'l59-QSgR9GIMhqxjwdJrxC_X9EUXNQLYJjOm2tIVSQA',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'BdmAa74uTV6wUWuyBzeAXdx6NTcdS6Qc6GbvKJ8NN9I',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'vZD_YPt_y6O7B7l8S5oaMxUUCf3vwugt7RCKqiL_QLU',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'qBhkdxr1kKRFNOlSSE6-0CLDsGeZzjyLlI_AAlyqKYo',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'BJs-mwb4V3XA3P0-kjZkZfzy4WXiJSsXmiGtN5oH52E',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'XBQkhgmDKWDwvitTJiKdJIouRuMrOH5xFDXGMCLWTT4',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'sxiqlA5c_ZiYsdqL4obU6GBQMPtVKdkqOsKn33l9jNM',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'SbuLz_6z2C37nxBU-I0GEXSWO3k4OU__1EZms--wA0k',
		},
		{
			cu: 'cu107.ao-testnet.xyz',
			id: 'sNcF5aL7XxGsDixZp8t6u1YewW_qQn80r7BQeOoe5Qg',
		},
	],
	'cu-108-zone': [
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'tgh48rjwBa-XVy4bARlFlH6ql0W2D706oD6mMkFqJd4',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: '5PWI7-Px4lPbGaDTErhvO5ND-7Hg3i9ttNtW7i4OEdc',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: '5ef7YIDdFGYcTG109BCeAY9geGvPZivcTkQv8eFWMTs',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'WxlKyjJK_GQHoDhDanoVWsb17KYnjIPA52dqWxpn394',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'RhGu9rR-RpSkkPXQ0kie-wsHIIgnVxRjRtCeRBXjj_Q',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'V-LdNVRAX3wdmx2c0-tjzxhc4P1StHGNRb5rf6Wi8ak',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: '8klf36sM5h3wbi1rzBBO54ryGfyiEkSKvzVc5f7QfrY',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'B8w1ZRQgvhN6vlCG14wvEUIASX7_Nrbnik-WLZPcyEY',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'OIzC1Hmr3TzQ2FK6T7sJBEAyA2XL81VYV9ziUl-C3jk',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'Q-jM3YzHtk2INixFrzkOW8nkzQ7mTGGh8ATopT5D-S4',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'bv2oHPItM0nJHli2sW1qLKNXEU-YImnf8FYCy1KLHmU',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'zeDbCVq2JcP9X4vRbmVmttfeA05wiQ9TdWJw34PJEk8',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'YwRf3mKOiA0nxXYDjerNtI_PeMrGgzXxUosliG8SXoA',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'eIFKmaDiy0YaubJ50QeonLfHidOv-tzO8n_IhJ8k6a4',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: '6WiZw7S2pz_43pWx4NmpLcEgqHhntlZ4ICCXFVtly0w',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'mRVnGQbA_qXFNvZPBkl2g-Y1garmbvdVIN-DUhy7Av8',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'jMyxzz1kuiIT2OXXBAH7FC5PhCzZRsf33VJ7yj6cz5Y',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'FXMz1vqfAwv8Vua0Cmb8_YDZArHVbzitenaCSsthRI0',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'diAzsfP0d98-cMEXAp7Pm0bpdOSFoozi36DMXZKXZPg',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'Ewv42bwtreFAk_GZHSIbJFVMu6IgkdgRtVqMiCmSz90',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'FoeyG9f-4Z6BlAmRMq_tvIkFQz0lm3qaKcqme6wyyAk',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: '0Rf_7mkae3wt1zYYUWxo5G0NkKUeq11OHH7AKYdQRd8',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'GwwLdLX7jnq_GW4s336LqXuKfZQHCQ3w2XzphzFhzPk',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: '7KCb0urMVnM5JZZ5RGSCgcsueUKbhZHcuMyS__k_G78',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'DUvKuYbS0BIt22f7f0sQmDIiGGw2uUnQMCkl0ywqzpY',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'bSGrKkrn_aHDXvM94cDXxrZR93_qi9yNp_DLk1vGgbo',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'VWmcWQljWoLj6xplzqDBW_sL8AWp-sGEL_i7LwYNy6w',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: '5yM95r8YMi5cYcYSkQ2cEJ4Uf7vV72LKl99WTNs49J4',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'o_u2iwynwSkGoAk1w3rprNXIsENyAliYdKsQmemAKDs',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'a8DIV0HQKAhAqTJlAItDNvD8brUT_TxF89T5H-H0EzU',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'A1Xzq3psd1xUeOABX83afCQ6-Mzag4TQlJPJoZ4CTGo',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'Zv35bazwzXE2hD2g_SD-r2qd1Q2mYaQdpXicMLsIeb0',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'niDbWIHV6BR_zw-t14adCF0dpnDd5W-Wi_oBecdGKQU',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'uZvbH4At82urA2FWKUzU7j3867JPfN4QdM6jhJEwGIE',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'wdKGAlP0h0y7YYZEFIQUCwLIQK8pRQ5eRVkqq-WKh9M',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'X92kt62Xm6dcRcAetVoive7Mq1Ox3EWjVQhy9q3NJTU',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'jWtDtdwfI_2vamgoP-NR0QAaEN7Op02vfIvTmMiXy4k',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'xhCLhf7B7DxtI__-OGZ0pbH9wLwPxsxY3JUDI1cbJMM',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: '2KKnk58T6UswZ-M4ZD49AXtrxIFHrWR15FbL0Gl_w_g',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'LEPHwT6c1ymah9Ze14AlIv8sx2VdLXtCskYqiaNThYc',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: '4UeKjtCr5w35duzIelep_xl4q5ij_TuSTK_idornW1g',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'FjGodIpMqGm9D-fdz1G6P1KrVYcu4DdeIMxLwtyO_yg',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: '7sUFikrorGKlYyiy3XRoiRB6dc7f_3v_fkT2fbjocHE',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'uYiatRSFpYNw08PMdbtLmVdFvvcNSBwQYp_RWkE8td4',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'AdgT-VBG0whGIIqTpVgjy71JKN81ewgAegFY1uTpUTI',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'X5lqVBQI1zQZMziEq3Xjn9tjQQx15FQj7tjcYc8JNlY',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'S6p2U7m61zmUZ8NDAWnQVXaLmhXL7X7n9BnIUl1s0-E',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'cK_Ub6udoMNj-XB82QR5p-zPNaUDiAVv2D_TbMCnZvM',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: '48lWPsz3Xgeb3fVm5plQa70WmeVCTt7NKo8h7S_Vb4c',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'dza7U3aLjempzbPBq4GTV8XLdUIe9nSwqMUGsyyCA-0',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'fUQ9b13QKrN5Yf_IvFwq-e9BJCmALucQJNvlpkw3WXw',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'QEbAPySEXHih3Nkagj4nE373coOrrVOoNj3cJWxbhXg',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'TrPXCOUrMxdHWpo7ixX9tejIIKX8bg35sd1rbbSa_cw',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'B9f-8aSzPzwXw6-jH77yLBZrLuO4Z3SDaQtrkrXInZ4',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'iQFiGYHuAksJxL7iirBgNzJAFWgwEo9jPtokpqWpzvI',
		},
		{
			cu: 'cu108.ao-testnet.xyz',
			id: 'exv4vsjYP2JLSN4mzwq-awmHWcfxrMw90Vx5mcv64Eg',
		},
	],
	'cu-109-zone': [
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'f19rVQwnzyguuDK1I1svMGl0CMxZeeh0TZu9fd9CkHk',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'mgYfpn2OxFB_g1X6rxNLRCLQqcEAZjvr9P9TFcZL364',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'VbigXGnikRsn-p4X8dtEzs-cKTbf-_dkFAKD7cIN3ek',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'PofRqLpi8Vb-HAZQpKFlCSsljMmf6cYxzKCJpoOHgFg',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'wgVD91HQv8fpi1SpIC7vloUoIVkU5zYgWShO0_4xTK0',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: '2GJllRVdpFIK_T6xZfMpTxJA1i0bOOKsAjtikCJ-RCg',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'jBEVZcn-Y1uiMEwWa_THEvhKDUCAhLUx7gqOOnzn1hU',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'qKGam9tOa8LUh-6skO9nOdzGwooRwX7j6unx0cLDLmI',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: '8QcEnXhWsWB0llAg_aFiOQE3cSTxSUiDiu7o6pXhIWU',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'obXlx9Axjjt24yMeU0bROXeBa4Icl3GimHsNMe9fqVI',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: '7ZEdKHAzLEJ8cq1POGRDBwXd3T3XOIa-osClD0QyxNc',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'byGz53SxizRSPwDXWjSsDCfWjSVkHcZZwEtTNcq_24I',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'B4GgkuIzojdLJsKuEyG5eKqwf8XO2R5GeXIovmUZUPk',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'TbXk72SiXZ-j0OWT5mgatwHobZ6AUZ3yMPxy3ds06nM',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: '8SeFdV5Bp2RPmH9jwp01Ew2--FWZqEMc5rSRgD_Q7rs',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'hp0r3ytIkOHXBHInwk8j30jv3ovkwCJrO2wCAKu4h9M',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'pEFy24jBCKBzbcRsusZ5W6R5QvZsOOSn5vnzAjuzOuM',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'C5bbKU3B2yz-pJU8m3nV4LioCYzlCtm75MQR4FlOzUo',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'ThACtBlxw6tpptevUa_aJ3_PDTSg1z5aiR3wXqTkhy8',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'JlcKeNxL_t1h0x75Qw33jyX9hTytA672pf96qQTnIXc',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: '8i_Csu_MIXxmnHBYH2gPOTM24spNaX0VlhG4ZT31z3o',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'dK7xD4hA9nFeI5F7Sj6KWvYSzs5Nr_i4t35dMfWhADw',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'A9kVE6vLO_1-HdZfd8DTUCBKz_3e84pzS1k0Riq-PAM',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'd7VahsQhKXi1zTfd1ZJrSXSe5J04kXzwrhjp99lYxu4',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: '2z-Bzo8Aq7ambJn51PZT76aSA36fk2OX36rqouZ189c',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: '4970qKA1wEl8NK6c4Y7Qzb7OAtTI356jHMVzfG26FEo',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'vdpaKV_BQNISuDgtZpLDfDlMJinKHqM3d2NWd3bzeSk',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: '0xU7okGZ0QCxBOLjx6PjLVU9ENewSISsg7Es0K5Jwss',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: '_FXbSB-Fcs9NN3aHjhoJYIlYjzxOb3AAZUS_4er7hcE',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'g4YASImd74yweJsyKQSluueo8Wqy7lAzTnA1NhWsJ9w',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'EsaDwbIAV_Dfd-LaOdk_dSPRz5OgH-pn1f333wKwS7M',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'e9PPMEG8EO4OOaelxDQ3ID1Ug1HMwEVieFjDW3ysSCg',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'xf1kwmjOHrggAs102GZp7ddtuQgJzO1zGmLKDkvINdo',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'ui3pQdXsY3zYyFuTLAQoQxXJrEkr8TJNQn2XklF_oUw',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'uAfQo84lBSwaoJLPnMAtOvyMjGMVQfFptucfOtPMq6Y',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'wxeQxBlIlwlLoqx0fMlPtwIZ42xp-mmh9dJpHYqJubU',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'iN4NH1dGqmA3ybmyAlDWiHh_sk_gOOOWBbefzUgBDqI',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'AWfM9QcFLEI2tFkAdXk6KSRv1G6sAvbZo12c2uj4vMQ',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'gtnynpOw2d2nYxkspMmH327aVylRAcIahOAMtvpEg7Y',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'I_Wq66Aspbag9x70Cef3xtIS5rIubwoqDKsRY3Tb1UY',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: '8aKk0ixmwciDU_N4cYJkossSWxLfRGcyDZbCD0fUMz4',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'i4a6-MlK7uOzY4cGdX_G5AzoA0ECTi7E6PxRZoDh7Ao',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'rH7fRNUYRZq24fs15uqWCrcZ3tPJnFAanqXM6eJR1Ao',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'bNpukVQlqy5O8s6XwLESdEij3IOmXWz8GQU3sUp5wgY',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: 'w0TjOpOefnjsLt0dWmdk-ZcG-KdjkExflMtCe5MltSM',
		},
		{
			cu: 'cu109.ao-testnet.xyz',
			id: '5YEKrMJW0tVeSh4SltnhFFmBAB90IrArYQtCm0Z0bKo',
		},
	],
	'cu-110-zone': [
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'AE3Wo9G6esFj6hVaXRixwkDbvaGxjw7voDvutxK1vMc',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'PdIL38KSYKbs0-f89RXa-Bi3mUt7H7zrxrYhWTqk8zE',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'utW1Bcam0S9MOlG9_VYHbk8fB1nvHAfzhLyQFucyX9Y',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'S1zYhFmqCThnXUB85SKU59qOQWeGobqk-hzpDkHPbe0',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'QTn0Wcmj06aJdQqJB5Kp0QSrocjQEk3g_bTrbi7waQA',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'jtJuX_9vcpfvTw0BJIGRtkT87NkLGEBpdifwnShnjMU',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: '81Mxc31th9dQATMZNtxl323ACCIAvUcAWe4aU1JgFmM',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'cvriUPpZEwbXOtKjZ_kghiHWxOmIBEUyi2FcBgcxv9o',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'gIkeolLYHFJ3CMZKAOgl6zgGSYotrghmj8d-6z8j5Rw',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'y-v4P5vVFXsuLaksfYrGuP26OtoL9-faJ0EzyOCg0XQ',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'SDnBJkWJw0KKwnVhBJ-qNO0Wa6Nn0HwIKPCE72D2I_M',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: '8Zc33vpd6Io_Pbzi8dV5KM0exPXVjN9vC9wVfHeODPQ',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'KCgCg65tuIjO8pOOpuW7bsI90WmsFwIR9_MUv_pv5cU',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'ECsfqdTzBoSO1qAbYP7AVgc_2C5s7iZZVLSIuTQo6zM',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'IldSkPcyIRrGFU0bRWc8LnaWP2F_2J2pirj5eWknEIY',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'W3WNrGjBtbKvolg-4ahN0Nt0szYww9wVzv77g7zbeUg',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'ViH_QuAD0y8W8wHmY9YmWuRYfsHtkucQV2pQqrh2HKs',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'bCc3k-px8SgAGZ0mKcH6hnFukHZFVixOT6mrySpZ8RQ',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'm-kDOmvbiZUg8jV2lEbgSDuW3-eCct_AfIOKM7oCwSM',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'Mac1yaJYOLIFFH-5yafKAwiSlAT3_Fpa8KjUnM9IKPQ',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'cZj0T108VnpPsW7vjb088d-hAqKB2PmjzioxLWR3bfs',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'VyzykYZ7AZ689Dk3Ak9CcwmIBaJkETyQGRhflz9zNk4',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'manKi1oxiY3SOR6speRARCFh9qDlaFuaZMdnw-WUeKo',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'OkEagGWbBOWGupU6qoN-ovP7zlIYCnCSLjz9T1aILiI',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'cG-sRJc9w2NU9BGFb3CbsntrKVaKg3FXaknIWlc6DAM',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'KbOSpJ5igpKPBq7nlYa37AbBM7e89VU3Llou1AGJZko',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'B3tOpv8k0ejTLDxBMptmtnIxO9ol8qqb6BUyn7xmF_I',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'qlqbvwaLHS9S8C-rWvVioF-sr_-HxDrHPXCsK8LwOO4',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'mLhOPuKvw-QE4tUSjNzMcM61t25jdB1hgzR25RL_vfI',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'SSSw55oAx_CimNztQoeYAJJGxcZgx1nLMuISjhMhKTE',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'Djd4MJx-k_WIj_Un7vom5Hm8I6S5yRkjLegUHHAuEWc',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'xOPdno0W05zGyhL5Jp0KxAI6UjRHexVpn7_jFbWcK_k',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: '0hmPVYiBYFof8x47gKU3WsP_w7LpHB9A09kYw0V6X_c',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: '93lcEoXuC6A1JrRSESffFPePX_C20mk9uK7H5innLBM',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'k79_92UI0AkQe0CcmWtQQqM9uBAfD_DX68bIwyXJuyU',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'h0Le5HX7sfp4c4LhKh-xONoI8ynA1yuIWyvnrVCCVkU',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'JO_V6Ep3kMN9ougLiySVPnp0AwEEKppQgvvkEhM0QYk',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 's9cN1xFPdst6VVABs9tDUly7F5SnUXNVigjVKBCW-3I',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'xK7S-I5VDK_hYoMjYFzUms6WVx-zRvd_PipsCNxsuj8',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'KflyvnqnHQrq3w4vPUX7baQlzqD_KZEacG9trQ74OQM',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'p92TuLMn6SERRK5VR-uRlVPM4qWrBT0LFXBVaZ0wGDU',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'RRTcoK-re4oCDpG2M7_bhPz9enYTE5pSIXjhciTdwlw',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: '-FxuT6wE_3xcevyh8u0Pbho5OW9U5uBT0xHa6mpaqRE',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'TyTjbTtV9-HuCYB8OlukXvKYfa6KIEQwjMNdXdrdDGM',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'POL2fEoPk-SJyPEHEoMNVmKwhOmZuhI9AHaH4KiC_Pc',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: '1WbJtATy88LLePavhHl_QlpRgl1kvyYaGh83NoBr7B4',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: '5ZLNoD0dn2sL7Xu3kYVxKVtHxRiNd-uAw-kzseoFQMc',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'zUK1SKIgVXK6ysDfqKSTdVIooIf9GbeOHnD5HrlSzLE',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: '-eDMJeGsNm3vdbmyFRLjbqczzaAqYV9DEWnOA38fw2k',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'ZDKtzZ_V9vlGmIQGTL9FK_Agk4bmyDSrLwfWL403iZo',
		},
		{
			cu: 'cu110.ao-testnet.xyz',
			id: 'uxasQRFvoA-VpqaEpIE-aFZi7tUg5p1xLxosKkp_gTI',
		},
	],
	'cu-111-zone': [
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '7nvYQT3nWGbrFuHBzX7jTnW8VO8lcGGs9zKpFS3BDjE',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'KkIdQhl2bncA1WyqD1eB2F2cTUqH8JGtNCr7qNHlp3w',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'SW0c4ZL_PfY3fRV2-3SaC9aqr6T_MlZvhxJ4vfQdTJY',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'BQg5HKsWmWeoTkBgvLmCd0NhFmcKHYixR89omuEKgb0',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'tdFAqYP0zztdDKxcWYmSG0eKnID8_f1eb5NkjyCJ5sM',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'GCcVLyP_KzxLL0lbMeGMyaCy1uNphYxd0MvvTPVvD8k',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'gVcPkWpyMo-0E10tJZ0DxWEibCteIxfEWO1AXrcoNl0',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '1-xnknx7Dd1b7Y7ik46a-HDbL7rKbDSg2SnTBiGYIik',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'cYCiC39KZqqfZtu-Dv3od1j5fKX28GKfCa_EqGqTtno',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '0s-GWiaInaWgWsHDIakjo-HAWx8xmzxKiDGK7_GwVNg',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '4S0GD9yJymYUeKIIHOCXLb6kppVenYnbOqWb0bGjznk',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'dZDiSBtHxEfjYMHNgTH88wkBdXnYAxkrcRIbVw-A9jk',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'fJ5kQYLox9ZCnb0OZFCqIoraBfqtOxsuWwiBSzRWD8I',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '6oc7YRmq2USQgx62TDJO8tub6D8UAIW2PIuPgc_WMX0',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '2zlPmKTUBruPzBaTgJl9aGyT6z9cNCxFaob_0-WfnPQ',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'Dr0AdSw8_X9LNtYs_9xT6myn6RDo-IDmrEYJsRxlJDo',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'lOPLkQAM1qIRPHzmcoV8irO82ev2UTHfY75rvua7AdQ',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'XYi1RbQUzNfmfVv_yIasivuYK2Vb4_ku4QmKWTpuSXc',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'gupk7qIYR8S342CMXDQ0aaMRNW1SmnWdC-vsOsAdkNo',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'BdVrMCsg2qvEbGfpqN6TMYZtXl6xF4WvC3_gSWz2vKM',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'ILvr0eobDUsRd2rHmt1244Os0JHGlD1m3YVtNbjTjVo',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'KMbtlMzfoo6Jv1TEAF6eWurzJ5OH7cOq0GRJ783xjFg',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'aIMeA-HZpAXbSR_wQKS80bR7XU3S8XiTIt312Z_20Kk',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'DbPvnEBvKhAkrCVkz34psk43VPLRpP5dtyD1_03xeFg',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'e9TpX9IYp4UqnQL1PsLrE6H5wRIkICTRnV4U01mSfaA',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'Ki1xXutKj7SsNKBnALxKT18xFNRbk1QZkPbjGC2jVlY',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'vN-8zcv_rZwJ-voOtMsmYun61in1exmmR202XiArYzA',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'v6tcapo0l8oAmXwipHRYS-tLoYARaGdJMr7Cljv8VoQ',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'L6w9k1xuJhMjKplURbA9LJQRp3VAXDeKgP7A_K4IdBg',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'Jl_yu25i-QLmKs0_fJ58r9VJlx1Xsoqwrl0gR-v85Kg',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'Xu5s80TLmBWDUcqxeBsRzB45MJWMbHQVrwmo4cZuDcs',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '5ppn_zlR0UWExoZLnhjcyr1l2DKEMZxHHEdHB-P0ooQ',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'N_JfhIr5Bwz6VTnbL0quOIzn4tgw3P-zxMo0jt6Mk1g',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'uJWk1-BnsudjY2G9Krgv2lxKV3Kbu327TgKzkFTjltI',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'G5sQ3mj62sMI8QqpoX8ptP6Sg8cw7cJg9oY7TxtrE6o',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'wC1FfY_bM6PJQJvWiRAeB2O8cYbO8CeHzQnVXwjhfkw',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'XTNDocVHFHbrEsti1iUdBecJemALuux_cL2NxlpA_po',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'YBzowoZnPJVeygzfUivYmS7--ghokur0Gh3GSgjWjOM',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'R5SbRRH4EAyDFyjsBncWIPFtHZr_xAC8M1CnOkiDXGk',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'gdo4mMXKNYtj-FpMe9IhNDpon6Tjfg6bmU1G_THy_Gg',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '7OVcrYlePogjP7vDYLUeXUbjfCjx8Vc2u_K_BqiEymM',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'pqVp653eiGg8ToyK5wvVTdoBNbuZevczJXrTM4BQ1y8',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'eEzTfZcydCrysMy43JRcndV3UkwGeW40HTHl_YnGOAs',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'pPgM_uhJNv4Yk0cPOELmwpJGlosJdG61KzVb5gqQDWo',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '31d-DVug6s7MoR9R0vyvHiOqdvD51NrGqDGqm5icSQs',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'EXi4k6DZMM--2EEmRXmeV1vtnS1CFYqhOvbRbKxhJdQ',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'rmXz0QB2CBYooc3ooAudsXY0AxS39hb4lmGmC0O0mgA',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'OuyYisy9BguYvrmFG-_kOsh7Zq4fw4RUGTZ0Z3X8FhA',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '4obFi2w0I_kgDm6clfO2PPJC6Oiv9IknNeHtTI3hYp4',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'u9J_qF48jJUN2io0qsmnQBYxbAZtBXhKSlKGYDy1oTY',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'lXWrB8e9NR-PlxwX04O1k74ssf1Pln9egCB_XVwiQiw',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'n0X4Ve82mAGj6jgQqXk7aHEbt3SvMEYH4FcXwylwivU',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: 'I9ecaIsaYdxiNpm3A9UPwkqhtSaVMUqchQ3lo9_W9RQ',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '7UimhoWfQGb4Vb4nIvFzIWSyHZFsMNhA64rEiUNSutg',
		},
		{
			cu: 'cu111.ao-testnet.xyz',
			id: '2Ze3ATIl3UnU2iYA3-k0BdkRrBb6efFWKG5-fyqUctY',
		},
	],
	'cu-112-zone': [
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'Q2UZxht3uFxSteG9zVf2Zmowxf0LOt5M9tXxCtkc8EQ',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'vDi1rPFmIx1l4bJFe5GDPIJILensK2OE3hvsfSiuRZI',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '-ZiS_HmNEgddXG9WadECU4aUVowdNrkaNwaF6yZRbRg',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '1psQd-5uPpo2NYHQXlh0MvFi2_laSP2gXHszacSC5j8',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'SJtoHiG04tUCmdtQcmo8C_50u5Ko8HOL__9wPM02A8U',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '7dGUxFzoeMheEZsfioUYgI-ij16_HgRQivd5ABwYAiQ',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'd3N59ZS0IrMeCwQJj8pf4g7iwfEiB6kPdutrvx2i9jM',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'eEC3vP48VjEruVuv0ubzUUenEShJbcy0W0Uv4DaxFwI',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'PXnqFe3M4ItAkRouj3qo1Dsgy-UU32s2LolrZkYeDDY',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '8O7UZXLRPpdMrFI4GymtaAS0Z0Wtv7mcGjMmc4ZGBmo',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'Pi7_68eF1ySlMqSCBPqFGEy6zDJeurOsRLnnihwM9-w',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '2NoNsZNyHMWOzTqeQUJW9Xvcga3iTonocFIsgkWIiPM',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'CagkTqsvgo5KBvqkOkSVP8chiHng-jhraiA_vwJNOdI',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'GLYuFTjMgEV7CXvbtt8gAl5RVKirhA6Odspn0ssmNc4',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'm_d7FYc-PdqOnCo7sYVnJXryHitoJ4H0qsJzaEOkQXY',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'JY8mSZi01_NsxKghnyKQbtCSBfpTM-vA5_qiB3UCe-o',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '6znep3Jr6H3jtGspXTLVIsl0GRlA5bhzMIPwKvtJCKU',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'nvUJpZ1Hyxany9F___nCFhih6yD8Cvdp4svM-04IHnI',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'zd11UWMgNbOGmzIj0_w2KPQkdXJmdgTRa02jADpNiN0',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'Yk-_bBha_IKNmAWndHt_dhmRtGlUEyLfvpa4p6AdFsc',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'l768Cp0B_ezhqpyKY4LiNdiuitBYu8wOItJ1BtwGB64',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'xD9CTKO3nk2Gz7CtWW7Mq3knxr8cfvqPRnWdPlFTyN4',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'ZDY6s9Dd3sHA-pjNOp1gh344d2Eu5ZdikXqh8hVtVa4',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'fxAXqJapuKeOe7Fr5ElSbFlV3cjsPmUrwrnCTt59LXs',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'v6ytGgDDAOwgB14lXgpjxXA_fIw3Q-mp3XUaHbt9l2U',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '-BNoILWviCXUmdmz0NKacFQ1uDK-oz8njvuiI1dwe-Q',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'xplChhGErwftx-HcknT4qI_CsC2O2Heq5s6mzT5jNr0',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'lGA7RQfGcIdvnZ6EiZQvlcoe5XpuhU6JrT5Dd6VEpnY',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '6Rz69Lr6aD-SB1xcEd8EoL_Zv37fgjuN9uzUFr74Loc',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'CBksBxL3EW1Yl2dMlQ_8W_H_4hMvGPdACRk9CQP0YV4',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'vn4NL5WsifYNP7ZqEdTUuJCrtVQEMF0eadaBBQ4TRs4',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'yyZRS6SeiSRlkWI0Sj4IBt1vdVXygEgdoHJaW-YqB90',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '3x7LNR1dPn2AU0eL69GMoUm26y5f0czoUt5mpG-bIDo',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'sEZepMa4hALzxzaga2LBjCl5M8c4dp81-jK2OXEfXOI',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'cUhdxCzY_eIXbhVMmHYohO-R4YemAK-CB5289HKCApg',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'xvrmwSj69hGm41EV_pDdK2b0Jq2mMg3lhYJBfuZpcOk',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '52zj1viUC8ifWnAm9OUfz04F5LggNT8Prb431O6Yupk',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'KL5H_Ol_em2gHX3VD1pZZA5shjiS5uvpsv1eQHxFzcI',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'NEurN7H2Nfm6Zy2ttf6-hmyATFybAY3Phh9oLqE15UQ',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'VD02sAPEt2_jbDIzDa4iBt71h1bxNh-w7Qgm9aVnl5E',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '8g4wrSYQ54D2nXfAQjVcMYAU1dAu32Wg4KL77paBTeU',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '8PbzjRYksy5FgmJu4M9Jy3_ejB4QNjduZ4_MaGiFvdk',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'TS10sFvWXbHD-e2RVPSWmW6Qjc0Amh9NVTF0N4O_kNg',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'AIIcF9Gn-BDTWhYY-mluLh2xUXJu-LxvQ3rCjkHOlnI',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'Y6Vf7-rnx674s9pGliOgRmfVCX1kq0HJf3KxlaHcHnU',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'nbI9ujQ24xQsHmBI5s27_ZaBlzzAocMMqicCV4eGgcc',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'cyh0X0CEQGyScSomwSthiZ_kcMV8Ks0PEuZvkgWFj58',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: '7EEK-zUf4kFCvz1CU6rd55WsxPmMY6mdV1lBDweok2c',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'CiDC4lCjxkozXxw6HkayCDQmhJCqEBfkOouMMIDVvR4',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'rQSOFb4R6uAC0uirEj5_oApElgSRoHm1fiKswoeUyUY',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'HhstPUN2wt0htPqHWIG4ckZ38uAQZ2kCesyg_blrrPI',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'znB5ahgonlDNALvLBildH0_iCo_b36tTkE995bFo4PM',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'DcPZMbbnm9oJrQxPnPs6Dt-xpcGNbtZrvZxwzxJOqHE',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'GRZRSXBqkLXUdzH7jgrW1e4VdOo0osq4g_FI_5LRvs0',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'UuVF5MAeqB4fYrBnC_kNC6TllllHBNrOUmRAZzIGxxs',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'gAF7Y-W44wDGKGiFf5v12Mhc1zfSB5UfYcDTrl9uGm8',
		},
		{
			cu: 'cu112.ao-testnet.xyz',
			id: 'ZBjlVOKchzz-10ji2lq_jvSC0NOdWsBk7jm0lBD7om0',
		},
	],
	'cu-113-zone': [
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'EaoiE1mqFHRit8JWHPcWKhI0TnYAPfLd5ZWo75kzrTI',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'Ey5DoLxFlzxwsl90YhH62IZZIQ-kCIBy8VkwXA6gs3w',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'G9Nx-jEqRevgGmD_rks3SxLBIOojhXQ8-lzG7ywOgW8',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '55oHgfvBoRUkMIP0EM4bdfhZGe2Ez5kArN_VKrZtgzs',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'skK2VMJ5RaAntr6S1epad78X5msPH7BOvNMjGJhwub8',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'rXa8VF2FHRTvyVaQZGLGVwxck-4iQi0u3c9dWFW6ZCg',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'mRxRKtcdagXHCH5mnrXb8D-N3B71eJPSBKywlh_stPM',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'jmMbSdTAcZ7U9bbqWleFTvaOhoCquYrCHmtj2n-H8Rw',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '8vvYbhyrrPrq6U3z6pxJlfRhQ-8yYyQilnV7i6Pkl_E',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'OtwaFF3Rozc1yj1bEs74FOaScPZjXsADe-Qj776REDg',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'aLaS-epz0imS-5j94gkiSFs2U6xTX9w1Op1uKCzAaGM',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '0SL7MSIStqQlI6Jv7rwtVabLdiXoepJ8kkhgNueYN_w',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'ka9Fa_Ms3HOkA4SitQ_iiEECzOQhqnZobKTJoUN0Q2Y',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '1si_evdNzBGlHHdF1C0NpXe9cjecEHZEoORGVGzJuy0',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '7I2ub3cKXq4kBofJPYm0DoBT8oR7V3flibIJP9iyf8k',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '1xLE_mEsx-e5lDr-ZDkW3qX28A2zk6mMID4yi7GJIjk',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '-oZ19QdDzdDLaPKqrGclUcuebGmblkY7pFjpB9499LE',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'bDESYrUKQTRKUGFCubNWEua5W6ao70WENVhdAVQPVlQ',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'QV2_Pu0cSAreSbpZYK-xXXswJ9WLDU_1uhWrma1H5nc',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'HDjwgDc_aMXv8cGGo2xGHXqo0iCBJmyGhZJopx8EG1g',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '1GAIzEauou9izRZMDdeqBEyFPYiuwM_mBQeLVoIB2UI',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'zpXeHXDtRGDBb08BKIH7PP1biZRMZQPZYPgT0_ALg5s',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'ApFveeYrCOqKE0wTZElkuZCMmuuFKLRKE4zmFUAQmR8',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'SugJT0DS5rb1VO1BfmlCQvKz1xTlHpSmMcEu6yjm96c',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'Cn3tI6Ma8zAK37afNc3GJL54GqLhxxc7T34uwXxW9aY',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'eLBnU8EBcSmyo_jhDDgfSCJ9C6lhYDvGYCn-0TDdpQw',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'REtNrBaMQv-fdhVlPqHF-il3u5JLMEXyL_y4MzatEns',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'wTexdv_rI-QFpSNsmAnA0YKPOe_5keAOFvx1V8niED4',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'zD98MKh1EC9IcpV3jH6uWsenOo4sc7TgqXxvuH1Yo0Y',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '3vnH_upTft_oDkmCAbSjHM50IVLgsMlINWX-IeCVG_0',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'QcBmBefyPFvQ4ton0aXoUD0AeEynGOA1P3mMOQHMGf0',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'RhUNpWDysUyNOwvmWNoQy3iqRBSrnnsUFNVl8RrH9J8',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'SJLwHDa6-KDXd9g9xHamBF2BlHg_yY334z5KIt_ENmc',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'ZrIVsi3Wt9ubPSktwOdwNGIG20iafVMhv7ES2bX1HD0',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'zXHethftc3Md5fV6Domn_XNf3MpYQc5uHx2SB6BtSOc',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'mUzNhtjEI99DQBgjMHPm2VGRdgiliuEekm2xn3x5HHo',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'LSKJKD68a9KvT6COjBMYTNwYOKvE5rI6YlSGcYzPJCc',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'QTOBtTxGPwFFmgTVENeS4mIfMs_HFL5rGWJKQZjf7H8',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'V1MHBn2jCL6XYqNCUoHzxMZi0f9fVNyN7PnINCy3BDE',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '9O3szPWhCV9zWrn2zZGWU2N-lZVmAWPXb66_X7lC42s',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'e8g3OZy9ivQRJsOp9AYgd4tJbXtHlCN9k--KJHrNs64',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'xFQaEMOP5U_8kW6IQQ38fc5Fr3WDY7GDdThx2O2vo0Y',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'DoubeFVhlC_9CcYvHaKJopld9fq7se3YgyJE72Du-Xg',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'z1OQO9NTRRqTVLtHfyyTcSXoyWhg34Rc8rN_cYFVYvc',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'KgQCKtYHfrxWluZX0FsCbhiZZB1nezQQIS7HkrdDSw4',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'pYba_lchq0GiMxEZVBcMJH3iTom-kKFd5df5NJlT2TQ',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'KneY9m8Ziv4ItycTN-sFjh1qwnt0IKbouFEu7p4LY8s',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '7py0EMypyOz7ejfkjoM_Di8SBlI5rlG2A9qTlIn1rxo',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: 'Z5q_kWZw-OqSrqfDwwAWyfAkpB2e301kPthePvRpXTQ',
		},
		{
			cu: 'cu113.ao-testnet.xyz',
			id: '8FT9b6lysSYsq_LMrsbnnLTAXR2_ThWne0jrqtUntDk',
		},
	],
	'cu-114-zone': [
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'hRkprxi4tKSya2F5PAfcBkRq3vKjAxTMK9I726ZgmOk',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'CJw-1pbRV9n4JrDN6qxEnB--zDX4EKjIwLolxq0477E',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'bQtlSzYWzaQ14OqPFK_piDc5Nge9EkZt3brdytQmcT8',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'suQzQy7lqx3qTlaPjKok3cBd4P1S4YqM-i0CQOEhyoY',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'JN7wNs3adSspWhJ5RJxcFeAvu1MO9HlPhSCBWJrycnk',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'lsxrzhHJnkqIO3ZoFw3UMRLoiZ-2JESd8K_hyLFoMuQ',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: '87EaL2_DYNb2V4NCUxJ0HSLgwnmWSEOQdAC1tMvMBMo',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'JM0gvo-sRVP5vDM1fsmDnJUC5ZlZZrEirNcm8DPxnpw',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'b-WdkTNfFQCbVV0sIizYcsZ2OVhyg4_A-WT-liqsXbw',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'Ohsao5m881rC6coQcMnUHx01Q_uWu1ZW4g8m1Rlsfkc',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'GanJjkxyeiEGVH1oNokSs4jTlFo7yX_apP8Ch7YdYX8',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'F6UR7UQrOo_S25PUWwexe2zuSQLjTNyBfoRi2d4tI50',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'jZK5essI__tXZ26ghpodPCsA3FoN5b6PWxdmxTQwwxM',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'uDipjkSF7wqBtNiM2-9NVLQBjG9BIqnxB8evWxSTITA',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: '9Ko9atpgC_2Al4-ut9jhSHo5vG8Yqg3Y49g-C17lB90',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'LCW6bm471Uj1DqUvhNTj9yLKESVgaIzbZ3vACXRRL7Y',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'RI115AO1HMHVHIuA0ZG43K5XuDGADD3pbDTCz6p96FA',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 's1IDCbRgKgXXQed5__qTsi19XdXMIUQsY_m1_M7Xr_0',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'W4PlC8qBYIzn4voVAaecxKs6KcM9FCS2Pf9FFQp_Xes',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: '1Oz__qGSvdRx1kINc3G_BwEB2GzlG0rC0Yxe23Z-N-M',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'mK1p67IA-6GHt94OJe2T40QfAI3f423BgrZdeRjoHcU',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'HEjaSDaqmze4mug1J3hJDRckjjvxx-JVrZ51SqfCFr4',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'ktl6G24zwcDhZkoEi5SIDmV5qrCn27Z492Hq9W_RPW4',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'RIO3BpcoujMYce-y8uqNqpZcxF9NKq4Oaoe35iDl4aI',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'S2xf9XnjOvQ7jIGcghNC93WtNNet_wmMptGl5LZAMeE',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: '6uo3wCs_2OS5O0JQ0F0_VdV30gskcVQLmQLwABG8kmU',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: '3BIWV-g8GulgGlxH-bf7woGqhiVU2pVt0pK3X23ypQk',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'ZUlI1ftoxqTuWdWNhwII8fVvMk-ox6jgCdWIxg0tZVc',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'JC0_BVWWf7xbmXUeKskDBRQ5fJo8fWgPtaEYMOf-Vbk',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'iD02IUIqGcjvDkmD7dBWkYTtlG2wT2cH5THaVlKfZTE',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: '_ww6HxJbT-lyWwbtct9c2DuBDLq_tD8yXQeN21FDxcY',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'WW75KQWzLBsB_oslYx8h0Z74FuoIz-tkmWFKYbH8fnk',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'xWVMgFFVjzo43aUHIbi-VycFRaw-qsujNEAS4D6bS6w',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'NcVzHNgxdZnIq0zb6RqVVluS3_Z0cpPXgl6JQsyoCDw',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'zKGSs2DOHMJOkAGTiu5be9n9FaQB66DATSjl5hoLSQU',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: '00v3sCOi1iOwBwMJORwx6-w0g_ARjvTXbXnRpPoTKp4',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'YGIPzzNO5wyMOmQPuprl0YcjaufRJoBAy8Fhv1vMrAQ',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'wF0hsrp-TOoWOmaOnCnA4i3ga3K6u2OyDzMP7dSixBQ',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: '-GwkK7rjFQVTEhpbvz3KMsPCYDmQIEUc2QR37Rlizr8',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'pJDKMrjhPiOnLXFkEAIdI9f-bF4RAXBE61MC5fcZ96o',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'tNznYneke2Kp6C7eOWt6yujODTUp9aOJkXYSsp7Ttq8',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: '0FCh2pldTJiQGJdY5FpbyYWUEMMxoKi9-fX96NOPbcI',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'rgb6-D0yuug-yw_NdmQotXMTS3_uhFECTjPlVxaWpMQ',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'ZSrNWp0Ie4GMnGE3zQZ4tUxGq_HAwDaVOigbndyO64w',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'eROTaqoWdvgL0pOBUSlZbxTwaVj8oRIFh5dukcRkop0',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'fhUvAMUvrMggeog3BCFZR9Wy_8LgI8QZcdBTTzTNWcA',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: 'kUAmR9OG7FlbccYGiYgUNHlIwyRr_ZTR-aC8_1qnNlQ',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: '6BSRAW4hB1ltbrq4lsOgpro5xKHr4dQjGGKkyMS3EPg',
		},
		{
			cu: 'cu114.ao-testnet.xyz',
			id: '7TMwgHkRfPt0jd80T9MnpGFlv1m-jnnG80qGLYCyn4c',
		},
	],
	'cu-115-zone': [
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'T7SRSE-tvm47aixWm_zfHyjAtjGx4Ntq0oeQiBKEKvs',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'wpU5EyqAZA-ZJkhb4AiPxfD54wbURaO6VsDIzl7bXUA',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'GB0_NNt438AM817iqEgJn6x4QcRbHNzy2fNZaTPLYkg',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'vQuCzFiQnM3ZONfVyj5yHSCXtn_hDv22pxEY4fRRmp4',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'TXg6vHq0qZlKr-L6jOkFB6nOewbMMQkeNrpJjLxouAY',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'Eiv2w777pxHBPjMf8WR-JtrlQZiyJm-2Mkpe3GKrLiM',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'fHl5aCtaDoWuA9cOaMar7R0xDmJiEXEUmNkeQJz4Xto',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'jtcZCE4lBrCCIWo-2rW0033nfME-8-SQnen1KS8bE1Y',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'HWvZ4IMLaHDAWCethBW02e7HTU0NCG__qBRDhsgUrWo',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: '4iRCj4xj85Sucs0QcQUheDdyxK2Og46paM1VhoqCEDk',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: '-gqU4jcMLQfQJSIi00IWp53DOknQDQzFkKOeCl069Mk',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'ORqFOA1mALH9QxKhgCFxsoME2Q2x4yAzwOiJbb2a2M8',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'rERATZqdZuUs30RoQ4P3-81Uj3T3E5jW1TtAV_qKhz4',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'GdbHrP6OJP8aaWBtKcRSN63uhOTOAffmD6Z4AT5uEEU',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'Ru4Bmk4ZuxbaQOtg8QEoiV9HPBrsX_pj3vm7kz9WXMo',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'Yj4I5-Vt2ChrgUPrTS1JwPtHwI0QYJLLiMmhLKOCTwM',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: '13mF95AWT35zEzFeyURqesTIuq1SSllugyEqbeYAWUo',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'nBh97YDGgpBdzHS1vhCs9goboZ_-RDVj4zfVWjzjFVk',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'BBiwIhEU9vxmSvtY0KkX5WTMudUcAS3-WKxAqIwoTKA',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'BYxL-p5xVNOb1Fo2zYJ9PvL308aRJMEglsjF9GNOLNQ',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'yZU7usYRjQnKTFIK0iz6JVMElHKY7RgHl4JExUSX5Ok',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: '05GIjkIs2tlBGJUuxOo7OvY4gz3Ql8sKl_gtdEd33kY',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'H8pMLopBiKekC2yy7ey0pq-ix65wd_xa2PRTiqu7w9I',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'G2dyof3k2xbhq7UZYqek1eZc6oDgRtPT_I2GlmGUBuw',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'HcvNDfBJKoxkFApw1s73SGBnjg-dpgpsU2OtfOUA3Eo',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: '_fmB-mu_bJC5D-tU7zZa337ka96TQIPyarQ0xZP_MJE',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'irHExtk7rm5oD14Gndyo5LF5iHVGBiOpnu4pDH59Vp0',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'olieHYKvXB_JQc9rLzaJ921dPCHE4v8Y7f-ZxpuGqGs',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: '4pUEH7u6xIbsl2nn_vEpFkb7vrOlddCo5X8cSRcgJ0o',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'aPK-JQf5894bs0Se1sQ3BxLvgaeKqJk9LGmX8zSb5uQ',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'oWuSqJZpe9lFVcSxwgDUt0k_F9lo3JO_2plq4qvPiwE',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'B5ocIc1BouBvWK1tFtP8sZckjSBw1XszxAxxunfbqdk',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'iKw_Jj3at13E5nIC12B_3Rx3ntY2Q8TlM6Nwszh0S2M',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'i3vJ2tixMTecnu6rOLw3Se5H-QtyE0ZCu0QDTrX4Q4A',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: '0SmN7_VPLKw8zciI0lWe0IQLr1xHhnOGyY3yqRMlxsc',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'K0LT-uwZtg87D0ekwgI38WqSr4l74yEBxYP0lHo90vs',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'GTnSeAnVmarCT85tFEh_NPuzf_dNMpYDvhN3v8Ul8KQ',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: '-xUnfk_G6LU-I2MvHbHdINWQ8VNewbmpkQEXcV__uBU',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'jxVXINt-ELdbaNh9IlM3x5YYzyKsA5u5-4ybyqw_wKI',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'fAUo3gjTHh4IKuyoq4azdFFwIG7kigmAG7ldGbSDVWk',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: '5cK66oo26f7kf8qho67wPx5j8GuKc4bXXfSPhi9bBDw',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'PUmRBzHY9upAQwBMERf5IdB3iVcMFs-hSde_DvndJ4k',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'UxGVndMSSJEB323Q0NPdUq2JG8K5PI5TikbJpToDEuw',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'mlUMO4Y99s8hib9VNNUHwart35WKKQIC2i0VReSpvTY',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'VkJA8rrYugthoYrUnankrSBHHLvbNsNYOJuSdLPm05g',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: '67KYZoz_cuOrPOzkJpZSGvNcmb92dnZWIxQyZ0PlpX0',
		},
		{
			cu: 'cu115.ao-testnet.xyz',
			id: 'iSRpDum9h4w0A4Rwl0MM_5sDG12tSGlikole2vwfz1o',
		},
	],
	'cu-116-zone': [
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'cRNZSNaMLIiUfNAC04j89LrgCFGzb0Ul1wUPdrMhfMw',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'KV69i9a1aI8LxSqtCwDZc1zRcQ7IeES-4f4mtF9giVM',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'bymExQF7LWNlVe4cD7GYMqwdu58qhNyI56Q6FN8CBsI',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'ugWWNV8qFy2KBnlj-Y3uTXRnQHrKIy72tmqxXySF4Ik',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'URaM7OLcB-TZj3C76qg7mjjX6nC2HvU9unUIxSDotJg',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: '6AJwGQHFGoRJ1FrWYk0_8tNQmJ7bO601Gwckse6-dnA',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'PLpFwqfRtHAFUF2YgBZQ3xT7wxvpZRQDNPUw1bm9s24',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'rUmeU4xcJSklwIyAtLBhzy8fH10-wH5quo46g9A6Ess',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'D47JUInbsrPfYp2lSyqXY4YEa5ShZw7TeZrIA-b-_Nc',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: '1u9RmMquP_BrQAgwigrLGmTyaamIS7PdOeLYoSAs1Cg',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'TYQh4Jb7S0enpbOIVYi1dhsGtE_DJezjCvzvhuhM56A',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'M-VYBafMQEF_jnmlUgL6NIvFbT32I8Ha5iNeCj09EzQ',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: '6OtEGPZsnGfA_o5XSgI4KBRbszi0ZHCrOU1FBq00OGM',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'hkenNgbaoQFs54km5yH0H3cpBef2NpD04rL2CUBJNWw',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: '3rp6LPgS-yHkeXXELoQoOpasxGtojO4DsVQzWwNSB98',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'OIVuBigQziSz2yJVYly6EtwURcTQqMrPZE68OB5EwOI',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'j9G3oxhR2Mk8Pon2KAJVGfZH2pA2HoEbMhV_l1kdcbo',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'Bx-NrlueTYZw6qKiuL15xiN6sqgU91HV52gnTtw50fs',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'j84H51bg9YfrrRLYGyCcyAM_S-NNx40_DqvY0hEi7us',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'qCX8En0dg5218TL72uKnkYMi3idI8NmngirE18NfvKQ',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: '4OQ-I85V-G5kHcjFMKfkFKB4fNLQCsH0ZBwEU3-QKig',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: '5aA_vNwWSwD95CLZh1CgctzsLwIoviZjsyL7jvhqyls',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'fiaP3mg0cQi735y-o0s9FrG-e7RPwIt95gP7gf0SiRA',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'rrwkdNBxIjAggeRflFlj1vKR66mPDMi1oqsufZhpphI',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: '4S7a-INZQLD1yRVNYSUL6it1ZrQFDTLkd1MBVP2l-uA',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'N1kLC3tIKplRphrEBty3GYCUdyvlgMdcj-JQ-atP54k',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'Wd0gDhxzqe4lPvTv-IA_8tD_hGSF7ADbjF4i8NPcbXo',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: '-q-kqkZ7LDTmrM-SzNDseP3O77LE7VwVS_6G0pR305I',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'jtGHIv6MRIwUSlxVUTDwX7X0gYEGKQynIqvkelIOdL4',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'eM-Cv05eMjKD3nAo6GjzFs9hufPOfdYcMYJDB6Fr25w',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'tNGE_bRqqmPdt-ZY_vQXOB5R9Uo5qmrX8rYl9qvvcHY',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'TTHgU2-svpFKtXQ4DnUjT6WxaKU_TDjVlGYqqnvGUGs',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'pMU_nQcl79RVOuFCaF5Iq_2eJRxwBw2cpIbxDMVMX7o',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'voWGdtuwre-UENAn7UxYt0nEbnY6u_CcBzfHin_tgDk',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'DvSS7NoSk21Xy7LtXS16LFSdark-c3SUi9PtluYVnaQ',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'XzNyXFEhtwJ98JSf-xi98Aj03BBGqjmyHWJBCmW7H-0',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'dJ9JaOmP47JYx9dZo3RnulW3KtKSzHzIwV4wFaSmyFk',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'mjBVsYnhQmzbd9G9_VftqO6NhuB9JGiUTYsWjfIqDnI',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'QYXCsFhxUk9cMzTkX0ymhrtf-Q-PS_OY3i5iHUK_Yas',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'ATcKIUvleWjDAN0YHge7LfoD7SPEubYF19RP78USxJM',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'NJ8tsoSC44LIi-EC7tmddg_1DV1XY0syQ3NdtPA3xzo',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'V2sWs1-54WG7Gp1BhTrISBwn2uybdejLXUQ4xag38zQ',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'HwRp_G2kJzHJ-YkIryHVF0THJbzasTUOU3htH_dZ9JM',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: '6mHOmDMy6v6ST-tY0qG-EXUWegKRMaMT2ZGJXlVeaww',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'tybkOWvX2-St0Rxn48-YF9Ur4xVX9kcYHPcQvVaMz7c',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'wtdA72iF2SSKpIiH_W4cPOex8p4JLT0ndTcfEMt1Dv0',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'jsatGzKxtwKWY-9iAkcgkdGqSB6rje4Wq5crM9OFY6o',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'w-fHDjXwcygKDkIMnnXMBLVXi_fopw8D-T137Szeklg',
		},
		{
			cu: 'cu116.ao-testnet.xyz',
			id: 'CnJuKFaSzqKhh9X4nxMc9UOEeNQ9p3lQ5zbVvutHvLw',
		},
	],
	'cu-117-zone': [
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'lSnrG28SHeeJpL0b4VzSHjBanVGQrhpTpfd4lBmLveQ',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'fX_Qy1oIPubv72NUzO2tvqAHvvgCM7Kphvg4aghO950',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'F8gqeUau_mGT_Ggc8F7HLdO8fqR5hToGRQFBprLVImo',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: '8DdYrPbX0XM_3HuOqZN5zMphGFMSDG1pTMkWPyYJ_5k',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'zREPInC4d75DfklxCnGTcgs6LA3ue5iQ4pTkbmFg-04',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'LqB5evHDKjSYCeEqmFkiBvOT7rMKkeMXGDvvXA33gnk',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'NiFVY_wknUJ58ncAaX-Z7mJT99ezEsHnNCqaMIlPOM4',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'UApWTdPj2c2PBLTLqsYMEi22fR1VprprFXEjk2mwwME',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'NX9PKbLVIyka3KPZghnEekw9FB2dfzbzVabpY-ZN1Dg',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'sKsw_uwWq4DWB8WO9KudbSlvwXMYqXbQxqxAmD7OG1g',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'gjyDrhAN2NR2b8jalF5fqyoVQF-afIyUqYNLvsQUQ-4',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'gqV4jkoaV5ubo-0Z0VCgMhF3yUu6OIh9vATa6bpJTik',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: '6sVViTeVDxu1wFJQ1Ydz78_cFBN5FYIzaGCmxOXXORg',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'mBBF2s6Rdk79ic64aaZuiHbC_AKv7Ufx_fwSpQw3bbQ',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: '4tO7reHlCOB32-9ijESev_d8vW-S8P_jLiKaEMia8DA',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: '2GimdvHoYCVS2Cw3ozKVtEP8UvCzMHO2Aq1nG1_1dcg',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'KqfDp1jnu1tjJnjPFWxCpVbwuJkDVTxVDIqS3yDFeaw',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'dceqW1oFoMcXcT6mtmjKSMlfkat7g2xWydm1-Hr4gBg',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'HQ0wrYT4akdBPIzIJeENqKGjluJYv0js9DknHm8lSxc',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: '1PhI64er8sulH34O-hR1SZeBihowXzWOJ1VcSVxCsoU',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'obRs9a-s5uFUFgdPs-2VfwWtrW7WWqqFWZ8Oslf3-EM',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'v_G-mBWiWMMaoanpmZAuDof4LXS5bm2oyxKrifV7uu8',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'KtxDCuRREx3HaltYA7l7O_jKMGreSNA5f8nyQtAHpHw',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'TNQJpoLJ4NV2KLqq5HVbJ8_8DQqq-EbvNuI0UGqPV1M',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'sR3ku2S8hnUsF9Nn_wmqVy25krVlBvbDReZFZFpE52I',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'xY29b7MdcyppELjqjw_oTNbxmxZvo9hqdEsK0xsVIf4',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'BKetAa862_RGgoJ-aumrWTLVDRLEWfSxNenRCL_F5sQ',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'RG56Lrbc7PCmjmRC0iMJYmNK-0iiaxigAjBlV1YHAMw',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: '3x-KSmhhSgMbmqc2Gu86WOt2HkWVI7aNWrlGtF-AVE0',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'PX-7ScJzUpFby5ERuywEmuvgeKRcWyyewJNiNwn-Iuc',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'Zg0t6v5Se5bKVTLrX__TwXWoMebLPU-oWjjI1p3eDSE',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'VD_qHwQjIapIz1iGa9_ZoSgzYLH_DlnEE-I_gp1jU-I',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'SZZdQc7vNA5mjXFxETjJrAXCOJm7zFm4UMCAq04nHXk',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'dItcG4lIVGSsi_wufAFeiWSkKCmZR25IbUuwykpQUhc',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'GbLgLfqRMpW2b59WhIOlrLTmOHPvte-QKejFR4XRKYA',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'hJBlsMVcFhIzc-LQ1MtWBQK6EY6Jy6osUrO8wXFdpGI',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'RGCHXqeOhuGMlY120GPuiLh9d9a1orJet8LfhedY3uM',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: '2wzKlR4FEjogKCSLP0Z7pHX3GiQtEiW5rI2aVqMhYac',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'AAFkANUzq7TeqwlXcjbSY58EnUUvhlWCAjgT_bFfCl4',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'UPce4_NrhaRlVc0I2pDLpoucDFNSBn7Nil96J1g70kI',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'HQblL62FCh9rycqDwNPinfPe2aABnYb_jr3D233LgiA',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'Mzjvfdmfwm2ibcNbxV6EcsjBSenSJ7oto3c9mi5BBSI',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: '6WJvqS_r7HyH4cmSJBey6owvqU1UdVulk_xSy2612I4',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'RAlvq_zwtMCvxFaTmWityIB7CD0HYofDTsAP0uigqXc',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'p79yUWH9oA-6o0k0DCnwi3BL9j2xOTgJrLw9Fg-hXxs',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: '2KsUVwe6KGkgX4vudmtq46xsmWqVFJQZW5pOg6eBc24',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'IC41dlbx2ScOPf4zEPE7FSKfBCESiIo7KdixK1eKJ7c',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'tst1sh7h4V45MPNfoOmyGh9jIUKnv6m-C8YDoWQ2urY',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'gTGBmdzNH0wkGx31qWYI8cP1YP8I6kieMcsgxdB0gYc',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'MGl7p8pkWHEyaZRflNE6KcJ1mdjW3dGUwAedw_pBqxI',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'S_0fyWQknosQ57QWd0iuWl84EYmoi5qCyDai-LYHuhg',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'mTNFxeKFdfg79PvH4GgeXQUWUxOD4cPYD2Hh6tNS4zc',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'Dyfjmg8YMCAM3CWIvl4EECN5o7PsmW7q9IiQ_SpQxgE',
		},
		{
			cu: 'cu117.ao-testnet.xyz',
			id: 'tH4Nz4cjgA3WNFQcwvthqfTQKNA2SeizbKbVT-nLTrA',
		},
	],
	'cu-118-zone': [
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'pZveKZfZw2oUKwWZnuZcMbKsoVER9nTVeszUsJLTIc0',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '2NoaEbmmaXlxUHE4DEpfs4zyznNK748fykvBGByhSaM',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'tPhXeYiefmWm_QltD-9BLOcgivpFNcukHwWGXEHj2as',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'RQBIM0Mkj3zFWaFo31qULPLX3lKwvYPTQzUKXTK0LM0',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'M5pKyDiLdoNfVSO3l2zpTBtq23MKpARbuQT91ajH_zk',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'RGx9R-mbAp-0lGJUwl-CacbY_x4fMitzXEfzyH_2Twk',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'v_WoqgwsNr-wHOCdQU_6yFyI-6q2gv7My9qP_AXHLgU',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'mYdHHxSbNEEIy6EUkNQR5bwq4WVHRahOyE1ij1OYsa8',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'S3vae07tkgkBqLJXdyorEcX6GAkXbejFUg2_DGuQqOU',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'ik5qztGh1vy3CMW1RZnr8wpKhc6iHhT-DbCW-sAcu_g',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '-AhzuzoQ-2mEhJEJrGh0_WdP-35U9s0e1Bjy_B3_N5s',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'sfrz6bcKax76EgNSc_UU9yn7ZVRM1ueUHF0T-OeXOic',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'WhzDbp6p3k2P5H2mbeqx5B2MmQSgRs8aBKnUM3ThTB8',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '1flUuVBYljPVHRZha8dF3WXEciBoC3dDJZVBCA7NIL0',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'cbLiv_6bsPlIIObQhsaZlY4DxCFg-XmCuQLuVF9WsS8',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'dSumGwBcCQlLspeHghFqxfLtHiXGFPIRpE_OxSX4Hso',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '2P54QuhnjIJeEjOHmtofGCbcBWaN5LuMQuf8vstbRAE',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'gYij6z53fe4vCV_oZiGHt2rZb958nfghfhmmgOL_z1o',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'KUapc4QMBxsYKaFIv9NgLQEFsvBLdaL4LJ9tjUW8CI0',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'lYWMAev5Qzb-vRPuASh4AuJfcjKyLxvjWuYn5vvQef8',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '0_TNiBW3hZL4gFU8roxX2jCQmSrC6yAWMhf8GZdZdfs',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'HOJpKZTM8N1xDq3ScCswpiTz2ixOG2B7UGUS57xnYTQ',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '-kULrBTq8BYm3k-bWFp_75SCM6WQld7ys0BkyeJnO_Q',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '0WIzcBtm7n9wZOGveBHfwfpPbt_cYEXPmHnRXQNUxCM',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '0fS8S6M1nyPr-ZBVOsi9eTX_3XRJU8O8eFZ6Zupt6Xk',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '9afemBsuoZB7joFTX_4Qbd1i8TznBXHUWYlmrcSDs_A',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'dkZpI0BMCyzYOQ-_vIONh2qN6nI0suwV4Dfcpc6P-Ig',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'UtdyvhOMa24JMKIam-7RaziLNxKnFWy7NFPNCvq18W0',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'tQmOs9epUxrPrP9o3-zIm809PeITleUtRznmud0AnIk',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'Qk7M3cjjMBDQ3iAdYhNIXpr5RHzRZPjlZ8NrczRiW4A',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'HGNVx1ZTXtdcIBdji9cvc6suaSXFTKzCxYWveG36LrA',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'xlXBRJZQmu6mGJfn7k0WX2gLs-yzYBiYkpVJ8fuY31M',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'Fk1WRXGHa0UmqywicWfmpU4ikwrVBktVlvGx-v07EPo',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'Ic49geGm_TDuc8RKVp3e_uYzyo6UV0Q5BE0sc7KCyBQ',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '6wiJv0GGgbXj0A698blTfplrE7DZ8I8bhvIDKsgDphg',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'VgdmhqkhzKG9eQPjlufW7wcXbn0vNE2iaUxy70zJOL8',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '68XbbAUW0pX4eviqsZfwWVtpue2J_8DE3Og6-UoaQy8',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'DLnP4tB-10YF6oieOUaNxdmrOrydx76nEwAAY7mXaR4',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'A2DGtHxF2LYvzEPMbge36X7umzJE_5__HzUCZyULpfI',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 't69YZah09hmDqXjT6WEOwGZT03c7UGC5Mj5PEnYoOxk',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'xQJTw2vWM7-vn3KL-TWTv2Ba_2gmPxNyWWD1tH-YhIo',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: '-odoKqCNaL_eTABcjP04bdO8HQewy3r69_4MkfFKOgg',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'ZlCopq7RSYui6Nhngp2QWwoj77jLvK00rJlDIewIh80',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'okQNKyt7Uo5-RM4lMiIJGhj6RKcZSAWXPzLko3w5WEE',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'Qb7tVrhJlooPXbvDWk8_h_6tcjfaBDbqpR-LHfrHhbg',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'up8BDUCkamBxQ7wSzC598iLay0BrypKMkbaFemU7d7A',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'Y-8e9_r8aBgnQrMGxKF3VkfpVKMmL-zHjhufhKsTMJo',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'BeowMvoHuSHbDllewXW6P3QecJDa_059rxqMXQHD3ts',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'YednJTqPBJUArSIBjTIGNPDjp3EG2o1PKoSAy9z4IBw',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'cpYt4Xb8IkA5Hg6KUoKIB6sC2_JrFTzOp_RoJ9gm0lM',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'TeXPQLOst9ij_hpCC4IZzhkCKmySJtx9WVBl37ZzoEw',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'xJW5zJi2mxW0pX6bUuxrhN_xolAUKOPDdJjGR7-WlUs',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'y3T7boWsqjT4o0TZao79erHDLCUf_-RbnWzYRKGz2kg',
		},
		{
			cu: 'cu118.ao-testnet.xyz',
			id: 'YssglSwndbenUic3CnfYrwp3Em7i9JrJFXqOKP3JV78',
		},
	],
	'cu-119-zone': [
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '0fi0bmQiq2pqxHLKqZNb7gzuVAB3YKm6RjPiIVL7C3s',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'NIHNUGXt6hi7acVJu1T5oswUJ-MS-Y8L19Res7Ua_NE',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '3QCWDRc-iOdOw_pNUEUbsRCb7FWzVRdVEAz98_16PVE',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '4pD7phQ-_DhbbNFynxALP3PY632u2VQpYpYKyLZX6ic',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'feiJEHJQwyGc0OcxNUnNZuS7F0-cr3tyYkyXwBWP_Ec',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'mU8SMNOKWiqKZ5iL55os7_MH-NpeSQQ2C0I0ru9KE-E',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '9AdcaWeOh2vcNkTHIf6JGNGKnobLZjM42hw6z_2ZhPU',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'DlRPNQTxpxbBCxvq-k3-QUX_NO-5hO6EUg82HpomScw',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'NWcIbn9ZfrIvPH6pS8FjMe7ChnYI179gcrmI6z0-UWM',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'y42sbuJrk6UwYSa7q2pyqpOaBdije1yL0PPeBu91fp8',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'D4b93xRSt1HfkSud4mV0fSu_SVqFe80JtFap_pQUviM',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'iMJNQkWLedCaTI2iXYFJxGG5E2vHBDx4HXPjYiZQAjk',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'DzQ0ntwWzWRk-jYVxSSxQd-BVZ2cQgR1SMaS9mnMK5s',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '0Rx30TBCPfv2uHdGwDRHVlYW3UW8zbINmCP9wR5et04',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '1CCaA6QcQf5T3j7R8LLFBRH20R7Qyvrz73UKFqp_grg',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'KP0S6ejYkA_RVgXVpmuz_So5abq26RxXVMx8Tu_nQLw',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'FMVMfpxjphCF9ErobRpBftLQhf4QLRRQbOHNBL5EZaE',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'FeQTWox0acTgxC1Actn4HKw9dGvzrFKEwRzJA8LSJa4',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '8AgcBO7LpTd_yGPpSCEvrR_FDN0pi8B7jP5dYjPc88I',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'wUsM8Xwb2q8bu3mMT9NqSyF2QCZ3-Efxh5LIVFscpw4',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'nE8QDTcfJoMeA4bvVlAj989VHjyPN8RdBg9UvkMMY8U',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'sdbG6S_CTTO_c20-vl-01hiCptm2nfZ87IgwBf7xXqA',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'zkmm4pkiufZcV2w6wRbhI_8o8qNJ5C09ZNLKZYu0CSM',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'bnWDoTgcEv7xfTO9ZeSGJQrDgXDGADDWQIVVXshOGFE',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'J8JI6MAtXDb4AgDTACLiMkH-YOuP405Nm3EHQ_NKO2k',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'tN-JGoT_ASQtIcbcS8yE94lD7yqpOx5WX_8mj22u4M0',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'NTvhU-A4ZC5om1Knk6wRe9NdzDtsQ1AYYgMkQHpCu5k',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'J_71hUBgC0Uu3gnyp-cy8T78tNdrtBDRiXiou-a5Qdg',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'a9i0RcoWNn6uBQG81ztLd1tK2DvdZAeTHHnYsKCpFMY',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '9EzScxWoFcQgn8dpNt6cfhdLiHrJPCSDO8lsTOe8_LQ',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'u-RFbrLZ7PGNCtXGGo4iq-uL53385t8n3lzZyYfvnb8',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'scHGxpTgJEaezfNBgi--9IgFuI8tITA-5M4cGpXtzZE',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'VjvRpzlcxnW-XieVQKibCl1J1BeG_Cf6jWJhDU7JxoM',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '3t7woP9r7cvtQN-8sU7OzZZh0M0BX4esFBfsrnqBjao',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'LrlQZ_RQnInqwXQSNj4TvPz8KcE8suCVM-y32FBG35Q',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'TU_RAtWZzU83_hPI31Yu6LaLQcP7V8yBSvCmvOJlfyw',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '-HqnqH9xGmqkwvdWwWShyavrB6QOTynmsNvhntTmI_I',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'rgUiIGIGrSNCAgNc3M1GPoCiQm_KHY5sK-IEz2BjVqs',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'eW43kH1aYJIffxUS-AmNj8yGLUH3rDzFjbPQ8HnaouA',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '8tC_X9GDCbec_75IPn9S0y5uBTWQVuPV0EAlBaRbwM8',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'v9p1f90wN12dKWej8zRfSP4Bco3xN3KAzRuvDkIGsqg',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'ovqc9paDqwhWPyNBq4YYnL1-UJSu6PEycVwWgA2PdCA',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'YcraI3WEYdh_GYCmeuwJrfKPLdd17kWFIndU7-lOiUw',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '_6YZA96kuhWbB_qIfYRk5FyZMsxH9-H9_vGmetCfxOw',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'AAwa2zqVLSMvxOPMjhUVtPHS_SN1ObbsaY27X9OPCbw',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'MP5Tmzxr3v71L9ODrWXeMoEqARAiKaOBA0vvTacupF4',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '5CJDfxaZkRVTNqqcmlRw3ScIShz1wwviD4EeJwuTP2I',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'Xse140mvlre9XK_PYxdNwIPBFZALRWN1uOKt9VS87Zw',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'rUtgXdJLwF8I684BH8XCv6idmcZF0geQg-DdEEbuxLg',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'oxD8pdIb9Ju9q1m-RqnnXyq_XlgGJnhSt88aoZPZkH8',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '-d5cYL8OHfOTQhOzheoz62tPaUOr9jY3MWhNdYHdOq8',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'eQVt0-xIYMpyOA-JftC8CM0D2hxFd6jW31CPYuTMk84',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'GDVnqL6aD9R7B0Wz87dEzffgVy3KlX-xoKy4mk9GDY0',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: 'zGUPd2IItt3woi9ZIf4p_y888CYdoGjBhfyLhDVH2PM',
		},
		{
			cu: 'cu119.ao-testnet.xyz',
			id: '0kSshW09MUd4CA7D45bIDG5dwdfUBEzrhe-JoPgbGf0',
		},
	],
	'cu-120-zone': [
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'g22lgZhestOuptgdXfaH8_mF3H_LQuh6lYapTTaxXw4',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'U6ByENGeeLyXi5Cs8G_QMujk4o_xs--XaF7tRP_OeMI',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'sKDiUuBYktWurI-RgPRxWAqsssOhWYIDw7bcZBcVh74',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'thoDnEOZAhKCvCped3QHtpLS4o8FHeRYTxUomRy-CIU',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'dA-U0VLNjZVsgCOMM7VKfzlY3yzqaJ10d272hPuIF1w',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'GNW_gSeuf6XIzS88LNAef260omVG1zqStRJtoilpmVY',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'JAkdlgFvexCLvXl90WqByCroXZiO4gU0Ue17J52Mc70',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'j-MdqEi1RQ-bAOOU_uFEfNyANqFDwNTBfpNz2NjUSQ8',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: '2iQJ_56DIHgdTrrJGidLodqJQa-Dd0-WJfVVeHEwtF0',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'B0MXbCOTzRzo7doTpNVjEkrBVXAmMHFKYdR8Fruzzqg',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'NQKUM6IM1N_x6ecfg8dFX9Pfnkj81eWVWnJGm-sucAw',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'fgxETj3dIh5J3AvHbyD-TwrI6hqalKMKQheYSj1NA9I',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'TR0qiTOhO9RY6mWCGdjJcVSA893LHmnHf-4REXCbYb0',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'tyGOybURAlie_iuPz2oB7C5Q2_OFgJDcaiiB8medSNY',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: '4_52I8yhUN03t9eRTh1wObc8qVBJuhjBQxlVlwTT1gc',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'EBc4ZyCnhRFHvoA-w2N7P_zfX1tFBFwDO3Mbh2kq33E',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: '4SzsElKIUyV9g-HG-roYW-M29VpgH5DYLV0kLq0kgSw',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'mPtktbq_oeeZkm9T12Dz-vjWMaz0NHpMHKhxvIRnZYI',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'b5zgk9w_4D9Htr06netIB68s9dkPX3Zxp9ELh3r65AI',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'lY-PLAET17QuLrNMoZ-Mj25qOKTFaN6i2jO3TaxnrV4',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'SWl-SG37G_m6Bf9ZZvqBSd5M99DhmNCaNEvwVy8sO0w',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'w3RY45OrUfBs2VYolFpwTJeyg9FjoYc26vH251q1Jyg',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'Dyef74dCjnnI1a0q8a3vDYLIdIQIkO7dGZpS8gsFqrk',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'FlKxjkUQKotE_BzPZCfGG_H9yldrSuUIHpsFcFM6g3w',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'rHOmuWxs3r2DtwaEXDL0lBgSDmqXpkb3TDz0Hbogcm0',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'NEF0GHKiJe7QyTpgQbymSVlSJf7pMe-SRR5I_sFNj4E',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: '1UBYIzDqD3pxAybvwINsHXyHbj5ZkTXRuFKKJUeg0HE',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: '0t1yY_ABqA9HoDbA8dxHOZ6uj_OGjsN89PXOG-Td2SE',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'NaWRqclaxIh_B04Xa_tiFqWDdpS1ev3UALhiAzDXq9g',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: '9VzbIDHgvcywKtjVdY-xyacWus1c0scLDuQjxCVh3zU',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'Stzv4OtHybCNCLlSCH3G-1sICtrBni3qhkqTFEJgpeA',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: '0VuReuGNAJvMLzYSpTDSG1K0G_96WJV4yYpS4ItUe6c',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'ngaYb2u5ZJKGjR7G9xCJkpZmTyjBYGRIY8Fo-RsNPvs',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'iCMm8cyFKSUNpwe9MstkCJzDZPBt8MCgk_rtZNeEEkg',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'dPMk703CJPPFMemE9opFg8hAFPXhjwHtpiekfnDsnXs',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'prpjPXcTB5JjsaCsJiZDe0eTt5t60UzwY5feE4q6Jfg',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'Rg5PXRh3aROHMOenBdvoWZYkWMWpT6hyp8BeRUryPeE',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'F0YaBIVEjT1Hhv_84qb7YzlxjeuN8lNtnLPm7A-xmEM',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'KNoMumvtDU0CALQUicOgDquJgJG36LoLRNUQofyeRLc',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'MGZp3ZVBbRzw36dzed0ezOYshmJ01GiA-CG9dm-ZD5k',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'VnNeQdLVhW7OwvV2aMGBgQCeX35dUUqsWBiSiuKsRGU',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: '0JU6WP5Ghofpz_8YLnttgkldELj8VaM84mD3Z42xMtI',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: '31RMGHKgY1QPdT_NpZ4pBIbRXtO8wMeAukm6WkwOqkw',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'jgV_r_Vjq2zAAYpE8yjlN2wiXrjM6gkOyX87uoY7EiA',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: 'L6Qhpe_oJ-mi7zOFTp-oifyePqvC9KXMTueUJzCCLZs',
		},
		{
			cu: 'cu120.ao-testnet.xyz',
			id: '7B6NnLlrFxl68FuaFn2o_thNtNBU3unHDtJlyYiId0w',
		},
	],
	'cu-121-zone': [
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'wnFfJShQk8W-q88_EbAtXE53wET8Ip-9l8N8r_5PmFQ',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'UAkDmHJv_v2k6FHd29wD9xL8cgDgetEuIhgfSntr1Mk',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '-1Ul9BcdLDbMMd-7l3dZCBpCm50WQut94ZiLw_V7Wic',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'eVUNdS8XOhMQmFreG9qNOTXRgHS4mIShjkRfmnXOnwI',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'YQ_ZZoWZ4WERN5jPoeBMfT8XeGg5OPW3EEUaPdNcm8U',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '-3txIkX35R0eBJA1oqSYsDDkA6tls6pRYElNG51jaAo',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'uTmtH9qPAw5RSqbhhxLQIiMBCKTON9K5fADvJPbXq40',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'vjE8OHk79QmGmgdiDaUeDYWpA6k9SPslMm5txu4ad58',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'sEqpfuARxk3UtE1WVgK9mY_Yem1vRtS2B6gEwMKH2Xc',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '4TRfnOygyzugly5mnB8wcCVt7mBcMF3JZvwbAZVbCBY',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'tCVyoVWCbU4ShlIv-qN2kpdNgM0qxzd1QqY64z3Eles',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'UUbZyBbsNG3O049W_unt2Tsd3jssGjcWDxB7zZAn9bI',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'vSy0dML4ikIm4UWjSHqP-1ZoH7J5g3zoS9T68xiYrFg',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '6AGwX1pM4CJyL0aVQdCv3SJBbVGyUd_edRgOZhFgw54',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'EQrVKOMCaBJx8YYBxT_uytuks0G2EzSm77LKg9OpeBM',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'oHFgmtkZcNLSiU4P2ESTuBJeGtFNeITmR5ehXA8-4fU',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'tlHVM4k4cax_1rEbhym1DZ1jh_uY4KRW3r3AWwfEbo0',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'jBWMs-D9l4mHTGfqgzYmk-h6vAQKclFx4xTahoTAQus',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'jOwzuls9kLEURvItXoCNbMUx7mQ6LmTrpdqqVIwGH7I',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'Ts_DYpxUf2-WMMS1AdnRu_RL9wk4C9T6NR0AQ7TVYAs',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '6STsKvR2YcF6TkzXQ9Stc4l68Bf163S0xhpVCPuZWvo',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'pqZdFcPFJH166PY_qjJJTaSn70-SmHTHfkCYnC8i6m0',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'jiLPUUwHtOuYDsxV_zb2oxdRHOQ5jPVQ_jvepVE8aTs',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'AwIstF3Nhmk6dHYtP4U18cYr163blX1Ej-SQgp6qM3Y',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'PEh0jfMDmgYRUaauGSAdw8oRfUs_WOHBbomKjNTJqlc',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'CKYUKAgwmap8Zg3_vapPQwwF2W-qpCKuS2yw6Ml-ntY',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'v5x53TQYxh_mxpkOgHjeRkGQ89FdcdaOddNDxGMWBGU',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'jnxz-ZDhpnoytL9I6JiXylobWtk0Uma-FZ1HDEtJfwA',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '0S8xSR9EqzbYgLQkmL4CzY1kZlrJmSwnYiFuwoa__Ok',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'n1WS4DVansUqv49lXNGxb9HPtV_ui9h3E6pRizRvi0o',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'r7oRz7RlhKdrhAR1i2EFyCyJ4Cs8w0KqzD3qDpXoEaw',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'b-ngC_ltwKxxHwEWZe8iqlZZNgK2Kjq2n4e1D71j3Is',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'pc_9oDk0OKNt1BXQh9PHop8edKIaBrbJ37ga77X7gSo',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'd0VnU077T4o3u9nhluhidlP8yIRVRlEuQ84ZEJRVo8Y',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'DFSIbRq0kGpgJeBfvQmMpGhY55r2OzPsDjazUnGVoIg',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'lxb14f51jq3902wFg-suQiNJ45e9_U9KyU0g1Gau9Y0',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'VWi3P6NVFXmLjv4Sbva5FGr17gFv0WBWXA9mxgq37WI',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '1UUGYhwZwc8Vp49lRbGsblKPilN7Ba3zwNcNNIGcyb0',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'f8nL-FMYYD2e51OrUis4p-8JrqSNbfgvgQPbgxuW8B4',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'avCURF9lKIc6XH3RVHyNKNrwiGDxSks99s4qpa3_wus',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'n2nvbU6ZQnb2gEIIBIzfVshpspDy53xjxZlhIhQ-wQ4',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'IT7Yo7pCmnan9A7JEMz1wElP-A03ckjs8G_GoNsYo4k',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'nVIxLlEzy-umDbH3mxLaPalYBYd2wKaFuQRkMBtCF0I',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'mXg2XGOJa_ofrqFVHpNLfz1gYZJ_KOxH_VGPGS1BFmw',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'wjOWalmFNtcqwE3Qe3EUcx5INlmS0aP9zHQOGnWjbmQ',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '-54FjWmm4XQzM3CqhofJNrh09-nDpYLeeLnf8YztL0A',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '6gRJxcvSwIqzwHjMhqaaI4hr0c8JCI2_nJaCjzW_w10',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'dPUrs7wB-hETW-cYINRFu_rUIzUz4MtWAhY6AeLtb0w',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'lF-NWmm_eufjAzkwU3Ir7vsmNrhkLev0axwkA3y-CBo',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'JlaA7k90TMF8ZjVep_9g2BRcxsx4DUwyzVN_4NFRV6Q',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '9NM1zDXQQt5lxZIgNg9nMiPmKJtlEK2W2VMLg4uYQ3o',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'pVk0sW0fE5akoeZ1vx41WXs_3-652MBF3oRGZQiQF_Y',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'wgpCIJfcP_IxjYOSBNq2ZBuEC7eHh6h99YyeHI7_VJc',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '72zPa8wXuPI386nG1YwBIkIj5U02P4lxieaOZGVMHAc',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'SQQwa-oOW1UMVHa1jY9geREU8OTRaBmal8uRRWk9ryM',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '5-neZAF0w7HSyVzyKg3SMp0rm3-SSUeVVupf9F1Ot64',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'JVVhbVjbXZfrDklToArdGeJaN__Sv1136TYD5cjEC1I',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '17UtoDQ6MD4XZsBBkXF1jeajkiZgA22ADa5K8Iq6FSU',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: '8StQKEmGX_1ri9Ixh78QSgnsJxTjlb-_ggsyfqw5ZrI',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'HqeqJ5kBmTndnKjGiX7Yxe5jTp6P3OfsTYsDjYYRnbU',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'GPIxww9BX2UbDl9as8sC0_jmPZwY4UUCjDprSdQZMo0',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'M6wiMKz_mOwIyLZos2GnL-cSjKWF4q1dVAZLTMmMJac',
		},
		{
			cu: 'cu121.ao-testnet.xyz',
			id: 'Djs_N4D3vcFhVwjCa9HclzQpbxB9hpMYUGLwI3ZLL3Y',
		},
	],
	'cu-122-zone': [
		{
			cu: 'cu122.ao-testnet.xyz',
			id: '6x2bi6cSGLM1Px2XYmb8qqiIYXzS98AdEGeUNYicX-M',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: '5wdakacUo1vkRGgG9QajjWsLsAWvUKHC9Oep3B5I5lo',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'vCi3wZXdfhe3uQngsROdTfn9UM3yvtJyLSuf3eUCKew',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: '7kqquL0y4TGGjL6AJR3-nC0ZUNOK3ZT8IDeOHkRAaaY',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'ICO1Hyl4oqX7D-NVyGgRddloL63tfLrkhjmTLiA2f1o',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'J-dx2Y80elBYt9lIg2Ol7ky0uK3u0rF68FJ54Sg30zI',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'XUxJ8x4DKjEK82dNiMhcC27iYSylzOP_am5jh8VhKtQ',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'jFjr02K61lKQgW4zwlJnjZcDZdWLiSoh7kvW5LNnn3M',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'oRaaoHqcwkvEhgtJu-s6tDCwkXFM6EQ3BgEcBZHI01w',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'yqzC-GQjLzAeZ5cifibwgDmHQKySNss1WtzMD0Wsv-Y',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 's6P95pNsqzDUbIXJ891uSCOtWgKjyaPworyfIv3O2J0',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'Vo-CUP0ctPs-via42FC8he4BsV4eSRQXICa1Q3HHGMI',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'cZSWwQseaYvLMPjPkcQbEYPn4c9ymWuV1xXxehRdB8g',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'CMB6lw030lFcemVnKMwit-9S5eAFQbuW-6_M6Rqt6Fc',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'PubvCA_a4i4eWlSlRbsJxAshJdeRuAkTE0aaFbY6lRY',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'eOFb_B6NKe7ZEsRXDOaV4sGi58QbpgA3VwJGPqOjM0E',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: '7VKW5BhbOwHnfNwaPDSugHK7K7ID68dDqkYL9NzbjQQ',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'kk9ARFgzDWsMf0ytbpEPEAfeLh_SgSnNtUXPIsgJDoU',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'TfIL80ObQ-GCfIJA0VX-vzbv7e35SrEMMijv1q-iT8I',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'Khm8OdABOmDWU76AuLxrEzKCFAf7xthXbfgPCkCdAG4',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'jHuaM7shZFiUMvJBuqa_wopayCAFruSDCwGZbAlR1ok',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'lGf7l0HNY84gOLjFScP956_sklX9gZvaym8oVCcAV68',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: '_pxLINhsMJ7Cmj9Kvjsv-KsP4tni0hjSAjc3Hh8XL-U',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'V9lysasFWzctFaixy0Kh2988qMBWmdCW3IbN1qB54Bg',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: '9B_SpLUsmp7kWgCz4ZoG9zfTqR6VSwADKH0W6uU8ZJg',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'dhAM-LRMOO2IZKsnZjWexF04GF3gRyekVGB2UXpNGEc',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'YM_iAx29jCZyosMuY4dW6Reb9ez7jZgBMcf-TEV7wFQ',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: '614um_3FKIUbNtWa_6w-xO_ua4CmwHZEVfw3wUC3am0',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'ldy11agZIU8nYcQWeRx90mnQlEH20CzkqeeYH_4pNPc',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'ZwqKLXKicgZtSv63KqZYSWEVZmcLCXHylPwHbFesOjQ',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'tnzfEWXA9CRxr9lBGZbZfVEZux44lZj3pqMJCK5cHgc',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'GUdPRaYY82JL4mCSXOf4XNAuEL6ozkpF24NETVstx68',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'pKff3UIo8TOO0WuzO42gMH30XlPEFOfjlVUuBg9ma9I',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'reKhijpKchjv2N6oX4FD2KADGRiW5QaUSD8cZOoZ1I4',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'q4Vdgl08CCyLtsQrucC4z33C1R5wiTj9wD-dPm5rUpg',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'vrZrt5DWVdy9fEqBpW84ocG7vyOuCGOVdHNl4uaM06k',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'XlPQALU15xTcbEmsGzgFYO8BDUpMKm_pYlMiCCV-w8Q',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'vZ73DR3rcaheQflBX_8br1crz6OgsoKRjDQlgGIlKBE',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'eh09yjNywTBSQ9EYo6v3lyXSGCyCTJ6dHEEuk7zCwbE',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'BpJX6jUOo3O8Xxd0HpqzbwGR2-gd7IcQArEkZU7BffA',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'Qi4UJA27FVEILIycLNyJXEoc0qRQx-MmN9RrO7wmLjA',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'JmNBwoCktn2uZbYIsaoLcyZk5-eZ0iThFHlVY3mhmuY',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'K8rE5RY7zCUaDkyeWKCzRJ3EKx8JlrC9v78-m8_xSIs',
		},
		{
			cu: 'cu122.ao-testnet.xyz',
			id: 'VYreZBdRiDDZsA8eQGvIB2Y-uMDVJmLqvT_IyRTCIyU',
		},
	],
	'cu-123-zone': [
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'uMkQfW00SVAPe31OxATscmJxMhNiFGLK-4glWi_XQF4',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'X3ECA0uaJhFoQCTcGYey0tjsczTtD8A5BNzDCsBIgkE',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '_0Uy6inVxXmr8W0GXbwTfGEYcwyItfJfeqPVhP9VuY4',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'o2JiSb3OSJuQ2LcXuBYv_LgVY17hBA7crr2e2_KTfUI',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'OI9LUYGThmFKJaeg58VSndJeI0dBTf-9ab-qUvaslaw',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'sd4J7erhak-SReRfkqeDn-3d-Um0JGmX8_M6eLwyHCQ',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '7QGYi69EBxOVByFeSioMmdJGHILaH8UxiMv7jsu0VpI',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'FBnbg6iVGRYd3e_QbaNywDwGflz6PZqIDPZ4GS7SEQg',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'm_v59KP0aoM35NgUdoNX5Y3LkFJcuAKNWRZ8Ou4mMuw',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '3UQd36lYPe3ITJJpvMdytTC-o1BsVvG_-xT5oQkNFfk',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'YrzAQ9CELX6QiIW-RO1F343p971Tp9ZMN9Cw899Kxgw',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '6i2oHjFppSkZhjG6z0x6YsiIGtXEuEg8nhM0n5uJQF8',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '6tq7VHTNUa3E1RjpuW-bHY3M_1NgXDARZGSWXEhK1ZQ',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'dWOL3ySrRoUTyEw0Vo9hu5su9kZ2SpQvJUNb1jIko2k',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'OnKKXgOMh_yiaBWLIK-T9LOjrqAr-rWk08DMYmYEuGQ',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'QA0hNNMcVc_802eLhjgnW0qxezoX1ZM9r1hv0n9Xz6E',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'x4clP59EyMrdz47HP0iidAXYvibHv-KwbvAXq4kfzEk',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'Hgiau0pYKgqh-cu0lmzRKwd41vniP8Do6tsbBnNxNqc',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'szljUNl2I37WJN2YrzJal8TkEieUnGd9PM7S1w5BNd0',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'jAyJBNpuSXmhn9lMMfwDR60TfIPANXI6r-f3n9zucYU',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'PAo1c1_6ry7f_VJmSRw27gTF8PtTv-le5kFGzeQTmio',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'Pm92lxp0v2rnrXCasvqPhHOM88PUW87d8INbDOwzaVo',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'EP77Dl-LrdOsdB_C03Ibw2CbgILps-W2FJwHg2OJLlI',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'BWXGaXNrLwUZKkfPsX6UXHnrK66QKY3ljHk760FKKeI',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '2psviQ3lrxbnqhUFqUmBDpr690Dv48dgC6d4Epbhesw',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '5oVs8Kvfo_jyIaj5Xd0hgQTEMiDlCJGjOaDJsdp8U44',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'cIc2EBKapdmn3125afWJYiFNQSVJRNEeJKGD9mDBtCI',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '0XSydz4P9mIJVJZG4sBJB1uDXmqJ8b3D1PIqyM2XgcA',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '5JrQFqzCpgbXckXqZZy-ULXxmcpw7DNGJdInzGT6mlU',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '8kSVzbM6H25JeX3NuHp15qI_MAGq4vSka4Aer5ocYxE',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'FlPVn2zv091qHr5nCzvSmeUswpR_zZ1oT8mW_4qcx3Y',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '_H706uTfwXGne4ejTeNnphTyg8SDS-n3gxQoWHUWk0E',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '_-JHiTCYy8cG4dsQDm0kHKF0I3rJit1uxbPdNqQBE_Q',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'Aiqyy9wgpVnnd96rdCRzL-5La568Rr9cvRrd1Rcdar8',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'xfRSzAg1o73u3vTHeWLJ4Bjbdojn6MXn-6Odc5rnz-k',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'vTRfwiRmR8yPX1PuuTklVZLnhhyq3LLORLkl6cIsGRo',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '9YZmxw394EG9tzlQxt2XTLp90E7iTo63RN3Y1Qo7MVg',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'Elfk5z4V-gC_7J2zyRNFfR0Yndd43DVJMU442E8AIqo',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'J7B5ge--guDVwZTo3cxevoajcqxTgChEJSd6OFsYli8',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'sYKAAClRlO1WijI3Fdsilxfc7H_E9Rz-hqnxpA8jYH8',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'B01-SWdFGJrG3ZZUTFUAV4gmk9lv5mwkioJXwAWYA-E',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '189Mi1YxlNe9xflHyZSIcM_jEcE6dIhegmhl9Q3rdaI',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '2gVe5g3MbS1kYA-JFuKYHRvuQaCgwyB43cv7dc3Fot8',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'XAYnAxAEFhVRwhUyFKZmkeTiazIZClQIELLw6h44Ngc',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'Nfz3e6tZcD18DWwkMapNr6Hy7-OjiFNKlyYGZpVcIls',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'Vt070bGDzjfipfEzGJ5iuXxHMAWTq3SsXFJFqLVgz78',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'EFu9jES2eaZm5dYQfJoPEbymerS2Cg1h7RVPxIagQ2s',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '-3BtQg5zL2UVkdQ9MjJLEvLOnvusacni0AXaeMzF9q8',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'PLso2gYgBNd9pU2yqwHXQoCVHOW02tl42YnbW9Bn8GY',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '6xKGwe8BCwUTKh1ieEC31__zlKB2eqe5KvORZi6VFj4',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: '9BdRn3wvu6Hv13rSjEsULXzmF5yWX7IT9fDtFgRPfhM',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'JGOmBZClt7TKgGg1i6m8pMQKP32cCh5U82fd3ZjLfbQ',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'MWzhvARbhE0IzneFePA_wBKRttmm_O2k3HYIeDPD3u8',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'qnEZjTjUtkw_1dlCKtEzRfmS2_U2uYC3Zt1_pxOJtyg',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'Fntcs_1CZYNck6932-D35sHXxERe7soHFEZUwqq6anQ',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'H88DJhvQ-tAmuRqQozvECg1ptp7UD8pa9aQxNXHgN1Q',
		},
		{
			cu: 'cu123.ao-testnet.xyz',
			id: 'R-l8GpnnVgv81WRxQr5M50KruspuHEJXDgTIveoXquM',
		},
	],
	'cu-124-zone': [
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'adyU--yyfN8Kil6FWvJJkLOlpTvIuTybDJLyx7XFZ6A',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'FLBoy5tObr8SscAOv4jtANG-4_Jth5HDoiGknuy415o',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'iGCIYE26d1x3LyX-eNcG4cgw_aj_wIrQ0CKsGjeQoEQ',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '5yJfKfluy0lbwBY_9JDBfN0dZNi6NoLqtUkIzg3Zc9M',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'FmgR_bscMjUIfRJW0W3YNIGmlPnrqEHABMOm1qM20Us',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'uXPlqZKVLN025MIkgkuaKgrDllYeJ-hYK-wXsWumjR4',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'NR4de7Cf6q4KT96ZfP0VHEJDLdN5qm2h8r7fZ-GaSx8',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'xUMYn9YfFo63DDrnTEisBTAKp6HsPP5IxryMUv9PYV4',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'yQTGThRpvWenbGA2oyiss5eDl8JA5Mjm1c9GOjcASS0',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'UxzOlv0ghCGwiWubZsg6MfFpAQSPXls12jh-wDwn12g',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'S-xytd_SaRaaP9YibIu6A-8XGzJxNnk_-Htvf6KPJfU',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'vTRxtIfnCM7geZwtZOLflSrPsTVeX-xwGxkLgwTWjSo',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'ZmgNmAzTX-jxkSdBjTuuPcO_0Q9waai0IJ8MiRux0AY',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'mNkBBq2Qz2CKUU4OE7FcNLPpqUOE5vCIpZnrI2d5rMc',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'diX7sJzrgf9JmNlygBkhPDgMo_Ov-yHlBMz3YuJ9je8',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'a106oc6fWkwarRkHPa7z7b1Um3ua3ffoeebtnwmorFs',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'QkACT-5LSjfaojteyvGvEJC3ImQzIpKxOA2uB_KjfoE',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'R1Xu8eXv8Rj3hXKRLaVTzOgy61OVICmnqHinje2nfv4',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'b8anAnIMBYg266eL-3HO4iTM6xCjLEHsqcY-f7gvCR0',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'GDJd93bcID72m569UxClOCTWnQLut-LxUDqL3a2TjtI',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'mnA5AAIqCpNQtjjaO-8aXPgrqte9_hzWps9QdNbkrRQ',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'zJbrY-aXgZXifMr_EEC4x13rcld_mGV5KcDXwNQpXEQ',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '6kWk4nWF-RtBvmX5KOxgYm8ezgxUEezqoCnQpf1T6W0',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '5dR4UJpSyQRwxL6Ck50mwFFzmpbEx8vZo7nMWRBO2hk',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'oZJi7jErtCQsEgahAnKZo7lohsDFXIDno4CA9VRcCTg',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'WkCJZi92SxU6jgj795YViRknNpY4fl_XfoZONa3toVo',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'vvZFwONbVjr3Ys58B9XFs_GYlsehCLMm5xfxWCcEEAQ',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'aQ0r3YQa4iEDGwUqPSqaGRefvMMAhP0J34eMOk4nn_8',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'lU7DXH93FqXLWlkQe3MSZ1rKZObd69REuwJvVrNFBKc',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'QRHvnOsoPAX3fz-98ExAhNC08A0CQS4F6ODzD3jx_f4',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '5npTa1SaSTZNVmFjTIGTiZLy95ddaY-jFvnwQKYm7Us',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'YRk8bFEntdYWg4PG_9aQ8HVcwWUOhOqmFvJx4iz-2bg',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '70-iQFM_mrnkLoyfyAZSg_1g-U2HW7M97MDqSViiZFc',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '7BGmpymC52QwinLr2eqW_Y_5sH8EErgTnv5TMUb39oU',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'dJa-72WxhIjGx-bV7YoXrL4PKGaM8e9hIevUNkR1HNY',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'DlfLjYhNWdETMHD5p1MhFSRxSAJBAcnzOJU6zIhsVdc',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'DTzpqiKsp9fg795UxOikibd52hqmZFFL0_ldls2LqdU',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '0gZqm9yy3xrbDFO7xYo4i5MDb6QuWQST325vcMbJ1tU',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '4P0hdD0sotTKiRWjG8o3bUlrElsO3L8aOqYmbW2bHYM',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'Z2EGtSXorgDB-R7K0MEp3SSGKkGSZZUJq1ITSjuYHZc',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'm89hM25Z6d-GaoPE31-ndCBHvyCfqC8xRJ_aeTSG7tE',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'fOUjDUa_vbjFpP5UyHxhjK0UUiYvsBlWoa0YkAYDFQI',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'z57FN9bcxpmdZm2bUgfWO3CETw7mSNeE2b-11CNiFMM',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '15sqFqNqlUqTgGtirOw_MdwHIFza7wdtQbW3CAPwT9M',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'fIAkZccaLfK2h3Ts6Qh-nBcnL0SDc8uFJVbc_rqqlaE',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'Jhs3sq0OdkaZKqz-8fUn9zDz5x0FBmi15trXwMwxpIE',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'wj4fuHPSH06E0m8FDZ8CbDE2oo9vTamP1wid5EQKl0o',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'BAg9lz3JcKa83qR90aosgtcdXYZxDqcXsZMhAqF0J0A',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'jzpUVCaRRonu6vJ1cj2mYMYb8NehSbEa1HJOh6S4yMQ',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '0vFPv8pv0LUNkaXojEcNzFWQP9mrkjpgjrKmpG4bxcI',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'smsjXN6RLpDZdrlyLQftLee3W2RmJvJGBwz98cMyaO8',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '3kac5bqhK7SQvsn9z4rDIVEKpsqDoOZvhao3NU9OXsI',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: '_wQj-HKpPS-fL9HUklfhlb4bxQ-VBaFjzzPsLBgX8y8',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'L1IK6-jz0_NANsEv6BTdMPffi4jtGxDFTw7iV1p_amI',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'xGZT8U5VLfKCeGUQPOEN0DDQHN_8I623C4E97FcOmD4',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'uN9W0DFq3vB3L7CSybBBxVgagCcopnRCt5lUfzodvj4',
		},
		{
			cu: 'cu124.ao-testnet.xyz',
			id: 'xktODJSluoopEF222LMbBA1FAZIiDQTtmSXFBHGZkXo',
		},
	],
	'cu-125-zone': [
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'nPyvusdfwmlOlaCPR9kyAXnTVIvsRBMPgCyWvwPQT64',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: '5b1Aw2RBQgAsqb3s2aWZQk3ZETfntlgiL9SLhaokb3c',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: '8HfALIRHYQICfG9TCRwNIVyX1fD9d8RSIJWQvyTaQYo',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: '8wEhvPut8w50aj9J9irACFjnDpQ_l70hOCDnspF9Ge0',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'M80YPdW-uwteLreoyQmHfFTRNC44aOiewKENZvGfvZU',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'RtAHs-daZYTUtGkcegYQc762wA7HiqWSX6Y7YcI5WoA',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'vmufLX3L0IkxEpun11a7wJ0MEjNxgn7spPPRmTMi3Hg',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: '-M8Q_6BuUoR_GjPxrDvmBfO-pGt993G6f53R3pPtuNI',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'gEuN5ajOJa44f4znJZLqCy_rpf2wBgZ_adbjnGReblI',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'z8Jkv8ywvp5yJi7VQAsfvDg5cQLCKRwq-G_Kp1lyTQ4',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'wkk3MmtQ0T1DeaLhSR54IqbOp79v-YtSxgik9BXH29s',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'DsuAPiX5QuqlGIWsaRd8VavRzTkVvz2ciXBdsQb-7yw',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 's_BCXf69T8_XW_vvwNNc1MCPb6wbJgkxgmzhzhzIihE',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'pedn5nLmP3Tes4rymR6PbMW0533etEHRUUHbRZA5bSM',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: '8CnN4_9HhkTx_2J-KpK3EBYpFc3XuxjskEOVwxeapFk',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'O49hVXsNBOLm9suGYgn6iHh-iBOFsIknQDDRkYLRPxY',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'Hv7JYKPeHzBlJvFJeOYSYRps9DdsJ73sXMXK8xf0LtM',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'sDJ4MRMQgNljZk4K9CVpgxd2ueypKtQmPF1rVUes7NQ',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: '76CbZM6fSP7r4cXPOUXKS97lkrl-PwZ_T11DVuHjfsw',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'IL4QlVaHg7C29AO4OvBJHRWdZD0eo-hAxV1-YvQCt6c',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'cbYlVU3oAM61A1BivJOQqtlzBZJ9CbA0LYckoS6CpMc',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'dfGyFrjgZvX5civqOA_3HerR6tSEx8Tv1uyXCeTPRzM',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'L_tJOR4uID0WspjvvmrSI_nhNBxyZ6NXWK_k_Z4KO20',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'BTxGAyDagC4ozQQB_guN7b-DW81jlEgw3yxEryDFtPI',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'Kpu2Qi4lEde9ruQfT6uIOlsXfc91KxA8m_ZiwC6ROqE',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'YPG3Xbb6BDzpea9qpZM_zuCnE-s8obSMFPPc5VLd4A4',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: '4W8X-tFXQvTvaCPmSeisJPcNv7cb9LzOI5sZlmvDjWY',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'oJEqW3M1GdGWN-yhDW82STr29ewQjrz4E7oEbf_ax_E',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'jSYQN2ykve1HPzh9Q2ipWW-iHxrggESUyXfIxIXeJA0',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'YA9CwhLTeEvZ2sKmGVtK8f6z1a71x2bbWl1JyRVxDoA',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'ZVQMnZ4wUKtLJnyY4hp9l7cxpB-y_AQM6hJAS8GlvEQ',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'VH_tWOqOXMDl7ECer-OkW7kY95jCTcWPCeFqEPxqsoM',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'TtlVq-dbqHrzPuJtsFPsu81-FBhIHlifIMSD3O27Zvk',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'XgcKGOhZwoBk7SwQ6Opz7sVkpgshx0-SKSzTQBvI5Hc',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'xbb6i3M9dZX8FI69gcj6aYxuu77fCmHHNA9Y7vBP8pM',
		},
		{
			cu: 'cu125.ao-testnet.xyz',
			id: 'FUcZzor9LDq0XDIxNPQ8ECRIuQ-6c40htSvsIPieCS0',
		},
	],
	'cu-126-zone': [
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'IVp93-Zqmi_DSelzFBk1XLfyAjgL5yewCjhAod-TUFw',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: '7ib0U7Q4uhoKovZUgUX2s6qV77ezfTY_8afT-n41DgM',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'lmXmrtVJhP6cejYQKq2S_flBtOPwNp_s55VJe0cr43E',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'Tp5qJ35T_2B-f_oHAZRqEFpg6YQZ-XurXV88ttaJ0fc',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'Egs6eIxqHzID9jRvtCukS8vtjN9S63SMhOsuRo2J-o0',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'YFZsoI4E-jHR4TKEp47oqh7XPa6-oONABHEoUp_eFQY',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'EotrxhPX5ejm6pTjHBTsm9yGKDei1T1I074ocpCFVpU',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'pJWjNyHwh_nU35AOkXGcI2sEdE5IRG2MZc2zfcdLnqM',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'GUlL7Y86UjhQ337S5X6s-qc634NNAaS7W960PCk_jQw',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'r1LCDc9LOuaNKKAiK7nAojWUjUdAB1NumCetin_fjGo',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'xrtZSjeU7-_pMJB6ytNmHcGq27xavxAOzfmym0mtdXI',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'II9_S07Z3_f08VUamJktYa3H-JEjA7KTmel7ffVEw6Y',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'Jht4dNsVCMHTny2ZzqCMLmHbHHUzs2HgqeX99t5Rf1I',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'xe_iw6MpWLBFRiFnykXc_C4msuWYdNizEIpj_ius8OU',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'feUuokpZE8q71Xk9A3VWfiBjAruuzw9NQ_cg5rHhflI',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'xReG7WSPPWMdJUfIqvScthgSBVdKasryFC9ATd7h9mc',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'hiigJI76My-WxWpZWwjsiODK1YxEJCF5VLi4-Fg1Fw4',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'wFZ-yvp0jC-SCKK0YAO1Us5rvB8rxBBl4h27T4tyPmI',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'x1ANcyyOek9okqVXSGkQs-kMAtQYTw94BWS5vNAzu3s',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'bRNwvhrtJd_gbrFouWJ0BTtelk98btYGX8aaqYOq4rY',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'l7Ux_-QzzuwtwCQcrGzOHPjLSIchHMP5GZvVRDrGMkA',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'GmjGArXqqR53x1ASMlDx4ogbRt5ldB3ct6CBotetUM8',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: '6E-XrO7llfTHah8meeaOkcBg4k6RTV4qn3kAdUFksdY',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'yGwnY8MOUUtEyHSnxe2lC_01qW1t-VJfacs4Tn1sssM',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: '7r6qOJb6lLrb45KOX75DOUgNI86ty5bvJXimCT-cKQU',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'bqw5CvO4y_B2THwE5QK_MjcKTIqyDmkRscxy5pYYkzk',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'eVejuXSlDa83uGNwD17P-Y1e2VF_4Aj7yFS3VJPnGjg',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'Jspw6iCiV28_zn24vMF7GhJtTjmDDWLSXkyj5FOcFC8',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'rCNHYZCPleK3yoTNPazzh2Knd8WgyE1-uYiV3lkHyNY',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: '92B0dy5jRUGbnJmRdPwTARuz3Wm4ac499SpeM1cKBHA',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'XlxPdxFEYUY0OrLy2-0tS1PGSI3RbUK4nyt8-ZzFWhc',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'MpRyGX9jabCD1dBYAU2bKh7-Q3QGyeztQ7ktQZNPYLY',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'OZ7tg-rWlTTHbYVPsJso77xM04ZfU2oLcO8deA67_s4',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'XupC1_2t7ggULRFfqM1nn-kBSyOmYs9iPehxd7eHwfE',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: '6EVa5jhF-u07K8yEZiZo-MSPjgcDwsAkNoxorq1AYBg',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'cuOiBDicunkvAQYIkcc1ms-B7K2TBBhYktI3roTSbTU',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'RZpxI5BlpNHH7VgVgSmNLGsZwXAcfCJnvQTpuft-jhQ',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'tfbrzJ_ZuQK1P5nABdlic9nl0wig6r4pDORFl9vBjFE',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'jnewW83F7onc1B8vYu_TBZOGUCPa-j_LVBQPGUMOxBk',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: '3dBzS_ylp7aPWzQ6ZsRPH84pi9Cm-4arHkQCIzmYVOg',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'wlIqgbGGl33R7zcwQ4jdlLV2ewPNwb5O1RWTz-TUJGs',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'u0GxxNNFFyA3XrQznuHuTF2tR2S2MXeuR6p2ShIIjWE',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'XwtoPBytQqvXv-6L4-CdCUjvsZsfQKb3BuxAB0QODxo',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'RZNr4CC1AuTj8rrj5fVSZGrx4mfNaeRKMXCA-Zg3_Vs',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'VSRBosO7mKb_Wdz9CVa7nIFczGJl0p4MjQ29cCM7e4Y',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: '7n9CUOuD1-490c-EjdKNSN5e9A65fYxsUd07rOKzl0A',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'd5FYqWrsLYpCjzcx_b6zHnb4JJj3WUXzbofFEDMFT2Q',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'XKVwzkv_YniO_BAFe0PamfqXzc8NeVFrhmK0WK4rBPs',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'NnSv0CRMLrGW4fK9DBGRZgq8pTtPUH5SWxR945NVflE',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'NK-W010vNXED5QYsb1518NS_Ib0d4FTY9YrHZIIFL5A',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: '9DTVLqozuLFHjOs5nAdaCZB-RB9_6fR_HFsrjMo2Q-c',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'jtHH24p_o4B2SGUKwkVqDXCWlmSUOZfLp9zmP2NXez8',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'X2aN7x4XDgV7HEFoSWMwzZpepqItCNSHMQSMJjnSNNo',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'u8ADrg3ZntkUceKQrXybixw5DbUjCnbhbDEhP97-O34',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'AIJsGrBrwnFnU7yn9TPDsHijYK7R_BdV3YFe6dXVqC4',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'GuKCimT0SyvAurdjw75__lYn-kaM2W3fikialv17hW0',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'ihEyz-h3s1ho7Qv5AK8U4nVckO2rV63Vl4S5DE5b7Dw',
		},
		{
			cu: 'cu126.ao-testnet.xyz',
			id: 'nMsJR7ZgfXB3Hzjt8w8UYgZeAvTXxWe4UH1naMXtMG8',
		},
	],
	'cu-127-zone': [
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'Gwoo4veI3Pi8lMq5tG-nbSgKdjp_PV8K3MwfbeJXSpc',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'BXMcmm6NH9W0t-vr1Wjvv9iBuKIi8XqH2dJpRv-Fkls',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'OgjWfb1KZiOZVIKrrmCy-hFvgXR1k-k975Yoar-g2GQ',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'zf5jzp6aG8b2xquqFctvCuFwu6PcHYYiqsCcI48F35s',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'kJ86y8plhSSSq5KlEN9U3QCORNG-nuByqhVbOOp-wac',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'xmYfYdSu17sge-YSH_rgeuLixv--CcHvJwS6MZpgD6s',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'vLgIrBc0CO-U_7ylvkkFGo9ulNpAl7W2vGjysVaZ7YU',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'G05RkYEt4SYVIi4maR8Ozigcfhtpy8c_7IjhRcXtDYU',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'qkIvuYuDnc7UXwJ5LJT29W_Kj2-KHlUEHyUcLa_CEzM',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'AGULsVxOnrHZjf2QwxBLBpD_dDpNmgGQOgsEAAARhkk',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'SdgheBDSieJf3wHNQky8PWRaNpPg2eiC8vwCmNrVFU8',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'WOLje1OW6OclQfqYQgtFOjreHIRAeArINp7QXTa2Sdo',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: '_evAmGw6FPJIhyzFnyiMG9vGGLO3euDWLI147QgEBLo',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 't4LBuI9MgL1dw4_Q116n0nmhNUgQN2PyPxaMlL9My1o',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: '3qj8kj6v8RaC_Y1BPIflG5sfSqZ0GOGPgMPwKNVmZsQ',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'sQxDQ8M1qeBgBcMg5_I0QYSPZ7h0hQxHTH3ut1HaOi0',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'uKLwUtMtmwa4DH6Lk7qcGtZO2-AeL_0_ppR57qROScA',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: '6YLqIHnTQP00EzRkIUYEtKrjfjhKhaaSnTl_w1HyhPg',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: '9jhY7ghCQozR_Lk6fpxYL-Dxgvy04TflOSlb5KdzZBg',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'Z9X2cm_Aqrs3bPuvqEK2oE_sNV-mGu2XvWlAfDVj8JY',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'sdXP86IRzZyQR9axP2OX8635h6LenTOS92OOIUcYoc0',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: '0ALCpjJrmwj8_q51SuoevSemRCERmEPAaZ9sCn-3aIA',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: '0yqMUWRCmHCxr6nZ6gf_wTLMcOthXn71_AiCDwFY_tU',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'FE1uIAUeZ7sdCzdZueT4qGrg_1lXG14l-FnkwWrCYW0',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'uJONAD0nQU4vHNMxrbjTMZ_mDFCIu9oP-jzsTPvmImo',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'KjaN7MNm_pPc7vuVkYHW_2-8J2N9tRSiZnVcE7jAr6g',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'M0TB7WpzoFlz8GP3X0P8AwMO3rUyGEb46dpV0ll92Pk',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'Jvu_n0Wzhto4dFib4Dr9T681FPoUo3SJrvXju8PLfOA',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'XSLbzs7W5lhkQBCv6Gytq8Lwls_3Rsb78tf4F48l8-U',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'vgqkVG2YLOO1icEyimVF1tvsm91IA_C7GO_BdGIs_tM',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'ssTwM_8YeHJA_R2l_dBV5QV3fGxNK_yzFz_SxGgCb2I',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'dwcmIiO6XwWuTfezez-lMddeipCPa-wLvT7fSmeFVQM',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'c7vq0fJ9cAGYtS0frB2Su_DqGF2r9eRJiW8rRLx1ktw',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'X8IG_uP6X1qw2nShKSGPHH58D5xLWCZ5g-W4VeXi8XA',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'piIwjlBGc1RI1bk-DoMQpyohluLWKyC6f8G41hTTn2k',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'a0B3y15fpnvhowgLPy8Q3O5oYkVEFK_jlBeSRKpoGfM',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'T_o-alIxuzHFCvT3_tZx009892eXLL_2T3vZ5heq-lA',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'fKzGozCaCDLgXeGfMPIBCzBzAXuEHZKO69ohvIsw0DQ',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'Kyv5e9iKKLS2SJdoCVgnKAS76O8Wpv_ECFxTJIT7qXE',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'CKhxKnb6Uyc2lG0bUxqfyfzx_IWMTlyERdSWjougSjo',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'NFDMiJIRqBxVxAxi0xgC9mg2zo2X8C9ypiYSqTrukCM',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'KtPCqIgtM1ijjHU4OCrgeK8PMBAR0BrU3ltaeDCUJAc',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'zQfIiiuC_cVSuvcyvjFzh-L6KIZr6ESvPvzon7M_7u4',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'HwHfQfFsDLMCitvRNfzgXzYIHyXy42IdlhDh9K0pACU',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'Es5nXvt5GYUtSU713IFgnTILJl5oloaQgwXRFFQq0rQ',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'FgwC4buGZeveDG5679VL-rsfAD8Pa2y1rDpBPzD8iWw',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'I8AXGzOQ-5UiYU2fInHUha5tjkWe3l8XG0FWfNQx_bc',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'PIusVistEC8jJUVx1Cc-BnMCrHfRvc8V_046eSYo00I',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: '1Ra998QX5zbVNrWieIcNACg-01rNYQMrUC6jOz4Bs8I',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'LnYl1L0ODuVgGLb1E-Se3nN1rNjeQr3n1d7AKxEfMvU',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'oYuLSjVnfhdRZsdVC5CemLQjsBYs_7MWBJ-fmuqAPa4',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'nlz3Ah4rTCXvZNPz8QGbe6gjVnFes54wU5NqwB3MPfw',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'kPzUbLJDubGT5MyCtxKkPonKs36cm1Ag5zW0AhRZtvc',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'OdGUggnGoZDVjF6hAfVTXYI-2IleVSuSAC2I1vN2rxA',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: '3jYkoKHucJ_gOo1qSfXiD8lURZ1zrFxj-n2YSob-eGI',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'PI5JlqG4fdnMHjQomGvGPP1vER3nQba6ZCFlmMSNwlY',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'kic1idn7rolvAm6b0Mc9eVUNHsxU1zFUwkx84XWgolc',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'OvBoUiN1JbRkvHih8JFhz9bwjQpgwziHFaM_gaBHYXs',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'y9E-3c7l4DA0Xb01jVR2Eyp-nkZzvur30AfpDC2wk9M',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'v2JoSxGGdLZ4BdEpxSJ2Fpxf75Fe3x9aplfkwUkVplM',
		},
		{
			cu: 'cu127.ao-testnet.xyz',
			id: 'Csi5qHhznJNNYgsuzzoxyKiIbmGhmGND1mY511zrU7w',
		},
	],
	'cu-128-zone': [
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'IO4hlcF3W-XJQUuPKuMIf_cWxVQwWfLfNOtd5HaddxE',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '4A6Io9-V1KlDJ1ea8keMB-FMPahSecGy1SMXqrgYLhk',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'WPKGPXwQEfkHeIxRksRfPCEGKaGxkiqkRHO0P3fM0z8',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'HsR53ViqEyHMyAdv5Utz8fV_QRlmpMcaP4Py0R2ZgRM',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '4FCPt-VgVjmULXcaHvUiLD90tKeJmQBWznaRFYiTqMk',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '1vCdB9zkTk1ZFc6sqljqHL1NWnvVtSiIbEFpveAxskI',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'OOyuoFCDnKwl1QlJRiRNEoaSf0B_P553B3QpSVW4ffI',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'RleyQbx_yTOprew6TaeyQjw8bR9OqB74w3Il42k8O7w',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '6C2Y771V6NKsqMQY5HWXZ4sXd3fDmS0x2cE8hmOHfrs',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'JttchusBaMgv22UAYF5VI_TMrhInrB1Uv7YXxeIOP0Y',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'hb8i5oaNa8fjGpwzdoj3qssLGbOcbzwVEiPoSdiy1rw',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'NmgJMli2_DPRZHzRA99d_Uhh7O9G77Bj6gaxgsBXA-k',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'tK1cztouVDRgagGrE9bOQluCn2AlqVeFCrn8O0NnqoQ',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '22lD6tJu-rD2PFPZExScej8m7TYWfbyO1e-dCQhIUx0',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'rYfvjqHmX4JF-8e4tC3eWpMvC00lZPL8iWnQuSU6r_4',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'tdF6obBnDi5UoLnpb_SOY4QGkpxDGCr2gCJUzgmCxzM',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '7rt5iudCqlQGyKj_czChllFxiPKg7wUv3pQsWgLy7f4',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'n7nux38-tsaCYrUdxMO3Etdk5iiFhtAH43zyYzES08k',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'yPEmhN5pZhq8FeEq3KYiROkwCeagIFGBw2e8kE528qM',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'ziG1Y4a1N3CWQ4y3_5uW2dKd-WwOmko2FF5vItnSc1g',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'O1-YNtZd-RMWQVbK2zoYWpvERpFN55Ljea_UHCGx-Hg',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'F5mbt9QuwJ6OOGoH2t3bpVst1ANvL2zjLqMg97o1TeE',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'lD8lY7dbbqawJrRu9UEOBl1PA3geMi6YurvjM0c5kYQ',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'eyljbPTKcv9nOS66mcBYezg2epjNcbhs32cDPDi0j9A',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'ODaBFE1Oa3A4HwFBEcRT2XOfQau57f5yD8-BnrhM9gY',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'raCF6iwCjbuixxmXZnkWZWpK52l50ziQloslZAQT0GQ',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'bxpz3u2USXv8Ictxb0aso3l8V9UTimaiGp9henzDsl8',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'eEvyQ19CiBKG-8PmVOsIiX-GGmAZE_pSpd75zShEY5U',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'T5YbK__n7x-RkwJSpka0UnNgpE2xkYT9i26b-s0ryJA',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'It-_AKlEfARBmJdbJew1nG9_hIaZt0t20wQc28mFGBE',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'xcTzbrSOSE8PRctj1fXUG9AuVGvA0-sQvAxs48z8FQE',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '4ByxaNqnTr4QBZKdze30aoWdUNw6FR-rgHvn4Yi2tZ4',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'slwGi7y6WwWmpw-0Vy6nMDta4JJTwkwOgiN1GMvFsqo',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'w1IXlD10Lm9Dxoxu70Aqsi6lMx95P7-S7CNdedizTyk',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'K6329V5HaJT9HBXX4CKbVB_Y82hrUWmvL17iaRWN_ps',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'Pn6x05PuBQAfHt4W8faqJ6qGKwjG96cNUik-i2NfZ5I',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'cPRHI5QAEzruiUIFDK5wdBNNLv_4r9zPFnRXN4rUgo4',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'dr9XIefCGq7BFneSp7Z1rLoJhL49dxRjTF_eFtdJ7J4',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'e4kbo6uYtQc9vDZ1YkwZnwXLUWL-XCUx4XhLP25vRx0',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'BMWup83OfLpcQxeKjgndbfQoRdboZj4BPhxUaDssbYw',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'HByTerAu8yGgxqg1XOo0PfNim_7rWCfUvIsb3SV_P9Y',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'oQNe0Zaf5kYbcx9XbpFiW_2aDnjbN8K4RBfQoc1WDek',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'vDXRI1YP39krzpJThk-cSv3XzdqFhGuiQuXmnovq5HI',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '0A3ZDiFl3kqeiDZ8wNAtQij1ysh2iyjb3BkqwxYIYHU',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'rXTtAAzsKczMnz36Bwojc9whnAZbbxIUVTYFCYi4sco',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'P3nT6fgVTT16FaIczm6S9m_ffvRL2TO8ixTfAtcbeks',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '5dppteKZFN1SJSB-HBO936ecgnwx29Uzq2ZeEsgRqAI',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'kKgfvGJf4SwHzkNbdGCE7CP1lYGHucOmxIBZcGmnwuc',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'OoQxjOzyOT9hNwfZACgk24ljTx3m02jBuFjhAorAoNg',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '0bNlxb6D4USlXCEYr1CZlOh3vWnjupUZZI196YD92Vg',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '2baJuaG8V96wtx81R_GyWU9Iblyh1s7clxkVuTv8Zfg',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: '_vGrjLl2yemBOE_iUwavSXwymvzR5VB7MiTEbVlyFaE',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'v1gBV2meFwskY5S3gloEvk9F2jWMmU13zSY8k8XpUmQ',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'CVc3CNCSch8g7Vo11CfOllAJNbFBA4b6BsSWbud9RrU',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'uTLWeGc-5tj8TWCPoO0ywz7SkcFpIL9SnUk1SxWiw1U',
		},
		{
			cu: 'cu128.ao-testnet.xyz',
			id: 'QPOg65-r_SdHX5P1jvkPwAhNSijIQUinTq_oo8kSeD0',
		},
	],
	'cu-129-zone': [
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'E1_TLmRjdtJya23SCEb602ieHdhkfu_PJAlJMWvLQSE',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'LCqE3poEu_vOF_rVepv-gyvYToXpkWEd-Rn98yIG8xQ',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'J1mHE8qK8t6x93cZ1m2fDZTRtuvsaNQOpI5NSVb927k',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'DkQTc-zJrZcBbIx3fxGDffcP38nzprlLs0c7ksUrINo',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'Qnnb4Ub2chXCE1qaja7eQab2vJqd6jF9mGNu4E-OS5I',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: '4miojYrPUGNeKfrix--RCu-cCGx02IdK8PG9uY-RzIU',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'vYlv6Dx8ZGt4oGaqsXaPjh9qi8iS8eQsoU9Ai65km4A',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'cIfnqyNerkv2Xcx_Ic1wkWqxHxaGPpjSwvBMMW0UY1w',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'gB5tcz2h89xOP8g7TMDrM-AfoEL5nJhjcisumHfg3Mk',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'LTJ0VrwP9aIteuV4Yd6nnKaZNEMyom5N61MZ_VwEIo4',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'WOJYtKo_jokGpYbWNXusHoP9yXI8Mn0kTKK1DqSIhlk',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'HOhVpZpFqV_Ap0qrd9z4g6TGpxvuYzAUQ1qguFaFblo',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'Aqz_E0GSkXpK-FmjZBXWUsPk2aXQOvGemCBREdgihNE',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'eVIgA4B614BvLlzw6pvmEXyJ9G-8RgriGk094XtQDUY',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'mSC-ngWmWTnhUAzpohBATvhkUE94TQWIIpJuO7HNpw4',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'N_EXCYkY9UJupAIx_R7e1nOegPSMEVC2QoPCQ9N5q2o',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'SJe7P0-b5X1na5Mydvpv2GuDzkxxC3aQWU1GerfziSw',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'dSjahrDnUraD_bfEmgYBN6OEVTg76TKyPtRME4ZM3Lw',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'fpz1tfa6REVhL6OE9ZCFUyCrAn9RQ1jnRGSHbtaRe8A',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'r97EobP6XcCVftwePT_pM-l3-XmC6LI4CAGumXG0dog',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'xMqZTMhjCGu-AHbk1fbtJPkDjy5LSzZbaaORVvQxkPI',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 's8AINjNOJ5bS50CA8KtQH3fakItWpT2OPk5_V1FRtI4',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'eMOikc2tSSrw7vROpCQJ8lrF_ViqBBlaqToOqwXtSGw',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'OilgPDDRrdFnB1NFHVMWR8QEVTfxm2bC-f56gQtpZ_Y',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'WDnsRlnsLrJZDuoWw-BBctugj94GGELb8r_VMjjW2-M',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: '5W48IcI_5LiJIo5R7XJO9X48x61WYEQb4X4LvgHFxdA',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'JFMNOw6fZAEe086E1oR4CM8ttQtRdl8QfWE0ZTvWGSI',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: '6Cn18PywtZCMXa8RR0Ajy5Du6UXpRFh3YEKkr6I0TVU',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'nMBJHf30VMtmSyvmy5_CYlp9kVLcqDhlW4rl5LRN6D8',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'APTy-bLQQs32WZ_5Dt_RC5UONujtj9gjh5kpyh9Mtlo',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'EKNKA6ebrT6DjSkKhHjnVw_h5DMV-sRT5SU8cCITlNU',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'MZwisGXufzO-r_oTGtBrvTg4cQTauyRHQfFboJ6tjZk',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'TvECLHPGLdMw00JqkU4ZIlqQdLg0CBfMHqeLxXCP4C4',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'exh-yLzGc_9lFQrt28-EMU3vBpYuoQXFRMv3dovyLyU',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'C-nJ11DVMWRJmcwDyxCCMPC4gchiT7ISFyugUtLKm_4',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'Uvilx6lpeJO3lN1kQsBths0wof93O5LTEZA8CT4ZHmo',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: '5SSI7Or_InZebKqvxDgK6zCvpCetGh7LafISV5rf3X0',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'RTMSrMPO0I81Um7BZWB_oZK6UH4lPRMazfQDCRidbAI',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'vvzprI-NsVSM593u_HpHrPRCgnZzWQfDxWrgMqAWvSg',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'sKqLTXZUlV46n44hWxKDsMe2v_rTbMVS9C92Rv8PF0s',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'Oi9JVrtoYCXIq_xGikYtijPYCb7WJV3dRqvZ1Mi4bUU',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: '9IvrRKjbEXOi87otMHOMb_hJejIcTc7VgvT9MlslhZM',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'kuV5wXB8p2BN0XEqy4k458D_7BCTWRqB-qd387dckHg',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'mJoTh-Z0fecWEoGxO6wChtsAB77UeHCGbyO2EF97DWI',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'D4Bw2xQ0ijfd1HF3hSRYu4nVN-c9jeqPPtwjszd03w4',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'RG68M1-YqZRNK1-gN737RdztBFoSotk5YfMj7m1oVjg',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: '-cBV9C8PZpH32axIQNqveVuUUOo45ydHJAyVLFEbcjs',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'IZc6biilJZ8Bd-HalluswiRGYSl9dGmbGu7K7TlWMI4',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'etKlOHz-q7bKKla7pQla7aTaB_drCKco-fZU_7wFwtY',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'bz5aAnDhz1MiHTlWgILq50nqaEyTDJaQB7xcI85k5eA',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'sfZZEPVIb21mXE5eXewDLreeeNTbNlhXFXg0KA8ekR4',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: '1QT_cKUIh2IYCyQCGPY5dJEhUeqdpaLvR4lyWjepzzA',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: 'yiSw4V_JTqEJyYspa4VlWamUjxXOfkhMTbjTMD3cU6E',
		},
		{
			cu: 'cu129.ao-testnet.xyz',
			id: '8y2yR2pCRfzkVLR_BUfHRiluHYFRj1-FeMoUNMIPGxs',
		},
	],
	'cu-130-zone': [
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'l9Up9o0esijb5UjMOhoUyjkJ3IREgq_Dal5iVIskiDE',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'wL_XTMo_aCK0Aw9cKih8rGQnJLTMMDZXgAPO5B1Z_Zw',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '8EkSl6OF1PSodlMkDdIjiiUXglU16v6ziXoTj4BtiAM',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'iLAwJLXleHDlc1mfrkjdHkZT6SywPhbODG7x_88ddMQ',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '0m3cPYWy9FwJOuabx9f_TSl4oKdskW2tSa0rHEJVGAk',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'vai3lgs6qeWjrDL1A2kLY7i3P4Yb3KqdYUhyGNTHyeU',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '8GsTKs9qniaKD78oEXoLfMPUjXKG2vb_DqKKhZoxBqk',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'BNXSN_XU22_7AOrjFAg2m5UYzbGOCPBxlKsk-VFMwBE',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'vzW3NQnoAIMBsztl7K0SDZ3A6oRewF7XfNkDn7nP0WA',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'FsJUYY0UYtudRACm5X_Y_ZIeQWP_IZpeXyoL0sTEJZ4',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'gR2Rl9gXMLC9-P7Y4M6CDUfO42mTJbQr6ljRUBCfv38',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '14Zk8pM0pwhCk0L-tpWG78x0g9JWNt89xWHV3XhEhrc',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'WmtrQSxMUNfAzO1dM8bW3quqjaxpmT-QNTSg2h73JYs',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'ijIva4mz4degti_HAW1c-4_yAb1DjgtDqscipaFpAz8',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'PekJrnSxoZvUP-HHxxQyOsCrgt0OFC8Wju0VGQAGoQo',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'bprNzDvo5_qTP17d6FGad8ZD7L75iX3-9seEKsW65p4',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'wQkOl3phY2u3PsXUQFmG7rdS8XVQlP1b0OXzHk6a1V8',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'P9j3nYTMF9bMgrgMRj-sacZeOQLyMpUQzqkFPHl9nuU',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'rJkvd9-l1RyeQCaOH3OlCK5aDtkMFO_aexNqMR-kmv4',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 't6lwjq1lM9AYECojyuVgc8D6j7XZQcImrCrlga4P1aQ',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'pwgpdZMhar67-w0bitg-kGSIkie9UDJx0FKzbGvlwAY',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'w95FOvgSs8D_fbWmSYDGGdHNagS5KuAycz9oa58gvhY',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'EJfpZUABjIkwZ9VgzS1CisbiP34QwALAz4XSgLP667A',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'PbXSJP2Ia4UZn_gZd6z3qoLGoixTZATIgMOvdhYEGRQ',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'zQVZuyGpW4BNyQawGwhRDLoe9VvQG2hDtMG_Tz7h9wY',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'Xr8d8lQT7Ol1XpuzsjsaE1kS5aroBDcjVoOP2mVAnR4',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'DuTWGp2rB9eWlI-NrajrD8qs69kga7q30lVw3EPW2Xw',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '7us7-P-30uAHx13azxOOUASKcHFnSEWaFydcZpuRdRs',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'RKqQwaOvVaEbeHAlDSEiT8Lwxvc0YrY08KdmV1NcfGA',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'FtizueJ4JfqFCTMwtlQB_n5WQIwQ7ktm9I59yBhAVNM',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'qoF4Bx8bzV6gBd78nxR3qbtws6BsAuhVpUbOCowZsBI',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'rDw8lMdBakbwTn4Pdl1nxxJfnSQ84F7yyAoQkgANgvQ',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'IR0mwB1-bIsJpuAbUwGF9upJEXgvqrr6v9ifmpbmYz0',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'dBdYgD6bwb7y-5lYWUj8VWzVUBGt9KTaAMdL_NlBqrQ',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'bek-lE9BX0RXatlQdlN0akgEPtcZb_qG0uYJUah9IbU',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '-4DYtmoK7CjLyW_vJ61sAd6EfY9BraHLsPvvn8gyE6Y',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'A2xgC1aGoaKlgWyVEq8RoRpF6TDBkYSoHY9KMHeRrxY',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'gZoRsstnSoLdF8NfQSR9MtNiQcRseEB7-NTqf02lSss',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '_wGAX_K7ErXCz7tzuvEdm2YtB8hDoTPkb2u8blD1Jqc',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '4IZbtEG0eFM29UyH5_i_CcTsjt7kbJlKLmyrvbB0ZPM',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'z4Mc57ocNhv5o59YmqMJJQuTOyYKOwcW1Pxo67KbbkU',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'fcA-xrzLvCrtkzW9bMJe1D2oS2FNy_Pn2tdfRH_2Xb0',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'NVyqX7E3YgC7EIh-m3U_V6bAqdYYXBAd1HzgkxQo6Cs',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'P2y4zk65zqX5qo-0_cv7CUKKX8aENj9ruLVOy-rjbYQ',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'q7-gkhCa04_kq_zJqIr5HL65JzrDUnDmoroehwwuk6E',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'H2udDUs7mU2vpw_bhTP7hZ1I7zLtJH6Yd_XKBvA5VGI',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'Nbf5RP8soacn2kLelvyChg6XBmX-aPkAFuidnFwy4_w',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '2_BBQGyLoSizpQfD8XOqMzksezKv8A0Aeubvq2-ktDk',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '9j5EXUHVWkiY4CC3IFSFpsiXP9MF9Q6izzYtYyHYh0U',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'ej9lprQuox51MLcbw8gDE_JLzCiBia1vjF2-ak2XGgk',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'ENQ86a-Xcgx4Rr8WoG8j58rKvJlKL_-j6PBHu9SpeKI',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'guy0EiQDGb65DCvIAAaS03A1sHUaW9tof_qho_1OTkc',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '2DkfZHKwYb-5P2YSg2o9L3tC2NejQNKT4Ctl-TUMobM',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: '9YbPqzIG5wyhA9gbeBjHH_Y3Yo4SlO8B82a45g6L8y4',
		},
		{
			cu: 'cu130.ao-testnet.xyz',
			id: 'R459J5m0HnU0WfHEAXu2ucba_3w2mNjVZJ1TgfRM0sw',
		},
	],
	'cu-131-zone': [
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 't-rME47FseYfF9ezTTMr5z0hpDV4Er3mNKyJ5WOmAUw',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'ileLsm9fpFpanI1PUbNYdUQhDhgkbcvBG-Xp2ndOOTI',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'NID6C9k3m6mKo5E9y6Mkfi6Yu48PFbDuJy_6hb2sP0U',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'MFvMKf_qlt4_wcMf6I18EDqk8tF65oQkK-_WmREUeYc',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'sB_6Wi9B84MLEvC6X8dHOseHaSFEb0NbTVL7Cr13hBE',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'WK9NYvJ5VR0ZAtXi2ALkrl4WmmmBpW0mvak3vY4BmH8',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: '0g7onN1jPj4IoGk6f3O408QsAL3-nkvhX5hZe4VNk6E',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'yiU6CMIePSzcPRntOe47qY0f18l-CujxXVX_lD7tbsc',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'QjtuzT87SkRWfWHXXOfXqdFlCTiB6RU9re1QW7OEZNs',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'yhEw5HsaLsM2vV-Ymcs8gY-uTm3_3URc64sTtE5asQ4',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'Xgq43lRQidEB9yxGfq_ulP0VEhyJPo9Cu4NQD7XTrb8',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'S7eFdPWxbE1VbsKN9aL1O822NIihoNGrcC-F1qCoYFM',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: '5FIz3T6FEPmUulYFOjx6JOwKrz6C5w1pY7ZWg4QaH1Q',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'BRRIGQqLs0o1EyZvRmBrNAFN_KBZwG2DScS2Dlev2kI',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'lsLHnlhB9PgtHK4AjBpRS6DNkXWbbqjerXb05Gv_Wa0',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'r2E9PLKcAXTRFu5unc6ipjrwf6vU9Jq08gZZzoLLgfU',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'OevPKwznmOKv42BgKLOWQhiqiY4MkHQNLfzFgKhQKkU',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'p_X7TfndVYHHxiG1WquhV1dtl8W2WlA_M4AP11BzXXc',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'Gz40AhodsXcLIbbV8E4XDrY_3ER4r_G-u-qM6rsny3c',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: '3l3Qqm8YM0bDAeYv1OW3vLMat3GqEp2ieq4xYFyDtcU',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'BOKOLx7Q-MeM8YH3aqPvuc5IDU0E0PefrrqYpH1akqY',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'g7jbEF7YGfiEGvccp344965TUofP8mjko9gZG09W7UU',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: '6e5DwTDKQQYjSMRKIH306wW5pFi-DTCo7P9iijsf3N4',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'CwggGgVhMmdOA0kPp34YI5oKIn0TGLcwDcfaenH4Vq4',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'OmfWMA99XrNNcc4jBbghFe45vrKDHs5Gnug2aQggDSw',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'Y8Px_SQmYQK1WGFvg6xa_Pgx332fDzTMYjTH1i90ci8',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'z4EhfbcRGLXr6BLrQ0hznZLhFXFKI73aVovaeV5-_XU',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'Nm-tD5hggWTXTbNxDCBkV_9cxuIRfH9QZd7URX78nOc',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'WsWd794pC0jKuKXPv2IWWb1wsSdIUxTSFMJqyTFuiPY',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'T-yB0WjqqNMDOqLlUhn5OYtc4xsA1Cwo-BRzZtHrdjg',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'EPvHKVVselawPG3PoP2hMGZexYQQzUuAoETFYLK3IR0',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'lkrweLNpvQmSFoWedQh0A8qNZuLtVb0_REQWp8wiYjI',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'dRxSZnSwMoIxHW8To3wMKBnRdSIzBEsPGhfZGwOTbMY',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'LfWe2S0ZuPBUGja1XPImszeCeAj6mRwQLMvh1rF3TzE',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: '7vahkVvdWOyfDltt6gWvBJmCwF9a_8oywhG9kzaMPm8',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'jw_c35RzH3I2a4BxDmACzheWmZ1bkudIIiaFogJcFm0',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'buc0S_ExNnIGzHDDLt2qIbgodS278W7P9Xt3WHMvUAI',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'HOzYH8eOCCKj8AOpBIO2PNYK50iPp1VSriZ7TztWn7k',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'ucQAvvkQYNE7dXnnGK4OBHPxvTkC9NYBKkSDDL4MYCE',
		},
		{
			cu: 'cu131.ao-testnet.xyz',
			id: 'TFnZAa2EA5EfdpWE22BQVrHjM5t8UFyQ8AiqQcMGr_s',
		},
	],
	'cu-132-zone': [
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'R8kyNMjM2roAdKn1OuvxWqTuDtRcVPk5izO3RpYMUFg',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'J-v2Rfuih57Nj9qjH_gT6a7pfYfbuwYbYKPS2fK1WIc',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '9oJG_Qe7wQKeyWyWBFs4rRrdFgzmJaB_CehyJ6eNg6o',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'NA2qNrC0iVW8YpojW7daF6KqC4TScxqirS8cD0FVZGY',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'spMBQ9m_1y_yPnZoSS0N-SETnbioyENRZOZbAEo42BM',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'he0A-CykeH69PeXYa9AErO297hDeIORAteTGZLLc_Kk',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '_4OJQ2x7YDeqZ0wjlGjHRdaepXwG_IRSE73qymG9BU4',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'OSWEFGL3-eYjLYtVB9U0VIk7DuQ5zNtW7grS83CWDOw',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'Yrr_qoK1pkjYuOrLEtYrxVf5uiP2Dv6zrXkNpRCqtig',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'anH6zzS5tMlHgvp66ks06fAYCvejOv8NUY8KOtLEG94',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'M0M2K2o9uFcwuP9mV0CihhGIndRqEDnlAbXgQZJoN9Q',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'OSwzW-bPQURxzRrbpA9773itJfv7YL24RngWWjvlCX0',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'fKpVfQXG22HQhNNl-TVWNXTy8eDuFAEIZM3YOB670Oo',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'MLXWis8XkBNB0zpA3keYGgbbty-FTYlg6jY-6DYzRC0',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'uHhDGR40xYQYoVw21SLh7o3FSBuYQGe-ggbfmSzZOGY',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 's5Z_FB9rjwRD4gMvSwptr-4VimAdbVPD3ec4DghcvE4',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'hJh_gzbbrKFBAiGSkyP-Tri4sHcR787hY2tXSgsTFCw',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'uLr5C2sGo_Igc_8kfO3j_jGVSlqRi16yTX3Z0f-dWug',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'wPp6sB3jngTsgVajexqtC7q5Yis4bpDF59JP_DC5LFY',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'HmdLgLyfDGsUMASUOK7hR3UIeu2C9FDhO-744592SE4',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'u3w0AjcfYtWgfOG64AFDw2EH-XosPpwPPQlcq-Tmi9Y',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'eSMNv4hsLCVwjffl3JEk4k-ubEU1VA6Q6m4Y8pVt3wk',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '35GWw8BTiPzokRJiPrloghuDwCa2wLCLX5kWG2zJBA0',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'BbuE08xSRPoLz15-HhyJwWeJriYWnJgShUhvZ8oqGMA',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '3XsAUJqLMNlEhnhH0Jt6auzcOS19njWztpdsRx2cJEo',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'KN6hXuVK2lCbD633PqAmSzzGZxoLHMd2tQ5urOcck-s',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'LPonhVCKXTZyi2ONRI6Co_Bw2GIVuKuGFSMS7M_-VfM',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'ysHm7obprxycQ6MgIJTLt993DMiL9WTDVh_9A-80woQ',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '13knzH-ERh6-Vw8TPRGaQg1UwE2CBfdAORGG584SYAI',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '76t2JewPntMKA_42Hm7lfi7jKEvL_o-rc8T5SR0PYrk',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '04MYcJMEG6nd_YUoorsEwCPRd41Rjf_pdevzxYk4YI4',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'IH7gNdsv9OlREvH2Y4yXmzs4DwZkCojVHt_I6oDg4jw',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '7c1arjsZatQs52RacXi76qe8VtHUOFDLBFux_CORjKA',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'NzfzoYkQRYoHbhPWtRLT6uO2kQVbZVeoTZEiE6zHOGM',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'qCxLuM9x2otoZRCRFdPsmgUhJWuZSh4ckJtgLNul0dg',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'ZyJL3hVNNtOtGGndpspSHLTst81PAn9s_fZQ8du0cas',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'fSelO_v8PqCRK0eYbYdTaFCoxBhWUiCEZYACfS1SQ_s',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '34GJpp3KBIPEIVtn9KfW-84eMxUc3clRE7VShONBs28',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'iM8YO8XbgicBCYjM5VHjB7_RdT5fUQEO9LTRlJ6ReGI',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '5dsTymapfDORdfAosd7UxX89JffVp-LY-YzxPpLcb4c',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'pJqSkYzYVMTJqaNUUI0G0wMgv8ObN1Hzo_oT9VqE3nA',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'q-jlGeR1JyHJE4QcDwJ2ntAg-lat1esw9MwRrJR_-ZM',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'zMODlS9n6PA8dvdjyInrLRt1Mkf8KWlofLW1rBeIcFY',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'j3MYcPRZw7TvA3LLeEXhLlcssMDXebckt47qnvGKXw0',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'qSbSDv68x75aSiclqeAO-43sUF5J-pVWGYFo-ujbxpI',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'blVyj5yNBpyqtZqNSHLZYDkmi-kP4iRGzpQ0QL-6dvU',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'TR3a2APa8xooRVAsGYIM71CyHaht3y8r4khFd6WW5oU',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '6X_jHuCF8QCAknXug1pL7t5FtmcOFJlAJpsUTBAqIBM',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '5GAKoiXUeQNZnsDPSUZT5as-SMTEcBBvPqMaJH7nlug',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'BqsDiHhl1NvqJX2FMK278PwCE5MmfnQd7yqIOiLTVo4',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'uMh3iKc_EaEtF5P9cpYVKT_5UFlJJ9gfU_tfGTRdWMU',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: '4uazXdPUxO72w4CBNbFZAIdrgH9_asj2K_M9PA5e2KY',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'OqUQE8QbKxyJJ_8dMmHsK7uiqSELNtrzU9PsXtfQGpU',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'XF7noFrnL81pi464PMDrAEtS5Iy-i6q_mhUNjLHN8wc',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'B1zv-T6_ZFTAR6z4ikbdKnusWkU3qntkU1meAx9XzyY',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'BbR2gNYAqtN-hLeWC6HXhoKItwCvyszZJftK5W_w56Y',
		},
		{
			cu: 'cu132.ao-testnet.xyz',
			id: 'egXOi0b9aMJs8HgzV4T0AjItGSlklIFTs2nXhPPiGls',
		},
	],
	'cu-133-zone': [
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'nz7GEPxmcxOquitH44XaM67vJTXubtsPAlALD7F3l74',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'NetV81wDSx5MPMlp8ignu-ygy8mSFzJk4M6vQ2aPjmU',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'ZjqakhYYr7qSunsD9HEcm2axQrxFBsRmecUPuA6cw_8',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '3zfXAM2MkWld7c9AcTDzfKihM01SUPh-OmpWm2QXRR8',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'tLl0QlX1Xf7cJsaVBhoC0q876MNiaYGnhEs8PxDmKYU',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'ls75Hu0XXVO4iA5gL4mOFZIa9GiyRaphE-5bsO5rT1k',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'uJHQcdQsga7QbZxtY6zyjjmUY9bHDjpoDhu2L9TBCEk',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'zURLtDpcDuHZVLvE6pC-kA0Ko7enYqoyT7OMu3vXGII',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'LHFRuHXWE7Ga_utiGV9MN7ehQYNqgO5aQB5z69S51vg',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'LjJ9fDdQnQd4ryoUAYaJmDPl2BPqxBX57LBedqd9UZI',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'wUzXPOHd1osLzGTyDfFghzRX7RIVDoAZsrEN7F3ScsM',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'BXXbYjv0m9CZ09n4-HlJ7moZybIxQhrlsD_6hxA78MU',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'TBEZ9aVFNIRr2qs09iNk9N3CBCw8hqI-2w6qaTeCXTo',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'kk33W2YslMTrqtu8848jkmIl2IpoViJPKE6qTXQz8sU',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'L1hG0SL1BXKUmEEFBQTmfgijjbWIa9xcFYkOnHTnBuc',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'oWiT75fKUOpy71qgXK6eIHYrdb6gbZBehuoRg-Cavp4',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'nDA5NUDrsdArbwNjmQPmHtQCkm-Rt5_9PEugGH8pBZw',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'WR6nlKa7FSHJNkvBkhvyN3HVY1M7yuXyNETurIIE0dE',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'iFllcgL5Mg37V2qj-G_lBIt5-erenPuGW7OwcnczyL4',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'gzPEIMU_fJYtoAE3i_K9w1P2zQ8nmz44Oi5W6jrnah8',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'Wh6uzu5c8RT-h0rtVQQsB6E6jgYPvkmCOPL2zByZ5SI',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '0YBwyCviCdY1d9ecTw76Nin3lZwWLjy611LPv4QBo5k',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '3Xg1q17XapLrzcnKof3GBnaHL-xiRvOwbur_Bt_nxHQ',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'ewaWrZgim1Vy43hpkZS_3qzvku5e01Dy1W0Vp2xDsa0',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'Fsf8SFd7APT3sRQqI5mfKFh0QjaIis26ZvVuvzMQEH8',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '4s3kBfh4vYwM6ZiRNSCqqX_1IPYT3bnxXgi6Wo3Z2Z4',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'Fe0pQau0be8Nt7tySoujZiyF3-BGQ6HtIdAUuo0-0qY',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '_F-zred_iYL6UcehsPsrLDv6G_tCCgJi4qzJi0ftOg8',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'vOypxhfeQ7ZxK7FVAgiHmsGhSZ5sPJrCL9wvZSK_9kY',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '1DDdDFv6WhEQNOKc-Ahp-LCCRTfBNt36Cm-um1Vybq4',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'wNOozDpwfvONJMuSKCR-i7ocZ0MpK7tGkjSu56an7k8',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'jv2I0Gx4QtSwJQ2ZFooukf9rRaoRkqG9JevJrMKoNjM',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'orjiqEGCFjAM7dvx68o8Ch5jUurnulM-iTO0SvIhIoI',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'rqF1Db192qSM6CUTfTxfGY3yKAT_t-h2BrSGes0rTpU',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '7FrQJU9nC0eWsPn6FIHXpb_OyfuRIZgRX_HxYI-MScg',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'x_o3e32DlIO8_Qs3DkHiXLt6zRyU3UkvZjj3Wx4G4dQ',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '6G1Mqi6eWmO513u7YXfpjyPoEwu8DNfNqm4nx-KYYfg',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'VffZBH2lVSKOP9qXVYwtaDWjVjtXx6vME5WsBdU57A4',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'Y684J0EzhWAMS9Xu4KQIZgABm7B8donZn7ERCogpnxY',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'YxGX4SF2WbnE_xyWCDP6H_NVb7zFyNhtnJfxhHHoQ4o',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'gEB82daeCZFOZgvMNVMA62MRoaw1jHLtIkqNYIrQXm0',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'R8Tg3h90x7B84d-jSaBoMP7OLqLjJJYq1y1GBiw5AX4',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'uef9T5Azw8Jj5YJne_nO5j7oLgIqhTKEq9qpiPTVI40',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'ZD_rZK4q8vRRcxDjHa0lOlYYptLcwY0LgPmblGTv7ZU',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '2iTu_uZsoBJmt66UoU4W7iH1I39tqWwao43NhlQRPl4',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '9TghmT9WAlLnErYSNexD8FVSwB4DRKiSb4ZM8EopJJE',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'LsPb1_tz4eNTCcQ6KmF2rGqNiVI5KkZTAplc080zSXo',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'o7sj3EvIWm7DyQCu7ZZrXctfFZ79Hr1rXsUt2VkIx1w',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'FJMBy3J6MVhLgoLsSg-ySyoAEuhcKOXlO7ePCdQIFvc',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'YD8l8i95JpORDuOcrUEjF8GDrh5QUZlEB0SVeJIhQPw',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'jd3KbJOmJqEyW5S_OWmrpl37d4xd0vmZhILJOuZDX48',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'luqPiuNdj3T5hHMYmq_vpz2owGO3fcfVLHN7IiACvVg',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'RUZZQTvByH4tmY7t6WMbQYZlXEUliCrnoyvOGVBi0GY',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'HI3Jg17PiDSGUASmxVvkYVYekejlqO-rlg62j8sprYw',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '2_GCiRLkbhVj6IgXlOkuEflJVjlohNPAfaThaXInM-I',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'MMhz02C39W8TlFAWBArPwP-Rya50bS_aQVXLhD0pWfA',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'citzamqAt4bGKax9A3jqGCrHjx7Bj907FFlANy6kndk',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'aL0-skzOfPwO47L0PHQz6ipmlAWQ-gC2230iTi3r-aw',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'jnPYAW1M8GXR8EOx0_A609DmcGfnrQwNKy9ZROQ5YVo',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'r-UWyCTMopZGzQlTfBEm16VBMlW5SCp_Rldm3T_DldM',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'ZJTx-KBqisgvLy6f9RcV1jSW05Ez1iO-fj69q9HCLt0',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'F8B4WqBn88Wssq_htqgQ4YpsIZI9u2vZy-KQ3gdO9uQ',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'YiNEVrHfb2c3MH6Adh0ZGRkVyXBkVDX8Q-eWi3cJNns',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '92w7UmeGbcK7SEZRSMuUmtHf9XS9d-luJV1JRTbkVPM',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'CEl7a1oOsVZuNCa-cqwIDfRSXchnoEcheV1mcIuePRg',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'SINHHlYJgWmxCL8cb4xKeybQAfMpx_PWBiaomvoZNFk',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'sTW8JxCODo70i7sG51gUZ3hWct9ZoU0PWJldxKy2r2k',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'cq50WeY1oA6GLmaZr3NJbu6_08b8c0LuT1344p8q7dc',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'Uy2MX6cr6hw5RyZx-DJwWLwPF4g8qhbwiYyAx8r4H7s',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'B2RGsly6O5JbH1CiWrRC4jvEvXnIeqsJ8tCoT5DtmBw',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'S3bzZf_y0_VMrdo90NkL9YY8lntpEMAZEUlx_y3Ze-g',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'yV5Pr3FNLt4AVPPC97xBuRJYMpA3ZD5JxTFtYNCcEeU',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'ZeSJHyEbZqA3D3h5vMnFPZi3BY4LdgXxL_lZzIUcvPw',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'hbZik5_jH3YjL7MGw3DCiIOdtr2QyaQ2rGpJcW160OA',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'EPHHUzxP4j9sMbpoPR7p6SgAbUCW4jXALGS4oXeIqug',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'QOh3pSYuKOMv7geN2kvyhUrupeyN4qgMlCvfaWIs-KQ',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: '7YSSfirWdlQpn5-Eoxx0QD5jjuk99XpTANqHAhzcRcg',
		},
		{
			cu: 'cu133.ao-testnet.xyz',
			id: 'MbSLnU_xImBjhO0YA55ldNh6nsqJVKY0UiPGDkMZ-bY',
		},
	],
	'cu-134-zone': [
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'Jt2Q4UnniwN0shwwNkZylGdPUOseKvxQ_shszBmyHWM',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: '6b6TB6ISzqPAeBISv9JutClvLkcRKScvjN05YSj0kpk',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'M69cFYORU3uLgMNrJUhJJuzdfWOGM9-HvAPQf6IHzds',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'WSas9mSqiicyIGaP1Muf_tcO-itZsTTuqUc7qVMk5Lg',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: '-6fNfLJCCv_bN_4vjT5tfA2s5hpWT6c3bxnu1BkPVwU',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'Eo3212PiWgZjPc0nsrj9UZJokSkpNKta_3Ob4-Wv8gQ',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'LvrncMeV8CPn9_WiFNgVh4OOwppr8T9_oKIXhLf2lDk',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'TqeNOz4OXirfpQKZ30AcAY81c8--ltmWZe3KXokGIR4',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'cmd889JkKU2PoO_yIBYUsQEyhr57GLAbPGhdX3tLciE',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'iBT-9Ytx051JU6DpBcFuyrNJGjU6-pvr_vZXfQEhqC4',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'XJjSdWaorbQ2q0YkaQSmylmuADWH1fh2PvgfdLmXlzA',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: '-tTW7WI6AdloFd1tHgICs27FkQVmb2uR5qyJr2w5nCo',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'agEcBMJQau57qa4A5E5g6lGnakdhEVI1hULyndjWKRg',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: '7tPwmelZ7g9FsggCYZS3boyl6XNp_9ugPcYd21_VDAI',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'CTUJGMjPogLQ_qfPcHauI6Qlj6gCEOKUffF5RO_p-44',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'XylModHUHhVOrepbP7gqKoz8fkbDC-mPVBSt43Ez-vA',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'ujQ_seaK5Ic1A7A0TgYjPcdnUSUAPzOtWSHV_Xa72Ho',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'AHG7gM4Oj27QV1GijRAxpcU3xTcfYi-DDpZQiVxwBiY',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'L0UCC8i05SqVnGd9US9kFwb3BfpBHBi0KVdyNvL6ZN0',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'oAW26bEMXORH3t6SLMHdUbLVKbg7Mltj2PrvUjT27vk',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'VBFU0tMj3R3oBFHPW0GaWOyglNzFmuYjAtA5T3HYBpk',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'FKDYvTzqwyCkPRhyDr477CNqvafMzK7nfOhoRsQ7gMc',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'QzEgqdzZEaVFg4XPx3Xq6LQ2OuwngwboiGrAu179PeM',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'HUK0EMCu5e7ZBjReG4xTC59jVlnVV_I7mK1cIYNcYsY',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'nC4f8zQwx1OnNNOIShi1jSTVwPArd4XJ_Tvd-Ak537Y',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'ALF-g38IUKAmlRdSuwLVt79pmEczP17lKcBLAJp_EkI',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'QU3gNfNFfH_MYoOdRNxea10PgBTnoQzsZ5uE9JTfL6o',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'TFl3L9ZAWH40ont12n9dEV1Yxb3i32L4iy7fxiLo4cE',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: '2Wy0occugg2Ab09hjRPhkN5ESZZPoIKZLP_f8ABGOyY',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'QE1HJv-24ou0yjhFVFBs-vv27waDbWhkbVxxiAKlO8M',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'JN7USMvMbuIgbIrpEIh53PGrc8ifLrR4kS8ZEfnVXTY',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'pNOiqUEx77CwNTvHYee4r_V0Mnqx4Ty1cok5NO8g0iQ',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'QFmBap9WYGfpx25St_Di2C41Llndh81mNcsr5-Of1Gw',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'SBo3OW7ZHa06GafRDZ_Lrrot7p3toVUJLTHyXPSVZUQ',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'zGdYuE-Hy7BKP1gKkA1_8q_5aOGHPZcOfWSEPlgqeTQ',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'wE4246EkJfclCYnn056KdCaSGTM6I5wZI3hR5EDP9sQ',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'WZMSHueX-s1x7yUWKQTwDEoJVAw2yMhO7ouYY5x2KdY',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'J4pu5hGlhebHjiFIkz15LPb8HC-KbVA2Ac-8xIZaZsM',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'zMZBLCyV5JtbfBBOM-UwXsnBn2yUIxNGB4kRBinV-dA',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'UhtH-mrUJql6pAEf7AwQ-h23KfoxG2bSNdBJjj0XdYQ',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'DKMJ1YSEQp_xyIs4mBSwB2KAT_ru6bS68tN5tyTCUTU',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'iDw3CxdrETywWxA_Zed5aEmrFbgitSHZOxOwdfhD4sA',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'kjJZuyocsnJ3sONmYO563ea-Sex0cyb2VbwYL19K-xE',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: '3N0zh0I0pJbFREfuJJjmOfAeZR94Ny-crHtzYKtT7eM',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'OgJLYuJIRcd48WFr3rKoSRXbLmDGeKXlFoEUsWN2rdw',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'RVM6ywoYgMe9l83cjGHqiPYM-fOZHa_7ZN1Dc-krg1I',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'V7Q5r57AcXdie_z-A7bFr_fdMdIUUntXaRQAWrHDaFc',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'YLs7Y__1ul36OYOAv9ev2AdeLutuH8-OU7IouxUk_KE',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'cjhX98H-Igg0ANEaS0SkyHxPzPuJjiEzPVeQtJf3QJE',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'KR-kspqB1qd7N6-6C5SbmcZJU2sC_9AE6cUgD2GeY8o',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'khoE5y8Swg2CJECBrzywWSlVUURCCUfPd5zrPb2Mp_I',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: '334DVXwplxwUZzYRC367P7RyhzaG1W0DDFfUo2tkDHE',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'TRZWcIgvUHd0xhesyJ6OJEcql4DxSXVg7fUTpHFQB-0',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'xZ6s_OjN4rsW6GbEZi2rU4Q66AB4D8RNINZXEAktjLQ',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'FcvXHjhsTEhtHro3vjR_zL3Hn8vFEAbP_zHVuKEG-qM',
		},
		{
			cu: 'cu134.ao-testnet.xyz',
			id: 'NQoeC4QEt61n3w3hU_ggRvjUC_D5ULqBPaJQtnFbFOE',
		},
	],
	'cu-135-zone': [
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'gExyXxI3aiofvTSiO2lCR8y5gg4ntWes3Qru_FRtPe4',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'rppeNes1cMiNOCWUy_Iwuvh4ZINGmVg3Di9cIArnL94',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: '5YOFYO6ngzsFSBQp4bCSiECwASGg23TpGEB9bn8J0Zs',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'iSss-sNcZ1OEV7nMmeWdt6BpSTdfwh1cqhR4r8qMlC4',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: '40FgQDpBULgpUanMt7HCiafWeQncHy2z0_BJx1fu00A',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'RKptJxHLNj6UnJupdcm2NSKzZsAxo8tORA5bu9FXBiI',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: '99F0TT_f98JTo9Ljo_U_XqYNhaZ3PHPrQnelHzu-SIg',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'YLNtws8ibpuPdiEOoVEX4_ltaZtKN4y9MDCxPgz3ERA',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'OOQupF2M5x7NUhtIJEGKzVriSEx3boIRR7geZlKyh6k',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'wyUhysxq-c0V-HSO3RCOkd8dDVa0IAWAF514BjIwa4g',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'uh0F8xzA4DdA5mJit1wsNmHI1JXr-MFv7d-lJLbC5cU',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: '9lxwhbrw44It5JZ3lhqbgVvHVjWzkzdb2DvQL_64WdA',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: '7O3hQFYriyvfdFqzymQ1QbWtoTXSW2Zl_qfIeD_e53M',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'f9zPI2h6uPlUiSGjW5XSpbmnA5bM8JXAk7mZSdkFjtA',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'YFD4fYJTz0OOKAZKT0YSvl5AvFVw-h_Y7417Clk3bD4',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: '4RTbvQz5ID8eXx9XAUi7e24_JzWKetJiGFXSZTujG6M',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'S239Y50Oe5f4cIwCMAumqLrYGZuKLxfnI1xyL9HLqOk',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'PRlCv-e3Ow2PXTh7p_noJVV-ifFCjYgULZqd9rwjcxM',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'Up7wg8RUCbl9YJ032h5dWz9ZG00YHm_X8d-SZlTq0Pk',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'tz6jf7lAXVBpv5XgCwCUld4EPZRWKesFz9jIpDCxwT0',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'H-ZdROs6YUgTAp6hqAx5HeqnTNZ42E_q1rd6yEcQnHM',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'Lo6zEpiZfLJdf_g_k_q-9-_AIB1Vvc_3EoGL2A-EUIw',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: '3qy2NWTRhJY0ySQ0TR63k8VgplXf5PbUWiY0Z_l3FLg',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: '7hc2f_FgKfzHgEzbh0-20KzWgjMj-3ucJ8PXP1dUA3s',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: '_exedTdtNL8lfJBxCligLsaVeozvJohF83o2D9uxnDg',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: '4Aq_6sBUyEo6AlKRq6JLT9dDfYG5ThfznA_cXjwsJpM',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'xZQJktL1CfrV2i5P12IDQNW1o4O0-PnVwxDzUKvNMmU',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'ND0dA20llh1n3rAuVUvLqh2Q4K3uMtTUUAq0sOLVV50',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'dkExpQaiGzQ_AEVCsOSW_qIxiiBxiuNm15Umuu5_BiQ',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'FyofHYaZetxMtphpLijQzPvDip-s6leOtsNi0C1evMQ',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'KqUJ1imBA0syTlwcSjRXT4BCd1puW2kSYC2UWqz0DHw',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'K_p6KglntkM_8gBmTwJ5VF6B8uWBslXWWyHJfv3a2M4',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'Oe-rQ8zQiI0SCE0Vy87luz_mDfxRD9-Go6yLlg_d3zA',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'qQs3O-7YC7mgKflIIKH36tILB2RSan-UpuXxt57BzDI',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'JS3My3HRLt_a2_HWZx0CaE9GDs29rDwCdIa1QPTIOkM',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'f2JdigzGKXjVsXOI7mC9x0IahpV43EgWZ94nXF1mwog',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'oYNrmdUKKs4-PC_bKXoTtIA9VRhli7cAMVQ0VFHyh8A',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'gS1mvQITQ99CYXE8Ae3MqRVgWMhqTGIQMNydJFpUZhE',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'leHPB3SPFwMfM1hqKtEQQ9viRSzKWUUmU5lxHTuM48Q',
		},
		{
			cu: 'cu135.ao-testnet.xyz',
			id: 'wpoiWVyyML_kMBK9gPrENYhdmV8HOY2hR1xeCA8cjNA',
		},
	],
	'cu-136-zone': [
		{
			cu: 'cu136.ao-testnet.xyz',
			id: '1eRsPIaX6KD9X2qlmJaIi2JMCZCZvk3hMw-fIYyQYTM',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'fqsUGZt6Kp4wxSt2X5hmwC1M1dYsJpdDetMIk_c4ghs',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'ijkGWFflWZGtEjsH0XfbEkHxuV4c4g8Qg4J995xLddk',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'DBgpwR-3QPkz3dl71okTQMO0j_EhUl8Az0bn0X1P5hw',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: '8p52Wxmo44foGOiyNTp4JrT2oH_0YHrjo-44K0hl6tk',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'inpQenCiqfaFFWFQSSv7IkVbHrWMgjCeRCKC3quYC5A',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'ISllx6QfD4ak6AqKmBFGOFCoECNVSR0QaerrB-LKoBk',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: '8XOCSAJ6nOriG6zN-2Auyf1Je6wtdOBC2kKiKRDZZHg',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'KbGDvc0GSuxMloZhBNN4OYF5B9xOS3iMypOX2PCmkpg',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'N1Yb0peqP6I2IAWejTyrbkv7hckXiDQFo_BJ1CV6LYw',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: '8zF7HYG6bQNwi2uAmJuBEPsKQS16TuHRB1-SouRJRAs',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'LWTvTUU2S2qJ-KsGFlrv4OVIUVw8wxNh1YyBieWe8mI',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'nEux0-aA3zf50mRy9DLFFgHQ_J05vNaGiZ924_sly7Y',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 's8YIcAkfzCa4sFbQIukPB1L3unf-TVnufhNI1Jn7Dhc',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: '2wMevBuk6AoIsSN6hjCCXhQ_czKDyjBUlEc_3yZvkRw',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'cIhdKZ3GwWwzCOwXhZekvRRbWyfZHlQXRFnCjTDUNAw',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: '_ndhjp0DiLQ39ASTTRsV-3XfUGkkF4QRIDR3b5RArJ0',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'O_oqBz4aYJ_MQklWGzY8n4dA-o7qdJgEgPad23rUYnU',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: '0MM1IGnG5TACKWSO--jNLf45vY7s2wQ__TZJ7fOkVt0',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'S_Al4FbMq4I3HufRrnLu35NHRIplble9Zph-Yg4oxag',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'SvCikDPZzLgQKZA6BKQ2WxD1Wt2_ntyxksovU1vEfk0',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'Up5GquO8Xzj_CRGYJm5Wd50Ol5ryKWqAFRdT6U0CDSE',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: '70js0Bgd6l_gnHNsfGWQ4hyUGuqnTaneGczjQ3D88cE',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'eEnHoug-WeoGxbT3JR7zBLq8ym5ePfLwX5GSIsdylH8',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: '9gHo9jigeH0hn1stk4Z4v4hNj0Vhk-NNNOxFieA0d6Y',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'CsW8VCVIIm7jhjxgeTvwEXE3M5YBtOzr3Ti6IFxhGmo',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'IjKAlD5aaOEqX3P5EgOnhWRUYwKM0bmk9qirb5uuMwI',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'e4_04sSxKqqhv5Am6WR0JXm5S_djyrdvwY-y1nR6lmA',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'SQBynNy_pemrYYbof-CcA0_VrHQb63RrDrhQ7U2t08A',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: '20rAHxD8QEMX-GDXA85NXUopb93It-uk_PgaOgjOWBA',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'WRUxXxglnTu6SUIgakOOgTPsYBsMfoBXXHJrGyEmFhk',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'C6gnTNpi7VFrh-BfJ_nmFjaHLtW101bpQhZCP5U0w9o',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'kCJQjHOHMYETbCBA18viqVWeuOygx4SBJCmaL0twXG4',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'H_FzBEdy18ACLs1wMMLNxaiz9Bz7ku7XRmigbwjzvv0',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'Jf686HA0LzYf3ruUq7qxixxaUqUXvTxATyOLcZLjMHM',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'Ox4E4iLsn9uV_nSVOAZPyk8KArnjSACJ0_UEsNZccss',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'hvuYPaoivYsqSF-tzEu_k1Z04zOJYLWgRiPStp-ClzQ',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'nmykk-85aC1lBCQ3BIROmNpd-6f_FkLfBUo6J-Mx9LQ',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'Te2VOlFlM6DR8D0adTvBND-uMa_5Hi_5I_IOeZjcQQk',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'wLj3e4B6Pe4gkma59dMKUZsguE_VM3DMUx12jkc0gmA',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'V_b2kIP5H5qqi06km_nPc8kV99oIuRSydJnAasoXabk',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'W-xtvuVweKRsJCtol_mn60gU24GZQBYdVxfJumZ6K1Q',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'rMR8hM8K2_geVTFZcJ4Zj9PD0ZQdB_FhEa6W_SKXU8Q',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: '2jvGF7__ByPnxytSN7ocaNdyawlXUMZ_Y6faaXlUlS4',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'jbZ1pPAx5ay_wOdezehq1_aIzhR2_QlzgBu9Xd5zeRk',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'H40ja6Kj6M3uMCv3t0HSAK5DWFTl48qOUJt9l3q1yzs',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'fHq6iRMZwd3VK5vogTBKs8MO9fuMv90XXUC0Tso3CWg',
		},
		{
			cu: 'cu136.ao-testnet.xyz',
			id: 'R5MQY9PCABnJk_kskHtjP1nDgUmEPBTHaJECIXkAFRo',
		},
	],
	'cu-137-zone': [
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'VvlfpqQRxpdrpMg1JP0z4X25EyXe-7TqAuC6_iWn0cI',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: '5UjefkqsBhHMNZhXa3MNbk55Kh_hekoEoLDLjtlhth8',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'Q-jx6FHQfI2U5wkApKwBlltuyPTSZztUxkmaBuhVU80',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'X5lIDPjBUkrznDSnkwrMacvgKm8BW0s8Utq6Zx00z5o',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'pNa9suyIkq8ztzkBD00eTchwJfmtoeEPrMmgP3KVRJk',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: '9umXd0D4cJKoU0UgeapxlkmwA06qHrkOLPe1N-1oNDM',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'acuIlB9Q_mlz9Q6T0iqs62Qt0pQpqiWE6lAJUdAhhw0',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'qMt91wdEpumWWdv8UhkCDD_rJW6j1saf7ltmuERkKrE',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'Yhvkm0NRIaL8GTbL-j6VHxoIddEZLlbOGYVc43VziuI',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'GoGmxDZOjtkfPdcCr2NpMB70QqtH8mTzT1qBJsLxuyg',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'ftE6uGkGeUhgsm26IeWfwAxsSRHb3k54ORoR6276dgI',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'HxPYr2evPBLO_-1aRphPnuoXZwLTS0gVjPgovOXpYjk',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'q8fArCcMYtYg9GJ0GyV9SL0GtyuuxnGJilstn-rVTDU',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'qy_vNhlXrf-O6DNopaRcA3qLblYtKFVMonHPzcWftiU',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: '9Yo6XdhNkxb-7CN-CweKo1htO1ktIbH5Xjxp8XJeXVY',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: '-TGt1_9MueFoc-g7Cq0J9RMdd07-6qGZoR7ZvxmQs9g',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'm-OS1UUUMJztjN5ChPGb0G9ilNdd---Sqa6PC18I_Dk',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'w9gUMQTSUW4ttA_7MajMQpb3Vpv_a2DmEfticTqcXqI',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'u5VizU_wPutL8cDiDCl4fvdehJgzWtGxiCFKOJCAplU',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: '6gn68DAgBDsFFmcZ43D3Nvj7QS_KCKbzguqUVSwOLxg',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'oiH1KYQt4tte4XFVAaUYjkgt7d8RgJrIAbQBSXOxrdM',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'VcI_1lFbtlKfg8DtpDYhfIBWVinAL5GfPmjpuPgAM7A',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'le4i0b0TBsBEFXTC_d3OcElB5OJW2ia_Opno9E1ukdo',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'EfFd3MQlJVFMQdaW6RmFYbCclpcgWMJV-lP8THZNClk',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'GCpCoN1OIzyDHUr7xlqgBYgrqehmh8LGIMVYI6-s1kU',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'uZWlTdoDn-avexpc5lFe5ls1U0l5D1Qx77zjVvibBlU',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'Fu2gseUF5dTa_KutM7zqT3W92cMZr9_R_yEMUzboPv4',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'kHvekZO5zBQd0O-V09G5AHmw-wOiwlSMqlTCZVTlWmc',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'xu3F2QavkmNhQfmhPsInGAwBojn6hy1b7RRcDHr2Ss0',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'ioD72CY-E0EBmRobUBPAvP9UiyiDfW7JKVXRikUUXAs',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: '4RouUOekXAshTO7OpKSWtAR-2A74Q4QRjLnrCvxOl-Q',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'LEs0uTCww-BE1CZV_MEYoXoMpZoKgGtvPwgiHJTAwLU',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'ZyQy3HWNOihK3qzTdVHnMdM2KQQvdYzweUzKh3zV0OA',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'JipBa5pU25h4_NR4Qf3Mt5oJXbuXPJ47YXUK7iaBD3A',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'txG4PwPAkdPiFJbxipNCgjCF2P46VPW0yWuaM5rba7I',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'lJjs5h9J6e7mvAPlVID9tIzuoqUXroEJ20UJ2xHN2LU',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: '_vcLoXv57BrrTCW6pdcK_6LI7XxWxhqBKS17WuCv13A',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'K6ErjGaSUt9hIgmEvQRu2Uv6204hUz0UCGk9Ar8QnN0',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'tfQiBiJF0AZGm-q_jszFojFew4BTxCKd_IwrsGNFxIs',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'YU3xX2Q43QWTgV7xajMSQVfmREeodCnYPZPH_9l1HDU',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'TjHq85yV7P7ZXSg0uVORXsFuZxCl4X2RC7XrqKYOsOA',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'Dq7DgG8pTvQcB_uMN4fZobe9Uw9TQvz8v4KY_9bofEY',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: '2sWVPeUTYuB0VMrkgC9m_0MwljaZqEJdAfgJXNZgEIw',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'tfAz1XuEbCfg-u_WNRor-VM5KKpsrtdd7YXB637dcK0',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: '6wjke39XShaGaE1BYExka4jeTQoh2Dt3HZFnY06k1aI',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'bdiskiXabZjauGUP11ZHfBrHWuHBJGkbzSZfVrtnths',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'AB3zKujGlPnVGhpVQotLxBsppyL2RWB38hkip2CiN3Q',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'RUSPiq3hnkPUpOCmV-gmgbh4vd8Ai9GVl-amyP_eqV8',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'tLsoMKPlch7iWclKmtLK_vj5tGfRRfILSTaW8i3Kl5A',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'cFTzntWbZFBfReuz9pAY7wRoRVlYuCW5TH90jiwN6hI',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'OdbgCe9SwL5zUG3ZQAF52cTQdXKcWaZsf5cRNK4OlE4',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'NhOzMNPaCqF2vg-p6sxrGVQypN9_NxedwftILxz1nAo',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'b7a3oVdoWtK6yAvr-8eJzeECuxeVOEZE0RsNIgq4-X8',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'CUrKsf0DEXfOnNc_Z6jUg_cDra46aSajTVEVIB0gIK8',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'KQHc8vj5DnW4Cj2pdPhw2FwrovEGdyMIP80cfR6GT98',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'LQpu-wp0EkyqqKIdhqd-10mDZAZfMT4LWOAhvsv1FPA',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'Ml9UUFqmBPFJ_W9pHj53vrxrCf9xJCtdbDzia2KLK_M',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'ScpaNqR0LndoIZGIde8bPvZUXbPz8Pl6P_sSF3qL6E4',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'SGfyty-ODGDIRlpH3r-C9sSrLXGLkDhNWbsmFVUtuAw',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 't1HZIJI7L21Km_MGV7QQqt6WBroytgf3feNM-7hElpk',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: '_-40swIaEX3gXdIhm7SLNwXe_ve1aNZXFWjeD1d4rrA',
		},
		{
			cu: 'cu137.ao-testnet.xyz',
			id: 'b17UudFn98Dyy6K7eeytFdVCzHW7TxiOmE-WQbyfAKc',
		},
	],
	'cu-138-zone': [
		{
			cu: 'cu138.ao-testnet.xyz',
			id: '6dSLK4FMsSpyxtgPqFndh9LWEq8N8_JZ7euwVY8yMFY',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: '6E4AbmBnZkmC2jXcjO9f-SApiHi7YHHruxT12-qtfR0',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'ehMNTlb8oMh6ymaCK_lnKUiK_t8c6wX6nJpWERt4jjs',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'jiyKNslTVq-Txr4ica7MqNNcVgbwYZk6n5ALUSYlEpw',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'MAGDE1HvQ3GMEM7B3NPIpx_4h2x8FHr692djz38XRm0',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'fCw_yzj5SEqKzz-H-PqVJGdar2wyEan-1VY0spzgGjE',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'ILYXLZA9XNz71tLL7noOqd20w20xw76M3rJl1JUqVE8',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'q8HuELnaGXUuYUXi1emh_0EVNdFPzVn69_spD5s0wik',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'i_le_yKKPVstLTDSmkHRqf-wYphMnwB9OhleiTgMkWc',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: '4v0I2ElDGXOVXuteTTxm0SjxPLcjuDZCJw9xrFnNaRU',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'Fsj5albpn37RKSRoZ-JYbi2hv8IUZf6eMcKL02o4iN4',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'gLJoxL0L2fFS0UYwCxML3wfycMsF4dZb5MXwOXdpi6M',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'kUdmDzU3iScaQr-DM5GrR0sWkxyQEPeezvF2QIJKDuU',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'D-beHrn065MO2aibbIzHJTvp8m7XwiQblHtk0P-JJBE',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'dRyqfEq20ZB4J_6clsmZ_0m1mFbeGY49DCyvzmpoXYM',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'k1SsLtqm5Q7Ayw6C_-_-uHKUqvZxGff0QBCjkwff8k8',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'o-j_r-pmKXvsoHBkxlslMJq5iSfKvcf34L6V7x_gH5k',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 't9Z4rQKqILv9tK2KefP4MoAu4IwjCTf9m9HEZZihkns',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'qX5EBoiuxeHZtWjyx7M0uVuDA5kAj-C1O_S5UMkbBts',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'cy8IUA24yQoZrRRfFiu-cEWd4rTGYB4hH0GuYeE2fBo',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'vp8b7G8W8CcViaw-xoFYB40LhWyMGMXTfUP0jBsB3g8',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'BPjvcDpaaezBrFtzSNrMal8xcSJUn1N0cwnDLqxXCA0',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'TJrWT4mai635zmQ9S6hKkNem9JH107wh4atHq1VkG_w',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: '9HXiNhWZsEyA9pyVc-BkoKHpMBz650b1kyCdXvNIpSE',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'dwubGGCNOocdquoyQo2mDNinlqPviGda3p9YdkRXabY',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'J-uoBgUZL_xwNa7CPImAJVnlmM82Wl0kMvLrug9oPNs',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'Jmz_gOrb8leohhiSTPXi7F2KoxG7DuEKTsS5QNwqFSM',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'fE3LYg-EnPLhnNzILkIXPC-AzNuWJuFdZLFV-eWMmqg',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'CxO7svFyjmiK8e5pr19-Y5ieB84pKYNiFq-q078W8bo',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'v5yEciwAe-L7UzwuNP4ZpHos_CK4vaiOj1tbg-0gPYk',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: '5yZx64VXymO0rvV71DsMgq7yTNCkevkc1TxIwq9kVSQ',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'Dk-0T0s18tfVMUb5mEgGMSns-0RxH-VxeFkodVfbmLo',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'NOzijGISPkpTXdAB0HeZvMIQeSNq-zz2hz14w3uAZPQ',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'U0hgO2uF7_Na1VoJKG5ya7r2V_fTGTojP-C_vdSFwPQ',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: '85mzbkyxBVqbKyF8oW1szOwFR7vpy662EG5qZbegsFE',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'BtZ7NpbVop9NMoEkkgLPJN3CML2XocgHQYQw0YXrizQ',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'r95yJjrByfnSDCZHg2SWrnSRWBe3HAdyo4PJTHIydgc',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: '_ALH3JON1GaMMw6LYhaJ6XTj3wDEMgJ9TS6WXSXL4Mw',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'KdVrv3HiJRtRBErh9cuFkTEMDWfj8-AdY_x0HmqCyZw',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'h6PkF8PjXrFziFP9Al8Cn-rCO9HrdvGNBgMD30IXYtk',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'Hkw7uzMXjVEMcjNP45Nv-boe-UiWI6g58GrMzMpV3nY',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'JmLSg6d7NsxhyWHUOjvm7_TavwdXWNtZ2ZOKB61RHo8',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'xqCo1wmkYvpIQMoDSUIzN7PqKw5joOamPaR5EQ9ejEU',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'xxNAFXqW2amuNa_TDdoQe_o-i2WnkeH509ewZup5fz4',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'UQFW0-JAp1vsly3UygXJJvOuZ5R8TAJQ_cg7ekq-avI',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: '3KsZ0wKhkfOpHJJj10QLGHYM7mBJM9w-_x10jnhXYY8',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: '2gSB68K09K6bLxJSvyPRXaECC4V14lppySSRUxk2GRo',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: '2-hDw0O8L2dLjzIKUbm-VgdyYr78nuBxvjCqNAjiYRc',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'rayKf-sBYwOgDitsJrz_qeg6FpGnFRKYjD9GH2WbWs8',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'ClNbJOMR6jo_RZNRveYPAa5HGuYf6VxQIYxM3C_gGiw',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'Iyh6iwq8OrOhVJ98cB-noj-SnpWQwuy9vKiLNbmeg4M',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'PwR3Ji7f4W6YryUoaPUXXD3OYrQNQn3tnqfzbB0fvCo',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'xjQRltaNgj9Vz38GOm16ijojed_NcKR-253FYhSIVdQ',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'KMgWILafUE1QONg-vOb0G9M5RHWYNQkBd4IKN-fxIKk',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'BYyZFEL-jw3tN8eQYckJL1hnjBcoq9Sv_70VI6WVJbg',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'f4sv4rlJshHZZ0-ktdBy81gO_gbxBTFPJQeRCoQsFVE',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'wMJhfm-xLuu7gDTdEvG74TPUuB3DF3xc84t_y2Dmiuo',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: '56SyDezQRT1BKtSNSi9M8iZtKBPVylN3jT_fNPgF02M',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'xinWncPoWSQWUDgn2AV5WiQ1Evfks36mLR2bxOve5no',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'LXq3v0AefJZnFygDwAZwppBZkCz55TvwX7a7ho3gJY0',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'SbW4odKrJY33tduTCc6QVn7kzhPlQ3YF1ljKszb3XZU',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'SCYXTRt_Zhiro5jr547OXSjc6QRpVQDa71EMJxEfBvM',
		},
		{
			cu: 'cu138.ao-testnet.xyz',
			id: 'urIdpp-IB_v414WKY7YDfM1KaBcCNEHa5ngU9kFaxQE',
		},
	],
	'cu-139-zone': [
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'Nbo13P_M5HS2zcy-mS5ZEfKcfwnaWH8SvewIYT-4R3Y',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'OshtCC1nBElIfTN7sRGYtt7lDSGXggRyE-cmS3YXPqI',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'qSLCtOs5GxzdSGBXYGSTHMQBmZDfpKiz1boxCG2ewNE',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'apzXTfmL-D4ERf_Ds1MTgV4oh1CG2psRQQIyAeFbynk',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'lAlPIfU4iiUU5dzV_i6G1FWAgjoSEuZkGmu2eGxz-oo',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '7jGfdpKyPWfdZCkf7J0v8ExziPMJKVcbSBR9SWri1gs',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '8Rc0UwdiMlRGk_lnmKUUM5alVqx5MQ1WeA0QkyJ4ni8',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'D1TIZZfHzkR9WmLDvUOssxl65Op24F-3tMbuqljWygM',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '9ue4BqQvcfW8-hLiTmaw6kKNHbkod02yXdPkHaMVPf0',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'oYgOnJOKG-jLyvySfMVcmjRH8yerOHwbPNwYuF3TgPk',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'jHEdUGZsOBulA4Bl81vBVfqLqu35u8msfeOd4SxyOjg',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'KYsHxESXq1EXkCuE6lYzc-_XdNmDrW1M9TI7TK18WYc',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 't5280GmmqWwrSqBqvt5drkTKNdf8Blq2E91nAveiYZY',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'nIuSm1PSMFe5HotJ_NL0H2FbMug1t30bJx1d7aq0prQ',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'WciCRhwyHpugKpcOSL9zn9T4fFJBq1NamjpCRBmlBZU',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '-HmF2nw5ctXZ50zH9fBNwOSBVJu1Li_dJr7Y0QXWXsE',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '8ADT9p_qxeen5WyhAl3lDjg_UgNlP3pgj41EAwIxm-Y',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'El-a21WMLTtsLokMrcVjPE_tBCQRCcr-s5Nw3wT7QRg',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'zr44s3_EV_Ub5gCQJ7ZMmCKVNr5dOnclUxVlXCLUuro',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'XID0yD49EOi_RazqOgwqMagRvDxUmA_nhFKDVT4gD1c',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'paQoFK6zVdqjHSY_s-O0Hzu_HD50zOUAWk-WibMDe8g',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'DgIr22ycxCn1UWWSrNLQWDG3rixO-SmKQHW-dxU2sC0',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '7Fr3tDgbS-ZgWvSmin6WuChFqrRnDGe4wJiFRi2v9w0',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'ykpYItwvO1S7O6_Xh66pYLneL95Sb9DsdWk4ULsKuZY',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'jIVMVphSxj_wht7FzsUtyUs78h2p7fXEjXmffG4lI-g',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'Tu03k4L25IRmOrr_Il0q6_ZjfPaPGMdPplRlXaVHlwY',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'DV8PEI9olYN7UqF086cZJhSKsxIFaAEoHpEHKyci2AI',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '_i5U5NE_Z_gFz7esr8bpa6WXD3lv0QtLDck_XQBxpjg',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'JGNdPcWYjXc5ZcL78Nsm4STRAbnYSwlE_usRC0pKM50',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'GhkQbfUX7lmlog0zywglxup8yOE3NfWwwv_6L2ItIqs',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'NE0WNfenc4_bRHOSIT_W6UVcYR-vGm7_cpolZn2dOHI',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'uHVQnr092k3QK2LKiNbOxuCOISB7CfQzoASViCr4Vfc',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '7wF4FHWP5-hYcEesNG8wSETfdvFW4tiIS0VT0F8duYg',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'TyhU-O0KpzPXBTNwwlfFbBKB7Qvsxi0vJglQFp2Sbjs',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'mQ0g5oYmkFgQSNk5gMhnDdM0_S3QZeHsfIYDpda6jrs',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'Qf93sbqN0tRScbSb5tYm6UGrlOQGljGfotExHfesB7s',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '-Bwv74XIAd6rbycGu43XmIdadKZ_lrIE3A63bzWi1fA',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'XjbBGFGExX5yoXbcDiiAsxkZ9eyfH4e7A_JQhLFoy-Q',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: 'Xk6zcsppD298TkTLCMt6ghSTaoFyfIZlhIvE2t7jZbA',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '_5e08iZqxlxaCExvA4FH-ibTXWnJOlhmAO6ZHSanraI',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '77X_r8ZA0AVgLikG3n9YRj1VxBA68_1JUumajSl5a2Q',
		},
		{
			cu: 'cu139.ao-testnet.xyz',
			id: '18R1VaAAxk_zJEDYQ82Kus7RthAhMngwpLnnqoQNwVA',
		},
	],
	'cu-140-zone': [
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'J8IBGvUUqTRVaSYe3-b4wqG4BpqT_NTtCHBnEtECqDs',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'gZA13V4jaYZhs7Z9cI_0pxBbTv07hSsnn2C7-qZRTIs',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'Na25-MPydPWmm8UAK4Fn4lvVvrtRMGa7fLf8rYViN0Q',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: '0E5QM2Uy5syCLLE5WZYmso7Q4KctVG538GVJmYZB8fI',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: '6F0FsBHmhA9ZVepJgoWx6dsh4kRoMeohQQWW2BkvR1o',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'c_wJMSuEn7pqv_ZYNpyDrmkxcH7KIvQ5nUw9Axh4o74',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'krJXKijAAMfzL9_-e775jUfp-v8oR1j6YsAobLvFE6s',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'Z3yprxD2wWkZzV-0LTVTnmiXRPhlx8-BzhdL9Ov0aOA',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'Z4fqA9EKQeuO1PxQv256Od35a45uQIVeW-VnR6FySq8',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'LUV4dUfT8WBFl1QKiTKq3Ah8lHkWoHtpYWmwhW6KFK0',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: '13jj0ZdS-r1ddrigP1xp1cK3drUJyQverLv8JCjJ3Sk',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'gWvS9DCqyyMa5NFfzv0BOFc8s3Pht_rwNfTrk0VnLao',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'Nrwse8mFypm1-19Uu0DOdoEyK5yEGmUsbQwg2YEJU1A',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'cwo76mxzqeRx_fnKDPerOXn8UXf_igk1_E93Fiw_-iQ',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'KXTsJRvINZxPGZK0scTwIWgqzAqTS50GYKW7KY7vzUk',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'LGlLe5hQceK8ePHO7QCHfji2inCZ68lm0lkIw8BbEHM',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: '8ob1uANWGL5r7pgbowcUEV0zJyXvUZKVS_S26DY3Xjc',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: '8fyquYU9L_ZnTb6W4LKvn9vTMrHbXF-NSImxHzIUq7E',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'A7nu-2BrJXlBWQjMS3vEwM9t_nJLefUdzi17mq0t4S0',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: '4nnKkA_2bH_Im_EfXdoW3ZppD-kBLFPz07hln2OtHXg',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'HRIXca3IP7LpeGgDFAJAleCgppQoe5p54KXx9ZEzeQg',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'SalhRnOZzMRm9rhOVOxYW8tLZnPm0FwrWGtdbOSsitI',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'aaOVG_TcL7pMbfMjOy0o2VEEHZtDrk0IUj4D5SjL1Bw',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'hqrKpOEzJ8L_aUggcuun41OdAfdt81E6Vd31PrH6Jt0',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'MVuKV4573jeqVBGOCNPhod83GBCvNTHim3SDeDy2tuE',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'I41vogXSJlcuU9N6NWh9wRIisaWtwFqLONAsSX-fC7E',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'Xvm2fuf0tpvjB42hG9pLYm8PT415xeu_8NfsWQF2ThM',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'clQF-JKWc2cuyEJW1nxZSxe_TjK-B83SM24EgZi8unA',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'l1ojr383iN6a604pNv9n8j3P5arKkan_GWlVVZeiS8A',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 's7yKa_7lv6G5mme9doB_ETbSSAj10RRUoLW-L7cTRdk',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'MjwyV5VEr30mQZz22CUoMk-XHx7DoUzuvZK8JslPwWg',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'fZl2CcNeGlxtNgXiOHRXBZ4w9YSPDdnB5Q4c3O4vzdQ',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'GuAaOFL0Tsv5GfF6SmtU-5OmEJ9qdZyO97wgU_uqPpI',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'i8HonMgX4U0yTeyegbD87DuDVLgkNupDIIsXnHlqah0',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'PXhfBbV2-eJG5po48nzEwhayJQUjnBJi39Q1tqVHPgs',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'ZXnvxFVjJEE9NoWAJGNtYHT9q7xXKE7dApazIm6eAdo',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'wJ-WrByLp5TLyKYIgR7h61Den5U5tZk6bUZrWRUqJkM',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'cQoz-d2VPWVFOiUjPyH6ujLW9gaHExEOnPt--6uW4uI',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'RONqsosDzPFaisYJ8oFiLwDYPlajEZwjCwEVaIch1pQ',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'jNo3FhqjyRc7B6A_FohsO3ihF-BnYe3bw7zihYV82j0',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'ql8xo7E3dIA8rZC4lWVVAX_vzr6mTnZqZkiIovkzy_E',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'tV2NJsA06iHoFFszsuvYkbfRttICO64A8SHqFYKwtVE',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: '5nfa8_Cg1QTYGolezrp5_YxTKFe2tRCFAiyfjQM51yo',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'HUYTzcSc0tcRmZ_X3Dsa-o1mE6Gv_VzCDxDVJ2GqrKY',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'vIj7UJA90ASc8terzSprQM-Gx2EuZ1rVK4IHo_wunaw',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'fIxffgqwfN8pF4gzm2Wvu9UpFCWYSKB07f6cx56G04I',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'maxabPydJEBLL8W4IVDd9cG44MiCeu7lZ3JZKqiiNws',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'QVgWIn9IbH16A_4UIclkiiPUkc5OnUUvzVtJi4kzq3w',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'YY0uxZCq7oOp_wfU5irqU0syBPjM5P_E-v4wuteQzbI',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: '_QKu3BDOhvcyg_lh7nsnQIe_LmpqhX7nw5PFIyNhIdk',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'rJqV4UrRXs0Jeshe08ESfRsMsBQW3neI8L_Nrpvx0k4',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'BqbMWwShuSdU50uJMgNMSAaOArlMBdz6yCQe2jq5kaA',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'JQecF9LdXyMOWb0F4UZcneoDR1988l8SKDW-FnM6Axk',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'tOZWI71yFmmshcynyMv7AREel4H-RzC90UU2T_5fVZ0',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'UV0CBBc6IdbGDaCur6PHtvPUXM1fEzDC5YoQJriL6Z0',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'HgRLsO-WOAI1OCn_sOLpcqPlm4QGLucNa8QifajfDYY',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'M0QF_SPOsupS3L66iTciIwBPgjNTSCgaGTKnXBv_nw8',
		},
		{
			cu: 'cu140.ao-testnet.xyz',
			id: 'SyQTYgVrhDzse67TtWTU95sbzpbA8vX3j7NRSweSlj0',
		},
	],
	'cu-141-zone': [
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'hkNpu8m7oC0Zh8Qj3zc0pAjIM7Uon-M5VcnfXCU-dw4',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'Mmt7cvz_l_js5BERDwqBupFHl91iwDAeuAxnT8e1eTI',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'Tn_Z24KclC8B3HrLgqAEb02ipfcOde3alKQc5BOHcTQ',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: '78TIY7pKsQ9don4icVD7Vz9b7asxAOF5xEKmcSuiLLQ',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'lPZCQ32HC9_sPuQlu9A2SL0IGITiRGBQiPhktAOwRe8',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'AkcBx72U7Z0gUH4KD35u-u1xyHafpRvMGiV4R4cOWrc',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'ENYaYuEhhE9LXFFD49zWHwOufokvR9jxnqKKCCt4ax0',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'St2pPYNTG531OuyHh9PGM73LxZrkIGkIqKxrN1xuQH0',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: '90v4tpL-3hg-8hPotwTiWpQCm1d5F3F9p8sJjG5blzA',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'wCt19DlCae9KVMbdwXGoeIDOYETAi3w69Hi91cRdqZ0',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'Ix2lTvohJrtgKImYr-Eh_5KuduEAot6F7PSt3yb3PXE',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'bxeIMz8tpX-VTwYtM0QjcuGQncQk2q-_tI_J_IUMFSE',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'qjzGwK_XOULj6K8qBatZf_sdvAhN6muuYbtWmf9dDbQ',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: '0GR30Th_Vm7UCFfa82JeAIJHe_sjXINlmwIBN14C2bE',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'jfl4Np9T1_gkGQ7xQdYH_EOf2qO--dDX1jCYf89NMns',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'C9JxUA8wzLdaed4e7wCs6HCBCNY6BTGdcwirZHixZ7M',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'MurGExTAs6qaQ0sfbQxjwyE1ocR1J7tkh8zI5GGDfhM',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'PvsN-J5HAD_pCnyXsPwNBhA73c04K-R7elvLbnJzk8w',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: '2l4WvwiGhk2_8XyV07uDwN_cMV-eDHeqqu-T9tKpAvY',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'USnrP7MLgQuDTXQ2XTmebDVGtMsa0PPlb7l3_cEnPFA',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'BAPEGJtMp7L1rJfcYlFLeoXicLbs-qq7s-EVQfVGgqw',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'MZdvmO8d2IdOuXxAaXw9xjOsFH6Mk2r4IeqA6cT8tyc',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'LH0IHVohmHsOwsNoCi7MhMkOM7st8upMo2FsZHDVfMU',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: '_RGZRUMMGpY1IFH_OwO7bqf1YNPyQLq7FA468wb3KNU',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'AXQwWPV02vi-ZUBha5mgYKeZ_LdHVOZUwncPLd2J9dQ',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'MoZcu4V0-4xcJBRuTBYJ3GHYsXE5IC-UlZ98XZUX2os',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'UQzuQFa8YT3EQT-jSyhcoBZ6HWedWZ-KSsjVEd7nIBM',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'l41yaPyrENtiTBActMzk2yd46wWxnIwB_Ayzbwy8mxU',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'FKhASRMNoBp8YbezAcG5UbPFyTgE2IrIAK_Jy_eW_gk',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'ECAON0Hd4rDgXAs4zPJkMZIK5IKJRR_bNzzGd9V2vM8',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'qFpDsIKMks7izEJMPuZiiIVQl4V4crj-nmVulSejtl8',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'BrKJu6Vk80KimRXdKHd9JATODd6CgJnp4jBbmmkoFNA',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'qCapNx7Kh6h13GT-UkZGplMsOz0XBL4YHqKOai5Niys',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'XzVook294ox-rdBHBPuM-X6m_-05YQVlXPALY3KzvM4',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'FGrjMcSJ1B7Z6sfc9-BNjDvdqoUogml-6_HV9lQkSkQ',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'QRp4Pk3sJSM7Y0nwVJoQayFcpkyFakDcmGBt51sQKt4',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'tx23xJ49HQonN7qRgT0iEigzsw3C98G94vgfJoPK2B0',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'Aiu3UjHGNfAvtXwMPTbxMxFoBHKsYns8GxJ-2hLzgng',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'jN4CBF0SCZTCvXaznDAqU0V5a28u16OSG5EOZJOZzPg',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'JzyM6k0E2NxrrfhEWFtQjE9BxT8ZMXRBGGpXc4zC1xM',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'mhyfdxDskY0psiCtR2g8Q0RkEUHAVTo4pZTJYmOFpRw',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'fG5sUBHf3tyucb-Wq68VpJQRh8Zetv2YamS0_I0wot8',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'J1KvzWGvZw5O8uQsUqEdyGNslaKvCqFVuwRM6LwL3A8',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: '32fCAg8U7FH6kX0DN4NqUf0GmdtxW2wzqYerGZH6kuY',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'ez8EDZ2Jhmrpnqw1EQpKEBL0VCV2zBE4ic23ywOQC9s',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 's-JxaWjFpZel4Mg57o4psMrQx8C-pzeNTR0saoZ1VZU',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'sPLLt4QzSYVNdYX6vcVZkIMQVFiogEUI8qp6uc9zsrY',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'r2nkp0j89guZyi5GeSsU0zKTaXok8BSrTuUHL905B9A',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'M7njeaA88ynBogxsjQsyrT2Y_G51hcru1Kil4f0u8gg',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'fBo9EtV_VYM30lPVqiLMsocnuMzpaM8dOOaGwjorPNY',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'RdiOs7wNV7g-rZfb2IpnnrzTAMpljSwZZRNQOx8-cR8',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: '9tDbzLWsuVrixR5170LM7YmRkaqbogBMYfu-V6yu5t4',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'oM3yKlg6pV4LRURefI8N4fekKYrcFRipQZUlR_vIU0I',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'pCgdFEiWzt7VUlBUHK6qsOdAe87H1lIVxQIJIoIv4gA',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: '9pDfWDasVm8Zo9of_rxL6_X_b42lgec8QTD6RokrFMU',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'EUxDZ0M3y1lMvGGctwHkHMw5vD21fGQANnXQ7yYC7fg',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: '1zVg05b27qa0FA8dpUo18zQjYlwmRso908VwdGA_Jy8',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'OW3G84ITt_T8i9DRIktX5xYN5yFmCm2R31DVXcsgEug',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'qJbo-9hTnL3n04bZeR8rKRqLGruAwWxJSjPCcd5xBKM',
		},
		{
			cu: 'cu141.ao-testnet.xyz',
			id: 'sgAmbaqoCdsHkB25LCGziJ29bjFIxMOzzzx1hSj_HaM',
		},
	],
	'cu-142-zone': [
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'SGtitDwqL--vij1Lj0z-Ev7NYcboCM4A3iML3Zks7mE',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '3Ek8KKkQYuR1pyiSVKixMHgNL8w5_qvjFwi8RaxB1oY',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'amooao07c-rqrBB0m8SNPX5W0SdESmUE41iIj_fjcpQ',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'TbGYqgp_dIgRwifc_BDmTxoK-qPlkg-hvd_Tx6YYlpU',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '3XE9caX68qhHwb49zym9-dhSYzlYGgzCGTKm5blWWIk',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'Ys7LqkyrlkTWUVK4adyOus0nCalyDgMmUQAN_g25pD4',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '9O2xd2CnmWQ7fDAMbgb-dTfNqUq5arfQ1f9c3u5bp-Y',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'ClWRL89d8J7-QbqkkDDref760IvgjoMuETMnJx8tjyo',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'W8FXXmE1YPy7Z3LmponHuRZ6lu0a2y7j_QkYVe_YWjc',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '8gAl8fQWYMCYQywtptb9xXKAwWjIyZO19AL_ai6BcZs',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'ASQRIlUvytKdbWiuGJYzFzxVBB5e-A6y6dn9ke1--tw',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'P0Hw4GQzawz8y6Jk4JhGxGkpi7sz6cvk0bmvXu_UwSs',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'CyDe0uJQB7Tjyx_BHBuuiSxILkb-UUwY49s83Q5DVkQ',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'GGtasweToLPiUSK8Bi8TTBBuoLiny9FrVT4cBxMP5ro',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'PRDyWd--8PJkBkoDY8j6Uu9otabgN2soYMk-0AgGYLs',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '-1MM2g0OLOkqiTOroS8UwusDO1E5SsWCE2eYV1p-RcQ',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'Wc-GGuR6_pQ-g4XiXXjJ12P3RD_2Aq_XDozM0fKzi2o',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'lSI_T_T2qW_kO9_GYIVCLKfRZxZDNelRQIhj1-rkKQQ',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'LtJgD6qgiMe4E26iU9G1Ga60HPO_9U_RnXbqQZ32Heo',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'Uf-TM7RVg9sZcXPSOASp0DOiY2itg8kQpT12gDIfz2M',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '0-T-_uzI-20QOCgNrzy4EYkrNMDUF8RqygaTQJiLQYs',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'R3orYI0cSf-CMIjYpW7GQUajbmw92QTNDuAaRwHSmFw',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'JfvsD9fClkZwj-468WeFkOTeNeVLLEHGNksv6Avjtkk',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'wGPTRDfZWQ2FZsMSqcKwVw23CjVPMSXU_N1FTXhZyks',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'rgXTV0g8ytRk5be2926tbt5H1VC8VRvZwMWbEdMqRzc',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'Fh8D836tOHcea3hyiDTNAYc3K6dkLv5wMZRkZ-4P-bc',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'KnFNKBy184FKEAXTz9j6zb7_1E0QxTsqjGgMYROzeQQ',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'NFPPUdsrVK8JbKWxtZppLPkwZ82BDer4CPBszLWVoF8',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '_vPuqEvFXo6JdP1Ud7p2SnwRWPq1ycL8sPXD7dTW3gE',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'zq7uUkcTYhjzzesIo7Saww6jjCrza1I5vVn-FrFY86s',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'CfuK-wd2FlejvSxxk07cOX49mJHIEqzJvpjwUw5i0cM',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'Q4qJJtau1nv1MUgn42J7JWAAlIxsmBzcAgeVUJAQ7Aw',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'S55RNE4Vkz2TJpwNFEsqGuXaDfftZfh3cJumjNFsJvA',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'Ww6oRmVtSkDbERZIOLcUGlxlPk2MX8b3UxFRGwT_0SI',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '3QfwKYYls3UT7icQivdvKWTAgfIb9_Rvq8asSdEYHLU',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'Cw0YQNtK3tIXcpuUoW6Wf56FqQVgadeDveMybiQMJek',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'hy6U5V_X0OL1uv8uHDB6k-oLMvKFrWvE4154i5N9C9M',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'kiLgawfV8eA2sqv9wWDK4WFny1_Drv1U0M1e7kTWK3c',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'IFNcxYHHtdhhGapMQHXiBM3OhBaoek1bKbqWbA0Jsbk',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '1PoanGCODD9DL00WJLvjFg9GwN1yv1J9Yqgomg0rn2E',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'guA9X1aP2oP99KKa2Y99ec1eDqbL5wjA7N0HtOCCIYs',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'JPrQbp0fft3hMDDou9ZRvHciV7c-6bSPimOHO8j6GxE',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'Ij_jRvkl9N0GE2UM-iQHkXEsE2EqiUs81RamO73p4dY',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'uY8x1zKOKJ67YipgoAMEHUx7wtYUfUtOiYY5cGJuTcs',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'jWy-5gUX2g9PFJsbVvJWT6vMZuvy4sc8csU81tgurxk',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '-WWyxOxDu1ySeX84tAgnjxBvY2QNpqNK1Zdzkr88-zM',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'B803KC76yo2KRZPLCRcrnQtLG4nd-_EeEwhrhA4Wbzw',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'BWjL-OkPl0Ypq_lHBs79UM4h8I82RkVz_L9UEdwexok',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'q5AYmWDmXKMK0XCFbXO-b3OIfH8_H7oHex4NSK628uQ',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'HYkz2UTXuVP1CeCK_vepjy03PZHredknK78AHZgLa2I',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '3EmLTJkdmBsK1Oh7SSt4UZsXOWbOmGqZWPcjUHIPxT0',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'L7BKIqqhVv3xlqg9EGr2C_JKB8vJjdI5StnVMLda2II',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: '4pbaDbWz1azb8HdliKt1m-FuXiDq12CnMDxSHudOmGg',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'TDWOyhx68BeKvwuiCmn99JrgZJOffgxiE5TLpCfG0rs',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'x1TDf_NFjEEDw40rmHJAwCMR6Fp-r5tvZ77qVoCgVDM',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'vcytoJXwx6Uzzcy2wqRe0aTCs3QFh53utfSD5xRwFY8',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'HI4ZM5DOcMhNPMox8Vo4G3qSMxdSl_p_5Xev3tKT3M0',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'go5Se9Q7gpeCe9klgDBM3Cz7teDxdlfFcogZKtJgI14',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'Igyc0kyXy9IBQ3D_jFctBWGlS-QYvPT4EaJopnyDo1o',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'ZJQWhHAwYKiViErOOxyrkmtxVAccSJknPPzcF5PUncc',
		},
		{
			cu: 'cu142.ao-testnet.xyz',
			id: 'c7kgoXluZI5IRspIUBtmEvcrObUYecRxBxdKGeLVDTo',
		},
	],
	'cu-143-zone': [
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 's2N45VKSK8dhsJRN-xVPA3ZNGB29M1chTHBsci9QMqc',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'UXGj7jCuobeT9pOK_0fymYA_RPpfqvpcJwQO4HdFLCI',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'uyt5hVBYFSJoDL5Gl00Qncva5Sv0um4pMfGNQiOaFTI',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'gsR7lJRW0lxyctfYyAoOjMbNlpmPTSik70ZP0oOnveU',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'ccukQCv9qGg5SYrGO1y8D0Bj_NqD7L2yHRKhUND8LLE',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'hs9j6GFzCr3raUNfBD9UuB1hgBG8GeSAFHPAYhvN21Y',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: '-LwIVIrKNjpTR90zo-2OYJb7D4MTS3ayqZsPkUNSVqA',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'n66eVZRIuOdCv2F1NGWkUppvRcDR5OIf7TrWuODh1Z4',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'pqcWC_ogYq6QCsM-6SZUc6jQj_7jqDuvsB19-Z-3ogU',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'Ti0bsCVr1T_jO19jDoYGkPEBybUC68X_riX3LwEaqJQ',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'q16sBgZEoX6zRGxPgYZfPOaYxtedBRqyhDLZLHokxqI',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'odZiGQMjuIVh8aeJbi2iimnEBbiZxThcmkVuq7M7aXs',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'PuzgC4qwkEWu9mI_NfRMBDGQbU_PLeh4GTPfp0Xg4iE',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'SHNJSYEvOVxi_LgUeWlz3kqW3k57FpO2D1SR6Cf9edk',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'wnZlIQ1OE9aiSCt-3KzwFz5TaYAO8HYOQuUtEsyRbw4',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'FZ3lVvqoSVEdLHUObsrBzkQz3KhMzDYjC5YyBU6oOfU',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'zlpiKpFH_HVvuDoGFrZU9rangtZxpd-YyYs8o6L3Fjk',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'Nv_wBzK4L5M6NgPGEy8I7zHO3JrSeBGM6f0hISH8AxE',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'aR2tZydE-9JJeToccHFBmuAGILg9bP8E3jxv_mRA9X8',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'abtWtbnPxTwX2dXxE6KM7HoxtJDtg5xbenHXKLu2-CE',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: '80WHnWQZ4UG7NqXuUKUhOgr14nliL52LlnOmxa75zpI',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'gzOLx0Rp8-DopNOQpWi9HZDi3DD2CIij2z_W2JklfoM',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: '7AOIMfTZVpX52-XYBDS7VHsXdqEYYsGdYND_MoEVEwg',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: '7DtK0r8cesl__WC6OzXOHoq7JnmSWEZjH9pMQrLY1-w',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'Qvc5ROF6xeMvqq0jjwchwy7uGptdXyGtoeYug6eJP-w',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'oKbGpxeXX_lHEE4_OG7d3eWsPRxbVU5_odUSBKWGizY',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'K_c2lslw2ZnXutlxSULyCrCxV0eAecvtRyldOuqkKFY',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'nHpn0o0yiSprREG7bHMWws1T3neO5wHR0AQgh8pj19k',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'SMCdPtNZG_vhFzWTuy5JZoh_8Y8Rre-1nNSz-P5223k',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: '-dPFx_qnCbb71X3HAkDmScOe5ABZJMUIeUZNo1K-K6o',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'yHgOle81EvKicj18ZJJt3frbw2KiXhJVuKOzl0tq37M',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'fQp0fsJp3X822SY2qH4ywD1bT3aHfMawIbUNbliWPAU',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'SMVULnrLMzuI7-QqQnKG8RPhf_k7D2iq6HTH2VpLR7M',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 't9U8PkFBA95wd4qj2-eG20qfVKepHd2t-08STd5Frcc',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: '40v5BC4K6aCIe3Bi2d2km1oPxF7JXyHttLXiYrp0IC4',
		},
		{
			cu: 'cu143.ao-testnet.xyz',
			id: 'PpaCCdJip2NR0TzKg32k0inIzyjAdhGcPRYfU6yikGA',
		},
	],
	'cu-144-zone': [
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'rFSIF7g3BYK-fD0jF9452J90vPcX33Q-T-cV6SIaFgk',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '5kVpZ3SOmJkROng2gnB6OYyWA9448bi2WdyHVkUoIZw',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'O1tQUwmn4T4QziMYkIrX-GVdBYcziT81LmzKCVRvWD4',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'rxbBpuK-jkdwTDIbMA48MQ-phLoNm7wpyx-DOPiVpUQ',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'h7MKWTLyMvFBEhflsbstuTdqIP48nrGhv7ETgEew4KY',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '6gLP92yIF8ZgrHZpogUoFeyFuJl9utOaxyK58VFnpCM',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'ASe9mIaGoNc2rZ8M4tTyTO82qAJowZFV1bk6oatqnhw',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'mTicDqTh2AuRNvmXLHXg80n6mDjcC1Nztj_gyxM7psc',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'j_0n2NSTeG-yMlNgi3FGuCQ45jwW1EVHPLRvE3GvKws',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '2uYLrXWxs_ucWLkDCQ06wcmt36TETHA7gK_zk7iJJ4c',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '8yDSyv94VSR3uJ4DGV2r0W-15CfOHJMjaBxZ5bO9Kfc',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'H2pozUD9HYYy9_kFzziS6KQ-aXplecU9X4AinWDYG_g',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'R4kbvHkMiqhorcIAxQ7HQrYY8WT0Gmk8rQpqLOVuoQU',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'ypjwVnuXu5h4Hlz45M46yABxv3f1qjziCQmcz5PoDaA',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'Yr1QKetQGs1YxxFzFEMUqMI5pdSfUubJZZwQ0cGjWu8',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'Y-T0LX6B1lHUV99jY_LNKT9JpxLm-fmO9RwDCbCrppU',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '5PMVQ4grdhsQYSZAldenxddG61bzuLtZvIrdRtNj9zA',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '2B0pbIffae0huXCRQitv9WaAIGpsu2Rv7ig3TamN4TE',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'b-SCikkMXgH080uLOECwx-F2-sx6ZN2dfkbOB1rYeOA',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'YDlzXjtoYv4vGZ4gfIrlMtbqUNFekeQJH3sqd7IkwbE',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'Gy7iTAzn50GQjOuZynI4bnBpOFoKQxc10cx2DP5oL68',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'G_Uk2PHJrPGNupDz7gGcG8fo6w-tsWjKpmJg2RtQnMg',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'GoYYjrrnV3RaczewLJ-UxkM5S0TOkTlDog4iyg68Yu0',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'TUQtUAuQwQxq-r0uxQNyiqVZF2qKE-bR0nrnOVN_MVM',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'xN7xpox9Ti0ALf6x4egErPAW7ut60tDV1kTIoc0N86s',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'sSFlsu8xvgvLu4GXJaqrLXDJ3-FDQEGHXy5SQu9oa8k',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '1mC1dVAPGyiG0WnzIAcopznOGJ50Ui5SIATreTb953E',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '9B6fUuja4fWkYxmo_g_ytnOKXkDZF_UxIkJvGbLQvc8',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'CpUF_LJ0DTdrwTyvMB68g0QpZuc8xgRV80w0hwwk8rk',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'HnA5mwvDmlFRSFrDa6t1XTtjCuHQ6R3QZDwTolozrVo',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'iuPz1fMcumAGRlXq9suhN-vdAKcaIWmpb5H4sHTnFQg',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '1w-mkBxhzvRg-C0LgdxTw4S2xNMPnHztZu5szspfPPk',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '4mYd7OUtvssh9DmbJHkqlgAwPcPKKqHnxbVmcvgC8Cg',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'Nr04JvX0zM61lVRh3wkeAqZCOXQTOTq_xW-RogG6QPk',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'VF3f1vRienJoR5-twIDWBIOHafhhcyALFpJcnjJh1N8',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '440QCVwBGfZRN96HCK-Hs7tbSMjbDuwU2uCgUBqNCn8',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '_5qolmf66QW2zcH-ml6ZrM7TQ7S-ssq1ddqGlvwIjCU',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '_78cyzUxu96u5CR5cmnaYEUomYVVydkQH55YyRi1a3o',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'jjYlCufNLMlX1bZWl4nLfXM_AS0zbImFjjtUmWNZivs',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '_k8XJArXc14IKWK_YPn6Ve8USob5eqvFsd5atYtDcGI',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'iQPTFWy2ZQMHS79CBoqsFX5RHACEuD_6qTx1LZIfnXM',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '08NW3QIvtpQLvLAY7zYl6zdvTUTp-lpM5lXuF4MUbjg',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'V5kCx9A9bn43ZtZgxH2W13h_SyHjDnSgObpImjb5Tz8',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'v8dMZJeH-wlNS491jzMF-dyDR3XSAKdB3Sz_9yOiknU',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'u138nDaxxc3BceXh89OAt7pRWb51bMuEdDYk67svHZ0',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'ylLRpZ28HC9Omf9vwSX2ipqQyXxXRGMYNUPbLtd0Uj4',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '2lnhb-3Fh7Up2dd6HPr6VVjL6aQ-Ehnh781Azr1Qtyw',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'nPcOB9-gVhFfviM2DEEIkoUgOHrr8ll15Rafi3GCicw',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'vQB8b-s3MtgHFZH6c-jp2IJEgZ917fBhjtwPnDu1DAU',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'rA1dj_v8Q3BnDnP73o6aW9xoN2A-_L0iHHwwK1h5LUY',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'wEZxBzhTHic-0WR_uSgFntGiKuttAnE__ncYIQEJKJg',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'w7u6_her1MQxCBnjLfWd5uI4QJpZsEkrXPKtcobbl08',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'G33Z-gxOT9Ta7fPWf6bmD-oYP1R7mdJt1RtHXttNwVA',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'PiXFVITKcQWsmZkmx5smkIUNlvhN6IVV7G8N14yfAHo',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'tQ3jisXJXHvOlHjjfnM8TjbXmV27ZbB8edGN52ovhho',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '8l6an4pWlz05IB82rJqGkmQR_2N6qZLROtr-Il-7tv0',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'MizADajIUDYWNKCiazFTD4LvA61qWNOaeEg3y6EkiFg',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'vy9fmniH-CI4Y2wX_BbFIei9K3EsBTgMdGvN-6c1fww',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'QwGAh3xsZEte2ZCQrvh49Kzne-IPr3HTB3YQXRD0ErI',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'jXOB3l2GpzvGv8esTg2aanUrIVMppcIK7SeVxroFKog',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'IkLCuGsvkttNiBW-K2y0s2ivqC24_Bu5YZSxq3pOknU',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '19mQv39o8615de0zEdvQqNTjmeUCM2VZC1TZcTmIgtI',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'C89RQgbiJMGrbhBSgbT_xuWdeuf2ZanKUQ7p--PRpZ8',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '4mlhmSNRQIsjmTsJqpWvuOI4ywXot7fcf8xFCFi7goU',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'aLbowuz4EAULlM1Xii2J99EDHJjO78JDq2yNK3J9oTI',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'P_EkjYvScR6yaI40j-VkqVXAwlBT4jwHsOZXbbPlPVA',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'ujzPpPX8aY4Lr0sQqxoHMpRmpEr12zosZnx9NKD8cYQ',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'BlA9I0uf9NYYbTU2xIU9zD5r1CEgwk3t9gZRqaDS9I4',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'tgHDstccer_muxsVhcisLtDfZdR6SOu2UD8uYmcerZ8',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '2WBwvfDCxfFEbD0LFr4nG7otQdiq1RsydeWes8zpY48',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '4BPrauCTB-AHqmhPpNvSBO6zsLjLPuVWGiKhWnvOCVg',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'rJh0FN3vIvspVweaTmuK5-N0firZFfPIZh1VCUdMtU4',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'U3mfR2R6g_gQJcNTqvfaZ3ZYZryEcoYv-xLtjsztU0g',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: '9QBRZK674rhfIJrPZOILZ-ZiEpfhQTMRwH2r1aHy0VY',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'f87E7IS-CbSOURigFPN59n8ti-kB37NeHsFMxYZucVs',
		},
		{
			cu: 'cu144.ao-testnet.xyz',
			id: 'Vj3lIrFvAwD8KJKX8RuE2JXUFAbyjDyHQpq-FPzDB-4',
		},
	],
	'cu-145-zone': [
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'u3pwUnl6HWWo1rYZY9wnic6OvWDKFE46nWoIGV6eB-s',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'PPfKmRhDNsdzJeEJ8ZpaunFTtfHjPa3WamOkrqKJ_NQ',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'bT_y6OYQ3djh71uS-hRVU2GwFTCHR9g_Yep8wJf-mr8',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'cMFxGpyKn9kTpGlsA_i381rsdyOt2qIJFXVBT1MKTwc',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'X_Ug9TA-nWxC64k2GbEe2CnzcKD19CM0hSWMFImJUyc',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'rVROVPKxOCcabdYasng_s6YbN7SVTqkJwIlX6I1ixkg',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'ZOKq37dFgYpcLmbt--mD-Lf6vlDm4II8eQiY3WmpLvc',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'GQ5pa1D4L940nwM4X8jK4hOSpQdqbIwF8UDuzdwIyuI',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'y39nwFYJNnA1P8zZ8XIBRUW4mTPgXS3_VoZlfmDdmZs',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: '6EIUYg_u8eUWG8MjzZ_lHVK4PraAPifziVYl6ZwCyLQ',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'zMz4Wp8VQjEIYCxKkEjOt5mlOCwixKiaMixVrUMeTWY',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'vQm4RMN4gHPqHYbecfjjSB6Pru_Iu9cZdmRARe-Zmv4',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: '2EZ_lMS_o_1Tanu_NAu2isWumCrW_7Eh4DekVMyGBD0',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'fmPFG-L2Y0FGFLYwaXfZn_ExQ0efZGB09rIYorEJe6U',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: '4QT6R0u9nXCAcE69SJaDX3GBLOEzon-4otAveuqiFYk',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'YHzw-yRjZ7QrGmwwP99ERCoRkm83atqFWxBHjRix7zg',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'hjBxkx6oBRuZdghOZA9k0iK1hSALzXoZpKJVY9VSBLs',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'Wl9lFeId5nfEhDJoa-yhep6mB-M9bbAadetxSJmbpWE',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'B1CpxQ8eavd2tguRqklWNediJkgRlEib7d9QCYXBE3g',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: '_BlJ4bIk6VlZZOOgvEypG4mYZPwyI61KFF0ArtVGws4',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'pA8XXTwb76PjbUnPx4GD9g06qTT4YUNCzytcrebbbpc',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'PURLGdY5k7ujpBM_j_5XkKbnE9Rv9ta8cr7EOPWYRqk',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'lNtrei6YLQiWS8cyFFHDrOBvRzICQPTvrjZBP8fz-ZI',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'FCb5eR4oDQtrhjzALqk26aOEAnXgLqRlX_BIdEGEaXU',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'Yr7dSmvkgDZrTDYLcBbB2Fz_Dagq90IHRwbShvP5RH8',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'ODlHpR9iKVsAH-0pTAdlzACjuGxMgzEJy2GysrYAvdY',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'lgquY9Ij8mVPefBQYMNkwW7YN6V29U952jpdeFCxFHQ',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'mFiAgXc38hLDAuoPx1ShurCYAslBndhuqp6x-eL_m1M',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'mTnbGv_OlWLS6KJlTqN2s1qlLqinkDwzQ8VnctQ0b0o',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'n86q5IQbnjEgNEDBa_Y2tKdQJSWsr5v10GzctMJsHoU',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'kT47cyv7IgdjSwO6PmRVSDblygLl8QLL15gG-cIPKLg',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'mCMqiG57z32-plDYuW7RhalHvvhRTjrM8lHyU85qUPw',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'j4yNm2aJlSOAI2_63Quxs3lgHZupZxuZ6IsbC0r0PLQ',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'WQ95M9O-InjZMEJ9Bk9OduxfCwH2uXMnYZTmrupk7O8',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'NcNcpe3P_vlg_3lgkWbnVeD7DcugO9IudFh5qEDI8I4',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'pWsWgQTuksqtrX5ijYMXNXtHfO_uIy7AsXlCIRuiZr8',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'T5Asp3p610B0B2CDxXtmGfvKdXraqGN2L4ytje_CR-U',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: '522uQjP2nJ-u7TrEtDtI0TBnCNcrG-ybrciEr81uU28',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'SX5bFl_MIcu9CjIe7Rd6jbpLXWiS_eXuMvTgjYh1H3Q',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'GrLmx7swGj_wu04fC4eNFbDDu5X9tkOTiJoJe3vhaDk',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'Gu11h-WeBwS1dUpfPsqZv6aKADZPmlete39XthratwQ',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'QUlUTEuAi7N1WlVUZ2_VSWGg8uJacHmEiV5I1-YLaqY',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'vkrMo_IAaYJMVlEsZzlwXElVbGQ19w-C4X-0Kv7zFTo',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'Snmvut3Iay_ugE-YBRje2dJ6_2qjiWce-TFa2H4xk6Y',
		},
		{
			cu: 'cu145.ao-testnet.xyz',
			id: 'ltMfI9fz8hHxAKM8X2aSKGrfrhpH0RACYPwPny-dAvI',
		},
	],
	'cu-146-zone': [
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'glrclqV_zHiwoob1jrU7FemfSnI5QbOdJxK8IG4JjJY',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'hRY0dDW05PJIs8zxqgJG8xVvN7cNi8P4MqkiSyLJ3FY',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'jLEip97dFdl--Y-irjckDF3F-nDYjA-4ZtL6eHb3Ac4',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'KbUW8wkZmiEWeUG0-K8ohSO82TfTUdz6Lqu5nxDoQDc',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'ycRT7y3JYLqo_gvQvCUC85vN6PlgGxfULV8mqwNbvNM',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'zxZnVOl4Ul9xcKVS8TbH_4W2vcMZFUDOHn9VcyXNM8c',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'ZPw2qAuRDr8U5LPNcwtzjS_bOETRCRBrJBe_gjwC-TU',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: '1_WYvqXAuJat0hG6PEWlcNT5mTozTMIwW8W-mLdr3V8',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'aAm8aoCYi-JckVG3vR1A9fDZmRwA3Rfh63HLDDjgpio',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'hESVtnA2wBhN8v5zC3nyUg-KpE-9P5_5v0yUpJC2xZY',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'DWZ5ND8GWYA1P2RPhubQNem_U8I1lepReFjGfGcts6Y',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'QfStShiNMXetXtP7GkAzd4nyr7ygA89OYWkoeQneuBA',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'ZXPFDg9Q1wT4eNS5K4FJkYkOuAz7y7Coc-RV-Z4W-hw',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'cCXmr_sH8MTWvPIoCbmwXRK_UGkdveA9eXC-msAps3w',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'ix6-swXy7lMlWCgUtMCM_xJE6RInBU4jVlXABa_2keM',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'i2r_SXOOa-DTyfOyZiwZ9qKBlr9SwwaRl3JjIqZ3ly8',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: '8ZiQ7rZxEUwFBSgpB2FbdbY-vo1_2BnSKn9tkvb2Jt4',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: '2oyPb54HqjKjhkG_CFIM70z0uuI2OlauaDjKnUbPtPs',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'DXoqcbQtlDcgXKgrStkvyOg26F9CDRQfQLVhoBIjyK8',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'PP0RmnozNgvgcFt6FfuUWnmQvJaQqppHk9O_d3syVAY',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'bjFcLa_1eIoflqw6TPl0EFKtRNwlm6LwQrnHZrCCOGU',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'v0rxO6xOZ1f73QB_ZEdbAcAhQa6_FJtvOSA9bp7jvnY',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'a9v-UVYmfhq-lWeqjarU4TnswXUeUVXJEUG74ncHhA4',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'uIcoAsg4f4aXQpGKMPP_SFTnGcj-ivLXmlz3-7K-9GE',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'vK_eoE3aLHqEwGckuYcPow47WLMujiYafcDf52z3w7I',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'RFYmELUXOCgZn2UfpJtW_YrAJ__2c7lXdU21PpsmDhE',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'xrrcaq6W2EAlhVtEEaX9JdeXx98R2ncht-ODMkM7eaI',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'SY5U7kdpGRs7YBOXrie3FmpkCaHo2dFxqSbgF1Vc33U',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'aRIDtpHcdzMZ8SsgysthayhkUJ3O1MejQKqAiJg5loo',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: '5H8u1O50et2q5jDCK5egtFLWX-MoPGpjqjyp7GrXLZI',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'rSMg1gDQQgppeZJQiluEnoCgiTq_yEilmuG5pmvanGg',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'YmBfmlJtCf2tZrfUs1FavSwxLHsGvHfQp0LaH0ByC_U',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'spqm0zhm2Ol221ERdwllAbFMpNCtS0ggma2A_dk9_0U',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'SooA6QNmbqv47my8x4gQ4losZv1J1xERX4oA024BPzE',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'm0nzx_PzFMfsRVIFFcU42jiEI433gZHwc7dX8aVJ2bY',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'pNXFKfbsRpxsypP9ldNNG0VlLiJVKVtPl0wY5PYFB40',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: '4B3K6d1zhEh9SH2L09fA5AluBk5DaY9t-v7PpRIuNpI',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'XXBcgeFK7dFU52WXgu5TVXrt6L0DUIUISsxWftQYg8k',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'ugxGQTpnIaQEyrCHom3YScSY3NNdUxnnFvvrWtiOKt4',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'WhqMaW2raoAq61Ad7v05s887adhhKwTKzp8kxFBV56M',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'YVi6MfIBp0iFEUPvwwB3prYyY2_jHaEXZQ1X-1CjG5M',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'UcHDGe3P2uljS--S5yv9JtQRrToF0guJUgYb4kuBYKw',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'Hx4qq3UNsEf94ABU4aHQOghjGeBx84jlQdAlF7zoBG4',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'pURcNftOLWlgBYV2-KFN9Kw4L9eSvs1EOZwseclaNcw',
		},
		{
			cu: 'cu146.ao-testnet.xyz',
			id: 'bmMKKSPWMxdlBP-yjAUPrzv-_cW1W_sVW1cxsFMgztI',
		},
	],
	'cu-147-zone': [
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'I8jyDfQWc-EY8UVzHGEEFEBOzghNzAgd1pQlidwsEmc',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'adDhmxIz7kXvdgpanJ3iuG-SexBIdJUnfkiP68PT2PM',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'BoQ70-WX7raBcHUYo3hNaq982MgICZ2rfXF87eq44DI',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'QR3sR5MoXQoJtg7ZipfMvhmxgo0mGtCJwDyRhmHxyYM',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'fRJzufkCkA9cHqAHqIyu_vrMOXxFkcNP-SjrFPCUoYM',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'swQjU3Y5iVDTwMLhlji5OfR2akphSGjdAgZTkALyOWQ',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'GahdXqMpkFIYcmYnhWz5bO7947geNs_CcoES0PkY7Jo',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'pfOl-QfM6iQ_dWXMM02Kl1wL3yl_Pv7OCRIaUPlZlr8',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'y-vyPDeag7Wbxb9a6Cc9mOxYx4PrMNqnI8p_wQtbcbM',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'ZKbOuYH1Vn0AxKMZ211K6g0wLBRLLw52DPY1HCSDE_s',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'Sd70JUn8LfiwWwqPsn-31fClbLgAz2ex_V4I4pzm_v0',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'u7X3NgPgbFA_w4jjk1h5G1O8Ky7crcvqIzqhYdD6v0Y',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'X1ihEFtIFVipSzetYbIoDQgVkNFQ1i6ZkGk0yQMhv08',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: '_sWN_I5AjSHn-jvdmB4jsbtcFi9xHkToAEoPe72bO_A',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'kn0LQA87szOvbBHzLVyRwdtJK4wzlzo1cTty6QI4YNA',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'M__TfvT2QoQ8CeOFVn941lCt7HdUHD_W1g67sxbv8h8',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'nV_qjkMyEFAzaTN2Y_-SOjLdzURkDtQXE6r0rVw_MyY',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'GEUhpKFS4WPNhERRntvXrwTneopirQUHwduK4GQW8wM',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'Q9mnzqVuiEsCPcR_NrmqHnK5Foz4DnCFcVsB9nHh9yk',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'QwlL2vMQjqkVSn2MwWDkASIBYS-9lYUl2VKGeXbGegI',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'SdvzQZgcKB_dF0cm4ZG19eKuk_4EYEgU7xOC8kbp_JY',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'pmKDlGIoblexega1WxY-6_UMFZXPfrrcRA-eGCDofKg',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: '2qGLcrshZdb7hTpG9zWdp5SdCz3i1DitHjC-lDkdztw',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'lhtabFL_kJUN73y_xEfbdEoTvsFgsqA59a59_Tb3scU',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'fzok3H0qyn1dX2APUEn-IBBc5RXBc5WIq69uGRUXWgc',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'puS1qkqbtLfL-_UH-iKHxqNsBSP9r16olEwUfOyYDNI',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'SZywdYAI1v9-QoTyJ8JkZVXZThQSapy3lKXrZOcclMI',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: '7AsJLMAZx4JvROF41Y9w3_umHdsFZnPbTVIO5i4W3xs',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'q1Ja2rlEZxUXM-44suP9ao7CaH3bHymtUuUGPjBVVLE',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'IjkOY0rp0Koe-ukgSL1AqrrmmGCcS8y7UL-S5XtzFIM',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'ZrTdvdZ5gCViZftXTa0aGlKK2Vzv6KTsUXB_V7re1RQ',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: '88TafKJN-BTI4tgE4zFhHUhPO04WORizPihi9S803Ko',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'eSxiIsfbyIrvaUk7FWuUTVSfaHxqw5dPKMjdc0SGyrA',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'JT3AKoFxeYrk2gdWBnwK9S5Oafd6gNtX0YfuJsCCOnw',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'EX_tUx1YrLVVUT1MSy-i3Q8tmOC6PPezS78ENIKp9Ls',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'II3d9tr5dTlQ3Pmz1FHnqsmLPg_t1nfiqN8pXl09es4',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'khbjB9_VX2gV1AlSqytOjI6zQR-SLc40TUZsBEeyQlI',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'sX9BhCo8FU5e_wDJlCzLSVAkT_4LHSoNM2vvVtvh0Jk',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: '2M3Sr0Vv0L9vlGIlR7pGfWlpnES54B2D7QN_EBvCdvI',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'hCIYxXXnSTrBpsoI6Cexxu4emRDJ_Ut2WkAOsK5OC34',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'KZA_gXo0mbMOSy76aE-FMQTyX2b3CrwGkroXIR3er98',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: '0azvtxkWdnt0Cg9HtL3RmsJxD4EAyQ7MTH5uzp-Lwr8',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: '2IoCofnOc6ln7U3gj2jzevVqpltz5UaytPRRTPsBKiM',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'fcmuDxbYdWLtrZ0Mo-MdiZgY0YCTG0VHUrE4QkL7n3I',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: '6FV1u3iG71FeKBbPRuuw0YPUnUT-hxAiBCHJ91P13vA',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'O2xD3cvNwIh2TkZDAykEM8fcJhnpY46neXNi5tCHYSU',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'Za0gpta3hY8whWQIP84reaD5lW935cjB1Dr06AL_UgA',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'alSjjX43lX3ch02e33A_0euekzpnHZn0T2yUq783qtQ',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'HCbtFglqHBKWM-Sbc5zVVUJlSHggGDtL4JkE61YsQs0',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: '2RkpR3NYWbpZg3jrOyZiRaFXKVOGaflX3RX5-eaG3HM',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'PxpHqIf0RKD6elib9AC3pWx-cAamxAOE8ITA7TyMPng',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'hJKbe_ZrJagqgS2Oe4JFe3DX_ijYuW-yXfWVETjKXR8',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: '9dCCcNiRjJ9DSP_Ny4ev3MjnLLQEiMwLb_CYSiwPbqU',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'n_dynfRkuETizJDBaEQH-Znyktk3-VGwuUrAZHkHce8',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: '5G5MeylPvPn3XDDqZZuRWwXdnsnRdgy7tx3Ze9aZoWE',
		},
		{
			cu: 'cu147.ao-testnet.xyz',
			id: 'Bmz-_fOWl0aOcOXb3M1NcPjdrMO9mRj1AKL4ijYcrSs',
		},
	],
	'cu-148-zone': [
		{
			cu: 'cu148.ao-testnet.xyz',
			id: '2EZOLLUb43IGcVp73earnZv2kEhU9ay7WkwHo7jcnZc',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'CuzWFMzFDh3pxqkxQD3dzpM20j-sMm7iOuGjUERSKuQ',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'L0YiFacTWYrRq8kwqkCcG_0gltrrztE8aRpWYVYIBAs',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'HwvRECwLWDjuhaTg-RXSO9PNpr9FN9gGxIhWAdGz1D4',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: '3lcG9_bWlQVORa7oKuWDH0biKl79-d60OeAprlnX9dw',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'v45tnRf4br0zQSpF6bEmTwsVTuiRYe6K5RHt2yR16kI',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'kng8iUIisAY1nDuPIzMjTVy2HbUaSoHv0f0FxVKNMZQ',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'cz_nAt19GHp1uv_bIO4OE93t0hkY9ilJ4gmAb6vsUn8',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'P9ONlJhIIkepgAy_epwBn-vEpyq2zFbAMbPOnhszDW4',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'A6NxhTv_o2_49RytacaCiahkAs8Tx3PJJGo5J5sxu9Y',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'MMVJMqp3CGxjMp7h2qBpgRzDexhtTGcZ5md8w3JIVl4',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'LNYhDWkG0rtsMr3pYInJ4_fWjT9bIQr5WYlV4-Dk3jQ',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'i_ePlFqR9hoLenyTpiYPiGl836esIA9Wo3wYeyWH8H8',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'Q7FbHwY4nVpJG3bv8o2zHMhuCplj4VKmxF7aVmCPK5A',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'oYj9OqcP4uBNmDhgNHW0qK1dl_1t_6Sf-y6bd-tnHNU',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'E4eZWeoqy-d2yxGSBknE3GQsTVP4L95FzUZt3tdIu0w',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'RD2lEI1gw65NU3HJtdUN16_lXNUf-9Wh3aiNvx9Tc6M',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'BP-s1PBoYjtv1c1TIBftEjg_MGKU19A_Rvkm4PIWLuE',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'TETSnK6oVn8POJkJjqS6n0jOw9cVI6YAtPme_pQ5dT4',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'x5HoU1XzKBlJr99Q0OYlUmOVhxC2rKQonTMsCM6uEGE',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'CXv67JzYjx-_2_REyPGVNgBKofFYTh7h7xALYetPEYo',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'Q1ciOmlCxkVNyCUdZlLOyzdV4oceY6sVG3yNfpXnzEA',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: '9mYdqhZO-AnwKIl27GPanIMI8_3FTrY1ssXoUJc741U',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: '-_cu96aNqPrUYbiPSiNBNvBjWKe1mChtkgO5ioUZVRI',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'URMGgpzsXlDPTcjTwi8BrBJmiL0TQ5RNGPR31Kyp22M',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: '69ysoAkKDqPKLD6vLQPYwyu-LuNXrXv6_-UIyY7Y1U4',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'H-nI8L_JYUaW88SNEDdZibGS7RqHUBEEYoSBtuyBrjw',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: '71aS3NkGHwN6o20I3p6mTTOCBRt6nPkErK1p3hKkVeo',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'qDtRntsfYSRJOH9Vrnm11zSo9IoFkSD86LoU2JxkINs',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: '9lHyK98XGREYPiTdAbUUsfeFtBtGH3Gd0u-_IzeSb1E',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'tdnn30NqZvLyOMe95NudBRp2R4m03d85P9wxhiJ4M7w',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'Rtk7NaSdQYZhR3Bbi10qavXASmqUWbs3DqcV_BNpv9g',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'g0TAnW1FlzShJ3lHSCf-lpN364jqzsCytoO7vFa-EkU',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'fgdvTcvB9EPF6MWz8H97BxciOoNnk2sc_cHgONWalas',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'rQiYubuqB1ffvTJkU6mNzp-FiDNnFaForkhUqdfsrGQ',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'z51gZgkBkcghu5Aafuyk3M7xhQxGIJxQzj2Y5SDiUDY',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'iLvsYWNeVf1k_gjUQsFow9a1iP5GzCUYhOyFaJHcmL8',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'p_MrEFYYc0KmLtvhGbqSEOU96aw2OjUAgwLoQM4CA3A',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'Hoe3zvpR6PYGscOxqNxRIxpTiZ5pmPFHC3OmIFF_mtw',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'JEF9FeBAoSCP6e5PotDnK2bwAT5SzxGR1ygETa-k6OI',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'P_FwdT2ujG5dfa6ALurVpz5lzL9FonurTgOkjOPm3XI',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'HCHicD5Vwhy2aZgzYx1WG2Sgoe3Odv8tldzAEoK7mYU',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'DAVLtij3l8miSEQfpKT6pBrN8fqYzM9169V06AKtuxg',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'jUUr5SCmi2ZEwc04DSg7ifwhiduSA5GHLVfOfEh7NVs',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: '1F8XlWCiENWs-scTXgY0tlSVqrcu-mV_UoXQl3w4GSU',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'dDRkzILku_NqlH6vtWvX1ByqHfDrK669LkcdqfFzqLc',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'fv6IslnmP73Ghs0WSDzilfHnKaVy3HKMhnstoyUXVT8',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'AUhO7CAgqEj956pEcDIyz-KkbB1VaGvKn2-QpVRlwPA',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'GQi7zaZQHYDjESbaJ2UCzVi5HVlFEWX9swCZBWkc-LA',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'LBQIXhRKtMFd4WcT7ITbew38MnBsDc6e2olAfdN_1H4',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'mXi4gJbC_5zyjNhNGFrkOvFTZ52slNHiaoJiqWJZqLE',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'TAgrdP7quM--y-Aaxcx0-sFs0MjA-qTAuidsCJ2zDNY',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'E2qsBCuTMSQkKhArjEbpp0JOi6-G-g8nYdMIRIzf_Ok',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'pfzQVVdQd6WLukhHCvysDHIQ75_v6u3SuTKpTQo36OY',
		},
		{
			cu: 'cu148.ao-testnet.xyz',
			id: 'ZxGPNN8klT-a6RRcy_IcjjjXXhBtp8Eo7CgA8u9Wcq8',
		},
	],
	'cu-149-zone': [
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'IJcRBaIkOQ-PAJrqmAVXtRAPdEuOBAugpUc9eDCmdVQ',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'Jodto_82wp4KIdHXSphWi2Vgu_RB6xGs821cvTj59wU',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'DhiRvLhO9RaqrPaX5PSpfbWlaN3IAZ4EIy4r0l7ohOg',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'H9FRMv1n4YvqRz2Eb7dXB_IJzhS0jqKJWzA_kT3f4js',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'c6ntpq0ZwwlApS4qA0CI676716G3wKNRFuBTEa5Gh8Y',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'EvrQUEM1nZKW9PnH6kkjYpxnGNBLfXjhb041qIVNlDs',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'ewE6gt4TSkERcw2ANdkC1lfVFPzreuZJaIiY9GVNito',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'bkoIinVxfvUaoTTsxwONLiHixaTUbDUOHn0-Mgt1IxI',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'GN0dJhrPV9C6cy_Xdnf8zhX4NPJBqVvvv2w3ZoORJ3Q',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '6RS3-nUj-f3QYSEG4h8NafjYjzrtAJu1OTGLOSQRRkY',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '7mMaN4EFKZZdHsK_Vyy1CKPCFVCZhCpE9lIPh4pT7c4',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'vFp9319ej4p8ZkxGa-uKlPOAXEJBAz3FJO8ex47wUDU',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'N6O2v5YiQwf6fV4uNDBBHAauyhx5o9Pr_5lFo9NcPW8',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '11g5YwINNF7xG_NBsrqmL1CrEaAL_d1LZpDkv0O_GrU',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '5596cZBgInnDNMDRaM5ETM_SoUBzwVZaMM6MuMokpwA',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'nGmvOj3qF1f-3C2uHVKyMnjw4cAkymscAz0RnXya5VI',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'vBqciHCgfaRYzbc91WCcobl1pcF-DWqXcmzG381SFMg',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '_vpwSrLV_cPBAKGi2WJ_dDoSqQwOdjOuhUxSKFUQ0kM',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '-5rn1BUsDsjj6aznjxI61nCcD57UTL1_TpzjV-XzDr8',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'Wh0X-o0LE7QndzrgX9ruNR_63lgTZbdP02PGo93JICM',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'X157LyO86oXDOMGOGmWXqmtZUdM7iDh-oYjQQQCZbIQ',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'qX8rYeCh-gyNsXnnkTO4NXhndLiYnEFw4pZrWlug6bM',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'pZvYU9qT0fAYJ1PT9c394pf1rv1KE1NJuc-VzKJ_OUo',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '6z3HBea_OF3FWdeLEqp_jQ0rHGZyYG8bU3Q6lXJqkFg',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'pwScp85is_53TaFpq_XfkNWN6C1uPUrBalzT5zQo2ng',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'UliBkD4K7ecCpxvic0Nx4RHbZGRnms7eS2hmbtVKajE',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'Ja8Std8OR05AdSTYiu5uDLMclRdAvgpo0T9ix4DBjzw',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '-xGha8RkCBNHhMhS4T3ouNAkpLqVu4yXnrfS1RAFEKw',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'RTAM4DvthHF6_VYDReJdc_e3pSSYJVbXrhYgOS4Kk4U',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'ZC3ruDv77d2JrFZrddyk369dLKuxEinKKO9FS3owQuI',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'RvsM82JVdctX7unHiZhGTtij62fht-TLA0bP8IyhhLk',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'xk-mXpRZcMVRzk-DwSWPuSiweR6q8aEtUrr0EvvxsVE',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'UYzZzN5LC-qqe5ZVWyequRF7lZuxPVy6GFnBkdJ-8DU',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'JtVNJQcab_lvHaq7n6zzyYm4RHCGNQPj6Y6f_ywa2K0',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'F6TR-i4I77MEYgtHqMYw7GSM68KQVWcAJ1qvdLYR8cw',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'nazusgK_1B9AvTiCwTJWL_BvE_hu30aGXL02DD-FM6s',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'y6qQjY8k8ntbdJZdLFBebigThoA9U_s_o1rJ6xZ6VWI',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'lKavJLw6SbCjn6fASoJg6pWPcD7I43yAdPMaRUYaDHE',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'XzZmUkR5gxhAtj5-ZQx43uYmNsGMAiNQa7u3gvZTjrY',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '5cMrbpwPsCCbsh2SfIgbmobk_d-TDTrzkASJOpy5aSI',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '0S-IMdK3dij8AK0K68tzkisr4VwbzezWhtJG8n3lO18',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '0n-5_nuH5zmpP824_8JYQM7QzzTqBLYgR4GA7vJUHkU',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'rlGzZun6MKsu9zqOQAbMkhLcyd_dcBExBHlBGqt5sBk',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '-dXQf31F3x7N1DNYOebF3qSdNWUOVNbzrxhgd2Q_T_I',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'PV2B65EEVNPjy1s91XwjYt4EwSFUMWV8VmrN4ZpHroQ',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '7zIARiX0crGk2sa99U3lkzT7P8JeNhkJCdvg1M0Pyqo',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'h1MNtNe--qj8ceaXozuyy6RIhDhKVV7S5_hQicLaHnQ',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'hX8BOPS3WcrmBiCfAQgIKaSI3Cr6WZhKBRVygFnzyJE',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'd0uvflQ8-7E1EI9AJrtBXV7G687C_YRythhB8BqdZfg',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '_7Y0q20e6FMJKxpd7VCnsWeWapyo3bxIA3yyVC7PotE',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'eZVRjY1mh6nbPRewnvIr1HjgnmaRjrdTo5-mP5emvXM',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'PnjReVIwDJnVslHRWijQg7rexiI79VSEqWKN12Nb4_E',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: '8ZV1uQHzLCbT78vQsGrVQhrZL-NUvTUxvb6e2MdPF48',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'QuknMpCnRgQE9wSv23OhogeLIpVsHgLiOfuzKPNgEfE',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'xDyK3Z-neX9gWhSO8wzWAxDFusaPY9m-brglcQJGvr8',
		},
		{
			cu: 'cu149.ao-testnet.xyz',
			id: 'jE5Bs0TCHgQDX-wHZ_TIfEdQQN1DmFO3GVwYoXuO3rc',
		},
	],
	'cu-150-zone': [
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'O7iB2r6Uxnwb3eAgBBuWdST_ZP3DR4kyVppT7rpIptE',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'wCVON3V4ZO9ebglWgXGELYZKsKl27gTh0WOmilndxek',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'mBpgmRoAayIbgd6OoAx51_tqvi7iPcExDBcusjp-L-8',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: '6l4TG_7JJRbMwuuaGKGFp9PDyJq3koLPlL97eJZdyNQ',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'QjXZG-2SbEFXq4CrJfGQIs4PqRhx8e5JdfxbZVbwUBM',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: '5C0469mEVILskuXtRvSqaTdQtnpvoQsuJaYnXXNAH5s',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'XCfUUaTNh8E_B7nf-YK35OC6f06SJ_air4aNbLzPugo',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'XTdZaQ3pRGfGWk4CNuOITV2_-NoN-fN6TOkwF9ectxw',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: '1QHKpw9SNmWz236Ne46QZXsC4bJrpW6806vZ8BsIJWo',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: '6-GzrgZwvY-HUtP9m8wgQbGr_0QWCahJzT-h0tOcw4Q',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'Zl94DqiEkCYFWD2-yjIg3Wh6cTH6pqbqCpKR7sYK5-o',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: '0Zha4rMJw3rDZRVG5nIZMUp2v-UW14ksdbxZRrFz6k8',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: '6_zKh1EnRguyzWEMuRuxvWoXl5Z60ZLny9vFCT0LyWA',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'ezoIsa1twsq7Lzx3xs0hfP-w05ZvE9mSLo0DAMunyUU',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'XL7IwX58f7uWuGDoXYXCP3T_Gtk1RLg_KccpXX0T60s',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: '7zbGziW3Qe6vR7QCa2BuEc_tWNLWNxKvxUfsoeZN2EE',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'ds38iuGb7iIQvsRSUxAQFuVbHYkZ7NbRU-EUNiLTJsU',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'nZ6IXVafktrgDdr8-3aXjA9M4uhI-1l8ObcCzW82G2I',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'HjA5Rt3svlxiGNm7EQIQ40i7Tj7JZ8xc4TXBvsfDHm4',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'wJNST5ysJJx9HlJH_4F8rhMZIyuqzfmHD9Oh2zT4YzM',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'zRapVKfle4e6_ZPsSh1gbnuQTB0QgXExVfGP_9BhfNk',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'Ff7DQ-Eqm68D7229SKz5PwOIFEFqe0i2uUWEj1NfWV4',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'n-f116AfCSv9gg6mkEcAu_X8Ba8QvXCDrlgyjbmHPJ8',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'vFJAcqZK6NYlEkZWD695oZQQyc22upoiJ0SyoYcl6M4',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'tNzklxBflnytLd7A7OwDF1axXUA2wicqwTMHSmTU1Tg',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'vjB_zmwii-QyI0V8n6oD5z53q2RK-ldInwUBEuKEmDY',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'b32k71DrPk-PXgWJ8t6oVzEF2FgxcauTNklwX_5RLyU',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'kzW6p6m5M9DWAkH0vJziVpbIaiAPmW-0hfh1pnFO0-s',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'kBX9OrYVgllHPL3TO8pFOOdGqnabd8h5eTYck7E466o',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'kvOPhBhT7aE_UbSxFcCeD-SiCfcoePl9uMJfg4RIAwI',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: '38vPxAZMuDeVP2KotBBvmiXM94AT5p557zcLlp4fris',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'nrLntFeLwSu6633m04sZRYK08eZP2E9prb-wopVXBIo',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'WCK0klaSaB7XATWS75iYRFNiX1mQEa3-zcg5SnTglGw',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'jUn8j7NdNlOZsAUWsY9WzfxDGuYD1hNz9Li3L5XGrL0',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: '4wxYlH9niNqWKf-oD_5U8RVNlJ_Tr0AjIwIibp6qku8',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'znxSnadgAyJmlWDr9aE4Kz8546ieNypAfzOM8_PfMag',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'dfiDyeNTya54NjyyqKeOX5tbhkpbkApi8UntlGjznZ4',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: '7EahyRal2-OUaFoi3rj22wDOmzQM52lDjsWKzrEu-ms',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'bKfD8rI0R_WM4o7d7jatEIEv_FdOb6SQrLQ-iOs8rns',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'FuFRNWNHyxx0H_cUbmxs-qAnTAB7VJH-kMwp7eHyTkU',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'Oec--ie-HzLyizzZ5zU8qw_1OKNk2GwKc6jaS-sprjk',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'sz4wtwMYN0bpfJys315R9uyZZhivkI-oISGRGuul3yM',
		},
		{
			cu: 'cu150.ao-testnet.xyz',
			id: 'Gfb2lAhuQckhwqKfEQPMbUSbVFKv7lcieP8VDDkF3S0',
		},
	],
	'cu-927-zone': [
		{
			cu: 'cu927.ao-testnet.xyz',
			id: 'xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10',
		},
	],
	'cu-1984-zone': [
		{
			cu: 'cu1984.ao-testnet.xyz',
			id: '02lLNAVrqmPi8YusKM0fYd8zfknhBCiZw4nzjHJg0Jk',
		},
	],
	'cu-2746-zone': [
		{
			cu: 'cu2746.ao-testnet.xyz',
			id: 'aYrCboXVSl1AXL9gPFe3tfRxRf0ZmkOXH65mKT0HHZw',
		},
		{
			cu: 'cu2746.ao-testnet.xyz',
			id: 'GaQrvEMKBpkjofgnBi_B3IgIDmY_XYelVLB6GcRGrHc',
		},
		{
			cu: 'cu2746.ao-testnet.xyz',
			id: 'agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA',
		},
		{
			cu: 'cu2746.ao-testnet.xyz',
			id: 'qNvAoz0TgcH7DMg8BCVn8jF32QH5L6T29VjHxhHqqGE',
		},
	],
	'cu-2803-zone': [
		{
			cu: 'cu2803.ao-testnet.xyz',
			id: 'cfJIBVw4ojWnjiQJ1Z6CRU56YnYJPZpaMgAIs-BSi68',
		},
		{
			cu: 'cu2803.ao-testnet.xyz',
			id: 'B6qAwHi2OjZmyFCEU8hV6FZDSHbAOz8r0yy-fBbuTus',
		},
		{
			cu: 'cu2803.ao-testnet.xyz',
			id: '3biQvRjIp_9Qz1L9D3SJ9laK4akCkP-8bvAo3pQ6jVI',
		},
		{
			cu: 'cu2803.ao-testnet.xyz',
			id: '26BXDOZNPRhRwc7QFymTF5IJX-mBO2E8T8PN1Yj4olg',
		},
	],
	'cu-2805-zone': [
		{
			cu: 'cu2805.ao-testnet.xyz',
			id: 'NG-0lVX882MG5nhARrSzyprEK6ejonHpdUmaaMPsHE8',
		},
	],
	'cu-2807-zone': [
		{
			cu: 'cu2807.ao-testnet.xyz',
			id: 'V-aAEX7HVu8AMOSqIhAR6myLrCZh2DOhX12OSYv5ypc',
		},
	],
	'cu-2808-zone': [
		{
			cu: 'cu2808.ao-testnet.xyz',
			id: '3XBGLrygs11K63F_7mldWz4veNx6Llg6hI2yZs8LKHo',
		},
		{
			cu: 'cu2808.ao-testnet.xyz',
			id: '9eM72ObMJM6o3WHi6nTldwhHsCXSKgzz1hv-FpURZB4',
		},
		{
			cu: 'cu2808.ao-testnet.xyz',
			id: '4MYqWdc4_TcvVU0zoNMzuIZkUnazrSf0d-FsVjEPtSU',
		},
		{
			cu: 'cu2808.ao-testnet.xyz',
			id: 'O2mmX6O7ZNUnRfE8pYtzTT2uH55dXrvIR8YeaOEsp9I',
		},
	],
	'cu-3000-zone': [
		{
			cu: 'cu3000.ao-testnet.xyz',
			id: '5d91yO7AQxeHr3XNWIomRsfqyhYbeKPG2awuZd-EyH4',
		},
	],
	'cu-3001-zone': [
		{
			cu: 'cu3001.ao-testnet.xyz',
			id: '7zH9dlMNoxprab9loshv3Y7WG45DOny_Vrq9KrXObdQ',
		},
		{
			cu: 'cu3001.ao-testnet.xyz',
			id: '_HbnZH5blAZH0CNT1k_dpRrGXWCzBg34hjMUkoDrXr0',
		},
		{
			cu: 'cu3001.ao-testnet.xyz',
			id: 'IAcoo9WrT3CF-rhAxoYd0OFrzAgCLz3kWETQ4QdDLpw',
		},
		{
			cu: 'cu3001.ao-testnet.xyz',
			id: 'qhMOXu9ANdOmOE38fHC3PnJuRsAQ6JzGFNq09oBSmpM',
		},
	],
	'cu-3002-zone': [
		{
			cu: 'cu3002.ao-testnet.xyz',
			id: 'xRt-J-awbZqQ7IgzrM5yxRCS9ub0oxnyjyfmRuVU_hg',
		},
	],
	'cu-3009-zone': [
		{
			cu: 'cu3009.ao-testnet.xyz',
			id: '-JSkaguBZozSKGQGuy2is-uXGkouWXJeLc5XJ7yxnqI',
		},
		{
			cu: 'cu3009.ao-testnet.xyz',
			id: 'PDkk34oMV_Q8YyFqNZOb06a1zCL6BjHUeoPbYjQ7gbc',
		},
		{
			cu: 'cu3009.ao-testnet.xyz',
			id: 'mrowQH8BluDpGjEJ5iFkXfDmQee4nY1zlyqxeM545ac',
		},
		{
			cu: 'cu3009.ao-testnet.xyz',
			id: 'XPV4DRcRZy1DtCHkoXP816VwR5-Q2UnQk49HwKfUqK4',
		},
		{
			cu: 'cu3009.ao-testnet.xyz',
			id: 'c2bsQI_7vyINVIBRD4lQh0OAYcgOjmeDt1p-6EAyKGE',
		},
	],
	'cu-4000-zone': [
		{
			cu: 'cu4000.ao-testnet.xyz',
			id: '7enZBOhWsyU3A5oCt8HtMNNPHSxXYJVTlOGOetR9IDw',
		},
	],
	'cu-4001-zone': [
		{
			cu: 'cu4001.ao-testnet.xyz',
			id: '_laMMu5weQgrtDhKjd4dIOZDej7XKwXcaHJmgOcPvK4',
		},
	],
	'cu-4355-zone': [
		{
			cu: 'cu4355.ao-testnet.xyz',
			id: 'yKVS1tYE3MajUpZqEIORmW1J8HTke-6o6o6tnlkFOZQ',
		},
	],
	'cu-4442-zone': [
		{
			cu: 'cu4442.ao-testnet.xyz',
			id: 'm3PaWzK4PTG9lAaqYQPaPdOcXdO8hYqi5Fe9NWqXd0w',
		},
	],
	'cu-5000-zone': [
		{
			cu: 'cu5000.ao-testnet.xyz',
			id: 'lA4WPP5v9iUowzLJtCjZsSH_m6WV2FUbGlPSlG7KbnM',
		},
	],
	'cu-5001-zone': [
		{
			cu: 'cu5001.ao-testnet.xyz',
			id: 'T6fFVsIVrYlaqK_Y5OhE8wVxgBZFLd8ZGnR9CHtsOkA',
		},
	],
	'cu-5767-zone': [
		{
			cu: 'cu5767.ao-testnet.xyz',
			id: 'kPjfXLFyjJogxGRRRe2ErdYNiexolpHpK6wGkz-UPVA',
		},
		{
			cu: 'cu5767.ao-testnet.xyz',
			id: '9a_YP6M7iN7b6QUoSvpoV3oe3CqxosyuJnraCucy5ss',
		},
		{
			cu: 'cu5767.ao-testnet.xyz',
			id: 'QIFgbqEmk5MyJy01wuINfcRP_erGNNbhqHRkAQjxKgg',
		},
		{
			cu: 'cu5767.ao-testnet.xyz',
			id: '2dFSGGlc5xJb0sWinAnEFHM-62tQEbhDzi1v5ldWX5k',
		},
	],
	'cu-6464-zone': [
		{
			cu: 'cu6464.ao-testnet.xyz',
			id: 'DM3FoZUq_yebASPhgd8pEIRIzDW6muXEhxz5-JwbZwo',
		},
	],
	'cu-6465-zone': [
		{
			cu: 'cu6465.ao-testnet.xyz',
			id: '7_psKu3QHwzc2PFCJk2lEwyitLJbz6Vj7hOcltOulj4',
		},
		{
			cu: 'cu6465.ao-testnet.xyz',
			id: 'hqdL4AZaFZ0huQHbAsYxdTwG6vpibK7ALWKNzmWaD4Q',
		},
	],
	'cu-6466-zone': [
		{
			cu: 'cu6466.ao-testnet.xyz',
			id: 'SNy4m-DrqxWl01YqGM4sxI8qCni-58re8uuJLvZPypY',
		},
	],
	'cu-7382-zone': [
		{
			cu: 'cu7382.ao-testnet.xyz',
			id: 'gFFFqz2n2hnmx1v7uX2Ri0UsVTX0ntmXEufnCOh91CE',
		},
	],
	'cu-7827-zone': [
		{
			cu: 'cu7827.ao-testnet.xyz',
			id: 'IkLIz2pL-RN7nFhpbmYHUB6PiQpudeA2vysPIyueB2g',
		},
	],
	'cu-8281-zone': [
		{
			cu: 'cu8281.ao-testnet.xyz',
			id: 't-MtF_61mTUNT4lPBCJDB5wAV9umx_NvsJ0TbPY2tCI',
		},
	],
	'cu-9000-zone': [
		{
			cu: 'cu9000.ao-testnet.xyz',
			id: 'FRF1k0BSv0gRzNA2n-95_Fpz9gADq9BGi5PyXKFp6r8',
		},
	],
	'cu-9001-zone': [
		{
			cu: 'cu9001.ao-testnet.xyz',
			id: 'QvpGcggxE1EH0xUzL5IEFjkQd1Hdp1FrehGKIiyLczk',
		},
	],
	'cu-9002-zone': [
		{
			cu: 'cu9002.ao-testnet.xyz',
			id: 'O8mgmJoXJiibdXRdu8Ndze6BE5rYQ5bWW3KQuKzlRfU',
		},
	],
	'cu-9003-zone': [
		{
			cu: 'cu9003.ao-testnet.xyz',
			id: 'q20BMW2EtOR69TLcm2CuOoXbS48Mer0COyLJw6tsUaU',
		},
	],
	'cu-12001-zone': [
		{
			cu: 'cu12001.ao-testnet.xyz',
			id: 'wTIpisZKMtG5WsLFqQBdoJEObyyeoJQmwWFm1h462D4',
		},
		{
			cu: 'cu12001.ao-testnet.xyz',
			id: 'T2r71KaJH15fpiyGD_RHsWqrIS1ccO7DZ7cm9g4HLRw',
		},
		{
			cu: 'cu12001.ao-testnet.xyz',
			id: 'V7yzKBtzmY_MacDF-czrb1RY06xfidcGVrOjnhthMWM',
		},
	],
	'cu-12002-zone': [
		{
			cu: 'cu12002.ao-testnet.xyz',
			id: 'Meb6GwY5I9QN77F0c5Ku2GpCFxtYyG1mfJus2GWYtII',
		},
	],
	'cu-13000-zone': [
		{
			cu: 'cu13000.ao-testnet.xyz',
			id: 'oAEA9jumIuH7imARCzTXfZNcT9GRG_lNLIbdLNnRsy4',
		},
		{
			cu: 'cu13000.ao-testnet.xyz',
			id: 'fbz2ZMVuFMFAg3kk-6d5eLaltWjxB_Bz_fKnIV7ftUE',
		},
		{
			cu: 'cu13000.ao-testnet.xyz',
			id: 'Jwsx_-ameSFkPOrRIy1oCIT7G3HpBKdbN4sHcgrJTZs',
		},
	],
	'cu-28862-zone': [
		{
			cu: 'cu28862.ao-testnet.xyz',
			id: 'LzT6n3Ey6qGLm5TEX25-fB15dlnjBEJe8ti2QyQJt1A',
		},
		{
			cu: 'cu28862.ao-testnet.xyz',
			id: 'MysFttDUI1YJKcFwYIyqVWGfFGnetcCp_5TGjdhVgS4',
		},
	],
	'cu-44992-zone': [
		{
			cu: 'cu44992.ao-testnet.xyz',
			id: 'LaC2VtxqGekpRPuJh-TkI_ByAqCS2_KB3YuhMJ5yBtc',
		},
	],
	'cu-63633-zone': [
		{
			cu: 'cu63633.ao-testnet.xyz',
			id: 'qQGJC-a4VuGEajyY_cI5wV6xPo04cAEVTl_rxDxZpmg',
		},
	],
	'cu-390224-zone': [
		{
			cu: 'cu390224.ao-testnet.xyz',
			id: 'ZTTO02BL2P-lseTLUgiIPD9d0CF1sc4LbMA2AQ7e9jo',
		},
	],
	'cu-746696-zone': [
		{
			cu: 'cu746696.ao-testnet.xyz',
			id: '7Hr5OXOxm1qt0M_z-FjilcySeH1ZJO59t6vN4cbC0Lo',
		},
	],
	'cu-3006-zone': [
		{
			cu: 'cu3006.ao-testnet.xyz',
			id: 'Hr70UBEddYUAbzRusskD_EAl1Y-mr2hofisckxDEHUg',
		},
	],
	'cu-3008-zone': [
		{
			cu: 'cu3008.ao-testnet.xyz',
			id: 'vJY-ed1Aoa0pGgQ30BcpO9ehGBu1PfNHUlwV9W8_n5A',
		},
		{
			cu: 'cu3008.ao-testnet.xyz',
			id: '7j3jUyFpTuepg_uu_sJnwLE6KiTVuA9cLrkfOp2MFlo',
		},
		{
			cu: 'cu3008.ao-testnet.xyz',
			id: 'y9NnhY2RtCz0JP7LMJM8lIG2yGpZDAg0FUMYwDK_0Pg',
		},
	],
	rest: [
		{
			cu: 'cu2804.ao-testnet.xyz',
			id: 'M14d90SwY1pLZk8zq4OJxb5gFW-iaSMVNxZX2Lr02eI',
		},
		{
			cu: 'cu2804.ao-testnet.xyz',
			id: '9JgTfmz0d32tRSp4Z5ZNQygAPoDjWfEvdiWRsx4ECWU',
		},
		{
			cu: 'cu2800.ao-testnet.xyz',
			id: 'P-yJz5nLFrXGpqlXs4IEP6VK7u-a65wHOQ6ReIUUoj0',
		},
		{
			cu: 'cu2801.ao-testnet.xyz',
			id: '3XBGLrygs11K63F_7mldWz4veNx6Llg6hI2yZs8LKHo',
		},
		{
			cu: 'cu2800.ao-testnet.xyz',
			id: 'lmaw9BhyycEIyxWhr0kF_tTcfoSoduDX8fChpHn2eQM',
		},
		{
			cu: 'cu2804.ao-testnet.xyz',
			id: '8rbAftv7RaPxFjFk5FGUVAVCSjGQB4JHDcb9P9wCVhQ',
		},
		{
			cu: 'cu2801.ao-testnet.xyz',
			id: 'fbvxPHsjxkr0NxsY2A2ut1xOtvJObdYe-aClgnM1BKE',
		},
		{
			cu: 'cu2801.ao-testnet.xyz',
			id: 'lmgwGpg7VxnxcEzs8O63XUAcZJ_IM1g4tOvODIXVS8Y',
		},
		{
			cu: 'cu2801.ao-testnet.xyz',
			id: 'VZ9TtfKvRCnVNd2upLMwAU2fgdMkUi_EfMw5cb2HhGI',
		},
		{
			cu: 'cu2801.ao-testnet.xyz',
			id: 'zi8Qa0Mjhj2HRMQuT8bykO7vJ5iPf7DEWrPQfUJPo_8',
		},
		{
			cu: 'cu2800.ao-testnet.xyz',
			id: 'Bv5mfnx5Ln2BU60inXPnMOGMwecJXadV4oqw7iwjzSk',
		},
		{
			cu: 'cu2800.ao-testnet.xyz',
			id: 'jxiKuu_21_KjNga8KxH1h8fJeoCl9DzcEjGBiKN66DY',
		},
		{
			cu: 'cu2804.ao-testnet.xyz',
			id: 'Lrvf4KCAcBzxLAQo1GI6XeiZpoH8hw-bMoeqYKdS2Fc',
		},
		{
			cu: 'cu2802.ao-testnet.xyz',
			id: 'TMx_tsL0Z2VlV_YibkhxT9LRwx-ojJUZVAFZqN9tq50',
		},
		{
			cu: 'cu2804.ao-testnet.xyz',
			id: 'zdEJQ8FLgwzzOXfZqO27A3Evf0gARZzcdtRrPk2z5RE',
		},
		{
			cu: 'cu2801.ao-testnet.xyz',
			id: 'H0iGy5TgV_7ckTPB1COxwtOz2muCJqiXz_p_W0P0xN8',
		},
		{
			cu: 'cu2801.ao-testnet.xyz',
			id: '50U3BcLrRF2Bq51eeJdVdoMzrQMgjCeVai7LWY4Wm_s',
		},
		{
			cu: 'cu2800.ao-testnet.xyz',
			id: 'PIonMxhlDl2RpxkB4f8OIZjmLho7j09ejRw9U_5Ru7M',
		},
		{
			cu: 'cu2801.ao-testnet.xyz',
			id: 'ju7evX0oEl4X1W7-3gxsq4uMdjUOHXYMUp_VvWgw90k',
		},
		{
			cu: 'cu2801.ao-testnet.xyz',
			id: 'SdykGZN16NdQrbPyIJSipet6_c0pIjFFIRDXkJkZFK8',
		},
		{
			cu: 'cu2800.ao-testnet.xyz',
			id: '0tKLGWkHIF_5DHvm-osPGNAtJGrHXTY1NVZpjhiCPSQ',
		},
		{
			cu: 'cu2800.ao-testnet.xyz',
			id: 'atlyT9ph8ex_TxDDkQ2fdbhVT62sLw6boJPdEr7UqJE',
		},
		{
			cu: 'cu2801.ao-testnet.xyz',
			id: 'ZPtXysH_xT7NZAdcifpvNg7cbcPnnFXBFhNQRO2jLVU',
		},
		{
			cu: 'cu2804.ao-testnet.xyz',
			id: 'AaijM5dtqNzldluY8gKk7O4zdp5UPv3u0cUEowga5ZI',
		},
		{
			cu: 'cu2800.ao-testnet.xyz',
			id: 'wvrRUDLrXmzeoIOk4vqOdjIMWG6NddkGG_GxoY6HHKg',
		},
		{
			cu: 'cu2800.ao-testnet.xyz',
			id: 'SrTgPCj7hPZB2v5G00uEOqStzrIoS05gjfkjHr4uNs4',
		},
		{
			cu: 'cu2802.ao-testnet.xyz',
			id: '7D8XtRDk_f1h8PB1J_8m1uMmeIcXSvvUOyZ73SsKOQo',
		},
		{
			cu: 'cu2804.ao-testnet.xyz',
			id: '8goaj1vWrBhSLDhQYFuLot2yDSTNt8pPBqclKj_UpNg',
		},
		{
			cu: 'cu2810.ao-testnet.xyz',
			id: 'xZwIYa2DapmKmOpqOn9iMN0YQnYV4hgtwKadiKBpbt8',
		},
		{
			cu: 'cu2810.ao-testnet.xyz',
			id: 'zcc1dz6iNzmvi5ggTwHeh-wylShevKvdAJGLQId3TOs',
		},
		{
			cu: 'cu2810.ao-testnet.xyz',
			id: 'ci53-xYsUIK3C_knJt8ej3dl7j7Mz8v4wIsyrMdlamQ',
		},
	],
};

export default function Landing() {
	const arProvider = useArweaveProvider();
	const permawebProvider = usePermawebProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [uniqueProcessIds, setUniqueProcessIds] = React.useState<string[]>(getConfig());

	// function getConfig() {
	// 	const ids: string[] = [];
	// 	for (let i = 1; i <= 150; i++) {
	// 		const zoneKey = `cu-${i}-zone`;
	// 		if (config[zoneKey] && config[zoneKey].length > 0) {
	// 			ids.push(config[zoneKey][0].id);
	// 		}
	// 	}
	// 	return ids;
	// 	// return config.rest.map((p) => p.id)
	// }

	function getConfig() {
		const doneZoneNumbers = [
			40, 550, 626, 927, 1984, 2733, 2800, 2801, 2802, 2803, 2804, 2805, 2807, 2808, 2809, 2810, 3000, 3001, 3002, 3003, 3004, 3005, 3009, 3474, 4000,
			4001, 4355, 4442, 4743, 5000, 5001, 5767, 6000, 6200, 6363, 6464, 6465, 6466, 7382, 7827, 8281, 9000, 9001, 9002,
			9003, 12000, 12001, 12002, 13000, 28862, 44992, 63632, 63633, 84668, 390224, 442211, 746696,
		];

		const ids: string[] = [];
		for (const zoneNumber of doneZoneNumbers) {
			const zoneKey = `cu-${zoneNumber}-zone`;
			if (config[zoneKey] && config[zoneKey].length > 0) {
				ids.push(config[zoneKey][0].id);
			}
		}
		return ids;
	}

	// React.useEffect(() => {
	// 	let isCancelled = false;
	// 	const hardcodedIds = ['xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10', 'qNvAoz0TgcH7DMg8BCVn8jF32QH5L6T29VjHxhHqqGE'];
	// 	// Initialize the set with the hardcoded IDs
	// 	const uniqueSet = new Set(hardcodedIds);

	// 	const poll = async () => {
	// 		while (!isCancelled && uniqueSet.size < 10) {
	// 			try {
	// 				const response = await permawebProvider.libs.getGQLData({
	// 					tags: DEFAULT_MESSAGE_TAGS,
	// 				});
	// 				if (response.data?.length > 0) {
	// 					const fromProcesses = response.data
	// 						.map((element: GQLNodeResponseType) => getTagValue(element.node.tags, 'From-Process'))
	// 						.filter((processId) => processId !== null);
	// 					// Add each process ID to the set (hardcoded IDs will remain)
	// 					fromProcesses.forEach((processId) => uniqueSet.add(processId));
	// 					console.log(`Unique processes so far: ${uniqueSet.size}`);
	// 				}
	// 			} catch (e: any) {
	// 				console.error(e);
	// 			}
	// 			// Wait a few seconds before polling again if we haven't reached 10 unique IDs.
	// 			if (uniqueSet.size < 10) {
	// 				await new Promise((resolve) => setTimeout(resolve, 5000));
	// 			}
	// 		}
	// 		if (!isCancelled) {
	// 			// Slice to only take at most 10 items
	// 			const uniqueArr = Array.from(uniqueSet).slice(0, 10);
	// 			console.log('10 unique processes reached:', uniqueArr);
	// 			setUniqueProcessIds(uniqueArr);
	// 		}
	// 	};

	// 	poll();

	// 	return () => {
	// 		isCancelled = true;
	// 	};
	// }, [permawebProvider.libs]);

	return uniqueProcessIds.length === 0 ? (
		<Loader />
	) : (
		<S.Wrapper>
			<S.HeaderWrapper>
				<ViewHeader header={language.home} />
			</S.HeaderWrapper>
			<S.BodyWrapper>
				<S.Section>
					<S.SectionHeader>
						<p>Hot Processes</p>
					</S.SectionHeader>
					<S.ProcessReadWrapper>
						{uniqueProcessIds.map((processId) => (
							<ProcessRead key={processId} processId={processId} />
						))}
					</S.ProcessReadWrapper>
				</S.Section>
			</S.BodyWrapper>
		</S.Wrapper>
	);
}
