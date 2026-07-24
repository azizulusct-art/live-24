const fs = require('fs');

const rawM3u = `#EXTM3U

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/y8cfPVhg/20240822-225146.png",BTV
https://owrcovcrpy.gpcdn.net/bpk-tv/1725/output/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://www.jagobd.com/wp-content/uploads/2024/12/btv-news-.jpg",BTV News
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/btvbd-office-sg.stream/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/fLTBDmGm/20240822-225315.png",ATN Bangla
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/atnbd-8-org.stream/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/W4SwWtd3/20240822-225840.png",ATN News
https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/1706.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/rsDjtcFp/20240822_225424.png",Ekushe TV
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/ekusheytv-8-org.stream/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/W3WS3tVK/20240822-225402.png",Channel i
https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/1723.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/3rqnQyn0/20240822-225501.png",N TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/1716.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/fy1KcFJf/20240822_225533.png",RTV
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/rtv-sg.stream/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/QCKgdb09/20240822-230145.png",Somoy Tv
https://owrcovcrpy.gpcdn.net/bpk-tv/1713/output/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/gr9VXZTM/20240822-230259.png",Independent
https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/1704.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/G2V7K9fD/20240822-230750.png",Jamuna
https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/1701.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/Zqgx8hm1/20260430-184013.png",Channel 1
https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/1702.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://static.wikia.nocookie.net/etv-gspn-bangla/images/4/45/Star_News_Bangladesh.png",Star News
https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/0QRnM89n/20240825-071012.png",Rajdhani
http://stream.shariarsuvo.com/hls5/rajdhanicable.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/0ys4hMyd/20240822-230446.png",Channel 24
https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/1703.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/BnBz3S8W/20240822-230603.png",Ekattor HD
https://owrcovcrpy.gpcdn.net/bpk-tv/1705/output/1705.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/hvmC5cF5/20240822_230837.png",DBC News
https://owrcovcrpy.gpcdn.net/bpk-tv/1728/output/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/wThf5qQt/20240822_230921.png",News 24
https://owrcovcrpy.gpcdn.net/bpk-tv/1708/output/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/bYSFJHG9/20240822-230812.png",Deepto
https://owrcovcrpy.gpcdn.net/bpk-tv/1711/output/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/1R8bF1d6/20240822-230344.png",Maasranga
https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/1722.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/1tkB62gc/20240822-231147.png",Ekhon
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/globaltv.stream/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/76GX5wLZ/20240822-231119.png",Nexus
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/nexustv.stream/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/Xq98gLdM/20240822_231218.png",Global TV
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/Global-tv.stream/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/L6MvsdFm/20240822-231309.png",Channel S
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/channels.stream/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/PxxzBhDM/20240822-230101.png",Mohona Tv
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/mohonatv.stream/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/Tw4qxSqv/20240822-230126.png",Bijoy Tv
https://stream.ottplus.live/live/bijoy_tv_abr/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/wB9kQDTZ/20240822-225812.png",My Tv
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/mytv-up-off.stream/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/ry4QcVbh/20240822-231240.png",Green TV
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/greentv.stream/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/xdj4TwHX/20240822-230629.png",Asian
https://mtlivestream.com/hls/asian/ytlive/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/59DTqkcr/20240822-230408.png",Channel 9
https://owrcovcrpy.gpcdn.net/bpk-tv/1729/output/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/mr68ZtBn/20240822-231053.png",Movie Bangla
http://alvetv.com/moviebanglatv/8080/index.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://i.postimg.cc/9fq1Q4Hz/20240825_070144.png",Me Tv
https://iptvbd.live/metv1080/1080.m3u8

#EXTINF:-1 group-title="𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡𝐢" tvg-logo="https://asset.bioscopelive.com/uploads/images/2025/08/11/thumbnails_58ebcef1efcc65837557de15952d2643_goplay_srk_tv_landscape.jpg",SRK
https://srknowapp.ncare.live/srktvhlswodrm/srktv.stream/playlist.m3u8

#EXTINF:-1 group-title="𝗜𝘀𝗹𝗮𝗺𝗶𝗰" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",SAUDI QURAN HD
https://owrcovcrpy.gpcdn.net/bpk-tv/1713/output/index.m3u8

#EXTINF:-1 group-title="𝗜𝘀𝗹𝗮𝗺𝗶𝗰" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",Saudi Sunnah HD
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/madina.stream/playlist.m3u8

#EXTINF:-1 group-title="𝗜𝘀𝗹𝗮𝗺𝗶𝗰" tvg-logo="https://i.postimg.cc/J4nkLqHS/20260321_075216.png",Islamic TV
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/islamictvbd.stream/index.m3u8

#EXTINF:-1 group-title="𝗜𝘀𝗹𝗮𝗺𝗶𝗰" tvg-logo="https://i.postimg.cc/vTYq396x/20250529-071345.png",Peace TV Bangla
https://dzkyvlfyge.erbvr.com/PeaceTvBangla/tracks-v3a1/mono.m3u8

#EXTINF:-1 group-title="𝗜𝘀𝗹𝗮𝗺𝗶𝗰" tvg-logo="https://i.postimg.cc/DZH543FH/20250618-224047.png",Islam Bangla
https://live-islamtv-bangla.simplestreamcdn.com/live12/islamtv_bangla/bitrate1.isml/bitrate1-index.m3u8

#EXTINF:-1 group-title="𝗜𝘀𝗹𝗮𝗺𝗶𝗰" tvg-logo="https://i.postimg.cc/qqLNkFLg/20250531-104940.png",Iqra Bangla
https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI2/iqrabanglatvoffice.stream/live-orgin/iqrabanglatvoffice.stream/chunks.m3u8

#EXTINF:-1 group-title="𝗜𝘀𝗹𝗮𝗺𝗶𝗰" tvg-logo="https://i.postimg.cc/T3f1NQyV/20260524-024937.png",Quran TV
https://live.kwikmotion.com/sharjahtvquranlive/shqurantv.smil/sharjahtvquranpublish/shqurantv_source/chunks.m3u8

#EXTINF:-1 group-title="𝗜𝘀𝗹𝗮𝗺𝗶𝗰" tvg-logo="https://i.postimg.cc/gcHKBtjy/20260524-023828.png",Iqraa TV
https://playlist.fasttvcdn.com/pl/dlkqw1ftuvuuzkcb4pxdcg/Iqraafasttv1/playlist.m3u8

#EXTINF:-1 group-title="𝐊𝐢𝐝𝐬" tvg-logo="https://i.postimg.cc/G2F8757j/20240823-021053.png",Rongeen
http://103.175.73.12:8080/live/202/202_0.m3u8

#EXTINF:-1 group-title="𝐊𝐢𝐝𝐬" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",Nikki HD
https://nomawnoijl.gpcdn.net/akash/nikky/playlist.m3u8

#EXTINF:-1 group-title="𝐊𝐢𝐝𝐬" tvg-logo="https://i.postimg.cc/jSBDsbBX/20240823_021324.png",Sony YaY
https://stream.ottplus.live/live/sony_yay_abr/live/sony_yay_720/chunks.m3u8

#EXTINF:-1 group-title="𝐊𝐢𝐝𝐬" tvg-logo="https://i.postimg.cc/wTvMLMp2/20240823_021706.png",Discovery Kids
https://stream.ottplus.live/live/discovery_kids_abr/index.m3u8

#EXTINF:-1 group-title="𝐊𝐢𝐝𝐬" tvg-logo="https://i.postimg.cc/C1s5Hf5P/20240823_021444.png",Pogo
https://stream.ottplus.live/live/pogo_sd_abr/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/0ykfppN3/20240822-231405.png",Star Jalsha HD
http://tvsen7.aynascope.net/sjhdbd/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/5tjSrbLS/20240822-231445.png",Zee Bangla HD
https://stream.ottplus.bd/live/zee_bangla_abr/live/zee_bangla_720/chunks.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/3w6F5VZ5/20240822-231514.png",Colors Bangla HD
http://mag.king-4k.cc/C1645263A1D245C/1sFTVBSVCP/108781

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/J0QXn2jh/20240823_020641.png",Enter 10 Bangla
https://live-bangla.akamaized.net/liveabr/pub-iobanglakp3sff/live_720p/chunks.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/2yNd3WJ0/20240822-231606.png",Sony Aath
https://stream.ottplus.live/live/sony_aath_abr/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/y88mJsQC/20240823_020415.png",Sun Bangla
http://27.124.71.27/Sun_Bangla/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/rFcCkS5m/20240822_231714.png",Jalsha Movies HD
http://mag.king-4k.cc/C1645263A1D245C/1sFTVBSVCP/63524

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/dtBRtL99/20240822_231732.png",Zee Bangla Cinema
https://d1g8wgjurz8via.cloudfront.net/bpk-tv/ColorsHD/default/master2.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/NfgTVQw2/20240823-020726.png",Akash Bangla
https://live.thebosstv.com:30443/dwlive/AAKAASH-AATH/playlist.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/cCWYdSgj/20240823-020619.png",Khusbo Bangla
http://103.175.73.12:8080/live/375/375_0.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/Kc7BJRCy/20240823-020704.png",Sananda Tv
http://live-stream.amarbanglatv.in:8080/hls/sanandatv/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐁𝐚𝐧𝐠𝐥𝐚" tvg-logo="https://i.postimg.cc/TYCmvBR7/20240823-020800.png",Ruposhi Bangla
http://103.175.73.12:8080/live/664/664_0.m3u8

#EXTINF:-1 group-title="PROMO" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",Program Promo
https://raw.githubusercontent.com/ahan443/ahan-live/refs/heads/main/promo/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/JhR9HDw4/20240823_023056.png",& Tv
https://stream.ottplus.live/live/and_tv_hd_abr/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/XJ1SbVzN/20240823_022738.png",& Picture
https://stream.ottplus.bd/live/and_picture_hd_abr/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/x8BwX6QW/20240823_022929.png",Zee Tv
https://stream.ottplus.live/live/zee_tv_hd_abr/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/VN1c9Ztw/20240823_022636.png",Zee Cinema HD
https://stream.ottplus.live/live/zee_cinema_hd_abr/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/52SzwQF1/20251222_220548.png",Zee Bollywood
https://stream.ottplus.live/live/zee_bollywood_abr/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/vT4DKmf3/20240925_075103.png",HUM TV
https://stream.ottplus.live/live/hum_tv_abr/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/XYfRvKzz/20240823_023036.png",Sony Television
https://stream.ottplus.live/live/sony_ent_sd_abr/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/XYfRvKzz/20240823_023036.png",Sony Television HD
https://stream.ottplus.live/live/sony_ent_hd_abr/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/YS3BdNNW/20240823_022655.png",Sony Max HD
https://stream.ottplus.bd/live/max_hd_abr/live/max_hd_720/chunks.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/hP59QSrm/20240825_075205.png",Sony Max 2
https://stream.ottplus.bd/live/max_2_abr/live/max_2_720/chunks.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/Gpz6FLrP/20240823_023114.png",Sony Sab HD
https://stream.ottplus.bd/live/sub_hd_abr/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/13nLvxQx/20250630_050504.png",B4U Movie
http://103.175.73.12:8080/live/43/43_0.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/tC7JLFj0/20240825_055845.png",Shemarooenterta
http://103.175.73.12:8080/live/189/189_0.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/Z5dRqZnV/20240825_055816.png",Bhojopuri Cinema
http://103.175.73.12:8080/live/646/646_0.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/7ZNqRywh/20240823-023440.png",Gold Mines
http://103.175.73.12:8080/live/53/53_0.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/7ZNqRywh/20240823-023440.png",Gold Mines Movie
http://103.175.73.12:8080/live/51/51_0.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 𝐇𝐢𝐧𝐝𝐢" tvg-logo="https://i.postimg.cc/7ZNqRywh/20240823-023440.png",Gold Mines Bollywood
http://103.175.73.12:8080/live/52/52_0.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 News" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",Calcutta News
https://akdnetwork.co.in/live/cnnew/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 News" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",R Plus News
https://thelegitpro.in/pntv/rplusnews24x7/index.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 News" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",R Plus Gold
https://thelegitpro.in/pntv/rplusnews24x7/tracks-v1a1/mono.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 News" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",Republic Bangla
https://vg-republictvyupp.akamaized.net/ptnr-yuppt/v1/manifest/611d79b11b77e2f571934fd80ca1413453772ac7/vglive-sk-613605/93d674ab-f7a0-404e-88b2-b4f163373dbe/0.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 News" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",TV9 Bangla
https://dyjmyiv3bp2ez.cloudfront.net/pub-iotv9banaen8yq/liveabr/playlist.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 News" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",Aaj Tak HD
https://aajtaklive-amd.akamaized.net/hls/live/2014416/aajtak/aajtaklive/live_720p/chunks.m3u8

#EXTINF:-1 group-title="𝐈𝐧𝐝𝐢𝐚𝐧 News" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",NDTV Hindi
https://ndtvindiaelemarchana.akamaized.net/hls/live/2003679-b/ndtvindia/master.m3u8

#EXTINF:-1 group-title="𝐌𝐮𝐬𝐢𝐜" tvg-logo="https://i.postimg.cc/pdddb1bs/20250529_120025.png",Sangeet Bangla
http://103.175.73.12:8080/live/379/379_0.m3u8

#EXTINF:-1 group-title="𝐌𝐮𝐬𝐢𝐜" tvg-logo="https://i.postimg.cc/SRKS6TwR/20240823_022008.png",9XM
http://103.175.73.12:8080/live/155/155_0.m3u8

#EXTINF:-1 group-title="𝐌𝐮𝐬𝐢𝐜" tvg-logo="https://i.postimg.cc/7hz6tG8D/20250529_121941.png",Zoom
https://pubads.g.doubleclick.net/ssai/event/JCAm25qkRXiKcK1AJMlvKQ/master.m3u8

#EXTINF:-1 group-title="𝐌𝐮𝐬𝐢𝐜" tvg-logo="https://i.postimg.cc/hPFhzrTG/20250529_121624.png",yrf Music
https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg01412-xiaomiasia-yrfmusic-xiaomi/playlist.m3u8

#EXTINF:-1 group-title="𝐌𝐮𝐬𝐢𝐜" tvg-logo="https://i.imgur.com/sqeIrMo",Hindi Hits HD
http://146.59.253.52:8080/hindihitshd/index.m3u8

#EXTINF:-1 group-title="𝐒𝐩𝐨𝐫𝐭𝐬" tvg-logo="https://i.postimg.cc/Qx3GZn6T/20240823_024117.png",T Sports HD
https://mycoffeetime.net/play/tSDRdsaoGGQ2qYgRPDEe9q-qMIzoahbJArH3W3vOiEaB97nXMpWmLb0Ts759Tjsp/m3u8

#EXTINF:-1 group-title="𝐒𝐩𝐨𝐫𝐭𝐬" tvg-logo="https://i.imgur.com/sqeIrMo.jpeg",PTV
http://103.165.93.31:8095/ptv/tracks-v1a1/mono.m3u8

#EXTINF:-1 group-title="𝐒𝐩𝐨𝐫𝐭𝐬" tvg-logo="https://i.postimg.cc/0yzwt46Q/20241126-220214.png",Ten Cricket
https://s2.itcnbd.live/server-2/stream/ten_cricket.m3u8

#EXTINF:-1 group-title="𝐒𝐩𝐨𝐫𝐭𝐬" tvg-logo="https://i.postimg.cc/W1z5BGPZ/20240823_024712.png",A Sports HD
http://103.151.60.204:881/A-Sports/video.m3u8?token=Cv90Fr-lyiZYh2

#EXTINF:-1 group-title="𝐒𝐩𝐨𝐫𝐭𝐬" tvg-logo="https://i.postimg.cc/HntSg3xw/20240823_024624.png",Willow Sports
http://27.124.71.27/Willow_Extra/index.m3u8

#EXTINF:-1 group-title="𝐒𝐩𝐨𝐫𝐭𝐬" tvg-logo="https://i.postimg.cc/DzDHjCJm/20240823_024249.png",Star Sports 1
http://103.151.60.204:881/StarSports1/video.m3u8?token=Cv90Fr-lyiZYh2

#EXTINF:-1 group-title="𝐒𝐩𝐨𝐫𝐭𝐬" tvg-logo="https://i.postimg.cc/zBgM9nK7/20240823_024306.png",Star Sports 2
http://103.151.60.204:881/StarSports2/video.m3u8?token=Cv90Fr-lyiZYh2

#EXTINF:-1 group-title="𝐒𝐩𝐨𝐫𝐭𝐬" tvg-logo="https://i.postimg.cc/441hHtgZ/20250120_193746.png",Bein Sports 1
http://host.phorious.art/validation/377?deviceMac=10:27:BE:25:67:80&split=33da9c80155413830543e27c8520ba99&smart=1

#EXTINF:-1 group-title="𝐒𝐩𝐨𝐫𝐭𝐬" tvg-logo="https://i.ibb.co.com/wNC78Fgg/Capture.png",Mundial Fifa
https://s2.bufaloweb.com/bufalo9/tracks-v4a1/mono.ts.m3u8

#EXTINF:-1 group-title="𝐃𝐨𝐜𝐮𝐦𝐞𝐧𝐭𝐨𝐫𝐲" tvg-logo="https://i.postimg.cc/43NXkFx5/20240823_023458.png",Animal Planet
http://27.124.71.27/Animal_Planet/index.m3u8

#EXTINF:-1 group-title="𝐃𝐨𝐜𝐮𝐦𝐞𝐧𝐭𝐨𝐫𝐲" tvg-logo="https://i.postimg.cc/cJ90sMKN/20240823_023541.png",Discovery Bangla
http://202.70.146.135:8000/play/a05z/index.m3u8

#EXTINF:-1 group-title="𝐃𝐨𝐜𝐮𝐦𝐞𝐧𝐭𝐨𝐫𝐲" tvg-logo="https://i.postimg.cc/VN6PHrKZ/20240823_023950.png",National Geographic
http://202.70.146.135:8000/play/a05o/index.m3u8

#EXTINF:-1 group-title="𝐃𝐨𝐜𝐮𝐦𝐞𝐧𝐭𝐨𝐫𝐲" tvg-logo="https://i.postimg.cc/MZR248Yw/20240823-024104.png",Love Natural
http://27.124.71.27/Love_Nature/index.m3u8

#EXTINF:-1 group-title="Movies" tvg-logo="https://image.tmdb.org/t/p/original//l3lcofmg6YoDOPCR0peenvJbPVO.jpg",Nari Choritro Bejay Jotil
https://fmftp.net/data/disk-1/movies/indianbangla/new/Nari%20Choritro%20Bejay%20Jotil%20(2026)/Nari%20Choritro%20Bejay%20Jotil.mkv

#EXTINF:-1 group-title="Movies" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/91YwoAfOtbhMtXFzPHmWOEz15Q8.jpg",Rockstar
https://pub-87e02c2f0e8941be964da8513404e392.r2.dev/CINEFREAK.TOP%20-%20Rockstar%20%282026%29%20WEB-DL%20%5BBengali%5D%20Chorki%20720p%20ESub.mkv`;

