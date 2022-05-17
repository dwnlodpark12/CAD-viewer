vdrawTM = "VectorDraw WebControl by www.vdraw.com";
vdversion = "9002.2021.0506.1138";
var X = 0;
var Y = 1;
var Z = 2;
var B = 3;
var W = 3;
var INDEX = 3;
var A00 = 0;
var A01 = 1;
var A02 = 2;
var A03 = 3;
var A10 = 4;
var A11 = 5;
var A12 = 6;
var A13 = 7;
var A20 = 8;
var A21 = 9;
var A22 = 10;
var A23 = 11;
var A30 = 12;
var A31 = 13;
var A32 = 14;
var A33 = 15;
var vdgeo = {};
vdgeo.vd_vB = function (number, precision) {
  var ret = "";
  if (precision) ret = number.toFixed(precision);
  else ret = number.toString();
  var i = ret.length - 1;
  while (i > 0 && ret[i] == "0") i--;
  if (i > 0 && ret[i] == ".") i--;
  ret = ret.substr(0, i + 1);
  return ret;
};
vdgeo.vd_wE = function (point, precision) {
  var ret = "";
  for (var i = 0; i < point.length; i++) {
    ret += vdgeo.vd_vB(point[i], precision);
    if (i != point.length - 1) ret += ",";
  }
  return ret;
};
vdgeo.vd_wm = function (point) {
  var pt = [0, 0, 0];
  var vd_Cb = point.split(",");
  for (var i = 0; i < vd_Cb.length; i++) {
    pt[i] = Number(vd_Cb[i]);
  }
  return pt;
};
vdgeo.newpoint = function (x, y, z) {
  return [x, y, z];
};
vdgeo.vd_DU = function (x, y, z, i) {
  return [x, y, z, i];
};
vdgeo.newvertex = function (x, y, z, vd_hA) {
  return [x, y, z, vd_hA];
};
vdgeo.pointPolar = function (pt, ang, dst) {
  ang = vdgeo.FixAngle(ang);
  return vdgeo.newpoint(
    Math.cos(ang) * dst + pt[X],
    Math.sin(ang) * dst + pt[Y],
    pt[Z]
  );
};
vdgeo.vd_LL = function (pt, x, y, z) {
  pt[X] += x;
  pt[Y] += y;
  pt[Z] += z;
};
vdgeo.vd_nr = function (pt, x, y, z, w) {
  pt[X] = x;
  pt[Y] = y;
  pt[Z] = z;
  pt[W] = w;
};
vdgeo.MidPoint = function (p1, p2) {
  return vdgeo.newpoint(
    (p1[X] + p2[X]) / 2.0,
    (p1[Y] + p2[Y]) / 2.0,
    (p1[Z] + p2[Z]) / 2.0
  );
};
vdgeo.Distance2D = function (p1, p2) {
  return Math.sqrt(
    (p1[X] - p2[X]) * (p1[X] - p2[X]) + (p1[Y] - p2[Y]) * (p1[Y] - p2[Y])
  );
};
vdgeo.Distance3D = function (p1, p2) {
  return Math.sqrt(
    (p1[X] - p2[X]) * (p1[X] - p2[X]) +
      (p1[Y] - p2[Y]) * (p1[Y] - p2[Y]) +
      (p1[Z] - p2[Z]) * (p1[Z] - p2[Z])
  );
};
vdgeo.vd_aZ = function (dest, source) {
  dest[X] = source[X];
  dest[Y] = source[Y];
  dest[Z] = source[Z];
  dest[W] = source[W];
};
vdgeo.vd_oE = function (pt, vd_xZ, dir, dist) {
  pt[X] = vd_xZ[X] + dir[X] * dist;
  pt[Y] = vd_xZ[Y] + dir[Y] * dist;
  pt[Z] = vd_xZ[Z] + dir[Z] * dist;
};
vdgeo.vd_Dn = function (pt, val) {
  return vdgeo.newpoint(pt[X] * val, pt[Y] * val, pt[Z] * val);
};
vdgeo.GetAngle = function (p1, p2) {
  if (
    vdgeo.AreEqual(vdgeo.Distance2D(p1, p2), 0.0, vdgeo.DefaultLinearEquality)
  )
    return 0.0;
  return vdgeo.FixAngle(Math.atan2(p2[Y] - p1[Y], p2[X] - p1[X]));
};
vdgeo.VectorDirection = function (p1, p2) {
  var v = vdgeo.newpoint(p2[X] - p1[X], p2[Y] - p1[Y], p2[Z] - p1[Z]);
  vdgeo.vd_cN(v);
  return v;
};
vdgeo.vd_hz = function (v, other) {
  return v[X] * other[X] + v[Y] * other[Y] + v[Z] * other[Z];
};
vdgeo.vd_iE = function (v) {
  return Math.sqrt(vdgeo.vd_hz(v, v));
};
vdgeo.vd_yV = function (vec) {
  var v = vdgeo.newpoint(vec[X], vec[Y], vec[Z]);
  vdgeo.vd_cN(v);
  var sa = 0.0;
  if (vdgeo.AreEqual(v[X], 0, vdgeo.DefaultLinearEquality)) {
    if (v[Y] > 0.0) {
      sa = vdgeo.HALF_PI;
    } else {
      sa = 3.0 * vdgeo.HALF_PI;
    }
  } else if (vdgeo.AreEqual(v[Y], 0, vdgeo.DefaultLinearEquality)) {
    if (v[X] > 0.0) {
      sa = 0.0;
    } else {
      sa = vdgeo.PI;
    }
  } else {
    sa = Math.atan(Math.abs(v[Y]) / Math.abs(v[X]));
    if (v[Y] > 0.0 && v[X] < 0.0) {
      sa = vdgeo.PI - sa;
    } else if (v[Y] < 0.0 && v[X] < 0.0) {
      sa = vdgeo.PI + sa;
    } else if (v[Y] < 0.0 && v[X] > 0.0) {
      sa = vdgeo.VD_TWOPI - sa;
    }
  }
  return vdgeo.FixAngle(sa);
};
vdgeo.vd_cN = function (v) {
  var l = vdgeo.vd_iE(v);
  if (vdgeo.AreEqual(l, 0.0, vdgeo.DefaultVectorEquality)) {
    v[X] = 0.0;
    v[Y] = 0.0;
    v[Z] = 1.0;
    return false;
  }
  v[X] /= l;
  v[Y] /= l;
  v[Z] /= l;
  return true;
};
vdgeo.vd_EP = function (v1, v2, v) {
  v[X] = v1[Y] * v2[Z] - v2[Y] * v1[Z];
  v[Y] = v1[Z] * v2[X] - v2[Z] * v1[X];
  v[Z] = v1[X] * v2[Y] - v2[X] * v1[Y];
};
vdgeo.vd_mi = function (v1, v2) {
  var v = vdgeo.newpoint(0, 0, 0);
  vdgeo.vd_EP(v1, v2, v);
  return v;
};
vdgeo.vd_mG = function (p1, p2, p3, v) {
  var A = vdgeo.newpoint(p2[X] - p1[X], p2[Y] - p1[Y], p2[Z] - p1[Z]);
  var B = vdgeo.newpoint(p3[X] - p1[X], p3[Y] - p1[Y], p3[Z] - p1[Z]);
  vdgeo.vd_EP(A, B, v);
  if (!vdgeo.vd_cN(v)) return false;
  return true;
};
vdgeo.vd_JC = function (p1, p2, p3) {
  var v = vdgeo.newpoint(0, 0, 0);
  if (!vdgeo.vd_mG(p1, p2, p3, v)) return null;
  return v;
};
vdgeo.vd_Oj = function (p1, p2, p3, p4) {
  if (vdgeo.vd_ed(p1, p2, vdgeo.vd_ql)) return 1;
  if (vdgeo.vd_ed(p2, p3, vdgeo.vd_ql)) return 2;
  if (vdgeo.vd_ed(p3, p4, vdgeo.vd_ql)) return 3;
  if (vdgeo.vd_ed(p4, p1, vdgeo.vd_ql)) return 4;
  return 0;
};
vdgeo.vd_Hr = function (p1, p2, p3, p4, v) {
  var olap = vdgeo.vd_Oj(p1, p2, p3, p4);
  switch (olap) {
    case 0:
      return vdgeo.vd_mG(p1, p2, p3, v);
    case 1:
      return vdgeo.vd_mG(p2, p3, p4, v);
    case 2:
      return vdgeo.vd_mG(p1, p3, p4, v);
    case 3:
      return vdgeo.vd_mG(p1, p2, p4, v);
    case 4:
      return vdgeo.vd_mG(p1, p2, p3, v);
  }
  return false;
};
vdgeo.vd_Ng = function (mat) {
  return [
    mat[A00],
    mat[A10],
    mat[A20],
    mat[A30],
    mat[A01],
    mat[A11],
    mat[A21],
    mat[A31],
    mat[A02],
    mat[A12],
    mat[A22],
    mat[A32],
    mat[A03],
    mat[A13],
    mat[A23],
    mat[A33],
  ];
};
vdgeo.vd_Qz = function (vd_wx, pvTo) {
  var vA = vdgeo.newpoint(vd_wx[X], vd_wx[Y], vd_wx[Z]);
  var vB = vdgeo.newpoint(pvTo[X], pvTo[Y], pvTo[Z]);
  vdgeo.vd_cN(vA);
  vdgeo.vd_cN(vB);
  var vd_yu = vdgeo.newpoint(vA[X] + vB[X], vA[Y] + vB[Y], vA[Z] + vB[Z]);
  vdgeo.vd_cN(vd_yu);
  var vOut = vdgeo.vd_mi(vA, vd_yu);
  var x = vOut[X];
  var y = vOut[Y];
  var z = vOut[Z];
  var w = vdgeo.vd_hz(vA, vd_yu);
  return [x, y, z, w];
};
vdgeo.vd_PP = function (q) {
  var x = q[X];
  var y = q[Y];
  var z = q[Z];
  var w = q[W];
  var vd_mI = 0.0;
  var vd_oF = 0.0;
  var bank = 0.0;
  var test = x * y + z * w;
  if (test > 0.499) {
    vd_mI = 2 * Math.atan2(x, w);
    vd_oF = vdgeo.PI / 2;
    bank = 0;
    return [vdgeo.FixAngle(bank), vdgeo.FixAngle(vd_mI), vdgeo.FixAngle(vd_oF)];
  }
  if (test < -0.499) {
    vd_mI = -2 * Math.atan2(x, w);
    vd_oF = -vdgeo.PI / 2;
    bank = 0;
    return [vdgeo.FixAngle(bank), vdgeo.FixAngle(vd_mI), vdgeo.FixAngle(vd_oF)];
  }
  var sqx = x * x;
  var sqy = y * y;
  var sqz = z * z;
  vd_mI = Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * sqy - 2 * sqz);
  vd_oF = Math.asin(2 * test);
  bank = Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * sqx - 2 * sqz);
  return [vdgeo.FixAngle(bank), vdgeo.FixAngle(vd_mI), vdgeo.FixAngle(vd_oF)];
};
vdgeo.vd_Q = function () {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
};
vdgeo.vd_ci = function (m) {
  var ret = vdgeo.vd_Q();
  vdgeo.vd_ne(ret, m);
  return ret;
};
vdgeo.vd_Rz = function (m, precision) {
  if (precision == undefined) precision = 10;
  return (
    "[" +
    m[A00].toFixed(precision) +
    "," +
    m[A01].toFixed(precision) +
    "," +
    m[A02].toFixed(precision) +
    "," +
    m[A03].toFixed(precision) +
    "," +
    m[A10].toFixed(precision) +
    "," +
    m[A11].toFixed(precision) +
    "," +
    m[A12].toFixed(precision) +
    "," +
    m[A13].toFixed(precision) +
    "," +
    m[A20].toFixed(precision) +
    "," +
    m[A21].toFixed(precision) +
    "," +
    m[A22].toFixed(precision) +
    "," +
    m[A23].toFixed(precision) +
    "," +
    m[A30].toFixed(precision) +
    "," +
    m[A31].toFixed(precision) +
    "," +
    m[A32].toFixed(precision) +
    "," +
    m[A33].toFixed(precision) +
    "]"
  );
};
vdgeo.vd_Sa = function (m, precision) {
  if (precision == undefined) precision = 10;
  m[A00] = Number(m[A00].toFixed(precision));
  m[A01] = Number(m[A01].toFixed(precision));
  m[A02] = Number(m[A02].toFixed(precision));
  m[A03] = Number(m[A03].toFixed(precision));
  m[A10] = Number(m[A10].toFixed(precision));
  m[A11] = Number(m[A11].toFixed(precision));
  m[A12] = Number(m[A12].toFixed(precision));
  m[A13] = Number(m[A13].toFixed(precision));
  m[A20] = Number(m[A20].toFixed(precision));
  m[A21] = Number(m[A21].toFixed(precision));
  m[A22] = Number(m[A22].toFixed(precision));
  m[A23] = Number(m[A23].toFixed(precision));
  m[A30] = Number(m[A30].toFixed(precision));
  m[A31] = Number(m[A31].toFixed(precision));
  m[A32] = Number(m[A32].toFixed(precision));
  m[A33] = Number(m[A33].toFixed(precision));
};
vdgeo.vd_gv = function (m) {
  m[A00] = 1.0;
  m[A01] = 0.0;
  m[A02] = 0.0;
  m[A03] = 0.0;
  m[A10] = 0.0;
  m[A11] = 1.0;
  m[A12] = 0.0;
  m[A13] = 0.0;
  m[A20] = 0.0;
  m[A21] = 0.0;
  m[A22] = 1.0;
  m[A23] = 0.0;
  m[A30] = 0.0;
  m[A31] = 0.0;
  m[A32] = 0.0;
  m[A33] = 1.0;
};
vdgeo.vd_ne = function (m, from) {
  m[A00] = from[A00];
  m[A01] = from[A01];
  m[A02] = from[A02];
  m[A03] = from[A03];
  m[A10] = from[A10];
  m[A11] = from[A11];
  m[A12] = from[A12];
  m[A13] = from[A13];
  m[A20] = from[A20];
  m[A21] = from[A21];
  m[A22] = from[A22];
  m[A23] = from[A23];
  m[A30] = from[A30];
  m[A31] = from[A31];
  m[A32] = from[A32];
  m[A33] = from[A33];
};
vdgeo.vd_cW = function (m, mat) {
  if (vdgeo.vd_Ea(m) && vdgeo.vd_Ea(mat)) {
    vdgeo.vd_LT(m, mat);
    return;
  }
  if (vdgeo.vd_wY(m)) {
    vdgeo.vd_ne(m, mat);
    return;
  }
  if (vdgeo.vd_wY(mat)) {
    return;
  }
  var a_00 =
    m[A00] * mat[A00] +
    m[A10] * mat[A01] +
    m[A20] * mat[A02] +
    m[A30] * mat[A03];
  var a_01 =
    m[A01] * mat[A00] +
    m[A11] * mat[A01] +
    m[A21] * mat[A02] +
    m[A31] * mat[A03];
  var a_02 =
    m[A02] * mat[A00] +
    m[A12] * mat[A01] +
    m[A22] * mat[A02] +
    m[A32] * mat[A03];
  var a_03 =
    m[A03] * mat[A00] +
    m[A13] * mat[A01] +
    m[A23] * mat[A02] +
    m[A33] * mat[A03];
  var a_10 =
    m[A00] * mat[A10] +
    m[A10] * mat[A11] +
    m[A20] * mat[A12] +
    m[A30] * mat[A13];
  var a_11 =
    m[A01] * mat[A10] +
    m[A11] * mat[A11] +
    m[A21] * mat[A12] +
    m[A31] * mat[A13];
  var a_12 =
    m[A02] * mat[A10] +
    m[A12] * mat[A11] +
    m[A22] * mat[A12] +
    m[A32] * mat[A13];
  var a_13 =
    m[A03] * mat[A10] +
    m[A13] * mat[A11] +
    m[A23] * mat[A12] +
    m[A33] * mat[A13];
  var a_20 =
    m[A00] * mat[A20] +
    m[A10] * mat[A21] +
    m[A20] * mat[A22] +
    m[A30] * mat[A23];
  var a_21 =
    m[A01] * mat[A20] +
    m[A11] * mat[A21] +
    m[A21] * mat[A22] +
    m[A31] * mat[A23];
  var a_22 =
    m[A02] * mat[A20] +
    m[A12] * mat[A21] +
    m[A22] * mat[A22] +
    m[A32] * mat[A23];
  var a_23 =
    m[A03] * mat[A20] +
    m[A13] * mat[A21] +
    m[A23] * mat[A22] +
    m[A33] * mat[A23];
  var a_30 =
    m[A00] * mat[A30] +
    m[A10] * mat[A31] +
    m[A20] * mat[A32] +
    m[A30] * mat[A33];
  var a_31 =
    m[A01] * mat[A30] +
    m[A11] * mat[A31] +
    m[A21] * mat[A32] +
    m[A31] * mat[A33];
  var a_32 =
    m[A02] * mat[A30] +
    m[A12] * mat[A31] +
    m[A22] * mat[A32] +
    m[A32] * mat[A33];
  var a_33 =
    m[A03] * mat[A30] +
    m[A13] * mat[A31] +
    m[A23] * mat[A32] +
    m[A33] * mat[A33];
  m[A00] = a_00;
  m[A01] = a_01;
  m[A02] = a_02;
  m[A03] = a_03;
  m[A10] = a_10;
  m[A11] = a_11;
  m[A12] = a_12;
  m[A13] = a_13;
  m[A20] = a_20;
  m[A21] = a_21;
  m[A22] = a_22;
  m[A23] = a_23;
  m[A30] = a_30;
  m[A31] = a_31;
  m[A32] = a_32;
  m[A33] = a_33;
};
vdgeo.vd_wY = function (m) {
  return (
    m[A00] === 1.0 &&
    m[A01] === 0.0 &&
    m[A02] === 0.0 &&
    m[A03] === 0.0 &&
    m[A10] === 0.0 &&
    m[A11] === 1.0 &&
    m[A12] === 0.0 &&
    m[A13] === 0.0 &&
    m[A20] === 0.0 &&
    m[A21] === 0.0 &&
    m[A22] === 1.0 &&
    m[A23] === 0.0 &&
    m[A30] === 0.0 &&
    m[A31] === 0.0 &&
    m[A32] === 0.0 &&
    m[A33] === 1.0
  );
};
vdgeo.vd_oN = function (m) {
  var m_N = vdgeo.vd_mi(vdgeo.vd_jG(m), vdgeo.vd_DZ(m));
  var m_A = vdgeo.vd_hz(m_N, m_N);
  if (-vdgeo.EPSILON < m_A && m_A < vdgeo.EPSILON) return false;
  return vdgeo.vd_hz(m_N, vdgeo.vd_gn(m)) < 0.0 ? true : false;
};
vdgeo.vd_jG = function (m) {
  return vdgeo.newpoint(m[A00], m[A10], m[A20]);
};
vdgeo.vd_DZ = function (m) {
  return vdgeo.newpoint(m[A01], m[A11], m[A21]);
};
vdgeo.vd_gn = function (m) {
  return vdgeo.newpoint(m[A02], m[A12], m[A22]);
};
vdgeo.vd_DF = function (m) {
  return vdgeo.newpoint(m[A03], m[A13], m[A23]);
};
vdgeo.vd_rN = function (m) {
  return vdgeo.newpoint(
    vdgeo.vd_iE(vdgeo.vd_jG(m)),
    vdgeo.vd_iE(vdgeo.vd_DZ(m)),
    vdgeo.vd_iE(vdgeo.vd_gn(m))
  );
};
vdgeo.vd_nF = function (m) {
  var zdir = vdgeo.vd_gn(m);
  if (
    vdgeo.AreEqual(zdir[X], 0, vdgeo.DefaultVectorEquality) &&
    vdgeo.AreEqual(zdir[Y], 0, vdgeo.DefaultVectorEquality)
  )
    return vdgeo.vd_yV(vdgeo.vd_jG(m));
  var offset = vdgeo.vd_DF(m);
  var _mat = vdgeo.vd_ci(m);
  vdgeo.vd_j(_mat, -offset[X], -offset[Y], -offset[Z]);
  vdgeo.vd_hh(_mat, zdir);
  return vdgeo.vd_yV(vdgeo.vd_jG(_mat));
};
vdgeo.vd_LJ = function (m) {
  var zdir = vdgeo.vd_gn(m);
  var offset = vdgeo.vd_DF(m);
  var _mat = vdgeo.vd_ci(m);
  vdgeo.vd_j(_mat, -offset[X], -offset[Y], -offset[Z]);
  vdgeo.vd_hh(_mat, zdir);
  var angle = vdgeo.vd_yV(vdgeo.vd_jG(_mat));
  vdgeo.vd_ap(_mat, -angle);
  return {
    x: offset[X],
    y: offset[Y],
    z: offset[Z],
    sx: _mat[A00],
    sy: _mat[A11],
    sz: _mat[A22],
    zrot: angle,
    dir: zdir,
  };
};
vdgeo.vd_Bp = function (m, vd_g, rotation, sx, sy, sz, normal) {
  var mat = vdgeo.vd_Q();
  vdgeo.vd_bf(mat, sx, sy, sz);
  vdgeo.vd_ap(mat, rotation);
  vdgeo.vd_cn(mat, normal);
  vdgeo.vd_j(mat, vd_g[X], vd_g[Y], vd_g[Z]);
  vdgeo.vd_cW(mat, m);
  return vdgeo.vd_LJ(mat);
};
vdgeo.vd_Ea = function (m) {
  return (
    m[A02] === 0.0 &&
    m[A12] === 0.0 &&
    m[A20] === 0.0 &&
    m[A21] === 0.0 &&
    m[A23] === 0.0 &&
    m[A32] === 0.0
  );
};
vdgeo.vd_LT = function (m, mat) {
  var a_00 = m[A00] * mat[A00] + m[A10] * mat[A01] + m[A30] * mat[A03];
  var a_01 = m[A01] * mat[A00] + m[A11] * mat[A01] + m[A31] * mat[A03];
  var a_03 = m[A03] * mat[A00] + m[A13] * mat[A01] + m[A33] * mat[A03];
  var a_10 = m[A00] * mat[A10] + m[A10] * mat[A11] + m[A30] * mat[A13];
  var a_11 = m[A01] * mat[A10] + m[A11] * mat[A11] + m[A31] * mat[A13];
  var a_13 = m[A03] * mat[A10] + m[A13] * mat[A11] + m[A33] * mat[A13];
  var a_22 = m[A22] * mat[A22];
  var a_30 = m[A00] * mat[A30] + m[A10] * mat[A31] + m[A30] * mat[A33];
  var a_31 = m[A01] * mat[A30] + m[A11] * mat[A31] + m[A31] * mat[A33];
  var a_33 = m[A03] * mat[A30] + m[A13] * mat[A31] + m[A33] * mat[A33];
  m[A00] = a_00;
  m[A01] = a_01;
  m[A02] = 0;
  m[A03] = a_03;
  m[A10] = a_10;
  m[A11] = a_11;
  m[A12] = 0;
  m[A13] = a_13;
  m[A20] = 0;
  m[A21] = 0;
  m[A22] = a_22;
  m[A23] = 0;
  m[A30] = a_30;
  m[A31] = a_31;
  m[A32] = 0;
  m[A33] = a_33;
};
vdgeo.vd_LC = function (m) {
  return (
    m[A03] * m[A12] * m[A21] * m[A30] -
    m[A02] * m[A13] * m[A21] * m[A30] -
    m[A03] * m[A11] * m[A22] * m[A30] +
    m[A01] * m[A13] * m[A22] * m[A30] +
    m[A02] * m[A11] * m[A23] * m[A30] -
    m[A01] * m[A12] * m[A23] * m[A30] -
    m[A03] * m[A12] * m[A20] * m[A31] +
    m[A02] * m[A13] * m[A20] * m[A31] +
    m[A03] * m[A10] * m[A22] * m[A31] -
    m[A00] * m[A13] * m[A22] * m[A31] -
    m[A02] * m[A10] * m[A23] * m[A31] +
    m[A00] * m[A12] * m[A23] * m[A31] +
    m[A03] * m[A11] * m[A20] * m[A32] -
    m[A01] * m[A13] * m[A20] * m[A32] -
    m[A03] * m[A10] * m[A21] * m[A32] +
    m[A00] * m[A13] * m[A21] * m[A32] +
    m[A01] * m[A10] * m[A23] * m[A32] -
    m[A00] * m[A11] * m[A23] * m[A32] -
    m[A02] * m[A11] * m[A20] * m[A33] +
    m[A01] * m[A12] * m[A20] * m[A33] +
    m[A02] * m[A10] * m[A21] * m[A33] -
    m[A00] * m[A12] * m[A21] * m[A33] -
    m[A01] * m[A10] * m[A22] * m[A33] +
    m[A00] * m[A11] * m[A22] * m[A33]
  );
};
vdgeo.vd_me = function (m) {
  var det = vdgeo.vd_LC(m);
  var t00 =
    m[A12] * m[A23] * m[A31] -
    m[A13] * m[A22] * m[A31] +
    m[A13] * m[A21] * m[A32] -
    m[A11] * m[A23] * m[A32] -
    m[A12] * m[A21] * m[A33] +
    m[A11] * m[A22] * m[A33];
  var t01 =
    m[A03] * m[A22] * m[A31] -
    m[A02] * m[A23] * m[A31] -
    m[A03] * m[A21] * m[A32] +
    m[A01] * m[A23] * m[A32] +
    m[A02] * m[A21] * m[A33] -
    m[A01] * m[A22] * m[A33];
  var t02 =
    m[A02] * m[A13] * m[A31] -
    m[A03] * m[A12] * m[A31] +
    m[A03] * m[A11] * m[A32] -
    m[A01] * m[A13] * m[A32] -
    m[A02] * m[A11] * m[A33] +
    m[A01] * m[A12] * m[A33];
  var t03 =
    m[A03] * m[A12] * m[A21] -
    m[A02] * m[A13] * m[A21] -
    m[A03] * m[A11] * m[A22] +
    m[A01] * m[A13] * m[A22] +
    m[A02] * m[A11] * m[A23] -
    m[A01] * m[A12] * m[A23];
  var t10 =
    m[A13] * m[A22] * m[A30] -
    m[A12] * m[A23] * m[A30] -
    m[A13] * m[A20] * m[A32] +
    m[A10] * m[A23] * m[A32] +
    m[A12] * m[A20] * m[A33] -
    m[A10] * m[A22] * m[A33];
  var t11 =
    m[A02] * m[A23] * m[A30] -
    m[A03] * m[A22] * m[A30] +
    m[A03] * m[A20] * m[A32] -
    m[A00] * m[A23] * m[A32] -
    m[A02] * m[A20] * m[A33] +
    m[A00] * m[A22] * m[A33];
  var t12 =
    m[A03] * m[A12] * m[A30] -
    m[A02] * m[A13] * m[A30] -
    m[A03] * m[A10] * m[A32] +
    m[A00] * m[A13] * m[A32] +
    m[A02] * m[A10] * m[A33] -
    m[A00] * m[A12] * m[A33];
  var t13 =
    m[A02] * m[A13] * m[A20] -
    m[A03] * m[A12] * m[A20] +
    m[A03] * m[A10] * m[A22] -
    m[A00] * m[A13] * m[A22] -
    m[A02] * m[A10] * m[A23] +
    m[A00] * m[A12] * m[A23];
  var t20 =
    m[A11] * m[A23] * m[A30] -
    m[A13] * m[A21] * m[A30] +
    m[A13] * m[A20] * m[A31] -
    m[A10] * m[A23] * m[A31] -
    m[A11] * m[A20] * m[A33] +
    m[A10] * m[A21] * m[A33];
  var t21 =
    m[A03] * m[A21] * m[A30] -
    m[A01] * m[A23] * m[A30] -
    m[A03] * m[A20] * m[A31] +
    m[A00] * m[A23] * m[A31] +
    m[A01] * m[A20] * m[A33] -
    m[A00] * m[A21] * m[A33];
  var t22 =
    m[A01] * m[A13] * m[A30] -
    m[A03] * m[A11] * m[A30] +
    m[A03] * m[A10] * m[A31] -
    m[A00] * m[A13] * m[A31] -
    m[A01] * m[A10] * m[A33] +
    m[A00] * m[A11] * m[A33];
  var t23 =
    m[A03] * m[A11] * m[A20] -
    m[A01] * m[A13] * m[A20] -
    m[A03] * m[A10] * m[A21] +
    m[A00] * m[A13] * m[A21] +
    m[A01] * m[A10] * m[A23] -
    m[A00] * m[A11] * m[A23];
  var t30 =
    m[A12] * m[A21] * m[A30] -
    m[A11] * m[A22] * m[A30] -
    m[A12] * m[A20] * m[A31] +
    m[A10] * m[A22] * m[A31] +
    m[A11] * m[A20] * m[A32] -
    m[A10] * m[A21] * m[A32];
  var t31 =
    m[A01] * m[A22] * m[A30] -
    m[A02] * m[A21] * m[A30] +
    m[A02] * m[A20] * m[A31] -
    m[A00] * m[A22] * m[A31] -
    m[A01] * m[A20] * m[A32] +
    m[A00] * m[A21] * m[A32];
  var t32 =
    m[A02] * m[A11] * m[A30] -
    m[A01] * m[A12] * m[A30] -
    m[A02] * m[A10] * m[A31] +
    m[A00] * m[A12] * m[A31] +
    m[A01] * m[A10] * m[A32] -
    m[A00] * m[A11] * m[A32];
  var t33 =
    m[A01] * m[A12] * m[A20] -
    m[A02] * m[A11] * m[A20] +
    m[A02] * m[A10] * m[A21] -
    m[A00] * m[A12] * m[A21] -
    m[A01] * m[A10] * m[A22] +
    m[A00] * m[A11] * m[A22];
  var vd_dw = 1.0 / det;
  m[A00] = t00 * vd_dw;
  m[A01] = t01 * vd_dw;
  m[A02] = t02 * vd_dw;
  m[A03] = t03 * vd_dw;
  m[A10] = t10 * vd_dw;
  m[A11] = t11 * vd_dw;
  m[A12] = t12 * vd_dw;
  m[A13] = t13 * vd_dw;
  m[A20] = t20 * vd_dw;
  m[A21] = t21 * vd_dw;
  m[A22] = t22 * vd_dw;
  m[A23] = t23 * vd_dw;
  m[A30] = t30 * vd_dw;
  m[A31] = t31 * vd_dw;
  m[A32] = t32 * vd_dw;
  m[A33] = t33 * vd_dw;
};
vdgeo.vd_bu = function (m) {
  var ret = vdgeo.vd_ci(m);
  vdgeo.vd_me(ret);
  return ret;
};
vdgeo.vd_CV = function (x0, y0, x1, y1) {
  var mat = vdgeo.vd_Q();
  vdgeo.vd_bf(mat, 1.0 / (x1 - x0), 1.0 / (y1 - y0), 1.0);
  vdgeo.vd_j(mat, x0, y0, 0);
  return mat;
};
vdgeo.vd_j = function (m, dx, dy, dz) {
  if (dx === 0.0 && dy === 0.0 && dz === 0.0) return;
  var mat = vdgeo.vd_Q();
  mat[A03] = dx;
  mat[A13] = dy;
  mat[A23] = dz;
  vdgeo.vd_cW(m, mat);
};
vdgeo.vd_bf = function (m, a, b, c) {
  if (a === 1.0 && b === 1.0 && c === 1.0) return;
  var mat = vdgeo.vd_Q();
  mat[A00] = a;
  mat[A11] = b;
  mat[A22] = c;
  vdgeo.vd_cW(m, mat);
};
vdgeo.vd_ap = function (m, rads) {
  if (rads === 0.0) return;
  var mat = vdgeo.vd_Q();
  var vd_cB, sine;
  vd_cB = Math.cos(rads);
  sine = Math.sin(rads);
  mat[A00] = vd_cB;
  mat[A11] = vd_cB;
  mat[A01] = -sine;
  mat[A10] = sine;
  vdgeo.vd_cW(m, mat);
};
vdgeo.vd_LO = function (m, rads) {
  if (rads === 0.0) return;
  var mat = vdgeo.vd_Q();
  var vd_cB, sine;
  vd_cB = Math.cos(rads);
  sine = Math.sin(rads);
  mat[A11] = vd_cB;
  mat[A22] = vd_cB;
  mat[A12] = -sine;
  mat[A21] = sine;
  vdgeo.vd_cW(m, mat);
};
vdgeo.vd_IY = function (m, rads) {
  if (rads === 0.0) return;
  var mat = vdgeo.vd_Q();
  var vd_cB, sine;
  vd_cB = Math.cos(rads);
  sine = Math.sin(rads);
  mat[A00] = vd_cB;
  mat[A22] = vd_cB;
  mat[A02] = sine;
  mat[A20] = -sine;
  vdgeo.vd_cW(m, mat);
};
vdgeo.vd_CA = function (m, Sx, Sy) {
  if (Sx === 0.0 && Sy === 0.0) return;
  var mat = vdgeo.vd_Q();
  mat[A01] = Math.tan(Sx);
  mat[A10] = Math.tan(Sy);
  vdgeo.vd_cW(m, mat);
};
var vd_CS = 0.015625;
vdgeo.vd_KF = function (m, vd_ka, vd_xk) {
  var vd_cf = vdgeo.newpoint(vd_ka[X], vd_ka[Y], vd_ka[Z]);
  vdgeo.vd_cN(vd_cf);
  var vd_eJ = vdgeo.newpoint(vd_xk[X], vd_xk[Y], vd_xk[Z]);
  vdgeo.vd_cN(vd_eJ);
  var vd_ge = vdgeo.vd_mi(vd_cf, vd_eJ);
  vdgeo.vd_cN(vd_ge);
  var mat = vdgeo.vd_Q();
  mat[A00] = vd_eJ[X];
  mat[A01] = vd_ge[X];
  mat[A02] = vd_cf[X];
  mat[A10] = vd_eJ[Y];
  mat[A11] = vd_ge[Y];
  mat[A12] = vd_cf[Y];
  mat[A20] = vd_eJ[Z];
  mat[A21] = vd_ge[Z];
  mat[A22] = vd_cf[Z];
  vdgeo.vd_cW(m, mat);
};
vdgeo.vd_cn = function (m, vd_ka) {
  if (vd_ka == undefined) return;
  var vd_cf = vdgeo.newpoint(vd_ka[X], vd_ka[Y], vd_ka[Z]);
  vdgeo.vd_cN(vd_cf);
  if (vd_cf[X] === 0.0 && vd_cf[Y] === 0.0 && vd_cf[Z] === 1.0) return;
  var vd_eJ;
  var vd_ge;
  var Wy = vdgeo.newpoint(0.0, 1.0, 0.0);
  var Wz = vdgeo.newpoint(0.0, 0.0, 1.0);
  if (Math.abs(vd_cf[X]) < vd_CS && Math.abs(vd_cf[Y]) < vd_CS)
    vd_eJ = vdgeo.vd_mi(Wy, vd_cf);
  else vd_eJ = vdgeo.vd_mi(Wz, vd_cf);
  vdgeo.vd_cN(vd_eJ);
  vd_ge = vdgeo.vd_mi(vd_cf, vd_eJ);
  vdgeo.vd_cN(vd_ge);
  var mat = vdgeo.vd_Q();
  mat[A00] = vd_eJ[X];
  mat[A01] = vd_ge[X];
  mat[A02] = vd_cf[X];
  mat[A10] = vd_eJ[Y];
  mat[A11] = vd_ge[Y];
  mat[A12] = vd_cf[Y];
  mat[A20] = vd_eJ[Z];
  mat[A21] = vd_ge[Z];
  mat[A22] = vd_cf[Z];
  vdgeo.vd_cW(m, mat);
};
vdgeo.vd_hh = function (m, vd_cf) {
  var mat = vdgeo.vd_Q();
  vdgeo.vd_cn(mat, vd_cf);
  vdgeo.vd_me(mat);
  vdgeo.vd_cW(m, mat);
};
vdgeo.vd_Mx = function (m, axis, rotation) {
  vdgeo.vd_hh(m, axis);
  vdgeo.vd_ap(m, rotation);
  vdgeo.vd_cn(m, axis);
};
vdgeo.vd_RR = function (m, vd_PQ, vd_Qi, vd_rG, vd_sm) {
  vdgeo.vd_gv(m);
  vdgeo.vd_bf(m, vd_rG * 0.5, vd_sm * 0.5, 1);
  vdgeo.vd_j(m, -vd_rG * 0.5 + vd_PQ, -vd_sm * 0.5 + vd_Qi, 0);
};
vdgeo.vd_Mm = function (m, vd_X, vd_m, vd_zB, near, far) {
  var width = vd_m * vd_zB;
  var left = vd_X[X] - width * 0.5;
  var right = vd_X[X] + width * 0.5;
  var top = vd_X[Y] + vd_m * 0.5;
  var bottom = vd_X[Y] - vd_m * 0.5;
  vdgeo.vd_gv(m);
  m[A00] = 2.0 / (right - left);
  m[A03] = -(right + left) / (right - left);
  m[A11] = 2.0 / (top - bottom);
  m[A13] = -(top + bottom) / (top - bottom);
  m[A22] = -2.0 / (far - near);
  m[A23] = -(far + near) / (far - near);
  m[A32] = 0.0;
  m[A33] = 1.0;
};
vdgeo.vd_KM = function (
  m,
  vd_X,
  vd_m,
  vd_zB,
  near,
  far,
  FocalLength,
  LensAngle
) {
  far += vd_X[Z];
  near += vd_X[Z];
  near = FocalLength;
  near = Math.max(near, 0.001);
  far = Math.max(near + 0.001, far);
  var vd_kL =
    2.0 * FocalLength * Math.tan(vdgeo.DegreesToRadians(LensAngle / 2.0));
  var top = vd_kL * 0.5;
  var bottom = -top;
  var right = vd_zB * top;
  var left = -right;
  vdgeo.vd_gv(m);
  m[A00] = (2.0 * near) / (right - left);
  m[A02] = (right + left) / (right - left);
  m[A11] = (2.0 * near) / (top - bottom);
  m[A12] = (top + bottom) / (top - bottom);
  m[A22] = -(far + near) / (far - near);
  m[A23] = (-2.0 * far * near) / (far - near);
  m[A32] = -1.0;
  m[A33] = 0.0;
  var m2 = vdgeo.vd_Q();
  vdgeo.vd_j(m2, -vd_X[X], -vd_X[Y], -vd_X[Z]);
  vdgeo.vd_cW(m2, m);
  vdgeo.vd_ne(m, m2);
};
vdgeo.vd_Kk = function (p1, p2) {
  var z1 = p1[Z];
  var z2 = p2[Z];
  if (z1 < 0 && z2 < 0) return false;
  if (z1 < 0 || z2 < 0) {
    var gradient = -p1[Z] / (p2[Z] - p1[Z]);
    var x = vdgeo.vd_cQ(p1[X], p2[X], gradient);
    var y = vdgeo.vd_cQ(p1[Y], p2[Y], gradient);
    var z = vdgeo.vd_cQ(p1[Z], p2[Z], gradient);
    var w = vdgeo.vd_cQ(p1[W], p2[W], gradient);
    if (z1 < 0) {
      p1[X] = x;
      p1[Y] = y;
      p1[Z] = 0;
      p1[W] = w;
    } else if (z2 < 0) {
      p2[X] = x;
      p2[Y] = y;
      p2[Z] = 0;
      p2[W] = w;
    }
  }
  if (p1[W]) {
    p1[X] /= p1[W];
    p1[Y] /= p1[W];
    p1[Z] /= p1[W];
  }
  if (p2[W]) {
    p2[X] /= p2[W];
    p2[Y] /= p2[W];
    p2[Z] /= p2[W];
  }
  return true;
};
vdgeo.vd_JA = function (pts, uvs) {
  var i = 0,
    n = 0;
  var uv1, uv2, u, v, d, vd_gT;
  var p1, p2, z1, z2, x, y, z, w, gradient;
  var vd_ag = [];
  if (uvs) vd_gT = [];
  for (i = 0; i < pts.length; i++) {
    p1 = [pts[i][X], pts[i][Y], pts[i][Z], pts[i][W]];
    if (uvs) {
      uv1 = [uvs[i][X], uvs[i][Y], uvs[i][Z]];
    }
    n = i + 1;
    if (n === pts.length) n = 0;
    p2 = [pts[n][X], pts[n][Y], pts[n][Z], pts[n][W]];
    if (uvs) {
      uv2 = [uvs[n][X], uvs[n][Y], uvs[n][Z]];
    }
    z1 = p1[Z];
    z2 = p2[Z];
    if (z1 < 0 && z2 < 0) continue;
    if (z1 < 0 || z2 < 0) {
      gradient = -p1[Z] / (p2[Z] - p1[Z]);
      x = vdgeo.vd_cQ(p1[X], p2[X], gradient);
      y = vdgeo.vd_cQ(p1[Y], p2[Y], gradient);
      z = vdgeo.vd_cQ(p1[Z], p2[Z], gradient);
      w = vdgeo.vd_cQ(p1[W], p2[W], gradient);
      if (uvs) {
        u = vdgeo.vd_lW(uv1[X], uv2[X], gradient);
        v = vdgeo.vd_lW(uv1[Y], uv2[Y], gradient);
        d = vdgeo.vd_lW(uv1[Z], uv2[Z], gradient);
      }
      if (z1 < 0) {
        p1[X] = x;
        p1[Y] = y;
        p1[Z] = z;
        p1[W] = w;
        if (uvs) {
          uv1[X] = u;
          uv1[Y] = v;
          uv1[Z] = d;
          vd_gT.push(uv1);
        }
        vd_ag.push(p1);
      } else if (z2 < 0) {
        p2[X] = x;
        p2[Y] = y;
        p2[Z] = z;
        p2[W] = w;
        if (uvs) {
          uv2[X] = u;
          uv2[Y] = v;
          uv2[Z] = d;
          vd_gT.push(uv1);
          vd_gT.push(uv2);
        }
        vd_ag.push(p1);
        vd_ag.push(p2);
      }
    } else {
      vd_ag.push(p1);
      if (uvs) vd_gT.push(uv1);
    }
  }
  for (i = 0; i < vd_ag.length; i++) {
    if (vd_ag[i][W]) {
      vd_ag[i][X] /= vd_ag[i][W];
      vd_ag[i][Y] /= vd_ag[i][W];
      vd_ag[i][Z] /= vd_ag[i][W];
      if (uvs && vd_gT[i][Z] != 0) {
        vd_gT[i][X] /= vd_ag[i][W];
        vd_gT[i][Y] /= vd_ag[i][W];
        vd_gT[i][Z] /= vd_ag[i][W];
      }
    }
  }
  return [vd_ag, vd_gT];
};
vdgeo.vd_dX = function (x, y, z, projection, vd_an) {
  vd_an[X] =
    x * projection[A00] +
    y * projection[A01] +
    z * projection[A02] +
    projection[A03];
  vd_an[Y] =
    x * projection[A10] +
    y * projection[A11] +
    z * projection[A12] +
    projection[A13];
  vd_an[Z] =
    x * projection[A20] +
    y * projection[A21] +
    z * projection[A22] +
    projection[A23];
  vd_an[W] =
    x * projection[A30] +
    y * projection[A31] +
    z * projection[A32] +
    projection[A33];
};
vdgeo.vd_bp = function (x, y, z, projection) {
  var vd_an = vdgeo.newpoint(0, 0, 0);
  vdgeo.vd_dX(x, y, z, projection, vd_an);
  if (vd_an[W]) {
    vd_an[X] /= vd_an[W];
    vd_an[Y] /= vd_an[W];
    vd_an[Z] /= vd_an[W];
  }
  return vd_an;
};
vdgeo.vd_cZ = function (pt, projection) {
  return vdgeo.vd_bp(pt[X], pt[Y], pt[Z], projection);
};
vdgeo.vd_DX = function (m) {
  if (vdgeo.AreEqual(m[A22], 0.0, vdgeo.DefaultVectorEquality)) return false;
  m[A20] = m[A21] = m[A23] = m[A02] = m[A12] = 0.0;
  return true;
};
vdgeo.vd_QQ = function (m) {
  var ret = vdgeo.vd_ci(m);
  if (!vdgeo.vd_DX(ret)) return null;
  return ret;
};
vdgeo.vd_gi = function (m, x, y, z) {
  return vdgeo.newpoint(
    m[A00] * x + m[A01] * y + m[A02] * z + m[A03],
    m[A10] * x + m[A11] * y + m[A12] * z + m[A13],
    m[A20] * x + m[A21] * y + m[A22] * z + m[A23]
  );
};
vdgeo.vd_vG = function (m, x, y, z, pt) {
  pt[X] = m[A00] * x + m[A01] * y + m[A02] * z + m[A03];
  pt[Y] = m[A10] * x + m[A11] * y + m[A12] * z + m[A13];
  pt[Z] = m[A20] * x + m[A21] * y + m[A22] * z + m[A23];
};
vdgeo.matrixtransform = function (m, pt) {
  return vdgeo.vd_gi(m, pt[X], pt[Y], pt[Z]);
};
vdgeo.vd_eU = function (m, pt, vd_bn) {
  vd_bn[X] = m[A00] * pt[X] + m[A01] * pt[Y] + m[A02] * pt[Z] + m[A03];
  vd_bn[Y] = m[A10] * pt[X] + m[A11] * pt[Y] + m[A12] * pt[Z] + m[A13];
  vd_bn[Z] = m[A20] * pt[X] + m[A21] * pt[Y] + m[A22] * pt[Z] + m[A23];
};
vdgeo.vd_KI = function (m, x, y, z, vd_bn) {
  vd_bn[X] = m[A00] * x + m[A01] * y + m[A02] * z + m[A03];
  vd_bn[Y] = m[A10] * x + m[A11] * y + m[A12] * z + m[A13];
};
vdgeo.vd_lt = function (m, x, y, z, normalize) {
  var v = vdgeo.newpoint();
  vdgeo.vd_oH(m, x, y, z, v, normalize);
  return v;
};
vdgeo.vd_oH = function (m, x, y, z, v, normalize) {
  v[X] = m[A00] * x + m[A01] * y + m[A02] * z;
  v[Y] = m[A10] * x + m[A11] * y + m[A12] * z;
  v[Z] = m[A20] * x + m[A21] * y + m[A22] * z;
  if (normalize === true) vdgeo.vd_cN(v);
};
vdgeo.vd_tf = function (m, pt, vd_nR) {
  var ret = [0, 0, 0, 0];
  ret[X] = m[A00] * pt[X] + m[A01] * pt[Y] + m[A02] * pt[Z] + m[A03];
  ret[Y] = m[A10] * pt[X] + m[A11] * pt[Y] + m[A12] * pt[Z] + m[A13];
  ret[Z] = m[A20] * pt[X] + m[A21] * pt[Y] + m[A22] * pt[Z] + m[A23];
  if (vd_nR == undefined) vd_nR = vdgeo.vd_oN(m);
  ret[B] = pt[B] * (vd_nR ? -1.0 : 1.0);
  return ret;
};
vdgeo.vd_rQ = function (m, pts) {
  var vd_nR = vdgeo.vd_oN(m);
  var ret = [];
  for (var i = 0; i < pts.length; i++) {
    ret.push(vdgeo.vd_tf(m, pts[i], vd_nR));
  }
  return ret;
};
vdgeo.vd_Cv = function (m, x, y, vd_bn) {
  vd_bn[X] = m[A00] * x + m[A01] * y + m[A03];
  vd_bn[Y] = m[A10] * x + m[A11] * y + m[A13];
};
vdgeo.vd_eq = function (m, pts) {
  var ret = [];
  for (var i = 0; i < pts.length; i++) {
    ret.push(vdgeo.matrixtransform(m, pts[i]));
  }
  return ret;
};
vdgeo.vd_Pm = function (m, pts) {
  var ret = [];
  ret.length = pts.length;
  for (var i = 0; i < pts.length; i++) {
    ret[i] = vdgeo.newpoint(
      m[A00] * pts[i][X] + m[A01] * pts[i][Y] + m[A02] * pts[i][Z] + m[A03],
      m[A10] * pts[i][X] + m[A11] * pts[i][Y] + m[A12] * pts[i][Z] + m[A13]
    );
  }
  return ret;
};
vdgeo.vd_Is = function (box) {
  return vdgeo.MidPoint([box[0], box[1], box[2]], [box[3], box[4], box[5]]);
};
vdgeo.vd_rH = function (m, box) {
  var b1 = vdgeo.matrixtransform(m, vdgeo.newpoint(box[0], box[1], box[2]));
  var b2 = vdgeo.matrixtransform(m, vdgeo.newpoint(box[0], box[4], box[2]));
  var b3 = vdgeo.matrixtransform(m, vdgeo.newpoint(box[3], box[4], box[2]));
  var b4 = vdgeo.matrixtransform(m, vdgeo.newpoint(box[3], box[1], box[2]));
  var b5 = vdgeo.matrixtransform(m, vdgeo.newpoint(box[0], box[1], box[5]));
  var b6 = vdgeo.matrixtransform(m, vdgeo.newpoint(box[0], box[4], box[5]));
  var b7 = vdgeo.matrixtransform(m, vdgeo.newpoint(box[3], box[4], box[5]));
  var b8 = vdgeo.matrixtransform(m, vdgeo.newpoint(box[3], box[1], box[5]));
  return [
    Math.min(b1[X], b2[X], b3[X], b4[X], b5[X], b6[X], b7[X], b8[X]),
    Math.min(b1[Y], b2[Y], b3[Y], b4[Y], b5[Y], b6[Y], b7[Y], b8[Y]),
    Math.min(b1[Z], b2[Z], b3[Z], b4[Z], b5[Z], b6[Z], b7[Z], b8[Z]),
    Math.max(b1[X], b2[X], b3[X], b4[X], b5[X], b6[X], b7[X], b8[X]),
    Math.max(b1[Y], b2[Y], b3[Y], b4[Y], b5[Y], b6[Y], b7[Y], b8[Y]),
    Math.max(b1[Z], b2[Z], b3[Z], b4[Z], b5[Z], b6[Z], b7[Z], b8[Z]),
  ];
};
vdgeo.vd_jL = function (m1, m2) {
  var ret = vdgeo.vd_ci(m1);
  vdgeo.vd_cW(ret, m2);
  return ret;
};
vdgeo.vd_lT = function (pts) {
  if (pts.length === 0) return null;
  var vd_ay = new vd_hd();
  for (var i = 1; i < pts.length; i++) {
    vd_ay.AddPoint(pts[i]);
  }
  return vd_ay.vd_hl();
};
vdgeo.vd_Gm = function (vd_cD, vd_dB, vd_dz, vd_bX, p1, p2, vd_W, vd_a) {
  var vd_bD = 0,
    vd_cc = 0;
  var done = false;
  vd_W[X] = p1[X];
  vd_W[Y] = p1[Y];
  vd_W[Z] = p1[Z];
  vd_a[X] = p2[X];
  vd_a[Y] = p2[Y];
  vd_a[Z] = p2[Z];
  var vd_hw;
  vd_hw = 0;
  done = false;
  do {
    vd_bD = vd_cc = 0;
    if (vd_W[X] < vd_cD) {
      vd_bD |= 1;
    } else if (vd_W[X] > vd_dz) {
      vd_bD |= 2;
    }
    if (vd_W[Y] < vd_dB) {
      vd_bD |= 4;
    } else if (vd_W[Y] > vd_bX) {
      vd_bD |= 8;
    }
    if (vd_a[X] < vd_cD) {
      vd_cc |= 1;
    } else if (vd_a[X] > vd_dz) {
      vd_cc |= 2;
    }
    if (vd_a[Y] < vd_dB) {
      vd_cc |= 4;
    } else if (vd_a[Y] > vd_bX) {
      vd_cc |= 8;
    }
    if ((vd_bD & vd_cc) > 0) {
      done = true;
      vd_hw = 1;
    } else {
      if ((vd_bD | vd_cc) === 0) {
        done = true;
      } else {
        vd_hw = 2;
        if (vd_bD === 0) {
          if ((vd_cc & 8) > 0) {
            vd_a[X] +=
              (vd_bX - vd_a[Y]) * ((vd_W[X] - vd_a[X]) / (vd_W[Y] - vd_a[Y]));
            vd_a[Y] = vd_bX;
          } else if ((vd_cc & 4) > 0) {
            vd_a[X] +=
              (vd_dB - vd_a[Y]) * ((vd_W[X] - vd_a[X]) / (vd_W[Y] - vd_a[Y]));
            vd_a[Y] = vd_dB;
          } else if ((vd_cc & 2) > 0) {
            vd_a[Y] +=
              (vd_dz - vd_a[X]) * ((vd_W[Y] - vd_a[Y]) / (vd_W[X] - vd_a[X]));
            vd_a[X] = vd_dz;
          } else if ((vd_cc & 1) > 0) {
            vd_a[Y] +=
              (vd_cD - vd_a[X]) * ((vd_W[Y] - vd_a[Y]) / (vd_W[X] - vd_a[X]));
            vd_a[X] = vd_cD;
          }
        } else {
          if ((vd_bD & 8) > 0) {
            vd_W[X] +=
              (vd_bX - vd_W[Y]) * ((vd_a[X] - vd_W[X]) / (vd_a[Y] - vd_W[Y]));
            vd_W[Y] = vd_bX;
          } else if ((vd_bD & 4) > 0) {
            vd_W[X] +=
              (vd_dB - vd_W[Y]) * ((vd_a[X] - vd_W[X]) / (vd_a[Y] - vd_W[Y]));
            vd_W[Y] = vd_dB;
          } else if ((vd_bD & 2) > 0) {
            vd_W[Y] +=
              (vd_dz - vd_W[X]) * ((vd_a[Y] - vd_W[Y]) / (vd_a[X] - vd_W[X]));
            vd_W[X] = vd_dz;
          } else if ((vd_bD & 1) > 0) {
            vd_W[Y] +=
              (vd_cD - vd_W[X]) * ((vd_a[Y] - vd_W[Y]) / (vd_a[X] - vd_W[X]));
            vd_W[X] = vd_cD;
          }
        }
      }
    }
  } while (!done);
  if (vd_hw !== 1) {
    var vd_ws = 0,
      vd_wz = 0;
    if (p2[X] - p1[X] != 0.0) {
      vd_ws = (vd_W[X] - p1[X]) / (p2[X] - p1[X]);
      vd_wz = (vd_a[X] - p1[X]) / (p2[X] - p1[X]);
    } else if (p2[Y] - p1[Y] != 0.0) {
      vd_ws = (vd_W[Y] - p1[Y]) / (p2[Y] - p1[Y]);
      vd_wz = (vd_a[Y] - p1[Y]) / (p2[Y] - p1[Y]);
    }
    vd_W[Z] = vdgeo.vd_lW(p1[Z], p2[Z], vd_ws);
    vd_a[Z] = vdgeo.vd_lW(p1[Z], p2[Z], vd_wz);
  }
  return vd_hw;
};
vdgeo.vd_Fi = function (vd_cD, vd_dB, vd_dz, vd_bX, p1, p2, vd_W, vd_a) {
  var vd_bD = 0,
    vd_cc = 0;
  var done = false;
  vd_W[X] = p1[X];
  vd_W[Y] = p1[Y];
  vd_a[X] = p2[X];
  vd_a[Y] = p2[Y];
  var vd_hw;
  vd_hw = 0;
  done = false;
  do {
    vd_bD = vd_cc = 0;
    if (vd_W[X] < vd_cD) {
      vd_bD |= 1;
    } else if (vd_W[X] > vd_dz) {
      vd_bD |= 2;
    }
    if (vd_W[Y] < vd_dB) {
      vd_bD |= 4;
    } else if (vd_W[Y] > vd_bX) {
      vd_bD |= 8;
    }
    if (vd_a[X] < vd_cD) {
      vd_cc |= 1;
    } else if (vd_a[X] > vd_dz) {
      vd_cc |= 2;
    }
    if (vd_a[Y] < vd_dB) {
      vd_cc |= 4;
    } else if (vd_a[Y] > vd_bX) {
      vd_cc |= 8;
    }
    if ((vd_bD & vd_cc) > 0) {
      done = true;
      vd_hw = 1;
    } else {
      if ((vd_bD | vd_cc) === 0) {
        done = true;
      } else {
        vd_hw = 2;
        if (vd_bD === 0) {
          if ((vd_cc & 8) > 0) {
            vd_a[X] +=
              (vd_bX - vd_a[Y]) * ((vd_W[X] - vd_a[X]) / (vd_W[Y] - vd_a[Y]));
            vd_a[Y] = vd_bX;
          } else if ((vd_cc & 4) > 0) {
            vd_a[X] +=
              (vd_dB - vd_a[Y]) * ((vd_W[X] - vd_a[X]) / (vd_W[Y] - vd_a[Y]));
            vd_a[Y] = vd_dB;
          } else if ((vd_cc & 2) > 0) {
            vd_a[Y] +=
              (vd_dz - vd_a[X]) * ((vd_W[Y] - vd_a[Y]) / (vd_W[X] - vd_a[X]));
            vd_a[X] = vd_dz;
          } else if ((vd_cc & 1) > 0) {
            vd_a[Y] +=
              (vd_cD - vd_a[X]) * ((vd_W[Y] - vd_a[Y]) / (vd_W[X] - vd_a[X]));
            vd_a[X] = vd_cD;
          }
        } else {
          if ((vd_bD & 8) > 0) {
            vd_W[X] +=
              (vd_bX - vd_W[Y]) * ((vd_a[X] - vd_W[X]) / (vd_a[Y] - vd_W[Y]));
            vd_W[Y] = vd_bX;
          } else if ((vd_bD & 4) > 0) {
            vd_W[X] +=
              (vd_dB - vd_W[Y]) * ((vd_a[X] - vd_W[X]) / (vd_a[Y] - vd_W[Y]));
            vd_W[Y] = vd_dB;
          } else if ((vd_bD & 2) > 0) {
            vd_W[Y] +=
              (vd_dz - vd_W[X]) * ((vd_a[Y] - vd_W[Y]) / (vd_a[X] - vd_W[X]));
            vd_W[X] = vd_dz;
          } else if ((vd_bD & 1) > 0) {
            vd_W[Y] +=
              (vd_cD - vd_W[X]) * ((vd_a[Y] - vd_W[Y]) / (vd_a[X] - vd_W[X]));
            vd_W[X] = vd_cD;
          }
        }
      }
    }
  } while (!done);
  return vd_hw;
};
vdgeo.vd_Iu = function (x1, y1, z1, x2, y2, z2, x, y) {
  var gradient = 0;
  if (x2 - x1 != 0.0) {
    gradient = (x - x1) / (x2 - x1);
  } else if (y2 - y1 != 0.0) {
    gradient = (y - y1) / (y2 - y1);
  } else {
    gradient = 0;
  }
  return vdgeo.vd_lW(z1, z2, gradient);
};
vdgeo.vd_GY = function (value) {
  return Math.max(0, Math.min(value, 1));
};
vdgeo.vd_lW = function (min, max, gradient) {
  return min + (max - min) * vdgeo.vd_GY(gradient);
};
vdgeo.vd_cQ = function (min, max, gradient) {
  return min + (max - min) * gradient;
};
vdgeo.vd_JG = 0.017453292519943;
vdgeo.EPSILON = 4.94066e-324;
vdgeo.INCH_MM = 25.4;
vdgeo.VD_TWOPI = 6.2831853071796;
vdgeo.HALF_PI = 1.5707963267948;
vdgeo.PI = 3.1415926535898;
vdgeo.VD_270PI = 4.7123889803844;
vdgeo.vd_ql = 0.00001;
vdgeo.DefaultLinearEquality = 0.00000001;
vdgeo.DefaultPointEquality = 0.00000001;
vdgeo.DefaultVectorEquality = 0.000001;
vdgeo.DefaultAngularEquality = 0.000001;
vdgeo.vd_Eh = 0.000001;
vdgeo.vd_OM = 0.000001;
vdgeo.DefaultScaleEquality = 0.0000000001;
vdgeo.vd_Dg = 0.0000000001;
vdgeo.vd_Lk = 1.0e9;
vdgeo.CURVERESOLUTION = 200;
vdgeo.vd_KC = false;
vdgeo.AreEqual = function (val1, val2, eq) {
  return Math.abs(val1 - val2) <= eq;
};
vdgeo.DegreesToRadians = function (vd_Hy) {
  return (vdgeo.PI / 180.0) * vd_Hy;
};
vdgeo.RadiansToDegrees = function (vd_Le) {
  return vd_Le * (180.0 / vdgeo.PI);
};
vdgeo.vd_MR = function (vd_fa, vd_fL) {
  if (!vdgeo.vd_KC) return false;
  return (
    vdgeo.AreEqual(vd_fa, vd_fL, vdgeo.DefaultLinearEquality) ||
    vdgeo.AreEqual(
      Math.abs(vd_fL - vd_fa),
      vdgeo.VD_TWOPI,
      vdgeo.DefaultLinearEquality
    )
  );
};
vdgeo.FixAngle = function (vd_jx, vd_ce) {
  if (vd_ce == undefined) vd_ce = vdgeo.DefaultAngularEquality;
  if (vdgeo.AreEqual(vd_jx, vdgeo.VD_TWOPI, vd_ce)) return vdgeo.VD_TWOPI;
  var angle = vd_jx;
  angle = angle % vdgeo.VD_TWOPI;
  if (angle > vdgeo.VD_TWOPI + vd_ce) angle -= vdgeo.VD_TWOPI;
  if (angle + vd_ce < 0.0) angle += vdgeo.VD_TWOPI;
  if (vdgeo.AreEqual(angle, 0.0, vd_ce)) return 0.0;
  if (vdgeo.AreEqual(angle, vdgeo.HALF_PI, vd_ce)) return vdgeo.HALF_PI;
  if (vdgeo.AreEqual(angle, vdgeo.PI, vd_ce)) return vdgeo.PI;
  if (vdgeo.AreEqual(angle, vdgeo.VD_270PI, vd_ce)) return vdgeo.VD_270PI;
  if (vdgeo.AreEqual(angle, vdgeo.VD_TWOPI, vd_ce)) return vdgeo.VD_TWOPI;
  return angle;
};
vdgeo.vd_sW = function (vd_bP, rad, sa, ea, elevation) {
  var da = ea - sa;
  da = vdgeo.FixAngle(da);
  if (vdgeo.vd_MR(sa, ea)) da = vdgeo.VD_TWOPI;
  var vd_iB = da / vd_bP;
  var aa = vdgeo.FixAngle(sa);
  var vd_pT = [];
  for (var i = 0; i < vd_bP; i++) {
    vd_pT.push(
      vdgeo.newpoint(rad * Math.cos(aa), rad * Math.sin(aa), elevation)
    );
    aa = aa + vd_iB;
  }
  return vd_pT;
};
vdgeo.vd_iy = function (vd_dh, vd_eu, Radius, vd_kY) {
  vd_kY = vdgeo.FixAngle(vd_kY);
  var nseg;
  var vd_uH, ar1;
  var vd_rb, vd_rB, fi1;
  vd_rB = 400;
  if (vd_dh > 1000) vd_rB *= vd_dh / 1000;
  vd_uH = vd_kY / vdgeo.VD_TWOPI;
  if ((vd_rb = vdgeo.vd_r(8.99 * vd_uH)) < 1) vd_rb = 1;
  ar1 = 0.3222 * Math.sqrt((vd_dh * Radius) / vd_eu);
  ar1 *= vd_uH;
  if (ar1 < vd_rb) ar1 = vd_rb;
  else if (ar1 > vd_rB) ar1 = vd_rB;
  nseg = vdgeo.vd_r(ar1);
  if (
    Math.abs(vd_uH - 1.0) < vdgeo.DefaultLinearEquality &&
    (fi1 = nseg % 4) != 0
  )
    nseg += 4 - fi1;
  return Math.max(nseg, 8);
};
vdgeo.vd_uS = function (vd_dh, vd_eu, vd_lF, vd_bv) {
  var vd_ol = 0.0;
  for (var k = 1; k < vd_lF.length - 1; k++) {
    vd_ol = Math.max(vdgeo.Distance3D(vd_lF[k], vd_lF[k + 1]), vd_ol);
  }
  if (vd_bv) {
    vd_ol = Math.max(
      vdgeo.Distance3D(vd_lF[vd_lF.length - 1], vd_lF[0]),
      vd_ol
    );
  }
  var vd_bP = vdgeo.vd_iy(vd_dh, vd_eu, vd_ol / 2.0, vdgeo.PI);
  return Math.min(vd_bP, 100);
};
vdgeo.Bulge2Arc = function (p1, p2) {
  if (!p1[B] || vdgeo.AreEqual(p1[B], 0.0, vdgeo.vd_Eh)) return null;
  vd_gV = vdgeo.Distance2D(p1, p2);
  if (vdgeo.AreEqual(vd_gV, 0.0, vdgeo.vd_Eh)) return null;
  var Center = null,
    Radius = 0.0,
    vd_fu = 0.0,
    vd_ho = 0.0;
  var vd_gV, vd_qR;
  vd_qR = (p1[B] * vd_gV) / 2.0;
  Radius = ((vd_gV / 2.0) * (vd_gV / 2.0) + vd_qR * vd_qR) / (vd_qR * 2.0);
  Center = vdgeo.MidPoint(p1, p2);
  Center = vdgeo.pointPolar(
    Center,
    vdgeo.GetAngle(p1, p2) + vdgeo.PI / 2.0,
    Radius - vd_qR
  );
  vd_fu = vdgeo.GetAngle(Center, p1[B] > 0 ? p1 : p2);
  vd_ho = vdgeo.GetAngle(Center, p1[B] > 0 ? p2 : p1);
  Radius = Math.abs(Radius);
  return [Center, Radius, vd_fu, vd_ho];
};
vdgeo.Arc2Bulge = function (Radius, vd_CB) {
  var alt = Math.abs(Radius - Math.cos(vd_CB / 2.0) * Radius);
  var vd_gV = (2.0 * alt) / Math.tan(vd_CB / 4.0);
  if (vdgeo.AreEqual(vd_gV, 0.0, vdgeo.DefaultLinearEquality)) return 0.0;
  var vd_hA = (2.0 * alt) / vd_gV;
  return vd_hA;
};
function vd_pF(vd_bP, pts, pA, pB, pC) {
  var t,
    x,
    y,
    z = pA[Z];
  for (var i = 1; i < vd_bP - 1; i++) {
    t = i / vd_bP;
    x =
      (pA[X] - 2.0 * pB[X] + pC[X]) * t * t +
      (2.0 * pB[X] - 2.0 * pA[X]) * t +
      pA[X];
    y =
      (pA[Y] - 2.0 * pB[Y] + pC[Y]) * t * t +
      (2.0 * pB[Y] - 2.0 * pA[Y]) * t +
      pA[Y];
    pts.push(vdgeo.newpoint(x, y, z));
  }
  pts.push(vdgeo.newpoint(pC[X], pC[Y], pC[Z]));
}
vdgeo.vd_HB = function (vd_bP, vd_bH) {
  var Points = [];
  var pts = [];
  pts.length = 3;
  pts[0] = vd_bH[0];
  for (var k = 1; k < vd_bH.length; k++) {
    pts[1] = vd_bH[k];
    Points.push(vdgeo.newpoint(pts[0][X], pts[0][Y], pts[0][Z]));
    if (k < vd_bH.length - 1) {
      pts[2] = vd_bH[k + 1];
      if (k + 1 != vd_bH.length - 1) pts[2] = vdgeo.MidPoint(pts[1], pts[2]);
    }
    vd_pF(vd_bP, Points, pts[0], pts[1], pts[2]);
    pts[0] = pts[2];
  }
  return Points;
};
vdgeo.vd_xt = function (vd_dh, vd_eu, vd_bH, vd_bv) {
  var vd_bP = vdgeo.vd_uS(vd_dh, vd_eu, vd_bH, vd_bv);
  var Points = [];
  var pts = [];
  pts.length = 3;
  pts[0] = vd_bH[0];
  for (var k = 1; k < vd_bH.length; k++) {
    pts[1] = vd_bH[k];
    if (k === 1 && vd_bv) {
      pts[0] = vdgeo.MidPoint(pts[0], pts[1]);
    }
    Points.push(vdgeo.newpoint(pts[0][X], pts[0][Y], pts[0][Z]));
    if (k < vd_bH.length - 1) {
      pts[2] = vd_bH[k + 1];
      if (k + 1 != vd_bH.length - 1 || vd_bv)
        pts[2] = vdgeo.MidPoint(pts[1], pts[2]);
    } else {
      if (!vd_bv) break;
      pts[1] = vd_bH[vd_bH.length - 1];
      pts[2] = vd_bH[0];
      pts[2] = vdgeo.MidPoint(pts[1], pts[2]);
      vd_pF(vd_bP, Points, pts[0], pts[1], pts[2]);
      pts[0] = pts[2];
      pts[1] = vd_bH[0];
      pts[2] = Points[0];
      vd_pF(vd_bP, Points, pts[0], pts[1], pts[2]);
      pts[0] = pts[2];
      break;
    }
    vd_pF(vd_bP, Points, pts[0], pts[1], pts[2]);
    pts[0] = pts[2];
  }
  return Points;
};
vdgeo.vd_sU = function (vd_dh, vd_eu, vd_bH, vd_bv, StartTangent, EndTangent) {
  var vd_he = vdgeo.vd_uS(vd_dh, vd_eu, vd_bH, vd_bv);
  var vd_nN = vd_HN(vd_bH, StartTangent, EndTangent, vd_bv);
  if (vd_nN == null) return vd_bH;
  return vd_nN.vd_yg(vd_he);
};
vdgeo.vd_uz = function (vd_dh, vd_eu, vd_bH, vd_fD, vd_aI, vd_bv) {
  var vd_he = vdgeo.vd_uS(vd_dh, vd_eu, vd_bH, vd_bv);
  var vd_nN = new vdgeo.vd_vp(vd_bH, vd_bv, 3, vd_fD, vd_aI);
  return vd_nN.vd_yg(vd_he);
};
vdgeo.vd_HG = function (vd_dh, vd_eu, vd_bH, vd_fD, vd_aI, vd_bv) {
  var vd_he = vdgeo.vd_uS(vd_dh, vd_eu, vd_bH, vd_bv);
  var vd_nN = new vdgeo.vd_vp(vd_bH, vd_bv, 2, vd_fD, vd_aI);
  return vd_nN.vd_yg(vd_he);
};
vdgeo.vd_Er = function (pl, p1) {
  if (!pl || !p1 || !pl.VertexList || pl._t !== vdConst.vdPolyline_code)
    return null;
  var vd_kM = pl.ExtrusionVector;
  if (!vd_kM) vd_kM = vdgeo.newpoint(0, 0, 1);
  var vd_kA = vdgeo.vd_Q();
  vdgeo.vd_cn(vd_kA, vd_kM);
  var vd_ic = vdgeo.vd_bu(vd_kA);
  var vd_br = vdgeo.vd_rQ(vd_ic, pl.VertexList.Items);
  var vd_bv = pl.Flag === 1;
  var pt1 = vdgeo.matrixtransform(vd_ic, p1);
  var vd_oJ = {};
  var vd_lv = vdgeo.GetPlineSegmentIndexFromPoint(
    pt1,
    vd_br,
    vd_bv,
    null,
    vd_oJ
  );
  if (vd_lv < 0 || !vd_oJ.pt) return null;
  var sp1, ep1, arc1, a, b, a0, b0;
  pt1 = vdgeo.matrixtransform(vd_ic, vd_oJ.pt);
  sp1 = vd_br[vd_lv];
  if (vd_lv === vd_br.length - 1) ep1 = vd_br[0];
  else ep1 = vd_br[vd_lv + 1];
  sp1 = vdgeo.vd_tf(vd_ic, sp1);
  ep1 = vdgeo.vd_tf(vd_ic, ep1);
  arc1 = vdgeo.Bulge2Arc(sp1, ep1);
  if (!arc1) {
    b = 0.0;
    b0 = 0.0;
  } else {
    if (sp1[B] > 0.0) {
      a = vdgeo.FixAngle(arc1[3] - vdgeo.GetAngle(arc1[0], pt1));
      a0 = vdgeo.FixAngle(vdgeo.GetAngle(arc1[0], pt1) - arc1[2]);
    } else {
      a = vdgeo.FixAngle(vdgeo.GetAngle(arc1[0], pt1) - arc1[2]);
      a0 = vdgeo.FixAngle(arc1[3] - vdgeo.GetAngle(arc1[0], pt1));
    }
    b = (vdgeo.Arc2Bulge(arc1[1], a) * Math.abs(sp1[B])) / sp1[B];
    b0 = (vdgeo.Arc2Bulge(arc1[1], a0) * Math.abs(sp1[B])) / sp1[B];
  }
  pl.VertexList.Items[vd_lv][B] = b0;
  var nv = vdgeo.vd_tf(vd_kA, [pt1[X], pt1[Y], pt1[Z], b]);
  pl.VertexList.Items.splice(vd_lv + 1, 0, nv);
  return [vd_lv + 1, vd_oJ.offset, vd_oJ.vd_Lt];
};
vdgeo.GetPlineSegmentIndexFromPoint = function (
  pt,
  vd_br,
  vd_bv,
  vd_kM,
  vd_nm
) {
  if (!vd_kM) vd_kM = vdgeo.newpoint(0, 0, 1);
  var vd_kA = vdgeo.vd_Q();
  vdgeo.vd_cn(vd_kA, vd_kM);
  var vd_ic = vdgeo.vd_bu(vd_kA);
  var vd_bc = vdgeo.vd_rQ(vd_ic, vd_br);
  var p = vdgeo.matrixtransform(vd_ic, pt);
  var Center, sp, ep;
  var radius = 0.0,
    vd_fa = 0.0,
    vd_fL = 0.0;
  var success = false;
  var sa, ea, pa, vd_uO;
  var vd_mo = null;
  var vd_tc = false;
  var dist = 0.0;
  var vd_ub = null;
  var vd_ET = -1;
  var vd_vb = 0.0;
  var vd_dF = 0.0;
  var offset = 0.0;
  for (var i = 0; i <= vd_bc.length - 1; i++) {
    sp = vd_bc[i];
    if (i == vd_bc.length - 1) {
      if (!vd_bv) break;
      ep = vd_bc[0];
    } else {
      ep = vd_bc[i + 1];
    }
    success = vdgeo.Bulge2Arc(sp, ep);
    if (success == null) {
      vd_mo = vdgeo.projectionPointOnLine(p, sp, ep);
      vd_dF = vdgeo.Distance3D(sp, ep);
      offset = vdgeo.Distance3D(vd_mo, sp);
      vd_tc = vdgeo.AreEqual(
        offset + vdgeo.Distance3D(vd_mo, ep),
        vd_dF,
        vdgeo.DefaultLinearEquality
      );
    } else {
      Center = success[0];
      radius = success[1];
      vd_fa = success[2];
      vd_fL = success[3];
      ea = vdgeo.FixAngle(vd_fL - vd_fa);
      sa = 0.0;
      vd_uO = vdgeo.GetAngle(Center, p);
      pa = vdgeo.FixAngle(vd_uO - vd_fa);
      vd_dF = radius * ea;
      if (sp[B] > 0.0) offset = radius * pa;
      else offset = radius * vdgeo.FixAngle(vd_fL - vd_uO);
      vd_mo = vdgeo.pointPolar(Center, vd_uO, radius);
      vd_tc = pa <= ea;
    }
    if (vd_tc) {
      dist = vdgeo.Distance3D(vd_mo, p);
    } else {
      dist = Math.min(vdgeo.Distance3D(sp, p), vdgeo.Distance3D(ep, p));
    }
    if (vd_ub === null || dist < vd_ub) {
      vd_ub = dist;
      vd_ET = i;
      if (vd_nm) {
        if (vd_tc) {
          vd_nm.pt = vdgeo.matrixtransform(vd_kA, vd_mo);
          vd_nm.offset = vd_vb + offset;
        } else {
          vd_nm.pt = null;
        }
      }
    }
    vd_vb += vd_dF;
  }
  if (vd_nm) vd_nm.vd_Lt = vd_vb;
  return vd_ET;
};
vdgeo.vd_Hw = function (vd_bc, vd_dh, vd_eu, vd_bv) {
  var SamplePoints = [];
  var vd_bP = 8;
  var apts;
  var Center = vdgeo.newpoint(0, 0, 0);
  var radius = 0.0,
    vd_fa = 0.0,
    vd_fL = 0.0;
  var success = false;
  var sp = null;
  var ep = null;
  for (var i = 0; i <= vd_bc.length - 1; i++) {
    sp = vd_bc[i];
    if (i == vd_bc.length - 1) {
      if (!vd_bv) break;
      ep = vd_bc[0];
    } else {
      ep = vd_bc[i + 1];
    }
    success = vdgeo.Bulge2Arc(sp, ep);
    if (success == null) {
      SamplePoints.push(vdgeo.vd_DU(sp[X], sp[Y], sp[Z], i));
    } else {
      Center = success[0];
      radius = success[1];
      vd_fa = success[2];
      vd_fL = success[3];
      vd_bP = vdgeo.vd_iy(vd_dh, vd_eu, radius, vdgeo.FixAngle(vd_fL - vd_fa));
      apts = vdgeo.vd_sW(vd_bP, radius, vd_fa, vd_fL, 0);
      apts.push(vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), vd_fL, radius));
      if (vd_bc[i][B] < 0.0) apts.reverse();
      var k;
      for (k = 0; k < apts.length; k++)
        vdgeo.vd_LL(apts[k], Center[X], Center[Y], Center[Z]);
      for (k = 0; k < apts.length - 1; k++) {
        apts[k][INDEX] = i;
        SamplePoints.push(apts[k]);
      }
    }
  }
  if (ep != null)
    SamplePoints.push(vdgeo.vd_DU(ep[X], ep[Y], ep[Z], vd_bc.length - 1));
  return SamplePoints;
};
vdgeo.vd_Io = function (p1, p2, p3, len) {
  var vd_jx = vdgeo.vd_kY(p1, p2, p3);
  if (
    vdgeo.AreEqual(vd_jx, 0, 0.001) ||
    vdgeo.AreEqual(vd_jx, vdgeo.PI, 0.001) ||
    vdgeo.AreEqual(vd_jx, vdgeo.VD_TWOPI, 0.001)
  ) {
    return vdgeo.pointPolar(
      [0, 0, 0],
      vdgeo.GetAngle(p1, p2) + vdgeo.HALF_PI,
      len
    );
  }
  var sinA = Math.sin(vd_jx * 0.5);
  if (!vdgeo.AreEqual(sinA, 0.0, vdgeo.DefaultAngularEquality)) len /= sinA;
  if (vd_jx < vdgeo.PI) len *= -1;
  var m_e0 = [p1[X] - p2[X], p1[Y] - p2[Y], p1[Z] - p2[Z]];
  var m_e1 = [p3[X] - p2[X], p3[Y] - p2[Y], p3[Z] - p2[Z]];
  vdgeo.vd_cN(m_e0);
  vdgeo.vd_cN(m_e1);
  var v = [
    (m_e0[X] + m_e1[X]) / 2.0,
    (m_e0[Y] + m_e1[Y]) / 2.0,
    (m_e0[Z] + m_e1[Z]) / 2.0,
  ];
  vdgeo.vd_cN(v);
  v[X] *= len;
  v[Y] *= len;
  v[Z] *= len;
  return v;
};
vdgeo.vd_Ic = function (vd_bc, vd_bv, width) {
  if (width == 0.0) return null;
  var vd_hi = [];
  var vd_wH = width / 2.0;
  var vd_pK = [0, 0, 0];
  var sp = null;
  var ep = null;
  var pp = null;
  var v = null;
  if (vd_bv && vd_bc.length < 4) vd_bv = false;
  for (var i = 0; i < vd_bc.length; i++) {
    sp = vd_bc[i];
    if (i === 0) {
      ep = vd_bc[i + 1];
      if (vd_bv) pp = vd_bc[vd_bc.length - 2];
      else pp = null;
    } else if (i === vd_bc.length - 1) {
      pp = vd_bc[i - 1];
      if (vd_bv) ep = vd_bc[1];
      else ep = null;
    } else {
      ep = vd_bc[i + 1];
      pp = vd_bc[i - 1];
    }
    if (!pp) {
      v = vdgeo.pointPolar(
        vd_pK,
        vdgeo.GetAngle(sp, ep) + vdgeo.HALF_PI,
        vd_wH
      );
    } else if (!ep) {
      v = vdgeo.pointPolar(
        vd_pK,
        vdgeo.GetAngle(pp, sp) + vdgeo.HALF_PI,
        vd_wH
      );
    } else {
      v = vdgeo.vd_Io(pp, sp, ep, vd_wH);
    }
    vd_hi.push(v);
  }
  return vd_hi;
};
vdgeo.vd_sz = function (angle, vd_ld, vd_nJ) {
  var vd_an = vdgeo.newpoint(0, 0, 0);
  if (
    vdgeo.AreEqual(vd_ld, 0.0, vdgeo.DefaultLinearEquality) ||
    vdgeo.AreEqual(vd_nJ, 0.0, vdgeo.DefaultLinearEquality)
  )
    return vd_an;
  angle = vdgeo.FixAngle(angle);
  var f = Math.tan(angle);
  vd_an[X] = Math.sqrt(
    (Math.pow(vd_ld, 2) * Math.pow(vd_nJ, 2)) /
      (Math.pow(vd_nJ, 2) + Math.pow(vd_ld, 2) * Math.pow(f, 2))
  );
  vd_an[Y] = Math.abs(vd_an[X] * f);
  if (angle >= 0.0 && angle < vdgeo.HALF_PI) {
  } else if (angle >= vdgeo.HALF_PI && angle < vdgeo.PI) {
    vd_an[X] *= -1.0;
  } else if (angle >= vdgeo.PI && angle < 3.0 * vdgeo.HALF_PI) {
    vd_an[X] *= -1.0;
    vd_an[Y] *= -1.0;
  } else if (angle >= 3.0 * vdgeo.HALF_PI && angle < vdgeo.VD_TWOPI) {
    vd_an[Y] *= -1.0;
  }
  return vd_an;
};
vdgeo.vd_rI = function (vd_dh, vd_eu, vd_ld, vd_kY) {
  return Math.max(vdgeo.vd_iy(vd_dh, vd_eu, vd_ld, vd_kY), 64);
};
vdgeo.vd_rT = function (vd_bP, vd_ld, vd_nJ, sa, ea) {
  if (vdgeo.AreEqual(sa, ea, vdgeo.DefaultAngularEquality))
    ea += vdgeo.VD_TWOPI;
  var da = vdgeo.FixAngle(ea - sa);
  var vd_iB = da / vd_bP;
  var aa = vdgeo.FixAngle(sa);
  var vd_pT = [];
  for (var i = 0; i < vd_bP + 1; i++) {
    vd_pT.push(vdgeo.vd_sz(aa, vd_ld, vd_nJ));
    aa = aa + vd_iB;
  }
  return vd_pT;
};
vdgeo.vd_ed = function (p1, p2, vd_ce) {
  return (
    vdgeo.AreEqual(p1[X], p2[X], vd_ce) &&
    vdgeo.AreEqual(p1[Y], p2[Y], vd_ce) &&
    vdgeo.AreEqual(p1[Z], p2[Z], vd_ce)
  );
};
vdgeo.vd_Em = function (pts) {
  return vdgeo.vd_ed(pts[0], pts[pts.length - 1], vdgeo.DefaultPointEquality);
};
vdgeo.vd_gu = function (p1, p2, p3, p4, vd_ce, vd_an) {
  var x1 = p1[X],
    x2 = p2[X],
    x3 = p3[X],
    x4 = p4[X],
    y1 = p1[Y],
    y2 = p2[Y],
    y3 = p3[Y],
    y4 = p4[Y];
  var dx = (x1 + x2 + x3 + x4) / 4.0;
  var dy = (y1 + y2 + y3 + y4) / 4.0;
  x1 -= dx;
  x2 -= dx;
  x3 -= dx;
  x4 -= dx;
  y1 -= dy;
  y2 -= dy;
  y3 -= dy;
  y4 -= dy;
  var A1 = y4 - y3;
  var B1 = x3 - x4;
  var A2 = y2 - y1;
  var B2 = x1 - x2;
  var DD = A1 * B2 - A2 * B1;
  if (vdgeo.AreEqual(DD, 0.0, vd_ce)) return 0;
  var G1 = x4 * y3 - x3 * y4;
  var G2 = x2 * y1 - x1 * y2;
  var DX = B1 * G2 - B2 * G1;
  var DY = A2 * G1 - A1 * G2;
  vd_an[X] = DX / DD + dx;
  vd_an[Y] = DY / DD + dy;
  vd_an[Z] = p1[Z];
  return 1;
};
vdgeo.vd_Hf = function (p1, p2, p3) {
  var mp1 = vdgeo.MidPoint(p1, p2);
  var mp2 = vdgeo.MidPoint(p2, p3);
  var mp1a = vdgeo.pointPolar(mp1, vdgeo.GetAngle(p1, p2) + vdgeo.HALF_PI, 1.0);
  var mp2a = vdgeo.pointPolar(mp2, vdgeo.GetAngle(p2, p3) + vdgeo.HALF_PI, 1.0);
  var vd_an = vdgeo.newpoint(0, 0, 0);
  vdgeo.vd_gu(mp1, mp1a, mp2, mp2a, vdgeo.DefaultVectorEquality, vd_an);
  return vd_an;
};
vdgeo.vd_GO = function (p1, p2, p3) {
  var sa = 0.0,
    sb = 0.0;
  sa += p1[X] * p2[Y];
  sb += p1[Y] * p2[X];
  sa += p2[X] * p3[Y];
  sb += p2[Y] * p3[X];
  sa += p3[X] * p1[Y];
  sb += p3[Y] * p1[X];
  return (sb - sa) / 2.0;
};
vdgeo.GetPointsArea = function (pts) {
  if (!pts || pts.length == 0) return 0.0;
  var sa = 0.0;
  var sb = 0.0;
  for (var i = 0; i < pts.length - 1; i++) {
    sa += pts[i][X] * pts[i + 1][Y];
    sb += pts[i][Y] * pts[i + 1][X];
  }
  sa += pts[pts.length - 1][X] * pts[0][Y];
  sb += pts[pts.length - 1][Y] * pts[0][X];
  return (sb - sa) / 2.0;
};
vdgeo.vd_Iv = function (vd_aO) {
  if (!vd_aO || vd_aO.length == 0) return 0.0;
  var area = vdgeo.GetPointsArea(vd_aO);
  var Center;
  var Radius;
  var vd_fu;
  var vd_ho;
  var vd_gV;
  var vd_yU;
  var alt;
  var vd_yI;
  var p1;
  var p2;
  for (var i = 0; i < vd_aO.length; i++) {
    p1 = vd_aO[i];
    if (i == vd_aO.length - 1) p2 = vd_aO[0];
    else p2 = vd_aO[i + 1];
    var ret = vdgeo.Bulge2Arc(p1, p2);
    if (!ret) continue;
    Center = ret[0];
    Radius = ret[1];
    vd_fu = ret[2];
    vd_ho = ret[3];
    vd_gV = vdgeo.Distance2D(p1, p2);
    vd_yU = Math.atan(Math.abs(p1[B])) * 4.0;
    alt = Radius - Radius * Math.cos(vd_yU / 2.0);
    vd_yI = (vd_yU / 2.0) * Radius * Radius;
    vd_yI += (vd_gV * (alt - Radius)) / 2.0;
    area += -1.0 * (p1[B] / Math.abs(p1[B])) * vd_yI;
  }
  return area;
};
vdgeo.vd_EU = function (vd_aO, closed) {
  if (!vd_aO || vd_aO.length == 0) return 0.0;
  var vd_tw = 0;
  var Center;
  var Radius;
  var vd_fu;
  var vd_ho;
  var p1;
  var p2;
  for (var i = 0; i < vd_aO.length; i++) {
    p1 = vd_aO[i];
    if (i == vd_aO.length - 1) {
      if (!closed) continue;
      p2 = vd_aO[0];
    } else p2 = vd_aO[i + 1];
    var ret = vdgeo.Bulge2Arc(p1, p2);
    if (!ret) {
      vd_tw += vdgeo.Distance3D(p1, p2);
    } else {
      Center = ret[0];
      Radius = ret[1];
      vd_fu = ret[2];
      vd_ho = ret[3];
      vd_tw += Radius * vdgeo.FixAngle(vd_ho - vd_fu);
    }
  }
  return vd_tw;
};
vdgeo.vd_mt = function (vd_aO, length, closed) {
  var vd_ag = [];
  if (!vd_aO || vd_aO.length == 0) return vd_ag;
  vd_ag.push(vdgeo.pointPolar(vd_aO[0], 0.0, 0.0));
  var cl = 0.0;
  var cl1 = 0.0;
  var Center;
  var Radius;
  var vd_fu;
  var vd_ho;
  var p1;
  var p2;
  for (var i = 0; i < vd_aO.length; i++) {
    p1 = vd_aO[i];
    if (i == vd_aO.length - 1) {
      if (!closed) continue;
      p2 = vd_aO[0];
    } else p2 = vd_aO[i + 1];
    var ret = vdgeo.Bulge2Arc(p1, p2);
    if (!ret) {
      vd_fu = vdgeo.GetAngle(p1, p2);
      cl1 = vdgeo.Distance3D(p1, p2);
      while (cl + cl1 + vdgeo.DefaultLinearEquality >= length) {
        p1 = vdgeo.pointPolar(p1, vd_fu, length - cl);
        vd_ag.push(p1);
        cl1 -= length - cl;
        cl = 0;
      }
    } else {
      Center = ret[0];
      Radius = ret[1];
      vd_fu = ret[2];
      vd_ho = ret[3];
      cl1 = Radius * vdgeo.FixAngle(vd_ho - vd_fu);
      while (cl + cl1 + vdgeo.DefaultLinearEquality >= length) {
        vd_fu += (length - cl) / Radius;
        p1 = vdgeo.pointPolar(Center, vd_fu, Radius);
        vd_ag.push(p1);
        cl1 -= length - cl;
        cl = 0;
      }
    }
    cl += cl1;
  }
  if (vd_ag.length == 1) vd_ag = [];
  return vd_ag;
};
function vd_Iz(vd_rJ, n, vd_eS) {
  var i = 0;
  var vd_aI = [];
  vd_aI.length = n;
  var prev = vd_rJ[0];
  vd_aI[0] = 0;
  for (i = 1; i < n; i++) {
    var curr = vd_rJ[i];
    var distance = vdgeo.Distance2D(prev, curr);
    vd_aI[i] = vd_aI[i - 1] + distance;
    prev = curr;
  }
  var vd_vH = n + 2 * vd_eS;
  var vd_eN = [];
  vd_eN.length = vd_vH;
  for (i = 0; i < vd_eS; i++) vd_eN[i] = vd_aI[0];
  for (i = 0; i < n; i++) vd_eN[i + vd_eS] = vd_aI[i];
  for (i = 1; i <= vd_eS; i++) vd_eN[vd_vH - i] = vd_aI[n - 1];
  return vd_eN;
}
function T(k, t) {
  var d = 3;
  return t[d - 1 + k];
}
function vd_Nj(nS, rAt, vd_aI) {
  var d = 3;
  var m = 0;
  var j = 0;
  var t = [];
  t.length = d * 2;
  for (j = 0, m = nS - d + 1; j < 2 * d; m++, j++) t[j] = vd_aI[m];
  var v = [];
  v[0] = [];
  v[0].length = 1;
  v[0][0] = 1.0;
  for (m = 1; m <= d; m++) {
    v[m] = [];
    v[m].length = m + 1;
    v[m][0] = v[m - 1][0] * ((T(1, t) - rAt) / (T(1, t) - T(-m + 1, t)));
    for (j = 1; j < m; j++) {
      v[m][j] =
        v[m - 1][j - 1] * ((rAt - T(-m + j, t)) / (T(j, t) - T(-m + j, t))) +
        v[m - 1][j] * ((T(j + 1, t) - rAt) / (T(j + 1, t) - T(-m + j + 1, t)));
    }
    v[m][m] = v[m - 1][m - 1] * ((rAt - T(0, t)) / (T(m, t) - T(0, t)));
  }
  return v[d];
}
function vd_Ni(alpha, beta, vd_eB, low, up) {
  up.length = beta.length;
  low.length = beta.length;
  up[0] = beta[0];
  for (var i = 1; i < beta.length; i++) {
    low[i] = alpha[i] / up[i - 1];
    up[i] = beta[i] - low[i] * vd_eB[i - 1];
  }
}
function vd_up(low, up, vd_eB, D, X) {
  var n = low.length;
  var i = 0;
  X.length = n;
  var y = [];
  y.length = n;
  y[0] = D[0];
  for (i = 1; i < n; i++) y[i] = D[i] - low[i] * y[i - 1];
  X[n - 1] = y[n - 1] / up[n - 1];
  for (i = n - 2; i >= 0; i--) X[i] = (y[i] - vd_eB[i] * X[i + 1]) / up[i];
}
var vd_zK = vdgeo.newpoint(0, 0, 0);
function vd_HN(vd_cR, StartTangent, EndTangent, closed) {
  var s1, t1, r1;
  var i = 0;
  var vd_xf = vdgeo.vd_Em(vd_cR);
  closed = closed || vd_xf;
  var n = vd_cR.length;
  if (closed && vd_xf) n--;
  if (n < 3) return null;
  if (StartTangent == undefined) StartTangent = null;
  if (EndTangent == undefined) EndTangent = null;
  if (closed) {
    if (StartTangent == null || EndTangent == null) {
      if (!vd_xf) vd_cR[n] = vd_cR[0];
      n = vd_cR.length;
      var cen = vdgeo.vd_Hf(vd_cR[n - 2], vd_cR[0], vd_cR[1]);
      var area = vdgeo.vd_GO(vd_cR[n - 2], vd_cR[0], vd_cR[1]);
      if (!vdgeo.AreEqual(area, 0.0, vdgeo.DefaultLinearEquality)) {
        var ang =
          vdgeo.GetAngle(cen, vd_cR[0]) +
          vdgeo.PI / 2.0 -
          vdgeo.PI * (area > 0 ? 1.0 : -1.0);
        if (StartTangent == null)
          StartTangent = vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), ang, 1.0);
        if (EndTangent == null)
          EndTangent = vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), ang, 1.0);
      }
    }
  }
  var vd_ID =
    StartTangent != null &&
    !vdgeo.vd_ed(StartTangent, vd_zK, vdgeo.DefaultPointEquality);
  var vd_FZ =
    EndTangent != null &&
    !vdgeo.vd_ed(EndTangent, vd_zK, vdgeo.DefaultPointEquality);
  var vd_pn = null,
    vd_rl = null;
  n = vd_cR.length;
  var nCP = n + 2;
  var vd_vH = n + 6;
  var vd_aI = vd_Iz(vd_cR, n, 3);
  var alpha = [];
  alpha.length = nCP;
  for (i = 0; i < alpha.length; i++) alpha[i] = 0;
  var beta = [];
  beta.length = nCP;
  for (i = 0; i < beta.length; i++) beta[i] = 0;
  var vd_eB = [];
  vd_eB.length = nCP;
  for (i = 0; i < vd_eB.length; i++) vd_eB[i] = 0;
  if (vd_ID) {
    vd_pn = vdgeo.vd_Dn(
      StartTangent,
      0.333333333333333 * (vd_aI[4] - vd_aI[3])
    );
    alpha[1] = -1.0;
  } else {
    s1 = vd_aI[4] - vd_aI[3];
    t1 = vd_aI[5] - vd_aI[3];
    r1 = s1 + t1;
    alpha[1] = -t1 / r1;
    vd_eB[1] = -s1 / r1;
    vd_pn = vdgeo.newpoint(0, 0, 0);
  }
  beta[0] = beta[1] = 1.0;
  for (i = 2; i < nCP - 2; i++) {
    var temp = vd_Nj(i + 1, vd_aI[i + 2], vd_aI);
    alpha[i] = temp[1];
    beta[i] = temp[2];
    vd_eB[i] = temp[3];
  }
  if (vd_FZ) {
    vd_eB[nCP - 2] = -1.0;
    vd_rl = vdgeo.vd_Dn(
      EndTangent,
      -0.333333333333333 * (vd_aI[nCP] - vd_aI[nCP - 1])
    );
  } else {
    s1 = vd_aI[nCP] - vd_aI[nCP - 1];
    t1 = vd_aI[nCP] - vd_aI[nCP - 2];
    r1 = s1 + t1;
    alpha[nCP - 2] = -s1 / r1;
    vd_eB[nCP - 2] = -t1 / r1;
    vd_rl = vdgeo.newpoint(0, 0, 0);
  }
  beta[nCP - 2] = beta[nCP - 1] = 1;
  var low = [];
  var up = [];
  vd_Ni(alpha, beta, vd_eB, low, up);
  var right = [];
  right.length = nCP;
  var vd_Ai = [];
  right[0] = vd_cR[0][X];
  right[1] = vd_pn[X];
  for (i = 1; i < n - 1; i++) right[i + 1] = vd_cR[i][X];
  right[nCP - 2] = vd_rl[X];
  right[nCP - 1] = vd_cR[n - 1][X];
  vd_up(low, up, vd_eB, right, vd_Ai);
  var vd_CL = [];
  right[0] = vd_cR[0][Y];
  right[1] = vd_pn[Y];
  for (i = 1; i < n - 1; i++) right[i + 1] = vd_cR[i][Y];
  right[nCP - 2] = vd_rl[Y];
  right[nCP - 1] = vd_cR[n - 1][Y];
  vd_up(low, up, vd_eB, right, vd_CL);
  var vd_Cc = [];
  right[0] = vd_cR[0][Z];
  right[1] = vd_pn[Z];
  for (i = 1; i < n - 1; i++) right[i + 1] = vd_cR[i][Z];
  right[nCP - 2] = vd_rl[Z];
  right[nCP - 1] = vd_cR[n - 1][Z];
  vd_up(low, up, vd_eB, right, vd_Cc);
  var vd_Fj = [];
  for (i = 0; i < nCP; i++)
    vd_Fj.push(vdgeo.newpoint(vd_Ai[i], vd_CL[i], vd_Cc[i]));
  return new vdgeo.vd_vp(vd_Fj, closed, 3, null, vd_aI);
}
vdgeo.vd_vp = function (vd_ph, closed, vd_eS, vd_fD, vd_aI) {
  var vd_hK = null;
  var vd_bo = null;
  var vd_qA = false;
  var vd_ia = 3;
  var vd_uB = null;
  var vd_Gx = false;
  if (vd_fD == undefined) vd_fD = null;
  if (vd_aI == undefined) vd_aI = null;
  vd_qA = closed;
  vd_hK = vd_ph;
  vd_ia = Math.min(vd_ph.length - 1, vd_eS);
  if (vd_aI != null && vd_Pd(vd_ph.length, vd_qA, vd_eS) == vd_aI.length)
    vd_bo = vd_aI;
  else vd_bo = vd_MN(vd_ph, vd_qA, vd_eS);
  if (vd_fD != null && vd_fD.length == vd_ph.length) {
    vd_uB = vd_fD;
  } else {
    vd_uB = [];
    for (var i = 0; i < vd_ph.length; i++) vd_uB.push(1.0);
  }
  vd_Gx = vd_KJ();
  var vd_LV = 9;
  var vd_Db = 1e-9;
  function vd_Pd(vd_EF, closed, vd_eS) {
    if (closed) return vd_EF + 1;
    else return vd_EF + vd_eS + 1;
  }
  function vd_KJ() {
    var rc = false;
    var i, j;
    if (
      vd_ia < 1 ||
      vd_ia > vd_LV ||
      vd_nb() < vd_Db ||
      vd_fh() < Math.min(vd_ia, 3)
    )
      return false;
    for (i = 0; ; i = j) {
      for (
        j = i + 1;
        j < Size() && vdgeo.AreEqual(vd_bo[j], vd_bo[i], vd_Db);
        j++
      )
        vd_bo[j] = vd_bo[i];
      if (j >= vd_fh()) break;
      if (vd_bo[j] < vd_bo[i]) return false;
    }
    rc = true;
    vd_MU();
    return rc;
  }
  function vd_MN(vd_rJ, closed, vd_eS) {
    var n = vd_rJ.length;
    var i = 0;
    var vd_eN = [];
    if (closed) {
      for (i = 0; i <= n; i++) vd_eN.push(i);
    } else {
      for (i = 0; i <= vd_eS; i++) vd_eN.push(0.0);
      for (i = vd_eS + 1; i <= n; i++) vd_eN.push(i - vd_eS);
      for (i = 0; i < vd_eS; i++) vd_eN.push(vd_eN[vd_eN.length - 1]);
    }
    return vd_eN;
  }
  function vd_fh() {
    return vd_bo.length - 1;
  }
  function vd_nb() {
    return vd_bo[vd_bo.length - 1] - vd_bo[0];
  }
  function Knot(vd_ae) {
    var k = 0,
      vd_oi = vd_ae;
    while (vd_oi >= vd_fh()) {
      vd_oi -= vd_fh();
      k++;
    }
    while (vd_oi < 0) {
      vd_oi += vd_fh();
      k--;
    }
    return vd_bo[vd_oi] + k * vd_nb();
  }
  function vd_Nd(vd_ae) {
    var vd_li = vd_hK.length;
    while (vd_ae >= vd_li) vd_ae -= vd_li;
    while (vd_ae < 0) vd_ae += vd_li;
    return vd_hK[vd_ae];
  }
  function vd_OH(vd_ae) {
    var vd_li = vd_hK.length;
    while (vd_ae >= vd_li) vd_ae -= vd_li;
    while (vd_ae < 0) vd_ae += vd_li;
    return vd_uB[vd_ae];
  }
  var vd_dx = 0;
  function vd_MU() {
    vd_dx = vd_fh() - 1;
  }
  function vd_Ot() {
    if (vd_fh() <= vd_ia || vd_bo[vd_ia] != vd_bo[0]) return vd_nb();
    else return 0;
  }
  function vd_Mi(t, vd_fV) {
    var rc = true;
    var s = vd_bo[0] + vd_nb();
    vd_fV = 0;
    while (t > s) {
      t -= vd_nb();
      vd_fV++;
    }
    while (t < vd_bo[0]) {
      t += vd_nb();
      vd_fV--;
    }
    if (Math.abs(vd_fV) > 8) rc = false;
    else vd_fV *= vd_fh();
    return [rc, t, vd_fV];
  }
  function Size() {
    return vd_bo.length - 1;
  }
  function vd_HF(vd_Qd, vd_in, nTop) {
    if (vd_in > nTop) throw new vd_cU();
    while (true) {
      var nMid = (vd_in + nTop) / 2;
      if (nMid == vd_in) return vd_in;
      if (vd_Qd >= vd_bo[nMid]) vd_in = nMid;
      else nTop = nMid;
    }
  }
  function vd_Pt(vd_CI, t, vd_Fl) {
    var rc = true;
    var nTop, vd_in;
    var vd_fV = 0;
    list: {
      if (vd_fh() <= 0) {
        rc = false;
        break list;
      }
      if (vd_Ot() != 0.0) {
        var retf = vd_Mi(t, vd_fV);
        t = retf[1];
        vd_fV = retf[2];
        if (retf[0] == false) {
          rc = false;
          break list;
        }
      }
      if (t >= vd_bo[vd_dx]) {
        if (vd_dx >= Size() - 1) break list;
        if (t < vd_bo[vd_dx + 1]) break list;
        vd_dx++;
        if (vd_dx >= Size() - 1) break list;
        if (t < vd_bo[vd_dx + 1]) break list;
        vd_in = vd_dx + 1;
        nTop = Size() - 1;
      } else {
        if (vd_dx <= 0) break list;
        vd_dx--;
        if (vd_dx <= 0 || t >= vd_bo[vd_dx]) break list;
        vd_in = 0;
        nTop = vd_dx;
      }
      vd_dx = vd_HF(t, vd_in, nTop);
      if (t > vd_bo[vd_fh() - 1]) vd_dx = vd_fh() - 1;
      if (t < vd_bo[0]) vd_dx = 0;
    }
    while (vd_dx < vd_fh() - 1 && vd_bo[vd_dx] >= vd_bo[vd_dx + 1]) vd_dx++;
    vd_Fl = vd_dx + vd_fV;
    return [rc, vd_Fl];
  }
  function vd_BQ(u, i, vd_CI) {
    var j = 0;
    var d = vd_ia;
    var D = [];
    D.length = d + 1;
    var w = [];
    w.length = d + 1;
    var t = [];
    t.length = 2 * (d + 1);
    if (vd_Gx) {
      var retf = vd_Pt(vd_CI, u, i);
      i = retf[1];
      if (!retf[0]) throw new vd_cU();
    }
    for (j = 0; j <= d; j++) {
      w[j] = vd_OH(i + j - d);
      var pt = vd_Nd(i + j - d);
      D[j] = vdgeo.newpoint(pt[X], pt[Y], pt[Z]);
      D[j][X] *= w[j];
      D[j][Y] *= w[j];
      D[j][Z] *= w[j];
    }
    for (j = 0; j <= 2 * d + 1; j++) t[j] = Knot(i - d + j);
    for (var k = d; k > 0; k--) {
      for (j = 1; j <= k; j++) {
        var s = (u - t[d - k + j]) / (t[d + j] - t[d - k + j]);
        w[j - 1] += (w[j] - w[j - 1]) * s;
        D[j - 1][X] += (D[j][X] - D[j - 1][X]) * s;
        D[j - 1][Y] += (D[j][Y] - D[j - 1][Y]) * s;
        D[j - 1][Z] += (D[j][Z] - D[j - 1][Z]) * s;
      }
    }
    return vdgeo.newpoint(D[0][X] / w[0], D[0][Y] / w[0], D[0][Z] / w[0]);
  }
  this.vd_yg = function (vd_he) {
    vd_he = Math.max(vd_he, 8);
    var ret = [];
    if (vd_hK.length < 2) return vd_hK;
    var pt = null;
    var vd_mH;
    var vd_mL;
    var rTo = vd_bo[vd_bo.length - 1];
    var vd_yi;
    if (vd_bo[0] == vd_bo[1]) {
      vd_yi = vd_ia;
      vd_mL = vd_bo[vd_ia];
    } else {
      vd_mL = vd_bo[0];
      vd_yi = 0;
    }
    for (var span = vd_yi; vd_mL < rTo; vd_mL = vd_mH, span++) {
      vd_mH = Knot(span + 1);
      if (rTo < vd_mH) vd_mH = rTo;
      if (vdgeo.AreEqual(vd_mH - vd_mL, 0.0, vdgeo.DefaultLinearEquality))
        continue;
      var t = vd_mL;
      pt = vd_BQ(t, span, 0);
      if (
        !(
          ret.length > 0 &&
          vdgeo.vd_ed(ret[ret.length - 1], pt, vdgeo.DefaultPointEquality)
        )
      ) {
        ret.push(pt);
      }
      var d = (vd_mH - t) / vd_he;
      if (vdgeo.AreEqual(d, 0.0, vdgeo.DefaultLinearEquality)) continue;
      for (var j = 1; j < vd_he; j++) {
        t += d;
        pt = vd_BQ(t, span, j);
        ret.push(pt);
      }
    }
    var vd_oK = null;
    if (vd_qA) vd_oK = ret[0];
    else vd_oK = vd_hK[vd_hK.length - 1];
    ret.push(vdgeo.newpoint(vd_oK[X], vd_oK[Y], vd_oK[Z]));
    return ret;
  };
};
vdgeo.vd_xr = function (value) {
  return vdgeo.vd_r(value);
};
vdgeo.vd_r = function (value) {
  return value | 0;
};
vdgeo.vd_nB = function (x, y, minx, vd_w, maxx, vd_o) {
  if (x >= minx) if (x <= maxx) if (y >= vd_w) if (y <= vd_o) return true;
  return false;
};
vdgeo.PointInRegion = function (x, y, pts) {
  var i, j;
  var c = false;
  var Count = pts.length;
  for (i = 0, j = Count - 1; i < Count; j = i++) {
    if (
      (pts[i][Y] <= y && y < pts[j][Y]) ||
      (pts[j][Y] <= y && y < pts[i][Y])
    ) {
      var dis =
        ((pts[j][X] - pts[i][X]) * (y - pts[i][Y])) / (pts[j][Y] - pts[i][Y]) +
        pts[i][X];
      if (x < dis && x != dis) c = !c;
    }
  }
  return c;
};
vdgeo.projectionPointOnLine = function (P, P0, P1) {
  if (vdgeo.vd_ed(P0, P1, vdgeo.vd_ql))
    return vdgeo.newpoint(P0[X], P0[Y], P0[Z]);
  var v = vdgeo.newpoint(P1[X] - P0[X], P1[Y] - P0[Y], P1[Z] - P0[Z]);
  var w = vdgeo.newpoint(P[X] - P0[X], P[Y] - P0[Y], P[Z] - P0[Z]);
  var c1 = vdgeo.vd_hz(w, v);
  var c2 = vdgeo.vd_hz(v, v);
  var b = c1 / c2;
  return vdgeo.newpoint(P0[X] + v[X] * b, P0[Y] + v[Y] * b, P0[Z] + v[Z] * b);
};
vdgeo.vd_IM = function (P, P0, P1) {
  var Pb = vdgeo.projectionPointOnLine(P, P0, P1);
  return vdgeo.Distance3D(P, Pb);
};
vdgeo.vd_jA = function (pt, p1, p2) {
  return (
    vdgeo.AreEqual(vdgeo.vd_IM(pt, p1, p2), 0.0, vdgeo.DefaultLinearEquality) &&
    vdgeo.AreEqual(
      vdgeo.Distance3D(pt, p1) + vdgeo.Distance3D(pt, p2),
      vdgeo.Distance3D(p1, p2),
      vdgeo.DefaultLinearEquality
    )
  );
};
vdgeo.vd_kY = function (p1, p2, p3) {
  var vd_oZ = vdgeo.GetAngle(p2, p3) - vdgeo.GetAngle(p2, p1);
  if (vd_oZ <= 0.0 || vdgeo.AreEqual(vd_oZ, 0.0, 0.000001))
    vd_oZ = vd_oZ + vdgeo.VD_TWOPI;
  return vd_oZ;
};
vdgeo.vd_IQ = function (sp, ep, mp) {
  var ang1 = vdgeo.GetAngle(sp, mp) + vdgeo.HALF_PI;
  var ang2 = vdgeo.GetAngle(sp, ep) + vdgeo.HALF_PI;
  var m_1 = vdgeo.MidPoint(sp, mp);
  var m_2 = vdgeo.MidPoint(sp, ep);
  var m_1a = vdgeo.pointPolar(m_1, ang1, 100.0);
  var m_2a = vdgeo.pointPolar(m_2, ang2, 100.0);
  var ang = ang2 - ang1;
  if (ang < 0.0) ang = ang + vdgeo.VD_TWOPI;
  var cen = vdgeo.newpoint(0, 0, 0);
  var res = vdgeo.vd_gu(m_1, m_1a, m_2, m_2a, vdgeo.DefaultPointEquality, cen);
  var rad = 0.0,
    sa = 0.0,
    ea = 0.0;
  if (res === 0) return null;
  var rad = vdgeo.Distance2D(cen, sp);
  if (ang > vdgeo.PI) {
    sa = vdgeo.GetAngle(cen, ep);
    ea = vdgeo.GetAngle(cen, sp);
  } else {
    sa = vdgeo.GetAngle(cen, sp);
    ea = vdgeo.GetAngle(cen, ep);
  }
  return [cen, rad, sa, ea];
};
var vd_fC = {};
vd_fC.vd_rU = 20037508.342789244;
vd_fC.vd_uc = 6378137.0;
vd_fC.vd_OR = function (lat, lon) {
  var x = vd_fC.vd_uc * vdgeo.DegreesToRadians(lon);
  var y =
    vd_fC.vd_uc *
    Math.log(Math.tan(vdgeo.PI * 0.25 + 0.5 * vdgeo.DegreesToRadians(lat)));
  x = Math.min(vd_fC.vd_rU, Math.max(-vd_fC.vd_rU, x));
  y = Math.min(vd_fC.vd_rU, Math.max(-vd_fC.vd_rU, y));
  return [x, y];
};
vd_fC.vd_LH = function (noth, east) {
  var lon = vdgeo.RadiansToDegrees(east / vd_fC.vd_uc);
  var lat = vdgeo.RadiansToDegrees(
    vdgeo.PI * 0.5 - 2.0 * Math.atan(Math.exp(-noth / vd_fC.vd_uc))
  );
  return [lat, lon];
};
var _vdDocument = null;
var _vdDocTmp = null;
function vd_OD(vd_AD) {
  if (vd_AD === null) return "[object Null]";
  return Object.prototype.toString.call(vd_AD);
}
var vdgdi = {};
vdgdi.vd_gD = function (color) {
  return (
    "#" +
    ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2])
      .toString(16)
      .slice(1)
  );
};
vdgdi.vd_mq = function (col) {
  var ret = 0;
  ret += col[0] * col[0];
  ret += col[1] * col[1];
  ret += col[2] * col[2];
  return Math.sqrt(ret);
};
vdgdi.WHITE = [255, 255, 255, 255];
vdgdi.BLACK = [0, 0, 0, 255];
vdgdi.vd_EY = 61;
var vdConst = {};
vdConst.vd_OE = {
  IsDPIScale: true,
  OverAllLength: 1,
  Segments: {
    Items: [
      { DashLen: 0.5, Flag: 0 },
      { DashLen: -0.5, Flag: 0 },
    ],
  },
};
vdConst.MERGEFLAGS_DEFAULT = 0;
vdConst.MERGEFLAGS_KEEP_EXISITING = 0;
vdConst.MERGEFLAGS_REPLACE_EXISITING = 1;
vdConst.MERGEFLAGS_KEEP_BOTH = 2;
vdConst.MERGEFLAGS_USEDESTEXISTINGTABLES = 4;
vdConst.MERGEFLAGS_BINDXREF = 2;
vdConst.GRIPMODE_USER = 0;
vdConst.GRIPMODE_AUTO = 1;
vdConst.GRIPMODE_SINGLE = 2;
vdConst.vd_ER = 4;
vdConst.GRIPMODE_AUTO_WINDOW_SELECT = vdConst.GRIPMODE_AUTO | vdConst.vd_ER;
vdConst.ActionHighLightColor = [];
vdConst.Err_LoadFile = 1;
vdConst.vd_fk = 2;
vdConst.vdLine_code = 1;
vdConst.vdPolyline_code = 2;
vdConst.vdText_code = 3;
vdConst.vdRect_code = 4;
vdConst.vdCircle_code = 5;
vdConst.vdEllipse_code = 6;
vdConst.vdArc_code = 7;
vdConst.vdImage_code = 8;
vdConst.vdInsert_code = 9;
vdConst.vd3DFace_code = 10;
vdConst.vdPolyface_code = 11;
vdConst.vdAttrib_code = 12;
vdConst.vdAttribDef_code = 13;
vdConst.vdInfinityLine_code = 14;
vdConst.vdPoint_code = 15;
vdConst.vdViewport_code = 16;
vdConst.vdPolyhatch_code = 17;
vdConst.vdLayout_code = 18;
vdConst.vdBlock_code = 19;
vdConst.vdLayer_code = 20;
vdConst.vdTextstyle_code = 21;
vdConst.vdHatchPattern_code = 22;
vdConst.vdLineType_code = 23;
vdConst.vdDimension_code = 24;
vdConst.vdMText_code = 25;
vdConst.vdImageDef_code = 26;
vdConst.vdMultiline_code = 27;
vdConst.vdGroundSurface_code = 28;
vdConst.vdLeader_code = 29;
vdConst.vdGroup_code = 31;
vdConst.vd_IP = 30;
vdConst.vdView_code = 32;
vdConst.vdPointCloud_code = 33;
vdConst.vdNote_code = 100;
vdConst.NOTE_SIZE = 32;
vdConst.NOTE_TRANSPARENT = 170;
vdConst.NOTE_LIMIT_TITLE = 32;
vdConst.NOTE_LIMIT_DESC = 255;
vdConst.NOTE_TOOLTIP_TIMEOUT = 15000;
vdConst.vd_HM = function (path) {
  var vd_EM = "";
  var filename = "";
  var vd_Do = "";
  var f1 = path.replace("\\", "/");
  var n = f1.lastIndexOf("/");
  if (n > -1) {
    vd_EM = f1.substr(0, n + 1);
    path = f1.substr(n + 1);
  }
  filename = path.split("&")[0].split("#")[0].split("?")[0];
  n = filename.lastIndexOf(".");
  if (n > -1) {
    vd_Do = filename.substr(n);
    filename = filename.substr(0, n);
  }
  return [vd_EM, filename, vd_Do];
};
vdConst.vd_GZ = function (path) {
  var items = vdConst.vd_HM(path);
  return items[1];
};
vdConst.vd_PE = function (obj) {
  if (obj._t === undefined) return false;
  return (
    obj._t === 24 ||
    obj._t === 25 ||
    (obj._t >= 1 && obj._t <= 17) ||
    (obj._t >= 27 && obj._t <= 30)
  );
};
vdConst.TextLineFlags_None = 0;
vdConst.TextLineFlags_UnderLine = 1;
vdConst.TextLineFlags_OverLine = 2;
vdConst.TextLineFlags_CenterLine = 4;
vdConst.VdConstTextstyle_BACKWARD = 2;
vdConst.VdConstTextstyle_BACKWARD_UPSIDEDOWN = 6;
vdConst.VdConstTextstyle_LEFTTORIGHT = 0;
vdConst.VdConstTextstyle_UPSIDEDOWN = 4;
vdConst.VdConstVerJust_VdTextVerBaseLine = 24;
vdConst.VdConstVerJust_VdTextVerBottom = 8;
vdConst.VdConstVerJust_VdTextVerCen = 100;
vdConst.VdConstVerJust_VdTextVerTop = 0;
vdConst.VdConstHorJust_VdTextHorAligned = 103;
vdConst.VdConstHorJust_VdTextHorCenter = 6;
vdConst.VdConstHorJust_VdTextHorFit = 105;
vdConst.VdConstHorJust_VdTextHorLeft = 0;
vdConst.VdConstHorJust_VdTextHorRight = 2;
vdConst.InfinityTypes_Ray = 0;
vdConst.InfinityTypes_XLine = 1;
vdConst.COLOR_BYLAYER = 192;
vdConst.LW_BYBLOCK = -2;
vdConst.LW_BYLAYER = -1;
vdConst.LW_DOCUMENTDEFAULT = -3;
vdConst.TransparencyMethod_ByBlock = 1;
vdConst.TransparencyMethod_ByLayer = 0;
vdConst.BlockColorOper_Layer = 0;
vdConst.BlockColorOper_Block = 1;
vdConst.BlockStdLayerOper_Layer = 0;
vdConst.BlockStdLayerOper_BlockColor = 1;
vdConst.BlockStdLayerOper_BlockLineType = 2;
vdConst.BlockStdLayerOper_BlockLineWeight = 4;
vdConst.PRINT_WINDOW_FLAG_EXTENTS = 1;
vdConst.PRINT_WINDOW_FLAG_VIEW = 2;
vdConst.PRINT_WINDOW_FLAG_ORIGINAL = 3;
vdConst.PRINT_SCALE_FLAG_FIT = 1;
vdConst.PRINT_SCALE_FLAG_ORIGINAL = 3;
vdConst.LINETYPE_FLAG_Dot = 0;
vdConst.LINETYPE_FLAG_TTF_TEXT = 2;
vdConst.LINETYPE_FLAG_SHX_TEXT = 4;
vdConst.ACTION_POINT_WORLD = 0;
vdConst.ACTION_LINE_WORLD = 1;
vdConst.ACTION_RECT_VIEW = 2;
vdConst.ACTION_DISPLAY_USEFILLCOLOR = 1;
vdConst.ACTION_DISPLAY_USECROSSCOLOR = 2;
vdConst.ACTION_DISPLAY_DEFAULT = 3;
vdConst.DEFAULT_ZOOMSCALE = 1;
vdConst.DEFAULT_SCROLL = 2;
vdConst.DEFAULT_ZOOMEXTENTS = 4;
vdConst.DEFAULT_ROTATE3D = 8;
vdConst.DEFAULT_MOUSE_ACTION_ALL =
  vdConst.DEFAULT_ZOOMSCALE +
  vdConst.DEFAULT_SCROLL +
  vdConst.DEFAULT_ZOOMEXTENTS +
  vdConst.DEFAULT_ROTATE3D;
vdConst.DEFAULT_MOUSE_ACTION_NONE = 0;
vdConst.vd_nE = 0;
vdConst.vd_et = 1;
vdConst.LineTypeDrawMethod_Center = 1;
vdConst.LineTypeDrawMethod_Start = 0;
vdConst.SplineFlagSTANDARD = 0;
vdConst.SplineFlagFITTING = 1;
vdConst.SplineFlagCONTROLPOINTS = 2;
vdConst.SplineFlagQUADRATIC = 4;
vdConst.vd_vv = 0;
vdConst.vd_pt = 1;
vdConst.RENDERMODE_WIRE_2d = 0;
vdConst.RENDERMODE_WIRE_3d = 1;
vdConst.RENDERMODE_SHADE = 3;
vdConst.RENDERMODE_RENDER = 5;
vdConst.RENDERMODE_SHADE_GL = 10;
vdConst.RENDERMODE_RENDER_GL = 11;
vdConst.vd_Pc = 11;
vdConst.NUMSECTIONS = 2;
vdConst.InterpolationMode_Nearest = 0;
vdConst.InterpolationMode_Bilinear = 1;
vdConst.StdView_TOP = 0;
vdConst.StdView_BOTTOM = 1;
vdConst.StdView_FRONT = 2;
vdConst.StdView_BACK = 3;
vdConst.StdView_LEFT = 4;
vdConst.StdView_RIGHT = 5;
vdConst.StdView_ISO_NE = 6;
vdConst.StdView_ISO_NW = 7;
vdConst.StdView_ISO_SE = 8;
vdConst.StdView_ISO_SW = 9;
vdConst.InsUnitUnspecified = 0;
vdConst.InsUnitInches = 1;
vdConst.InsUnitFeet = 2;
vdConst.InsUnitMiles = 3;
vdConst.InsUnitMillimeters = 4;
vdConst.InsUnitCentimeters = 5;
vdConst.InsUnitMeters = 6;
vdConst.InsUnitKilometers = 7;
vdConst.InsUnitMicroinches = 8;
vdConst.InsUnitMils = 9;
vdConst.InsUnitYards = 10;
vdConst.InsUnitAngstroms = 11;
vdConst.InsUnitNanometers = 12;
vdConst.InsUnitMicrons = 13;
vdConst.InsUnitDecimeters = 14;
vdConst.InsUnitDekameters = 15;
vdConst.InsUnitHectometers = 16;
vdConst.InsUnitGigameters = 17;
vdConst.InsUnitAstronomical_Units = 18;
vdConst.InsUnitLight_Years = 19;
vdConst.InsUnitParsecs = 20;
vdConst.OsnapMode_NONE = 0;
vdConst.OsnapMode_END = 1;
vdConst.OsnapMode_MID = 2;
vdConst.OsnapMode_CEN = 4;
vdConst.OsnapMode_INS = 8;
vdConst.OsnapMode_NEA = 32;
vdConst.OsnapMode_NODE = 128;
vdConst.OsnapMode_QUA = 256;
vdConst.OsnapMode_DISABLE = 8192;
vdConst.OsnapMode_ALL =
  vdConst.OsnapMode_END +
  vdConst.OsnapMode_MID +
  vdConst.OsnapMode_CEN +
  vdConst.OsnapMode_INS +
  vdConst.OsnapMode_NEA +
  vdConst.OsnapMode_NODE +
  vdConst.OsnapMode_QUA;
vdConst.OsnapMaxItems = 100;
vdConst.PLineDrawFlags_Default = 0;
vdConst.PLineDrawFlags_SolidWidths = 1;
vdConst.PLineDrawFlags_WireWidths = 2;
vdConst.vd_sO = function (vd_jN) {
  var vd_mR = new Object();
  vd_mR.ColorFlag = vd_jN.ColorFlag;
  vd_mR.MaterialImage = vd_jN.MaterialImage;
  vd_mR.ColorIndex = vd_jN.ColorIndex;
  if (vd_jN.SystemColor) {
    vd_mR.SystemColor = [].concat(vd_jN.SystemColor);
  }
  if (vd_jN.MaterialMatrix)
    vd_mR.MaterialMatrix = [].concat(vd_jN.MaterialMatrix);
  return vd_mR;
};
vdConst.vd_zx = [
  "EcsMatrix",
  "vd_d",
  "selected",
  "ps",
  "BoundingBox",
  "SamplePoints",
  "vd_hi",
  "vd_gY",
  "tb",
  "DiplayString",
  "testlines",
  "uwidths",
  "owidths",
  "pointSegments",
  "Normals",
  "UVS",
  "ImageClipPts",
  "ImageClipUVS",
  "_groups",
  "excludeFromSave",
];
vdConst.vd_Fk = function () {
  this.clone = function () {
    return null;
  };
  return this;
};
vdConst.cloneEntity = function (obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy;
  if (obj instanceof vdConst.vd_Fk) return obj.clone();
  else copy = obj.constructor();
  if (obj == null) return obj;
  for (var attr in obj) {
    if (typeof obj[attr] == "function") continue;
    if (
      obj.hasOwnProperty(attr) &&
      vdConst.vd_zx.indexOf(attr) === -1 &&
      vd_dm.vd_zU.indexOf(attr) === -1
    ) {
      copy[attr] = vdConst.cloneEntity(obj[attr]);
    }
  }
  return copy;
};
vdConst.vd_CP = function (str) {
  var ret = "";
  ret += "(";
  for (var s = 0; s < str.length; s++) {
    ret += str.charCodeAt(s).toString();
    if (s < str.length - 1) ret += ",";
  }
  ret += ")";
  return ret;
};
vdConst.vd_AW = function (str) {
  return eval("String.fromCharCode" + str);
};
vdConst.vd_vJ = function (vd_C) {
  if (!vd_C) return 0;
  vd_C.HandleCurrent++;
  while (vd_C["h_" + vd_C.HandleCurrent.toString()]) vd_C.HandleCurrent++;
  return vd_C.HandleCurrent;
};
vdConst.GridStyle_Dot = 0;
vdConst.GridStyle_Cross = 1;
vdConst.GridStyle_Solid = 2;
vdConst.FillModeNone = "";
vdConst.FillModeSolid = "solid";
vdConst.FillModeHatchBDiagonal = "U10_45";
vdConst.FillModeHatchCross = "U20";
vdConst.FillModeHatchDiagCross = "U10_45_135";
vdConst.FillModeHatchFDiagonal = "U10_135";
vdConst.FillModeHatchHorizontal = "U10";
vdConst.FillModeHatchVertical = "U10_90";
vdConst.FillModeSingleHatch = "U1";
vdConst.FillModeDoubleHatch = "U2";
vdConst.colorToString = function (color) {
  if (color.ColorFlag == 192) return "bylayer";
  else if (color.ColorFlag == 193) return "byblock";
  else if (color.ColorFlag == 195) return color.ColorIndex.toString();
  else if (color.SystemColor) {
    var ret = "";
    for (var i = 0; i < color.SystemColor.length; i++) {
      ret += color.SystemColor[i].toString();
      if (i != color.SystemColor.length - 1) ret += ",";
    }
    return ret;
  }
  return "6";
};
vdConst.colorFromString = function (vd_Ja) {
  var color = {};
  var val = vd_Ja.toLowerCase();
  if (val == "bylayer") color.ColorFlag = 192;
  else if (val == "byblock") color.ColorFlag = 193;
  else {
    var vd_sZ = val.split(",");
    switch (vd_sZ.length) {
      case 0:
        break;
      case 1:
        color.ColorFlag = 195;
        color.ColorIndex = Number(vd_sZ[0]);
        break;
      default:
        color.ColorFlag = 194;
        color.SystemColor = [];
        for (var i = 0; i < vd_sZ.length; i++) {
          color.SystemColor.push(Number(vd_sZ[i]));
        }
        break;
    }
  }
  return color;
};
vdConst.createNewColor = function (vd_Op) {
  return vdConst.colorFromString(vd_Op);
};
vdConst.path = {};
vdConst.path.vd_Ef = function (vd_mc) {
  return decodeURI(
    vd_mc.replace("\\", "/").split("&")[0].split("#")[0].split("?")[0]
  );
};
vdConst.path.vd_QJ = function (vd_mc) {
  return vdConst.path.vd_Cl(vd_mc).split(".").pop().toLowerCase();
};
vdConst.path.vd_Cl = function (vd_mc) {
  return vdConst.path.vd_Ef(vd_mc).split("/").pop();
};
vdConst.path.vd_IA = function (vd_mc) {
  var path = vdConst.path.vd_Ef(vd_mc);
  var n = path.lastIndexOf("/");
  if (n >= 0) path = path.substr(0, n + 1);
  return path;
};
vdConst.vd_la = "./";
try {
  var scripts = document.getElementsByTagName("script");
  if (scripts && scripts.length > 0) {
    for (var i = 0; i < scripts.length; i++) {
      var scr = scripts[i];
      if (!scr.src) continue;
      var vd_Qe = vdConst.path.vd_Cl(scr.src);
      if (vd_Qe.toLowerCase() == "vdwebcontrol.js") {
        vdConst.vd_la = vdConst.path.vd_IA(scr.src);
        break;
      }
    }
  }
} catch (ex) {}
vdConst.MaxImageSize = 768 * 720;
vdConst.vd_CO = new (function () {
  var vd_i = this;
  var vd_Ad = null;
  var vd_xy = null;
  var vd_xY = null;
  var vd_zj = null;
  var vd_zs = null;
  this.vd_He = function (vd_dE) {
    if (!vd_Ad)
      vd_Ad = vdConst.vd_qf(
        vdConst.vd_la + "res/cube.png",
        [255, 255, 255, 255],
        vd_dE
      );
    return vd_Ad;
  };
  this.vd_LP = function (id, vd_dE) {
    if (id == 0) return vd_i.icon_error(vd_dE);
    else if (id == 1) return vd_i.icon_exclamation(vd_dE);
    else if (id == 2) return vd_i.icon_information(vd_dE);
    else if (id == 3) return vd_i.icon_question(vd_dE);
    return null;
  };
  this.icon_error = function (vd_dE) {
    if (!vd_xy)
      vd_xy = vdConst.vd_qf(
        vdConst.vd_la + "res/icon_error.ico",
        [0, 0, 0, 255],
        vd_dE
      );
    return vd_xy;
  };
  this.icon_exclamation = function (vd_dE) {
    if (!vd_xY)
      vd_xY = vdConst.vd_qf(
        vdConst.vd_la + "res/icon_exclamation.ico",
        [0, 0, 0, 255],
        vd_dE
      );
    return vd_xY;
  };
  this.icon_information = function (vd_dE) {
    if (!vd_zj)
      vd_zj = vdConst.vd_qf(
        vdConst.vd_la + "res/icon_information.ico",
        [0, 0, 0, 255],
        vd_dE
      );
    return vd_zj;
  };
  this.icon_question = function (vd_dE) {
    if (!vd_zs)
      vd_zs = vdConst.vd_qf(
        vdConst.vd_la + "res/icon_question.ico",
        [0, 0, 0, 255],
        vd_dE
      );
    return vd_zs;
  };
})();
vdConst.vd_qf = function (vd_ep, vd_dy, vd_dE) {
  var vd_v = {};
  vd_v._t = vdConst.vdImageDef_code;
  vd_v.Transparency = [0, 0, 0, 0];
  if (vd_dy) vd_v.Transparency = vd_dy;
  vd_v.OriginalWidth = 1;
  vd_v.OriginalHeight = 1;
  vd_v.width = 1;
  vd_v.height = 1;
  var vd_fx = document.createElement("img");
  vd_fx.setAttribute("src", vd_ep);
  vd_fx.onload = function (evt) {
    vdConst.vd_rR(evt.target, vd_v);
    if (vd_dE) setTimeout(vd_dE);
  };
  return vd_v;
};
vdConst.vd_rR = function (vd_xN, vd_u) {
  var vd_sJ = vd_xN.width;
  var vd_te = vd_xN.height;
  if (vd_sJ == 0 || vd_te == 0) return undefined;
  var vd_dy =
    vd_u.Transparency && vd_u.Transparency[3] === 255
      ? vd_u.Transparency
      : null;
  var vd_sg = parseInt(vdConst.MaxImageSize) || 768 * 720;
  vd_sg = vd_sg < 300 * 300 ? 768 * 720 : vd_sg;
  var div = 1;
  var width = vd_sJ;
  var height = vd_te;
  while ((width / div) * (height / div) > vd_sg) div++;
  width /= div;
  height /= div;
  width = vdgeo.vd_r(width);
  height = vdgeo.vd_r(height);
  var bytes = [];
  var vd_fd = document.createElement("CANVAS");
  vd_fd.setAttribute("width", width);
  vd_fd.setAttribute("height", height);
  var vd_jm = vd_fd.getContext("2d");
  vd_jm.globalCompositeOperation = "copy";
  vd_jm.drawImage(vd_xN, 0, 0, vd_sJ, vd_te, 0, 0, width, height);
  var vd_sL = vd_jm.getImageData(0, 0, width, height);
  bytes.length = height;
  var r, g, b, a;
  var wlen = width * 4;
  for (var h = height - 1; h >= 0; h--) {
    var start = h * width * 4;
    var _h = height - h - 1;
    bytes[_h] = [];
    bytes[_h].length = width * 4;
    var k = 0;
    for (var w = 0; w < wlen; w += 4) {
      r = vd_sL.data[start + w];
      g = vd_sL.data[start + w + 1];
      b = vd_sL.data[start + w + 2];
      a = vd_sL.data[start + w + 3];
      if (
        a !== 0 &&
        vd_dy &&
        r === vd_dy[0] &&
        g === vd_dy[1] &&
        b === vd_dy[2]
      )
        a = 0;
      bytes[_h][k] = r;
      k++;
      bytes[_h][k] = g;
      k++;
      bytes[_h][k] = b;
      k++;
      bytes[_h][k] = a;
      k++;
    }
  }
  vd_u.bytes = bytes;
  vd_u.bytescount = 4;
  vd_u.width = width;
  vd_u.height = height;
  if (vd_u.OriginalWidth == 1) vd_u.OriginalWidth = vd_sJ;
  if (vd_u.OriginalHeight == 1) vd_u.OriginalHeight = vd_te;
};
vdConst.MouseLeftButton = 1;
vdConst.MouseMiddleButton = 2;
vdConst.MouseRightButton = 3;
var base64 = {};
base64.vd_pa = "=";
base64.ALPHA =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
base64.vd_wU = function () {
  var e, tmp;
  try {
    return new DOMException(DOMException.INVALID_CHARACTER_ERR);
  } catch (tmp) {
    var ex = new Error("DOM vd_cU 5");
    ex.code = ex.number = 5;
    ex.name = ex.description = "INVALID_CHARACTER_ERR";
    ex.toString = function () {
      return "Error: " + ex.name + ": " + ex.message;
    };
    return ex;
  }
};
base64.vd_dN = function (s, i) {
  var idx = base64.ALPHA.indexOf(s.charAt(i));
  if (idx === -1) {
    throw base64.vd_wU();
  }
  return idx;
};
base64.vd_AI = function (s) {
  s = "" + s;
  var vd_dN = base64.vd_dN;
  var pads, i, b10;
  var imax = s.length;
  if (imax === 0) {
    return s;
  }
  if (imax % 4 !== 0) {
    throw base64.vd_wU();
  }
  pads = 0;
  if (s.charAt(imax - 1) === base64.vd_pa) {
    pads = 1;
    if (s.charAt(imax - 2) === base64.vd_pa) {
      pads = 2;
    }
    imax -= 4;
  }
  var x = [];
  for (i = 0; i < imax; i += 4) {
    b10 =
      (vd_dN(s, i) << 18) |
      (vd_dN(s, i + 1) << 12) |
      (vd_dN(s, i + 2) << 6) |
      vd_dN(s, i + 3);
    x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
  }
  switch (pads) {
    case 1:
      b10 =
        (vd_dN(s, i) << 18) | (vd_dN(s, i + 1) << 12) | (vd_dN(s, i + 2) << 6);
      x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
      break;
    case 2:
      b10 = (vd_dN(s, i) << 18) | (vd_dN(s, i + 1) << 12);
      x.push(String.fromCharCode(b10 >> 16));
      break;
  }
  return x.join("");
};
base64.vd_Ou = function (s) {
  s = "" + s;
  var vd_dN = base64.vd_dN;
  var pads, i, b10;
  var imax = s.length;
  var x = [];
  if (imax === 0) {
    return x;
  }
  if (imax % 4 !== 0) {
    throw base64.vd_wU();
  }
  pads = 0;
  if (s.charAt(imax - 1) === base64.vd_pa) {
    pads = 1;
    if (s.charAt(imax - 2) === base64.vd_pa) {
      pads = 2;
    }
    imax -= 4;
  }
  for (i = 0; i < imax; i += 4) {
    b10 =
      (vd_dN(s, i) << 18) |
      (vd_dN(s, i + 1) << 12) |
      (vd_dN(s, i + 2) << 6) |
      vd_dN(s, i + 3);
    x.push(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff);
  }
  switch (pads) {
    case 1:
      b10 =
        (vd_dN(s, i) << 18) | (vd_dN(s, i + 1) << 12) | (vd_dN(s, i + 2) << 6);
      x.push(b10 >> 16, (b10 >> 8) & 0xff);
      break;
    case 2:
      b10 = (vd_dN(s, i) << 18) | (vd_dN(s, i + 1) << 12);
      x.push(b10 >> 16);
      break;
  }
  return x;
};
base64.vd_iR = function (s, i) {
  return s.charCodeAt(i);
};
base64.vd_Kn = function (s) {
  var vd_vQ = base64.vd_pa;
  var alpha = base64.ALPHA;
  var vd_iR = base64.vd_iR;
  var i, b10;
  var x = [];
  var imax = s.length - (s.length % 3);
  for (i = 0; i < imax; i += 3) {
    b10 = (vd_iR(s, i) << 16) | (vd_iR(s, i + 1) << 8) | vd_iR(s, i + 2);
    x.push(alpha.charAt(b10 >> 18));
    x.push(alpha.charAt((b10 >> 12) & 0x3f));
    x.push(alpha.charAt((b10 >> 6) & 0x3f));
    x.push(alpha.charAt(b10 & 0x3f));
  }
  switch (s.length - imax) {
    case 1:
      b10 = vd_iR(s, i) << 16;
      x.push(
        alpha.charAt(b10 >> 18) +
          alpha.charAt((b10 >> 12) & 0x3f) +
          vd_vQ +
          vd_vQ
      );
      break;
    case 2:
      b10 = (vd_iR(s, i) << 16) | (vd_iR(s, i + 1) << 8);
      x.push(
        alpha.charAt(b10 >> 18) +
          alpha.charAt((b10 >> 12) & 0x3f) +
          alpha.charAt((b10 >> 6) & 0x3f) +
          vd_vQ
      );
      break;
  }
  return x.join("");
};
base64.vd_OF = function (vd_se) {
  var vd_tM =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var vd_pI = new Array();
  var c = 0;
  while (c < vd_se.length) {
    var b0 = vd_se[c++];
    var b1 = vd_se[c++];
    var b2 = vd_se[c++];
    var buf = (b0 << 16) + ((b1 || 0) << 8) + (b2 || 0);
    var i0 = (buf & (63 << 18)) >> 18;
    var i1 = (buf & (63 << 12)) >> 12;
    var i2 = isNaN(b1) ? 64 : (buf & (63 << 6)) >> 6;
    var i3 = isNaN(b2) ? 64 : buf & 63;
    vd_pI.push(vd_tM.charAt(i0));
    vd_pI.push(vd_tM.charAt(i1));
    vd_pI.push(vd_tM.charAt(i2));
    vd_pI.push(vd_tM.charAt(i3));
  }
  return vd_pI.join("");
};
base64.sfc = function (ret) {
  var ar1 = "String.fromCharCode(";
  var k = 0;
  for (var i = 0; i < ret.length; i++) {
    var c = ret.charCodeAt(i);
    if (c == 0) continue;
    ar1 += c.toString() + ",";
    k++;
  }
  if (k > 0) ar1 = ar1.substr(0, ar1.length - 1);
  ar1 += ")";
  return ar1;
};
base64.vd_zy = function (ret) {
  return eval(base64.sfc(ret));
};
function vd_QA(w, h, vd_nu) {
  var vd_i = this;
  this.vd_xm = false;
  this.root = { x: 0, y: 0, w: w, h: h };
  if (!w || !h) vd_i.vd_xm = true;
  this.fit = function (vd_qF) {
    vd_qF.sort(function (a, b) {
      return Math.max(a.w, a.h) - Math.max(b.w, b.h);
    });
    var n,
      vd_Y,
      block,
      len = vd_qF.length;
    if (vd_i.vd_xm) {
      w = len > 0 ? vd_qF[0].w + vd_nu : 0;
      h = len > 0 ? vd_qF[0].h + vd_nu : 0;
    }
    vd_i.root = { x: 0, y: 0, w: w, h: h };
    for (n = 0; n < len; n++) {
      block = vd_qF[n];
      if ((vd_Y = vd_nO(vd_i.root, block.w, block.h)))
        block.fit = vd_tv(vd_Y, block.w + vd_nu, block.h + vd_nu);
      else {
        if (vd_i.vd_xm) block.fit = vd_Mq(block.w + vd_nu, block.h + vd_nu);
      }
    }
    return vd_i.root;
  };
  function vd_nO(vd_nq, _w, _h) {
    var ret = null;
    if (vd_nq.used) {
      ret = vd_nO(vd_nq.right, _w, _h);
      if (!ret) ret = vd_nO(vd_nq.down, _w, _h);
      return ret;
    } else if (_w <= vd_nq.w && _h <= vd_nq.h) return vd_nq;
    else return null;
  }
  function vd_tv(vd_Y, _w, _h) {
    vd_Y.used = true;
    vd_Y.down = { x: vd_Y.x, y: vd_Y.y + _h, w: vd_Y.w, h: vd_Y.h - _h };
    vd_Y.right = { x: vd_Y.x + _w, y: vd_Y.y, w: vd_Y.w - _w, h: _h };
    return vd_Y;
  }
  function vd_Mq(_w, _h) {
    var vd_ES = _w <= vd_i.root.w;
    var vd_Gr = _h <= vd_i.root.h;
    var vd_NB = vd_Gr && vd_i.root.h >= vd_i.root.w + _w;
    var vd_MP = vd_ES && vd_i.root.w >= vd_i.root.h + _h;
    if (vd_NB) return vd_Cr(_w, _h);
    else if (vd_MP) return vd_Bg(_w, _h);
    else if (vd_Gr) return vd_Cr(_w, _h);
    else if (vd_ES) return vd_Bg(_w, _h);
    else return null;
  }
  function vd_Cr(_w, _h) {
    var vd_Y = null;
    vd_i.root = {
      used: true,
      x: 0,
      y: 0,
      w: vd_i.root.w + _w,
      h: vd_i.root.h,
      down: vd_i.root,
      right: { x: vd_i.root.w, y: 0, w: _w, h: vd_i.root.h },
    };
    if ((vd_Y = vd_nO(vd_i.root, _w, _h))) return vd_tv(vd_Y, _w, _h);
    else return null;
  }
  function vd_Bg(_w, _h) {
    var vd_Y = null;
    vd_i.root = {
      used: true,
      x: 0,
      y: 0,
      w: vd_i.root.w,
      h: vd_i.root.h + _h,
      down: { x: 0, y: vd_i.root.h, w: vd_i.root.w, h: _h },
      right: vd_i.root,
    };
    if ((vd_Y = vd_nO(vd_i.root, _w, _h))) return vd_tv(vd_Y, _w, _h);
    else return null;
  }
  return this;
}
var trig = {};
trig.vd_FJ = function (pts, i, j, k, normal, vd_hy) {
  vd_hy.m_e0 = [
    pts[i][X] - pts[k][X],
    pts[i][Y] - pts[k][Y],
    pts[i][Z] - pts[k][Z],
  ];
  vd_hy.m_e1 = [
    pts[j][X] - pts[k][X],
    pts[j][Y] - pts[k][Y],
    pts[j][Z] - pts[k][Z],
  ];
  vd_hy.m_N = trig.nVec(vd_hy.m_e0, vd_hy.m_e1);
  vd_hy.m_A = vdgeo.vd_hz(vd_hy.m_N, vd_hy.m_N);
  if (-vdgeo.EPSILON < vd_hy.m_A && vd_hy.m_A < vdgeo.EPSILON) return 0;
  return vdgeo.vd_hz(vd_hy.m_N, normal) < 0.0 ? -1 : 1;
};
trig.vd_Qb = function (normal, point, q2, m_e0, m_e1, m_N, m_A) {
  var pmq2 = [point[X] - q2[X], point[Y] - q2[Y], point[Z] - q2[Z]];
  var ntmp, B0, B1;
  ntmp = trig.nVec(pmq2, m_e1);
  if ((B0 = vdgeo.vd_hz(m_N, ntmp)) <= 0.0) return false;
  ntmp = trig.nVec(m_e0, pmq2);
  if ((B1 = vdgeo.vd_hz(m_N, ntmp)) <= 0.0) return false;
  return m_A - B0 - B1 > 0.0 ? true : false;
};
trig.vd_CQ = function (vd_ae, j, vd_eI) {
  while (++j < vd_eI) vd_ae[j - 1] = vd_ae[j];
  return vd_eI - 1;
};
trig.nVec = function (e0, e1) {
  return [
    e0[Y] * e1[Z] - e0[Z] * e1[Y],
    e0[Z] * e1[X] - e0[X] * e1[Z],
    e0[X] * e1[Y] - e0[Y] * e1[X],
  ];
};
trig.vd_NN = function (
  pts,
  normal,
  vd_ae,
  i,
  j,
  k,
  vd_eI,
  m_e0,
  m_e1,
  m_N,
  m_A
) {
  var ik = vd_ae[k];
  for (var ip = 0; ip < vd_eI; ip++)
    if (
      (ip < i || ip > k) &&
      trig.vd_Qb(normal, pts[vd_ae[ip]], pts[ik], m_e0, m_e1, m_N, m_A)
    ) {
      return true;
    }
  return false;
};
trig.vd_Oy = function (pts, normal) {
  if (pts.length < 3) return [];
  if (pts.length == 3) return [0, 1, 2];
  var vd_xo = 0;
  var vd_ru = true;
  var vd_dU = [];
  var vd_pp = {};
  var vd_LU = pts.length;
  var vd_pS = -1;
  var index;
  if (!vdgeo.vd_ed(pts[pts.length - 1], pts[0], vdgeo.DefaultPointEquality)) {
    pts.push(pts[0]);
    vd_pS = pts.length - 1;
  }
  var vd_ae = [];
  vd_ae.length = pts.length + 2;
  var vd_eI = pts.length;
  var ii = 0;
  for (i = vd_xo; i < pts.length; i++) {
    if (
      i > vd_xo &&
      vdgeo.vd_ed(pts[vd_ae[ii - 1]], pts[i], vdgeo.DefaultPointEquality)
    )
      continue;
    vd_ae[ii] = i;
    ii++;
  }
  for (var i = 0; i < vd_xo; i++) {
    if (
      i > 0 &&
      vdgeo.vd_ed(pts[vd_ae[ii - 1]], pts[i], vdgeo.DefaultPointEquality)
    )
      continue;
    vd_ae[ii] = i;
    ii++;
  }
  vd_eI = ii;
  while (vd_eI > 3 && vd_ru) {
    vd_ru = false;
    for (var i = 0, j = 1, k = 2; k < vd_eI; ) {
      switch (trig.vd_FJ(pts, vd_ae[i], vd_ae[j], vd_ae[k], normal, vd_pp)) {
        case 1:
          if (
            trig.vd_NN(
              pts,
              normal,
              vd_ae,
              i,
              j,
              k,
              vd_eI,
              vd_pp.m_e0,
              vd_pp.m_e1,
              vd_pp.m_N,
              vd_pp.m_A
            )
          ) {
            i = j;
            j = k;
            k++;
          } else {
            index = vd_ae[i];
            if (index == vd_pS) index = 0;
            vd_dU.push(index);
            index = vd_ae[j];
            if (index == vd_pS) index = 0;
            vd_dU.push(index);
            index = vd_ae[k];
            if (index == vd_pS) index = 0;
            vd_dU.push(index);
            vd_eI = trig.vd_CQ(vd_ae, j, vd_eI);
            vd_ru = true;
          }
          break;
        case -1:
          i = j;
          j = k;
          k++;
          break;
        case 0:
          vd_eI = trig.vd_CQ(vd_ae, j, vd_eI);
          vd_ru = true;
          break;
      }
    }
  }
  pts.length = vd_LU;
  return vd_dU;
};
function Clip() {
  var vd_i = this;
  function vd_oy() {
    var vd_i = this;
    var vd_aS = [];
    var vd_Ed = true;
    Object.defineProperty(vd_i, "list", {
      get: function () {
        return vd_aS;
      },
    });
    this.clear = function () {
      vd_aS = [];
    };
    this.add = function (x, y) {
      vd_i.vd_pD(vdgeo.newpoint(x, y, 0));
    };
    this.vd_pD = function (p) {
      vd_aS.push(p);
    };
    this.vd_py = function (p) {
      throw new vd_cU("Cannot add poly to a simple poly.");
    };
    this.vd_bK = function () {
      return vd_aS.length == 0;
    };
    this.vd_lT = function () {
      var ret = new vd_hd();
      for (var i = 0; i < vd_aS.length; i++) {
        ret.AddPoint(vd_aS[i]);
      }
      return ret;
    };
    this.vd_kU = function (vd_fQ) {
      if (vd_fQ != 0) {
        throw new vd_cU("vd_oy only has one poly");
      }
      return vd_i;
    };
    this.vd_jv = function () {
      return 1;
    };
    this.vd_lE = function () {
      return vd_aS.length;
    };
    this.getX = function (index) {
      return vd_aS[index][X];
    };
    this.getY = function (index) {
      return vd_aS[index][Y];
    };
    this.vd_nK = function () {
      return false;
    };
    this.vd_zb = function (vd_nK) {
      throw new vd_cU("vd_oy cannot be a hole");
    };
    this.vd_yK = function (vd_fQ) {
      if (vd_fQ != 0) {
        throw new vd_cU("vd_oy only has one poly");
      }
      return vd_Ed;
    };
    this.vd_oR = function (vd_fQ, vd_wS) {
      if (vd_fQ != 0) {
        throw new vd_cU("vd_oy only has one poly");
      }
      vd_Ed = vd_wS;
    };
    return this;
  }
  function vd_ud() {
    var vd_i = this;
    var vd_tr = false;
    var vd_aS = [];
    Object.defineProperty(vd_i, "list", {
      get: function () {
        return vd_aS;
      },
    });
    this.clear = function () {
      vd_aS = [];
    };
    this.add = function (x, y) {
      vd_i.vd_pD(vdgeo.newpoint(x, y, 0));
    };
    this.vd_pD = function (p) {
      if (vd_aS.length == 0) {
        vd_aS.push(new vd_oy());
      }
      vd_aS[0].vd_pD(p);
    };
    this.vd_py = function (p) {
      if (vd_aS.length > 0 && vd_tr) {
        throw new vd_cU("Cannot add polys to something designated as a hole.");
      }
      vd_aS.push(p);
    };
    this.vd_bK = function () {
      return vd_aS.length == 0;
    };
    this.vd_lT = function () {
      if (vd_aS.length == 0) {
        return new vd_hd();
      } else if (vd_aS.length == 1) {
        var ip = vd_i.vd_kU(0);
        return ip.vd_lT();
      } else {
        throw new vd_cU("vd_lT not supported on complex poly.");
      }
    };
    this.vd_kU = function (vd_fQ) {
      return vd_aS[vd_fQ];
    };
    this.vd_jv = function () {
      return vd_aS.length;
    };
    this.vd_lE = function () {
      return vd_aS[0].vd_lE();
    };
    this.getX = function (index) {
      return vd_aS[0].getX(index);
    };
    this.getY = function (index) {
      return vd_aS[0].getY(index);
    };
    this.vd_nK = function () {
      if (vd_aS.length > 1) {
        throw new vd_cU("Cannot call on a poly made up of more than one poly.");
      }
      return vd_tr;
    };
    this.vd_zb = function (vd_nK) {
      if (vd_aS.length > 1) {
        throw new vd_cU("Cannot call on a poly made up of more than one poly.");
      }
      vd_tr = vd_nK;
    };
    this.vd_yK = function (vd_fQ) {
      return vd_aS[vd_fQ].vd_yK(0);
    };
    this.vd_oR = function (vd_fQ, vd_wS) {
      if (vd_aS.length != 1) {
        throw new vd_cU("Only applies to polys of size 1");
      }
      vd_aS[vd_fQ].vd_oR(0, vd_wS);
    };
    return this;
  }
  var vd_Eo = -3.40282e38;
  var vd_Fc = 2.2204460492503131e-16;
  var LEFT = 0;
  var RIGHT = 1;
  var ABOVE = 0;
  var BELOW = 1;
  var CLIP = 0;
  var vd_S = 1;
  function vd_rf() {
    return new vd_ud();
  }
  function vd_MG(op, subj, clip) {
    var result = vd_rf();
    if (
      (subj.vd_bK() && clip.vd_bK()) ||
      (subj.vd_bK() && (op == vd_aP.vd_fS || op == vd_aP.vd_eF)) ||
      (clip.vd_bK() && op == vd_aP.vd_fS)
    ) {
      return result;
    }
    if (
      (op == vd_aP.vd_fS || op == vd_aP.vd_eF) &&
      !subj.vd_bK() &&
      !clip.vd_bK()
    ) {
      vd_Bj(subj, clip, op);
    }
    var vd_cG = new vd_BY();
    var sbte = new vd_Gq();
    var vd_zi = null;
    var vd_ui = null;
    if (!subj.vd_bK()) {
      vd_zi = vd_sT(vd_cG, sbte, subj, vd_S, op);
    }
    if (!clip.vd_bK()) {
      vd_ui = vd_sT(vd_cG, sbte, clip, CLIP, op);
    }
    if (vd_cG.vd_A == null) {
      return result;
    }
    var sbt = sbte.vd_FX();
    var vd_B = [0, 0];
    vd_B[0] = LEFT;
    vd_B[1] = LEFT;
    if (op == vd_aP.vd_eF) {
      vd_B[CLIP] = RIGHT;
    }
    var vd_gS = vd_cG.vd_A;
    var vd_co = new vd_KT();
    var aet = new vd_Aq();
    var vd_fR = 0;
    while (vd_fR < sbt.length) {
      var yb = sbt[vd_fR++];
      var yt = 0.0;
      var dy = 0.0;
      if (vd_fR < sbt.length) {
        yt = sbt[vd_fR];
        dy = yt - yb;
      }
      if (vd_gS != null) {
        if (vd_gS.y == yb) {
          for (var edge = vd_gS.vd_kc; edge != null; edge = edge.vd_ea) {
            vd_Bd(aet, edge);
          }
          vd_gS = vd_gS.next;
        }
      }
      var px = vd_Eo;
      var e0 = aet.vd_A;
      var e1 = aet.vd_A;
      aet.vd_A.vd_H[ABOVE][aet.vd_A.type] = aet.vd_A.top[Y] != yb ? 1 : 0;
      aet.vd_A.vd_H[ABOVE][aet.vd_A.type == 0 ? 1 : 0] = 0;
      aet.vd_A.vd_bS[ABOVE] = vd_aq.vd_ht;
      for (var vd_L = aet.vd_A.next; vd_L != null; vd_L = vd_L.next) {
        var vd_iG = vd_L.type;
        var vd_kg = vd_L.type == 0 ? 1 : 0;
        vd_L.vd_H[ABOVE][vd_iG] = vd_L.top[Y] != yb ? 1 : 0;
        vd_L.vd_H[ABOVE][vd_kg] = 0;
        vd_L.vd_bS[ABOVE] = vd_aq.vd_ht;
        if (vd_L.vd_H[ABOVE][vd_iG] == 1) {
          if (EQ(e0.xb, vd_L.xb) && EQ(e0.dx, vd_L.dx) && e0.top[Y] != yb) {
            vd_L.vd_H[ABOVE][vd_iG] ^= e0.vd_H[ABOVE][vd_iG];
            vd_L.vd_H[ABOVE][vd_kg] = e0.vd_H[ABOVE][vd_kg];
            vd_L.vd_bS[ABOVE] = vd_aq.vd_fZ;
            e0.vd_H[ABOVE][CLIP] = 0;
            e0.vd_H[ABOVE][vd_S] = 0;
            e0.vd_bS[ABOVE] = vd_aq.vd_im;
          }
          e0 = vd_L;
        }
      }
      var vd_bC = [0, 0];
      vd_bC[CLIP] = vd_l.NH;
      vd_bC[vd_S] = vd_l.NH;
      var vd_ao = [0, 0];
      vd_ao[CLIP] = 0;
      vd_ao[vd_S] = 0;
      var cf = null;
      for (var edge = aet.vd_A; edge != null; edge = edge.next) {
        vd_ao[CLIP] = edge.vd_H[ABOVE][CLIP] + (edge.vd_H[BELOW][CLIP] << 1);
        vd_ao[vd_S] = edge.vd_H[ABOVE][vd_S] + (edge.vd_H[BELOW][vd_S] << 1);
        if (vd_ao[CLIP] != 0 || vd_ao[vd_S] != 0) {
          edge.vd_aY[CLIP] = vd_B[CLIP];
          edge.vd_aY[vd_S] = vd_B[vd_S];
          var vd_fY = false;
          var br = 0,
            bl = 0,
            tr = 0,
            tl = 0;
          if (op == vd_aP.vd_eF || op == vd_aP.vd_fS) {
            vd_fY =
              (vd_ao[CLIP] != 0 && (vd_B[vd_S] != 0 || vd_bC[vd_S] != 0)) ||
              (vd_ao[vd_S] != 0 && (vd_B[CLIP] != 0 || vd_bC[CLIP] != 0)) ||
              (vd_ao[CLIP] != 0 &&
                vd_ao[vd_S] != 0 &&
                vd_B[CLIP] == vd_B[vd_S]);
            br = vd_B[CLIP] != 0 && vd_B[vd_S] != 0 ? 1 : 0;
            bl =
              (vd_B[CLIP] ^ edge.vd_H[ABOVE][CLIP]) != 0 &&
              (vd_B[vd_S] ^ edge.vd_H[ABOVE][vd_S]) != 0
                ? 1
                : 0;
            tr =
              (vd_B[CLIP] ^ (vd_bC[CLIP] != vd_l.NH ? 1 : 0)) != 0 &&
              (vd_B[vd_S] ^ (vd_bC[vd_S] != vd_l.NH ? 1 : 0)) != 0
                ? 1
                : 0;
            tl =
              (vd_B[CLIP] ^
                (vd_bC[CLIP] != vd_l.NH ? 1 : 0) ^
                edge.vd_H[BELOW][CLIP]) !=
                0 &&
              (vd_B[vd_S] ^
                (vd_bC[vd_S] != vd_l.NH ? 1 : 0) ^
                edge.vd_H[BELOW][vd_S]) !=
                0
                ? 1
                : 0;
          } else if (op == vd_aP.vd_ox) {
            vd_fY = vd_ao[CLIP] != 0 || vd_ao[vd_S] != 0;
            br = vd_B[CLIP] ^ vd_B[vd_S];
            bl =
              vd_B[CLIP] ^
              edge.vd_H[ABOVE][CLIP] ^
              (vd_B[vd_S] ^ edge.vd_H[ABOVE][vd_S]);
            tr =
              vd_B[CLIP] ^
              (vd_bC[CLIP] != vd_l.NH ? 1 : 0) ^
              (vd_B[vd_S] ^ (vd_bC[vd_S] != vd_l.NH ? 1 : 0));
            tl =
              vd_B[CLIP] ^
              (vd_bC[CLIP] != vd_l.NH ? 1 : 0) ^
              edge.vd_H[BELOW][CLIP] ^
              (vd_B[vd_S] ^
                (vd_bC[vd_S] != vd_l.NH ? 1 : 0) ^
                edge.vd_H[BELOW][vd_S]);
          } else if (op == vd_aP.vd_uf) {
            vd_fY =
              (vd_ao[CLIP] != 0 && (!(vd_B[vd_S] != 0) || vd_bC[vd_S] != 0)) ||
              (vd_ao[vd_S] != 0 && (!(vd_B[CLIP] != 0) || vd_bC[CLIP] != 0)) ||
              (vd_ao[CLIP] != 0 &&
                vd_ao[vd_S] != 0 &&
                vd_B[CLIP] == vd_B[vd_S]);
            br = vd_B[CLIP] != 0 || vd_B[vd_S] != 0 ? 1 : 0;
            bl =
              (vd_B[CLIP] ^ edge.vd_H[ABOVE][CLIP]) != 0 ||
              (vd_B[vd_S] ^ edge.vd_H[ABOVE][vd_S]) != 0
                ? 1
                : 0;
            tr =
              (vd_B[CLIP] ^ (vd_bC[CLIP] != vd_l.NH ? 1 : 0)) != 0 ||
              (vd_B[vd_S] ^ (vd_bC[vd_S] != vd_l.NH ? 1 : 0)) != 0
                ? 1
                : 0;
            tl =
              (vd_B[CLIP] ^
                (vd_bC[CLIP] != vd_l.NH ? 1 : 0) ^
                edge.vd_H[BELOW][CLIP]) !=
                0 ||
              (vd_B[vd_S] ^
                (vd_bC[vd_S] != vd_l.NH ? 1 : 0) ^
                edge.vd_H[BELOW][vd_S]) !=
                0
                ? 1
                : 0;
          } else {
            throw new vd_cU("Unknown op");
          }
          vd_B[CLIP] ^= edge.vd_H[ABOVE][CLIP];
          vd_B[vd_S] ^= edge.vd_H[ABOVE][vd_S];
          if (vd_ao[CLIP] != 0) {
            vd_bC[CLIP] =
              vd_l.vd_tb[vd_bC[CLIP]][((vd_ao[CLIP] - 1) << 1) + vd_B[CLIP]];
          }
          if (vd_ao[vd_S] != 0) {
            vd_bC[vd_S] =
              vd_l.vd_tb[vd_bC[vd_S]][((vd_ao[vd_S] - 1) << 1) + vd_B[vd_S]];
          }
          if (vd_fY) {
            var xb = edge.xb;
            var vd_kl = vd_O.vd_tp(tr, tl, br, bl);
            switch (vd_kl) {
              case vd_O.EMN:
              case vd_O.IMN:
                edge.vd_E[ABOVE] = vd_co.vd_kB(xb, yb);
                px = xb;
                cf = edge.vd_E[ABOVE];
                break;
              case vd_O.ERI:
                if (xb != px) {
                  cf.vd_iW(xb, yb);
                  px = xb;
                }
                edge.vd_E[ABOVE] = cf;
                cf = null;
                break;
              case vd_O.ELI:
                edge.vd_E[BELOW].vd_it(xb, yb);
                px = xb;
                cf = edge.vd_E[BELOW];
                break;
              case vd_O.EMX:
                if (xb != px) {
                  cf.vd_it(xb, yb);
                  px = xb;
                }
                vd_co.vd_qN(cf, edge.vd_E[BELOW]);
                cf = null;
                break;
              case vd_O.ILI:
                if (xb != px) {
                  cf.vd_it(xb, yb);
                  px = xb;
                }
                edge.vd_E[ABOVE] = cf;
                cf = null;
                break;
              case vd_O.IRI:
                edge.vd_E[BELOW].vd_iW(xb, yb);
                px = xb;
                cf = edge.vd_E[BELOW];
                edge.vd_E[BELOW] = null;
                break;
              case vd_O.IMX:
                if (xb != px) {
                  cf.vd_iW(xb, yb);
                  px = xb;
                }
                vd_co.vd_qI(cf, edge.vd_E[BELOW]);
                cf = null;
                edge.vd_E[BELOW] = null;
                break;
              case vd_O.IMM:
                if (xb != px) {
                  cf.vd_iW(xb, yb);
                  px = xb;
                }
                vd_co.vd_qI(cf, edge.vd_E[BELOW]);
                edge.vd_E[BELOW] = null;
                edge.vd_E[ABOVE] = vd_co.vd_kB(xb, yb);
                cf = edge.vd_E[ABOVE];
                break;
              case vd_O.EMM:
                if (xb != px) {
                  cf.vd_it(xb, yb);
                  px = xb;
                }
                vd_co.vd_qN(cf, edge.vd_E[BELOW]);
                edge.vd_E[BELOW] = null;
                edge.vd_E[ABOVE] = vd_co.vd_kB(xb, yb);
                cf = edge.vd_E[ABOVE];
                break;
              case vd_O.LED:
                if (edge.bot[Y] == yb) edge.vd_E[BELOW].vd_it(xb, yb);
                edge.vd_E[ABOVE] = edge.vd_E[BELOW];
                px = xb;
                break;
              case vd_O.RED:
                if (edge.bot[Y] == yb) edge.vd_E[BELOW].vd_iW(xb, yb);
                edge.vd_E[ABOVE] = edge.vd_E[BELOW];
                px = xb;
                break;
              default:
                break;
            }
          }
        }
      }
      for (var edge = aet.vd_A; edge != null; edge = edge.next) {
        if (edge.top[Y] == yb) {
          var vd_F = edge.prev;
          var vd_L = edge.next;
          if (vd_F != null) vd_F.next = vd_L;
          else aet.vd_A = vd_L;
          if (vd_L != null) vd_L.prev = vd_F;
          if (edge.vd_bS[BELOW] == vd_aq.vd_fZ && vd_F != null) {
            if (vd_F.vd_bS[BELOW] == vd_aq.vd_im) {
              vd_F.vd_E[BELOW] = edge.vd_E[BELOW];
              vd_F.vd_bS[BELOW] = vd_aq.vd_ht;
              if (vd_F.prev != null) {
                if (vd_F.prev.vd_bS[BELOW] == vd_aq.vd_im) {
                  vd_F.vd_bS[BELOW] = vd_aq.vd_fZ;
                }
              }
            }
          }
        } else {
          if (edge.top[Y] == yt) edge.xt = edge.top[X];
          else edge.xt = edge.bot[X] + edge.dx * (yt - edge.bot[Y]);
        }
      }
      if (vd_fR < sbte.vd_jJ) {
        var vd_pe = new vd_Az();
        vd_pe.vd_Gf(aet, dy);
        for (var vd_eD = vd_pe.vd_A; vd_eD != null; vd_eD = vd_eD.next) {
          e0 = vd_eD.ie[0];
          e1 = vd_eD.ie[1];
          if (
            (e0.vd_H[ABOVE][CLIP] != 0 || e0.vd_H[ABOVE][vd_S] != 0) &&
            (e1.vd_H[ABOVE][CLIP] != 0 || e1.vd_H[ABOVE][vd_S] != 0)
          ) {
            var p = e0.vd_E[ABOVE];
            var q = e1.vd_E[ABOVE];
            var ix = vd_eD.point[X];
            var iy = vd_eD.point[Y] + yb;
            var vd_bB =
              (e0.vd_H[ABOVE][CLIP] != 0 && !(e0.vd_aY[CLIP] != 0)) ||
              (e1.vd_H[ABOVE][CLIP] != 0 && e1.vd_aY[CLIP] != 0) ||
              (!(e0.vd_H[ABOVE][CLIP] != 0) &&
                !(e1.vd_H[ABOVE][CLIP] != 0) &&
                e0.vd_aY[CLIP] != 0 &&
                e1.vd_aY[CLIP] != 0)
                ? 1
                : 0;
            var vd_aU =
              (e0.vd_H[ABOVE][vd_S] != 0 && !(e0.vd_aY[vd_S] != 0)) ||
              (e1.vd_H[ABOVE][vd_S] != 0 && e1.vd_aY[vd_S] != 0) ||
              (!(e0.vd_H[ABOVE][vd_S] != 0) &&
                !(e1.vd_H[ABOVE][vd_S] != 0) &&
                e0.vd_aY[vd_S] != 0 &&
                e1.vd_aY[vd_S] != 0)
                ? 1
                : 0;
            var tr = 0,
              tl = 0,
              br = 0,
              bl = 0;
            if (op == vd_aP.vd_eF || op == vd_aP.vd_fS) {
              tr = vd_bB != 0 && vd_aU != 0 ? 1 : 0;
              tl =
                (vd_bB ^ e1.vd_H[ABOVE][CLIP]) != 0 &&
                (vd_aU ^ e1.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
              br =
                (vd_bB ^ e0.vd_H[ABOVE][CLIP]) != 0 &&
                (vd_aU ^ e0.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
              bl =
                (vd_bB ^ e1.vd_H[ABOVE][CLIP] ^ e0.vd_H[ABOVE][CLIP]) != 0 &&
                (vd_aU ^ e1.vd_H[ABOVE][vd_S] ^ e0.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
            } else if (op == vd_aP.vd_ox) {
              tr = vd_bB ^ vd_aU;
              tl =
                vd_bB ^ e1.vd_H[ABOVE][CLIP] ^ (vd_aU ^ e1.vd_H[ABOVE][vd_S]);
              br =
                vd_bB ^ e0.vd_H[ABOVE][CLIP] ^ (vd_aU ^ e0.vd_H[ABOVE][vd_S]);
              bl =
                vd_bB ^
                e1.vd_H[ABOVE][CLIP] ^
                e0.vd_H[ABOVE][CLIP] ^
                (vd_aU ^ e1.vd_H[ABOVE][vd_S] ^ e0.vd_H[ABOVE][vd_S]);
            } else if (op == vd_aP.vd_uf) {
              tr = vd_bB != 0 || vd_aU != 0 ? 1 : 0;
              tl =
                (vd_bB ^ e1.vd_H[ABOVE][CLIP]) != 0 ||
                (vd_aU ^ e1.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
              br =
                (vd_bB ^ e0.vd_H[ABOVE][CLIP]) != 0 ||
                (vd_aU ^ e0.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
              bl =
                (vd_bB ^ e1.vd_H[ABOVE][CLIP] ^ e0.vd_H[ABOVE][CLIP]) != 0 ||
                (vd_aU ^ e1.vd_H[ABOVE][vd_S] ^ e0.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
            } else {
              throw new vd_cU("Unknown op type, " + op);
            }
            var vd_kl = vd_O.vd_tp(tr, tl, br, bl);
            switch (vd_kl) {
              case vd_O.EMN:
                e0.vd_E[ABOVE] = vd_co.vd_kB(ix, iy);
                e1.vd_E[ABOVE] = e0.vd_E[ABOVE];
                break;
              case vd_O.ERI:
                if (p != null) {
                  p.vd_iW(ix, iy);
                  e1.vd_E[ABOVE] = p;
                  e0.vd_E[ABOVE] = null;
                }
                break;
              case vd_O.ELI:
                if (q != null) {
                  q.vd_it(ix, iy);
                  e0.vd_E[ABOVE] = q;
                  e1.vd_E[ABOVE] = null;
                }
                break;
              case vd_O.EMX:
                if (p != null && q != null) {
                  p.vd_it(ix, iy);
                  vd_co.vd_qN(p, q);
                  e0.vd_E[ABOVE] = null;
                  e1.vd_E[ABOVE] = null;
                }
                break;
              case vd_O.IMN:
                e0.vd_E[ABOVE] = vd_co.vd_kB(ix, iy);
                e1.vd_E[ABOVE] = e0.vd_E[ABOVE];
                break;
              case vd_O.ILI:
                if (p != null) {
                  p.vd_it(ix, iy);
                  e1.vd_E[ABOVE] = p;
                  e0.vd_E[ABOVE] = null;
                }
                break;
              case vd_O.IRI:
                if (q != null) {
                  q.vd_iW(ix, iy);
                  e0.vd_E[ABOVE] = q;
                  e1.vd_E[ABOVE] = null;
                }
                break;
              case vd_O.IMX:
                if (p != null && q != null) {
                  p.vd_iW(ix, iy);
                  vd_co.vd_qI(p, q);
                  e0.vd_E[ABOVE] = null;
                  e1.vd_E[ABOVE] = null;
                }
                break;
              case vd_O.IMM:
                if (p != null && q != null) {
                  p.vd_iW(ix, iy);
                  vd_co.vd_qI(p, q);
                  e0.vd_E[ABOVE] = vd_co.vd_kB(ix, iy);
                  e1.vd_E[ABOVE] = e0.vd_E[ABOVE];
                }
                break;
              case vd_O.EMM:
                if (p != null && q != null) {
                  p.vd_it(ix, iy);
                  vd_co.vd_qN(p, q);
                  e0.vd_E[ABOVE] = vd_co.vd_kB(ix, iy);
                  e1.vd_E[ABOVE] = e0.vd_E[ABOVE];
                }
                break;
              default:
                break;
            }
          }
          if (e0.vd_H[ABOVE][CLIP] != 0)
            e1.vd_aY[CLIP] = e1.vd_aY[CLIP] == 0 ? 1 : 0;
          if (e1.vd_H[ABOVE][CLIP] != 0)
            e0.vd_aY[CLIP] = e0.vd_aY[CLIP] == 0 ? 1 : 0;
          if (e0.vd_H[ABOVE][vd_S] != 0)
            e1.vd_aY[vd_S] = e1.vd_aY[vd_S] == 0 ? 1 : 0;
          if (e1.vd_H[ABOVE][vd_S] != 0)
            e0.vd_aY[vd_S] = e0.vd_aY[vd_S] == 0 ? 1 : 0;
          var vd_F = e0.prev;
          var vd_L = e1.next;
          if (vd_L != null) {
            vd_L.prev = e0;
          }
          if (e0.vd_bS[ABOVE] == vd_aq.vd_fZ) {
            var search = true;
            while (search) {
              vd_F = vd_F.prev;
              if (vd_F != null) {
                if (vd_F.vd_bS[ABOVE] != vd_aq.vd_im) {
                  search = false;
                }
              } else {
                search = false;
              }
            }
          }
          if (vd_F == null) {
            aet.vd_A.prev = e1;
            e1.next = aet.vd_A;
            aet.vd_A = e0.next;
          } else {
            vd_F.next.prev = e1;
            e1.next = vd_F.next;
            vd_F.next = e0.next;
          }
          e0.next.prev = vd_F;
          e1.next.prev = e1;
          e0.next = vd_L;
        }
        for (var edge = aet.vd_A; edge != null; edge = edge.next) {
          var vd_L = edge.next;
          var vd_ck = edge.succ;
          if (edge.top[Y] == yt && vd_ck != null) {
            vd_ck.vd_E[BELOW] = edge.vd_E[ABOVE];
            vd_ck.vd_bS[BELOW] = edge.vd_bS[ABOVE];
            vd_ck.vd_H[BELOW][CLIP] = edge.vd_H[ABOVE][CLIP];
            vd_ck.vd_H[BELOW][vd_S] = edge.vd_H[ABOVE][vd_S];
            var vd_F = edge.prev;
            if (vd_F != null) vd_F.next = vd_ck;
            else aet.vd_A = vd_ck;
            if (vd_L != null) vd_L.prev = vd_ck;
            vd_ck.prev = vd_F;
            vd_ck.next = vd_L;
          } else {
            edge.vd_E[BELOW] = edge.vd_E[ABOVE];
            edge.vd_bS[BELOW] = edge.vd_bS[ABOVE];
            edge.vd_H[BELOW][CLIP] = edge.vd_H[ABOVE][CLIP];
            edge.vd_H[BELOW][vd_S] = edge.vd_H[ABOVE][vd_S];
            edge.xb = edge.xt;
          }
          edge.vd_E[ABOVE] = null;
        }
      }
    }
    result = vd_co.vd_IC();
    return result;
  }
  function EQ(a, b) {
    return Math.abs(a - b) <= vd_Fc;
  }
  function vd_kk(i, n) {
    return (i - 1 + n) % n;
  }
  function vd_mQ(i, n) {
    return (i + 1) % n;
  }
  function vd_Nv(p, i) {
    return (
      p.getY(vd_kk(i, p.vd_lE())) != p.getY(i) ||
      p.getY(vd_mQ(i, p.vd_lE())) != p.getY(i)
    );
  }
  function vd_Br(p) {
    var box = [];
    box.length = p.vd_jv();
    for (var c = 0; c < p.vd_jv(); c++) {
      var vd_Nr = p.vd_kU(c);
      box[c] = vd_Nr.vd_lT();
    }
    return box;
  }
  function vd_Bj(subj, clip, op) {
    var vd_vd = vd_Br(subj);
    var vd_sA = vd_Br(clip);
    var vd_pE = subj.vd_jv();
    var vd_qb = clip.vd_jv();
    var vd_my = [];
    vd_my.length = vd_pE;
    for (var i = 0; i < vd_pE; i++) {
      vd_my[i] = [];
      vd_my[i].length = vd_qb;
    }
    for (var s = 0; s < vd_pE; s++) {
      for (var c = 0; c < vd_qb; c++) {
        vd_my[s][c] =
          !(
            vd_vd[s].vd_bg[X] < vd_sA[c].vd_bi[X] ||
            vd_vd[s].vd_bi[X] > vd_sA[c].vd_bg[X]
          ) &&
          !(
            vd_vd[s].vd_bg[Y] < vd_sA[c].vd_bi[Y] ||
            vd_vd[s].vd_bi[Y] > vd_sA[c].vd_bg[Y]
          );
      }
    }
    for (var c = 0; c < vd_qb; c++) {
      var vd_kS = false;
      for (var s = 0; !vd_kS && s < vd_pE; s++) {
        vd_kS = vd_my[s][c];
      }
      if (!vd_kS) {
        clip.vd_oR(c, false);
      }
    }
    if (op == vd_aP.vd_fS) {
      for (var s = 0; s < vd_pE; s++) {
        var vd_kS = false;
        for (var c = 0; !vd_kS && c < vd_qb; c++) {
          vd_kS = vd_my[s][c];
        }
        if (!vd_kS) {
          subj.vd_oR(s, false);
        }
      }
    }
  }
  function vd_zW(vd_cG, y) {
    if (vd_cG.vd_A == null) {
      vd_cG.vd_A = new vd_wi(y);
      return vd_cG.vd_A;
    } else {
      var prev = null;
      var vd_Y = vd_cG.vd_A;
      var done = false;
      while (!done) {
        if (y < vd_Y.y) {
          var vd_pv = vd_Y;
          vd_Y = new vd_wi(y);
          vd_Y.next = vd_pv;
          if (prev == null) {
            vd_cG.vd_A = vd_Y;
          } else {
            prev.next = vd_Y;
          }
          done = true;
        } else if (y > vd_Y.y) {
          if (vd_Y.next == null) {
            vd_Y.next = new vd_wi(y);
            vd_Y = vd_Y.next;
            done = true;
          } else {
            prev = vd_Y;
            vd_Y = vd_Y.next;
          }
        } else {
          done = true;
        }
      }
      return vd_Y;
    }
  }
  function vd_zd(vd_nV, e) {
    if (vd_nV.vd_kc == null) {
      vd_nV.vd_kc = e;
    } else {
      var done = false;
      var vd_nf = null;
      var vd_eL = vd_nV.vd_kc;
      while (!done) {
        if (e.bot[X] < vd_eL.bot[X]) {
          if (vd_nf == null) {
            vd_nV.vd_kc = e;
          } else {
            vd_nf.vd_ea = e;
          }
          e.vd_ea = vd_eL;
          done = true;
        } else if (e.bot[X] == vd_eL.bot[X]) {
          if (e.dx < vd_eL.dx) {
            if (vd_nf == null) {
              vd_nV.vd_kc = e;
            } else {
              vd_nf.vd_ea = e;
            }
            e.vd_ea = vd_eL;
            done = true;
          } else {
            if (vd_eL.vd_ea == null) {
              vd_eL.vd_ea = e;
              done = true;
            } else {
              vd_nf = vd_eL;
              vd_eL = vd_eL.vd_ea;
            }
          }
        } else {
          if (vd_eL.vd_ea == null) {
            vd_eL.vd_ea = e;
            done = true;
          } else {
            vd_nf = vd_eL;
            vd_eL = vd_eL.vd_ea;
          }
        }
      }
    }
  }
  function vd_Bd(aet, edge) {
    if (aet.vd_A == null) {
      aet.vd_A = edge;
      edge.prev = null;
      edge.next = null;
    } else {
      var vd_ds = aet.vd_A;
      var prev = null;
      var done = false;
      while (!done) {
        if (edge.xb < vd_ds.xb) {
          edge.prev = prev;
          edge.next = vd_ds;
          vd_ds.prev = edge;
          if (prev == null) {
            aet.vd_A = edge;
          } else {
            prev.next = edge;
          }
          done = true;
        } else if (edge.xb == vd_ds.xb) {
          if (edge.dx < vd_ds.dx) {
            edge.prev = prev;
            edge.next = vd_ds;
            vd_ds.prev = edge;
            if (prev == null) {
              aet.vd_A = edge;
            } else {
              prev.next = edge;
            }
            done = true;
          } else {
            prev = vd_ds;
            if (vd_ds.next == null) {
              vd_ds.next = edge;
              edge.prev = vd_ds;
              edge.next = null;
              done = true;
            } else {
              vd_ds = vd_ds.next;
            }
          }
        } else {
          prev = vd_ds;
          if (vd_ds.next == null) {
            vd_ds.next = edge;
            edge.prev = vd_ds;
            edge.next = null;
            done = true;
          } else {
            vd_ds = vd_ds.next;
          }
        }
      }
    }
  }
  function vd_In(sbte, y) {
    if (sbte.vd_qw == null) {
      sbte.vd_qw = new vd_wG(y);
      sbte.vd_jJ++;
      return;
    }
    var vd_hb = sbte.vd_qw;
    var done = false;
    while (!done) {
      if (vd_hb.y > y) {
        if (vd_hb.less == null) {
          vd_hb.less = new vd_wG(y);
          sbte.vd_jJ++;
          done = true;
        } else {
          vd_hb = vd_hb.less;
        }
      } else if (vd_hb.y < y) {
        if (vd_hb.more == null) {
          vd_hb.more = new vd_wG(y);
          sbte.vd_jJ++;
          done = true;
        } else {
          vd_hb = vd_hb.more;
        }
      } else {
        done = true;
      }
    }
  }
  function vd_sT(vd_cG, sbte, p, type, op) {
    var vd_dq = new vd_Bo();
    for (var c = 0; c < p.vd_jv(); c++) {
      var ip = p.vd_kU(c);
      if (!ip.vd_yK(0)) {
        ip.vd_oR(0, true);
      } else {
        var vd_jb = 0;
        var vd_gf = 0;
        vd_dq = new vd_Bo();
        for (var i = 0; i < ip.vd_lE(); i++) {
          if (vd_Nv(ip, i)) {
            var x = ip.getX(i);
            var y = ip.getY(i);
            vd_dq.vd_JW(x, y);
            vd_In(sbte, ip.getY(i));
            vd_jb++;
          }
        }
        for (var min = 0; min < vd_jb; min++) {
          if (vd_dq.vd_Ib(min)) {
            var vd_ee = 1;
            var max = vd_mQ(min, vd_jb);
            while (vd_dq.vd_Ly(max)) {
              vd_ee++;
              max = vd_mQ(max, vd_jb);
            }
            var v = min;
            var e = vd_dq.vd_dY(vd_gf);
            e.vd_bS[BELOW] = vd_aq.vd_ht;
            e.vd_H[BELOW][CLIP] = 0;
            e.vd_H[BELOW][vd_S] = 0;
            for (var i = 0; i < vd_ee; i++) {
              var ei = vd_dq.vd_dY(vd_gf + i);
              var ev = vd_dq.vd_dY(v);
              ei.xb = ev.vd_I[X];
              ei.bot[X] = ev.vd_I[X];
              ei.bot[Y] = ev.vd_I[Y];
              v = vd_mQ(v, vd_jb);
              ev = vd_dq.vd_dY(v);
              ei.top[X] = ev.vd_I[X];
              ei.top[Y] = ev.vd_I[Y];
              ei.dx = (ev.vd_I[X] - ei.bot[X]) / (ei.top[Y] - ei.bot[Y]);
              ei.type = type;
              ei.vd_E[ABOVE] = null;
              ei.vd_E[BELOW] = null;
              ei.next = null;
              ei.prev = null;
              ei.succ =
                vd_ee > 1 && i < vd_ee - 1 ? vd_dq.vd_dY(vd_gf + i + 1) : null;
              ei.pred = vd_ee > 1 && i > 0 ? vd_dq.vd_dY(vd_gf + i - 1) : null;
              ei.vd_ea = null;
              ei.vd_aY[CLIP] = op == vd_aP.vd_eF ? RIGHT : LEFT;
              ei.vd_aY[vd_S] = LEFT;
            }
            vd_zd(vd_zW(vd_cG, vd_dq.vd_dY(min).vd_I[Y]), e);
            vd_gf += vd_ee;
          }
        }
        for (var min = 0; min < vd_jb; min++) {
          if (vd_dq.vd_Ov(min)) {
            var vd_ee = 1;
            var max = vd_kk(min, vd_jb);
            while (vd_dq.vd_Mj(max)) {
              vd_ee++;
              max = vd_kk(max, vd_jb);
            }
            var v = min;
            var e = vd_dq.vd_dY(vd_gf);
            e.vd_bS[BELOW] = vd_aq.vd_ht;
            e.vd_H[BELOW][CLIP] = 0;
            e.vd_H[BELOW][vd_S] = 0;
            for (var i = 0; i < vd_ee; i++) {
              var ei = vd_dq.vd_dY(vd_gf + i);
              var ev = vd_dq.vd_dY(v);
              ei.xb = ev.vd_I[X];
              ei.bot[X] = ev.vd_I[X];
              ei.bot[Y] = ev.vd_I[Y];
              v = vd_kk(v, vd_jb);
              ev = vd_dq.vd_dY(v);
              ei.top[X] = ev.vd_I[X];
              ei.top[Y] = ev.vd_I[Y];
              ei.dx = (ev.vd_I[X] - ei.bot[X]) / (ei.top[Y] - ei.bot[Y]);
              ei.type = type;
              ei.vd_E[ABOVE] = null;
              ei.vd_E[BELOW] = null;
              ei.next = null;
              ei.prev = null;
              ei.succ =
                vd_ee > 1 && i < vd_ee - 1 ? vd_dq.vd_dY(vd_gf + i + 1) : null;
              ei.pred = vd_ee > 1 && i > 0 ? vd_dq.vd_dY(vd_gf + i - 1) : null;
              ei.vd_ea = null;
              ei.vd_aY[CLIP] = op == vd_aP.vd_eF ? RIGHT : LEFT;
              ei.vd_aY[vd_S] = LEFT;
            }
            vd_zd(vd_zW(vd_cG, vd_dq.vd_dY(min).vd_I[Y]), e);
            vd_gf += vd_ee;
          }
        }
      }
    }
    return vd_dq;
  }
  function vd_CD(st, it, edge, dy) {
    if (st == null) {
      st = new vd_Fs(edge, null);
    } else {
      var den = st.xt - st.xb - (edge.xt - edge.xb);
      if (edge.xt >= st.xt || edge.dx == st.dx || Math.abs(den) <= vd_Fc) {
        var vd_pv = st;
        st = new vd_Fs(edge, vd_pv);
      } else {
        var r = (edge.xb - st.xb) / den;
        var x = st.xb + r * (st.xt - st.xb);
        var y = r * dy;
        it.vd_A = vd_Ce(it.vd_A, st.edge, edge, x, y);
        st.prev = vd_CD(st.prev, it, edge, dy);
      }
    }
    return st;
  }
  function vd_Ce(vd_ji, vd_rh, vd_kK, x, y) {
    if (vd_ji == null) {
      vd_ji = new vd_Ax(vd_rh, vd_kK, x, y, null);
    } else {
      if (vd_ji.point[Y] > y) {
        var vd_pv = vd_ji;
        vd_ji = new vd_Ax(vd_rh, vd_kK, x, y, vd_pv);
      } else {
        vd_ji.next = vd_Ce(vd_ji.next, vd_rh, vd_kK, x, y);
      }
    }
    return vd_ji;
  }
  this.OPER_DIFF = 0;
  this.OPER_INT = 1;
  this.OPER_XOR = 2;
  this.OPER_UNION = 3;
  var vd_aP = {
    vd_eF: vd_i.OPER_DIFF,
    vd_fS: vd_i.OPER_INT,
    vd_ox: vd_i.OPER_XOR,
    vd_uf: vd_i.OPER_UNION,
  };
  var vd_O = {
    NUL: 0,
    EMX: 1,
    ELI: 2,
    TED: 3,
    ERI: 4,
    RED: 5,
    IMM: 6,
    IMN: 7,
    EMN: 8,
    EMM: 9,
    LED: 10,
    ILI: 11,
    BED: 12,
    IRI: 13,
    IMX: 14,
    FUL: 15,
    vd_tp: function (tr, tl, br, bl) {
      return tr + (tl << 1) + (br << 2) + (bl << 3);
    },
  };
  var vd_l = {};
  vd_l.NH = 0;
  vd_l.BH = 1;
  vd_l.TH = 2;
  vd_l.vd_tb = [
    [vd_l.BH, vd_l.TH, vd_l.TH, vd_l.BH, vd_l.NH, vd_l.NH],
    [vd_l.NH, vd_l.NH, vd_l.NH, vd_l.NH, vd_l.TH, vd_l.TH],
    [vd_l.NH, vd_l.NH, vd_l.NH, vd_l.NH, vd_l.BH, vd_l.BH],
  ];
  var vd_aq = { vd_ht: "vd_ht", vd_fZ: "vd_fZ", vd_im: "vd_im" };
  function vd_rC(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.next = null;
    return this;
  }
  function vd_AG(next, x, y) {
    var vd_i = this;
    this.hole = false;
    var vn = new vd_rC(x, y);
    this.v = [];
    this.v[LEFT] = vn;
    this.v[RIGHT] = vn;
    this.next = next;
    this.proxy = this;
    this.active = 1;
    this.vd_iW = function (x, y) {
      var nv = new vd_rC(x, y);
      vd_i.proxy.v[RIGHT].next = nv;
      vd_i.proxy.v[RIGHT] = nv;
    };
    this.vd_it = function (x, y) {
      var nv = new vd_rC(x, y);
      nv.next = vd_i.proxy.v[LEFT];
      vd_i.proxy.v[LEFT] = nv;
    };
    return this;
  }
  function vd_KT(top) {
    var vd_A = top;
    this.vd_kB = function (x, y) {
      var vd_JB = vd_A;
      vd_A = new vd_AG(vd_JB, x, y);
      return vd_A;
    };
    this.vd_qI = function (p, q) {
      q.proxy.hole = true;
      if (p.proxy != q.proxy) {
        p.proxy.v[RIGHT].next = q.proxy.v[LEFT];
        q.proxy.v[LEFT] = p.proxy.v[LEFT];
        var target = p.proxy;
        for (var vd_Y = vd_A; vd_Y != null; vd_Y = vd_Y.next) {
          if (vd_Y.proxy == target) {
            vd_Y.active = 0;
            vd_Y.proxy = q.proxy;
          }
        }
      }
    };
    this.vd_qN = function (p, q) {
      q.proxy.hole = false;
      if (p.proxy != q.proxy) {
        q.proxy.v[RIGHT].next = p.proxy.v[LEFT];
        q.proxy.v[RIGHT] = p.proxy.v[RIGHT];
        var target = p.proxy;
        for (var vd_Y = vd_A; vd_Y != null; vd_Y = vd_Y.next) {
          if (vd_Y.proxy == target) {
            vd_Y.active = 0;
            vd_Y.proxy = q.proxy;
          }
        }
      }
    };
    function vd_JR() {
      var nc = 0;
      for (var polygon = vd_A; polygon != null; polygon = polygon.next) {
        if (polygon.active != 0) {
          var nv = 0;
          for (var v = polygon.proxy.v[LEFT]; v != null; v = v.next) {
            nv++;
          }
          if (nv > 2) {
            polygon.active = nv;
            nc++;
          } else {
            polygon.active = 0;
          }
        }
      }
      return nc;
    }
    this.vd_IC = function () {
      var result = vd_rf();
      var vd_wK = vd_JR();
      if (vd_wK > 0) {
        var c = 0;
        var vd_Ej = null;
        for (var vd_lw = vd_A; vd_lw != null; vd_lw = vd_Ej) {
          vd_Ej = vd_lw.next;
          if (vd_lw.active != 0) {
            var poly = result;
            if (vd_wK > 1) {
              poly = vd_rf();
            }
            if (vd_lw.proxy.hole) {
              poly.vd_zb(vd_lw.proxy.hole);
            }
            for (var vtx = vd_lw.proxy.v[LEFT]; vtx != null; vtx = vtx.next) {
              poly.add(vtx.x, vtx.y);
            }
            if (vd_wK > 1) {
              result.vd_py(poly);
            }
            c++;
          }
        }
        var orig = result;
        result = vd_rf();
        for (var i = 0; i < orig.vd_jv(); i++) {
          var inner = orig.vd_kU(i);
          if (!inner.vd_nK()) {
            result.vd_py(inner);
          }
        }
        for (var i = 0; i < orig.vd_jv(); i++) {
          var inner = orig.vd_kU(i);
          if (inner.vd_nK()) {
            result.vd_py(inner);
          }
        }
      }
      return result;
    };
    return this;
  }
  function vd_HX() {
    this.vd_I = [0, 0, 0];
    this.bot = [0, 0, 0];
    this.top = [0, 0, 0];
    this.xb = 0;
    this.xt = 0;
    this.dx = 0;
    this.type = 0;
    this.vd_H = [
      [0, 0],
      [0, 0],
    ];
    this.vd_aY = [0, 0];
    this.vd_bS = [vd_aq.vd_ht, vd_aq.vd_ht];
    this.vd_E = [null, null];
    this.prev = null;
    this.next = null;
    this.pred = null;
    this.succ = null;
    this.vd_ea = null;
    return this;
  }
  function vd_Aq() {
    this.vd_A = null;
    return this;
  }
  function vd_Bo() {
    var vd_aS = [];
    this.vd_JW = function (x, y) {
      var vd_Y = new vd_HX();
      vd_Y.vd_I[X] = x;
      vd_Y.vd_I[Y] = y;
      vd_aS.push(vd_Y);
    };
    this.vd_dY = function (index) {
      return vd_aS[index];
    };
    this.vd_Ib = function (i) {
      var prev = vd_aS[vd_kk(i, vd_aS.length)];
      var next = vd_aS[vd_mQ(i, vd_aS.length)];
      var ith = vd_aS[i];
      return prev.vd_I[Y] >= ith.vd_I[Y] && next.vd_I[Y] > ith.vd_I[Y];
    };
    this.vd_Ly = function (i) {
      var next = vd_aS[vd_mQ(i, vd_aS.length)];
      var ith = vd_aS[i];
      return next.vd_I[Y] > ith.vd_I[Y];
    };
    this.vd_Ov = function (i) {
      var prev = vd_aS[vd_kk(i, vd_aS.length)];
      var next = vd_aS[vd_mQ(i, vd_aS.length)];
      var ith = vd_aS[i];
      return prev.vd_I[Y] > ith.vd_I[Y] && next.vd_I[Y] >= ith.vd_I[Y];
    };
    this.vd_Mj = function (i) {
      var prev = vd_aS[vd_kk(i, vd_aS.length)];
      var ith = vd_aS[i];
      return prev.vd_I[Y] > ith.vd_I[Y];
    };
    return this;
  }
  function vd_wi(vd_wD) {
    this.y = vd_wD;
    this.vd_kc = null;
    this.next = null;
    return this;
  }
  function vd_BY() {
    this.vd_A = null;
    return this;
  }
  function vd_wG(vd_wD) {
    this.y = vd_wD;
    this.less = null;
    this.more = null;
    return this;
  }
  function vd_Gq() {
    var vd_i = this;
    this.vd_jJ = null;
    this.vd_qw = null;
    this.vd_FX = function () {
      var sbt = [];
      sbt.length = vd_i.vd_jJ;
      var vd_gx = 0;
      vd_gx = vd_wa(vd_gx, sbt, vd_i.vd_qw);
      if (vd_gx != vd_i.vd_jJ) {
        throw new vd_cU("Something went wrong buildign sbt from tree.");
      }
      return sbt;
    };
    function vd_wa(vd_gx, sbt, vd_nU) {
      if (vd_nU.less != null) {
        vd_gx = vd_wa(vd_gx, sbt, vd_nU.less);
      }
      sbt[vd_gx] = vd_nU.y;
      vd_gx++;
      if (vd_nU.more != null) {
        vd_gx = vd_wa(vd_gx, sbt, vd_nU.more);
      }
      return vd_gx;
    }
    return this;
  }
  function vd_Ax(vd_rh, vd_kK, x, y, next) {
    this.ie = [vd_rh, vd_kK];
    this.point = [x, y, 0];
    this.next = next;
    return this;
  }
  function vd_Az() {
    this.vd_A = null;
    this.vd_Gf = function (aet, dy) {
      var st = null;
      for (var edge = aet.vd_A; edge != null; edge = edge.next) {
        if (
          edge.vd_bS[ABOVE] == vd_aq.vd_fZ ||
          edge.vd_H[ABOVE][CLIP] != 0 ||
          edge.vd_H[ABOVE][vd_S] != 0
        ) {
          st = vd_CD(st, this, edge, dy);
        }
      }
    };
    return this;
  }
  function vd_Fs(edge, prev) {
    this.edge = edge;
    this.xb = edge.xb;
    this.xt = edge.xt;
    this.dx = edge.dx;
    this.prev = prev;
    return this;
  }
  function vd_ey(tn, edge, x, y) {
    if (!tn) {
      tn = new vd_AG(null, x, y);
      tn.next = null;
      tn.v[LEFT] = null;
      tn.v[RIGHT] = null;
      tn.active = 1;
      tn.v[LEFT] = vd_uA(tn.v[LEFT], x, y);
      edge.vd_E[ABOVE] = tn;
    } else tn.next = vd_ey(tn.next, edge, x, y);
    return tn;
  }
  function vd_uA(t, x, y) {
    if (!t) {
      t = new vd_rC(x, y);
      t.next = null;
    } else t.next = vd_uA(t.next, x, y);
    return t;
  }
  function vd_bj(e, p, s, x, y) {
    e.vd_E[p].v[s] = vd_uA(e.vd_E[p].v[s], x, y);
    e.vd_E[p].active++;
  }
  function vd_Kt(tn) {
    var total;
    for (total = 0; tn != null; tn = tn.next) if (tn.active > 2) total++;
    return total;
  }
  function vd_ps(d, e, p) {
    d = e;
    do {
      d = d.next;
    } while (d.vd_E[p] == null);
    return d;
  }
  function vd_oU(d, e, p) {
    d = e;
    do {
      d = d.prev;
    } while (d.vd_E[p] == null);
    return d;
  }
  function vd_gW(d, y) {
    return d.bot[X] + d.dx * (y - d.bot[Y]);
  }
  function vd_Jn(op, subj, clip) {
    var nx = 0.0;
    var cft = 0;
    var result = [];
    if (
      (subj.vd_bK() && clip.vd_bK()) ||
      (subj.vd_bK() && (op == vd_aP.vd_fS || op == vd_aP.vd_eF)) ||
      (clip.vd_bK() && op == vd_aP.vd_fS)
    ) {
      return result;
    }
    if (
      (op == vd_aP.vd_fS || op == vd_aP.vd_eF) &&
      !subj.vd_bK() &&
      !clip.vd_bK()
    ) {
      vd_Bj(subj, clip, op);
    }
    var vd_cG = new vd_BY();
    var sbte = new vd_Gq();
    var vd_zi = null;
    var vd_ui = null;
    if (!subj.vd_bK()) {
      vd_zi = vd_sT(vd_cG, sbte, subj, vd_S, op);
    }
    if (!clip.vd_bK()) {
      vd_ui = vd_sT(vd_cG, sbte, clip, CLIP, op);
    }
    if (vd_cG.vd_A == null) {
      return result;
    }
    var sbt = sbte.vd_FX();
    var vd_B = [0, 0];
    vd_B[0] = LEFT;
    vd_B[1] = LEFT;
    if (op == vd_aP.vd_eF) {
      vd_B[CLIP] = RIGHT;
    }
    var vd_gS = vd_cG.vd_A;
    var vd_bM = null;
    var aet = new vd_Aq();
    var vd_fR = 0;
    while (vd_fR < sbt.length) {
      var yb = sbt[vd_fR++];
      var yt = 0.0;
      var dy = 0.0;
      if (vd_fR < sbt.length) {
        yt = sbt[vd_fR];
        dy = yt - yb;
      }
      if (vd_gS != null) {
        if (vd_gS.y == yb) {
          for (var edge = vd_gS.vd_kc; edge != null; edge = edge.vd_ea) {
            vd_Bd(aet, edge);
          }
          vd_gS = vd_gS.next;
        }
      }
      var px = vd_Eo;
      var e0 = aet.vd_A;
      var e1 = aet.vd_A;
      aet.vd_A.vd_H[ABOVE][aet.vd_A.type] = aet.vd_A.top[Y] != yb ? 1 : 0;
      aet.vd_A.vd_H[ABOVE][aet.vd_A.type == 0 ? 1 : 0] = 0;
      aet.vd_A.vd_bS[ABOVE] = vd_aq.vd_ht;
      var vd_L = null;
      var vd_F = null;
      for (vd_L = aet.vd_A.next; vd_L != null; vd_L = vd_L.next) {
        var vd_iG = vd_L.type;
        var vd_kg = vd_L.type == 0 ? 1 : 0;
        vd_L.vd_H[ABOVE][vd_iG] = vd_L.top[Y] != yb ? 1 : 0;
        vd_L.vd_H[ABOVE][vd_kg] = 0;
        vd_L.vd_bS[ABOVE] = vd_aq.vd_ht;
        if (vd_L.vd_H[ABOVE][vd_iG] == 1) {
          if (EQ(e0.xb, vd_L.xb) && EQ(e0.dx, vd_L.dx) && e0.top[Y] != yb) {
            vd_L.vd_H[ABOVE][vd_iG] ^= e0.vd_H[ABOVE][vd_iG];
            vd_L.vd_H[ABOVE][vd_kg] = e0.vd_H[ABOVE][vd_kg];
            vd_L.vd_bS[ABOVE] = vd_aq.vd_fZ;
            e0.vd_H[ABOVE][CLIP] = 0;
            e0.vd_H[ABOVE][vd_S] = 0;
            e0.vd_bS[ABOVE] = vd_aq.vd_im;
          }
          e0 = vd_L;
        }
      }
      var vd_bC = [0, 0];
      vd_bC[CLIP] = vd_l.NH;
      vd_bC[vd_S] = vd_l.NH;
      var vd_ao = [0, 0];
      vd_ao[CLIP] = 0;
      vd_ao[vd_S] = 0;
      var cf = null;
      for (var edge = aet.vd_A; edge != null; edge = edge.next) {
        vd_ao[CLIP] = edge.vd_H[ABOVE][CLIP] + (edge.vd_H[BELOW][CLIP] << 1);
        vd_ao[vd_S] = edge.vd_H[ABOVE][vd_S] + (edge.vd_H[BELOW][vd_S] << 1);
        if (vd_ao[CLIP] != 0 || vd_ao[vd_S] != 0) {
          edge.vd_aY[CLIP] = vd_B[CLIP];
          edge.vd_aY[vd_S] = vd_B[vd_S];
          var vd_fY = false;
          var br = 0,
            bl = 0,
            tr = 0,
            tl = 0;
          if (op == vd_aP.vd_eF || op == vd_aP.vd_fS) {
            vd_fY =
              (vd_ao[CLIP] != 0 && (vd_B[vd_S] != 0 || vd_bC[vd_S] != 0)) ||
              (vd_ao[vd_S] != 0 && (vd_B[CLIP] != 0 || vd_bC[CLIP] != 0)) ||
              (vd_ao[CLIP] != 0 &&
                vd_ao[vd_S] != 0 &&
                vd_B[CLIP] == vd_B[vd_S]);
            br = vd_B[CLIP] != 0 && vd_B[vd_S] != 0 ? 1 : 0;
            bl =
              (vd_B[CLIP] ^ edge.vd_H[ABOVE][CLIP]) != 0 &&
              (vd_B[vd_S] ^ edge.vd_H[ABOVE][vd_S]) != 0
                ? 1
                : 0;
            tr =
              (vd_B[CLIP] ^ (vd_bC[CLIP] != vd_l.NH ? 1 : 0)) != 0 &&
              (vd_B[vd_S] ^ (vd_bC[vd_S] != vd_l.NH ? 1 : 0)) != 0
                ? 1
                : 0;
            tl =
              (vd_B[CLIP] ^
                (vd_bC[CLIP] != vd_l.NH ? 1 : 0) ^
                edge.vd_H[BELOW][CLIP]) !=
                0 &&
              (vd_B[vd_S] ^
                (vd_bC[vd_S] != vd_l.NH ? 1 : 0) ^
                edge.vd_H[BELOW][vd_S]) !=
                0
                ? 1
                : 0;
          } else if (op == vd_aP.vd_ox) {
            vd_fY = vd_ao[CLIP] != 0 || vd_ao[vd_S] != 0;
            br = vd_B[CLIP] ^ vd_B[vd_S];
            bl =
              vd_B[CLIP] ^
              edge.vd_H[ABOVE][CLIP] ^
              (vd_B[vd_S] ^ edge.vd_H[ABOVE][vd_S]);
            tr =
              vd_B[CLIP] ^
              (vd_bC[CLIP] != vd_l.NH ? 1 : 0) ^
              (vd_B[vd_S] ^ (vd_bC[vd_S] != vd_l.NH ? 1 : 0));
            tl =
              vd_B[CLIP] ^
              (vd_bC[CLIP] != vd_l.NH ? 1 : 0) ^
              edge.vd_H[BELOW][CLIP] ^
              (vd_B[vd_S] ^
                (vd_bC[vd_S] != vd_l.NH ? 1 : 0) ^
                edge.vd_H[BELOW][vd_S]);
          } else if (op == vd_aP.vd_uf) {
            vd_fY =
              (vd_ao[CLIP] != 0 && (!(vd_B[vd_S] != 0) || vd_bC[vd_S] != 0)) ||
              (vd_ao[vd_S] != 0 && (!(vd_B[CLIP] != 0) || vd_bC[CLIP] != 0)) ||
              (vd_ao[CLIP] != 0 &&
                vd_ao[vd_S] != 0 &&
                vd_B[CLIP] == vd_B[vd_S]);
            br = vd_B[CLIP] != 0 || vd_B[vd_S] != 0 ? 1 : 0;
            bl =
              (vd_B[CLIP] ^ edge.vd_H[ABOVE][CLIP]) != 0 ||
              (vd_B[vd_S] ^ edge.vd_H[ABOVE][vd_S]) != 0
                ? 1
                : 0;
            tr =
              (vd_B[CLIP] ^ (vd_bC[CLIP] != vd_l.NH ? 1 : 0)) != 0 ||
              (vd_B[vd_S] ^ (vd_bC[vd_S] != vd_l.NH ? 1 : 0)) != 0
                ? 1
                : 0;
            tl =
              (vd_B[CLIP] ^
                (vd_bC[CLIP] != vd_l.NH ? 1 : 0) ^
                edge.vd_H[BELOW][CLIP]) !=
                0 ||
              (vd_B[vd_S] ^
                (vd_bC[vd_S] != vd_l.NH ? 1 : 0) ^
                edge.vd_H[BELOW][vd_S]) !=
                0
                ? 1
                : 0;
          } else {
            throw new vd_cU("Unknown op");
          }
          vd_B[CLIP] ^= edge.vd_H[ABOVE][CLIP];
          vd_B[vd_S] ^= edge.vd_H[ABOVE][vd_S];
          if (vd_ao[CLIP] != 0) {
            vd_bC[CLIP] =
              vd_l.vd_tb[vd_bC[CLIP]][((vd_ao[CLIP] - 1) << 1) + vd_B[CLIP]];
          }
          if (vd_ao[vd_S] != 0) {
            vd_bC[vd_S] =
              vd_l.vd_tb[vd_bC[vd_S]][((vd_ao[vd_S] - 1) << 1) + vd_B[vd_S]];
          }
          if (vd_fY) {
            var xb = edge.xb;
            var vd_kl = vd_O.vd_tp(tr, tl, br, bl);
            switch (vd_kl) {
              case vd_O.EMN:
                vd_bM = vd_ey(vd_bM, edge, xb, yb);
                cf = edge;
                break;
              case vd_O.ERI:
                edge.vd_E[ABOVE] = cf.vd_E[ABOVE];
                if (xb != cf.xb) vd_bj(edge, ABOVE, RIGHT, xb, yb);
                cf = null;
                break;
              case vd_O.ELI:
                vd_bj(edge, BELOW, LEFT, xb, yb);
                edge.vd_E[ABOVE] = null;
                cf = edge;
                break;
              case vd_O.EMX:
                if (xb != cf.xb) vd_bj(edge, BELOW, RIGHT, xb, yb);
                edge.vd_E[ABOVE] = null;
                cf = null;
                break;
              case vd_O.IMN:
                if (cft == vd_O.LED) {
                  if (cf.bot[Y] != yb) vd_bj(cf, BELOW, LEFT, cf.xb, yb);
                  vd_bM = vd_ey(vd_bM, cf, cf.xb, yb);
                }
                edge.vd_E[ABOVE] = cf.vd_E[ABOVE];
                vd_bj(edge, ABOVE, RIGHT, xb, yb);
                break;
              case vd_O.ILI:
                vd_bM = vd_ey(vd_bM, edge, xb, yb);
                cf = edge;
                cft = vd_O.ILI;
                break;
              case vd_O.IRI:
                if (cft == vd_O.LED) {
                  if (cf.bot[Y] != yb) vd_bj(cf, BELOW, LEFT, cf.xb, yb);
                  vd_bM = vd_ey(vd_bM, cf, cf.xb, yb);
                }
                vd_bj(edge, BELOW, RIGHT, xb, yb);
                edge.vd_E[ABOVE] = null;
                break;
              case vd_O.IMX:
                vd_bj(edge, BELOW, LEFT, xb, yb);
                edge.vd_E[ABOVE] = null;
                cft = vd_O.IMX;
                break;
              case vd_O.IMM:
                vd_bj(edge, BELOW, LEFT, xb, yb);
                edge.vd_E[ABOVE] = cf.vd_E[ABOVE];
                if (xb != cf.xb) vd_bj(cf, ABOVE, RIGHT, xb, yb);
                cf = edge;
                break;
              case vd_O.EMM:
                vd_bj(edge, BELOW, RIGHT, xb, yb);
                edge.vd_E[ABOVE] = null;
                vd_bM = vd_ey(vd_bM, edge, xb, yb);
                cf = edge;
                break;
              case vd_O.LED:
                if (edge.bot[Y] == yb) vd_bj(edge, BELOW, LEFT, xb, yb);
                edge.vd_E[ABOVE] = edge.vd_E[BELOW];
                cf = edge;
                cft = vd_O.LED;
                break;
              case vd_O.RED:
                edge.vd_E[ABOVE] = cf.vd_E[ABOVE];
                if (cft == vd_O.LED) {
                  if (cf.bot[Y] == yb) {
                    vd_bj(edge, BELOW, RIGHT, xb, yb);
                  } else {
                    if (edge.bot[Y] == yb) {
                      vd_bj(cf, BELOW, LEFT, cf.xb, yb);
                      vd_bj(edge, BELOW, RIGHT, xb, yb);
                    }
                  }
                } else {
                  vd_bj(edge, BELOW, RIGHT, xb, yb);
                  vd_bj(edge, ABOVE, RIGHT, xb, yb);
                }
                cf = null;
                break;
              default:
                break;
            }
          }
        }
      }
      for (var edge = aet.vd_A; edge != null; edge = edge.next) {
        if (edge.top[Y] == yb) {
          vd_F = edge.prev;
          vd_L = edge.next;
          if (vd_F != null) vd_F.next = vd_L;
          else aet.vd_A = vd_L;
          if (vd_L != null) vd_L.prev = vd_F;
          if (edge.vd_bS[BELOW] == vd_aq.vd_fZ && vd_F != null) {
            if (vd_F.vd_bS[BELOW] == vd_aq.vd_im) {
              vd_F.vd_E[BELOW] = edge.vd_E[BELOW];
              vd_F.vd_bS[BELOW] = vd_aq.vd_ht;
              if (vd_F.prev != null) {
                if (vd_F.prev.vd_bS[BELOW] == vd_aq.vd_im) {
                  vd_F.vd_bS[BELOW] = vd_aq.vd_fZ;
                }
              }
            }
          }
        } else {
          if (edge.top[Y] == yt) edge.xt = edge.top[X];
          else edge.xt = edge.bot[X] + edge.dx * (yt - edge.bot[Y]);
        }
      }
      if (vd_fR < sbte.vd_jJ) {
        var vd_pe = new vd_Az();
        vd_pe.vd_Gf(aet, dy);
        for (var vd_eD = vd_pe.vd_A; vd_eD != null; vd_eD = vd_eD.next) {
          e0 = vd_eD.ie[0];
          e1 = vd_eD.ie[1];
          if (
            (e0.vd_H[ABOVE][CLIP] != 0 || e0.vd_H[ABOVE][vd_S] != 0) &&
            (e1.vd_H[ABOVE][CLIP] != 0 || e1.vd_H[ABOVE][vd_S] != 0)
          ) {
            var p = e0.vd_E[ABOVE];
            var q = e1.vd_E[ABOVE];
            var ix = vd_eD.point[X];
            var iy = vd_eD.point[Y] + yb;
            var vd_bB =
              (e0.vd_H[ABOVE][CLIP] != 0 && !(e0.vd_aY[CLIP] != 0)) ||
              (e1.vd_H[ABOVE][CLIP] != 0 && e1.vd_aY[CLIP] != 0) ||
              (!(e0.vd_H[ABOVE][CLIP] != 0) &&
                !(e1.vd_H[ABOVE][CLIP] != 0) &&
                e0.vd_aY[CLIP] != 0 &&
                e1.vd_aY[CLIP] != 0)
                ? 1
                : 0;
            var vd_aU =
              (e0.vd_H[ABOVE][vd_S] != 0 && !(e0.vd_aY[vd_S] != 0)) ||
              (e1.vd_H[ABOVE][vd_S] != 0 && e1.vd_aY[vd_S] != 0) ||
              (!(e0.vd_H[ABOVE][vd_S] != 0) &&
                !(e1.vd_H[ABOVE][vd_S] != 0) &&
                e0.vd_aY[vd_S] != 0 &&
                e1.vd_aY[vd_S] != 0)
                ? 1
                : 0;
            var tr = 0,
              tl = 0,
              br = 0,
              bl = 0;
            if (op == vd_aP.vd_eF || op == vd_aP.vd_fS) {
              tr = vd_bB != 0 && vd_aU != 0 ? 1 : 0;
              tl =
                (vd_bB ^ e1.vd_H[ABOVE][CLIP]) != 0 &&
                (vd_aU ^ e1.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
              br =
                (vd_bB ^ e0.vd_H[ABOVE][CLIP]) != 0 &&
                (vd_aU ^ e0.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
              bl =
                (vd_bB ^ e1.vd_H[ABOVE][CLIP] ^ e0.vd_H[ABOVE][CLIP]) != 0 &&
                (vd_aU ^ e1.vd_H[ABOVE][vd_S] ^ e0.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
            } else if (op == vd_aP.vd_ox) {
              tr = vd_bB ^ vd_aU;
              tl =
                vd_bB ^ e1.vd_H[ABOVE][CLIP] ^ (vd_aU ^ e1.vd_H[ABOVE][vd_S]);
              br =
                vd_bB ^ e0.vd_H[ABOVE][CLIP] ^ (vd_aU ^ e0.vd_H[ABOVE][vd_S]);
              bl =
                vd_bB ^
                e1.vd_H[ABOVE][CLIP] ^
                e0.vd_H[ABOVE][CLIP] ^
                (vd_aU ^ e1.vd_H[ABOVE][vd_S] ^ e0.vd_H[ABOVE][vd_S]);
            } else if (op == vd_aP.vd_uf) {
              tr = vd_bB != 0 || vd_aU != 0 ? 1 : 0;
              tl =
                (vd_bB ^ e1.vd_H[ABOVE][CLIP]) != 0 ||
                (vd_aU ^ e1.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
              br =
                (vd_bB ^ e0.vd_H[ABOVE][CLIP]) != 0 ||
                (vd_aU ^ e0.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
              bl =
                (vd_bB ^ e1.vd_H[ABOVE][CLIP] ^ e0.vd_H[ABOVE][CLIP]) != 0 ||
                (vd_aU ^ e1.vd_H[ABOVE][vd_S] ^ e0.vd_H[ABOVE][vd_S]) != 0
                  ? 1
                  : 0;
            } else {
              throw new vd_cU("Unknown op type, " + op);
            }
            var vd_kl = vd_O.vd_tp(tr, tl, br, bl);
            switch (vd_kl) {
              case vd_O.EMN:
                vd_bM = vd_ey(vd_bM, e1, ix, iy);
                e0.vd_E[ABOVE] = e1.vd_E[ABOVE];
                break;
              case vd_O.ERI:
                if (p != null) {
                  vd_F = vd_oU(vd_F, e0, ABOVE);
                  px = vd_gW(vd_F, iy);
                  vd_bj(vd_F, ABOVE, LEFT, px, iy);
                  vd_bj(e0, ABOVE, RIGHT, ix, iy);
                  e1.vd_E[ABOVE] = e0.vd_E[ABOVE];
                  e0.vd_E[ABOVE] = null;
                }
                break;
              case vd_O.ELI:
                if (q != null) {
                  vd_L = vd_ps(vd_L, e1, ABOVE);
                  nx = vd_gW(vd_L, iy);
                  vd_bj(e1, ABOVE, LEFT, ix, iy);
                  vd_bj(vd_L, ABOVE, RIGHT, nx, iy);
                  e0.vd_E[ABOVE] = e1.vd_E[ABOVE];
                  e1.vd_E[ABOVE] = null;
                }
                break;
              case vd_O.EMX:
                if (p != null && q != null) {
                  vd_bj(e0, ABOVE, LEFT, ix, iy);
                  e0.vd_E[ABOVE] = null;
                  e1.vd_E[ABOVE] = null;
                }
                break;
              case vd_O.IMN:
                vd_F = vd_oU(vd_F, e0, ABOVE);
                px = vd_gW(vd_F, iy);
                vd_bj(vd_F, ABOVE, LEFT, px, iy);
                vd_L = vd_ps(vd_L, e1, ABOVE);
                nx = vd_gW(vd_L, iy);
                vd_bj(vd_L, ABOVE, RIGHT, nx, iy);
                vd_bM = vd_ey(vd_bM, vd_F, px, iy);
                e1.vd_E[ABOVE] = vd_F.vd_E[ABOVE];
                vd_bj(e1, ABOVE, RIGHT, ix, iy);
                vd_bM = vd_ey(vd_bM, e0, ix, iy);
                vd_L.vd_E[ABOVE] = e0.vd_E[ABOVE];
                vd_bj(vd_L, ABOVE, RIGHT, nx, iy);
                break;
              case vd_O.ILI:
                if (p != null) {
                  vd_bj(e0, ABOVE, LEFT, ix, iy);
                  vd_L = vd_ps(vd_L, e1, ABOVE);
                  nx = vd_gW(vd_L, iy);
                  vd_bj(vd_L, ABOVE, RIGHT, nx, iy);
                  e1.vd_E[ABOVE] = e0.vd_E[ABOVE];
                  e0.vd_E[ABOVE] = null;
                }
                break;
              case vd_O.IRI:
                if (q != null) {
                  vd_bj(e1, ABOVE, RIGHT, ix, iy);
                  vd_F = vd_oU(vd_F, e0, ABOVE);
                  px = vd_gW(vd_F, iy);
                  vd_bj(vd_F, ABOVE, LEFT, px, iy);
                  e0.vd_E[ABOVE] = e1.vd_E[ABOVE];
                  e1.vd_E[ABOVE] = null;
                }
                break;
              case vd_O.IMX:
                if (p != null && q != null) {
                  vd_bj(e0, ABOVE, RIGHT, ix, iy);
                  vd_bj(e1, ABOVE, LEFT, ix, iy);
                  e0.vd_E[ABOVE] = null;
                  e1.vd_E[ABOVE] = null;
                  vd_F = vd_oU(vd_F, e0, ABOVE);
                  px = vd_gW(vd_F, iy);
                  vd_bj(vd_F, ABOVE, LEFT, px, iy);
                  vd_bM = vd_ey(vd_bM, vd_F, px, iy);
                  vd_L = vd_ps(vd_L, e1, ABOVE);
                  nx = vd_gW(vd_L, iy);
                  vd_bj(vd_L, ABOVE, RIGHT, nx, iy);
                  vd_L.vd_E[ABOVE] = vd_F.vd_E[ABOVE];
                  vd_bj(vd_L, ABOVE, RIGHT, nx, iy);
                }
                break;
              case vd_O.IMM:
                if (p != null && q != null) {
                  vd_bj(e0, ABOVE, RIGHT, ix, iy);
                  vd_bj(e1, ABOVE, LEFT, ix, iy);
                  vd_F = vd_oU(vd_F, e0, ABOVE);
                  px = vd_gW(vd_F, iy);
                  vd_bj(vd_F, ABOVE, LEFT, px, iy);
                  vd_bM = vd_ey(vd_bM, vd_F, px, iy);
                  vd_L = vd_ps(vd_L, e1, ABOVE);
                  nx = vd_gW(vd_L, iy);
                  vd_bj(vd_L, ABOVE, RIGHT, nx, iy);
                  e1.vd_E[ABOVE] = vd_F.vd_E[ABOVE];
                  vd_bj(e1, ABOVE, RIGHT, ix, iy);
                  vd_bM = vd_ey(vd_bM, e0, ix, iy);
                  vd_L.vd_E[ABOVE] = e0.vd_E[ABOVE];
                  vd_bj(vd_L, ABOVE, RIGHT, nx, iy);
                }
                break;
              case vd_O.EMM:
                if (p != null && q != null) {
                  vd_bj(e0, ABOVE, LEFT, ix, iy);
                  vd_bM = vd_ey(vd_bM, e1, ix, iy);
                  e0.vd_E[ABOVE] = e1.vd_E[ABOVE];
                }
                break;
              default:
                break;
            }
          }
          if (e0.vd_H[ABOVE][CLIP] != 0)
            e1.vd_aY[CLIP] = e1.vd_aY[CLIP] == 0 ? 1 : 0;
          if (e1.vd_H[ABOVE][CLIP] != 0)
            e0.vd_aY[CLIP] = e0.vd_aY[CLIP] == 0 ? 1 : 0;
          if (e0.vd_H[ABOVE][vd_S] != 0)
            e1.vd_aY[vd_S] = e1.vd_aY[vd_S] == 0 ? 1 : 0;
          if (e1.vd_H[ABOVE][vd_S] != 0)
            e0.vd_aY[vd_S] = e0.vd_aY[vd_S] == 0 ? 1 : 0;
          vd_F = e0.prev;
          vd_L = e1.next;
          if (vd_L != null) {
            vd_L.prev = e0;
          }
          if (e0.vd_bS[ABOVE] == vd_aq.vd_fZ) {
            var search = true;
            while (search) {
              vd_F = vd_F.prev;
              if (vd_F != null) {
                if (vd_F.vd_bS[ABOVE] != vd_aq.vd_im) {
                  search = false;
                }
              } else {
                search = false;
              }
            }
          }
          if (vd_F == null) {
            aet.vd_A.prev = e1;
            e1.next = aet.vd_A;
            aet.vd_A = e0.next;
          } else {
            vd_F.next.prev = e1;
            e1.next = vd_F.next;
            vd_F.next = e0.next;
          }
          e0.next.prev = vd_F;
          e1.next.prev = e1;
          e0.next = vd_L;
        }
        for (var edge = aet.vd_A; edge != null; edge = edge.next) {
          vd_L = edge.next;
          var vd_ck = edge.succ;
          if (edge.top[Y] == yt && vd_ck != null) {
            vd_ck.vd_E[BELOW] = edge.vd_E[ABOVE];
            vd_ck.vd_bS[BELOW] = edge.vd_bS[ABOVE];
            vd_ck.vd_H[BELOW][CLIP] = edge.vd_H[ABOVE][CLIP];
            vd_ck.vd_H[BELOW][vd_S] = edge.vd_H[ABOVE][vd_S];
            vd_F = edge.prev;
            if (vd_F != null) vd_F.next = vd_ck;
            else aet.vd_A = vd_ck;
            if (vd_L != null) vd_L.prev = vd_ck;
            vd_ck.prev = vd_F;
            vd_ck.next = vd_L;
          } else {
            edge.vd_E[BELOW] = edge.vd_E[ABOVE];
            edge.vd_bS[BELOW] = edge.vd_bS[ABOVE];
            edge.vd_H[BELOW][CLIP] = edge.vd_H[ABOVE][CLIP];
            edge.vd_H[BELOW][vd_S] = edge.vd_H[ABOVE][vd_S];
            edge.xb = edge.xt;
          }
          edge.vd_E[ABOVE] = null;
        }
      }
    }
    var tn, tnn;
    var lt, ltn, rt, rtn;
    var v = 0,
      s = 0;
    var vd_GA = vd_Kt(vd_bM);
    if (vd_GA > 0) {
      result = [];
      result.length = vd_GA;
      for (var i = 0; i < result.length; i++) {
        result[i] = [];
      }
      s = 0;
      for (tn = vd_bM; tn != null; tn = tnn) {
        tnn = tn.next;
        if (tn.active > 2) {
          result[s] = [];
          result[s].length = tn.active;
          v = 0;
          lt = tn.v[LEFT];
          rt = tn.v[RIGHT];
          while (lt != null || rt != null) {
            if (lt != null) {
              ltn = lt.next;
              result[s][v] = [lt.x, lt.y, 0];
              v++;
              lt = ltn;
            }
            if (rt != null) {
              rtn = rt.next;
              result[s][v] = [rt.x, rt.y, 0];
              v++;
              rt = rtn;
            }
          }
          s++;
        } else {
          for (lt = tn.v[LEFT]; lt != null; lt = ltn) {
            ltn = lt.next;
          }
          for (rt = tn.v[RIGHT]; rt != null; rt = rtn) {
            rtn = rt.next;
          }
        }
      }
    }
    return result;
  }
  function vd_Sd(poly) {
    var ret = [];
    var vd_Ob = poly.vd_jv();
    for (var i = 0; i < vd_Ob; i++) {
      var p2 = poly.vd_kU(i);
      var npts = p2.vd_lE();
      var pts = [];
      for (var k = 0; k < npts; k++) {
        pts.push([p2.getX(k), p2.getY(k), 0.0]);
      }
      ret.push(pts);
    }
    return ret;
  }
  function vd_Ns(pts) {
    var ret = new vd_ud();
    if (pts && pts.length > 0) {
      for (var k = 0; k < pts.length; k++) ret.add(pts[k][X], pts[k][Y]);
    }
    return ret;
  }
  this.vd_Gk = function (vd_sc, vd_sI) {
    var vd_kZ = [];
    for (var i = 0; i < vd_sc.length; i++) {
      var poly = vd_Ns(vd_sc[i]);
      vd_kZ.push(poly);
      if (vd_kZ.length == 2) {
        var p1 = vd_kZ[0];
        var p2 = vd_kZ[1];
        var oper = vd_aP.vd_ox;
        if (vd_sI) oper = vd_sI[i];
        var p = vd_MG(oper, p1, p2);
        vd_kZ = [p];
      }
    }
    if (vd_kZ.length > 0) return vd_kZ[0];
    else return null;
  };
  this.vd_Cj = function (p) {
    if (!p) return [];
    try {
      return vd_Jn(vd_aP.vd_eF, p, new vd_ud());
    } catch (ex) {
      return [];
    }
  };
  this.vd_FU = function (s) {
    var ret = [];
    if (!s) return ret;
    for (var k = 0; k < s.length; k++) {
      var pts = s[k];
      var ret1 = [];
      ret1.push(pts[0]);
      for (var i = 1; i < pts.length; i += 2) ret1.push(pts[i]);
      var j = pts.length - 1;
      if ((pts.length - 1) % 2.0 != 0.0) j--;
      for (var i = j; i >= 0; i -= 2) ret1.push(pts[i]);
      ret.push(ret1);
    }
    return ret;
  };
  this.clip_oper = function (vd_sc, vd_sI) {
    return vd_i.vd_FU(vd_i.vd_Cj(vd_i.vd_Gk(vd_sc, vd_sI)));
  };
  return this;
}
var gpc = new Clip();
function Edge(a, b) {
  this.vd_eO = a;
  this.vd_el = b;
  this.vd_hm = false;
  return this;
}
function vd_DY(a, b, c, eps, points) {
  var vd_i = this;
  this.vd_eO = a;
  this.vd_el = b;
  this.vd_fP = c;
  this.vd_hm = false;
  function vd_Lc(eps, points) {
    var cp1 = points[vd_i.vd_eO],
      cp2 = points[vd_i.vd_el],
      cp3 = points[vd_i.vd_fP];
    var radius;
    var vd_ij;
    var vd_qc;
    var m1;
    var m2;
    var mx1;
    var mx2;
    var my1;
    var my2;
    var dx;
    var dy;
    var rsqr;
    var vd_Dx = Math.abs(cp1[Y] - cp2[Y]) < eps;
    var vd_ED = Math.abs(cp2[Y] - cp3[Y]) < eps;
    if (vd_Dx && vd_ED) {
      return null;
    }
    if (vd_Dx) {
      m2 = -(cp3[X] - cp2[X]) / (cp3[Y] - cp2[Y]);
      mx2 = (cp2[X] + cp3[X]) / 2;
      my2 = (cp2[Y] + cp3[Y]) / 2;
      vd_ij = (cp2[X] + cp1[X]) / 2;
      vd_qc = m2 * (vd_ij - mx2) + my2;
    } else if (vd_ED) {
      m1 = -(cp2[X] - cp1[X]) / (cp2[Y] - cp1[Y]);
      mx1 = (cp1[X] + cp2[X]) / 2;
      my1 = (cp1[Y] + cp2[Y]) / 2;
      vd_ij = (cp3[X] + cp2[X]) / 2;
      vd_qc = m1 * (vd_ij - mx1) + my1;
    } else {
      m1 = -(cp2[X] - cp1[X]) / (cp2[Y] - cp1[Y]);
      m2 = -(cp3[X] - cp2[X]) / (cp3[Y] - cp2[Y]);
      mx1 = (cp1[X] + cp2[X]) / 2;
      mx2 = (cp2[X] + cp3[X]) / 2;
      my1 = (cp1[Y] + cp2[Y]) / 2;
      my2 = (cp2[Y] + cp3[Y]) / 2;
      vd_ij = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
      vd_qc = m1 * (vd_ij - mx1) + my1;
    }
    dx = cp2[X] - vd_ij;
    dy = cp2[Y] - vd_qc;
    rsqr = dx * dx + dy * dy;
    radius = Math.sqrt(rsqr);
    return [vd_ij, vd_qc, radius];
  }
  var vd_wh = vd_Lc(eps, points);
  this.vd_Nz = function (eps, pt) {
    if (vd_wh == null) return false;
    return vdgeo.Distance2D(pt, vd_wh) <= vd_wh[Z];
  };
  this.vd_OQ = function (p) {
    if (p == null) return false;
    if (vd_i == p) return true;
    return (
      vd_i.vd_eO == p.vd_eO ||
      vd_i.vd_eO == p.vd_el ||
      vd_i.vd_eO == p.vd_fP ||
      vd_i.vd_el == p.vd_eO ||
      vd_i.vd_el == p.vd_el ||
      vd_i.vd_el == p.vd_fP ||
      vd_i.vd_fP == p.vd_eO ||
      vd_i.vd_fP == p.vd_el ||
      vd_i.vd_fP == p.vd_fP
    );
  };
  return this;
}
var vd_Ab = {};
vd_Ab.vd_Aw = function (vd_qt, prec) {
  if (!vd_qt || vd_qt.length == 0) return null;
  var vd_ce = 1.0 / Math.pow(10, prec);
  var points = [];
  for (var i = 0; i < vd_qt.length; i++) {
    var pt = vd_qt[i];
    points.push([
      Number(pt[X].toFixed(prec)),
      Number(pt[Y].toFixed(prec)),
      Number(pt[Z].toFixed(prec)),
      i,
    ]);
  }
  points.sort(function (x, y) {
    var dif = vdgeo.Distance2D(x, [0, 0, 0]) - vdgeo.Distance2D(y, [0, 0, 0]);
    if (dif == 0.0) {
      if (x[Z] == y[Z]) return 0;
      else if (x[Z] > y[Z]) return 1;
      else return -1;
    }
    if (dif > 0.0) return 1;
    else return -1;
  });
  var tmp = [points[0]];
  var c = 0;
  for (var i = 1; i < points.length; i++) {
    if (vdgeo.AreEqual(vdgeo.Distance2D(tmp[c], points[i]), 0.0, vd_ce))
      continue;
    tmp.push(points[i]);
    c++;
  }
  points = tmp;
  points.sort(function (a, b) {
    return a[X] - b[X];
  });
  var vd_sx = points.length;
  var xmin;
  var xmax;
  var ymin;
  var ymax;
  var xmid;
  var ymid;
  var dx;
  var dy;
  var dmax;
  xmin = points[0][X];
  ymin = points[0][Y];
  xmax = xmin;
  ymax = ymin;
  for (var i = 1; i < points.length; i++) {
    if (points[i][X] < xmin) {
      xmin = points[i][X];
    }
    if (points[i][X] > xmax) {
      xmax = points[i][X];
    }
    if (points[i][Y] < ymin) {
      ymin = points[i][Y];
    }
    if (points[i][Y] > ymax) {
      ymax = points[i][Y];
    }
  }
  dx = xmax - xmin;
  dy = ymax - ymin;
  if (dx > dy) {
    dmax = dx;
  } else {
    dmax = dy;
  }
  xmid = (xmax + xmin) / 2.0;
  ymid = (ymax + ymin) / 2.0;
  var vd_Nb = [xmid - 2 * dmax, ymid - dmax, 0, -1];
  var vd_Np = [xmid, ymid + 2 * dmax, 0, -1];
  var vd_Oc = [xmid + 2 * dmax, ymid - dmax, 0, -1];
  points.push(vd_Nb);
  points.push(vd_Np);
  points.push(vd_Oc);
  var vd_Bc = new vd_DY(vd_sx, vd_sx + 1, vd_sx + 2, vd_ce, points);
  var vd_dU = [];
  var vd_hY;
  var vd_Pe = 0;
  vd_dU.push(vd_Bc);
  var vd_wp = 0;
  for (var vd_sV = vd_Pe; vd_sV < vd_sx; vd_sV++) {
    vd_hY = [];
    var tc = vd_dU.length;
    for (var itri = 0; itri < tc; itri++) {
      var tri = vd_dU[itri];
      if (tri.vd_hm) continue;
      var vd_Og = tri.vd_Nz(vd_ce, points[vd_sV]);
      if (vd_Og) {
        var vd_kK = new Edge(tri.vd_eO, tri.vd_el);
        var vd_KA = new Edge(tri.vd_el, tri.vd_fP);
        var vd_IT = new Edge(tri.vd_fP, tri.vd_eO);
        vd_hY.push(vd_kK);
        vd_hY.push(vd_KA);
        vd_hY.push(vd_IT);
        tri.vd_hm = true;
        vd_wp++;
      }
    }
    if (vd_wp > 0) {
      var vd_Gh = [];
      for (var itri = 0; itri < tc; itri++) {
        var tri = vd_dU[itri];
        if (tri.vd_hm) continue;
        vd_Gh.push(tri);
      }
      vd_dU = vd_Gh;
      tc = vd_dU.length;
      vd_wp = 0;
    }
    var ec = vd_hY.length;
    for (var i = 0; i < ec; i++) {
      var vd_ii = vd_hY[i];
      if (vd_ii.vd_hm) continue;
      for (var j = i + 1; j < vd_hY.length; j++) {
        var vd_tY = vd_hY[j];
        if (vd_tY.vd_hm) continue;
        if (vd_ii.vd_eO == vd_tY.vd_el) {
          if (vd_ii.vd_el == vd_tY.vd_eO) {
            vd_ii.vd_hm = true;
            vd_tY.vd_hm = true;
          }
        }
      }
    }
    for (var i = 0; i < ec; i++) {
      var vd_ii = vd_hY[i];
      if (vd_ii.vd_hm) continue;
      var trig = new vd_DY(vd_ii.vd_eO, vd_ii.vd_el, vd_sV, vd_ce, points);
      vd_dU.push(trig);
    }
  }
  var vd_uk = [];
  for (var i = 0; i < vd_dU.length; i++) {
    var vd_mX = vd_dU[i];
    if (vd_mX.vd_hm) continue;
    if (vd_mX.vd_OQ(vd_Bc)) {
      vd_mX.vd_hm = true;
      continue;
    }
    vd_uk.push(points[vd_mX.vd_eO][3]);
    vd_uk.push(points[vd_mX.vd_el][3]);
    vd_uk.push(points[vd_mX.vd_fP][3]);
  }
  return vd_uk;
};
var vd_dm = {};
vd_dm.vd_zU = [
  "FontFileVDS",
  "bytes",
  "vd_lm",
  "vd_yz",
  "ActiveLayOutRef",
  "ActiveLineTypeRef",
  "ActiveTextStyleRef",
  "ActiveLayerRef",
  "MaterialImageRef",
  "LayerRef",
  "LineTypeRef",
  "StyleRef",
  "BlockRef",
  "ExternalReference",
  "ShapeStyleRef",
  "vd_cX",
  "vd_mF",
  "OverAllLength",
  "segmentlength",
  "bytescount",
  "vd_av",
  "vd_Gy",
];
vd_dm.vd_Ff = function (vd_T) {
  if (vd_T.i == 0) {
    vd_T.vd_jK = 0;
    vd_T.string.push(
      vd_T.offset.join(""),
      "function f" + vd_T.vd_jK.toString() + "(){try{",
      vd_T.vd_cd
    );
  }
  do {
    if (vd_T.i == vd_T.vd_hO.length) break;
    var vd_M = vd_T.vd_hO[vd_T.i];
    vd_T.string.push(
      vd_T.offset.join(""),
      "_vdDocument." + vd_M + "=",
      vd_dm.vd_pu(vd_T.vdraw, vd_T.vd_lo, vd_T.obj[vd_M], vd_T.offset),
      ";",
      vd_T.vd_cd
    );
    var vd_Fe = vdgeo.vd_r((100.0 * vd_T.i) / vd_T.vd_hO.length);
    vd_T.i++;
    var vd_vN = vd_T.vdraw.vd_eP.Progress(vd_Fe, 100);
    if (vd_vN) {
      vd_T.vd_jK++;
      vd_T.string.push(
        vd_T.offset.join(""),
        "document._p(" +
          vd_Fe.toString() +
          ");}catch(ex){document._e(ex," +
          vd_T.vd_jK.toString() +
          ");return;}setTimeout(f" +
          vd_T.vd_jK.toString() +
          ",0);}",
        vd_T.vd_cd
      );
      vd_T.string.push(
        vd_T.offset.join(""),
        "function f" + vd_T.vd_jK.toString() + "(){try{",
        vd_T.vd_cd
      );
      setTimeout(function () {
        vd_dm.vd_Ff(vd_T);
      }, 0);
      return;
    }
  } while (true);
  if (vd_T.i == vd_T.vd_hO.length) {
    vd_T.string.push(vd_T.offset.join(""), "document._l();");
    vd_T.string.push(
      vd_T.offset.join(""),
      "} catch (ex) { document._e(ex, " + vd_T.vd_jK.toString() + "); } };",
      vd_T.vd_cd
    );
    vd_T.string.push(vd_T.offset.join(""), "f0();", vd_T.vd_cd);
    vd_T.vdraw.vd_eP.end();
    var ret = vd_T.string.join("");
    if (vd_T.vd_lo !== true) ret = vd_dm.vd_JS(ret, vd_T.vdraw, vd_T.obj);
    else if (vd_T.vdraw.vdAfterSaveDocument != null)
      vd_T.vdraw.vdAfterSaveDocument({ dataObject: vd_T.obj, dataStream: ret });
  }
};
vd_dm.vd_pu = function (vdraw, vd_lo, obj, offset) {
  var vd_MO = offset == undefined;
  if (vd_MO) {
    if (!obj) obj = vdraw.GetDocument();
    vdraw.vd_eP.start("Saving data", true);
  }
  if (offset == undefined) offset = [];
  var ret = "";
  var space = "\t";
  var vd_cd = "\n";
  var string = [];
  if (obj == null || obj == undefined) {
    string.push(" ");
  } else if (typeof obj == "object" && obj.join == undefined) {
    var vd_yy = obj.Model != undefined;
    var vd_hO = [];
    if (vd_yy) string.push("_vdDocument = ", vd_cd);
    string.push("{", vd_cd);
    offset.push(space);
    var vd_wC;
    for (vd_M in obj) {
      if (vdConst.vd_zx.indexOf(vd_M) >= 0) continue;
      if (vd_dm.vd_zU.indexOf(vd_M) >= 0) continue;
      if (vd_yy && vd_M.substr(0, 2) == "h_") {
        vd_wC = obj[vd_M];
        if (!vd_wC.Deleted && !vd_wC.excludeFromSave) vd_hO.push(vd_M);
        continue;
      }
      var value = obj[vd_M];
      if (typeof value == "function") continue;
      if (value == undefined) continue;
      if (vd_M == "jpegData" && typeof value == "string") {
        string.push(offset.join(""), vd_M, ":", "'", value, "'", ",", vd_cd);
        continue;
      }
      string.push(
        offset.join(""),
        vd_M,
        ":",
        vd_dm.vd_pu(vdraw, vd_lo, value, offset),
        ",",
        vd_cd
      );
    }
    offset.pop();
    string.push(offset.join(""), "}");
    if (vd_yy && vd_hO.length > 0) {
      string.push(";", vd_cd);
      var vd_T = {
        i: 0,
        vdraw: vdraw,
        obj: obj,
        vd_hO: vd_hO,
        string: string,
        offset: offset,
        vd_jK: 0,
        vd_lo: vd_lo,
        vd_cd: vd_cd,
      };
      vd_dm.vd_Ff(vd_T);
      return;
    }
  } else if (typeof obj == "object" && !(obj.join == undefined)) {
    var vd_oL;
    var vd_Kr = obj.length > 0 && typeof obj[0] == "object";
    if (vd_Kr) {
      string.push("[", vd_cd);
      offset.push(space);
      for (vd_M in obj) {
        vd_oL = vd_dm.vd_pu(vdraw, vd_lo, obj[vd_M], offset);
        if (vd_oL == "") continue;
        string.push(offset.join(""), vd_oL, ",", vd_cd);
      }
      offset.pop();
      string.push(offset.join(""), "]");
    } else {
      string.push("[");
      for (vd_M in obj) {
        vd_oL = vd_dm.vd_pu(vdraw, vd_lo, obj[vd_M], offset);
        if (vd_oL == "") continue;
        string.push(vd_oL, ",");
      }
      string.push("]");
    }
  } else if (typeof obj == "string") {
    if (obj.substr(0, 2) == "h_") {
      var vd_ww = vdraw.GetEntityItem(obj);
      if (!vd_ww || (!vd_ww.Deleted && !vd_ww.excludeFromSave))
        string.push("'" + obj + "'");
    } else {
      string.push("String.fromCharCode(");
      for (var s = 0; s < obj.length; s++) {
        string.push(obj.charCodeAt(s).toString());
        if (s < obj.length - 1) string.push(",");
      }
      string.push(")");
    }
  } else if (typeof obj == "function") {
    string.push(" ");
  } else {
    string.push(obj.toString());
  }
  ret = string.join("");
  return ret;
};
vd_dm.vd_EA = function (vd_T) {
  if (vd_T.i == 0) {
    for (var k = 0; k < 256; k++) {
      vd_T.vd_dZ[String.fromCharCode(k)] = vd_T.vd_BP++;
    }
    vd_T.vd_dG.push("document._d([[");
    vd_T.vdraw.vd_eP.start("Compressing data", true);
  }
  do {
    if (vd_T.i == vd_T.vd_nj.length) break;
    var c = vd_T.vd_nj[vd_T.i];
    var wc = vd_T.w + c;
    if (vd_T.vd_dZ.hasOwnProperty(wc)) {
      vd_T.w = wc;
    } else {
      vd_T.vd_dG.push(vd_T.vd_dZ[vd_T.w]);
      vd_T.ca++;
      if (vd_T.ca >= vd_T.vd_Mz) {
        vd_T.vd_dG.push(vd_T.vd_Fp);
        vd_T.ca = 0;
      } else {
        vd_T.vd_dG.push(",");
      }
      vd_T.vd_dZ[wc] = vd_T.vd_BP++;
      vd_T.w = c;
    }
    vd_T.i++;
    var vd_vN = vd_T.vdraw.vd_eP.Progress(vd_T.i, vd_T.vd_nj.length);
    if (vd_vN) {
      setTimeout(function () {
        vd_dm.vd_EA(vd_T);
      }, 0);
      return;
    }
  } while (true);
  if (vd_T.i == vd_T.vd_nj.length) {
    if (vd_T.w != "") vd_T.vd_dG.push(vd_T.vd_dZ[vd_T.w]);
    vd_T.vd_dG.push("]]);");
    vd_T.vdraw.vd_eP.end();
    if (vd_T.vdraw.vdAfterSaveDocument != null)
      vd_T.vdraw.vdAfterSaveDocument({
        dataObject: vd_T.dataObject,
        dataStream: vd_T.vd_dG.join(""),
      });
  }
};
vd_dm.vd_JS = function (vd_IB, vdraw, dataObject) {
  vd_dm.vd_EA({
    vd_Fp: "],\r\n[",
    vd_Mz: 32767,
    vdraw: vdraw,
    vd_nj: vd_IB,
    dataObject: dataObject,
    vd_dG: [],
    i: 0,
    vd_dZ: {},
    vd_BP: 0,
    ca: 0,
    w: "",
  });
  return;
};
function vd_hd() {
  var vd_i = this;
  this.vd_bi = vdgeo.newpoint(0, 0, 0);
  this.vd_bg = vdgeo.newpoint(0, 0, 0);
  this.vd_bK = true;
  this.vd_xq = function (x, y, z) {
    if (vd_i.vd_bK) {
      vd_i.vd_bi[X] = x;
      vd_i.vd_bi[Y] = y;
      vd_i.vd_bi[Z] = z;
      vd_i.vd_bg[X] = x;
      vd_i.vd_bg[Y] = y;
      vd_i.vd_bg[Z] = z;
      vd_i.vd_bK = false;
    } else {
      vd_i.vd_bi[X] = Math.min(vd_i.vd_bi[X], x);
      vd_i.vd_bi[Y] = Math.min(vd_i.vd_bi[Y], y);
      vd_i.vd_bi[Z] = Math.min(vd_i.vd_bi[Z], z);
      vd_i.vd_bg[X] = Math.max(vd_i.vd_bg[X], x);
      vd_i.vd_bg[Y] = Math.max(vd_i.vd_bg[Y], y);
      vd_i.vd_bg[Z] = Math.max(vd_i.vd_bg[Z], z);
    }
  };
  this.AddPoint = function (pt) {
    vd_i.vd_xq(pt[X], pt[Y], pt[Z]);
  };
  this.vd_RW = function (vd_ti) {
    if (!vd_ti || vd_ti.length == 0) return;
    for (var i = 0; i < vd_ti.length; i++) {
      vd_i.AddPoint(vd_ti[i]);
    }
  };
  this.AddBox = function (box) {
    if (!box || box.vd_bK) return;
    vd_i.AddPoint(box.vd_bi);
    vd_i.AddPoint(box.vd_bg);
  };
  this.vd_gJ = function (bbox) {
    if (!bbox) return;
    vd_i.vd_xq(bbox[0], bbox[1], bbox[2]);
    vd_i.vd_xq(bbox[3], bbox[4], bbox[5]);
  };
  this.vd_Bk = function (m) {
    var b1 = vdgeo.vd_gi(m, vd_i.vd_bi[X], vd_i.vd_bi[Y], vd_i.vd_bi[Z]);
    var b2 = vdgeo.vd_gi(m, vd_i.vd_bg[X], vd_i.vd_bi[Y], vd_i.vd_bi[Z]);
    var b3 = vdgeo.vd_gi(m, vd_i.vd_bg[X], vd_i.vd_bg[Y], vd_i.vd_bi[Z]);
    var b4 = vdgeo.vd_gi(m, vd_i.vd_bi[X], vd_i.vd_bg[Y], vd_i.vd_bi[Z]);
    var b5 = vdgeo.vd_gi(m, vd_i.vd_bi[X], vd_i.vd_bi[Y], vd_i.vd_bg[Z]);
    var b6 = vdgeo.vd_gi(m, vd_i.vd_bg[X], vd_i.vd_bi[Y], vd_i.vd_bg[Z]);
    var b7 = vdgeo.vd_gi(m, vd_i.vd_bg[X], vd_i.vd_bg[Y], vd_i.vd_bg[Z]);
    var b8 = vdgeo.vd_gi(m, vd_i.vd_bi[X], vd_i.vd_bg[Y], vd_i.vd_bg[Z]);
    vd_i.vd_bK = true;
    vd_i.AddPoint(b1);
    vd_i.AddPoint(b2);
    vd_i.AddPoint(b3);
    vd_i.AddPoint(b4);
    vd_i.AddPoint(b5);
    vd_i.AddPoint(b6);
    vd_i.AddPoint(b7);
    vd_i.AddPoint(b8);
  };
  this.vd_hl = function () {
    if (vd_i.vd_bK) return null;
    return [
      vd_i.vd_bi[X],
      vd_i.vd_bi[Y],
      vd_i.vd_bi[Z],
      vd_i.vd_bg[X],
      vd_i.vd_bg[Y],
      vd_i.vd_bg[Z],
    ];
  };
  this.vd_JT = function (width) {
    if (vd_i.vd_bK) return;
    vd_i.vd_bi[X] -= width;
    vd_i.vd_bi[Y] -= width;
    vd_i.vd_bg[X] += width;
    vd_i.vd_bg[Y] += width;
  };
  Object.defineProperty(vd_i, "Width", {
    get: function () {
      if (vd_i.vd_bK) return 0.0;
      return vd_i.vd_bg[X] - vd_i.vd_bi[X];
    },
  });
  Object.defineProperty(vd_i, "Height", {
    get: function () {
      if (vd_i.vd_bK) return 0.0;
      return vd_i.vd_bg[Y] - vd_i.vd_bi[Y];
    },
  });
  Object.defineProperty(vd_i, "Left", {
    get: function () {
      if (vd_i.vd_bK) return 0.0;
      return vd_i.vd_bi[X];
    },
  });
  Object.defineProperty(vd_i, "Bottom", {
    get: function () {
      if (vd_i.vd_bK) return 0.0;
      return vd_i.vd_bi[Y];
    },
  });
  Object.defineProperty(vd_i, "Right", {
    get: function () {
      if (vd_i.vd_bK) return 0.0;
      return vd_i.vd_bg[X];
    },
  });
  Object.defineProperty(vd_i, "Top", {
    get: function () {
      if (vd_i.vd_bK) return 0.0;
      return vd_i.vd_bg[Y];
    },
  });
  Object.defineProperty(vd_i, "vd_Di", {
    get: function () {
      if (vd_i.vd_bK) return true;
      return vd_i.Width == 0 && vd_i.Height == 0;
    },
  });
  return this;
}
function vd_Lr() {
  var vd_i = this;
  this.vd_qe = function (vd_ly, vd_jW) {
    return 1.0;
  };
  this.vd_tk = function (vd_ly, mat, vd_jW) {
    return;
  };
  this.vd_bY = function () {
    return vdConst.vd_et;
  };
  var vd_ay = new vd_hd();
  this.vd_gc = new vd_hd();
  this.vd_m = 10;
  this.vd_X = vdgeo.newpoint(0, 0, 0);
  this.vd_ca = vdgeo.vd_Q();
  this.vd_cC = vdgeo.vd_Q();
  this.vd_hr = vdgeo.vd_Q();
  this.pixelsize = 1.0;
  var vd_pi = null;
  this.vd_c = null;
  this.palette == null;
  this.vd_jH = 1.0;
  this.vd_cF = new Array();
  this.linetype = null;
  this.vd_ll = 1.0;
  var vd_dt = [0, 0, 0, 255];
  var vd_fv = [255, 255, 255, 255];
  var vd_dH = new Array(new Array(vdgeo.vd_Q(), vdgeo.vd_Q(), vdgeo.vd_Q()));
  this.vd_sC = function () {
    return false;
  };
  this.vd_NZ = function (render) {
    vd_pi = render;
  };
  this.GetPixelSize = function () {
    if (vd_pi) return vd_pi.pixelsize;
    return vd_i.pixelsize;
  };
  this.vd_dk = function () {
    if (vd_pi) return vd_pi.vd_dk();
    return vd_i.pixelsize;
  };
  this.vd_iA = function () {
    return vd_fv;
  };
  this.vd_jP = function () {
    return vd_dt;
  };
  this.vd_gQ = function (index) {
    return vd_fv;
  };
  this.vd_iv = function (vd_lb, vd_bT) {
    vd_i.palette = vd_lb;
    vd_i.vd_bF(vd_fv);
  };
  this.vd_aa = { left: 0, top: 0, right: 0, bottom: 0 };
  this.vd_At = function () {
    return vd_i.vd_m * vd_i.vd_xB();
  };
  this.vd_xB = function () {
    return 1;
  };
  this.vd_qD = function () {
    if (vd_i.vd_cF.length == 0) return null;
    return vd_i.vd_cF[vd_i.vd_cF.length - 1];
  };
  this.vd_lg = function (bval) {
    return ShowHidenEdges;
  };
  this.vd_nD = function (fig) {
    if (fig == null) {
      if (vd_i.vd_cF.length == 1) {
        vd_i.vd_gc.AddBox(vd_ay);
        vd_i.vd_qD().BoundingBox = vd_ay.vd_hl();
        vd_ay.vd_bK = true;
      }
      vd_i.vd_cF.pop();
    } else {
      vd_i.vd_cF.push(fig);
    }
  };
  this.vd_xv = function (ltscale) {
    return vd_i.vd_ll;
  };
  this.vd_xW = function (lt) {
    return vd_i.linetype;
  };
  this.vd_aQ = function (vd_oY) {
    return 0.0;
  };
  this.vd_bF = function (color) {
    return vd_fv;
  };
  this.vd_gj = function (vd_ct) {
    return null;
  };
  this.vd_hF = null;
  this.vd_dV = function (vd_nT) {
    return null;
  };
  this.vd_zk = function (vd_yP) {
    return false;
  };
  this.vd_aj = function (mat) {
    var m = vd_i.vd_ar();
    vd_dH.push(new Array(null, null, null));
    vd_i.vd_nP(mat ? vdgeo.vd_jL(mat, m) : mat);
  };
  this.vd_aW = function () {
    vd_dH.pop();
  };
  this.vd_ar = function () {
    return vd_dH[vd_dH.length - 1][0];
  };
  this.vd_fp = function () {
    return vd_dH[vd_dH.length - 1][1];
  };
  this.vd_Rw = function () {
    return null;
  };
  this.vd_nP = function (mat) {
    if (!mat) mat = vdgeo.vd_Q();
    vd_dH[vd_dH.length - 1][0] = mat;
  };
  this.clip = null;
  this.vd_Ow = function () {};
  this.vd_xp = function (left, top, right, bottom) {};
  this.vd_sf = function () {};
  this.update = function (vd_ki, vd_nk, vd_uj) {
    vd_i.vd_m = vd_ki;
    vd_i.pixelsize = 1;
    vd_i.vd_nP(vdgeo.vd_Q());
  };
  this.clear = function () {
    vd_ay.vd_bK = true;
    vd_i.vd_gc.vd_bK = true;
  };
  this.refresh = function () {};
  this.vd_cP = function (vd_iX, vd_je) {
    vd_ay.AddPoint(vdgeo.matrixtransform(this.vd_ar(), vd_iX));
    vd_ay.AddPoint(vdgeo.matrixtransform(this.vd_ar(), vd_je));
  };
  this.vd_EJ = function (vd_vD, direction, vd_Dd) {};
  this.vd_bt = function (pts, closed) {
    if (pts.length < 2) return;
    var sp = pts[0];
    for (var i = 1; i < pts.length; i++) {
      var ep = pts[i];
      vd_i.vd_cP(sp, ep);
      sp = ep;
    }
    if (closed) vd_i.vd_cP(pts[pts.length - 1], pts[0]);
  };
  this.vd_fH = function (pts) {
    this.vd_bt(pts, true);
  };
  this.vd_vP = function (p1, p2, p3, p4, vd_em, vd_ec, vd_hj, vd_hk) {
    vd_i.vd_hD(p1, p2, p3, p4, vd_em, vd_ec, vd_hj, vd_hk);
  };
  this.vd_hD = function (p1, p2, p3, p4, vd_em, vd_ec, vd_hj, vd_hk) {
    vd_i.vd_cP(p1, p2);
    vd_i.vd_cP(p2, p3);
    vd_i.vd_cP(p3, p4);
    vd_i.vd_cP(p4, p1);
  };
  this.vd_rp = function (vd_ac, vd_jt, vd_mm, vd_dl) {
    vd_ay.AddPoint(
      vdgeo.matrixtransform(this.vd_ar(), vdgeo.newpoint(0, vd_dl.Ascent, 0))
    );
    vd_ay.AddPoint(
      vdgeo.matrixtransform(
        this.vd_ar(),
        vdgeo.newpoint(vd_jt, vd_dl.Ascent, 0)
      )
    );
    vd_ay.AddPoint(
      vdgeo.matrixtransform(this.vd_ar(), vdgeo.newpoint(0, -vd_dl.Descent, 0))
    );
    vd_ay.AddPoint(
      vdgeo.matrixtransform(
        this.vd_ar(),
        vdgeo.newpoint(vd_jt, -vd_dl.Descent, 0)
      )
    );
  };
  this.vd_qj = function (vd_u, vd_yA, vd_ng, vd_nw) {
    if (vd_u == null) return;
    vd_ay.AddPoint(
      vdgeo.matrixtransform(this.vd_ar(), vdgeo.newpoint(0, 0, 0))
    );
    vd_ay.AddPoint(
      vdgeo.matrixtransform(this.vd_ar(), vdgeo.newpoint(vd_ng, 0, 0))
    );
    vd_ay.AddPoint(
      vdgeo.matrixtransform(this.vd_ar(), vdgeo.newpoint(vd_ng, vd_nw, 0))
    );
    vd_ay.AddPoint(
      vdgeo.matrixtransform(this.vd_ar(), vdgeo.newpoint(0, vd_nw, 0))
    );
  };
  this.vd_iZ = function (pt) {
    vd_ay.AddPoint(vdgeo.matrixtransform(this.vd_ar(), pt));
  };
  this.vd_qO = function (pts, vd_jq, vd_ob, vd_sk) {
    for (var i = 0; i < pts.length; i++) {
      pt = pts[i];
      vd_ay.AddPoint(vdgeo.matrixtransform(this.vd_ar(), pt));
    }
  };
  var vd_cq = vdgeo.newpoint(0, 0, 0);
  var vd_dO = vdgeo.newpoint(0, 0, 0);
  this.vd_iD = function (pts, thickness, closed) {
    if (pts.length < 2) return;
    if ((thickness == 0.0) | (thickness == undefined)) {
      vd_i.vd_bt(pts, closed);
      return;
    }
    for (var i = 1; i < pts.length; i++) {
      vd_cq[X] = pts[i - 1][X];
      vd_cq[Y] = pts[i - 1][Y];
      vd_cq[Z] = pts[i - 1][Z] + thickness;
      vd_dO[X] = pts[i][X];
      vd_dO[Y] = pts[i][Y];
      vd_dO[Z] = pts[i][Z] + thickness;
      vd_i.vd_hD(
        pts[i],
        pts[i - 1],
        vd_cq,
        vd_dO,
        true,
        true,
        true,
        i == pts.length - 1
      );
    }
    if (closed) {
      var vd_es = pts.length - 1;
      vd_cq[X] = pts[0][X];
      vd_cq[Y] = pts[0][Y];
      vd_cq[Z] = pts[0][Z] + thickness;
      vd_dO[X] = pts[vd_es][X];
      vd_dO[Y] = pts[vd_es][Y];
      vd_dO[Z] = pts[vd_es][Z] + thickness;
      vd_i.vd_hD(pts[vd_es], pts[0], vd_cq, vd_dO, true, false, true, true);
    }
  };
  this.vd_eY = function (vd_cy) {};
  this.vd_fJ = function (pts, vd_bJ, uvs, vd_ct) {
    vd_i.vd_fH(pts);
  };
  this.vd_gR = function (pts) {
    vd_i.vd_fH(pts);
  };
  this.vd_En = function (FaceList, VertexList) {
    var ii = 0;
    var p0, p1, p2, p3;
    for (var i = 0; i < FaceList.length; i = i + 5) {
      ii = FaceList[i];
      ii = Math.abs(ii);
      p0 = VertexList[ii - 1];
      ii = FaceList[i + 1];
      ii = Math.abs(ii);
      p1 = VertexList[ii - 1];
      ii = FaceList[i + 2];
      ii = Math.abs(ii);
      p2 = VertexList[ii - 1];
      ii = FaceList[i + 3];
      ii = Math.abs(ii);
      p3 = VertexList[ii - 1];
      vd_i.vd_hD(p0, p1, p2, p3, true, true, true, true);
    }
  };
  this.GetEntityFromPoint = function (x, y, vd_mE, vd_bq) {
    return null;
  };
  this.GetEntitiesFromBox = function (xmin, ymin, xmax, ymax, vd_bq) {
    return new Array();
  };
  return this;
}
function vd_HP(owner) {
  var vd_i = this;
  this.ResValue = null;
  this.actionType = vdConst.ACTION_POINT_WORLD;
  this.actionCount = 0;
  this.vd_MK = function () {
    if (vd_i.vd_z !== "select") return;
    if (!vd_kT) return;
    vd_kT = !vd_rm;
  };
  Object.defineProperty(vd_i, "vd_Hu", {
    get: function () {
      return vd_rm;
    },
  });
  this.IsCanceled = function () {
    return vd_kT;
  };
  this.IsStarted = function () {
    return vd_ax;
  };
  this.vdrawOwner = function () {
    return vd_e;
  };
  this.TouchSupported = function () {
    return (
      vd_EZ ||
      "ontouchstart" in document.documentElement ||
      "ontouchstart" in window
    );
  };
  this.DefaultActions = vdConst.DEFAULT_MOUSE_ACTION_ALL;
  this.DispProps = vdConst.ACTION_DISPLAY_DEFAULT;
  this.PanMouseButton = vdConst.MouseLeftButton;
  this.RotateMouseButton = vdConst.MouseMiddleButton | vdConst.MouseLeftButton;
  this.ZoomScaleMouseButton =
    vdConst.MouseMiddleButton | vdConst.MouseLeftButton;
  var vd_hI = null;
  var vd_kz = null;
  var vd_lx = null;
  this.TouchCancelTimeOut = -1600;
  var vd_EZ = false;
  this.vd_xO = function () {
    vd_EZ = true;
  };
  this.vd_oW = function (action, status) {};
  this.vd_ut = null;
  this.vd_if = 0;
  this.vd_oa = null;
  this.vd_qK = null;
  this.vd_wX = [255, 255, 0, 255];
  this.vd_wl = 14;
  this.OrthoMode = false;
  this.DrawActionDefault = true;
  var vd_aw = null;
  var vd_cx = null;
  var vd_p = null;
  var vd_ex = null;
  var vd_e = owner;
  var vd_ax = false;
  var vd_lN = false;
  var vd_kT = false;
  var vd_rm = 0;
  var vd_cV = false;
  var vd_uX = null;
  this.vd_mz = function () {
    var vd_Fd = 0;
    var doc = vd_e.GetDocument();
    if (doc) vd_Fd = doc.GlobalRenderProperties.AxisSize;
    return vd_e.canvas.style.cursor === "none" && vd_Fd > 0;
  };
  this.DrawDefaultAxis = function () {
    if (!vd_e.ActiveRender().vd_c.vd_yY()) return;
    var doc = vd_e.GetDocument();
    if (!doc) return;
    if (doc.GlobalRenderProperties.AxisSize <= 0) return;
    var pixelsize = vd_e.ActiveRender().pixelsize;
    if (vd_e.ActiveRender().vd_bO) pixelsize = vd_e.ActiveRender().vd_BA;
    var vd_vs = vd_e.ActiveRender().vd_c.vd_jS(255);
    var color = doc.GlobalRenderProperties.CursorAxisColor;
    if (!color) color = vd_e.ActiveRender().vd_iA();
    color = vd_e.ActiveRender().vd_yM(color);
    var vd_qv = doc.GlobalRenderProperties.CursorPickColor;
    if (!vd_qv) vd_qv = vd_e.ActiveRender().vd_iA();
    vd_qv = vd_e.ActiveRender().vd_yM(vd_qv);
    var vd_hg = vd_e.ActiveRender().vd_bF(color);
    var vd_vi = vd_e.ActiveRender().vd_aQ(1);
    var vd_qp = doc.GlobalRenderProperties.AxisSize * pixelsize;
    var vd_iM = vdgeo.pointPolar(vd_cx, 0, vd_qp);
    var vd_hT = vdgeo.pointPolar(vd_cx, vdgeo.PI, vd_qp);
    var p_up = vdgeo.pointPolar(vd_cx, vdgeo.HALF_PI, vd_qp);
    var vd_jd = vdgeo.pointPolar(vd_cx, -vdgeo.HALF_PI, vd_qp);
    var vd_iO = vd_e.PickSize * 0.5;
    var vd_hv = vd_e.ActiveRender().vd_fp();
    var vd_dQ = vdgeo.vd_cZ(vd_cx, vd_hv);
    vd_iM = vdgeo.vd_cZ(vd_iM, vd_hv);
    vd_hT = vdgeo.vd_cZ(vd_hT, vd_hv);
    p_up = vdgeo.vd_cZ(p_up, vd_hv);
    vd_jd = vdgeo.vd_cZ(vd_jd, vd_hv);
    vd_iM[Z] = 1.0;
    vd_hT[Z] = 1.0;
    p_up[Z] = 1.0;
    vd_jd[Z] = 1.0;
    vd_dQ[X] = vdgeo.vd_r(vd_dQ[X] + 0.49);
    vd_dQ[Y] = vdgeo.vd_r(vd_dQ[Y] + 0.49);
    vd_hT[X] = vdgeo.vd_r(vd_hT[X] + 0.49);
    vd_hT[Y] = vdgeo.vd_r(vd_hT[Y] + 0.49);
    vd_iM[X] = vdgeo.vd_r(vd_iM[X] + 0.49);
    vd_iM[Y] = vdgeo.vd_r(vd_iM[Y] + 0.49);
    p_up[X] = vdgeo.vd_r(p_up[X] + 0.49);
    p_up[Y] = vdgeo.vd_r(p_up[Y] + 0.49);
    vd_jd[X] = vdgeo.vd_r(vd_jd[X] + 0.49);
    vd_jd[Y] = vdgeo.vd_r(vd_jd[Y] + 0.49);
    vd_e.ActiveRender().vd_aj(vdgeo.vd_bu(vd_hv));
    vd_e.ActiveRender().vd_cP(vd_hT, vd_iM);
    vd_e.ActiveRender().vd_cP(p_up, vd_jd);
    vd_e.ActiveRender().vd_bF(vd_qv);
    vd_e.ActiveRender().vd_bt(
      [
        [vd_dQ[X] - vd_iO, vd_dQ[Y] - vd_iO, 1],
        [vd_dQ[X] - vd_iO, vd_dQ[Y] + vd_iO, 1],
        [vd_dQ[X] + vd_iO, vd_dQ[Y] + vd_iO, 1],
        [vd_dQ[X] + vd_iO, vd_dQ[Y] - vd_iO, 1],
      ],
      true
    );
    vd_e.ActiveRender().vd_aW();
    vd_e.ActiveRender().vd_c.vd_jS(vd_vs);
    vd_e.ActiveRender().vd_bF(vd_hg);
    vd_e.ActiveRender().vd_aQ(vd_vi);
  };
  function vd_IU() {
    if (!vd_i.vd_mz()) return;
    if (!vd_cx) return;
    var ret = false;
    if (vd_e.vdDrawCursor != null) ret = vd_e.vdDrawCursor(vd_i);
    if (!ret) vd_i.DrawDefaultAxis();
  }
  this.IsPaused = function () {
    return vd_cV;
  };
  this.Pause = function (vd_Fm) {
    if (!vd_cV) {
      vd_uX = { DefaultActions: vd_i.DefaultActions };
    }
    if (vd_Fm !== undefined) vd_i.DefaultActions = vd_Fm;
    vd_cV = true;
    vd_i.hide();
  };
  this.Resume = function () {
    if (vd_cV && vd_uX) {
      vd_i.DefaultActions = vd_uX.DefaultActions;
    }
    vd_cV = false;
    vd_i.show();
  };
  var vd_nC = null;
  function vd_NA(vd_ND) {
    if (vd_nC == null) vd_nC = vd_e.canvas.style.cursor;
    vd_e.canvas.style.cursor = vd_ND;
  }
  function vd_su() {
    if (vd_nC != null) vd_e.canvas.style.cursor = vd_nC;
    vd_nC = null;
  }
  this.vd_zu = function (vd_lI) {
    vd_aw = null;
    vd_i.actionCount = 0;
    if (!vd_lI) return;
    vd_aw = vdConst.cloneEntity(vd_lI);
    vd_i.actionCount = 1;
  };
  function vd_vX(vd_yw, evt) {
    switch (evt.mousebutton) {
      case 1:
        return (vd_yw & vdConst.MouseLeftButton) != 0;
      case 2:
        return (vd_yw & vdConst.MouseMiddleButton) != 0;
      case 3:
        return (vd_yw & vdConst.MouseRightButton) != 0;
      default:
        return false;
    }
  }
  this.start = function (vd_yW) {
    if (vd_ax) return;
    vd_i.Resume();
    vd_ax = true;
    vd_kT = false;
    vd_rm = 0;
    if (vd_yW === undefined) vd_yW = 0;
    vd_i.actionCount = vd_yW;
    vd_e.canvas.focus();
    vd_hI = null;
    vd_kz = null;
    vd_lx = null;
    vd_i.show();
    vd_p = null;
    vd_ex = null;
    vd_e.vd_mv(vd_i, "start");
  };
  function vd_zg() {
    var pcur = vd_cx;
    if (vd_ex) pcur = vd_ex;
    if (vd_p)
      pcur = vdgeo.vd_cZ(vd_p, vdgeo.vd_bu(vd_e.ActiveRender().vd_ar()));
    if (vd_e.vdFIlterActionPoint) {
      var vd_Eb = { Action: vd_i, SelectedPoint: pcur };
      vd_e.vdFIlterActionPoint(vd_Eb);
      pcur = vd_Eb.SelectedPoint;
    }
    return pcur;
  }
  this.end = function () {
    vd_i.vd_na();
    vd_i.DrawActionDefault = true;
    if (vd_ax == false) return;
    vd_su();
    vd_i.hide();
    vd_ax = false;
    vd_i.ResValue = null;
    if (vd_kT == false) {
      var pcur = vd_zg();
      if (vd_i.actionType == vdConst.ACTION_POINT_WORLD) {
        vd_i.ResValue = vdgeo.newpoint(pcur[X], pcur[Y], pcur[Z]);
      } else if (vd_i.actionType == vdConst.ACTION_LINE_WORLD) {
        vd_i.ResValue = [
          vdgeo.newpoint(vd_aw[X], vd_aw[Y], vd_aw[Z]),
          vdgeo.newpoint(pcur[X], pcur[Y], pcur[Z]),
        ];
      } else if (vd_i.actionType == vdConst.ACTION_RECT_VIEW) {
        var vd_qG = vd_e.ActiveRender().vd_ar();
        var vd_bn = vdgeo.matrixtransform(vd_qG, vd_aw);
        var vd_dQ = vdgeo.matrixtransform(vd_qG, pcur);
        vd_i.ResValue = [vd_bn, vd_dQ];
      }
    }
    vd_hI = null;
    vd_kz = null;
    vd_lx = null;
    vd_e.vd_mv(vd_i, "end");
  };
  this.cancel = function (status) {
    if (!vd_ax) {
      vd_i.hide();
      return;
    }
    if (vd_kT) return;
    vd_i.hide();
    vd_kT = true;
    if (status) vd_rm = status;
    vd_i.end();
  };
  this.show = function () {
    if (!vd_ax) {
      if (vd_i.vd_mz()) vd_e.ActiveRender().vd_c.vd_rr(true);
      return;
    }
    if (vd_lN) return;
    if (vd_e.ToolTip.hide()) vd_su();
    vd_e.ActiveRender().vd_c.vd_rr(true);
    vd_lN = true;
  };
  this.hide = function () {
    if (!vd_ax) {
      if (vd_i.vd_mz()) {
        vd_i.draw(true);
        vd_e.ActiveRender().vd_c.vd_rr(false);
      }
      return;
    }
    if (!vd_lN) return;
    if (vd_e.ToolTip.hide()) vd_su();
    vd_i.draw(true);
    vd_lN = false;
    vd_e.ActiveRender().vd_c.vd_rr(false);
  };
  this.mouseover = function (evt) {
    vd_i.show();
  };
  this.mouseout = function (evt) {
    vd_i.vd_na(evt);
    if (vd_e.HideActionOnMouseOut) vd_i.hide();
  };
  this.resize = function () {
    vd_i.hide();
  };
  function vd_Pn(evt) {
    var entity = vd_e.GetEntityFromPoint(evt.xPix, evt.yPix);
    if (entity != null && entity.ToolTip) {
      vd_i.hide();
      vd_NA("pointer");
      var timeout = undefined;
      if (entity._t === vdConst.vdNote_code && vdConst.NOTE_TOOLTIP_TIMEOUT > 0)
        timeout = vdConst.NOTE_TOOLTIP_TIMEOUT;
      vd_e.ToolTip.vd_zS(
        [
          evt.xPix + vd_e.ToolTip.BoundaryOffset[0],
          evt.yPix + vd_e.ToolTip.BoundaryOffset[1],
        ],
        entity.ToolTip,
        undefined,
        timeout
      );
      return true;
    } else {
      if (vd_e.ToolTip.hide()) vd_su();
    }
    return false;
  }
  this.mousemove = function (evt) {
    var vd_yC = true;
    if (vd_ax && vd_lN && vd_kI && vd_lx) {
      var dx = Math.abs(evt.xPix - vd_lx[X]);
      var dy = Math.abs(evt.yPix - vd_lx[Y]);
      if (dx < 4 && dy < 4) vd_yC = false;
    }
    if (vd_yC) vd_i.vd_na(evt);
    vd_p = null;
    vd_ex = null;
    if (!vd_ax || vd_cV) {
      var vd_pV = false;
      if (evt.prevPos != null) {
        var vd_BO =
          vd_i.DefaultActions &
          (vdConst.DEFAULT_SCROLL | vdConst.DEFAULT_ROTATE3D);
        if (vd_BO != 0) {
          if (
            evt.istouched === true ||
            (evt.istouched !== true && vd_vX(vd_i.PanMouseButton, evt))
          ) {
            vd_pV = true;
            if (
              vd_e.GetActiveLayout() === vd_e.vd_DJ() &&
              vd_BO === vdConst.DEFAULT_ROTATE3D
            ) {
              vd_e.vd_zT(
                evt.prevPos,
                evt.xPix,
                evt.yPix,
                vd_e.GetDefaultTimeOutMilliseconds()
              );
            } else {
              vd_e.scroll(
                evt.prevPos,
                evt.xPix,
                evt.yPix,
                vd_e.GetDefaultTimeOutMilliseconds()
              );
            }
          } else if (
            evt.istouched !== true &&
            vd_vX(vd_i.RotateMouseButton, evt)
          ) {
            vd_pV = true;
            if (
              (vd_i.DefaultActions & vdConst.DEFAULT_ROTATE3D) == 0 ||
              vd_e.GetActiveLayout() !== vd_e.vd_DJ()
            ) {
              vd_e.scroll(
                evt.prevPos,
                evt.xPix,
                evt.yPix,
                vd_e.GetDefaultTimeOutMilliseconds()
              );
            } else {
              vd_e.vd_zT(
                evt.prevPos,
                evt.xPix,
                evt.yPix,
                vd_e.GetDefaultTimeOutMilliseconds()
              );
            }
          }
        }
        if (
          !vd_pV &&
          (vd_i.DefaultActions & vdConst.DEFAULT_ZOOMSCALE) ==
            vdConst.DEFAULT_ZOOMSCALE &&
          vd_vX(vd_i.ZoomScaleMouseButton, evt) &&
          vd_hI &&
          vd_kz
        ) {
          var vd_md = evt.yPix - vd_kz[Y];
          if (Math.abs(vd_md) > 2) {
            vd_md =
              vd_md < 0
                ? vd_e.MouseWheelZoomScale
                : 1 / vd_e.MouseWheelZoomScale;
            vd_pV = true;
            vd_e.zoomScale(
              vd_hI[X],
              vd_hI[Y],
              vd_md,
              vd_e.GetDefaultTimeOutMilliseconds()
            );
            vd_kz = [evt.xPix, evt.yPix];
          }
        }
      }
      if (!vd_pV && vd_e.ToolTip.AutoShow) {
        if (vd_Pn(evt)) return;
      }
    }
    if (!vd_ax && !vd_i.vd_mz()) return;
    if (!vd_lN) vd_i.show();
    vd_i.draw(true);
    vd_cx = vd_e.ActiveRender().vd_rP(evt.xPix, evt.yPix);
    vd_On();
    evt.vd_JE(vd_cx);
    if (vd_ax && !vd_cV) vd_p = vd_e.vd_Ij(evt.xPix, evt.yPix);
    vd_i.draw(false);
    if (vd_yC) vd_Fw(evt);
  };
  this.dblclick = function (evt) {
    if (!vd_ax || vd_cV) {
      if ((vd_i.DefaultActions & vdConst.DEFAULT_ZOOMEXTENTS) != 0) {
        vd_e.zoomExtents();
        vd_e.redraw();
      }
      return;
    }
  };
  this.vd_zp = function (mode) {
    var vd_NX = vd_i.OrthoMode;
    vd_i.OrthoMode = mode;
    return vd_NX;
  };
  function vd_Nm() {
    if (!vd_i.vd_mz()) return;
    var layout = vd_e.GetActiveLayout();
    if (!layout) return;
    if (!layout.SnapMode) return;
    var vd_iH = vd_cx;
    var elevation = 0.0;
    vd_iH[Z] = elevation;
    var fr1, fr2, fr3, vd_fE, vd_bW, vd_er, vd_eM;
    var vd_aG = [0, 0, 0];
    var p0 = [0, 0, 0];
    var p1 = [0, 0, 0];
    vd_fE = layout.SnapSpaceX;
    vd_bW = layout.SnapSpaceY;
    if (layout.SnapSpaceX == 0.0 || layout.SnapSpaceY == 0.0) {
      vd_fE = layout.GridSpaceX;
      vd_bW = layout.GridSpaceY;
    }
    if (
      vd_fE / vd_e.ActiveRender().pixelsize < 2.0 ||
      vd_bW / vd_e.ActiveRender().pixelsize < 2.0
    )
      return;
    fr1 = 0;
    vd_er = Math.sin(fr1);
    vd_eM = Math.cos(fr1);
    vd_aG[X] = layout.SnapBase[X];
    vd_aG[Y] = layout.SnapBase[Y];
    vd_aG[Z] = vd_iH[Z];
    p0[X] = (vd_iH[X] - vd_aG[X]) * vd_eM + (vd_iH[Y] - vd_aG[Y]) * vd_er;
    p0[Y] = (vd_aG[X] - vd_iH[X]) * vd_er + (vd_iH[Y] - vd_aG[Y]) * vd_eM;
    p0[Z] = vd_iH[Z];
    if (p0[X] != 0.0 || p0[Y] != 0.0) {
      fr3 = p0[X] / vd_fE;
      fr1 = vdgeo.vd_r(fr3);
      fr3 = fr3 - fr1;
      p1[X] = fr1 * vd_fE;
      fr2 = p0[Y] / vd_bW;
      fr1 = vdgeo.vd_r(fr2);
      fr2 = fr2 - fr1;
      p1[Y] = fr1 * vd_bW;
      p1[Z] = vd_iH[Z];
      if (fr2 <= -0.5) p0[Y] = p1[Y] - vd_bW;
      else if (fr2 >= 0.5) p0[Y] = p1[Y] + vd_bW;
      else p0[Y] = p1[Y];
      if (fr3 <= -0.5) p0[X] = p1[X] - vd_fE;
      else if (fr3 >= 0.5) p0[X] = p1[X] + vd_fE;
      else p0[X] = p1[X];
    }
    vd_cx[X] = p0[X] * vd_eM - p0[Y] * vd_er + vd_aG[X];
    vd_cx[Y] = p0[X] * vd_er + p0[Y] * vd_eM + vd_aG[Y];
    vd_cx[Z] = elevation;
  }
  function vd_On() {
    vd_Nm();
    if (!vd_ax) return;
    if (vd_i.OrthoMode) {
      if (vd_i.actionType == vdConst.ACTION_LINE_WORLD) {
        if (vd_aw) {
          vd_ex = [vd_cx[X], vd_cx[Y], vd_cx[Z]];
          var dx = Math.abs(vd_cx[X] - vd_aw[X]);
          var dy = Math.abs(vd_cx[Y] - vd_aw[Y]);
          if (dy < dx) vd_ex[Y] = vd_aw[Y];
          else vd_ex[X] = vd_aw[X];
          vd_ex[Z] = vd_aw[Z];
        }
      }
    }
  }
  this.parse = function (vd_NG) {
    if (!vd_ax || vd_cV) return;
    var str = vd_NG.trim();
    if (str.length == 0) return;
    var pt = null;
    var items;
    if (str[0] != "@" && str.indexOf(",") >= 0) {
      items = str.split(",");
      if (items.length == 2) {
        pt = [Number(items[0]), Number(items[1]), 0];
      } else if (items.length == 3) {
        pt = [Number(items[0]), Number(items[1]), Number(items[2])];
      }
    } else if (vd_aw && vd_i.actionType != vdConst.ACTION_POINT_WORLD) {
      if (str.indexOf("<") >= 0) {
        items = str.split("<");
        if (items.length == 2) {
          pt = vdgeo.pointPolar(
            vd_aw,
            vdgeo.DegreesToRadians(Number(items[1])),
            Number(items[0])
          );
        }
      } else if (str[0] == "@") {
        str = str.substr(1);
        items = str.split(",");
        if (items.length == 2) {
          pt = [
            vd_aw[X] + Number(items[0]),
            vd_aw[Y] + Number(items[1]),
            vd_aw[Z],
          ];
        } else if (items.length == 3) {
          pt = [
            vd_aw[X] + Number(items[0]),
            vd_aw[Y] + Number(items[1]),
            vd_aw[Z] + Number(items[2]),
          ];
        }
      }
    }
    if (!pt) return;
    vd_p = null;
    vd_ex = null;
    vd_cx = pt;
    vd_BT();
  };
  this.click = function (evt) {};
  this.mouseup = function (evt) {
    vd_i.vd_na(evt);
    vd_hI = null;
    vd_kz = null;
    if (!vd_ax || vd_cV) return;
    if (!vd_e.vd_iz([evt.xPix, evt.yPix])) {
      vd_i.cancel();
    } else {
      if (vd_e.vd_mv(vd_i, "mouseup", evt)) return;
      if (evt.mousebutton <= 1) {
        vd_BT(evt);
      }
    }
  };
  var vd_kI = 0;
  this.vd_na = function (evt) {
    vd_lx = null;
    if (vd_kI) clearTimeout(vd_kI);
    vd_kI = 0;
  };
  function vd_Fw(evt) {
    if (!vd_ax || vd_cV) return;
    if (vd_kI > 0) vd_i.vd_na(evt);
    if (evt.mousebutton != 1) return;
    var timeout = vd_i.TouchCancelTimeOut;
    if (timeout < 0 && vd_i.TouchSupported()) timeout = Math.abs(timeout);
    if (timeout > 0) {
      vd_lx = [evt.xPix, evt.yPix];
      vd_kI = setTimeout(function (evt) {
        if (!vd_e.vd_mv(vd_i, "mousetimeout", evt)) vd_i.cancel(1);
      }, timeout);
    }
  }
  this.mousedown = function (evt) {
    vd_i.vd_na(evt);
    var dx = 0;
    var dy = 0;
    if (vd_hI) {
      dx = Math.abs(evt.xPix - vd_hI[X]);
      dy = Math.abs(evt.yPix - vd_hI[Y]);
    }
    vd_hI = [evt.xPix, evt.yPix];
    vd_kz = [evt.xPix, evt.yPix];
    if (!vd_ax && !vd_cV && dx < 2 && dy < 2 && vd_e.GripManager.vd_FY(evt))
      return;
    if (!vd_ax && !vd_cV) {
      var timeout = vd_i.TouchCancelTimeOut;
      if (timeout < 0 && vd_i.TouchSupported()) timeout = Math.abs(timeout);
      if (timeout > 0) {
        evt.mousebutton = 3;
        vd_kI = setTimeout(vd_i.mousedown, timeout, evt);
        return;
      }
    }
    if (!vd_ax || vd_cV) return;
    vd_i.show();
    if (evt.mousebutton > 1) {
      vd_i.cancel(1);
    } else {
      vd_Fw(evt);
      vd_i.mousemove(evt);
      return;
    }
  };
  function vd_BT(evt) {
    if (vd_i.actionType == vdConst.ACTION_POINT_WORLD) {
      vd_i.end();
    } else {
      vd_i.actionCount++;
      if (vd_i.actionCount == 2) {
        vd_i.end();
      } else {
        vd_e.vd_mv(vd_i, "count");
        vd_aw = vd_zg();
        if (vd_cx[W] !== undefined) vd_aw.push(vd_cx[W]);
      }
    }
  }
  this.mousewheel = function (e) {
    if (
      (vd_i.DefaultActions & vdConst.DEFAULT_ZOOMSCALE) != 0 &&
      (vd_i.ZoomScaleMouseButton & vdConst.MouseMiddleButton) != 0
    ) {
      vd_e.zoomScale(
        e.xPix,
        e.yPix,
        e.Delta,
        vd_e.GetDefaultTimeOutMilliseconds()
      );
    }
  };
  this.vd_Ix = function (e) {
    vd_e.vd_Pu(e.PrevPos1, e.PrevPos2, e.Pos1, e.Pos2, vd_i.DefaultActions);
  };
  this.keydown = function (e) {
    if (!vd_ax && !vd_cV && e.keyCode == 27) vd_e.GripManager.vd_FY(null);
    if (!vd_ax || vd_cV) return;
    if (e.keyCode == 27) vd_i.cancel();
  };
  this.draw = function (vd_Ph) {
    if (!vd_ax && !vd_i.vd_mz()) return;
    if (!vd_e.ActiveRender().vd_c.vd_yY()) return;
    if (vd_Ph) {
      vd_e.ActiveRender().vd_c.vd_Kx();
      return;
    }
    var vd_OB = vd_e.ActiveRender().vd_bd;
    vd_e.ActiveRender().vd_bd = false;
    var vd_Py = vd_e.ActiveRender().vd_c.vd_eR;
    vd_e.ActiveRender().vd_c.vd_eR = false;
    var vd_oG = vd_e.vd_gh;
    vd_e.vd_gh = false;
    vd_e.ActiveRender().vd_dC();
    var vd_nv = vd_i.vd_ut;
    if (vd_nv == null) vd_nv = vd_e.ActiveRender().vd_iA();
    var vd_vs = vd_e.ActiveRender().vd_c.Alpha;
    var vd_hg = vd_e.ActiveRender().vd_bF(vd_nv);
    var vd_vi = vd_e.ActiveRender().vd_aQ(Math.max(1, vd_i.vd_if));
    var vd_qG = vd_e.ActiveRender().vd_ar();
    vd_IU();
    var pts = [];
    var vd_iZ = vd_i.vd_at();
    if (
      vd_ax &&
      vd_i.DrawActionDefault &&
      (vd_i.actionType == vdConst.ACTION_LINE_WORLD ||
        vd_i.actionType == vdConst.ACTION_RECT_VIEW) &&
      vd_i.actionCount == 1
    ) {
      if (vd_i.actionType == vdConst.ACTION_LINE_WORLD) {
        vd_e.ActiveRender().vd_cP(vd_aw, vd_iZ);
      } else {
        var vd_hv = vd_qG;
        if (vd_e.ActiveRender().vd_bO) vd_hv = vd_e.ActiveRender().vd_fp();
        var vd_dQ = vdgeo.vd_cZ(vd_iZ, vd_hv);
        var vd_bn = vdgeo.vd_cZ(vd_aw, vd_hv);
        vd_e.ActiveRender().vd_aj(vdgeo.vd_bu(vd_hv));
        pts = [
          [vd_bn[X], vd_bn[Y], 0],
          [vd_dQ[X], vd_bn[Y], 0],
          [vd_dQ[X], vd_dQ[Y], 0],
          [vd_bn[X], vd_dQ[Y], 0],
        ];
        var vd_xG = vd_bn[X] > vd_dQ[X];
        if (
          (vd_i.DispProps & vdConst.ACTION_DISPLAY_USEFILLCOLOR) != 0 &&
          vd_i.vd_oa != null &&
          vd_i.vd_qK != null
        ) {
          if (vd_xG) vd_nv = vd_i.vd_qK;
          else vd_nv = vd_i.vd_oa;
        }
        vd_e.ActiveRender().vd_bF(vd_nv);
        var alpha = vd_e.ActiveRender().vd_c.vd_jS(255);
        vd_e.ActiveRender().vd_bt(pts, true);
        vd_e.ActiveRender().vd_c.vd_jS(alpha);
        if (
          (vd_i.DispProps & vdConst.ACTION_DISPLAY_USEFILLCOLOR) != 0 &&
          vd_i.vd_oa != null &&
          vd_i.vd_qK != null
        ) {
          vd_e.ActiveRender().vd_fH(pts);
        }
        vd_e.ActiveRender().vd_aW();
      }
    }
    if (
      vd_ax &&
      vd_p &&
      (vd_i.actionType == vdConst.ACTION_LINE_WORLD ||
        vd_i.actionType == vdConst.ACTION_POINT_WORLD)
    ) {
      vd_e.ActiveRender().vd_bF(vd_i.vd_wX);
      vd_e.ActiveRender().vd_aQ(2);
      var vd_Z = (vd_e.ActiveRender().GetPixelSize() * vd_i.vd_wl) / 2;
      pts = [];
      var vd_bP, vd_iB, ang;
      vd_e.ActiveRender().vd_aj(vdgeo.vd_bu(vd_qG));
      switch (vd_p[3]) {
        case vdConst.OsnapMode_END:
          vd_e.ActiveRender().vd_bt(
            [
              [vd_p[X] - vd_Z, vd_p[Y] - vd_Z, 0],
              [vd_p[X] - vd_Z, vd_p[Y] + vd_Z, 0],
              [vd_p[X] + vd_Z, vd_p[Y] + vd_Z, 0],
              [vd_p[X] + vd_Z, vd_p[Y] - vd_Z, 0],
            ],
            true
          );
          break;
        case vdConst.OsnapMode_NEA:
          vd_e.ActiveRender().vd_bt(
            [
              [vd_p[X] - vd_Z, vd_p[Y] - vd_Z, 0],
              [vd_p[X] + vd_Z, vd_p[Y] + vd_Z, 0],
              [vd_p[X] - vd_Z, vd_p[Y] + vd_Z, 0],
              [vd_p[X] + vd_Z, vd_p[Y] - vd_Z, 0],
            ],
            true
          );
          break;
        case vdConst.OsnapMode_MID:
          vd_e.ActiveRender().vd_bt(
            [
              [vd_p[X] - vd_Z, vd_p[Y] - vd_Z, 0],
              [vd_p[X], vd_p[Y] + vd_Z, 0],
              [vd_p[X] + vd_Z, vd_p[Y] - vd_Z, 0],
            ],
            true
          );
          break;
        case vdConst.OsnapMode_QUA:
          vd_e.ActiveRender().vd_bt(
            [
              [vd_p[X] - vd_Z, vd_p[Y], 0],
              [vd_p[X], vd_p[Y] + vd_Z, 0],
              [vd_p[X] + vd_Z, vd_p[Y], 0],
              [vd_p[X], vd_p[Y] - vd_Z, 0],
            ],
            true
          );
          break;
        case vdConst.OsnapMode_CEN:
          {
            vd_bP = vdgeo.vd_iy(
              vdgeo.CURVERESOLUTION,
              vd_e.ActiveRender().vd_dk(),
              vd_Z,
              vdgeo.VD_TWOPI
            );
            vd_iB = vdgeo.VD_TWOPI / vd_bP;
            for (ang = 0; ang <= vdgeo.VD_TWOPI; ang += vd_iB) {
              pts.push(
                vdgeo.newpoint(
                  vd_p[X] + vd_Z * Math.cos(ang),
                  vd_p[Y] + vd_Z * Math.sin(ang),
                  0
                )
              );
            }
            vd_e.ActiveRender().vd_bt(pts, true);
          }
          break;
        case vdConst.OsnapMode_INS:
          vd_e.ActiveRender().vd_bt(
            [
              [vd_p[X] - vd_Z, vd_p[Y], 0],
              [vd_p[X] + vd_Z, vd_p[Y], 0],
              [vd_p[X] + vd_Z, vd_p[Y] - vd_Z, 0],
              [vd_p[X], vd_p[Y] - vd_Z, 0],
              [vd_p[X], vd_p[Y] + vd_Z, 0],
              [vd_p[X] - vd_Z, vd_p[Y] + vd_Z, 0],
            ],
            true
          );
          break;
        case vdConst.OsnapMode_NODE:
          {
            vd_bP = vdgeo.vd_iy(
              vdgeo.CURVERESOLUTION,
              vd_e.ActiveRender().vd_dk(),
              vd_Z,
              vdgeo.VD_TWOPI
            );
            vd_iB = vdgeo.VD_TWOPI / vd_bP;
            for (ang = 0; ang <= vdgeo.VD_TWOPI; ang += vd_iB) {
              pts.push(
                vdgeo.newpoint(
                  vd_p[X] + vd_Z * Math.cos(ang),
                  vd_p[Y] + vd_Z * Math.sin(ang),
                  0
                )
              );
            }
            vd_e.ActiveRender().vd_bt(pts, true);
            vd_e
              .ActiveRender()
              .vd_cP(
                [vd_p[X] - vd_Z, vd_p[Y] - vd_Z, 0],
                [vd_p[X] + vd_Z, vd_p[Y] + vd_Z, 0]
              );
            vd_e
              .ActiveRender()
              .vd_cP(
                [vd_p[X] - vd_Z, vd_p[Y] + vd_Z, 0],
                [vd_p[X] + vd_Z, vd_p[Y] - vd_Z, 0]
              );
          }
          break;
        default:
          vd_e.ActiveRender().vd_bt(
            [
              [vd_p[X] - vd_Z, vd_p[Y] - vd_Z, 0],
              [vd_p[X] - vd_Z, vd_p[Y] + vd_Z, 0],
              [vd_p[X] + vd_Z, vd_p[Y] + vd_Z, 0],
              [vd_p[X] + vd_Z, vd_p[Y] - vd_Z, 0],
            ],
            true
          );
          break;
      }
      vd_e.ActiveRender().vd_aW();
    }
    vd_e.ActiveRender().vd_bF(vd_hg);
    vd_e.ActiveRender().vd_c.vd_jS(vd_vs);
    vd_e.ActiveRender().vd_aQ(vd_vi);
    if (vd_ax) vd_e.vd_mv(vd_i, "draw");
    vd_e.vd_gh = vd_oG;
    vd_e.ActiveRender().vd_c.Refresh();
    vd_e.ActiveRender().vd_c.vd_eR = vd_Py;
    vd_e.ActiveRender().vd_bd = vd_OB;
    vd_e.ActiveRender().vd_dC();
  };
  Object.defineProperty(vd_i, "ReferencePoint", {
    get: function () {
      if (vd_i.actionType == vdConst.ACTION_POINT_WORLD) return null;
      return vdConst.cloneEntity(vd_aw);
    },
  });
  Object.defineProperty(vd_i, "CurrentPoint", {
    get: function () {
      return vdConst.cloneEntity(vd_cx);
    },
  });
  Object.defineProperty(vd_i, "OsnapPoint", {
    get: function () {
      return vdConst.cloneEntity(vd_p);
    },
  });
  Object.defineProperty(vd_i, "OrthoPoint", {
    get: function () {
      return vdConst.cloneEntity(vd_ex);
    },
  });
  this.SelectedPoint = function (clone) {
    var ret = vd_cx;
    if (vd_i.ResValue) {
      if (vd_i.ResValue.length == 2) ret = vd_i.ResValue[1];
      else ret = vd_i.ResValue;
    }
    if (clone) ret = vdConst.cloneEntity(ret);
    return ret;
  };
  this.vd_at = function () {
    if (vd_ex) return vd_ex;
    return vd_cx;
  };
  Object.defineProperty(vd_i, "render", {
    get: function () {
      return vd_e.ActiveRender();
    },
  });
  return this;
}
var vd_Hc = [
  0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1,
  1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0,
];
function vd_KG(vd_Qh, vd_vf) {
  var vd_i = this;
  this.vd_eR = true;
  this.vd_fW = [1.0, 1.0, 1.0];
  var vd_fr = undefined;
  this.vd_np = function () {
    return vd_fr;
  };
  this.vd_fy = 0;
  this.zFar = 1;
  this.vd_IO = function (vd_Hs, zfar) {
    vd_i.vd_fy = vd_Hs;
    vd_i.zFar = zfar;
  };
  this.vd_D = vd_Qh;
  this.Alpha = 255;
  this.vd_bw = [0, 0, 0, 255];
  this.penwidth = 0;
  var vd_bT = [0, 0, 0, 255];
  this.vd_aK = 0;
  this.vd_as = 0;
  var vd_au = null;
  var vd_K = null;
  var vd_sl = 0;
  var px = 0,
    py = 0;
  this.vd_jr = vdConst.InterpolationMode_Bilinear;
  function vd_AN(p) {
    return vdgeo.vd_r(p + 0.49);
  }
  function vd_NP(p) {
    return vdgeo.vd_r(p);
  }
  var vd_ab = vd_AN;
  this.vd_dC = function () {
    vd_uJ = vd_Me;
    if (vd_i.vd_D.vd_bd || vd_i.vd_D.vd_dJ) {
      vd_ab = vd_AN;
      if (vd_i.vd_D.vd_dJ) vd_uJ = vd_Ek;
    } else {
      vd_ab = vd_NP;
    }
  };
  var vd_GE = 0;
  var vd_oT;
  function vd_Ek(px, py, pz) {
    if (vd_i.vd_D.vd_dJ.length === 0) return true;
    for (var i = 0; i < vd_i.vd_D.vd_dJ.length; i++) {
      vd_oT = vd_i.vd_D.vd_dJ[i][2];
      vd_GE = vd_oT[A20] * px + vd_oT[A21] * py + vd_oT[A22] * pz + vd_oT[A23];
      if (vd_GE < 0) return false;
    }
    return true;
  }
  function vd_Me(px, py, pz) {
    return true;
  }
  var vd_uJ = vd_Ek;
  this.vd_Iq = function (img) {
    if (img != null) {
      if (
        img._a1 == false ||
        (typeof _evl != "undefined" && _evl(vd_i) == false)
      ) {
        var bytescount = 4;
        var left = vd_ab((vd_i.vd_aK - img.width) * 0.5);
        var top = vd_ab((vd_i.vd_as - img.height) * 0.5);
        left = Math.max(left, 0);
        top = Math.max(top, 0);
        var right = left + img.width;
        var bottom = top + img.height;
        right = Math.min(right, vd_i.vd_aK);
        bottom = Math.min(bottom, vd_i.vd_as);
        var div = 101 / 255;
        for (var y = top; y < bottom; y++) {
          for (var x = left; x < right; x++) {
            var srcy = y - top;
            var srcx = (x - left) * bytescount;
            var pos = ((vd_i.vd_as - 1 - y) * vd_i.vd_aK + x) * 4;
            var ir = img.bytes[srcy][srcx];
            var ig = img.bytes[srcy][srcx + 1];
            var ib = img.bytes[srcy][srcx + 2];
            ir = vdgeo.vd_r(ir * div + vd_K[pos] * (1 - div));
            ig = vdgeo.vd_r(ig * div + vd_K[pos + 1] * (1 - div));
            ib = vdgeo.vd_r(ib * div + vd_K[pos + 2] * (1 - div));
            vd_K[pos] = ir;
            vd_K[pos + 1] = ig;
            vd_K[pos + 2] = ib;
            vd_K[pos + 3] = 255;
          }
        }
      }
    }
  };
  this.vd_nW = function () {
    return vd_au;
  };
  this.vd_gs = function (data, width, height, vd_Rp) {
    vd_au = data;
    if (!vd_au) {
      vd_K = null;
      vd_fr = null;
      vd_i.vd_aK = 0;
      vd_i.vd_as = 0;
      vd_sl = 0;
    } else {
      vd_K = vd_au.data;
      vd_i.vd_aK = parseInt(width);
      vd_i.vd_as = parseInt(height);
      vd_sl = vd_i.vd_aK * vd_i.vd_as * 4;
      var len = vd_sl / 4;
      vd_fr = [];
      vd_fr.length = len;
      for (i = 0; i < len; i++) {
        vd_fr[i] = [1, undefined, undefined];
      }
    }
  };
  function vd_Hj() {
    var len = vd_fr.length;
    var i;
    var item;
    for (i = 0; i < len; i++) {
      item = vd_fr[i];
      item[0] = 1.0;
      item[1] = undefined;
      item[2] = undefined;
    }
  }
  this.clear = function (color) {
    vd_bT = color;
    vd_Ik(vd_K, color);
    if (vd_i.vd_D.vd_bd || vd_i.vd_D.vd_be) {
      vd_Hj();
    }
  };
  this.vd_DC = function (img) {
    var i;
    if (!vd_au) return;
    if (vd_i.vd_D.vd_bG()) vd_i.vd_D.vd_lR();
    if (vd_i.vd_D.vdraw && vd_i.vd_D.vdraw.Notes)
      vd_i.vd_D.vdraw.Notes.vd_qC(vd_i.vd_D);
    vd_i.vd_Iq(img);
    for (i = 3; i < vd_sl; i += 4) {
      if (vd_K[i] == 0) vd_K[i] = vd_bT[3];
      else vd_K[i] = 255;
    }
    vd_i.vd_gj(null);
  };
  function vd_Ik(data, color) {
    if (!data || !color) return;
    var left = vd_i.vd_D.clip[0];
    var right = vd_i.vd_D.clip[2];
    var top = vd_i.vd_D.clip[1];
    var bottom = vd_i.vd_D.clip[3];
    var iy, ix;
    var k = (top * vd_i.vd_aK + left) * 4;
    var off = (vd_i.vd_aK - right + left - 1) * 4;
    for (iy = top; iy <= bottom; iy++) {
      for (ix = left; ix <= right; ix++) {
        data[k++] = color[0];
        data[k++] = color[1];
        data[k++] = color[2];
        data[k++] = 0;
      }
      k += off;
    }
  }
  this.vd_QU = function () {
    return false;
  };
  this.vd_jS = function (vd_Jl) {
    var ret = vd_i.Alpha;
    vd_i.Alpha = vd_Jl;
    return ret;
  };
  this.vd_bF = function (Color) {
    if (Color[3] !== undefined) vd_i.Alpha = Color[3];
    vd_i.vd_bw = Color;
  };
  this.vd_aQ = function (vd_oY) {
    vd_i.penwidth = vd_oY;
  };
  this.vd_Ps = function (x, y, z, w) {
    if (!w || w < 2) vd_i.vd_wf(x, y, z);
    else {
      x -= w / 2.0;
      y -= w / 2.0;
      var sx = 0,
        ex = 0,
        i = 0,
        x1 = x,
        y1;
      for (var h = 0; h < w; h++) {
        y1 = y + h;
        if (y1 < vd_i.vd_D.clip[1] || y1 > vd_i.vd_D.clip[3]) continue;
        sx = Math.max(vd_i.vd_D.clip[0], x1);
        ex = Math.min(vd_i.vd_D.clip[2], x1 + w);
        sx = vd_ab(sx);
        ex = vd_ab(ex);
        y1 = vd_ab(y1);
        for (i = sx; i < ex; i++) {
          vd_dv(i, y1);
          vd_i.vd_bb(z);
        }
      }
    }
  };
  this.vd_JH = function (x, y, z, w) {
    if (!w || w < 2) vd_i.vd_wf(x, y, z);
    else {
      var s = 0,
        e = 0,
        i = 0,
        x1 = x - w / 2.0,
        y1 = y;
      s = Math.max(vd_i.vd_D.clip[0], x1);
      e = Math.min(vd_i.vd_D.clip[2], x1 + w);
      s = vd_ab(s);
      e = vd_ab(e);
      y1 = vd_ab(y1);
      for (i = s; i < e; i++) {
        vd_dv(i, y1);
        vd_i.vd_bb(z);
      }
      (x1 = x), (y1 = y - w / 2.0);
      s = Math.max(vd_i.vd_D.clip[1], y1);
      e = Math.min(vd_i.vd_D.clip[3], y1 + w);
      s = vd_ab(s);
      e = vd_ab(e);
      x1 = vd_ab(x1);
      for (i = s; i < e; i++) {
        vd_dv(x1, i);
        vd_i.vd_bb(z);
      }
    }
  };
  this.vd_wf = function (x1, y1, z1) {
    vd_dv(vd_ab(x1), vd_ab(y1));
    vd_i.vd_bb(z1);
  };
  this.vd_Jr = function (x1, y1, x2, y2) {
    x1 = vd_ab(x1);
    y1 = vd_ab(y1);
    x2 = vd_ab(x2);
    y2 = vd_ab(y2);
    vd_i.vd_uF(x1, y1, x2, y2, 1, 1);
  };
  this.vd_DI = function (x1, y1, w, z1, z2, u1, v1, w1, u2, v2, w2) {
    var iz = 0,
      iu = 0,
      iv = 0,
      iw = 0;
    var gradient = 0,
      sx = 0,
      ex = 0,
      x = 0,
      z = 0,
      u = 0,
      v = 0,
      tw = 0;
    if (y1 < vd_i.vd_D.clip[1] || y1 > vd_i.vd_D.clip[3]) return;
    sx = Math.max(vd_i.vd_D.clip[0], x1);
    ex = Math.min(vd_i.vd_D.clip[2], x1 + w);
    sx = vd_ab(sx);
    ex = vd_ab(ex);
    if (vd_i.Alpha != 255 && ex != vd_i.vd_D.clip[2]) ex--;
    y1 = vd_ab(y1);
    iz = z2 - z1;
    iu = u2 - u1;
    iv = v2 - v1;
    iw = w2 - w1;
    var scol = vd_i.vd_bw;
    if (vd_i.vd_D.vd_oo) {
      for (x = sx; x < ex; x++) {
        gradient = (x - x1) / w;
        z = z1 + iz * gradient;
        u = u1 + iu * gradient;
        v = v1 + iv * gradient;
        tw = w1 + iw * gradient;
        vd_i.vd_bw = [vdgeo.vd_r(u), vdgeo.vd_r(v), vdgeo.vd_r(tw)];
        vd_dv(x, y1);
        vd_i.vd_bb(z);
      }
      vd_i.vd_bw = scol;
    } else {
      for (x = sx; x < ex; x++) {
        gradient = (x - x1) / w;
        z = z1 + iz * gradient;
        u = u1 + iu * gradient;
        v = v1 + iv * gradient;
        tw = w1 + iw * gradient;
        if (tw != 0.0) {
          u /= tw;
          v /= tw;
        }
        vd_dv(x, y1);
        vd_i.vd_bb(z, true, u, v);
      }
    }
  };
  var vd_AK = false;
  var vd_ff = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.vd_DM = function (x1, y1, w, z1, z2) {
    var iz = 0;
    var sx = 0,
      ex = 0,
      i = 0,
      gradient = 0,
      z = 0;
    if (y1 < vd_i.vd_D.clip[1] || y1 > vd_i.vd_D.clip[3]) return;
    sx = Math.max(vd_i.vd_D.clip[0], x1);
    ex = Math.min(vd_i.vd_D.clip[2], x1 + w);
    sx = vd_ab(sx);
    ex = vd_ab(ex);
    y1 = vd_ab(y1);
    iz = z2 - z1;
    if (vd_i.Alpha != 255 && ex != vd_i.vd_D.clip[2]) ex--;
    for (i = sx; i < ex; i++) {
      gradient = (i - x1) / w;
      z = z1 + iz * gradient;
      vd_dv(i, y1);
      vd_i.vd_bb(z);
    }
  };
  this.vd_qy = function (x1, y1, w) {
    var sx = 0,
      ex = 0,
      i = 0;
    if (y1 < vd_i.vd_D.clip[1] || y1 > vd_i.vd_D.clip[3]) return;
    sx = Math.max(vd_i.vd_D.clip[0], x1);
    ex = Math.min(vd_i.vd_D.clip[2], x1 + w);
    sx = vd_ab(sx);
    ex = vd_ab(ex);
    y1 = vd_ab(y1);
    if (vd_i.Alpha != 255 && ex != vd_i.vd_D.clip[2]) ex--;
    for (i = sx; i < ex; i++) {
      vd_dv(i, y1);
      vd_i.vd_bb(1);
    }
  };
  this.vd_Kb = function (x1, y1, x2, y2, z1, z2) {
    vd_AK = true;
    vd_ff[0] = x1;
    vd_ff[1] = y1;
    vd_ff[2] = z1;
    vd_ff[3] = x2;
    vd_ff[4] = y2;
    vd_ff[5] = z2;
    x1 = vd_ab(x1);
    y1 = vd_ab(y1);
    x2 = vd_ab(x2);
    y2 = vd_ab(y2);
    vd_i.vd_uF(x1, y1, x2, y2, z1, z2);
    vd_AK = false;
  };
  var y = 0;
  var vd_w = 0,
    vd_o = 0,
    minx = 0,
    maxx = 0;
  var x1 = 0,
    y1 = 0,
    z1 = 0;
  var x2 = 0,
    y2 = 0,
    z2 = 0;
  var ind1 = 0,
    ind2 = 0;
  var ints = 0;
  var uvx1 = 0,
    uvx2 = 0,
    uvy1 = 0,
    uvy2 = 0,
    uvz1 = 0,
    uvz2 = 0;
  var p1, p2, uv1, uv2, l1, l2;
  this.vd_FP = function (pts, uvs, vd_ew) {
    if (!uvs || (!vd_i.vd_D.vd_oo && !vd_i.vd_D.vd_cT)) {
      vd_i.vd_lr(pts, vd_ew);
      return;
    }
    var gradient = 0,
      u = 0,
      v = 0,
      w = 0,
      x = 0,
      z = 0,
      i = 0;
    var n = pts.length;
    if (n === 0) return;
    p1 = pts[0];
    vd_w = p1[Y];
    vd_o = p1[Y];
    minx = p1[X];
    maxx = p1[X];
    for (i = 1; i < n; i++) {
      p1 = pts[i];
      if (p1[Y] < vd_w) vd_w = p1[Y];
      else if (p1[Y] > vd_o) vd_o = p1[Y];
      if (p1[X] < minx) minx = p1[X];
      else if (p1[X] > maxx) maxx = p1[X];
    }
    if (minx > vd_i.vd_D.clip[2]) return;
    if (maxx < vd_i.vd_D.clip[0]) return;
    if (vd_w > vd_i.vd_D.clip[3] || vd_o < vd_i.vd_D.clip[1]) return;
    vd_w = Math.max(vd_w, vd_i.vd_D.clip[1]);
    vd_w = Math.min(vd_w, vd_i.vd_D.clip[3]);
    vd_o = Math.max(vd_o, vd_i.vd_D.clip[1]);
    vd_o = Math.min(vd_o, vd_i.vd_D.clip[3]);
    vd_w = Math.round(vd_w);
    vd_o = Math.round(vd_o);
    var vd_aB;
    for (y = vd_w; y <= vd_o; y++) {
      vd_aB = [];
      ints = 0;
      for (i = 0; i < n; i++) {
        if (i === 0) {
          ind1 = n - 1;
          ind2 = 0;
        } else {
          ind1 = i - 1;
          ind2 = i;
        }
        p1 = pts[ind1];
        p2 = pts[ind2];
        y2 = p2[Y];
        y1 = p1[Y];
        if (y1 == y2) continue;
        uv1 = uvs[ind1];
        uv2 = uvs[ind2];
        if (y1 > y2) {
          p2 = pts[ind1];
          p1 = pts[ind2];
          uv2 = uvs[ind1];
          uv1 = uvs[ind2];
        }
        y2 = p2[Y];
        y1 = p1[Y];
        x2 = p2[X];
        x1 = p1[X];
        z2 = p2[Z];
        z1 = p1[Z];
        uvy2 = uv2[Y];
        uvy1 = uv1[Y];
        uvx2 = uv2[X];
        uvx1 = uv1[X];
        uvz2 = uv2[Z];
        uvz1 = uv1[Z];
        if ((y >= y1 && y < y2) || (y === vd_o && y > y1 && y <= y2)) {
          gradient = (y - y1) / (y2 - y1);
          u = vdgeo.vd_cQ(uvx1, uvx2, gradient);
          v = vdgeo.vd_cQ(uvy1, uvy2, gradient);
          w = vdgeo.vd_cQ(uvz1, uvz2, gradient);
          z = vdgeo.vd_cQ(z1, z2, gradient);
          x = vdgeo.vd_cQ(x1, x2, gradient);
          ints++;
          vd_aB.push([x, z, u, v, w]);
          if (vd_ew && ints === 2) break;
        }
      }
      if (ints === 0) continue;
      if (ints === 2) {
        l1 = vd_aB[0];
        l2 = vd_aB[1];
        if (l1[0] > l2[0]) {
          l2 = vd_aB[0];
          l1 = vd_aB[1];
        }
        vd_i.vd_DI(
          l1[0],
          y,
          l2[0] - l1[0] + 1,
          l1[1],
          l2[1],
          l1[2],
          l1[3],
          l1[4],
          l2[2],
          l2[3],
          l2[4]
        );
      } else {
        vd_aB.sort(function (a, b) {
          return a[0] - b[0];
        });
        for (var ii = 0; ii < ints - 1; ii += 2) {
          l1 = vd_aB[ii];
          l2 = vd_aB[ii + 1];
          vd_i.vd_DI(
            l1[0],
            y,
            l2[0] - l1[0] + 1,
            l1[1],
            l2[1],
            l1[2],
            l1[3],
            l1[4],
            l2[2],
            l2[3],
            l2[4]
          );
        }
      }
    }
  };
  this.vd_lr = function (pts, vd_ew) {
    var gradient = 0,
      x = 0,
      z = 0,
      i = 0;
    var n = pts.length;
    if (n === 0) return;
    p1 = pts[0];
    vd_w = p1[Y];
    vd_o = p1[Y];
    minx = p1[X];
    maxx = p1[X];
    for (i = 1; i < n; i++) {
      p1 = pts[i];
      if (p1[Y] < vd_w) vd_w = p1[Y];
      else if (p1[Y] > vd_o) vd_o = p1[Y];
      if (p1[X] < minx) minx = p1[X];
      else if (p1[X] > maxx) maxx = p1[X];
    }
    if (minx > vd_i.vd_D.clip[2]) return;
    if (maxx < vd_i.vd_D.clip[0]) return;
    if (vd_w > vd_i.vd_D.clip[3] || vd_o < vd_i.vd_D.clip[1]) return;
    vd_w = Math.max(vd_w, vd_i.vd_D.clip[1]);
    vd_w = Math.min(vd_w, vd_i.vd_D.clip[3]);
    vd_o = Math.max(vd_o, vd_i.vd_D.clip[1]);
    vd_o = Math.min(vd_o, vd_i.vd_D.clip[3]);
    vd_w = Math.round(vd_w);
    vd_o = Math.round(vd_o);
    var vd_aB;
    for (y = vd_w; y <= vd_o; y++) {
      vd_aB = [];
      ints = 0;
      for (i = 0; i < n; i++) {
        if (i === 0) {
          ind1 = n - 1;
          ind2 = 0;
        } else {
          ind1 = i - 1;
          ind2 = i;
        }
        p1 = pts[ind1];
        p2 = pts[ind2];
        y2 = p2[Y];
        y1 = p1[Y];
        if (y1 == y2) continue;
        if (y1 > y2) {
          p2 = pts[ind1];
          p1 = pts[ind2];
        }
        y2 = p2[Y];
        y1 = p1[Y];
        x2 = p2[X];
        x1 = p1[X];
        z2 = p2[Z];
        z1 = p1[Z];
        if ((y >= y1 && y < y2) || (y === vd_o && y > y1 && y <= y2)) {
          gradient = (y - y1) / (y2 - y1);
          z = vdgeo.vd_cQ(z1, z2, gradient);
          x = vdgeo.vd_cQ(x1, x2, gradient);
          ints++;
          vd_aB.push([x, z]);
          if (vd_ew && ints === 2) break;
        }
      }
      if (ints === 0) continue;
      if (ints === 2) {
        l1 = vd_aB[0];
        l2 = vd_aB[1];
        if (l1[0] > l2[0]) {
          l2 = vd_aB[0];
          l1 = vd_aB[1];
        }
        vd_i.vd_DM(l1[0], y, l2[0] - l1[0] + 1, l1[1], l2[1]);
      } else {
        vd_aB.sort(function (a, b) {
          return a[0] - b[0];
        });
        for (var ii = 0; ii < ints - 1; ii += 2) {
          l1 = vd_aB[ii];
          l2 = vd_aB[ii + 1];
          vd_i.vd_DM(l1[0], y, l2[0] - l1[0] + 1, l1[1], l2[1]);
        }
      }
    }
  };
  this.vd_fF = function (pts) {
    var gradient = 0,
      i = 0;
    var n = pts.length;
    if (n === 0) return;
    p1 = pts[0];
    vd_w = p1[Y];
    vd_o = p1[Y];
    minx = p1[X];
    maxx = p1[X];
    for (i = 1; i < n; i++) {
      p1 = pts[i];
      if (p1[Y] < vd_w) vd_w = p1[Y];
      else if (p1[Y] > vd_o) vd_o = p1[Y];
      if (p1[X] < minx) minx = p1[X];
      else if (p1[X] > maxx) maxx = p1[X];
    }
    if (minx > vd_i.vd_D.clip[2]) return;
    if (maxx < vd_i.vd_D.clip[0]) return;
    if (vd_w > vd_i.vd_D.clip[3] || vd_o < vd_i.vd_D.clip[1]) return;
    vd_w = Math.max(vd_w, vd_i.vd_D.clip[1]);
    vd_w = Math.min(vd_w, vd_i.vd_D.clip[3]);
    vd_o = Math.max(vd_o, vd_i.vd_D.clip[1]);
    vd_o = Math.min(vd_o, vd_i.vd_D.clip[3]);
    vd_w = Math.round(vd_w);
    vd_o = Math.round(vd_o);
    if (vd_o - vd_w <= 1) {
      vd_i.vd_qy(minx, vd_w, maxx - minx + 1);
      return;
    }
    for (y = vd_w; y <= vd_o; y++) {
      var vd_aB = [];
      ints = 0;
      for (i = 0; i < n; i++) {
        if (i === 0) {
          ind1 = n - 1;
          ind2 = 0;
        } else {
          ind1 = i - 1;
          ind2 = i;
        }
        p1 = pts[ind1];
        p2 = pts[ind2];
        y2 = p2[Y];
        y1 = p1[Y];
        if (y1 == y2) continue;
        if (y1 > y2) {
          p2 = pts[ind1];
          p1 = pts[ind2];
        }
        y2 = p2[Y];
        y1 = p1[Y];
        x2 = p2[X];
        x1 = p1[X];
        if ((y >= y1 && y < y2) || (y === vd_o && y > y1 && y <= y2)) {
          gradient = (y - y1) / (y2 - y1);
          var x = vdgeo.vd_cQ(x1, x2, gradient);
          vd_aB.push(x);
          ints++;
        }
      }
      if (ints === 0) continue;
      if (ints === 2) {
        l1 = vd_aB[0];
        l2 = vd_aB[1];
        if (l1 > l2) {
          l2 = vd_aB[0];
          l1 = vd_aB[1];
        }
        vd_i.vd_qy(l1, y, l2 - l1 + 1);
      } else {
        vd_aB.sort(function (a, b) {
          return a - b;
        });
        for (var ii = 0; ii < ints - 1; ii += 2) {
          vd_i.vd_qy(vd_aB[ii], y, vd_aB[ii + 1] - vd_aB[ii] + 1);
        }
      }
    }
  };
  this.vd_IK = function (x1, y1, w, z1, z2, u1, v1, w1, u2, v2, w2) {
    var iz = 0,
      iu = 0,
      iv = 0,
      iw = 0;
    var sx = 0,
      ex = 0,
      i = 0,
      gradient = 0,
      z = 0,
      u = 0,
      v = 0,
      tw = 0;
    var _sx = 0,
      _ex = 0,
      vd_gH = 0,
      vd_hs,
      dx = 0,
      dy = 0;
    var vd_gl = 0,
      sx_a = 0,
      ex_a = 0;
    sx = Math.max(vd_i.vd_D.clip[0], x1);
    ex = Math.min(vd_i.vd_D.clip[2], x1 + w);
    _sx = vdgeo.vd_r(sx);
    _ex = vdgeo.vd_r(ex);
    if (_sx >= _ex) return;
    vd_gH = 1.0;
    vd_hs = 1.0;
    dx = _sx - sx;
    if (dx <= 0) dx = 1.0 + dx;
    dy = ex - _ex;
    if (dy <= 0) dy = 1.0 + dy;
    vd_gH = Math.max(0.3, dx);
    vd_hs = Math.max(0.3, dy);
    sx = _sx;
    ex = _ex;
    y1 = vdgeo.vd_r(y1);
    iz = z2 - z1;
    iu = u2 - u1;
    iv = v2 - v1;
    iw = w2 - w1;
    vd_gl = vd_i.Alpha;
    sx_a = vdgeo.vd_r(vd_gH * vd_i.Alpha);
    ex_a = vdgeo.vd_r(vd_hs * vd_i.Alpha);
    gradient = (sx - x1) / w;
    z = z1 + iz * gradient;
    u = u1 + iu * gradient;
    v = v1 + iv * gradient;
    tw = w1 + iw * gradient;
    if (tw != 0.0) {
      u /= tw;
      v /= tw;
    }
    vd_dv(sx, y1);
    vd_i.Alpha = sx_a;
    vd_i.vd_bb(z, true, u, v);
    vd_i.Alpha = vd_gl;
    for (i = sx + 1; i < ex - 1; i++) {
      gradient = (i - x1) / w;
      z = z1 + iz * gradient;
      u = u1 + iu * gradient;
      v = v1 + iv * gradient;
      tw = w1 + iw * gradient;
      if (tw != 0.0) {
        u /= tw;
        v /= tw;
      }
      vd_dv(i, y1);
      vd_i.vd_bb(z, true, u, v);
    }
    if (i < ex) {
      gradient = (i - x1) / w;
      z = z1 + iz * gradient;
      u = u1 + iu * gradient;
      v = v1 + iv * gradient;
      tw = w1 + iw * gradient;
      if (tw != 0.0) {
        u /= tw;
        v /= tw;
      }
      vd_dv(i, y1);
      vd_i.Alpha = ex_a;
      vd_i.vd_bb(z, true, u, v);
      vd_i.Alpha = vd_gl;
    }
  };
  this.vd_Jo = function (x1, y1, w, z1, z2) {
    var iz = 0;
    var sx = 0,
      ex = 0,
      i = 0,
      gradient = 0,
      z = 0;
    var _sx = 0,
      _ex = 0,
      vd_gH = 0,
      vd_hs,
      dx = 0,
      dy = 0;
    var vd_gl = 0,
      sx_a = 0,
      ex_a = 0;
    sx = Math.max(vd_i.vd_D.clip[0], x1);
    ex = Math.min(vd_i.vd_D.clip[2], x1 + w);
    _sx = vdgeo.vd_r(sx);
    _ex = vdgeo.vd_r(ex);
    if (_sx >= _ex) return;
    vd_gH = 1.0;
    vd_hs = 1.0;
    dx = _sx - sx;
    if (dx <= 0) dx = 1.0 + dx;
    dy = ex - _ex;
    if (dy <= 0) dy = 1.0 + dy;
    vd_gH = Math.max(0.3, dx);
    vd_hs = Math.max(0.3, dy);
    sx = _sx;
    ex = _ex;
    y1 = vdgeo.vd_r(y1);
    iz = z2 - z1;
    vd_gl = vd_i.Alpha;
    sx_a = vdgeo.vd_r(vd_gH * vd_i.Alpha);
    ex_a = vdgeo.vd_r(vd_hs * vd_i.Alpha);
    gradient = (sx - x1) / w;
    z = z1 + iz * gradient;
    vd_dv(sx, y1);
    vd_i.Alpha = sx_a;
    vd_i.vd_bb(z);
    vd_i.Alpha = vd_gl;
    for (i = sx + 1; i < ex - 1; i++) {
      gradient = (i - x1) / w;
      z = z1 + iz * gradient;
      vd_dv(i, y1);
      vd_i.vd_bb(z);
    }
    if (i < ex) {
      gradient = (i - x1) / w;
      z = z1 + iz * gradient;
      vd_dv(i, y1);
      vd_i.Alpha = ex_a;
      vd_i.vd_bb(z);
      vd_i.Alpha = vd_gl;
    }
  };
  this.vd_Kq = function (x1, y1, w) {
    var sx = 0,
      ex = 0,
      i = 0;
    var _sx = 0,
      _ex = 0,
      vd_gH = 0,
      vd_hs,
      dx = 0,
      dy = 0;
    var vd_gl = 0,
      sx_a = 0,
      ex_a = 0;
    sx = Math.max(vd_i.vd_D.clip[0], x1);
    ex = Math.min(vd_i.vd_D.clip[2], x1 + w);
    _sx = vdgeo.vd_r(sx);
    _ex = vdgeo.vd_r(ex);
    if (_sx >= _ex) return;
    vd_gH = 1.0;
    vd_hs = 1.0;
    dx = _sx - sx;
    if (dx <= 0) dx = 1.0 + dx;
    dy = ex - _ex;
    if (dy <= 0) dy = 1.0 + dy;
    vd_gH = Math.max(0.3, dx);
    vd_hs = Math.max(0.3, dy);
    sx = _sx;
    ex = _ex;
    y1 = vdgeo.vd_r(y1);
    vd_gl = vd_i.Alpha;
    sx_a = vdgeo.vd_r(vd_gH * vd_i.Alpha);
    ex_a = vdgeo.vd_r(vd_hs * vd_i.Alpha);
    vd_dv(sx, y1);
    vd_i.Alpha = sx_a;
    vd_i.vd_bb(1);
    vd_i.Alpha = vd_gl;
    for (i = sx + 1; i < ex - 1; i++) {
      vd_dv(i, y1);
      vd_i.vd_bb(1);
    }
    if (i < ex) {
      vd_dv(i, y1);
      vd_i.Alpha = ex_a;
      vd_i.vd_bb(1);
      vd_i.Alpha = vd_gl;
    }
  };
  this.vd_lC = function (vd_ai) {
    var gradient = 0,
      x = 0,
      a = 0,
      i = 0;
    vd_w = vd_o = minx = maxx = 0;
    var vd_gM = [];
    for (a = 0; a < vd_ai.length; a++) {
      for (i = 0; i < vd_ai[a].length; i++) {
        p1 = vd_ai[a][i];
        if (i === 0 && a === 0) {
          vd_w = p1[Y];
          vd_o = p1[Y];
          minx = p1[X];
          maxx = p1[X];
          continue;
        }
        if (p1[Y] < vd_w) vd_w = p1[Y];
        else if (p1[Y] > vd_o) vd_o = p1[Y];
        if (p1[X] < minx) minx = p1[X];
        else if (p1[X] > maxx) maxx = p1[X];
      }
    }
    if (minx > vd_i.vd_D.clip[2]) return;
    if (maxx < vd_i.vd_D.clip[0]) return;
    if (vd_w > vd_i.vd_D.clip[3] || vd_o < vd_i.vd_D.clip[1]) return;
    vd_w = Math.max(vd_w, vd_i.vd_D.clip[1]);
    vd_w = Math.min(vd_w, vd_i.vd_D.clip[3]);
    vd_o = Math.max(vd_o, vd_i.vd_D.clip[1]);
    vd_o = Math.min(vd_o, vd_i.vd_D.clip[3]);
    var y;
    var k = 0;
    for (y = vd_w; y <= vd_o; y++) {
      vd_gM.push(y);
    }
    ints = 0;
    for (k = 0; k < vd_gM.length; k++) {
      y = vd_gM[k];
      var vd_aB = [];
      ints = 0;
      for (a = 0; a < vd_ai.length; a++) {
        for (i = 0; i < vd_ai[a].length - 1; i++) {
          ind1 = i;
          ind2 = i + 1;
          p1 = vd_ai[a][ind1];
          p2 = vd_ai[a][ind2];
          y1 = p1[Y];
          y2 = p2[Y];
          if (y1 == y2) continue;
          if (y1 > y2) {
            p2 = vd_ai[a][ind1];
            p1 = vd_ai[a][ind2];
          }
          y1 = p1[Y];
          y2 = p2[Y];
          x1 = p1[X];
          x2 = p2[X];
          if ((y >= y1 && y < y2) || (y === vd_o && y > y1 && y <= y2)) {
            gradient = (y - y1) / (y2 - y1);
            x = vdgeo.vd_cQ(x1, x2, gradient);
            vd_aB.push([x]);
            ints++;
          }
        }
      }
      if (ints === 0) continue;
      vd_aB.sort(function (a, b) {
        return a[0] - b[0];
      });
      for (var ii = 0; ii < ints - 1; ii += 2) {
        l1 = vd_aB[ii];
        l2 = vd_aB[ii + 1];
        vd_i.vd_Kq(l1[0], y, l2[0] - l1[0] + 1);
      }
    }
  };
  this.vd_qL = function (vd_ai) {
    var gradient = 0,
      x = 0,
      z = 0,
      a = 0,
      i = 0;
    vd_w = vd_o = minx = maxx = 0;
    var vd_gM = [];
    for (a = 0; a < vd_ai.length; a++) {
      for (i = 0; i < vd_ai[a].length; i++) {
        p1 = vd_ai[a][i];
        if (i === 0 && a === 0) {
          vd_w = p1[Y];
          vd_o = p1[Y];
          minx = p1[X];
          maxx = p1[X];
          continue;
        }
        if (p1[Y] < vd_w) vd_w = p1[Y];
        else if (p1[Y] > vd_o) vd_o = p1[Y];
        if (p1[X] < minx) minx = p1[X];
        else if (p1[X] > maxx) maxx = p1[X];
      }
    }
    if (minx > vd_i.vd_D.clip[2]) return;
    if (maxx < vd_i.vd_D.clip[0]) return;
    if (vd_w > vd_i.vd_D.clip[3] || vd_o < vd_i.vd_D.clip[1]) return;
    vd_w = Math.max(vd_w, vd_i.vd_D.clip[1]);
    vd_w = Math.min(vd_w, vd_i.vd_D.clip[3]);
    vd_o = Math.max(vd_o, vd_i.vd_D.clip[1]);
    vd_o = Math.min(vd_o, vd_i.vd_D.clip[3]);
    var y;
    var k = 0;
    for (y = vd_w; y <= vd_o; y++) {
      vd_gM[k++] = y;
    }
    ints = 0;
    for (k = 0; k < vd_gM.length; k++) {
      y = vd_gM[k];
      var vd_aB = [];
      ints = 0;
      for (a = 0; a < vd_ai.length; a++) {
        for (i = 0; i < vd_ai[a].length - 1; i++) {
          ind1 = i;
          ind2 = i + 1;
          p1 = vd_ai[a][ind1];
          p2 = vd_ai[a][ind2];
          y1 = p1[Y];
          y2 = p2[Y];
          if (y1 == y2) continue;
          if (y1 > y2) {
            p2 = vd_ai[a][ind1];
            p1 = vd_ai[a][ind2];
          }
          y1 = p1[Y];
          y2 = p2[Y];
          x1 = p1[X];
          x2 = p2[X];
          z1 = p1[Z];
          z2 = p2[Z];
          if ((y >= y1 && y < y2) || (y === vd_o && y > y1 && y <= y2)) {
            gradient = (y - y1) / (y2 - y1);
            z = vdgeo.vd_cQ(z1, z2, gradient);
            x = vdgeo.vd_cQ(x1, x2, gradient);
            vd_aB.push([x, z]);
            ints++;
          }
        }
      }
      if (ints === 0) continue;
      vd_aB.sort(function (a, b) {
        return a[0] - b[0];
      });
      for (var ii = 0; ii < ints - 1; ii += 2) {
        l1 = vd_aB[ii];
        l2 = vd_aB[ii + 1];
        vd_i.vd_Jo(l1[0], y, l2[0] - l1[0] + 1, l1[1], l2[1]);
      }
    }
  };
  this.vd_Fn = function (vd_ai, uvs, vd_tz) {
    if (!uvs || !vd_i.vd_D.vd_cT) {
      vd_i.vd_qL(vd_ai);
      return;
    }
    var gradient = 0,
      x = 0,
      z = 0,
      a = 0,
      i = 0,
      u = 0,
      v = 0,
      w = 0;
    vd_w = vd_o = minx = maxx = 0;
    var vd_gM = [];
    for (a = 0; a < vd_ai.length; a++) {
      for (i = 0; i < vd_ai[a].length; i++) {
        p1 = vd_ai[a][i];
        if (i === 0 && a === 0) {
          vd_w = p1[Y];
          vd_o = p1[Y];
          minx = p1[X];
          maxx = p1[X];
          continue;
        }
        if (p1[Y] < vd_w) vd_w = p1[Y];
        else if (p1[Y] > vd_o) vd_o = p1[Y];
        if (p1[X] < minx) minx = p1[X];
        else if (p1[X] > maxx) maxx = p1[X];
      }
    }
    if (minx > vd_i.vd_D.clip[2]) return;
    if (maxx < vd_i.vd_D.clip[0]) return;
    if (vd_w > vd_i.vd_D.clip[3] || vd_o < vd_i.vd_D.clip[1]) return;
    vd_w = Math.max(vd_w, vd_i.vd_D.clip[1]);
    vd_w = Math.min(vd_w, vd_i.vd_D.clip[3]);
    vd_o = Math.max(vd_o, vd_i.vd_D.clip[1]);
    vd_o = Math.min(vd_o, vd_i.vd_D.clip[3]);
    var y;
    var k = 0;
    for (y = vd_w; y <= vd_o; y++) {
      vd_gM.push(y);
    }
    ints = 0;
    for (k = 0; k < vd_gM.length; k++) {
      y = vd_gM[k];
      var vd_aB = [];
      ints = 0;
      for (a = 0; a < vd_ai.length; a++) {
        for (i = 0; i < vd_ai[a].length - 1; i++) {
          ind1 = i;
          ind2 = i + 1;
          p1 = vd_ai[a][ind1];
          p2 = vd_ai[a][ind2];
          y1 = p1[Y];
          y2 = p2[Y];
          if (y1 == y2) continue;
          uv1 = uvs[a][ind1];
          uv2 = uvs[a][ind2];
          if (y1 > y2) {
            p2 = vd_ai[a][ind1];
            p1 = vd_ai[a][ind2];
            uv2 = uvs[a][ind1];
            uv1 = uvs[a][ind2];
          }
          y1 = p1[Y];
          y2 = p2[Y];
          x1 = p1[X];
          x2 = p2[X];
          z1 = p1[Z];
          z2 = p2[Z];
          uvx1 = uv1[X];
          uvx2 = uv2[X];
          uvy1 = uv1[Y];
          uvy2 = uv2[Y];
          uvz1 = uv1[Z];
          uvz2 = uv2[Z];
          if ((y >= y1 && y < y2) || (y === vd_o && y > y1 && y <= y2)) {
            gradient = (y - y1) / (y2 - y1);
            u = vdgeo.vd_cQ(uvx1 * vd_tz, uvx2 * vd_tz, gradient);
            v = vdgeo.vd_cQ(uvy1 * vd_tz, uvy2 * vd_tz, gradient);
            w = 1;
            z = vdgeo.vd_cQ(z1, z2, gradient);
            x = vdgeo.vd_cQ(x1, x2, gradient);
            vd_aB.push([x, z, u, v, w]);
            ints++;
          }
        }
      }
      if (ints === 0) continue;
      vd_aB.sort(function (a, b) {
        return a[0] - b[0];
      });
      for (var ii = 0; ii < ints - 1; ii += 2) {
        l1 = vd_aB[ii];
        l2 = vd_aB[ii + 1];
        vd_i.vd_IK(
          l1[0],
          y,
          l2[0] - l1[0] + 1,
          l1[1],
          l2[1],
          l1[2],
          l1[3],
          l1[4],
          l2[2],
          l2[3],
          l2[4]
        );
      }
    }
  };
  this.vd_qj = function (vd_u, vd_yA, vd_Nq, vd_Bv) {
    if (vd_u == null) return;
    var vd_ng = vd_u.width;
    var vd_nw = vd_u.height;
    var vd_io = vdgeo.vd_Q();
    vdgeo.vd_bf(vd_io, vd_Bv, vd_Bv, 1);
    vdgeo.vd_cW(vd_io, vd_Nq);
    if (!vdgeo.vd_DX(vd_io)) return;
    if (vd_io == null) return;
    var vd_KY = vdgeo.vd_bu(vd_io);
    var m = vd_io;
    var minv = vd_KY;
    var vd_id = vdgeo.matrixtransform(m, vdgeo.newpoint(0, 0, 0));
    var vd_rs = vdgeo.matrixtransform(m, vdgeo.newpoint(vd_ng, 0, 0));
    var vd_lq = vdgeo.matrixtransform(m, vdgeo.newpoint(vd_ng, vd_nw, 0));
    var vd_tK = vdgeo.matrixtransform(m, vdgeo.newpoint(0, vd_nw, 0));
    var left = Math.min(vd_id[X], vd_rs[X], vd_lq[X], vd_tK[X]);
    var right = Math.max(vd_id[X], vd_rs[X], vd_lq[X], vd_tK[X]);
    var top = Math.min(vd_id[Y], vd_rs[Y], vd_lq[Y], vd_tK[Y]);
    var bottom = Math.max(vd_id[Y], vd_rs[Y], vd_lq[Y], vd_tK[Y]);
    left = vd_ab(Math.max(left, vd_i.vd_D.clip[0]));
    right = vd_ab(Math.min(right, vd_i.vd_D.clip[2]));
    top = vd_ab(Math.max(top, vd_i.vd_D.clip[1]));
    bottom = vd_ab(Math.min(bottom, vd_i.vd_D.clip[3]));
    var mA00 = minv[A00];
    var mA01 = minv[A01];
    var mA10 = minv[A10];
    var mA11 = minv[A11];
    var mA03 = minv[A03];
    var mA13 = minv[A13];
    var ptx, pty, _ptx, _pty;
    var r, g, b;
    var _px3;
    for (var iy = top; iy < bottom; iy++) {
      _ptx = mA01 * iy + mA03;
      _pty = mA11 * iy + mA13;
      for (var ix = left; ix < right; ix++) {
        ptx = mA00 * ix + _ptx;
        if (ptx < 0) continue;
        if (ptx >= vd_ng) continue;
        pty = mA10 * ix + _pty;
        if (pty < 0) continue;
        if (pty >= vd_nw) continue;
        var rgb = vd_zX(vd_u, ptx, pty);
        if (!rgb) continue;
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        var ipos = iy * vd_i.vd_aK + ix;
        var pos = ipos * 4;
        vd_i.vd_tE(ix, iy, pos, r, g, b, vd_i.Alpha);
        vd_zH(ipos);
      }
    }
  };
  function vd_Qy() {
    return vdgeo.vd_nB(
      px,
      py,
      vd_i.vd_D.clip[0],
      vd_i.vd_D.clip[1],
      vd_i.vd_D.clip[2],
      vd_i.vd_D.clip[3]
    );
  }
  function vd_dv(x, y) {
    px = x;
    py = y;
  }
  var vd_Ec = 0;
  function vd_Fu(XDir) {
    vd_Ec = XDir;
  }
  function AdvanceX() {
    px += vd_Ec;
  }
  function AdvanceY() {
    py++;
  }
  function vd_xe(vd_gr) {
    for (var i = 0; i < vd_gr; i++) {
      vd_i.vd_bb();
      AdvanceX();
    }
    AdvanceY();
  }
  function vd_yh(vd_gr) {
    for (var i = 0; i < vd_gr; i++) {
      vd_i.vd_bb();
      AdvanceY();
    }
    AdvanceX();
  }
  this.vd_fG = null;
  this.vd_Ar = true;
  var vd_eg = 0;
  var vd_iQ = null;
  var vd_vW = null;
  this.vd_zv = function (vd_NU, color, matrix) {
    vd_eg = vd_NU;
    vd_iQ = color;
    vd_vW = matrix;
  };
  this.vd_gj = function (vd_ct) {
    if (!vd_ct || !vd_ct.bytes) vd_i.vd_fG = null;
    else vd_i.vd_fG = vd_ct;
  };
  var xor = false;
  this.vd_Qa = function (value) {
    var ret = xor;
    xor = value;
    return ret;
  };
  var vd_pC = undefined;
  function vd_JY() {
    if (vd_pC !== undefined) return vd_pC;
    return vdgeo.vd_Iu(
      vd_ff[0],
      vd_ff[1],
      vd_ff[2],
      vd_ff[3],
      vd_ff[4],
      vd_ff[5],
      px,
      py
    );
  }
  function vd_zX(vd_u, _x, _y) {
    var ir, ig, ib, ia;
    var tx = vd_u.width;
    var ty = vd_u.height;
    var x = vdgeo.vd_r(_x);
    var y = vdgeo.vd_r(_y);
    var bytescount = 4;
    var _px = x;
    var _py = y;
    var _px3 = _px * bytescount;
    var vd_dc = vd_u.bytes[_py];
    ir = vd_dc[_px3];
    ig = vd_dc[_px3 + 1];
    ib = vd_dc[_px3 + 2];
    ia = vd_dc[_px3 + 3];
    if (vd_i.vd_jr === vdConst.InterpolationMode_Bilinear) {
      var ir2, ig2, ib2, ia2, ir3, ig3, ib3, ia3, ir4, ig4, ib4, ia4;
      var dU, dV, m1, m2, m3, m4;
      _px = Math.min(x + 1, tx - 1);
      _px3 = _px * bytescount;
      ir2 = vd_dc[_px3];
      ig2 = vd_dc[_px3 + 1];
      ib2 = vd_dc[_px3 + 2];
      ia2 = vd_dc[_px3 + 3];
      _px = Math.min(x, tx - 1);
      _px3 = _px * bytescount;
      _py = Math.min(y + 1, ty - 1);
      vd_dc = vd_u.bytes[_py];
      ir3 = vd_dc[_px3];
      ig3 = vd_dc[_px3 + 1];
      ib3 = vd_dc[_px3 + 2];
      ia3 = vd_dc[_px3 + 3];
      _px = Math.min(x + 1, tx - 1);
      _px3 = _px * bytescount;
      ir4 = vd_dc[_px3];
      ig4 = vd_dc[_px3 + 1];
      ib4 = vd_dc[_px3 + 2];
      ia4 = vd_dc[_px3 + 3];
      dU = _x - x;
      dV = _y - y;
      m1 = (1 - dU) * (1 - dV);
      m2 = dU * (1 - dV);
      m3 = (1 - dU) * dV;
      m4 = dU * dV;
      ir = vdgeo.vd_r(ir * m1 + ir2 * m2 + ir3 * m3 + ir4 * m4);
      ig = vdgeo.vd_r(ig * m1 + ig2 * m2 + ig3 * m3 + ig4 * m4);
      ib = vdgeo.vd_r(ib * m1 + ib2 * m2 + ib3 * m3 + ib4 * m4);
      ia = vdgeo.vd_r(ia * m1 + ia2 * m2 + ia3 * m3 + ia4 * m4);
    }
    if (ia === 0) return null;
    return [ir, ig, ib];
  }
  this.vd_Hl = function (xmin, xmax, ymin, ymax) {
    if (!vd_i.vd_D.vd_bd) return 1.0;
    var vd_cD = Math.min(xmin, xmax);
    var vd_dz = Math.max(xmin, xmax);
    vd_cD = vd_ab(Math.max(vd_cD, 0));
    vd_dz = vd_ab(Math.min(vd_dz, vd_i.vd_aK - 1));
    var vd_dB = Math.min(ymin, ymax);
    var vd_bX = Math.max(ymin, ymax);
    vd_dB = vd_ab(Math.max(vd_dB, 0));
    vd_bX = vd_ab(Math.min(vd_bX, vd_i.vd_as - 1));
    var ret = 2.0;
    for (var y = vd_dB; y < vd_bX; y++) {
      for (var x = vd_cD; x < vd_dz; x++) {
        var ipos = y * vd_i.vd_aK + x;
        ret = Math.min(vd_fr[ipos][0], ret);
      }
    }
    if (ret > 1) ret = 0;
    return ret;
  };
  this.vd_jM = function (x, y) {
    x = vdgeo.vd_r(x);
    y = vdgeo.vd_r(y);
    if (
      !vd_i.vd_D.vd_bd ||
      x < 0 ||
      x >= vd_i.vd_aK ||
      y < 0 ||
      y >= vd_i.vd_as
    )
      return 1.0;
    var ipos = y * vd_i.vd_aK + x;
    return vd_fr[ipos][0];
  };
  var vd_zl = 0.000000001;
  var vd_Pk = 0.005;
  var __PT = vdgeo.newpoint(0, 0, 0);
  var ipos = 0,
    vd_oc = 0,
    cz = 0,
    alpha = 0;
  this.vd_Pb = function (x, y, z, vd_Ir, vd_AV) {
    x = vd_ab(x);
    y = vd_ab(y);
    if (x > vd_i.vd_D.clip[2]) return false;
    if (x < vd_i.vd_D.clip[0]) return false;
    if (y > vd_i.vd_D.clip[3] || y < vd_i.vd_D.clip[1]) return false;
    if ((vd_i.vd_D.vd_bd || vd_i.vd_D.vd_dJ) && !vd_uJ(x, y, z)) return false;
    if (vd_Ir) {
      if (z === undefined || !vd_i.vd_D.vd_bd || !vd_i.vd_D.vd_bd) return true;
      var ipos = y * vd_i.vd_aK + x;
      var vd_Qr = vd_fr[ipos][0];
      if (!vd_AV) vd_AV = vd_zl;
      if (Math.abs(z - vd_fr[ipos][0]) > vd_AV) return false;
    }
    return true;
  };
  function vd_xM(zval, vd_yR, u, v) {
    ipos = py * vd_i.vd_aK + px;
    var pos = ipos * 4;
    vd_oc = undefined;
    cz = 1.0;
    alpha = vd_i.Alpha;
    if (vd_i.vd_D.vd_bd || vd_i.vd_D.vd_dJ) {
      if (zval !== undefined) cz = zval;
      else cz = vd_JY();
      if (!vd_uJ(px, py, cz)) return;
    }
    if (vd_i.vd_D.vd_bd) {
      vd_oc = vd_fr[ipos][0];
      if (cz > vd_oc + vd_zl) return;
      vd_fr[ipos][0] = cz;
    }
    if (vd_i.vd_fG && vd_yR) {
      if (!vd_i.vd_Ar && (u < 0 || u > 1 || v < 0 || v > 1)) return;
      var tx = vd_i.vd_fG.width;
      var ty = vd_i.vd_fG.height;
      var _x = (tx * u) % tx;
      var _y = (ty * v) % ty;
      if (_x < 0) _x += tx;
      if (_y < 0) _y += ty;
      var rgb = vd_zX(vd_i.vd_fG, _x, _y);
      if (!rgb) {
        if (vd_oc) vd_fr[ipos][0] = vd_oc;
        return;
      }
      vd_i.vd_tE(px, py, pos, rgb[0], rgb[1], rgb[2], alpha);
    } else if (vd_vW != null) {
      vdgeo.vd_dX(px, py, cz, vd_vW, __PT);
      if (__PT[W] != 0) {
        __PT[X] /= __PT[W];
        __PT[Y] /= __PT[W];
      }
      var dist = 0;
      var vd_ju = vd_i.vd_bw;
      var vd_mU = vd_iQ;
      if (vd_eg === 1 || vd_eg === 3) {
        dist = __PT[X] + 0.5;
      } else {
        vd_ju = vd_iQ;
        vd_mU = vd_i.vd_bw;
        dist = Math.sqrt(__PT[X] * __PT[X] + __PT[Y] * __PT[Y]) * 1.4142;
      }
      if (vd_eg === 3 || vd_eg === 4 || vd_eg === 6) {
        var tmp = vd_ju;
        vd_ju = vd_mU;
        vd_mU = tmp;
      }
      dist = Math.min(Math.max(dist, 0), 1);
      var r = vdgeo.vd_r(vd_ju[0] + (vd_mU[0] - vd_ju[0]) * dist);
      var g = vdgeo.vd_r(vd_ju[1] + (vd_mU[1] - vd_ju[1]) * dist);
      var b = vdgeo.vd_r(vd_ju[2] + (vd_mU[2] - vd_ju[2]) * dist);
      vd_i.vd_tE(px, py, pos, r, g, b, alpha);
    } else {
      vd_i.vd_tE(
        px,
        py,
        pos,
        vd_i.vd_bw[0],
        vd_i.vd_bw[1],
        vd_i.vd_bw[2],
        alpha
      );
    }
    vd_zH(ipos);
  }
  this.vd_tE = function (x, y, pos, r, g, b, a) {
    var ir = r;
    var ig = g;
    var ib = b;
    var ia = a;
    if (vd_jB) ia = 255;
    if (vd_i.vd_D.vd_bd && vd_i.vd_D.vd_fj) {
      ir = vdgeo.vd_r(ir * vd_i.vd_fW[0]);
      ig = vdgeo.vd_r(ig * vd_i.vd_fW[1]);
      ib = vdgeo.vd_r(ib * vd_i.vd_fW[2]);
      if (ir > 255) ir = 255;
      if (ig > 255) ig = 255;
      if (ib > 255) ib = 255;
    }
    if (a != 255 && !xor) {
      var div = a / 255;
      ir = vdgeo.vd_r(ir * div + vd_K[pos] * (1 - div));
      ig = vdgeo.vd_r(ig * div + vd_K[pos + 1] * (1 - div));
      ib = vdgeo.vd_r(ib * div + vd_K[pos + 2] * (1 - div));
    }
    if (vd_i.vd_D.vd_no) {
      ir = ig = ib = (ir + ig + ib) / 3;
    }
    if (xor) {
      vd_K[pos++] ^= ir;
      vd_K[pos++] ^= ig;
      vd_K[pos++] ^= ib;
      vd_K[pos++] = 255;
    } else {
      if (vd_i.vd_xJ && vd_Gb(x, y)) {
        ir = vd_bT[0];
        ig = vd_bT[1];
        ib = vd_bT[2];
        ia = vd_bT[3];
      }
      vd_K[pos++] = ir;
      vd_K[pos++] = ig;
      vd_K[pos++] = ib;
      vd_K[pos++] = ia;
    }
  };
  this.vd_Kv = function (x, y, w, h) {
    x = vd_ab(x);
    y = vd_ab(y);
    w = vd_ab(w);
    h = vd_ab(h);
    var left = Math.max(x, this.vd_D.clip[0]);
    var right = Math.min(x + w, vd_i.vd_D.clip[2]);
    var top = Math.max(y, vd_i.vd_D.clip[1]);
    var bottom = Math.min(y + h, vd_i.vd_D.clip[3]);
    var r = vd_i.vd_bw[0];
    var g = vd_i.vd_bw[1];
    var b = vd_i.vd_bw[2];
    var a = vd_i.Alpha;
    var pos = 0,
      i = 0;
    if (top >= vd_i.vd_D.clip[1] && top <= vd_i.vd_D.clip[3]) {
      pos = (top * vd_i.vd_aK + left) * 4;
      for (i = left; i <= right; i++) {
        vd_K[pos++] = r;
        vd_K[pos++] = g;
        vd_K[pos++] = b;
        vd_K[pos++] = a;
      }
    }
    if (bottom >= vd_i.vd_D.clip[1] && bottom <= vd_i.vd_D.clip[3]) {
      pos = (bottom * vd_i.vd_aK + left) * 4;
      for (i = left; i <= right; i++) {
        vd_K[pos++] = r;
        vd_K[pos++] = g;
        vd_K[pos++] = b;
        vd_K[pos++] = a;
      }
    }
    if (left >= vd_i.vd_D.clip[0] && left <= vd_i.vd_D.clip[2]) {
      pos = (top * vd_i.vd_aK + left) * 4;
      for (i = top; i <= bottom; i++) {
        vd_K[pos++] = r;
        vd_K[pos++] = g;
        vd_K[pos++] = b;
        vd_K[pos++] = a;
        pos += vd_i.vd_aK * 4 - 4;
      }
    }
    if (right >= vd_i.vd_D.clip[0] && right <= vd_i.vd_D.clip[2]) {
      pos = (top * vd_i.vd_aK + right) * 4;
      for (i = top; i <= bottom; i++) {
        vd_K[pos++] = r;
        vd_K[pos++] = g;
        vd_K[pos++] = b;
        vd_K[pos++] = a;
        pos += vd_i.vd_aK * 4 - 4;
      }
    }
  };
  function vd_zH(vd_Of) {
    if (!vd_i.vd_D.vdraw || !vd_i.vd_eR || !vd_i.vd_D.vd_be) return;
    if (vd_i.vd_D.vd_cF.length === 0) return;
    var fig = vd_i.vd_D.vd_cF[0];
    var vd_vm = vd_fr[vd_Of];
    if (
      vd_i.vd_D.vdraw.IgnoreLockLayers === true ||
      !fig.LayerRef ||
      !fig.LayerRef.Lock
    ) {
      var arr = vd_vm[1];
      if (!arr) {
        arr = [];
        vd_vm[1] = arr;
      }
      var len = arr.length;
      if (len === 0 || arr[len - 1] !== fig) arr[len] = fig;
    }
    if (vd_i.vd_D.vd_aH !== undefined) {
      vd_vm[2] = [vd_Ku(vd_i.vd_D.vd_cF), vd_i.vd_D.vd_aH];
    }
  }
  function vd_Ku(base) {
    var vd_FI = [];
    var i;
    var len = base.length;
    for (i = 0; i < len; i++) {
      vd_FI[i] = base[i];
    }
    return vd_FI;
  }
  this.vd_xJ = false;
  var vd_mg = -1;
  function vd_Om() {
    vd_mg = 0;
  }
  function vd_GN() {
    vd_mg = -1;
  }
  function vd_Gb(x, y) {
    if (vd_mg >= 0) {
      if (vd_mg % 6 > 2) {
        vd_mg++;
        return true;
      }
      vd_mg++;
    } else if (vd_Hc[vd_ab(y % 8) * 8 + vd_ab(x % 8)] == 0) return true;
    return false;
  }
  var Temp = 0,
    vd_mK = 0,
    vd_rq = 0,
    vd_iK = 0,
    vd_df = 0,
    vd_fK = 0;
  var vd_hq = 0,
    vd_ip = 0,
    vd_so = 0,
    vd_gr = 0;
  function vd_Cx(vd_sF, vd_qn, XEnd, YEnd) {
    var i = 0;
    if (vd_qn > YEnd) {
      Temp = vd_qn;
      vd_qn = YEnd;
      YEnd = Temp;
      Temp = vd_sF;
      vd_sF = XEnd;
      XEnd = Temp;
    }
    vd_dv(vd_sF, vd_qn);
    if ((vd_df = XEnd - vd_sF) < 0) {
      vd_Fu(-1);
      vd_df = -vd_df;
    } else {
      vd_Fu(1);
    }
    vd_fK = YEnd - vd_qn;
    vd_Om();
    if (vd_df === 0) {
      for (i = 0; i <= vd_fK; i++) {
        vd_i.vd_bb();
        AdvanceY();
      }
    } else if (vd_fK === 0) {
      for (i = 0; i <= vd_df; i++) {
        vd_i.vd_bb();
        AdvanceX();
      }
    } else if (vd_df === vd_fK) {
      for (i = 0; i <= vd_df; i++) {
        vd_i.vd_bb();
        AdvanceX();
        AdvanceY();
      }
    } else if (vd_df >= vd_fK) {
      vd_hq = vdgeo.vd_r(vd_df / vd_fK);
      vd_mK = (vd_df % vd_fK) * 2;
      vd_rq = vd_fK * 2;
      vd_iK = (vd_df % vd_fK) - vd_fK * 2;
      vd_ip = vdgeo.vd_r(vd_hq / 2) + 1;
      vd_so = vd_ip;
      if (vd_mK === 0 && (vd_hq & 0x01) === 0) {
        vd_ip--;
      }
      if ((vd_hq & 0x01) !== 0) {
        vd_iK += vd_fK;
      }
      vd_xe(vd_ip);
      for (i = 0; i < vd_fK - 1; i++) {
        vd_gr = vd_hq;
        if ((vd_iK += vd_mK) > 0) {
          vd_gr++;
          vd_iK -= vd_rq;
        }
        vd_xe(vd_gr);
      }
      vd_xe(vd_so);
    } else {
      vd_hq = vdgeo.vd_r(vd_fK / vd_df);
      vd_mK = (vd_fK % vd_df) * 2;
      vd_rq = vd_df * 2;
      vd_iK = (vd_fK % vd_df) - vd_df * 2;
      vd_ip = vdgeo.vd_r(vd_hq / 2) + 1;
      vd_so = vd_ip;
      if (vd_mK === 0 && (vd_hq & 0x01) === 0) {
        vd_ip--;
      }
      if ((vd_hq & 0x01) !== 0) {
        vd_iK += vd_df;
      }
      vd_yh(vd_ip);
      for (i = 0; i < vd_df - 1; i++) {
        vd_gr = vd_hq;
        if ((vd_iK += vd_mK) > 0) {
          vd_gr++;
          vd_iK -= vd_rq;
        }
        vd_yh(vd_gr);
      }
      vd_yh(vd_so);
    }
    vd_GN();
  }
  function vd_Cn(cx, cy, w, h) {
    var a = w >> 1,
      b = h >> 1,
      wod = w & 1,
      hod = h & 1,
      x = 0,
      y = b,
      oy = b,
      aa2 = (a * a) << 1,
      aa4 = aa2 << 1,
      bb2 = (b * b) << 1,
      bb4 = bb2 << 1,
      st = (aa2 >> 1) * (1 - (b << 1)) + bb2,
      tt = (bb2 >> 1) - aa2 * ((b << 1) - 1),
      xl,
      dw,
      dh;
    if (w != 0)
      while (y > 0) {
        if (st < 0) {
          st += bb2 * ((x << 1) + 3);
          tt += bb4 * ++x;
        } else if (tt < 0) {
          st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
          xl = cx - x;
          dw = (x << 1) + wod;
          tt += bb4 * ++x - aa2 * ((y-- << 1) - 3);
          dh = oy - y;
          vd_tT(xl, cy - oy, dw, dh);
          vd_tT(xl, cy + y + hod, dw, dh);
          oy = y;
        } else {
          tt -= aa2 * ((y << 1) - 3);
          st -= aa4 * --y;
        }
      }
    vd_tT(cx - a, cy - oy, w, (oy << 1) + hod);
  }
  var vd_lS = [
    vdgeo.newpoint(0, 0, 0),
    vdgeo.newpoint(0, 0, 0),
    vdgeo.newpoint(0, 0, 0),
    vdgeo.newpoint(0, 0, 0),
  ];
  function vd_BC(x1, y1, x2, y2, z1, z2) {
    if (vd_i.penwidth < 2) {
      vd_Cx(x1, y1, x2, y2);
      return;
    } else {
      var ww2 = vd_i.penwidth / 2.0;
      var a = Math.atan2(y2 - y1, x2 - x1);
      var vd_cB = Math.cos(a + vdgeo.HALF_PI);
      var sine = Math.sin(a + vdgeo.HALF_PI);
      vdgeo.vd_nr(vd_lS[0], vd_cB * ww2 + x1, sine * ww2 + y1, z1);
      vdgeo.vd_nr(vd_lS[1], vd_cB * ww2 + x2, sine * ww2 + y2, z2);
      vdgeo.vd_nr(vd_lS[2], vd_cB * -ww2 + x2, sine * -ww2 + y2, z2);
      vdgeo.vd_nr(vd_lS[3], vd_cB * -ww2 + x1, sine * -ww2 + y1, z1);
      if (vd_i.vd_D.vd_bd || vd_i.vd_D.vd_dJ) vd_i.vd_lr(vd_lS, true);
      else vd_i.vd_fF(vd_lS);
      vd_pC = z1;
      vd_Cn(x1, y1, vd_i.penwidth, vd_i.penwidth);
      vd_pC = z2;
      vd_Cn(x2, y2, vd_i.penwidth, vd_i.penwidth);
      vd_pC = undefined;
    }
  }
  function vd_tT(x, y, width, height) {
    if (y > vd_i.vd_D.clip[3]) return;
    if (x > vd_i.vd_D.clip[2]) return;
    if (y < vd_i.vd_D.clip[1]) {
      height += y - vd_i.vd_D.clip[1];
      y = vd_i.vd_D.clip[1];
    }
    if (x < vd_i.vd_D.clip[0]) {
      width += x - vd_i.vd_D.clip[0];
      x = vd_i.vd_D.clip[0];
    }
    if (height < 0) return;
    if (width < 0) return;
    if (x + width > vd_i.vd_D.clip[2]) width -= x + width - vd_i.vd_D.clip[2];
    if (y + height > vd_i.vd_D.clip[3])
      height -= y + height - vd_i.vd_D.clip[3];
    for (var h = 0; h < height; h++) {
      vd_i.vd_qy(x, y + h, width);
    }
  }
  this.ctx = vd_vf;
  var vd_jI = null;
  function vd_Bu(vd_hS, vd_zP) {
    var len = vd_zP.data.length;
    var i;
    for (i = 0; i < len; i++) vd_zP.data[i] = vd_hS.data[i];
  }
  function vd_yr(vd_PS, vd_hS) {
    if (!vd_hS) vd_hS = vd_au;
    var vd_lO = vd_PS;
    if (!vd_lO || vd_lO.width != vd_hS.width || vd_lO.height != vd_hS.height) {
      vd_lO = vd_i.ctx.createImageData(vd_hS.width, vd_hS.height);
    }
    vd_Bu(vd_hS, vd_lO);
    return vd_lO;
  }
  this.vd_yY = function () {
    return vd_jB;
  };
  var vd_jB = false;
  this.vd_rr = function (vd_Kp) {
    var ret = vd_jB;
    if (!vd_i.ctx) return ret;
    if (vd_Kp) {
      if (vd_jB) return ret;
      vd_jB = true;
      vd_jI = vd_au;
      vd_au = vd_yr();
      vd_K = vd_au.data;
      vd_i.vd_D.vd_dC();
    } else {
      if (!vd_jB) return ret;
      vd_jB = false;
      vd_au = vd_jI;
      if (!vd_au) vd_K = null;
      else vd_K = vd_au.data;
      vd_jI = null;
      vd_i.vd_D.vd_dC();
    }
    return ret;
  };
  this.vd_Kx = function () {
    if (!vd_i.ctx) return;
    if (!vd_jB) return;
    vd_i.ctx.putImageData(vd_jI, 0, 0);
    vd_Bu(vd_jI, vd_au);
    vd_K = vd_au.data;
  };
  this.vd_Ei = function () {
    if (!vd_i.ctx) return;
    vd_jI = vd_i.ctx.getImageData(0, 0, vd_i.vd_aK, vd_i.vd_as);
    vd_au = vd_jI;
    vd_K = vd_au.data;
  };
  this.ActionDrawEntities = function (entities, vd_xR) {
    if (!vd_i.vd_D.vdraw || !vd_i.ctx) return;
    if (!entities || entities.length == 0) {
      vd_i.Refresh();
    } else {
      var vd_qP = vd_i.vd_D.vd_bd;
      var vd_qs = vd_i.vd_eR;
      vd_i.vd_D.vd_bd = false;
      vd_i.vd_eR = false;
      vd_i.vd_D.vd_dC();
      var vd_vt = vd_au;
      vd_au = vd_yr();
      vd_K = vd_au.data;
      try {
        for (var i = 0; i < entities.length; i++) {
          vd_i.vd_D.vdraw.DrawEntity(entities[i], vd_i.vd_D);
        }
      } catch (ex) {}
      vd_i.ctx.putImageData(vd_au, 0, 0);
      if (!vd_xR) {
        vd_au = vd_vt;
        if (!vd_au) vd_K = null;
        else vd_K = vd_au.data;
      }
      vd_i.vd_D.vd_bd = vd_qP;
      vd_i.vd_eR = vd_qs;
      vd_i.vd_D.vd_dC();
    }
  };
  this.vd_LK = function () {
    if (!vd_i.vd_D.vdraw) return;
    var vd_qP = vd_i.vd_D.vd_bd;
    var vd_qs = vd_i.vd_eR;
    vd_i.vd_D.vd_bd = false;
    vd_i.vd_eR = false;
    var vd_oG = vd_i.vd_D.vdraw.vd_gh;
    vd_i.vd_D.vdraw.vd_gh = false;
    vd_i.vd_D.vd_dC();
    vd_i.vd_D.vdraw.vd_qC(vd_i.vd_D);
    vd_i.vd_D.vd_bd = vd_qP;
    vd_i.vd_eR = vd_qs;
    vd_i.vd_D.vdraw.vd_gh = vd_oG;
    vd_i.vd_D.vd_dC();
  };
  this.vd_IX = function () {
    if (!vd_i.vd_D.vdraw) return;
    var vd_rF = vd_i.vd_D.vdraw.viewcube.draw(vd_i.vd_D);
    if (vd_rF) {
      vd_i.ctx.putImageData(vd_au, 0, 0);
      vd_i.ctx.drawImage(
        vd_rF[0],
        0,
        0,
        vd_i.vd_aK,
        vd_i.vd_as,
        vd_rF[1][0],
        vd_rF[1][1],
        vd_i.vd_aK,
        vd_i.vd_as
      );
      vd_i.vd_Ei();
    }
  };
  var vd_tN;
  this.Refresh = function (vd_Qo) {
    if (!vd_i.ctx) return;
    vd_i.ctx.putImageData(vd_au, 0, 0);
    if (!vd_Qo && vd_i.vd_D.vdraw && vd_i.vd_D.vdraw.vd_wR()) {
      var vd_vt = vd_au;
      vd_tN = vd_yr(vd_tN);
      vd_au = vd_tN;
      vd_K = vd_au.data;
      vd_i.vd_LK();
      vd_i.ctx.putImageData(vd_au, 0, 0);
      vd_au = vd_vt;
      if (!vd_au) vd_K = null;
      else vd_K = vd_au.data;
    }
  };
  function vd_KE(x1, y1, x2, y2, z1, z2) {
    vd_Cx(x1, y1, x2, y2);
  }
  var vd_mn = [];
  function vd_Hk(zval, vd_yR, u, v) {
    ipos = py * vd_i.vd_aK + px;
    var pos = ipos * 4;
    var ir, ig, ib, ia;
    ia = 255;
    if (vd_Gb(px, py)) {
      ir = vd_bT[0];
      ig = vd_bT[1];
      ib = vd_bT[2];
    } else {
      if (vd_mn.length === 0) {
        ir = vd_i.vd_bw[0];
        ig = vd_i.vd_bw[1];
        ib = vd_i.vd_bw[2];
      } else {
        ir = vd_mn[0];
        ig = vd_mn[1];
        ib = vd_mn[2];
      }
    }
    vd_K[pos++] = ir;
    vd_K[pos++] = ig;
    vd_K[pos++] = ib;
    vd_K[pos++] = ia;
  }
  function vd_HY(zval, vd_yR, u, v) {
    ipos = py * vd_i.vd_aK + px;
    var pos = ipos * 4;
    vd_K[pos++] = vd_i.vd_bw[0];
    vd_K[pos++] = vd_i.vd_bw[1];
    vd_K[pos++] = vd_i.vd_bw[2];
    vd_K[pos++] = 255;
  }
  this.vd_Lz = function () {
    var ret = vd_i.vd_bb;
    vd_i.vd_bb = vd_xM;
    return ret;
  };
  this.vd_KN = function (vd_Jt) {
    vd_i.vd_bb = vd_Jt;
  };
  this.vd_uF = vd_BC;
  this.vd_bb = vd_xM;
  this.vd_Am = function (vd_Ka, vd_PW) {
    if (vd_Ka) {
      vd_mn = vd_PW;
      if (vd_mn) vd_i.vd_bb = vd_Hk;
      else vd_i.vd_bb = vd_HY;
      vd_i.vd_uF = vd_KE;
    } else {
      vd_i.vd_bb = vd_xM;
      vd_i.vd_uF = vd_BC;
    }
  };
  return this;
}
function vd_ON(vdcanvas) {
  var vd_i = this;
  var render = null;
  this.vd_AC = function (vd_NQ) {
    var ret = render;
    render = vd_NQ;
    return ret;
  };
  vd_yj =
    "precision mediump float;" +
    "varying float vfigprops;" +
    "varying vec4 vTexture;" +
    "uniform sampler2D uSampler;" +
    "uniform int textureprops;" +
    "uniform int vd_mT;" +
    "uniform float section[25]; " +
    "uniform vec4 vd_bT;" +
    "uniform int vd_jl;" +
    "vec4 color;" +
    "varying vec4 vColor;" +
    "varying vec4 vpos;" +
    "float x,y,z,s,gcol;" +
    "void main(void) {" +
    "if (vd_jl != 3){" +
    "if (vd_jl == 1 && vColor.a < 0.999) discard;" +
    "if (vd_jl == 2 && vColor.a > 0.999) discard;" +
    "}" +
    "color = vColor;" +
    "x = vpos.x  / vpos.w;" +
    "y = vpos.y / vpos.w;" +
    "z = vpos.z / vpos.w;" +
    "for(int i = 0 ; i < 5; i++){" +
    "if(section[i*5+4] != 0.0)" +
    "{" +
    "s = section[i*5+0] * x + section[i*5+1] * y + section[i*5+2] * z + section[i*5+3];" +
    "if(s < 0.0) discard;" +
    "}" +
    "else" +
    "{" +
    "break;" +
    "}" +
    "}" +
    "if(textureprops == 1){" +
    "x = vTexture[0];" +
    "y = vTexture[1];" +
    "z = vTexture[2] ;" +
    "if (z == 0.0) z = 1.0;" +
    "x = mod(x / z , 1.0);" +
    "y = mod(y / z , 1.0);" +
    "color =  texture2D(uSampler, vec2(x,y))* color;" +
    "}" +
    "if(vfigprops == 1.0 ){" +
    "x = mod(floor(gl_FragCoord.x), 8.0);" +
    "y = mod(floor(gl_FragCoord.y), 8.0);" +
    "if(x == y || x == (7.0 - y)){" +
    "        color  = vd_bT;" +
    "}" +
    "}" +
    "if(vd_mT == 1){" +
    "gcol = (color[0] + color[1] + color[2]) / 3.0;" +
    "color = vec4(gcol,gcol,gcol,color[3]);" +
    "}" +
    "gl_FragColor = color;" +
    "}";
  vd_yG =
    "attribute float figprops;" +
    "varying float vfigprops;" +
    "attribute vec4 aVertexTexture;" +
    "varying vec4 vTexture;" +
    "attribute vec4 ppos;" +
    "attribute vec4 aVertexColor;" +
    "varying vec4 vColor;" +
    "varying vec4 vpos;" +
    "void main(void) {" +
    "gl_PointSize = 1.0;" +
    "gl_Position = ppos;" +
    "vpos = ppos;" +
    "vColor = aVertexColor;" +
    "vTexture = aVertexTexture;" +
    "vfigprops = figprops;" +
    "}";
  vd_GK =
    "precision mediump float;" +
    "varying vec4 vColor;" +
    "varying vec4 vpos;" +
    "uniform float section[25]; " +
    "float x,y,z,s,a,b,b1,b2,z01;" +
    "void main(void) {" +
    "x = vpos.x;" +
    "y = vpos.y;" +
    "z = vpos.z;" +
    "if(vpos.w != 0.0 ){" +
    "z /= vpos.w;" +
    "x /= vpos.w;" +
    "y /= vpos.w;" +
    "}" +
    "for(int i = 0 ; i < 5; i++){" +
    "if(section[i*5+4] != 0.0)" +
    "{" +
    "s = section[i*5+0] * x + section[i*5+1] * y + section[i*5+2] * z + section[i*5+3];" +
    "if(s < 0.0) discard;" +
    "}" +
    "else" +
    "{" +
    "break;" +
    "}" +
    "}" +
    "z01 = ((1.0 + z) * 0.5);" +
    "a = floor( 65535.0 * z01  );" +
    "b = mod(a,256.0);b1=b/255.0;" +
    "a = (a-b) / 256.0;b = mod(a,256.0);b2=b/255.0;" +
    "gl_FragColor = vec4(b1,b2,vColor[0],vColor[1]);" +
    "}";
  vd_GR =
    "attribute vec4 aVertexColor;" +
    "varying vec4 vColor;" +
    "varying vec4 vpos;" +
    "attribute vec4 ppos;" +
    "void main(void) {" +
    "gl_PointSize = 1.0;" +
    "gl_Position = ppos;" +
    "vpos = ppos;" +
    "vColor = aVertexColor;" +
    "}";
  var vd_y = {
    vd_yj: vd_GK,
    vd_yG: vd_GR,
    gl: null,
    vd_cE: null,
    vd_aD: null,
    vd_le: null,
    vd_gL: null,
    vd_kw: null,
    vd_go: null,
    section: null,
    vd_jE: null,
    vd_kX: [0, 0],
  };
  this.vd_MS = function (fig, index) {
    if (index === undefined) return;
    if (!vd_jw()) return;
    vd_pU = fig && (fig.selected || fig.HighLight) ? 1 : 0;
    var a,
      b,
      v1 = 0,
      v2 = 0;
    if (index < 65535) {
      a = index + 1;
      b = a % 256.0;
      v1 = b / 255.0;
      a = (a - b) / 256.0;
      b = a % 256.0;
      v2 = b / 255.0;
    }
    vd_y.vd_kX = [v1, v2];
  };
  function vd_jw() {
    return render.vd_be;
  }
  function vd_JX() {
    var w = render.vd_c.vd_aK;
    var h = render.vd_c.vd_as;
    vd_y.vd_cE = document.createElement("CANVAS");
    vd_y.vd_cE.setAttribute("width", w);
    vd_y.vd_cE.setAttribute("height", h);
    vd_y.vd_jE = new Uint8Array(w * h * 4);
    vd_y.gl = vd_Bx(vd_y.vd_cE, { antialias: false });
    var vd_wF = vd_y.gl.createShader(vd_y.gl.FRAGMENT_SHADER);
    vd_y.gl.shaderSource(vd_wF, vd_y.vd_yj);
    vd_y.gl.compileShader(vd_wF);
    var vd_vr = vd_y.gl.createShader(vd_y.gl.VERTEX_SHADER);
    vd_y.gl.shaderSource(vd_vr, vd_y.vd_yG);
    vd_y.gl.compileShader(vd_vr);
    vd_y.vd_aD = vd_y.gl.createProgram();
    vd_y.gl.attachShader(vd_y.vd_aD, vd_wF);
    vd_y.gl.attachShader(vd_y.vd_aD, vd_vr);
    vd_y.gl.linkProgram(vd_y.vd_aD);
    vd_y.gl.validateProgram(vd_y.vd_aD);
    vd_y.gl.useProgram(vd_y.vd_aD);
    if (!vd_y.gl.getProgramParameter(vd_y.vd_aD, vd_y.gl.VALIDATE_STATUS)) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "Error during vd_aD validation:\n" +
          vd_y.gl.getProgramInfoLog(vd_y.vd_aD)
      );
    }
    vd_y.vd_le = vd_y.gl.getAttribLocation(vd_y.vd_aD, "ppos");
    vd_y.gl.enableVertexAttribArray(vd_y.vd_le);
    vd_y.vd_kw = vd_y.gl.getAttribLocation(vd_y.vd_aD, "aVertexColor");
    vd_y.gl.enableVertexAttribArray(vd_y.vd_kw);
    vd_y.section = vd_y.gl.getUniformLocation(vd_y.vd_aD, "section");
  }
  function vd_Jv(vd_h) {
    if (!vd_jw()) return;
    var vd_b = vd_i.vd_FD;
    if (vd_bl === 0) {
      vd_b[vd_h + 4] = vd_b[vd_h + 8] = vd_b[vd_h] = vd_y.vd_kX[0];
      vd_b[vd_h + 5] = vd_b[vd_h + 9] = vd_b[vd_h + 1] = vd_y.vd_kX[1];
      vd_b[vd_h + 6] = vd_b[vd_h + 10] = vd_b[vd_h + 2] = 1;
      vd_b[vd_h + 7] = vd_b[vd_h + 11] = vd_b[vd_h + 3] = 1;
    } else if (vd_bl === 1) {
      vd_b[vd_h + 4] = vd_b[vd_h] = vd_y.vd_kX[0];
      vd_b[vd_h + 5] = vd_b[vd_h + 1] = vd_y.vd_kX[1];
      vd_b[vd_h + 6] = vd_b[vd_h + 2] = 1;
      vd_b[vd_h + 7] = vd_b[vd_h + 3] = 1;
    } else {
      vd_b[vd_h] = vd_y.vd_kX[0];
      vd_b[vd_h + 1] = vd_y.vd_kX[1];
      vd_b[vd_h + 2] = 1;
      vd_b[vd_h + 3] = 1;
    }
  }
  function vd_Kz() {
    if (!vd_jw()) return;
    var w = render.vd_c.vd_aK;
    var h = render.vd_c.vd_as;
    if (vd_y.vd_cE.width < w || vd_y.vd_cE.height < h) {
      vd_y.vd_jE = new Uint8Array(w * h * 4);
      vd_y.vd_cE.setAttribute("width", w);
      vd_y.vd_cE.setAttribute("height", h);
    }
    vd_y.gl.enable(vd_y.gl.DEPTH_TEST);
    vd_y.gl.depthFunc(vd_y.gl.LEQUAL);
    vd_y.gl.viewport(render.vd_dL, render.vd_fz, render.width, render.height);
    vd_y.gl.disable(vd_y.gl.BLEND);
  }
  function vd_Jy(sec) {
    if (!vd_jw()) return;
    vd_y.gl.uniform1fv(vd_y.section, sec);
  }
  function vd_IH() {
    if (!vd_jw()) return;
    vd_y.gl.clearDepth(1.0);
    vd_y.gl.clearColor(1.0, 1.0, 1.0, 1.0);
    vd_y.gl.clear(vd_y.gl.COLOR_BUFFER_BIT | vd_y.gl.DEPTH_BUFFER_BIT);
  }
  function vd_Ke() {
    if (!vd_jw()) return;
    vd_y.gl.flush();
    var w1 = render.vd_c.vd_aK;
    var h1 = render.vd_c.vd_as;
    vd_y.gl.readPixels(
      0,
      0,
      w1,
      h1,
      vd_y.gl.RGBA,
      vd_y.gl.UNSIGNED_BYTE,
      vd_y.vd_jE
    );
    var vd_By = render.vd_c.vd_np();
    var k = 0,
      i = 0;
    var length = vd_y.vd_jE.length;
    for (i = 0; i < length; i += 4) {
      vd_By[k++][0] =
        2.0 * ((vd_y.vd_jE[i] | (vd_y.vd_jE[i + 1] << 8)) / 65535.0) - 1.0;
    }
    var layout = vdcanvas.GetActiveLayout();
    if (layout) {
      var elen = layout.Entities.Items.length;
      k = 0;
      length = vd_y.vd_jE.length;
      for (i = 0; i < length; i += 4, k++) {
        var index = vd_y.vd_jE[i + 2] | (vd_y.vd_jE[i + 3] << 8);
        if (index > 0 && index <= elen)
          vd_By[k][1] = [
            vdcanvas.GetEntityItem(layout.Entities.Items[index - 1]),
          ];
      }
    }
  }
  var gl = null;
  var vd_cE = null;
  var vd_or = false;
  var vd_aD = null;
  var vd_vY = vdgeo.vd_Q();
  var vd_gy = vdgeo.vd_Q();
  var vd_fi = 0;
  var vd_bl = 0;
  var vd_gw = 0;
  var vd_fI = 0;
  var vd_ig = 0;
  var vd_le = null;
  var vd_gL = null;
  var vd_kw = null;
  var vd_go = null;
  var vd_hB = null;
  Object.defineProperty(vd_i, "vd_xa", {
    get: function () {
      return vd_hB[vd_bl][0];
    },
  });
  Object.defineProperty(vd_i, "vd_DG", {
    get: function () {
      return vd_hB[vd_bl][1];
    },
  });
  Object.defineProperty(vd_i, "vd_Gw", {
    get: function () {
      return vd_hB[vd_bl][2];
    },
  });
  Object.defineProperty(vd_i, "vd_DH", {
    get: function () {
      return vd_hB[vd_bl][3];
    },
  });
  Object.defineProperty(vd_i, "vd_FD", {
    get: function () {
      return vd_hB[vd_bl][4];
    },
  });
  function vd_CG() {
    var size = 12 * vdcanvas.vd_DN();
    if (vd_hB === null || vd_hB[0][0].length != size) {
      vd_hB = [];
      vd_hB.push([
        new Float32Array(size),
        new Float32Array(size),
        new Float32Array(size),
        new Float32Array(size),
        new Float32Array(size),
      ]);
      vd_hB.push([
        new Float32Array(size),
        new Float32Array(size),
        new Float32Array(size),
        new Float32Array(size),
        new Float32Array(size),
      ]);
      vd_hB.push([
        new Float32Array(size),
        new Float32Array(size),
        new Float32Array(size),
        new Float32Array(size),
        new Float32Array(size),
      ]);
      if (vd_gL) gl.deleteBuffer(vd_gL);
      if (vd_go) gl.deleteBuffer(vd_go);
      if (vd_pc) gl.deleteBuffer(vd_pc);
      if (vd_pH) gl.deleteBuffer(vd_pH);
      if (vd_y.vd_gL) vd_y.gl.deleteBuffer(vd_y.vd_gL);
      if (vd_y.vd_go) vd_y.gl.deleteBuffer(vd_y.vd_go);
      vd_gL = gl.createBuffer();
      vd_go = gl.createBuffer();
      vd_pc = gl.createBuffer();
      vd_pH = gl.createBuffer();
      vd_y.vd_gL = vd_y.gl.createBuffer();
      vd_y.vd_go = vd_y.gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vd_gL);
      gl.vertexAttribPointer(vd_le, 4, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, vd_go);
      gl.vertexAttribPointer(vd_kw, 4, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, vd_pc);
      gl.vertexAttribPointer(vd_xi, 4, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, vd_pH);
      gl.vertexAttribPointer(vd_xC, 1, gl.FLOAT, false, 0, 0);
      if (vd_jw()) {
        vd_y.gl.bindBuffer(vd_y.gl.ARRAY_BUFFER, vd_y.vd_gL);
        vd_y.gl.vertexAttribPointer(vd_y.vd_le, 4, gl.FLOAT, false, 0, 0);
        vd_y.gl.bindBuffer(vd_y.gl.ARRAY_BUFFER, vd_y.vd_go);
        vd_y.gl.vertexAttribPointer(vd_y.vd_kw, 4, vd_y.gl.FLOAT, false, 0, 0);
      }
    }
    vd_Kh();
    gl.uniform1i(vd_mT, render.vd_no ? 1 : 0);
  }
  var vd_xC = null;
  var vd_pH = null;
  var vd_xT = null;
  var vd_xi = null;
  var vd_pc = null;
  var vd_eA = {};
  var textureprops = null;
  var vd_mT = null;
  var vd_jl = 3;
  var section = null;
  var vd_pU = 0;
  var vd_bT = null;
  var vd_lp = null;
  this.vd_wO = function () {
    return gl != null;
  };
  function vd_OL() {
    var vd_cu = null;
    try {
      var w = render.vd_c.vd_aK;
      var h = render.vd_c.vd_as;
      vd_cu = document.createElement("CANVAS");
      vd_cu.setAttribute("width", w);
      vd_cu.setAttribute("height", h);
      vd_lp = new Uint8Array(w * h * 4);
    } catch (e) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "vd_cU caught in setCanvas: " + e.toString()
      );
    }
    return vd_cu;
  }
  function vd_PL() {
    var vd_hV = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vd_hV, vd_yj);
    gl.compileShader(vd_hV);
    if (!gl.getShaderParameter(vd_hV, gl.COMPILE_STATUS)) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "Error during fragment shader compilation:\n" +
          gl.getShaderInfoLog(vd_hV)
      );
      gl = null;
      return null;
    }
    return vd_hV;
  }
  function vd_PG() {
    var vd_hN = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vd_hN, vd_yG);
    gl.compileShader(vd_hN);
    if (!gl.getShaderParameter(vd_hN, gl.COMPILE_STATUS)) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "Error during vd_I shader compilation:\n" + gl.getShaderInfoLog(vd_hN)
      );
      gl = null;
      return null;
    }
    return vd_hN;
  }
  function vd_Pi(_gl, vd_Ox, vd_Ih) {
    vd_aD = _gl.createProgram();
    _gl.attachShader(vd_aD, vd_Ox);
    _gl.attachShader(vd_aD, vd_Ih);
    _gl.linkProgram(vd_aD);
    if (!_gl.getProgramParameter(vd_aD, _gl.LINK_STATUS)) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "Error during vd_aD linking:\n" + _gl.getProgramInfoLog(vd_aD)
      );
      _gl = null;
      return false;
    }
    _gl.validateProgram(vd_aD);
    if (!_gl.getProgramParameter(vd_aD, _gl.VALIDATE_STATUS)) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "Error during vd_aD validation:\n" + _gl.getProgramInfoLog(vd_aD)
      );
      _gl = null;
      return false;
    }
    _gl.useProgram(vd_aD);
    return true;
  }
  function vd_rg(vd_Hv) {
    var attribute = gl.getAttribLocation(vd_aD, vd_Hv);
    if (attribute == -1) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "Error during attribute address retrieval"
      );
      gl = null;
      return attribute;
    }
    gl.enableVertexAttribArray(attribute);
    return attribute;
  }
  function vd_Bx(vd_yv, arguments) {
    if (!vd_yv) return null;
    var _gl;
    try {
      _gl =
        vd_yv.getContext("webgl", arguments) ||
        vd_yv.getContext("experimental-webgl", arguments);
    } catch (e) {
      _gl = null;
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "vd_cU caught in getContext: " + e.toString()
      );
      return null;
    }
    if (!_gl) {
      vdcanvas.vd_cI(vdConst.vd_fk, 0, "Unable to create Web GL context");
      return null;
    }
    return _gl;
  }
  this.vd_GM = function (vd_OJ) {
    render = vd_OJ;
    vd_bl = 0;
    vd_gw = 0;
    vd_fI = 0;
    vd_ig = 0;
    if (vd_or) {
      if (gl) {
        vd_CG();
      }
      return;
    }
    vd_or = true;
    vd_cE = vd_OL();
    gl = vd_Bx(vd_cE);
    if (!gl) return;
    var vd_hV = vd_PL();
    if (!vd_hV) return;
    var vd_hN = vd_PG();
    if (!vd_hN) return;
    if (!vd_Pi(gl, vd_hV, vd_hN)) {
      gl = null;
      return;
    }
    vd_le = vd_rg("ppos");
    if (vd_le == -1) {
      gl = null;
      return;
    }
    vd_kw = vd_rg("aVertexColor");
    if (vd_kw == -1) {
      gl = null;
      return;
    }
    vd_xC = vd_rg("figprops");
    if (vd_xC == -1) {
      gl = null;
      return;
    }
    vd_xi = vd_rg("aVertexTexture");
    if (vd_xi == -1) {
      gl = null;
      return;
    }
    vd_xT = gl.getUniformLocation(vd_aD, "uSampler");
    if (vd_xT == -1) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "Error during uniform address retrieval"
      );
      gl = null;
      return;
    }
    textureprops = gl.getUniformLocation(vd_aD, "textureprops");
    if (textureprops == -1) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "Error during uniform address retrieval"
      );
      gl = null;
      return;
    }
    vd_mT = gl.getUniformLocation(vd_aD, "vd_mT");
    if (vd_mT == -1) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "Error during uniform address retrieval"
      );
      gl = null;
      return;
    }
    vd_jl = gl.getUniformLocation(vd_aD, "vd_jl");
    if (vd_jl == -1) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "Error during uniform address retrieval"
      );
      gl = null;
      return;
    }
    section = gl.getUniformLocation(vd_aD, "section");
    if (section == -1) {
      vdcanvas.vd_cI(
        vdConst.vd_fk,
        0,
        "Error during uniform address retrieval"
      );
      gl = null;
      return;
    }
    vd_pU = 0;
    vd_bT = gl.getUniformLocation(vd_aD, "vd_bT");
    vd_JX();
    vd_CG();
  };
  this.vd_pJ = function () {
    if (!vd_or) return;
    if (!gl) return;
    for (vd_M in vd_eA) {
      if (!gl.isTexture(vd_eA[vd_M])) continue;
      gl.deleteTexture(vd_eA[vd_M]);
    }
    vd_eA = {};
  };
  function vd_Kh() {
    if (!vd_or) return;
    if (!gl) return;
    gl.activeTexture(gl.TEXTURE0 + 0);
    gl.uniform1i(vd_xT, 0);
    gl.uniform1i(textureprops, 0);
    if (!vd_eA["h_0"]) {
      vd_eA["h_0"] = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, vd_eA["h_0"]);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([255, 255, 255, 255])
      );
    } else {
      gl.bindTexture(gl.TEXTURE_2D, vd_eA["h_0"]);
    }
  }
  this.vd_Kd = function () {
    if (!vd_or) return;
    if (!gl) return;
    var vd_Ra = vdgeo.vd_Q();
    var sec = [];
    sec.length = 25;
    for (var i = 0; i < 25; i++) sec[i] = 0.0;
    var seci = 0;
    if (render.vd_dJ) {
      for (var i = 0; i < render.vd_dJ.length; i++) {
        var vd_sh = render.vd_dJ[i];
        var mat = vdgeo.vd_bu(vd_gy);
        vdgeo.vd_j(mat, -vd_sh[0][X], -vd_sh[0][Y], -vd_sh[0][Z]);
        vdgeo.vd_hh(mat, vd_sh[1]);
        sec[seci++] = mat[8];
        sec[seci++] = mat[9];
        sec[seci++] = mat[10];
        sec[seci++] = mat[11];
        sec[seci++] = 1.0;
        if (seci == sec.length) break;
      }
    }
    gl.uniform1fv(section, sec);
    vd_Jy(sec);
  };
  this.vd_od = function (mode) {
    if (mode == 2) {
      vd_i.vd_dS(0, true);
      vd_i.vd_dS(1, true);
      vd_i.vd_dS(2, true);
      gl.enable(gl.BLEND);
      gl.blendEquation(gl.FUNC_ADD);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    gl.uniform1i(vd_jl, mode);
  };
  this.vd_dS = function (vd_zz, vd_Fa) {
    if (vd_zz == undefined) vd_zz = vd_bl;
    var vd_Li = vd_bl;
    vd_bl = vd_zz;
    var size = vdcanvas.vd_DN();
    if (vd_Fa) size = 1;
    if (
      (vd_bl === 0 && vd_gw >= size) ||
      (vd_bl === 1 && vd_fI >= size) ||
      (vd_bl === 2 && vd_ig >= size)
    ) {
      var vd_nl = gl.DYNAMIC_DRAW;
      gl.bindBuffer(gl.ARRAY_BUFFER, vd_gL);
      gl.bufferData(gl.ARRAY_BUFFER, vd_i.vd_xa, vd_nl);
      gl.bindBuffer(gl.ARRAY_BUFFER, vd_go);
      gl.bufferData(gl.ARRAY_BUFFER, vd_i.vd_DG, vd_nl);
      gl.bindBuffer(gl.ARRAY_BUFFER, vd_pc);
      gl.bufferData(gl.ARRAY_BUFFER, vd_i.vd_Gw, vd_nl);
      gl.bindBuffer(gl.ARRAY_BUFFER, vd_pH);
      gl.bufferData(gl.ARRAY_BUFFER, vd_i.vd_DH, vd_nl);
      if (vd_jw()) {
        vd_y.gl.bindBuffer(vd_y.gl.ARRAY_BUFFER, vd_y.vd_gL);
        vd_y.gl.bufferData(vd_y.gl.ARRAY_BUFFER, vd_i.vd_xa, vd_nl);
        vd_y.gl.bindBuffer(vd_y.gl.ARRAY_BUFFER, vd_y.vd_go);
        vd_y.gl.bufferData(vd_y.gl.ARRAY_BUFFER, vd_i.vd_FD, vd_nl);
      }
      if (vd_bl === 0) gl.drawArrays(gl.TRIANGLES, 0, vd_gw * 3);
      else {
        gl.uniform1i(textureprops, 0);
        if (vd_bl === 2) gl.drawArrays(gl.vd_LB, 0, vd_ig);
        else gl.drawArrays(gl.LINES, 0, vd_fI * 2);
        if (render.vd_c.vd_fG) gl.uniform1i(textureprops, 1);
      }
      if (vd_jw()) {
        if (vd_bl === 0) vd_y.gl.drawArrays(vd_y.gl.TRIANGLES, 0, vd_gw * 3);
        else {
          if (vd_bl === 2) vd_y.gl.drawArrays(vd_y.gl.vd_LB, 0, vd_ig);
          else vd_y.gl.drawArrays(vd_y.gl.LINES, 0, vd_fI * 2);
        }
      }
      if (vd_bl === 0) vd_gw = 0;
      if (vd_bl === 1) vd_fI = 0;
      if (vd_bl === 2) vd_ig = 0;
    }
    vd_bl = vd_Li;
  };
  this.vd_GP = function () {
    vd_gy = vdgeo.vd_jL(render.vd_Hi(), vd_vY);
  };
  function vd_Ng(mat) {
    return new Array(
      mat[A00],
      mat[A10],
      mat[A20],
      mat[A30],
      mat[A01],
      mat[A11],
      mat[A21],
      mat[A31],
      mat[A02],
      mat[A12],
      mat[A22],
      mat[A32],
      mat[A03],
      mat[A13],
      mat[A23],
      mat[A33]
    );
  }
  this.vd_tV = function () {
    if (!render.vd_bd) {
      gl.disable(gl.DEPTH_TEST);
      gl.depthMask(0);
    } else {
      gl.enable(gl.DEPTH_TEST);
      gl.depthMask(1);
    }
  };
  this.vd_HR = function () {
    vdgeo.vd_gv(vd_vY);
    var w = render.vd_c.vd_aK;
    var h = render.vd_c.vd_as;
    if (vd_cE.width < w || vd_cE.height < h) {
      vd_lp = new Uint8Array(w * h * 4);
      vd_cE.setAttribute("width", w);
      vd_cE.setAttribute("height", h);
    }
    vd_i.vd_tV();
    gl.depthFunc(gl.LEQUAL);
    gl.viewport(render.vd_dL, render.vd_fz, render.width, render.height);
    vdgeo.vd_bf(vd_vY, 1, -1, 1);
    gl.disable(gl.BLEND);
    vd_Kz();
    return true;
  };
  this.vd_HL = function () {
    var vd_dt = render.vd_jP();
    gl.uniform4fv(vd_bT, [
      vd_dt[0] / 255.0,
      vd_dt[1] / 255.0,
      vd_dt[2] / 255.0,
      1.0,
    ]);
    gl.clearColor(vd_dt[0] / 255.0, vd_dt[1] / 255.0, vd_dt[2] / 255.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    vd_IH();
  };
  this.vd_lR = function () {
    if (vd_fi === 0) return;
    vd_i.vd_dS(0, true);
    vd_i.vd_dS(1, true);
    vd_i.vd_dS(2, true);
    gl.flush();
    var i, iy, ix;
    var vd_pN = render.vd_c.vd_nW();
    var w1 = render.vd_c.vd_aK;
    var h1 = render.vd_c.vd_as;
    gl.readPixels(0, 0, w1, h1, gl.RGBA, gl.UNSIGNED_BYTE, vd_lp);
    var left = render.clip[0];
    var top = render.clip[1];
    var right = Math.min(w1 - 1, render.clip[2]);
    var bottom = Math.min(h1 - 1, render.clip[3]);
    var w = right - left + 1;
    var h = bottom - top + 1;
    for (iy = top; iy <= bottom; iy++) {
      for (ix = left; ix <= right; ix++) {
        i = (iy * w1 + ix) * 4;
        vd_pN.data[i] = vd_lp[i];
        i++;
        vd_pN.data[i] = vd_lp[i];
        i++;
        vd_pN.data[i] = vd_lp[i];
        i++;
        vd_pN.data[i] = vd_lp[i];
        i++;
      }
    }
    vd_Ke();
    vd_gw = 0;
    vd_fI = 0;
    vd_ig = 0;
    vd_bl = 0;
    vd_fi = 0;
  };
  this.vd_Hb = function (vd_Sf, vd_kF) {
    if (!vd_kF) {
      gl.bindTexture(gl.TEXTURE_2D, vd_eA["h_0"]);
      gl.uniform1i(textureprops, 0);
    } else {
      var hid = "h_" + vd_kF.HandleId.toString();
      var vd_ct = vd_eA[hid];
      if (!vd_ct) {
        vd_eA[hid] = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, vd_eA[hid]);
        var _w = vd_kF.width;
        var _h = vd_kF.height;
        var vd_Ge = new Uint8Array(_w * _h * 4);
        var index = 0;
        for (var h = 0; h < vd_kF.height; h++) {
          for (var w = 0; w < vd_kF.width * 4; w++) {
            vd_Ge[index] = vd_kF.bytes[h][w];
            index++;
          }
          index = (h + 1) * _w * 4;
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          _w,
          _h,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          vd_Ge
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      } else {
        gl.bindTexture(gl.TEXTURE_2D, vd_ct);
      }
      gl.uniform1i(textureprops, 1);
    }
  };
  function vd_xX(vd_js, vd_bs, pt) {
    vd_js[vd_bs] = pt[X];
    vd_js[vd_bs + 1] = pt[Y];
    vd_js[vd_bs + 2] = pt[Z];
  }
  function vd_tJ(pt, vd_js, vd_bs) {
    vd_js[vd_bs] = pt[X];
    vd_js[vd_bs + 1] = pt[Y];
    vd_js[vd_bs + 2] = pt[Z];
    vd_js[vd_bs + 3] = pt[W];
  }
  function vd_pj(vd_bs, p1, p2, p3) {
    var vd_b = vd_i.vd_xa;
    vd_tJ(p1, vd_b, vd_bs);
    if (p2) vd_tJ(p2, vd_b, vd_bs + 4);
    if (p3) vd_tJ(p3, vd_b, vd_bs + 8);
  }
  function vd_OC(vd_bs, vd_bJ, uv1, uv2, uv3) {
    if (render.vd_cT && render.vd_c.vd_fG) {
      var vd_b = vd_i.vd_Gw;
      vd_xX(vd_b, vd_bs, uv1);
      vd_xX(vd_b, vd_bs + 4, uv2);
      if (uv3) vd_xX(vd_b, vd_bs + 8, uv3);
    }
  }
  function vd_om(vd_h) {
    var vd_b = vd_i.vd_DH;
    vd_b[vd_h] = vd_pU;
    if (vd_bl < 2) vd_b[vd_h + 1] = vd_pU;
    if (vd_bl === 0) vd_b[vd_h + 2] = vd_pU;
  }
  function vd_nZ(vd_h, c1, c2, c3) {
    var vd_b = vd_i.vd_DG;
    var r = 1,
      g = 1,
      b = 1,
      a = 1;
    a = render.vd_c.Alpha / 255.0;
    if (vd_bl === 2) {
      r = render.vd_c.vd_bw[0] / 255.0;
      g = render.vd_c.vd_bw[1] / 255.0;
      b = render.vd_c.vd_bw[2] / 255.0;
      vd_b[vd_h] = r;
      vd_b[vd_h + 1] = g;
      vd_b[vd_h + 2] = b;
      vd_b[vd_h + 3] = a;
    } else if (vd_bl === 1) {
      r = render.vd_c.vd_bw[0] / 255.0;
      g = render.vd_c.vd_bw[1] / 255.0;
      b = render.vd_c.vd_bw[2] / 255.0;
      vd_b[vd_h + 4] = vd_b[vd_h] = r;
      vd_b[vd_h + 5] = vd_b[vd_h + 1] = g;
      vd_b[vd_h + 6] = vd_b[vd_h + 2] = b;
      vd_b[vd_h + 7] = vd_b[vd_h + 3] = a;
    } else {
      if (!render.vd_oo) {
        if (!render.vd_c.vd_fG || !render.vd_cT) {
          r = render.vd_c.vd_bw[0] / 255.0;
          g = render.vd_c.vd_bw[1] / 255.0;
          b = render.vd_c.vd_bw[2] / 255.0;
        }
        if (render.vd_fj) {
          r *= render.vd_c.vd_fW[0];
          g *= render.vd_c.vd_fW[1];
          b *= render.vd_c.vd_fW[2];
        }
        vd_b[vd_h + 4] = vd_b[vd_h + 8] = vd_b[vd_h] = r;
        vd_b[vd_h + 5] = vd_b[vd_h + 9] = vd_b[vd_h + 1] = g;
        vd_b[vd_h + 6] = vd_b[vd_h + 10] = vd_b[vd_h + 2] = b;
        vd_b[vd_h + 7] = vd_b[vd_h + 11] = vd_b[vd_h + 3] = a;
      } else {
        vd_b[vd_h] = c1[0] / 255.0;
        vd_b[vd_h + 1] = c1[1] / 255.0;
        vd_b[vd_h + 2] = c1[2] / 255.0;
        vd_b[vd_h + 3] = a;
        vd_b[vd_h + 4] = c2[0] / 255.0;
        vd_b[vd_h + 5] = c2[1] / 255.0;
        vd_b[vd_h + 6] = c2[2] / 255.0;
        vd_b[vd_h + 7] = a;
        vd_b[vd_h + 8] = c3[0] / 255.0;
        vd_b[vd_h + 9] = c3[1] / 255.0;
        vd_b[vd_h + 10] = c3[2] / 255.0;
        vd_b[vd_h + 11] = a;
      }
    }
    vd_Jv(vd_h);
  }
  var _p1 = [0, 0, 0, 0];
  var _p2 = [0, 0, 0, 0];
  var _p3 = [0, 0, 0, 0];
  var _p4 = [0, 0, 0, 0];
  var uv0 = [0.0, 0.0, 0.0];
  this.vd_qO = function (pts, vd_jq, vd_ob, vd_sk) {
    var rgbm;
    var pt;
    var vd_Ap = render.vd_c.vd_bw;
    var off = vd_ob / render.height;
    for (var i = 0; i < pts.length; i++) {
      pt = pts[i];
      vdgeo.vd_dX(pt[X], pt[Y], pt[Z], vd_gy, _p4);
      if (vd_jq) {
        rgbm = vd_jq[i];
        render.vd_c.vd_bw = [
          (rgbm >> 16) & 0xff,
          (rgbm >> 8) & 0xff,
          rgbm & 0xff,
        ];
      }
      vdgeo.vd_aZ(_p1, _p4);
      vdgeo.vd_aZ(_p2, _p4);
      _p1[X] -= off;
      _p2[X] += off;
      vd_bl = 1;
      var vd_bs = vd_fI * 8;
      vd_pj(vd_bs, _p1, _p2);
      vd_nZ(vd_bs);
      vd_om(vd_fI * 2);
      vd_fI++;
      vd_i.vd_dS();
      vd_fi++;
      vdgeo.vd_aZ(_p1, _p4);
      vdgeo.vd_aZ(_p2, _p4);
      _p1[Y] -= off;
      _p2[Y] += off;
      vd_bl = 1;
      vd_bs = vd_fI * 8;
      vd_pj(vd_bs, _p1, _p2);
      vd_nZ(vd_bs);
      vd_om(vd_fI * 2);
      vd_fI++;
      vd_i.vd_dS();
      vd_fi++;
    }
    render.vd_c.vd_bw = vd_Ap;
  };
  this.vd_iZ = function (p1) {
    vdgeo.vd_dX(p1[X], p1[Y], p1[Z], vd_gy, _p1);
    vd_bl = 2;
    var vd_bs = vd_ig * 4;
    vd_pj(vd_bs, _p1);
    vd_nZ(vd_bs);
    vd_om(vd_ig * 1);
    vd_ig++;
    vd_i.vd_dS();
    vd_fi++;
  };
  this.vd_cP = function (p1, p2) {
    vdgeo.vd_dX(p1[X], p1[Y], p1[Z], vd_gy, _p1);
    vdgeo.vd_dX(p2[X], p2[Y], p2[Z], vd_gy, _p2);
    vd_bl = 1;
    var vd_bs = vd_fI * 8;
    vd_pj(vd_bs, _p1, _p2);
    vd_nZ(vd_bs);
    vd_om(vd_fI * 2);
    vd_fI++;
    vd_i.vd_dS();
    vd_fi++;
  };
  function vd_lZ(p1, p2, p3, vd_bJ, uv1, uv2, uv3) {
    if (render.vd_xj(vd_bJ)) {
      vd_bl = 0;
      var vd_bs = vd_gw * 12;
      vd_pj(vd_bs, p1, p2, p3);
      vd_nZ(vd_bs, uv1, uv2, uv3);
      vd_om(vd_gw * 3);
      vd_OC(vd_bs, vd_bJ, uv1, uv2, uv3);
      vd_gw++;
      vd_i.vd_dS();
      vd_fi++;
    }
  }
  this.vd_kQ = function (
    p1,
    p2,
    p3,
    p4,
    vd_em,
    vd_ec,
    vd_hj,
    vd_hk,
    vd_bJ,
    uv1,
    uv2,
    uv3,
    uv4
  ) {
    vdgeo.vd_dX(p1[X], p1[Y], p1[Z], vd_gy, _p1);
    vdgeo.vd_dX(p2[X], p2[Y], p2[Z], vd_gy, _p2);
    vdgeo.vd_dX(p3[X], p3[Y], p3[Z], vd_gy, _p3);
    vd_lZ(_p1, _p2, _p3, vd_bJ, uv1, uv2, uv3);
    if (p4) {
      vdgeo.vd_dX(p4[X], p4[Y], p4[Z], vd_gy, _p4);
      vd_lZ(_p3, _p4, _p1, vd_bJ, uv3, uv4, uv1);
    }
  };
  this.vd_fH = function (pts, vd_bJ, uvs, vd_ew) {
    if (pts.length > 255 || pts.length < 3) return;
    if (!vd_bJ && pts.length > 2) vd_bJ = vdgeo.vd_JC(pts[0], pts[1], pts[2]);
    if (!vd_bJ) vd_bJ = [0, 0, -1];
    var zorg = pts[0][Z];
    var i = 0;
    var k = 0;
    if (pts.length > 3) {
      var vd_yt = gpc.vd_Cj(gpc.vd_Gk([pts]));
      for (k = 0; k < vd_yt.length; k++) {
        var vd_jj = [];
        vd_jj.length = vd_yt.length;
        var vd_gZ = vd_yt[k];
        for (i = 0; i < vd_gZ.length; i++) {
          var pt = vd_gZ[i];
          pt[Z] = zorg;
          vd_jj[i] = uv0;
          if (render.vd_hF && uvs)
            vd_jj[i] = vdgeo.matrixtransform(render.vd_hF, pt);
          vdgeo.vd_dX(pt[X], pt[Y], pt[Z], vd_gy, pt);
        }
        for (i = 0; i < vd_gZ.length - 2; i++) {
          if (i % 2 == 1) {
            vd_lZ(
              vd_gZ[i + 2],
              vd_gZ[i + 1],
              vd_gZ[i],
              vd_bJ,
              vd_jj[i + 2],
              vd_jj[i + 1],
              vd_jj[i]
            );
          } else {
            vd_lZ(
              vd_gZ[i],
              vd_gZ[i + 1],
              vd_gZ[i + 2],
              vd_bJ,
              vd_jj[i],
              vd_jj[i + 1],
              vd_jj[i + 2]
            );
          }
        }
      }
    } else {
      if (uvs) {
        vd_lZ(pts[0], pts[1], pts[2], vd_bJ, uvs[0], uvs[1], uvs[2]);
      } else {
        vd_lZ(pts[0], pts[1], pts[2], vd_bJ, uv0, uv0, uv0);
      }
    }
  };
  return this;
}
function vd_oA(vd_n, vd_MY, vd_My, vd_rG, vd_sm, vd_vf) {
  var vd_i = this;
  this.vdraw = vd_n;
  this.vd_bY = function () {
    return vdConst.vd_nE;
  };
  this.vd_dL = vd_MY;
  this.vd_fz = vd_My;
  this.width = vd_rG;
  this.height = vd_sm;
  this.vd_m = 10;
  this.vd_X = vdgeo.newpoint(0, 0, 0);
  this.vd_ca = vdgeo.vd_Q();
  this.vd_cC = vdgeo.vd_Q();
  this.vd_pm = vdgeo.vd_Q();
  this.vd_NS = vdgeo.vd_Q();
  this.vd_hr = vdgeo.vd_Q();
  this.vd_qg = null;
  this.pixelsize = 1.0;
  this.vd_BA = 1.0;
  this.GetPixelSize = function () {
    return vd_i.pixelsize;
  };
  this.vd_dk = function () {
    return vd_i.pixelsize / vd_Dc;
  };
  this.vd_c = new vd_KG(this, vd_vf);
  this.palette = null;
  this.vd_jH = 1.0;
  this.RenderMode = vdConst.vd_pt;
  this.vd_bd = true;
  this.vd_PR = 60.0;
  this.vd_bO = false;
  this.vd_cT = true;
  this.vd_be = true;
  this.vd_no = false;
  this.vd_fj = true;
  this.vd_sR = true;
  this.vd_iU = vdgeo.newpoint(0, 0, -1);
  this.vd_eV = 0.25;
  this.vd_Ny = 0.15;
  this.vd_mj = [1, 1, 1];
  this.vd_dJ = null;
  this.vd_qe = function (vd_ly, vd_jW) {
    if (!vd_ly || !vd_jW) return 1.0;
    var size = vd_ly;
    if (size < 0) size /= -100.0;
    var scale = (size * vd_i.pixelsize * (dpi / 25.4)) / vd_jW;
    return scale;
  };
  this.vd_tk = function (vd_ly, mat, vd_jW) {
    if (!vd_ly || !vd_jW) return;
    var scale = vd_i.vd_qe(vd_ly, vd_jW);
    vdgeo.vd_bf(mat, scale, scale, 1.0);
  };
  this.vd_sa = function (from) {
    if (!from) return;
    vd_i.vd_bO = from.vd_bO;
    vd_i.vd_cT = from.vd_cT;
    vd_i.vd_be = from.vd_be;
    vd_i.vd_eV = from.vd_eV;
    vd_i.vd_mj = from.vd_mj;
    vd_i.vd_fj = from.vd_fj;
    vd_i.vd_sR = from.vd_sR;
    vdgeo.vd_aZ(vd_i.vd_iU, from.vd_iU);
    vd_i.vd_dJ = from.vd_dJ;
    vd_i.RenderMode = from.RenderMode;
    vd_i.vd_bd = from.vd_bd;
    vd_i.vd_c.vd_jr = from.vd_c.vd_jr;
    vd_i.vd_no = from.vd_no;
  };
  var vd_Ah = vdgeo.newpoint(0, 0, -1);
  this.vd_AO = function (x, y, z, vd_Pl, vd_gq, r, g, b) {
    vd_i.vd_sR = vd_Pl ? true : false;
    vd_i.vd_fj = true;
    if (vd_gq < 0) {
      vd_i.vd_fj = false;
      vd_i.vd_eV = 0;
    }
    if (vd_gq === 0) vd_i.vd_eV = 0.0;
    else if (vd_gq === 1) vd_i.vd_eV = 0.25;
    else if (vd_gq === 2) vd_i.vd_eV = 0.5;
    else if (vd_gq === 3) vd_i.vd_eV = 0.75;
    else if (vd_gq === 4) vd_i.vd_eV = 1.0;
    else vd_i.vd_eV = 0.25;
    vd_i.vd_eV += vd_i.vd_Ny;
    vd_i.vd_iU[X] = x;
    vd_i.vd_iU[Y] = y;
    vd_i.vd_iU[Z] = z;
    vdgeo.vd_cN(vd_i.vd_iU);
    if (!r && r != 0) r = 255;
    if (!g && g != 0) g = 255;
    if (!b && b != 0) b = 255;
    r = Math.min(Math.max(r, 0), 255);
    g = Math.min(Math.max(g, 0), 255);
    b = Math.min(Math.max(b, 0), 255);
    vd_i.vd_mj = [r / 255, g / 255, b / 255];
  };
  function vd_NE() {
    vd_i.vd_AO(0, 0, -1, true, 1, 255, 255, 255);
  }
  function vd_Mg(vd_hx) {
    vd_NE();
    if (!vd_hx || !vd_hx.Default) return;
    var vd_eX = null;
    if (vd_hx.Default && vd_hx.Default.Enable) vd_eX = vd_hx.Default;
    if (!vd_eX && vd_hx) {
      for (var i = 0; i < vd_hx.length; i++) {
        if (!vd_hx[i].Enable) continue;
        vd_eX = vd_hx[i];
        break;
      }
    }
    if (!vd_eX) {
      vd_i.vd_fj = false;
      return;
    }
    vd_i.vd_AO(
      vd_eX.Direction[X],
      vd_eX.Direction[Y],
      vd_eX.Direction[Z],
      true,
      vd_eX.Intensity,
      vd_eX.color[0],
      vd_eX.color[1],
      vd_eX.color[2]
    );
  }
  this.vd_cF = [];
  this.linetype = null;
  this.vd_ll = 1.0;
  this.vd_aH = undefined;
  var vd_mh = null;
  var ShowHidenEdges = false;
  var vd_dH = [[vdgeo.vd_Q(), vdgeo.vd_Q(), vdgeo.vd_Q()]];
  var vd_dt = [0, 0, 0, 255];
  var vd_fv = [255, 255, 255, 255];
  function vd_Jw(color) {
    return (
      color == undefined ||
      color == null ||
      (color[0] === 0 && color[1] === 0 && color[2] === 0 && color[3] === 0)
    );
  }
  this.vd_jP = function () {
    return vd_dt;
  };
  this.vd_iA = function () {
    return vd_fv;
  };
  this.vd_gQ = function (index) {
    if (index === -1) return vd_dt;
    else if (index === 6) return vd_fv;
    else if (vd_i.palette) return vd_i.palette.Items[index].SystemColor;
  };
  this.vd_yM = function (color) {
    var b = vdgdi.vd_mq(vd_dt);
    var c = vdgdi.vd_mq(color);
    var d = Math.abs(b - c);
    if (d < vdgdi.vd_EY) return vd_fv;
    return color;
  };
  this.vd_iv = function (vd_lb, vd_bT) {
    if (!vd_Jw(vd_bT)) {
      vd_dt = vd_bT;
      var vd_xK = vdgdi.WHITE;
      if (vd_lb) vd_xK = vd_lb.Items[6].SystemColor;
      var vd_wt = vdgdi.vd_mq(vd_dt);
      var vd_JF = vdgdi.vd_mq(vdgdi.WHITE);
      var vd_If = vdgdi.vd_mq(vdgdi.BLACK);
      var vd_Iw = vdgdi.vd_mq(vd_xK);
      var vd_IZ = Math.abs(vd_wt - vd_JF);
      var vd_Iy = Math.abs(vd_wt - vd_If);
      var vd_HJ = Math.abs(vd_wt - vd_Iw);
      if (vd_HJ < vdgdi.vd_EY) {
        vd_fv = vd_IZ > vd_Iy ? vdgdi.WHITE : vdgdi.BLACK;
      } else {
        vd_fv = vd_xK;
      }
    } else {
      if (vd_lb) {
        vd_dt = vd_lb.Background;
        vd_fv = vd_lb.Items[6].SystemColor;
      } else {
        vd_dt = vdgdi.BLACK;
        vd_fv = vdgdi.WHITE;
      }
    }
    vd_i.palette = vd_lb;
    vd_i.vd_bF(vd_fv);
  };
  this.vd_aa = { left: 0, top: 0, right: 0, bottom: 0 };
  this.vd_At = function () {
    return vd_i.vd_m * vd_i.vd_xB();
  };
  this.vd_xB = function () {
    return vd_i.width / vd_i.height;
  };
  this.vd_qD = function () {
    if (vd_i.vd_cF.length === 0) return null;
    return vd_i.vd_cF[vd_i.vd_cF.length - 1];
  };
  this.vd_lg = function (bval) {
    var ret = ShowHidenEdges;
    if (bval == undefined) bval = false;
    ShowHidenEdges = bval;
    return ret;
  };
  this.vd_nD = function (fig, index) {
    if (fig == null) {
      vd_i.vd_cF.pop();
    } else {
      vd_i.vd_cF.push(fig);
    }
    if (vd_i.vd_be && vd_i.vd_bG()) {
      vd_i.vd_aC.vd_MS(fig, index);
    }
  };
  this.vd_xv = function (ltscale) {
    var ret = vd_i.vd_ll;
    vd_i.vd_ll = ltscale;
    return ret;
  };
  this.vd_xW = function (lt) {
    var ret = vd_i.linetype;
    if (lt !== undefined) {
      vd_i.linetype = lt;
    }
    return ret;
  };
  this.vd_aQ = function (vd_oY) {
    var ret = vd_i.vd_c.penwidth;
    if (vd_oY !== undefined) vd_i.vd_c.vd_aQ(vd_oY);
    return ret;
  };
  this.vd_yD = false;
  this.vd_od = function (mode) {
    if (vd_i.vd_bG()) {
      vd_i.vd_aC.vd_od(mode);
    }
    vd_us = mode;
    vd_i.vd_yD = false;
  };
  var vd_us = 3;
  this.vd_bF = function (color) {
    var ret = vd_i.vd_c.vd_bw;
    if (color !== undefined) vd_i.vd_c.vd_bF(color);
    return ret;
  };
  this.vd_gj = function (vd_ct) {
    if (!vd_i.vd_cT) return null;
    var ret = vd_i.vd_c.vd_fG;
    if (ret === vd_ct) return ret;
    vd_i.vd_c.vd_gj(vd_ct);
    if (vd_i.vd_bG()) {
      vd_i.vd_aC.vd_dS(0, true);
      vd_i.vd_aC.vd_Hb(ret, vd_ct);
    }
    return ret;
  };
  this.vd_hF = null;
  this.vd_dV = function (vd_nT) {
    var ret = vd_i.vd_hF;
    if (vd_nT !== 0) vd_i.vd_hF = vd_nT;
    return ret;
  };
  this.vd_zk = function (vd_yP) {
    var ret = vd_i.vd_c.vd_xJ;
    if (vd_yP !== undefined) vd_i.vd_c.vd_xJ = vd_yP;
    return ret;
  };
  var vd_tt = 1.0;
  var vd_Dc = 1.0;
  function vd_Du() {
    vd_tt = vd_Dl(1, 0, 0);
    vd_Dc = vd_Dl(0, 1, 0);
    if (vd_i.vd_bG()) vd_i.vd_aC.vd_GP();
  }
  this.vd_aj = function (mat) {
    var m = vd_i.vd_ar();
    vd_dH.push([null, null, null]);
    vd_i.vd_nP(mat ? vdgeo.vd_jL(mat, m) : mat);
  };
  this.vd_aW = function () {
    vd_dH.pop();
    vd_Du();
  };
  this.vd_ar = function () {
    return vd_dH[vd_dH.length - 1][0];
  };
  this.vd_Hi = function () {
    return vd_dH[vd_dH.length - 1][2];
  };
  this.vd_fp = function () {
    return vd_dH[vd_dH.length - 1][1];
  };
  function vd_MX() {
    var fig = vd_i.vd_qD();
    if (fig == null || fig._t !== vdConst.vdText_code) return 1.0;
    return fig.Height / fig.StyleRef.FontFileVDS.Ascent;
  }
  var vd_sS = vdgeo.newpoint(0, 0, 1);
  function vd_EO() {
    vd_i.vd_c.vd_fW = [1.0, 1.0, 1.0];
  }
  this.vd_xj = function (normal) {
    if (vd_i.vd_bd && vd_i.RenderMode === vdConst.vd_pt) {
      if (!normal) vd_sS = vdgeo.vd_gn(vd_i.vd_ar());
      else
        vdgeo.vd_oH(vd_i.vd_ar(), normal[X], normal[Y], normal[Z], vd_sS, true);
      if (
        !vd_i.vd_bO &&
        vdgeo.AreEqual(vd_sS[Z], 0.0, vdgeo.DefaultVectorEquality)
      )
        return false;
      if (vd_i.vd_bO || (vd_i.vd_fj && vd_Ah[Z] < 0)) {
        var vd_vg = Math.abs(vdgeo.vd_hz(vd_Ah, vd_sS));
        vd_i.vd_c.vd_fW[0] = vd_i.vd_mj[0] * vd_vg + vd_i.vd_eV;
        vd_i.vd_c.vd_fW[1] = vd_i.vd_mj[1] * vd_vg + vd_i.vd_eV;
        vd_i.vd_c.vd_fW[2] = vd_i.vd_mj[2] * vd_vg + vd_i.vd_eV;
      }
    }
    return true;
  };
  this.PushToViewMatrix = function () {
    vd_i.vd_aj(vdgeo.vd_bu(vd_i.vd_ar()));
  };
  this.PopMatrix = function () {
    vd_i.vd_aW();
  };
  this.vd_nP = function (mat) {
    if (!mat) mat = vdgeo.vd_Q();
    vd_dH[vd_dH.length - 1][0] = mat;
    vd_dH[vd_dH.length - 1][1] = vdgeo.vd_jL(mat, vd_i.vd_cC);
    vd_dH[vd_dH.length - 1][2] = vdgeo.vd_jL(mat, vd_i.vd_hr);
    vd_Du();
  };
  this.vd_rP = function (x, y, z) {
    if (z === undefined) z = 1.0;
    var vd_cM = vdgeo.vd_bp(x, y, z, vd_i.vd_ca);
    var vd_eG = vdgeo.vd_bu(vd_i.vd_ar());
    var vd_do = vdgeo.matrixtransform(vd_eG, vd_cM);
    if (!vd_i.vd_bO && vdgeo.AreEqual(z, 1.0, vdgeo.vd_Dg)) {
      var elevation = 0.0;
      var v = vdgeo.vd_gn(vd_eG);
      if (!vdgeo.AreEqual(v[Z], 0.0, vdgeo.DefaultLinearEquality)) {
        var ar1 = (elevation - vd_do[Z]) / v[Z];
        vd_do[X] += ar1 * v[X];
        vd_do[Y] += ar1 * v[Y];
        vd_do[Z] = elevation;
      }
    }
    return vd_do;
  };
  this.clip = [
    vd_i.vd_dL,
    vd_i.vd_fz,
    vd_i.vd_dL + vd_i.width - 1,
    vd_i.vd_fz + vd_i.height - 1,
  ];
  this.vd_Ow = function () {
    vd_i.clip = [
      vd_i.vd_dL,
      vd_i.vd_fz,
      vd_i.vd_dL + vd_i.width - 1,
      vd_i.vd_fz + vd_i.height - 1,
    ];
    vd_i.vd_sf();
  };
  this.vd_xp = function (left, top, right, bottom) {
    vd_i.clip = [
      Math.max(left, vd_i.vd_dL),
      Math.max(top, vd_i.vd_fz),
      Math.min(right, vd_i.vd_dL + vd_i.width - 1),
      Math.min(bottom, vd_i.vd_fz + vd_i.height - 1),
    ];
    vd_i.vd_sf();
  };
  this.vd_sf = function () {
    var vd_bi = vdgeo.newpoint(0, 0, 0);
    var vd_bg = vdgeo.newpoint(0, 0, 0);
    if (vd_i.clip == null)
      vd_i.clip = [
        vd_i.vd_dL,
        vd_i.vd_fz,
        vd_i.vd_dL + vd_i.width - 1,
        vd_i.vd_fz + vd_i.height - 1,
      ];
    if (vd_i.vd_bO) {
      var _ul = vdgeo.vd_bp(vd_i.clip[0], vd_i.clip[1], 1, vd_i.vd_ca);
      var _ur = vdgeo.vd_bp(vd_i.clip[2], vd_i.clip[1], 1, vd_i.vd_ca);
      var _lr = vdgeo.vd_bp(vd_i.clip[2], vd_i.clip[3], 1, vd_i.vd_ca);
      var _ll = vdgeo.vd_bp(vd_i.clip[0], vd_i.clip[3], 1, vd_i.vd_ca);
      vd_i.vd_aa.left = _ll[X];
      vd_i.vd_aa.bottom = _ll[Y];
      vd_i.vd_aa.right = _ur[X];
      vd_i.vd_aa.top = _ur[Y];
    } else {
      vdgeo.vd_Cv(vd_i.vd_ca, vd_i.clip[0], vd_i.clip[3], vd_bi);
      vdgeo.vd_Cv(vd_i.vd_ca, vd_i.clip[2], vd_i.clip[1], vd_bg);
      vd_i.vd_aa.left = vd_bi[X];
      vd_i.vd_aa.bottom = vd_bi[Y];
      vd_i.vd_aa.right = vd_bg[X];
      vd_i.vd_aa.top = vd_bg[Y];
    }
  };
  this.vd_RU = function (x, y) {
    return vdgeo.vd_nB(
      x,
      y,
      vd_i.vd_aa.left,
      vd_i.vd_aa.bottom,
      vd_i.vd_aa.right,
      vd_i.vd_aa.top
    );
  };
  this.vd_GD = function (px, py) {
    return vdgeo.vd_nB(
      px,
      py,
      vd_i.clip[0],
      vd_i.clip[1],
      vd_i.clip[2],
      vd_i.clip[3]
    );
  };
  var vd_cS = vdgeo.newpoint(0, 0, 0);
  var vd_cr = vdgeo.newpoint(0, 0, 0);
  var __P1 = vdgeo.newpoint(0, 0, 0);
  var __P2 = vdgeo.newpoint(0, 0, 0);
  var vd_gX = vdgeo.newpoint(0, 0, 0);
  var vd_cL = vdgeo.newpoint(0, 0, 0);
  this.vd_Fh = function (p1, p2, vd_W, vd_a) {
    if (vd_i.vd_bO) {
      vdgeo.vd_dX(p1[X], p1[Y], p1[Z], vd_i.vd_cC, p1);
      vdgeo.vd_dX(p2[X], p2[Y], p2[Z], vd_i.vd_cC, p2);
      var ret = vd_xz(p1, p2, vd_W, vd_a);
      return ret !== 1;
    } else {
      return (
        vdgeo.vd_Fi(
          vd_i.vd_aa.left,
          vd_i.vd_aa.bottom,
          vd_i.vd_aa.right,
          vd_i.vd_aa.top,
          p1,
          p2,
          vd_W,
          vd_a
        ) !== 1
      );
    }
  };
  function vd_yQ(p1, p2, vd_W, vd_a) {
    return vdgeo.vd_Fi(
      vd_i.clip[0],
      vd_i.clip[1],
      vd_i.clip[2],
      vd_i.clip[3],
      p1,
      p2,
      vd_W,
      vd_a
    );
  }
  function vd_BZ(p1, p2, vd_W, vd_a) {
    return vdgeo.vd_Gm(
      vd_i.clip[0],
      vd_i.clip[1],
      vd_i.clip[2],
      vd_i.clip[3],
      p1,
      p2,
      vd_W,
      vd_a
    );
  }
  function vd_xz(p1, p2, vd_W, vd_a) {
    if (!vdgeo.vd_Kk(p1, p2)) return 1;
    return vdgeo.vd_Gm(
      vd_i.clip[0],
      vd_i.clip[1],
      vd_i.clip[2],
      vd_i.clip[3],
      p1,
      p2,
      vd_W,
      vd_a
    );
  }
  var vd_gU = vd_BZ;
  function vd_wN(pts, uvs, vd_ew) {
    vd_i.vd_c.vd_fF(pts);
  }
  function vd_lr(pts, uvs, vd_ew) {
    vd_i.vd_c.vd_FP(pts, uvs, vd_ew);
  }
  function vd_OY(pts, uvs, vd_ew) {
    var ret = vdgeo.vd_JA(pts, uvs);
    vd_lr(ret[0], ret[1], vd_ew);
  }
  function vd_PF(pts, uvs, vd_on) {
    vd_i.vd_c.vd_lC(pts);
  }
  function vd_qL(pts, uvs, vd_on) {
    vd_i.vd_c.vd_Fn(pts, uvs, vd_on);
  }
  function vd_Gg(x1, y1, x2, y2, z1, z2) {
    vd_i.vd_c.vd_Jr(x1, y1, x2, y2);
  }
  function vd_FR(x1, y1, x2, y2, z1, z2) {
    vd_i.vd_c.vd_Kb(x1, y1, x2, y2, z1, z2);
  }
  var vd_ie = vd_FR;
  function vd_DB() {
    if (vd_us === 3) return true;
    else if (vd_us === 1 && vd_i.vd_c.Alpha === 255) return true;
    else if (vd_us === 2 && vd_i.vd_c.Alpha !== 255) return true;
    vd_i.vd_yD = true;
    return false;
  }
  function vd_wr() {
    return true;
  }
  var vd_fB = vd_DB;
  this.vd_pJ = function () {
    if (vd_i.vd_aC) vd_i.vd_aC.vd_pJ();
  };
  this.destroy = function () {
    vd_i.vd_pJ();
  };
  Object.defineProperty(vd_i, "vd_aC", {
    get: function () {
      if (!vd_i.vdraw) return null;
      return vd_i.vdraw.vd_aC;
    },
  });
  this.vd_bG = function () {
    return (
      vd_n &&
      vd_n.vd_gh &&
      vd_i.vd_aC &&
      !vd_ha &&
      vd_i.RenderMode == vdConst.vd_pt &&
      vd_i.vd_aC.vd_wO()
    );
  };
  this.vd_lR = function () {
    if (!vd_i.vd_bG()) return false;
    vd_i.vd_aC.vd_lR();
    return true;
  };
  function vd_kQ(
    p1,
    p2,
    p3,
    p4,
    vd_em,
    vd_ec,
    vd_hj,
    vd_hk,
    vd_bJ,
    uv1,
    uv2,
    uv3,
    uv4
  ) {
    if (!vd_fB()) return;
    if (vd_i.vd_bG()) {
      vd_i.vd_aC.vd_kQ(
        p1,
        p2,
        p3,
        p4,
        vd_em,
        vd_ec,
        vd_hj,
        vd_hk,
        vd_bJ,
        uv1,
        uv2,
        uv3,
        uv4
      );
      return;
    }
    if (p4) {
      vd_i.vd_fH([p1, p2, p3, p4], vd_bJ, [uv1, uv2, uv3, uv4], true);
    } else {
      vd_i.vd_fH([p1, p2, p3], vd_bJ, [uv1, uv2, uv3], true);
    }
  }
  function vd_rx(
    p1,
    p2,
    p3,
    p4,
    vd_em,
    vd_ec,
    vd_hj,
    vd_hk,
    vd_bJ,
    uv1,
    uv2,
    uv3,
    uv4
  ) {
    if (!vd_fB()) return;
    if (vd_mh !== null) {
      vd_i.vd_aH = vd_mh * 5;
      if (vd_em) vd_dD(p1, p2);
      vd_i.vd_aH++;
      if (vd_ec) vd_dD(p2, p3);
      vd_i.vd_aH++;
      if (vd_hj) vd_dD(p3, p4 ? p4 : p1);
      vd_i.vd_aH++;
      if (vd_hk && p4) vd_dD(p4, p1);
    } else {
      if (vd_em) vd_dD(p1, p2);
      if (vd_ec) vd_dD(p2, p3);
      if (vd_hj) vd_dD(p3, p4 ? p4 : p1);
      if (vd_hk && p4) vd_dD(p4, p1);
    }
    vd_i.vd_aH = undefined;
  }
  var vd_dW = vd_kQ;
  function vd_zD(x, y, z, vd_bn) {
    vdgeo.vd_KI(vd_i.vd_fp(), x, y, z, vd_bn);
  }
  function vd_AT(x, y, z, vd_bn) {
    vdgeo.vd_vG(vd_i.vd_fp(), x, y, z, vd_bn);
  }
  function vd_zJ(x, y, z, vd_bn) {
    vdgeo.vd_dX(x, y, z, vd_i.vd_fp(), vd_bn);
  }
  function vd_lj(vd_I, vd_bn) {
    vd_kN(vd_I[X], vd_I[Y], vd_I[Z], vd_bn);
  }
  function vd_KQ(vd_I) {
    var vd_bn = vdgeo.newpoint(0, 0, 0);
    vd_lj(vd_I, vd_bn);
    return vd_bn;
  }
  function vd_LG(pts) {
    var ret = [];
    ret.length = pts.length;
    for (var i = 0; i < pts.length; i++) {
      ret[i] = vd_KQ(pts[i]);
    }
    return ret;
  }
  var vd_fF = vd_lr;
  var vd_lC = vd_qL;
  var vd_kN = vd_AT;
  this.vd_sC = function () {
    return vd_ha;
  };
  function vd_Ay(pts, closed) {
    var sp = pts[0];
    var ret;
    for (var i = 1; i < pts.length; i++) {
      var ep = pts[i];
      ret = vd_gU(sp, ep, vd_cS, vd_cr);
      if (ret !== 1)
        vd_ie(vd_cS[X], vd_cS[Y], vd_cr[X], vd_cr[Y], vd_cS[Z], vd_cr[Z]);
      sp = ep;
    }
    if (closed) {
      ret = vd_gU(sp, pts[0], vd_cS, vd_cr);
      if (ret === 1) return;
      vd_ie(vd_cS[X], vd_cS[Y], vd_cr[X], vd_cr[Y], vd_cS[Z], vd_cr[Z]);
    }
  }
  function vd_Rc(pts, uvs, vd_ew) {
    vd_Ay(pts, true);
  }
  function vd_PT(pts, uvs, vd_on) {
    for (var i = 0; i < pts.length; i++) {
      vd_Ay(pts[i], true);
    }
  }
  var vd_ha = false;
  this.vd_pd = function (vd_Pz) {
    if (vd_ha) return;
    vd_ha = true;
    if (!vd_i.vd_bO) {
      vd_gU = vd_yQ;
      vd_kN = vd_zD;
    }
    vd_lC = vd_PT;
    vd_ie = vd_Gg;
    vd_fB = vd_wr;
    vd_dW = vd_kQ;
    vd_i.vd_c.vd_Am(true, vd_Pz);
  };
  this.vd_pB = function () {
    if (!vd_ha) return;
    vd_i.vd_c.vd_Am(false);
    vd_ha = false;
    vd_i.vd_dC();
  };
  this.vd_dC = function () {
    if (vd_i.vd_bd || vd_i.vd_dJ) {
      vd_gU = vd_BZ;
      vd_kN = vd_AT;
      vd_fF = vd_lr;
      vd_lC = vd_qL;
      vd_ie = vd_FR;
      vd_fB = vd_i.vd_bd ? vd_DB : vd_wr;
      if (vd_i.vd_bO) {
        vd_kN = vd_zJ;
        vd_gU = vd_xz;
        vd_fF = vd_OY;
      }
    } else {
      if (vd_i.vd_bO) {
        vd_kN = vd_zJ;
        vd_gU = vd_xz;
      } else {
        vd_gU = vd_yQ;
        vd_kN = vd_zD;
      }
      vd_fF = vd_wN;
      vd_lC = vd_PF;
      vd_ie = vd_Gg;
      vd_fB = vd_wr;
    }
    if (vd_i.RenderMode === vdConst.vd_pt) vd_dW = vd_kQ;
    else vd_dW = vd_rx;
    vd_i.vd_c.vd_dC();
  };
  function vd_Mb(vd_iY) {
    vd_i.vd_dJ = null;
    if (!vd_iY || !vd_iY.Items) return;
    var k = 0;
    for (var i = 0; i < vd_iY.Items.length; i++) {
      if (!vd_iY.Items[i].Enable) continue;
      if (k >= vdConst.NUMSECTIONS) break;
      if (!vd_i.vd_dJ) vd_i.vd_dJ = [];
      vd_i.vd_dJ.push([vd_iY.Items[i].OriginPoint, vd_iY.Items[i].Direction]);
      k++;
    }
  }
  this.vd_yb = function (delegate, vd_xV, vd_GX, vd_GC, vd_OV) {
    var width = vd_xV.width;
    var height = vd_xV.height;
    vd_i.vd_dL = 0;
    vd_i.vd_fz = 0;
    vd_i.width = width;
    vd_i.height = height;
    vd_i.vd_xp(0, 0, width, height);
    vd_i.vd_c.vd_gs(vd_xV, width, height);
    vd_i.vd_iv(vd_GC.palette, vd_GC.vd_jP());
    vd_i.update(
      1.0,
      [0, 0, 0],
      vdgeo.vd_Q(),
      null,
      0,
      0,
      false,
      vdConst.RENDERMODE_WIRE_2d,
      [],
      []
    );
    delegate({
      sender: vd_GX,
      render: vd_i,
      display: vd_OV,
      viewrect: vd_i.vd_aa,
      pixelsize: vd_i.pixelsize,
    });
    vd_i.vd_c.vd_gs(null);
  };
  this.update = function (
    vd_ki,
    vd_nk,
    vd_PC,
    vd_wW,
    FocalLength,
    LensAngle,
    vd_Pv,
    vd_ns,
    vd_iY,
    vd_hx
  ) {
    if (vd_ns != -1) {
      vd_i.RenderMode = vdConst.vd_vv;
      vd_i.vd_bd = false;
      vd_i.vd_cT = false;
      if (
        vd_ns &&
        vd_ns > vdConst.RENDERMODE_WIRE_2d &&
        vd_ns < vdConst.vd_Pc
      ) {
        vd_i.vd_bd = true;
        if (vd_ns === vdConst.RENDERMODE_RENDER) vd_i.vd_cT = true;
        if (vd_ns > vdConst.RENDERMODE_WIRE_3d) vd_i.RenderMode = vdConst.vd_pt;
      }
    }
    if (vd_i.vd_aC) vd_i.vd_aC.vd_GM(vd_i);
    if (!vd_ki) vd_ki = 10.0;
    if (!vd_nk) vd_nk = vdgeo.newpoint(0, 0, 0);
    if (!FocalLength) FocalLength = 0.05;
    if (!LensAngle) LensAngle = 60.0;
    vd_Mg(vd_hx);
    vd_Mb(vd_iY);
    var vd_uj = vdgeo.vd_ci(vd_PC);
    vd_i.vd_bO = false;
    vd_i.vd_bO = vd_Pv;
    if (vd_i.vd_bO) vd_i.vd_bd = true;
    vd_i.vd_qg = null;
    var vd_fy = vd_ki * 2.0;
    var zFar = -vd_ki * 2.0;
    if (vd_wW) {
      vd_i.vd_qg = vd_wW;
      var box = vdgeo.vd_rH(vd_uj, vd_wW);
      vd_fy = box[5];
      zFar = box[2];
    }
    var dz = Math.max(1.0, vd_fy - zFar) * 0.01;
    vd_fy += dz;
    zFar -= dz;
    vd_fy *= -1.0;
    zFar *= -1.0;
    vd_i.vd_c.vd_IO(vd_fy, zFar);
    vd_i.vd_m = vd_ki;
    vd_i.pixelsize = vd_i.vd_m / vd_i.height;
    vd_i.pixelsize = Math.max(vdgeo.vd_Dg, vd_i.vd_m / vd_i.height);
    vd_i.pixelsize = Math.min(vdgeo.vd_Lk, vd_i.pixelsize);
    vd_i.vd_m = vd_i.pixelsize * vd_i.height;
    vd_i.vd_X = vdgeo.newpoint(vd_nk[X], vd_nk[Y], vd_nk[Z]);
    vdgeo.vd_gv(vd_i.vd_hr);
    vdgeo.vd_gv(vd_i.vd_cC);
    vdgeo.vd_gv(vd_i.vd_ca);
    vdgeo.vd_gv(vd_i.vd_pm);
    vdgeo.vd_bf(vd_i.vd_pm, vd_i.width * 0.5, vd_i.height * -0.5, 1);
    vdgeo.vd_j(
      vd_i.vd_pm,
      vd_i.width * 0.5 + vd_i.vd_dL,
      vd_i.height * 0.5 + vd_i.vd_fz,
      0
    );
    vd_i.vd_NS = vdgeo.vd_bu(vd_i.vd_pm);
    var vd_hZ = vd_i.width / vd_i.height;
    vd_i.vd_PR = LensAngle;
    if (vd_i.vd_bO)
      vdgeo.vd_KM(
        vd_i.vd_hr,
        vd_i.vd_X,
        vd_i.vd_m,
        vd_hZ,
        vd_fy,
        zFar,
        FocalLength,
        LensAngle
      );
    else vdgeo.vd_Mm(vd_i.vd_hr, vd_i.vd_X, vd_i.vd_m, vd_hZ, vd_fy, zFar);
    vdgeo.vd_ne(vd_i.vd_cC, vd_i.vd_hr);
    vdgeo.vd_cW(vd_i.vd_cC, vd_i.vd_pm);
    vdgeo.vd_ne(vd_i.vd_ca, vd_i.vd_cC);
    vdgeo.vd_me(vd_i.vd_ca);
    vd_i.vd_sf();
    if (vd_i.vd_fj) {
      if (!vd_i.vd_sR) {
        vdgeo.vd_oH(
          vd_uj,
          vd_i.vd_iU[X],
          vd_i.vd_iU[Y],
          vd_i.vd_iU[Z],
          vd_Ah,
          true
        );
      }
    }
    if (vd_i.vd_bG()) vd_i.vd_aC.vd_HR();
    vd_i.vd_nP(vdgeo.vd_ci(vd_uj));
    if (vd_i.vd_bO) {
      var vd_lG = vd_i.vd_hr;
      var vd_jy = vdgeo.vd_bu(vd_lG);
      var p1 = vdgeo.vd_bp(0, 1, 1, vd_jy);
      var p2 = vdgeo.vd_bp(0, -1, 1, vd_jy);
      var vd_NH = vdgeo.Distance2D(p1, p2);
      vd_i.vd_BA = vd_NH / vd_i.height;
    }
    if (vd_i.vd_dJ) {
      for (var i = 0; i < vd_i.vd_dJ.length; i++) {
        var section = vd_i.vd_dJ[i];
        var mat = vdgeo.vd_bu(vd_i.vd_fp());
        vdgeo.vd_j(mat, -section[0][X], -section[0][Y], -section[0][Z]);
        vdgeo.vd_hh(mat, section[1]);
        section[2] = mat;
      }
    }
    if (vd_i.vd_bG()) vd_i.vd_aC.vd_Kd();
    vd_i.vd_dC();
  };
  this.vd_sP = function (vd_cM) {
    var vd_eG = vdgeo.vd_bu(vd_i.vd_ar());
    var vd_do = vdgeo.matrixtransform(vd_eG, vd_cM);
    var elevation = 0.0;
    var v = vdgeo.vd_gn(vd_eG);
    if (!vdgeo.AreEqual(v[Z], 0.0, vdgeo.DefaultLinearEquality)) {
      var ar1 = (elevation - vd_do[Z]) / v[Z];
      vd_do[X] += ar1 * v[X];
      vd_do[Y] += ar1 * v[Y];
      vd_do[Z] = elevation;
    }
    return vd_do;
  };
  function vd_HU() {
    if (!vd_n) return;
    var doc = vd_n.GetDocument();
    if (!doc) return;
    var layout = vd_n.GetActiveLayout();
    if (!layout) return;
    if (!layout.GridMode) return;
    var vd_qP = vd_i.vd_bd;
    var vd_qs = vd_i.vd_c.vd_eR;
    var vd_kh = new vd_hd();
    vd_kh.vd_gJ(layout.Limits);
    var vd_DR = 0.22;
    var vd_fE = layout.GridSpaceX;
    var vd_bW = layout.GridSpaceY;
    if (vd_fE == 0.0) vd_fE = layout.SnapSpaceX;
    if (vd_bW == 0.0) vd_bW = layout.SnapSpaceY;
    var fr1 = 0.0;
    var vd_er = Math.sin(fr1);
    var vd_eM = Math.cos(fr1);
    fr1 = vd_i.vd_m;
    var fr2 = vd_i.width / vd_i.height;
    var vd_Od = vd_i.width;
    var vd_NL = vd_i.height;
    var p6 = [0, 0, 1];
    var p5 = [0, 0, 0];
    p5[X] = p6[Z] / Math.sqrt(p6[X] * p6[X] + p6[Y] * p6[Y] + p6[Z] * p6[Z]);
    while (
      Math.abs(p5[X]) < Math.sin(vdgeo.vd_JG) ||
      Math.abs(fr1 / (p5[X] * vd_bW)) > vd_NL * vd_DR ||
      Math.abs((fr1 * fr2) / (p5[X] * vd_fE)) > vd_Od * vd_DR
    ) {
      if (Math.abs(vd_fE) > vd_kh.Width / 2.0) break;
      if (Math.abs(vd_bW) > vd_kh.Height / 2.0) break;
      vd_fE *= 2.0;
      vd_bW *= 2.0;
    }
    var p1 = [vd_i.vd_X[X], vd_i.vd_X[Y], vd_i.vd_X[Z]];
    var p2 = [0, 0, 0];
    p2[X] = p1[X] + 0.5 * fr1 * fr2;
    p2[Y] = p1[Y] + 0.5 * fr1;
    var p3 = vd_i.vd_sP(p2);
    p2[X] = p1[X] - 0.5 * fr1 * fr2;
    p2[Y] = p1[Y] - 0.5 * fr1;
    var p4 = vd_i.vd_sP(p2);
    p2[X] = p1[X] + 0.5 * fr1 * fr2;
    p2[Y] = p1[Y] - 0.5 * fr1;
    p5 = vd_i.vd_sP(p2);
    p2[X] = p1[X] - 0.5 * fr1 * fr2;
    p2[Y] = p1[Y] + 0.5 * fr1;
    p6 = vd_i.vd_sP(p2);
    var vd_cO = [0, 0, 0];
    var vd_dn = [0, 0, 0];
    vd_cO[X] = Math.max(p4[X], p3[X]);
    vd_cO[X] = Math.max(vd_cO[X], p5[X]);
    vd_cO[X] = Math.max(vd_cO[X], p6[X]);
    vd_cO[Y] = Math.max(p4[Y], p3[Y]);
    vd_cO[Y] = Math.max(vd_cO[Y], p5[Y]);
    vd_cO[Y] = Math.max(vd_cO[Y], p6[Y]);
    vd_dn[X] = Math.min(p4[X], p3[X]);
    vd_dn[X] = Math.min(vd_dn[X], p5[X]);
    vd_dn[X] = Math.min(vd_dn[X], p6[X]);
    vd_dn[Y] = Math.min(p4[Y], p3[Y]);
    vd_dn[Y] = Math.min(vd_dn[Y], p5[Y]);
    vd_dn[Y] = Math.min(vd_dn[Y], p6[Y]);
    vd_dn[Z] = 0.0;
    vd_cO[Z] = 0.0;
    p1[X] = vd_kh.Left;
    p1[Y] = vd_kh.Bottom;
    p1[Z] = 0.0;
    p2[X] = vd_kh.Right;
    p2[Y] = vd_kh.Top;
    p2[Z] = 0.0;
    if (
      p1[X] >= vd_cO[X] ||
      p1[Y] >= vd_cO[Y] ||
      p2[X] <= vd_dn[X] ||
      p2[Y] <= vd_dn[Y]
    )
      return;
    if (p1[Y] > vd_dn[Y]) vd_dn[Y] = p1[Y];
    if (p1[X] > vd_dn[X]) vd_dn[X] = p1[X];
    if (p2[Y] < vd_cO[Y]) vd_cO[Y] = p2[Y];
    if (p2[X] < vd_cO[X]) vd_cO[X] = p2[X];
    var vd_aG = [layout.SnapBase[X], layout.SnapBase[Y], layout.SnapBase[Z]];
    vd_aG[Z] = 0.0;
    p3[X] = (vd_dn[X] - vd_aG[X]) * vd_eM + (vd_dn[Y] - vd_aG[Y]) * vd_er;
    p3[Y] = (vd_aG[X] - vd_dn[X]) * vd_er + (vd_dn[Y] - vd_aG[Y]) * vd_eM;
    p4[X] = (vd_cO[X] - vd_aG[X]) * vd_eM + (vd_cO[Y] - vd_aG[Y]) * vd_er;
    p4[Y] = (vd_aG[X] - vd_cO[X]) * vd_er + (vd_cO[Y] - vd_aG[Y]) * vd_eM;
    p1[X] = Math.min(p3[X], p4[X]);
    p1[Y] = Math.min(p3[Y], p4[Y]);
    p2[X] = Math.max(p3[X], p4[X]);
    p2[Y] = Math.max(p3[Y], p4[Y]);
    vdgeo.vd_aZ(p5, vd_dn);
    p5[Y] = vd_cO[Y];
    p3[X] = (p5[X] - vd_aG[X]) * vd_eM + (p5[Y] - vd_aG[Y]) * vd_er;
    p3[Y] = (vd_aG[X] - p5[X]) * vd_er + (p5[Y] - vd_aG[Y]) * vd_eM;
    p1[X] = Math.min(p1[X], p3[X]);
    p1[Y] = Math.min(p1[Y], p3[Y]);
    p2[X] = Math.max(p2[X], p3[X]);
    p2[Y] = Math.max(p2[Y], p3[Y]);
    vdgeo.vd_aZ(p5, vd_dn);
    p5[X] = vd_cO[X];
    p3[X] = (p5[X] - vd_aG[X]) * vd_eM + (p5[Y] - vd_aG[Y]) * vd_er;
    p3[Y] = (vd_aG[X] - p5[X]) * vd_er + (p5[Y] - vd_aG[Y]) * vd_eM;
    p1[X] = Math.min(p1[X], p3[X]);
    p1[Y] = Math.min(p1[Y], p3[Y]);
    p2[X] = Math.max(p2[X], p3[X]);
    p2[Y] = Math.max(p2[Y], p3[Y]);
    var vd_tI = vd_fE;
    fr1 = vdgeo.vd_r(p1[X] / vd_tI);
    p1[X] = fr1 * vd_tI;
    fr1 = vdgeo.vd_r(p2[X] / vd_tI);
    p2[X] = fr1 * vd_tI;
    fr1 = vdgeo.vd_r(p1[Y] / vd_bW);
    p1[Y] = fr1 * vd_bW;
    fr1 = vdgeo.vd_r(p2[Y] / vd_bW);
    p2[Y] = fr1 * vd_bW;
    p4[Z] = 0.0;
    vdgeo.vd_aZ(p3, p1);
    vd_i.vd_bd = false;
    vd_i.vd_c.vd_eR = false;
    if (vd_i.vd_bG()) vd_i.vd_aC.vd_tV();
    var pattern = {};
    pattern.Name = "GRID";
    pattern.PatternLines = { Items: [] };
    var angx = 0.0;
    var angy = 90.0;
    var vd_xI = vd_fE;
    var vd_xH = vd_bW;
    var origin = [0, 0, 0];
    var offsetX = vdgeo.pointPolar(origin, vdgeo.DegreesToRadians(angy), vd_xH);
    var offsetY = vdgeo.pointPolar(origin, vdgeo.DegreesToRadians(angx), vd_xI);
    var rect = new vd_hd();
    rect.AddPoint(vd_dn);
    rect.AddPoint(vd_cO);
    var vd_kq = true;
    if (layout.GridStyle == vdConst.GridStyle_Cross) {
      vd_kq = false;
      var vd_KW = 8;
      vd_jV = vd_i.pixelsize * vd_KW;
      rect.vd_JT(vd_jV);
      pattern.PatternLines.Items[0] = {
        Angle: vdgeo.DegreesToRadians(angx),
        Origin: origin,
        Offset: offsetX,
        Dashes: { Items: [vd_jV / 2, -(vd_xI - vd_jV), vd_jV / 2] },
      };
      pattern.PatternLines.Items[1] = {
        Angle: vdgeo.DegreesToRadians(angy),
        Origin: origin,
        Offset: offsetY,
        Dashes: { Items: [vd_jV / 2, -(vd_xH - vd_jV), vd_jV / 2] },
      };
    } else if (layout.GridStyle == vdConst.GridStyle_Dot) {
      vd_kq = false;
      pattern.PatternLines.Items[0] = {
        Angle: vdgeo.DegreesToRadians(angx),
        Origin: origin,
        Offset: offsetX,
        Dashes: { Items: [0, -vd_xI, 0] },
      };
      pattern.PatternLines.Items[1] = {
        Angle: vdgeo.DegreesToRadians(angy),
        Origin: origin,
        Offset: offsetY,
        Dashes: { Items: [0, -vd_xH, 0] },
      };
    } else {
      pattern.PatternLines.Items[0] = {
        Angle: vdgeo.DegreesToRadians(angx),
        Origin: origin,
        Offset: offsetX,
        Dashes: { Items: [] },
      };
      pattern.PatternLines.Items[1] = {
        Angle: vdgeo.DegreesToRadians(angy),
        Origin: origin,
        Offset: offsetY,
        Dashes: { Items: [] },
      };
    }
    var pts = [
      [rect.Left, rect.Bottom, 0],
      [rect.Right, rect.Bottom, 0],
      [rect.Right, rect.Top, 0],
      [rect.Left, rect.Top, 0],
      [rect.Left, rect.Bottom, 0],
    ];
    var rgba = doc.GlobalRenderProperties.GridColor;
    if (!rgba) rgba = vd_fv;
    rgba = vd_i.vd_yM(rgba);
    vd_i.vd_dC();
    var vd_cY = vd_i.vd_bF(rgba);
    vd_i.vd_eY({
      vd_bT: undefined,
      color: undefined,
      vd_iV: 0,
      vd_dA: 0,
      vd_dy: 255,
      angle: 0,
      scale: 1,
      pattern: pattern,
      origin: [vd_aG[X], vd_aG[Y], 0.0],
      IsDpi: false,
      vd_ok: false,
      vd_eg: 0,
      vd_iQ: undefined,
      gradientAngle: 0,
    });
    vd_i.vd_gR(pts);
    vd_i.vd_eY(null);
    if (vd_kq) vd_i.vd_bt(pts);
    vd_i.vd_bF(vd_cY);
    vd_i.vd_lR();
    vd_i.vd_bd = vd_qP;
    vd_i.vd_c.vd_eR = vd_qs;
    if (vd_i.vd_bG()) vd_i.vd_aC.vd_tV();
    vd_i.vd_dC();
  }
  this.clear = function (vd_NK) {
    vd_i.vd_c.clear(vd_dt);
    vd_i.vd_cF = [];
    vd_i.vd_aH = undefined;
    vd_mh = null;
    if (vd_i.vd_bG()) vd_i.vd_aC.vd_HL();
    if (!vd_NK) vd_HU();
  };
  function vd_dD(vd_iX, vd_je) {
    if (!vd_fB()) return;
    if (!vd_Bt()) {
      vd_wJ(vd_iX, vd_je, 0.0, true);
      return;
    }
    if (vd_i.vd_bG()) {
      vd_i.vd_aC.vd_cP(vd_iX, vd_je);
      return;
    }
    vd_lj(vd_iX, __P1);
    vd_lj(vd_je, __P2);
    var ret = vd_gU(__P1, __P2, vd_cS, vd_cr);
    if (ret === 1) return;
    vd_ie(vd_cS[X], vd_cS[Y], vd_cr[X], vd_cr[Y], vd_cS[Z], vd_cr[Z]);
  }
  this.vd_cP = function (vd_iX, vd_je) {
    if (vd_i.vd_aH === undefined) vd_i.vd_aH = 0;
    vd_dD(vd_iX, vd_je);
  };
  this.vd_fH = function (pts, vd_bJ, uvs, vd_ew) {
    if (!vd_fB()) return;
    if (vd_i.vd_bG()) {
      vd_i.vd_aC.vd_fH(pts, vd_bJ, uvs, vd_ew);
      return;
    }
    if (!vd_i.vd_xj(vd_bJ)) return;
    var npts = vd_LG(pts);
    vd_fF(npts, uvs, vd_ew);
    vd_EO();
  };
  this.vd_EJ = function (vd_vD, direction, vd_Dd) {
    if (!vd_fB()) return;
    var v = vdgeo.newpoint(0, 0, 0);
    vdgeo.vd_oH(
      vd_i.vd_ar(),
      direction[X],
      direction[Y],
      direction[Z],
      v,
      true
    );
    if (
      vdgeo.AreEqual(v[X], 0.0, vdgeo.DefaultLinearEquality) &&
      vdgeo.AreEqual(v[Y], 0.0, vdgeo.DefaultLinearEquality)
    ) {
      vd_i.vd_iZ(vd_vD);
      return;
    } else {
      var pt1, pt2;
      var pt = vdgeo.matrixtransform(vd_i.vd_ar(), vd_vD);
      var vd_ih =
        (vdgeo.Distance2D(pt, vd_i.vd_X) +
          Math.sqrt(vd_i.vd_m * vd_i.vd_m + vd_i.vd_At() * vd_i.vd_At())) *
        2.0;
      if (!vd_Dd) {
        pt1 = vdgeo.newpoint(
          pt[X] + v[X] * -vd_ih,
          pt[Y] + v[Y] * -vd_ih,
          pt[Z] + v[Z] * -vd_ih
        );
        pt2 = vdgeo.newpoint(
          pt[X] + v[X] * vd_ih,
          pt[Y] + v[Y] * vd_ih,
          pt[Z] + v[Z] * vd_ih
        );
      } else {
        pt1 = pt;
        pt2 = vdgeo.newpoint(
          pt[X] + v[X] * vd_ih,
          pt[Y] + v[Y] * vd_ih,
          pt[Z] + v[Z] * vd_ih
        );
      }
      if (vd_i.vd_bd) {
        if (!vd_i.vd_Fh(pt1, pt2, vd_cS, vd_cr)) return;
        var vd_eG = vdgeo.vd_bu(vd_i.vd_ar());
        vdgeo.vd_eU(vd_eG, vd_cS, pt1);
        vdgeo.vd_eU(vd_eG, vd_cr, pt2);
        vd_dD(pt1, pt2);
      } else {
        vdgeo.vd_eU(vd_i.vd_cC, pt1, __P1);
        vdgeo.vd_eU(vd_i.vd_cC, pt2, __P2);
        var ret = vd_gU(__P1, __P2, vd_cS, vd_cr);
        if (ret === 1) return;
        vd_ie(vd_cS[X], vd_cS[Y], vd_cr[X], vd_cr[Y], vd_cS[Z], vd_cr[Z]);
      }
    }
  };
  function vd_Im(pts, closed) {
    var sp = pts[0];
    for (var i = 1; i < pts.length; i++) {
      var ep = pts[i];
      vd_dD(sp, ep);
      sp = ep;
    }
    if (closed) vd_dD(sp, pts[0]);
  }
  this.vd_bt = function (pts, closed) {
    if (!vd_fB()) return;
    if (pts.length < 2) return;
    if (!vd_Bt()) {
      vd_Ol(pts, closed, 0.0);
      return;
    }
    var sp = pts[0];
    for (var i = 1; i < pts.length; i++) {
      var ep = pts[i];
      vd_i.vd_aH = sp[INDEX];
      if (vd_i.vd_aH === undefined) vd_i.vd_aH = i - 1;
      vd_dD(sp, ep);
      sp = ep;
    }
    if (closed) {
      vd_i.vd_aH = pts[pts.length - 1][INDEX];
      if (vd_i.vd_aH === undefined) vd_i.vd_aH = pts.length - 1;
      vd_dD(pts[pts.length - 1], pts[0]);
    }
    vd_i.vd_aH = undefined;
  };
  this.vd_vP = function (
    p1,
    p2,
    p3,
    p4,
    vd_em,
    vd_ec,
    vd_hj,
    vd_hk,
    vd_bJ,
    uv1,
    uv2,
    uv3,
    uv4
  ) {
    if (vd_i.vd_aH === undefined) vd_i.vd_aH = 0;
    vd_kQ(
      p1,
      p2,
      p3,
      p4,
      vd_em,
      vd_ec,
      vd_hj,
      vd_hk,
      vd_bJ,
      uv1,
      uv2,
      uv3,
      uv4
    );
  };
  this.vd_hD = function (
    p1,
    p2,
    p3,
    p4,
    vd_em,
    vd_ec,
    vd_hj,
    vd_hk,
    vd_bJ,
    uv1,
    uv2,
    uv3,
    uv4
  ) {
    if (vd_i.vd_aH === undefined) vd_i.vd_aH = 0;
    vd_dW(
      p1,
      p2,
      p3,
      p4,
      vd_em,
      vd_ec,
      vd_hj,
      vd_hk,
      vd_bJ,
      uv1,
      uv2,
      uv3,
      uv4
    );
  };
  function vd_qX(x, y, z) {
    var p1 = vdgeo.vd_gi(vd_i.vd_ar(), 0, 0, 0);
    p1 = vdgeo.vd_cZ(p1, vd_i.vd_hr);
    var p2 = vdgeo.vd_gi(vd_i.vd_ar(), x, y, z);
    p2 = vdgeo.vd_cZ(p2, vd_i.vd_hr);
    return vdgeo.Distance2D(p1, p2) * vd_i.vd_m;
  }
  this.vd_zt = function (x, y, z) {
    return vd_qX(x, y, z) / vd_i.pixelsize;
  };
  function vd_Dl(x, y, z) {
    var v = vdgeo.newpoint(0, 0, 0);
    vdgeo.vd_oH(vd_i.vd_ar(), x, y, z, v, false);
    return vdgeo.vd_iE(v);
  }
  function vd_Gz(shape, offsetX, offsetY, vd_NO, vd_dl) {
    var jj;
    var p1 = vdgeo.newpoint(0, 0, 0);
    var p2 = vdgeo.newpoint(0, 0, 0);
    if (shape == null) {
      if (vd_dl == null) return;
      var w = vd_dl.Ascent * 0.5;
      var lw = w * 0.25;
      vd_Im(
        [
          vdgeo.newpoint(offsetX + lw, offsetY, 0),
          vdgeo.newpoint(offsetX + w - lw, offsetY, 0),
          vdgeo.newpoint(offsetX + w - lw, offsetY + vd_dl.Ascent, 0),
          vdgeo.newpoint(offsetX + lw, offsetY + vd_dl.Ascent, 0),
        ],
        true
      );
    } else {
      var vd_ry = [];
      var vd_uN = null;
      var vd_on = vd_MX();
      if (vd_i.vd_hF) vd_uN = [];
      if (shape.Segments !== undefined) {
        for (var k = 0; k < shape.Segments.Items.length; k++) {
          var vd_Hm = shape.Segments.Items[k].Flag === 1;
          var pts = shape.Segments.Items[k].Points.Items;
          if (vd_Hm) {
            if (shape.Segments.Items[k].vd_BD == undefined)
              shape.Segments.Items[k].vd_BD = vdgeo.vd_HB(8, pts);
            pts = shape.Segments.Items[k].vd_BD;
          }
          if (vd_i.vd_bG()) {
            p1[X] = pts[0][X] + offsetX;
            p1[Y] = pts[0][Y] + offsetY;
            p1[Z] = 0.0;
            for (jj = 1; jj < pts.length; jj++) {
              vdgeo.vd_aZ(p2, pts[jj]);
              p2[X] = pts[jj][X] + offsetX;
              p2[Y] = pts[jj][Y] + offsetY;
              p2[Z] = 0.0;
              vd_i.vd_aC.vd_cP(p1, p2);
              p1[X] = p2[X];
              p1[Y] = p2[Y];
              p1[Z] = p2[Z];
            }
          } else {
            var _pts = [];
            if (vd_uN) vd_uN.push(pts);
            for (var j = 0; j < pts.length; j++) {
              vd_kN(pts[j][X] + offsetX, pts[j][Y] + offsetY, 0, __P2);
              var npt = vdgeo.newpoint(__P2[X], __P2[Y], __P2[Z]);
              npt[W] = __P2[W];
              _pts.push(npt);
            }
            vd_ry.push(_pts);
          }
        }
        if (vd_i.vd_bG()) return;
      }
      if (vd_NO && !vd_i.vd_bO) {
        vd_lC(vd_ry, vd_uN, vd_on);
      } else {
        for (var kk = 0; kk < vd_ry.length; kk++) {
          var pts2 = vd_ry[kk];
          vdgeo.vd_aZ(p1, pts2[0]);
          for (jj = 1; jj < pts2.length; jj++) {
            vdgeo.vd_aZ(p2, pts2[jj]);
            var vd_vo = vd_gU(p1, p2, vd_cS, vd_cr);
            if (vd_vo !== 1) {
              vd_ie(vd_cS[X], vd_cS[Y], vd_cr[X], vd_cr[Y], vd_cS[Z], vd_cr[Z]);
            }
            vdgeo.vd_aZ(p1, pts2[jj]);
          }
        }
      }
    }
  }
  function vd_Ma(vd_jt, vd_mm, vd_dl) {
    var p1 = [0, 0, 0];
    var p2 = [vd_jt, 0, 0];
    vd_lj(p1, __P1);
    vd_lj(p2, __P2);
    var ret = vd_gU(__P1, __P2, vd_cS, vd_cr);
    return ret !== 1;
  }
  this.vd_rp = function (vd_ac, vd_jt, vd_mm, vd_dl) {
    if (!vd_ac) return;
    if (!vd_fB()) return;
    if (!vd_i.vd_xj(null)) return;
    if (vd_ha) {
      vd_i.vd_bt(
        [
          [0, 0, 0],
          [vd_jt, 0, 0],
          [vd_jt, vd_mm, 0],
          [0, vd_mm, 0],
        ],
        true
      );
      return;
    }
    vd_i.vd_aH = 0;
    if (vd_Ma(vd_jt, vd_mm, vd_dl)) {
      var c, pos;
      var vd_oC = vd_qX(0, vd_mm, 0);
      var vd_sv = vd_oC / (dpi * vd_i.pixelsize);
      if (vd_sv < vd_qr) {
        var p0 = vdgeo.newpoint(0, 0, 0);
        var p1 = vdgeo.newpoint(vd_jt, 0, 0);
        var sw = vd_i.vd_aQ(vd_sv * dpi);
        vd_dD(p0, p1);
        vd_i.vd_aQ(sw);
      } else {
        var vd_CT = false;
        if (vd_dl.FontType) {
          for (c = 0; c < vd_ac.length; c++) {
            pos = vd_ac.charCodeAt(c);
            var t = pos >> 4;
            if (t > 89 && t < 96) {
              vd_CT = true;
              break;
            }
          }
        }
        var offsetX = 0;
        var offsetY = 0;
        for (var cc = 0; cc < vd_ac.length; cc++) {
          c = cc;
          if (vd_CT) c = vd_ac.length - 1 - cc;
          pos = vd_ac.charCodeAt(c);
          if (pos === 10 || pos === 13) continue;
          var vd_gC = vd_dl.Shapes["h_" + pos.toString()];
          var shape = null;
          if (vd_gC !== undefined) shape = vd_dl.Shapes.Items[vd_gC];
          if (pos != 32) {
            vd_Gz(shape, offsetX, offsetY, vd_dl.FontType, vd_dl);
          }
          if (shape != null) {
            offsetX += shape.AdvanceX;
            offsetY += shape.AdvanceY;
          } else {
            offsetX += vd_dl.Ascent * 0.5;
          }
        }
      }
    }
    vd_EO();
    vd_i.vd_aH = undefined;
  };
  this.vd_qj = function (vd_u, vd_yA, vd_ym, vd_rK) {
    if (
      vd_i.vd_c.vd_jr == vdConst.InterpolationMode_Nearest &&
      !vd_i.vd_bd &&
      !vd_ha &&
      !vd_i.vd_bG()
    ) {
      vd_i.vd_c.vd_qj(vd_u, vd_yA, vd_i.vd_fp(), vd_rK / vd_u.height);
    } else {
      var pts = [
        vdgeo.newpoint(0, 0, 0),
        vdgeo.newpoint(vd_ym, 0, 0),
        vdgeo.newpoint(vd_ym, vd_rK, 0),
        vdgeo.newpoint(0, vd_rK, 0),
      ];
      var vd_bJ = vdgeo.newpoint(0, 0, 1);
      var uvs = [
        vdgeo.newpoint(0, 0, 0),
        vdgeo.newpoint(1, 0, 0),
        vdgeo.newpoint(1, 1, 0),
        vdgeo.newpoint(0, 1, 0),
      ];
      var vd_ft = vd_i.vd_dV(vdgeo.vd_CV(0, 0, vd_ym, vd_rK));
      vd_i.vd_fJ(pts, vd_bJ, uvs, vd_u, true);
      vd_i.vd_dV(vd_ft);
    }
  };
  this.vd_iZ = function (pt) {
    if (!vd_fB()) return;
    if (vd_i.vd_bG()) {
      vd_i.vd_aC.vd_iZ(pt);
      return;
    }
    vd_lj(pt, __P1);
    if (
      vdgeo.vd_nB(
        __P1[X],
        __P1[Y],
        vd_i.clip[0],
        vd_i.clip[1],
        vd_i.clip[2],
        vd_i.clip[3]
      )
    )
      vd_i.vd_c.vd_wf(__P1[X], __P1[Y], __P1[Z]);
  };
  this.vd_qO = function (pts, vd_jq, vd_ob, vd_sk) {
    if (!vd_fB()) return;
    if (vd_i.vd_bG()) {
      vd_i.vd_aC.vd_qO(pts, vd_jq, vd_ob, vd_sk);
      return;
    }
    var rgbm;
    var pt;
    var vd_Ap = vd_i.vd_c.vd_bw;
    for (var i = 0; i < pts.length; i++) {
      vd_i.vd_aH = i;
      pt = pts[i];
      vd_lj(pt, __P1);
      if (
        vdgeo.vd_nB(
          __P1[X],
          __P1[Y],
          vd_i.clip[0],
          vd_i.clip[1],
          vd_i.clip[2],
          vd_i.clip[3]
        )
      ) {
        if (vd_jq) {
          rgbm = vd_jq[i];
          vd_i.vd_c.vd_bw = [
            (rgbm >> 16) & 0xff,
            (rgbm >> 8) & 0xff,
            rgbm & 0xff,
          ];
        }
        vd_i.vd_c.vd_JH(__P1[X], __P1[Y], __P1[Z], vd_ob);
      }
    }
    vd_i.vd_aH = undefined;
    vd_i.vd_c.vd_bw = vd_Ap;
  };
  var vd_cq = vdgeo.newpoint(0, 0, 0);
  var vd_dO = vdgeo.newpoint(0, 0, 0);
  var _tm = vdgeo.vd_Q();
  var vd_Dy = [
    vdgeo.newpoint(0, 0, 0),
    vdgeo.newpoint(0, 0, 0),
    vdgeo.newpoint(0, 0, 0),
    vdgeo.newpoint(0, 0, 0),
  ];
  this.vd_iD = function (pts, thickness, closed) {
    if (!vd_fB()) return;
    if (pts.length < 2) return;
    if (thickness == 0.0 || thickness == undefined) {
      vd_i.vd_bt(pts, closed);
      return;
    }
    if (vd_i.RenderMode == vdConst.vd_vv) {
      var zdir = vdgeo.vd_gn(vd_i.vd_ar());
      if (zdir[X] == 0.0 && zdir[Y] == 0.0 && zdir[Z] == 1.0) {
        vd_i.vd_bt(pts, closed);
        return;
      }
    }
    var offset = 0;
    var normal = vdgeo.newpoint(0, 0, 0);
    var ang, vd_RM, npts;
    npts = pts;
    var uvs = null;
    for (var i = 0; i < npts.length - 1; i++) {
      vd_cq[X] = npts[i][X];
      vd_cq[Y] = npts[i][Y];
      vd_cq[Z] = npts[i][Z] + thickness;
      vd_dO[X] = npts[i + 1][X];
      vd_dO[Y] = npts[i + 1][Y];
      vd_dO[Z] = npts[i + 1][Z] + thickness;
      ang = vdgeo.GetAngle(npts[i], npts[i + 1]) + vdgeo.HALF_PI;
      normal[X] = Math.cos(ang);
      normal[Y] = Math.sin(ang);
      normal[Z] = 0;
      var dist = vdgeo.Distance3D(npts[i], npts[i + 1]);
      if (vd_i.vd_hF) {
        uvs = vdgeo.vd_eq(vd_i.vd_hF, [
          vdgeo.newpoint(-offset, 0, 0),
          vdgeo.newpoint(-(offset + dist), 0, 0),
          vdgeo.newpoint(-(offset + dist), thickness, 0),
          vdgeo.newpoint(-offset, thickness, 0),
        ]);
      } else {
        uvs = vd_Dy;
      }
      vd_i.vd_aH = npts[i][INDEX];
      if (vd_i.vd_aH === undefined) vd_i.vd_aH = i;
      vd_dW(
        npts[i],
        npts[i + 1],
        vd_dO,
        vd_cq,
        true,
        i === 0 || (!closed && i === npts.length - 2),
        true,
        true,
        normal,
        uvs[0],
        uvs[1],
        uvs[2],
        uvs[3]
      );
      offset += dist;
    }
    if (closed) {
      var vd_es = npts.length - 1;
      vd_cq[X] = npts[vd_es][X];
      vd_cq[Y] = npts[vd_es][Y];
      vd_cq[Z] = npts[vd_es][Z] + thickness;
      vd_dO[X] = npts[0][X];
      vd_dO[Y] = npts[0][Y];
      vd_dO[Z] = npts[0][Z] + thickness;
      ang = vdgeo.GetAngle(npts[vd_es], npts[0]) + vdgeo.HALF_PI;
      normal[X] = Math.cos(ang);
      normal[Y] = Math.sin(ang);
      normal[Z] = 0;
      if (vd_i.vd_hF) {
        uvs = vdgeo.vd_eq(vd_i.vd_hF, [
          vdgeo.newpoint(-offset, 0, 0),
          vdgeo.newpoint(-(offset + dist), 0, 0),
          vdgeo.newpoint(-(offset + dist), thickness, 0),
          vdgeo.newpoint(-offset, thickness, 0),
        ]);
      } else {
        uvs = vd_Dy;
      }
      vd_i.vd_aH = npts[vd_es][INDEX];
      if (vd_i.vd_aH === undefined) vd_i.vd_aH = vd_es;
      vd_dW(
        npts[vd_es],
        npts[0],
        vd_dO,
        vd_cq,
        true,
        false,
        true,
        true,
        normal,
        uvs[0],
        uvs[1],
        uvs[2],
        uvs[3]
      );
    }
    vd_i.vd_aH = undefined;
  };
  function vd_Oa(pts) {
    var vd_w = pts[0][Y];
    var vd_o = pts[0][Y];
    for (var i = 0; i < pts.length; i++) {
      var tmp = pts[i];
      if (tmp[Y] < vd_w) vd_w = tmp[Y];
      if (tmp[Y] > vd_o) vd_o = tmp[Y];
    }
    return [vd_w, vd_o];
  }
  function vd_Oq(pts, dy) {
    var points = [];
    var _dy = 0.0,
      _dx = 0.0,
      _dya = 0.0;
    var p1,
      p2,
      tmp = null;
    p1 = pts[0];
    for (var i = 1; i < pts.length; i++) {
      p2 = pts[i];
      _dya = p2[Y] - p1[Y];
      if (
        _dya == 0.0 ||
        (dy > p1[Y] && dy > p2[Y]) ||
        (dy < p1[Y] && dy < p2[Y])
      ) {
        p1 = p2;
        continue;
      }
      if (vdgeo.AreEqual(dy, p1[Y], vdgeo.DefaultPointEquality)) {
        tmp = vdgeo.newpoint(p1[X], p1[Y], p1[Z]);
        points.push(tmp);
        p1 = p2;
        continue;
      }
      _dy = dy - p1[Y];
      _dx = (_dy * (p2[X] - p1[X])) / _dya;
      tmp = vdgeo.newpoint(p1[X] + _dx, p1[Y] + _dy, p1[Z]);
      points.push(tmp);
      p1 = p2;
    }
    return points;
  }
  function vd_LW(vd_cK, _p1, _p2, vd_tx, scale) {
    if (
      vd_cK.Dashes == undefined ||
      (vd_cK.Dashes.Items.length === 1 && vd_cK.Dashes.Items[0] < 0.0)
    ) {
      vd_dD(_p1, _p2);
      return;
    }
    if (vd_cK.segmentlength == undefined) {
      vd_cK.segmentlength = 0;
      for (var i = 0; i < vd_cK.Dashes.Items.length; i++) {
        vd_cK.segmentlength += Math.abs(vd_cK.Dashes.Items[i] * scale);
      }
    }
    var vd_dF = vd_cK.segmentlength;
    var vd_aL;
    var vd_oC = vd_qX(vd_dF, 0, 0);
    if (vd_dF === 0 || vd_oC < vd_i.pixelsize * 2.0) {
      vd_dD(_p1, _p2);
      return;
    }
    vdgeo.vd_aZ(vd_gX, _p1);
    vd_aL = vd_tx;
    if (vd_aL < _p1[X]) vd_aL = _p1[X] - ((_p1[X] - vd_aL) % vd_dF);
    if (vd_aL > _p1[X]) vd_aL = _p1[X] + ((vd_aL - _p1[X]) % vd_dF) - vd_dF;
    while (vd_aL < _p2[X]) {
      for (var ii = 0; ii < vd_cK.Dashes.Items.length; ii++) {
        var dash = vd_cK.Dashes.Items[ii] * scale;
        vd_aL += Math.abs(dash);
        if (vd_aL < _p1[X]) continue;
        if (vd_aL > _p2[X]) vd_aL = _p2[X];
        if (dash > 0) {
          vdgeo.vd_nr(vd_cL, vd_aL, _p1[Y], _p1[Z]);
          vd_dD(vd_gX, vd_cL);
          vdgeo.vd_aZ(vd_gX, vd_cL);
        } else if (dash === 0) {
          vdgeo.vd_nr(vd_cL, vd_aL, _p1[Y], _p1[Z]);
          vd_i.vd_iZ(vd_cL);
        } else {
          vdgeo.vd_nr(vd_gX, vd_aL, _p1[Y], _p1[Z]);
        }
        if (vd_aL >= _p2[X]) break;
      }
    }
  }
  function vd_LX(pts, vd_cK) {
    var vd_pO =
      vd_P.IsDpi === false
        ? vd_P.scale
        : vd_i.pixelsize * vd_Gi * dpi * vd_i.vd_jH;
    var vd_eC = vd_zI(vd_cK, vd_pO, vd_P.angle, vd_P.IsDpi);
    var origin = vd_eC[0];
    var vd_bQ = vd_eC[1];
    var angle = vd_eC[2];
    if (vdgeo.AreEqual(vd_bQ[Y], 0.0, vdgeo.DefaultLinearEquality)) return;
    var vd_qU = vdgeo.vd_Q();
    var vd_Dt;
    var vd_hu = 0.0;
    var l = 0;
    var vd_cm;
    var points;
    vdgeo.vd_j(vd_qU, -vd_P.origin[X], -vd_P.origin[Y], -vd_P.origin[Z]);
    vdgeo.vd_j(vd_qU, -origin[X], -origin[Y], 0.0);
    vdgeo.vd_ap(vd_qU, -angle);
    vd_cm = vdgeo.vd_eq(vd_qU, pts);
    vd_cm.push(vd_cm[0]);
    var vd_jh = vd_Oa(vd_cm);
    if (vd_bQ[Y] > 0) {
      vd_hu = vd_jh[X] - (vd_jh[X] % vd_bQ[Y]) - vd_bQ[Y];
      while (vd_hu > vd_jh[X]) {
        vd_hu -= vd_bQ[Y];
      }
    } else {
      vd_hu = vd_jh[Y] - (vd_jh[Y] % vd_bQ[Y]) - vd_bQ[Y];
      while (vd_hu < vd_jh[Y]) {
        vd_hu -= vd_bQ[Y];
      }
    }
    var t = vd_hu / vd_bQ[Y];
    if (t < 0.0) t -= 0.5;
    else t += 0.5;
    l = vdgeo.vd_r(t);
    vd_Dt = vdgeo.vd_bu(vd_qU);
    vd_i.vd_aj(vd_Dt);
    while (vd_bQ[Y] > 0 ? vd_hu <= vd_jh[Y] : vd_hu >= vd_jh[X]) {
      points = vd_Oq(vd_cm, vd_hu);
      if (points.length % 2 === 1) points.pop();
      points.sort(function (a, b) {
        return a[X] - b[X];
      });
      for (var pos = 0; pos < points.length - 1; pos += 2) {
        vd_LW(vd_cK, points[pos], points[pos + 1], vd_bQ[X] * l, vd_pO);
      }
      vd_hu += vd_bQ[Y];
      l++;
    }
    vd_i.vd_aW();
  }
  function vd_Lu(pts, PatternLines) {
    var vd_PH = vd_i.linetype;
    vd_i.linetype = null;
    for (var i = 0; i < PatternLines.Items.length; i++) {
      vd_LX(pts, PatternLines.Items[i]);
    }
    vd_i.linetype = vd_PH;
  }
  var vd_P = {
    vd_bT: undefined,
    color: undefined,
    vd_iV: 0,
    vd_dA: 0,
    vd_dy: 255,
    angle: 0,
    scale: 1,
    pattern: null,
    origin: vdgeo.newpoint(0, 0, 0),
    IsDpi: false,
    vd_ok: false,
    vd_eg: 0,
    vd_iQ: undefined,
    gradientAngle: 0,
  };
  function vd_FM(pts) {
    if (pts == null) {
      vd_i.vd_c.vd_zv(0, undefined, null);
      return;
    }
    if (vd_P == null || vd_P == undefined || vd_P.vd_eg === 0) return;
    var gcol = vd_P.vd_iQ;
    if (gcol == undefined) gcol = vd_dt;
    var vd_ay = vdgeo.vd_lT(pts);
    var w = vd_ay[3] - vd_ay[0];
    var h = vd_ay[4] - vd_ay[1];
    var s = (w + h) / 2.0;
    var matrix = vdgeo.vd_bu(vd_i.vd_fp());
    if (vd_P.vd_eg === 1 || vd_P.vd_eg === 3) s = w;
    vdgeo.vd_j(
      matrix,
      -(vd_ay[0] + vd_ay[3]) / 2,
      -(vd_ay[1] + vd_ay[4]) / 2,
      vd_ay[2]
    );
    vdgeo.vd_ap(matrix, -vd_P.gradientAngle);
    vdgeo.vd_bf(matrix, 1 / s, 1 / s, 1);
    vd_i.vd_c.vd_zv(vd_P.vd_eg, gcol, matrix);
  }
  this.vd_eY = function (vd_cy) {
    vd_P = vd_cy;
    if (vd_P) vd_i.vd_aH = -1;
    else vd_i.vd_aH = undefined;
  };
  var vd_Gi = 0.0833;
  var vd_NR = 0.0197;
  function vd_zI(vd_cK, vd_ma, vd_EG, vd_Nu) {
    var m = vdgeo.vd_Q();
    vdgeo.vd_bf(m, vd_ma, vd_ma, 1);
    vdgeo.vd_ap(m, vd_EG);
    var origin = vdgeo.matrixtransform(m, vd_cK.Origin);
    var vd_bQ = vdgeo.newpoint(
      vd_cK.Offset[X],
      vd_cK.Offset[Y],
      vd_cK.Offset[Z]
    );
    if (vd_Nu === true) {
      vd_bQ[X] = vd_bQ[X] == 0.0 ? 0 : Math.abs(vd_bQ[X]) / vd_bQ[X];
      vd_bQ[Y] = vd_bQ[Y] == 0.0 ? 0 : Math.abs(vd_bQ[Y]) / vd_bQ[Y];
    }
    vd_bQ = vdgeo.matrixtransform(m, vd_bQ);
    var angle = vd_cK.Angle + vd_EG;
    var vd_Ep = vdgeo.vd_Q();
    vdgeo.vd_ap(vd_Ep, -angle);
    vd_bQ = vdgeo.matrixtransform(vd_Ep, vd_bQ);
    return [origin, vd_bQ, angle];
  }
  this.vd_gR = function (pts, vd_bJ, uvs) {
    if (vd_ha) {
      vd_i.vd_fH(pts);
      return;
    }
    var vd_hg = undefined;
    if (vd_P != null && vd_P !== undefined && vd_P.pattern != null) {
      var vd_wL = false;
      if (vd_P.IsDpi === false) {
        if (vd_P.vd_ok === true) {
          vd_wL = true;
        } else {
          var vd_pO = vd_P.scale;
          for (var i = 0; i < vd_P.pattern.PatternLines.Items.length; i++) {
            var vd_cK = vd_P.pattern.PatternLines.Items[i];
            var vd_eC = vd_zI(vd_cK, vd_pO, vd_P.angle, vd_P.IsDpi);
            var vd_oC = vd_qX(0, vd_eC[1][Y], 0);
            var vd_sv = vd_oC / (dpi * vd_i.pixelsize);
            if (vd_sv < vd_NR) {
              vd_wL = true;
              break;
            }
          }
        }
      }
      if (vd_P.vd_dA == 2) vd_hg = vd_i.vd_bF(vd_i.vd_iA());
      else if (vd_P.vd_dA == 3) vd_hg = vd_i.vd_bF(vd_i.vd_jP());
      else if (vd_P.vd_dA == 1) vd_hg = vd_i.vd_bF();
      else vd_hg = vd_i.vd_bF(vd_P.color);
      if (!vd_wL) {
        if (vd_P.vd_bT !== undefined) {
          if (vd_P.vd_iV == 2) vd_rE = vd_i.vd_bF(vd_i.vd_iA());
          else if (vd_P.vd_iV == 3) vd_rE = vd_i.vd_bF(vd_i.vd_jP());
          else if (vd_P.vd_iV == 1) vd_rE = vd_i.vd_bF();
          else vd_rE = vd_i.vd_bF(vd_P.vd_bT);
          vd_i.vd_fH(pts);
          vd_i.vd_bF(vd_rE);
        }
        vd_Lu(pts, vd_P.pattern.PatternLines);
        vd_i.vd_bF(vd_hg);
        return;
      }
    }
    var alpha = vd_i.vd_c.vd_jS(Math.min(vd_P.vd_dy, vd_i.vd_c.Alpha));
    vd_FM(pts);
    vd_i.vd_fJ(pts, vd_bJ, uvs, vd_i.vd_c.vd_fG);
    vd_FM(null);
    vd_i.vd_c.vd_jS(alpha);
    vd_i.vd_bF(vd_hg);
  };
  this.vd_fJ = function (pts, vd_bJ, uvs, vd_ct, vd_PV) {
    if (!vd_fB()) return;
    if (vd_ha) {
      if (!vd_ct || !vd_ct.isNoteIcon) {
        vd_i.vd_fH(pts, vd_bJ, uvs);
        return;
      }
    }
    var vd_OZ = vd_i.vd_cT;
    vd_i.vd_cT = true;
    var vd_LM = vd_fF;
    var vd_Ls = vd_i.vd_c.vd_Lz();
    var vd_Ia = vd_i.vd_gj(vd_ct);
    if (vd_i.vd_c.vd_fG && vd_fF == vd_wN) vd_fF = vd_lr;
    vd_i.vd_c.vd_Ar = !vd_PV;
    vd_i.vd_fH(pts, vd_bJ, uvs);
    vd_i.vd_c.vd_Ar = true;
    vd_i.vd_c.vd_KN(vd_Ls);
    vd_fF = vd_LM;
    vd_i.vd_gj(vd_Ia);
    vd_i.vd_cT = vd_OZ;
  };
  this.vd_oo = false;
  this.vd_En = function (FaceList, VertexList, vd_Ga, uvs, vd_cs, DrawEdges) {
    var i,
      ii = 0,
      i0,
      i1,
      i2,
      i3;
    var vd_cv = 0;
    var p0, p1, p2, p3;
    var col = -1,
      vd_ir = -1;
    var vd_ek, vd_bZ;
    var length = FaceList.length;
    var vd_Ey = vd_i.vd_bF(undefined);
    var vd_ct = vd_i.vd_c.vd_fG;
    vd_i.vd_oo = vd_cs != null;
    var vd_LF = vd_dW;
    var vd_KR = vd_fF;
    if (vd_i.vd_oo) {
      vd_dW = vd_kQ;
      if (vd_fF == vd_wN) vd_fF = vd_lr;
    }
    for (i = 0; i < length; i = i + 5) {
      vd_ek = i / 5;
      vd_bZ = 4 * vd_ek;
      vd_cv = 0;
      ii = FaceList[i];
      if (ii < 0) vd_cv += 1;
      ii = Math.abs(ii);
      i0 = ii;
      p0 = VertexList[ii - 1];
      ii = FaceList[i + 1];
      if (ii < 0) vd_cv += 2;
      ii = Math.abs(ii);
      i1 = ii;
      p1 = VertexList[ii - 1];
      ii = FaceList[i + 2];
      if (ii < 0) vd_cv += 4;
      ii = Math.abs(ii);
      i2 = ii;
      p2 = VertexList[ii - 1];
      ii = FaceList[i + 3];
      if (ii < 0) vd_cv += 8;
      ii = Math.abs(ii);
      i3 = ii;
      p3 = VertexList[ii - 1];
      if (!DrawEdges || vd_dW != vd_rx) col = FaceList[i + 4];
      if (ShowHidenEdges) vd_cv = 0;
      if (vd_ir != col) {
        vd_ir = col;
        if (vd_ir === -1) {
          vd_i.vd_bF(vd_Ey);
          vd_i.vd_gj(vd_ct);
        } else {
          var pcol = vd_i.palette.Items[vd_ir];
          vd_i.vd_bF(pcol.SystemColor);
          vd_i.vd_gj(pcol.MaterialImageRef);
        }
      }
      vd_mh = vd_ek;
      if (i3 === i2 || i3 === i0) p3 = null;
      vd_dW(
        p0,
        p1,
        p2,
        p3,
        (vd_cv & 1) === 0,
        (vd_cv & 2) === 0,
        (vd_cv & 4) === 0,
        (vd_cv & 8) === 0,
        vd_Ga[vd_ek],
        uvs[vd_bZ],
        uvs[vd_bZ + 1],
        uvs[vd_bZ + 2],
        uvs[vd_bZ + 3]
      );
    }
    vd_i.vd_oo = false;
    vd_dW = vd_LF;
    vd_fF = vd_KR;
    vd_mh = null;
    vd_i.vd_bF(vd_Ey);
    vd_i.vd_gj(vd_ct);
    if (DrawEdges && vd_dW != vd_rx) {
      var vd_CR = vd_i.vd_aQ();
      vd_i.vd_aQ(Math.max(vd_CR, 2));
      for (i = 0; i < length; i = i + 5) {
        vd_ek = i / 5;
        vd_bZ = 4 * vd_ek;
        vd_cv = 0;
        ii = FaceList[i];
        if (ii < 0) vd_cv += 1;
        ii = Math.abs(ii);
        i0 = ii;
        p0 = VertexList[ii - 1];
        ii = FaceList[i + 1];
        if (ii < 0) vd_cv += 2;
        ii = Math.abs(ii);
        i1 = ii;
        p1 = VertexList[ii - 1];
        ii = FaceList[i + 2];
        if (ii < 0) vd_cv += 4;
        ii = Math.abs(ii);
        i2 = ii;
        p2 = VertexList[ii - 1];
        ii = FaceList[i + 3];
        if (ii < 0) vd_cv += 8;
        ii = Math.abs(ii);
        i3 = ii;
        p3 = VertexList[ii - 1];
        if (ShowHidenEdges) vd_cv = 0;
        vd_mh = vd_ek;
        if (i3 === i2 || i3 === i0) p3 = null;
        vd_rx(
          p0,
          p1,
          p2,
          p3,
          (vd_cv & 1) === 0,
          (vd_cv & 2) === 0,
          (vd_cv & 4) === 0,
          (vd_cv & 8) === 0,
          vd_Ga[vd_ek],
          uvs[vd_bZ],
          uvs[vd_bZ + 1],
          uvs[vd_bZ + 2],
          uvs[vd_bZ + 3]
        );
      }
      vd_i.vd_aQ(vd_CR);
    }
  };
  function vd_PK() {
    var vd_is = document.createElement("div");
    vd_is.style.height = "25.4mm";
    vd_is.style.width = "25.4mm";
    vd_is.style.visibility = "hidden";
    document.body.appendChild(vd_is);
    var xres = vd_is.offsetWidth;
    var yres = vd_is.offsetHeight;
    vd_is.parentNode.removeChild(vd_is);
    return yres;
  }
  var dpi = 96.0;
  var vd_Dr = 0.2;
  var vd_Lq = 0.0625;
  var vd_qr = 0.033;
  var vd_sq = false;
  function vd_vz(sp, ep) {
    var vd_MC = vd_sq;
    vd_sq = true;
    vd_dD(sp, ep);
    vd_sq = vd_MC;
  }
  function vd_Bt() {
    if (vd_ha) return true;
    return (
      vd_i.linetype == null ||
      vd_sq == true ||
      vd_i.linetype.Segments == undefined ||
      vd_i.linetype.Segments.Items.length === 0 ||
      (vd_i.linetype.IsDPIScale !== true &&
        vd_vU() * vd_i.vd_ll < vd_i.pixelsize * dpi * vd_Lq * vd_i.vd_jH)
    );
  }
  function vd_vU() {
    if (vd_i.linetype.OverAllLength !== undefined)
      return vd_i.linetype.OverAllLength;
    vd_i.linetype.OverAllLength = 0.0;
    for (var i = 0; i < vd_i.linetype.Segments.Items.length; i++) {
      vd_i.linetype.OverAllLength += Math.abs(
        vd_i.linetype.Segments.Items[i].DashLen
      );
    }
    return vd_i.linetype.OverAllLength;
  }
  function vd_MI() {
    if (vd_i.linetype.vd_lh !== undefined) return vd_i.linetype.vd_lh;
    if (vd_i.linetype == null || vd_i.linetype.Segments.Items.length == 0) {
      vd_i.linetype.vd_lh = false;
      return vd_i.linetype.vd_lh;
    }
    for (var i = 0; i < vd_i.linetype.Segments.Items.length; i++) {
      var vd_s = vd_i.linetype.Segments.Items[i];
      if (vd_s.Flag != 0 || vd_s.DashLen > 0.0) {
        vd_i.linetype.vd_lh = false;
        return vd_i.linetype.vd_lh;
      }
    }
    vd_i.linetype.vd_lh = true;
    return vd_i.linetype.vd_lh;
  }
  function vd_wJ(p1, p2, vd_tx, vd_xx) {
    vdgeo.vd_eU(vd_i.vd_ar(), p1, __P1);
    vdgeo.vd_eU(vd_i.vd_ar(), p2, __P2);
    if (
      vdgeo.AreEqual(
        vdgeo.Distance2D(__P1, __P2),
        0.0,
        vdgeo.DefaultLinearEquality
      ) ||
      !vd_i.vd_Fh(__P1, __P2, vd_cS, vd_cr)
    )
      return 0.0;
    var invisible = vd_MI();
    var vd_tA = 0.0;
    var scale = vd_i.vd_ll;
    if (vd_i.linetype.IsDPIScale === true)
      scale = vd_i.pixelsize * dpi * vd_Dr * vd_i.vd_jH;
    scale /= vd_tt * vd_i.vd_jH;
    var vd_JU = vd_i.pixelsize / vd_tt;
    var vd_dF = vd_vU() * scale;
    var length = vdgeo.Distance3D(p1, p2);
    vdgeo.vd_aZ(vd_gX, p1);
    vdgeo.vd_aZ(vd_cL, p1);
    var vd_aL = 0.0;
    var dash = 0.0;
    vd_aL -= vd_tx;
    var angle = vdgeo.GetAngle(p1, p2);
    var vdir = vdgeo.VectorDirection(p1, p2);
    if (
      !invisible &&
      vd_xx &&
      vd_aL == 0 &&
      vd_i.linetype.DrawMethod != vdConst.LineTypeDrawMethod_Start
    ) {
      var vd_oq = length / vd_dF;
      var vd_yB =
        (Math.abs(vd_i.linetype.Segments.Items[0].DashLen) * scale +
          Math.abs(vd_oq - Math.floor(vd_oq)) * vd_dF) /
        2.0;
      var dx =
        vd_yB - Math.abs(vd_i.linetype.Segments.Items[0].DashLen) * scale;
      vd_aL = dx;
      vd_tA = (length - vd_aL) % vd_dF;
    } else {
      vd_tA = (length + vd_tx) % vd_dF;
    }
    var vd_zq = vd_aL;
    var start = 0;
    while (vd_aL < length) {
      if (
        !invisible &&
        vd_i.linetype.DrawMethod != vdConst.LineTypeDrawMethod_Start &&
        vd_xx &&
        length - vd_aL < vd_dF
      ) {
        vd_aL = length;
        vdgeo.vd_oE(vd_cL, p1, vdir, vd_aL);
        vd_vz(vd_gX, vd_cL);
        vdgeo.vd_aZ(vd_gX, vd_cL);
        break;
      }
      for (var i = 0; i < vd_i.linetype.Segments.Items.length; i++) {
        var vd_s = vd_i.linetype.Segments.Items[i];
        dash = vd_s.DashLen * scale;
        vd_aL += Math.abs(dash);
        if (vd_aL < 0.0) continue;
        if (vd_aL < start) continue;
        vd_zq = vd_aL;
        if (vd_aL > length) vd_aL = length;
        if (vd_s.vd_mF && vd_s.vd_cX) {
          var vd_iJ = vdgeo.vd_Q();
          var vd_qV = vd_s.ShapeScale;
          vd_qV *= 1.0 / vd_s.ShapeStyleRef.FontFileVDS.Ascent;
          vdgeo.vd_j(vd_iJ, -vd_s.vd_cX[0], 0, 0);
          vdgeo.vd_bf(vd_iJ, vd_qV, vd_qV, 1.0);
          vdgeo.vd_ap(vd_iJ, vd_s.ShapeRotation);
          vdgeo.vd_j(vd_iJ, vd_s.ShapeOffsetX, vd_s.ShapeOffsetY, 0.0);
          vdgeo.vd_KF(vd_iJ, vdgeo.newpoint(0, 0, 1), vdir);
          vdgeo.vd_bf(vd_iJ, scale, scale, 1.0);
          vdgeo.vd_oE(vd_cL, p1, vdir, vd_aL);
          vdgeo.vd_j(vd_iJ, vd_cL[X], vd_cL[Y], vd_cL[Z]);
          var d2 =
            vd_zq +
            vd_s.ShapeOffsetX * scale +
            (vd_xx ? (vd_s.vd_cX[1] - vd_s.vd_cX[0]) * vd_qV : 0.0);
          if (d2 <= length) {
            vd_i.vd_aj(vd_iJ);
            var vd_KK = vd_qr;
            vd_qr = 0;
            vd_i.vd_rp(
              vd_s.vd_mF,
              vd_s.vd_cX[1],
              vd_s.ShapeStyleRef.FontFileVDS.Ascent,
              vd_s.ShapeStyleRef.FontFileVDS
            );
            vd_qr = vd_KK;
            vd_i.vd_aW();
          }
        }
        if (dash > 0) {
          vdgeo.vd_oE(vd_cL, p1, vdir, vd_aL);
          vd_vz(vd_gX, vd_cL);
          vdgeo.vd_aZ(vd_gX, vd_cL);
        } else if (dash == 0) {
          vdgeo.vd_oE(vd_cL, p1, vdir, vd_aL + vd_JU * 2.0);
          vd_vz(vd_gX, vd_cL);
        } else {
          vdgeo.vd_oE(vd_gX, p1, vdir, vd_aL);
        }
        if (
          vdgeo.AreEqual(vd_aL, length, vdgeo.DefaultLinearEquality) ||
          vd_aL > length
        ) {
          vd_aL = length;
          break;
        }
      }
    }
    return vd_tA;
  }
  function vd_Ol(points, closed, vd_wn) {
    var vd_rk = 0.0;
    if (vd_i.linetype.DrawMethod != vdConst.LineTypeDrawMethod_Start) {
      var scale = vd_i.vd_ll;
      if (vd_i.linetype.IsDPIScale === true)
        scale = vd_i.pixelsize * dpi * vd_Dr * vd_i.vd_jH;
      var vd_dF = vd_vU() * scale;
      var length = points.length;
      var vd_oq = length / vd_dF;
      var vd_yB =
        (Math.abs(vd_i.linetype.Segments.Items[0].DashLen) * scale +
          Math.abs(vd_oq - Math.floor(vd_oq)) * vd_dF) /
        2.0;
      var dx =
        vd_yB - Math.abs(vd_i.linetype.Segments.Items[0].DashLen) * scale;
      vd_rk = -1.0 * dx;
    }
    var _sp = vdgeo.newpoint(0, 0, 0);
    var _ep = vdgeo.newpoint(0, 0, 0);
    vdgeo.vd_aZ(_sp, points[0]);
    _sp[Z] += vd_wn;
    for (var i = 1; i < points.length; i++) {
      vdgeo.vd_aZ(_ep, points[i]);
      _ep[Z] += vd_wn;
      vd_i.vd_aH = points[i - 1][INDEX];
      if (vd_i.vd_aH === undefined) vd_i.vd_aH = i - 1;
      vd_rk = vd_wJ(_sp, _ep, vd_rk, i === points.length - 1);
      vdgeo.vd_aZ(_sp, _ep);
    }
    if (closed) {
      vdgeo.vd_aZ(_ep, points[0]);
      _ep[Z] += vd_wn;
      vd_i.vd_aH = points[points.length - 1][INDEX];
      if (vd_i.vd_aH === undefined) vd_i.vd_aH = points.length - 1;
      vd_rk = vd_wJ(_sp, _ep, vd_rk, i === points.length - 1);
      vdgeo.vd_aZ(_sp, _ep);
    }
    vd_i.vd_aH = undefined;
  }
  this.GetEntityFromPoint = function (x, y, vd_mE, vd_bq) {
    var vd_b = vd_i.vd_c.vd_np();
    if (!vd_i.vd_be) return null;
    x = vdgeo.vd_r(x);
    y = vdgeo.vd_r(y);
    if (x < 0 || x >= vd_i.width) return null;
    if (y < 0 || y >= vd_i.height) return null;
    var vd_ga = Math.max(vdgeo.vd_r(vd_mE * 0.5), 1);
    var px, py;
    for (var ix = -vd_ga; ix <= vd_ga; ix++) {
      for (var iy = -vd_ga; iy <= vd_ga; iy++) {
        px = x + ix;
        py = y + iy;
        if (px < 0 || px >= vd_i.width || py < 0 || py >= vd_i.height) continue;
        var ipos = py * vd_i.width + px;
        var ret = vd_b[ipos][1];
        if (!ret) continue;
        for (var j = ret.length - 1; j >= 0; j--) {
          var fig = ret[j];
          if (vd_bq === false && fig.LayerRef && fig.LayerRef.Lock) continue;
          return fig;
        }
      }
    }
    return null;
  };
  function vd_mB(ix, iy, vd_bq, vd_b, ret) {
    ix = vdgeo.vd_r(ix + 0.49);
    iy = vdgeo.vd_r(iy + 0.49);
    var ipos = iy * vd_i.width + ix;
    var ret1 = vd_b[ipos][1];
    if (!ret1) return;
    for (var j = ret1.length - 1; j >= 0; j--) {
      var fig = ret1[j];
      if (vd_bq === false && fig.LayerRef && fig.LayerRef.Lock) continue;
      ret.push(fig);
    }
  }
  function vd_IF(x1, y1, x2, y2, vd_bq, vd_b, ret) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var temp, k, yt, xs, xt, ys;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        temp = x1;
        x1 = x2;
        x2 = temp;
        temp = y1;
        y1 = y2;
        y2 = temp;
        dy *= -1.0;
        dx *= -1.0;
      }
      if (vdgeo.AreEqual(dx, 0.0, 0.5)) {
        vd_mB(x1, y1, vd_bq, vd_b, ret);
        vd_mB(x2, y2, vd_bq, vd_b, ret);
        return;
      }
      k = dy / dx;
      yt = y1;
      for (xs = x1; xs <= x2; xs++) {
        vd_mB(xs, yt, vd_bq, vd_b, ret);
        yt += k;
      }
    } else {
      if (dy < 0) {
        temp = x1;
        x1 = x2;
        x2 = temp;
        temp = y1;
        y1 = y2;
        y2 = temp;
        dy *= -1.0;
        dx *= -1.0;
      }
      if (vdgeo.AreEqual(dy, 0.0, 0.5)) {
        vd_mB(x1, y1, vd_bq, vd_b, ret);
        vd_mB(x2, y2, vd_bq, vd_b, ret);
        return;
      }
      k = dx / dy;
      xt = x1;
      for (ys = y1; ys <= y2; ys++) {
        vd_mB(xt, ys, vd_bq, vd_b, ret);
        xt += k;
      }
    }
  }
  this.GetEntitiesFence = function (vd_jZ, vd_bq) {
    var ret = [];
    var vd_b = vd_i.vd_c.vd_np();
    if (!vd_i.vd_be) return ret;
    var sp = vd_jZ[0];
    var vd_xd = vdgeo.newpoint(0, 0, 0);
    var vd_vw = vdgeo.newpoint(0, 0, 0);
    for (var i = 1; i < vd_jZ.length; i++) {
      var ep = vd_jZ[i];
      var vd_vo = vd_yQ(sp, ep, vd_xd, vd_vw);
      if (vd_vo === 1) return;
      vd_IF(vd_xd[X], vd_xd[Y], vd_vw[X], vd_vw[Y], vd_bq, vd_b, ret);
      sp = ep;
    }
    if (ret.length === 0) return ret;
    ret.sort(function (a, b) {
      return a.HandleId - b.HandleId;
    });
    var vd_hQ = [ret[0]];
    for (var k = 0; k < ret.length; k++) {
      if (vd_hQ[vd_hQ.length - 1] === ret[k]) continue;
      vd_hQ.push(ret[k]);
    }
    return vd_hQ;
  };
  this.GetEntitiesFromBox = function (xmin, ymin, xmax, ymax, vd_bq) {
    var ret = [];
    var vd_b = vd_i.vd_c.vd_np();
    if (!vd_i.vd_be) return ret;
    var tmp;
    if (xmin > xmax) {
      tmp = xmin;
      xmin = xmax;
      xmax = tmp;
    }
    if (ymin > ymax) {
      tmp = ymin;
      ymin = ymax;
      ymax = tmp;
    }
    xmin = vdgeo.vd_r(Math.min(Math.max(xmin, 0), vd_i.width - 1));
    xmax = vdgeo.vd_r(Math.min(Math.max(xmax, 0), vd_i.width - 1));
    ymin = vdgeo.vd_r(Math.min(Math.max(ymin, 0), vd_i.height - 1));
    ymax = vdgeo.vd_r(Math.min(Math.max(ymax, 0), vd_i.height - 1));
    for (var ix = xmin; ix <= xmax; ix++) {
      for (var iy = ymin; iy <= ymax; iy++) {
        var ipos = iy * vd_i.width + ix;
        var ret1 = vd_b[ipos][1];
        if (!ret1) continue;
        for (var j = ret1.length - 1; j >= 0; j--) {
          var fig = ret1[j];
          if (vd_bq === false && fig.LayerRef && fig.LayerRef.Lock) continue;
          ret.push(fig);
        }
      }
    }
    if (ret.length === 0) return ret;
    ret.sort(function (a, b) {
      return a.HandleId - b.HandleId;
    });
    var vd_hQ = [ret[0]];
    for (var k = 0; k < ret.length; k++) {
      if (vd_hQ[vd_hQ.length - 1] === ret[k]) continue;
      vd_hQ.push(ret[k]);
    }
    return vd_hQ;
  };
  this.GetEntitiesInWindowBox = function (xmin, ymin, xmax, ymax, vd_bq) {
    var tmp;
    if (xmin > xmax) {
      tmp = xmin;
      xmin = xmax;
      xmax = tmp;
    }
    if (ymin > ymax) {
      tmp = ymin;
      ymin = ymax;
      ymax = tmp;
    }
    xmin = vdgeo.vd_r(Math.min(Math.max(xmin, 0), vd_i.width - 1));
    xmax = vdgeo.vd_r(Math.min(Math.max(xmax, 0), vd_i.width - 1));
    ymin = vdgeo.vd_r(Math.min(Math.max(ymin, 0), vd_i.height - 1));
    ymax = vdgeo.vd_r(Math.min(Math.max(ymax, 0), vd_i.height - 1));
    var vd_mY = vd_i.GetEntitiesFromBox(xmin, ymin, xmax, ymax, vd_bq);
    if (vd_mY.length === 0) return vd_mY;
    var vd_b = vd_i.vd_c.vd_np();
    for (var iy = 0; iy < vd_i.height; iy++) {
      for (var ix = 0; ix < vd_i.width; ix++) {
        if (vdgeo.vd_nB(ix, iy, xmin, ymin, xmax, ymax)) continue;
        var ipos = iy * vd_i.width + ix;
        var ret1 = vd_b[ipos][1];
        if (!ret1) continue;
        for (var j = 0; j < ret1.length; j++) {
          for (var k = 0; k < vd_mY.length; k++) {
            if (vd_mY[k] == ret1[j]) {
              vd_mY.splice(k, 1);
              k--;
            }
          }
        }
      }
    }
    return vd_mY;
  };
  return this;
}
function vd_Lo() {
  var vd_i = this;
  var document = null;
  this.SelectDocument = function (vd_C) {
    document = vd_C;
    if (!document.Groups) document.Groups = { IgnoreGroups: false, Items: [] };
    var groups = document.Groups;
    if (groups.IgnoreGroups === undefined) groups.IgnoreGroups = false;
    if (groups.Items.length == 0) return;
    for (var i = 0; i < groups.Items.length; i++) {
      var group = groups.Items[i];
      var h = "h_" + group.HandleId.toString();
      for (var i2 = 0; i2 < group.Items.length; i2++) {
        var vd_yH = group.Items[i2];
        var vd_jO = document[vd_yH];
        if (!vd_jO) continue;
        if (!vd_jO._groups) vd_jO._groups = {};
        vd_jO._groups[h] = 1;
      }
    }
  };
  this.vd_DV = function (fig, vd_bx, vd_wV) {
    if (!fig) return;
    if (fig.selected == true) return;
    if (fig.vd_CN) return;
    fig.vd_CN = true;
    vd_bx.push(fig);
    if (!vd_i.IgnoreGroups && fig._groups) {
      for (var vd_vn in fig._groups) {
        var group = document.Groups.Items[document.Groups[vd_vn]];
        if (!group || group == vd_wV) continue;
        if (group.Selectable === false) continue;
        for (var i2 = 0; i2 < group.Items.length; i2++) {
          var fig2 = document[group.Items[i2]];
          vd_i.vd_DV(fig2, vd_bx, group);
        }
      }
    }
  };
  this.vd_pz = function (vd_rS, vd_bx, vd_Gs, vd_wV) {
    if (!vd_rS) return;
    var index = vd_bx.indexOf(vd_rS);
    if (vd_Gs) {
      if (index < 0) return;
      vd_bx.splice(index, 1);
    } else {
      if (index >= 0) return;
      vd_bx.push(vd_rS);
    }
    var fig = document[vd_rS];
    if (!fig || vd_i.IgnoreGroups || !fig._groups) return;
    for (var vd_vn in fig._groups) {
      var group = document.Groups.Items[document.Groups[vd_vn]];
      if (!group || group == vd_wV) continue;
      if (group.Selectable === false) continue;
      for (var i2 = 0; i2 < group.Items.length; i2++) {
        vd_i.vd_pz(group.Items[i2], vd_bx, vd_Gs, group);
      }
    }
  };
  Object.defineProperty(vd_i, "IgnoreGroups", {
    get: function () {
      return document.Groups.IgnoreGroups;
    },
    set: function (newValue) {
      document.Groups.IgnoreGroups = newValue;
    },
  });
  function Find(name) {
    name = name.toLowerCase();
    for (var i = 0; i < document.Groups.Items.length; i++) {
      var group = document.Groups.Items[i];
      var vd_gP = group.Name.toLowerCase();
      if (vd_gP == name) return group;
    }
    return null;
  }
  function vd_LE(group, item) {
    var h = "h_" + item.HandleId.toString();
    return group.Items.indexOf(h);
  }
  this.ClearGroup = function (vd_gm) {
    var group = Find(vd_gm);
    if (!group) return;
    var g_h = "h_" + group.HandleId.toString();
    for (var i = 0; i < group.Items.length; i++) {
      var fig = document[group.Items[i]];
      if (!fig) continue;
      if (!fig._groups[g_h]) continue;
      delete fig._groups[g_h];
    }
    group.Items = [];
  };
  this.AddItem = function (vd_gm, item) {
    if (!item || !item.HandleId) return false;
    var group = Find(vd_gm);
    var g_h;
    if (!group) {
      group = {
        _t: vdConst.vdGroup_code,
        HandleId: vdConst.vd_vJ(document),
        Name: vd_gm,
        Items: [],
      };
      document.Groups.Items.push(group);
      g_h = "h_" + group.HandleId.toString();
      document.Groups[g_h] = document.Groups.Items.length - 1;
    } else {
      g_h = "h_" + group.HandleId.toString();
    }
    if (item._groups && item._groups[g_h]) return true;
    if (!item._groups) item._groups = {};
    item._groups[g_h] = 1;
    group.Items.push("h_" + item.HandleId.toString());
    return true;
  };
  this.RemoveItem = function (vd_gm, item) {
    if (!item || !item.HandleId) return false;
    var group = Find(vd_gm);
    if (!group) return false;
    var g_h = "h_" + group.HandleId.toString();
    if (!item._groups || !item._groups[g_h]) return false;
    delete item._groups[g_h];
    var index = vd_LE(group, item);
    if (index < 0) return false;
    group.Items.splice(index, 1);
    return true;
  };
  this.EnableGroup = function (vd_gm, enable) {
    var group = Find(vd_gm);
    if (!group) return;
    group.Selectable = enable;
  };
  this.GetEntities = function (vd_gm) {
    var group = Find(vd_gm);
    if (!group) return null;
    var ret = [];
    for (var i2 = 0; i2 < group.Items.length; i2++) {
      var vd_yH = group.Items[i2];
      var vd_jO = document[vd_yH];
      if (!vd_jO) continue;
      ret.push(vd_jO);
    }
    return ret;
  };
  return this;
}
vdConst.vd_ts = 1;
vdConst.vd_lX = 2;
vdConst.vd_qW = 3;
vdConst.vd_qz = 4;
vdConst.vd_nQ = 5;
vdConst.vd_Qc = 6;
vdConst.vd_PX = 0;
vdConst.vd_pw = 1;
vdConst.vd_uu = 2;
vdConst.vd_qS = 4;
vdConst.vd_qm = 8;
vdConst.vd_Qf = 12;
vdConst.vd_AR = 0;
vdConst.vd_DD = 1;
vdConst.vd_DE = 2;
vdConst.vd_Gd = 3;
vdConst.vd_FH = 4;
vdConst.vd_HD = 0;
vdConst.vd_uK = 1;
vdConst.vd_uL = 2;
vdConst.vd_Qn = 3;
vdConst.vd_Hg = 1;
vdConst.vd_HC = 0;
vdConst.vd_ra = String.fromCharCode(176);
vdConst.vd_QM = "d";
function vd_MT(vd_oO, vd_qB, vd_qT) {
  var vd_i = this;
  if (vd_oO == undefined) this.type = vdConst.vd_lX;
  else this.type = vd_oO;
  if (vd_qB == undefined) this.precision = 4;
  else this.precision = vd_qB;
  if (vd_qT == undefined) this.vd_bV = vdConst.vd_pw;
  else this.vd_bV = vd_qT;
  this.vd_Ha = function (length) {
    var ret = "";
    var vd_st = 1.0 / Math.pow(10, vd_i.precision);
    if (vd_i.type == vdConst.vd_nQ || vd_i.type == vdConst.vd_qW)
      vd_st = 1.0 / Math.pow(2, vd_i.precision);
    if (vdgeo.AreEqual(length, 0, vd_st * 0.5)) length = 0.0;
    var vd_Pq = length < 0;
    length = Math.abs(length);
    switch (vd_i.type) {
      case vdConst.vd_ts:
        var prec = vd_i.precision;
        if (vdgeo.AreEqual(length, vdgeo.vd_r(length), vd_st)) prec = 0;
        ret = length.toExponential(prec);
        if ((vd_i.vd_bV & vdConst.vd_qS) != 0) {
          while (ret.charAt(0) == "0") ret = ret.substr(0, 1);
        }
        if ((vd_i.vd_bV & vdConst.vd_qm) != 0) {
          var vd_eW = ret.indexOf(".");
          if (vd_eW >= 0) {
            while (ret.charAt(ret.length - 1) == "0")
              ret = ret.substr(0, ret.length - 1);
            if (ret.charAt(ret.length - 1) == ".")
              ret = ret.substr(0, ret.length - 1);
          }
        }
        break;
      case vdConst.vd_lX:
        ret = length.toFixed(vd_i.precision);
        if ((vd_i.vd_bV & vdConst.vd_qS) != 0) {
          while (ret.charAt(0) == "0") ret = ret.substr(0, 1);
        }
        if ((vd_i.vd_bV & vdConst.vd_qm) != 0) {
          var vd_eW = ret.indexOf(".");
          if (vd_eW >= 0) {
            while (ret.charAt(ret.length - 1) == "0")
              ret = ret.substr(0, ret.length - 1);
            if (ret.charAt(ret.length - 1) == ".")
              ret = ret.substr(0, ret.length - 1);
          }
        }
        break;
      case vdConst.vd_qW:
        {
          var feet = vdgeo.vd_r(length / 12.0 + 0.000001);
          var vd_db = length - feet * 12.0;
          if (vdgeo.AreEqual(vd_db, 0, vdgeo.DefaultLinearEquality))
            vd_db = 0.0;
          if (vdgeo.AreEqual(vd_db, 0.0, vd_st)) {
            ret = feet.toString() + "'";
          } else {
            var vd_yl = feet.toString() + "'";
            if (feet == 0) vd_yl = "";
            ret = vd_db.toFixed(vd_i.precision);
            if ((vd_i.vd_bV & vdConst.vd_qS) != 0) {
              while (ret.charAt(0) == "0") ret = ret.substr(0, 1);
            }
            if ((vd_i.vd_bV & vdConst.vd_qm) != 0) {
              var vd_eW = ret.indexOf(".");
              if (vd_eW >= 0) {
                while (ret.charAt(ret.length - 1) == "0")
                  ret = ret.substr(0, ret.length - 1);
                if (ret.charAt(ret.length - 1) == ".")
                  ret = ret.substr(0, ret.length - 1);
              }
            }
            ret += '"';
            ret = (vd_yl != "" ? vd_yl + "-" : "") + ret;
          }
        }
        break;
      case vdConst.vd_qz:
        {
          var vd_fM = vdgeo.vd_r(Math.pow(2, vd_i.precision));
          var feet = vdgeo.vd_r(length / 12.0 + 0.000001);
          var vd_db = vdgeo.vd_r(length - feet * 12.0);
          if (vd_db == 12) {
            vd_db = 0;
            feet++;
          }
          var vd_fb = vdgeo.vd_r(
            (length - vd_db - feet * 12.0) * vd_fM + 0.5 / vd_fM + 0.4999
          );
          if (vd_fb == vd_fM) {
            vd_fb = 0;
            vd_db++;
            if (vd_db == 12) {
              vd_db = 0;
              feet++;
            }
          }
          while (
            vd_fb >= 2 &&
            vd_fb % 2.0 == 0.0 &&
            vd_fM >= 2 &&
            vd_fM % 2.0 == 0.0
          ) {
            vd_fb /= 2;
            vd_fM /= 2;
          }
          var vd_xF = feet.toString() + "'";
          var vd_ml = vd_db.toString() + " ";
          var vd_qZ = vd_fb.toString() + "/" + vd_fM.toString();
          if (vd_fb == 0) vd_qZ = "";
          if (feet == 0) vd_xF = "";
          if ((vd_i.vd_bV & vdConst.vd_uu) != 0 && vd_db == 0) {
            vd_ml = "";
          }
          ret = vd_xF;
          var vd_AB = vd_ml + vd_qZ;
          if (vd_xF != "" && vd_AB != "") ret += "-";
          ret += vd_AB;
          if (ret == "") ret = "0";
          if (vd_ml != "") ret += '"';
        }
        break;
      case vdConst.vd_nQ:
        {
          var vd_fM = vdgeo.vd_r(Math.pow(2, vd_i.precision));
          var vd_db = vdgeo.vd_r(length);
          var vd_fb = vdgeo.vd_r(
            (length - vd_db) * vd_fM + 0.5 / vd_fM + 0.4999
          );
          if (vd_fb == vd_fM) {
            vd_db++;
            vd_fb = 0;
          }
          while (
            vd_fb >= 2 &&
            vd_fb % 2.0 == 0.0 &&
            vd_fM >= 2 &&
            vd_fM % 2.0 == 0.0
          ) {
            vd_fb /= 2;
            vd_fM /= 2;
          }
          var vd_ml = vd_db.toString() + " ";
          var vd_qZ = vd_fb.toString() + "/" + vd_fM.toString();
          if (vd_fb == 0) vd_qZ = "";
          if ((vd_i.vd_bV & vdConst.vd_uu) != 0 && vd_db == 0) {
            vd_ml = "";
          }
          ret = vd_ml + vd_qZ;
          if (ret == "") ret = "0";
          ret += '"';
        }
        break;
      case vdConst.vd_Qc:
        ret = length.toString();
        if ((vd_i.vd_bV & vdConst.vd_qS) != 0) {
          while (ret.charAt(0) == "0") ret = ret.substr(0, 1);
        }
        if ((vd_i.vd_bV & vdConst.vd_qm) != 0) {
          var vd_eW = ret.indexOf(".");
          if (vd_eW >= 0) {
            while (ret.charAt(ret.length - 1) == "0")
              ret = ret.substr(0, ret.length - 1);
            if (ret.charAt(ret.length - 1) == ".")
              ret = ret.substr(0, ret.length - 1);
          }
        }
        break;
      default:
        ret = length.toString();
        if ((vd_i.vd_bV & vdConst.vd_qS) != 0) {
          while (ret.charAt(0) == "0") ret = ret.substr(0, 1);
        }
        if ((vd_i.vd_bV & vdConst.vd_qm) != 0) {
          var vd_eW = ret.indexOf(".");
          if (vd_eW >= 0) {
            while (ret.charAt(ret.length - 1) == "0")
              ret = ret.substr(0, ret.length - 1);
            if (ret.charAt(ret.length - 1) == ".")
              ret = ret.substr(0, ret.length - 1);
          }
        }
        break;
    }
    if (ret == "") ret = "0";
    ret = (vd_Pq ? "-" : "") + ret;
    if (ret.charAt(ret.length - 1) == ".") ret = ret.substr(0, ret.length - 1);
    return ret;
  };
  return this;
}
function vd_PI(vd_oO, vd_qB, vd_qT) {
  var vd_i = this;
  this.AngleBase = 0;
  this.Direction = vdConst.vd_HC;
  if (vd_oO == undefined) this.type = vdConst.vd_AR;
  else this.type = vd_oO;
  if (vd_qB == undefined) this.precision = 4;
  else this.precision = vd_qB;
  if (vd_qT == undefined) this.vd_bV = vdConst.vd_HD;
  else this.vd_bV = vd_qT;
  function vd_HZ(angle) {
    var ret = angle - vd_i.AngleBase;
    if (vd_i.Direction == vdConst.vd_Hg) ret = vdgeo.VD_TWOPI - ret;
    return vdgeo.FixAngle(ret);
  }
  this.vd_QB = function (value) {
    switch (vd_i.type) {
      case vdConst.vd_AR:
      case vdConst.vd_DD:
        return vdgeo.DegreesToRadians(value);
      case vdConst.vd_Gd:
        return value;
      case vdConst.vd_DE:
      case vdConst.vd_FH:
        return (value * vdgeo.PI) / 200.0;
      default:
        return value;
    }
  };
  this.vd_Qj = function (vd_NM) {
    var length = vd_HZ(vd_NM);
    var ret = "";
    length = vdgeo.RadiansToDegrees(length);
    length += vdgeo.DefaultAngularEquality;
    if (length > 360.0) length = length - 360.0;
    if (length < 0.0) length += 360.0;
    switch (vd_i.type) {
      case vdConst.vd_AR:
        ret = length.toFixed(vd_i.precision);
        if ((vd_i.vd_bV & vdConst.vd_uK) != 0) {
          while (ret.charAt(0) == "0") ret = ret.substr(0, 1);
        }
        if ((vd_i.vd_bV & vdConst.vd_uL) != 0) {
          var vd_eW = ret.indexOf(".");
          if (vd_eW >= 0) {
            while (ret.charAt(ret.length - 1) == "0")
              ret = ret.substr(0, ret.length - 1);
            if (ret.charAt(ret.length - 1) == ".")
              ret = ret.substr(0, ret.length - 1);
          }
        }
        ret = ret + vdConst.vd_ra;
        break;
      case vdConst.vd_DD:
        {
          var vd_jR = vdgeo.vd_r(length);
          var vd_hG = vdgeo.vd_r((length - vd_jR) * 60.0);
          var vd_qM = vdgeo.vd_r(
            0.5 + (length - (vd_jR * 1.0 + vd_hG / 60.0)) * 3600.0
          );
          if (vd_i.precision < 2) {
            vd_hG += vdgeo.vd_r(vd_qM / 31);
            vd_qM = 0;
          }
          if (precision < 1) {
            vd_jR += vdgeo.vd_r(vd_hG / 31);
            vd_hG = 0;
          }
          if (vd_qM >= 60) {
            vd_hG += 1;
            vd_qM = 0;
          }
          if (vd_hG >= 60) {
            vd_jR += 1;
            vd_hG = 0;
          }
          ret =
            vd_jR.toString() +
            vdConst.vd_ra +
            vd_hG.toString() +
            "'" +
            vd_qM.toString() +
            '"';
          if (vd_i.precision < 3)
            ret = vd_jR.toString() + vdConst.vd_ra + vd_hG.toString() + "'";
          if (vd_i.precision == 0) ret = vd_jR.toString() + vdConst.vd_ra;
        }
        break;
      case vdConst.vd_FH:
      case vdConst.vd_DE:
        length = (length * 200.0) / 180.0;
        ret = length.toFixed(vd_i.precision);
        if ((vd_i.vd_bV & vdConst.vd_uK) != 0) {
          while (ret.charAt(0) == "0") ret = ret.substr(0, 1);
        }
        if ((vd_i.vd_bV & vdConst.vd_uL) != 0) {
          var vd_eW = ret.indexOf(".");
          if (vd_eW >= 0) {
            while (ret.charAt(ret.length - 1) == "0")
              ret = ret.substr(0, ret.length - 1);
            if (ret.charAt(ret.length - 1) == ".")
              ret = ret.substr(0, ret.length - 1);
          }
        }
        ret = ret + "g";
        break;
      case vd_Ru.vd_Gd:
        length = vdgeo.DegreesToRadians(length);
        ret = length.toFixed(vd_i.precision);
        if ((vd_i.vd_bV & vdConst.vd_uK) != 0) {
          while (ret.charAt(0) == "0") ret = ret.substr(0, 1);
        }
        if ((vd_i.vd_bV & vdConst.vd_uL) != 0) {
          var vd_eW = ret.indexOf(".");
          if (vd_eW >= 0) {
            while (ret.charAt(ret.length - 1) == "0")
              ret = ret.substr(0, ret.length - 1);
            if (ret.charAt(ret.length - 1) == ".")
              ret = ret.substr(0, ret.length - 1);
          }
        }
        ret = ret + "r";
        break;
      default:
        break;
    }
    return ret;
  };
  return this;
}
vdConst.vd_nS = 0;
vdConst.vd_jY = 1;
vdConst.vd_ni = 1;
vdConst.vd_Bb = 0;
vdConst.vd_sw = 0;
vdConst.vd_Ao = 1;
function vddimmanager() {
  var vd_i = this;
  var DefPoint1;
  var DefPoint2;
  var LinePosition;
  var PostString;
  var vd_hU = vdConst.vd_jY;
  var vd_iF = "tick";
  var vd_mJ = "";
  var vd_jo = 0.2;
  var vd_dK = new vd_MT(vdConst.vd_lX, 4, vdConst.vd_pw);
  var vd_kn = vdConst.colorFromString("byblock");
  var vd_lL = vdConst.colorFromString("byblock");
  var vd_nd = vdConst.colorFromString("byblock");
  var vd_qd = "";
  var vd_lu = vdConst.vd_sw;
  var vd_mb = vdConst.vd_ni;
  var ScaleFactor = 1.0;
  var LinearScaleFactor = 1.0;
  var HorizontalRotation = 0.0;
  var rotation = 0;
  var vd_rX = 0;
  var vd_uU = 0;
  var vd_tQ = 0;
  var vd_tn = 0;
  function vd_Ag() {
    if (vd_rX == 0) return vd_jo;
    return vd_rX;
  }
  function ExtLineDist1() {
    if (vd_uU == 0) return vd_jo;
    return vd_uU;
  }
  function ExtLineDist2() {
    if (vd_tQ == 0) return vd_jo * 0.0625;
    return vd_tQ;
  }
  function TextDist() {
    if (vd_tn == 0) return vd_jo * 0.09;
    return vd_tn;
  }
  Object.defineProperty(vd_i, "HORROT", {
    get: function () {
      return String(HorizontalRotation);
    },
    set: function (newValue) {
      HorizontalRotation = Number(newValue);
    },
  });
  Object.defineProperty(vd_i, "ROTATION", {
    get: function () {
      return String(vdgeo.RadiansToDegrees(rotation));
    },
    set: function (newValue) {
      rotation = Number(vdgeo.DegreesToRadians(newValue));
    },
  });
  Object.defineProperty(vd_i, "BSIZE", {
    get: function () {
      return String(vd_Ag());
    },
    set: function (newValue) {
      vd_rX = Number(newValue);
    },
  });
  Object.defineProperty(vd_i, "XLD1", {
    get: function () {
      return String(ExtLineDist1());
    },
    set: function (newValue) {
      vd_uU = Number(newValue);
    },
  });
  Object.defineProperty(vd_i, "XLD2", {
    get: function () {
      return String(ExtLineDist2());
    },
    set: function (newValue) {
      vd_tQ = Number(newValue);
    },
  });
  Object.defineProperty(vd_i, "TXTDIST", {
    get: function () {
      return String(TextDist());
    },
    set: function (newValue) {
      vd_tn = Number(newValue);
    },
  });
  Object.defineProperty(vd_i, "LSCALE", {
    get: function () {
      return String(LinearScaleFactor);
    },
    set: function (newValue) {
      LinearScaleFactor = Number(newValue);
    },
  });
  Object.defineProperty(vd_i, "TYPE", {
    get: function () {
      switch (vd_hU) {
        case vdConst.vd_jY:
          return "ALIGN";
        case vdConst.vd_nS:
          if (vdgeo.AreEqual(rotation, 0.0, vdgeo.DefaultAngularEquality))
            return "HOR";
          else if (
            vdgeo.AreEqual(
              rotation,
              vdgeo.HALF_PI,
              vdgeo.DefaultAngularEquality
            )
          )
            return "VER";
          else return "ROTATED";
        default:
          return "ALIGN";
      }
    },
    set: function (newValue) {
      newValue = newValue.toUpperCase();
      if (newValue == "ALIGN") vd_hU = vdConst.vd_jY;
      else if (newValue == "VER") {
        vd_hU = vdConst.vd_nS;
        rotation = vdgeo.HALF_PI;
      } else if (newValue == "HOR") {
        vd_hU = vdConst.vd_nS;
        rotation = 0;
      } else vd_hU = vdConst.vd_jY;
    },
  });
  Object.defineProperty(vd_i, "TSTYLE", {
    get: function () {
      return vd_mJ;
    },
    set: function (newValue) {
      vd_mJ = newValue;
    },
  });
  Object.defineProperty(vd_i, "BLK", {
    get: function () {
      return vd_iF;
    },
    set: function (newValue) {
      vd_iF = newValue;
    },
  });
  Object.defineProperty(vd_i, "TEXTH", {
    get: function () {
      return String(vd_jo);
    },
    set: function (newValue) {
      vd_jo = Number(newValue);
    },
  });
  Object.defineProperty(vd_i, "LUNITS", {
    get: function () {
      switch (vd_dK.type) {
        case vdConst.vd_ts:
          return "SC";
        case vdConst.vd_lX:
          return "DEC";
        case vdConst.vd_qW:
          return "ENG";
        case vdConst.vd_qz:
          return "ARC";
        case vdConst.vd_nQ:
          return "FRAC";
        default:
          return "DEC";
      }
    },
    set: function (newValue) {
      newValue = newValue.toUpperCase();
      if (newValue == "SC") vd_dK.type = vdConst.vd_ts;
      else if (newValue == "DEC") vd_dK.type = vdConst.vd_lX;
      else if (newValue == "ENG") vd_dK.type = vdConst.vd_qW;
      else if (newValue == "ARC") vd_dK.type = vdConst.vd_qz;
      else if (newValue == "FRAC") vd_dK.type = vdConst.vd_nQ;
      else vd_dK.type = vdConst.vd_lX;
    },
  });
  Object.defineProperty(vd_i, "PREC", {
    get: function () {
      return String(vd_dK.precision);
    },
    set: function (newValue) {
      vd_dK.precision = Number(newValue);
    },
  });
  Object.defineProperty(vd_i, "SZEROS", {
    get: function () {
      return vd_dK.vd_bV == vdConst.vd_pw ? "0" : "1";
    },
    set: function (newValue) {
      vd_dK.vd_bV =
        Number(newValue) != 0 ? vdConst.vd_Qf | vdConst.vd_uu : vdConst.vd_pw;
    },
  });
  Object.defineProperty(vd_i, "LINECOLOR", {
    get: function () {
      return vdConst.colorToString(vd_kn);
    },
    set: function (newValue) {
      vd_kn = vdConst.colorFromString(newValue);
    },
  });
  Object.defineProperty(vd_i, "EXTCOLOR", {
    get: function () {
      return vdConst.colorToString(vd_lL);
    },
    set: function (newValue) {
      vd_lL = vdConst.colorFromString(newValue);
    },
  });
  Object.defineProperty(vd_i, "TEXTCOLOR", {
    get: function () {
      return vdConst.colorToString(vd_nd);
    },
    set: function (newValue) {
      vd_nd = vdConst.colorFromString(newValue);
    },
  });
  Object.defineProperty(vd_i, "DIMTEXT", {
    get: function () {
      return vd_qd;
    },
    set: function (newValue) {
      vd_qd = newValue;
    },
  });
  Object.defineProperty(vd_i, "TEXTHORROT", {
    get: function () {
      switch (vd_lu) {
        case vdConst.vd_sw:
          return "ALIGN";
        case vdConst.vd_Ao:
          return "HORIZONTAL";
        default:
          return "ALIGN";
      }
    },
    set: function (newValue) {
      newValue = newValue.toUpperCase();
      if (newValue == "ALIGN") vd_lu = vdConst.vd_sw;
      else if (newValue == "HORIZONTAL") vd_lu = vdConst.vd_Ao;
      else vd_lu = vdConst.vd_sw;
    },
  });
  Object.defineProperty(vd_i, "TEXTVERJUST", {
    get: function () {
      switch (vd_mb) {
        case vdConst.vd_ni:
          return "ABOVE";
        case vdConst.vd_Bb:
          return "CENTER";
        default:
          return "ABOVE";
      }
    },
    set: function (newValue) {
      newValue = newValue.toUpperCase();
      if (newValue == "ABOVE") vd_mb = vdConst.vd_ni;
      else if (newValue == "CENTER") vd_mb = vdConst.vd_Bb;
      else vd_mb = vdConst.vd_ni;
    },
  });
  function vd_NW(vdcanvas, vd_C) {
    var entities = [];
    var blockref = vdcanvas.AddBlockSymbol(
      vd_iF,
      [0, 0, 0],
      1.0,
      0.0,
      false,
      {}
    );
    if (blockref) {
      entities.push(blockref);
    } else if (vd_iF.toLowerCase() == "arrow") {
      var hp = vd_C.ActiveHatchProperties;
      vdcanvas.SetActiveHatchProperties(
        vdcanvas.createNewHatchProperties("solid")
      );
      entities.push(
        vdcanvas.AddPolyline(
          [
            [0, 0],
            [-2.0, -0.4],
            [-2.0, 0.4],
            [0, 0],
          ],
          false,
          {}
        )
      );
      vdcanvas.SetActiveHatchProperties(hp);
    } else if (vd_iF.toLowerCase() == "tick") {
      entities.push(vdcanvas.AddLine([-1, 0, 0], [1, 0, 0], false, {}));
      entities.push(vdcanvas.AddLine([-1, -1, 0], [1, 1, 0], false, {}));
    } else {
    }
    return entities;
  }
  function vd_Na() {
    var p1 = vdgeo.newpoint(0, 0, 0);
    var p2 = vdgeo.newpoint(0, 0, 0);
    var p3 = vdgeo.newpoint(0, 0, 0);
    var p4 = vdgeo.newpoint(0, 0, 0);
    var tmpP = vdgeo.newpoint(0, 0, 0);
    var length = 0.0;
    switch (vd_hU) {
      case vdConst.vd_jY:
        length = vdgeo.Distance3D(DefPoint1, DefPoint2);
        break;
      case vdConst.vd_nS:
        p4 = vdgeo.pointPolar(DefPoint1, rotation + vdgeo.HALF_PI, 1.0);
        p3 = vdgeo.pointPolar(LinePosition, rotation, 1.0);
        if (
          vdgeo.vd_gu(
            DefPoint1,
            p4,
            LinePosition,
            p3,
            vdgeo.DefaultVectorEquality,
            p3
          ) != 1
        )
          break;
        tmpP = vdgeo.pointPolar(DefPoint2, rotation + vdgeo.HALF_PI, 1.0);
        p4 = vdgeo.pointPolar(LinePosition, rotation, 1.0);
        if (
          vdgeo.vd_gu(
            LinePosition,
            p4,
            DefPoint2,
            tmpP,
            vdgeo.DefaultVectorEquality,
            p4
          ) == 0
        ) {
          vdgeo.vd_aZ(p4, p3);
        }
        length = vdgeo.Distance2D(p3, p4);
        break;
      default:
        break;
    }
    return length;
  }
  function vd_CM(vd_Nw) {
    var str = vd_Nw;
    if (str == "" || str == "<>") {
      var length = vd_Na();
      length *= LinearScaleFactor;
      var vd_AQ = "";
      var vd_wc = "";
      var post = PostString;
      var pos = post.indexOf("<>");
      if (pos == -1) {
        vd_wc = post;
      } else {
        vd_AQ = post.substr(0, pos);
        vd_wc = post.substr(pos + 2);
      }
      str = vd_dK.vd_Ha(length);
      str = vd_AQ + str + vd_wc;
    } else {
      var vd_xD = "";
      var vd_xD = vd_CM(vd_xD);
      while (str.indexOf("<>") > -1) {
        str = str.replace("<>", vd_xD);
      }
    }
    return str;
  }
  function vd_zR(vdcanvas, vd_C) {
    var p11, p22, lp1, p1, p2;
    switch (vd_hU) {
      case vdConst.vd_jY:
        return vd_za(
          vdcanvas,
          vd_C,
          DefPoint1,
          DefPoint2,
          DefPoint1,
          DefPoint2,
          LinePosition
        );
      case vdConst.vd_nS:
        p11 = vdgeo.newpoint();
        p22 = vdgeo.newpoint();
        lp1 = vdgeo.pointPolar(LinePosition, rotation, 1.0);
        p1 = vdgeo.pointPolar(DefPoint1, rotation + vdgeo.HALF_PI, 1.0);
        p2 = vdgeo.pointPolar(DefPoint2, rotation + vdgeo.HALF_PI, 1.0);
        vdgeo.vd_aZ(p11, DefPoint1);
        vdgeo.vd_aZ(p22, DefPoint2);
        vdgeo.vd_gu(
          LinePosition,
          lp1,
          DefPoint1,
          p1,
          vdgeo.DefaultVectorEquality,
          p11
        );
        vdgeo.vd_gu(
          LinePosition,
          lp1,
          DefPoint2,
          p2,
          vdgeo.DefaultVectorEquality,
          p22
        );
        return vd_za(
          vdcanvas,
          vd_C,
          p11,
          p22,
          DefPoint1,
          DefPoint2,
          LinePosition
        );
      default:
        return null;
    }
    return null;
  }
  function vd_za(vdcanvas, vd_C, vd_lc, vd_sn, vd_PY, vd_PN, vd_Ae) {
    var line = null;
    var mat = vdgeo.vd_Q();
    var angle = vdgeo.GetAngle(vd_lc, vd_sn);
    vdgeo.vd_j(mat, -vd_lc[X], -vd_lc[Y], -vd_lc[Z]);
    vdgeo.vd_ap(mat, -angle);
    var p1 = vdgeo.matrixtransform(mat, vd_lc);
    var p2 = vdgeo.matrixtransform(mat, vd_sn);
    var lpos = vdgeo.matrixtransform(mat, vd_Ae);
    var vd_uq = vdgeo.matrixtransform(mat, vd_PY);
    var vd_tR = vdgeo.matrixtransform(mat, vd_PN);
    var offset = lpos[Y] - p1[Y];
    var p11 = vdgeo.newpoint(p1[X], p1[Y], p1[Z]);
    p11[Y] += offset;
    var p22 = vdgeo.newpoint(p2[X], p2[Y], p2[Z]);
    p22[Y] += offset;
    var vd_zm = 1.0;
    var vd_As = 1.0;
    if (lpos[Y] - vd_uq[Y] < 0.0) vd_zm = -1.0;
    if (lpos[Y] - vd_tR[Y] < 0.0) vd_As = -1.0;
    var vd_yN = vdgeo.newpoint(
      vd_uq[X],
      vd_uq[Y] + ExtLineDist2() * vd_zm * ScaleFactor,
      vd_uq[Z]
    );
    var vd_yp = vdgeo.newpoint(
      p11[X],
      p11[Y] + ExtLineDist1() * vd_zm * ScaleFactor,
      p11[Z]
    );
    var vd_yq = vdgeo.newpoint(
      vd_tR[X],
      vd_tR[Y] + ExtLineDist2() * vd_As * ScaleFactor,
      vd_tR[Z]
    );
    var vd_xU = vdgeo.newpoint(
      p22[X],
      p22[Y] + ExtLineDist1() * vd_As * ScaleFactor,
      p22[Z]
    );
    var vd_nH = 0.0;
    var vd_Cs = vdgeo.FixAngle(angle - (2 * vdgeo.PI - HorizontalRotation));
    vd_nH =
      vd_Cs > vdgeo.HALF_PI && vd_Cs <= 3.000001 * vdgeo.HALF_PI
        ? (vd_nH = vdgeo.PI)
        : 0.0;
    if (vd_lu == vdConst.vd_Ao) vd_nH = -(angle + HorizontalRotation);
    var tp = vdgeo.MidPoint(p11, p22);
    if (vd_mb == vdConst.vd_ni)
      tp = vdgeo.pointPolar(
        tp,
        vd_nH + vdgeo.HALF_PI,
        TextDist() * ScaleFactor
      );
    vdgeo.vd_me(mat);
    p11 = vdgeo.matrixtransform(mat, p11);
    p22 = vdgeo.matrixtransform(mat, p22);
    tp = vdgeo.matrixtransform(mat, tp);
    vd_yN = vdgeo.matrixtransform(mat, vd_yN);
    vd_yp = vdgeo.matrixtransform(mat, vd_yp);
    vd_yq = vdgeo.matrixtransform(mat, vd_yq);
    vd_xU = vdgeo.matrixtransform(mat, vd_xU);
    var vd_lU = vdConst.VdConstVerJust_VdTextVerCen;
    if (vd_mb == vdConst.vd_ni) vd_lU = vdConst.VdConstVerJust_VdTextVerBottom;
    var vd_gA = [];
    var vd_wq = vdcanvas.GetActivePenColor();
    if (vd_kn) vdcanvas.SetActivePenColor(vd_kn);
    var vd_hR = vdcanvas.AddLine(p11, p22, false, {});
    vd_gA.push(vd_hR);
    var block = vd_NW(vdcanvas, vd_C);
    if (block.length > 0) {
      var scale = vd_Ag() * ScaleFactor;
      mat = vdgeo.vd_Q();
      vdgeo.vd_bf(mat, scale, scale, scale);
      vdgeo.vd_ap(mat, vdgeo.GetAngle(p22, p11));
      vdgeo.vd_j(mat, p11[X], p11[Y], p11[Z]);
      for (var i = 0; i < block.length; i++) {
        var ent = vdConst.cloneEntity(block[i]);
        vd_q.vd_ef(mat, ent, vdcanvas);
        vd_gA.push(ent);
      }
      mat = vdgeo.vd_Q();
      vdgeo.vd_bf(mat, scale, scale, scale);
      vdgeo.vd_ap(mat, vdgeo.GetAngle(p11, p22));
      vdgeo.vd_j(mat, p22[X], p22[Y], p22[Z]);
      for (var i = 0; i < block.length; i++) {
        var ent = vdConst.cloneEntity(block[i]);
        vd_q.vd_ef(mat, ent, vdcanvas);
        vd_gA.push(ent);
      }
    }
    vdcanvas.SetActivePenColor(vd_wq);
    if (vd_lL) vdcanvas.SetActivePenColor(vd_lL);
    var vd_Jh = vdcanvas.AddLine(vd_yN, vd_yp, false, {});
    var vd_JJ = vdcanvas.AddLine(vd_yq, vd_xU, false, {});
    vd_gA.push(vd_Jh);
    vd_gA.push(vd_JJ);
    vdcanvas.SetActivePenColor(vd_wq);
    if (vd_nd) vdcanvas.SetActivePenColor(vd_nd);
    var vd_Oz = vd_C.ActiveTextStyle;
    var vd_nA = vdcanvas.FindTextStyle(vd_mJ);
    if (vd_nA) vdcanvas.SetActiveTextStyle(vd_nA);
    var text = vdcanvas.AddText(
      vd_CM(vd_qd),
      vd_jo * ScaleFactor,
      tp,
      vdConst.VdConstHorJust_VdTextHorCenter,
      vd_lU,
      vd_nH + angle,
      false,
      {}
    );
    vd_C.ActiveTextStyle = vd_Oz;
    vd_gA.push(text);
    vdcanvas.SetActivePenColor(vd_wq);
    var ints = vd_Lp(vdcanvas, vd_hR, text, vd_gA);
    if (ints.length > 0) {
      p11 = vd_hR.StartPoint;
      p22 = vd_hR.EndPoint;
      angle = vdgeo.GetAngle(p11, p22);
      vd_hR.EndPoint = vdgeo.pointPolar(
        vd_hR.StartPoint,
        angle,
        ints[0] - TextDist() * ScaleFactor
      );
      if (vd_kn) vdcanvas.SetActivePenColor(vd_kn);
      vd_hR = vdcanvas.AddLine(
        vdgeo.pointPolar(
          vd_hR.StartPoint,
          angle,
          ints[ints.length - 1] + TextDist() * ScaleFactor
        ),
        p22,
        false,
        {}
      );
      vd_gA.push(vd_hR);
    }
    return vd_gA;
  }
  function vd_Lp(vdcanvas, line, vd_eK, vd_gA) {
    vdcanvas.GetEntityBBox(vd_eK);
    var p1 = vdgeo.matrixtransform(vd_eK.EcsMatrix, [
      vd_eK.tb[0],
      vd_eK.tb[2],
      0,
    ]);
    var p2 = vdgeo.matrixtransform(vd_eK.EcsMatrix, [
      vd_eK.tb[0],
      vd_eK.tb[3],
      0,
    ]);
    var p3 = vdgeo.matrixtransform(vd_eK.EcsMatrix, [
      vd_eK.tb[1],
      vd_eK.tb[3],
      0,
    ]);
    var p4 = vdgeo.matrixtransform(vd_eK.EcsMatrix, [
      vd_eK.tb[1],
      vd_eK.tb[2],
      0,
    ]);
    var i = vdgeo.newpoint(0, 0, 0);
    var ints = [];
    if (
      vdgeo.vd_gu(
        line.StartPoint,
        line.EndPoint,
        p1,
        p2,
        vdgeo.DefaultVectorEquality,
        i
      ) == 1 &&
      vdgeo.vd_jA(i, line.StartPoint, line.EndPoint) &&
      vdgeo.vd_jA(i, p1, p2)
    )
      ints.push(vdgeo.Distance3D(line.StartPoint, i));
    if (
      vdgeo.vd_gu(
        line.StartPoint,
        line.EndPoint,
        p2,
        p3,
        vdgeo.DefaultVectorEquality,
        i
      ) == 1 &&
      vdgeo.vd_jA(i, line.StartPoint, line.EndPoint) &&
      vdgeo.vd_jA(i, p2, p3)
    )
      ints.push(vdgeo.Distance3D(line.StartPoint, i));
    if (
      vdgeo.vd_gu(
        line.StartPoint,
        line.EndPoint,
        p3,
        p4,
        vdgeo.DefaultVectorEquality,
        i
      ) == 1 &&
      vdgeo.vd_jA(i, line.StartPoint, line.EndPoint) &&
      vdgeo.vd_jA(i, p3, p4)
    )
      ints.push(vdgeo.Distance3D(line.StartPoint, i));
    if (
      vdgeo.vd_gu(
        line.StartPoint,
        line.EndPoint,
        p4,
        p1,
        vdgeo.DefaultVectorEquality,
        i
      ) == 1 &&
      vdgeo.vd_jA(i, line.StartPoint, line.EndPoint) &&
      vdgeo.vd_jA(i, p4, p1)
    )
      ints.push(vdgeo.Distance3D(line.StartPoint, i));
    if (ints.length == 0) return ints;
    ints.sort(function (a, b) {
      return a - b;
    });
    return ints;
  }
  this.Create = function (vdcanvas, vd_lc, vd_sn, vd_Ae, vd_Qg, entities) {
    var vd_C = vdcanvas.GetDocument();
    DefPoint1 = vd_lc;
    DefPoint2 = vd_sn;
    LinePosition = vd_Ae;
    if (!LinePosition) LinePosition = DefPoint1;
    PostString = vd_Qg;
    if (!PostString) PostString = "";
    var ents = vd_zR(vdcanvas, vd_C);
    if (!ents || ents.length == 0) return null;
    var vd_V = { _t: vdConst.vdDimension_code, Explode: { Items: [] } };
    vdcanvas.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V.VDSDIMFLAG = 16;
    vd_V.Explode.Items = ents;
    vd_V.dimType = vd_hU;
    vd_V.FractionalType = 2;
    vd_V.ExtLineVisible = true;
    vd_V.LineIsInvisible = false;
    vd_V.DimTol = false;
    vd_V.DimTextAlignToView = false;
    vd_V.DimTextAlignToViewSize = 0;
    vd_V.EnableExtLineFixedLength = false;
    vd_V.UsingDefaultTextPosition = true;
    vd_V.ArrowBlock2 = undefined;
    vd_V.Oblique = 0;
    vd_V.DefPoint1 = DefPoint1;
    vd_V.DefPoint2 = DefPoint2;
    vd_V.LinePosition = LinePosition;
    vd_V.ScaleFactor = ScaleFactor;
    vd_V.PostString = PostString;
    vd_V.dimText = vd_qd;
    vd_V.TextHorRotation = vd_lu;
    vd_V.TextColor = vd_nd;
    vd_V.ExtLineColor = vd_lL;
    vd_V.DecimalPrecision = vd_dK.precision;
    vd_V.LinearScaleFactor = LinearScaleFactor;
    vd_V.DimLunit = vd_dK.type;
    vd_V.DimZin = vd_dK.vd_bV;
    vd_V.DimLineColor = vd_kn;
    vd_V.TextHeight = vd_jo;
    vd_V.HorizontalRotation = HorizontalRotation;
    vd_V.Rotation = rotation;
    vd_V.ArrowSize = vd_Ag();
    vd_V.ExtLineDist1 = ExtLineDist1();
    vd_V.ExtLineDist2 = ExtLineDist2();
    vd_V.TextDist = TextDist();
    var block = vdcanvas.FindBlock(vd_iF);
    if (block) vd_V.ArrowBlock = "h_" + block.HandleId.toString();
    var vd_oh = vdcanvas.FindTextStyle(vd_mJ);
    if (vd_oh) vd_V.TextStyle = "h_" + vd_oh.HandleId.toString();
    if (entities) vdcanvas.vd_aE(entities, vd_V);
    else vdcanvas.vd_aE(vdcanvas.GetActiveLayout().Entities, vd_V);
    return vd_V;
  };
  function vd_Jd(dim) {
    return (
      dim.VDSDIMFLAG &&
      (dim.dimType == vdConst.vd_nS || dim.dimType == vdConst.vd_jY) &&
      ((dim.DimLunit != vdConst.vd_nQ && dim.DimLunit != vdConst.vd_qz) ||
        dim.FractionalType == 2) &&
      dim.ExtLineVisible &&
      !dim.LineIsInvisible &&
      !dim.DimTol &&
      !dim.DimTextAlignToView &&
      !dim.DimTextAlignToViewSize &&
      !dim.EnableExtLineFixedLength &&
      dim.UsingDefaultTextPosition &&
      (dim.ArrowBlock2 == dim.ArrowBlock || !dim.ArrowBlock2) &&
      !dim.Oblique
    );
  }
  this.vd_zC = function (dim, vdcanvas) {
    if (!dim.VDSDIMFLAG || !(dim.VDSDIMFLAG & 64)) return false;
    if (dim.VDSDIMFLAG & 64) dim.VDSDIMFLAG ^= 64;
    if (!vd_Jd(dim)) return false;
    var vd_C = vdcanvas.GetDocument();
    vd_hU = dim.dimType;
    DefPoint1 = dim.DefPoint1;
    DefPoint2 = dim.DefPoint2;
    LinePosition = dim.LinePosition;
    ScaleFactor = dim.ScaleFactor;
    PostString = dim.PostString;
    vd_qd = dim.dimText;
    vd_lu = dim.TextHorRotation;
    vd_nd = dim.TextColor;
    vd_lL = dim.ExtLineColor;
    vd_dK.precision = dim.DecimalPrecision;
    LinearScaleFactor = dim.LinearScaleFactor;
    vd_dK.type = dim.DimLunit;
    vd_dK.vd_bV = dim.DimZin;
    vd_kn = dim.DimLineColor;
    vd_jo = dim.TextHeight;
    HorizontalRotation = dim.HorizontalRotation;
    rotation = dim.Rotation;
    vd_rX = dim.ArrowSize;
    vd_uU = dim.ExtLineDist1;
    vd_tQ = dim.ExtLineDist2;
    vd_tn = dim.TextDist;
    var block = vdcanvas.GetDictItem(vd_C.Blocks, dim.ArrowBlock);
    vd_iF = "";
    if (block) vd_iF = block.Name;
    var vd_oh = vdcanvas.GetDictItem(vd_C.TextStyles, dim.TextStyle);
    vd_mJ = "";
    if (vd_oh) vd_mJ = vd_oh.Name;
    var ents = vd_zR(vdcanvas, vd_C);
    if (ents) dim.Explode.Items = ents;
    return true;
  };
  this.vd_Bk = function (mat, dim, vdcanvas) {
    if (dim.DefPoint1)
      dim.DefPoint1 = vdgeo.matrixtransform(mat, dim.DefPoint1);
    if (dim.DefPoint2)
      dim.DefPoint2 = vdgeo.matrixtransform(mat, dim.DefPoint2);
    if (dim.DefPoint3)
      dim.DefPoint3 = vdgeo.matrixtransform(mat, dim.DefPoint3);
    if (dim.DefPoint4)
      dim.DefPoint4 = vdgeo.matrixtransform(mat, dim.DefPoint4);
    if (dim.TextPosition)
      dim.TextPosition = vdgeo.matrixtransform(mat, dim.TextPosition);
    if (!dim.ExtrusionVector) dim.ExtrusionVector = [0, 0, 1];
    dim.ExtrusionVector = vdgeo.vd_lt(
      mat,
      dim.ExtrusionVector[0],
      dim.ExtrusionVector[1],
      dim.ExtrusionVector[2],
      true
    );
    if (dim.LinePosition)
      dim.LinePosition = vdgeo.matrixtransform(mat, dim.LinePosition);
    if (dim.ScaleFactor) dim.ScaleFactor = dim.ScaleFactor * vd_q.vd_pl(mat);
    else dim.ScaleFactor = 1.0;
    if (!dim.Rotation) dim.Rotation = 0.0;
    var vd_eo = vdgeo.vd_nF(mat);
    if (vdgeo.vd_oN(mat)) dim.Rotation = vd_eo - dim.Rotation;
    else dim.Rotation = vd_eo + dim.Rotation;
    dim.Rotation = vdgeo.FixAngle(dim.Rotation);
    dim.VDSDIMFLAG |= 32;
    dim.VDSDIMFLAG |= 64;
    if (vd_i.vd_zC(dim, vdcanvas)) {
      vd_q.vd_dj(mat, dim, vdcanvas);
    } else {
      vd_q.vd_AX(mat, dim, vdcanvas);
    }
  };
  return this;
}
function vdraw() {
  var vd_i = this;
  var vd_qo = 1200;
  var vd_mP = 5;
  var vd_sp = 150;
  var vd_HH = 250;
  var vd_R = null;
  var vd_dR = new vd_Lr();
  var vd_Dm = 0;
  var vd_CU = 1.2;
  var vd_fl = 0;
  var vd_Gt = 100;
  var vd_aT = null;
  var vd_pM = null;
  var ctx = null;
  var vd_fd = null;
  var vd_jm = null;
  var Action = new vd_HP(vd_i);
  var vd_bR = null;
  var vd_un = null;
  var vd_aA = true;
  var vd_vK = false;
  var vd_EX = /Firefox/i.test(navigator.userAgent)
    ? "DOMMouseScroll"
    : "mousewheel";
  var vd_rL = new vd_Lg(vd_i);
  var vd_al = new vd_KD(vd_i);
  var vd_tC = false;
  var vd_vO = false;
  var vd_vq = false;
  var vd_fg = [];
  var vd_eZ = true;
  var vd_pL = 0;
  var vd_xc = 0;
  var vd_oe = null;
  var vd_cJ = null;
  var vd_vM = true;
  var vd_Oi = new vd_Lw(vd_i);
  var vd_CY = false;
  this.vd_eP = new vd_KZ(vd_i);
  this.vd_gh = false;
  this.vd_aC = new vd_ON(vd_i);
  this.canvas = null;
  this.PickSize = 8;
  this.IgnoreLockLayers = false;
  this.scriptCommand = new vd_AS(this);
  this.ApplyDrawEdges = true;
  this.DrawOverallEntities = [];
  this.MessagesDictionary = {
    SELECT_ENTITIES: "Select entities",
    SPECIFY_REFERENCE_POINT: "Specify reference point",
    SPECIFY_START_POINT: "Specify start point",
    SPECIFY_SECOND_POINT: "Specify second point",
    SPECIFY_END_POINT: "Specify end point",
    SPECIFY_NEXT_POINT: "Specify next point",
    SPECIFY_CENTER_POINT: "Specify center point",
    SPECIFY_RADIUS: "Specify radius",
    SPECIFY_FIRST_CORNER: "Specify first corner",
    SPECIFY_OTHER_CORNER: "Specify other corner",
    SPECIFY_INSERTION_POINT: "Specify insertion point",
    SPECIFY_SCALE: "Specify scale",
    SPECIFY_ROTATION: "Specify rotation",
    vd_PU: "First Axis End Point",
    vd_Pj: "Second Axis Distance:",
    PROGRESS_DOWNLOAD: "Download drawing...",
    PROGRESS_READ_DRAWING: "Read drawing...",
  };
  Object.defineProperty(vd_i, "HideActionOnMouseOut", {
    get: function () {
      return vd_CY;
    },
    set: function (newValue) {
      vd_CY = newValue;
    },
  });
  Object.defineProperty(vd_i, "ActionScaleMode", {
    get: function () {
      return vd_Dm;
    },
    set: function (newValue) {
      vd_Dm = newValue;
    },
  });
  Object.defineProperty(vd_i, "MouseWheelZoomScale", {
    get: function () {
      return vd_CU;
    },
    set: function (newValue) {
      vd_CU = newValue;
    },
  });
  Object.defineProperty(vd_i, "GroupsManager", {
    get: function () {
      if (vd_bR == null) return null;
      return vd_bR.vd_Gn;
    },
  });
  Object.defineProperty(vd_i, "Notes", {
    get: function () {
      var vd_C = vd_i.GetDocument();
      if (!vd_C) return null;
      return vd_C.vd_Gy;
    },
  });
  Object.defineProperty(vd_i, "GripManager", {
    get: function () {
      return vd_Oi;
    },
  });
  Object.defineProperty(vd_i, "MaxImageSize", {
    get: function () {
      return vdConst.MaxImageSize;
    },
    set: function (newValue) {
      vdConst.MaxImageSize = newValue;
    },
  });
  this.SetImageInterpolationMode = function (mode) {
    vd_R.vd_c.vd_jr = mode;
  };
  this.GetImageInterpolationMode = function () {
    return vd_R.vd_c.vd_jr;
  };
  this.SetEnableSelection = function (bval) {
    vd_R.vd_be = bval;
  };
  this.GetEnableSelection = function () {
    return vd_R.vd_be;
  };
  this.SetGrayScale = function (vd_JD) {
    vd_R.vd_no = vd_JD;
  };
  this.GetGrayScale = function () {
    return vd_R.vd_no;
  };
  this.GetDefaultTimeOutMilliseconds = function () {
    return vd_qo;
  };
  this.SetDefaultTimeOutMilliseconds = function (timeout) {
    vd_qo = timeout;
  };
  this.Fig_codeToString = function (code) {
    switch (code) {
      case vdConst.vdLine_code:
        return "vdLine";
      case vdConst.vdPolyline_code:
        return "vdPolyline";
      case vdConst.vdText_code:
        return "vdText";
      case vdConst.vdRect_code:
        return "vdRect";
      case vdConst.vdCircle_code:
        return "vdCircle";
      case vdConst.vdEllipse_code:
        return "vdEllipse";
      case vdConst.vdArc_code:
        return "vdArc";
      case vdConst.vdImage_code:
        return "vdImage";
      case vdConst.vdInsert_code:
        return "vdInsert";
      case vdConst.vd3DFace_code:
        return "vd3DFace";
      case vdConst.vdPolyface_code:
        return "vdPolyface";
      case vdConst.vdAttrib_code:
        return "vdAttrib";
      case vdConst.vdAttribDef_code:
        return "vdAttribDef";
      case vdConst.vdInfinityLine_code:
        return "vdInfinityLine";
      case vdConst.vdPoint_code:
        return "vdPoint";
      case vdConst.vdPointCloud_code:
        return "vdPointCloud";
      case vdConst.vdViewport_code:
        return "vdViewport";
      case vdConst.vdPolyhatch_code:
        return "vdPolyhatch";
      case vdConst.vdDimension_code:
        return "vdDimension";
      case vdConst.vdMText_code:
        return "vdMText";
      case vdConst.vdMultiline_code:
        return "vdMultiline";
      case vdConst.vdGroundSurface_code:
        return "vdGroundSurface";
      case vdConst.vdLeader_code:
        return "vdLeader";
      case vdConst.vd_RY:
        return "vd_IP";
      default: {
        return "vdUnknown";
      }
    }
  };
  function vd_GJ(fig, render) {
    if (fig.ps === undefined || fig.ps.vd_Da === true) return undefined;
    if (fig.ps.pw === 0.0) return render.vd_aQ(0);
    if (fig.ps.vd_ot === false) {
      var v = vdgeo.newpoint(0, 0, 0);
      vdgeo.vd_oH(render.vd_ar(), 0, fig.ps.pw, 0, v, false);
      var len = vdgeo.vd_iE(v);
      return render.vd_aQ(len / (render.GetPixelSize() * render.vd_jH));
    } else return render.vd_aQ(((fig.ps.pw / 100.0) * 96) / vdgeo.INCH_MM);
  }
  function vd_Mn(fig, render) {
    if (fig.ps !== undefined) {
      if (fig.ps.vd_dA === 0) return render.vd_bF(fig.ps.color);
      else if (fig.ps.vd_dA === 2) return render.vd_bF(render.vd_iA());
      else if (fig.ps.vd_dA === 3) return render.vd_bF(render.vd_jP());
    }
    return undefined;
  }
  function vd_MZ(fig, render) {
    if (!fig.ps || fig.ps.vd_dA === 1) return 0;
    else return render.vd_dV(fig.ps.MaterialMatrix);
  }
  function vd_ML(fig, render) {
    if (!fig.ps || fig.ps.vd_dA === 1) return 0;
    else return render.vd_gj(fig.ps.MaterialImage);
  }
  function vd_KU(fig, render) {
    if (!fig.ps || fig.ps.vd_uy) return undefined;
    return render.vd_xW(fig.ps.lt);
  }
  function vd_KL(fig, render) {
    if (fig.ps) return render.vd_xv(fig.ps.ltscale);
    return 1.0;
  }
  this.UpdateLayout = function (layout, vd_Kg) {
    if (!layout) layout = vd_i.GetActiveLayout();
    if (!layout) return;
    layout.BoundingBox = undefined;
    if (!layout.Entities || !vd_Kg) return;
    for (var k = 0; k < layout.Entities.Items.length; k++) {
      vd_i.UpdateFig(vd_i.GetEntityItem(layout.Entities.Items[k]));
    }
  };
  this.UpdateFig = function (vd_aR) {
    var k = 0;
    if (vd_aR.LayerRef === undefined) return;
    vd_aR.selected = undefined;
    vd_aR.ps = undefined;
    vd_aR.LayerRef = undefined;
    vd_aR.LineTypeRef = undefined;
    vd_aR.EcsMatrix = undefined;
    if (vd_aR._t !== vdConst.vdViewport_code) vd_aR.BoundingBox = undefined;
    vd_N.update(vd_aR);
    if (vd_aR.SamplePoints != undefined) vd_aR.SamplePoints = undefined;
    if (vd_aR.vd_hi != undefined) vd_aR.vd_hi = undefined;
    if (vd_aR.vd_gY != undefined) vd_aR.vd_gY = undefined;
    if (vd_aR.StyleRef != undefined) vd_aR.StyleRef = undefined;
    if (vd_aR.tb != undefined) {
      vd_aR.tb = undefined;
      vd_aR.DiplayString = undefined;
      vd_aR.testlines = undefined;
      vd_aR.uwidths = undefined;
      vd_aR.owidths = undefined;
    }
    if (vd_aR.pointSegments != undefined) vd_aR.pointSegments = undefined;
    if (vd_aR.BlockRef != undefined) vd_aR.BlockRef = undefined;
    vd_aR.Normals = undefined;
    vd_aR.UVS = undefined;
    if (vd_aR.ImageClipPts) vd_aR.ImageClipPts = undefined;
    if (vd_aR.ImageClipUVS) vd_aR.ImageClipUVS = undefined;
    if (vd_aR._t == vdConst.vdPolyhatch_code) {
      if (vd_aR.Curves) {
        for (k = 0; k < vd_aR.Curves.Items.length; k++) {
          vd_aR.Curves.Items[k].UVS = undefined;
        }
      }
    }
    if (vd_aR._t == vdConst.vdDimension_code) vd_aR.VDSDIMFLAG |= 64;
    if (vd_aR.Attributes && vd_aR.Attributes.Items) {
      for (k = 0; k < vd_aR.Attributes.Items.length; k++)
        vd_i.UpdateFig(vd_aR.Attributes.Items[k]);
    }
    if (vd_aR.Explode && vd_aR.Explode.Items) {
      for (k = 0; k < vd_aR.Explode.Items.length; k++)
        vd_i.UpdateFig(vd_aR.Explode.Items[k]);
    }
  };
  this.GetEntityItem = function (item) {
    if (vd_bR == null) return null;
    return vd_bR.vd_OG(item);
  };
  this.GetEntityLength = function (entity) {
    var vd_az;
    var da;
    if (entity._t == vdConst.vdPolyline_code) {
      var closed = entity.Flag === 1;
      if (!entity.SPlineFlag || entity.SPlineFlag == vdConst.SplineFlagSTANDARD)
        vd_az = entity.VertexList.Items;
      else if (entity.SamplePoints) vd_az = entity.SamplePoints;
      else {
        if (entity.SPlineFlag == vdConst.SplineFlagFITTING)
          vd_az = vdgeo.vd_sU(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            entity.VertexList.Items,
            entity.Flag === 1,
            entity.StartTangent,
            entity.EndTangent
          );
        else if (entity.SPlineFlag == vdConst.SplineFlagCONTROLPOINTS)
          vd_az = vdgeo.vdgeo.vd_uz(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            entity.VertexList.Items,
            entity.Weights,
            entity.Knots,
            entity.Flag === 1
          );
        else if (entity.SPlineFlag == vdConst.SplineFlagQUADRATIC)
          vd_az = vdgeo.vd_xt(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            entity.VertexList.Items,
            entity.Flag === 1
          );
      }
      return vdgeo.vd_EU(vd_az, closed);
    } else if (entity._t == vdConst.vdLine_code) {
      return vdgeo.Distance3D(entity.StartPoint, entity.EndPoint);
    } else if (entity._t == vdConst.vdRect_code) {
      return Math.abs(2.0 * entity.Width) + Math.abs(2.0 * entity.Height);
    } else if (entity._t == vdConst.vdCircle_code) {
      return Math.abs(vdgeo.PI * 2.0 * entity.Radius);
    } else if (entity._t == vdConst.vdArc_code) {
      return Math.abs(
        vdgeo.FixAngle(entity.EndAngle - entity.StartAngle) * entity.Radius
      );
    } else if (entity._t == vdConst.vdEllipse_code) {
      da = vdgeo.FixAngle(entity.EndAngle - entity.StartAngle);
      if (
        vdgeo.AreEqual(da, 0, vdgeo.DefaultAngularEquality) ||
        vdgeo.AreEqual(da, vdgeo.VD_TWOPI, vdgeo.DefaultAngularEquality)
      ) {
        var k = Math.Sqrt(
          1 - Math.pow(entity.MinorLength / entity.MajorLength, 2)
        );
        k = Math.pow(k, 2);
        var sum = 0;
        var term = 0;
        var above = 0;
        var below = 0;
        sum = 1;
        term = 1;
        above = 1;
        below = 2;
        for (var i = 1; i <= 100; i++) {
          term *= above / below;
          sum -= (Math.pow(k, i) * Math.pow(term, 2)) / above;
          above += 2;
          below += 2;
        }
        sum *= 0.5 * vdgeo.PI;
        return a * sum;
      } else {
        vd_az = entity.SamplePoints;
        if (!vd_az) {
          if (entity.StartAngle == undefined) entity.StartAngle = 0.0;
          if (entity.EndAngle == undefined) entity.EndAngle = 0.0;
          da =
            vdgeo.FixAngle(entity.EndAngle) - vdgeo.FixAngle(entity.StartAngle);
          var vd_en = vdgeo.vd_rI(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            entity.MajorLength,
            da
          );
          vd_az = vdgeo.vd_rT(
            vd_en,
            entity.MajorLength,
            entity.MinorLength,
            entity.StartAngle,
            entity.EndAngle
          );
        }
        return vdgeo.vd_EU(vd_az, false);
      }
    } else return 0.0;
  };
  this.MeasureCurve = function (entity, length) {
    var vd_az;
    var vd_hA;
    var da;
    if (entity._t == vdConst.vdPolyline_code) {
      var closed = entity.Flag === 1;
      if (!entity.SPlineFlag || entity.SPlineFlag == vdConst.SplineFlagSTANDARD)
        vd_az = entity.VertexList.Items;
      else if (entity.SamplePoints) vd_az = entity.SamplePoints;
      else {
        if (entity.SPlineFlag == vdConst.SplineFlagFITTING)
          vd_az = vdgeo.vd_sU(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            entity.VertexList.Items,
            entity.Flag === 1,
            entity.StartTangent,
            entity.EndTangent
          );
        else if (entity.SPlineFlag == vdConst.SplineFlagCONTROLPOINTS)
          vd_az = vdgeo.vdgeo.vd_uz(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            entity.VertexList.Items,
            entity.Weights,
            entity.Knots,
            entity.Flag === 1
          );
        else if (entity.SPlineFlag == vdConst.SplineFlagQUADRATIC)
          vd_az = vdgeo.vd_xt(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            entity.VertexList.Items,
            entity.Flag === 1
          );
      }
      return vdgeo.vd_mt(vd_az, length, closed);
    } else if (entity._t == vdConst.vdLine_code) {
      return vdgeo.vd_mt([entity.StartPoint, entity.EndPoint], length, false);
    } else if (entity._t == vdConst.vdRect_code) {
      var vd_zO = vdgeo.pointPolar(
        entity.InsertionPoint,
        entity.Rotation,
        entity.Width
      );
      return vdgeo.vd_mt(
        [
          entity.InsertionPoint,
          vd_zO,
          vdgeo.pointPolar(
            vd_zO,
            entity.Rotation + vdgeo.HALF_PI,
            entity.Height
          ),
          vdgeo.pointPolar(
            entity.InsertionPoint,
            entity.Rotation + vdgeo.HALF_PI,
            entity.Height
          ),
        ],
        length,
        true
      );
    } else if (entity._t == vdConst.vdCircle_code) {
      vd_hA = vdgeo.Arc2Bulge(entity.Radius, vdgeo.PI);
      return vdgeo.vd_mt(
        [
          vdgeo.pointPolar(entity.Center, 0.0, entity.Radius).concat(vd_hA),
          vdgeo
            .pointPolar(entity.Center, vdgeo.PI, entity.Radius)
            .concat(vd_hA),
        ],
        length,
        true
      );
    } else if (entity._t == vdConst.vdArc_code) {
      vd_hA = vdgeo.Arc2Bulge(
        entity.Radius,
        vdgeo.FixAngle(entity.EndAngle - entity.StartAngle)
      );
      return vdgeo.vd_mt(
        [
          vdgeo
            .pointPolar(entity.Center, entity.StartAngle, entity.Radius)
            .concat(vd_hA),
          vdgeo
            .pointPolar(entity.Center, entity.EndAngle, entity.Radius)
            .concat(vd_hA),
        ],
        length,
        false
      );
    } else if (entity._t == vdConst.vdEllipse_code) {
      da = vdgeo.FixAngle(entity.EndAngle - entity.StartAngle);
      vd_az = entity.SamplePoints;
      if (!vd_az) {
        if (entity.StartAngle == undefined) entity.StartAngle = 0.0;
        if (entity.EndAngle == undefined) entity.EndAngle = 0.0;
        da =
          vdgeo.FixAngle(entity.EndAngle) - vdgeo.FixAngle(entity.StartAngle);
        var vd_en = vdgeo.vd_rI(
          vdgeo.CURVERESOLUTION,
          render.GetPixelSize(),
          entity.MajorLength,
          da
        );
        vd_az = vdgeo.vd_rT(
          vd_en,
          entity.MajorLength,
          entity.MinorLength,
          entity.StartAngle,
          entity.EndAngle
        );
      }
      if (!entity.EcsMatrix) {
        var vd_cA = vdgeo.newpoint(0, 0, 1);
        var vd_g = vdgeo.newpoint(0, 0, 0);
        if (entity.ExtrusionVector != undefined)
          vd_cA = vdgeo.newpoint(
            entity.ExtrusionVector[X],
            entity.ExtrusionVector[Y],
            entity.ExtrusionVector[Z]
          );
        if (entity.Center != undefined)
          vd_g = vdgeo.newpoint(
            entity.Center[X],
            entity.Center[Y],
            entity.Center[Z]
          );
        entity.EcsMatrix = vdgeo.vd_Q();
        if (entity.MajorAngle != undefined)
          vdgeo.vd_ap(entity.EcsMatrix, entity.MajorAngle);
        vdgeo.vd_cn(entity.EcsMatrix, vd_cA);
        vdgeo.vd_j(entity.EcsMatrix, vd_g[X], vd_g[Y], vd_g[Z]);
      }
      var ret = vdgeo.vd_mt(vd_az, length, false);
      return vdgeo.vd_eq(entity.EcsMatrix, ret);
    } else return [];
  };
  this.GetEntityArea = function (entity) {
    var render = vd_R;
    var vd_az;
    var da;
    if (entity._t == vdConst.vdPolyline_code) {
      if (!entity.SPlineFlag || entity.SPlineFlag == vdConst.SplineFlagSTANDARD)
        return Math.abs(vdgeo.vd_Iv(entity.VertexList.Items));
      if (entity.SamplePoints) vd_az = entity.SamplePoints;
      else {
        if (entity.SPlineFlag == vdConst.SplineFlagFITTING)
          vd_az = vdgeo.vd_sU(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            entity.VertexList.Items,
            entity.Flag === 1,
            entity.StartTangent,
            entity.EndTangent
          );
        else if (entity.SPlineFlag == vdConst.SplineFlagCONTROLPOINTS)
          vd_az = vdgeo.vdgeo.vd_uz(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            entity.VertexList.Items,
            entity.Weights,
            entity.Knots,
            entity.Flag === 1
          );
        else if (entity.SPlineFlag == vdConst.SplineFlagQUADRATIC)
          vd_az = vdgeo.vd_xt(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            entity.VertexList.Items,
            entity.Flag === 1
          );
      }
    } else if (entity._t == vdConst.vdRect_code) {
      return Math.abs(entity.Width * entity.Height);
    } else if (entity._t == vdConst.vdCircle_code) {
      return Math.abs(vdgeo.PI * entity.Radius * entity.Radius);
    } else if (entity._t == vdConst.vdEllipse_code) {
      if (entity.StartAngle == undefined) entity.StartAngle = 0.0;
      if (entity.EndAngle == undefined) entity.EndAngle = 0.0;
      da = vdgeo.FixAngle(entity.EndAngle - entity.StartAngle);
      if (
        vdgeo.AreEqual(da, 0, vdgeo.DefaultAngularEquality) ||
        vdgeo.AreEqual(da, vdgeo.VD_TWOPI, vdgeo.DefaultAngularEquality)
      ) {
        return entity.MajorLength * entity.MinorLength * vdgeo.PI;
      } else {
        vd_az = entity.SamplePoints;
        if (!vd_az) {
          var vd_en = vdgeo.vd_rI(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            entity.MajorLength,
            da
          );
          vd_az = vdgeo.vd_rT(
            vd_en,
            entity.MajorLength,
            entity.MinorLength,
            entity.StartAngle,
            entity.EndAngle
          );
        }
      }
    } else if (entity._t == vdConst.vdArc_code) {
      return Math.abs(
        (vdgeo.FixAngle(entity.EndAngle - entity.StartAngle) / 2.0) *
          entity.Radius *
          entity.Radius
      );
    } else return -1;
    return Math.abs(vdgeo.GetPointsArea(vd_az));
  };
  this.FilterEntities = function (vd_HK, vd_xh) {
    var i;
    var ret = [];
    var vd_C = vd_i.GetDocument();
    var args = {
      vdraw: vd_i,
      document: vd_C,
      owner: undefined,
      entity: undefined,
      customdata: vd_HK,
      cancel: false,
    };
    if (!vd_xh) return ret;
    var lay0 = vd_i.FindLayer("0");
    var vd_Df = undefined;
    if (lay0) vd_Df = "h_" + lay0.HandleId.toString();
    function vd_vF(owner) {
      var i;
      var ent;
      if (!owner) return;
      if (owner.Deleted) return;
      if (!owner.Entities) return;
      if (!owner.Entities.Items) return;
      args.owner = owner;
      args.entity = undefined;
      args.cancel = false;
      vd_xh(args);
      if (args.cancel) return;
      for (i = 0; i < owner.Entities.Items.length; i++) {
        ent = vd_i.GetDictItem(owner.Entities, owner.Entities.Items[i]);
        if (!ent) continue;
        if (ent.Deleted) continue;
        args.entity = ent;
        args.cancel = false;
        if (!ent.Layer) ent.Layer = vd_Df;
        vd_xh(args);
        if (!args.cancel) ret.push(ent);
      }
    }
    vd_vF(vd_C.Model);
    if (vd_C.LayOuts) {
      for (i = 0; i < vd_C.LayOuts.Items.length; i++)
        vd_vF(vd_C.LayOuts.Items[i]);
    }
    if (vd_C.Blocks) {
      for (i = 0; i < vd_C.Blocks.Items.length; i++)
        vd_vF(vdcanvas.GetDictItem(vd_C.Blocks, vd_C.Blocks.Items[i]));
    }
    return ret;
  };
  this.GetDictItem = function (vd_bx, vd_da) {
    if (vd_bR == null) return null;
    return vd_bR.vd_gE(vd_bx, vd_da);
  };
  this.ChangeOrder = function (entity, vd_GT, vd_bx) {
    if (!entity || !entity.HandleId) return false;
    if (!vd_bx) vd_bx = vd_i.GetActiveLayout().Entities;
    if (!vd_bx || !vd_bx.Items || vd_bx.Items.length == 0) return false;
    var vd_da = "h_" + entity.HandleId.toString();
    var pos = vd_bx.Items.indexOf(vd_da);
    if (pos < 0) return false;
    vd_bx.Items.splice(pos, 1);
    if (vd_GT) vd_bx.Items.splice(0, 0, vd_da);
    else vd_bx.Items.push(vd_da);
    return true;
  };
  function vd_GL(fig, vd_C, render) {
    if (fig.ps !== undefined) return fig.ps;
    if (!fig.PenColor) fig.PenColor = { ColorFlag: 192 };
    if (fig.LayerRef == undefined) {
      fig.LayerRef = vd_i.GetDictItem(vd_C.Layers, fig.Layer);
      if (!fig.LayerRef) fig.LayerRef = vd_i.FindLayer("0");
    }
    if (fig.LineTypeRef == undefined) {
      fig.LineTypeRef = vd_i.GetDictItem(vd_C.LineTypes, fig.LineType);
      if (!fig.LineTypeRef) fig.LineTypeRef = vd_i.FindLineType("BYLAYER");
    }
    if (render.vd_bY() != vdConst.vd_nE) return null;
    fig.ps = {};
    fig.ps.vd_ot = false;
    fig.ps.pw = 0;
    fig.ps.vd_Da = false;
    fig.ps.lt = null;
    fig.ps.vd_uy = false;
    fig.ps.ltscale = 1;
    fig.ps.color = [255, 255, 255, 255];
    fig.ps.MaterialImage = null;
    fig.ps.MaterialMatrix = null;
    fig.ps.vd_dA = 0;
    fig.ps.vd_P = undefined;
    var afig = render.vd_qD();
    var lay = fig.LayerRef;
    var lt = fig.LineTypeRef;
    var alay = null;
    if (afig != null) {
      alay = vd_i.GetDictItem(vd_C.Layers, afig.Layer);
      if (!alay) alay = vd_i.FindLayer("0");
    }
    if (fig.LineTypeScale == undefined) fig.LineTypeScale = 1.0;
    if (fig.PenWidth > 0.0) {
      fig.ps.vd_ot = false;
      fig.ps.pw = fig.PenWidth;
    } else {
      var lw = fig.LineWeight;
      if (lw == undefined) lw = vdConst.LW_BYLAYER;
      if (vd_C.LineWeightDisplay == false || lw === 0) {
        fig.ps.vd_ot = false;
        fig.ps.pw = 0.0;
      } else {
        if (lw === vdConst.LW_BYLAYER && lay != null) {
          if (lay.Name === "0" && afig != null && alay != null) {
            if (
              !vd_C.BlockStdLayerOper ||
              !(
                vd_C.BlockStdLayerOper &
                vdConst.BlockStdLayerOper_BlockLineWeight
              )
            )
              lw = alay.LineWeight;
            else lw = vdConst.LW_BYBLOCK;
          } else {
            lw = lay.LineWeight;
          }
        }
        if (lw == undefined) lw = vdConst.LW_BYLAYER;
        if (lw == vdConst.LW_DOCUMENTDEFAULT) lw = vd_C.LineWeight;
        if (lw != vdConst.LW_BYBLOCK) {
          if (lw <= 0) {
            fig.ps.vd_ot = false;
            fig.ps.pw = 0.0;
          } else {
            fig.ps.vd_ot = true;
            fig.ps.pw = lw;
          }
        } else {
          fig.ps.vd_Da = true;
        }
      }
    }
    if (lt) {
      if (lay && lt.Name == "BYLAYER") {
        var vd_kE = null;
        if (
          afig != null &&
          afig._t === vdConst.vdInsert_code &&
          lay.Name === "0"
        ) {
          if (
            (!vd_C.BlockStdLayerOper ||
              !(
                vd_C.BlockStdLayerOper & vdConst.BlockStdLayerOper_BlockLineType
              )) &&
            alay
          )
            vd_kE = vd_i.GetDictItem(vd_C.LineTypes, alay.LineType);
        } else {
          vd_kE = vd_i.GetDictItem(vd_C.LineTypes, lay.LineType);
        }
        if (vd_kE) fig.ps.lt = vd_kE;
        if (!vd_kE || vd_kE.Name == "BYLAYER" || vd_kE.Name == "BYBLOCK")
          fig.ps.vd_uy = true;
        fig.ps.ltscale = fig.LineTypeScale * vd_C.LineTypeScale;
      } else if (lt.Name != "BYBLOCK") {
        fig.ps.lt = lt;
        fig.ps.ltscale = fig.LineTypeScale * vd_C.LineTypeScale;
      } else {
        fig.ps.vd_uy = true;
      }
    }
    if (fig.PenColor.SystemColor != undefined) {
      fig.ps.color = fig.PenColor.SystemColor;
      fig.ps.MaterialImage = vd_i.GetDictItem(
        vd_C.Images,
        fig.PenColor.MaterialImage
      );
      if (fig.ps.MaterialImage != null)
        fig.ps.MaterialMatrix = fig.PenColor.MaterialMatrix;
    } else if (fig.PenColor.ColorFlag === vdConst.COLOR_BYLAYER) {
      if (
        afig != null &&
        afig._t === vdConst.vdInsert_code &&
        lay != null &&
        lay.Name === "0"
      ) {
        if (
          !vd_C.BlockStdLayerOper ||
          !(vd_C.BlockStdLayerOper & vdConst.BlockStdLayerOper_BlockColor)
        )
          lay = alay;
        else {
          fig.ps.vd_dA = 1;
        }
      }
      if (fig.ps.vd_dA != 1) {
        if (lay && lay.PenColor.ColorIndex != undefined) {
          if (lay.PenColor.ColorIndex == 6) fig.ps.vd_dA = 2;
          else fig.ps.color = render.vd_gQ(lay.PenColor.ColorIndex);
          fig.ps.MaterialImage =
            render.palette.Items[lay.PenColor.ColorIndex].MaterialImageRef;
          if (fig.ps.MaterialImage != null)
            fig.ps.MaterialMatrix =
              render.palette.Items[lay.PenColor.ColorIndex].MaterialMatrix;
        } else if (lay && lay.PenColor.SystemColor != undefined) {
          fig.ps.color = lay.PenColor.SystemColor;
          fig.ps.MaterialImage = vd_i.GetDictItem(
            vd_C.Images,
            lay.PenColor.MaterialImage
          );
          if (fig.ps.MaterialImage != null)
            fig.ps.MaterialMatrix = lay.PenColor.MaterialMatrix;
        }
      }
    } else if (fig.PenColor.ColorIndex != undefined) {
      if (fig.PenColor.ColorIndex == 6) fig.ps.vd_dA = 2;
      else fig.ps.color = render.vd_gQ(fig.PenColor.ColorIndex);
      fig.ps.MaterialImage =
        render.palette.Items[fig.PenColor.ColorIndex].MaterialImageRef;
      if (fig.ps.MaterialImage != null)
        fig.ps.MaterialMatrix =
          render.palette.Items[fig.PenColor.ColorIndex].MaterialMatrix;
    } else if (fig.PenColor.ColorFlag === 196) fig.ps.vd_dA = 3;
    else if (fig.PenColor.ColorFlag === 197) fig.ps.vd_dA = 2;
    else {
      fig.ps.vd_dA = 1;
    }
    if (
      fig.TransparencyMethod === vdConst.TransparencyMethod_ByLayer &&
      lay != null
    ) {
      var vd_tg = undefined;
      if (lay.PenColor.ColorIndex != undefined) {
        vd_tg = render.vd_gQ(lay.PenColor.ColorIndex);
      } else if (lay.PenColor.SystemColor != undefined) {
        vd_tg = lay.PenColor.SystemColor;
      }
      if (vd_tg != undefined) fig.ps.color[3] = vd_tg[3];
    } else if (fig.TransparencyMethod === vdConst.TransparencyMethod_ByBlock)
      fig.ps.color[3] = undefined;
    if (fig.HatchProperties != undefined) {
      fig.ps.vd_P = {
        vd_bT: undefined,
        color: undefined,
        vd_iV: 0,
        vd_dA: 0,
        vd_dy: 255,
        angle: 0,
        scale: 1,
        pattern: null,
        origin: vdgeo.newpoint(0, 0, 0),
        IsDpi: false,
        vd_ok: false,
        vd_eg: 0,
        vd_iQ: undefined,
        gradientAngle: 0,
      };
      if (fig.HatchProperties.HatchPatternRef != undefined)
        fig.ps.vd_P.pattern = fig.HatchProperties.HatchPatternRef;
      else if (fig.HatchProperties.HatchPattern != undefined)
        fig.ps.vd_P.pattern = vd_i.GetDictItem(
          vd_C.HatchPatterns,
          fig.HatchProperties.HatchPattern
        );
      if (fig.ps.vd_P.pattern != null) {
        if (
          fig.ps.vd_P.pattern == null ||
          fig.ps.vd_P.pattern.PatternLines == undefined ||
          fig.ps.vd_P.pattern.PatternLines.Items.length == 0 ||
          (fig.HatchProperties.IsDpi != undefined &&
            fig.HatchProperties.IsDpi != true &&
            fig.ps.vd_P.pattern.PatternLines.Items.length == 1 &&
            fig.ps.vd_P.pattern.PatternLines.Items[0].Dashes != undefined &&
            fig.ps.vd_P.pattern.PatternLines.Items[0].Dashes.Items.length == 0)
        )
          fig.ps.vd_P.pattern = null;
        if (
          fig.ps.vd_P.pattern != null &&
          fig.HatchProperties.IsDpi != undefined &&
          fig.HatchProperties.IsDpi != true &&
          fig.ps.vd_P.pattern.PatternLines.Items[0].Dashes != undefined &&
          fig.ps.vd_P.pattern.PatternLines.Items[0].Dashes.Items.length == 1 &&
          fig.ps.vd_P.pattern.PatternLines.Items[0].Dashes.Items[0] < 0.0
        )
          fig.ps.vd_P.vd_ok = true;
        if (fig.HatchProperties.IsDpi != undefined)
          fig.ps.vd_P.IsDpi = fig.HatchProperties.IsDpi;
        if (fig.HatchProperties.HatchAngle != undefined)
          fig.ps.vd_P.angle = fig.HatchProperties.HatchAngle;
        if (fig.HatchProperties.HatchScale != undefined)
          fig.ps.vd_P.scale = fig.HatchProperties.HatchScale;
        if (fig.HatchProperties.HatchOrigin != undefined)
          fig.ps.vd_P.origin = fig.HatchProperties.HatchOrigin;
        fig.ps.vd_P.vd_bT = undefined;
        if (fig.HatchProperties.FillBkColor != undefined) {
          if (fig.HatchProperties.FillBkColor.SystemColor != undefined)
            fig.ps.vd_P.vd_bT = fig.HatchProperties.FillBkColor.SystemColor;
          else if (fig.HatchProperties.FillBkColor.ColorIndex != undefined) {
            fig.ps.vd_P.vd_bT = render.vd_gQ(
              fig.HatchProperties.FillBkColor.ColorIndex
            );
            if (fig.HatchProperties.FillBkColor.ColorIndex == 6)
              fig.ps.vd_P.vd_iV = 2;
          } else if (fig.HatchProperties.FillBkColor.ColorFlag == 196)
            fig.ps.vd_P.vd_iV = 3;
          else if (fig.HatchProperties.FillBkColor.ColorFlag == 197)
            fig.ps.vd_P.vd_iV = 2;
        }
      }
      if (fig.HatchProperties.FillColor != undefined) {
        if (fig.HatchProperties.FillColor.ColorIndex != undefined) {
          fig.ps.vd_P.color = render.vd_gQ(
            fig.HatchProperties.FillColor.ColorIndex
          );
          if (fig.HatchProperties.FillColor.ColorIndex == 6)
            fig.ps.vd_P.vd_dA = 2;
        } else if (fig.HatchProperties.FillColor.SystemColor != undefined) {
          fig.ps.vd_P.color = fig.HatchProperties.FillColor.SystemColor;
          var vd_DA = vd_i.GetDictItem(
            vd_C.Images,
            fig.HatchProperties.FillColor.MaterialImage
          );
          if (vd_DA != null) {
            fig.ps.MaterialImage = vd_DA;
            if (fig.ps.MaterialImage != null)
              fig.ps.MaterialMatrix =
                fig.HatchProperties.FillColor.MaterialMatrix;
          }
        } else if (fig.HatchProperties.FillColor.ColorFlag == 196)
          fig.ps.vd_P.vd_dA = 3;
        else if (fig.HatchProperties.FillColor.ColorFlag == 197)
          fig.ps.vd_P.vd_dA = 2;
      }
      if (fig.HatchProperties.Solid2dTransparency != undefined)
        fig.ps.vd_P.vd_dy = fig.HatchProperties.Solid2dTransparency;
      if (fig.HatchProperties.gradientTypeProp != undefined)
        fig.ps.vd_P.vd_eg = fig.HatchProperties.gradientTypeProp;
      if (fig.HatchProperties.gradientColor2 != undefined)
        fig.ps.vd_P.vd_iQ = fig.HatchProperties.gradientColor2;
      if (fig.HatchProperties.gradientAngle != undefined)
        fig.ps.vd_P.gradientAngle = fig.HatchProperties.gradientAngle;
      if (fig.ps.vd_P.vd_ok) fig.ps.vd_P.vd_dy = 0;
    }
  }
  function vd_gR(render, pts, thickness, vd_M, vd_C) {
    if (vd_C && vd_C.ShowHatches === false) return;
    if (pts.length > 2 && !vd_M.UVS) {
      var vd_ft = render.vd_dV(0);
      if (vd_ft != null) {
        vd_M.UVS = [];
        vd_M.UVS.length = pts.length;
        for (var i = 0; i < pts.length; i++) {
          vd_M.UVS[i] = vdgeo.newpoint(0, 0, 0);
          vdgeo.vd_eU(vd_ft, pts[i], vd_M.UVS[i]);
        }
      }
      render.vd_dV(vd_ft);
    }
    render.vd_gR(pts, null, vd_M.UVS);
    if (thickness && thickness != 0.0) {
      var vd_Ft = vdgeo.vd_Q();
      vdgeo.vd_j(vd_Ft, 0, 0, thickness);
      render.vd_aj(vd_Ft);
      render.vd_gR(pts, null, vd_M.UVS);
      render.vd_aW();
    }
  }
  this.vd_DJ = function () {
    var vd_C = vd_f();
    if (vd_C == null) return;
    return vd_C.Model;
  };
  function vd_HE(vd_M, render, vd_C) {
    if (vd_i.GetActiveLayout() === vd_C.Model) return;
    if (vd_M.VPBOX) vd_M.BoundingBox = vd_M.VPBOX;
    if (vd_M.BoundingBox == undefined) return;
    vd_M.VPBOX = vd_M.BoundingBox;
    if (render.vd_bY() == vdConst.vd_et) {
      render.vd_gc.vd_gJ(vd_M.BoundingBox);
      return;
    }
    var bmin = vdgeo.newpoint(
      vd_M.BoundingBox[0],
      vd_M.BoundingBox[1],
      vd_M.BoundingBox[2]
    );
    var bmax = vdgeo.newpoint(
      vd_M.BoundingBox[3],
      vd_M.BoundingBox[4],
      vd_M.BoundingBox[5]
    );
    var zdir = vdgeo.vd_gn(render.vd_ar());
    var xdir = vdgeo.vd_jG(render.vd_ar());
    if (
      !render.vd_bO &&
      vdgeo.AreEqual(zdir[X], 0, vdgeo.DefaultVectorEquality) &&
      vdgeo.AreEqual(zdir[Y], 0, vdgeo.DefaultVectorEquality) &&
      vdgeo.AreEqual(zdir[Z], 1, vdgeo.DefaultVectorEquality) &&
      vdgeo.AreEqual(xdir[X], 1, vdgeo.DefaultVectorEquality) &&
      vdgeo.AreEqual(xdir[Y], 0, vdgeo.DefaultVectorEquality) &&
      vdgeo.AreEqual(xdir[Z], 0, vdgeo.DefaultVectorEquality)
    ) {
      bmin = vdgeo.matrixtransform(render.vd_ar(), bmin);
      bmax = vdgeo.matrixtransform(render.vd_ar(), bmax);
      var vd_wk = vdgeo.matrixtransform(render.vd_cC, bmin);
      var vd_tZ = vdgeo.matrixtransform(render.vd_cC, bmax);
      var center = vdgeo.MidPoint(bmin, bmax);
      var bh = bmax[Y] - bmin[Y];
      if (bmin[X] < render.vd_aa.left) bmin[X] = render.vd_aa.left;
      if (bmax[X] > render.vd_aa.right) bmax[X] = render.vd_aa.right;
      if (bmin[Y] < render.vd_aa.bottom) bmin[Y] = render.vd_aa.bottom;
      if (bmax[Y] > render.vd_aa.top) bmax[Y] = render.vd_aa.top;
      var mpt = vdgeo.MidPoint(bmin, bmax);
      var bh2 = bmax[Y] - bmin[Y];
      var vd_m = (vd_M.ViewSize * bh2) / bh;
      var scale = vd_m / bh2;
      var dx = center[X] - mpt[X];
      var dy = center[Y] - mpt[Y];
      var vd_yc = vdgeo.matrixtransform(
        render.vd_cC,
        vdgeo.newpoint(bmin[X], bmax[Y], 0)
      );
      var vd_X = vdgeo.newpoint(
        vd_M.ViewCenter[X] - dx * scale,
        vd_M.ViewCenter[Y] - dy * scale
      );
      var width = vdgeo.vd_r((bmax[X] - bmin[X]) / render.GetPixelSize());
      var height = vdgeo.vd_r(bh2 / render.GetPixelSize());
      if (vd_M.PerspectiveMod == 1) {
        vd_X = vd_M.ViewCenter;
        vd_yc = vdgeo.newpoint(vd_wk[X], vd_tZ[Y], 0);
        width = vd_tZ[X] - vd_wk[X];
        height = vd_wk[Y] - vd_tZ[Y];
      }
      var vd_BH = vdgeo.vd_r(width);
      var vd_BG = vdgeo.vd_r(height);
      if (vd_BH <= 1) return;
      if (vd_BG <= 1) return;
      vd_C.vd_yz = vd_M;
      var vd_dr = new vd_oA(
        vd_i,
        vdgeo.vd_r(vd_yc[X]),
        vdgeo.vd_r(vd_yc[Y]),
        vd_BH,
        vd_BG,
        null
      );
      if (vd_M.PerspectiveMod == 1)
        vd_dr.vd_xp(
          Math.max(0, vd_dr.vd_dL),
          Math.max(0, vd_dr.vd_fz),
          Math.min(render.clip[2], vd_dr.vd_dL + vd_dr.width - 1),
          Math.min(render.clip[3], vd_dr.vd_fz + vd_dr.height - 1)
        );
      if (render.vd_bG()) render.vd_lR();
      vd_dr.vd_c.vd_gs(
        render.vd_c.vd_nW(),
        render.vd_c.vd_aK,
        render.vd_c.vd_as,
        true
      );
      vd_dr.vd_sa(render);
      vd_dr.vd_be = false;
      vd_dr.update(
        vd_m,
        vd_X,
        vd_M.World2ViewMatrix,
        vd_nL(vd_C.Model),
        vd_M.FocalLength,
        vd_M.LensAngle,
        vd_M.PerspectiveMod == 1,
        vd_M.RenderMode,
        vd_C.Model.Sections,
        vd_C.Lights
      );
      vd_dr.vd_iv(render.palette, render.vd_jP());
      vd_dr.clear(true);
      var vd_oj = vd_dr.vd_lg(vd_M.ShowHidenEdges);
      vd_tU(vd_C.Model.Entities, true, vd_dr, vd_C);
      if (vd_dr.vd_bG()) vd_dr.vd_lR();
      vd_dr.vd_lg(vd_oj);
      vd_dr.vd_c.vd_gs(null);
      vd_dr = null;
      vd_i.vd_aC.vd_AC(render);
      vd_C.vd_yz = null;
    }
    var vd_vx = vd_i.GetDictItem(vd_C.Layers, vd_M.Layer);
    if (vd_vx == null || vd_vx.Frozen == undefined || vd_vx.Frozen == false)
      render.vd_bt(
        [
          bmin,
          vdgeo.newpoint(bmin[X], bmax[Y], 0),
          bmax,
          vdgeo.newpoint(bmax[X], bmin[Y], 0),
        ],
        true
      );
  }
  function vd_GG(vd_M, render, vd_C) {
    if (
      (vd_M.Thickness != undefined && vd_M.Thickness != 0.0) ||
      (vd_M.ps && vd_M.ps.MaterialMatrix != null)
    ) {
      if (vd_M.ExtrusionVector != undefined && vd_M.EcsMatrix == undefined) {
        var vd_cA = vdgeo.newpoint(
          vd_M.ExtrusionVector[X],
          vd_M.ExtrusionVector[Y],
          vd_M.ExtrusionVector[Z]
        );
        vd_M.EcsMatrix = vdgeo.vd_Q();
        vdgeo.vd_cn(vd_M.EcsMatrix, vd_cA);
      }
      if (
        vd_M.ps &&
        vd_M.ps.MaterialMatrix != null &&
        vd_M.EcsMatrix == undefined
      )
        vd_M.EcsMatrix = vdgeo.vd_Q();
      if (vd_M.SamplePoints == undefined) {
        if (vd_M.EcsMatrix != undefined)
          vd_M.SamplePoints = vdgeo.vd_eq(vdgeo.vd_bu(vd_M.EcsMatrix), [
            vd_M.StartPoint,
            vd_M.EndPoint,
          ]);
        else vd_M.SamplePoints = [vd_M.StartPoint, vd_M.EndPoint];
      }
    }
    if (vd_M.SamplePoints != undefined) {
      if (vd_M.EcsMatrix != undefined) render.vd_aj(vd_M.EcsMatrix);
      render.vd_iD(vd_M.SamplePoints, vd_M.Thickness, false);
      if (vd_M.EcsMatrix != undefined) render.vd_aW();
    } else {
      render.vd_cP(vd_M.StartPoint, vd_M.EndPoint);
    }
  }
  function vd_FO(vd_M, render, vd_C) {
    if (vd_M.VertexList == undefined) return;
    if (vd_M.ExtrusionVector != undefined && vd_M.EcsMatrix == undefined) {
      var vd_cA = vdgeo.newpoint(
        vd_M.ExtrusionVector[X],
        vd_M.ExtrusionVector[Y],
        vd_M.ExtrusionVector[Z]
      );
      vd_M.EcsMatrix = vdgeo.vd_Q();
      vdgeo.vd_cn(vd_M.EcsMatrix, vd_cA);
    }
    var i;
    if (
      vd_M.ps &&
      vd_M.ps.MaterialMatrix != null &&
      vd_M.EcsMatrix == undefined
    )
      vd_M.EcsMatrix = vdgeo.vd_Q();
    if (vd_M.SamplePoints == undefined) {
      var vd_kC = vd_M.VertexList.Items;
      var vd_fD = vd_M.Weights;
      var vd_aI = vd_M.Knots;
      if (vd_M.Weights == undefined) vd_fD == null;
      else vd_fD = vd_M.Weights.Items;
      if (vd_M.Knots == undefined) vd_aI == null;
      else vd_aI = vd_M.Knots.Items;
      if (vd_M.EcsMatrix != undefined)
        vd_kC = vdgeo.vd_rQ(vdgeo.vd_bu(vd_M.EcsMatrix), vd_M.VertexList.Items);
      else {
        vd_kC = [];
        for (i = 0; i < vd_M.VertexList.Items.length; i++)
          vd_kC.push(vd_M.VertexList.Items[i]);
      }
      if (vd_M.SPlineFlag == vdConst.SplineFlagCONTROLPOINTS) {
        vd_M.SamplePoints = vdgeo.vd_uz(
          vdgeo.CURVERESOLUTION,
          render.vd_dk(),
          vd_kC,
          vd_fD,
          vd_aI,
          vd_M.Flag === 1
        );
      } else if (vd_M.SPlineFlag == vdConst.SplineFlagQUADRATIC) {
        vd_M.SamplePoints = vdgeo.vd_HG(
          vdgeo.CURVERESOLUTION,
          render.vd_dk(),
          vd_kC,
          vd_fD,
          vd_aI,
          vd_M.Flag === 1
        );
      } else if (vd_M.SPlineFlag == vdConst.SplineFlagFITTING) {
        vd_M.SamplePoints = vdgeo.vd_sU(
          vdgeo.CURVERESOLUTION,
          render.vd_dk(),
          vd_kC,
          vd_M.Flag === 1,
          vd_M.StartTangent,
          vd_M.EndTangent
        );
      } else {
        vd_M.SamplePoints = vdgeo.vd_Hw(
          vd_kC,
          vdgeo.CURVERESOLUTION,
          render.vd_dk(),
          vd_M.Flag === 1
        );
        vd_M.vd_gY = 0.0;
        var vd_Fz = false;
        vd_M.vd_hi = undefined;
        if (
          vd_M.VertexList.Items.length > 1 &&
          vd_M.Widths &&
          vd_M.Widths.Items.length == vd_M.VertexList.Items.length * 2
        ) {
          for (i = 0; i < vd_M.VertexList.Items.length; i++) {
            if (vd_M.VertexList.Items[i][B]) {
              vd_Fz = true;
              break;
            }
          }
          if (!vd_Fz) {
            vd_M.vd_gY = vd_M.Widths.Items[0];
            for (i = 0; i < vd_M.Widths.Items.length; i++) {
              if (vd_M.Widths.Items[i] !== vd_M.vd_gY) {
                vd_M.vd_gY = 0.0;
                break;
              }
            }
          }
          if (vd_M.vd_gY != 0.0) {
            vd_M.vd_hi = vdgeo.vd_Ic(
              vd_M.SamplePoints,
              vd_M.Flag === 1,
              vd_M.vd_gY
            );
          }
        }
      }
    }
    if (vd_M.EcsMatrix != undefined) render.vd_aj(vd_M.EcsMatrix);
    var vd_ux;
    if (vd_M.ps && vd_M.ps.vd_P != undefined) {
      render.vd_eY(vd_M.ps.vd_P);
      vd_ux = render.vd_aQ(vd_M.vd_hi ? 0.0 : undefined);
      vd_gR(render, vd_M.SamplePoints, vd_M.Thickness, vd_M, vd_C);
      render.vd_aQ(vd_ux);
      render.vd_eY(null);
    }
    if (
      vd_M.HatchProperties == undefined ||
      vd_M.HatchProperties.DrawBoundary === undefined ||
      vd_M.HatchProperties.DrawBoundary ||
      (vd_M.Thickness && vd_M.Thickness != 0) ||
      render.vd_bY() == vdConst.vd_et
    ) {
      if (
        vd_M.vd_hi &&
        vd_M.ps &&
        (!vd_M.ps.lt ||
          !vd_M.ps.lt.Segments ||
          !vd_M.ps.lt.Segments.Items ||
          vd_M.ps.lt.Segments.Items.length === 0)
      ) {
        var p, v, p1, p2, n1, n2, u_p1, u_p2, u_n1, u_n2, vd_CE, vd_Bi, d;
        var vd_fs = [0, 0, 0];
        var vd_pK = [0, 0, 1];
        var vd_ov = 0,
          vd_pk = 0,
          angle,
          vd_sK,
          vd_sr;
        vd_ux = render.vd_aQ(0.0);
        var vd_zN = vd_M.SamplePoints.length - 1;
        var vd_bv = vd_M.Flag === 1;
        var vd_jc = vd_M.PLineDrawFlag;
        if (!vd_jc) {
          if (vd_C != null) vd_jc = vd_C.PLineDrawFlag;
          if (!vd_jc) vd_jc = vdConst.PLineDrawFlags_SolidWidths;
        }
        if (render.vd_zt) {
          var vd_Id = render.vd_zt(0, vd_M.vd_gY, 0);
          if (vd_Id < 3) vd_jc |= vdConst.PLineDrawFlags_WireWidths;
        }
        if (vd_bv && vd_M.SamplePoints.length == 3) {
          vd_bv = false;
          vd_zN -= 1;
        }
        for (i = 0; i < vd_zN; i++) {
          render.vd_aH = i;
          p = vd_M.SamplePoints[i];
          v = vd_M.vd_hi[i];
          p1 = [p[X] + v[X], p[Y] + v[Y], p[Z] + v[Z]];
          p2 = [p[X] - v[X], p[Y] - v[Y], p[Z] - v[Z]];
          p = vd_M.SamplePoints[i + 1];
          v = vd_M.vd_hi[i + 1];
          n1 = [p[X] + v[X], p[Y] + v[Y], p[Z] + v[Z]];
          n2 = [p[X] - v[X], p[Y] - v[Y], p[Z] - v[Z]];
          if (vd_jc & vdConst.PLineDrawFlags_SolidWidths)
            render.vd_vP(
              p1,
              n1,
              n2,
              p2,
              true,
              true,
              true,
              true,
              vd_pK,
              vd_fs,
              vd_fs,
              vd_fs,
              vd_fs
            );
          if (vd_jc & vdConst.PLineDrawFlags_WireWidths)
            render.vd_bt([p1, n1, n2, p2], true);
          if (vd_M.Thickness && vd_M.Thickness != 0) {
            u_p1 = [p1[X], p1[Y], p1[Z] + vd_M.Thickness];
            u_p2 = [p2[X], p2[Y], p2[Z] + vd_M.Thickness];
            u_n1 = [n1[X], n1[Y], n1[Z] + vd_M.Thickness];
            u_n2 = [n2[X], n2[Y], n2[Z] + vd_M.Thickness];
            angle = vdgeo.GetAngle(p1, n1);
            vd_sK = vdgeo.Distance3D(p1, n1);
            vd_sr = vdgeo.Distance3D(p2, n2);
            (vd_CE = [vd_ov, 0, 0]),
              (vd_IW = [vd_ov + vd_sK, 0, 0]),
              (vd_Ki = [vd_ov, vd_M.Thickness, 0]),
              (vd_IL = [vd_ov + vd_sK, vd_M.Thickness, 0]);
            (vd_Bi = [vd_pk, 0, 0]),
              (vd_Jb = [vd_pk + vd_sr, 0, 0]),
              (vd_Jz = [vd_pk, vd_M.Thickness, 0]),
              (vd_IJ = [vd_pk + vd_sr, vd_M.Thickness, 0]);
            if (vd_jc & vdConst.PLineDrawFlags_SolidWidths)
              render.vd_vP(
                u_p1,
                u_n1,
                u_n2,
                u_p2,
                true,
                true,
                true,
                true,
                vd_pK,
                vd_fs,
                vd_fs,
                vd_fs,
                vd_fs
              );
            var visibility = (vd_jc & vdConst.PLineDrawFlags_WireWidths) != 0;
            render.vd_hD(
              u_p1,
              u_n1,
              n1,
              p1,
              visibility,
              true,
              visibility,
              visibility,
              vdgeo.pointPolar(vd_fs, angle + vdgeo.HALF_PI, 1.0),
              vd_Ki,
              vd_IL,
              vd_IW,
              vd_CE
            );
            render.vd_hD(
              u_p2,
              u_n2,
              n2,
              p2,
              visibility,
              true,
              visibility,
              visibility,
              vdgeo.pointPolar(vd_fs, angle + vdgeo.HALF_PI, 1.0),
              vd_Jz,
              vd_IJ,
              vd_Jb,
              vd_Bi
            );
            if (i == 0) {
              d = vdgeo.Distance3D(p1, p2);
              render.vd_hD(
                u_p1,
                u_p2,
                p2,
                p1,
                visibility,
                true,
                visibility,
                true,
                vdgeo.pointPolar(vd_fs, angle, 1.0),
                [0, vd_M.Thickness, 0],
                [d, vd_M.Thickness, 0],
                [d, 0, 0],
                [0, 0, 0]
              );
            }
            if (visibility || i == vd_M.SamplePoints.length - 2) {
              d = vdgeo.Distance3D(n1, n2);
              render.vd_hD(
                u_n1,
                u_n2,
                n2,
                n1,
                visibility,
                visibility,
                visibility,
                visibility,
                vdgeo.pointPolar(vd_fs, angle, 1.0),
                [0, vd_M.Thickness, 0],
                [d, vd_M.Thickness, 0],
                [d, 0, 0],
                [0, 0, 0]
              );
            }
            vd_ov += vd_sK;
            vd_pk += vd_sr;
          }
        }
        render.vd_aH = undefined;
        render.vd_aQ(vd_ux);
      } else {
        if (vd_M.ps && vd_M.vd_gY) {
          vd_M.ps.pw = Math.abs(vd_M.vd_gY);
          vd_GJ(vd_M, render);
        }
        render.vd_iD(vd_M.SamplePoints, vd_M.Thickness, false);
      }
    }
    if (vd_M.EcsMatrix != undefined) render.vd_aW();
  }
  function vd_Pg(vd_M, render, vd_C) {
    var vd_ad = vd_M.TextString;
    vd_ad = vd_ad.replace(/\r\n/gi, "\n");
    vd_ad = vd_ad.replace(/\n/gi, "\n");
    vd_ad = vd_ad.replace(/\\P/gi, "\n");
    vd_ad = vd_ad.replace(/\t/gi, "    ");
    vd_ad = vd_ad.replace(/\\r/gi, "");
    if (vd_M.Height === 0.0) vd_M.Height = 1.0;
    if (vd_M.WidthFactor == undefined) vd_M.WidthFactor = 1.0;
    var vd_xE = vd_M.Height / vd_M.StyleRef.FontFileVDS.Ascent;
    if (vd_M.AlignToViewSize)
      vd_xE *= render.vd_qe(vd_M.AlignToViewSize, vd_M.Height);
    vd_xE *= vd_M.WidthFactor;
    if (!vd_M.BoxWidth) vd_M.BoxWidth = 0.0;
    var maxWidth = vd_M.BoxWidth / vd_xE;
    var vd_mf = "";
    vd_M.tb = [0, 0, 0, 0];
    var vd_vh = [];
    var uwidths = [];
    var owidths = [];
    var vd_fo = 0;
    var vd_uZ = 0;
    var vd_tl = false;
    var ulen, olen, u, o;
    var vd_pr = vd_ad.split("\n");
    for (var l = 0; l < vd_pr.length; l++) {
      var vd_hC = [];
      var vd_gO = [];
      var vd_nX;
      if (!vd_M.BoxWidth) vd_nX = [vd_pr[l]];
      else vd_nX = vd_pr[l].split(" ");
      for (var k = 0; k < vd_nX.length; k++) {
        var word = vd_nX[k];
        if (k != vd_nX.length - 1) word += " ";
        var width = 0;
        var rsb = 0;
        var vd_qQ = [];
        var vd_pg = [];
        for (var c = 0; c < word.length; c++) {
          if (word.substr(c, 3).match(/%%u/i)) {
            vd_qQ.push(width);
            c += 3;
          } else if (word.substr(c, 3).match(/%%o/i)) {
            vd_pg.push(width);
            c += 3;
          }
          var pos = word.charCodeAt(c);
          var vd_gC = vd_M.StyleRef.FontFileVDS.Shapes["h_" + pos.toString()];
          var shape = null;
          if (vd_gC != undefined)
            shape = vd_M.StyleRef.FontFileVDS.Shapes.Items[vd_gC];
          if (shape != null) {
            if (!vd_tl) vd_uZ = shape.bb[0];
            vd_tl = true;
            width += shape.AdvanceX;
            rsb = shape.AdvanceX - shape.bb[2];
          } else {
            width += vd_M.StyleRef.FontFileVDS.Ascent * 0.5;
            rsb = 0;
          }
        }
        width -= rsb;
        if (vd_fo == 0 || vd_fo + width <= maxWidth) {
          for (u = 0; u < vd_qQ.length; u++) vd_hC.push(vd_qQ[u] + vd_fo);
          for (o = 0; o < vd_pg.length; o++) vd_gO.push(vd_pg[o] + vd_fo);
          vd_fo += width;
          vd_mf = vd_mf.concat(word);
        } else {
          ulen = vd_hC.length % 2;
          olen = vd_gO.length % 2;
          if (ulen == 1) vd_hC.push(vd_fo);
          if (olen == 1) vd_gO.push(vd_fo);
          uwidths.push(vd_hC);
          vd_hC = [];
          owidths.push(vd_gO);
          vd_gO = [];
          if (ulen == 1) vd_hC.push(0);
          if (olen == 1) vd_gO.push(0);
          for (u = 0; u < vd_qQ.length; u++) vd_hC.push(vd_qQ[u]);
          for (o = 0; o < vd_pg.length; o++) vd_gO.push(vd_pg[o]);
          vd_vh.push([vd_mf, vd_fo]);
          vd_M.tb[1] = Math.max(vd_M.tb[1], vd_fo);
          vd_M.tb[0] = Math.min(vd_M.tb[0], vd_uZ);
          vd_tl = false;
          vd_fo = width;
          vd_mf = word;
        }
      }
      ulen = vd_hC.length % 2;
      olen = vd_gO.length % 2;
      if (ulen == 1) vd_hC.push(vd_fo);
      if (olen == 1) vd_gO.push(vd_fo);
      uwidths.push(vd_hC);
      vd_hC = [];
      owidths.push(vd_gO);
      vd_gO = [];
      vd_vh.push([vd_mf, vd_fo]);
      vd_M.tb[1] = Math.max(vd_M.tb[1], vd_fo);
      vd_M.tb[0] = Math.min(vd_M.tb[0], vd_uZ);
      vd_tl = false;
      vd_fo = 0;
      vd_mf = "";
    }
    vd_M.tb[3] =
      (vd_vh.length - 1) * -((vd_M.StyleRef.FontFileVDS.Ascent * 5) / 3) -
      vd_M.StyleRef.FontFileVDS.Ascent -
      vd_M.StyleRef.FontFileVDS.Descent;
    return [vd_vh, uwidths, owidths];
  }
  function vd_Fv(vd_M, render, vd_C) {
    if (vd_M.TextString == undefined || vd_M.TextString.length == 0) return;
    if (vd_M.StyleRef == undefined) {
      vd_M.StyleRef = vd_i.GetDictItem(vd_C.TextStyles, vd_M.Style);
    }
    if (vd_M.StyleRef == null) return;
    if (vd_M.StyleRef.FontFileVDS == null) return;
    if (
      vd_M.StyleRef.FontFileVDS.Shapes == null ||
      vd_M.StyleRef.FontFileVDS.Shapes == undefined
    )
      return;
    if (vd_M.tb == undefined) {
      var vd_va = vd_Pg(vd_M, render, vd_C, vd_M.BoxWidth);
      vd_M.testlines = vd_va[0];
      vd_M.uwidths = vd_va[1];
      vd_M.owidths = vd_va[2];
    }
    if (vd_M.EcsMatrix == undefined || vd_M.AlignToViewSize) {
      if (vd_M.Height === 0.0) vd_M.Height = 1.0;
      if (vd_M.Rotation == undefined) vd_M.Rotation = 0.0;
      if (vd_M.ExtrusionVector == undefined)
        vd_M.ExtrusionVector = vdgeo.newpoint(0, 0, 1);
      if (vd_M.WidthFactor == undefined) vd_M.WidthFactor = 1.0;
      if (vd_M.Flag == undefined)
        vd_M.Flag = vdConst.VdConstTextstyle_LEFTTORIGHT;
      var vd_jU = vd_M.Flag;
      if (vd_M.StyleRef.Flag != undefined) vd_jU |= vd_M.StyleRef.Flag;
      if (vd_M.Thickness == undefined) vd_M.Thickness = 0.0;
      if (vd_M.Bold == undefined) vd_M.Bold = false;
      if (vd_M.ObliqueAngle == undefined) vd_M.ObliqueAngle = 0.0;
      if (vd_M.TextLine == undefined)
        vd_M.TextLine = vdConst.TextLineFlags_None;
      var vd_ln = vd_M.tb[0];
      var vd_kd = 0;
      var dy = 0.0;
      var dx = 0.0;
      switch (vd_M.VerJustify) {
        case vdConst.VdConstVerJust_VdTextVerBottom:
          dy = -vd_M.tb[3];
          break;
        case vdConst.VdConstVerJust_VdTextVerCen:
          dy =
            -((vd_M.tb[2] + vd_M.tb[3]) / 2.0) -
            vd_M.StyleRef.FontFileVDS.Descent / 2.0;
          break;
        case vdConst.VdConstVerJust_VdTextVerTop:
          dy = -vd_M.tb[2];
          break;
        default:
          dy = -vd_M.tb[3] - vd_M.StyleRef.FontFileVDS.Descent;
          break;
      }
      switch (vd_M.HorJustify) {
        case vdConst.VdConstHorJust_VdTextHorCenter:
          dx = -vd_ln - vd_M.tb[1] / 2.0;
          break;
        case vdConst.VdConstHorJust_VdTextHorRight:
          dx = -vd_ln - vd_M.tb[1];
          break;
        default:
          dx = -vd_ln;
          break;
      }
      var scale = vd_M.Height / vd_M.StyleRef.FontFileVDS.Ascent;
      if (vd_M.AlignToViewSize)
        scale *= render.vd_qe(vd_M.AlignToViewSize, vd_M.Height);
      var ddx = 0.0;
      if (
        vd_M.ObliqueAngle !== 90.0 &&
        vd_M.ObliqueAngle !== 0.0 &&
        vd_M.ObliqueAngle !== 180.0 &&
        vd_M.ObliqueAngle !== 270.0
      )
        ddx =
          (vd_kd + vd_M.StyleRef.FontFileVDS.Ascent - dy) *
          Math.tan(vdgeo.DegreesToRadians(vd_M.ObliqueAngle));
      dx += ddx;
      var vd_vI =
        (vd_jU & vdConst.VdConstTextstyle_BACKWARD) ==
        vdConst.VdConstTextstyle_BACKWARD
          ? -1.0
          : 1.0;
      var vd_vy =
        (vd_jU & vdConst.VdConstTextstyle_UPSIDEDOWN) ==
        vdConst.VdConstTextstyle_UPSIDEDOWN
          ? -1.0
          : 1.0;
      vd_M.EcsMatrix = vdgeo.vd_Q();
      vdgeo.vd_bf(vd_M.EcsMatrix, scale, scale, 1.0);
      vdgeo.vd_j(vd_M.EcsMatrix, dx * scale, dy * scale, 0.0);
      vdgeo.vd_CA(
        vd_M.EcsMatrix,
        vdgeo.DegreesToRadians(vd_M.ObliqueAngle),
        0.0
      );
      vdgeo.vd_bf(vd_M.EcsMatrix, vd_vI * vd_M.WidthFactor, vd_vy, 1.0);
      vdgeo.vd_ap(vd_M.EcsMatrix, vd_M.Rotation);
      vdgeo.vd_cn(vd_M.EcsMatrix, vd_M.ExtrusionVector);
      vdgeo.vd_j(
        vd_M.EcsMatrix,
        vd_M.InsertionPoint[X],
        vd_M.InsertionPoint[Y],
        vd_M.InsertionPoint[Z]
      );
    }
    render.vd_aj(vd_M.EcsMatrix);
    var color;
    var vd_cY;
    var vd_bz = 0;
    if (
      vd_M.BackGroundMask &&
      vd_M.BackGroundMaskColor &&
      (vd_M.BackGroundMaskColor.SystemColor ||
        vd_M.BackGroundMaskColor.ColorIndex != undefined)
    ) {
      color = vd_M.BackGroundMaskColor.SystemColor;
      if (!color) color = render.vd_gQ(vd_M.BackGroundMaskColor.ColorIndex);
      vd_cY = render.vd_bF(color);
      if (vd_M.BackGroundMaskOffset)
        vd_bz =
          (vd_M.BackGroundMaskOffset * vd_M.StyleRef.FontFileVDS.Ascent) /
          vd_M.Height;
      render.vd_fH(
        [
          [-vd_bz + vd_M.tb[0], vd_M.tb[2] + vd_bz, 0],
          [vd_M.tb[1] + vd_bz, vd_M.tb[2] + vd_bz, 0],
          [vd_M.tb[1] + vd_bz, vd_M.tb[3] - vd_bz, 0],
          [-vd_bz + vd_M.tb[0], vd_M.tb[3] - vd_bz, 0],
        ],
        null,
        null,
        true
      );
      render.vd_bF(vd_cY);
    }
    if (vd_M.BackgroundMaskBorder) {
      color = render.vd_bF();
      if (
        vd_M.BackGroundMaskBorderColor &&
        (vd_M.BackGroundMaskBorderColor.SystemColor ||
          vd_M.BackGroundMaskBorderColor.ColorIndex != undefined)
      ) {
        color = vd_M.BackGroundMaskBorderColor.SystemColor;
        if (!color)
          color = render.vd_gQ(vd_M.BackGroundMaskBorderColor.ColorIndex);
      }
      var penwidth = render.vd_aQ();
      if (vd_M.BackGroundMaskBorderPenWidth) {
        penwidth =
          ((vd_M.BackGroundMaskBorderPenWidth / 100.0) * 96) / vdgeo.INCH_MM;
      }
      vd_cY = render.vd_bF(color);
      var vd_xb = render.vd_aQ(penwidth);
      render.vd_bt(
        [
          [-vd_bz + vd_M.tb[0], vd_M.tb[2] + vd_bz, 0],
          [vd_M.tb[1] + vd_bz, vd_M.tb[2] + vd_bz, 0],
          [vd_M.tb[1] + vd_bz, vd_M.tb[3] - vd_bz, 0],
          [-vd_bz + vd_M.tb[0], vd_M.tb[3] - vd_bz, 0],
        ],
        true
      );
      render.vd_aQ(vd_xb);
      render.vd_bF(vd_cY);
    }
    var vd_An = -vd_M.StyleRef.FontFileVDS.Ascent;
    var upts = [null, null];
    var opts = [null, null];
    var pos = -1;
    for (var tl = 0; tl < vd_M.testlines.length; tl++) {
      var vd_ad = vd_M.testlines[tl][0];
      var vd_if = vd_M.testlines[tl][1];
      vd_ad = vd_ad.replace(/%%u/gi, "");
      vd_ad = vd_ad.replace(/%%o/gi, "");
      var mat = vdgeo.vd_Q();
      var vd_vT = 0.0;
      switch (vd_M.HorJustify) {
        case vdConst.VdConstHorJust_VdTextHorCenter:
          vd_vT = (vd_M.tb[1] - vd_if) / 2.0;
          break;
        case vdConst.VdConstHorJust_VdTextHorRight:
          vd_vT = vd_M.tb[1] - vd_if;
          break;
        default:
          break;
      }
      vdgeo.vd_j(mat, vd_vT, vd_An, 0);
      render.vd_aj(mat);
      render.vd_rp(
        vd_ad,
        vd_if,
        vd_M.StyleRef.FontFileVDS.Ascent,
        vd_M.StyleRef.FontFileVDS
      );
      if ((vd_M.TextLine & vdConst.TextLineFlags_UnderLine) != 0) {
        render.vd_cP(
          vdgeo.newpoint(0, -vd_M.StyleRef.FontFileVDS.Descent, 0),
          vdgeo.newpoint(vd_if, -vd_M.StyleRef.FontFileVDS.Descent, 0)
        );
      } else {
        var vd_kJ = vd_M.uwidths[tl];
        for (var u = 0; u < vd_kJ.length; u++) {
          pos = u % 2;
          upts[pos] = vd_kJ[u];
          if (pos == 1)
            render.vd_cP(
              vdgeo.newpoint(upts[0], -vd_M.StyleRef.FontFileVDS.Descent, 0),
              vdgeo.newpoint(upts[1], -vd_M.StyleRef.FontFileVDS.Descent, 0)
            );
        }
      }
      if ((vd_M.TextLine & vdConst.TextLineFlags_OverLine) != 0) {
        render.vd_cP(
          vdgeo.newpoint(0, vd_M.StyleRef.FontFileVDS.Ascent * 1.25, 0),
          vdgeo.newpoint(vd_if, vd_M.StyleRef.FontFileVDS.Ascent * 1.25, 0)
        );
      } else {
        var vd_kr = vd_M.owidths[tl];
        for (var o = 0; o < vd_kr.length; o++) {
          pos = o % 2;
          upts[pos] = vd_kr[o];
          if (pos == 1)
            render.vd_cP(
              vdgeo.newpoint(
                upts[0],
                vd_M.StyleRef.FontFileVDS.Ascent * 1.25,
                0
              ),
              vdgeo.newpoint(
                upts[1],
                vd_M.StyleRef.FontFileVDS.Ascent * 1.25,
                0
              )
            );
        }
      }
      render.vd_aW();
      vd_An -= (vd_M.StyleRef.FontFileVDS.Ascent * 5) / 3;
    }
    render.vd_aW();
  }
  function vd_uv(vd_M, render, vd_C) {
    if (vd_M.TextString == undefined || vd_M.TextString.length == 0) return;
    if (
      vd_M.BoxWidth != undefined ||
      vd_M.TextString.search(/\\n/i) > 0 ||
      vd_M.TextString.search(/\n/i) > 0 ||
      vd_M.TextString.search(/\\N/i) > 0 ||
      vd_M.TextString.search(/\\P/i) > 0
    ) {
      vd_Fv(vd_M, render, vd_C);
      return;
    }
    var i = 0;
    if (vd_M.StyleRef == undefined) {
      vd_M.StyleRef = vd_i.GetDictItem(vd_C.TextStyles, vd_M.Style);
    }
    if (vd_M.StyleRef == null) return;
    if (vd_M.StyleRef.FontFileVDS == null) return;
    if (
      vd_M.StyleRef.FontFileVDS.Shapes == null ||
      vd_M.StyleRef.FontFileVDS.Shapes == undefined
    )
      return;
    if (vd_M.tb == undefined) {
      var vd_ad = vd_M.TextString;
      vd_ad = vd_ad.replace(/%%u/gi, "");
      vd_ad = vd_ad.replace(/%%o/gi, "");
      vd_ad = vd_ad.replace(/\t/gi, "    ");
      vd_ad = vd_ad.replace("\\t", "    ");
      vd_M.DiplayString = vd_ad;
      var rsb = 0;
      vd_M.tb = [0, 0, 0, 0];
      var vd_wv = 0;
      var vd_hJ = [];
      for (var c = 0; c < vd_M.DiplayString.length; c++) {
        var pos = vd_M.DiplayString.charCodeAt(c);
        if (pos == 10 || pos == 13) {
          vd_wv++;
          continue;
        }
        if (pos == 32) vd_wv++;
        var vd_gC = vd_M.StyleRef.FontFileVDS.Shapes["h_" + pos.toString()];
        var shape = null;
        if (vd_gC != undefined)
          shape = vd_M.StyleRef.FontFileVDS.Shapes.Items[vd_gC];
        if (c == 0 && shape != null) vd_M.tb[0] = shape.bb[0];
        if (shape != null) {
          vd_M.tb[1] += shape.AdvanceX;
          rsb = shape.AdvanceX - shape.bb[2];
          vd_M.tb[2] = Math.min(vd_M.tb[2], shape.bb[1]);
          vd_M.tb[3] = Math.max(vd_M.tb[3], shape.bb[3]);
        } else {
          vd_M.tb[1] += vd_M.StyleRef.FontFileVDS.Ascent * 0.5;
          rsb = 0;
        }
        vd_hJ.push(vd_M.tb[1] - rsb);
      }
      vd_M.tb[1] -= rsb;
      if (vd_wv == vd_M.DiplayString.length) vd_M.DiplayString = null;
      var uwidths = null;
      var owidths = null;
      var vd_ac = vd_M.TextString;
      vd_ac = vd_ac.replace(/%%U/g, "%%u");
      vd_ac = vd_ac.replace(/%%O/g, "%%o");
      if (vd_M.TextLine) {
        if ((vd_M.TextLine & vdConst.TextLineFlags_UnderLine) != 0) {
          vd_ac = vd_ac.replace(/%%u/gi, "");
          vd_ac = "%%u" + vd_ac;
        }
        if ((vd_M.TextLine & vdConst.TextLineFlags_OverLine) != 0) {
          vd_ac = vd_ac.replace(/%%o/gi, "");
          vd_ac = "%%o" + vd_ac;
        }
      }
      var str = "";
      var sl = 0;
      var vd_kJ = vd_ac.split("%%u");
      if (vd_kJ.length > 1) {
        uwidths = [];
        str = vd_kJ[0].replace(/%%o/gi, "");
        if (str.length == 0) sl = 0;
        else sl = vd_hJ[str.length - 1];
        uwidths.push(vd_M.tb[0] + sl);
        for (i = 1; i < vd_kJ.length; i++) {
          str += vd_kJ[i].replace(/%%o/gi, "");
          if (str.length == 0) sl = 0;
          else sl = vd_hJ[str.length - 1];
          uwidths.push(vd_M.tb[0] + sl);
        }
        if (uwidths.length % 2 == 0) uwidths.push(vd_M.tb[0] + vd_M.tb[1]);
      }
      var vd_kr = vd_ac.split("%%o");
      if (vd_kr.length > 1) {
        owidths = [];
        str = vd_kr[0].replace(/%%u/gi, "");
        if (str.length == 0) sl = 0;
        else sl = vd_hJ[str.length - 1];
        owidths.push(vd_M.tb[0] + sl);
        for (i = 1; i < vd_kr.length; i++) {
          str += vd_kr[i].replace(/%%u/gi, "");
          if (str.length == 0) sl = 0;
          else sl = vd_hJ[str.length - 1];
          owidths.push(vd_M.tb[0] + sl);
        }
        if (owidths.length % 2 == 0) owidths.push(vd_M.tb[0] + vd_M.tb[1]);
      }
      vd_M.uwidths = uwidths;
      vd_M.owidths = owidths;
    }
    if (vd_M.EcsMatrix == undefined || vd_M.AlignToViewSize) {
      if (vd_M.Height === 0.0) vd_M.Height = 1.0;
      if (vd_M.Rotation == undefined) vd_M.Rotation = 0.0;
      if (vd_M.ExtrusionVector == undefined)
        vd_M.ExtrusionVector = vdgeo.newpoint(0, 0, 1);
      if (vd_M.WidthFactor == undefined) vd_M.WidthFactor = 1.0;
      if (vd_M.Flag == undefined)
        vd_M.Flag = vdConst.VdConstTextstyle_LEFTTORIGHT;
      var vd_jU = vd_M.Flag;
      if (vd_M.StyleRef.Flag != undefined) vd_jU |= vd_M.StyleRef.Flag;
      if (vd_M.Thickness == undefined) vd_M.Thickness = 0.0;
      if (vd_M.Bold == undefined) vd_M.Bold = false;
      if (vd_M.ObliqueAngle == undefined) vd_M.ObliqueAngle = 0.0;
      if (vd_M.TextLine == undefined)
        vd_M.TextLine = vdConst.TextLineFlags_None;
      var vd_ln = vd_M.tb[0];
      var vd_kd = -vd_M.StyleRef.FontFileVDS.Ascent;
      var dy = 0.0;
      var dx = 0.0;
      switch (vd_M.VerJustify) {
        case vdConst.VdConstVerJust_VdTextVerBottom:
          dy =
            vd_kd +
            vd_M.StyleRef.FontFileVDS.Descent +
            vd_M.StyleRef.FontFileVDS.Ascent;
          break;
        case vdConst.VdConstVerJust_VdTextVerCen:
          dy = vd_kd + vd_M.StyleRef.FontFileVDS.Ascent / 2.0;
          break;
        case vdConst.VdConstVerJust_VdTextVerTop:
          dy = vd_kd;
          break;
        default:
          dy = vd_kd + vd_M.StyleRef.FontFileVDS.Ascent;
          break;
      }
      switch (vd_M.HorJustify) {
        case vdConst.VdConstHorJust_VdTextHorCenter:
          dx = -vd_ln - vd_M.tb[1] / 2.0;
          break;
        case vdConst.VdConstHorJust_VdTextHorRight:
          dx = -vd_ln - vd_M.tb[1];
          break;
        default:
          dx = -vd_ln;
          break;
      }
      var scale = vd_M.Height / vd_M.StyleRef.FontFileVDS.Ascent;
      if (vd_M.AlignToViewSize)
        scale *= render.vd_qe(vd_M.AlignToViewSize, vd_M.Height);
      var ddx = 0.0;
      if (
        vd_M.ObliqueAngle !== 90.0 &&
        vd_M.ObliqueAngle !== 0.0 &&
        vd_M.ObliqueAngle !== 180.0 &&
        vd_M.ObliqueAngle !== 270.0
      )
        ddx =
          (vd_kd + vd_M.StyleRef.FontFileVDS.Ascent - dy) *
          Math.tan(vdgeo.DegreesToRadians(vd_M.ObliqueAngle));
      dx += ddx;
      var vd_vI =
        (vd_jU & vdConst.VdConstTextstyle_BACKWARD) ==
        vdConst.VdConstTextstyle_BACKWARD
          ? -1.0
          : 1.0;
      var vd_vy =
        (vd_jU & vdConst.VdConstTextstyle_UPSIDEDOWN) ==
        vdConst.VdConstTextstyle_UPSIDEDOWN
          ? -1.0
          : 1.0;
      vd_M.EcsMatrix = vdgeo.vd_Q();
      vdgeo.vd_bf(vd_M.EcsMatrix, scale, scale, 1.0);
      vdgeo.vd_j(vd_M.EcsMatrix, dx * scale, dy * scale, 0.0);
      vdgeo.vd_CA(
        vd_M.EcsMatrix,
        vdgeo.DegreesToRadians(vd_M.ObliqueAngle),
        0.0
      );
      vdgeo.vd_bf(vd_M.EcsMatrix, vd_vI * vd_M.WidthFactor, vd_vy, 1.0);
      vdgeo.vd_ap(vd_M.EcsMatrix, vd_M.Rotation);
      vdgeo.vd_cn(vd_M.EcsMatrix, vd_M.ExtrusionVector);
      vdgeo.vd_j(
        vd_M.EcsMatrix,
        vd_M.InsertionPoint[X],
        vd_M.InsertionPoint[Y],
        vd_M.InsertionPoint[Z]
      );
    }
    render.vd_aj(vd_M.EcsMatrix);
    var color;
    var vd_cY;
    if (
      vd_M.BackGroundMask &&
      vd_M.BackGroundMaskColor &&
      (vd_M.BackGroundMaskColor.SystemColor ||
        vd_M.BackGroundMaskColor.ColorIndex != undefined)
    ) {
      color = vd_M.BackGroundMaskColor.SystemColor;
      if (!color) color = render.vd_gQ(vd_M.BackGroundMaskColor.ColorIndex);
      vd_cY = render.vd_bF(color);
      var vd_bz = 0;
      if (vd_M.BackGroundMaskOffset)
        vd_bz =
          (vd_M.BackGroundMaskOffset * vd_M.StyleRef.FontFileVDS.Ascent) /
          vd_M.Height;
      render.vd_fH(
        [
          [-vd_bz, vd_M.tb[2] - vd_bz, 0],
          [vd_M.tb[1] + vd_bz, vd_M.tb[2] - vd_bz, 0],
          [vd_M.tb[1] + vd_bz, vd_M.tb[3] + vd_bz, 0],
          [-vd_bz, vd_M.tb[3] + vd_bz, 0],
        ],
        null,
        null,
        true
      );
      render.vd_bF(vd_cY);
    }
    if (vd_M.BackgroundMaskBorder) {
      color = render.vd_bF();
      if (
        vd_M.BackGroundMaskBorderColor &&
        (vd_M.BackGroundMaskBorderColor.SystemColor ||
          vd_M.BackGroundMaskBorderColor.ColorIndex != undefined)
      ) {
        color = vd_M.BackGroundMaskBorderColor.SystemColor;
        if (!color)
          color = render.vd_gQ(vd_M.BackGroundMaskBorderColor.ColorIndex);
      }
      var penwidth = render.vd_aQ();
      if (vd_M.BackGroundMaskBorderPenWidth) {
        penwidth =
          ((vd_M.BackGroundMaskBorderPenWidth / 100.0) * 96) / vdgeo.INCH_MM;
      }
      vd_cY = render.vd_bF(color);
      var vd_xb = render.vd_aQ(penwidth);
      render.vd_bt(
        [
          [-vd_bz, vd_M.tb[2] - vd_bz, 0],
          [vd_M.tb[1] + vd_bz, vd_M.tb[2] - vd_bz, 0],
          [vd_M.tb[1] + vd_bz, vd_M.tb[3] + vd_bz, 0],
          [-vd_bz, vd_M.tb[3] + vd_bz, 0],
        ],
        true
      );
      render.vd_aQ(vd_xb);
      render.vd_bF(vd_cY);
    }
    render.vd_rp(
      vd_M.DiplayString,
      vd_M.tb[1],
      vd_M.StyleRef.FontFileVDS.Ascent,
      vd_M.StyleRef.FontFileVDS
    );
    var topy = vd_M.StyleRef.FontFileVDS.Ascent * 1.25;
    var vd_Fr = -vd_M.StyleRef.FontFileVDS.Descent;
    if (vd_M.uwidths) {
      for (i = 1; i < vd_M.uwidths.length; i += 2) {
        if (
          vdgeo.AreEqual(
            vd_M.uwidths[i - 1],
            vd_M.uwidths[i],
            vdgeo.DefaultLinearEquality
          )
        )
          continue;
        render.vd_cP(
          vdgeo.newpoint(vd_M.uwidths[i - 1], vd_Fr, 0),
          vdgeo.newpoint(vd_M.uwidths[i], vd_Fr, 0)
        );
      }
    }
    if (vd_M.owidths) {
      for (i = 1; i < vd_M.owidths.length; i += 2) {
        if (
          vdgeo.AreEqual(
            vd_M.owidths[i - 1],
            vd_M.owidths[i],
            vdgeo.DefaultLinearEquality
          )
        )
          continue;
        render.vd_cP(
          vdgeo.newpoint(vd_M.owidths[i - 1], topy, 0),
          vdgeo.newpoint(vd_M.owidths[i], topy, 0)
        );
      }
    }
    if ((vd_M.TextLine & vdConst.TextLineFlags_CenterLine) != 0) {
      render.vd_cP(
        vdgeo.newpoint(0, vd_M.StyleRef.FontFileVDS.Ascent * 0.5, 0),
        vdgeo.newpoint(vd_M.tb[1], vd_M.StyleRef.FontFileVDS.Ascent * 0.5, 0)
      );
    }
    render.vd_aW();
  }
  function vd_FG(vd_M, render, vd_C) {
    if (vd_M.EcsMatrix == undefined) {
      var rotation = 0.0;
      var vd_cA = vdgeo.newpoint(0, 0, 1);
      var vd_g = vdgeo.newpoint(0, 0, 0);
      if (vd_M.Rotation != undefined) rotation = vd_M.Rotation;
      if (vd_M.ExtrusionVector != undefined)
        vd_cA = vdgeo.newpoint(
          vd_M.ExtrusionVector[X],
          vd_M.ExtrusionVector[Y],
          vd_M.ExtrusionVector[Z]
        );
      if (vd_M.InsertionPoint != undefined)
        vd_g = vdgeo.newpoint(
          vd_M.InsertionPoint[X],
          vd_M.InsertionPoint[Y],
          vd_M.InsertionPoint[Z]
        );
      vd_M.EcsMatrix = vdgeo.vd_Q();
      vdgeo.vd_ap(vd_M.EcsMatrix, rotation);
      vdgeo.vd_cn(vd_M.EcsMatrix, vd_cA);
      vdgeo.vd_j(vd_M.EcsMatrix, vd_g[X], vd_g[Y], vd_g[Z]);
    }
    if (vd_M.SamplePoints == undefined) {
      vd_M.SamplePoints = [
        vdgeo.newpoint(0, 0, 0),
        vdgeo.newpoint(vd_M.Width, 0, 0),
        vdgeo.newpoint(vd_M.Width, vd_M.Height, 0),
        vdgeo.newpoint(0, vd_M.Height, 0),
      ];
      vd_M.SamplePoints.reverse();
    }
    render.vd_aj(vd_M.EcsMatrix);
    if (vd_M.ps && vd_M.ps.vd_P != undefined) {
      render.vd_eY(vd_M.ps.vd_P);
      vd_gR(render, vd_M.SamplePoints, vd_M.Thickness, vd_M, vd_C);
      render.vd_eY(null);
    }
    if (
      vd_M.HatchProperties == undefined ||
      vd_M.HatchProperties.DrawBoundary === undefined ||
      vd_M.HatchProperties.DrawBoundary ||
      (vd_M.Thickness && vd_M.Thickness != 0) ||
      render.vd_bY() == vdConst.vd_et
    )
      render.vd_iD(vd_M.SamplePoints, vd_M.Thickness, true);
    render.vd_aW();
  }
  function vd_FE(vd_M, render, vd_C) {
    if (vd_M.EcsMatrix == undefined) {
      var rotation = 0.0;
      var vd_cA = vdgeo.newpoint(0, 0, 1);
      var vd_g = vdgeo.newpoint(0, 0, 0);
      if (vd_M.Rotation != undefined) rotation = vd_M.Rotation;
      if (vd_M.ExtrusionVector != undefined)
        vd_cA = vdgeo.newpoint(
          vd_M.ExtrusionVector[X],
          vd_M.ExtrusionVector[Y],
          vd_M.ExtrusionVector[Z]
        );
      if (vd_M.InsertionPoint != undefined)
        vd_g = vdgeo.newpoint(
          vd_M.InsertionPoint[X],
          vd_M.InsertionPoint[Y],
          vd_M.InsertionPoint[Z]
        );
      vd_M.EcsMatrix = vdgeo.vd_Q();
      vdgeo.vd_ap(vd_M.EcsMatrix, rotation);
      vdgeo.vd_cn(vd_M.EcsMatrix, vd_cA);
      vdgeo.vd_j(vd_M.EcsMatrix, vd_g[X], vd_g[Y], vd_g[Z]);
    }
    render.vd_aj(vd_M.EcsMatrix);
    var k;
    var vd_v = vd_i.GetDictItem(vd_C.Images, vd_M.ImageDefinition);
    if (vd_v != null && vd_v.bytes != undefined) {
      if (!vd_M.Height || vd_M.KeepAspect !== false)
        vd_M.Height = (vd_M.Width * vd_v.height) / vd_v.width;
      vd_M.ImageScale = vd_M.Width;
      if (
        (vd_M.Display & 4) != 0 &&
        vd_M.ClipBoundary &&
        vd_M.ClipBoundary.Items.length > 2
      ) {
        var vd_ft = render.vd_dV(vdgeo.vd_CV(0, 0, vd_M.Width, vd_M.Height));
        if (!vd_M.ImageClipPts || !vd_M.ImageClipUVS) {
          var vd_zZ = vdgeo.vd_Q();
          var vd_DL = vdgeo.vd_Q();
          var vd_MV =
            vd_M.Height /
            (vd_v.OriginalHeight ? vd_v.OriginalHeight : vd_v.height);
          var vd_Nh =
            vd_M.Width / (vd_v.OriginalWidth ? vd_v.OriginalWidth : vd_v.width);
          vdgeo.vd_bf(vd_zZ, vd_Nh, -vd_MV, 1.0);
          vdgeo.vd_j(vd_zZ, 0.0, vd_M.Height, 0);
          vdgeo.vd_bf(vd_DL, 1 / vd_M.Width, 1 / vd_M.Height, 1.0);
          var pts = vdgeo.vd_eq(vd_zZ, vd_M.ClipBoundary.Items);
          if (vd_v.OriginalHeight) {
            var vd_DK = vdgeo.vd_Q();
            vdgeo.vd_bf(
              vd_DK,
              vd_v.width / vd_v.OriginalWidth,
              vd_v.height / vd_v.OriginalHeight,
              1.0
            );
            vd_M.ClipBoundary.Items = vdgeo.vd_eq(
              vd_DK,
              vd_M.ClipBoundary.Items
            );
            vd_v.OriginalHeight = undefined;
            vd_v.OriginalWidth = undefined;
          }
          var vd_Bh = [
            vdgeo.newpoint(0, 0, 0),
            vdgeo.newpoint(vd_M.Width, 0, 0),
            vdgeo.newpoint(vd_M.Width, vd_M.Height, 0),
            vdgeo.newpoint(0, vd_M.Height, 0),
            vdgeo.newpoint(0, 0, 0),
          ];
          vd_M.ImageClipPts = gpc.clip_oper(
            [pts, vd_Bh],
            [gpc.OPER_INT, gpc.OPER_INT]
          );
          if (!vd_M.ImageClipPts || vd_M.ImageClipPts.length == 0)
            vd_M.ImageClipPts = [vd_Bh];
          vd_M.ImageClipUVS = [];
          for (k = 0; k < vd_M.ImageClipPts.length; k++) {
            vd_M.ImageClipUVS.push(vdgeo.vd_eq(vd_DL, vd_M.ImageClipPts[k]));
          }
        }
        for (k = 0; k < vd_M.ImageClipPts.length; k++) {
          render.vd_fJ(
            vd_M.ImageClipPts[k],
            vdgeo.newpoint(0, 0, 1),
            vd_M.ImageClipUVS[k],
            vd_v,
            true
          );
        }
        render.vd_dV(vd_ft);
      } else {
        render.vd_qj(vd_v, (vd_M.Display & 8) == 8, vd_M.Width, vd_M.Height);
      }
    }
    if ((vd_M.Display & 16) == 0 || vd_M.Display == 0) {
      if (vd_M.ImageClipPts) {
        for (k = 0; k < vd_M.ImageClipPts.length; k++) {
          render.vd_bt(vd_M.ImageClipPts[k], true);
        }
      } else
        render.vd_bt(
          [
            vdgeo.newpoint(0, 0, 0),
            vdgeo.newpoint(vd_M.Width, 0, 0),
            vdgeo.newpoint(vd_M.Width, vd_M.Height, 0),
            vdgeo.newpoint(0, vd_M.Height, 0),
          ],
          true
        );
    }
    render.vd_aW();
  }
  function vd_Jj(vd_M, render, vd_C) {
    if (vd_M.EcsMatrix == undefined || vd_M.AlignToViewSize) {
      var vd_cA = vdgeo.newpoint(0, 0, 1);
      var vd_g = vdgeo.newpoint(0, 0, 0);
      if (vd_M.ExtrusionVector != undefined)
        vd_cA = vdgeo.newpoint(
          vd_M.ExtrusionVector[X],
          vd_M.ExtrusionVector[Y],
          vd_M.ExtrusionVector[Z]
        );
      if (vd_M.Center != undefined)
        vd_g = vdgeo.newpoint(vd_M.Center[X], vd_M.Center[Y], vd_M.Center[Z]);
      vd_M.EcsMatrix = vdgeo.vd_Q();
      if (vd_M.AlignToViewSize) {
        render.vd_tk(vd_M.AlignToViewSize, vd_M.EcsMatrix, vd_M.Radius * 2.0);
      }
      vdgeo.vd_cn(vd_M.EcsMatrix, vd_cA);
      vdgeo.vd_j(vd_M.EcsMatrix, vd_g[X], vd_g[Y], vd_g[Z]);
    }
    if (vd_M.SamplePoints == undefined || vd_M.AlignToViewSize) {
      var vd_en = vdgeo.vd_iy(
        vdgeo.CURVERESOLUTION,
        render.vd_dk(),
        vd_M.Radius,
        vdgeo.VD_TWOPI
      );
      vd_M.SamplePoints = vdgeo.vd_sW(
        vd_en,
        vd_M.Radius,
        0.0,
        vdgeo.VD_TWOPI,
        0
      );
      vd_M.SamplePoints.push(
        vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), 0.0, vd_M.Radius)
      );
      vd_M.SamplePoints.reverse();
    }
    render.vd_aj(vd_M.EcsMatrix);
    if (vd_M.ps && vd_M.ps.vd_P != undefined) {
      render.vd_eY(vd_M.ps.vd_P);
      vd_gR(render, vd_M.SamplePoints, vd_M.Thickness, vd_M, vd_C);
      render.vd_eY(null);
    }
    if (
      vd_M.HatchProperties == undefined ||
      vd_M.HatchProperties.DrawBoundary === undefined ||
      vd_M.HatchProperties.DrawBoundary ||
      (vd_M.Thickness && vd_M.Thickness != 0) ||
      render.vd_bY() == vdConst.vd_et
    )
      render.vd_iD(vd_M.SamplePoints, vd_M.Thickness, false);
    render.vd_aW();
  }
  function vd_KB(vd_M, render, vd_C) {
    if (vd_M.EcsMatrix == undefined) {
      var vd_cA = vdgeo.newpoint(0, 0, 1);
      var vd_g = vdgeo.newpoint(0, 0, 0);
      if (vd_M.ExtrusionVector != undefined)
        vd_cA = vdgeo.newpoint(
          vd_M.ExtrusionVector[X],
          vd_M.ExtrusionVector[Y],
          vd_M.ExtrusionVector[Z]
        );
      if (vd_M.Center != undefined)
        vd_g = vdgeo.newpoint(vd_M.Center[X], vd_M.Center[Y], vd_M.Center[Z]);
      vd_M.EcsMatrix = vdgeo.vd_Q();
      vdgeo.vd_cn(vd_M.EcsMatrix, vd_cA);
      vdgeo.vd_j(vd_M.EcsMatrix, vd_g[X], vd_g[Y], vd_g[Z]);
    }
    if (vd_M.SamplePoints == undefined) {
      if (vd_M.StartAngle == undefined) vd_M.StartAngle = 0.0;
      if (vd_M.EndAngle == undefined) vd_M.EndAngle = 0.0;
      var da = vdgeo.FixAngle(vd_M.EndAngle) - vdgeo.FixAngle(vd_M.StartAngle);
      var vd_en = vdgeo.vd_iy(
        vdgeo.CURVERESOLUTION,
        render.vd_dk(),
        vd_M.Radius,
        da
      );
      vd_M.SamplePoints = vdgeo.vd_sW(
        vd_en,
        vd_M.Radius,
        vd_M.StartAngle,
        vd_M.EndAngle,
        0
      );
      vd_M.SamplePoints.push(
        vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), vd_M.EndAngle, vd_M.Radius)
      );
      vd_M.SamplePoints.reverse();
    }
    render.vd_aj(vd_M.EcsMatrix);
    var vd_cm = vd_M.SamplePoints;
    var closed = false;
    if (vd_M.ps && vd_M.ps.vd_P != undefined) {
      vd_cm = vd_cm.concat([vdgeo.newpoint(0, 0, 0)]);
      closed = true;
      render.vd_eY(vd_M.ps.vd_P);
      vd_gR(render, vd_cm, vd_M.Thickness, vd_M, vd_C);
      render.vd_eY(null);
    }
    if (
      vd_M.HatchProperties == undefined ||
      vd_M.HatchProperties.DrawBoundary === undefined ||
      vd_M.HatchProperties.DrawBoundary ||
      (vd_M.Thickness && vd_M.Thickness != 0) ||
      render.vd_bY() == vdConst.vd_et
    )
      render.vd_iD(vd_cm, vd_M.Thickness, closed);
    render.vd_aW();
  }
  function vd_Jp(vd_M, render, vd_C) {
    if (vd_M.EcsMatrix == undefined) {
      var vd_cA = vdgeo.newpoint(0, 0, 1);
      var vd_g = vdgeo.newpoint(0, 0, 0);
      if (vd_M.ExtrusionVector != undefined)
        vd_cA = vdgeo.newpoint(
          vd_M.ExtrusionVector[X],
          vd_M.ExtrusionVector[Y],
          vd_M.ExtrusionVector[Z]
        );
      if (vd_M.Center != undefined)
        vd_g = vdgeo.newpoint(vd_M.Center[X], vd_M.Center[Y], vd_M.Center[Z]);
      vd_M.EcsMatrix = vdgeo.vd_Q();
      if (vd_M.MajorAngle != undefined)
        vdgeo.vd_ap(vd_M.EcsMatrix, vd_M.MajorAngle);
      vdgeo.vd_cn(vd_M.EcsMatrix, vd_cA);
      vdgeo.vd_j(vd_M.EcsMatrix, vd_g[X], vd_g[Y], vd_g[Z]);
    }
    if (vd_M.SamplePoints == undefined) {
      if (vd_M.StartAngle == undefined) vd_M.StartAngle = 0.0;
      if (vd_M.EndAngle == undefined) vd_M.EndAngle = 0.0;
      var da = vdgeo.FixAngle(vd_M.EndAngle) - vdgeo.FixAngle(vd_M.StartAngle);
      var vd_en = vdgeo.vd_rI(
        vdgeo.CURVERESOLUTION,
        render.vd_dk(),
        vd_M.MajorLength,
        da
      );
      vd_M.SamplePoints = vdgeo.vd_rT(
        vd_en,
        vd_M.MajorLength,
        vd_M.MinorLength,
        vd_M.StartAngle,
        vd_M.EndAngle
      );
      vd_M.SamplePoints.reverse();
    }
    render.vd_aj(vd_M.EcsMatrix);
    var vd_cm = vd_M.SamplePoints;
    var closed = false;
    if (vd_M.ps && vd_M.ps.vd_P != undefined) {
      if (!vdgeo.vd_Em(vd_cm)) {
        vd_cm = vd_cm.concat([vdgeo.newpoint(0, 0, 0)]);
        closed = true;
      }
      render.vd_eY(vd_M.ps.vd_P);
      vd_gR(render, vd_cm, vd_M.Thickness, vd_M, vd_C);
      render.vd_eY(null);
    }
    if (
      vd_M.HatchProperties == undefined ||
      vd_M.HatchProperties.DrawBoundary === undefined ||
      vd_M.HatchProperties.DrawBoundary ||
      (vd_M.Thickness && vd_M.Thickness != 0) ||
      render.vd_bY() == vdConst.vd_et
    )
      render.vd_iD(vd_cm, vd_M.Thickness, closed);
    render.vd_aW();
  }
  function vd_GF(vd_M, render, vd_C) {
    var k = 0;
    if (vd_M.ExtrusionVector != undefined && vd_M.EcsMatrix == undefined) {
      var vd_cA = vdgeo.newpoint(
        vd_M.ExtrusionVector[X],
        vd_M.ExtrusionVector[Y],
        vd_M.ExtrusionVector[Z]
      );
      vd_M.EcsMatrix = vdgeo.vd_Q();
      vdgeo.vd_cn(vd_M.EcsMatrix, vd_cA);
    }
    if (
      vd_M.ps &&
      vd_M.ps.MaterialMatrix != null &&
      vd_M.EcsMatrix == undefined
    )
      vd_M.EcsMatrix = vdgeo.vd_Q();
    if (vd_M.EcsMatrix != undefined) render.vd_aj(vd_M.EcsMatrix);
    if (vd_M.ps && vd_M.ps.vd_P != undefined) {
      if ((!vd_M.Curves || vd_M.Curves.Items.length == 0) && vd_M.OutLines) {
        if (
          !vd_M.Opers ||
          vd_M.Opers.Items.length != vd_M.OutLines.Items.length
        ) {
          vd_M.Opers = { Items: [] };
          for (var i = 0; i < vd_M.OutLines.Items.length; i++)
            vd_M.Opers.Items.push(gpc.OPER_XOR);
        }
        var vd_zn = [];
        for (var i = 0; i < vd_M.OutLines.Items.length; i++) {
          vd_zn.push(vd_M.OutLines.Items[i].Items);
        }
        var vd_Ex = gpc.clip_oper(vd_zn, vd_M.Opers.Items);
        vd_M.Curves = { Items: [] };
        for (var i = 0; i < vd_Ex.length; i++) {
          vd_M.Curves.Items.push({ Items: vd_Ex[i] });
        }
      }
      if (vd_M.Curves != undefined) {
        render.vd_eY(vd_M.ps.vd_P);
        for (k = 0; k < vd_M.Curves.Items.length; k++) {
          vd_gR(
            render,
            vd_M.Curves.Items[k].Items,
            vd_M.Thickness,
            vd_M.Curves.Items[k],
            vd_C
          );
        }
        render.vd_eY(null);
      }
    }
    if (
      vd_M.HatchProperties == undefined ||
      vd_M.HatchProperties.DrawBoundary === undefined ||
      vd_M.HatchProperties.DrawBoundary ||
      (vd_M.Thickness && vd_M.Thickness != 0) ||
      render.vd_bY() == vdConst.vd_et
    ) {
      if (vd_M.OutLines != undefined) {
        for (k = 0; k < vd_M.OutLines.Items.length; k++) {
          render.vd_iD(vd_M.OutLines.Items[k].Items, vd_M.Thickness, true);
        }
      }
    }
    if (vd_M.EcsMatrix != undefined) render.vd_aW();
  }
  function vd_rD(vd_rY, vd_cs) {
    var k = -1;
    for (var i = 0; i < vd_cs.length; i++) {
      if (vd_rY < vd_cs[i].Key) break;
      k = i;
    }
    if (k == -1) return vd_cs[0].Value;
    if (k == vd_cs.length - 1) return vd_cs[vd_cs.length - 1].Value;
    var vd_gq = (vd_rY - vd_cs[k].Key) / (vd_cs[k + 1].Key - vd_cs[k].Key);
    var c1 = vd_cs[k].Value;
    var c2 = vd_cs[k + 1].Value;
    return [
      c1[0] + (c2[0] - c1[0]) * vd_gq,
      c1[1] + (c2[1] - c1[1]) * vd_gq,
      c1[2] + (c2[2] - c1[2]) * vd_gq,
    ];
  }
  function vd_BM(p0, p1, p2, p3, tmat, normal, uv0, uv1, uv2, uv3, vd_cs) {
    var vd_Os = vdgeo.vd_Hr(p0, p1, p2, p3, normal);
    if (vd_cs) {
      var col = vd_rD(p0[Z], vd_cs);
      uv0[0] = col[0];
      uv0[1] = col[1];
      uv0[2] = col[2];
      col = vd_rD(p1[Z], vd_cs);
      uv1[0] = col[0];
      uv1[1] = col[1];
      uv1[2] = col[2];
      col = vd_rD(p2[Z], vd_cs);
      uv2[0] = col[0];
      uv2[1] = col[1];
      uv2[2] = col[2];
      col = vd_rD(p3[Z], vd_cs);
      uv3[0] = col[0];
      uv3[1] = col[1];
      uv3[2] = col[2];
    } else if (vd_Os && tmat) {
      var vd_nc = vdgeo.vd_Q();
      var _uv0 = vdgeo.newpoint(0, 0, 0);
      var _uv1 = vdgeo.newpoint(0, 0, 0);
      var _uv2 = vdgeo.newpoint(0, 0, 0);
      var _uv3 = vdgeo.newpoint(0, 0, 0);
      vdgeo.vd_cn(vd_nc, normal);
      var useZ =
        tmat[A22] != 1 || (tmat[A30] != 0 && tmat[A31] != 0 && tmat.A33 != 1);
      vdgeo.vd_me(vd_nc);
      vdgeo.vd_eU(vd_nc, p0, _uv0);
      vdgeo.vd_eU(vd_nc, p1, _uv1);
      vdgeo.vd_eU(vd_nc, p2, _uv2);
      vdgeo.vd_eU(vd_nc, p3, _uv3);
      if (!useZ) {
        _uv0[Z] = _uv1[Z] = _uv2[Z] = _uv3[Z] = 0;
      }
      vdgeo.vd_eU(tmat, _uv0, uv0);
      vdgeo.vd_eU(tmat, _uv1, uv1);
      vdgeo.vd_eU(tmat, _uv2, uv2);
      vdgeo.vd_eU(tmat, _uv3, uv3);
      if (!useZ) {
        if (!vdgeo.AreEqual(uv0[Z], 0, vdgeo.DefaultVectorEquality)) {
          uv0[X] /= uv0[Z];
          uv0[Y] /= uv0[Z];
        }
        if (!vdgeo.AreEqual(uv1[Z], 0, vdgeo.DefaultVectorEquality)) {
          uv1[X] /= uv1[Z];
          uv1[Y] /= uv1[Z];
        }
        if (!vdgeo.AreEqual(uv2[Z], 0, vdgeo.DefaultVectorEquality)) {
          uv2[X] /= uv2[Z];
          uv2[Y] /= uv2[Z];
        }
        if (!vdgeo.AreEqual(uv3[Z], 0, vdgeo.DefaultVectorEquality)) {
          uv3[X] /= uv3[Z];
          uv3[Y] /= uv3[Z];
        }
      }
    }
  }
  function vd_Gv(vd_M, render, vd_C) {
    if (vd_M.FaceList === undefined || vd_M.VertexList === undefined) return;
    var vd_cs = null;
    if (
      vd_M.GradientColors &&
      vd_M.GradientColors.Items &&
      vd_M.GradientColors.Items.length > 1
    )
      vd_cs = vd_M.GradientColors.Items;
    if (render.vd_bY() == vdConst.vd_nE && (!vd_M.Normals || !vd_M.UVS)) {
      var vd_Fy = vd_M.FaceList.Items.length / 5;
      vd_M.Normals = [];
      vd_M.Normals.length = vd_Fy;
      vd_M.UVS = [];
      vd_M.UVS.length = vd_Fy * 4;
      var ii = 0;
      var p0, p1, p2, p3;
      var vd_ek, vd_bZ;
      var col = -1,
        vd_ir = -1;
      var vd_ft = render.vd_dV(0);
      var tmat = vd_ft;
      for (var i = 0; i < vd_M.FaceList.Items.length; i = i + 5) {
        vd_ek = i / 5;
        vd_bZ = 4 * vd_ek;
        ii = Math.abs(vd_M.FaceList.Items[i]);
        p0 = vd_M.VertexList.Items[ii - 1];
        ii = Math.abs(vd_M.FaceList.Items[i + 1]);
        p1 = vd_M.VertexList.Items[ii - 1];
        ii = Math.abs(vd_M.FaceList.Items[i + 2]);
        p2 = vd_M.VertexList.Items[ii - 1];
        ii = Math.abs(vd_M.FaceList.Items[i + 3]);
        p3 = vd_M.VertexList.Items[ii - 1];
        col = vd_M.FaceList.Items[i + 4];
        if (vd_ir != col) {
          vd_ir = col;
          if (vd_ir == -1) {
            tmat = vd_ft;
          } else {
            var pcol = vd_C.Palette.Items[vd_ir];
            tmat = pcol.MaterialMatrix;
          }
        }
        vd_M.UVS[vd_bZ] = vdgeo.newpoint(0, 0, 0);
        vd_M.UVS[vd_bZ + 1] = vdgeo.newpoint(0, 0, 0);
        vd_M.UVS[vd_bZ + 2] = vdgeo.newpoint(0, 0, 0);
        vd_M.UVS[vd_bZ + 3] = vdgeo.newpoint(0, 0, 0);
        vd_M.Normals[vd_ek] = vdgeo.newpoint(0, 0, 1);
        vd_BM(
          p0,
          p1,
          p2,
          p3,
          tmat,
          vd_M.Normals[vd_ek],
          vd_M.UVS[vd_bZ],
          vd_M.UVS[vd_bZ + 1],
          vd_M.UVS[vd_bZ + 2],
          vd_M.UVS[vd_bZ + 3],
          vd_cs
        );
      }
      render.vd_dV(vd_ft);
    }
    var vd_Ci = vd_M.DrawEdges;
    if (!vd_i.ApplyDrawEdges) vd_Ci = false;
    render.vd_En(
      vd_M.FaceList.Items,
      vd_M.VertexList.Items,
      vd_M.Normals,
      vd_M.UVS,
      vd_cs,
      vd_Ci
    );
  }
  function vd_Jk(vd_M, render, vd_C) {
    var vd_nn = vd_M.EdgeVisibility;
    if (vd_nn == undefined) vd_nn = 0;
    var p0 = vd_M.VertexList.Items[0],
      p1 = vd_M.VertexList.Items[1],
      p2 = vd_M.VertexList.Items[2],
      p3 = vd_M.VertexList.Items[3];
    if (render.vd_bY() == vdConst.vd_nE && (!vd_M.Normals || !vd_M.UVS)) {
      vd_M.Normals = [];
      vd_M.Normals.length = 1;
      vd_M.UVS = [];
      vd_M.UVS.length = 4;
      var vd_ft = render.vd_dV(0);
      vd_M.UVS[0] = vdgeo.newpoint(0, 0, 0);
      vd_M.UVS[1] = vdgeo.newpoint(0, 0, 0);
      vd_M.UVS[2] = vdgeo.newpoint(0, 0, 0);
      vd_M.UVS[3] = vdgeo.newpoint(0, 0, 0);
      vd_M.Normals[0] = vdgeo.newpoint(0, 0, 1);
      vd_BM(
        p0,
        p1,
        p2,
        p3,
        vd_ft,
        vd_M.Normals[0],
        vd_M.UVS[0],
        vd_M.UVS[1],
        vd_M.UVS[2],
        vd_M.UVS[3]
      );
      render.vd_dV(vd_ft);
    }
    if (render.vd_bY() != vdConst.vd_nE) render.vd_hD(p0, p1, p2, p3);
    else
      render.vd_hD(
        p0,
        p1,
        p2,
        p3,
        (vd_nn & 1) == 0,
        (vd_nn & 2) == 0,
        (vd_nn & 4) == 0,
        (vd_nn & 8) == 0,
        vd_M.Normals[0],
        vd_M.UVS[0],
        vd_M.UVS[1],
        vd_M.UVS[2],
        vd_M.UVS[3]
      );
  }
  function vd_EW(vd_M, render, vd_C) {
    render.vd_EJ(
      vd_M.BasePoint,
      vd_M.Direction,
      vd_M.InfinityType == vdConst.InfinityTypes_Ray
    );
  }
  function vd_FF(vd_M, render, vd_C) {
    if (vd_M.ECSMatrix == undefined) vd_M.ECSMatrix = vdgeo.vd_Q();
    vd_M.EcsMatrix = vd_M.ECSMatrix;
    render.vd_aj(vd_M.ECSMatrix);
    render.vd_qO(
      vd_M.points.Items,
      vd_M.Colors ? vd_M.Colors.Items : null,
      vd_M.PointSize,
      vd_M.vd_sk
    );
    render.vd_aW();
  }
  function vd_FS(vd_M, render, vd_C) {
    if (vd_M.EcsMatrix == undefined || vd_M.AlignToViewSize) {
      var vd_oz = vd_C.PointStyleSize;
      if (vd_oz < 0.0) vd_oz = (render.vd_m * Math.abs(vd_oz)) / 100.0;
      if (vd_M.ExtrusionVector == undefined)
        vd_M.ExtrusionVector = vdgeo.newpoint(0, 0, 1);
      vd_M.EcsMatrix = vdgeo.vd_Q();
      vdgeo.vd_bf(vd_M.EcsMatrix, vd_oz, vd_oz, 1.0);
      if (vd_M.AlignToViewSize) {
        render.vd_tk(vd_M.AlignToViewSize, vd_M.EcsMatrix, vd_oz * 2.0);
      }
      vdgeo.vd_cn(vd_M.EcsMatrix, vd_M.ExtrusionVector);
      vdgeo.vd_j(
        vd_M.EcsMatrix,
        vd_M.InsertionPoint[X],
        vd_M.InsertionPoint[Y],
        vd_M.InsertionPoint[Z]
      );
    }
    if (vd_M.pointSegments == undefined || vd_M.AlignToViewSize) {
      vd_M.pointSegments = [];
      var pts;
      var mode = vd_C.PointStyleMode;
      if (mode !== 1) {
        if ((mode & 32) === 32) {
          var vd_en = vdgeo.vd_iy(
            vdgeo.CURVERESOLUTION,
            render.vd_dk(),
            vd_M.Radius,
            vdgeo.VD_TWOPI
          );
          pts = vdgeo.vd_sW(vd_en, 0.5, 0.0, vdgeo.VD_TWOPI, 0);
          pts.push(vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), 0.0, 0.5));
          vd_M.pointSegments.push(pts);
          mode -= 32;
        }
        if ((mode & 64) === 64) {
          pts = [
            vdgeo.newpoint(-0.5, -0.5, 0.0),
            vdgeo.newpoint(0.5, -0.5, 0.0),
            vdgeo.newpoint(0.5, 0.5, 0.0),
            vdgeo.newpoint(-0.5, 0.5, 0.0),
            vdgeo.newpoint(-0.5, -0.5, 0.0),
          ];
          vd_M.pointSegments.push(pts);
          mode -= 64;
        }
        if (mode === 0) {
          pts = [vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(0, 0, 0)];
          vd_M.pointSegments.push(pts);
        }
        if (mode === 2) {
          pts = [vdgeo.newpoint(-1.0, 0.0, 0.0), vdgeo.newpoint(1.0, 0.0, 0.0)];
          vd_M.pointSegments.push(pts);
          pts = [vdgeo.newpoint(0.0, -1.0, 0.0), vdgeo.newpoint(0.0, 1.0, 0.0)];
          vd_M.pointSegments.push(pts);
        }
        if (mode === 3) {
          pts = [
            vdgeo.newpoint(-1.0, -1.0, 0.0),
            vdgeo.newpoint(1.0, 1.0, 0.0),
          ];
          vd_M.pointSegments.push(pts);
          pts = [
            vdgeo.newpoint(-1.0, 1.0, 0.0),
            vdgeo.newpoint(1.0, -1.0, 0.0),
          ];
          vd_M.pointSegments.push(pts);
        }
        if (mode === 4) {
          pts = [vdgeo.newpoint(0.0, 0.0, 0.0), vdgeo.newpoint(0.0, 1.0, 0.0)];
          vd_M.pointSegments.push(pts);
        }
      }
    }
    render.vd_aj(vd_M.EcsMatrix);
    for (var ipl = 0; ipl < vd_M.pointSegments.length; ipl++) {
      render.vd_bt(vd_M.pointSegments[ipl], false);
    }
    render.vd_aW();
  }
  function vd_EV(vd_M, render, vd_C) {
    if (
      !vd_M.AlignToViewSize &&
      vd_M.BlockRef &&
      !vd_M.BlockRef.vd_oI &&
      !vd_M.BlockRef.ExternalReferencePath &&
      vd_M.EcsMatrix &&
      vd_M.Columns === 1 &&
      vd_M.Rows === 1 &&
      (!vd_M.Attributes ||
        !vd_M.Attributes.Items ||
        !vd_M.Attributes.Items.length)
    ) {
      render.vd_aj(vd_M.EcsMatrix);
      vd_M.BlockRef.vd_oI = true;
      vd_iq(vd_M.BlockRef.Entities, true, render, vd_C);
      vd_M.BlockRef.vd_oI = false;
      render.vd_aW();
      return;
    }
    var idoc;
    var c, r, offset, omat;
    if (vd_M.BlockRef == undefined) {
      vd_M.BlockRef = vd_i.GetDictItem(vd_C.Blocks, vd_M.Block);
    }
    if (!vd_M.BlockRef) return;
    if (vd_M.BlockRef.vd_oI) return;
    if (
      vd_M.BlockRef.ExternalReferencePath &&
      !vd_M.BlockRef.ExternalReference
    ) {
      if (vd_bR.vd_Ee()) return;
      var vd_eb = vd_i.GetXREFS();
      for (idoc = 0; idoc < vd_eb.length; idoc++) {
        if (vd_eb[idoc].documentdata && vd_eb[idoc].documentdata.vd_Ee()) {
          return;
        }
      }
      var vd_Dz = false;
      var vd_yT = vd_M.BlockRef.Name.toLowerCase();
      for (idoc = 0; idoc < vd_eb.length; idoc++) {
        if (vd_eb[idoc].KeyFile == vd_yT) {
          vd_Dz = true;
        }
      }
      if (!vd_Dz)
        vd_eb.push(
          new vd_Eu(
            vd_i,
            vd_yT,
            vd_M.BlockRef.ExternalReferencePath,
            vd_M.BlockRef
          )
        );
      for (idoc = 0; idoc < vd_eb.length; idoc++) {
        if (vd_eb[idoc].KeyFile == vd_yT) {
          if (vd_eb[idoc].documentdata.vdDocument) {
            vd_M.BlockRef.ExternalReference = vd_eb[idoc].documentdata;
            if (vd_M.BlockRef.ExternalReference.vdDocument.BasePoint)
              vd_M.BlockRef.Origin =
                vd_M.BlockRef.ExternalReference.vdDocument.BasePoint.concat([]);
          }
          break;
        }
      }
      if (!vd_M.BlockRef.ExternalReference) return;
    }
    if (vd_M.EcsMatrix == undefined || vd_M.AlignToViewSize) {
      if (vd_M.Columns == undefined) vd_M.Columns = 1;
      if (vd_M.Rows == undefined) vd_M.Rows = 1;
      if (vd_M.ColumnDist == undefined) vd_M.ColumnDist = 0.0;
      if (vd_M.RowDist == undefined) vd_M.RowDist = 0.0;
      vd_M.EcsMatrix = vdgeo.vd_Q();
      if (vd_M.BlockRef.Origin == undefined)
        vd_M.BlockRef.Origin = vdgeo.newpoint(0, 0, 0);
      if (vd_M.Xscale == undefined) vd_M.Xscale = 1;
      if (vd_M.Yscale == undefined) vd_M.Yscale = 1;
      if (vd_M.Zscale == undefined) vd_M.Zscale = 1;
      if (vd_M.Rotation == undefined) vd_M.Rotation = 0;
      if (vd_M.ExtrusionVector == undefined)
        vd_M.ExtrusionVector = vdgeo.newpoint(0, 0, 1);
      if (vd_M.InsertionPoint == undefined)
        vd_M.InsertionPoint = vdgeo.newpoint(0, 0, 0);
      vdgeo.vd_j(
        vd_M.EcsMatrix,
        -vd_M.BlockRef.Origin[X],
        -vd_M.BlockRef.Origin[Y],
        -vd_M.BlockRef.Origin[Z]
      );
      vdgeo.vd_bf(vd_M.EcsMatrix, vd_M.Xscale, vd_M.Yscale, vd_M.Zscale);
      if (vd_M.AlignToViewSize && vd_M.BoundingBox != undefined) {
        render.vd_tk(
          vd_M.AlignToViewSize,
          vd_M.EcsMatrix,
          vd_M.BoundingBox[4] - vd_M.BoundingBox[1]
        );
      }
      vdgeo.vd_ap(vd_M.EcsMatrix, vd_M.Rotation);
      vdgeo.vd_cn(vd_M.EcsMatrix, vd_M.ExtrusionVector);
      vdgeo.vd_j(
        vd_M.EcsMatrix,
        vd_M.InsertionPoint[X],
        vd_M.InsertionPoint[Y],
        vd_M.InsertionPoint[Z]
      );
    }
    var isArray = vd_M.Columns > 1 || vd_M.Rows > 1;
    render.vd_aj(vd_M.EcsMatrix);
    vd_M.BlockRef.vd_oI = true;
    for (c = 0; c < vd_M.Columns; c++) {
      for (r = 0; r < vd_M.Rows; r++) {
        if (isArray) {
          offset = vdgeo.newpoint(
            (c * vd_M.ColumnDist) / vd_M.Xscale,
            (r * vd_M.RowDist) / vd_M.Yscale,
            0.0
          );
          omat = vdgeo.vd_Q();
          vdgeo.vd_j(omat, offset[X], offset[Y], offset[Z]);
          render.vd_aj(omat);
        }
        if (vd_M.BlockRef.ExternalReference) {
          var vd_OU = vd_bR;
          vd_bR = vd_M.BlockRef.ExternalReference;
          vd_iq(
            vd_bR.vdDocument.Model.Entities,
            true,
            render,
            vd_bR.vdDocument
          );
          vd_bR = vd_OU;
          if (
            vd_bR.vdDocument.Palette &&
            vd_bR.vdDocument.Palette._lc &&
            vd_bR.vdDocument.Palette._lc._a1 != false &&
            vd_M.BlockRef.ExternalReference.vdDocument &&
            vd_M.BlockRef.ExternalReference.vdDocument.Palette &&
            vd_M.BlockRef.ExternalReference.vdDocument.Palette._lc &&
            vd_M.BlockRef.ExternalReference.vdDocument.Palette._lc._a1 == false
          )
            vd_bR.vdDocument.Palette._lc._a1 = false;
        } else {
          vd_iq(vd_M.BlockRef.Entities, true, render, vd_C);
        }
        if (isArray) render.vd_aW();
      }
    }
    vd_M.BlockRef.vd_oI = false;
    render.vd_aW();
    if (
      vd_M.Attributes &&
      vd_M.Attributes.Items &&
      vd_M.Attributes.Items.length > 0
    ) {
      for (c = 0; c < vd_M.Columns; c++) {
        for (r = 0; r < vd_M.Rows; r++) {
          if (isArray) {
            offset = vdgeo.pointPolar(
              vdgeo.newpoint(0, 0, 0),
              vd_M.Rotation,
              c * vd_M.ColumnDist
            );
            offset = vdgeo.pointPolar(
              offset,
              vd_M.Rotation + vdgeo.HALF_PI,
              r * vd_M.RowDist
            );
            omat = vdgeo.vd_Q();
            vdgeo.vd_j(omat, offset[X], offset[Y], offset[Z]);
            render.vd_aj(omat);
          }
          vd_iq(vd_M.Attributes, false, render, vd_C);
          if (isArray) render.vd_aW();
        }
      }
    }
  }
  this.ActionDrawEntities = function (entities, vd_xR) {
    vd_R.vd_c.ActionDrawEntities(entities, vd_xR);
  };
  this.ToolTip = new (function () {
    this.AutoShow = true;
    var vd_ak = this;
    var vd_sb = null;
    var vdcanvas = vd_i;
    this.vd_uo = 1500;
    Object.defineProperty(vd_ak, "TimeOut", {
      get: function () {
        return vd_ak.vd_uo;
      },
      set: function (newValue) {
        vd_ak.vd_uo = newValue;
      },
    });
    this.vd_tq = [255, 255, 255];
    Object.defineProperty(vd_ak, "FillColor1", {
      get: function () {
        return vd_ak.vd_tq;
      },
      set: function (newValue) {
        vd_ak.vd_tq = newValue;
      },
    });
    this.vd_ur = [211, 211, 211];
    Object.defineProperty(vd_ak, "FillColor2", {
      get: function () {
        return vd_ak.vd_ur;
      },
      set: function (newValue) {
        vd_ak.vd_ur = newValue;
      },
    });
    this.vd_uW = [72, 72, 72];
    Object.defineProperty(vd_ak, "BoundaryColor", {
      get: function () {
        return vd_ak.vd_uW;
      },
      set: function (newValue) {
        vd_ak.vd_uW = newValue;
      },
    });
    this.vd_oB = [0, 0, 0];
    Object.defineProperty(vd_ak, "FontColor", {
      get: function () {
        return vd_ak.vd_oB;
      },
      set: function (newValue) {
        vd_ak.vd_oB = newValue;
      },
    });
    this.vd_tD = "sans-serif";
    Object.defineProperty(vd_ak, "FontName", {
      get: function () {
        return vd_ak.vd_tD;
      },
      set: function (newValue) {
        vd_ak.vd_tD = newValue;
      },
    });
    this.vd_tW = 16;
    Object.defineProperty(vd_ak, "FontHeight", {
      get: function () {
        return vd_ak.vd_tW;
      },
      set: function (newValue) {
        vd_ak.vd_tW = newValue;
      },
    });
    this.vd_Dw = [0, 0];
    Object.defineProperty(vd_ak, "BoundaryOffset", {
      get: function () {
        return vd_ak.vd_Dw;
      },
      set: function (newValue) {
        vd_ak.vd_Dw = newValue;
      },
    });
    function vd_LD(point, width, height) {
      var vd_kf = new Array(point[0], point[1]);
      var xmin = vd_kf[0];
      var xmax = vd_kf[0] + width;
      var ymin = vd_kf[1];
      var ymax = vd_kf[1] + height;
      var vd_OP = vdcanvas.canvas.height;
      var vd_Ie = vdcanvas.canvas.width;
      if (xmax > vd_Ie) vd_kf[0] = point[0] - width;
      if (ymin < 0) vd_kf[1] = 0;
      return vd_kf;
    }
    this.show = function (p, str, size, timeout) {
      var vd_fN = vdcanvas.ViewToPixel(p);
      vd_ak.vd_zS(vd_fN, str, size, timeout);
    };
    function vd_OW(txt, ctxt) {
      var ret = { fc: vd_ak.vd_oB, text: txt, width: 0 };
      try {
        if (txt.length > 2 && txt.indexOf("\\{") == 0) {
          var i2 = txt.indexOf("}");
          if (i2 > 0) {
            ret = eval("ret=" + txt.substr(1, i2));
            ret.text = txt.substr(i2 + 1);
            ret.width = ctxt.measureText(ret.text).width;
            if (!ret.fc) ret.fc = vd_ak.vd_oB;
          }
        }
      } catch (ex) {}
      if (!ret.width) ret.width = ctxt.measureText(ret.text).width;
      return ret;
    }
    function vd_pr(str, ctxt) {
      var lines = str.split("\\n");
      var ret = [];
      var vd_wb = 0;
      for (i = 0; i < lines.length; i++) {
        var item = vd_OW(lines[i], ctxt);
        ret.push(item);
        vd_wb = Math.max(vd_wb, item.width);
      }
      return [ret, vd_wb];
    }
    this.vd_zS = function (vd_de, str, size, timeout) {
      if (!str || str == "") return;
      var ctxt = vdcanvas.vd_iw();
      if (!ctxt) return;
      var vd_fN = [vd_de[0], vd_de[1], 0];
      if (size === undefined) size = vd_ak.vd_tW;
      vd_ak.hide();
      ctxt.font = size + "px " + vd_ak.vd_tD;
      var vd_BJ = vd_pr(str, ctxt);
      var lines = vd_BJ[0];
      var vd_Cw = vd_BJ[1];
      var vd_Ck = size + 4;
      var vd_nI = vd_Ck * lines.length;
      vd_fN[1] -= vd_nI;
      vd_fN = vd_LD(vd_fN, vd_Cw + 4, vd_nI + 4);
      var vd_uE = ctxt.createLinearGradient(
        vd_fN[0],
        vd_fN[1],
        vd_fN[0],
        vd_fN[1] + size
      );
      vd_uE.addColorStop(0, vdgdi.vd_gD(vd_ak.vd_tq));
      vd_uE.addColorStop(1, vdgdi.vd_gD(vd_ak.vd_ur));
      ctxt.fillStyle = vd_uE;
      var vd_jF = vd_fN.slice();
      vd_fN[0] += 3;
      vd_fN[1] += 2;
      var vd_ve = vd_Cw + 6;
      vd_jF[0] += 1;
      vd_jF[1] += 1;
      ctxt.fillRect(vd_jF[0], vd_jF[1], vd_ve, vd_nI);
      ctxt.strokeStyle = vdgdi.vd_gD(vd_ak.vd_uW);
      var lw = ctxt.lineWidth;
      ctxt.lineWidth = 1;
      vd_ve += 2;
      vd_nI += 2;
      vd_jF[0] -= 1;
      vd_jF[1] -= 1;
      ctxt.strokeRect(vd_jF[0], vd_jF[1], vd_ve, vd_nI);
      ctxt.lineWidth = lw;
      ctxt.fillStyle = vdgdi.vd_gD(vd_ak.vd_oB);
      ctxt.textBaseline = "top";
      for (i = 0; i < lines.length; i++) {
        ctxt.fillStyle = vdgdi.vd_gD(lines[i].fc);
        ctxt.fillText(lines[i].text, vd_fN[0], vd_fN[1] + i * vd_Ck);
      }
      if (timeout === undefined) timeout = vd_ak.vd_uo;
      if (timeout) vd_sb = setTimeout(vd_ak.hide, timeout);
    };
    this.hide = function () {
      if (vd_sb) {
        clearTimeout(vd_sb);
        vd_sb = null;
        vd_R.vd_c.Refresh();
        return true;
      }
      return false;
    };
  })();
  this.DrawEntity = function (entity, render) {
    if (!render) render = vd_i.ActiveRender();
    vd_bm(entity, render, vd_f());
  };
  function vd_bm(vd_M, render, vd_C, index, vd_oX) {
    if (!vd_M) return;
    if (vd_M.Deleted === true) return;
    if (vd_M.visibility === 1) return;
    var vd_fw = render.vd_qD();
    vd_GL(vd_M, vd_C, render);
    if (vd_M._t !== vdConst.vdViewport_code) {
      if (vd_i.vd_Dj(vd_M.LayerRef, vd_fw, vd_C)) return;
    }
    if (render.vd_bY() == vdConst.vd_et) {
      if (vd_fw == null && vd_M.BoundingBox != undefined) {
        render.vd_gc.vd_gJ(vd_M.BoundingBox);
        return;
      }
    } else {
      if (
        vd_M._t !== vdConst.vdViewport_code &&
        vd_M._t !== vdConst.vdInsert_code
      ) {
        if (vd_fw && vd_fw._t == vdConst.vdInsert_code && vd_fw.LayerRef) {
          if (vd_M.LayerRef.Name == "0") {
            if (vd_fw.LayerRef.On === false) return;
          } else if (vd_M.LayerRef.On === false) return;
        } else {
          if (vd_M.LayerRef.On === false) return;
        }
      }
    }
    var pw, col, vd_ct, vd_nT, lt, ltscale, highlight;
    render.vd_nD(vd_M, vd_oX ? index : undefined);
    col = vd_Mn(vd_M, render);
    if (!render.vd_sC()) {
      pw = vd_GJ(vd_M, render);
      vd_ct = vd_ML(vd_M, render);
      vd_nT = vd_MZ(vd_M, render);
      lt = vd_KU(vd_M, render);
      ltscale = vd_KL(vd_M, render);
      highlight = render.vd_zk(vd_M.HighLight);
    }
    if (vd_M.Explode !== undefined) {
      if (vd_M._t === vdConst.vdDimension_code) vd_q.vd_Bn.vd_zC(vd_M, vd_i);
      vd_iq(vd_M.Explode, false, render, vd_C);
    } else if (vd_M._t === vdConst.vdLine_code) {
      vd_GG(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdInsert_code) {
      if (
        vd_M.AlignToViewSize &&
        vd_fw == null &&
        !vd_M.BoundingBox &&
        render.vd_bY() != vdConst.vd_et
      ) {
        vd_dR.clear();
        vd_bm(vd_M, vd_dR, vd_C);
        vd_M.BoundingBox = vd_dR.vd_gc.vd_hl();
      }
      vd_EV(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdPolyface_code) {
      vd_Gv(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vd3DFace_code) {
      vd_Jk(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdText_code) {
      vd_uv(vd_M, render, vd_C);
    } else if (
      vd_M._t === vdConst.vdAttribDef_code &&
      vd_M.InVisibleMode !== true
    ) {
      if (vd_fw != null) {
        if (vd_M.IsConstant == true) {
          var str = vd_M.TextString;
          vd_M.TextString = vd_M.ValueString;
          vd_uv(vd_M, render, vd_C);
          vd_M.TextString = str;
        }
      } else {
        vd_uv(vd_M, render, vd_C);
      }
    } else if (vd_M._t === vdConst.vdAttrib_code) {
      if (vd_M.IsConstant != true && vd_M.InVisibleMode !== true)
        vd_uv(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdPolyline_code) {
      vd_FO(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdRect_code) {
      vd_FG(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdImage_code) {
      vd_FE(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdCircle_code) {
      vd_Jj(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdArc_code) {
      vd_KB(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdEllipse_code) {
      vd_Jp(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdPolyhatch_code) {
      vd_GF(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdInfinityLine_code) {
      vd_EW(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdPoint_code) {
      vd_FS(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdViewport_code) {
      vd_HE(vd_M, render, vd_C);
    } else if (vd_M._t === vdConst.vdNote_code) {
      vd_M.vd_Mf(render);
    } else if (vd_M._t === vdConst.vdPointCloud_code) {
      vd_FF(vd_M, render, vd_C);
    }
    render.vd_nD(null);
    if (!render.vd_sC()) {
      render.vd_zk(highlight);
      render.vd_xW(lt);
      render.vd_xv(ltscale);
      render.vd_aQ(pw);
    }
    render.vd_bF(col);
    if (vd_M.selected && !render.vd_sC() && render.vd_bY() != vdConst.vd_et) {
      render.vd_pd(vdConst.ActionHighLightColor);
      vd_bm(vd_M, render, vd_C);
      render.vd_pB();
    }
    if (vd_fw == null && !vd_M.BoundingBox && render.vd_bY() != vdConst.vd_et) {
      vd_dR.clear();
      vd_bm(vd_M, vd_dR, vd_C);
      vd_M.BoundingBox = vd_dR.vd_gc.vd_hl();
    }
  }
  function vd_tU(vd_ev, vd_ja, render, vd_C) {
    if (!render.vd_bd || render.vd_bY() == vdConst.vd_et) {
      vd_iq(vd_ev, vd_ja, render, vd_C, true);
    } else {
      render.vd_od(1);
      vd_iq(vd_ev, vd_ja, render, vd_C, true);
      if (render.vd_yD) {
        render.vd_od(2);
        vd_iq(vd_ev, vd_ja, render, vd_C, true);
      }
      render.vd_od(3);
    }
  }
  function vd_iq(vd_ev, vd_ja, render, vd_C, vd_oX) {
    if (
      vd_ev == undefined ||
      vd_ev.Items == undefined ||
      vd_ev.Items.length == undefined
    )
      return;
    var k = 0;
    for (k = 0; k < vd_ev.Items.length; k++) {
      vd_Ho(vd_ev, vd_ja, render, vd_C, k, vd_oX);
    }
  }
  function vd_Ho(vd_ev, vd_ja, render, vd_C, i, vd_oX) {
    vd_ja = vd_ja || typeof vd_ev.Items[i] == "string";
    if (vd_ja)
      vd_bm(vd_i.GetEntityItem(vd_ev.Items[i]), render, vd_C, i, vd_oX);
    else {
      vd_bm(vd_ev.Items[i], render, vd_C, i, vd_oX);
    }
  }
  function vd_Nx(vd_k, vd_U, vd_J, vd_bq) {
    if (!vd_k) return;
    for (var i = vd_k[0].length - 1; i >= 0; i--) {
      var pos = i;
      var vd_M = vd_k[0][pos];
      if (!vd_M) continue;
      if (
        vd_M.LayerRef &&
        vd_M.LayerRef.Lock &&
        vd_bq == false &&
        !vd_M.LayerRef.ForceOsnaps
      )
        continue;
      if (vd_M._t === vdConst.vdLine_code) {
        vd_OA(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdInsert_code) {
        vd_yx(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdPolyface_code) {
        vd_Po(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vd3DFace_code) {
        vd_NF(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdText_code) {
        vd_yx(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdAttrib_code) {
        vd_yx(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdPolyline_code) {
        vd_Px(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdRect_code) {
        vd_zh(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdImage_code) {
        vd_zh(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdCircle_code) {
        vd_PM(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdArc_code) {
        vd_Nn(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdEllipse_code) {
        vd_Qk(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdPoint_code) {
        vd_OK(pos, vd_k, vd_U, vd_J);
      } else if (vd_M._t === vdConst.vdPointCloud_code) {
        vd_PZ(pos, vd_k, vd_U, vd_J);
      }
      if (vd_J.length > vdConst.OsnapMaxItems) break;
    }
  }
  function vd_aV(pos, vd_k, pt) {
    var ret = vdgeo.newpoint(pt[X], pt[Y], pt[Z]);
    for (var i = pos; i >= 0; i--) {
      if (!vd_k[0][i].EcsMatrix) continue;
      vdgeo.vd_vG(vd_k[0][i].EcsMatrix, ret[X], ret[Y], ret[Z], ret);
    }
    vdgeo.vd_vG(vd_R.vd_ar(), ret[X], ret[Y], ret[Z], ret);
    return ret;
  }
  function vd_OA(pos, vd_k, vd_U, vd_J) {
    var vd_M = vd_k[0][pos];
    var pt;
    if (vd_U & vdConst.OsnapMode_END) {
      pt = vd_aV(pos, vd_k, vd_M.StartPoint);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
      pt = vd_aV(pos, vd_k, vd_M.EndPoint);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
    }
    if (vd_U & vdConst.OsnapMode_MID) {
      pt = vd_aV(pos, vd_k, vdgeo.MidPoint(vd_M.StartPoint, vd_M.EndPoint));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
    }
  }
  function vd_Px(pos, vd_k, vd_U, vd_J) {
    var vd_M = vd_k[0][pos];
    if (vd_M.SPlineFlag && vd_M.SPlineFlag !== vdConst.SplineFlagSTANDARD)
      return;
    var pt;
    var vd_fn = vd_k[1];
    if (vd_fn !== undefined) {
      if (vd_fn < 0) {
        var vd_po = vd_M.VertexList.Items.length;
        if (vd_U & vdConst.OsnapMode_CEN && vd_po > 0) {
          var vd_kb = [0, 0, 0];
          for (var i = 0; i < vd_po; i++) {
            vd_kb[X] += vd_M.VertexList.Items[i][X];
            vd_kb[Y] += vd_M.VertexList.Items[i][Y];
            vd_kb[Z] += vd_M.VertexList.Items[i][Z];
          }
          vd_kb[X] /= vd_po;
          vd_kb[Y] /= vd_po;
          vd_kb[Z] /= vd_po;
          pt = vd_aV(pos, vd_k, vd_kb);
          vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_CEN]);
        }
      } else {
        var sp = vd_M.VertexList.Items[vd_fn];
        var ep;
        if (vd_fn >= vd_M.VertexList.Items.length - 1)
          ep = vd_M.VertexList.Items[0];
        else ep = vd_M.VertexList.Items[vd_fn + 1];
        if (vd_U & vdConst.OsnapMode_END) {
          pt = vd_aV(pos, vd_k, sp);
          vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
          pt = vd_aV(pos, vd_k, ep);
          vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
        }
        if (vd_U & vdConst.OsnapMode_MID) {
          var success = vdgeo.Bulge2Arc(sp, ep);
          if (!success) {
            pt = vd_aV(pos, vd_k, vdgeo.MidPoint(sp, ep));
            vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
          } else {
            var Center = success[0];
            var radius = success[1];
            var vd_fa = success[2];
            var vd_fL = success[3];
            pt = vd_aV(
              pos,
              vd_k,
              vdgeo.pointPolar(
                Center,
                vd_fa + vdgeo.FixAngle(vd_fL - vd_fa) * 0.5,
                radius
              )
            );
            vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
          }
        }
      }
    }
  }
  function vd_Po(pos, vd_k, vd_U, vd_J) {
    var vd_M = vd_k[0][pos];
    var pt;
    var vd_fn = vd_k[1];
    if (vd_fn === undefined) return;
    var pos4 = vd_fn % 5;
    var sp = vd_M.VertexList.Items[Math.abs(vd_M.FaceList.Items[vd_fn]) - 1];
    var ep;
    if (pos4 == 3)
      ep = vd_M.VertexList.Items[Math.abs(vd_M.FaceList.Items[vd_fn - 3]) - 1];
    else
      ep = vd_M.VertexList.Items[Math.abs(vd_M.FaceList.Items[vd_fn + 1]) - 1];
    if (vd_U & vdConst.OsnapMode_END) {
      pt = vd_aV(pos, vd_k, sp);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
      pt = vd_aV(pos, vd_k, ep);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
    }
    if (vd_U & vdConst.OsnapMode_MID) {
      pt = vd_aV(pos, vd_k, vdgeo.MidPoint(sp, ep));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
    }
  }
  function vd_NF(pos, vd_k, vd_U, vd_J) {
    var vd_M = vd_k[0][pos];
    var pt;
    var p0 = vd_M.VertexList.Items[0],
      p1 = vd_M.VertexList.Items[1],
      p2 = vd_M.VertexList.Items[2],
      p3 = vd_M.VertexList.Items[3];
    if (vd_U & vdConst.OsnapMode_END) {
      pt = vd_aV(pos, vd_k, p0);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
      pt = vd_aV(pos, vd_k, p1);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
      pt = vd_aV(pos, vd_k, p2);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
      pt = vd_aV(pos, vd_k, p3);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
    }
    if (vd_U & vdConst.OsnapMode_MID) {
      pt = vd_aV(pos, vd_k, vdgeo.MidPoint(p0, p1));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
      pt = vd_aV(pos, vd_k, vdgeo.MidPoint(p1, p2));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
      pt = vd_aV(pos, vd_k, vdgeo.MidPoint(p2, p3));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
      pt = vd_aV(pos, vd_k, vdgeo.MidPoint(p3, p0));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
    }
  }
  function vd_zh(pos, vd_k, vd_U, vd_J) {
    var vd_M = vd_k[0][pos];
    var pt;
    var p0 = vdgeo.newpoint(0, 0, 0),
      p1 = vdgeo.newpoint(vd_M.Width, 0, 0),
      p2 = vdgeo.newpoint(vd_M.Width, vd_M.Height, 0),
      p3 = vdgeo.newpoint(0, vd_M.Height, 0);
    if (vd_U & vdConst.OsnapMode_END) {
      pt = vd_aV(pos, vd_k, p0);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
      pt = vd_aV(pos, vd_k, p1);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
      pt = vd_aV(pos, vd_k, p2);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
      pt = vd_aV(pos, vd_k, p3);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
    }
    if (vd_U & vdConst.OsnapMode_MID) {
      pt = vd_aV(pos, vd_k, vdgeo.MidPoint(p0, p1));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
      pt = vd_aV(pos, vd_k, vdgeo.MidPoint(p1, p2));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
      pt = vd_aV(pos, vd_k, vdgeo.MidPoint(p2, p3));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
      pt = vd_aV(pos, vd_k, vdgeo.MidPoint(p3, p0));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
    }
    if (vd_U & vdConst.OsnapMode_CEN) {
      if (vd_k[1] < 0) {
        pt = vd_aV(pos, vd_k, vdgeo.MidPoint(p0, p2));
        vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_CEN]);
      }
    }
    if (vd_U & vdConst.OsnapMode_INS) {
      pt = vd_aV(pos, vd_k, p0);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_INS]);
    }
  }
  function vd_PM(pos, vd_k, vd_U, vd_J) {
    var vd_M = vd_k[0][pos];
    var pt;
    if (vd_U & vdConst.OsnapMode_CEN) {
      pt = vd_aV(pos, vd_k, vdgeo.newpoint(0, 0, 0));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_CEN]);
    }
    if (vd_U & vdConst.OsnapMode_QUA) {
      pt = vd_aV(pos, vd_k, vdgeo.newpoint(vd_M.Radius, 0, 0));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_QUA]);
      pt = vd_aV(pos, vd_k, vdgeo.newpoint(0, vd_M.Radius, 0));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_QUA]);
      pt = vd_aV(pos, vd_k, vdgeo.newpoint(-vd_M.Radius, 0, 0));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_QUA]);
      pt = vd_aV(pos, vd_k, vdgeo.newpoint(0, -vd_M.Radius, 0));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_QUA]);
    }
  }
  function vd_Nn(pos, vd_k, vd_U, vd_J) {
    var vd_M = vd_k[0][pos];
    var pt;
    var Center = vdgeo.newpoint(0, 0, 0);
    if (vd_U & vdConst.OsnapMode_CEN) {
      pt = vd_aV(pos, vd_k, Center);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_CEN]);
    }
    if (vd_U & vdConst.OsnapMode_END) {
      pt = vd_aV(
        pos,
        vd_k,
        vdgeo.pointPolar(Center, vd_M.StartAngle, vd_M.Radius)
      );
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
      pt = vd_aV(
        pos,
        vd_k,
        vdgeo.pointPolar(Center, vd_M.EndAngle, vd_M.Radius)
      );
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
    }
    if (vd_U & vdConst.OsnapMode_MID) {
      pt = vd_aV(
        pos,
        vd_k,
        vdgeo.pointPolar(
          Center,
          vd_M.StartAngle +
            vdgeo.FixAngle(vd_M.EndAngle - vd_M.StartAngle) * 0.5,
          vd_M.Radius
        )
      );
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
    }
  }
  function vd_Qk(pos, vd_k, vd_U, vd_J) {
    var vd_M = vd_k[0][pos];
    var pt;
    if (vd_U & vdConst.OsnapMode_CEN) {
      pt = vd_aV(pos, vd_k, vdgeo.newpoint(0, 0, 0));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_CEN]);
    }
    if (vd_U & vdConst.OsnapMode_END) {
      pt = vd_aV(
        pos,
        vd_k,
        vdgeo.vd_sz(vd_M.StartAngle, vd_M.MajorLength, vd_M.MinorLength)
      );
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
      pt = vd_aV(
        pos,
        vd_k,
        vdgeo.vd_sz(vd_M.EndAngle, vd_M.MajorLength, vd_M.MinorLength)
      );
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
    }
    if (vd_U & vdConst.OsnapMode_MID) {
      pt = vd_aV(
        pos,
        vd_k,
        vdgeo.vd_sz(
          vd_M.StartAngle +
            vdgeo.FixAngle(vd_M.EndAngle - vd_M.StartAngle) * 0.5,
          vd_M.MajorLength,
          vd_M.MinorLength
        )
      );
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
    }
  }
  function vd_PZ(pos, vd_k, vd_U, vd_J) {
    var vd_fn = vd_k[1];
    if (vd_fn !== undefined && vd_U & vdConst.OsnapMode_NODE) {
      var vd_M = vd_k[0][pos];
      var sp = vd_M.points.Items[vd_fn];
      var pt = vd_aV(pos, vd_k, sp);
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_NODE]);
    }
  }
  function vd_OK(pos, vd_k, vd_U, vd_J) {
    var pt;
    if (vd_U & vdConst.OsnapMode_NODE) {
      pt = vd_aV(pos, vd_k, vdgeo.newpoint(0, 0, 0));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_NODE]);
    }
  }
  function vd_yx(pos, vd_k, vd_U, vd_J) {
    var pt;
    if (vd_U & vdConst.OsnapMode_INS) {
      pt = vd_aV(pos, vd_k, vdgeo.newpoint(0, 0, 0));
      vd_J.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_INS]);
    }
  }
  this.SetOsnapMode = function (mode) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    vd_C.vd_gF = mode;
  };
  this.GetOsnapMode = function () {
    var vd_C = vd_f();
    if (vd_C == null) return vdConst.OsnapMode_NONE;
    if (!vd_C.vd_gF) return vdConst.OsnapMode_NONE;
    var ret = vd_C.vd_gF;
    return ret;
  };
  this.vd_Pr = function () {
    var vd_C = vd_f();
    if (vd_C == null) return true;
    return vd_C.vd_gF && vd_C.vd_gF & vdConst.OsnapMode_DISABLE;
  };
  this.EnableOsnapMode = function (bval) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    if (!vd_C.vd_gF) vd_C.vd_gF = vdConst.OsnapMode_NONE;
    if (vd_C.vd_gF & vdConst.OsnapMode_DISABLE)
      vd_C.vd_gF ^= vdConst.OsnapMode_DISABLE;
    if (!bval) vd_C.vd_gF |= vdConst.OsnapMode_DISABLE;
  };
  this.vd_Ij = function (x, y, vd_mE, vd_bq) {
    var vd_U = vd_i.GetOsnapMode();
    if (vd_U == vdConst.OsnapMode_NONE) return null;
    if (vd_U & vdConst.OsnapMode_DISABLE) return null;
    if (!vd_R.vd_be) return null;
    x = vdgeo.vd_r(x);
    y = vdgeo.vd_r(y);
    if (x < 0 || x >= vd_R.width) return null;
    if (y < 0 || y >= vd_R.height) return null;
    var vd_AA = vdgeo.vd_bp(x, y, 0, vd_R.vd_ca);
    if (!vd_mE) vd_mE = vd_i.PickSize;
    if (!vd_bq) vd_bq = vd_i.IgnoreLockLayers;
    var vd_ga = Math.max(vdgeo.vd_r(vd_mE * 0.5), 1);
    var vd_iS = [];
    var vd_J = [];
    var vd_di = null;
    if (vd_U & vdConst.OsnapMode_NEA) vd_di = [0, 0, 0, 0];
    var px, py;
    for (var p = 0; p < vd_ga; p++) {
      for (var ix = -p; ix <= p; ix++) {
        px = x + ix;
        py = y - p;
        vd_sj(px, py, vd_U, vd_J, vd_iS, vd_di, vd_bq);
        py = y + p;
        vd_sj(px, py, vd_U, vd_J, vd_iS, vd_di, vd_bq);
      }
      for (var iy = -p + 1; iy < p; iy++) {
        px = x - p;
        py = y + iy;
        vd_sj(px, py, vd_U, vd_J, vd_iS, vd_di, vd_bq);
        px = x + p;
        py = y + iy;
        vd_sj(px, py, vd_U, vd_J, vd_iS, vd_di, vd_bq);
      }
    }
    vd_iS.length = 0;
    if (vd_J.length > 0) {
      vd_J.sort(function (a, b) {
        return vdgeo.Distance2D(a, vd_AA) - vdgeo.Distance2D(b, vd_AA);
      });
      if (vd_di && vd_di[3] === vdConst.OsnapMode_NEA) {
        var vd_de = vdgeo.vd_bp(vd_J[0][X], vd_J[0][Y], vd_J[0][Z], vd_R.vd_cC);
        if (
          vd_de[X] < x - vd_ga ||
          vd_de[X] > x + vd_ga ||
          vd_de[Y] < y - vd_ga ||
          vd_de[Y] > y + vd_ga
        ) {
          return vd_di;
        }
      }
      return vd_J[0];
    }
    if (vd_di && vd_di[3] === vdConst.OsnapMode_NEA) return vd_di;
    return null;
  };
  function vd_sj(px, py, vd_U, vd_J, vd_iS, vd_di, vd_bq) {
    var c = 0;
    if (px < 0 || px >= vd_R.width || py < 0 || py >= vd_R.height) return;
    var ipos = py * vd_R.width + px;
    var vd_b = vd_R.vd_c.vd_np();
    if (vd_di && vd_di[3] == 0 && vd_b[ipos][1] && vd_b[ipos][1].length > 0) {
      var z = vd_R.vd_c.vd_jM(px, py);
      var pt = vdgeo.vd_bp(px, py, z, vd_R.vd_ca);
      vd_di[X] = pt[X];
      vd_di[Y] = pt[Y];
      vd_di[Z] = pt[Z];
      vd_di[3] = vdConst.OsnapMode_NEA;
    }
    var ret = vd_b[ipos][2];
    if (!ret) return;
    if (vd_JK(vd_iS, ret)) return;
    vd_iS.push(ret);
    vd_Nx(ret, vd_U, vd_J, vd_bq);
  }
  function vd_JK(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
      if (
        arr[i][0].length === obj[0].length &&
        arr[i][1] === obj[1] &&
        arr[i][0][arr[i][0].length - 1] == obj[0][obj[0].length - 1]
      )
        return true;
    }
    return false;
  }
  function vd_nL(layout) {
    if (layout == null) return null;
    if (layout.BoundingBox) return layout.BoundingBox;
    vd_dR.clear();
    vd_tU(layout.Entities, true, vd_dR, vd_f());
    layout.BoundingBox = vd_dR.vd_gc.vd_hl();
    return layout.BoundingBox;
  }
  this.GetExtents = function () {
    return vd_nL(vd_i.GetActiveLayout());
  };
  this.EnableRedraw = function (vd_vZ) {
    var ret = vd_vM;
    vd_vM = vd_vZ;
    return ret;
  };
  this.vd_wR = function () {
    return (
      (vd_i.DrawOverallEntities && vd_i.DrawOverallEntities.length > 0) ||
      vd_i.GripManager.vd_wR()
    );
  };
  this.vd_qC = function (render) {
    try {
      vd_i.GripManager.vd_qC(render);
      if (vd_i.DrawOverallEntities && vd_i.DrawOverallEntities.length > 0) {
        for (var i = 0; i < vd_i.DrawOverallEntities.length; i++) {
          vd_i.DrawEntity(vd_i.DrawOverallEntities[i], render);
        }
      }
    } catch (ex) {}
  };
  var vd_ye = new vd_oA(null, 0, 0, 1, 1);
  this.redraw = function (vd_td, vd_Mc) {
    if (!vd_vM) return;
    if (vd_aT != null) clearTimeout(vd_aT);
    vd_aT = null;
    var t1_0, t1_1;
    t1_0 = new Date().getTime();
    var vd_C = vd_f();
    var layout = vd_i.GetActiveLayout();
    var vd_MA = vd_R.vd_c.vd_yY();
    vd_hX(layout, vd_td);
    vd_R.vd_c.vd_eR = true;
    if (vd_C != null) {
      vd_R.vd_iv(vd_C.Palette, layout.BkColorEx);
    }
    vd_R.clear();
    if (vd_C != null && !vd_Mc) {
      var vd_oj = vd_R.vd_lg(layout.ShowHidenEdges);
      vd_tU(layout.Entities, true, vd_R, vd_C);
      vd_R.vd_lg(vd_oj);
    }
    if (vd_i.AfterDrawInView) {
      vd_ye.vd_yb(vd_i.AfterDrawInView, vd_R.vd_c.vd_nW(), vd_i, vd_R, 0);
    }
    vd_i.Refresh();
    vd_R.vd_c.vd_IX();
    if (vd_MA) Action.show();
    Action.draw();
    vd_pM = null;
    t1_1 = new Date().getTime();
    vd_fl = t1_1 - t1_0;
    vd_BU();
    if (vd_i.AfterRedraw != null) vd_i.AfterRedraw(vd_i);
  };
  this.GetXREFS = function () {
    if (!vd_qJ()) return [];
    if (!vd_qJ().vd_ko) vd_qJ().vd_ko = [];
    return vd_qJ().vd_ko;
  };
  function vd_Eu(vd_EI, vd_Et, vd_Gj, blockref) {
    var vd_i = this;
    this.target = vd_EI;
    this.Block = blockref;
    this.KeyFile = vd_Et;
    this.OriginalSingleFileName = vd_Et;
    this.OriginalPath = vd_Gj;
    this.UrlPath = vd_Gj;
    this.documentdata = new vd_wT(vd_EI);
    this.Cancel = false;
    this.load = function () {
      if (
        vd_i.Block.vd_nz &&
        vd_i.documentdata &&
        vd_i.documentdata.vdDocument &&
        vd_i.documentdata.vd_ix !== ""
      ) {
        var vd_uQ = vd_i.Block.vd_nz;
        vd_i.Block.vd_nz = undefined;
        vd_yo.vd_Go(vd_i);
        vd_uQ(vd_i);
        return true;
      }
      if (
        vd_i.documentdata &&
        !vd_i.documentdata.vdDocument &&
        vd_i.documentdata.vd_ix == ""
      ) {
        if (vd_i.target.vdLoadXref) vd_i.target.vdLoadXref(vd_i);
        if (!vd_i.Cancel) {
          var vd_Dq = function () {
            vd_yo.vd_Go(vd_i);
            if (vd_i.Block.vd_nz) {
              var vd_uQ = vd_i.Block.vd_nz;
              vd_i.Block.vd_nz = undefined;
              vd_uQ(vd_i);
            } else {
              vd_i.target.UpdateLayout();
              setTimeout(vd_i.target.redraw, 0);
              if (vd_i.target.vdXrefLoaded) vd_i.target.vdXrefLoaded(vd_i);
            }
          };
          if (vd_i.Block.vd_km) {
            var vd_km = vd_i.Block.vd_km;
            vd_i.Block.vd_km = undefined;
            setTimeout(
              vd_i.documentdata.LoadDocument(vd_i.UrlPath, false, vd_Dq, vd_km),
              0
            );
          } else {
            setTimeout(
              vd_i.target.vd_tu(vd_i.documentdata, vd_i.UrlPath, false, vd_Dq),
              0
            );
          }
          return true;
        }
      }
      return false;
    };
    return this;
  }
  function vd_BU() {
    var vd_eb = vd_i.GetXREFS();
    for (var idoc = 0; idoc < vd_eb.length; idoc++) {
      if (vd_eb[idoc].load()) return;
    }
  }
  function vd_AP() {
    vd_i.canvas.title = "";
  }
  function vd_MF(vd_sE, vd_sB) {
    var maxx = Math.max(vd_sB[X], vd_sE[X]);
    var minx = Math.min(vd_sB[X], vd_sE[X]);
    var vd_o = Math.max(vd_sB[Y], vd_sE[Y]);
    var vd_w = Math.min(vd_sB[Y], vd_sE[Y]);
    var w = maxx - minx;
    var h = vd_o - vd_w;
    var l1 = vd_R.width / w;
    var l2 = vd_R.height / h;
    var l = Math.min(l1, l2);
    return vd_R.height / l;
  }
  this.zoomwindow = function (np1, np2, vd_NV) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return;
    var p1 = vdgeo.newpoint(np1[X], np1[Y], np1[Z]);
    var p2 = vdgeo.newpoint(np2[X], np2[Y], np2[Z]);
    var vd_by = vdgeo.vd_ci(layout.World2ViewMatrix);
    if (!vd_NV) {
      if (vd_R.vd_bO && vd_R.vd_bd) {
        var _p1 = vdgeo.vd_bp(p1[X], p1[Y], p1[Z], vd_R.vd_cC);
        var _p2 = vdgeo.vd_bp(p2[X], p2[Y], p2[Z], vd_R.vd_cC);
        if (vd_R.vd_GD(_p1[X], _p1[Y]) && vd_R.vd_GD(_p2[X], _p2[Y])) {
          var z = vd_R.vd_c.vd_Hl(_p1[X], _p2[X], _p1[Y], _p2[Y]);
          p1 = vdgeo.vd_bp(_p1[X], _p1[Y], z, vd_R.vd_ca);
          p2 = vdgeo.vd_bp(_p2[X], _p2[Y], z, vd_R.vd_ca);
          vd_by = vdgeo.vd_ci(vd_R.vd_ar());
        }
      }
    }
    var vd_X = vdgeo.MidPoint(p1, p2);
    var vd_jn, vd_pZ, vd_kL, vd_pA, vd_qE;
    var vd_rd = Math.abs(p2[X] - p1[X]);
    var vd_qq = Math.abs(p2[Y] - p1[Y]);
    var vd_kj = 0;
    var vd_hZ = vd_i.canvas.width / vd_i.canvas.height;
    if (!layout.FocalLength) layout.FocalLength = 0.05;
    if (!layout.LensAngle) layout.LensAngle = 60.0;
    if (vd_rd / vd_qq < vd_hZ) {
      vd_jn = vdgeo.DegreesToRadians(layout.LensAngle) / 2;
      vd_pZ = vd_qq / 2;
      vd_kj = vd_pZ / Math.tan(vd_jn);
    } else {
      vd_kL =
        2.0 *
        layout.FocalLength *
        Math.tan(vdgeo.DegreesToRadians(layout.LensAngle / 2.0));
      vd_pA =
        vdgeo.RadiansToDegrees(
          Math.atan((vd_kL * vd_hZ * 0.5) / layout.FocalLength)
        ) * 2.0;
      vd_jn = vdgeo.DegreesToRadians(vd_pA) / 2;
      vd_qE = vd_rd / 2;
      vd_kj = vd_qE / Math.tan(vd_jn);
    }
    vd_X[Z] = Math.max(p1[Z], p2[Z]) + vd_kj;
    var vd_m = vd_MF(p1, p2);
    var vd_ba = new vd_oQ(vd_i, vd_X[X], vd_X[Y], vd_X[Z], vd_m, vd_by);
    if (vd_i.vdUpdateView != null) vd_i.vdUpdateView(vd_ba);
    if (!vd_ba.Cancel) {
      layout.ViewSize = vd_ba.ViewSize;
      layout.ViewCenter = vdgeo.newpoint(
        vd_ba.ViewCenterX,
        vd_ba.ViewCenterY,
        vd_ba.ViewCenterZ
      );
      layout.World2ViewMatrix = vd_ba.vd_rt;
      vd_hX(layout);
    }
  };
  this.zoomExtents = function () {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return;
    var vd_hc = vd_nL(layout);
    if (layout.GridMode) {
      var vd_jX = new vd_hd();
      vd_jX.vd_gJ(vd_hc);
      vd_jX.vd_gJ(layout.Limits);
      vd_hc = vd_jX.vd_hl();
    }
    if (vd_hc == null) return;
    var box = vdgeo.vd_rH(layout.World2ViewMatrix, vd_hc);
    var bmin = vdgeo.newpoint(box[0], box[1], box[2]);
    var bmax = vdgeo.newpoint(box[3], box[4], box[5]);
    vd_i.zoomwindow(bmin, bmax, true);
  };
  this.SetStdView = function (vd_gK) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return;
    var vd_fc = vdgeo.newpoint(0.0, 0.0, 1.0);
    if (vd_gK === vdConst.StdView_TOP) {
      vd_fc = vdgeo.newpoint(0.0, 0.0, 1.0);
    } else if (vd_gK === vdConst.StdView_BOTTOM) {
      vd_fc = vdgeo.newpoint(0.0, 0.0, -1.0);
    } else if (vd_gK === vdConst.StdView_FRONT) {
      vd_fc = vdgeo.newpoint(0.0, -1.0, 0.0);
    } else if (vd_gK === vdConst.StdView_BACK) {
      vd_fc = vdgeo.newpoint(0.0, 1.0, 0.0);
    } else if (vd_gK === vdConst.StdView_LEFT) {
      vd_fc = vdgeo.newpoint(-1.0, 0.0, 0.0);
    } else if (vd_gK === vdConst.StdView_RIGHT) {
      vd_fc = vdgeo.newpoint(1.0, 0.0, 0.0);
    } else if (vd_gK === vdConst.StdView_ISO_NE) {
      vd_fc = vdgeo.newpoint(1.0, 1.0, 1.0);
    } else if (vd_gK === vdConst.StdView_ISO_NW) {
      vd_fc = vdgeo.newpoint(-1.0, 1.0, 1.0);
    } else if (vd_gK === vdConst.StdView_ISO_SE) {
      vd_fc = vdgeo.newpoint(1.0, -1.0, 1.0);
    } else if (vd_gK === vdConst.StdView_ISO_SW) {
      vd_fc = vdgeo.newpoint(-1.0, -1.0, 1.0);
    }
    var mat = vdgeo.vd_Q();
    vdgeo.vd_hh(mat, vd_fc);
    layout.World2ViewMatrix = mat;
    vd_i.zoomExtents();
  };
  this.LookAt = function (vd_sX, vd_HQ, vd_Fg) {
    var mat = vdgeo.vd_Q();
    vdgeo.vd_ap(mat, vd_Fg);
    var vd_fc = vdgeo.VectorDirection(vd_HQ, vd_sX);
    vdgeo.vd_cn(mat, vd_fc);
    vdgeo.vd_j(mat, vd_sX[X], vd_sX[Y], vd_sX[Z]);
    vdgeo.vd_me(mat);
    var layout = vd_i.GetActiveLayout();
    layout.ViewCenter = vdgeo.newpoint(0, 0, 0);
    layout.World2ViewMatrix = mat;
    vd_hX(layout);
    if (vd_aT != null) clearTimeout(vd_aT);
    vd_aT = setTimeout(vd_i.redraw, 0);
  };
  function vd_vk(v, normalize) {
    var layout = vd_i.GetActiveLayout();
    if (!layout) return null;
    var vd_by = layout.World2ViewMatrix;
    var v2w = vdgeo.vd_bu(vd_by);
    var newV = vdgeo.vd_lt(v2w, v[0], v[1], v[2], normalize);
    return newV;
  }
  this.MoveView = function (dx, dy, dz) {
    if (dx === 0 && dy === 0 && dz === 0) return;
    var origin = vd_i.ViewToWorld(vdgeo.newpoint(0, 0, 0));
    var dir, vd_og, toPt;
    dir = vd_vk(vdgeo.newpoint(0, 0, -1), true);
    v = vd_vk(vdgeo.newpoint(dx, dy, dz), false);
    if (!dir || !v) return;
    vd_og = vdgeo.newpoint(
      origin[X] + v[X],
      origin[Y] + v[Y],
      origin[Z] + v[Z]
    );
    toPt = vdgeo.newpoint(
      vd_og[X] + dir[X],
      vd_og[Y] + dir[Y],
      vd_og[Z] + dir[Z]
    );
    vd_i.LookAt(vd_og, toPt, 0);
  };
  this.RotateView = function (vd_MD, vd_JN) {
    var pt = vdgeo.newpoint(0, 0, 0);
    var vd_nx = vd_vk([0, 0, -1], true);
    var vd_Kc = vdgeo.GetAngle(pt, vd_nx);
    var vd_JM = Math.sqrt(vd_nx[X] * vd_nx[X] + vd_nx[Y] * vd_nx[Y]);
    var vd_IE = vdgeo.GetAngle(pt, [vd_JM, vd_nx[Z], 0]);
    var dir = vdgeo.pointPolar(pt, vd_MD + vd_Kc, 1);
    var vd_jz = vd_JN + vd_IE;
    if (vd_jz > vdgeo.PI) vd_jz = vd_jz - vdgeo.VD_TWOPI;
    vd_jz = Math.min(vd_jz, vdgeo.HALF_PI * 0.95);
    vd_jz = Math.max(vd_jz, -vdgeo.HALF_PI * 0.95);
    dir[Z] = Math.tan(vd_jz);
    vdgeo.vd_cN(dir);
    var origin = vd_i.ViewToWorld(pt);
    var dest = vdgeo.newpoint(
      origin[X] + dir[X],
      origin[Y] + dir[Y],
      origin[Z] + dir[Z]
    );
    vd_i.LookAt(origin, dest, 0);
  };
  this.SetViewAngles = function (vd_Hd, tilt, vd_gB, origin) {
    var layout = vd_i.GetActiveLayout();
    if (!layout.ViewCenter) layout.ViewCenter = vdgeo.newpoint(0, 0, 0);
    var vd_Aa = vdgeo.vd_bu(layout.World2ViewMatrix);
    if (!origin) origin = vdgeo.matrixtransform(vd_Aa, layout.ViewCenter);
    origin = vdgeo.matrixtransform(layout.World2ViewMatrix, origin);
    var mat = vdgeo.vd_Q();
    vdgeo.vd_gv(mat);
    vdgeo.vd_IY(mat, tilt);
    vdgeo.vd_ap(mat, vdgeo.PI + vd_Hd);
    vdgeo.vd_bf(mat, -1, -1, -1);
    var dir = vdgeo.vd_lt(mat, 1, 0, 0, true);
    vdgeo.vd_gv(mat);
    vdgeo.vd_hh(mat, dir);
    vdgeo.vd_ap(mat, vdgeo.VD_TWOPI - vd_gB);
    layout.ViewCenter = origin;
    layout.World2ViewMatrix = mat;
    vd_hX(layout);
    if (vd_aT != null) clearTimeout(vd_aT);
    vd_aT = setTimeout(vd_i.redraw, 0);
  };
  this.SetBlockSize = function (value) {
    vd_Gt = value;
  };
  this.vd_DN = function () {
    return Math.max(20, vd_Gt);
  };
  this.SetRenderMode = function (mode) {
    var layout = vd_i.GetActiveLayout();
    if (!layout) return;
    var vd_C = vd_f();
    if (vd_C.Model == layout) {
      vd_i.EnableWebGL(
        mode == vdConst.RENDERMODE_SHADE_GL ||
          mode == vdConst.RENDERMODE_RENDER_GL
      );
    }
    if (mode == vdConst.RENDERMODE_SHADE_GL)
      layout.RenderMode = vdConst.RENDERMODE_SHADE;
    else if (mode == vdConst.RENDERMODE_RENDER_GL)
      layout.RenderMode = vdConst.RENDERMODE_RENDER;
    else layout.RenderMode = mode;
    if (vd_aT != null) clearTimeout(vd_aT);
    vd_aT = setTimeout(vd_i.redraw, 0);
  };
  this.EnableWebGL = function (value) {
    vd_i.vd_gh = value;
  };
  this.WebGLisActive = function (value) {
    return vd_R.vd_bG();
  };
  this.GetViewBox = function () {
    if (vd_f() == null) return null;
    return {
      left: vd_R.vd_aa.left,
      bottom: vd_R.vd_aa.bottom,
      right: vd_R.vd_aa.right,
      top: vd_R.vd_aa.top,
    };
  };
  this.GetPixelSize = function () {
    if (vd_f() == null) return 0.0;
    return vd_R.GetPixelSize();
  };
  this.vd_zT = function (from, tox, toy, vd_dT) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return;
    var vd_pq = from[X];
    var vd_ow = from[Y];
    var vd_lP = from[Z];
    var x = tox - vd_pq;
    var y = toy - vd_ow;
    if (x == 0 && y == 0) return;
    var vd_X = vdgeo.newpoint(
      layout.ViewCenter[X],
      layout.ViewCenter[Y],
      layout.ViewCenter[Z]
    );
    var vd_m = layout.ViewSize;
    var vd_oP = vdgeo.vd_ci(layout.World2ViewMatrix);
    var org = vdgeo.vd_bp(vd_pq, vd_ow, vd_lP, vd_R.vd_ca);
    if (vd_R.vd_bO) {
      if (vd_lP >= 1 && vd_R.vd_qg) {
        var box = vdgeo.vd_rH(vd_oP, vd_R.vd_qg);
        org = vdgeo.vd_Is(box);
      }
    }
    if (vd_cJ) {
      if (!vd_cJ.vd_Al) {
        vd_cJ.vd_Al = [vd_oP, org];
      } else {
        org = vd_cJ.vd_Al[1];
        vd_oP = vd_cJ.vd_Al[0];
      }
    }
    var vd_CC = 1;
    var dz = (vd_CC * vdgeo.VD_TWOPI * 0.5 * x) / vd_R.width;
    var dx = (vd_CC * vdgeo.PI * 0.5 * y) / vd_R.height;
    var v = vdgeo.vd_lt(vd_oP, 0, 0, 1, true);
    var vd_by;
    vd_by = vdgeo.vd_Q();
    vdgeo.vd_cW(vd_by, vd_oP);
    vdgeo.vd_j(vd_by, -org[X], -org[Y], -org[Z]);
    vdgeo.vd_Mx(vd_by, v, dz);
    vdgeo.vd_LO(vd_by, dx);
    vdgeo.vd_j(vd_by, org[X], org[Y], org[Z]);
    var vd_ba = new vd_oQ(vd_i, vd_X[X], vd_X[Y], vd_X[Z], vd_m, vd_by);
    if (vd_i.vdUpdateView != null) vd_i.vdUpdateView(vd_ba);
    if (!vd_ba.Cancel) {
      layout.ViewSize = vd_ba.ViewSize;
      layout.ViewCenter = vdgeo.newpoint(
        vd_ba.ViewCenterX,
        vd_ba.ViewCenterY,
        vd_ba.ViewCenterZ
      );
      layout.World2ViewMatrix = vd_ba.vd_rt;
      vd_hX(layout);
      if (vd_dT != undefined && vd_dT >= 0) {
        if (vd_dT === 0) vd_i.redraw();
        else vd_rW(vd_mP, vd_vR);
      }
    }
  };
  this.scroll = function (from, tox, toy, vd_dT) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return;
    var vd_pq = from[X];
    var vd_ow = from[Y];
    var vd_lP = from[Z];
    var x = tox - vd_pq;
    var y = toy - vd_ow;
    if (x == 0 && y == 0) return;
    vd_Cf(vd_lP);
    var vd_by = vdgeo.vd_ci(layout.World2ViewMatrix);
    var vd_m = layout.ViewSize;
    var vd_X = vdgeo.newpoint(
      layout.ViewCenter[X],
      layout.ViewCenter[Y],
      layout.ViewCenter[Z]
    );
    if (vd_R.vd_bO && vd_R.vd_bd) {
      var z = vd_lP;
      var fv = vdgeo.vd_bp(vd_pq, vd_ow, z, vd_R.vd_ca);
      var tv = vdgeo.vd_bp(tox, toy, z, vd_R.vd_ca);
      var dx = tv[X] - fv[X];
      var dy = tv[Y] - fv[Y];
      vd_X[X] -= dx;
      vd_X[Y] -= dy;
    } else {
      vd_X[X] -= vd_R.GetPixelSize() * x;
      vd_X[Y] += vd_R.GetPixelSize() * y;
    }
    var vd_ba = new vd_oQ(vd_i, vd_X[X], vd_X[Y], vd_X[Z], vd_m, vd_by);
    if (vd_i.vdUpdateView != null) vd_i.vdUpdateView(vd_ba);
    if (!vd_ba.Cancel) {
      layout.ViewSize = vd_ba.ViewSize;
      layout.ViewCenter = vdgeo.newpoint(
        vd_ba.ViewCenterX,
        vd_ba.ViewCenterY,
        vd_ba.ViewCenterZ
      );
      layout.World2ViewMatrix = vd_ba.vd_rt;
      vd_hX(layout);
      if (vd_dT != undefined && vd_dT >= 0) {
        if (vd_dT === 0) vd_i.redraw();
        else vd_GB(vd_dT);
      }
      vd_cJ = [vdgeo.vd_r(tox), vdgeo.vd_r(toy), vd_lP];
    }
  };
  function vd_zL(x, y, z, scale) {
    if (scale == 0 || scale == 1) return null;
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_m = vd_R.vd_m;
    var vd_X = vdgeo.newpoint(
      layout.ViewCenter[X],
      layout.ViewCenter[Y],
      layout.ViewCenter[Z]
    );
    if (vd_R.vd_bO && vd_R.vd_bd) {
      var vd_fy = vd_R.vd_c.vd_fy;
      var zFar = vd_R.vd_c.zFar;
      var vd_lQ = Math.abs(zFar);
      var vd_KS = Math.abs(vd_fy - zFar) * 0.05;
      var fv = vdgeo.vd_bp(x, y, z, vd_R.vd_ca);
      if (z != 1.0) {
        vd_lQ = Math.abs(fv[Z]);
      }
      vd_lQ = Math.max(vd_KS, vd_lQ);
      vd_lQ *= 1 - scale;
      var pp = vdgeo.vd_bp(fv[X], fv[Y], fv[Z] + vd_lQ, vd_R.vd_cC);
      var tv = vdgeo.vd_bp(pp[X], pp[Y], z, vd_R.vd_ca);
      var dx = tv[X] - fv[X];
      var dy = tv[Y] - fv[Y];
      vd_X[X] += dx;
      vd_X[Y] += dy;
      vd_X[Z] -= vd_lQ;
    } else {
      vd_m *= scale;
      var vd_FA = vdgeo.matrixtransform(vd_R.vd_ca, vdgeo.newpoint(x, y, 0));
      var pixelsize = vd_m / vd_R.height;
      vd_X = vdgeo.newpoint(
        vd_FA[X] + (vd_R.width / 2.0 - x) * pixelsize,
        vd_FA[Y] + (y - vd_R.height / 2.0) * pixelsize,
        vd_X[Z]
      );
    }
    return [vd_X, vd_m];
  }
  this.zoomScale = function (x, y, Delta, vd_dT) {
    var z = vd_R.vd_c.vd_jM(x, y);
    var vd_eC = vd_zL(x, y, z, Delta);
    if (!vd_eC) return;
    var layout = vd_i.GetActiveLayout();
    vd_Cf(z);
    var vd_by = vdgeo.vd_ci(layout.World2ViewMatrix);
    var vd_X = vd_eC[0];
    var vd_m = vd_eC[1];
    var vd_ba = new vd_oQ(vd_i, vd_X[X], vd_X[Y], vd_X[Z], vd_m, vd_by);
    if (vd_i.vdUpdateView != null) vd_i.vdUpdateView(vd_ba);
    if (!vd_ba.Cancel) {
      layout.ViewSize = vd_ba.ViewSize;
      layout.ViewCenter = vdgeo.newpoint(
        vd_ba.ViewCenterX,
        vd_ba.ViewCenterY,
        vd_ba.ViewCenterZ
      );
      layout.World2ViewMatrix = vd_ba.vd_rt;
      vd_hX(layout);
      if (vd_dT == undefined || vd_dT < 0) return;
      else if (vd_dT === 0) vd_i.redraw();
      else vd_GB(vd_dT);
    }
  };
  this.vd_Pu = function (vd_kp, vd_lB, pos1, pos2, vd_xA) {
    if ((vd_xA & (vdConst.DEFAULT_ZOOMSCALE | vdConst.DEFAULT_ROTATE3D)) == 0)
      return;
    var vd_vC = vd_kp[X] - vd_lB[X];
    var vd_yk = vd_kp[Y] - vd_lB[Y];
    var dx = pos1[X] - pos2[X];
    var dy = pos1[Y] - pos2[Y];
    var vd_wP = (vd_kp[X] + vd_lB[X]) / 2;
    var vd_wo = (vd_kp[Y] + vd_lB[Y]) / 2;
    var vd_IS = Math.sqrt(vd_vC * vd_vC + vd_yk * vd_yk);
    var vd_JV = Math.sqrt(dx * dx + dy * dy);
    var scale = vd_IS / vd_JV;
    var vd_xu = Math.atan2(vd_yk, vd_vC);
    var vd_xS = Math.atan2(dy, dx);
    vd_xu = vdgeo.FixAngle(vd_xu);
    vd_xS = vdgeo.FixAngle(vd_xS);
    var rot = vdgeo.FixAngle(vd_xS - vd_xu);
    var layout = vd_i.GetActiveLayout();
    var vd_by = vdgeo.vd_ci(layout.World2ViewMatrix);
    var vd_m = layout.ViewSize;
    var vd_X = vdgeo.newpoint(
      layout.ViewCenter[X],
      layout.ViewCenter[Y],
      layout.ViewCenter[Z]
    );
    var z = vd_R.vd_c.vd_jM(vd_wP, vd_wo);
    if (vd_xA & vdConst.DEFAULT_ROTATE3D && rot > (3 * vdgeo.PI) / 180) {
      var vd_mr = vdgeo.vd_bp(vd_wP, vd_wo, z, vd_R.vd_ca);
      vdgeo.vd_j(vd_by, -vd_mr[X], -vd_mr[Y], -vd_mr[Z]);
      vdgeo.vd_ap(vd_by, -rot);
      vdgeo.vd_j(vd_by, vd_mr[X], vd_mr[Y], vd_mr[Z]);
    }
    if (
      vd_xA & vdConst.DEFAULT_ZOOMSCALE &&
      !vdgeo.AreEqual(scale, 1.0, 0.001)
    ) {
      var vd_eC = vd_zL(vd_wP, vd_wo, z, scale);
      if (vd_eC) {
        vd_X = vd_eC[0];
        vd_m = vd_eC[1];
      }
    }
    var vd_ba = new vd_oQ(vd_i, vd_X[X], vd_X[Y], vd_X[Z], vd_m, vd_by);
    if (vd_i.vdUpdateView != null) vd_i.vdUpdateView(vd_ba);
    if (!vd_ba.Cancel) {
      layout.World2ViewMatrix = vd_by;
      layout.ViewSize = vd_m;
      layout.ViewCenter = vd_X;
      vd_hX(layout);
      vd_rW(vd_mP, vd_vR);
    }
  };
  function vd_vR() {
    if (vd_aT != null) clearTimeout(vd_aT);
    vd_aT = null;
    var vd_C = vd_f();
    if (!vd_C) return;
    var layout = vd_i.GetActiveLayout();
    if (!layout) return;
    var vd_lH;
    var vd_kt = vd_R.vd_be;
    if (vd_R.vd_bG()) {
      if (vd_fl > vd_sp) {
        vd_R.vd_be = false;
      }
      vd_i.redraw(true);
      vd_lH = vd_R.vd_be != vd_kt;
      vd_R.vd_be = vd_kt;
      if (vd_lH) setTimeout(vd_i.redraw, Math.max(vd_qo, vd_fl));
      return;
    }
    var vd_zr = vd_R.vd_cT;
    var vd_OT = vd_R.vd_fj;
    var vd_zM = vd_R.RenderMode;
    var vd_AM = vd_R.vd_bd;
    var vd_OX = vd_i.GetImageInterpolationMode();
    if (vd_fl > vd_sp) {
      vd_i.SetImageInterpolationMode(vdConst.InterpolationMode_Nearest);
      vd_R.vd_be = false;
      if (!vd_R.vd_bG()) {
        if (vd_fl > vd_sp) {
          vd_R.vd_cT = false;
          if (vd_fl > vd_HH) {
            vd_R.RenderMode = vdConst.vd_vv;
          }
        }
      }
    }
    vd_i.redraw(true);
    vd_lH =
      vd_R.vd_be != vd_kt ||
      vd_R.vd_cT != vd_zr ||
      vd_R.RenderMode != vd_zM ||
      vd_R.vd_bd != vd_AM;
    vd_i.SetImageInterpolationMode(vd_OX);
    vd_R.vd_be = vd_kt;
    vd_R.vd_cT = vd_zr;
    vd_R.vd_fj = vd_OT;
    vd_R.RenderMode = vd_zM;
    vd_R.vd_bd = vd_AM;
    if (vd_lH) setTimeout(vd_i.redraw, Math.max(vd_qo, vd_fl));
  }
  function vd_rW(vd_oV, vd_MH) {
    if (vd_fl > 0 && vd_fl < vd_oV) vd_oV = vd_fl;
    if (vd_aT != null) clearTimeout(vd_aT);
    vd_aT = setTimeout(vd_MH, vd_oV);
  }
  function vd_Cf(vd_rY) {
    if (vd_pM == null) {
      vd_LZ();
      vd_pM = [vdgeo.vd_ci(vd_R.vd_ca), vd_rY];
    }
  }
  function vd_GB(vd_oV) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return;
    vd_hX(layout);
    if (vd_R.vd_bG() || (vd_R.vd_bO && vd_R.vd_bd)) {
      vd_rW(vd_mP, vd_vR);
    } else {
      var vd_HO = vdgeo.vd_jL(vd_pM[0], vd_R.vd_cC);
      vd_Mp(vd_HO);
      vd_AP();
      var vd_Mt = vd_mP;
      vd_mP = 500;
      vd_rW(vd_oV, vd_LY);
      vd_mP = vd_Mt;
    }
  }
  function vd_LY() {
    if (vd_aT != null) clearTimeout(vd_aT);
    vd_aT = null;
    var vd_kt = vd_R.vd_be;
    if (vd_fl > vd_sp) {
      vd_R.vd_be = false;
    }
    vd_i.redraw(true);
    var vd_lH = vd_R.vd_be != vd_kt;
    vd_R.vd_be = vd_kt;
    if (vd_lH) vd_aT = setTimeout(vd_i.redraw, Math.max(vd_qo, vd_fl));
  }
  this.UndoHistory = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    return vd_C.UndoHistory;
  };
  this.GetDocument = function () {
    return vd_f();
  };
  this.SetDocument = function (document) {
    if (!document || vd_bR == null) return false;
    vd_bR.vdDocument = document;
    vd_ya();
    return true;
  };
  this.GetActiveLayout = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    if (!vd_C.ActiveLayOutRef) {
      if (
        vd_C.LayOuts == undefined ||
        vd_C.LayOuts[vd_C.ActiveLayOut] == undefined
      )
        vd_C.ActiveLayOutRef = vd_C.Model;
      else
        vd_C.ActiveLayOutRef =
          vd_C.LayOuts.Items[vd_C.LayOuts[vd_C.ActiveLayOut]];
    }
    return vd_C.ActiveLayOutRef;
  };
  this.SetActiveLayout = function (layout) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    if (!layout) layout = vd_C.Model;
    vd_C.ActiveLayOutRef = layout;
    vd_C.ActiveLayOut = "h_" + layout.HandleId.toString();
    if (vd_aT != null) clearTimeout(vd_aT);
    vd_aT = setTimeout(vd_i.redraw, 0);
  };
  this.NumLayouts = function () {
    var vd_C = vd_f();
    if (vd_C == null) return 0;
    if (vd_C.LayOuts == undefined) return 0;
    return vd_C.LayOuts.Items.length;
  };
  this.GetActiveLayoutId = function () {
    var vd_C = vd_f();
    if (vd_C == null) return -1;
    if (vd_C.LayOuts == undefined) return -1;
    var vd_xL = vd_C.LayOuts[vd_f().ActiveLayOut];
    if (vd_xL == undefined) vd_xL = -1;
    return vd_xL;
  };
  this.SetActiveLayoutId = function (id) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    id = Math.max(-1, id);
    if (id >= vd_i.NumLayouts()) id = -1;
    var layout = null;
    if (id == -1) layout = vd_C.Model;
    else layout = vd_C.LayOuts.Items[id];
    vd_i.SetActiveLayout(layout);
  };
  this.FindLayout = function (name) {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    name = name.toLowerCase();
    if (name == "model" || !vd_C.LayOuts) return -1;
    for (var i = 0; i < vd_C.LayOuts.Items.length; i++) {
      var layout = vd_C.LayOuts.Items[i];
      var vd_gP = layout.Name.toLowerCase();
      if (vd_gP == name) return i;
    }
    return -1;
  };
  this.GetLayouts = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    var ret = [vd_C.Model];
    if (vd_C.LayOuts) {
      for (var i = 0; i < vd_C.LayOuts.Items.length; i++) {
        var layout = vd_C.LayOuts.Items[i];
        ret.push(layout);
      }
    }
    return ret;
  };
  this.GetBlocks = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    var ret = [];
    for (var i = 0; i < vd_C.Blocks.Items.length; i++) {
      var block = vd_i.GetDictItem(vd_C.Blocks, vd_C.Blocks.Items[i]);
      ret.push(block);
    }
    return ret;
  };
  this.GetImages = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    var ret = [];
    for (var i = 0; i < vd_C.Images.Items.length; i++) {
      var vd_u = vd_i.GetDictItem(vd_C.Images, vd_C.Images.Items[i]);
      ret.push(vd_u);
    }
    return ret;
  };
  this.GetLayers = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    var ret = [];
    for (var i = 0; i < vd_C.Layers.Items.length; i++) {
      var layer = vd_i.GetDictItem(vd_C.Layers, vd_C.Layers.Items[i]);
      ret.push(layer);
    }
    return ret;
  };
  this.FindLayer = function (name) {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    name = name.toLowerCase();
    for (var i = 0; i < vd_C.Layers.Items.length; i++) {
      var layer = vd_i.GetDictItem(vd_C.Layers, vd_C.Layers.Items[i]);
      var vd_gP = layer.Name.toLowerCase();
      if (vd_gP == name) return layer;
    }
    return null;
  };
  this.FindLineType = function (name) {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    name = name.toLowerCase();
    for (var i = 0; i < vd_C.LineTypes.Items.length; i++) {
      var vd_Dp = vd_i.GetDictItem(vd_C.LineTypes, vd_C.LineTypes.Items[i]);
      var vd_gP = vd_Dp.Name.toLowerCase();
      if (vd_gP == name) return vd_Dp;
    }
    return null;
  };
  this.GetLineTypes = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    var ret = [];
    for (var i = 0; i < vd_C.LineTypes.Items.length; i++) {
      var linetype = vd_i.GetDictItem(vd_C.LineTypes, vd_C.LineTypes.Items[i]);
      ret.push(linetype);
    }
    return ret;
  };
  this.FindTextStyle = function (name) {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    name = name.toLowerCase();
    for (var i = 0; i < vd_C.TextStyles.Items.length; i++) {
      var vd_nA = vd_i.GetDictItem(vd_C.TextStyles, vd_C.TextStyles.Items[i]);
      var vd_gP = vd_nA.Name.toLowerCase();
      if (vd_gP == name) return vd_nA;
    }
    return null;
  };
  this.GetTextStyles = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    var ret = [];
    for (var i = 0; i < vd_C.TextStyles.Items.length; i++) {
      var textstyle = vd_i.GetDictItem(
        vd_C.TextStyles,
        vd_C.TextStyles.Items[i]
      );
      ret.push(textstyle);
    }
    return ret;
  };
  this.SetActiveLayer = function (layer) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    if (layer == null)
      layer = vd_i.GetDictItem(vd_C.Layers, vd_C.Layers.Items[0]);
    vd_C.ActiveLayer = "h_" + layer.HandleId.toString();
  };
  this.SetActiveLineType = function (lt) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    if (lt == null)
      lt = vd_i.GetDictItem(vd_C.LineTypes, vd_C.LineTypes.Items[0]);
    vd_C.ActiveLineType = "h_" + lt.HandleId.toString();
  };
  this.SetActiveTextStyle = function (style) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    if (style == null)
      style = vd_i.GetDictItem(vd_C.TextStyles, vd_C.TextStyles.Items[0]);
    vd_C.ActiveTextStyle = "h_" + style.HandleId.toString();
  };
  this.SetActivePenWidth = function (pw) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    vd_C.ActivePenWidth = pw;
  };
  this.SetActiveLineWeight = function (lw) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    vd_C.ActiveLineWeight = lw;
  };
  this.SetActivePenColor = function (col) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    vd_C.ActivePenColor = col;
  };
  this.GetActivePenColor = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    return vd_C.ActivePenColor;
  };
  this.GetActiveHatchProperties = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    var vd_P = vd_C.ActiveHatchProperties;
    if (!vd_P) {
      vd_P = vd_i.createNewHatchProperties();
      vd_C.ActiveHatchProperties = vd_P;
    }
    return vd_C.ActiveHatchProperties;
  };
  this.GetActiveThickness = function () {
    var vd_C = vd_f();
    if (vd_C == null) return 0.0;
    if (!vd_C.vd_uR) return 0.0;
    return vd_C.vd_uR;
  };
  this.SetActiveThickness = function (thickness) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    vd_C.vd_uR = thickness;
  };
  this.SetActiveHatchProperties = function (vd_NT) {
    var vd_C = vd_f();
    if (vd_C == null) return;
    vd_C.ActiveHatchProperties = vd_NT;
  };
  this.vd_Gp = function (name) {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    if (!name) return null;
    name = name.toLowerCase();
    for (var i = 0; i < vd_C.HatchPatterns.Items.length; i++) {
      var hpat = vd_i.GetDictItem(
        vd_C.HatchPatterns,
        vd_C.HatchPatterns.Items[i]
      );
      var vd_LN = hpat.Name.toLowerCase();
      if (vd_LN == name) return hpat;
    }
    return null;
  };
  this.GetHatchPatterns = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    var ret = [];
    for (var i = 0; i < vd_C.HatchPatterns.Items.length; i++) {
      var vd_MW = vd_i.GetDictItem(
        vd_C.HatchPatterns,
        vd_C.HatchPatterns.Items[i]
      );
      ret.push(vd_MW);
    }
    return ret;
  };
  this.createNewHatchProperties = function (
    vd_jg,
    FillBkColor,
    FillColor,
    vd_iI,
    vd_jf
  ) {
    if ((!vd_jg && !FillBkColor && !FillColor) || vd_jg == "") return null;
    var vd_pQ = vd_i.vd_Gp(vd_jg);
    if (!vd_pQ) return null;
    var vd_Bz = "h_0";
    var Dpi = false;
    if (vd_pQ) {
      vd_Bz = "h_" + vd_pQ.HandleId;
      Dpi = vd_i.vd_Oe(vd_pQ.Name);
    }
    var vd_bT;
    if (FillBkColor) vd_bT = FillBkColor;
    else vd_bT = {};
    var color;
    if (FillColor) color = FillColor;
    else color = {};
    if (!vd_jf) vd_jf = 0.0;
    if (!vd_iI) vd_iI = 1.0;
    return {
      HatchPattern: vd_Bz,
      IsDpi: Dpi,
      DrawBoundary: false,
      FillBkColor: vd_bT,
      FillColor: color,
      HatchAngle: vd_jf,
      HatchScale: vd_iI,
      gradientTypeProp: 0,
      gradientColor2: undefined,
      gradientAngle: 0,
      HatchOrigin: [0, 0, 0],
    };
  };
  this.vd_Oe = function (vd_ky) {
    return (
      vd_ky.toUpperCase().indexOf("U10") >= 0 ||
      vd_ky.toUpperCase().indexOf("U20") >= 0 ||
      vd_ky.toUpperCase().indexOf("U10_45") >= 0 ||
      vd_ky.toUpperCase().indexOf("U10_135") >= 0 ||
      vd_ky.toUpperCase().indexOf("U10_90") >= 0 ||
      vd_ky.toUpperCase().indexOf("U10_45_135") >= 0
    );
  };
  this.vd_ms = function (vd_cy) {
    if (!vd_cy) return null;
    var ret = {};
    ret.HatchPattern = vd_cy.HatchPattern;
    ret.IsDpi = vd_cy.IsDpi;
    ret.DrawBoundary = vd_cy.DrawBoundary;
    ret.FillBkColor = vdConst.vd_sO(vd_cy.FillBkColor);
    ret.FillColor = vdConst.vd_sO(vd_cy.FillColor);
    ret.HatchAngle = vd_cy.HatchAngle;
    ret.HatchScale = vd_cy.HatchScale;
    ret.gradientTypeProp = vd_cy.gradientTypeProp;
    if (vd_cy.gradientColor2)
      ret.gradientColor2 = vd_cy.gradientColor2.concat([]);
    ret.gradientAngle = vd_cy.gradientAngle;
    if (vd_cy.HatchOrigin) ret.HatchOrigin = vd_cy.HatchOrigin.concat([]);
    if (vd_cy.Solid2dTransparency !== undefined)
      ret.Solid2dTransparency = vd_cy.Solid2dTransparency;
    return ret;
  };
  this.FindBlock = function (name) {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    name = name.toLowerCase();
    for (var i = 0; i < vd_C.Blocks.Items.length; i++) {
      var block = vd_i.GetDictItem(vd_C.Blocks, vd_C.Blocks.Items[i]);
      var vd_gP = block.Name.toLowerCase();
      if (vd_gP == name) return block;
    }
    return null;
  };
  this.GetEntityPosition = function (entity, vd_bx) {
    if (!entity || !entity.HandleId) return -1;
    var vd_C = vd_f();
    if (!vd_C) return -1;
    var layout = vd_i.GetActiveLayout();
    if (!layout) return -1;
    if (!vd_bx) vd_bx = layout.Entities;
    var hid = "h_" + entity.HandleId.toString();
    var p = vd_bx.Items.indexOf(hid);
    return p;
  };
  this.SetEntityPosition = function (entity, pos, vd_bx) {
    if (!entity || !entity.HandleId) return -1;
    var vd_C = vd_f();
    if (!vd_C) return -1;
    var layout = vd_i.GetActiveLayout();
    if (!layout) return -1;
    if (!vd_bx) vd_bx = layout.Entities;
    var hid = "h_" + entity.HandleId.toString();
    var p = vd_bx.Items.indexOf(hid);
    if (p < 0) return -1;
    if (!pos || pos < 0) pos = 0;
    if (pos >= vd_bx.Items.length - 1) pos = vd_bx.Items.length - 1;
    if (p == pos) return pos;
    vd_bx.Items.splice(p, 1);
    vd_bx.Items.splice(pos, 0, hid);
    return pos;
  };
  this.vd_fq = function () {
    var vd_C = vd_f();
    return vdConst.vd_vJ(vd_C);
  };
  this.AddFigureToCollection = function (vd_sN, ent) {
    return vd_i.vd_aE(vd_sN, ent, true);
  };
  this.vd_aE = function (vd_sN, ent, vd_Ju) {
    if (!vd_sN.Items) return false;
    if (vd_f()[hid]) return false;
    if (!vd_Ju && !ent.HandleId) return false;
    if (!ent.HandleId) ent.HandleId = vd_i.vd_fq();
    var hid = "h_" + ent.HandleId.toString();
    vd_sN.Items.push(hid);
    vd_f()[hid] = ent;
    return true;
  };
  this.CopyObjects = function (entities) {
    var vd_mD = [];
    var doc = vd_i.GetDocument();
    var layout = vd_i.GetActiveLayout();
    for (var i = 0; i < entities.length; i++) {
      var ent = entities[i];
      var obj = vdConst.cloneEntity(ent);
      obj.HandleId = vd_i.vd_fq();
      vd_i.vd_aE(layout.Entities, obj);
      vd_mD.push(obj);
      var perc = (i / entities.length) * 100;
    }
    return vd_mD;
  };
  this.ExplodeObjects = function (entities) {
    var vd_mD = [];
    var j;
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      if (entity._t === vdConst.vdInsert_code) {
        vd_i.GetEntityBBox(entity);
        if (!entity.BlockRef) continue;
        if (entity.BlockRef.ExternalReferencePath) continue;
        if (!entity.EcsMatrix) continue;
        var isArray = entity.Columns > 1 || entity.Rows > 1;
        var mat = entity.EcsMatrix;
        for (c = 0; c < entity.Columns; c++) {
          for (r = 0; r < entity.Rows; r++) {
            if (isArray) {
              var offset = vdgeo.newpoint(
                (c * entity.ColumnDist) / entity.Xscale,
                (r * entity.RowDist) / entity.Yscale,
                0.0
              );
              var omat = vdgeo.vd_Q();
              vdgeo.vd_j(omat, offset[X], offset[Y], offset[Z]);
              mat = vdgeo.vd_jL(omat, entity.EcsMatrix);
            }
            for (j = 0; j < entity.BlockRef.Entities.Items.length; j++) {
              var vd_pX = vd_i.GetEntityItem(entity.BlockRef.Entities.Items[j]);
              var vd_ez = null;
              if (vd_pX._t === vdConst.vdAttribDef_code) {
                if (vd_pX.InVisibleMode !== true && vd_pX.IsConstant == true) {
                  vd_ez = vdConst.cloneEntity(vd_pX);
                  vd_ez.TextString = vd_ez.ValueString;
                  vd_ez._t = vdConst.vdText_code;
                }
              } else {
                vd_ez = vdConst.cloneEntity(vd_pX);
              }
              if (!vd_ez) continue;
              vd_ez.HandleId = 0;
              vd_q.vd_ef(mat, vd_ez, vd_i);
              vd_mD.push(vd_ez);
            }
            mat = vdgeo.vd_Q();
            if (
              entity.Attributes &&
              entity.Attributes.Items &&
              entity.Attributes.Items.length > 0
            ) {
              for (c = 0; c < entity.Columns; c++) {
                for (r = 0; r < entity.Rows; r++) {
                  if (isArray) {
                    offset = vdgeo.pointPolar(
                      vdgeo.newpoint(0, 0, 0),
                      entity.Rotation,
                      c * entity.ColumnDist
                    );
                    offset = vdgeo.pointPolar(
                      offset,
                      entity.Rotation + vdgeo.HALF_PI,
                      r * entity.RowDist
                    );
                    omat = vdgeo.vd_Q();
                    vdgeo.vd_j(omat, offset[X], offset[Y], offset[Z]);
                    mat = omat;
                  }
                  for (j = 0; j < entity.Attributes.Items.length; j++) {
                    var vd_Ac = vd_i.GetEntityItem(entity.Attributes.Items[j]);
                    if (vd_Ac.IsConstant == true || vd_Ac.InVisibleMode == true)
                      continue;
                    vd_ez = vdConst.cloneEntity(vd_Ac);
                    vd_ez._t = vdConst.vdText_code;
                    vd_ez.HandleId = 0;
                    vd_q.vd_ef(mat, vd_ez, vd_i);
                    vd_mD.push(vd_ez);
                  }
                }
              }
            }
          }
        }
      }
    }
    return vd_mD;
  };
  this.vd_dM = function (vd_V, vd_C, vd_Lh) {
    if (!vd_Lh) vd_V.HandleId = vd_i.vd_fq();
    vd_V.LineType = vd_C.ActiveLineType;
    vd_V.Layer = vd_C.ActiveLayer;
    vd_V.PenColor = vdConst.vd_sO(vd_i.GetActivePenColor());
    vd_V.PenWidth = vd_C.ActivePenWidth;
    vd_V.LineWeight = vd_C.ActiveLineWeight;
    if (vd_C.vd_mx) vd_V.LineTypeScale = vd_C.vd_mx;
  };
  this.AddText = function (
    vd_HW,
    height,
    vd_kV,
    vd_yE,
    vd_lU,
    rotation,
    vd_am,
    entities
  ) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdText_code;
    vd_V.InsertionPoint = vd_kV;
    vd_V.TextString = vd_HW;
    vd_V.Rotation = rotation;
    vd_V.Height = 1;
    vd_V.Style = vd_C.ActiveTextStyle;
    var ts = vd_i.GetDictItem(vd_C.TextStyles, vd_C.ActiveTextStyle);
    if (ts) {
      if (!height && ts.Height) vd_V.Height = ts.Height;
      if (vd_yE == undefined && ts.HorJustify != undefined)
        vd_V.HorJustify = ts.HorJustify;
      if (vd_lU == undefined && ts.VerJustify != undefined)
        vd_V.VerJustify = ts.VerJustify;
    }
    if (height) vd_V.Height = height;
    if (vd_yE != undefined) vd_V.HorJustify = vd_yE;
    if (vd_lU != undefined) vd_V.VerJustify = vd_lU;
    vd_V.Thickness = vd_i.GetActiveThickness();
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddCone = function (
    p1,
    BaseRadius,
    TopRadius,
    hei,
    num,
    vd_am,
    entities
  ) {
    var VertexList = [];
    var FaceList = [];
    var i = 0;
    var k = 0;
    var vd_gp;
    var p2 = [p1[X], p1[Y], p1[Z]];
    p2[Z] += hei;
    for (i = 0; i < num; i++) {
      vd_gp = vdgeo.pointPolar(p1, (i * vdgeo.VD_TWOPI) / num, BaseRadius);
      VertexList.push(vd_gp);
    }
    for (i = 0; i < num; i++) {
      vd_gp = vdgeo.pointPolar(p2, (i * vdgeo.VD_TWOPI) / num, TopRadius);
      VertexList.push(vd_gp);
    }
    for (i = 0; i < num - 2; i++) {
      k = -1;
      FaceList.push(k);
      k = -(i + 2);
      FaceList.push(k);
      k = -(i + 3);
      FaceList.push(k);
      FaceList.push(k);
      k = -1;
      FaceList.push(k);
      k = -(1 + num);
      FaceList.push(k);
      k = -(i + 2 + num);
      FaceList.push(k);
      k = -(i + 3 + num);
      FaceList.push(k);
      FaceList.push(k);
      k = -1;
      FaceList.push(k);
    }
    for (i = 0; i < num; i++) {
      k = i + 1;
      FaceList.push(k);
      k = i + 1 + num;
      FaceList.push(k);
      k = i + 2 + num;
      if (i == num - 1) k = 1 + num;
      FaceList.push(k);
      k = i + 2;
      if (i == num - 1) k = 1;
      FaceList.push(k);
      k = -1;
      FaceList.push(k);
    }
    return vd_i.AddPolyface(VertexList, FaceList, vd_am, entities);
  };
  this.AddSphere = function (p1, rad, lon, lat, vd_am, entities) {
    var vd_ys = vdgeo.VD_TWOPI / lon;
    var vd_yn = vdgeo.PI / lat;
    var k = 0,
      l = 0,
      i = 0;
    var a, sa, va, dp, dh;
    var pt;
    var VertexList = [];
    var FaceList = [];
    for (k = 0; k < lon + 1; k++) {
      a = k * vd_ys;
      sa = vdgeo.PI / -2.0;
      for (l = 0; l < lat + 1; l++) {
        va = sa + l * vd_yn;
        dp = rad * Math.cos(va);
        dh = rad * Math.sin(va);
        pt = vdgeo.pointPolar(p1, a, dp);
        pt[Z] += dh;
        VertexList.push(pt);
      }
    }
    for (k = 0; k < lon; k++) {
      for (l = 0; l < lat; l++) {
        i = l + k * (lat + 1);
        i += 1;
        FaceList.push(i);
        i = l + 1 + k * (lat + 1);
        i += 1;
        FaceList.push(i);
        i = l + 1 + (k + 1) * (lat + 1);
        i += 1;
        if (k == lon - 1) {
          i = l + 1;
          i += 1;
        }
        FaceList.push(i);
        i = l + (k + 1) * (lat + 1);
        i += 1;
        if (k == lon - 1) {
          i = l;
          i += 1;
        }
        FaceList.push(i);
        i = -1;
        FaceList.push(i);
      }
    }
    return vd_i.AddPolyface(VertexList, FaceList, vd_am, entities);
  };
  this.AddBox = function (p1, len, wid, hei, rot, vd_am, entities) {
    var VertexList = [
      [0, 0, 0],
      [len, 0, 0],
      [len, wid, 0],
      [0, wid, 0],
      [0, 0, hei],
      [len, 0, hei],
      [len, wid, hei],
      [0, wid, hei],
    ];
    var FaceList = [
      1, 2, 3, 4, -1, 5, 6, 7, 8, -1, 1, 2, 6, 5, -1, 2, 3, 7, 6, -1, 3, 4, 8,
      7, -1, 4, 1, 5, 8, -1,
    ];
    var mat = vdgeo.vd_Q();
    vdgeo.vd_ap(mat, rot);
    vdgeo.vd_j(mat, p1[X], p1[Y], p1[Z]);
    VertexList = vdgeo.vd_eq(mat, VertexList);
    return vd_i.AddPolyface(VertexList, FaceList, vd_am, entities);
  };
  this.TriangulatePolyface = function (vd_mW, precision) {
    if (!vd_mW || !vd_mW._t || vd_mW._t != vdConst.vdPolyface_code)
      return false;
    if (!precision) precision = 8;
    var ret = vd_Ab.vd_Aw(vd_mW.VertexList.Items, precision);
    var vd_fe = [];
    for (var i = 0; i < ret.length; i += 3) {
      vd_fe.push(ret[i] + 1);
      vd_fe.push(ret[i + 1] + 1);
      vd_fe.push(ret[i + 2] + 1);
      vd_fe.push(ret[i + 2] + 1);
      vd_fe.push(-1);
    }
    vd_mW.FaceList.Items = vd_fe;
    vd_i.UpdateFig(vd_mW);
    return true;
  };
  this.AddHeatMap = function (points, vd_yO, precision, vd_am, entities) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    if (!precision) precision = 8;
    var ret = vd_Ab.vd_Aw(points, precision);
    var vd_fe = [];
    var i;
    for (i = 0; i < ret.length; i += 3) {
      vd_fe.push(ret[i] + 1);
      vd_fe.push(ret[i + 1] + 1);
      vd_fe.push(ret[i + 2] + 1);
      vd_fe.push(ret[i + 2] + 1);
      vd_fe.push(-1);
    }
    var pf = vd_i.AddPolyface(points, vd_fe, false, entities);
    pf.GradientColors = { Items: [] };
    for (i = 0; i < vd_yO.length; i += 2) {
      pf.GradientColors.Items.push({ Key: vd_yO[i], Value: vd_yO[i + 1] });
    }
    pf.GradientColors.Items.sort(function (a, b) {
      return a.Key - b.Key;
    });
    if (vd_am) {
      vd_bm(pf, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return pf;
  };
  this.AddPolyface = function (points, vd_Kj, vd_am, entities) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdPolyface_code;
    vd_V.VertexList = { Items: points };
    vd_V.FaceList = { Items: vd_Kj };
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddArc = function (center, radius, vd_Av, vd_yS, vd_am, entities) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdArc_code;
    vd_V.Center = center;
    vd_V.Radius = radius;
    vd_V.StartAngle = vd_Av;
    vd_V.EndAngle = vd_yS;
    vd_V.HatchProperties = vd_i.vd_ms(vd_i.GetActiveHatchProperties());
    vd_V.Thickness = vd_i.GetActiveThickness();
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddCircle = function (center, radius, vd_am, entities) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdCircle_code;
    vd_V.Center = center;
    vd_V.Radius = radius;
    vd_V.HatchProperties = vd_i.vd_ms(vd_i.GetActiveHatchProperties());
    vd_V.Thickness = vd_i.GetActiveThickness();
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddEllipse = function (
    center,
    vd_Ll,
    vd_Lb,
    vd_Ml,
    vd_Av,
    vd_yS,
    vd_am,
    entities
  ) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdEllipse_code;
    vd_V.Center = center;
    vd_V.MajorAngle = vd_Ml;
    vd_V.MajorLength = vd_Ll;
    vd_V.MinorLength = vd_Lb;
    vd_V.StartAngle = vd_Av;
    vd_V.EndAngle = vd_yS;
    vd_V.HatchProperties = vd_i.vd_ms(vd_i.GetActiveHatchProperties());
    vd_V.Thickness = vd_i.GetActiveThickness();
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddPointCloud = function (pts, vd_jq, vd_am, entities) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdPointCloud_code;
    vd_V.points = { Items: pts };
    vd_V.Colors = { Items: vd_jq };
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddPoint = function (vd_NJ, vd_am, entities) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdPoint_code;
    vd_V.InsertionPoint = vd_NJ;
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddInfinityLine = function (vd_NY, vd_IV, direction, vd_am, entities) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdInfinityLine_code;
    vd_V.BasePoint = vd_IV;
    vd_V.Direction = direction;
    vd_V.InfinityType = vd_NY;
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddLine = function (vd_iX, vd_je, vd_am, entities) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdLine_code;
    vd_V.StartPoint = vd_iX;
    vd_V.EndPoint = vd_je;
    vd_V.Thickness = vd_i.GetActiveThickness();
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddPolyHatch = function (vd_rA, OutLines, vd_am, entities) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdPolyhatch_code;
    vd_V.HatchProperties = vd_i.vd_ms(vd_i.GetActiveHatchProperties());
    vd_V.Thickness = vd_i.GetActiveThickness();
    vd_V.Curves = { Items: [] };
    var i, item, npts;
    if (vd_rA) {
      for (i = 0; i < vd_rA.length; i++) {
        item = vd_rA[i];
        if (Array.isArray(item)) {
          vd_V.Curves.Items.push({ Items: item });
        } else if (
          typeof item === "object" &&
          (item._t === vdConst.vdPolyline_code ||
            item._t === vdConst.vdRect_code ||
            item._t === vdConst.vdCircle_code ||
            item._t === vdConst.vdEllipse_code ||
            item._t === vdConst.vdArc_code)
        ) {
          vd_i.GetEntityBBox(item);
          if (item.SamplePoints) {
            if (item.EcsMatrix)
              npts = vdgeo.vd_eq(item.EcsMatrix, item.SamplePoints);
            else npts = item.SamplePoints;
            vd_V.Curves.Items.push({ Items: npts });
          }
        }
      }
    }
    if (!OutLines) OutLines = vd_rA;
    if (OutLines) {
      vd_V.OutLines = { Items: [] };
      for (i = 0; i < OutLines.length; i++) {
        item = OutLines[i];
        if (Array.isArray(item)) {
          vd_V.OutLines.Items.push({ Items: item });
        } else if (
          typeof item === "object" &&
          (item._t === vdConst.vdLine_code ||
            item._t === vdConst.vdPolyline_code ||
            item._t === vdConst.vdRect_code ||
            item._t === vdConst.vdCircle_code ||
            item._t === vdConst.vdEllipse_code ||
            item._t === vdConst.vdArc_code)
        ) {
          vd_i.GetEntityBBox(item);
          if (item.SamplePoints) {
            if (item.EcsMatrix)
              npts = vdgeo.vd_eq(item.EcsMatrix, item.SamplePoints);
            else npts = item.SamplePoints;
            vd_V.OutLines.Items.push({ Items: npts });
          }
        }
      }
    }
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddPolyline = function (vd_br, vd_am, entities) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    var k, i;
    var vd_I;
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdPolyline_code;
    vd_V.VertexList = {};
    vd_V.VertexList.Items = [];
    for (k = 0; k < vd_br.length; k++) {
      vd_I = vd_br[k];
      for (i = vd_I.length; i < 4; i++) vd_I.push(0.0);
      vd_V.VertexList.Items.push(vd_I);
    }
    vd_V.HatchProperties = vd_i.vd_ms(vd_i.GetActiveHatchProperties());
    vd_V.Thickness = vd_i.GetActiveThickness();
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddRect2 = function (
    insertion,
    width,
    height,
    rotation,
    vd_am,
    entities
  ) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdRect_code;
    vd_V.InsertionPoint = insertion;
    vd_V.Width = width;
    vd_V.Height = height;
    vd_V.Rotation = rotation;
    vd_V.HatchProperties = vd_i.vd_ms(vd_i.GetActiveHatchProperties());
    vd_V.Thickness = vd_i.GetActiveThickness();
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.AddRect = function (vd_wA, vd_CK, vd_am, entities) {
    return vd_i.AddRect2(
      vd_wA,
      vd_CK[X] - vd_wA[X],
      vd_CK[Y] - vd_wA[Y],
      0,
      vd_am,
      entities
    );
  };
  this.AddAttribDef = function (block, height, rotation, tag, value, vd_kV) {
    if (!block || !block._t || block._t != vdConst.vdBlock_code) return null;
    var vd_C = vd_f();
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C);
    vd_V.AlignmentPoint = [0, 0, 0];
    vd_V._t = vdConst.vdAttribDef_code;
    vd_V.TagString = tag;
    vd_V.PromptString = "Prompt";
    vd_V.ValueString = value;
    vd_V.TextString = tag;
    vd_V.Height = 1.0;
    vd_V.Style = vd_C.ActiveTextStyle;
    var ts = vd_i.GetDictItem(vd_C.TextStyles, vd_C.ActiveTextStyle);
    if (ts) {
      if (!height && ts.Height) vd_V.Height = ts.Height;
      if (ts.HorJustify != undefined) vd_V.HorJustify = ts.HorJustify;
      if (ts.VerJustify != undefined) vd_V.VerJustify = ts.VerJustify;
    }
    if (height) vd_V.Height = height;
    vd_V.InsertionPoint = vd_kV;
    vd_V.Rotation = rotation;
    vd_i.vd_aE(block.Entities, vd_V);
    return vd_V;
  };
  this.GetAttribValue = function (tag, vd_cl) {
    if (!vd_cl || !vd_cl._t || vd_cl._t != vdConst.vdInsert_code) return null;
    if (!vd_cl.Attributes) return null;
    for (var i = 0; i < vd_cl.Attributes.Items.length; i++) {
      var vd_uP = vd_cl.Attributes.Items[i].TagString.toLowerCase();
      if (vd_uP == tag.toLowerCase())
        return vd_cl.Attributes.Items[i].ValueString;
    }
    return null;
  };
  this.SetAttribValue = function (tag, value, vd_cl) {
    if (!vd_cl || !vd_cl._t || vd_cl._t != vdConst.vdInsert_code) return false;
    if (!vd_cl.Attributes) return false;
    for (var i = 0; i < vd_cl.Attributes.Items.length; i++) {
      var attr = vd_cl.Attributes.Items[i];
      var vd_uP = attr.TagString.toLowerCase();
      if (vd_uP == tag.toLowerCase()) {
        attr.ValueString = value;
        attr.TextString = value;
        vd_i.UpdateFig(vd_cl);
        vd_i.UpdateFig(attr);
        vd_i.UpdateLayout(vd_i.GetActiveLayout());
        return true;
      }
    }
    return false;
  };
  this.AddBlockFromFile = function (
    filename,
    vd_fX,
    vd_zA,
    vd_tH,
    vd_km,
    vd_iN
  ) {
    if (!filename || !vd_fX) return null;
    var vd_V = vd_i.FindBlock(vd_fX);
    if (!vd_V) {
      vd_V = vd_i.AddBlock(vd_fX);
      vd_zA = true;
    }
    if (!vd_V) return null;
    if (vd_zA) {
      vd_V.ExternalReferencePath = filename;
      vd_V.ExternalReference = null;
      vd_V.vd_iN = vd_iN;
    }
    if (vd_V.ExternalReferencePath) {
      if (vd_V.ExternalReference && vd_V.ExternalReference.vdDocument) {
        if (vd_tH) {
          var args = new vd_Eu(
            vd_i,
            vd_fX.toLowerCase(),
            vd_V.ExternalReferencePath,
            vd_V
          );
          setTimeout(vd_tH(args), 0);
        }
      } else {
        vd_V.vd_km = vd_km;
        vd_V.vd_nz = vd_tH;
        vd_i.AddBlockSymbol(vd_fX, [0, 0, 0], 1.0, 0.0, false, {});
        setTimeout(vd_BU(), 0);
      }
    }
    return vd_V;
  };
  this.AddBlock = function (vd_fX, vd_Aj) {
    var vd_V = vd_i.FindBlock(vd_fX);
    if (vd_V) return vd_V;
    var vd_C = vd_f();
    vd_V = {};
    vd_V.Name = vd_fX;
    vd_V.HandleId = vd_i.vd_fq();
    vd_V.Entities = { Items: [] };
    if (vd_Aj) vd_V.Origin = vd_Aj;
    vd_V.StretchBlock = 0;
    vd_V._t = vdConst.vdBlock_code;
    vd_i.vd_aE(vd_C.Blocks, vd_V);
    return vd_V;
  };
  function vd_HS(vd_cl, attribute) {
    if (!vd_cl.Attributes) vd_cl.Attributes = { Items: [] };
    var vd_C = vd_f();
    var vd_V = {
      AlignmentPoint: attribute.AlignmentPoint
        ? attribute.AlignmentPoint
        : [0, 0, 0],
      Bold: attribute.Bold ? attribute.Bold : false,
      ExtrusionVector: attribute.ExtrusionVector
        ? attribute.ExtrusionVector
        : [0, 0, 1],
      Flag: attribute.Flag ? attribute.Flag : 0,
      HandleId: vd_i.vd_fq(),
      Height: attribute.Height ? attribute.Height : 1,
      InsertionPoint: attribute.InsertionPoint
        ? attribute.InsertionPoint
        : [0, 0, 0],
      Layer: attribute.Layer ? attribute.Layer : vd_C.Layers[0],
      LineType: attribute.LineType ? attribute.LineType : undefined,
      LineTypeScale: attribute.LineTypeScale ? attribute.LineTypeScale : 1,
      ObliqueAngle: attribute.ObliqueAngle ? attribute.ObliqueAngle : 0,
      PenColor: attribute.PenColor ? attribute.PenColor : { ColorFlag: 192 },
      Rotation: attribute.Rotation ? attribute.Rotation : 0,
      Style: attribute.Style ? attribute.Style : undefined,
      TagString: attribute.TagString ? attribute.TagString : undefined,
      TextLine: attribute.TextLine ? attribute.TextLine : 0,
      TextString: attribute.ValueString ? attribute.ValueString : undefined,
      Thickness: attribute.Thickness ? attribute.Thickness : 0,
      ValueString: attribute.ValueString ? attribute.ValueString : undefined,
      WidthFactor: attribute.WidthFactor ? attribute.WidthFactor : 1,
      InVisibleMode:
        attribute.InVisibleMode === true ? attribute.InVisibleMode : false,
      IsConstant: attribute.IsConstant === true ? attribute.IsConstant : false,
      HorJustify:
        attribute.HorJustify !== undefined ? attribute.HorJustify : undefined,
      VerJustify:
        attribute.VerJustify !== undefined ? attribute.VerJustify : undefined,
      _t: vdConst.vdAttrib_code,
    };
    vd_cl.Attributes["h_" + vd_V.HandleId] = vd_cl.Attributes.Items.length;
    vd_cl.Attributes.Items.push(vd_V);
    if (!vd_V.IsConstant) vd_q.vd_ef(vd_cl.EcsMatrix, vd_V, vd_i);
    vd_i.UpdateFig(vd_V);
    return vd_V;
  }
  this.AddBlockSymbol = function (
    vd_fX,
    vd_kV,
    scale,
    rotation,
    vd_am,
    entities
  ) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var block = vd_i.FindBlock(vd_fX);
    if (block == null) return null;
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdInsert_code;
    vd_V.InsertionPoint = vd_kV;
    vd_V.Xscale = scale;
    vd_V.Yscale = scale;
    vd_V.Rotation = rotation;
    vd_V.Block = "h_" + block.HandleId.toString();
    vd_dR.clear();
    vd_bm(vd_V, vd_dR, vd_C);
    vd_V.BoundingBox = vd_dR.vd_gc.vd_hl();
    for (var i = 0; i < block.Entities.Items.length; i++) {
      var attribute = vd_i.GetEntityItem(block.Entities.Items[i]);
      if (attribute._t == vdConst.vdAttribDef_code) {
        vd_HS(vd_V, attribute);
      }
    }
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    var bbox = vd_V.BoundingBox;
    vd_i.UpdateFig(vd_V);
    vd_V.BoundingBox = bbox;
    return vd_V;
  };
  this.GetEntityECSMatrix = function (vd_V) {
    if (!vd_V.EcsMatrix) {
      vd_dR.clear();
      vd_bm(vd_V, vd_dR, vd_f());
    }
    if (!vd_V.EcsMatrix) return vdgeo.vd_Q();
    return vd_V.EcsMatrix;
  };
  this.GetEntityBBox = function (vd_V) {
    var ents = [];
    if (Array.isArray(vd_V)) ents = vd_V;
    else ents = [vd_V];
    var vd_C = vd_f();
    vd_dR.clear();
    for (var i = 0; i < ents.length; i++) {
      var fig = ents[i];
      if (!fig.BoundingBox) {
        vd_bm(fig, vd_dR, vd_C);
        fig.BoundingBox = vd_dR.vd_gc.vd_hl();
      } else {
        vd_dR.vd_gc.vd_gJ(fig.BoundingBox);
      }
    }
    return vd_dR.vd_gc.vd_hl();
  };
  this.AddImage = function (
    vd_ue,
    vd_ep,
    vd_kV,
    vd_ze,
    rotation,
    vd_am,
    entities
  ) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return null;
    var vd_C = vd_f();
    var vd_v = vd_i.AddImageDefinition(vd_ue);
    if (vd_v == null) return null;
    var vd_V = {};
    vd_i.vd_dM(vd_V, vd_C, entities && !entities.Items);
    vd_V._t = vdConst.vdImage_code;
    vd_V.InsertionPoint = vd_kV;
    vd_V.ImageDefinition = "h_" + vd_v.HandleId.toString();
    vd_V.Display = 5;
    vd_V.Rotation = rotation;
    vd_V.Width = vd_ze;
    vd_V.ImageScale = vd_ze;
    vd_V.Height = (vd_V.Width * vd_v.height) / vd_v.width;
    if (entities) vd_i.vd_aE(entities, vd_V);
    else vd_i.vd_aE(layout.Entities, vd_V);
    if (!vd_v.bytes && vd_ep && vd_bR) {
      var vd_fx = document.createElement("img");
      vd_fx.setAttribute("src", vd_ep);
      vd_fx.onload = function (evt) {
        vdConst.vd_rR(evt.target, vd_v);
        vd_V.Height = (vd_V.Width * vd_v.height) / vd_v.width;
        vd_i.UpdateLayout(layout);
        if (vd_am) {
          vd_bm(vd_V, vd_R, vd_C);
          vd_i.Refresh(false);
        }
      };
    } else {
      vd_i.UpdateLayout(layout);
      if (vd_am) {
        vd_bm(vd_V, vd_R, vd_C);
        vd_i.Refresh(false);
      }
    }
    return vd_V;
  };
  this.AddLayout = function (vd_rV) {
    var vd_C = vd_f();
    if (!vd_C) return -1;
    if (
      vd_rV.toLowerCase() == "model" ||
      vd_rV.toLowerCase() == vd_C.Model.Name.toLowerCase()
    )
      return -1;
    var vd_qY = vd_i.FindLayout(vd_rV);
    if (vd_qY >= 0) return vd_qY;
    if (!vd_C.LayOuts) vd_C.LayOuts = { Items: [] };
    vd_qY = vd_C.LayOuts.Items.length;
    var vd_V = {
      _t: vdConst.vdLayout_code,
      HandleId: vd_i.vd_fq(),
      Name: vd_rV,
      FocalLength: 0.05,
      PerspectiveMod: 0,
      LensAngle: 60,
      ViewCenter: [0, 0, 0],
      RenderMode: 0,
      ViewSize: 1.0,
      World2ViewMatrix: vdgeo.vd_Q(),
      BkColorEx: [0, 0, 0, 0],
      ShowHidenEdges: false,
      Printer: {
        PrintWindow: [0, 0, 0, 210, 297, 0],
        PrintScale: [1, 1],
        HandleId: vd_i.vd_fq(),
        margins: [0, 0, 0, 0],
        Resolution: 96,
        paperSize: [0, 0, 827, 1169],
        LandScape: false,
      },
      Entities: { Items: [] },
    };
    vd_C.LayOuts.Items.push(vd_V);
    vd_C.LayOuts["h_" + vd_V.HandleId.toString()] = vd_qY;
    return vd_qY;
  };
  this.AddViewport = function (insertion, width, height, vd_X, vd_m, vd_am) {
    var vd_C = vd_f();
    if (!vd_C) return null;
    var layout = vd_i.GetActiveLayout();
    if (layout == null || layout == vd_C.Model) return null;
    var vd_V = {};
    var vd_uD = insertion[X];
    var vd_ty = insertion[Y];
    var vd_zw = vd_uD + width;
    var vd_AJ = vd_ty + height;
    if (width < 0) {
      vd_uD = vd_uD + width;
      vd_zw = insertion[X];
    }
    if (height < 0) {
      vd_ty = vd_ty + height;
      vd_AJ = insertion[Y];
    }
    vd_i.vd_dM(vd_V, vd_C);
    vd_V._t = vdConst.vdViewport_code;
    vd_V.InsertionPoint = insertion;
    vd_V.Width = width;
    vd_V.Height = height;
    vd_V.ViewSize = 10.0;
    vd_V.ViewCenter = [0, 0, 0];
    if (vd_X) vd_V.ViewCenter = vd_X;
    if (vd_m) vd_V.ViewSize = vd_m;
    if (vd_C.Model.BoundingBox) {
      if (!vd_X)
        vd_V.ViewCenter = [
          (vd_C.Model.BoundingBox[0] + vd_C.Model.BoundingBox[3]) / 2.0,
          (vd_C.Model.BoundingBox[1] + vd_C.Model.BoundingBox[4]) / 2.0,
          0,
        ];
      if (!vd_m) {
        var vd_MJ = vd_C.Model.BoundingBox[3] - vd_C.Model.BoundingBox[0];
        var vd_Nk = vd_C.Model.BoundingBox[4] - vd_C.Model.BoundingBox[1];
        var l1 = Math.abs(width) / vd_MJ;
        var l2 = Math.abs(height) / vd_Nk;
        var l = Math.min(l1, l2);
        vd_V.ViewSize = Math.abs(height) / l;
      }
    }
    vd_V.BoundingBox = [vd_uD, vd_ty, 0, vd_zw, vd_AJ, 0];
    vd_V.LensAngle = 60;
    vd_V.FocalLength = 0.05;
    vd_V.PerspectiveMod = 0;
    vd_V.ShowHidenEdges = false;
    vd_V.RenderMode = 0;
    vd_V.World2ViewMatrix = vdgeo.vd_Q();
    vd_V.BkColorEx = [0, 0, 0, 0];
    vd_i.vd_aE(layout.Entities, vd_V);
    vd_i.UpdateLayout(layout);
    if (vd_am) {
      vd_bm(vd_V, vd_R, vd_C);
      vd_i.Refresh(false);
    }
    return vd_V;
  };
  this.FindImageDefinition = function (name) {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    name = name.toLowerCase();
    for (var i = 0; i < vd_C.Images.Items.length; i++) {
      var vd_v = vd_i.GetDictItem(vd_C.Images, vd_C.Images.Items[i]);
      var vd_Nl = vd_v.Name.toLowerCase();
      if (vd_Nl == name) return vd_v;
    }
    return null;
  };
  this.AddImageDefinition = function (vd_ue, vd_ep, vd_iu) {
    var doc = vd_f();
    if (doc == null) return null;
    var vd_v = vd_i.FindImageDefinition(vd_ue);
    if (!vd_v) {
      vd_v = {};
      vd_v.HandleId = vd_i.vd_fq();
      vd_v.Name = vd_ue;
      vd_v._t = vdConst.vdImageDef_code;
      vd_v.Transparency = [0, 0, 0, 0];
      vd_v.OriginalWidth = 1;
      vd_v.OriginalHeight = 1;
      vd_v.width = 1;
      vd_v.height = 1;
      vd_i.vd_aE(doc.Images, vd_v);
    }
    if (!vd_v.bytes) {
      if (vd_ep && vd_bR) {
        var vd_fx = document.createElement("img");
        vd_fx.setAttribute("src", vd_ep);
        vd_fx.onload = function (evt) {
          vdConst.vd_rR(evt.target, vd_v);
          if (vd_iu) vd_iu(vd_i, vd_v);
        };
        vd_fx.onerror = function (evt) {
          if (vd_iu) vd_iu(vd_i, vd_v);
        };
      } else {
        if (vd_iu) vd_iu(vd_i, vd_v);
      }
    } else {
      if (vd_iu) vd_iu(vd_i, vd_v);
    }
    return vd_v;
  };
  this.FindView = function (name) {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    if (!vd_C.Views || !vd_C.Views.Items) return null;
    name = name.toLowerCase();
    for (var i = 0; i < vd_C.Views.Items.length; i++) {
      var view = vd_C.Views.Items[i];
      var vd_Hq = view.Name.toLowerCase();
      if (vd_Hq == name) return view;
    }
    return null;
  };
  this.AddView = function (vd_zY) {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return;
    var view = vd_i.FindView(vd_zY);
    if (view) return view;
    view = {};
    view._t = vdConst.vdView_code;
    view.HandleId = vd_i.vd_fq();
    view.Name = vd_zY;
    view.ViewLayout = "h_" + layout.HandleId.toString();
    view.ViewSize = layout.ViewSize;
    view.ViewWorldToViewMatrix = vdgeo.vd_ci(layout.World2ViewMatrix);
    view.ViewPerspectiveMod = layout.PerspectiveMod;
    view.ViewRenderMode = layout.RenderMode;
    view.ViewCenter = vdgeo.newpoint(
      layout.ViewCenter[X],
      layout.ViewCenter[Y],
      layout.ViewCenter[Z]
    );
    view.ViewFocalLength = layout.FocalLength;
    view.ViewLensAngle = layout.LensAngle;
    if (!vd_C.Views) vd_C.Views = {};
    if (!vd_C.Views.Items) vd_C.Views.Items = [];
    vd_C.Views["h_" + view.HandleId.toString()] = vd_C.Views.Items.length;
    vd_C.Views.Items.push(view);
    return view;
  };
  this.SetActiveView = function (vd_nG) {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    var layout = vd_i.GetActiveLayout();
    var view = null;
    if (vd_nG) {
      if (typeof vd_nG === "string") view = vd_i.FindView(vd_nG);
      else if (typeof vd_nG === "object") view = vd_nG;
    }
    if (view) {
      vd_C.ActiveView = "h_" + view.HandleId.toString();
      vd_C.vd_lm = view;
      if (
        vd_C.LayOuts &&
        view.ViewLayout &&
        vd_C.LayOuts[view.ViewLayout] !== undefined
      )
        layout = vd_C.LayOuts.Items[vd_C.LayOuts[view.ViewLayout]];
      else layout = vd_C.Model;
      layout.ViewSize = view.ViewSize;
      layout.World2ViewMatrix = vdgeo.vd_ci(view.ViewWorldToViewMatrix);
      layout.PerspectiveMod = view.ViewPerspectiveMod;
      layout.RenderMode = view.ViewRenderMode;
      layout.ViewCenter = vdgeo.newpoint(
        view.ViewCenter[X],
        view.ViewCenter[Y],
        view.ViewCenter[Z]
      );
      layout.FocalLength = view.ViewFocalLength;
      layout.LensAngle = view.ViewLensAngle;
    } else {
      vd_C.ActiveView = "h_0";
      vd_C.vd_lm = null;
    }
    vd_i.SetActiveLayout(layout);
  };
  this.GetActiveView = function () {
    var vd_C = vd_f();
    if (vd_C == null) return null;
    if (!vd_C.vd_lm) {
      if (
        vd_C.ActiveView &&
        vd_C.Views &&
        vd_C.Views.Items &&
        vd_C.Views[vd_C.ActiveView]
      )
        vd_C.vd_lm = vd_C.Views.Items[vd_C.Views[vd_C.ActiveView]];
    }
    return vd_C.vd_lm;
  };
  this.vd_Dj = function (layer, vd_fw, vd_C) {
    if (!layer) return true;
    if (vd_fw && vd_fw._t == vdConst.vdInsert_code && layer.Name == "0")
      return false;
    var vd_nt = vd_C.vd_yz;
    if (!vd_nt) vd_nt = vd_C.vd_lm;
    if (vd_nt) {
      if (
        vd_nt.FrozenLayers &&
        vd_nt.FrozenLayers["h_" + layer.HandleId.toString()]
      )
        return true;
      if (vd_nt.IgnoreFrozenLayers) return false;
    }
    return layer.Frozen;
  };
  this.AddLayer = function (vd_kD) {
    var doc = vd_f();
    if (doc == null) return null;
    var layer = vd_i.FindLayer(vd_kD);
    if (layer) return layer;
    layer = {};
    layer.HandleId = vd_i.vd_fq();
    layer.LineType = doc.ActiveLineType;
    layer.LineWeight = doc.ActiveLineWeight;
    layer.Name = vd_kD;
    layer.PenColor = vdConst.vd_sO(vd_i.GetActivePenColor());
    var vd_EL = vd_i.FindLineType("BYLAYER");
    var vd_El = vd_i.FindLineType("SOLID");
    if (vd_El && vd_EL && layer.LineType == "h_" + vd_EL.HandleId)
      layer.LineType = "h_" + vd_El.HandleId;
    if (layer.LineWeight == vdConst.LW_BYLAYER)
      layer.LineWeight = vdConst.LW_DOCUMENTDEFAULT;
    if (layer.PenColor.ColorFlag == vdConst.COLOR_BYLAYER)
      layer.PenColor.ColorFlag = 197;
    layer._t = vdConst.vdLayer_code;
    vd_i.vd_aE(doc.Layers, layer);
    return layer;
  };
  function vd_JL(vd_kv) {
    if (vd_Au(vd_kv)) return true;
    if (vd_kv.constructor === Array) {
      for (var i = 0; i < vd_kv.length; i++) if (!vd_Au(vd_kv[i])) return false;
    } else return false;
    return true;
  }
  function vd_Au(vd_M) {
    return (
      typeof vd_M === "string" ||
      typeof vd_M === "number" ||
      typeof vd_M === "boolean"
    );
  }
  this.AddXProperty = function (entity, name, vd_M) {
    if (!entity || !name || vd_M == null || vd_M == undefined) return null;
    if (!entity.HandleId || !entity._t || entity._t < 1 || entity._t > 100)
      return null;
    if (!vd_JL(vd_M)) return null;
    if (!entity.XProperties) entity.XProperties = { Items: [] };
    var vd_kv = { Name: name, PropValue: vd_M };
    entity.XProperties.Items.push(vd_kv);
    return vd_kv;
  };
  this.GetXProperty = function (entity, name) {
    if (!entity || !name) return null;
    if (!entity.XProperties || entity.XProperties.Items.length == 0)
      return null;
    for (var i = 0; i < entity.XProperties.Items.length; i++)
      if (entity.XProperties.Items[i].Name === name)
        return entity.XProperties.Items[i];
    return null;
  };
  this.GetEntitiesFromLayer = function (vd_kD) {
    var ret = [];
    var layer = vd_i.FindLayer(vd_kD);
    if (!layer) return ret;
    vd_kD = vd_kD.toLowerCase();
    var vd_Ql = vd_i.FindLayer("0");
    var vd_sD;
    var vd_zo = vd_i.GetDocument().LayOuts;
    var lNum = 0;
    if (vd_zo) lNum = vd_zo.Items.length;
    var entities;
    for (var d = 0; d <= lNum; d++) {
      var layout;
      if (d == lNum) layout = vd_i.GetDocument().Model;
      else layout = vd_zo.Items[d];
      entities = layout.Entities;
      if (!entities) continue;
      for (var i = 0; i < entities.Items.length; i++) {
        vd_ug = vd_i.GetEntityItem(entities.Items[i]);
        if (!vd_ug) continue;
        if (!vd_ug.Layer) vd_sD = vd_Ql;
        else vd_sD = vd_i.GetDocument()[vd_ug.Layer];
        if (!vd_sD) continue;
        if (vd_sD.Name.toLowerCase() == vd_kD) ret.push(vd_ug);
      }
    }
    return ret;
  };
  this.GetEntityFromPoint = function (x, y) {
    return vd_R.GetEntityFromPoint(x, y, vd_i.PickSize, vd_i.IgnoreLockLayers);
  };
  this.GetEntitiesFromBox = function (xmin, ymin, xmax, ymax) {
    return vd_R.GetEntitiesFromBox(
      vdgeo.vd_r(xmin),
      vdgeo.vd_r(ymin),
      vdgeo.vd_r(xmax),
      vdgeo.vd_r(ymax),
      vd_i.IgnoreLockLayers
    );
  };
  this.GetEntitiesInWindowBox = function (xmin, ymin, xmax, ymax) {
    return vd_R.GetEntitiesInWindowBox(
      vdgeo.vd_r(xmin),
      vdgeo.vd_r(ymin),
      vdgeo.vd_r(xmax),
      vdgeo.vd_r(ymax),
      vd_i.IgnoreLockLayers
    );
  };
  this.GetEntitiesFence = function (vd_jZ, vd_Qp) {
    var vd_tL = vd_jZ;
    if (vd_Qp) {
      vd_tL = [];
      for (var i = 0; i < vd_jZ.length; i++) {
        vd_tL.push(vd_i.WorldToPixel(vd_jZ[i]));
      }
    }
    return vd_R.GetEntitiesFence(vd_tL, vd_i.IgnoreLockLayers);
  };
  this.PixelToWorld = function (ptX, ptY) {
    var vd_MQ = vdgeo.vd_bu(vd_R.vd_fp());
    return vdgeo.vd_bp(ptX, ptY, 1, vd_MQ);
  };
  this.WorldToPixel = function (vd_GQ) {
    return vdgeo.vd_cZ(vd_GQ, vd_R.vd_fp());
  };
  this.WorldToView = function (pt) {
    return vdgeo.matrixtransform(vd_R.vd_ar(), pt);
  };
  this.ViewToWorld = function (pt) {
    var vd_Aa = vdgeo.vd_bu(vd_R.vd_ar());
    return vdgeo.matrixtransform(vd_Aa, pt);
  };
  this.ViewToPixel = function (pt) {
    return vdgeo.vd_cZ(pt, vd_R.vd_cC);
  };
  this.PixelToView = function (pt) {
    return vdgeo.vd_cZ(pt, vd_R.vd_ca);
  };
  this.PointAt_GPS = function (lat, lon) {
    var doc = vd_i.GetDocument();
    if (!doc || !doc.FileProperties || !doc.FileProperties.Gps_Map) return null;
    var ne = vd_fC.vd_OR(lat, lon);
    return vdgeo.vd_bp(
      ne[0],
      ne[1],
      0,
      doc.FileProperties.Gps_Map.NorthEastToWorld
    );
  };
  this.GPS_AtPoint = function (pt) {
    var doc = vd_i.GetDocument();
    if (!doc || !doc.FileProperties || !doc.FileProperties.Gps_Map) return null;
    var w2ne = vdgeo.vd_bu(doc.FileProperties.Gps_Map.NorthEastToWorld);
    var npt = vdgeo.vd_cZ(pt, w2ne);
    return vd_fC.vd_LH(npt[Y], npt[X]);
  };
  this.Refresh = function (blc) {
    var img = null;
    if (blc != false) {
      var vd_C = vd_f();
      if (vd_C != null) img = vd_C.Palette._lc;
    }
    vd_R.vd_c.vd_DC(img);
    vd_R.vd_c.Refresh();
    vd_AP();
  };
  function vd_LZ() {
    var vd_aK = vd_i.canvas.width;
    var vd_as = vd_i.canvas.height;
    if (vd_fd == null) {
      vd_fd = document.createElement("CANVAS");
      vd_fd.setAttribute("width", vd_aK);
      vd_fd.setAttribute("height", vd_as);
      vd_jm = vd_fd.getContext("2d");
    }
    Action.hide();
    vd_jm.putImageData(vd_R.vd_c.vd_nW(), 0, 0, 0, 0, vd_aK, vd_as);
  }
  function vd_Mp(vd_io) {
    if (!ctx) return;
    var vd_aK = vd_i.canvas.width;
    var vd_as = vd_i.canvas.height;
    ctx.fillStyle = vdgdi.vd_gD(vd_R.vd_gQ(-1));
    ctx.fillRect(0, 0, vd_aK, vd_as);
    var vd_id = vdgeo.matrixtransform(vd_io, vdgeo.newpoint(0, 0, 0));
    var vd_lq = vdgeo.matrixtransform(vd_io, vdgeo.newpoint(vd_aK, vd_as, 0));
    ctx.drawImage(
      vd_fd,
      0,
      0,
      vd_aK,
      vd_as,
      vdgeo.vd_r(vd_id[X]),
      vdgeo.vd_r(vd_id[Y]),
      vdgeo.vd_r(vd_lq[X] - vd_id[X]),
      vdgeo.vd_r(vd_lq[Y] - vd_id[Y])
    );
    vd_R.vd_c.vd_Ei();
    Action.show();
    Action.draw();
  }
  this.viewcube = new (function () {
    var vd_i = this;
    var vd_wg = 1;
    var vd_zV = 0;
    var vd_yZ = 196;
    var vd_nM = 1;
    var render = null;
    var vd_cu = null;
    var vd_cH = null;
    var vd_dd = null;
    var w2v = null;
    var vd_GH = [80, 120, 160];
    Object.defineProperty(vd_i, "size", {
      get: function () {
        return vd_wg;
      },
      set: function (newValue) {
        vd_wg = newValue;
      },
    });
    Object.defineProperty(vd_i, "location", {
      get: function () {
        return vd_nM;
      },
      set: function (newValue) {
        vd_nM = newValue;
      },
    });
    Object.defineProperty(vd_i, "opacity", {
      get: function () {
        return vd_yZ;
      },
      set: function (newValue) {
        vd_yZ = Math.min(255, Math.max(0, newValue));
      },
    });
    Object.defineProperty(vd_i, "display", {
      get: function () {
        return vd_zV;
      },
      set: function (newValue) {
        vd_zV = newValue;
      },
    });
    function vd_Cq() {
      return vd_GH[Math.min(Math.max(0, vd_wg), vd_GH.length - 1)];
    }
    function vd_wO(vd_eH) {
      vd_Il();
      var vd_lz = vd_Cq();
      return (
        vd_zV && vd_dd != null && vd_lz < vd_eH.width && vd_lz < vd_eH.height
      );
    }
    function vd_Il() {
      var vd_lz = vd_Cq();
      if (!render || (vd_lz != render.width && vd_lz != render.height)) {
        render = new vd_oA(null, 0, 0, vd_lz, vd_lz, null);
        vd_cu = document.createElement("CANVAS");
        vd_cu.setAttribute("width", render.width);
        vd_cu.setAttribute("height", render.height);
        vd_cH = vd_cu.getContext("2d");
        vd_dd = vd_cH.createImageData(render.width, render.height);
      }
    }
    this.clear = function () {
      render = null;
      vd_cu = null;
      vd_cH = null;
      vd_dd = null;
      w2v = null;
    };
    function vd_Ms(vd_eH) {
      if (w2v == null) return false;
      var rm = vd_eH.vd_ar();
      if (
        !vdgeo.AreEqual(
          vdgeo.vd_iE([
            rm[A00] - w2v[A00],
            rm[A10] - w2v[A10],
            rm[A20] - w2v[A20],
          ]),
          0.0,
          vdgeo.DefaultVectorEquality
        )
      )
        return false;
      if (
        !vdgeo.AreEqual(
          vdgeo.vd_iE([
            rm[A01] - w2v[A01],
            rm[A11] - w2v[A11],
            rm[A21] - w2v[A21],
          ]),
          0.0,
          vdgeo.DefaultVectorEquality
        )
      )
        return false;
      if (
        !vdgeo.AreEqual(
          vdgeo.vd_iE([
            rm[A02] - w2v[A02],
            rm[A12] - w2v[A12],
            rm[A22] - w2v[A22],
          ]),
          0.0,
          vdgeo.DefaultVectorEquality
        )
      )
        return false;
      return true;
    }
    this.draw = function (vd_eH) {
      if (!vd_wO(vd_eH)) return null;
      if (!vd_Ms(vd_eH)) {
        var i = 0;
        var vd_v = vdConst.vd_CO.vd_He();
        if (!vd_v.bytes) return null;
        render.vd_c.vd_gs(vd_dd, render.width, render.height, true);
        for (i = 0; i < vd_dd.data.length; i++) vd_dd.data[i] = 0;
        render.vd_sa(vd_eH);
        render.vd_c.vd_jr = vdConst.InterpolationMode_Bilinear;
        render.vd_be = false;
        render.vd_fj = true;
        render.vd_cT = true;
        w2v = vdgeo.vd_Q();
        vdgeo.vd_ne(w2v, vd_eH.vd_ar());
        w2v[A03] = 0;
        w2v[A13] = 0;
        w2v[A23] = 0;
        var vd_Ln = [-2.5, -2.5, -1.2];
        var vd_Lj = [2.5, 2.5, 1];
        var vs = 5.2;
        var vc = [0, 0, 0];
        render.update(
          vs,
          vc,
          w2v,
          vd_Ln.concat(vd_Lj),
          0,
          0,
          false,
          vdConst.RENDERMODE_RENDER
        );
        render.vd_iv(vd_eH.palette);
        render.vd_fJ(
          [
            [-1, -1, -1],
            [1, -1, -1],
            [1, 1, -1],
            [-1, 1, -1],
          ],
          [0, 0, 1],
          [
            [0.195, 0.66, 0],
            [0.395, 0.66, 0],
            [0.395, 1.005, 0],
            [0.195, 1.005, 0],
          ],
          vd_v,
          true
        );
        render.vd_fJ(
          [
            [-1, -1, 1],
            [1, -1, 1],
            [1, 1, 1],
            [-1, 1, 1],
          ],
          [0, 0, 1],
          [
            [0.005, 0.667, 0],
            [0.205, 0.667, 0],
            [0.205, 1.0, 0],
            [0.005, 1.0, 0],
          ],
          vd_v,
          true
        );
        render.vd_fJ(
          [
            [-1, 1, -1],
            [-1, -1, -1],
            [-1, -1, 1],
            [-1, 1, 1],
          ],
          [1, 0, 0],
          [
            [0.005, 0.333, 0],
            [0.205, 0.333, 0],
            [0.205, 0.667, 0],
            [0.005, 0.667, 0],
          ],
          vd_v,
          true
        );
        render.vd_fJ(
          [
            [1, -1, -1],
            [1, 1, -1],
            [1, 1, 1],
            [1, -1, 1],
          ],
          [1, 0, 0],
          [
            [0.2, 0.333, 0],
            [0.4, 0.333, 0],
            [0.4, 0.667, 0],
            [0.2, 0.667, 0],
          ],
          vd_v,
          true
        );
        render.vd_fJ(
          [
            [-1, -1, -1],
            [1, -1, -1],
            [1, -1, 1],
            [-1, -1, 1],
          ],
          [0, 1, 0],
          [
            [0.005, 0.0, 0],
            [0.205, 0.0, 0],
            [0.205, 0.333, 0],
            [0.005, 0.333, 0],
          ],
          vd_v,
          true
        );
        render.vd_fJ(
          [
            [1, 1, -1],
            [-1, 1, -1],
            [-1, 1, 1],
            [1, 1, 1],
          ],
          [0, 1, 0],
          [
            [0.2, 0.0, 0],
            [0.4, 0.0, 0],
            [0.4, 0.333, 0],
            [0.2, 0.333, 0],
          ],
          vd_v,
          true
        );
        render.vd_c.vd_jr = vdConst.InterpolationMode_Nearest;
        render.vd_fJ(
          [
            [-2.5, -2.5, -1.2],
            [2.5, -2.5, -1.2],
            [2.5, 2.5, -1.2],
            [-2.5, 2.5, -1.2],
          ],
          [0, 0, 1],
          [
            [0.405, 0.0, 0],
            [1.0, 0.0, 0],
            [1.0, 1.0, 0],
            [0.405, 1.0, 0],
          ],
          vd_v,
          true
        );
        for (i = 3; i < vd_dd.data.length; i += 4) {
          if (vd_dd.data[i] != 0) vd_dd.data[i] = vd_yZ;
        }
        render.vd_c.vd_gs(null);
        vd_cH.putImageData(vd_dd, 0, 0);
      }
      var lpos = [0, 0];
      if (vd_nM == 1) lpos = [vd_eH.width - render.width, 0];
      else if (vd_nM == 2) lpos = [0, vd_eH.height - render.height];
      else if (vd_nM == 3)
        lpos = [vd_eH.width - render.width, vd_eH.height - render.height];
      return [vd_cu, lpos];
    };
  })();
  this.printToImageData = function (
    vd_ro,
    vd_Pp,
    vd_ul,
    vd_ny,
    vd_bT,
    vd_xs,
    res
  ) {
    var layout = vd_i.GetActiveLayout();
    if (layout == null) return;
    var vd_C = vd_f();
    var vd_ls = layout.Printer;
    var resolution = vd_ls.Resolution;
    var margins = vd_ls.margins;
    var vd_oD = vd_ls.PrintScale;
    var vd_dI = vd_ls.PrintWindow;
    var vd_Ev = vd_ls.LandScape;
    if (res) {
      resolution = res;
    }
    var vd_gG = vdgeo.vd_r((resolution * vd_ls.paperSize[2]) / 100);
    var vd_hP = vdgeo.vd_r((resolution * vd_ls.paperSize[3]) / 100);
    if (vd_ul != undefined) {
      vd_Ev = false;
      vd_gG = vdgeo.vd_r((resolution * vd_ul[0]) / 100);
      vd_hP = vdgeo.vd_r((resolution * vd_ul[1]) / 100);
    }
    if (vd_ny != undefined) {
      margins = [vd_ny, vd_ny, vd_ny, vd_ny];
    }
    if (vd_Ev) {
      var tmp = vd_gG;
      vd_gG = vd_hP;
      vd_hP = tmp;
    }
    if (vd_ro == vdConst.PRINT_WINDOW_FLAG_EXTENTS) {
      var vd_hc = vd_i.GetExtents();
      if (vd_hc != null) {
        var box = vdgeo.vd_rH(layout.World2ViewMatrix, vd_hc);
        vd_dI = box;
        if (
          vdgeo.AreEqual(box[3] - box[0], 0.0, vdgeo.DefaultLinearEquality) ||
          vdgeo.AreEqual(box[4] - box[1], 0.0, vdgeo.DefaultLinearEquality)
        )
          vd_ro = vdConst.PRINT_WINDOW_FLAG_VIEW;
      }
    }
    if (vd_ro == vdConst.PRINT_WINDOW_FLAG_VIEW) {
      vd_dI = [
        vd_R.vd_aa.left,
        vd_R.vd_aa.bottom,
        0,
        vd_R.vd_aa.right,
        vd_R.vd_aa.top,
        0,
      ];
    }
    if (vd_Pp == vdConst.PRINT_SCALE_FLAG_FIT) {
      var vd_uM = (25.4 * vd_gG) / resolution;
      var vd_tP = (25.4 * vd_hP) / resolution;
      vd_uM -= (25.4 * margins[0]) / 100;
      vd_uM -= (25.4 * margins[2]) / 100;
      vd_tP -= (25.4 * margins[1]) / 100;
      vd_tP -= (25.4 * margins[3]) / 100;
      var w = vd_dI[3] - vd_dI[0];
      var h = vd_dI[4] - vd_dI[1];
      if (
        vdgeo.AreEqual(w, 0.0, vdgeo.DefaultScaleEquality) ||
        vdgeo.AreEqual(h, 0.0, vdgeo.DefaultScaleEquality)
      ) {
        vd_oD = [1, 1];
      } else {
        if (vd_uM / w < vd_tP / h) {
          vd_oD = [1, w / vd_uM];
        } else {
          vd_oD = [1, h / vd_tP];
        }
      }
    }
    var vd_KX = vd_oD[0] / vd_oD[1];
    var vd_wu = (resolution * vd_KX) / 25.4;
    var vd_Cg = 1.0 / vd_wu;
    var vd_gb = vdgeo.vd_r(vd_wu * (vd_dI[3] - vd_dI[0]));
    var vd_hW = vdgeo.vd_r(vd_wu * (vd_dI[4] - vd_dI[1]));
    var vd_vV = vdgeo.vd_r((resolution * margins[0]) / 100);
    var vd_we = vdgeo.vd_r((resolution * margins[1]) / 100);
    var vd_AH = vdgeo.vd_r((resolution * margins[2]) / 100);
    var vd_FC = vdgeo.vd_r((resolution * margins[3]) / 100);
    if (vd_vV + vd_gb > vd_gG - vd_AH) vd_gb = vd_gG - vd_AH - vd_vV;
    if (vd_we + vd_hW > vd_hP - vd_FC) vd_hW = vd_hW - vd_FC - vd_we;
    var nw = vd_gb * vd_Cg;
    var nh = vd_hW * vd_Cg;
    var vc = vdgeo.newpoint(vd_dI[0] + nw * 0.5, vd_dI[1] + nh * 0.5, 0);
    var vs = nh;
    var vd_jn, vd_pZ, vd_kL, vd_pA, vd_qE;
    var vd_rd = Math.abs(vd_dI[3] - vd_dI[0]);
    var vd_qq = Math.abs(vd_dI[4] - vd_dI[1]);
    var vd_kj = 0;
    var vd_hZ = vd_gb / vd_hW;
    if (!layout.FocalLength) layout.FocalLength = 0.05;
    if (!layout.LensAngle) layout.LensAngle = 60.0;
    if (vd_rd / vd_qq < vd_hZ) {
      vd_jn = vdgeo.DegreesToRadians(layout.LensAngle) / 2;
      vd_pZ = vd_qq / 2;
      vd_kj = vd_pZ / Math.tan(vd_jn);
    } else {
      vd_kL =
        2.0 *
        layout.FocalLength *
        Math.tan(vdgeo.DegreesToRadians(layout.LensAngle / 2.0));
      vd_pA =
        vdgeo.RadiansToDegrees(
          Math.atan((vd_kL * vd_hZ * 0.5) / layout.FocalLength)
        ) * 2.0;
      vd_jn = vdgeo.DegreesToRadians(vd_pA) / 2;
      vd_qE = vd_rd / 2;
      vd_kj = vd_qE / Math.tan(vd_jn);
    }
    vc[Z] = Math.max(vd_dI[5], vd_dI[2]) + vd_kj;
    if (vd_ro == vdConst.PRINT_WINDOW_FLAG_VIEW) vc = layout.ViewCenter;
    vd_gG = vdgeo.vd_xr(vd_gG);
    vd_gb = vdgeo.vd_xr(vd_gb);
    var vd_cu = null;
    var vd_cH = null;
    var vd_dp = null;
    var vd_dd = null;
    try {
      vd_cu = document.createElement("CANVAS");
      vd_cu.setAttribute("width", vd_gG);
      vd_cu.setAttribute("height", vd_hP);
      vd_cH = vd_cu.getContext("2d");
      vd_dp = new vd_oA(vd_i, 0, 0, vd_gb, vd_hW, null);
      vd_dp.vd_sa(vd_R);
      vd_dp.vd_be = false;
      vd_dd = vd_cH.createImageData(vd_gb, vd_hW);
    } catch (ex) {
      vd_cu = null;
      vd_cH = null;
      vd_dp = null;
      vd_dd = null;
    }
    if (vd_dd == null) return null;
    vd_dp.vd_c.vd_gs(vd_dd, vd_gb, vd_hW, true);
    if (vd_bT == undefined) vd_bT = [255, 255, 255, 255];
    vd_dp.update(
      vs,
      vc,
      layout.World2ViewMatrix,
      vd_nL(layout),
      layout.FocalLength,
      layout.LensAngle,
      layout.PerspectiveMod == 1,
      layout.RenderMode,
      layout.Sections,
      vd_C.Lights
    );
    vd_dp.vd_iv(vd_C.Palette, vd_bT);
    vd_dp.clear(true);
    var vd_oj = vd_dp.vd_lg(layout.ShowHidenEdges);
    vd_tU(layout.Entities, true, vd_dp, vd_C);
    vd_dp.vd_lg(vd_oj);
    if (vd_i.AfterDrawInView) {
      vd_ye.vd_yb(vd_i.AfterDrawInView, vd_dp.vd_c.vd_nW(), vd_i, vd_dp, 2);
    }
    vd_dp.vd_c.vd_DC(vd_C.Palette._lc);
    vd_cH.globalAlpha = vd_bT[3] / 255.0;
    vd_cH.fillStyle = vdgdi.vd_gD(vd_bT);
    vd_cH.fillRect(0, 0, vd_gG, vd_hP);
    vd_cH.putImageData(vd_dd, vd_vV, vd_we);
    if (vd_xs != undefined && vd_xs > 0) {
      vd_cH.strokeStyle = vdgdi.vd_gD(vd_dp.vd_iA());
      vd_cH.lineWidth = vd_xs;
      vd_cH.strokeRect(0, 0, vd_gG, vd_hP);
    }
    if (vd_i.AfterDrawInView) {
      vd_dd = vd_cH.getImageData(0, 0, vd_gG, vd_hP);
      vd_ye.vd_yb(vd_i.AfterDrawInView, vd_dd, vd_i, vd_dp, 4);
      vd_cH.putImageData(vd_dd, 0, 0);
    }
    vd_dp.vd_c.vd_gs(null);
    var ret = vd_cu.toDataURL();
    vd_cu = null;
    vd_cH = null;
    vd_dp = null;
    vd_dd = null;
    vd_i.vd_aC.vd_AC(vd_R);
    return ret;
  };
  this.ActiveAction = function () {
    return Action;
  };
  this.SetActionOrthoMode = function (mode) {
    return Action.vd_zp(mode);
  };
  this.SetActionOsnapColor = function (color) {
    var ret = Action.vd_wX;
    if (color[3] === undefined) color[3] = 255;
    Action.vd_wX = color;
    return ret;
  };
  this.SetActionOsnapSize = function (size) {
    var ret = Action.vd_wl;
    Action.vd_wl = size;
    return ret;
  };
  this.SetActionLineColor = function (color) {
    var ret = Action.vd_ut;
    Action.vd_ut = color;
    return ret;
  };
  this.SetActionLineWidth = function (lw) {
    var ret = Action.vd_if;
    Action.vd_if = lw;
    return ret;
  };
  this.SetActionFillColor = function (vd_yf) {
    var ret = Action.vd_oa;
    Action.vd_oa = vd_yf;
    return ret;
  };
  this.SetActionCrossFillColor = function (vd_yf) {
    var ret = Action.vd_qK;
    Action.vd_qK = vd_yf;
    return ret;
  };
  this.GetUserPoint = function (vd_px) {
    Action.cancel();
    Action.vd_oW = vd_px;
    Action.actionType = vdConst.ACTION_POINT_WORLD;
    Action.start();
  };
  this.GetUserLine = function (vd_px, vd_lI) {
    Action.cancel();
    Action.vd_oW = vd_px;
    Action.actionType = vdConst.ACTION_LINE_WORLD;
    Action.vd_zu(vd_lI);
    Action.start(Action.actionCount);
  };
  this.GetUserRect = function (vd_px, vd_lI) {
    Action.cancel();
    Action.vd_oW = vd_px;
    Action.actionType = vdConst.ACTION_RECT_VIEW;
    Action.vd_zu(vd_lI);
    Action.start(Action.actionCount);
  };
  this.CmdMove = function (entities, from, to, vd_cp) {
    vd_lA(
      this,
      { vd_ch: 1, entities: entities, vd_aJ: from, vd_aX: to },
      vd_cp
    );
  };
  this.CmdScale = function (entities, from, scale, vd_cp) {
    vd_lA(
      this,
      { vd_ch: 2, entities: entities, vd_aJ: from, vd_aX: scale },
      vd_cp
    );
  };
  this.CmdRotate = function (entities, from, rotation, vd_cp) {
    vd_lA(
      this,
      { vd_ch: 3, entities: entities, vd_aJ: from, vd_aX: rotation },
      vd_cp
    );
  };
  this.CmdRotate3D = function (entities, from, rotation, axis, vd_cp) {
    vd_lA(
      this,
      {
        vd_ch: 3,
        entities: entities,
        vd_aJ: from,
        vd_aX: rotation,
        axis: axis,
      },
      vd_cp
    );
  };
  this.CmdCopy = function (entities, from, to, vd_cp) {
    vd_lA(
      this,
      { vd_ch: 4, entities: entities, vd_aJ: from, vd_aX: to },
      vd_cp
    );
  };
  this.CmdMirror = function (entities, from, vd_Nt, vd_cp) {
    vd_lA(
      this,
      { vd_ch: 5, entities: entities, vd_aJ: from, vd_aX: vd_Nt },
      vd_cp
    );
  };
  this.CmdSelect = function (vd_cp, entities) {
    vd_lA(this, { vd_ch: 0, entities: entities }, vd_cp);
  };
  this.vd_mv = function (action, status) {
    if (action.vd_oW != null) action.vd_oW(action, status);
    if (status === "draw" && vd_i.vdActionDraw != null)
      vd_i.vdActionDraw(action);
  };
  function vd_hX(layout, vd_td) {
    Action.hide();
    if (layout) {
      var vd_C = vd_f();
      var vd_hc = vd_nL(layout);
      if (layout.GridMode) {
        var vd_jX = new vd_hd();
        vd_jX.vd_gJ(vd_hc);
        vd_jX.vd_gJ(layout.Limits);
        vd_hc = vd_jX.vd_hl();
      }
      vd_R.update(
        layout.ViewSize,
        layout.ViewCenter,
        layout.World2ViewMatrix,
        vd_hc,
        layout.FocalLength,
        layout.LensAngle,
        layout.PerspectiveMod === 1,
        vd_td === true ? -1 : layout.RenderMode,
        layout.Sections,
        vd_C.Lights
      );
    } else
      vd_R.update(
        10,
        vdgeo.newpoint(0, 0, 0),
        vdgeo.vd_Q(),
        null,
        0.05,
        30,
        false,
        vd_td === true ? -1 : undefined
      );
  }
  this.vd_iw = function () {
    return ctx;
  };
  this.ActiveRender = function () {
    return vd_R;
  };
  this.SaveDocument = function (vd_nj) {
    vd_dm.vd_pu(vd_i, vd_nj);
  };
  this.SelectDocument = function (vd_bN, vd_ku, vd_xl) {
    if (!vd_bR) return;
    vd_bR.vd_vc = vd_xl;
    vd_i.vd_tu(vd_bR, vd_bN, vd_ku, vd_ya);
  };
  this.New = function () {
    vd_i.SelectDocument(vdConst.vd_la + "res/vddocument.vds");
  };
  function vd_BB(vd_jp) {
    var vd_mM = vd_f();
    if (!vd_mM) return;
    var vd_C = vd_jp.vdDocument;
    if (!vd_C) return;
    var vd_vl = null;
    if (vd_jp.customdata.mergeFlags & vdConst.MERGEFLAGS_KEEP_BOTH)
      vd_vl = new vd_Bq(vd_C, vd_mM, vd_jp.customdata.mergeFlags);
    var vd_AY = vd_mM.Model.Entities.Items;
    var vd_Ds = vd_C.Model.Entities.Items;
    for (var i = 0; i < vd_Ds.length; i++) {
      var hid = vd_Ds[i];
      if (vd_vl) {
        hid = vd_vl.vd_sd(hid);
        if (hid) vd_AY.push(hid);
        continue;
      }
      var entity = vd_C[hid];
      if (!entity) continue;
      if (!vd_mM[hid]) {
        vd_mM[hid] = entity;
        vd_AY.push(hid);
      } else {
        if (
          vd_jp.customdata.mergeFlags & vdConst.MERGEFLAGS_REPLACE_EXISITING
        ) {
          vd_mM[hid] = entity;
        }
      }
    }
    vd_i.UpdateLayout(null, true);
    if (vd_jp.customdata.vd_sQ)
      vd_jp.customdata.vd_sQ({
        vdcanvas: vd_i,
        mergedoc: vd_C,
        mergeFlags: vd_jp.customdata.mergeFlags,
      });
    if (vd_aT != null) clearTimeout(vd_aT);
    vd_aT = setTimeout(vd_i.redraw, 0);
  }
  this.MergeDocument = function (filename, vd_sQ, mergeFlags, vd_kR) {
    var documentdata = new vd_wT(vd_i);
    documentdata.customdata = { mergeFlags: mergeFlags, vd_sQ: vd_sQ };
    if (!vd_kR) vd_i.vd_tu(documentdata, filename, false, vd_BB);
    else documentdata.LoadDocument(filename, false, vd_BB, vd_kR);
  };
  this.SelectDocumentBlob = function (vd_kR, vd_bN, vd_xl) {
    if (!vd_bR) return;
    vd_bR.vd_vc = vd_xl;
    vd_bR.LoadDocument(vd_bN, false, vd_ya, vd_kR);
  };
  function vd_Kw() {
    if (typeof XMLHttpRequest != "undefined") {
      return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
      return null;
    }
  }
  this.vd_tu = function (vd_sH, vd_bN, vd_ku, vd_iC) {
    if (!vd_sH) return;
    var _url = vd_bN;
    if (vd_ku) _url += "?timestamp=" + new Date().getTime();
    var vd_cb = vd_Kw();
    if (!vd_cb) return;
    if (!vd_iC) vd_iC = vd_i.redraw;
    vd_i.vd_eP.start(vd_i.MessagesDictionary.PROGRESS_DOWNLOAD, true);
    try {
      var done = false;
      vd_cb.onprogress = function (evt) {
        if (evt.lengthComputable) vd_i.vd_eP.Progress(evt.loaded, evt.total);
        else vd_i.vd_eP.Progress(evt.loaded / 100, 1);
      };
      vd_cb.onreadystatechange = function () {
        if (vd_cb.readyState == 4 && !done) {
          done = true;
          vd_i.vd_eP.end();
          if (vd_cb.status == 200 || vd_cb.status == 0) {
            vd_sH.LoadDocument(_url, false, vd_iC, vd_cb.responseText);
          } else {
            vd_sH.vd_sY(vd_cb.status);
            vd_i.vd_cI(vdConst.Err_LoadFile, vd_cb.status, _url);
          }
        }
      };
      vd_cb.open("GET", _url, true);
      vd_cb.send();
    } catch (ex) {
      done = true;
      vd_sH.LoadDocument(_url, false, vd_iC);
    }
  };
  function vd_qJ() {
    if (!vd_un) return vd_bR;
    return vd_un;
  }
  function vd_f() {
    if (vd_bR == null) return null;
    return vd_bR.vdDocument;
  }
  function vd_ya(vd_jp) {
    vd_fl = 0;
    vd_R.vd_pJ();
    Action.cancel();
    var vd_C = vd_f();
    vd_i.scriptCommand = new vd_AS(vd_i);
    if (vd_C != null) {
      var layout = vd_i.GetActiveLayout();
      vd_R.vd_iv(vd_C.Palette, layout.BkColorEx);
      if (vd_C.LineTypeScale == undefined) vd_C.LineTypeScale = 1.0;
      if (vd_i.vdAfterOpenDocument != null) vd_i.vdAfterOpenDocument(vd_i);
      vd_i.SetActiveLayout(layout);
    }
  }
  this.SetSize = function (width, height, vd_bT) {
    if (vd_i.canvas == null) return;
    if (width) {
      width = vdgeo.vd_xr(width);
      vd_i.canvas.setAttribute("width", width);
      if (vd_i.canvas.style) vd_i.canvas.style.width = width.toString() + "px";
    }
    if (height) {
      height = vdgeo.vd_r(height);
      vd_i.canvas.setAttribute("height", height);
      if (vd_i.canvas.style)
        vd_i.canvas.style.height = height.toString() + "px";
    }
    width = vd_i.canvas.clientWidth
      ? vd_i.canvas.clientWidth
      : vd_i.canvas.width;
    height = vd_i.canvas.clientHeight
      ? vd_i.canvas.clientHeight
      : vd_i.canvas.height;
    if (vd_R != null && width == vd_R.width && height == vd_R.height) return;
    if (vd_R != null) {
      vd_R.vd_c.vd_gs(null);
      vd_R.destroy();
    }
    vd_i.canvas.setAttribute("width", width);
    vd_i.canvas.setAttribute("height", height);
    vd_fd = null;
    vd_jm = null;
    ctx = vd_i.canvas.getContext("2d");
    var vd_Bw = vd_R;
    vd_R = new vd_oA(vd_i, 0, 0, width, height, ctx);
    vd_dR.vd_NZ(vd_R);
    vd_R.vd_sa(vd_Bw);
    vd_Bw = null;
    vd_R.vd_c.vd_gs(ctx.getImageData(0, 0, width, height), width, height);
    vd_R.vd_iv(null, vd_bT);
    Action.resize();
    setTimeout(vd_i.redraw);
  };
  function vd_fA(elem, vd_pW, vd_pG, vd_aA) {
    if (elem.addEventListener) elem.addEventListener(vd_pW, vd_pG, vd_aA);
    else if (elem.attachEvent) elem.attachEvent("on" + vd_pW, vd_pG);
  }
  function vd_ei(elem, vd_pW, vd_pG, vd_aA) {
    if (elem.removeEventListener) elem.removeEventListener(vd_pW, vd_pG, vd_aA);
    else if (elem.detachEvent) elem.detachEvent("on" + vd_pW, vd_pG);
  }
  function vd_HI() {
    vd_fA(vd_i.canvas, "mousemove", vd_Eq, vd_aA);
    vd_fA(vd_i.canvas, "mouseout", vd_Es, vd_aA);
    vd_fA(vd_i.canvas, "mouseover", vd_DO, vd_aA);
    vd_fA(vd_i.canvas, "mousedown", vd_FT, vd_aA);
    vd_fA(vd_i.canvas, "mouseup", vd_De, vd_aA);
    vd_fA(vd_i.canvas, vd_EX, vd_DT, vd_aA);
    vd_fA(vd_i.canvas, "click", vd_wI, vd_aA);
    vd_fA(vd_i.canvas, "contextmenu", vd_EQ, vd_aA);
    vd_vK = true;
  }
  function vd_Eg() {
    if (!vd_vK) return;
    vd_ei(vd_i.canvas, "mousemove", vd_Eq, vd_aA);
    vd_ei(vd_i.canvas, "mouseout", vd_Es, vd_aA);
    vd_ei(vd_i.canvas, "mouseover", vd_DO, vd_aA);
    vd_ei(vd_i.canvas, "mousedown", vd_FT, vd_aA);
    vd_ei(vd_i.canvas, "mouseup", vd_De, vd_aA);
    vd_ei(vd_i.canvas, vd_EX, vd_DT, vd_aA);
    vd_ei(vd_i.canvas, "click", vd_wI, vd_aA);
    vd_ei(vd_i.canvas, "contextmenu", vd_EQ, vd_aA);
    vd_vK = false;
  }
  function vd_zE(e) {
    vd_i.SetSize();
  }
  this.Init = function (vd_ik, width, height, vd_bT) {
    vd_i.canvas = document.getElementById(vd_ik);
    vd_i.canvas.tabindex = "0";
    vd_i.canvas.style.cursor = "none";
    vd_fA(window, "resize", vd_zE, vd_aA);
    vd_fA(vd_i.canvas, "touchstart", vd_CF, vd_aA);
    vd_fA(vd_i.canvas, "touchend", vd_sM, vd_aA);
    vd_fA(vd_i.canvas, "touchcancel", vd_BK, vd_aA);
    vd_fA(vd_i.canvas, "touchleave", vd_BL, vd_aA);
    vd_fA(vd_i.canvas, "touchmove", vd_Ct, vd_aA);
    vd_fA(window, "keydown", vd_BN, vd_aA);
    vd_HI();
    vd_i.SetSize(width, height, vd_bT);
    if (vd_bR) vd_bR.vd_Cp();
    vd_bR = new vd_wT(vd_i);
    vd_un = vd_bR;
  };
  this.vd_JO = function () {
    vd_ei(window, "resize", vd_zE, vd_aA);
    vd_ei(vd_i.canvas, "touchstart", vd_CF, vd_aA);
    vd_ei(vd_i.canvas, "touchend", vd_sM, vd_aA);
    vd_ei(vd_i.canvas, "touchcancel", vd_BK, vd_aA);
    vd_ei(vd_i.canvas, "touchleave", vd_BL, vd_aA);
    vd_ei(vd_i.canvas, "touchmove", vd_Ct, vd_aA);
    vd_ei(window, "keydown", vd_BN, vd_aA);
    vd_Eg();
    vd_R.vd_c.vd_gs(null);
    vd_R.destroy();
    vd_R = null;
    vd_i.canvas = null;
    ctx = null;
    vd_fd = null;
    vd_jm = null;
    vd_i.viewcube.clear();
    if (vd_bR) vd_bR.vd_Cp();
    vd_bR = null;
    vd_un = null;
  };
  function vd_KZ(owner) {
    this.target = owner;
    var vd_i = this;
    this.Info = "";
    this.percent = 1000;
    var vd_oM = 0;
    var vd_of = 0;
    this.Cancel = false;
    var vd_wZ = false;
    this.start = function (info, async, total) {
      vd_wZ = async;
      vd_i.Info = info;
      vd_i.Progress(-1000, 1);
      if (total != undefined) vd_of = total;
      vd_oM = 0;
      return vd_i.Cancel;
    };
    this.end = function () {
      if (vd_i.percent !== 1000) vd_i.Progress(100, 100);
      vd_oM = 0;
      vd_of = 0;
      vd_i.percent = 1000;
      vd_i.Info = "";
      vd_wZ = false;
      return vd_i.Cancel;
    };
    function vd_Gc(current, total) {
      if (total != undefined) vd_of = total;
      if (current == undefined) vd_oM++;
      else vd_oM = current;
      var vd_yJ = 0;
      if (vd_of > 0) vd_yJ = Number(((100 * vd_oM) / vd_of).toFixed(0));
      if (vd_yJ == vd_i.percent) return false;
      vd_i.percent = vd_yJ;
      return true;
    }
    function vd_Be() {
      if (vd_lf != null) clearTimeout(vd_lf);
      vd_lf = null;
      vd_i.Cancel = false;
      if (vd_i.target.vdprogress != null) vd_i.target.vdprogress(vd_i);
      if (!vd_i.Cancel && vd_wZ === true) {
        if (vd_i.percent < 0 || vd_i.percent >= 100) vd_i.target.Refresh();
        else {
          var vd_CW = 24;
          var vd_FK = vdgeo.vd_r(vd_CW / 2);
          vd_i.target.vd_iw().globalAlpha = 80 / 255;
          vd_i.target.vd_iw().lineWidth = vd_CW;
          vd_i.target.vd_iw().strokeStyle = vdgdi.vd_gD([0, 0, 128]);
          vd_i.target.vd_iw().beginPath();
          vd_i.target.vd_iw().moveTo(0, vd_FK);
          vd_i.target
            .vd_iw()
            .lineTo(
              vdgeo.vd_r((vd_i.target.canvas.width * vd_i.percent) / 100),
              vd_FK
            );
          vd_i.target.vd_iw().stroke();
          vd_i.target.vd_iw().globalAlpha = 1;
        }
      }
    }
    var vd_lf = null;
    this.vd_PJ = function (current, total) {
      vd_Gc(current, total);
      if (vd_lf != null) clearTimeout(vd_lf);
      vd_lf = null;
      vd_lf = setTimeout(vd_Be, 5);
    };
    this.Progress = function (current, total) {
      var ret = vd_Gc(current, total);
      if (ret) vd_Be();
      return ret;
    };
    return this;
  }
  function vd_Lg(sender) {
    this.target = sender;
    this.Cancel = false;
    var vd_i = this;
    this.NumTouchs = 0;
    this.PrevPos1 = null;
    this.PrevPos2 = null;
    this.Pos1 = null;
    this.Pos2 = null;
    this.init = function (vd_LR, vd_IN, vd_Jm, p1, p2) {
      vd_i.Cancel = false;
      vd_i.NumTouchs = vd_LR;
      vd_i.PrevPos1 = vd_IN;
      vd_i.PrevPos2 = vd_Jm;
      vd_i.Pos1 = p1;
      vd_i.Pos2 = p2;
    };
    this.toString = function () {
      var ret = vd_i.NumTouchs.toString();
      if (vd_i.PrevPos1 != null)
        ret +=
          " , " +
          vd_i.PrevPos1[X].toString() +
          " , " +
          vd_i.PrevPos1[Y].toString();
      else ret += ", null";
      if (vd_i.Pos1 != null)
        ret +=
          " , " + vd_i.Pos1[X].toString() + " , " + vd_i.Pos1[Y].toString();
      else ret += ", null";
      if (vd_i.PrevPos2 != null)
        ret +=
          " , " +
          vd_i.PrevPos2[X].toString() +
          " , " +
          vd_i.PrevPos2[Y].toString();
      else ret += ", null";
      if (vd_i.Pos2 != null)
        ret +=
          " , " + vd_i.Pos2[X].toString() + " , " + vd_i.Pos2[Y].toString();
      else ret += ", null";
      return ret;
    };
    return this;
  }
  function vd_KD(sender) {
    var vd_i = this;
    this.target = sender;
    this.Cancel = false;
    this.mousebutton = 0;
    this.skey = 0;
    this.istouched = false;
    this.xPix = 0;
    this.yPix = 0;
    this.prevPos = [0, 0, 0];
    this.Delta = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.init = function (button, vd_mA, pos, pPos, vd_md, skey) {
      vd_i.Cancel = false;
      vd_i.mousebutton = button;
      vd_i.skey = skey;
      vd_i.istouched = vd_mA;
      vd_i.xPix = vdgeo.vd_r(pos[X]);
      vd_i.yPix = vdgeo.vd_r(pos[Y]);
      vd_i.prevPos = pPos;
      vd_i.Delta = vd_md;
      var vd_do = vd_R.vd_rP(vd_i.xPix, vd_i.yPix);
      vd_i.x = vd_do[X];
      vd_i.y = vd_do[Y];
      vd_i.z = vd_do[Z];
    };
    this.vd_JE = function (wpos) {
      vd_i.x = wpos[X];
      vd_i.y = wpos[Y];
      vd_i.z = wpos[Z];
      var vd_de = vd_i.target.WorldToPixel(wpos);
      vd_i.xPix = vd_de[0];
      vd_i.yPix = vd_de[1];
    };
    this.toString = function () {
      var ret = "";
      ret +=
        vd_i.mousebutton.toString() +
        " ," +
        (vd_i.istouched === true ? "true" : "false") +
        " ,";
      ret += vd_i.xPix.toString() + " " + vd_i.yPix.toString() + " ,";
      ret +=
        (vd_i.prevPos != null
          ? vd_i.prevPos[X].toString() + " " + vd_i.prevPos[Y].toString()
          : "null") + " ";
      return ret;
    };
    return this;
  }
  this.vdAfterOpenDocument = function (e) {};
  this.vdAfterSaveDocument = function (e) {};
  this.vdmousemoveAfter = function (e) {};
  this.vdmousemove = function (e) {};
  this.vdmousedown = function (e) {};
  this.vdmouseup = function (e) {};
  this.vdmousewheel = function (e) {};
  this.vdmouseout = function (e) {};
  this.vddblclick = function (e) {};
  this.vdclick = function (e) {};
  this.vdtouchMove = function (e) {};
  this.vdprogress = function (e) {};
  this.vdPrompt = function (e, msg) {};
  this.vdKeyDown = function (e) {};
  this.vdError = function (sender, vd_EK, vd_Bf, info) {};
  this.vdLoadXref = function (e) {};
  this.vdXrefLoaded = function (e) {};
  this.vdSelectionModified = null;
  this.vdActionDraw = null;
  this.vdDrawCursor = null;
  this.vdFIlterActionPoint = null;
  function vd_oQ(sender, vx, vy, vz, vs, vd_by) {
    this.target = sender;
    this.ViewCenterX = vx;
    this.ViewCenterY = vy;
    this.ViewCenterZ = vz;
    this.ViewSize = vs;
    this.vd_rt = vd_by;
    this.Cancel = false;
  }
  this.vdUpdateView = function (e) {};
  this.AfterDrawInView = null;
  this.AfterRedraw = function (e) {};
  this.vd_cI = function (vd_EK, vd_Bf, info) {
    if (vd_i.vdError != null) vd_i.vdError(vd_i, vd_EK, vd_Bf, info);
  };
  this.Prompt = function (msg) {
    if (vd_i.vdPrompt != null) vd_i.vdPrompt(this, msg);
  };
  function vd_Qm(obj) {
    if (obj == undefined) obj = vd_i.canvas;
    var vd_FB = 0,
      vd_DW = 0;
    if (obj.offsetParent) {
      do {
        vd_FB += obj.offsetLeft;
        vd_DW += obj.offsetTop;
        obj = obj.offsetParent;
      } while (obj);
      return [vd_FB, vd_DW];
    }
    return [obj.offsetLeft, obj.offsetTop];
  }
  function vd_cj(evt, target) {
    if (evt.offsetX && evt.offsetY)
      return [vdgeo.vd_r(evt.offsetX), vdgeo.vd_r(evt.offsetY)];
    var vd_zF = vd_Qm(target);
    return [vdgeo.vd_r(evt.pageX - vd_zF[X]), vdgeo.vd_r(evt.pageY - vd_zF[Y])];
  }
  this.vd_iz = function (pos) {
    return (
      pos[X] >= 0 &&
      pos[X] < vd_i.canvas.width &&
      pos[Y] >= 0 &&
      pos[Y] < vd_i.canvas.height
    );
  };
  function vd_to() {
    vd_tC = false;
    vd_vO = false;
    vd_vq = false;
  }
  function vd_gt(e) {
    var ret = 0;
    if (e.altKey) ret += 1;
    if (e.ctrlKey) ret += 2;
    if (e.shiftKey) ret += 4;
    return ret;
  }
  function vd_hL(e) {
    if (vd_tC) return 1;
    if (vd_vO) return 2;
    if (vd_vq) return 3;
    return 0;
  }
  function vd_ua(vd_Pa) {
    for (var i = 0; i < vd_fg.length; i++) {
      if (vd_Pa == vd_fg[i][0]) return i;
    }
    return -1;
  }
  function cancelBubble(e) {
    var evt = e ? e : window.event;
    if (evt.stopPropagation) evt.stopPropagation();
    if (evt.cancelBubble != null) evt.cancelBubble = true;
  }
  function vd_jD(e) {
    var evt = e ? e : window.event;
    if (evt.preventDefault) evt.preventDefault();
    evt.returnValue = false;
    return false;
  }
  function vd_wI(evt, vd_mA) {
    var ret = false;
    var date = new Date();
    var vd_JQ = date.getTime();
    vd_pL = vd_JQ <= vd_xc + 500 ? vd_pL + 1 : 1;
    vd_xc = date.getTime();
    var vd_mC;
    if (vd_mA) vd_mC = vd_cj(evt.touches[0], evt.target);
    else vd_mC = vd_cj(evt, evt.target);
    if (vd_pL === 2) {
      vd_pL = 0;
      vd_xc = 0;
      if (vd_oe != null) {
        var xdif = Math.abs(vd_mC[X] - vd_oe[X]);
        var ydif = Math.abs(vd_mC[Y] - vd_oe[Y]);
        if (xdif < 20 && ydif < 20) {
          vd_al.init(vd_hL(evt), vd_mA == true, vd_mC, null, 0, vd_gt(evt));
          if (vd_i.vddblclick != null) vd_i.vddblclick(vd_al);
          if (!vd_al.Cancel) {
            Action.dblclick(vd_al);
          }
          ret = true;
        }
      }
    }
    if (ret == false) {
      vd_al.init(vd_hL(evt), false, vd_mC, null, 0, vd_gt(evt));
      if (vd_i.vdclick != null) vd_i.vdclick(vd_al);
      if (!vd_al.Cancel) {
        Action.click(vd_al);
        ret = vd_mA !== true;
      }
    }
    if (vd_mA) vd_oe = vd_cj(evt.touches[0], evt.target);
    else vd_oe = vd_cj(evt, evt.target);
    return ret;
  }
  function vd_EQ(e) {
    e.preventDefault();
    return false;
  }
  function vd_CF(evt) {
    vd_uh(evt, true);
    vd_cJ = null;
    vd_Eg();
    Action.vd_xO();
    var touches = evt.touches;
    var pos;
    vd_fg.length = 0;
    for (var i = 0; i < touches.length; i++) {
      pos = vd_cj(touches[i], evt.target);
      if (!vd_i.vd_iz(pos)) continue;
      vd_fg.push([touches[i].identifier, pos]);
    }
    if (touches.length == 1 && vd_fg.length == 1) {
      if (vd_wI(evt, true)) return vd_jD(evt);
      pos = vd_cj(touches[0], evt.target);
      vd_al.init(1, true, pos, null, 0, vd_gt(evt));
      if (vd_i.vdmousedown != null) vd_i.vdmousedown(vd_al);
      if (!vd_al.Cancel) {
        Action.mousedown(vd_al);
      }
    }
    cancelBubble(evt);
    return vd_jD(evt);
  }
  function vd_sM(evt) {
    vd_uh(evt, false);
    vd_cJ = null;
    Action.vd_xO();
    var touches = evt.changedTouches;
    if (
      vd_fg.length == 1 &&
      touches.length == 1 &&
      evt.touches.length == 0 &&
      vd_ua(touches[0].identifier) != -1
    ) {
      pos = vd_cj(touches[0], evt.target);
      vd_al.init(1, true, pos, null, 0, vd_gt(evt));
      if (vd_i.vdmouseup != null) vd_i.vdmouseup(vd_al);
      if (!vd_al.Cancel) {
        if (vd_i.vdmouseout != null) vd_i.vdmouseout(vd_al);
        if (!vd_al.Cancel) Action.mouseup(vd_al);
      }
    }
    vd_fg.length = 0;
    return vd_eZ;
  }
  function vd_BL(evt) {
    return vd_sM(evt);
  }
  function vd_BK(evt) {
    return vd_sM(evt);
  }
  function vd_Ct(evt) {
    Action.vd_xO();
    var touches = evt.changedTouches;
    if (evt.touches.length == evt.targetTouches.length) {
      if (
        evt.touches.length == 1 &&
        touches.length == 1 &&
        vd_fg.length == 1 &&
        vd_ua(touches[0].identifier) != -1
      ) {
        var pos = vd_cj(touches[0], evt.target);
        if (vd_cJ == null)
          vd_cJ = [pos[0], pos[1], vd_R.vd_c.vd_jM(pos[0], pos[1])];
        var distance = vdgeo.Distance2D(pos, vd_cJ);
        if (!vdgeo.AreEqual(distance, 0, 0)) {
          vd_al.init(1, true, pos, vd_cJ, 0, vd_gt(evt));
          if (vd_i.vdmousemove != null) vd_i.vdmousemove(vd_al);
          if (!vd_al.Cancel) {
            Action.mousemove(vd_al);
            if (vd_i.vdmousemoveAfter != null) vd_i.vdmousemoveAfter(vd_al);
          }
        }
      } else if (
        evt.touches.length == 2 &&
        touches.length == 2 &&
        vd_fg.length == 2
      ) {
        var pos1 = null;
        var pos2 = null;
        var idx1 = -1;
        var idx2 = -1;
        var vd_kp = null;
        var vd_lB = null;
        idx1 = vd_ua(touches[0].identifier);
        idx2 = vd_ua(touches[1].identifier);
        if (idx1 !== -1 && idx2 !== -1) {
          pos1 = vd_cj(touches[0], evt.target);
          pos2 = vd_cj(touches[1], evt.target);
          vd_kp = vd_fg[idx1][1];
          vd_lB = vd_fg[idx2][1];
          vd_fg.splice(idx1, 1, [vd_fg[idx1][0], pos1]);
          vd_fg.splice(idx2, 1, [vd_fg[idx2][0], pos2]);
          if (vd_i.vd_iz(pos1) && vd_i.vd_iz(pos2)) {
            vd_rL.init(2, vd_kp, vd_lB, pos1, pos2);
            if (vd_i.vdtouchMove != null) vd_i.vdtouchMove(vd_rL);
            if (!vd_rL.Cancel) {
              Action.vd_Ix(vd_rL);
            }
          }
        }
      }
      cancelBubble(evt);
      return vd_jD(evt);
    }
    return vd_eZ;
  }
  function vd_Eq(e) {
    var pos = vd_cj(e, e.target);
    if (!vd_i.vd_iz(pos)) return vd_eZ;
    if (vd_cJ == null)
      vd_cJ = [pos[0], pos[1], vd_R.vd_c.vd_jM(pos[0], pos[1])];
    var distance = vdgeo.Distance2D(pos, vd_cJ);
    if (!vdgeo.AreEqual(distance, 0, 0)) {
      vd_al.init(vd_hL(e), e.istouched, pos, vd_cJ, 0, vd_gt(e));
      if (vd_i.vdmousemove != null) vd_i.vdmousemove(vd_al);
      if (!vd_al.Cancel) {
        Action.mousemove(vd_al);
        if (vd_i.vdmousemoveAfter != null) vd_i.vdmousemoveAfter(vd_al);
        cancelBubble(e);
        return vd_jD(e);
      }
    }
    return vd_eZ;
  }
  function vd_DT(e) {
    var pos = vd_cj(e, e.target);
    if (!vd_i.vd_iz(pos)) return vd_eZ;
    var Delta = e.detail ? e.detail * -1 : e.wheelDelta;
    Delta = Delta < 0 ? vd_i.MouseWheelZoomScale : 1 / vd_i.MouseWheelZoomScale;
    vd_al.init(vd_hL(e), e.istouched, pos, null, Delta, vd_gt(e));
    if (vd_i.vdmousewheel != null) vd_i.vdmousewheel(vd_al);
    if (!vd_al.Cancel) {
      Action.mousewheel(vd_al);
      cancelBubble(e);
      return vd_jD(e);
    }
    return vd_eZ;
  }
  function vd_uh(e, vd_PA) {
    e.preventDefault();
    vd_to();
    if ("ontouchstart" in document.documentElement || "ontouchstart" in window)
      vd_tC = true;
    else if (e.which == 1) vd_tC = true;
    else if (e.which == 2) vd_vO = true;
    else if (e.which == 3) vd_vq = true;
  }
  function vd_FT(e) {
    vd_uh(e, true);
    vd_cJ = null;
    var pos = vd_cj(e, e.target);
    if (!vd_i.vd_iz(pos)) return vd_eZ;
    vd_al.init(vd_hL(e), e.istouched, pos, null, 0, vd_gt(e));
    if (vd_i.vdmousedown != null) vd_i.vdmousedown(vd_al);
    if (!vd_al.Cancel) {
      Action.mousedown(vd_al);
      cancelBubble(e);
      return vd_jD(e);
    }
    return vd_eZ;
  }
  function vd_De(e) {
    vd_cJ = null;
    var pos = vd_cj(e, e.target);
    if (!vd_i.vd_iz(pos)) {
      Action.cancel();
      return vd_eZ;
    }
    vd_uh(e, false);
    vd_al.init(vd_hL(e), e.istouched, pos, null, 0, vd_gt(e));
    if (vd_i.vdmouseup != null) vd_i.vdmouseup(vd_al);
    if (!vd_al.Cancel) {
      Action.mouseup(vd_al);
      cancelBubble(e);
      vd_to();
      return vd_jD(e);
    }
    vd_to();
    return vd_eZ;
  }
  function vd_DO(e) {
    var pos = vd_cj(e, e.target);
    vd_al.init(vd_hL(e), e.istouched, pos, null, 0, vd_gt(e));
    Action.mouseover(vd_al);
    return vd_eZ;
  }
  function vd_Es(e) {
    vd_to();
    var pos = vd_cj(e, e.target);
    vd_al.init(vd_hL(e), e.istouched, pos, null, 0, vd_gt(e));
    if (vd_i.vdmouseout != null) vd_i.vdmouseout(vd_al);
    if (!vd_al.Cancel) {
      Action.mouseout(vd_al);
      cancelBubble(e);
      return vd_jD(e);
    }
    return vd_eZ;
  }
  function vd_BN(e) {
    if (vd_i.vdKeyDown != null) vd_i.vdKeyDown(e);
    if (e.Cancel !== true) Action.keydown(e);
    return vd_eZ;
  }
  return this;
}
function vd_Ks(vd_xn) {
  var vd_i = this;
  var vd_cz = vd_xn;
  var vd_jk = 0;
  var vd_ke = false;
  this.Enable = true;
  var vd_dP = [];
  var vd_hp = [];
  function vd_lY(_obj, vd_ky, vd_Hh) {
    this.obj = _obj;
    this.name = vd_ky;
    this.value = vd_Hh;
  }
  function vd_CX(value) {
    this.undogoup = value;
  }
  Object.defineProperty(vd_i, "UndoStack", {
    get: function () {
      return vd_dP;
    },
  });
  function vd_Ch(obj) {
    if (!vdConst.vd_PE(obj)) return;
    vd_cz.UpdateFig(obj);
    vd_ke = true;
  }
  function vd_Mk() {
    if (!vd_dP || vd_dP.length == 0) return -1;
    var vd_G = vd_dP[vd_dP.length - 1];
    vd_dP.length -= 1;
    if (!vd_hp) vd_hp = [];
    if (vd_G.name === "special_transform") {
      vd_G.value.reverse();
      vd_hp.push(new vd_lY(vd_G.obj, vd_G.name, vd_G.value));
      vd_q.vd_ef(vd_G.value[0], vd_G.obj);
    } else if (vd_G.name === "special_movegrips") {
      vd_G.value[1][X] *= -1;
      vd_G.value[1][Y] *= -1;
      vd_G.value[1][Z] *= -1;
      vd_hp.push(new vd_lY(vd_G.obj, vd_G.name, vd_G.value));
      vd_N.vd_lK(vd_G.obj, vd_G.value[0], vd_G.value[1], vd_cz);
    } else {
      vd_hp.push(new vd_lY(vd_G.obj, vd_G.name, vd_G.obj[vd_G.name]));
      vd_G.obj[vd_G.name] = vd_G.value;
    }
    vd_Ch(vd_G.obj);
    if (vd_G.obj["undogoup"] != undefined)
      vd_jk += vd_G.obj["undogoup"] ? -1 : 1;
    return vd_jk;
  }
  function vd_Jc() {
    if (!vd_hp || vd_hp.length == 0) return -1;
    var vd_G = vd_hp[vd_hp.length - 1];
    vd_hp.length -= 1;
    if (!vd_dP) vd_dP = [];
    if (vd_G.name === "special_transform") {
      vd_G.value.reverse();
      vd_dP.push(new vd_lY(vd_G.obj, vd_G.name, vd_G.value));
      vd_q.vd_ef(vd_G.value[0], vd_G.obj);
    } else if (vd_G.name === "special_movegrips") {
      vd_G.value[1][X] *= -1;
      vd_G.value[1][Y] *= -1;
      vd_G.value[1][Z] *= -1;
      vd_dP.push(new vd_lY(vd_G.obj, vd_G.name, vd_G.value));
      vd_N.vd_lK(vd_G.obj, vd_G.value[0], vd_G.value[1], vd_cz);
    } else {
      vd_dP.push(new vd_lY(vd_G.obj, vd_G.name, vd_G.obj[vd_G.name]));
      vd_G.obj[vd_G.name] = vd_G.value;
    }
    vd_Ch(vd_G.obj);
    if (vd_G.obj["undogoup"] != undefined)
      vd_jk += vd_G.obj["undogoup"] ? -1 : 1;
    return vd_jk;
  }
  this.Clear = function () {
    vd_dP = [];
    vd_hp = [];
    vd_jk = 0;
  };
  this.store = function (obj, name, value) {
    if (!vd_i.Enable) return;
    if (!vd_dP) vd_dP = [];
    if (value == undefined) value = obj[name];
    vd_dP.push(new vd_lY(obj, name, value));
  };
  this.group_start = function () {
    vd_i.store(new vd_CX(false), "undogoup", true);
  };
  this.group_end = function () {
    if (
      vd_dP &&
      vd_dP.length > 0 &&
      vd_dP[vd_dP.length - 1].name === "undogoup" &&
      vd_dP[vd_dP.length - 1].value === true
    ) {
      vd_dP.pop();
      return;
    }
    vd_i.store(new vd_CX(true), "undogoup", false);
  };
  this.undo = function () {
    vd_ke = false;
    do {} while (vd_Mk() > 0);
    if (vd_ke) vd_cz.UpdateLayout();
    vd_ke = false;
  };
  this.redo = function () {
    vd_ke = false;
    do {} while (vd_Jc() > 0);
    if (vd_ke) vd_cz.UpdateLayout();
    vd_ke = false;
  };
  return this;
}
var vd_BX = {};
vd_BX.chk = function (vd_cz, palette) {
  var s;
  var k;
  if (palette._lc) {
    var vl = [
      String.fromCharCode(
        104,
        116,
        116,
        112,
        58,
        47,
        47,
        100,
        101,
        118,
        46,
        118,
        100,
        114,
        97,
        119,
        46,
        99,
        111,
        109,
        47
      ),
      String.fromCharCode(
        104,
        116,
        116,
        112,
        58,
        47,
        47,
        118,
        100,
        114,
        97,
        119,
        46,
        99,
        111,
        109,
        47
      ),
      String.fromCharCode(
        104,
        116,
        116,
        112,
        115,
        58,
        47,
        47,
        118,
        100,
        114,
        97,
        119,
        46,
        99,
        111,
        109,
        47
      ),
      String.fromCharCode(
        104,
        116,
        116,
        112,
        58,
        47,
        47,
        119,
        119,
        119,
        46,
        118,
        100,
        114,
        97,
        119,
        46,
        99,
        111,
        109,
        47
      ),
      String.fromCharCode(
        104,
        116,
        116,
        112,
        115,
        58,
        47,
        47,
        119,
        119,
        119,
        46,
        118,
        100,
        114,
        97,
        119,
        46,
        99,
        111,
        109,
        47
      ),
      String.fromCharCode(
        104,
        116,
        116,
        112,
        58,
        47,
        47,
        119,
        119,
        119,
        46,
        118,
        100,
        114,
        97,
        119,
        98,
        111,
        120,
        46,
        99,
        111,
        109,
        47
      ),
      String.fromCharCode(
        104,
        116,
        116,
        112,
        115,
        58,
        47,
        47,
        119,
        119,
        119,
        46,
        118,
        100,
        114,
        97,
        119,
        98,
        111,
        120,
        46,
        99,
        111,
        109,
        47
      ),
      String.fromCharCode(
        102,
        105,
        108,
        101,
        58,
        47,
        47,
        47,
        67,
        58,
        47,
        118,
        100,
        114,
        97,
        119,
        55,
        47,
        87,
        101,
        98,
        76,
        105,
        98,
        114,
        97,
        114,
        121,
        47
      ),
    ];
    var u = decodeURI(document.location.href.split("?")[0]);
    for (k = 0; k < vl.length; k++) {
      palette._lc._a1 = u.substring(0, vl[k].length) == vl[k];
      if (palette._lc._a1) break;
    }
    var lv = vd_cz[String.fromCharCode(108, 105, 99, 118, 97, 108)];
    if (!palette._lc._a1 && lv) {
      var suc1 = false;
      for (k = 0; k < lv.length; k++) {
        s = base64.vd_zy(base64.vd_AI(lv[k].split("").reverse().join("")));
        suc1 = document._lc.indexOf(s) >= 0;
        if (suc1) break;
      }
      if (suc1) {
        for (k = 0; k < lv.length; k++) {
          s = base64.vd_zy(base64.vd_AI(lv[k].split("").reverse().join("")));
          palette._lc._a1 = u.indexOf(s) >= 0;
          if (palette._lc._a1) break;
        }
      }
    }
    if (palette._lc._a2) palette._lc._a1 = false;
  }
};
function vd_wT(vd_xn) {
  var vd_i = this;
  var vd_cz = vd_xn;
  this.vd_Gn = new vd_Lo();
  this.FileName = "";
  this.vd_ix = "";
  this.vdDocument = null;
  var vd_OI = false;
  var vd_mO = null;
  var vd_rn = false;
  this.vd_vc = null;
  var vd_dg = [];
  function vd_Ht() {
    var vd_gd = document.getElementsByTagName("head")[0];
    for (var k = 0; k < vd_dg.length; k++) {
      vd_dg[k].onreadystatechange = null;
      vd_dg[k].onload = null;
      vd_dg[k].readyState = "none";
      vd_dg[k].innerHTML = "";
      vd_gd.removeChild(vd_dg[k]);
    }
    vd_dg = [];
  }
  function vd_BW(e) {
    var id = -1;
    for (var k = 0; k < vd_dg.length; k++) {
      if (vd_dg[k] === e.target) {
        id = k;
        break;
      }
    }
    if (id === -1) return;
    var vd_gd = document.getElementsByTagName("head")[0];
    vd_dg[id].onreadystatechange = null;
    vd_dg[id].onload = null;
    vd_dg[id].readyState = "none";
    vd_dg[id].innerHTML = "";
    vd_gd.removeChild(vd_dg[id]);
    vd_dg.splice(id, 1);
  }
  this.vd_OG = function (item) {
    return vd_i.vdDocument[item];
  };
  this.vd_PB = function (vd_bx, vd_da) {
    if (!vd_da) return null;
    return vd_bx.Items[vd_bx[vd_da]];
  };
  this.vd_DQ = function (vd_bx, vd_da) {
    if (!vd_da) return null;
    return vd_i.vdDocument[vd_da];
  };
  this.vd_gE = vd_i.vd_DQ;
  this.vd_vj = false;
  function vd_Mv() {
    if (!vd_i.vdDocument.Lights) vd_i.vdDocument.Lights = {};
    if (!vd_i.vdDocument.Lights.Default) {
      vd_i.vdDocument.Lights.Default = {};
      vd_i.vdDocument.Lights.Default.Enable = true;
    }
    if (!vd_i.vdDocument.Lights.Default.Name)
      vd_i.vdDocument.Lights.Default.Name = "default";
    if (!vd_i.vdDocument.Lights.Default.SpotFallOff)
      vd_i.vdDocument.Lights.Default.SpotFallOff = 0;
    if (!vd_i.vdDocument.Lights.Default.SpotAngle)
      vd_i.vdDocument.Lights.Default.SpotAngle = 180;
    if (!vd_i.vdDocument.Lights.Default.TypeOfLight)
      vd_i.vdDocument.Lights.Default.TypeOfLight = 1001;
    if (!vd_i.vdDocument.Lights.Default.color)
      vd_i.vdDocument.Lights.Default.color = [255, 255, 255, 255];
    if (!vd_i.vdDocument.Lights.Default.Intensity)
      vd_i.vdDocument.Lights.Default.Intensity = 1;
    if (!vd_i.vdDocument.Lights.Default.Position)
      vd_i.vdDocument.Lights.Default.Position = [0, 0, 0];
    if (!vd_i.vdDocument.Lights.Default.Direction)
      vd_i.vdDocument.Lights.Default.Direction = [0, 0, -1];
  }
  function vd_Lf() {
    var vd_tF = vd_i.vdDocument.LineTypes;
    if (vd_tF == undefined) return;
    for (var i = 0; i < vd_tF.Items.length; i++) {
      var linetype = vd_i.vd_gE(vd_tF, vd_tF.Items[i]);
      if (!linetype || linetype.Segments == undefined) continue;
      for (var j = 0; j < linetype.Segments.Items.length; j++) {
        var vd_s = linetype.Segments.Items[j];
        if (vd_s.vd_cX != undefined && vd_s.vd_cX != null) continue;
        if (
          vd_s.Flag != vdConst.LINETYPE_FLAG_TTF_TEXT &&
          vd_s.Flag != vdConst.LINETYPE_FLAG_SHX_TEXT
        )
          continue;
        vd_s.ShapeStyleRef = vd_i.vd_gE(
          vd_i.vdDocument.TextStyles,
          vd_s.ShapeStyle
        );
        if (
          vd_s.ShapeStyleRef == null ||
          vd_s.ShapeStyleRef.FontFileVDS == null
        )
          continue;
        if (vd_s.ShapeStyleRef.FontFileVDS == null) continue;
        if (vd_s.Flag == vdConst.LINETYPE_FLAG_SHX_TEXT) {
          vd_s.vd_mF = String.fromCharCode(vd_s.Shapenumber);
        } else vd_s.vd_mF = vd_s.ShapeText;
        vd_s.vd_cX = [0, 0, 0, 0];
        for (var c = 0; c < vd_s.vd_mF.length; c++) {
          var pos = vd_s.vd_mF.charCodeAt(c);
          if (pos == 10 || pos == 13) {
            continue;
          }
          var vd_gC =
            vd_s.ShapeStyleRef.FontFileVDS.Shapes["h_" + pos.toString()];
          var shape = null;
          if (vd_gC != undefined)
            shape = vd_s.ShapeStyleRef.FontFileVDS.Shapes.Items[vd_gC];
          if (c == 0 && shape != null) vd_s.vd_cX[0] = shape.bb[0];
          if (shape != null) {
            vd_s.vd_cX[1] += shape.AdvanceX;
            rsb = shape.AdvanceX - shape.bb[2];
            vd_s.vd_cX[2] = Math.min(vd_s.vd_cX[2], shape.bb[1]);
            vd_s.vd_cX[3] = Math.max(vd_s.vd_cX[3], shape.bb[3]);
          } else {
            vd_s.vd_cX[1] += vd_s.ShapeStyleRef.FontFileVDS.Ascent * 0.5;
            rsb = 0;
          }
        }
        vd_s.vd_cX[1] -= rsb;
        if (vd_s.ShapeRotation == undefined) vd_s.ShapeRotation = 0.0;
        if (vd_s.ShapeOffsetX == undefined) vd_s.ShapeOffsetX = 0.0;
        if (vd_s.ShapeOffsetY == undefined) vd_s.ShapeOffsetY = 0.0;
      }
    }
  }
  var vd_lV = 0;
  function vd_Cz(vd_u) {
    if (!vd_u) return;
    var vd_dy =
      vd_u.Transparency && vd_u.Transparency[3] === 255
        ? vd_u.Transparency
        : null;
    var r, g, b, a;
    if (vd_u.bytes && !vd_u.bytescount) {
      var bytes = [];
      bytes.length = vd_u.height;
      for (var h = 0; h < vd_u.height; h++) {
        var vd_nh = [];
        vd_nh.length = vd_u.width * 4;
        bytes[h] = vd_nh;
        var k = 0;
        for (var w = 0; w < vd_u.width; w++) {
          b = vd_u.bytes[h][w * 3];
          g = vd_u.bytes[h][w * 3 + 1];
          r = vd_u.bytes[h][w * 3 + 2];
          a = 255;
          if (vd_dy && r === vd_dy[0] && g === vd_dy[1] && b === vd_dy[2])
            a = 0;
          vd_nh[k] = r;
          k++;
          vd_nh[k] = g;
          k++;
          vd_nh[k] = b;
          k++;
          vd_nh[k] = a;
          k++;
        }
      }
      vd_u.bytes = bytes;
      vd_u.bytescount = 4;
      return;
    }
    if (!vd_u.jpegData || vd_u.bytes) return;
    vd_lV++;
    var vd_fx = document.createElement("img");
    var iformat = vd_u.iformat ? vd_u.iformat : "jpg";
    vd_fx.setAttribute(
      "src",
      "data:image/" + iformat + ";base64," + vd_u.jpegData
    );
    vd_fx.setAttribute("width", vd_u.width);
    vd_fx.setAttribute("height", vd_u.height);
    vd_fx.vd_yF = vd_u;
    vd_fx.onload = function (evt) {
      var vd_yF = evt.target.vd_yF;
      vdConst.vd_rR(evt.target, vd_yF);
      vd_lV--;
      if (vd_lV === 0) {
        if (vd_mO) vd_mO(vd_i);
        vd_rv();
        vd_i.vd_sY(0);
      }
    };
  }
  function vd_KH() {
    var vd_rM = vd_i.vdDocument.Images;
    if (!vd_rM) return;
    for (var i = 0; i < vd_rM.Items.length; i++) {
      var vd_u = vd_i.vd_gE(vd_rM, vd_rM.Items[i]);
      vd_Cz(vd_u);
    }
  }
  function vd_La() {
    var palette = vd_i.vdDocument.Palette;
    vd_Cz(palette._lc);
    for (var i = 0; i < palette.Items.length; i++) {
      if (palette.Items[i].MaterialImageRef != undefined) continue;
      palette.Items[i].MaterialImageRef = vd_i.vd_gE(
        vd_i.vdDocument.Images,
        palette.Items[i].MaterialImage
      );
    }
    vd_BX.chk(vd_cz, palette);
  }
  function vd_Lx() {
    var vd_qH = vd_i.vdDocument.TextStyles;
    if (vd_qH == undefined) return;
    for (var i = 0; i < vd_qH.Items.length; i++) {
      var style;
      if (vd_i.vd_vj) {
        style = vd_qH.Items[i];
      } else {
        style = vd_i.vdDocument[vd_qH.Items[i]];
      }
      if (style.FontFileVDS == null || style.FontFileVDS == undefined) {
        try {
          style.FontFileVDS = vd_i.vdDocument[style.Font];
        } catch (ex) {
          style.FontFileVDS = null;
        }
      }
    }
  }
  function vd_Bs(layout) {
    var box = new vd_hd();
    box.vd_gJ(layout.BoundingBox);
    var vd_Ii = [0, 0, 0, 12, 9, 0];
    if (!layout.Limits) {
      if (box.vd_bK || box.vd_Di) layout.Limits = vd_Ii;
      else layout.Limits = box.vd_hl();
    }
    if (!layout.GridSpaceX) layout.GridSpaceX = 0.5;
    if (!layout.GridSpaceY) layout.GridSpaceY = 0.5;
    if (!layout.SnapSpaceX) layout.SnapSpaceX = 0.5;
    if (!layout.SnapSpaceY) layout.SnapSpaceY = 0.5;
    if (!layout.SnapBase) layout.SnapBase = [0, 0, 0];
    if (layout.GridStyle === undefined)
      layout.GridStyle = vdConst.GridStyle_Solid;
    if (!box.vd_bK && !box.vd_Di) layout.BoundingBox = box.vd_hl();
  }
  function vd_GW() {
    vd_i.vdDocument.vd_Gy = new vd_Lm(vd_i.vdDocument, vd_cz);
    vd_i.vdDocument.UndoHistory = new vd_Ks(vd_cz);
    vd_lV = 0;
    vd_i.vdDocument.pathname = vd_i.vd_ix;
    if (vd_i.vdDocument.LineTypeScale == undefined)
      vd_i.vdDocument.LineTypeScale = 1.0;
    if (
      vd_i.vdDocument.LayOuts == undefined ||
      vd_i.vdDocument.LayOuts[vd_i.vdDocument.ActiveLayOut] == undefined
    )
      vd_i.vdDocument.ActiveLayOutRef = vd_i.vdDocument.Model;
    else
      vd_i.vdDocument.ActiveLayOutRef =
        vd_i.vdDocument.LayOuts.Items[
          vd_i.vdDocument.LayOuts[vd_i.vdDocument.ActiveLayOut]
        ];
    vd_Bs(vd_i.vdDocument.Model);
    if (vd_i.vdDocument.LayOuts)
      for (var i = 0; i < vd_i.vdDocument.LayOuts.Items.length; i++)
        vd_Bs(vd_i.vdDocument.LayOuts.Items[i]);
    if (!vd_i.vdDocument.GlobalRenderProperties) {
      vd_i.vdDocument.GlobalRenderProperties = {
        AxisSize: 50,
        GridColor: [255, 99, 71, 255],
        CursorAxisColor: [0, 0, 0, 255],
        CursorPickColor: [0, 0, 0, 255],
      };
    }
    if (
      vd_i.vdDocument.ActiveView &&
      vd_i.vdDocument.Views &&
      vd_i.vdDocument.Views.Items &&
      vd_i.vdDocument.Views[vd_i.vdDocument.ActiveView]
    )
      vd_i.vdDocument.vd_lm =
        vd_i.vdDocument.Views.Items[
          vd_i.vdDocument.Views[vd_i.vdDocument.ActiveView]
        ];
    if (vd_i.vdDocument.Images == undefined)
      vd_i.vdDocument.Images = { Items: [] };
    vd_i.vdDocument.ActiveLineTypeRef = vd_i.vd_gE(
      vd_i.vdDocument.LineTypes,
      vd_i.vdDocument.ActiveLineType
    );
    vd_i.vdDocument.ActiveTextStyleRef = vd_i.vd_gE(
      vd_i.vdDocument.TextStyles,
      vd_i.vdDocument.ActiveTextStyle
    );
    vd_i.vdDocument.ActiveLayerRef = vd_i.vd_gE(
      vd_i.vdDocument.Layers,
      vd_i.vdDocument.ActiveLayer
    );
    vd_i.vdDocument.vd_gF = vdConst.OsnapMode_DISABLE;
    vd_Lx();
    vd_Lf();
    vd_Mv();
    vd_La();
    vd_KH();
    vd_i.vd_Gn.SelectDocument(vd_i.vdDocument);
    if (vd_lV === 0) {
      if (vd_mO) vd_mO(vd_i);
      vd_rv();
      vd_i.vd_sY(0);
    }
  }
  function vd_AE() {
    if (!vd_kW) vd_mw(null, 5000);
    else {
      try {
        eval(vd_kW);
        if (_vdDocTmp) {
          vd_i.vd_gE = vd_i.vd_PB;
          vd_i.vd_vj = true;
          vd_AU();
        }
        vd_BS();
      } catch (ex) {
        vd_mw(ex, 6000);
      }
    }
  }
  this.Empty = function () {
    vd_rv();
    vd_Ht();
    if (vd_i.vd_ko) {
      for (var idoc = 0; idoc < vd_i.vd_ko.length; idoc++) {
        if (vd_i.vd_ko[idoc].documentdata) {
          vd_i.vd_ko[idoc].documentdata.Empty();
        }
      }
      vd_i.vd_ko = [];
    }
    vd_i.vdDocument = null;
  };
  this.vd_Cp = function () {
    vd_i.Empty();
    vd_cz = null;
  };
  function vd_BS() {
    vd_kW = null;
    if (vd_dZ) vd_dZ.length = 0;
    vd_dZ = null;
    _vdDocTmp = null;
  }
  function vd_mw(ex, timeout) {
    vd_i.vdDocument = null;
    vd_cz.vd_eP.end();
    vd_rv();
    vd_i.vd_sY(1000 + timeout);
    vd_cz.vd_cI(
      vdConst.Err_LoadFile,
      1000 + timeout,
      ex ? ex.message : vd_i.vd_ix
    );
  }
  this.vd_sY = function (vd_II) {
    var vd_bU = vd_i.vd_vc;
    vd_i.vd_vc = undefined;
    if (vd_bU) vd_bU({ vdcanvas: vd_cz, errorcode: vd_II });
  };
  function progress(i) {
    vd_cz.vd_eP.Progress(i, 100);
  }
  function vd_AU() {
    if (!_vdDocument) {
      vd_mw(null, -1101);
      return;
    }
    vd_cz.vd_eP.end();
    vd_i.vdDocument = _vdDocument;
    vd_GW();
  }
  function vd_rv() {
    vd_BS();
    vd_mO = null;
    _vdDocument = null;
    vd_lV = 0;
    vd_rn = false;
  }
  function vd_Kf(vd_EN, codetype) {
    var vd_gd = document.getElementsByTagName("head")[0];
    var js1 = document.createElement("script");
    js1.setAttribute("type", "text/javascript");
    if (codetype === 0) {
      js1.setAttribute("src", vd_EN);
      vd_i.vd_ix = decodeURI(js1.src);
      document._lc = vd_i.vd_ix;
    } else {
      js1.innerHTML = vd_EN;
    }
    vd_gd.appendChild(js1);
    vd_dg.push(js1);
    js1.onerror = function (e) {
      vd_BW(e);
      vd_mw(null, 1000);
    };
    js1.onreadystatechange = function (e) {
      if (
        e.readyState == "loaded" ||
        e.readyState == "complete" ||
        e.target.readyState == "loaded" ||
        e.target.readyState == "complete"
      ) {
        e.readyState = "complete";
        vd_BW(e);
        if (_vdDocTmp) {
          vd_BI(_vdDocTmp);
        }
      }
    };
    js1.onload = function (e) {
      e.readyState = "complete";
      e.target.onreadystatechange(e);
    };
  }
  this.vd_Ee = function () {
    return vd_rn;
  };
  this.LoadDocument = function (vd_bN, vd_ku, vd_iC, vd_kR) {
    if (vd_rn) return;
    vd_rn = true;
    vd_i.Empty();
    if (!vd_iC) vd_iC = vd_cz.redraw;
    vd_cz.vd_eP.start(vd_cz.MessagesDictionary.PROGRESS_READ_DRAWING, true);
    vd_mO = vd_iC;
    vd_i.vd_gE = vd_i.vd_DQ;
    vd_i.vd_vj = false;
    vd_i.FileName = vd_bN;
    vd_i.vd_ix = vd_bN;
    document._p = progress;
    document._l = vd_AU;
    document._e = vd_mw;
    document._d = vd_BI;
    var _url = vd_bN;
    if (vd_ku) _url += "?timestamp=" + new Date().getTime();
    if (vd_kR && vd_kR != "") {
      var l = document.createElement("a");
      l.href = vd_bN;
      document._lc = decodeURI(l.href);
      vd_i.vd_ix = document._lc;
      eval(vd_kR);
    } else {
      vd_Kf(_url, 0);
    }
  };
  function __a(vd_dG, r, w) {
    try {
      progress(vdgeo.vd_r((100 * r) / vd_dG.length));
      if (r == vd_dG.length) {
        vd_AE();
        w = undefined;
        return;
      }
      for (var c = 0; c < vd_dG[r].length; c++) {
        var entry = "";
        var k = vd_dG[r][c];
        if (r === 0 && c === 0) {
          w = String.fromCharCode(k);
          vd_kW = w;
          continue;
        }
        if (vd_dZ[k]) {
          entry = vd_dZ[k];
        } else {
          if (k === vd_dZ.length) {
            entry = w + w.charAt(0);
          } else {
            vd_kW = undefined;
            w = undefined;
            vd_AE();
            return;
          }
        }
        vd_kW += entry;
        vd_dZ.push(w + entry.charAt(0));
        w = entry;
        entry = undefined;
      }
      vd_dG[r].length = 0;
      vd_dG[r] = null;
      r++;
    } catch (ex) {
      vd_mw(ex, r);
      return;
    }
    setTimeout(function () {
      __a(vd_dG, r, w);
    }, 0);
  }
  var vd_kW = undefined;
  var vd_dZ = undefined;
  function vd_BI(vd_dG) {
    var w,
      r = 0;
    vd_kW = undefined;
    vd_dZ = [];
    for (var i = 0; i < 256; i += 1) vd_dZ[i] = String.fromCharCode(i);
    r = 0;
    setTimeout(function () {
      __a(vd_dG, r, w);
    }, 0);
  }
  return this;
}
function vd_Bq(vd_zc, vd_eE, vd_iN, prefix, vd_re) {
  var vd_i = this;
  var vd_Ew = {};
  var vd_DP = {};
  var vd_EC = {};
  var vd_Ca = {};
  var vd_BV = {};
  var vd_Fo = {};
  var vd_FN = {};
  function vd_mZ(vd_bx, dict) {
    var i;
    var tbl;
    var hid;
    for (i = 0; i < vd_bx.Items.length; i++) {
      hid = vd_bx.Items[i];
      tbl = vd_eE[hid];
      dict[tbl.Name] = tbl;
    }
  }
  function vd_Kl() {
    if (!prefix)
      prefix = "XREF_" + vdConst.vd_GZ(vd_zc.pathname).replace(".", "_");
    if (!vd_re) vd_re = "";
    if (!(vd_iN & vdConst.MERGEFLAGS_USEDESTEXISTINGTABLES)) return;
    vd_mZ(vd_eE.Layers, vd_DP);
    vd_mZ(vd_eE.LineTypes, vd_EC);
    vd_mZ(vd_eE.Images, vd_Ca);
    vd_mZ(vd_eE.TextStyles, vd_BV);
    vd_mZ(vd_eE.HatchPatterns, vd_Fo);
    vd_mZ(vd_eE.Blocks, vd_FN);
  }
  vd_Kl();
  this.vd_sd = function (obj) {
    if (null == obj) return obj;
    if (typeof obj == "string" && obj.substr(0, 2) == "h_") {
      return vd_Oo(obj);
    }
    if ("object" != typeof obj) return obj;
    var copy = obj.constructor();
    if (obj == null) return obj;
    for (var attr in obj) {
      if (typeof obj[attr] == "function") continue;
      if (
        obj.hasOwnProperty(attr) &&
        (attr === "FontFileVDS" ||
          (vdConst.vd_zx.indexOf(attr) === -1 &&
            vd_dm.vd_zU.indexOf(attr) === -1))
      ) {
        copy[attr] = vd_i.vd_sd(obj[attr]);
      }
    }
    return copy;
  };
  function vd_Oo(vd_yd) {
    var tbl = vd_Ew[vd_yd];
    if (tbl) return tbl;
    var vd_cg = vd_zc[vd_yd];
    if (!vd_cg) return undefined;
    var vd_eh;
    var vd_fO;
    if (vd_cg._t == vdConst.vdLayer_code) {
      vd_eh = vd_DP[vd_cg.Name];
    } else if (vd_cg._t == vdConst.vdLineType_code) {
      vd_eh = vd_EC[vd_cg.Name];
    } else if (vd_cg._t == vdConst.vdImageDef_code) {
      vd_eh = vd_Ca[vd_cg.Name];
    } else if (vd_cg._t == vdConst.vdTextstyle_code) {
      vd_eh = vd_BV[vd_cg.Name];
    } else if (vd_cg._t == vdConst.vdHatchPattern_code) {
      vd_eh = vd_Fo[vd_cg.Name];
    } else if (vd_cg._t == vdConst.vdBlock_code) {
      vd_eh = vd_FN[vd_cg.Name];
    }
    if (vd_eh) vd_fO = "h_" + vd_eh.HandleId.toString();
    else {
      vd_eh = vd_i.vd_sd(vd_cg);
      vd_eh.HandleId = vdConst.vd_vJ(vd_eE);
      vd_fO = "h_" + vd_eh.HandleId.toString();
      vd_Ew[vd_yd] = vd_fO;
      vd_eE[vd_fO] = vd_eh;
      var vd_kH = false;
      if (vd_cg._t == vdConst.vdLayer_code) {
        vd_kH = true;
        vd_eE.Layers.Items.push(vd_fO);
      } else if (vd_cg._t == vdConst.vdLineType_code) {
        vd_kH = true;
        vd_eE.LineTypes.Items.push(vd_fO);
      } else if (vd_cg._t == vdConst.vdImageDef_code) {
        vd_kH = true;
        vd_eE.Images.Items.push(vd_fO);
      } else if (vd_cg._t == vdConst.vdTextstyle_code) {
        vd_kH = true;
        vd_eE.TextStyles.Items.push(vd_fO);
      } else if (vd_cg._t == vdConst.vdHatchPattern_code) {
        vd_kH = true;
        vd_eE.HatchPatterns.Items.push(vd_fO);
      } else if (vd_cg._t == vdConst.vdBlock_code) {
        vd_kH = true;
        vd_eE.Blocks.Items.push(vd_fO);
      }
      if (
        vd_kH &&
        !(vd_iN & vdConst.MERGEFLAGS_USEDESTEXISTINGTABLES) &&
        vd_eh.Name
      ) {
        var vd_EH = prefix + "#" + vd_eh.Name;
        if (vd_re) vd_EH += "#" + vd_re;
        vd_eh.Name = vd_EH;
      }
    }
    return vd_fO;
  }
  return this;
}
var vd_yo = {};
vd_yo.vd_Go = function (vd_zQ) {
  var block = vd_zQ.Block;
  var vd_wy = vd_zQ.documentdata.vdDocument;
  if (!block || !block.vd_iN || !vd_wy) return false;
  var vd_C = vdcanvas.GetDocument();
  block.Entities = new vd_Bq(
    vd_wy,
    vd_C,
    block.vd_iN,
    "XREF_" + block.Name + "_" + block.HandleId.toString()
  ).vd_sd(vd_wy.Model.Entities);
  block.vd_iN = undefined;
  block.ExternalReference = null;
  block.ExternalReferencePath = "";
  return true;
};
function vd_Mu() {
  var vd_i = this;
  var vd_gz = [];
  this.AttachCanvas = function (vd_ik, width, height, vd_bT) {
    vd_i.DettachCanvas(vd_ik);
    var vd_yL = new vdraw();
    vd_yL.Init(vd_ik, width, height, vd_bT);
    vd_gz.push(vd_yL);
    return vd_yL;
  };
  this.DettachCanvas = function (vd_ik) {
    var id = -1;
    for (var i = 0; i < vd_gz.length; i++) {
      if (vd_gz[i].canvas.id === vd_ik) {
        vd_gz[i].vd_JO();
        id = i;
        break;
      }
    }
    if (id === -1) return;
    vd_gz.splice(id, 1);
  };
  this.vdrawObject = function (vd_ik) {
    if (!vd_ik) {
      if (vd_gz.length > 0) return vd_gz[vd_gz.length - 1];
      return null;
    }
    for (var i = 0; i < vd_gz.length; i++) {
      if (vd_gz[i].canvas.id === vd_ik) return vd_gz[i];
    }
    return null;
  };
  return this;
}
var vdmanager = new vd_Mu();
var vd_q = {};
vd_q.vd_Bn = new vddimmanager();
vd_q.vd_ef = function (mat, entity, vdcanvas) {
  if (vdgeo.vd_wY(mat)) return;
  if (entity._t === vdConst.vdLine_code) vd_q.vd_Km(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdPolyline_code)
    vd_q.vd_Mr(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdText_code) vd_q.vd_wB(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdRect_code) vd_q.vd_EB(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdCircle_code)
    vd_q.vd_LS(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdEllipse_code)
    vd_q.vd_Jf(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdArc_code) vd_q.vd_Md(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdImage_code)
    vd_q.vd_EB(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdInsert_code)
    vd_q.vd_IR(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vd3DFace_code)
    vd_q.vd_Mw(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdPolyface_code)
    vd_q.vd_Ko(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdAttrib_code)
    vd_q.vd_wB(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdAttribDef_code)
    vd_q.vd_wB(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdInfinityLine_code)
    vd_q.vd_JZ(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdPoint_code)
    vd_q.vd_Ld(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdPointCloud_code)
    vd_q.vd_KP(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdPolyhatch_code)
    vd_q.vd_Mh(mat, entity, vdcanvas);
  else if (entity._t === vdConst.vdDimension_code)
    vd_q.vd_Bn.vd_Bk(mat, entity, vdcanvas);
  else if (entity.Explode != undefined) vd_q.vd_AX(mat, entity, vdcanvas);
  if (vdcanvas) vdcanvas.UpdateFig(entity);
};
vd_q.vd_kG = function (mat, vd_fT, vdcanvas) {
  if (vd_fT.Thickness) {
    vd_fT.Thickness = vd_fT.Thickness * vdgeo.vd_rN(mat)[2];
  }
  if (!vd_fT.ExtrusionVector) vd_fT.ExtrusionVector = [0, 0, 1];
  vd_fT.ExtrusionVector = vdgeo.vd_lt(
    mat,
    vd_fT.ExtrusionVector[0],
    vd_fT.ExtrusionVector[1],
    vd_fT.ExtrusionVector[2],
    true
  );
};
vd_q.vd_dj = function (mat, figure, vdcanvas) {
  if (figure.PenWidth) {
    figure.PenWidth = figure.PenWidth * vd_q.vd_pl(mat);
  }
};
vd_q.vd_pP = function (mat, entity, vdcanvas) {
  if (!entity.HatchProperties) return;
  if (!vdgeo.vd_oN(mat)) {
    var scale = vd_q.vd_pl(mat);
    var rotation = vdgeo.GetAngle(vdgeo.newpoint(0, 0, 0), vdgeo.vd_jG(mat));
    if (!entity.HatchProperties.HatchAngle)
      entity.HatchProperties.HatchAngle = 0;
    entity.HatchProperties.HatchAngle =
      entity.HatchProperties.HatchAngle + rotation;
    if (!entity.HatchProperties.HatchScale)
      entity.HatchProperties.HatchScale = 1;
    entity.HatchProperties.HatchScale =
      entity.HatchProperties.HatchScale * scale;
  }
};
vd_q.vd_Km = function (mat, line, vdcanvas) {
  line.StartPoint = vdgeo.matrixtransform(mat, line.StartPoint);
  line.EndPoint = vdgeo.matrixtransform(mat, line.EndPoint);
  vd_q.vd_dj(mat, line, vdcanvas);
};
vd_q.vd_Md = function (mat, arc, vdcanvas) {
  arc.Center = vdgeo.matrixtransform(mat, arc.Center);
  arc.Radius = arc.Radius * vd_q.vd_pl(mat);
  if (!arc.StartAngle) arc.StartAngle = 0.0;
  if (!arc.EndAngle) arc.EndAngle = 0.0;
  if (vdgeo.vd_oN(mat)) {
    var tmp = arc.StartAngle;
    arc.StartAngle = vdgeo.VD_TWOPI - arc.EndAngle;
    arc.EndAngle = vdgeo.VD_TWOPI - tmp;
  }
  var vd_eo = vdgeo.vd_nF(mat);
  arc.StartAngle = arc.StartAngle + vd_eo;
  arc.EndAngle = arc.EndAngle + vd_eo;
  vd_q.vd_pP(mat, arc, vdcanvas);
  vd_q.vd_kG(mat, arc, vdcanvas);
  vd_q.vd_dj(mat, arc, vdcanvas);
};
vd_q.vd_LS = function (mat, circle, vdcanvas) {
  circle.Center = vdgeo.matrixtransform(mat, circle.Center);
  circle.Radius = circle.Radius * vd_q.vd_pl(mat);
  vd_q.vd_pP(mat, circle, vdcanvas);
  vd_q.vd_kG(mat, circle, vdcanvas);
  vd_q.vd_dj(mat, circle, vdcanvas);
};
vd_q.vd_GI = function (ellipse, vdcanvas) {
  var tmp;
  if (ellipse.MinorLength > ellipse.MajorLength) {
    tmp = ellipse.MajorLength;
    ellipse.MajorLength = ellipse.MinorLength;
    ellipse.MinorLength = tmp;
    ellipse.MajorAngle = ellipse.MajorAngle + vdgeo.vdgeo.VD_TWOPI;
    ellipse.StartAngle = ellipse.StartAngle - vdgeo.HALF_PI;
    vd_OO.EndAngle = ellipse.EndAngle - vdgeo.HALF_PI;
    ellipse.MajorAngle = vdgeo.FixAngle(ellipse.MajorAngle);
    ellipse.StartAngle = vdgeo.FixAngle(ellipse.StartAngle);
    ellipse.EndAngle = vdgeo.FixAngle(ellipse.EndAngle);
  }
};
vd_q.vd_Jf = function (mat, ellipse, vdcanvas) {
  if (!ellipse.MajorAngle) ellipse.MajorAngle = 0.0;
  if (!ellipse.StartAngle) ellipse.StartAngle = 0.0;
  if (!ellipse.EndAngle) ellipse.EndAngle = 0.0;
  ellipse.Center = vdgeo.matrixtransform(mat, ellipse.Center);
  var vd_eT = vdgeo.vd_rN(mat);
  ellipse.MajorLength *= vd_eT[X];
  ellipse.MinorLength *= vd_eT[Y];
  if (vdgeo.vd_oN(mat)) {
    var tmp = ellipse.StartAngle;
    ellipse.StartAngle = vdgeo.VD_TWOPI - ellipse.EndAngle;
    ellipse.EndAngle = vdgeo.VD_TWOPI - tmp;
  }
  var vd_eo = vdgeo.vd_nF(mat);
  ellipse.StartAngle = ellipse.StartAngle + vd_eo;
  ellipse.EndAngle = ellipse.EndAngle + vd_eo;
  ellipse.MajorAngle += vd_eo;
  vd_q.vd_GI(ellipse, vdcanvas);
  vd_q.vd_pP(mat, ellipse, vdcanvas);
  vd_q.vd_kG(mat, ellipse, vdcanvas);
  vd_q.vd_dj(mat, ellipse, vdcanvas);
};
vd_q.vd_EB = function (mat, rect, vdcanvas) {
  if (!rect.Rotation) rect.Rotation = 0.0;
  if (!rect.ExtrusionVector) rect.ExtrusionVector = [0, 0, 1];
  var vd_cw = vdgeo.vd_Bp(
    mat,
    rect.InsertionPoint,
    rect.Rotation,
    rect.Width,
    rect.Height,
    rect.Thickness ? rect.Thickness : 1.0,
    rect.ExtrusionVector
  );
  rect.Width = vd_cw.sx;
  rect.Height = vd_cw.sy;
  rect.Rotation = vd_cw.zrot;
  rect.InsertionPoint = [vd_cw.x, vd_cw.y, vd_cw.z];
  rect.ExtrusionVector = vd_cw.dir;
  if (rect.Thickness) rect.Thickness = vd_cw.sz;
  vd_q.vd_pP(mat, rect, vdcanvas);
  vd_q.vd_dj(mat, rect, vdcanvas);
};
vd_q.vd_JZ = function (mat, vd_jC, vdcanvas) {
  vd_jC.BasePoint = vdgeo.matrixtransform(mat, vd_jC.BasePoint);
  if (vd_jC.Direction)
    vd_jC.Direction = vdgeo.vd_lt(
      mat,
      vd_jC.Direction[0],
      vd_jC.Direction[1],
      vd_jC.Direction[2]
    );
  vd_q.vd_kG(mat, vd_jC, vdcanvas);
  vd_q.vd_dj(mat, vd_jC, vdcanvas);
};
vd_q.vd_Mr = function (mat, polyline, vdcanvas) {
  polyline.VertexList.Items = vdgeo.vd_rQ(mat, polyline.VertexList.Items);
  vd_q.vd_pP(mat, polyline, vdcanvas);
  vd_q.vd_kG(mat, polyline, vdcanvas);
  vd_q.vd_dj(mat, polyline, vdcanvas);
};
vd_q.vd_wB = function (mat, text, vdcanvas) {
  if (!text.WidthFactor) text.WidthFactor = 1.0;
  if (!text.Rotation) text.Rotation = 0.0;
  var vd_eT = vdgeo.vd_rN(mat);
  var vd_eo = vdgeo.vd_nF(mat);
  text.InsertionPoint = vdgeo.matrixtransform(mat, text.InsertionPoint);
  if (text.Flag == vdConst.VdConstTextstyle_BACKWARD) vd_eo -= vdgeo.PI;
  text.Rotation += vdgeo.FixAngle(vd_eo);
  if (!vdgeo.AreEqual(vd_eT[Y], 1.0, vdgeo.DefaultLinearEquality))
    text.Height *= Math.abs(vd_eT[Y]);
  if (
    text.WidthFactor &&
    !(
      vdgeo.AreEqual(vd_eT[Y], 1.0, vdgeo.DefaultLinearEquality) &&
      vdgeo.AreEqual(vd_eT[X], 1.0, vdgeo.DefaultScaleEquality)
    )
  )
    text.WidthFactor *= Math.abs(vd_eT[X] / vd_eT[Y]);
  if (text.AlignmentPoint)
    text.AlignmentPoint = vdgeo.matrixtransform(mat, text.AlignmentPoint);
  vd_q.vd_kG(mat, text, vdcanvas);
  vd_q.vd_dj(mat, text, vdcanvas);
};
vd_q.vd_IR = function (mat, vd_ah, vdcanvas) {
  var i = 0;
  if (vd_ah.Attributes) {
    for (i = 0; i < vd_ah.Attributes.Items.length; i++) {
      var vd_BE = vd_ah.Attributes.Items[i];
      if (vd_BE.IsConstant) continue;
      vd_q.vd_ef(mat, vd_BE, vdcanvas);
    }
  }
  if (!vd_ah.ExtrusionVector) vd_ah.ExtrusionVector = [0, 0, 1];
  if (!vd_ah.Xscale) vd_ah.Xscale = 1.0;
  if (!vd_ah.Yscale) vd_ah.Yscale = 1.0;
  if (!vd_ah.Zscale) vd_ah.Zscale = 1.0;
  if (!vd_ah.Rotation) vd_ah.Rotation = 0.0;
  if (!vd_ah.RowDist) vd_ah.RowDist = 0;
  if (!vd_ah.ColumnDist) vd_ah.ColumnDist = 0;
  var vd_cw = vdgeo.vd_Bp(
    mat,
    vd_ah.InsertionPoint,
    vd_ah.Rotation,
    1,
    1,
    1,
    vd_ah.ExtrusionVector
  );
  vd_ah.Xscale *= vd_cw.sx;
  vd_ah.Yscale *= vd_cw.sy;
  vd_ah.Zscale *= vd_cw.sz;
  vd_ah.Rotation = vd_cw.zrot;
  vd_ah.InsertionPoint = [vd_cw.x, vd_cw.y, vd_cw.z];
  vd_ah.ExtrusionVector = vd_cw.dir;
  vd_ah.RowDist *= vd_cw.sy;
  vd_ah.ColumnDist *= vd_cw.sx;
  vd_q.vd_dj(mat, vd_ah, vdcanvas);
};
vd_q.vd_Mw = function (mat, vd_uC, vdcanvas) {
  vd_uC.VertexList.Items = vdgeo.vd_eq(mat, vd_uC.VertexList.Items);
  vd_q.vd_dj(mat, vd_uC, vdcanvas);
};
vd_q.vd_Ko = function (mat, vd_wQ, vdcanvas) {
  vd_wQ.VertexList.Items = vdgeo.vd_eq(mat, vd_wQ.VertexList.Items);
  vd_q.vd_dj(mat, vd_wQ, vdcanvas);
};
vd_q.vd_Ld = function (mat, vd_ej, vdcanvas) {
  vd_ej.InsertionPoint = vdgeo.matrixtransform(mat, vd_ej.InsertionPoint);
  if (!vd_ej.ExtrusionVector) vd_ej.ExtrusionVector = [0, 0, 1];
  vd_ej.ExtrusionVector = vdgeo.vd_lt(
    mat,
    vd_ej.ExtrusionVector[0],
    vd_ej.ExtrusionVector[1],
    vd_ej.ExtrusionVector[2],
    true
  );
  vd_q.vd_dj(mat, vd_ej, vdcanvas);
};
vd_q.vd_KP = function (mat, vd_ej, vdcanvas) {
  if (vd_ej.ECSMatrix == undefined) vd_ej.ECSMatrix = vdgeo.vd_Q();
  vdgeo.vd_cW(vd_ej.ECSMatrix, mat);
  vd_q.vd_dj(mat, vd_ej, vdcanvas);
};
vd_q.vd_Mh = function (mat, vd_pb, vdcanvas) {
  var temp;
  var i = 0,
    j = 0;
  for (i = 0; i < vd_pb.Curves.Items.length; i++) {
    temp = vd_pb.Curves.Items[i];
    for (j = 0; j < temp.Items.length; j++)
      temp.Items[j] = vdgeo.matrixtransform(mat, temp.Items[j]);
  }
  for (i = 0; i < vd_pb.OutLines.Items.length; i++) {
    temp = vd_pb.OutLines.Items[i];
    for (j = 0; j < temp.Items.length; j++)
      temp.Items[j] = vdgeo.matrixtransform(mat, temp.Items[j]);
  }
  vd_q.vd_kG(mat, vd_pb, vdcanvas);
  vd_q.vd_dj(mat, vd_pb, vdcanvas);
};
vd_q.vd_AX = function (mat, entity, vdcanvas) {
  var i = 0;
  for (i = 0; i < entity.Explode.Items.length; i++) {
    vd_q.vd_ef(mat, entity.Explode.Items[i], vdcanvas);
  }
  vd_q.vd_dj(mat, entity, vdcanvas);
};
vd_q.vd_pl = function (mat) {
  var vd_eT = vdgeo.vd_rN(mat);
  if (
    vdgeo.AreEqual(
      Math.abs(vd_eT[0]),
      Math.abs(vd_eT[1]),
      vdgeo.DefaultVectorEquality
    )
  )
    return vd_eT[0];
  return 1.0;
};
var vd_N = {};
vd_N.update = function (entity) {
  if (entity.vd_d) entity.vd_d = undefined;
};
vd_N.vd_hn = function (entity) {
  if (!entity) return null;
  if (entity._t === vdConst.vdLine_code) return vd_N.vd_Hn(entity);
  else if (entity._t === vdConst.vdPolyline_code) return vd_N.vd_Hx(entity);
  else if (entity._t === vdConst.vdText_code) return vd_N.vd_xQ(entity);
  else if (entity._t === vdConst.vdRect_code) return vd_N.vd_Dk(entity);
  else if (entity._t === vdConst.vdImage_code) return vd_N.vd_Dk(entity);
  else if (entity._t === vdConst.vdInsert_code) return vd_N.vd_Hz(entity);
  else if (entity._t === vdConst.vdAttrib_code) return vd_N.vd_xQ(entity);
  else if (entity._t === vdConst.vdAttribDef_code) return vd_N.vd_xQ(entity);
  else if (entity._t === vdConst.vdPoint_code) return vd_N.vd_GV(entity);
  else if (entity._t === vdConst.vdCircle_code) return vd_N.vd_HA(entity);
  else if (entity._t === vdConst.vdArc_code) return vd_N.vd_It(entity);
  else if (entity._t === vdConst.vdEllipse_code) return vd_N.vd_GU(entity);
  else if (entity._t === vdConst.vdNote_code) return entity.vd_hn();
  return null;
};
vd_N.vd_HA = function (entity) {
  if (entity.vd_d === undefined) {
    entity.vd_d = [
      entity.Center,
      vdgeo.pointPolar(entity.Center, 0, entity.Radius),
      vdgeo.pointPolar(entity.Center, vdgeo.HALF_PI, entity.Radius),
      vdgeo.pointPolar(entity.Center, vdgeo.HALF_PI * 2, entity.Radius),
      vdgeo.pointPolar(entity.Center, vdgeo.HALF_PI * 3, entity.Radius),
    ];
  }
  return entity.vd_d;
};
vd_N.vd_It = function (entity) {
  if (entity.vd_d === undefined) {
    entity.vd_d = [
      entity.Center,
      vdgeo.pointPolar(entity.Center, entity.StartAngle, entity.Radius),
      vdgeo.pointPolar(entity.Center, entity.EndAngle, entity.Radius),
      vdgeo.pointPolar(
        entity.Center,
        vdgeo.FixAngle(
          entity.StartAngle +
            vdgeo.FixAngle(entity.EndAngle - entity.StartAngle) / 2
        ),
        entity.Radius
      ),
    ];
  }
  return entity.vd_d;
};
vd_N.vd_GU = function (entity) {
  if (entity.vd_d === undefined) {
    entity.vd_d = [
      entity.Center,
      vdgeo.pointPolar(entity.Center, entity.MajorAngle, entity.MajorLength),
      vdgeo.pointPolar(
        entity.Center,
        entity.MajorAngle + vdgeo.HALF_PI,
        entity.MinorLength
      ),
      vdgeo.pointPolar(
        entity.Center,
        entity.MajorAngle + vdgeo.PI,
        entity.MajorLength
      ),
      vdgeo.pointPolar(
        entity.Center,
        entity.MajorAngle - vdgeo.HALF_PI,
        entity.MinorLength
      ),
    ];
  }
  return entity.vd_d;
};
vd_N.vd_Hn = function (entity) {
  if (entity.vd_d === undefined) {
    entity.vd_d = [entity.StartPoint, entity.EndPoint];
  }
  return entity.vd_d;
};
vd_N.vd_Hx = function (entity) {
  if (entity.vd_d === undefined) {
    entity.vd_d = [];
    for (var i = 0; i < entity.VertexList.Items.length; i++) {
      entity.vd_d.push(entity.VertexList.Items[i]);
    }
  }
  return entity.vd_d;
};
vd_N.vd_xQ = function (entity) {
  if (entity.vd_d === undefined) {
    entity.vd_d = [entity.InsertionPoint];
  }
  return entity.vd_d;
};
vd_N.vd_Dk = function (entity) {
  if (entity.vd_d === undefined) {
    entity.vd_d = [];
    entity.vd_d.push(entity.InsertionPoint);
    var pw = vdgeo.pointPolar(
      entity.InsertionPoint,
      entity.Rotation,
      entity.Width
    );
    var pwh = vdgeo.pointPolar(
      pw,
      entity.Rotation + vdgeo.HALF_PI,
      entity.Height
    );
    entity.vd_d.push(pwh);
  }
  return entity.vd_d;
};
vd_N.vd_Hz = function (entity) {
  if (entity.vd_d === undefined) {
    entity.vd_d = [entity.InsertionPoint];
  }
  return entity.vd_d;
};
vd_N.vd_GV = function (entity) {
  if (entity.vd_d === undefined) {
    entity.vd_d = [entity.InsertionPoint];
  }
  return entity.vd_d;
};
vd_N.vd_lK = function (entity, indexes, offset, vdcanvas) {
  var ret = false;
  if (entity._t === vdConst.vdLine_code)
    ret = vd_N.vd_Nf(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdPolyline_code)
    ret = vd_N.vd_Oh(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdText_code)
    ret = vd_N.vd_tX(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdRect_code)
    ret = vd_N.vd_Gu(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdImage_code)
    ret = vd_N.vd_Gu(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdInsert_code)
    ret = vd_N.vd_NC(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdAttrib_code)
    ret = vd_N.vd_tX(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdAttribDef_code)
    ret = vd_N.vd_tX(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdPoint_code)
    ret = vd_N.vd_Nc(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdCircle_code)
    ret = vd_N.vd_MM(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdArc_code)
    ret = vd_N.vd_ME(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdEllipse_code)
    ret = vd_N.vd_Ne(entity, indexes, offset, vdcanvas);
  else if (entity._t === vdConst.vdNote_code)
    ret = entity.vd_lK(indexes, offset, vdcanvas);
  return ret;
};
vd_N.vd_nY = function (entity, indexes, offset, vdcanvas) {
  var ret = false;
  var vd_d = vd_N.vd_hn(entity);
  for (var i = 0; i < indexes.length; i++) {
    vd_d[indexes[i]][X] += offset[X];
    vd_d[indexes[i]][Y] += offset[Y];
    vd_d[indexes[i]][Z] += offset[Z];
    ret = true;
  }
  if (ret) vdcanvas.UpdateFig(entity);
  return ret;
};
vd_N.vd_Nf = function (entity, indexes, offset, vdcanvas) {
  return vd_N.vd_nY(entity, indexes, offset, vdcanvas);
};
vd_N.vd_Oh = function (entity, indexes, offset, vdcanvas) {
  return vd_N.vd_nY(entity, indexes, offset, vdcanvas);
};
vd_N.vd_tX = function (entity, indexes, offset, vdcanvas) {
  return vd_N.vd_nY(entity, indexes, offset, vdcanvas);
};
vd_N.vd_Gu = function (entity, indexes, offset, vdcanvas) {
  var ret = false;
  var vd_d = vd_N.vd_hn(entity);
  for (var i = 0; i < indexes.length; i++) {
    if (indexes[i] === 0) {
      entity.InsertionPoint[X] += offset[X];
      entity.InsertionPoint[Y] += offset[Y];
      entity.InsertionPoint[Z] += offset[Z];
      ret = true;
    } else if (indexes[i] === 1) {
      var p1 = vd_d[1];
      var p2 = [p1[X] + offset[X], p1[Y] + offset[Y], p1[Z] + offset[Z]];
      var ph = vdgeo.projectionPointOnLine(
        p2,
        entity.InsertionPoint,
        vdgeo.pointPolar(
          entity.InsertionPoint,
          entity.Rotation + vdgeo.HALF_PI,
          1.0
        )
      );
      var pw = vdgeo.projectionPointOnLine(
        p2,
        entity.InsertionPoint,
        vdgeo.pointPolar(entity.InsertionPoint, entity.Rotation, 1.0)
      );
      var aw = vdgeo.FixAngle(
        vdgeo.GetAngle(entity.InsertionPoint, pw) - entity.Rotation
      );
      var ah = vdgeo.FixAngle(
        vdgeo.GetAngle(entity.InsertionPoint, ph) - entity.Rotation
      );
      entity.Width = vdgeo.Distance3D(entity.InsertionPoint, pw);
      if (aw > vdgeo.HALF_PI) entity.Width *= -1.0;
      entity.Height = vdgeo.Distance3D(entity.InsertionPoint, ph);
      if (ah > vdgeo.PI) entity.Height *= -1.0;
      ret = true;
    }
  }
  if (ret) vdcanvas.UpdateFig(entity);
  return ret;
};
vd_N.vd_NC = function (entity, indexes, offset, vdcanvas) {
  if (indexes.length == 1 && indexes[0] === 0) {
    var mat = vdgeo.vd_Q();
    vdgeo.vd_j(mat, offset[X], offset[Y], offset[Z]);
    vd_q.vd_ef(mat, entity, vdcanvas);
    return true;
  } else {
    return vd_N.vd_nY(entity, indexes, offset, vdcanvas);
  }
};
vd_N.vd_Nc = function (entity, indexes, offset, vdcanvas) {
  return vd_N.vd_nY(entity, indexes, offset, vdcanvas);
};
vd_N.vd_MM = function (entity, indexes, offset, vdcanvas) {
  var ret = false;
  var vd_d = vd_N.vd_hn(entity);
  for (var i = 0; i < indexes.length; i++) {
    if (indexes[i] === 0) {
      entity.Center[X] += offset[X];
      entity.Center[Y] += offset[Y];
      entity.Center[Z] += offset[Z];
    } else {
      vd_d[indexes[i]][X] += offset[X];
      vd_d[indexes[i]][Y] += offset[Y];
      vd_d[indexes[i]][Z] += offset[Z];
      entity.Radius = vdgeo.Distance3D(vd_d[indexes[i]], entity.Center);
    }
    ret = true;
  }
  if (ret) vdcanvas.UpdateFig(entity);
  return ret;
};
vd_N.vd_Ne = function (entity, indexes, offset, vdcanvas) {
  var ret = false;
  var vd_d = vd_N.vd_hn(entity);
  for (var i = 0; i < indexes.length; i++) {
    if (indexes[i] === 0) {
      entity.Center[X] += offset[X];
      entity.Center[Y] += offset[Y];
      entity.Center[Z] += offset[Z];
    } else if (indexes[i] === 1 || indexes[i] === 3) {
      vd_d[indexes[i]][X] += offset[X];
      vd_d[indexes[i]][Y] += offset[Y];
      vd_d[indexes[i]][Z] += offset[Z];
      entity.MajorLength = vdgeo.Distance3D(vd_d[indexes[i]], entity.Center);
    } else if (indexes[i] === 2 || indexes[i] === 4) {
      vd_d[indexes[i]][X] += offset[X];
      vd_d[indexes[i]][Y] += offset[Y];
      vd_d[indexes[i]][Z] += offset[Z];
      entity.MinorLength = vdgeo.Distance3D(vd_d[indexes[i]], entity.Center);
    }
    ret = true;
  }
  if (ret) vdcanvas.UpdateFig(entity);
  return ret;
};
vd_N.vd_ME = function (entity, indexes, offset, vdcanvas) {
  var ret = false;
  var vd_d = vd_N.vd_hn(entity);
  for (var i = 0; i < indexes.length; i++) {
    if (indexes[i] === 0) {
      entity.Center[X] += offset[X];
      entity.Center[Y] += offset[Y];
      entity.Center[Z] += offset[Z];
      ret = true;
    } else {
      vd_d[indexes[i]][X] += offset[X];
      vd_d[indexes[i]][Y] += offset[Y];
      vd_d[indexes[i]][Z] += offset[Z];
      var arc = vdgeo.vd_IQ(vd_d[1], vd_d[2], vd_d[3]);
      if (arc != null) {
        ret = true;
        entity.Center = arc[0];
        entity.Radius = arc[1];
        entity.StartAngle = arc[2];
        entity.EndAngle = arc[3];
      }
    }
  }
  if (ret) vdcanvas.UpdateFig(entity);
  return ret;
};
vd_N.GetEntityItem = function (vdcanvas, hid) {
  if (hid.substr(0, 2) == "n_") {
    if (vdcanvas.Notes) return vdcanvas.Notes[hid];
    else return null;
  } else return vdcanvas.GetEntityItem(hid);
};
vd_N.vd_IG = function (selection, vd_oS, vd_iT, render, vdcanvas) {
  if (!selection) return;
  var vd_C = vdcanvas.GetDocument();
  if (!vd_C) return;
  vd_cY = render.vd_bF(vd_oS);
  var vd_fi = 0;
  for (var i = 0; i < selection.length; i++) {
    if (vd_fi >= vdcanvas.GripManager.MaxGrips) {
      selection.length = i;
      break;
    }
    var fig = vd_N.GetEntityItem(vdcanvas, selection[i]);
    vd_fi = vd_N.draw(fig, vd_oS, vd_iT, render, vd_C, vdcanvas, vd_fi);
  }
  render.vd_bF(vd_cY);
};
vd_N.draw = function (entity, vd_oS, vd_iT, render, vd_C, vdcanvas, vd_fi) {
  if (!entity) return 0;
  if (entity.Deleted === true) return 0;
  if (entity.visibility === 1) return 0;
  if (entity.LayerRef && vdcanvas.vd_Dj(entity.LayerRef, null, vd_C)) return 0;
  var vd_d = vd_N.vd_hn(entity);
  if (!vd_d || vd_d.length === 0) return 0;
  var ret = vd_fi;
  for (var i = 0; i < vd_d.length; i++) {
    if (ret >= vdcanvas.GripManager.MaxGrips) break;
    vd_N.vd_Jx(vd_d[i], vd_oS, vd_iT, render, vd_C, vdcanvas);
    ret++;
  }
  return ret;
};
vd_N.vd_Jx = function (pt, vd_oS, vd_iT, render, vd_C, vdcanvas) {
  var p = vdgeo.vd_cZ(pt, render.vd_fp());
  render.vd_c.vd_Kv(p[X] - vd_iT * 0.5, p[Y] - vd_iT * 0.5, vd_iT, vd_iT);
};
vd_N.vd_Hp = function (box, vd_wM, vdcanvas) {
  var ret = [];
  var items = 0;
  var left = box[0];
  var right = box[0] + box[2];
  var top = box[1];
  var bottom = box[1] + box[3];
  if (!vd_wM) return ret;
  for (var i = 0; i < vd_wM.length; i++) {
    if (items >= vdcanvas.GripManager.MaxGrips) break;
    var fig = vd_N.GetEntityItem(vdcanvas, vd_wM[i]);
    var indexes = [];
    var vd_d = vd_N.vd_hn(fig);
    if (vd_d) {
      for (var k = 0; k < vd_d.length; k++) {
        if (items >= vdcanvas.GripManager.MaxGrips) break;
        items++;
        var p = vdcanvas.WorldToPixel(vd_d[k]);
        if (p[X] >= left && p[X] <= right && p[Y] >= top && p[Y] <= bottom) {
          indexes.push(k);
        }
      }
    }
    if (indexes.length > 0) ret.push([fig, indexes]);
  }
  return ret;
};
function vd_Lw(vd_n) {
  var vd_i = this;
  var vd_xg = [0, 0, 255, 255];
  var vd_iL = 15;
  var vd_xw = 100;
  var vd_tG = true;
  var vd_rj = 0;
  this.filtergripentity = null;
  this.gripselectionchanged = null;
  this.beforemovegrip = null;
  this.aftermovegrip = null;
  this.vd_LI = function (entity) {
    var ret = true;
    if (vd_i.filtergripentity) {
      var e = { sender: vd_n, entity: entity, cancel: false };
      vd_i.filtergripentity(e);
      ret = !e.cancel;
    }
    return ret;
  };
  this.vd_sG = function () {
    if (vd_i.gripselectionchanged) vd_i.gripselectionchanged({ sender: vd_n });
  };
  this.vd_LA = function (entity, indexes, offset) {
    var ret = true;
    if (vd_i.beforemovegrip) {
      var e = {
        sender: vd_n,
        entity: entity,
        indexes: indexes,
        offset: offset,
        cancel: false,
      };
      vd_i.beforemovegrip(e);
      ret = !e.cancel;
    }
    return ret;
  };
  this.vd_Mo = function (entity, indexes, offset) {
    if (vd_i.aftermovegrip)
      vd_i.aftermovegrip({
        sender: vd_n,
        entity: entity,
        indexes: indexes,
        offset: offset,
      });
  };
  Object.defineProperty(vd_i, "MaxGrips", {
    get: function () {
      return vd_xw;
    },
    set: function (newValue) {
      vd_xw = newValue;
    },
  });
  Object.defineProperty(vd_i, "GripColor", {
    get: function () {
      return vd_xg;
    },
    set: function (newValue) {
      vd_xg = newValue;
    },
  });
  Object.defineProperty(vd_i, "GripSize", {
    get: function () {
      return vd_iL;
    },
    set: function (newValue) {
      vd_iL = Math.max(newValue, 0);
    },
  });
  Object.defineProperty(vd_i, "Enable", {
    get: function () {
      return vd_tG;
    },
    set: function (newValue) {
      vd_tG = newValue;
    },
  });
  Object.defineProperty(vd_i, "SelectMode", {
    get: function () {
      return vd_rj;
    },
    set: function (newValue) {
      vd_rj = newValue;
    },
  });
  this.count = function () {
    var vd_C = vd_n.GetDocument();
    if (!vd_C) return 0;
    if (!vd_C.vd_av) return 0;
    return vd_C.vd_av.length;
  };
  this.GetItem = function (index) {
    var vd_C = vd_n.GetDocument();
    if (!vd_C) return null;
    if (!vd_C.vd_av) return null;
    if (index < 0 || index >= vd_C.vd_av.length) return null;
    return vd_N.GetEntityItem(vd_n, vd_C.vd_av[index]);
  };
  this.GetEntityGrips = function (entity) {
    return vd_N.vd_hn(entity);
  };
  function vd_th(fig) {
    if (fig._t === vdConst.vdNote_code) return "n_" + fig.HandleId.toString();
    else return "h_" + fig.HandleId.toString();
  }
  this.AddItem = function (fig) {
    if (!vd_tG) return;
    var vd_C = vd_n.GetDocument();
    if (!vd_C) return;
    var vd_da = vd_th(fig);
    if (!vd_C.vd_av) vd_C.vd_av = [];
    var index = vd_C.vd_av.indexOf(vd_da);
    if (index == -1) vd_FL(vd_C, fig, vd_da);
  };
  this.RemoveItem = function (fig) {
    var vd_C = vd_n.GetDocument();
    if (!vd_C) return;
    var vd_da = vd_th(fig);
    if (!vd_C.vd_av) return;
    var index = vd_C.vd_av.indexOf(vd_da);
    if (index >= 0) {
      vd_C.vd_av.splice(index, 1);
      vd_i.vd_sG();
    }
  };
  this.ContainsItem = function (fig) {
    var vd_C = vd_n.GetDocument();
    if (!vd_C) return false;
    var vd_da = vd_th(fig);
    if (!vd_C.vd_av) return false;
    var index = vd_C.vd_av.indexOf(vd_da);
    return index >= 0;
  };
  this.clear = function () {
    var vd_C = vd_n.GetDocument();
    if (!vd_C) return false;
    var vd_qu = vd_C.vd_av && vd_C.vd_av.length > 0;
    vd_C.vd_av = null;
    vd_C.vd_gg = null;
    if (vd_qu) vd_i.vd_sG();
    return vd_qu;
  };
  function vd_FL(vd_C, fig, handle) {
    if (!vd_i.vd_LI(fig)) return false;
    if (vd_rj & vdConst.GRIPMODE_SINGLE) vd_C.vd_av = [];
    vd_C.vd_av.push(handle);
    vd_i.vd_sG();
    return true;
  }
  function vd_BR(fig, vd_C) {
    var vd_da = vd_th(fig);
    if (!vd_C.vd_av) vd_C.vd_av = [];
    var index = vd_C.vd_av.indexOf(vd_da);
    if (index == -1) {
      vd_FL(vd_C, fig, vd_da);
    } else {
      vd_C.vd_av.splice(index, 1);
      vd_i.vd_sG();
    }
  }
  this.vd_FY = function (vd_ib) {
    var vd_C = vd_n.GetDocument();
    if (!vd_C) return false;
    if (!vd_ib) {
      var vd_qu = vd_i.clear();
      if (vd_qu) vd_n.Refresh();
      return vd_qu;
    }
    if (!(vd_rj & vdConst.GRIPMODE_AUTO)) return false;
    if (!vd_tG) return false;
    if (vd_xw <= 0) return false;
    if (!vd_n.GetEnableSelection()) return false;
    if (vd_iL == 0) return false;
    var action = vd_n.ActiveAction();
    if (action.IsStarted()) return false;
    if (vd_ib.mousebutton != 1 && vd_ib.mousebutton != 3) return false;
    var vd_um = [vd_ib.x, vd_ib.y, vd_ib.z];
    var vd_de = [vd_ib.xPix, vd_ib.yPix];
    var box = [vd_de[X] - vd_iL / 2.0, vd_de[Y] - vd_iL / 2.0, vd_iL, vd_iL];
    vd_C.vd_gg = vd_N.vd_Hp(box, vd_C.vd_av, vd_n);
    if (vd_C.vd_gg.length > 0) {
      var vd_d = vd_N.vd_hn(vd_C.vd_gg[0][0]);
      var index = vd_C.vd_gg[0][1][0];
      vd_um = vd_d[index];
      vd_n.GetUserLine(vd_NI, vd_um);
      return true;
    } else {
      var fig = vd_n.GetEntityFromPoint(vd_de[X], vd_de[Y]);
      if (fig) {
        vd_BR(fig, vd_C);
        vd_n.Refresh();
        return true;
      } else if (vd_rj & vdConst.vd_ER && vd_ib.mousebutton == 3) {
        vd_n.GetUserRect(vd_Ok, vd_um);
        return true;
      }
    }
    return false;
  };
  function vd_Ok(action, status, evt) {
    if (status == "mouseup") {
      action.end();
      return true;
    } else if (status == "mousetimeout") {
      return true;
    } else if (status == "end" && !action.IsCanceled()) {
      var vd_C = vd_n.GetDocument();
      var p1 = vd_n.ViewToPixel(action.ResValue[0]);
      var p2 = vd_n.ViewToPixel(action.ResValue[1]);
      var ents = vd_n.GetEntitiesFromBox(
        Math.min(p1[X], p2[X]),
        Math.min(p1[Y], p2[Y]),
        Math.max(p1[X], p2[X]),
        Math.max(p1[Y], p2[Y])
      );
      if (ents) {
        for (var i = 0; i < ents.length; i++) {
          var fig = ents[i];
          vd_BR(fig, vd_C);
        }
        vd_n.Refresh();
      }
    }
  }
  function vd_NI(action, status) {
    var vd_C = vd_n.GetDocument();
    if (!vd_C) return;
    if (status == "end") {
      if (!action.IsCanceled()) {
        var offset = [
          action.ResValue[1][X] - action.ResValue[0][X],
          action.ResValue[1][Y] - action.ResValue[0][Y],
          action.ResValue[1][Z] - action.ResValue[0][Z],
        ];
        vd_n.UndoHistory().group_start();
        for (var i = 0; i < vd_C.vd_gg.length; i++) {
          var indexes = vd_C.vd_gg[i][1];
          var fig = vd_C.vd_gg[i][0];
          if (indexes.length === 0) continue;
          vd_n
            .UndoHistory()
            .store(fig, "special_movegrips", [
              indexes.concat([]),
              offset.concat([]),
            ]);
          if (vd_i.vd_LA(fig, indexes, offset)) {
            if (vd_N.vd_lK(fig, indexes, offset, vd_n))
              vd_i.vd_Mo(fig, indexes, offset);
          }
        }
        vd_n.UndoHistory().group_end();
        vd_n.UpdateLayout();
        vd_n.redraw();
      } else {
        vd_n.Refresh();
      }
    } else if (status == "draw") {
      var render = action.render;
      var offset = [
        action.vd_at()[X] - action.ReferencePoint[X],
        action.vd_at()[Y] - action.ReferencePoint[Y],
        action.vd_at()[Z] - action.ReferencePoint[Z],
      ];
      for (var i = 0; i < vd_C.vd_gg.length; i++) {
        var indexes = vd_C.vd_gg[i][1];
        var vd_LQ = vd_C.vd_gg[i][0];
        if (indexes.length === 0) continue;
        var fig = vdConst.cloneEntity(vd_LQ);
        vd_N.vd_lK(fig, indexes, offset, vd_n);
        render.vd_pd(vdConst.ActionHighLightColor);
        vd_n.DrawEntity(fig, render);
        render.vd_pB();
      }
    }
  }
  this.vd_wR = function () {
    var vd_C = vd_n.GetDocument();
    if (!vd_C) return false;
    return vd_C.vd_av && vd_C.vd_av.length > 0;
  };
  this.vd_qC = function (render) {
    var vd_C = vd_n.GetDocument();
    if (!vd_C) return;
    try {
      vd_N.vd_IG(vd_C.vd_av, vd_xg, vd_iL, render, vd_n);
    } catch (ex) {}
  };
  return this;
}
function vd_Lm(vd_C, vd_n) {
  var arr = [];
  var vd_i = Object.create(arr);
  var vd_qa = 0;
  var vd_lk = false;
  function vd_Bl(vd_bN, onfinish, vd_kO) {
    var vd_gd = document.getElementsByTagName("head")[0];
    var js1 = document.createElement("script");
    js1.setAttribute("type", "text/javascript");
    js1.setAttribute("src", vd_bN);
    vd_gd.appendChild(js1);
    try {
      js1.onerror = function (e) {
        vd_gd.removeChild(js1);
        if (onfinish) onfinish(vd_n, 1, vd_bN);
      };
      js1.onreadystatechange = function (e) {
        if (
          e.readyState == "loaded" ||
          e.readyState == "complete" ||
          e.target.readyState == "loaded" ||
          e.target.readyState == "complete"
        ) {
          e.readyState = "complete";
          vd_gd.removeChild(js1);
          if (tmpnotes) {
            vd_i.FromStreamData(tmpnotes, vd_kO);
            if (onfinish) onfinish(vd_n, 0, vd_bN);
          } else {
            if (onfinish) onfinish(vd_n, 2, vd_bN);
          }
        }
      };
      js1.onload = function (e) {
        e.readyState = "complete";
        e.target.onreadystatechange(e);
      };
    } catch (ex) {
      vd_gd.removeChild(js1);
      if (onfinish) onfinish(vd_n, 3, vd_bN);
    }
  }
  vd_i.LoadFromFile = function (vd_bN, onfinish, vd_kO, async, vd_ku) {
    tmpnotes = null;
    var _url = vd_bN;
    if (vd_ku) _url += "?timestamp=" + new Date().getTime();
    var vd_cb;
    if (window.XMLHttpRequest) {
      vd_cb = new XMLHttpRequest();
    } else {
      vd_cb = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (!vd_cb) {
      if (onfinish) onfinish(vd_n, 4, vd_bN);
      return;
    }
    try {
      vd_cb.onreadystatechange = function () {
        if (vd_cb.readyState == 4) {
          if (vd_cb.status === 200 || vd_cb.status == 0) {
            var vd_hM = vd_cb.responseText;
            if (vd_hM) {
              try {
                eval(vd_hM);
                if (tmpnotes) {
                  vd_i.FromStreamData(tmpnotes, vd_kO);
                  if (onfinish) onfinish(vd_n, 0, vd_bN);
                } else {
                  if (onfinish) onfinish(vd_n, 5, vd_bN);
                }
              } catch (ex) {
                if (onfinish) onfinish(vd_n, 6, vd_bN);
              }
            } else {
              vd_Bl(vd_bN, onfinish, vd_kO);
            }
          } else {
            if (onfinish) onfinish(vd_n, 7, vd_bN);
          }
        }
      };
      vd_cb.open("GET", _url, async ? true : false);
      vd_cb.send();
    } catch (ex) {
      vd_Bl(vd_bN, onfinish, vd_kO);
    }
  };
  vd_i.FromStreamData = function (vd_hM, vd_kO) {
    var items = vd_hM.split("'");
    if (items && items.length > 1) {
      vd_hM = items[1];
    }
    vd_hM = base64.vd_AI(vd_hM);
    if (!vd_kO) {
      vd_i.clear();
    }
    items = vd_hM.split("##");
    for (var i = 0; i < items.length; i++) {
      var note = new vd_uI();
      var vd_Lv = note.vd_Ig(items[i]);
      if (vd_Lv > 0) {
        vd_i.push(note);
        vd_CH(note);
      }
    }
    tmpnotes = null;
    vd_lk = false;
  };
  vd_i.ToStreamData = function () {
    var ret = "";
    for (var i = 0; i < vd_i.length; i++) {
      var note = vd_i[i];
      if (note.Deleted) continue;
      ret += note.toString(8) + "##";
    }
    var str = base64.vd_Kn(ret);
    return "tmpnotes ='" + str + "';";
  };
  Object.defineProperty(vd_i, "IsModified", {
    get: function () {
      return vd_lk;
    },
  });
  vd_i.clear = function () {
    for (var i = 0; i < vd_i.length; i++) {
      var note = vd_i[i];
      vd_i["n_" + note.HandleId.toString()] = undefined;
    }
    vd_qa = 0;
    vd_i.length = 0;
  };
  vd_i.AddNote = function (title, description, viewtype, origin) {
    var note = new vd_uI();
    if (title !== undefined)
      note.title = title.substr(0, vdConst.NOTE_LIMIT_TITLE);
    if (description !== undefined)
      note.description = description.substr(0, vdConst.NOTE_LIMIT_DESC);
    if (viewtype !== undefined) note.viewtype = viewtype;
    note.layout = vd_C.ActiveLayOut;
    var render = vd_n.ActiveRender();
    var vd_ks = origin;
    if (origin === undefined) {
      origin = [
        render.vd_dL + render.width / 2.0,
        render.vd_dL + render.height / 2.0,
        1.0,
      ];
      origin[Z] = render.vd_c.vd_jM(origin[X], origin[Y]);
      vd_ks = render.vd_rP(origin[X], origin[Y], origin[Z]);
    }
    note.vd_Ak(vd_ks);
    vd_i.push(note);
    vd_CH(note);
    vd_lk = true;
    return vd_i.length - 1;
  };
  function vd_CH(note) {
    if (!vd_qa) vd_qa = 0;
    vd_qa++;
    note.HandleId = vd_qa;
    vd_i["n_" + note.HandleId.toString()] = note;
  }
  vd_i.vd_qC = function (render) {
    if (vd_i.length == 0) return;
    var vd_oG = render.vdraw.vd_gh;
    render.vdraw.vd_gh = false;
    var vd_eX = render.vd_fj;
    render.vd_fj = false;
    var vd_KV = render.vdraw.GetImageInterpolationMode();
    render.vdraw.SetImageInterpolationMode(vdConst.InterpolationMode_Nearest);
    render.vd_c.vd_eR = true;
    var vd_zf = render.vd_bd;
    render.vd_bd = true;
    var vd_PD = render.vdraw.IgnoreLockLayers;
    render.vdraw.IgnoreLockLayers = true;
    render.vd_dC();
    var vd_eG = vdgeo.vd_bu(render.vd_ar());
    var vd_by = vdgeo.vd_ci(render.vd_ar());
    var vd_cY = render.vd_bF([255, 255, 255, vdConst.NOTE_TRANSPARENT]);
    render.vd_aj(vd_eG);
    try {
      for (var i = 0; i < vd_i.length; i++) {
        vd_i[i].draw(render, vd_by);
      }
    } catch (ex) {}
    render.vd_aW();
    render.vd_bF(vd_cY);
    render.vdraw.SetImageInterpolationMode(vd_KV);
    render.vdraw.IgnoreLockLayers = vd_PD;
    render.vd_bd = vd_zf;
    render.vd_fj = vd_eX;
    render.vdraw.vd_gh = vd_oG;
    render.vd_dC();
  };
  function vd_uI() {
    var vd_JI = new vdConst.vd_Fk();
    var vd_i = Object.create(vd_JI);
    vd_i.clone = function () {
      var ret = new vd_uI();
      ret.HandleId = vd_i.HandleId;
      ret.layout = vd_i.layout;
      ret.vd_il = vd_i.vd_il;
      ret.vd_gB = vd_i.vd_gB;
      ret.vd_m = vd_i.vd_m;
      ret.viewtype = vd_kP;
      ret.title = vd_mN;
      ret.vd_lD = vd_lD;
      ret.position = vd_hf;
      ret.Deleted = vd_tj;
      return ret;
    };
    vd_i.HandleId = 0;
    vd_i.layout = "h_0";
    vd_i.vd_il = [0, 0, 1];
    vd_i.vd_gB = 0.0;
    vd_i.vd_m = 0.0;
    var vd_kP = 1;
    var vd_mN = "No title";
    var vd_lD = "No description";
    var vd_hf = [0, 0, 0];
    var vd_tj = false;
    Object.defineProperty(vd_i, "ToolTip", {
      get: function () {
        return vd_mN;
      },
      vd_os: true,
    });
    Object.defineProperty(vd_i, "_t", {
      get: function () {
        return vdConst.vdNote_code;
      },
      vd_os: true,
    });
    Object.defineProperty(vd_i, "Deleted", {
      get: function () {
        return vd_tj;
      },
      set: function (vd_aM) {
        vd_lk = true;
        vd_tj = vd_aM;
      },
      vd_os: true,
      vd_rw: true,
    });
    Object.defineProperty(vd_i, "viewtype", {
      get: function () {
        return vd_kP;
      },
      set: function (vd_aM) {
        vd_lk = true;
        vd_kP = vd_aM;
      },
      vd_os: true,
      vd_rw: true,
    });
    Object.defineProperty(vd_i, "title", {
      get: function () {
        return vd_mN;
      },
      set: function (vd_aM) {
        vd_lk = true;
        vd_mN = vd_aM;
      },
      vd_os: true,
      vd_rw: true,
    });
    Object.defineProperty(vd_i, "description", {
      get: function () {
        return vd_lD;
      },
      set: function (vd_aM) {
        vd_lk = true;
        vd_lD = vd_aM;
      },
      vd_os: true,
      vd_rw: true,
    });
    Object.defineProperty(vd_i, "position", {
      get: function () {
        return vd_hf;
      },
      set: function (vd_aM) {
        vd_lk = true;
        vd_i.vd_Ak(vd_aM, true);
        vd_hf = vd_aM;
      },
      vd_os: true,
      vd_rw: true,
    });
    vd_i.vd_Ak = function (vd_ks, vd_GS) {
      if (vd_n) {
        var render = vd_n.ActiveRender();
        var vd_Dv = render.vd_ar();
        var vd_Dh = vdgeo.vd_bu(vd_Dv);
        var vd_lG = render.vd_hr;
        var vd_jy = vdgeo.vd_bu(vd_lG);
        var vd_il = vdgeo.vd_gn(vd_Dh);
        var vd_gB = vdgeo.vd_nF(vd_Dh);
        var vd_Ip = vdgeo.matrixtransform(vd_Dv, vd_ks);
        var vd_AF = vdgeo.vd_cZ(vd_Ip, vd_lG);
        var z = 1;
        z = vd_AF[Z];
        if (vd_GS || z == 1.0 || vd_ks[Z] == 0.0) {
          var vd_de = vdgeo.matrixtransform(render.vd_pm, vd_AF);
          z = render.vd_c.vd_jM(vd_de[X], vd_de[Y]);
          vd_ks = render.vd_rP(vd_de[X], vd_de[Y], z);
        }
        var p1 = vdgeo.vd_bp(0, 1, z, vd_jy);
        var p2 = vdgeo.vd_bp(0, -1, z, vd_jy);
        var vd_m = vdgeo.Distance2D(p1, p2);
        vd_i.vd_il = vd_il;
        vd_i.vd_gB = vd_gB;
        vd_i.vd_m = vd_m;
      }
      vd_hf = vd_ks;
    };
    vd_i.toString = function (precision) {
      var ret = "";
      ret += vdConst.vd_CP(vd_mN) + "^";
      ret += vdConst.vd_CP(vd_lD) + "^";
      ret += vdgeo.vd_wE(vd_hf, precision) + "^";
      ret += vdgeo.vd_wE(vd_i.vd_il, precision) + "^";
      ret += vdgeo.vd_vB(vd_i.vd_gB, precision) + "^";
      ret += vdgeo.vd_vB(vd_i.vd_m, precision) + "^";
      ret += vd_kP.toString() + "^";
      ret += vd_i.layout + "^";
      return ret;
    };
    vd_i.vd_Ig = function (str) {
      str = str.trim();
      if (str.length == 0) return 0;
      var items = str.split("^");
      var i = 0;
      if (items.length > i) {
        vd_mN = vdConst.vd_AW(items[i]);
        i++;
      } else return i;
      if (items.length > i) {
        vd_lD = vdConst.vd_AW(items[i]);
        i++;
      } else return i;
      if (items.length > i) {
        vd_hf = vdgeo.vd_wm(items[i]);
        i++;
      } else return i;
      if (items.length > i) {
        vd_i.vd_il = vdgeo.vd_wm(items[i]);
        i++;
      } else return i;
      if (items.length > i) {
        vd_i.vd_gB = Number(items[i]);
        i++;
      } else return i;
      if (items.length > i) {
        vd_i.vd_m = Number(items[i]);
        i++;
      } else return i;
      if (items.length > i) {
        vd_kP = Number(items[i]);
        i++;
      } else return i;
      if (items.length > i) {
        vd_i.layout = items[i];
        i++;
      } else return i;
      return i;
    };
    vd_i.setview = function () {
      var vd_by = vdgeo.vd_Q();
      vdgeo.vd_hh(vd_by, vd_i.vd_il);
      vdgeo.vd_ap(vd_by, vdgeo.VD_TWOPI - vd_i.vd_gB);
      var vd_cM = vdgeo.matrixtransform(vd_by, vd_hf);
      vd_C.ActiveLayOut = vd_i.layout;
      var vd_jT = vd_n.GetActiveLayout();
      var offset =
        (vd_i.vd_m * 0.5) /
        Math.tan(vdgeo.DegreesToRadians(vd_jT.LensAngle / 2.0));
      vd_cM[Z] += offset;
      vd_jT.World2ViewMatrix = vd_by;
      vd_jT.ViewCenter = vd_cM;
      vd_jT.ViewSize = vd_i.vd_m;
      setTimeout(vd_n.redraw);
    };
    vd_i.vd_hn = function () {
      return [vd_hf];
    };
    vd_i.vd_lK = function (indexes, offset) {
      for (var i = 0; i < indexes.length; i++) {
        if (indexes[i] === 0) {
          var pt = [0, 0, 0];
          vdgeo.vd_aZ(pt, vd_hf);
          pt[X] += offset[X];
          pt[Y] += offset[Y];
          pt[Z] += offset[Z];
          vd_i.vd_Ak(pt, true);
          return true;
        }
      }
      return false;
    };
    vd_i.vd_Mf = function (render) {
      var vd_eG = vdgeo.vd_bu(render.vd_ar());
      var vd_by = vdgeo.vd_ci(render.vd_ar());
      var vd_cY = render.vd_bF([255, 255, 255, vdConst.NOTE_TRANSPARENT]);
      render.vd_aj(vd_eG);
      vd_i.draw(render, vd_by);
      render.vd_aW();
      render.vd_bF(vd_cY);
    };
    vd_i.draw = function (render, vd_by) {
      if (!render.vdraw || vd_kP <= 0 || vd_tj) return;
      if (!vd_i.layout || vd_i.layout == "h_0")
        vd_i.layout = "h_" + vd_C.Model.HandleId.toString();
      var vd_FQ = "h_0";
      var vd_jT = render.vdraw.GetActiveLayout();
      if (vd_jT) vd_FQ = "h_" + vd_jT.HandleId.toString();
      if (vd_FQ !== vd_i.layout) return;
      var vd_do = vd_hf;
      var vd_cM = vdgeo.matrixtransform(vd_by, vd_do);
      var vd_pf = vdgeo.vd_cZ(vd_cM, render.vd_cC);
      var vd_tm = vdConst.vd_CO.vd_LP((vd_kP - 1) % 4, render.vdraw.Refresh);
      if (
        vd_tm != null &&
        vd_tm.bytes &&
        render.vd_c.vd_Pb(vd_pf[X], vd_pf[Y], vd_pf[Z], false, 0.001)
      ) {
        vd_tm.isNoteIcon = true;
        var vd_zf = render.vd_bd;
        render.vd_bd = false;
        render.vd_nD(vd_i);
        var size = (render.pixelsize * vdConst.NOTE_SIZE) / 2.0;
        var z = vd_cM[Z];
        if (render.vd_bO) {
          var vd_lG = render.vd_hr;
          var vd_jy = vdgeo.vd_bu(vd_lG);
          var p1 = vdgeo.vd_bp(0, 1, vd_pf[Z], vd_jy);
          var p2 = vdgeo.vd_bp(0, -1, vd_pf[Z], vd_jy);
          var vd_m = vdgeo.Distance2D(p1, p2);
          size = ((vd_m / render.height) * vdConst.NOTE_SIZE) / 2.0;
        }
        var pts = [
          [vd_cM[X] - size, vd_cM[Y] - size, z],
          [vd_cM[X] + size, vd_cM[Y] - size, z],
          [vd_cM[X] + size, vd_cM[Y] + size, z],
          [vd_cM[X] - size, vd_cM[Y] + size, z],
        ];
        var vd_bJ = [0, 0, 1];
        var uvs = [
          [0, 0, 0],
          [1, 0, 0],
          [1, 1, 0],
          [0, 1, 0],
        ];
        render.vd_fJ(pts, vd_bJ, uvs, vd_tm, true);
        render.vd_nD(null);
        render.vd_bd = vd_zf;
      }
    };
    return vd_i;
  }
  return vd_i;
}
function vd_ou(vd_Co) {
  return vd_Co !== undefined && vd_Co !== null;
}
function vd_lA(vdcanvas, vd_Ji, vd_cp) {
  vdcanvas.ActiveAction().cancel();
  vd_uT = vd_cp;
  vdcanvas.ActiveAction().vd_bk = vd_Ji;
  vdcanvas.ActiveAction().customData = null;
  vdcanvas.GetUserPoint(vd_mk);
}
var vd_uT;
function vd_sy(action) {
  var vdcanvas = action.vdrawOwner();
  var customData = action.customData;
  if (!action.IsStarted()) {
    action.vd_MK();
    if (action.vd_z === "select" && action.IsCanceled()) vd_uT = null;
    action.vd_z = null;
  }
  if (customData) {
    for (var k = 0; k < customData.length; k++) {
      var fig = customData[k];
      fig.selected = false;
    }
    vdcanvas.redraw();
    if (vd_uT) vd_uT(action);
  }
}
function vd_AL(mat, vd_ch, action, vd_aJ, vd_aX, vdcanvas) {
  var ret = vdgeo.vd_ci(mat);
  if (vd_ch == 1 || vd_ch == 4)
    vdgeo.vd_j(
      ret,
      vd_aX[X] - vd_aJ[X],
      vd_aX[Y] - vd_aJ[Y],
      vd_aX[Z] - vd_aJ[Z]
    );
  else if (vd_ch == 2) {
    var scale = [1, 1, 1];
    if (Array.isArray(vd_aX)) {
      if (vd_aX.length == 3) {
        var vd_ma = vdgeo.Distance2D(vd_aJ, vd_aX);
        scale = [vd_ma, vd_ma, vd_ma];
      } else if (vd_aX.length == 4) {
        scale = [vd_aX[0], vd_aX[1], vd_aX[2]];
      }
      if (vdcanvas.ActionScaleMode == 1 && vd_aX.length == 3) {
        if (action.vd_bk && action.vd_bk.entities) {
          if (!action.vd_bk.vd_fm) {
            var vd_lM = new vd_hd();
            for (var i = 0; i < action.vd_bk.entities.length; i++) {
              vd_lM.vd_gJ(action.vd_bk.entities[i].BoundingBox);
            }
            if (vd_lM.vd_bK) action.vd_bk.vd_fm = 1.0;
            else {
              action.vd_bk.vd_fm =
                1.0 /
                Math.max(
                  vd_lM.vd_bg[0] - vd_lM.vd_bi[0],
                  vd_lM.vd_bg[1] - vd_lM.vd_bi[1]
                );
            }
          }
          scale[0] *= action.vd_bk.vd_fm;
          scale[1] *= action.vd_bk.vd_fm;
          scale[2] *= action.vd_bk.vd_fm;
        }
      }
    } else {
      scale = [vd_aX, vd_aX, vd_aX];
    }
    if (vdgeo.AreEqual(scale[0], 0.0, vdgeo.DefaultLinearEquality))
      scale[0] = 1.0;
    if (vdgeo.AreEqual(scale[1], 0.0, vdgeo.DefaultLinearEquality))
      scale[1] = 1.0;
    if (vdgeo.AreEqual(scale[2], 0.0, vdgeo.DefaultLinearEquality))
      scale[2] = 1.0;
    vdgeo.vd_j(ret, -vd_aJ[X], -vd_aJ[Y], -vd_aJ[Z]);
    vdgeo.vd_bf(ret, scale[0], scale[1], scale[2]);
    vdgeo.vd_j(ret, vd_aJ[X], vd_aJ[Y], vd_aJ[Z]);
  } else if (vd_ch == 3) {
    var angle;
    if (Array.isArray(vd_aX)) {
      angle = vdgeo.GetAngle(vd_aJ, vd_aX);
      vd_aX = angle;
    } else {
      angle = vd_aX;
    }
    if (action.vd_bk.axis) {
      vdgeo.vd_j(ret, -vd_aJ[X], -vd_aJ[Y], -vd_aJ[Z]);
      vdgeo.vd_hh(ret, action.vd_bk.axis);
      vdgeo.vd_ap(ret, angle);
      vdgeo.vd_cn(ret, action.vd_bk.axis);
      vdgeo.vd_j(ret, vd_aJ[X], vd_aJ[Y], vd_aJ[Z]);
    } else {
      vdgeo.vd_j(ret, -vd_aJ[X], -vd_aJ[Y], -vd_aJ[Z]);
      vdgeo.vd_ap(ret, angle);
      vdgeo.vd_j(ret, vd_aJ[X], vd_aJ[Y], vd_aJ[Z]);
    }
  } else if (vd_ch == 5) {
    var angle;
    if (Array.isArray(vd_aX)) {
      angle = vdgeo.GetAngle(vd_aJ, vd_aX);
      vd_aX = angle;
    } else {
      angle = vd_aX;
    }
    vdgeo.vd_j(ret, -vd_aJ[X], -vd_aJ[Y], -vd_aJ[Z]);
    vdgeo.vd_ap(ret, -angle);
    vdgeo.vd_bf(ret, 1.0, -1.0, 1.0);
    vdgeo.vd_ap(ret, vd_aX);
    vdgeo.vd_j(ret, vd_aJ[X], vd_aJ[Y], vd_aJ[Z]);
  }
  return ret;
}
function vd_KO() {
  this.userselectedCount = 0;
  this.ItemIndex = -1;
  this.selectedItem = null;
  this.cancel = false;
  this.finish = false;
  this.action = null;
}
function vd_mk(action, status) {
  if (!action.vd_z) action.vd_z = "select";
  var vdcanvas = action.vdrawOwner();
  var render = action.render;
  var vd_gN, from, to, vd_yX, fig, p1;
  var k, i;
  if (action.vd_z == "select") {
    if (status == "start") {
      if (!action.customData) action.customData = [];
      if (action.vd_bk && action.vd_bk.entities) {
        action.customData = action.vd_bk.entities;
        for (i = 0; i < action.customData.length; i++) {
          action.customData[i].selected = true;
        }
        if (!action.vd_bk.vd_aJ || !vd_ou(action.vd_bk.vd_aX)) {
          render.vd_pd(vdConst.ActionHighLightColor);
          vdcanvas.ActionDrawEntities(action.customData, true);
          render.vd_pB();
        }
        action.cancel(1);
      } else vdcanvas.Prompt(vdcanvas.MessagesDictionary.SELECT_ENTITIES);
    } else if (status == "end") {
      vdcanvas.Prompt("");
      if (!action.IsCanceled()) {
        var ret = null;
        if (action.actionType == vdConst.ACTION_POINT_WORLD) {
          p1 = vdcanvas.WorldToPixel(action.ResValue);
          fig = vdcanvas.GetEntityFromPoint(p1[X], p1[Y]);
          if (!fig) {
            vdcanvas.GetUserRect(vd_mk, action.ResValue);
          } else {
            ret = [fig];
          }
        } else {
          p1 = vdcanvas.ViewToPixel(action.ResValue[0]);
          var p2 = vdcanvas.ViewToPixel(action.ResValue[1]);
          var vd_xG = p1[X] > p2[X];
          if (vd_xG)
            ret = vdcanvas.GetEntitiesFromBox(p1[X], p1[Y], p2[X], p2[Y]);
          else
            ret = vdcanvas.GetEntitiesInWindowBox(p1[X], p1[Y], p2[X], p2[Y]);
        }
        var vd_gI = new vd_KO();
        if (ret && ret.length > 0) {
          var vd_rz = [];
          for (i = 0; i < ret.length; i++) {
            vdcanvas.GroupsManager.vd_DV(ret[i], vd_rz);
          }
          if (!action.customData) action.customData = [];
          for (i = 0; i < vd_rz.length; i++) {
            var fig = vd_rz[i];
            fig.vd_CN = undefined;
            if (fig.selected) continue;
            if (vdcanvas.vdSelectionModified) {
              vd_gI.userselectedCount = vd_rz.length;
              vd_gI.ItemIndex = i;
              vd_gI.action = action;
              vd_gI.selectedItem = fig;
              vd_gI.cancel = false;
              vdcanvas.vdSelectionModified(vd_gI);
              if (vd_gI.cancel) continue;
            }
            fig.selected = true;
            action.customData.push(fig);
            if (vd_gI.finish) break;
          }
          render.vd_pd(vdConst.ActionHighLightColor);
          vdcanvas.ActionDrawEntities(action.customData, true);
          render.vd_pB();
        }
        if (vd_gI.finish) {
          if (!action.customData || action.vd_bk.vd_ch == 0) {
            vd_sy(action);
            return;
          }
          action.vd_z = "PickReference";
        }
        if (!action.IsStarted()) vdcanvas.GetUserPoint(vd_mk);
      } else {
        if (!action.customData || action.vd_bk.vd_ch == 0) {
          vd_sy(action);
          return;
        }
        action.vd_z = "PickReference";
        vdcanvas.GetUserPoint(vd_mk);
      }
    }
  } else if (action.vd_z == "PickReference") {
    if (status == "start") {
      if (action.vd_bk.vd_aJ) {
        action.cancel();
      } else
        vdcanvas.Prompt(vdcanvas.MessagesDictionary.SPECIFY_REFERENCE_POINT);
    } else if (status == "end") {
      vdcanvas.Prompt("");
      if (action.vd_bk.vd_aJ) {
        action.vd_z = "PickPoint2";
        vdcanvas.GetUserLine(vd_mk, action.vd_bk.vd_aJ);
      } else if (!action.IsCanceled()) {
        action.vd_z = "PickPoint2";
        vdcanvas.GetUserLine(vd_mk, action.ResValue);
      } else {
        vd_sy(action);
      }
    }
  } else if (action.vd_z == "PickPoint2") {
    if (status == "start") {
      if (vd_ou(action.vd_bk.vd_aX)) action.cancel();
      else vdcanvas.Prompt(vdcanvas.MessagesDictionary.SPECIFY_SECOND_POINT);
    } else if (status == "draw") {
      to = action.vd_at();
      from = action.ReferencePoint;
      vd_gN = vdgeo.vd_Q();
      vd_gN = vd_AL(vd_gN, action.vd_bk.vd_ch, action, from, to, vdcanvas);
      render.vd_aj(vd_gN);
      render.vd_pd();
      for (k = 0; k < action.customData.length; k++) {
        fig = action.customData[k];
        vdcanvas.DrawEntity(fig, render);
      }
      render.vd_pB();
      render.vd_aW();
    } else if (status == "end") {
      vdcanvas.Prompt("");
      if (!action.IsCanceled() || vd_ou(action.vd_bk.vd_aX)) {
        if (action.vd_bk.vd_aJ) from = action.vd_bk.vd_aJ;
        else if (action.ResValue && Array.isArray(action.ResValue[0]))
          from = action.ResValue[0];
        else from = action.ResValue;
        if (vd_ou(action.vd_bk.vd_aX)) to = action.vd_bk.vd_aX;
        else if (action.ResValue && Array.isArray(action.ResValue[1]))
          to = action.ResValue[1];
        else to = action.ResValue;
        vd_gN = vdgeo.vd_Q();
        vd_gN = vd_AL(vd_gN, action.vd_bk.vd_ch, action, from, to, vdcanvas);
        if (action.vd_bk.vd_ch == 4) {
          var entities = vdcanvas.CopyObjects(action.customData);
          if (action.customData) {
            for (var k = 0; k < action.customData.length; k++) {
              var fig = action.customData[k];
              fig.selected = false;
            }
          }
          action.customData = entities;
        } else {
          if (action.vd_bk.vd_ch == 2) {
            if (action.ResValue) {
              if (Array.isArray(to))
                action.ResValue[1] = vdgeo.Distance2D(from, to);
              else action.ResValue[1] = to;
            }
          } else if (action.vd_bk.vd_ch == 3 || action.vd_bk.vd_ch == 5) {
            if (action.ResValue) {
              if (Array.isArray(to))
                action.ResValue[1] = vdgeo.GetAngle(from, to);
              else action.ResValue[1] = to;
            }
          }
        }
        action.vd_bk.matrix = vd_gN;
        for (k = 0; k < action.customData.length; k++) {
          fig = action.customData[k];
          vd_q.vd_ef(vd_gN, fig, vdcanvas);
          vdcanvas.UpdateFig(fig);
        }
        vdcanvas.UpdateLayout();
      }
      vd_sy(action);
    }
  }
}
function vd_AS(vdcanvas) {
  var vd_i = this;
  var vd_n = vdcanvas;
  var vd_aN = [];
  var vd_Fx = [];
  var vd_bL = true;
  var vd_kx = [];
  var vd_iP = null;
  var vd_af = null;
  this.enableScript = function (vd_vZ) {
    var ret = vd_bL;
    vd_bL = vd_vZ;
    return ret;
  };
  this.isActive = function () {
    return vd_bL;
  };
  this.getCommands = function () {
    return vd_aN;
  };
  this.clearCommands = function () {
    return (vd_aN = []);
  };
  this.parseCommands = function (vd_fU) {
    if (!vd_fU) vd_fU = vd_aN;
    for (var i = 0; i < vd_fU.length; i++) {
      vd_Or(vd_fU[i], false);
    }
  };
  function vd_Ez(entities, replace) {
    var k = 0,
      index = 0;
    var fig;
    var h = "";
    var command = "";
    if (replace) vd_i.clearSelection();
    if (entities && entities.length > 0) {
      if (vd_bL) command += "select ";
      for (k = 0; k < entities.length; k++) {
        fig = entities[k];
        h = "h_" + fig.HandleId.toString();
        index = vd_kx.indexOf(h);
        if (index == -1) {
          if (vd_bL) command += h + " ";
          vd_kx.push(h);
        }
        if (vd_bL) {
          if ((k + 1) % 10 == 0) {
            vd_aN.push(command);
            command = "select ";
          }
        }
      }
      if (vd_bL) vd_aN.push(command);
    }
  }
  this.clearSelection = function () {
    vd_kx = [];
    if (vd_bL) vd_aN.push("select -all");
  };
  this.select = function (entities, vd_bU) {
    vd_iP = vd_bU;
    vd_n.CmdSelect(vd_cp, entities);
  };
  this.erase = function () {
    var k;
    var selection = vd_i.ActiveSelection();
    if (selection.length == 0) return;
    vd_n.UndoHistory().group_start();
    for (k = 0; k < selection.length; k++) {
      fig = selection[k];
      vd_n.UndoHistory().store(fig, "Deleted");
      fig.Deleted = true;
    }
    vd_n.UndoHistory().group_end();
    vd_n.UpdateLayout();
    if (vd_bL) {
      vd_aN.push("erase");
    }
    vd_i.clearSelection();
  };
  this.move = function (from, to, vd_bU) {
    var selection = vd_i.ActiveSelection();
    if (selection.length == 0) return;
    vd_iP = vd_bU;
    vd_n.CmdMove(selection, from, to, vd_cp);
  };
  this.scale = function (from, scale, vd_bU) {
    var selection = vd_i.ActiveSelection();
    if (selection.length == 0) return;
    vd_iP = vd_bU;
    vd_n.CmdScale(selection, from, scale, vd_cp);
  };
  this.rotate = function (from, rotation, vd_bU) {
    var selection = vd_i.ActiveSelection();
    if (selection.length == 0) return;
    vd_iP = vd_bU;
    vd_n.CmdRotate(selection, from, rotation, vd_cp);
  };
  this.rotate3d = function (from, rotation, axis, vd_bU) {
    var selection = vd_i.ActiveSelection();
    if (selection.length == 0) return;
    vd_iP = vd_bU;
    vd_n.CmdRotate3D(selection, from, rotation, axis, vd_cp);
  };
  this.mirror = function (from, rotation, vd_bU) {
    var selection = vd_i.ActiveSelection();
    if (selection.length == 0) return;
    vd_iP = vd_bU;
    vd_n.CmdMirror(selection, from, rotation, vd_cp);
  };
  this.copy = function (from, to, vd_bU) {
    var selection = vd_i.ActiveSelection();
    if (selection.length == 0) return;
    vd_iP = vd_bU;
    vd_n.CmdCopy(selection, from, to, vd_cp);
  };
  this.ActiveSelection = function () {
    var ret = [];
    var fig;
    for (k = 0; k < vd_kx.length; k++) {
      fig = vd_n.GetEntityItem(vd_kx[k]);
      if (!fig) continue;
      ret.push(fig);
    }
    return ret;
  };
  function vd_cp(action) {
    var fig;
    var h = "";
    var k = 0;
    var index = 0;
    var command = "";
    if (action.vd_bk.vd_ch == 0) {
      vd_Ez(action.customData, true);
    } else {
      if (!action.customData || action.customData.length == 0) return;
      if (vd_n.UndoHistory().Enable && action.vd_bk.matrix) {
        var vd_gN = action.vd_bk.matrix;
        var vd_yX = vdgeo.vd_bu(vd_gN);
        vd_n.UndoHistory().group_start();
        for (k = 0; k < action.customData.length; k++) {
          fig = action.customData[k];
          if (action.vd_bk.vd_ch == 4)
            vd_n.UndoHistory().store(fig, "Deleted", true);
          else
            vd_n.UndoHistory().store(fig, "special_transform", [vd_gN, vd_yX]);
        }
        vd_n.UndoHistory().group_end();
      }
      if (vd_bL) {
        var vd_uw = null;
        var vd_uY = null;
        if (action.vd_bk.vd_ch === 4) {
          var vd_C = vd_n.GetDocument();
          vd_aN.push(
            "chandle " +
              (vd_C.HandleCurrent - action.customData.length).toString()
          );
        }
        if (!action.ResValue) {
          if (action.vd_bk) {
            vd_Ez(action.customData, true);
            vd_uw = action.vd_bk.vd_aJ;
            vd_uY = action.vd_bk.vd_aX;
          }
        } else {
          vd_uw = action.ResValue[0];
          vd_uY = action.ResValue[1];
        }
        if (vd_ou(vd_uw) && vd_ou(vd_uY)) {
          command = vd_MB(action.vd_bk.vd_ch, [
            action.customData,
            vd_uw,
            vd_uY,
            action.vd_bk.axis,
          ]);
          vd_aN.push(command);
        }
      }
    }
    if (vd_iP) vd_iP(vd_n);
  }
  function vd_MB(actionType, vd_T) {
    var command;
    switch (actionType) {
      case 1:
        command = "move {0} {1}";
        command = command.replace("{0}", vd_bh(vd_T[1]));
        command = command.replace("{1}", vd_bh(vd_T[2]));
        break;
      case 2:
        command = "scale {0} {1}";
        command = command.replace("{0}", vd_bh(vd_T[1]));
        command = command.replace("{1}", vd_T[2].toString());
        break;
      case 3:
        if (vd_T[2]) {
          command = "rotate3d {0} {1} {2}";
          command = command.replace("{0}", vd_bh(vd_T[1]));
          command = command.replace(
            "{1}",
            vdgeo.RadiansToDegrees(vd_T[2]).toString()
          );
          command = command.replace("{2}", vd_bh(vd_T[2]));
        } else {
          command = "rotate {0} {1}";
          command = command.replace("{0}", vd_bh(vd_T[1]));
          command = command.replace(
            "{1}",
            vdgeo.RadiansToDegrees(vd_T[2]).toString()
          );
        }
        break;
      case 4:
        command = "copy {0} {1}";
        command = command.replace("{0}", vd_bh(vd_T[1]));
        command = command.replace("{1}", vd_bh(vd_T[2]));
        break;
      case 5:
        command = "mirror {0} {1}";
        command = command.replace("{0}", vd_bh(vd_T[1]));
        command = command.replace(
          "{1}",
          vdgeo.RadiansToDegrees(vd_T[2]).toString()
        );
        break;
      default:
        return;
    }
    return command;
  }
  function vd_OS(points) {
    var ret = "";
    var point;
    for (var i = 0; i < points.length; i++) {
      point = points[i];
      ret += vd_bh(point);
      if (i != points.length - 1) ret += " ";
    }
    return ret;
  }
  function vd_bh(point) {
    return vdgeo.vd_wE(point);
  }
  function vd_No(vd_Fb, vd_mS, vd_mp) {
    var h, i, index;
    var vd_op = vd_Fb[0] == "-";
    var vd_eQ = vd_Fb;
    if (vd_op) vd_eQ = vd_eQ.substr(1);
    if (vd_eQ.search("all") == 0) {
      if (vd_op) {
        vd_mp = [];
        return;
      }
      for (i = 0; i < vd_mS.Items.length; i++) {
        h = vd_mS.Items[i];
        index = vd_mp.indexOf(h);
        if (index >= 0) continue;
        vd_mp.push(vd_mS.Items[i]);
      }
    } else if (vd_eQ.search("last") == 0) {
      if (vd_mS.Items.length > 0) {
        h = vd_mS.Items[vd_mS.Items.length - 1];
        vd_n.GroupsManager.vd_pz(h, vd_mp, vd_op);
      }
    } else if (vd_eQ.search("h_") == 0) {
      vd_n.GroupsManager.vd_pz(vd_eQ, vd_mp, vd_op);
    } else if (vd_eQ.search("w_") == 0 || vd_eQ.search("c_") == 0) {
      var items = vd_eQ.split("_");
      var p1 = vd_n.ViewToPixel(vd_bI(items[1]));
      var p2 = vd_n.ViewToPixel(vd_bI(items[2]));
      var xmin = Math.min(p1[X], p2[X]);
      var xmax = Math.max(p1[X], p2[X]);
      var ymin = Math.min(p1[Y], p2[Y]);
      var ymax = Math.max(p1[Y], p2[Y]);
      var ents;
      if (vd_eQ.search("c_") == 0)
        ents = vd_n.GetEntitiesFromBox(xmin, ymin, xmax, ymax);
      else ents = vd_n.GetEntitiesInWindowBox(xmin, ymin, xmax, ymax);
      for (i = 0; i < ents.length; i++) {
        h = "h_" + ents[i].HandleId.toString();
        vd_n.GroupsManager.vd_pz(h, vd_mp, vd_op);
      }
    }
  }
  function vd_bI(point) {
    return vdgeo.vd_wm(point);
  }
  this.layer = function (name) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    var vd_vE = vd_n.FindLayer(name);
    if (vd_vE == null) return;
    var vd_Jg = vd_n.GetDictItem(vd_C.Layers, vd_C.ActiveLayer);
    if (vd_vE == vd_Jg) return;
    vd_n.UndoHistory().store(vd_C, "ActiveLayer");
    vd_n.SetActiveLayer(vd_vE);
    if (vd_bL) vd_aN.push("layer " + name);
  };
  this.layout = function (name) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    var clid = vd_n.GetActiveLayoutId();
    var nlid = vd_n.FindLayout(name);
    if (clid == nlid) return;
    vd_n.UndoHistory().group_start();
    vd_n.UndoHistory().store(vd_C, "ActiveLayOut");
    vd_n.UndoHistory().store(vd_C, "ActiveLayOutRef");
    vd_n.UndoHistory().group_end();
    vd_n.SetActiveLayoutId(nlid);
    vd_kx = [];
    if (vd_bL) vd_aN.push("layout " + name);
  };
  this.color = function (vd_Js) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    var vd_HV = vdConst.colorToString(vd_C.ActivePenColor);
    var color = vdConst.colorFromString(vd_Js);
    var vd_FW = vdConst.colorToString(color);
    if (vd_HV == vd_FW) return;
    vd_n.UndoHistory().store(vd_C, "ActivePenColor");
    vd_n.SetActivePenColor(color);
    if (vd_bL) vd_aN.push("color " + vd_FW);
  };
  this.linetype = function (name) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    var vd_wj = vd_n.FindLineType(name);
    if (vd_wj == null) return;
    var vd_Jq = vd_n.GetDictItem(vd_C.LineTypes, vd_C.ActiveLineType);
    if (vd_wj == vd_Jq) return;
    vd_n.UndoHistory().store(vd_C, "ActiveLineType");
    vd_n.SetActiveLineType(vd_wj);
    if (vd_bL) vd_aN.push("linetype " + name);
  };
  this.lineweight = function (vd_aM) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    if (vd_C.ActiveLineWeight == vd_aM) return;
    vd_n.UndoHistory().store(vd_C, "ActiveLineWeight");
    vd_n.SetActiveLineWeight(vd_aM);
    if (vd_bL) vd_aN.push("lineweight " + vd_aM.toString());
  };
  this.ltscale = function (vd_aM) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    if (!vd_C.vd_mx) vd_C.vd_mx = 1.0;
    if (vd_C.vd_mx == vd_aM) return;
    vd_n.UndoHistory().store(vd_C, "vd_mx");
    vd_C.vd_mx = vd_aM;
    if (vd_bL) vd_aN.push("ltscale " + vd_aM.toString());
  };
  this.penwidth = function (vd_aM) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    if (vd_C.ActivePenWidth == vd_aM) return;
    vd_n.UndoHistory().store(vd_C, "ActivePenWidth");
    vd_n.SetActivePenWidth(vd_aM);
    if (vd_bL) vd_aN.push("penwidth " + vd_aM.toString());
  };
  this.thickness = function (vd_aM) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    if (vd_C.vd_uR == vd_aM) return;
    vd_n.UndoHistory().store(vd_C, "vd_uR");
    vd_n.SetActiveThickness(vd_aM);
    if (vd_bL) vd_aN.push("thickness " + vd_aM.toString());
  };
  var vd_mV = false;
  function vd_gk() {
    if (!vd_mV) return 0.0;
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return 0.0;
    if (vd_C.doublelinewidth === undefined) vd_C.doublelinewidth = 0.25;
    return vd_C.doublelinewidth;
  }
  this.doublelinewidth = function (vd_aM) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    if (vd_C.doublelinewidth == vd_aM) return;
    vd_n.UndoHistory().store(vd_C, "doublelinewidth");
    vd_C.doublelinewidth = vd_aM;
    if (vd_bL) vd_aN.push("doublelinewidth " + vd_aM.toString());
  };
  this.hatch = function (
    vd_jg,
    FillBkColor,
    FillColor,
    vd_iI,
    vd_jf,
    vd_dy,
    vd_kq
  ) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    if (vd_jg == undefined) vd_jg = "none";
    if (!FillBkColor) FillBkColor = "byblock";
    if (!FillColor) FillColor = "byblock";
    if (vd_jf == undefined) vd_jf = 0;
    if (vd_iI == undefined) vd_iI = 1;
    var vd_Ky = vdConst.colorFromString(FillBkColor);
    var vd_Je = vdConst.colorFromString(FillColor);
    var nh = vd_n.createNewHatchProperties(vd_jg, vd_Ky, vd_Je, vd_iI, vd_jf);
    if (nh && vd_dy !== undefined) nh.Solid2dTransparency = vd_dy;
    if (nh && vd_kq !== undefined) nh.DrawBoundary = vd_kq == 1;
    if (vd_C.ActiveHatchProperties === nh) return;
    vd_n.UndoHistory().store(vd_C, "ActiveHatchProperties");
    vd_C.ActiveHatchProperties = nh;
    if (vd_bL)
      vd_aN.push(
        "hatch " +
          vd_jg +
          " " +
          FillBkColor +
          " " +
          FillColor +
          " " +
          vd_iI.toString() +
          " " +
          vd_jf.toString() +
          " " +
          (vd_dy !== undefined ? vd_dy.toString() : "255") +
          " " +
          (vd_kq ? "1" : "0")
      );
  };
  this.textstyle = function (name, height, vd_CZ, vd_Cu) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    var vd_DS = vd_n.GetDictItem(vd_C.TextStyles, vd_C.ActiveTextStyle);
    var vd_hE = false;
    vd_n.UndoHistory().group_start();
    var ts = vd_n.FindTextStyle(name);
    if (ts && ts != vd_DS) {
      vd_n.UndoHistory().store(vd_C, "ActiveTextStyle");
      vd_n.SetActiveTextStyle(ts);
      vd_hE = true;
    } else {
      ts = vd_DS;
    }
    if (ts.Height != height) {
      vd_n.UndoHistory().store(ts, "Height");
      ts.Height = height;
      vd_hE = true;
    }
    switch (vd_CZ) {
      case "left":
        if (ts.HorJustify != vdConst.VdConstHorJust_VdTextHorLeft) {
          vd_n.UndoHistory().store(ts, "HorJustify");
          ts.HorJustify = vdConst.VdConstHorJust_VdTextHorLeft;
          vd_hE = true;
        }
        break;
      case "right":
        if (ts.HorJustify != vdConst.VdConstHorJust_VdTextHorRight) {
          vd_n.UndoHistory().store(ts, "HorJustify");
          ts.HorJustify = vdConst.VdConstHorJust_VdTextHorRight;
          vd_hE = true;
        }
        break;
      case "center":
        if (ts.HorJustify != vdConst.VdConstHorJust_VdTextHorCenter) {
          vd_n.UndoHistory().store(ts, "HorJustify");
          ts.HorJustify = vdConst.VdConstHorJust_VdTextHorCenter;
          vd_hE = true;
        }
        break;
    }
    switch (vd_Cu) {
      case "bottom":
        if (ts.VerJustify != vdConst.VdConstVerJust_VdTextVerBottom) {
          vd_n.UndoHistory().store(ts, "VerJustify");
          ts.VerJustify = vdConst.VdConstVerJust_VdTextVerBottom;
          vd_hE = true;
        }
        break;
      case "top":
        if (ts.VerJustify != vdConst.VdConstVerJust_VdTextVerTop) {
          vd_n.UndoHistory().store(ts, "VerJustify");
          ts.VerJustify = vdConst.VdConstVerJust_VdTextVerTop;
          vd_hE = true;
        }
        break;
      case "center":
        if (ts.VerJustify != vdConst.VdConstVerJust_VdTextVerCen) {
          vd_n.UndoHistory().store(ts, "VerJustify");
          ts.VerJustify = vdConst.VdConstVerJust_VdTextVerCen;
          vd_hE = true;
        }
        break;
      case "base":
        if (ts.VerJustify != vdConst.VdConstVerJust_VdTextVerBaseLine) {
          vd_n.UndoHistory().store(ts, "VerJustify");
          ts.VerJustify = vdConst.VdConstVerJust_VdTextVerBaseLine;
          vd_hE = true;
        }
        break;
    }
    vd_n.UndoHistory().group_end();
    if (vd_hE && vd_bL)
      vd_aN.push(
        "textstyle " +
          " " +
          ts.Name +
          " " +
          ts.Height.toString() +
          " " +
          vd_CZ +
          " " +
          vd_Cu
      );
  };
  this.tooltip = function (name) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    if (vd_C.vd_mu == undefined) vd_C.vd_mu = "";
    if (vd_C.vd_mu == name) return;
    vd_n.UndoHistory().store(vd_C, "vd_mu");
    vd_C.vd_mu = name;
    if (vd_bL) vd_aN.push("tooltip " + name);
  };
  function vd_Gl(vd_JP) {
    var vd_EE = vd_JP.split(" ");
    var vd_x = [];
    var val, i;
    for (i = 0; i < vd_EE.length; i++) {
      val = vd_EE[i].trim();
      if (val == "") continue;
      vd_x.push(val);
    }
    return vd_x;
  }
  function vd_Or(vd_eQ, vd_am) {
    var vd_C = vd_n.GetDocument();
    if (vd_C == null) return;
    var layout = vd_n.GetActiveLayout();
    if (layout == null) return;
    var vd_br = [];
    var vd_I;
    var from, to, mat, k, i, fig, base, vd_yX;
    var vd_x = vd_Gl(vd_eQ);
    if (vd_x.length == 0) return;
    var command = "__" + vd_x[0].toLowerCase();
    switch (command) {
      case "__layer":
        vd_i.layer(vd_x[1]);
        break;
      case "__color":
        vd_i.color(vd_x[1]);
        break;
      case "__linetype":
        vd_i.linetype(vd_x[1]);
        break;
      case "__ltscale":
        vd_i.ltscale(Number(vd_x[1]));
        break;
      case "__lineweight":
        vd_i.lineweight(Number(vd_x[1]));
        break;
      case "__penwidth":
        vd_i.penwidth(Number(vd_x[1]));
        break;
      case "__thickness":
        vd_i.thickness(Number(vd_x[1]));
        break;
      case "__doublelinewidth":
        vd_i.doublelinewidth(Number(vd_x[1]));
        break;
      case "__tooltip":
        vd_i.tooltip(vd_x[1]);
        break;
      case "__textstyle":
        vd_i.textstyle(vd_x[1], Number(vd_x[2]), vd_x[3], vd_x[4]);
        break;
      case "__hatch":
        vd_i.hatch(
          vd_x[1],
          vd_x[2],
          vd_x[3],
          Number(vd_x[4]),
          vdgeo.DegreesToRadians(Number(vd_x[5])),
          Number(vd_x[6]),
          Number(vd_x[7])
        );
        break;
      case "__layout":
        vd_i.layout(vd_x[1]);
        break;
      case "__chandle":
        vd_C.HandleCurrent = Math.max(vd_C.HandleCurrent, Number(vd_x[1]));
        break;
      case "__line":
        vd_i.line([vd_bI(vd_x[1]), vd_bI(vd_x[2])]);
        break;
      case "__xline":
        vd_i.xline([vd_bI(vd_x[1]), vd_bI(vd_x[2])]);
        break;
      case "__ray":
        vd_i.ray([vd_bI(vd_x[1]), vd_bI(vd_x[2])]);
        break;
      case "__polyline":
        {
          vd_br = [];
          for (i = 1; i < vd_x.length; i++) {
            vd_I = vd_bI(vd_x[i]);
            while (vd_I.length < 4) vd_I.push(0);
            vd_br.push(vd_I);
          }
          vd_i.polyline(vd_br);
        }
        break;
      case "__doubleline":
        {
          vd_br = [];
          for (i = 1; i < vd_x.length; i++) {
            vd_I = vd_bI(vd_x[i]);
            while (vd_I.length < 4) vd_I.push(0);
            vd_br.push(vd_I);
          }
          vd_i.doubleline(vd_br);
        }
        break;
      case "__doublelinerect":
        vd_i.doublelinerect([
          vd_bI(vd_x[1]),
          Number(vd_x[2]),
          Number(vd_x[3]),
          vdgeo.DegreesToRadians(Number(vd_x[4])),
        ]);
        break;
      case "__spline1":
        {
          vd_br = [];
          for (i = 1; i < vd_x.length; i++) {
            vd_I = vd_bI(vd_x[i]);
            while (vd_I.length < 4) vd_I.push(0);
            vd_br.push(vd_I);
          }
          vd_i.polyline(vd_br, 0, 1);
        }
        break;
      case "__spline2":
        {
          vd_br = [];
          for (i = 1; i < vd_x.length; i++) {
            vd_I = vd_bI(vd_x[i]);
            while (vd_I.length < 4) vd_I.push(0);
            vd_br.push(vd_I);
          }
          vd_i.polyline(vd_br, 0, 2);
        }
        break;
      case "__spline4":
        {
          vd_br = [];
          for (i = 1; i < vd_x.length; i++) {
            vd_I = vd_bI(vd_x[i]);
            while (vd_I.length < 4) vd_I.push(0);
            vd_br.push(vd_I);
          }
          vd_i.polyline(vd_br, 0, 4);
        }
        break;
      case "__box":
        vd_i.box([
          vd_bI(vd_x[1]),
          Number(vd_x[2]),
          Number(vd_x[3]),
          Number(vd_x[4]),
          vdgeo.DegreesToRadians(Number(vd_x[5])),
        ]);
        break;
      case "__sphere":
        vd_i.sphere([
          vd_bI(vd_x[1]),
          Number(vd_x[2]),
          Number(vd_x[3]),
          Number(vd_x[4]),
        ]);
        break;
      case "__cone":
        vd_i.cone([
          vd_bI(vd_x[1]),
          Number(vd_x[2]),
          Number(vd_x[3]),
          Number(vd_x[4]),
          Number(vd_x[5]),
        ]);
        break;
      case "__rect":
        vd_i.rect([
          vd_bI(vd_x[1]),
          Number(vd_x[2]),
          Number(vd_x[3]),
          vdgeo.DegreesToRadians(Number(vd_x[4])),
        ]);
        break;
      case "__circle":
        vd_i.circle([vd_bI(vd_x[1]), Number(vd_x[2])]);
        break;
      case "__arc":
        vd_i.arc([
          vd_bI(vd_x[1]),
          Number(vd_x[2]),
          vdgeo.DegreesToRadians(Number(vd_x[3])),
          vdgeo.DegreesToRadians(Number(vd_x[4])),
        ]);
        break;
      case "__ellipse":
        vd_i.ellipse([
          vd_bI(vd_x[1]),
          Number(vd_x[2]),
          Number(vd_x[3]),
          vdgeo.DegreesToRadians(Number(vd_x[4])),
          vdgeo.DegreesToRadians(Number(vd_x[5])),
          vdgeo.DegreesToRadians(Number(vd_x[6])),
        ]);
        break;
      case "__text":
        vd_i.text(vd_x[1], [
          vd_bI(vd_x[2]),
          vdgeo.DegreesToRadians(Number(vd_x[3])),
        ]);
        break;
      case "__image":
        vd_i.image(vd_x[1], vd_x[2], [
          vd_bI(vd_x[3]),
          Number(vd_x[4]),
          vdgeo.DegreesToRadians(Number(vd_x[5])),
        ]);
        break;
      case "__dimvar":
        vd_i.dimvar(vd_x[1], vd_x[2]);
        break;
      case "__dim":
        vd_i.dim([vd_bI(vd_x[1]), vd_bI(vd_x[2]), vd_bI(vd_x[3]), vd_x[4]]);
        break;
      case "__blockref":
        vd_i.blockref(vd_x[1], [
          vd_bI(vd_x[2]),
          Number(vd_x[3]),
          vdgeo.DegreesToRadians(Number(vd_x[4])),
        ]);
        break;
      case "__select":
        {
          var entities = layout.Entities;
          for (i = 1; i < vd_x.length; i++) {
            vd_No(vd_x[i].toLowerCase(), entities, vd_kx);
          }
        }
        break;
      case "__erase":
        vd_i.erase();
        break;
      case "__move":
        vd_i.move(vd_bI(vd_x[1]), vd_bI(vd_x[2]));
        break;
      case "__rotate":
        vd_i.rotate(vd_bI(vd_x[1]), vdgeo.DegreesToRadians(Number(vd_x[2])));
        break;
      case "__mirror":
        vd_i.mirror(vd_bI(vd_x[1]), vdgeo.DegreesToRadians(Number(vd_x[2])));
        break;
      case "__rotate3d":
        vd_i.rotate3d(
          vd_bI(vd_x[1]),
          vdgeo.DegreesToRadians(Number(vd_x[2])),
          vd_bI(vd_x[3])
        );
        break;
      case "__scale":
        vd_i.scale(vd_bI(vd_x[1]), Number(vd_x[2]));
        break;
      case "__copy":
        vd_i.copy(vd_bI(vd_x[1]), vd_bI(vd_x[2]));
        break;
      case "__undogroup":
        vd_i.undogroup(vd_x[1]);
        break;
      default:
        vd_n.Prompt("Wrong script command : " + command);
        break;
    }
  }
  this.undogroup = function (value) {
    if (value.toLowerCase() == "begin") {
      vd_n.UndoHistory().group_start();
    } else {
      vd_n.UndoHistory().group_end();
    }
    if (vd_bL) vd_aN.push("undogroup " + value);
  };
  function vd_FV(vd_fU, vd_HT) {
    var vd_jk = 0;
    while (vd_fU.length > 0) {
      var vd_pY = vd_fU[vd_fU.length - 1].toLowerCase();
      if (vd_pY.substr(0, 9) == "undogroup") {
        var vd_x = vd_Gl(vd_pY);
        vd_jk += vd_x[1].toLowerCase() == "begin" ? -1 : 1;
      }
      vd_HT.push(vd_fU.pop());
      if (vd_fU.length == 0) break;
      vd_pY = vd_fU[vd_fU.length - 1].toLowerCase();
      if (
        vd_jk == 0 &&
        vd_pY.substr(0, 6) != "select" &&
        vd_pY.substr(0, 7) != "chandle"
      )
        break;
    }
  }
  this.undo = function () {
    vd_n.UndoHistory().undo();
    if (vd_bL) {
      vd_FV(vd_aN, vd_Fx);
    }
  };
  this.redo = function () {
    vd_n.UndoHistory().redo();
    if (vd_bL) {
      vd_FV(vd_Fx, vd_aN);
    }
  };
  this.RegisterFigure = function (Figure, vd_am, refresh) {
    vd_bE(Figure, vd_am, refresh);
  };
  function vd_bE(Figure, vd_am, refresh) {
    if (!Figure) return;
    var vd_C = vd_n.GetDocument();
    if (!Figure.HandleId) {
      var layout = vd_n.GetActiveLayout();
      Figure.HandleId = vd_n.vd_fq();
      if (vd_C.vd_mu) Figure.ToolTip = vd_C.vd_mu;
      vd_n.vd_aE(layout.Entities, Figure);
    }
    vd_n.UpdateFig(Figure);
    vd_n.UndoHistory().store(Figure, "Deleted", true);
    if (vd_bL) {
      vd_aN.push("chandle " + (vd_C.HandleCurrent - 1).toString());
      if (Figure._t == vdConst.vdLine_code) {
        vd_aN.push(
          "line " + vd_bh(Figure.StartPoint) + " " + vd_bh(Figure.EndPoint)
        );
      } else if (Figure._t == vdConst.vdInfinityLine_code) {
        if (Figure.InfinityType == vdConst.InfinityTypes_XLine) {
          vd_aN.push(
            "xline " + vd_bh(Figure.BasePoint) + " " + vd_bh(Figure.Direction)
          );
        } else {
          vd_aN.push(
            "ray " + vd_bh(Figure.BasePoint) + " " + vd_bh(Figure.Direction)
          );
        }
      } else if (Figure._t == vdConst.vdPolyline_code) {
        var vd_qh = vd_OS(Figure.VertexList.Items);
        if (Figure.Flag === 1) vd_qh += " " + vd_bh(Figure.VertexList.Items[0]);
        if (Figure.SPlineFlag === vdConst.SplineFlagSTANDARD) {
          var vd_hH = "polyline ";
          if (vd_gk() != 0) vd_hH = "doubleline ";
          vd_aN.push(vd_hH + vd_qh);
        } else if (Figure.SPlineFlag === vdConst.SplineFlagFITTING) {
          vd_aN.push("spline1 " + vd_qh);
        } else if (Figure.SPlineFlag === vdConst.SplineFlagCONTROLPOINTS) {
          vd_aN.push("spline2 " + vd_qh);
        } else if (Figure.SPlineFlag === vdConst.SplineFlagQUADRATIC) {
          vd_aN.push("spline4 " + vd_qh);
        }
      } else if (Figure._t == vdConst.vdRect_code) {
        var vd_hH = "rect ";
        if (vd_gk() != 0) vd_hH = "doublelinerect ";
        vd_aN.push(
          vd_hH +
            vd_bh(Figure.InsertionPoint) +
            " " +
            Figure.Width.toString() +
            " " +
            Figure.Height.toString() +
            " " +
            vdgeo.RadiansToDegrees(Figure.Rotation).toString()
        );
      } else if (Figure._t == vdConst.vdCircle_code) {
        vd_aN.push(
          "circle " + vd_bh(Figure.Center) + " " + Figure.Radius.toString()
        );
      } else if (Figure._t == vdConst.vdArc_code) {
        vd_aN.push(
          "arc " +
            vd_bh(Figure.Center) +
            " " +
            Figure.Radius.toString() +
            " " +
            vdgeo.RadiansToDegrees(Figure.StartAngle).toString() +
            " " +
            vdgeo.RadiansToDegrees(Figure.EndAngle).toString()
        );
      } else if (Figure._t == vdConst.vdEllipse_code) {
        vd_aN.push(
          "ellipse " +
            vd_bh(Figure.Center) +
            " " +
            Figure.MajorLength.toString() +
            " " +
            Figure.MinorLength.toString() +
            " " +
            vdgeo.RadiansToDegrees(Figure.MajorAngle).toString() +
            " " +
            vdgeo.RadiansToDegrees(Figure.StartAngle).toString() +
            " " +
            vdgeo.RadiansToDegrees(Figure.EndAngle).toString()
        );
      } else if (Figure._t == vdConst.vdText_code) {
        vd_aN.push(
          "text " +
            Figure.TextString +
            " " +
            vd_bh(Figure.InsertionPoint) +
            " " +
            vdgeo.RadiansToDegrees(Figure.Rotation).toString()
        );
      } else if (Figure._t == vdConst.vdImage_code) {
        var vd_v = vd_n.GetDictItem(vd_C.Images, Figure.ImageDefinition);
        vd_aN.push(
          "image " +
            vd_v.Name +
            " " +
            (vd_v.FileName ? vd_v.FileName : "@") +
            " " +
            vd_bh(Figure.InsertionPoint) +
            " " +
            Figure.ImageScale.toString() +
            " " +
            vdgeo.RadiansToDegrees(Figure.Rotation).toString()
        );
      } else if (Figure._t == vdConst.vdInsert_code) {
        var bdef = vd_n.GetDictItem(vd_C.Blocks, Figure.Block);
        vd_aN.push(
          "blockref " +
            bdef.Name +
            " " +
            vd_bh(Figure.InsertionPoint) +
            " " +
            Figure.Xscale.toString() +
            " " +
            vdgeo.RadiansToDegrees(Figure.Rotation).toString()
        );
      } else if (Figure._t == vdConst.vdDimension_code) {
        vd_aN.push(
          "dim " +
            vd_bh(vd_aF.vd_qk) +
            " " +
            vd_bh(vd_aF.vd_pR) +
            " " +
            vd_bh(vd_aF.vd_uG) +
            " " +
            vd_aF.text
        );
      } else {
        var action = vd_n.ActiveAction();
        if (action.vd_t) {
          if (action.vd_t[action.vd_t.length - 1] == "box") {
            var vd_hH = "box ";
            vd_aN.push(
              vd_hH +
                vd_bh(action.vd_t[0]) +
                " " +
                action.vd_t[1].toString() +
                " " +
                action.vd_t[2].toString() +
                " " +
                action.vd_t[3].toString() +
                " " +
                vdgeo.RadiansToDegrees(action.vd_t[4]).toString()
            );
          } else if (action.vd_t[action.vd_t.length - 1] == "sphere") {
            var vd_hH = "sphere ";
            vd_aN.push(
              vd_hH +
                vd_bh(action.vd_t[0]) +
                " " +
                action.vd_t[1].toString() +
                " " +
                action.vd_t[2].toString() +
                " " +
                action.vd_t[3].toString()
            );
          } else if (action.vd_t[action.vd_t.length - 1] == "cone") {
            var vd_hH = "cone ";
            vd_aN.push(
              vd_hH +
                vd_bh(action.vd_t[0]) +
                " " +
                action.vd_t[1].toString() +
                " " +
                action.vd_t[2].toString() +
                " " +
                action.vd_t[3].toString() +
                " " +
                action.vd_t[4].toString()
            );
          }
        }
      }
    }
    if (vd_am) vd_n.DrawEntity(Figure);
    if (refresh) vd_n.Refresh();
  }
  function vd_bA(action) {
    vd_mV = false;
    if (action) {
      var fig = action.Figure;
      action.Figure = null;
      action.vd_t = null;
      action.vd_z = null;
      action.vd_fm = 1.0;
      if (vd_af) vd_af(vd_n, fig);
    }
  }
  this.doubleline = function (vd_T, closed, vd_lJ, vd_bU) {
    vd_mV = true;
    vd_i.polyline(vd_T, closed, vd_lJ, vd_bU);
  };
  this.polyline = function (vd_T, closed, vd_lJ, vd_bU) {
    vd_n.ActiveAction().cancel();
    vd_af = vd_bU;
    var vd_du = vd_gk();
    if (vd_T) {
      var Figure = vd_n.AddPolyline(vd_T, false, {});
      if (vd_du != 0) {
        var vd_hJ = [];
        for (var i = 0; i < Figure.VertexList.Items.length; i++) {
          vd_hJ.push(vd_du);
          vd_hJ.push(vd_du);
        }
        Figure.Widths = { Items: vd_hJ };
      }
      if (vd_lJ) Figure.SPlineFlag = vd_lJ;
      if (closed) Figure.Flag = 1;
      vd_mV = false;
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    var fig = vd_n.AddPolyline([], false, {});
    if (vd_du != 0) {
      fig.Widths = { Items: [] };
    }
    fig.SPlineFlag = 0;
    if (vd_lJ) fig.SPlineFlag = vd_lJ;
    if (closed) fig.Flag = 1;
    vd_n.ActiveAction().Figure = fig;
    vd_n.GetUserPoint(vd_Cy);
  };
  function vd_Cy(action, status) {
    var pt;
    if (status == "start") {
      if (action.Figure.VertexList.Items.length == 0)
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_START_POINT);
      else {
        action.show();
        action.draw();
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_NEXT_POINT);
      }
    } else if (status == "end") {
      vd_n.Prompt("");
      if (!action.IsCanceled()) {
        pt = action.SelectedPoint(true);
        var vd_wd = false;
        if (action.Figure.VertexList.Items.length == 0) {
          action.Figure.VertexList.Items = [pt];
          vd_wd = true;
        } else {
          if (
            !vdgeo.vd_ed(
              pt,
              action.Figure.VertexList.Items[
                action.Figure.VertexList.Items.length - 1
              ],
              vd_n.GetPixelSize()
            )
          ) {
            action.Figure.VertexList.Items.push(pt);
            vd_wd = true;
          }
        }
        if (vd_wd && action.Figure.Widths) {
          var vd_du = vd_gk();
          action.Figure.Widths.Items.push(vd_du);
          action.Figure.Widths.Items.push(vd_du);
        }
        action.DrawActionDefault = false;
        vd_n.GetUserLine(vd_Cy, pt);
      } else {
        if (action.vd_Hu == 0) action.Figure = null;
        if (
          action.Figure != null &&
          ((action.Figure.SPlineFlag == 0 &&
            action.Figure.VertexList.Items.length > 1) ||
            action.Figure.VertexList.Items.length > 2)
        )
          vd_bE(action.Figure, true, true);
        vd_bA(action);
      }
    } else if (status == "draw") {
      if (action.Figure.VertexList.Items.length > 0) {
        var render = action.render;
        var vd_Pw = action.Figure.SPlineFlag;
        if (action.Figure.VertexList.Items.length < 2)
          action.Figure.SPlineFlag = 0;
        pt = [action.vd_at()[X], action.vd_at()[Y], action.vd_at()[Z], 0.0];
        var vd_Ba = !vdgeo.vd_ed(
          pt,
          action.Figure.VertexList.Items[
            action.Figure.VertexList.Items.length - 1
          ],
          vd_n.GetPixelSize()
        );
        if (vd_Ba) {
          action.Figure.VertexList.Items.push(pt);
          if (action.Figure.Widths) {
            var vd_du = vd_gk();
            action.Figure.Widths.Items.push(vd_du);
            action.Figure.Widths.Items.push(vd_du);
          }
        }
        vd_n.UpdateFig(action.Figure);
        vd_n.DrawEntity(action.Figure, render);
        if (vd_Ba) {
          action.Figure.VertexList.Items.pop();
          if (action.Figure.Widths) {
            action.Figure.Widths.Items.pop();
            action.Figure.Widths.Items.pop();
          }
        }
        action.Figure.SPlineFlag = vd_Pw;
        vd_n.UpdateFig(action.Figure);
      }
    }
  }
  this.circle = function (vd_T, vd_bU) {
    vd_n.ActiveAction().cancel();
    vd_af = vd_bU;
    if (vd_T) {
      var Figure = vd_n.AddCircle(vd_T[0], vd_T[1], false, {});
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    vd_n.GetUserPoint(vd_Bm);
  };
  function vd_Bm(action, status) {
    if (!action.vd_z) action.vd_z = "PickCenter";
    if (action.vd_z == "PickCenter") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_CENTER_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure = vd_n.AddCircle(action.ResValue, 0.0, false, {});
          action.vd_z = "PickRadius";
          vd_n.GetUserLine(vd_Bm, action.ResValue);
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "PickRadius") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_RADIUS);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.Radius = vdgeo.Distance2D(
            action.SelectedPoint(),
            action.ReferencePoint
          );
          vd_bE(action.Figure, true, true);
        }
        vd_bA(action);
      } else if (status == "draw") {
        if (action.Figure) {
          var render = action.render;
          action.Figure.Radius = vdgeo.Distance2D(
            action.vd_at(),
            action.ReferencePoint
          );
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      }
    }
  }
  this.xline = function (vd_T, vd_bU) {
    vd_n.ActiveAction().cancel();
    vd_af = vd_bU;
    if (vd_T) {
      var Figure = vd_n.AddInfinityLine(
        vdConst.InfinityTypes_XLine,
        vd_T[0],
        vd_T[1],
        false,
        {}
      );
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    vd_n.GetUserPoint(vd_Cm);
  };
  function vd_Cm(action, status) {
    if (!action.vd_z) action.vd_z = "PickStart";
    if (action.vd_z == "PickStart") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_START_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.vd_z = "PickNext";
          var pt = action.SelectedPoint();
          action.Figure = vd_n.AddInfinityLine(
            vdConst.InfinityTypes_XLine,
            pt,
            [1, 0, 0],
            false,
            {}
          );
          vd_n.GetUserLine(vd_Cm, pt);
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "PickNext") {
      if (status == "start") {
        action.DrawActionDefault = false;
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_SECOND_POINT);
      } else if (status == "draw") {
        if (action.Figure) {
          var render = action.render;
          action.Figure.Direction = vdgeo.VectorDirection(
            action.ReferencePoint,
            action.vd_at()
          );
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      } else if (status == "end") {
        action.DrawActionDefault = true;
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.Direction = vdgeo.VectorDirection(
            action.ReferencePoint,
            action.SelectedPoint()
          );
          vd_bE(action.Figure, true, true);
        }
        vd_bA(action);
      }
    }
  }
  this.ray = function (vd_T, vd_bU) {
    vd_n.ActiveAction().cancel();
    vd_af = vd_bU;
    if (vd_T) {
      var Figure = vd_n.AddInfinityLine(
        vdConst.InfinityTypes_Ray,
        vd_T[0],
        vd_T[1],
        false,
        {}
      );
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    vd_n.GetUserPoint(vd_BF);
  };
  function vd_BF(action, status) {
    if (!action.vd_z) action.vd_z = "PickStart";
    if (action.vd_z == "PickStart") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_START_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.vd_z = "PickNext";
          var pt = action.SelectedPoint();
          action.Figure = vd_n.AddInfinityLine(
            vdConst.InfinityTypes_Ray,
            pt,
            [1, 0, 0],
            false,
            {}
          );
          vd_n.GetUserLine(vd_BF, pt);
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "PickNext") {
      if (status == "start") {
        action.DrawActionDefault = false;
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_SECOND_POINT);
      } else if (status == "draw") {
        if (action.Figure) {
          var render = action.render;
          action.Figure.Direction = vdgeo.VectorDirection(
            action.ReferencePoint,
            action.vd_at()
          );
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      } else if (status == "end") {
        action.DrawActionDefault = true;
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.Direction = vdgeo.VectorDirection(
            action.ReferencePoint,
            action.SelectedPoint()
          );
          vd_bE(action.Figure, true, true);
        }
        vd_bA(action);
      }
    }
  }
  this.line = function (vd_T, vd_bU) {
    vd_n.ActiveAction().cancel();
    vd_af = vd_bU;
    if (vd_T) {
      var Figure = vd_n.AddLine(vd_T[0], vd_T[1], false, {});
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    vd_n.GetUserPoint(vd_vL);
  };
  function vd_vL(action, status) {
    if (!action.vd_z) action.vd_z = "PickStart";
    if (action.vd_z == "PickStart") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_START_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.vd_z = "PickNext";
          vd_n.GetUserLine(vd_vL, action.SelectedPoint());
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "PickNext") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_NEXT_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure = vd_n.AddLine(
            action.ReferencePoint,
            action.SelectedPoint(),
            false,
            {}
          );
          vd_bE(action.Figure, true, true);
          vd_n.GetUserLine(vd_vL, action.SelectedPoint());
        } else {
          vd_bA(action);
        }
      }
    }
  }
  this.arc = function (vd_T, vd_bU) {
    vd_n.ActiveAction().cancel();
    vd_af = vd_bU;
    if (vd_T) {
      var Figure = vd_n.AddArc(vd_T[0], vd_T[1], vd_T[2], vd_T[3], false, {});
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    vd_n.GetUserPoint(vd_uV);
  };
  function vd_uV(action, status) {
    if (!action.vd_z) action.vd_z = "PickCenter";
    if (action.vd_z == "PickCenter") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_CENTER_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure = vd_n.AddArc(
            action.ResValue,
            0.0,
            0.0,
            0.0,
            false,
            {}
          );
          action.vd_z = "PickStartPoint";
          vd_n.GetUserLine(vd_uV, action.ResValue);
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "PickStartPoint") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_START_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.Radius = vdgeo.Distance2D(
            action.ReferencePoint,
            action.SelectedPoint()
          );
          action.Figure.StartAngle = vdgeo.GetAngle(
            action.ReferencePoint,
            action.SelectedPoint()
          );
          action.vd_z = "PickEndPoint";
          vd_n.GetUserLine(vd_uV, action.ReferencePoint);
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "PickEndPoint") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_END_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.EndAngle = vdgeo.GetAngle(
            action.ReferencePoint,
            action.SelectedPoint()
          );
          vd_bE(action.Figure, true, true);
        }
        vd_bA(action);
      } else if (status == "draw") {
        if (action.Figure) {
          var render = action.render;
          action.Figure.EndAngle = vdgeo.GetAngle(
            action.ReferencePoint,
            action.vd_at()
          );
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      }
    }
  }
  this.doublelinerect = function (vd_T, vd_bU) {
    vd_mV = true;
    vd_i.rect(vd_T, vd_bU);
  };
  function vd_vS(rect) {
    var vd_aO = [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ];
    var mat = vdgeo.vd_Q();
    vdgeo.vd_bf(mat, rect.Width, rect.Height, 1.0);
    vdgeo.vd_ap(mat, rect.Rotation);
    vdgeo.vd_j(
      mat,
      rect.InsertionPoint[X],
      rect.InsertionPoint[Y],
      rect.InsertionPoint[Z]
    );
    vd_aO = vdgeo.vd_eq(mat, vd_aO);
    var Figure = vd_n.AddPolyline(vd_aO, false, {});
    Figure.HatchProperties = rect.HatchProperties;
    Figure.Thickness = rect.Thickness;
    Figure.LineType = rect.LineType;
    Figure.Layer = rect.Layer;
    Figure.PenColor = rect.PenColor;
    Figure.PenWidth = rect.PenWidth;
    Figure.LineWeight = rect.LineWeight;
    Figure.LineTypeScale = rect.LineTypeScale;
    var vd_du = vd_gk();
    Figure.Widths = {
      Items: [vd_du, vd_du, vd_du, vd_du, vd_du, vd_du, vd_du, vd_du],
    };
    Figure.Flag = 1;
    return Figure;
  }
  this.rect = function (vd_T, vd_bU) {
    vd_n.ActiveAction().cancel();
    vd_af = vd_bU;
    if (vd_T) {
      var Figure = vd_n.AddRect2(vd_T[0], vd_T[1], vd_T[2], vd_T[3], false, {});
      if (vd_gk() != 0) Figure = vd_vS(Figure);
      vd_mV = false;
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    vd_n.GetUserPoint(vd_AZ);
  };
  function vd_AZ(action, status) {
    if (!action.vd_z) action.vd_z = "Pick1";
    var render;
    if (action.vd_z == "Pick1") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_FIRST_CORNER);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure = vd_n.AddRect(
            action.ResValue,
            action.ResValue,
            false,
            {}
          );
          action.vd_z = "Pick2";
          vd_n.GetUserLine(vd_AZ, action.ResValue);
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "Pick2") {
      if (status == "start") {
        action.vd_Pf = action.vd_zp(false);
        action.DrawActionDefault = false;
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_OTHER_CORNER);
      } else if (status == "end") {
        action.vd_zp(action.vd_Pf);
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.Width =
            action.SelectedPoint()[X] - action.ReferencePoint[X];
          action.Figure.Height =
            action.SelectedPoint()[Y] - action.ReferencePoint[Y];
          if (vd_gk() != 0) action.Figure = vd_vS(action.Figure);
          vd_bE(action.Figure, true, true);
        }
        vd_bA(action);
      } else if (status == "draw") {
        if (action.Figure) {
          render = action.render;
          action.Figure.Width = action.vd_at()[X] - action.ReferencePoint[X];
          action.Figure.Height = action.vd_at()[Y] - action.ReferencePoint[Y];
          var vd_xP = action.Figure;
          if (vd_gk() != 0) vd_xP = vd_vS(action.Figure);
          vd_n.UpdateFig(vd_xP);
          vd_n.DrawEntity(vd_xP, render);
        }
      }
    }
  }
  this.blockref = function (name, vd_T, vd_bU) {
    var action = vd_n.ActiveAction();
    action.cancel();
    vd_af = vd_bU;
    if (vd_T) {
      var Figure = vd_n.AddBlockSymbol(name, vd_T[0], vd_T[1], vd_T[2]);
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    action.Figure = vd_n.AddBlockSymbol(name, [0, 0, 0], 1.0, 0.0, false, {});
    var bbox = vd_n.GetEntityBBox(action.Figure);
    action.vd_fm = 1.0;
    if (vd_n.ActionScaleMode == 1 && bbox)
      action.vd_fm = 1.0 / Math.max(bbox[3] - bbox[0], bbox[4] - bbox[1]);
    vd_n.GetUserPoint(vd_tO);
  };
  function vd_jQ(vdcanvas, fig, vd_g, vd_rZ, vd_ss, vd_rO, rotation) {
    if (vdgeo.AreEqual(vd_rZ, 0.0, vdgeo.DefaultScaleEquality))
      vd_rZ = fig.Xscale;
    if (vdgeo.AreEqual(vd_ss, 0.0, vdgeo.DefaultScaleEquality))
      vd_ss = fig.Yscale;
    if (vdgeo.AreEqual(vd_rO, 0.0, vdgeo.DefaultScaleEquality))
      vd_rO = fig.Zscale;
    if (fig.Attributes && fig.Attributes.Items.length > 0) {
      var mat = vdgeo.vd_Q();
      vdgeo.vd_j(
        mat,
        -fig.InsertionPoint[X],
        -fig.InsertionPoint[Y],
        -fig.InsertionPoint[Z]
      );
      vdgeo.vd_hh(mat, fig.ExtrusionVector);
      vdgeo.vd_ap(mat, -fig.Rotation);
      vdgeo.vd_bf(mat, 1.0 / fig.Xscale, 1.0 / fig.Yscale, 1.0 / fig.Zscale);
      vdgeo.vd_bf(mat, vd_rZ, vd_ss, vd_rO);
      vdgeo.vd_ap(mat, rotation);
      vdgeo.vd_cn(mat, fig.ExtrusionVector);
      vdgeo.vd_j(mat, vd_g[X], vd_g[Y], vd_g[Z]);
      vd_q.vd_ef(mat, fig, vdcanvas);
    } else {
      fig.InsertionPoint = vd_g;
      fig.Xscale = vd_rZ;
      fig.Yscale = vd_ss;
      fig.Zscale = vd_rO;
      fig.Rotation = rotation;
    }
  }
  function vd_tO(action, status) {
    if (!action.vd_z) action.vd_z = "PickInsertion";
    var scale;
    var render;
    var rotation;
    if (action.vd_z == "PickInsertion") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_INSERTION_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.InsertionPoint = action.ResValue;
          action.vd_z = "PickScale";
          vd_n.GetUserLine(vd_tO, action.ResValue);
        } else {
          vd_bA(action);
        }
      } else if (status == "draw") {
        if (action.Figure) {
          render = action.render;
          vd_jQ(
            vdcanvas,
            action.Figure,
            action.vd_at(),
            action.Figure.Xscale,
            action.Figure.Yscale,
            action.Figure.Zscale,
            action.Figure.Rotation
          );
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      }
    } else if (action.vd_z == "PickScale") {
      if (status == "start") {
        action.show();
        action.draw();
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_SCALE);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          if (!action.vd_fm) action.vd_fm = 1.0;
          scale =
            vdgeo.Distance2D(action.ReferencePoint, action.SelectedPoint()) *
            action.vd_fm;
          vd_jQ(
            vdcanvas,
            action.Figure,
            action.Figure.InsertionPoint,
            scale,
            scale,
            action.Figure.Zscale,
            action.Figure.Rotation
          );
          action.vd_z = "PickRotation";
          vd_n.GetUserLine(vd_tO, action.ReferencePoint);
        } else {
          vd_jQ(
            vdcanvas,
            action.Figure,
            action.Figure.InsertionPoint,
            1.0,
            1.0,
            action.Figure.Zscale,
            action.Figure.Rotation
          );
          vd_bE(action.Figure, true, true);
          vd_bA(action);
        }
      } else if (status == "draw") {
        if (action.Figure) {
          render = action.render;
          if (!action.vd_fm) action.vd_fm = 1.0;
          scale =
            vdgeo.Distance2D(action.ReferencePoint, action.vd_at()) *
            action.vd_fm;
          vd_jQ(
            vdcanvas,
            action.Figure,
            action.Figure.InsertionPoint,
            scale,
            scale,
            action.Figure.Zscale,
            action.Figure.Rotation
          );
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      }
    } else if (action.vd_z == "PickRotation") {
      if (status == "start") {
        action.show();
        action.draw();
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_ROTATION);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          rotation = vdgeo.GetAngle(
            action.ReferencePoint,
            action.SelectedPoint()
          );
          vd_jQ(
            vdcanvas,
            action.Figure,
            action.Figure.InsertionPoint,
            action.Figure.Xscale,
            action.Figure.Yscale,
            action.Figure.Zscale,
            rotation
          );
        } else {
          vd_jQ(
            vdcanvas,
            action.Figure,
            action.Figure.InsertionPoint,
            action.Figure.Xscale,
            action.Figure.Yscale,
            action.Figure.Zscale,
            0.0
          );
        }
        vd_bE(action.Figure, true, true);
        vd_bA(action);
      } else if (status == "draw") {
        if (action.Figure) {
          render = action.render;
          rotation = vdgeo.GetAngle(action.ReferencePoint, action.vd_at());
          vd_jQ(
            vdcanvas,
            action.Figure,
            action.Figure.InsertionPoint,
            action.Figure.Xscale,
            action.Figure.Yscale,
            action.Figure.Zscale,
            rotation
          );
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      }
    }
  }
  this.text = function (vd_ac, vd_T, vd_bU) {
    vd_n.ActiveAction().cancel();
    vd_af = vd_bU;
    if (vd_T) {
      var Figure = vd_n.AddText(
        vd_ac,
        0,
        vd_T[0],
        undefined,
        undefined,
        vd_T[1]
      );
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    vd_n.ActiveAction().Figure = vd_n.AddText(
      vd_ac,
      0,
      [0, 0, 0],
      undefined,
      undefined,
      0.0,
      false,
      {}
    );
    vd_n.GetUserPoint(vd_CJ);
  };
  function vd_CJ(action, status) {
    if (!action.vd_z) action.vd_z = "PickInsertion";
    var scale;
    var render;
    if (action.vd_z == "PickInsertion") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_INSERTION_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.InsertionPoint = action.ResValue;
          action.vd_z = "PickRotation";
          vd_n.GetUserLine(vd_CJ, action.ResValue);
        } else {
          vd_bA(action);
        }
      } else if (status == "draw") {
        if (action.Figure) {
          render = action.render;
          action.Figure.InsertionPoint = action.vd_at();
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      }
    } else if (action.vd_z == "PickRotation") {
      if (status == "start") {
        action.show();
        action.draw();
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_ROTATION);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.Rotation = vdgeo.GetAngle(
            action.ReferencePoint,
            action.SelectedPoint()
          );
        } else {
          action.Figure.Rotation = 0.0;
        }
        vd_bE(action.Figure, true, true);
        vd_bA(action);
      } else if (status == "draw") {
        if (action.Figure) {
          render = action.render;
          action.Figure.Rotation = vdgeo.GetAngle(
            action.ReferencePoint,
            action.vd_at()
          );
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      }
    }
  }
  this.image = function (vd_Cd, vd_ep, vd_T, vd_bU) {
    vd_n.ActiveAction().cancel();
    vd_af = vd_bU;
    var Figure;
    if (vd_T) {
      Figure = vd_n.AddImage(
        vd_Cd,
        vd_ep,
        vd_T[0],
        vd_T[1],
        vd_T[2],
        false,
        {}
      );
      Figure.FileName = vd_ep;
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    Figure = vd_n.AddImage(vd_Cd, vd_ep, [0, 0, 0], 1.0, 0.0, false, {});
    Figure.FileName = vd_ep;
    vd_n.ActiveAction().Figure = Figure;
    vd_n.GetUserPoint(vd_tB);
  };
  function vd_tB(action, status) {
    if (!action.vd_z) action.vd_z = "Pick1";
    var vd_C = vd_n.GetDocument();
    var vd_v = null;
    var render;
    if (action.vd_z == "Pick1") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_FIRST_CORNER);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.InsertionPoint = action.ResValue;
          action.vd_z = "Pick2";
          vd_n.GetUserLine(vd_tB, action.ResValue);
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "Pick2") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_OTHER_CORNER);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.Width =
            action.SelectedPoint()[X] - action.ReferencePoint[X];
          action.Figure.ImageScale = action.Figure.Width;
          if (vd_C)
            vd_v = vd_n.GetDictItem(vd_C.Images, action.Figure.ImageDefinition);
          if (vd_v)
            action.Figure.Height =
              (action.Figure.Width * vd_v.height) / vd_v.width;
          else
            action.Figure.Height =
              action.SelectedPoint()[Y] - action.ReferencePoint[Y];
          action.vd_zG = vdgeo.GetAngle(
            action.ReferencePoint,
            action.SelectedPoint()
          );
          action.vd_z = "Pick3";
          vd_n.GetUserLine(vd_tB, action.ReferencePoint);
        } else {
          vd_bA(action);
        }
      } else if (status == "draw") {
        if (action.Figure) {
          render = action.render;
          action.Figure.Width = action.vd_at()[X] - action.ReferencePoint[X];
          action.Figure.ImageScale = action.Figure.Width;
          if (vd_C)
            vd_v = vd_n.GetDictItem(vd_C.Images, action.Figure.ImageDefinition);
          if (vd_v)
            action.Figure.Height =
              (action.Figure.Width * vd_v.height) / vd_v.width;
          else
            action.Figure.Height = action.vd_at()[Y] - action.ReferencePoint[Y];
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      }
    } else if (action.vd_z == "Pick3") {
      if (status == "start") {
        action.show();
        action.draw();
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_ROTATION);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.Rotation =
            vdgeo.GetAngle(action.ReferencePoint, action.SelectedPoint()) -
            action.vd_zG;
        } else {
          action.Figure.Rotation = 0.0;
        }
        vd_bE(action.Figure, true, true);
        vd_bA(action);
      } else if (status == "draw") {
        if (action.Figure) {
          render = action.render;
          action.Figure.Rotation =
            vdgeo.GetAngle(action.ReferencePoint, action.vd_at()) -
            action.vd_zG;
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      }
    }
  }
  var vd_aF = { vd_qx: new vddimmanager() };
  this.dimvar = function (name, value) {
    name = name.toUpperCase();
    vd_n.UndoHistory().store(vd_aF.vd_qx, name);
    vd_aF.vd_qx[name] = value;
    if (vd_bL) vd_aN.push("dimvar " + name + " " + value);
  };
  this.dim = function (vd_T, vd_bU) {
    vd_n.ActiveAction().cancel();
    vd_af = vd_bU;
    var Figure;
    if (vd_T && vd_T[0] && vd_T[1]) {
      vd_aF.vd_qk = vd_T[0];
      vd_aF.vd_pR = vd_T[1];
      vd_aF.vd_uG = vd_T[2];
      vd_aF.text = vd_T[3];
      if (!vd_aF.text) vd_aF.text = "";
      Figure = vd_aF.vd_qx.Create(
        vd_n,
        vd_aF.vd_qk,
        vd_aF.vd_pR,
        vd_aF.vd_uG,
        vd_aF.text,
        {}
      );
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    vd_n.GetUserPoint(vd_vA);
  };
  function vd_vA(action, status) {
    if (!action.vd_z) action.vd_z = "Pick1";
    var vd_C = vd_n.GetDocument();
    var vd_v = null;
    var render;
    if (action.vd_z == "Pick1") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_START_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.vd_z = "Pick2";
          vd_n.GetUserLine(vd_vA, action.ResValue);
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "Pick2") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_END_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          vd_aF.vd_qk = action.ReferencePoint;
          vd_aF.vd_pR = action.SelectedPoint();
          action.vd_z = "Pick3";
          vd_n.GetUserLine(vd_vA, action.SelectedPoint());
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "Pick3") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_INSERTION_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          vd_aF.vd_uG = action.SelectedPoint();
          vd_aF.text = "";
          action.Figure = vd_aF.vd_qx.Create(
            vd_n,
            vd_aF.vd_qk,
            vd_aF.vd_pR,
            vd_aF.vd_uG,
            vd_aF.text,
            {}
          );
        } else {
          action.Figure = null;
        }
        vd_bE(action.Figure, true, true);
        vd_bA(action);
      } else if (status == "draw") {
        render = action.render;
        var figure = vd_aF.vd_qx.Create(
          vd_n,
          vd_aF.vd_qk,
          vd_aF.vd_pR,
          action.vd_at(),
          "",
          {}
        );
        vd_n.DrawEntity(figure, render);
      }
    }
  }
  function vd_PO(pl, p1, p2) {
    vd_n.UndoHistory().group_start();
    vd_n.UndoHistory().store(pl, "VertexList");
    vd_n.UndoHistory().store(pl, "Flag");
    var ins1 = vdgeo.vd_Er(pl, p1);
    if (!ins1) return null;
    var ins2 = vdgeo.vd_Er(pl, p2);
    if (!ins2) return null;
    if (ins1[0] >= ins2[0]) {
      ins1[0] += 1;
    }
    if (ins1[0] > ins2[0]) {
      var tmp = ins1;
      ins1 = ins2;
      ins2 = tmp;
    }
    var vd_Fq = [];
    var vd_rc = [];
    if (pl.Falg == 1) {
      for (var i = ins2[0]; i < pl.vd_ri.Items.length; i++) {
        vd_rc.push(pl.vd_ri.Items[i]);
      }
      for (var i = 0; i <= ins1[0]; i++) {
        vd_rc.push(pl.vd_ri.Items[i]);
      }
    } else {
      for (var i = 0; i <= ins1[0]; i++) {
        vd_rc.push(pl.vd_ri.Items[i]);
      }
      for (var i = ins2[0]; i < pl.vd_ri.Items.length; i++) {
        vd_Fq.push(pl.vd_ri.Items[i]);
      }
    }
    pl.VertexList.Items = vd_rc;
    pl.Flag = 0;
    vd_n.UpdateFig(pl);
    var vd_ta = vdConst.cloneEntity(pl);
    vd_ta.VertexList.Items = vd_Fq;
    vd_ta.HandleId = vd_n.vd_fq();
    vd_n.vd_aE(vd_n.GetActiveLayout().Entities, vd_ta);
    vd_n.UndoHistory().store(vd_ta, "Deleted", true);
    vd_n.UndoHistory().group_end();
  }
  this.box = function (vd_T, vd_bU) {
    var action = vd_n.ActiveAction();
    action.cancel();
    vd_af = vd_bU;
    if (vd_T) {
      action.vd_t = vd_T.concat("box");
      action.Figure = vd_n.AddBox(
        vd_T[0],
        vd_T[1],
        vd_T[2],
        vd_T[3],
        vd_T[4],
        false,
        {}
      );
      vd_bE(action.Figure, false, false);
      vd_bA(action);
      return;
    }
    vd_n.GetUserPoint(vd_si);
  };
  function vd_qi(ip, width, length, height, rotation) {
    var p0 = ip;
    var p1 = vdgeo.pointPolar(p0, rotation, width);
    var p2 = vdgeo.pointPolar(p1, rotation + vdgeo.HALF_PI, length);
    var p3 = vdgeo.pointPolar(p2, rotation + vdgeo.PI, width);
    var p4 = [p0[X], p0[Y], p0[Z] + height];
    var p5 = [p1[X], p1[Y], p1[Z] + height];
    var p6 = [p2[X], p2[Y], p2[Z] + height];
    var p7 = [p3[X], p3[Y], p3[Z] + height];
    return [p0, p1, p2, p3, p4, p5, p6, p7];
  }
  function vd_si(action, status) {
    if (!action.vd_z) action.vd_z = "Pick1";
    if (action.vd_z == "Pick1") {
      if (status == "start") {
        action.vdrawOwner().Prompt("SPECIFY_FIRST_CORNER");
      } else if (status == "end") {
        action.vdrawOwner().Prompt("");
        if (action.IsCanceled()) {
          vd_bA(action);
        } else {
          var cp0 = action.SelectedPoint();
          action.vd_t = [cp0, 1, 1, 1, 0, "box"];
          action.Figure = vd_n.AddBox(cp0, 1, 1, 1, 0, false, {});
          action.vd_z = "Pick2";
          action.vdrawOwner().GetUserLine(vd_si, cp0);
        }
      } else if (status == "draw") {
      }
    } else if (action.vd_z == "Pick2") {
      if (status == "start") {
        action.DrawActionDefault = true;
        action.vdrawOwner().Prompt("SPECIFY_OTHER_CORNER");
      } else if (status == "end") {
        action.vdrawOwner().Prompt("");
        if (action.IsCanceled()) {
          vd_bA(action);
        } else {
          var vd_g = action.vd_t[0];
          var cp1 = action.SelectedPoint();
          var width = cp1[X] - vd_g[X];
          var length = cp1[Y] - vd_g[Y];
          action.vd_t[1] = width;
          action.vd_t[2] = length;
          action.vd_z = "Pick3";
          action.vdrawOwner().GetUserLine(vd_si, vd_g);
        }
      } else if (status == "draw") {
        var vd_g = action.vd_t[0];
        var cp1 = action.vd_at();
        var width = cp1[X] - vd_g[X];
        var length = cp1[Y] - vd_g[Y];
        action.Figure.VertexList.Items = vd_qi(vd_g, width, length, 0.0, 0.0);
        action.vdrawOwner().UpdateFig(action.Figure);
        action.vdrawOwner().DrawEntity(action.Figure, action.render);
      }
    } else if (action.vd_z == "Pick3") {
      if (status == "start") {
        action.DrawActionDefault = true;
        action.vdrawOwner().Prompt("SPECIFY_HEIGHT");
      } else if (status == "end") {
        action.vdrawOwner().Prompt("");
        if (action.IsCanceled()) {
          vd_bA(action);
        } else {
          var vd_g = action.vd_t[0];
          var cp1 = action.SelectedPoint();
          var height = vdgeo.Distance3D(vd_g, cp1);
          action.vd_t[3] = height;
          action.vd_z = "Pick4";
          action.vdrawOwner().GetUserLine(vd_si, vd_g);
        }
      } else if (status == "draw") {
        var vd_g = action.vd_t[0];
        var width = action.vd_t[1];
        var length = action.vd_t[2];
        var cp1 = action.vd_at();
        var height = vdgeo.Distance3D(vd_g, cp1);
        action.Figure.VertexList.Items = vd_qi(
          vd_g,
          width,
          length,
          height,
          0.0
        );
        action.vdrawOwner().UpdateFig(action.Figure);
        action.vdrawOwner().DrawEntity(action.Figure, action.render);
      }
    } else if (action.vd_z == "Pick4") {
      if (status == "start") {
        action.DrawActionDefault = true;
        action.vdrawOwner().Prompt("SPECIFY_ROTATION");
      } else if (status == "end") {
        action.vdrawOwner().Prompt("");
        if (action.IsCanceled()) {
          vd_bA(action);
        } else {
          var vd_g = action.vd_t[0];
          var width = action.vd_t[1];
          var length = action.vd_t[2];
          var height = action.vd_t[3];
          var cp1 = action.SelectedPoint();
          var angle = vdgeo.GetAngle(vd_g, cp1);
          action.Figure.VertexList.Items = vd_qi(
            vd_g,
            width,
            length,
            height,
            angle
          );
          vd_bE(action.Figure, true, true);
          vd_bA(action);
        }
      } else if (status == "draw") {
        var vd_g = action.vd_t[0];
        var width = action.vd_t[1];
        var length = action.vd_t[2];
        var height = action.vd_t[3];
        var cp1 = action.vd_at();
        var angle = vdgeo.GetAngle(vd_g, cp1);
        action.vd_t[4] = angle;
        action.Figure.VertexList.Items = vd_qi(
          vd_g,
          width,
          length,
          height,
          angle
        );
        action.vdrawOwner().UpdateFig(action.Figure);
        action.vdrawOwner().DrawEntity(action.Figure, action.render);
      }
    }
  }
  this.sphere = function (vd_T, vd_bU) {
    var action = vd_n.ActiveAction();
    action.cancel();
    vd_af = vd_bU;
    if (!vd_T) vd_T = [null, 1, 10, 10];
    action.vd_t = vd_T.concat("sphere");
    if (vd_T[0] && vd_T[1]) {
      action.Figure = vd_n.AddSphere(
        vd_T[0],
        vd_T[1],
        vd_T[2],
        vd_T[3],
        false,
        {}
      );
      vd_bE(action.Figure, false, false);
      vd_bA(action);
      return;
    }
    vdcanvas.GetUserPoint(vd_Af);
  };
  function vd_Af(action, status) {
    if (!action.vd_z) action.vd_z = "Pick1";
    if (action.vd_z == "Pick1") {
      if (status == "start") {
        action.vdrawOwner().Prompt("SPECIFY CENTER POINT");
        action.DrawActionDefault = true;
      } else if (status == "end") {
        action.vdrawOwner().Prompt("");
        if (action.IsCanceled()) {
          vd_bA(action);
        } else {
          var p1 = action.SelectedPoint();
          action.vd_t[0] = p1;
          action.Figure = action.vdrawOwner().AddCircle(p1, 0.0, false, {});
          action.vdrawOwner().UpdateFig(action.Figure);
          action.vdrawOwner().DrawEntity(action.Figure, action.render);
          action.vd_z = "Pick2";
          action.vdrawOwner().GetUserLine(vd_Af, action.vd_t[0]);
        }
      } else if (status == "draw") {
      }
    } else if (action.vd_z == "Pick2") {
      if (status == "start") {
        action.vdrawOwner().Prompt("SPECIFY RADIUS");
        action.DrawActionDefault = true;
      } else if (status == "end") {
        action.vdrawOwner().Prompt("");
        if (action.IsCanceled()) {
          vd_bA(action);
        } else {
          var p2 = action.SelectedPoint();
          action.Figure.Radius = vdgeo.Distance2D(action.vd_t[0], p2);
          action.vd_t[1] = action.Figure.Radius;
          var lon = action.vd_t[2];
          var lat = action.vd_t[3];
          var vd_ys = vdgeo.VD_TWOPI / lon;
          var vd_yn = vdgeo.PI / lat;
          var k = 0,
            l = 0,
            i = 0;
          var a, sa, va, dp, dh;
          var pt;
          var VertexList = [];
          var FaceList = [];
          var rad = action.vd_t[1];
          for (k = 0; k < lon + 1; k++) {
            a = k * vd_ys;
            sa = vdgeo.PI / -2.0;
            for (l = 0; l < lat + 1; l++) {
              va = sa + l * vd_yn;
              dp = rad * Math.cos(va);
              dh = rad * Math.sin(va);
              pt = vdgeo.pointPolar(action.vd_t[0], a, dp);
              pt[Z] += dh;
              VertexList.push(pt);
            }
          }
          for (k = 0; k < lon; k++) {
            for (l = 0; l < lat; l++) {
              i = l + k * (lat + 1);
              i += 1;
              FaceList.push(i);
              i = l + 1 + k * (lat + 1);
              i += 1;
              FaceList.push(i);
              i = l + 1 + (k + 1) * (lat + 1);
              i += 1;
              if (k == lon - 1) {
                i = l + 1;
                i += 1;
              }
              FaceList.push(i);
              i = l + (k + 1) * (lat + 1);
              i += 1;
              if (k == lon - 1) {
                i = l;
                i += 1;
              }
              FaceList.push(i);
              i = -1;
              FaceList.push(i);
            }
          }
          action.Figure = action
            .vdrawOwner()
            .AddPolyface(VertexList, FaceList, true);
          vd_bE(action.Figure, true, true);
          vd_bA(action);
        }
      } else if (status == "draw") {
        var p2 = action.vd_at();
        action.Figure.Radius = vdgeo.Distance2D(action.vd_t[0], p2);
        action.vd_t[1] = action.Figure.Radius;
        action.vdrawOwner().UpdateFig(action.Figure);
        action.vdrawOwner().DrawEntity(action.Figure, action.render);
      }
    }
  }
  this.cone = function (vd_T, vd_bU) {
    var action = vd_n.ActiveAction();
    action.cancel();
    vd_af = vd_bU;
    if (!vd_T) vd_T = [null, 1, 1, 1, 10];
    action.vd_t = vd_T.concat("cone");
    if (vd_T[0]) {
      action.Figure = vd_n.AddCone(
        vd_T[0],
        vd_T[1],
        vd_T[2],
        vd_T[3],
        vd_T[4],
        false,
        {}
      );
      vd_bE(action.Figure, false, false);
      vd_bA(action);
      return;
    }
    vdcanvas.GetUserPoint(vd_tS);
  };
  function vd_tS(action, status) {
    if (!action.vd_z) action.vd_z = "Pick1";
    if (action.vd_z == "Pick1") {
      if (status == "start") {
        action.vdrawOwner().Prompt("SPECIFY CENTER POINT");
        action.DrawActionDefault = true;
      } else if (status == "end") {
        action.vdrawOwner().Prompt("");
        if (action.IsCanceled()) {
          vd_bA(action);
        } else {
          var cp0 = action.SelectedPoint();
          action.vd_t[0] = cp0;
          action.Figure = action.vdrawOwner().AddCircle(cp0, 0.0, false, {});
          action.vdrawOwner().UpdateFig(action.Figure);
          action.vdrawOwner().DrawEntity(action.Figure, action.render);
          action.vd_z = "Pick2";
          action.vdrawOwner().GetUserLine(vd_tS, action.vd_t[0]);
        }
      } else if (status == "draw") {
      }
    } else if (action.vd_z == "Pick2") {
      if (status == "start") {
        action.vdrawOwner().Prompt("SPECIFY BASE RADIUS");
        action.DrawActionDefault = true;
      } else if (status == "end") {
        action.vdrawOwner().Prompt("");
        if (action.IsCanceled()) {
          vd_bA(action);
        } else {
          var p1 = action.SelectedPoint();
          action.Figure.Radius = vdgeo.Distance2D(action.vd_t[0], p1);
          action.vd_t[1] = action.Figure.Radius;
          action.vd_z = "Pick3";
          action.vdrawOwner().GetUserLine(vd_tS, action.vd_t[0]);
        }
      } else if (status == "draw") {
        var p1 = action.vd_at();
        action.Figure.Radius = vdgeo.Distance2D(action.vd_t[0], p1);
        action.vd_t[1] = action.Figure.Radius;
        action.vdrawOwner().UpdateFig(action.Figure);
        action.vdrawOwner().DrawEntity(action.Figure, action.render);
      }
    } else if (action.vd_z == "Pick3") {
      if (status == "start") {
        action.vdrawOwner().Prompt("SPECIFY TOP RADIUS");
      } else if (status == "end") {
        action.vdrawOwner().Prompt("");
        if (action.IsCanceled()) {
          vd_bA(action);
        } else {
          var p2 = action.SelectedPoint();
          action.Figure.Radius = vdgeo.Distance2D(action.vd_t[0], p2);
          action.vd_z = "Pick4";
          action.vdrawOwner().GetUserLine(vd_tS, action.vd_t[0]);
        }
      } else if (status == "draw") {
        var p2 = action.vd_at();
        action.Figure.Radius = vdgeo.Distance2D(action.vd_t[0], p2);
        action.vd_t[2] = action.Figure.Radius;
        action.vdrawOwner().UpdateFig(action.Figure);
        action.vdrawOwner().DrawEntity(action.Figure, action.render);
      }
    } else if (action.vd_z == "Pick4") {
      if (status == "start") {
        action.vdrawOwner().Prompt("SPECIFY HEIGHT");
        action.DrawActionDefault = true;
      } else if (status == "end") {
        action.vdrawOwner().Prompt("");
        if (action.IsCanceled()) {
          vd_bA(action);
        } else {
          var p3 = action.SelectedPoint();
          var height = vdgeo.Distance2D(action.vd_t[0], p3);
          action.vd_t[3] = height;
          var VertexList = [];
          var i = 0;
          var k = 0;
          var vd_gp;
          var num = action.vd_t[4];
          var deg = 360 / num;
          var angle = vdgeo.DegreesToRadians(deg);
          var p2 = [action.vd_t[0][X], action.vd_t[0][Y], action.vd_t[0][Z]];
          p2[Z] += action.vd_t[3];
          for (i = 0; i < num; i++) {
            vd_gp = vdgeo.pointPolar(action.vd_t[0], i * angle, action.vd_t[1]);
            VertexList.push(vd_gp);
          }
          for (i = 0; i < num; i++) {
            vd_gp = vdgeo.pointPolar(p2, i * angle, action.vd_t[2]);
            VertexList.push(vd_gp);
          }
          var FaceList = [];
          for (i = 0; i < num - 2; i++) {
            k = -1;
            FaceList.push(k);
            k = -(i + 2);
            FaceList.push(k);
            k = -(i + 3);
            FaceList.push(k);
            FaceList.push(k);
            k = -1;
            FaceList.push(k);
            k = -(1 + num);
            FaceList.push(k);
            k = -(i + 2 + num);
            FaceList.push(k);
            k = -(i + 3 + num);
            FaceList.push(k);
            FaceList.push(k);
            k = -1;
            FaceList.push(k);
          }
          for (i = 0; i < num; i++) {
            k = i + 1;
            FaceList.push(k);
            k = i + 1 + num;
            FaceList.push(k);
            k = i + 2 + num;
            if (i == num - 1) k = 1 + num;
            FaceList.push(k);
            k = i + 2;
            if (i == num - 1) k = 1;
            FaceList.push(k);
            k = -1;
            FaceList.push(k);
          }
          action.Figure = action
            .vdrawOwner()
            .AddPolyface(VertexList, FaceList, true);
          vd_bE(action.Figure, true, true);
          vd_bA(action);
        }
      } else if (status == "draw") {
      }
    }
  }
  this.ellipse = function (vd_T, vd_bU) {
    vd_n.ActiveAction().cancel();
    vd_af = vd_bU;
    if (vd_T) {
      var Figure = vd_n.AddEllipse(
        vd_T[0],
        vd_T[1],
        vd_T[2],
        vd_T[3],
        vd_T[4],
        vd_T[5],
        false,
        {}
      );
      vd_bE(Figure, false, false);
      if (vd_af) vd_af(vd_n, Figure);
      return;
    }
    vd_n.GetUserPoint(vd_vu);
  };
  function vd_vu(action, status) {
    if (!action.vd_z) action.vd_z = "PickCenter";
    if (action.vd_z == "PickCenter") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.SPECIFY_CENTER_POINT);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure = vd_n.AddEllipse(
            action.ResValue,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            false,
            {}
          );
          action.vd_z = "PickAxisEndPoint";
          vd_n.GetUserLine(vd_vu, action.ResValue);
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "PickAxisEndPoint") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.vd_PU);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.MajorLength = vdgeo.Distance2D(
            action.ReferencePoint,
            action.SelectedPoint()
          );
          action.Figure.MajorAngle = vdgeo.GetAngle(
            action.ReferencePoint,
            action.SelectedPoint()
          );
          action.vd_z = "PickSecondAxis";
          vd_n.GetUserLine(vd_vu, action.ReferencePoint);
        } else {
          vd_bA(action);
        }
      }
    } else if (action.vd_z == "PickSecondAxis") {
      if (status == "start") {
        vd_n.Prompt(vd_n.MessagesDictionary.vd_Pj);
      } else if (status == "end") {
        vd_n.Prompt("");
        if (!action.IsCanceled()) {
          action.Figure.MinorLength = vdgeo.Distance2D(
            action.ReferencePoint,
            action.SelectedPoint()
          );
          vd_bE(action.Figure, true, true);
        }
        vd_bA(action);
      } else if (status == "draw") {
        if (action.Figure) {
          var render = action.render;
          action.Figure.MinorLength = vdgeo.Distance2D(
            action.ReferencePoint,
            action.vd_at()
          );
          vd_n.UpdateFig(action.Figure);
          vd_n.DrawEntity(action.Figure, render);
        }
      }
    }
  }
  return this;
}

//===============================================================
// WesmartCad 모듈

function WesmartCad() {
  let _callbackOptions;
  var vdcanvas, display;

  // ===== 초기화 initialize =====
  this.initPageLoad = function (
    displayNm,
    widthSize,
    heightSize,
    vdsFiles,
    layerVisible,
    callbackOptions
  ) {
    vdcanvas = vdmanager.AttachCanvas(displayNm, widthSize, heightSize);

    if (callbackOptions) {
      _callbackOptions = callbackOptions;

      var osnapInfo = callbackOptions.osnap;

      if (osnapInfo) {
        vdcanvas.SetActionOsnapSize(osnapInfo.size);
        vdcanvas.SetActionOsnapColor(osnapInfo.color);
      }
    }

    vdcanvas.licval = [
      "",
      "",
      "AUGAtBgLAkHAnBwbAwGAvBgbAkHAzBgLAQHAyBQYA0GAzBQZAcHAvAwL",
    ];

    display = displayNm;
    vdcanvas.GripManager.Enable = false;

    //======마우스선택=======
    vdcanvas.vdmousemove = this.mouseMove;
    vdcanvas.vdmousedown = this.mouseDown;
    vdcanvas.vdAfterOpenDocument = this.afterDocument;

    // 3차원 view 막기
    vdcanvas.ActiveAction().DefaultActions =
      vdConst.DEFAULT_ZOOMSCALE +
      vdConst.DEFAULT_SCROLL +
      vdConst.DEFAULT_ZOOMEXTENTS;

    openCanvas(vdsFiles, _callbackOptions);

    layerVisible ? this.InitLayersList() : null;
  };

  //====== osnap 값 유지를 위해 기록할 변수 ======
  var osnapStatusValue;

  // ===== Osnap menu=====
  //  status : 상태유지, permit : 파라메터 허용 .. 나머지는 옵션
  this.osnapsMenu = function (
    Status,
    permit,
    endpoint,
    midpoint,
    centerpoint,
    near,
    insert,
    node
  ) {
    var osnapmode = 0;
    if (endpoint) {
      osnapmode += vdConst.OsnapMode_END;
    }
    if (midpoint) {
      osnapmode += vdConst.OsnapMode_MID;
    }
    if (centerpoint) {
      osnapmode += vdConst.OsnapMode_CEN;
    }
    if (near) {
      osnapmode += vdConst.OsnapMode_NEA;
    }
    if (insert) {
      osnapmode += vdConst.OsnapMode_INS;
    }
    if (node) {
      osnapmode += vdConst.OsnapMode_NODE;
    }

    if (!osnapStatusValue && permit) {
      osnapStatusValue = osnapmode;
      vdcanvas.SetOsnapMode(osnapStatusValue);
    } else if (osnapStatusValue !== osnapmode && permit) {
      osnapStatusValue = osnapmode;
      vdcanvas.SetOsnapMode(osnapStatusValue);
    }

    if (!Status) {
      vdcanvas.SetOsnapMode(0);
    } else if (!osnapStatusValue) {
      osnapStatusValue = osnapmode;
      vdcanvas.SetOsnapMode(osnapStatusValue);
    } else {
      vdcanvas.SetOsnapMode(osnapStatusValue);
    }
  };

  // ===== Distance ======
  this.getDistance = function (callbackOptions) {
    return (function () {
      return new Promise(function (resolve, reject) {
        try {
          function _vdonActionGetDistance(action, status) {
            vdcanvas = action.vdrawOwner();
            if (status == "start") {
            } else if (status == "end") {
              if (!action.IsCanceled()) {
                if (action.actionType == vdConst.ACTION_POINT_WORLD) {
                  vdcanvas.GetUserLine(_vdonActionGetDistance, action.ResValue);
                } else {
                  var distance = vdgeo.Distance3D(
                    action.ResValue[0],
                    action.ResValue[1]
                  );
                  var distanceValue = distance.toString();
                  if (distanceValue) {
                    resolve(distanceValue);
                    if (callbackOptions && callbackOptions.afterDistance) {
                      _callbackOptions.afterDistance.call(this, distanceValue);
                    }
                  }
                }
              } else {
                reject(0);
                if (callbackOptions && callbackOptions.afterDistance) {
                  _callbackOptions.afterDistance.call(this, 0);
                }
              }
            }
          }
          distanceStatus = true;
          vdcanvas.GetUserPoint(_vdonActionGetDistance);
        } catch (error) {
          // The error of the measuring tool
          reject("error");
          if (callbackOptions && callbackOptions.afterDistance) {
            _callbackOptions.afterDistance.call(this, "error");
          }
        }
      });
    })();
  };

  // ===== Angle ======
  this.getAngle = function (callbackOptions) {
    return (function () {
      return new Promise(function (resolve, reject) {
        try {
          xyArrayStatus = true;
          function actionentityadded(vdrawobj, entity) {
            try {
              if (xyArray.length == 3) {
                var result = null;
                var twoTOthreePOINTS = null;
                twoTOthreePOINTS = vdgeo.GetAngle(
                  [
                    xyArray[xyArray.length - 2].xLocation,
                    xyArray[xyArray.length - 2].yLocation,
                    0,
                  ],
                  [
                    xyArray[xyArray.length - 1].xLocation,
                    xyArray[xyArray.length - 1].yLocation,
                    0,
                  ]
                );

                var twoTOthreeAngle = null;
                twoTOthreeAngle = Number(
                  vdgeo.RadiansToDegrees(twoTOthreePOINTS).toFixed(0)
                );

                // 1점에서 2점까지의 각도 B
                var oneTOtwoPOINTS = null;
                oneTOtwoPOINTS = vdgeo.GetAngle(
                  [
                    xyArray[xyArray.length - 2].xLocation,
                    xyArray[xyArray.length - 2].yLocation,
                    0,
                  ],
                  [
                    xyArray[xyArray.length - 3].xLocation,
                    xyArray[xyArray.length - 3].yLocation,
                    0,
                  ]
                );

                var oneTOtwoAngle = null;
                oneTOtwoAngle = Number(
                  vdgeo.RadiansToDegrees(oneTOtwoPOINTS).toFixed(0)
                );

                result = Math.abs(twoTOthreeAngle - oneTOtwoAngle);
                if (result >= 180) {
                  result = 360 - result;
                }

                xyArray = [];
                xyArrayStatus = false;
                resolve(result);
                if (callbackOptions && callbackOptions.afterAngle) {
                  _callbackOptions.afterAngle.call(this, result);
                }
              } else {
                xyArray = [];
                reject(0);
                if (callbackOptions && callbackOptions.afterAngle) {
                  _callbackOptions.afterAngle.call(this, 0);
                }
              }
            } catch (error) {
              xyArray = [];
              reject(0);
              if (callbackOptions && callbackOptions.afterAngle) {
                _callbackOptions.afterAngle.call(this, 0);
              }
            }
          }

          angleStatus = true;
          vdcanvas.scriptCommand.line(null, actionentityadded);
        } catch (error) {
          xyArray = [];
          xyArrayStatus = false;
          // The error of the measuring tool
          reject("error");
          if (callbackOptions && callbackOptions.afterAngle) {
            _callbackOptions.afterAngle.call(this, "error");
          }
        }
      });
    })();
  };

  // ===== Point ======
  this.getPoint = function (callbackOptions) {
    return (function () {
      return new Promise(function (resolve, reject) {
        try {
          function _onActionPoint(action, status) {
            vdcanvas = action.vdrawOwner();
            if (status == "start") {
            } else if (status == "end") {
              if (!action.IsCanceled()) {
                if (
                  action.ResValue[X].toString() &&
                  action.ResValue[Y].toString()
                ) {
                  resolve([
                    action.ResValue[X].toString(),
                    action.ResValue[Y].toString(),
                  ]);
                  if (callbackOptions && callbackOptions.afterPoint) {
                    _callbackOptions.afterPoint.call(this, [
                      action.ResValue[X].toString(),
                      action.ResValue[Y].toString(),
                    ]);
                  }
                }
              } else {
                reject(0);
                if (callbackOptions && callbackOptions.afterPoint) {
                  _callbackOptions.afterPoint.call(this, 0);
                }
              }
            }
          }
          pointStatus = true;
          vdcanvas.GetUserPoint(_onActionPoint);
        } catch (error) {
          // The error of the measuring tool
          reject("error");
          if (callbackOptions && callbackOptions.afterPoint) {
            _callbackOptions.afterPoint.call(this, "error");
          }
        }
      });
    })();
  };

  // ====== 면적 구하기 =======
  this.getArea = async function (callbackOptions, Color = "0,0,255") {
    return await (async function () {
      return new Promise(function (resolve, reject) {
        try {
          function areaValue(vdcanvas, entity) {
            vdcanvas.AddXProperty(entity, "Area", null);

            if (!entity) {
              reject(0);
              if (callbackOptions && callbackOptions.afterArea) {
                _callbackOptions.afterArea.call(this, 0);
              }
              return;
            }

            if (vdcanvas.GetEntityArea(entity, "Area")) {
              resolve(vdcanvas.GetEntityArea(entity, "Area"));
              if (callbackOptions && callbackOptions.afterArea) {
                _callbackOptions.afterArea.call(
                  this,
                  vdcanvas.GetEntityArea(entity, "Area")
                );
              }
            } else {
              reject(0);
              if (callbackOptions && callbackOptions.afterArea) {
                _callbackOptions.afterArea.call(this, 0);
              }
            }

            areaStatus = false;
            vdcanvas.scriptCommand.undo();
            vdcanvas.redraw();
          }

          areaStatus = true;

          var transparencyPs = parseInt(90);

          vdcanvas.scriptCommand.hatch(
            "solid",
            "255,255,0",
            Color,
            1,
            0,
            transparencyPs,
            1
          );
          vdcanvas.scriptCommand.polyline(null, true, 0, areaValue);
        } catch (error) {
          // The error of the measuring tool
          reject("error");
          if (callbackOptions && callbackOptions.afterArea) {
            _callbackOptions.afterArea.call(this, "error");
          }
        }
      });
    })();
  };

  // 측정모드상태 적용 변수
  this.measureStatus = false;

  // 측정도구 + 오스냅
  this.measurementSelect = function (selectOption, callbackOptions) {
    this.osnapsMenu(true, false);
    this.measureStatus = true;

    if (selectOption == "distance") {
      this.getDistance(callbackOptions)
        .then((resolve) => {
          this.osnapsMenu(false, false);
          this.measureStatus = false;
        })
        .catch((reject) => {});
    }
    if (selectOption == "angle") {
      this.getAngle(callbackOptions)
        .then((resolve) => {
          this.osnapsMenu(false, false);
          this.measureStatus = false;
        })
        .catch((reject) => {})
        .finally(() => {});
    }
    if (selectOption == "point") {
      this.getPoint(callbackOptions)
        .then((resolve) => {
          this.osnapsMenu(false, false);
          this.measureStatus = false;
        })
        .catch((reject) => {})
        .finally(() => {});
    }
    if (selectOption == "area") {
      this.getArea(callbackOptions)
        .then((resolve) => {
          this.osnapsMenu(false, false);
          this.measureStatus = false;
        })
        .catch((reject) => {})
        .finally(() => {});
    }
  };

  // ===== POI 생성 <리스트> ======
  this.addPOIList = function (arg, callbackOptions) {
    if (!(arg.length % 5 == 0)) {
      return null;
    }
    var arr;
    for (let index = 0; index < arg.length; index += 5) {
      arr = arg.slice(index, index + 5);

      var valueStr = arr.filter((argument) => {
        return typeof argument === "string";
      });

      var valueNum = arr.filter((argument) => {
        return typeof argument === "number";
      });

      var _key = valueStr[0];
      var _path = valueStr[1];

      var poikey = _key;
      var path = _path;
      var xLocation = valueNum[0] - valueNum[2] / 2;
      var yLocation = valueNum[1];
      var zLocation = 0;
      var size = valueNum[2];
      var rotation = 0;
      var redraw = true;

      var entity = vdcanvas.AddImage(
        poikey,
        path,
        [xLocation, yLocation, zLocation],
        size,
        rotation,
        redraw
      );

      entity.Display = 21;
      vdcanvas.AddXProperty(entity, "POI", poikey);

      vdcanvas.UpdateFig(entity);
      vdcanvas.redraw();

      if (callbackOptions && callbackOptions.afterAddPOIList) {
        _callbackOptions.afterAddPOIList.call(this, poikey);
      }
    }
  };

  // ===== POI 삭제 <리스트> ======
  this.deletePOIList = function (keys, callbackOptions) {
    var document = vdcanvas.GetDocument();
    var activelayout = vdcanvas.GetActiveLayout();

    var Handlestr;
    var fig;
    var imageHandle;
    // keys값과 매칭되는 엔티티만
    for (var j = 0; j < keys.length; j++) {
      // 활성화 엔티티
      for (var i = 0; i < activelayout.Entities.Items.length; i++) {
        // 활성화 엔티티 핸들아이디
        Handlestr = activelayout.Entities.Items[i];
        // 활성화 엔티티 추출
        fig = document[Handlestr];

        if (fig.ImageDefinition) {
          imageHandle = fig.ImageDefinition;

          if (document[imageHandle].Name == keys[j]) {
            // 해당 엔티티 지우기
            document["h_" + `${fig.HandleId}`] = 0;
            if (callbackOptions && callbackOptions.afterDeletePOIList) {
              _callbackOptions.afterDeletePOIList.call(this, keys[j]);
            }
          }
        }
      }
    }
    vdcanvas.redraw();
  };

  // ===== POI ON <리스트> ======
  this.onPOIList = function (keys, callbackOptions) {
    var document = vdcanvas.GetDocument();
    var activelayout = vdcanvas.GetActiveLayout();

    var Handlestr;
    var fig;
    // keys값과 매칭되는 엔티티만
    for (var j = 0; j < keys.length; j++) {
      // 활성화 엔티티
      for (var i = 0; i < activelayout.Entities.Items.length; i++) {
        // 활성화 엔티티 핸들아이디
        Handlestr = activelayout.Entities.Items[i];
        // 활성화 엔티티 추출
        fig = document[Handlestr];

        if (fig.XProperties) {
          if (fig.XProperties.Items[0].PropValue == keys[j]) {
            fig.Deleted = false;
            vdcanvas.redraw();
            if (callbackOptions && callbackOptions.afterOnPOIList) {
              _callbackOptions.afterOnPOIList.call(this, keys[j]);
            }
          }
        }
      }
    }
  };

  // ===== POI OFF <리스트> ======
  this.offPOIList = function (keys, callbackOptions) {
    var document = vdcanvas.GetDocument();
    var activelayout = vdcanvas.GetActiveLayout();

    var Handlestr;
    var fig;
    // keys값과 매칭되는 엔티티만
    for (var j = 0; j < keys.length; j++) {
      // 활성화 엔티티
      for (var i = 0; i < activelayout.Entities.Items.length; i++) {
        // 활성화 엔티티 핸들아이디
        Handlestr = activelayout.Entities.Items[i];
        // 활성화 엔티티 추출
        fig = document[Handlestr];

        if (fig.XProperties) {
          if (fig.XProperties.Items[0].PropValue == keys[j]) {
            fig.Deleted = true;
            vdcanvas.redraw();
            if (callbackOptions && callbackOptions.afterOffPOIList) {
              _callbackOptions.afterOffPOIList.call(this, keys[j]);
            }
          }
        }
      }
    }
  };

  // ===== POI  마우스 클릭시 생성 <단일> ======
  var __arg;
  var __callbackOptions;

  this.addPOI = function (arg, callbackOptions) {
    addPOIValid = true;

    __arg = arg;
    __callbackOptions = callbackOptions;
  };

  function _addPOI(e) {
    xyLocations.push(e.x.toString());
    xyLocations.push(e.y.toString());

    var poikey = __arg[0];
    var path = __arg[1];
    var xLocation = xyLocations[0] - __arg[2] / 2;
    var yLocation = xyLocations[1];
    var zLocation = 0;
    var size = __arg[2];
    var rotation = 0;
    var redraw = true;
    var vdcanvas = vdmanager.vdrawObject(display);

    var entity = vdcanvas.AddImage(
      poikey,
      path,
      [xLocation, yLocation, zLocation],
      size,
      rotation,
      redraw
    );

    entity.Display = 21;
    vdcanvas.AddXProperty(entity, "POI", poikey);

    vdcanvas.UpdateFig(entity);
    vdcanvas.redraw();

    xyLocations = [];
    addPOIValid = false;

    if (__callbackOptions && __callbackOptions.afterAddPOI) {
      _callbackOptions.afterAddPOI.call(this, poikey);
    }
  }

  // ===== POI 마우스 클릭시 삭제 <단일> ======
  this.deletePOI = function (callbackOptions) {
    var fig;
    var document = vdcanvas.GetDocument();
    if (poiDeleteArr) {
      fig = poiDeleteArr;

      if (fig.ImageDefinition) {
        // 해당 엔티티 지우기
        document["h_" + `${fig.HandleId}`] = 0;
        if (callbackOptions && callbackOptions.afterDeletePOI) {
          _callbackOptions.afterDeletePOI.call(
            this,
            fig.XProperties.Items[0].PropValue
          );
        }
      }
      vdcanvas.redraw();
    }
  };

  // ===== 선택 객체면적 구하기 =====
  this.entityArea = function (callbackOptions) {
    if (entityAreaData) {
      if (callbackOptions && callbackOptions.afterEntityArea) {
        _callbackOptions.afterEntityArea.call(this, entityAreaData);
      }
      return entityAreaData;
    }
  };

  // resize Canvas func
  this.resizeCanvas = function (width, height, callbackOptions) {
    vdcanvas.SetSize(width, height);

    if (callbackOptions && callbackOptions.afterResize) {
      _callbackOptions.afterResize.call(this, width, height);
    }
  };

  // canvas zoom Extents
  this.zoomExtends = function (callbackOptions) {
    vdmanager.vdrawObject(display).zoomExtents();
    vdmanager.vdrawObject(display).redraw();

    if (callbackOptions && callbackOptions.afterZoomExt) {
      // 현재 인자 display 는 임의로 넘겨주는 값
      _callbackOptions.afterZoomExt.call(this, display);
    }
  };

  // canvas file connected & open
  function openCanvas(vdsFiles, callbackOptions) {
    vdmanager.vdrawObject(display).SelectDocument(vdsFiles);

    if (callbackOptions && callbackOptions.afterOpenDoc) {
      _callbackOptions.afterOpenDoc.call(this, vdsFiles);
    }
  }

  this.openFiles = function (data, filename) {
    var vdcanvas = vdmanager.vdrawObject();
    vdcanvas.SelectDocumentBlob(data, filename);
    // console.log(data, filename);
  };

  //===========================================

  // canvas Mouse Move Event Fn
  // entity 에 마우스 Hover 시 entity의 레이어 Name 표출 및 마우스 cursor Function
  this.mouseMove = function (e) {
    var entity = e.target.GetEntityFromPoint(e.xPix, e.yPix);
    if (e.mousebutton == 3) return;
    if (e.mousebutton == 0) {
      e.target.canvas.style.cursor = "none";
      e.target.canvas.title = "";
      // console.log(entity);

      if (entity != null && entity._t != undefined) {
        var xprop = vdcanvas.GetXProperty(entity, "건축");
        if (xprop !== null && xprop.PropValue === true) return;
        // e.target.canvas.style.cursor = "pointer";
        e.target.canvas.title = entity.LayerRef.Name;
      }
    }

    if (_callbackOptions && _callbackOptions.onMouseMove) {
      _callbackOptions.onMouseMove.call(this, entity, e);
    }
    return;
  };

  //======= 마우스 클릭시 발생 이벤트 ==========

  // 각도 구할때 필요한 변수
  var xyArray = [];
  var xyArrayStatus = false;
  var xLocation;
  var yLocation;

  // 측정도구 상태
  var areaStatus = false;
  var angleStatus = false;
  var distanceStatus = false;
  var pointStatus = false;

  // 측정도구 포인트
  var angleCount = 0;
  var distanceCount = 0;
  var pointCount = 0;

  // 앤티티면적 값
  var entityAreaData;

  // 마우스선택에 따른 POI 생성에 필요한 변수
  var xyLocations = [];
  var addPOIValid = false;

  // POI 삭제에 필요한 변수
  var poiDeleteArr;

  // canvas Mouse Down Event function
  this.mouseDown = function (e) {
    var vdcanvas = vdmanager.vdrawObject(display);
    var getXY = { currentX: e.x, currentY: e.y };

    if (addPOIValid == true) {
      _addPOI(e);
      return;
    }

    //====== 각도 구할 때 사용 ==========
    if (xyArrayStatus && !(e.mousebutton == 2) && !(e.mousebutton == 3)) {
      xLocation = e.x.toString();
      yLocation = e.y.toString();
      xyArray.push({ xLocation, yLocation });
    }

    // 면적
    if (areaStatus) {
      return;
    }

    // 측정도구 사용시에 중간에 중단할 경우
    if (e.mousebutton == 3) {
      areaStatus = false;
      angleStatus = false;
      distanceStatus = false;
      pointStatus = false;
      xyArrayStatus = false;
      this.osnapsMenu(false, false);
      angleCount = 0;
      distanceCount = 0;
      pointCount = 0;
      var vdcanvas = vdmanager.vdrawObject(display);
      cancelActiveAction();
      vdcanvas.scriptCommand.undo();
      vdcanvas.redraw();
    }

    // 각도(3)
    if (angleStatus) {
      var vdcanvas = vdmanager.vdrawObject(display);
      setTimeout(vdcanvas.redraw);
      angleCount++;
      if (angleCount % 3 == 0) {
        cancelActiveAction();
        vdcanvas.scriptCommand.undo();
        angleCount = 0;
        angleStatus = false;
        return;
      }
      return;
    }
    // 거리
    if (distanceStatus) {
      distanceCount++;
      if (distanceCount % 2 == 0) {
        distanceCount = 0;
        distanceStatus = false;
        return;
      } else {
        return;
      }
    }

    // 포인트
    if (pointStatus) {
      pointCount++;
      if (pointCount % 1 == 0) {
        pointCount = 0;
        pointStatus = false;
        return;
      } else {
        return;
      }
    }

    // =================================
    var vdcanvas = vdmanager.vdrawObject(display);
    document.getElementById(display).focus();
    var entity = e.target.GetEntityFromPoint(e.xPix, e.yPix);
    // 속성정보 표시 후 canvas 내에서 click 할때에 속성정보 팝업 disapear

    // ==== 객체선택에 따른 면적 구하기 ====
    // 객체마다 모두 가지고 있는 속성 - 숫자로 표현됨
    if (entity) {
      if (
        entity._t == vdConst.vdPolyline_code ||
        entity._t == vdConst.vdRect_code ||
        entity._t == vdConst.vdCircle_code ||
        entity._t == vdConst.vdArc_code ||
        entity._t == vdConst.vdEllipse_code
      ) {
        entityAreaData = vdcanvas.GetEntityArea(entity, entity.HandleId);
      }
    }

    // console.log(e.mousebutton);
    if (e.mousebutton == 1 && entity !== null) {
      var xprop = vdcanvas.GetXProperty(entity, "건축");
      if (xprop !== null && xprop.PropValue === true) return;
      var action = e.target.ActiveAction();
      var mouseX = e.xPix; // left - right
      var mouseY = e.yPix; // top - bottom

      highlightCanvas(entity, _callbackOptions);
      var groupId;

      var vddoc = vdcanvas.GetDocument();
      var groupArr = vddoc.Groups.Items;
      for (var item of entity.XProperties.Items) {
        if (item.Name == "GroupID") {
          groupId = item.PropValue;
        }
        // 선택된 객체의 group 정보와 마우스 이벤트된 위치 보내기
        showProperties(groupId, groupArr, mouseX, mouseY, _callbackOptions);
      }

      for (const poiIdx in entity.XProperties.Items) {
        if (entity.XProperties.Items[poiIdx].Name == "POI") {
          var poiInfo = entity.XProperties.Items[poiIdx];
          poiDeleteArr = entity;
        }
      }
    }

    if (_callbackOptions && _callbackOptions.onMouseDown) {
      _callbackOptions.onMouseDown.call(this, entity, getXY, poiInfo);
    }
  };

  // entity 클릭 시 하이라이트 기능
  var highlightCanvas = function (entity, callbackOptions) {
    // poi entity highlight 막기
    var vdcanvas = vdmanager.vdrawObject(display);

    if (entity._t == vdConst.vdImage_code) {
      vdcanvas.scriptCommand.select(entity, function () {
        vdcanvas.scriptCommand.erase();
        vdcanvas.redraw();
      });
    }
    // entity
    else if (entity && entity._t !== vdConst.vdImage_code) {
      vdcanvas.scriptCommand.select(null);
    }

    if (callbackOptions && callbackOptions.afterHighLight) {
      _callbackOptions.afterHighLight.call(this, entity);
    }
  };

  this.eraseHighLight = function (callbackOptions) {
    var vdcanvas = vdmanager.vdrawObject(display);
    vdcanvas.scriptCommand.select(null, function () {
      vdcanvas.scriptCommand.erase();
      vdcanvas.redraw();
    });
    vdcanvas.ActiveAction().cancel();
    if (callbackOptions && callbackOptions.afterEraseHL) {
      _callbackOptions.afterEraseHL.call(this, "text");
    }
  };

  // 속성정보 표출 Function
  function showProperties(groupId, groups, mouseX, mouseY, callbackOptions) {
    const coor = { mouseX, mouseY };

    for (var i = 0; i < groups.length; i++) {
      if (groups[i].Name == groupId) {
        var GroupInfo = groups[i].XProperties.Items;
        var wrapper = document.querySelector(".popup-content");
        wrapper.innerHTML = "";

        for (let info of GroupInfo) {
          const listWrap = document.createElement("div");
          listWrap.className = 'list-wrap';
          listWrap.innerHTML += `<div class="info-title">${info.Name}</div>`;
          listWrap.innerHTML += `<div class="info-content">${info.PropValue}</div>`;

          wrapper.appendChild(listWrap);
        }
        var popUpBox = document.getElementById("popup-box");
        // popUpBox.style.top = `${mouseY + 40}px`;
        // popUpBox.style.left = `${mouseX + 40}px`;
        popUpBox.style.top = "50%";
        popUpBox.style.left = "50%";
        popUpBox.style.transform = "translate(-50%, -50%)";
        popUpBox.style.display = "block";

        if (callbackOptions && callbackOptions.getInfo) {
          _callbackOptions.getInfo.call(null, GroupInfo, coor);
        }
      }
    }
    return;
  }

  // List able check All
  this.EnableAllLayers = function () {
    layerListBox.EnableAll();
    var vdcanvas = vdmanager.vdrawObject(display);
    var vddoc = vdcanvas.GetDocument();
    if (vddoc == null) return;
    for (var i = 0; i < vddoc.Layers.Items.length; i++) {
      var item = vdcanvas.GetDictItem(vddoc.Layers, vddoc.Layers.Items[i]);
      item.Frozen = false;
    }

    vdcanvas.redraw();
  };

  // List disable check All
  this.DisableAllLayers = function () {
    layerListBox.DisableAll();
    var vdcanvas = vdmanager.vdrawObject(display);
    var vddoc = vdcanvas.GetDocument();
    if (vddoc == null) return;
    for (var i = 0; i < vddoc.Layers.Items.length; i++) {
      item = vdcanvas.GetDictItem(vddoc.Layers, vddoc.Layers.Items[i]);
      item.Frozen = true;
    }
    vdcanvas.redraw();
  };
  // 레이어 list 의 checkBox click 시 on/ off 기능
  this.ListOnClick = function (Sender, EventArgs) {
    if (Sender == null) return;
    var vdcanvas = vdmanager.vdrawObject(display);
    var layers = vdcanvas.GetDocument().Layers;
    var layer = vdcanvas.GetDictItem(layers, "h_" + EventArgs.Value);
    if (layer == null) return;

    if (Sender.checked == true) layer.Frozen = false;
    else layer.Frozen = true;

    vdcanvas.redraw();
  };

  // 취소 액션
  function cancelActiveAction() {
    vdcanvas.ActiveAction().cancel();
  }

  var fileOpen = new Event("newFileOpen");

  // vdcanvas open after document
  this.afterDocument = function (e) {
    var vdcanvas = vdmanager.vdrawObject(display);
    this.zoomExtents();

    var canvasEle = document.getElementById(display);
    canvasEle.dispatchEvent(fileOpen);

    makeLayersList(_callbackOptions);
    makeTreeNode(_callbackOptions);

    if (_callbackOptions && _callbackOptions.afterDocCallB) {
      _callbackOptions.afterDocCallB.call(this, fileOpen, display);
    }
  };

  function makeLayersList(callbackOptions) {
    var vdcanvas = vdmanager.vdrawObject(display);
    var layers = vdcanvas.GetDocument().Layers;
    var layerArr = [];

    if (!layerListBox) return;

    layerListBox.DeleteItems();
    for (var i = 0; i < layers.Items.length; i++) {
      var layer = vdcanvas.GetDictItem(layers, layers.Items[i]);
      var selected = true;
      var fr = layer.Frozen;
      if (fr == null) selected = true;
      else {
        if (fr == true) selected = false;
        else selected = true;
      }
      layerListBox.AddItem(layer.Name, layer.HandleId, selected);
      layerArr.push(layer);
    }

    if (callbackOptions && callbackOptions.afterMakeLayerList) {
      _callbackOptions.afterMakeLayerList.call(this, layerArr);
    }
  }
  // let jsonData = [];
  let fireArray = [];
  function makeTreeNode(callbackOptions) {
    // 소방시설 string ('_') split
    let depthTwo = [];
    var vdcanvas = vdmanager.vdrawObject(display);
    var groupsItems = vdcanvas.GetDocument().Groups.Items;

    for (const index in groupsItems) {
      var groupInfo = groupsItems[index].XProperties.Items;

      groupInfo.filter((info, idx) => {});
      var hasLevelOne = groupInfo.filter((info) => info.Name.includes("LV1"));
      var hasLevelTwo = groupInfo.filter((info) => info.Name.includes("LV2"));

      // Lv1. 새 객체로 짜기
      if (hasLevelOne && hasLevelOne.length > 0) {
        var values = hasLevelOne[0].PropValue.split("_");
        var codeOne = values[0];
        var nameOne = values[1];
      }

      const obj = Object.assign({
        code: codeOne,
        name: nameOne,
        parent: null,
        children: [],
      });
      fireArray.push(obj);
      const filterArray = fireArray.filter((itemOne, index) => {
        return (
          fireArray.findIndex((itemTwo) => {
            return itemOne.code == itemTwo.code;
          }) == index
        );
      });

      // Lv2. 새 객체로 짜기
      if (hasLevelTwo && hasLevelTwo.length > 0) {
        var values = hasLevelTwo[0].PropValue.split("_");
        var codeTwo = values[0];
        var nameTwo = values[1];

        const depthObj = Object.assign({
          code: codeTwo,
          name: nameTwo,
          children: [],
          parent: nameOne,
          // parent: hasLevelOne[0].PropValue
        });
        depthTwo.push(depthObj);
      }
      //Lv2. 중복 filter
      const filterLV2 = depthTwo.filter((itemOne, index) => {
        return (
          depthTwo.findIndex((itemTwo) => {
            return itemOne.name == itemTwo.name;
          }) == index
        );
      });

      // filtering 한 변수 전역화
      fireArray = filterArray;
      depthTwo = filterLV2;
    }

    // parentName 과 일치하는 곳에 넣기
    for (var j in depthTwo) {
      var depthParent = depthTwo[j].parent;

      for (var k in fireArray) {
        var rootName = fireArray[k].name;
        if (rootName == depthParent) {
          fireArray[k].children.push(depthTwo[j]);
          // delete depthTwo[j].parent;
        }
      }
    }
    // children 없는 Lv1. 헤드 / 살수범위 부여
    for (const idx in fireArray) {
      // 옥내소화전 설비 text 예외처리
      if (fireArray[idx].code == "IFE") {
        for (var a = 0; a < 2; a++) {
          if (a == 0)
            fireArray[idx].children.push({
              code: "IFN",
              name: "옥내소화전함",
              parent: fireArray[idx].name,
            });
          if (a == 1)
            fireArray[idx].children.push({
              code: "IFR",
              name: "유효범위",
              parent: fireArray[idx].name,
            });
        }
      } else if (
        fireArray[idx].children &&
        fireArray[idx].children.length == 0
      ) {
        for (var a = 0; a < 2; a++) {
          if (a == 0)
            fireArray[idx].children.push({
              code: "HEAD",
              name: "헤드",
              parent: fireArray[idx].name,
            });
          if (a == 1)
            fireArray[idx].children.push({
              code: "WATER",
              name: "살수범위",
              parent: fireArray[idx].name,
            });
        }
      }

      if (
        fireArray[idx].children &&
        fireArray[idx].name == fireArray[idx].children[0].name
      ) {
        fireArray[idx].children = [];
      }
    }

    if (callbackOptions && callbackOptions.afterMakeTreeNode) {
      callbackOptions.afterMakeTreeNode.call(this, fireArray);
    }
  }

  this.doCheckListItem = function (e, callbackOptions) {
    var vdcanvas = vdmanager.vdrawObject(display);
    var groupsItems = vdcanvas.GetDocument().Groups.Items;

    // 1단계 checkbox 선택시 2단계 allChecked index.html 진행
    var checkedItem = e.target;
    var findName = e.target.name;
    var findCode = e.target.id;
    var parentName = e.target.value;

    var groupEntities = [];
    fireArray.filter((item) => {
      if (findName == item.name) {
        // 선택한 checkbox 가 1단계에 있을때
        //childNodes 모두 선택
        // checkbox select code & name
        var codeName = `${item.code}_${item.name}`;

        for (var group of groupsItems) {
          var groupXprop = group.XProperties.Items;
          groupXprop.filter((value) => {
            if (value.PropValue == codeName) {
              groupEntities.push(...group.Items);
            }
          });
        }
        // 헤드 \ 살수범위 \ 2단계 있는 경우 3가지 나눠 작업 필요
        // 1단계에 없을 때, 해당 entity만 끄고 킬 수 있게
      } else if (item.children.length > 0 && parentName == item.name) {
        if (
          findName == "헤드" ||
          findName == "살수범위" ||
          findName == "옥내소화전함" ||
          findName == "유효범위"
        ) {
          for (var group of groupsItems) {
            var groupXprop = group.XProperties.Items;
            groupXprop.filter((value) => {
              if (value.Name == "LV1" && value.PropValue.includes(parentName)) {
                for (const item of group.Items) {
                  const ettItems = vdcanvas.GetEntityItem(item);

                  // 1. head
                  if (
                    ettItems._t !== vdConst.vdCircle_code &&
                    (findName == "헤드" || findName == "옥내소화전함")
                  ) {
                    console.log("test");
                    if (e.target.checked) ettItems.Deleted = false;
                    else ettItems.Deleted = true;
                  }

                  //2. waterBoundary
                  else if (
                    ettItems._t == vdConst.vdCircle_code &&
                    (findName == "살수범위" || findName == "유효범위")
                  ) {
                    if (e.target.checked) ettItems.Deleted = false;
                    else ettItems.Deleted = true;
                  }
                }
              }
            });
          }
          return;
        } else {
          // 3. 2단계
          for (var group of groupsItems) {
            var groupXprop = group.XProperties.Items;
            groupXprop.filter((value) => {
              if (
                value.Name == "LV2" &&
                value.PropValue == `${findCode}_${findName}`
              ) {
                groupEntities.push(...group.Items);
              }
            });
          }
        }
      }
    });
    for (entity of groupEntities) {
      if (groupEntities.length > 0) {
        var item = vdcanvas.GetEntityItem(entity);
        e.target.checked ? (item.Deleted = false) : (item.Deleted = true);
      }
    }
    vdcanvas.redraw();

    if (callbackOptions && callbackOptions.afterClickCheckItem) {
      callbackOptions.afterClickCheckItem.call(this, checkedItem);
    }
  };

  // List Box create
  var layerListBox;
  this.InitLayersList = function () {
    // Layervisible 인자값 추가 default : false , display none 설정
    var Arguments = {
      Base: document.getElementById("LayersListBox"),
      Rows: 175,
      Width: 150,
      NormalItemColor: null,
      NormalItemBackColor: null,
      AlternateItemColor: null,
      AlternateItemBackColor: null,
      SelectedItemColor: null,
      SelectedIItemBackColor: null,
      HoverItemColor: null,
      HoverItemBackColor: null,
      HoverBorderdColor: null,
      ClickEventHandler: this.ListOnClick,
    };
    layerListBox = new ListBox(Arguments);
  };
}