function parseM3u(m3uText) {
  const lines = m3uText.split('\n');
  const channels = [];
  let currentCh = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('#EXTINF:')) {
      // Extract logo
      let logo = '';
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      if (logoMatch && logoMatch[1]) {
        logo = logoMatch[1];
      }

      // Extract group-title
      let group = 'entertainment';
      const groupMatch = line.match(/group-title="([^"]+)"/);
      if (groupMatch && groupMatch[1]) {
        group = groupMatch[1];
      }

      // Extract title after comma
      const commaIdx = line.lastIndexOf(',');
      let name = 'Live Channel';
      if (commaIdx !== -1) {
        name = line.substring(commaIdx + 1).trim();
      }

      currentCh = { name, logo, group };
    } else if (line.startsWith('http://') || line.startsWith('https://')) {
      if (currentCh) {
        const url = line.trim();
        const id = 'ch-' + (channels.length + 1);
        
        // Auto categorize based on group or name
        const groupLower = currentCh.group.toLowerCase();
        const nameLower = currentCh.name.toLowerCase();
        let category = 'entertainment';
        
        if (groupLower.includes('sport') || nameLower.includes('sport') || nameLower.includes('cricket') || nameLower.includes('fifa')) {
          category = 'sports';
        } else if (groupLower.includes('news') || nameLower.includes('news') || nameLower.includes('24') || nameLower.includes('somoy') || nameLower.includes('jamuna') || nameLower.includes('independent') || nameLower.includes('ekattor') || nameLower.includes('btv')) {
          category = 'news';
        } else if (groupLower.includes('movie') || nameLower.includes('movie') || nameLower.includes('cinema') || nameLower.includes('rockstar') || nameLower.includes('jotil')) {
          category = 'movies';
        } else if (groupLower.includes('music') || nameLower.includes('music') || nameLower.includes('9xm') || nameLower.includes('zoom')) {
          category = 'music';
        } else if (groupLower.includes('kid') || nameLower.includes('pogo') || nameLower.includes('yay') || nameLower.includes('rongeen')) {
          category = 'kids';
        } else if (groupLower.includes('doc') || nameLower.includes('discovery') || nameLower.includes('planet') || nameLower.includes('geographic') || nameLower.includes('nature')) {
          category = 'documentary';
        } else if (groupLower.includes('islam') || nameLower.includes('quran') || nameLower.includes('sunnah') || nameLower.includes('islam') || nameLower.includes('iqra') || nameLower.includes('peace')) {
          category = 'islamic';
        }

        const isHls = url.includes('.m3u8') || url.includes('.m3u');
        const viewers = (Math.floor(Math.random() * 90) + 10).toFixed(1) + 'K';
        
        channels.push({
          id: id,
          name: currentCh.name,
          category: category,
          logo: currentCh.logo || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&auto=format&fit=crop&q=80',
          badge: isHls ? 'LIVE HD' : 'HD',
          viewers: viewers,
          type: isHls ? 'hls' : 'mp4',
          url: url,
          fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          currentProgram: `${currentCh.name} - Live 24/7 Broadcast`,
          nextProgram: 'Upcoming Program',
          description: `Watch ${currentCh.name} live in High Quality definition streaming.`,
          epg: [
            { time: "12:00 PM", title: `${currentCh.name} Live Stream`, duration: "120 min", status: "active" }
          ]
        });
        currentCh = null;
      }
    }
  }
  return channels;
}

const parsed = parseM3u(rawM3u);
console.log(`Successfully parsed ${parsed.length} new channels.`);

const jsContent = `const CHANNELS_DATA = ${JSON.stringify(parsed, null, 2)};\n\nconst INITIAL_CHAT_MESSAGES = [];\n`;

fs.writeFileSync('channels.js', jsContent);
console.log('channels.js updated with new playlist channels only!');
